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
// Truncation guard (2026-06-10 incident): a sync glitch once cut the file mid-write
// and the unterminated <script> made the deployed page render blank.
assert.ok(index.trimEnd().endsWith('</html>'), 'index.html must end with </html> (truncation guard)');
assert.equal((index.match(/<script/g) || []).length, (index.match(/<\/script>/g) || []).length, 'index.html script tags must be balanced');
assert.ok(og.size > 50000, 'og-image.png should be a real generated PNG asset');

assert.match(status, /<title>HonestCost status<\/title>/);
assert.match(status, /Nav apstiprināts/);
assert.doesNotMatch(status, /99\.9|24\/7|all systems operational/i);
assert.doesNotMatch(status, /href="\/(?:faq\.html)?"/, 'status links should work from the GitHub Pages subpath');

assert.match(faq, /HonestCost metodoloģija/);
assert.match(faq, /localStorage/);
assert.match(faq, /print izkārtojumu/);
assert.doesNotMatch(faq, /neatkarīgi auditēti|sertificēts/i);
assert.doesNotMatch(faq, /href="\/(?:status\.html)?"/, 'FAQ links should work from the GitHub Pages subpath');

assert.match(sitemap, /https:\/\/honestcost\.lv\/status\.html/);
assert.match(sitemap, /https:\/\/honestcost\.lv\/faq\.html/);

// Content section smoke checks (added 2026-06-10).
const contentPages = [
  'index.html',
  'elektroauto-vai-dizelis.html',
  'golf-vs-octavia.html',
  'chr-vs-rav4.html',
  'yaris-vs-sandero.html',
  'auto-vertibas-zudums.html',
  'lizings-vai-skaidra-nauda.html',
];
for (const page of contentPages) {
  const html = fs.readFileSync(path.join(root, 'content', page), 'utf8');
  assert.match(html, /<html lang="lv">/, `content/${page} declares Latvian lang`);
  assert.match(html, /<meta name="description"/, `content/${page} has a meta description`);
  assert.match(html, /\.\.\/index\.html/, `content/${page} links back to the calculator`);
  assert.doesNotMatch(html, /garantējam|sertificēts|auditēts ārēji/i, `content/${page} avoids unproven claims`);
  if (page !== 'index.html') {
    assert.match(html, /indikatīv|izglītojošs/i, `content/${page} carries an indicative disclaimer`);
    assert.match(html, /Pieņēmumi|Metode/, `content/${page} states its assumptions`);
  }
  assert.match(sitemap, new RegExp('https://honestcost\\.lv/content/' + page.replace('.', '\\.')), `sitemap covers content/${page}`);
}
assert.match(index, /content\/index\.html/, 'calculator links to the content section');

console.log('test-static-pages.js: all assertions passed');
