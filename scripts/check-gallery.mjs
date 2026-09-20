import { readFile } from "node:fs/promises";

const html = await readFile("dist/index.html", "utf8");
const galleryHosts = (html.match(/data-gallery/g) || []).length;
const requiredSignals = [
  [galleryHosts >= 5, `expected a gallery in all 5 concepts, found ${galleryHosts}`],
  [/const gallerySlides\s*=\s*\[/.test(html), "missing gallery slide data"],
  [/pointerdown/.test(html) && /pointerup/.test(html), "missing pointer swipe handlers"],
  [/touch-action:\s*pan-y/.test(html), "gallery does not preserve vertical page scrolling"],
  [/class="brand-logo"/.test(html), "official brand logo is not represented"],
];

const failures = requiredSignals.filter(([pass]) => !pass).map(([, message]) => message);
if (failures.length) {
  console.error(`FAIL: ${failures.join("; ")}`);
  process.exit(1);
}
console.log("PASS: branded galleries expose multiple slides and swipe controls");
