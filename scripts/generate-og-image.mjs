import sharp from "sharp";
import { writeFileSync, mkdirSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outPath = join(__dirname, "..", "public", "og-image.png");
mkdirSync(dirname(outPath), { recursive: true });

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0b1220"/>
      <stop offset="100%" stop-color="#1e293b"/>
    </linearGradient>
    <linearGradient id="accent" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#3b82f6"/>
      <stop offset="100%" stop-color="#10b981"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect x="0" y="0" width="1200" height="6" fill="url(#accent)"/>
  <g font-family="Inter, -apple-system, system-ui, sans-serif" fill="#f8fafc">
    <text x="80" y="180" font-size="34" font-weight="500" fill="#94a3b8" letter-spacing="2">ED KRYSTOSIK</text>
    <text x="80" y="290" font-size="78" font-weight="700">CAIO. Founder.</text>
    <text x="80" y="380" font-size="78" font-weight="700">Builder.</text>
    <text x="80" y="480" font-size="32" font-weight="400" fill="#cbd5e1">Notes on AI strategy, consulting, and building Audity.</text>
    <text x="80" y="560" font-size="26" font-weight="500" fill="#10b981">edkrystosik.com</text>
  </g>
</svg>`;

const png = await sharp(Buffer.from(svg)).png().toBuffer();
writeFileSync(outPath, png);
console.log(`Wrote ${outPath} (${png.length} bytes)`);
