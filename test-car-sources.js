// Source metadata smoke checks for audited HonestCost car rows.

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

const requiredIds = [
  'tesla_m3_rwd',
  'tesla_m3_lr',
  'tesla_my_rwd',
  'tesla_my_lr',
  'toyota_yaris_hyb',
  'toyota_yaris_cross_hyb',
  'toyota_chr_hyb',
  'toyota_chr_phev',
  'toyota_rav4_hyb',
  'toyota_rav4_phev',
  'skoda_fabia_10tsi_se',
  'skoda_octavia_15',
  'skoda_octavia_20tdi',
  'skoda_octavia_etsi',
  'skoda_octavia_rs',
  'vw_golf_15',
  'vw_golf_20tdi',
  'vw_id3_pro',
  'vw_id3_pro_s',
  'vw_idbuzz',
  // 2026-06-10 batch
  'kia_ev2_42',
  'kia_ev3_58',
  'kia_ev3_81',
  'kia_ev4_58',
  'kia_ev4_81',
  'kia_ev5_81',
  'kia_k4_10',
  'kia_k4_16',
  'byd_atto2',
  'byd_atto2_dmi',
  'byd_seal_u_ev',
  'byd_seal_u_dmi',
  'byd_seal6_dmi',
  'byd_seal6_dmi_tour',
  'byd_dolphin_surf',
  'byd_atto3',
  'byd_seal',
  'byd_sealu',
  'ora_03',
  'ora_03_plus',
];

assert.ok(Array.isArray(cars), 'CAR_DB should be loaded');
assert.ok(sources && typeof sources === 'object', 'CAR_SOURCES should be loaded');

for (const id of requiredIds) {
  const car = cars.find((candidate) => candidate.id === id);
  const source = sources[id];
  assert.ok(car, `${id} should exist in CAR_DB`);
  assert.ok(source, `${id} should have source metadata`);
  assert.match(source.checkedAt, /^\d{4}-\d{2}-\d{2}$/);
  assert.ok(['verified', 'mismatch', 'needs_mapping'].includes(source.status), `${id} has a valid audit status`);
  assert.ok(Array.isArray(source.sourceUrls) && source.sourceUrls.length >= 1, `${id} has at least one source URL`);
  for (const url of source.sourceUrls) assert.match(url, /^https:\/\//, `${id} source URL is HTTPS`);
  assert.ok(source.notes && source.notes.length >= 20, `${id} has useful notes`);
  if (source.status === 'mismatch') {
    assert.equal(typeof source.dbPrice, 'number', `${id} records DB price`);
    assert.equal(typeof source.currentPrice, 'number', `${id} records current source price`);
    assert.notEqual(source.dbPrice, source.currentPrice, `${id} mismatch should differ from DB price`);
  }
}

const vwCampaignRows = ['vw_id3_pro', 'vw_id3_pro_s', 'vw_idbuzz'];
for (const id of vwCampaignRows) {
  const source = sources[id];
  assert.equal(source.currentPriceBasis, 'list', `${id} uses list price as the DB update basis`);
  assert.equal(typeof source.currentListPrice, 'number', `${id} records current list price`);
  assert.equal(typeof source.currentCampaignPrice, 'number', `${id} records current campaign price`);
  assert.equal(source.currentPrice, source.currentListPrice, `${id} currentPrice follows the list-price policy`);
  assert.notEqual(source.currentListPrice, source.currentCampaignPrice, `${id} keeps list and campaign prices separate`);
}

const resolvedRows = {
  toyota_chr_hyb: 'CAR_DB_UPDATE_AUDIT_2026-06-02_TOYOTA.md',
  toyota_rav4_hyb: 'CAR_DB_UPDATE_AUDIT_2026-06-02_TOYOTA.md',
  skoda_octavia_20tdi: 'CAR_DB_UPDATE_AUDIT_2026-06-02_SKODA.md',
  skoda_octavia_rs: 'CAR_DB_UPDATE_AUDIT_2026-06-02_SKODA.md',
  vw_id3_pro: 'CAR_DB_UPDATE_AUDIT_2026-06-02_VW.md',
  vw_idbuzz: 'CAR_DB_UPDATE_AUDIT_2026-06-02_VW.md',
  byd_atto3: 'CAR_DB_UPDATE_AUDIT_2026-06-10_BYD_KIA_ORA.md',
};

for (const [id, auditFile] of Object.entries(resolvedRows)) {
  const source = sources[id];
  assert.equal(source.resolved, true, `${id} marks the stale mismatch as resolved`);
  assert.match(source.dbUpdatedAt, /^\d{4}-\d{2}-\d{2}$/, `${id} records DB update date`);
  assert.equal(source.dbUpdateAudit, auditFile, `${id} links to the DB update audit note`);
}

console.log('test-car-sources.js: all assertions passed');
