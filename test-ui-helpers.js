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
  debugRows,
  savedScenarioTitle,
  buildSavedScenario,
  normalizeSavedScenarios,
  upsertSavedScenario,
};
`, context);

const {
  carImageUrl,
  carModelFamily,
  carVisualMarkup,
  isDebugMode,
  debugRows,
  savedScenarioTitle,
  buildSavedScenario,
  normalizeSavedScenarios,
  upsertSavedScenario,
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

console.log('test-ui-helpers.js: all assertions passed');
