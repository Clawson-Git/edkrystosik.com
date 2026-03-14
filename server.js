import express from "express";
import cors from "cors";
import Database from "better-sqlite3";
import crypto from "crypto";
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

// --- Public routes ---

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

// --- Static files (production) ---

app.use(express.static(join(__dirname, "dist")));
app.get("/{*splat}", (_req, res) => {
  res.sendFile(join(__dirname, "dist", "index.html"));
});

// --- Start ---

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on 0.0.0.0:${PORT}`);
});
