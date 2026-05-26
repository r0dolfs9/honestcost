// HonestCost calc-engine smoke tests.
// Loads the production calc functions from index.html so tests track the shipped file.

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
const match = html.match(/const DEP=[\s\S]*?\/\/ .* READ FORM/);

assert.ok(match, 'Could not find calc engine block in index.html');

const context = {};
vm.runInNewContext(`${match[0]}
globalThis.__calc = {
  ten,
  leasing,
  operationalLeasing,
  residual,
  kasko,
  service,
  repairBuf,
  fuelAnnual,
  calcAll,
};
`, context);

const {
  ten,
  leasing,
  operationalLeasing,
  residual,
  service,
  repairBuf,
  fuelAnnual,
  calcAll,
} = context.__calc;

function approx(actual, expected, tolerance, label) {
  assert.ok(
    Math.abs(actual - expected) <= tolerance,
    `${label}: expected ${actual} to be within ${tolerance} of ${expected}`,
  );
}

const baseCar = {
  name: 'BMW 118i test',
  price: 38500,
  dep: 'premium',
  ft: 'petrol',
  cons: 6.2,
  co2: 142,
  w: 3,
  ew: false,
  svcInt: 15000,
  svcCost: 280,
  octa: 110,
  kasko: 2.5,
  tyre: 'mid',
  repair: 'med',
  park: 0,
  wash: 20,
};

const evCar = {
  ...baseCar,
  name: 'EV test',
  price: 45000,
  dep: 'ev',
  ft: 'ev',
  cons: 18,
  co2: 0,
  evHome: 70,
  fuelPr: null,
};

const phevCar = {
  ...baseCar,
  name: 'PHEV test',
  dep: 'phev',
  ft: 'phev',
  cons: 0,
  co2: 35,
  phevEl: 18,
  phevPet: 5.5,
  phevShare: 60,
  evHome: 70,
  fuelPr: null,
};

const globalFiveYear = {
  yrs: 5,
  km: 15000,
  fin: 'leasing',
  downPct: 20,
  apr: 4.5,
  months: 60,
  resPct: 10,
};

assert.equal(ten(0), 0, 'EV/low CO2 TEN should be zero');
assert.equal(ten(96), 50, 'CO2 just above 95 should use the next TEN bracket');
assert.equal(ten(250), 380, 'CO2 250 should use the high TEN bracket');
assert.equal(ten(251), 520, 'CO2 above 250 should use the top TEN bracket');

const zeroApr = leasing(30000, 20, 0, 48, 10);
assert.equal(Math.round(zeroApr.mp), 438, '0% APR leasing should divide financed PV by months');
assert.equal(Math.round(zeroApr.total), 24000, 'financial leasing total should include balloon residual');

const fin = leasing(40000, 20, 4.5, 60, 35);
const op = operationalLeasing(40000, 20, 4.5, 60, 35);
assert.ok(op.mp < fin.mp, 'operational leasing monthly should be lower than financial leasing monthly');
assert.equal(op.ownsAtEnd, false, 'operational leasing should not own the car at term end');

assert.ok(residual(30000, 'premium', 5) < residual(30000, 'premium', 1), 'residual should decrease over time');
assert.equal(service(5000, 1, 15000, 300), 0, 'current production service model is mileage-only');
assert.equal(repairBuf('med', 3, 'premium', 3), 0, 'repair buffer should be zero during warranty');
assert.ok(repairBuf('med', 3, 'premium', 4) > 0, 'repair buffer should start after warranty');

assert.ok(fuelAnnual(evCar, 15000) < fuelAnnual(baseCar, 15000), 'EV energy cost should be lower than petrol in base assumptions');
assert.ok(fuelAnnual(phevCar, 15000) > 0, 'PHEV mixed energy cost should be positive');

const result = calcAll(baseCar, globalFiveYear);
approx(result.monthly * 60, result.total, 0.01, 'monthly total reconstruction');
assert.equal(Object.keys(result.bd).length, 10, 'breakdown should expose the 10 expected categories');
assert.ok(result.bd.leasing > result.bd.fuel, 'base case leasing should exceed fuel cost');
assert.equal(result.res.length, 6, '5-year result should include year 0 through year 5 residuals');

console.log('test-calc.js: all assertions passed');
