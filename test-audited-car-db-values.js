// Checks that selected source-backed car DB rows match audited metadata.

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = __dirname;
const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(fs.readFileSync(path.join(root, 'car-db.js'), 'utf8'), sandbox);
vm.runInContext(fs.readFileSync(path.join(root, 'car-sources.js'), 'utf8'), sandbox);

const cars = sandbox.window.CAR_DB;
const sources = sandbox.window.CAR_SOURCES;

const auditedRows = [
  {
    id: 'toyota_chr_hyb',
    expectedNameIncludes: ['Toyota C-HR', '2.0 Hybrid', 'AWD-i', 'Style'],
    expectedFuel: 'mild_hybrid',
    expectedPrice: 39500,
    expectedCons: 5.0,
    expectedKw: 131,
  },
  {
    id: 'toyota_rav4_hyb',
    expectedNameIncludes: ['Toyota RAV4', '2.5 Hybrid', 'AWD-i', 'Style'],
    expectedFuel: 'mild_hybrid',
    expectedPrice: 46900,
    expectedCons: 5.6,
    expectedKw: 143,
  },
  {
    id: 'skoda_octavia_20tdi',
    expectedNameIncludes: ['Skoda Octavia', '2.0 TDI', 'DSG'],
    expectedFuel: 'diesel',
    expectedPrice: 32620,
    expectedCons: 4.7,
    expectedKw: 110,
  },
  {
    id: 'skoda_octavia_rs',
    expectedNameIncludes: ['Skoda Octavia', 'RS', '2.0 TSI', '265'],
    expectedFuel: 'petrol',
    expectedPrice: 39010,
    expectedCons: 7.1,
    expectedKw: 195,
  },
  {
    id: 'vw_id3_pro',
    expectedNameIncludes: ['VW ID.3', 'Pro'],
    expectedFuel: 'ev',
    expectedPrice: 46050,
    expectedCons: 15.8,
    expectedKw: 150,
  },
  {
    id: 'vw_idbuzz',
    expectedNameIncludes: ['VW ID. Buzz', 'Pro', 'NWB'],
    expectedFuel: 'ev',
    expectedPrice: 53666,
    expectedCons: 20.8,
    expectedKw: 210,
  },
];

for (const row of auditedRows) {
  const car = cars.find((candidate) => candidate.id === row.id);
  const source = sources[row.id];
  assert.ok(car, `${row.id} exists in CAR_DB`);
  assert.ok(source, `${row.id} exists in CAR_SOURCES`);
  assert.equal(source.status, 'mismatch', `${row.id} source status documents the stale DB mismatch`);
  assert.equal(car.price, row.expectedPrice, `${row.id} price matches audited source`);
  assert.equal(car.price, source.currentPrice, `${row.id} price matches CAR_SOURCES currentPrice`);
  assert.equal(car.fuel, row.expectedFuel, `${row.id} fuel class stays compatible with existing calculator categories`);
  assert.equal(car.cons, row.expectedCons, `${row.id} consumption matches audited source`);
  assert.equal(car.kw, row.expectedKw, `${row.id} kW matches audited source`);
  for (const namePart of row.expectedNameIncludes) {
    assert.match(car.name, new RegExp(namePart.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')), `${row.id} name includes ${namePart}`);
  }
}

console.log('test-audited-car-db-values.js: all assertions passed');
