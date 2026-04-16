import express from "express";
import cors from "cors";
import Database from "better-sqlite3";
import crypto from "crypto";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3001;
const API_KEY = process.env.NOTES_API_KEY;

if (!API_KEY) {
  console.error("NOTES_API_KEY environment variable is required");
  process.exit(1);
}

// --- Database setup ---

const dbPath = join(process.env.DATA_DIR || __dirname, "notes.db");
const db = new Database(dbPath);
db.pragma("journal_mode = WAL");

db.exec(`
  CREATE TABLE IF NOT EXISTS notes (
    id TEXT PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    date TEXT NOT NULL,
    tags TEXT NOT NULL DEFAULT '[]',
    summary TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now'))
  )
`);

// --- Read the built index.html once at startup ---

const indexHtmlPath = join(__dirname, "dist", "index.html");
let INDEX_HTML_TEMPLATE = "";
try {
  INDEX_HTML_TEMPLATE = fs.readFileSync(indexHtmlPath, "utf-8");
} catch {
  console.warn("dist/index.html not found - meta injection disabled until build");
}

// --- HTML escape helper ---

function escapeHtml(str) {
  if (!str) return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

// --- Safe JSON-LD serializer (prevents </script> breakout) ---

function safeJsonLd(obj) {
  return JSON.stringify(obj).replace(/</g, "\\u003c");
}

// --- Meta tag injection helper ---

function injectMeta(html, meta) {
  // Use replacer functions (not replacement strings) to avoid $& pattern issues
  html = html.replace(
    /<title>[^<]*<\/title>/,
    () => `<title>${escapeHtml(meta.title)}</title>`
  );

  html = html.replace(
    /<meta name="description" content="[^"]*"\s*\/?>/,
    () => `<meta name="description" content="${escapeHtml(meta.description)}" />`
  );

  const tags = [];

  if (meta.canonical) {
    tags.push(`<link rel="canonical" href="${escapeHtml(meta.canonical)}" />`);
  }

  // Open Graph
  if (meta.ogTitle) {
    tags.push(`<meta property="og:title" content="${escapeHtml(meta.ogTitle)}" />`);
  }
  if (meta.ogDescription) {
    tags.push(`<meta property="og:description" content="${escapeHtml(meta.ogDescription)}" />`);
  }
  if (meta.ogUrl) {
    tags.push(`<meta property="og:url" content="${escapeHtml(meta.ogUrl)}" />`);
  }
  if (meta.ogType) {
    tags.push(`<meta property="og:type" content="${escapeHtml(meta.ogType)}" />`);
  }
  tags.push(`<meta property="og:site_name" content="Ed Krystosik" />`);

  // Twitter Card
  tags.push(`<meta name="twitter:card" content="summary" />`);
  if (meta.ogTitle) {
    tags.push(`<meta name="twitter:title" content="${escapeHtml(meta.ogTitle)}" />`);
  }
  if (meta.ogDescription) {
    tags.push(`<meta name="twitter:description" content="${escapeHtml(meta.ogDescription)}" />`);
  }

  // JSON-LD (uses safeJsonLd to prevent </script> breakout)
  if (meta.jsonLd) {
    tags.push(`<script type="application/ld+json">${safeJsonLd(meta.jsonLd)}</script>`);
  }

  if (tags.length > 0) {
    html = html.replace("</head>", () => `    ${tags.join("\n    ")}\n  </head>`);
  }

  return html;
}

// --- Middleware ---

app.use(cors());
app.use(express.json());

function requireAuth(req, res, next) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Missing authorization header" });
  }
  const token = header.slice(7);
  if (!crypto.timingSafeEqual(Buffer.from(token), Buffer.from(API_KEY))) {
    return res.status(403).json({ error: "Invalid API key" });
  }
  next();
}

// --- Public API routes ---

app.get("/api/notes", (_req, res) => {
  const notes = db
    .prepare(
      "SELECT id, slug, title, date, tags, summary FROM notes ORDER BY date DESC"
    )
    .all()
    .map((row) => ({ ...row, tags: JSON.parse(row.tags) }));
  res.json(notes);
});

app.get("/api/notes/:slug", (req, res) => {
  const note = db
    .prepare("SELECT * FROM notes WHERE slug = ?")
    .get(req.params.slug);
  if (!note) return res.status(404).json({ error: "Note not found" });
  res.json({ ...note, tags: JSON.parse(note.tags) });
});

// --- Protected routes ---

app.post("/api/notes", requireAuth, (req, res) => {
  const { title, date, tags, summary, content, slug } = req.body;

  if (!title || !summary || !content) {
    return res
      .status(400)
      .json({ error: "title, summary, and content are required" });
  }

  const noteSlug =
    slug ||
    title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  const id = crypto.randomUUID();
  const noteDate = date || new Date().toISOString().split("T")[0];
  const noteTags = JSON.stringify(tags || []);

  try {
    db.prepare(
      `INSERT INTO notes (id, slug, title, date, tags, summary, content)
       VALUES (?, ?, ?, ?, ?, ?, ?)`
    ).run(id, noteSlug, title, noteDate, noteTags, summary, content);

    const note = db.prepare("SELECT * FROM notes WHERE id = ?").get(id);
    res.status(201).json({ ...note, tags: JSON.parse(note.tags) });
  } catch (err) {
    if (err.code === "SQLITE_CONSTRAINT_UNIQUE") {
      return res
        .status(409)
        .json({ error: "A note with that slug already exists" });
    }
    throw err;
  }
});

app.put("/api/notes/:slug", requireAuth, (req, res) => {
  const existing = db
    .prepare("SELECT * FROM notes WHERE slug = ?")
    .get(req.params.slug);
  if (!existing) return res.status(404).json({ error: "Note not found" });

  const { title, date, tags, summary, content } = req.body;
  db.prepare(
    `UPDATE notes SET
       title = coalesce(?, title),
       date = coalesce(?, date),
       tags = coalesce(?, tags),
       summary = coalesce(?, summary),
       content = coalesce(?, content),
       updated_at = datetime('now')
     WHERE slug = ?`
  ).run(
    title || null,
    date || null,
    tags ? JSON.stringify(tags) : null,
    summary || null,
    content || null,
    req.params.slug
  );

  const note = db
    .prepare("SELECT * FROM notes WHERE slug = ?")
    .get(req.params.slug);
  res.json({ ...note, tags: JSON.parse(note.tags) });
});

app.delete("/api/notes/:slug", requireAuth, (req, res) => {
  const result = db
    .prepare("DELETE FROM notes WHERE slug = ?")
    .run(req.params.slug);
  if (result.changes === 0)
    return res.status(404).json({ error: "Note not found" });
  res.json({ deleted: true });
});

// --- Sitemap ---

app.get("/sitemap.xml", (_req, res) => {
  const notes = db
    .prepare("SELECT slug, updated_at, date FROM notes ORDER BY date DESC")
    .all();

  const urls = [
    `  <url>
    <loc>https://edkrystosik.com/</loc>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>`,
    `  <url>
    <loc>https://edkrystosik.com/notes</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`,
    ...notes.map((n) => {
      const lastmod = (n.updated_at || n.date || "").split("T")[0];
      const encodedSlug = encodeURIComponent(n.slug).replace(/%2F/g, "/");
      return `  <url>
    <loc>https://edkrystosik.com/notes/${encodedSlug}</loc>${lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ""}
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`;
    }),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>`;

  res.set("Content-Type", "application/xml");
  res.send(xml);
});

// --- SEO meta injection routes (before static files + SPA catch-all) ---

// Homepage: /
app.get("/", (_req, res) => {
  if (!INDEX_HTML_TEMPLATE) {
    return res.sendFile(indexHtmlPath);
  }

  const html = injectMeta(INDEX_HTML_TEMPLATE, {
    title: "Ed Krystosik \u2014 CAIO, Founder, Builder",
    description:
      "Ed Krystosik \u2014 CAIO at RAC/AI, founder of Audity. Helping consultants add AI transformation audits to their practice.",
    canonical: "https://edkrystosik.com",
    ogTitle: "Ed Krystosik",
    ogDescription:
      "CAIO at RAC/AI, founder of Audity. Helping consultants add AI transformation audits to their practice.",
    ogUrl: "https://edkrystosik.com",
    ogType: "website",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Ed Krystosik",
      url: "https://edkrystosik.com",
      description:
        "CAIO at RAC/AI, founder of Audity. Helping consultants add AI transformation audits to their practice.",
      author: {
        "@type": "Person",
        name: "Ed Krystosik",
        url: "https://edkrystosik.com",
      },
    },
  });

  res.send(html);
});

// Blog post: /notes/:slug
app.get("/notes/:slug", (req, res) => {
  if (!INDEX_HTML_TEMPLATE) {
    return res.sendFile(indexHtmlPath);
  }

  const note = db
    .prepare("SELECT slug, title, date, summary FROM notes WHERE slug = ?")
    .get(req.params.slug);

  // Not found in DB - send the SPA shell (React handles the 404 redirect)
  if (!note) {
    return res.send(INDEX_HTML_TEMPLATE);
  }

  const url = `https://edkrystosik.com/notes/${note.slug}`;

  const html = injectMeta(INDEX_HTML_TEMPLATE, {
    title: `${note.title} | Ed Krystosik`,
    description: note.summary,
    canonical: url,
    ogTitle: note.title,
    ogDescription: note.summary,
    ogUrl: url,
    ogType: "article",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: note.title,
      description: note.summary,
      datePublished: note.date,
      url: url,
      author: {
        "@type": "Person",
        name: "Ed Krystosik",
        url: "https://edkrystosik.com",
      },
      publisher: {
        "@type": "Person",
        name: "Ed Krystosik",
        url: "https://edkrystosik.com",
      },
    },
  });

  res.send(html);
});

// Blog index: /notes
app.get("/notes", (_req, res) => {
  if (!INDEX_HTML_TEMPLATE) {
    return res.sendFile(indexHtmlPath);
  }

  const html = injectMeta(INDEX_HTML_TEMPLATE, {
    title: "Notes | Ed Krystosik",
    description:
      "Thoughts on building, AI strategy, and consulting. Working notes from Ed Krystosik.",
    canonical: "https://edkrystosik.com/notes",
    ogTitle: "Notes | Ed Krystosik",
    ogDescription:
      "Thoughts on building, AI strategy, and consulting. Working notes from Ed Krystosik.",
    ogUrl: "https://edkrystosik.com/notes",
    ogType: "website",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Notes",
      description:
        "Thoughts on building, AI strategy, and consulting. Working notes from Ed Krystosik.",
      url: "https://edkrystosik.com/notes",
      author: {
        "@type": "Person",
        name: "Ed Krystosik",
        url: "https://edkrystosik.com",
      },
    },
  });

  res.send(html);
});

// --- Static files (production) ---

app.use(express.static(join(__dirname, "dist")));

// SPA catch-all (all other routes)
app.get("/{*splat}", (_req, res) => {
  res.sendFile(join(__dirname, "dist", "index.html"));
});

// --- Start ---

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on 0.0.0.0:${PORT}`);
});
