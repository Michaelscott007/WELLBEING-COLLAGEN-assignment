import fs from 'node:fs';

const html = fs.readFileSync(new URL('../dist/index.html', import.meta.url), 'utf8');
const checks = [
  ['Clinical Confidence is the only visible direction', /\.labbar,\.ritual,\.guided,\.proofpage,\.fast\{display:none!important\}/],
  ['three complementary products are present', /class="pairing-card"/g, 3],
  ['branded routine picker is present', /id="routinePickerButton"/],
  ['four routine picker options are present', /class="routine-option/g, 4],
  ['five visual payment methods are present', /class="payment-method"/g, 5],
  ['floating peptide badge is hidden', /\.visual:after\{display:none\}/],
  ['A/B assignment is instrumented', /cta-priority-v1/],
  ['header bag uses an icon', /class="cart"[^>]*>[\s\S]*?<svg/],
  ['sticky bag uses an icon', /id="stickyCart"[^>]*>[\s\S]*?<svg/],
  ['sticky bar offers Add', /class="add">Add<\/button>/],
  ['sticky bar offers Buy now', /class="buy"[^>]*>Buy now<\/button>/],
  ['mobile thumb-zone layout is defined', /"info info info select select cart" "add add add buy buy buy"/],
];

const failures = [];
for (const [label, pattern, expected] of checks) {
  if (expected) {
    const count = (html.match(pattern) || []).length;
    if (count !== expected) failures.push(`${label}: expected ${expected}, found ${count}`);
  } else if (!pattern.test(html)) failures.push(label);
}

if (failures.length) {
  console.error(`FAIL: ${failures.join('; ')}`);
  process.exit(1);
}

console.log('PASS: focused Clinical Confidence commerce journey is present');
