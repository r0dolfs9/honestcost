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
  {
    id: 'toyota_yaris_hyb',
    expectedNameIncludes: ['Toyota Yaris', 'Hybrid 130', 'Style'],
    expectedFuel: 'mild_hybrid',
    expectedPrice: 26700,
    expectedCo2: 95,
    // kW deliberately not asserted: source pages conflict (68 vs 96 kW for Hybrid 130).
  },
  {
    id: 'toyota_yaris_cross_hyb',
    expectedNameIncludes: ['Toyota Yaris Cross', 'Hybrid 130', 'AWD-i', 'Style'],
    expectedFuel: 'mild_hybrid',
    expectedPrice: 30000,
    expectedKw: 96,
    // cons/co2 not asserted: price table has no CO2/consumption columns.
  },
  {
    id: 'toyota_corolla_hyb',
    expectedNameIncludes: ['Toyota Corolla', '1.8 Hybrid', 'Active', 'Sedan'],
    expectedFuel: 'mild_hybrid',
    expectedPrice: 28400,
    expectedCons: 4.4,
    expectedCo2: 100,
    expectedKw: 72,
  },
  {
    id: 'byd_atto3',
    expectedNameIncludes: ['BYD Atto 3', 'EVO'],
    expectedFuel: 'ev',
    expectedPrice: 40990,
    // cons/kW not asserted: carried over from pre-facelift row, unverified.
  },
  {
    id: 'kia_ev3_58',
    expectedNameIncludes: ['Kia EV3', '58.3', 'EX'],
    expectedFuel: 'ev',
    expectedPrice: 39990,
    expectedCons: 14.9,
    expectedKw: 150,
  },
  {
    id: 'ora_03',
    expectedNameIncludes: ['Ora 03', '48 kWh'],
    expectedFuel: 'ev',
    expectedPrice: 29995,
    // kW/cons not asserted: authored pending spec capture.
  },
];

for (const row of auditedRows) {
  const car = cars.find((candidate) => candidate.id === row.id);
  const source = sources[row.id];
  assert.ok(car, `${row.id} exists in CAR_DB`);
  assert.ok(source, `${row.id} exists in CAR_SOURCES`);
  assert.ok(
    ['mismatch', 'verified'].includes(source.status),
    `${row.id} source status is mismatch (resolved stale row) or verified (row created from source)`,
  );
  assert.equal(car.price, row.expectedPrice, `${row.id} price matches audited source`);
  assert.equal(car.price, source.currentPrice, `${row.id} price matches CAR_SOURCES currentPrice`);
  assert.equal(car.fuel, row.expectedFuel, `${row.id} fuel class stays compatible with existing calculator categories`);
  if (row.expectedCons !== undefined) {
    assert.equal(car.cons, row.expectedCons, `${row.id} consumption matches audited source`);
  }
  if (row.expectedCo2 !== undefined) {
    assert.equal(car.co2, row.expectedCo2, `${row.id} CO2 matches audited source`);
  }
  if (row.expectedKw !== undefined) {
    assert.equal(car.kw, row.expectedKw, `${row.id} kW matches audited source`);
  }
  for (const namePart of row.expectedNameIncludes) {
    assert.match(car.name, new RegExp(namePart.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')), `${row.id} name includes ${namePart}`);
  }
}

console.log('test-audited-car-db-values.js: all assertions passed');
