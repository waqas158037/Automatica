// Flat SVG illustrations used as placeholder imagery.
// Every image the site shows is generated here, so nothing licensed is shipped.
// Replace any file in /images with a real photo of the same name (see README).

const C = { navy: "#0b2a4a", navy2: "#12385f", orange: "#ff7a00", steel: "#9fb0c3", light: "#dfe6ee", white: "#ffffff", dark: "#06121f", yellow: "#ffc107" };

// Object drawings, each fits a 400x300 box centred around (200,170).
export const drawings = {
  barrier: `
    <rect x="60" y="150" width="46" height="120" rx="6" fill="${C.navy}"/>
    <rect x="66" y="160" width="34" height="18" rx="3" fill="${C.orange}"/>
    <circle cx="83" cy="150" r="10" fill="${C.steel}"/>
    <g><rect x="83" y="143" width="270" height="14" rx="7" fill="${C.white}" stroke="${C.navy}" stroke-width="2"/>
    ${[0,1,2,3,4,5].map(i=>`<rect x="${110+i*42}" y="143" width="20" height="14" fill="${C.orange}"/>`).join("")}</g>
    <rect x="345" y="230" width="10" height="40" fill="${C.steel}"/><rect x="335" y="225" width="30" height="8" rx="3" fill="${C.navy}"/>
    <rect x="40" y="268" width="330" height="6" rx="3" fill="${C.steel}" opacity=".5"/>`,
  slidingGate: `
    <rect x="40" y="110" width="14" height="160" fill="${C.navy}"/><rect x="346" y="110" width="14" height="160" fill="${C.navy}"/>
    <rect x="70" y="120" width="250" height="140" rx="4" fill="none" stroke="${C.navy2}" stroke-width="8"/>
    ${Array.from({length:11},(_,i)=>`<rect x="${84+i*21}" y="124" width="6" height="132" fill="${C.navy2}"/>`).join("")}
    <rect x="70" y="182" width="250" height="6" fill="${C.navy2}"/>
    <rect x="290" y="236" width="44" height="30" rx="4" fill="${C.orange}"/><circle cx="312" cy="251" r="6" fill="${C.white}"/>
    <rect x="30" y="268" width="340" height="6" rx="3" fill="${C.steel}"/>
    <path d="M330 150 l18 -8 M330 160 h20 M330 170 l18 8" stroke="${C.orange}" stroke-width="4" stroke-linecap="round"/>`,
  shutter: `
    <rect x="80" y="70" width="240" height="30" rx="6" fill="${C.navy}"/>
    <rect x="90" y="100" width="220" height="150" fill="${C.light}"/>
    ${Array.from({length:9},(_,i)=>`<rect x="90" y="${100+i*14}" width="220" height="11" fill="${i%2?C.steel:"#c4d0dc"}"/>`).join("")}
    <rect x="90" y="226" width="220" height="10" fill="${C.orange}"/>
    <rect x="76" y="70" width="14" height="200" fill="${C.navy2}"/><rect x="310" y="70" width="14" height="200" fill="${C.navy2}"/>
    <rect x="60" y="268" width="280" height="6" rx="3" fill="${C.steel}"/>
    <rect x="330" y="150" width="24" height="40" rx="5" fill="${C.navy}"/><circle cx="342" cy="162" r="4" fill="${C.orange}"/><circle cx="342" cy="176" r="4" fill="${C.white}"/>`,
  door: `
    <rect x="120" y="60" width="160" height="210" rx="4" fill="${C.navy}"/>
    <rect x="134" y="74" width="132" height="196" fill="#c94f00"/>
    <rect x="134" y="74" width="132" height="196" fill="${C.orange}" opacity=".9"/>
    <rect x="152" y="96" width="96" height="60" rx="4" fill="${C.white}" opacity=".85"/>
    <rect x="152" y="176" width="96" height="70" rx="4" fill="none" stroke="${C.white}" stroke-width="3" opacity=".7"/>
    <rect x="242" y="168" width="22" height="8" rx="4" fill="${C.navy}"/>
    <path d="M182 118 l10 -8 l10 8 l10 -8" stroke="${C.navy}" stroke-width="3" fill="none"/>
    <rect x="90" y="268" width="220" height="6" rx="3" fill="${C.steel}"/>`,
  slidingDoor: `
    <rect x="60" y="66" width="280" height="26" rx="5" fill="${C.navy}"/>
    <rect x="72" y="92" width="256" height="176" fill="${C.navy2}"/>
    <rect x="86" y="96" width="100" height="168" fill="#bfe3ff" opacity=".75" stroke="${C.steel}" stroke-width="4"/>
    <rect x="214" y="96" width="100" height="168" fill="#bfe3ff" opacity=".75" stroke="${C.steel}" stroke-width="4"/>
    <path d="M150 180 h-30 m8 -8 l-8 8 l8 8 M250 180 h30 m-8 -8 l8 8 l-8 8" stroke="${C.orange}" stroke-width="4" fill="none" stroke-linecap="round"/>
    <circle cx="200" cy="79" r="6" fill="${C.orange}"/>
    <rect x="50" y="268" width="300" height="6" rx="3" fill="${C.steel}"/>`,
  swingGate: `
    <rect x="50" y="100" width="18" height="170" fill="${C.navy}"/><rect x="332" y="100" width="18" height="170" fill="${C.navy}"/>
    <path d="M68 120 L196 150 L196 262 L68 262 Z" fill="none" stroke="${C.navy2}" stroke-width="7"/>
    <path d="M332 120 L204 150 L204 262 L332 262 Z" fill="none" stroke="${C.navy2}" stroke-width="7"/>
    ${Array.from({length:5},(_,i)=>`<rect x="${86+i*22}" y="${125+i*5}" width="5" height="${137-i*5}" fill="${C.navy2}"/><rect x="${309-i*22}" y="${125+i*5}" width="5" height="${137-i*5}" fill="${C.navy2}"/>`).join("")}
    <rect x="72" y="190" width="70" height="12" rx="6" fill="${C.orange}"/><rect x="258" y="190" width="70" height="12" rx="6" fill="${C.orange}"/>
    <rect x="30" y="268" width="340" height="6" rx="3" fill="${C.steel}"/>`,
  blocker: `
    <rect x="70" y="236" width="260" height="34" rx="4" fill="${C.navy}"/>
    <path d="M90 236 L130 170 L310 170 L310 236 Z" fill="${C.yellow}"/>
    ${[0,1,2,3,4].map(i=>`<path d="M${140+i*36} 170 l-24 66 h16 l24 -66 z" fill="${C.dark}"/>`).join("")}
    <rect x="130" y="160" width="180" height="12" fill="${C.navy2}"/>
    <rect x="40" y="268" width="320" height="6" rx="3" fill="${C.steel}"/>`,
  spikes: `
    <rect x="50" y="228" width="300" height="36" rx="5" fill="${C.navy}"/>
    ${Array.from({length:9},(_,i)=>`<path d="M${70+i*32} 228 l12 -42 l12 42 z" fill="${i%2?C.orange:C.steel}"/>`).join("")}
    <rect x="50" y="246" width="300" height="6" fill="${C.yellow}"/>
    <rect x="30" y="268" width="340" height="6" rx="3" fill="${C.steel}"/>`,
  turnstile: `
    <rect x="130" y="110" width="80" height="160" rx="10" fill="${C.navy}"/>
    <rect x="140" y="122" width="60" height="26" rx="4" fill="#bfe3ff" opacity=".8"/>
    <circle cx="210" cy="180" r="14" fill="${C.steel}"/>
    <rect x="210" y="174" width="130" height="12" rx="6" fill="${C.steel}" transform="rotate(-12 210 180)"/>
    <rect x="210" y="174" width="110" height="12" rx="6" fill="${C.light}" transform="rotate(110 210 180)"/>
    <rect x="144" y="160" width="16" height="16" rx="3" fill="#22c55e"/>
    <rect x="100" y="268" width="250" height="6" rx="3" fill="${C.steel}"/>`,
  reader: `
    <rect x="130" y="60" width="140" height="190" rx="18" fill="${C.navy}"/>
    <rect x="146" y="78" width="108" height="70" rx="8" fill="${C.navy2}"/>
    <path d="M178 112 a24 24 0 0 1 44 0 M186 120 a14 14 0 0 1 28 0" stroke="${C.orange}" stroke-width="5" fill="none" stroke-linecap="round"/>
    <circle cx="200" cy="128" r="5" fill="${C.orange}"/>
    ${[0,1,2].map(r=>[0,1,2].map(c=>`<rect x="${156+c*30}" y="${164+r*24}" width="24" height="18" rx="4" fill="${C.steel}"/>`).join("")).join("")}
    <rect x="186" y="250" width="28" height="22" fill="${C.navy2}"/>`,
  dock: `
    <rect x="40" y="90" width="120" height="180" fill="${C.navy}"/>
    <rect x="52" y="102" width="96" height="120" fill="${C.light}"/>
    ${Array.from({length:7},(_,i)=>`<rect x="52" y="${102+i*17}" width="96" height="3" fill="${C.steel}"/>`).join("")}
    <path d="M160 222 L330 238 L330 252 L160 252 Z" fill="${C.steel}"/>
    <rect x="160" y="252" width="170" height="18" fill="${C.navy2}"/>
    <rect x="150" y="226" width="14" height="30" rx="3" fill="${C.dark}"/>
    <rect x="240" y="170" width="110" height="60" rx="6" fill="${C.orange}"/><rect x="254" y="180" width="40" height="22" rx="3" fill="${C.white}" opacity=".7"/>
    <circle cx="262" cy="236" r="12" fill="${C.dark}"/><circle cx="328" cy="236" r="12" fill="${C.dark}"/>`,
  detector: `
    <path d="M110 270 V90 a12 12 0 0 1 12 -12 H278 a12 12 0 0 1 12 12 V270" fill="none" stroke="${C.navy}" stroke-width="26"/>
    <rect x="160" y="84" width="80" height="20" rx="4" fill="${C.navy2}"/>
    ${[0,1,2,3,4].map(i=>`<rect x="171" y="${120+i*28}" width="5" height="16" fill="${C.orange}"/><rect x="224" y="${120+i*28}" width="5" height="16" fill="${C.orange}"/>`).join("")}
    <circle cx="200" cy="94" r="5" fill="#22c55e"/>
    <rect x="80" y="268" width="240" height="6" rx="3" fill="${C.steel}"/>`,
  uvss: `
    <rect x="40" y="236" width="320" height="22" rx="4" fill="${C.navy}"/>
    ${[0,1,2,3].map(i=>`<rect x="${80+i*70}" y="240" width="40" height="12" rx="3" fill="#bfe3ff"/>`).join("")}
    <path d="M90 200 h220 l20 30 H70 z" fill="${C.steel}"/>
    <path d="M120 200 l30 -40 h110 l30 40 z" fill="${C.light}"/>
    <circle cx="120" cy="232" r="16" fill="${C.dark}"/><circle cx="280" cy="232" r="16" fill="${C.dark}"/>
    <path d="M120 248 l-30 22 M200 248 v22 M280 248 l30 22" stroke="${C.orange}" stroke-width="3" stroke-dasharray="5 5"/>`,
  pc: `
    <rect x="80" y="70" width="240" height="160" rx="12" fill="${C.navy}"/>
    <rect x="96" y="86" width="208" height="128" rx="6" fill="${C.navy2}"/>
    <polyline points="110,190 150,150 185,170 230,118 290,140" fill="none" stroke="${C.orange}" stroke-width="5" stroke-linejoin="round"/>
    ${[0,1,2,3].map(i=>`<rect x="${112+i*48}" y="98" width="36" height="8" rx="3" fill="${C.steel}" opacity=".6"/>`).join("")}
    <rect x="180" y="230" width="40" height="26" fill="${C.navy2}"/><rect x="140" y="256" width="120" height="12" rx="6" fill="${C.navy}"/>`,
  sensor: `
    <rect x="120" y="120" width="160" height="90" rx="16" fill="${C.navy}"/>
    <circle cx="170" cy="165" r="26" fill="${C.navy2}"/><circle cx="170" cy="165" r="14" fill="${C.orange}"/>
    <circle cx="240" cy="150" r="7" fill="#22c55e"/><circle cx="240" cy="176" r="7" fill="${C.steel}"/>
    <path d="M110 165 a60 60 0 0 1 0 -1 M95 140 a40 40 0 0 0 0 50 M75 125 a64 64 0 0 0 0 80" stroke="${C.orange}" stroke-width="5" fill="none" stroke-linecap="round"/>
    <rect x="190" y="210" width="20" height="50" fill="${C.steel}"/><rect x="160" y="258" width="80" height="12" rx="5" fill="${C.navy2}"/>`,
  steelDoor: `
    <rect x="70" y="60" width="260" height="210" rx="4" fill="${C.navy}"/>
    <rect x="84" y="74" width="114" height="196" fill="#c9d3dd"/><rect x="202" y="74" width="114" height="196" fill="#b6c3d0"/>
    <rect x="100" y="94" width="82" height="70" fill="none" stroke="${C.steel}" stroke-width="4"/><rect x="218" y="94" width="82" height="70" fill="none" stroke="${C.steel}" stroke-width="4"/>
    <rect x="100" y="180" width="82" height="70" fill="none" stroke="${C.steel}" stroke-width="4"/><rect x="218" y="180" width="82" height="70" fill="none" stroke="${C.steel}" stroke-width="4"/>
    <rect x="186" y="160" width="8" height="26" rx="3" fill="${C.orange}"/><rect x="206" y="160" width="8" height="26" rx="3" fill="${C.orange}"/>
    <rect x="50" y="268" width="300" height="6" rx="3" fill="${C.steel}"/>`,
  exitDoor: `
    <rect x="110" y="60" width="180" height="210" rx="4" fill="${C.navy}"/>
    <rect x="124" y="74" width="152" height="196" fill="#d33b2c"/>
    <rect x="132" y="170" width="136" height="14" rx="7" fill="${C.steel}"/>
    <rect x="150" y="84" width="100" height="36" rx="4" fill="#16a34a"/>
    <path d="M172 110 l10 -16 l10 6 l6 10 M196 94 h22 m-6 -6 l6 6 l-6 6" stroke="${C.white}" stroke-width="3" fill="none" stroke-linecap="round"/>
    <rect x="80" y="268" width="240" height="6" rx="3" fill="${C.steel}"/>`,
  card: `
    <rect x="90" y="96" width="220" height="140" rx="16" fill="${C.navy}" transform="rotate(-8 200 166)"/>
    <rect x="110" y="110" width="220" height="140" rx="16" fill="${C.orange}"/>
    <rect x="132" y="134" width="44" height="34" rx="6" fill="${C.yellow}"/>
    <path d="M264 150 a26 26 0 0 1 0 40 M278 140 a42 42 0 0 1 0 60" stroke="${C.white}" stroke-width="5" fill="none" stroke-linecap="round"/>
    <rect x="132" y="200" width="110" height="10" rx="5" fill="${C.white}" opacity=".85"/><rect x="132" y="218" width="70" height="8" rx="4" fill="${C.white}" opacity=".6"/>`,
  parking: `
    <rect x="50" y="200" width="300" height="70" fill="${C.navy2}"/>
    ${[0,1,2,3].map(i=>`<rect x="${70+i*72}" y="206" width="4" height="58" fill="${C.white}"/>`).join("")}
    <path d="M90 216 h50 l8 22 h-66 z" fill="${C.orange}"/><circle cx="96" cy="242" r="7" fill="${C.dark}"/><circle cx="134" cy="242" r="7" fill="${C.dark}"/>
    <rect x="250" y="70" width="90" height="70" rx="10" fill="${C.navy}"/>
    <text x="295" y="122" font-family="Poppins,Arial" font-size="50" font-weight="800" fill="${C.white}" text-anchor="middle">P</text>
    <rect x="290" y="140" width="10" height="60" fill="${C.steel}"/>
    <rect x="160" y="96" width="70" height="40" rx="6" fill="${C.dark}"/><text x="195" y="123" font-family="Arial" font-size="20" font-weight="700" fill="#22c55e" text-anchor="middle">12</text>`,
  fence: `
    ${Array.from({length:8},(_,i)=>`<rect x="${50+i*44}" y="110" width="8" height="160" fill="${C.navy}"/>`).join("")}
    <rect x="46" y="130" width="316" height="6" fill="${C.navy2}"/><rect x="46" y="230" width="316" height="6" fill="${C.navy2}"/>
    <path d="M46 110 ${Array.from({length:16},(_,i)=>`L${56+i*20} ${i%2?100:118}`).join(" ")}" stroke="${C.steel}" stroke-width="3" fill="none"/>
    <rect x="160" y="60" width="44" height="30" rx="6" fill="${C.orange}"/><circle cx="182" cy="75" r="8" fill="${C.dark}"/>
    <path d="M204 75 L300 150 L240 160 Z" fill="${C.orange}" opacity=".18"/>
    <rect x="30" y="268" width="340" height="6" rx="3" fill="${C.steel}"/>`,
  road: `
    <path d="M150 270 L190 90 H210 L250 270 Z" fill="${C.navy2}"/>
    ${[0,1,2,3].map(i=>`<rect x="197" y="${110+i*42}" width="6" height="22" fill="${C.yellow}"/>`).join("")}
    <path d="M90 270 l20 -70 l20 70 z" fill="${C.orange}"/><rect x="96" y="232" width="28" height="8" fill="${C.white}"/>
    <path d="M280 270 l20 -70 l20 70 z" fill="${C.orange}"/><rect x="286" y="232" width="28" height="8" fill="${C.white}"/>
    <rect x="300" y="80" width="56" height="56" rx="6" fill="${C.yellow}" transform="rotate(45 328 108)"/>
    <text x="328" y="118" font-family="Arial" font-size="30" font-weight="900" fill="${C.dark}" text-anchor="middle">!</text>`,
  visitor: `
    <rect x="110" y="70" width="180" height="200" rx="14" fill="${C.navy}"/>
    <rect x="176" y="58" width="48" height="24" rx="6" fill="${C.steel}"/>
    <circle cx="200" cy="140" r="34" fill="${C.light}"/><circle cx="200" cy="130" r="14" fill="${C.navy2}"/><path d="M174 162 a26 22 0 0 1 52 0" fill="${C.navy2}"/>
    <rect x="140" y="194" width="120" height="12" rx="6" fill="${C.orange}"/>
    <rect x="152" y="216" width="96" height="8" rx="4" fill="${C.steel}"/><rect x="164" y="232" width="72" height="8" rx="4" fill="${C.steel}"/>`,
  person: `
    <circle cx="200" cy="120" r="46" fill="${C.light}"/>
    <path d="M200 76 a46 46 0 0 1 44 34 h-88 a46 46 0 0 1 44 -34" fill="${C.yellow}"/>
    <rect x="150" y="104" width="100" height="10" rx="5" fill="${C.orange}"/>
    <path d="M110 280 a90 80 0 0 1 180 0 z" fill="${C.navy}"/>
    <path d="M176 200 l24 30 l24 -30" fill="none" stroke="${C.orange}" stroke-width="8" stroke-linejoin="round"/>`,
  wrench: `
    <path d="M250 80 a50 50 0 0 0 -62 62 L100 230 a20 20 0 0 0 28 28 L216 170 a50 50 0 0 0 62 -62 l-30 30 l-24 -6 l-6 -24 z" fill="${C.navy}"/>
    <circle cx="114" cy="244" r="7" fill="${C.orange}"/>
    <rect x="240" y="196" width="80" height="80" rx="40" fill="${C.orange}"/><path d="M262 236 l12 12 l24 -26" stroke="${C.white}" stroke-width="7" fill="none" stroke-linecap="round"/>`,
  factory: `
    <path d="M40 270 V150 l70 40 v-40 l70 40 v-40 l70 40 V90 h40 v40 h20 v140 z" fill="${C.navy}"/>
    ${[0,1,2,3,4].map(i=>`<rect x="${64+i*56}" y="210" width="30" height="26" rx="3" fill="${C.orange}" opacity="${i%2?.75:1}"/>`).join("")}
    <circle cx="270" cy="70" r="14" fill="${C.steel}" opacity=".5"/><circle cx="290" cy="52" r="18" fill="${C.steel}" opacity=".35"/>
    <rect x="30" y="268" width="340" height="6" rx="3" fill="${C.steel}"/>`,
  handshake: `
    <path d="M60 170 l60 -40 l50 14 l40 -14 l70 30 l60 -20 v80 l-60 20 l-30 30 a14 14 0 0 1 -20 -2 l-8 8 a14 14 0 0 1 -20 -4 l-8 6 a14 14 0 0 1 -20 -6 l-8 4 a14 14 0 0 1 -18 -10 L60 230 z" fill="${C.navy}"/>
    <path d="M170 144 l-40 34 a14 14 0 0 0 20 18 l40 -26 l60 50" fill="none" stroke="${C.orange}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>`,
  news: `
    <rect x="90" y="70" width="220" height="200" rx="12" fill="${C.navy}"/>
    <rect x="110" y="92" width="180" height="70" rx="6" fill="${C.orange}"/>
    ${[0,1,2,3].map(i=>`<rect x="110" y="${178+i*20}" width="${i===3?110:180}" height="10" rx="5" fill="${C.steel}"/>`).join("")}`,
  award: `
    <circle cx="200" cy="140" r="70" fill="${C.orange}"/><circle cx="200" cy="140" r="52" fill="none" stroke="${C.white}" stroke-width="5"/>
    <path d="M200 106 l10 22 l24 3 l-18 16 l5 24 l-21 -12 l-21 12 l5 -24 l-18 -16 l24 -3 z" fill="${C.white}"/>
    <path d="M150 196 l-20 76 l30 -14 l18 26 l18 -78 M250 196 l20 76 l-30 -14 l-18 26 l-18 -78" fill="${C.navy}"/>`,
  demo: `
    <rect x="70" y="70" width="260" height="170" rx="14" fill="${C.navy}"/>
    <rect x="86" y="86" width="228" height="138" rx="8" fill="${C.navy2}"/>
    <circle cx="200" cy="155" r="34" fill="${C.orange}"/><path d="M190 137 v36 l30 -18 z" fill="${C.white}"/>
    <rect x="150" y="240" width="100" height="14" rx="7" fill="${C.steel}"/>`,
  shield: `
    <path d="M200 60 l100 36 v70 c0 60 -44 96 -100 116 c-56 -20 -100 -56 -100 -116 v-70 z" fill="${C.navy}"/>
    <path d="M200 84 l76 28 v54 c0 46 -32 74 -76 90 z" fill="${C.navy2}"/>
    <path d="M160 170 l28 28 l54 -58" stroke="${C.orange}" stroke-width="14" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`,
};

const xe = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
const hash = (s) => [...s].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7);

/** Light product-style image (square). */
export function productSvg(drawing, label) {
  const h = hash(label);
  const tint = ["#eef2f6", "#f3efe9", "#eaf0f5", "#f1f3f6"][h % 4];
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" role="img" aria-label="${xe(label)}">
  <rect width="600" height="600" fill="${tint}"/>
  <circle cx="300" cy="300" r="230" fill="#ffffff"/>
  <circle cx="300" cy="300" r="230" fill="none" stroke="${C.orange}" stroke-opacity=".18" stroke-width="2" stroke-dasharray="6 10"/>
  <ellipse cx="300" cy="455" rx="190" ry="16" fill="${C.navy}" opacity=".08"/>
  <g transform="translate(100 110) scale(1)">${drawings[drawing] || drawings.shield}</g>
</svg>`;
}

/** Dark scene image (wide) for heroes, banners and cards. */
export function sceneSvg(drawing, label, w = 1600, h = 900, align = "right") {
  const s = Math.min(w / 400, h / 300) * 0.78;
  const ox = align === "right" ? w - 400 * s - w * 0.06 : align === "center" ? (w - 400 * s) / 2 : w * 0.06;
  const oy = (h - 300 * s) / 2 + h * 0.04;
  const g = hash(label) % 2 ? C.navy : "#0a2038";
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid slice" role="img" aria-label="${xe(label)}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${C.dark}"/><stop offset="1" stop-color="${g}"/></linearGradient>
    <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse"><path d="M48 0H0V48" fill="none" stroke="#ffffff" stroke-opacity=".05"/></pattern>
    <radialGradient id="glow" cx="${align === "left" ? 0.25 : 0.72}" cy="0.5" r="0.5"><stop offset="0" stop-color="${C.orange}" stop-opacity=".28"/><stop offset="1" stop-color="${C.orange}" stop-opacity="0"/></radialGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#bg)"/>
  <rect width="${w}" height="${h}" fill="url(#grid)"/>
  <rect width="${w}" height="${h}" fill="url(#glow)"/>
  <path d="M0 ${h * 0.86} L${w} ${h * 0.74} V${h} H0 Z" fill="#ffffff" fill-opacity=".03"/>
  <g transform="translate(${ox} ${oy}) scale(${s})" opacity=".96">${drawings[drawing] || drawings.shield}</g>
</svg>`;
}

/** Neutral logo tile for brand/client slots. */
export function logoSvg(text) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 120" role="img" aria-label="${xe(text)}"><rect width="240" height="120" fill="#ffffff"/><text x="120" y="68" font-family="Poppins,Arial,sans-serif" font-size="20" font-weight="700" fill="#9aa1aa" text-anchor="middle" letter-spacing="2">${xe(text)}</text></svg>`;
}
