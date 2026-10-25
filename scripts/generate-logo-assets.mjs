// Regenerates every logo file in /public from one definition of the mark.
// Run from the repo root: `node scripts/generate-logo-assets.mjs`
//
// Writes: favicon.svg, favicon.png (32), favicon.ico (16/32/48),
// apple-touch-icon.png (180), logo-512.png (schema.org logo), logo.svg
// (mark + wordmark) and email-logo.png (the email header, shown at 172x16).
// The site nav draws the same mark inline in components/home/HomeNavbar.jsx.

import { readFile, writeFile } from "node:fs/promises";
import sharp from "sharp";

const INK = "#0E0F11"; // hp-ink
const ACCENT = "#155EEF"; // hp-accent, the conversion dot on white
const ACCENT_ON_INK = "#5B8BF7"; // lighter blue so the dot holds up on ink tiles

// The shape's bounding box inside its 0–100 drawing space.
const BOX = { x: 13, y: 30, w: 69, h: 47 };

function mark({ x, y, height, ink, accent, endRadius = 8 }) {
  const s = height / BOX.h;
  const tx = x - BOX.x * s;
  const ty = y - BOX.y * s;
  return `<g transform="translate(${tx.toFixed(3)} ${ty.toFixed(3)}) scale(${s.toFixed(5)})">
<path d="M28 62 L52 40 L74 58" fill="none" stroke="${ink}" stroke-width="11" stroke-linecap="round" stroke-linejoin="round"/>
<circle cx="28" cy="62" r="15" fill="${ink}"/>
<circle cx="52" cy="40" r="10" fill="${ink}"/>
<circle cx="74" cy="58" r="${endRadius}" fill="${accent}"/>
</g>`;
}

// Square ink tile with a white mark, centred. `fill` is the share of the
// tile's width the mark takes up.
function tileSvg(size, { fill, radius = 0, endRadius = 8 }) {
  const w = size * fill;
  const h = (w * BOX.h) / BOX.w;
  const body = mark({
    x: (size - w) / 2,
    y: (size - h) / 2,
    height: h,
    ink: "#FFFFFF",
    accent: ACCENT_ON_INK,
    endRadius,
  });
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}"><rect width="${size}" height="${size}" rx="${radius}" fill="${INK}"/>${body}</svg>`;
}

const png = (svg, size) =>
  sharp(Buffer.from(svg), { density: 72 * Math.max(1, 512 / size) })
    .resize(size, size)
    .png()
    .toBuffer();

// ICO with PNG-encoded images (supported by every current browser).
function ico(images) {
  const header = Buffer.alloc(6 + 16 * images.length);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);
  let offset = header.length;
  images.forEach(({ size, data }, i) => {
    const e = 6 + 16 * i;
    header.writeUInt8(size >= 256 ? 0 : size, e);
    header.writeUInt8(size >= 256 ? 0 : size, e + 1);
    header.writeUInt16LE(1, e + 4);
    header.writeUInt16LE(32, e + 6);
    header.writeUInt32LE(data.length, e + 8);
    header.writeUInt32LE(offset, e + 12);
    offset += data.length;
  });
  return Buffer.concat([header, ...images.map((img) => img.data)]);
}

// Wordmark lockup. The wordmark glyph outlines are read from the existing
// logo.svg (its last <path>), so no font is needed to render it.
async function lockupSvg() {
  const current = await readFile("public/logo.svg", "utf8");
  const paths = [...current.matchAll(/<path[^>]*\sd="([^"]{2000,})"/g)];
  if (!paths.length) throw new Error("Couldn't find the wordmark path in public/logo.svg");
  const wordmark = paths.at(-1)[1];

  // Wordmark spans x 67.4–346.76, ascenders 8.96 to baseline 38.24.
  const markX = 6.24;
  const markH = 30;
  const markW = (markH * BOX.w) / BOX.h;
  const gap = 19.5;
  const shift = markX + markW + gap - 67.4;
  const markY = 38.6 - markH; // bottom of the big dot sits on the baseline
  const vb = { x: 5.74, y: 7.6, w: 346.76 + shift + 0.5 - 5.74, h: 31.6 };

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${(vb.w / 2).toFixed(1)}" height="${vb.h / 2}" viewBox="${vb.x} ${vb.y} ${vb.w.toFixed(2)} ${vb.h}" role="img" aria-label="adsthatconvert"><title>adsthatconvert</title>${mark({ x: markX, y: markY, height: markH, ink: INK, accent: ACCENT })}<g transform="translate(${shift.toFixed(2)} 0)"><path fill="${INK}" d="${wordmark}"/></g></svg>`;
}

const favicon32 = tileSvg(32, { fill: 0.75, radius: 8, endRadius: 9 });
await writeFile("public/favicon.svg", favicon32);
await writeFile("public/favicon.png", await png(favicon32, 32));

const icoImages = [];
for (const size of [16, 32, 48]) {
  const svg = tileSvg(size, { fill: size === 16 ? 0.82 : 0.74, radius: size / 4, endRadius: 9 });
  icoImages.push({ size, data: await png(svg, size) });
}
await writeFile("public/favicon.ico", ico(icoImages));

await writeFile("public/apple-touch-icon.png", await png(tileSvg(180, { fill: 0.62 }), 180));
await writeFile("public/logo-512.png", await png(tileSvg(512, { fill: 0.6 }), 512));

const lockup = await lockupSvg();
await writeFile("public/logo.svg", lockup);
// Email header: shown at 172x16, rendered at 2x.
await writeFile(
  "public/email-logo.png",
  await sharp(Buffer.from(lockup), { density: 300 }).resize(344, 32, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer(),
);

console.log("Logo assets written to /public");
