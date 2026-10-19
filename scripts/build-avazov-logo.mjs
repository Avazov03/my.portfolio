/**
 * Rebuild Anorra horizontal SVG as AVAZOV, reusing exact A + planet-O paths
 * and deriving V (vertical flip of A) + Z in the same palette/stroke language.
 */
import fs from "node:fs";
import path from "node:path";

const src = fs.readFileSync(
  "C:/Users/DUKE/Downloads/anorra-logo-horizontal-primary (2).svg",
  "utf8",
);

const BLUE = {
  from: "#0D3859",
  mid1: "#0F3C5E",
  mid2: "#17486D",
  to: "#1E547D",
};
const GREY = {
  from: "#6D6F71",
  mid1: "#686A6C",
  mid2: "#5B5D5E",
  to: "#47494A",
};

function blueStops() {
  return `
    <stop offset="0" style="stop-color:${BLUE.to}"/>
    <stop offset="0.2862" style="stop-color:${BLUE.mid2}"/>
    <stop offset="0.68" style="stop-color:${BLUE.mid1}"/>
    <stop offset="1" style="stop-color:${BLUE.from}"/>`;
}

function greyStops() {
  return `
    <stop offset="0" style="stop-color:${GREY.from}"/>
    <stop offset="0.3072" style="stop-color:${GREY.mid1}"/>
    <stop offset="0.6618" style="stop-color:${GREY.mid2}"/>
    <stop offset="1" style="stop-color:${GREY.to}"/>`;
}

function blueGradLR() {
  return `
    <stop offset="0" style="stop-color:${BLUE.from}"/>
    <stop offset="1" style="stop-color:${BLUE.to}"/>`;
}

/** Right-facing A from original (apex x≈993.5). Returns markup with local coords shifted so apex X = 0. */
function letterA(gid, dx) {
  // Original apex at 993.5 — shift so apex lands at dx
  const s = 993.5;
  const t = (x) => +(x - s + dx).toFixed(1);
  return `
  <g id="letter-A-${gid}">
    <polygon fill="#6D6F71" points="${t(978.8)},270.6 ${t(993.5)},264.9 ${t(993.5)},240.3"/>
    <polygon fill="#47494A" points="${t(1008.1)},270.6 ${t(993.5)},264.9 ${t(993.5)},240.3"/>
    <linearGradient id="A${gid}_main" gradientUnits="userSpaceOnUse" x1="${t(925.95)}" y1="210.0516" x2="${t(1052.5)}" y2="323.5682">
      ${blueGradLR()}
    </linearGradient>
    <polygon fill="url(#A${gid}_main)" points="${t(993.9)},277.6 ${t(1030.4)},289.4 ${t(993.5)},213.1 ${t(956.2)},291.3 ${t(934.8)},303.4 ${t(993.5)},185.2 ${t(1050.2)},297.3 ${t(1059.4)},315.7"/>
    <polygon fill="#0D3859" points="${t(1047.5)},303.8 ${t(993.9)},277.6 ${t(1030.4)},289.4"/>
    <polygon fill="#1E547D" points="${t(1047.5)},303.8 ${t(1030.4)},289.4 ${t(993.5)},213.1"/>
  </g>`;
}

/**
 * V = vertical flip of A around letter mid-Y (250), then shift so apex (bottom) X = dx.
 * A apex was at y=185.2 → after flip around 250: y' = 500 - y = 314.8 (bottom tip).
 * Mid Y of letter ≈ 250.
 */
function letterV(gid, dx) {
  const s = 993.5;
  const flipY = (y) => +(500 - y).toFixed(1);
  const t = (x) => +(x - s + dx).toFixed(1);
  const pts = (...pairs) =>
    pairs
      .map(([x, y]) => `${t(x)},${flipY(y)}`)
      .join(" ");

  return `
  <g id="letter-V-${gid}">
    <polygon fill="#6D6F71" points="${pts([978.8, 270.6], [993.5, 264.9], [993.5, 240.3])}"/>
    <polygon fill="#47494A" points="${pts([1008.1, 270.6], [993.5, 264.9], [993.5, 240.3])}"/>
    <linearGradient id="V${gid}_main" gradientUnits="userSpaceOnUse" x1="${t(925.95)}" y1="${flipY(210.0516)}" x2="${t(1052.5)}" y2="${flipY(323.5682)}">
      ${blueGradLR()}
    </linearGradient>
    <polygon fill="url(#V${gid}_main)" points="${pts(
      [993.9, 277.6],
      [1030.4, 289.4],
      [993.5, 213.1],
      [956.2, 291.3],
      [934.8, 303.4],
      [993.5, 185.2],
      [1050.2, 297.3],
      [1059.4, 315.7],
    )}"/>
    <polygon fill="#0D3859" points="${pts([1047.5, 303.8], [993.9, 277.6], [1030.4, 289.4])}"/>
    <polygon fill="#1E547D" points="${pts([1047.5, 303.8], [1030.4, 289.4], [993.5, 213.1])}"/>
  </g>`;
}

/**
 * Z: Anorra R top-bar geometry (navy) at top + vertically mirrored for bottom,
 * grey N-weight diagonal in between — same palette, disconnected segments.
 */
function letterZ(gid, dx) {
  const s = 717.1;
  const tx = (x) => +(x - s + dx).toFixed(1);
  const fy = (y) => +(500 - y).toFixed(1); // mirror around mid like V

  // Top bar (original R top), shifted to dx
  const top = `M${tx(717.1)},203.5H${tx(657)}l-8.4-12.8h66.5c10.9,0,19.9,8.9,19.9,19.9c0,1.2-0.1,2.4-0.3,3.5
      C${tx(731.3)},207.8,${tx(724.7)},203.5,${tx(717.1)},203.5z`;

  // Bottom = same bar flipped on Y (becomes lower rail of Z)
  const bot = `M${tx(717.1)},${fy(203.5)}H${tx(657)}l-8.4,12.8h66.5c10.9,0,19.9-8.9,19.9-19.9c0-1.2-0.1-2.4-0.3-3.5
      C${tx(731.3)},${fy(207.8)},${tx(724.7)},${fy(203.5)},${tx(717.1)},${fy(203.5)}z`;

  // Short grey diagonal (Anorra N stroke weight ~14)
  const x1 = dx + 28;
  const x0 = dx - 28;

  return `
  <g id="letter-Z-${gid}">
    <linearGradient id="Z${gid}_top" gradientUnits="userSpaceOnUse" x1="${tx(648.63)}" y1="202.3694" x2="${tx(734.99)}" y2="202.3694">
      ${blueStops()}
    </linearGradient>
    <path fill="url(#Z${gid}_top)" d="${top}"/>
    <linearGradient id="Z${gid}_diag" gradientUnits="userSpaceOnUse" x1="${x0}" y1="215" x2="${x1}" y2="285">
      ${greyStops()}
    </linearGradient>
    <polygon fill="url(#Z${gid}_diag)" points="${x1},218 ${x1 + 14},228 ${x0},282 ${x0 - 14},272"/>
    <linearGradient id="Z${gid}_bot" gradientUnits="userSpaceOnUse" x1="${tx(648.63)}" y1="${fy(202.3694)}" x2="${tx(734.99)}" y2="${fy(202.3694)}">
      ${blueStops()}
    </linearGradient>
    <path fill="url(#Z${gid}_bot)" d="${bot}"/>
  </g>`;
}

/** Planet O from original, shifted so its visual center (~536) moves to dx. */
function letterO(dx) {
  const ox = 536; // approx center of O in original
  const shift = dx - ox;
  // Re-read O paths from source and apply translate via group
  const oMatch = src.match(/<g>\s*<linearGradient id="SVGID_10_"[\s\S]*?<\/g>\s*<\/g>/);
  if (!oMatch) throw new Error("Could not extract O group from source SVG");
  // The O is the second inner <g> under Logo — extract between SVGID_10_ block start and its closing
  // Simpler: hardcode transform of the known O markup with rewritten IDs
  return `
  <g id="letter-O" transform="translate(${shift.toFixed(1)},0)">
    <linearGradient id="O_ring1" gradientUnits="userSpaceOnUse" x1="453.7372" y1="278.5008" x2="599.2136" y2="170.383">
      ${blueGradLR()}
    </linearGradient>
    <path fill="url(#O_ring1)" d="M618.9,191.5c-0.3-0.5-1.3-0.8-2.8-0.8c-1.8,0-4.2,0.4-7.2,1.3c-6.3,1.8-12.8,2.6-19.4,2.6
      c-8.9,0-17.6-1.6-25.9-4.8c-7.6-3.6-16-5.6-24.9-5.6c-32.2,0-58.3,26.1-58.3,58.3c0,11.4,3.3,22,8.9,31l0.1,0
      c3.6-1.7,7.6-3.8,11.8-6.1l0.1,0c-4.7-7.1-7.5-15.6-7.5-24.8c0-24.8,20.1-44.9,44.9-44.9c9.1,0,17.6,2.7,24.7,7.4
      c3.5,2.3,6.6,5.1,9.3,8.2c0,0,0,0.1,0,0.1c5.2,8.7-7.3,21.2-18.9,29.1c0,0-0.1,0-0.1,0.1c-9.1,7.2-19.9,14.6-27.7,19.6
      c0,0-2.7,1.6-6.5,3.8l0,0c-3.8,2.2-8.6,5-13.3,7.6c-4.8,2.7-9.3,5.2-12,6.6c0,0-0.1,0-0.1,0c-0.5,0.3-0.9,0.5-1.3,0.6
      c-6.1,2.9-14.3,6.3-18.7,6.3c-1.6,0-2.7-0.5-3.3-1.4c-0.9-1.4-1.1-4.3,7.6-12.4c0.4-0.4,0.5-1.1,0.2-1.6
      c-0.2-0.4-0.6-0.6-1.1-0.6c-0.2,0-0.5,0.1-0.8,0.3c-2.5,2.2-4.8,4.2-6.8,6.1c-9.9,9.5-12.4,14.5-11.5,16c0.3,0.5,1.3,0.8,2.8,0.8
      c3.4,0,9.1-1.5,16.5-4.4c5-1.9,10.7-4.5,17.1-7.6c0.2-0.1,0.5-0.2,0.7-0.4c0,0,0.1,0,0.1,0c4-2,8.1-4.1,12.4-6.4
      c2.6-1.4,5.3-2.9,8-4.4c9.5-5.3,19.4-11.3,29.4-17.6c9.9-6.3,19.5-12.8,28.4-19.2c2.5-1.8,5-3.6,7.4-5.4c3.9-2.9,7.6-5.8,11-8.5
      c0,0,0.1,0,0.1-0.1c0.2-0.2,0.4-0.3,0.6-0.5C616,201.4,620.1,193.4,618.9,191.5z"/>
    <linearGradient id="O_ring2" gradientUnits="userSpaceOnUse" x1="612.0524" y1="181.3927" x2="455.3593" y2="287.2842">
      ${blueGradLR()}
    </linearGradient>
    <path fill="url(#O_ring2)" d="M593.3,219.7c-0.2,0.2-0.5,0.4-0.7,0.6c-3.4,2.8-7.1,5.6-11,8.5c-2.4,1.8-4.9,3.6-7.4,5.4
      c-8.9,6.4-18.5,12.9-28.4,19.2c-9.9,6.3-19.8,12.3-29.4,17.6c-2.7,1.5-5.4,3-8,4.4c-4.3,2.3-8.4,4.4-12.4,6.4
      c-0.3,0.1-0.5,0.3-0.8,0.4c-6.4,3.1-12.1,5.7-17.1,7.6c-7.4,2.9-13.1,4.4-16.5,4.4c-1.5,0-2.4-0.3-2.8-0.8
      c-0.9-1.4,1.5-6.5,11.5-16c2-1.9,4.3-4,6.8-6.1c0.3-0.2,0.6-0.3,0.8-0.3c0.4,0,0.8,0.2,1.1,0.6c0.3,0.5,0.2,1.2-0.2,1.6
      c-8.7,8.2-8.5,11-7.6,12.4c0.6,0.9,1.7,1.4,3.3,1.4c4.4,0,12.6-3.4,18.7-6.3c0.4-0.2,0.8-0.4,1.4-0.7c2.7-1.4,7.2-3.9,12-6.6
      c4.6-2.6,9.5-5.4,13.3-7.6l0,0c42.1-22.9,73.5-48.1,78.6-58.1c6.3-12.2-16-9.2-37.6-19.2c0.5,0.2,1,0.4,1.6,0.7
      c8.8,3.6,18,5.4,27.4,5.4c6.5,0,13.1-0.9,19.4-2.6c3-0.8,5.4-1.3,7.2-1.3c1.5,0,2.4,0.3,2.8,0.8
      C620.1,193.4,616,201.4,593.3,219.7z"/>
    <path opacity="0.5" fill="#FFFFFF" d="M515.4,280.8c1.7,1,3.5,2,5.3,2.8C518.9,282.8,517.1,281.9,515.4,280.8L515.4,280.8z"/>
    <linearGradient id="O_body" gradientUnits="userSpaceOnUse" x1="502.1021" y1="264.5946" x2="597.0966" y2="264.5946">
      ${greyStops()}
    </linearGradient>
    <path fill="url(#O_body)" d="M595.4,228.4L595.4,228.4l-12,9.1l0,0c0.2,1.7,0.3,3.3,0.3,5c0,24.8-20.1,44.9-44.9,44.9
      c-6.4,0-12.5-1.3-18.1-3.8c-1.8-0.8-3.6-1.8-5.3-2.8l0,0l-13.3,7c10,8.1,22.8,13,36.7,13c32.2,0,58.3-26.1,58.3-58.3
      C597.1,237.7,596.5,232.9,595.4,228.4z"/>
  </g>`;
}

// Layout: apex/centers for AVAZOV — keep Anorra rhythm (~130–150 pitch)
const centers = {
  A1: 180,
  V1: 340,
  A2: 500,
  Z: 650,
  O: 820,
  V2: 1000,
};

const out = `<?xml version="1.0" encoding="utf-8"?>
<!-- AVAZOV wordmark derived from Anorra horizontal primary (Adobe Illustrator paths).
     A and planet-O are original geometry; V is A flipped on Y; Z matches palette/stroke language. -->
<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
  x="0px" y="0px" viewBox="0 0 1180 500" xml:space="preserve" role="img" aria-label="AVAZOV">
<title>AVAZOV</title>
<g id="Logo">
${letterA(1, centers.A1)}
${letterV(1, centers.V1)}
${letterA(2, centers.A2)}
${letterZ(1, centers.Z)}
${letterO(centers.O)}
${letterV(2, centers.V2)}
</g>
</svg>
`;

const outPath = path.resolve("public/brand/avazov-wordmark.svg");
fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, out);

// Side-by-side preview
const preview = `<!DOCTYPE html>
<html lang="uz">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1"/>
  <title>AVAZOV logo preview</title>
  <style>
    * { box-sizing: border-box; }
    body {
      margin: 0; min-height: 100vh;
      background: #050505;
      color: #c8c8c8;
      font-family: ui-sans-serif, system-ui, sans-serif;
      display: grid;
      place-items: center;
      gap: 2rem;
      padding: 2rem;
    }
    h1 { font-size: 0.85rem; letter-spacing: 0.25em; text-transform: uppercase; font-weight: 500; opacity: 0.7; margin: 0 0 1rem; }
    section { width: min(920px, 100%); }
    .frame {
      background: #000;
      border: 1px solid #1a1a1a;
      border-radius: 12px;
      padding: 2.5rem 2rem;
    }
    .frame img, .frame object { width: 100%; height: auto; display: block; }
    .row { display: grid; gap: 1.5rem; }
    @media (min-width: 800px) { .row { grid-template-columns: 1fr 1fr; } }
    a { color: #6ea8d8; }
  </style>
</head>
<body>
  <section class="row">
    <div>
      <h1>Anorra (asl)</h1>
      <div class="frame">
        <img src="./anorra-reference.svg" alt="ANORRA original"/>
      </div>
    </div>
    <div>
      <h1>Avazov (yangi)</h1>
      <div class="frame">
        <img src="./avazov-wordmark.svg" alt="AVAZOV wordmark"/>
      </div>
    </div>
  </section>
  <p style="font-size:12px;opacity:0.5">Lokal: <a href="/brand/preview.html">/brand/preview.html</a></p>
</body>
</html>`;

fs.copyFileSync(
  "C:/Users/DUKE/Downloads/anorra-logo-horizontal-primary (2).svg",
  path.resolve("public/brand/anorra-reference.svg"),
);
fs.writeFileSync(path.resolve("public/brand/preview.html"), preview);
console.log("Wrote", outPath);
