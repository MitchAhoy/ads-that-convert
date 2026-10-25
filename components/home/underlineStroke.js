// Hand-drawn pen underline for the blue accent phrase in hero H1s and final
// CTA headings (DESIGN.md §16.3). Each stroke is generated from a seed (the
// accent text, or a per-page seed), so no two headlines share the same mark:
// thin where the pen lands, thicker through the middle, a slight wobble, and
// usually a flick up at the end. Same seed, same stroke, so SSR stays stable.

const W = 400;
const H = 28;
const SAMPLES = 56;

function hash(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

// mulberry32: small seeded PRNG.
function random(seed) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const between = (r, min, max) => min + r() * (max - min);
const round = (n) => Math.round(n * 10) / 10;

function strokePath(seed) {
  const r = random(hash(String(seed)));

  const x0 = between(r, 3, 8);
  const x1 = between(r, 390, 396);
  const yStart = between(r, 18.5, 21);
  const rise = between(r, 3, 8);
  const lift = r() < 0.8 ? between(r, 4, 9) : between(r, 0.5, 2);
  const flickFrom = between(r, 0.78, 0.88);
  const waves = [
    { a: between(r, 0.6, 1.5), f: between(r, 0.8, 1.8), p: between(r, 0, Math.PI * 2) },
    { a: between(r, 0.2, 0.7), f: between(r, 2.2, 4), p: between(r, 0, Math.PI * 2) },
  ];
  const minW = between(r, 1.5, 2.4);
  const maxW = between(r, 5, 6.8);
  const peak = between(r, 0.75, 1.3);
  const pulse = { f: between(r, 1.2, 2.4), p: between(r, 0, Math.PI * 2) };

  const centre = (t) => {
    const f = Math.min(1, Math.max(0, (t - flickFrom) / (1 - flickFrom)));
    const wobble = waves.reduce((sum, w) => sum + w.a * Math.sin(Math.PI * 2 * w.f * t + w.p), 0);
    return [x0 + (x1 - x0) * t, yStart - rise * t + wobble * (1 - f) - lift * f * f];
  };
  const width = (t) => {
    const envelope = Math.pow(Math.sin(Math.PI * Math.pow(t, peak)), 0.6);
    const vary = 0.78 + 0.22 * Math.sin(Math.PI * 2 * pulse.f * t + pulse.p);
    return minW + (maxW - minW) * envelope * vary;
  };

  const top = [];
  const bottom = [];
  for (let i = 0; i <= SAMPLES; i++) {
    const t = i / SAMPLES;
    const [x, y] = centre(t);
    const [ax, ay] = centre(Math.max(0, t - 0.001));
    const [bx, by] = centre(Math.min(1, t + 0.001));
    const len = Math.hypot(bx - ax, by - ay) || 1;
    const nx = -(by - ay) / len;
    const ny = (bx - ax) / len;
    const half = width(t) / 2;
    top.push([x - nx * half, y - ny * half]);
    bottom.push([x + nx * half, y + ny * half]);
  }

  const pt = ([x, y]) => `${round(x)} ${round(y)}`;
  const capEnd = width(1) / 2;
  const capStart = width(0) / 2;
  return [
    `M${pt(top[0])}`,
    ...top.slice(1).map((p) => `L${pt(p)}`),
    `A${round(capEnd)} ${round(capEnd)} 0 0 1 ${pt(bottom[SAMPLES])}`,
    ...bottom.slice(0, -1).reverse().map((p) => `L${pt(p)}`),
    `A${round(capStart)} ${round(capStart)} 0 0 1 ${pt(top[0])}Z`,
  ].join("");
}

const cache = new Map();

// CSS background-image value for the stroke generated from `seed`.
export function underlineImage(seed) {
  const key = String(seed);
  if (!cache.has(key)) {
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${W} ${H}' preserveAspectRatio='none'><path d='${strokePath(key)}' fill='#155eef'/></svg>`;
    cache.set(key, `url("data:image/svg+xml,${encodeURIComponent(svg)}")`);
  }
  return cache.get(key);
}
