// Static page smoke checks for HonestCost.

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = __dirname;
const status = fs.readFileSync(path.join(root, 'status.html'), 'utf8');
const faq = fs.readFileSync(path.join(root, 'faq.html'), 'utf8');
const sitemap = fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8');
const index = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const og = fs.statSync(path.join(root, 'og-image.png'));

assert.match(index, /og:image" content="https:\/\/honestcost\.lv\/og-image\.png/);
assert.ok(og.size > 50000, 'og-image.png should be a real generated PNG asset');

assert.match(status, /<title>HonestCost status<\/title>/);
assert.match(status, /Nav apstiprināts/);
assert.doesNotMatch(status, /99\.9|24\/7|all systems operational/i);

assert.match(faq, /HonestCost metodoloģija/);
assert.match(faq, /localStorage/);
assert.match(faq, /print izkārtojumu/);
assert.doesNotMatch(faq, /neatkarīgi auditēti|sertificēts/i);

assert.match(sitemap, /https:\/\/honestcost\.lv\/status\.html/);
assert.match(sitemap, /https:\/\/honestcost\.lv\/faq\.html/);

console.log('test-static-pages.js: all assertions passed');
