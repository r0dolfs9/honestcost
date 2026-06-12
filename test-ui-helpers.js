// HonestCost UI helper tests.
// Loads pure helper functions from index.html so UI behavior stays tied to the shipped file.

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
const match = html.match(/function eur\(n\)[\s\S]*?function renderResults/);
const pickerMatch = html.match(/const CAR_DB_SRC[\s\S]*?function initCarPicker/);

assert.ok(match, 'Could not find render helper block in index.html');
assert.ok(pickerMatch, 'Could not find lazy car DB helper block in index.html');
assert.equal(/<script\s+src=["']car-db\.js["']/.test(html), false, 'car-db.js should not be loaded eagerly in the head');

const context = {
  window: {
    CAR_SOURCES: {
      toyota_yaris_hyb: { status: 'verified', checkedAt: '2026-06-10' },
      tesla_m3_rwd: { status: 'mismatch', checkedAt: '2026-06-01' },
      dacia_duster: { status: 'needs_mapping', checkedAt: '2026-06-10' },
    },
  },
  document: {
    createElement() {
      return {
        _text: '',
        set textContent(value) {
          this._text = String(value || '');
          this.innerHTML = this._text
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
        },
        get textContent() {
          return this._text;
        },
        innerHTML: '',
      };
    },
  },
};

const helperSource = match[0].replace(/function renderResults$/, '');
vm.runInNewContext(`${helperSource}
globalThis.__helpers = {
  carImageUrl,
  carModelFamily,
  carVisualMarkup,
  isDebugMode,
  parseFlags,
  hasFlag,
  debugRows,
  savedScenarioTitle,
  buildSavedScenario,
  normalizeSavedScenarios,
  upsertSavedScenario,
  encodeShareState,
  decodeShareState,
  carSourceStatus,
  sourceBadgeMarkup,
  assumptionKindLabel,
  assumptionInfo,
  assumptionDetailMarkup,
};
`, context);

const {
  carImageUrl,
  carModelFamily,
  carVisualMarkup,
  isDebugMode,
  parseFlags,
  hasFlag,
  debugRows,
  savedScenarioTitle,
  buildSavedScenario,
  normalizeSavedScenarios,
  upsertSavedScenario,
  encodeShareState,
  decodeShareState,
  carSourceStatus,
  sourceBadgeMarkup,
  assumptionKindLabel,
  assumptionInfo,
  assumptionDetailMarkup,
} = context.__helpers;

const lazyContext = {};
const lazySource = pickerMatch[0].replace(/function initCarPicker$/, '');
vm.runInNewContext(`${lazySource}
globalThis.__lazy = {
  CAR_DB_SRC,
  carDbReady,
};
`, lazyContext);

assert.equal(lazyContext.__lazy.CAR_DB_SRC, 'car-db.js');
assert.equal(lazyContext.__lazy.carDbReady(), false, 'carDbReady should be false before CAR_DB exists');

const car = {
  name: 'BMW X1 xDrive20i M Sport',
  brand: 'BMW',
  body: 'suv',
  fuel: 'petrol',
  price: 48900,
  co2: 191,
  cons: 8.4,
};

assert.equal(carModelFamily(car), 'x1', 'model family should ignore trims and engine text');
assert.equal(carImageUrl({ ...car, photoUrl: ' https://example.test/car.jpg ' }), 'https://example.test/car.jpg');
assert.equal(carImageUrl(car), '', 'cars without a supplied URL should use the built-in visual fallback');

const fallback = carVisualMarkup({ ...car, photoUrl: '' }, 'A', 'photo-box');
assert.match(fallback, /class="car-visual/);
assert.match(fallback, /BMW X1/);
assert.match(fallback, /car-shape/);
assert.doesNotMatch(fallback, /data-lucide="image"/);

assert.equal(isDebugMode('?debug=1'), true);
assert.equal(isDebugMode('?debug=true'), true);
assert.equal(isDebugMode('?foo=1'), false);

assert.equal(parseFlags('?flags=alpha,Beta%20,').join('|'), 'alpha|beta', 'flags parse, trim, and lowercase');
assert.equal(parseFlags('?foo=1').length, 0, 'no flags param means no flags');
assert.equal(hasFlag('beta', '?flags=alpha,beta'), true);
assert.equal(hasFlag('gamma', '?flags=alpha,beta'), false);
assert.equal(hasFlag('alpha', '?debug=1'), false);

const rows = debugRows({
  total: 54000,
  monthly: 900,
  bd: { leasing: 33000, fuel: 9000 },
  res: [{ y: 0, v: 48900 }, { y: 5, v: 21000 }],
});
assert.ok(rows.some(row => row[0] === 'Monthly' && row[1] === 900));
assert.ok(rows.some(row => row[0] === 'Residual Y5' && row[1] === 21000));

const saved = buildSavedScenario(
  { name: 'BMW 118i', price: 38500 },
  { name: 'BMW X1', price: 48900 },
  { yrs: 5, km: 15000, fin: 'leasing' },
  new Date('2026-05-27T10:30:00Z'),
);
assert.equal(saved.title, 'BMW 118i pret BMW X1 · 5 gadi · 15 000 km/g');
assert.equal(saved.id, '2026-05-27T10:30:00.000Z');
assert.equal(savedScenarioTitle(saved), saved.title);

assert.equal(normalizeSavedScenarios(null).length, 0);
assert.equal(normalizeSavedScenarios({}).length, 0);
assert.equal(normalizeSavedScenarios([{ id: 'a', title: 'A', A: {}, B: {}, G: {} }]).length, 1);

const merged = upsertSavedScenario(
  Array.from({ length: 20 }, (_, i) => ({ id: String(i), title: String(i), A: {}, B: {}, G: {} })),
  saved,
);
assert.equal(merged[0], saved);
assert.equal(merged.length, 20);
assert.equal(merged.some(item => item.id === '19'), false);

// Share-state round trip
const shareA = { name: 'VW ID.3 Pro', price: 46050, ft: 'ev', dep: 'ev', cons: 15.8, tyre: 'suv', repair: 'med', kasko: 2.5 };
const shareB = { name: 'Skoda Octavia 2.0 TDI', price: 32620, ft: 'diesel', dep: 'mid', cons: 4.7, tyre: 'mid', repair: 'med', kasko: 2.5 };
const shareG = { yrs: 5, km: 15000, fin: 'leasing', downPct: 20, apr: 4.5, months: 60, resPct: 10 };
const hash = encodeShareState(shareA, shareB, shareG);
assert.match(hash, /^#s=/, 'share hash uses the #s= prefix');
const decoded = decodeShareState(hash);
assert.ok(decoded, 'share hash decodes');
assert.equal(decoded.A.name, 'VW ID.3 Pro');
assert.equal(decoded.B.price, 32620);
assert.equal(decoded.G.km, 15000);
assert.equal(decodeShareState(''), null, 'empty hash returns null');
assert.equal(decodeShareState('#foo'), null, 'unknown hash format returns null');
assert.equal(decodeShareState('#s=%7Bbroken'), null, 'malformed JSON returns null');
assert.equal(decodeShareState('#s=' + encodeURIComponent('{"v":1,"A":{}}')), null, 'missing B/G returns null');

assert.equal(
  JSON.stringify(carSourceStatus({ id: 'toyota_yaris_hyb', name: 'Toyota Yaris Hybrid' })),
  JSON.stringify({ tone: 'verified', label: 'Avots pārbaudīts', detail: '2026-06-10' }),
  'verified source metadata should produce a verified badge model',
);
assert.equal(
  carSourceStatus({ id: 'tesla_m3_rwd', name: 'Tesla Model 3' }).tone,
  'warning',
  'mismatch source metadata should produce a warning badge model',
);
assert.equal(
  carSourceStatus({ name: 'Manual entry' }).tone,
  'estimate',
  'manual cars without row metadata should be labelled as estimates',
);
assert.match(
  sourceBadgeMarkup({ id: 'toyota_yaris_hyb', name: 'Toyota Yaris Hybrid' }),
  /source-badge verified/,
  'source badge markup should expose the verified class',
);

// Assumption inspector helpers
const inspCar = { price: 124500, cons: 6.8, co2: 178, octa: 300, kasko: 2.5, tyre: 'large', repair: 'med', svcInt: 25000, park: 0, wash: 20, fuelPr: null, ewPrice: 0 };
const inspG = { yrs: 5, km: 15000, fin: 'leasing', downPct: 20, apr: 4.5, months: 48, resPct: 20 };

assert.equal(assumptionKindLabel('statutory'), 'Likumā noteikts');
assert.equal(assumptionKindLabel('unknown-kind'), 'Aplēse', 'unknown kinds fall back to a safe label');

const allKeys = ['leasing', 'fuel', 'service', 'tyres', 'octa', 'kasko', 'ten', 'ew', 'repair', 'park'];
for (const key of allKeys) {
  const info = assumptionInfo(key, inspCar, inspG);
  assert.ok(info && info.formula && info.kind && info.edit, `assumptionInfo covers '${key}'`);
}
assert.equal(assumptionInfo('nope', inspCar, inspG), null, 'unknown cost keys return null');

assert.equal(assumptionInfo('ten', inspCar, inspG).kind, 'statutory', 'TEN is a statutory rule');
assert.equal(assumptionInfo('repair', inspCar, inspG).kind, 'estimate', 'repair reserve is a model estimate');
assert.equal(assumptionInfo('kasko', inspCar, inspG).kind, 'default', 'KASKO tier is a default assumption');
assert.equal(assumptionInfo('fuel', inspCar, inspG).kind, 'default', 'fuel price without user input is a default');
assert.equal(assumptionInfo('fuel', { ...inspCar, fuelPr: 1.72 }, inspG).kind, 'user', 'user fuel price flips provenance to user');
assert.match(assumptionInfo('leasing', inspCar, inspG).formula, /4\.5% gadā/, 'leasing formula reflects the APR input');
assert.match(assumptionInfo('ten', inspCar, inspG).formula, /178 g\/km/, 'TEN formula reflects the CO2 input');

const inspMarkup = assumptionDetailMarkup('repair', inspCar, inspG);
assert.match(inspMarkup, /insp-chip k-estimate/, 'detail markup exposes the provenance chip');
assert.match(inspMarkup, /Modeļa aplēse/, 'detail markup uses honest estimate language');
assert.equal(assumptionDetailMarkup('nope', inspCar, inspG), '', 'unknown keys render nothing');

// The shipped result table must wire the inspector toggle.
assert.match(html, /toggleInspector\(this\)/, 'cost rows expose the inspector toggle');
assert.match(html, /aria-expanded="false"/, 'inspector toggles start collapsed with an accessible state');

console.log('test-ui-helpers.js: all assertions passed');

