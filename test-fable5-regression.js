// HonestCost FABLE5 regression checks.
// Protects the required BMW 740d vs Porsche 911 baseline against redesign churn.

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = __dirname;
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const calcBlock = html.match(/const DEP=[\s\S]*?\/\/ .* READ FORM/);

assert.ok(calcBlock, 'Could not find calc engine block in index.html');

const calcContext = {};
vm.runInNewContext(`${calcBlock[0]}
globalThis.__calc = { calcAll, octaEstimate };
`, calcContext);

const dbContext = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(root, 'car-db.js'), 'utf8'), dbContext);

const { calcAll, octaEstimate } = calcContext.__calc;
const db = dbContext.window.CAR_DB;

function dbCar(id) {
  const row = db.find(car => car.id === id);
  assert.ok(row, `Missing car-db row ${id}`);
  return {
    name: row.name,
    price: row.price,
    dep: row.segment,
    ft: row.fuel,
    cons: row.cons,
    co2: row.co2,
    cc: row.cc,
    kw: row.kw || 0,
    w: row.warranty,
    ew: false,
    svcInt: row.svcInt,
    svcCost: row.svcCost,
    octa: octaEstimate(row.cc, row.kw || 0, row.fuel),
    kasko: 2.5,
    tyre: row.tyre,
    repair: row.repair,
    wash: 20,
    park: 0,
    evHome: 70,
    phevEl: 18,
    phevPet: 5.5,
    phevShare: 60,
  };
}

const G = {
  yrs: 5,
  km: 15000,
  fin: 'leasing',
  downPct: 20,
  apr: 4.5,
  months: 48,
  resPct: 20,
};

const bmw = dbCar('bmw_740d');
const porsche = dbCar('porsche_911');
const bmwResult = calcAll(bmw, G);
const porscheResult = calcAll(porsche, G);

assert.equal(Math.round(bmwResult.monthly), 1984, 'BMW 740d monthly baseline changed');
assert.equal(Math.round(bmwResult.total), 119035, 'BMW 740d total baseline changed');
assert.equal(Math.round(porscheResult.monthly), 2273, 'Porsche 911 monthly baseline changed');
assert.equal(Math.round(porscheResult.total), 136370, 'Porsche 911 total baseline changed');
assert.equal(bmwResult.monthly < porscheResult.monthly, true, 'BMW 740d should remain the cheaper baseline');
assert.equal(
  Math.abs(Math.round(bmwResult.monthly) - Math.round(porscheResult.monthly)),
  289,
  'BMW/Porsche monthly delta changed',
);
assert.equal(Math.round(bmwResult.bd.octa), 1500, 'BMW auto-OCTA baseline changed');
assert.equal(Math.round(porscheResult.bd.octa), 1500, 'Porsche auto-OCTA baseline changed');

console.log('test-fable5-regression.js: BMW 740d vs Porsche 911 baseline passed');
