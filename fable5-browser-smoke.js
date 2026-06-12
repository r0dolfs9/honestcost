// Browser smoke/viewport evidence for HonestCost FABLE5 work.
// Run with NODE_PATH pointing at a Playwright install when the repo has no package.json:
//   $env:NODE_PATH="C:\Users\User\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\node_modules"; node fable5-browser-smoke.js

const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const { chromium } = require('playwright');

const url = process.argv[2] || 'http://localhost:8123/';
const outDir = path.resolve(process.argv[3] || path.join('qa', 'fable5'));
const runLabel = process.argv[4] || 'after';
fs.mkdirSync(outDir, { recursive: true });

const viewports = [
  { name: 'desktop-1440x900', width: 1440, height: 900 },
  { name: 'laptop-1280x800', width: 1280, height: 800 },
  { name: 'tablet-768x1024', width: 768, height: 1024 },
  { name: 'mobile-390x844', width: 390, height: 844 },
];

function screenshotPath(name) {
  return path.join(outDir, `${runLabel}-${name}.png`);
}

(async () => {
  const browser = await chromium.launch({ headless: true });
  const evidence = {
    url,
    generatedAt: new Date().toISOString(),
    browser: 'playwright-chromium',
    console: [],
    viewports: [],
    journey: {},
  };

  try {
    const page = await browser.newPage({ viewport: viewports[0] });
    page.on('console', msg => {
      if (['error', 'warning'].includes(msg.type())) {
        evidence.console.push({ type: msg.type(), text: msg.text() });
      }
    });
    page.on('pageerror', err => {
      evidence.console.push({ type: 'pageerror', text: err.message });
    });

    await page.goto(url, { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('.hero h1', { timeout: 10000 });
    evidence.journey.title = await page.title();
    evidence.journey.initialHero = await page.locator('.hero h1').innerText();
    evidence.journey.carDbInitiallyLoaded = await page.evaluate(() => Boolean(window.CAR_DB));
    await page.screenshot({ path: screenshotPath('home-desktop-1440x900'), fullPage: false });
    await page.click('#themeToggle');
    evidence.journey.themeAfterToggle = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));

    await page.click('#carPickerBtnA');
    await page.waitForFunction(() => Boolean(window.CAR_DB && window.CAR_DB.length > 400), null, { timeout: 10000 });
    evidence.journey.carDbAfterPicker = await page.evaluate(() => window.CAR_DB.length);
    await page.fill('#carPickerInputA', 'BMW 740d');
    await page.waitForSelector('#carPickerListA .car-picker-row', { timeout: 5000 });
    evidence.journey.searchResultA = await page.locator('#carPickerListA .car-picker-row').first().innerText();
    await page.click('#carPickerListA .car-picker-row');

    await page.click('#carPickerBtnB');
    await page.fill('#carPickerInputB', 'Porsche 911 Carrera');
    await page.waitForSelector('#carPickerListB .car-picker-row', { timeout: 5000 });
    evidence.journey.searchResultB = await page.locator('#carPickerListB .car-picker-row').first().innerText();
    await page.click('#carPickerListB .car-picker-row');

    await page.evaluate(() => {
      document.querySelector('[data-fin="leasing"]').click();
      document.querySelector('#slOwn').value = 5;
      document.querySelector('#slKm').value = 15000;
      document.querySelector('#slTerm').value = 48;
      document.querySelector('#gResidual').value = 20;
      document.querySelector('#gDownPct').value = 20;
      document.querySelector('#gApr').value = 4.5;
    });
    await page.click('.analyse-wrap .btn-primary');
    await page.waitForSelector('#screen2', { state: 'visible', timeout: 10000 });
    await page.waitForSelector('#resGrid .res-card', { timeout: 10000 });
    await page.waitForTimeout(1200);
    await page.screenshot({ path: screenshotPath('results-desktop-1440x900'), fullPage: false });

    evidence.journey.resultUrlHasHash = (await page.url()).includes('#s=');
    evidence.journey.resultCards = await page.locator('#resGrid .res-card').count();
    evidence.journey.verdictText = await page.locator('#compBar').innerText();
    evidence.journey.resultText = await page.locator('#resGrid').innerText();
    evidence.journey.screen2Visible = await page.locator('#screen2').isVisible();

    await page.click('#copyLinkBtn');
    evidence.journey.copyButtonText = await page.locator('#copyLinkBtn').innerText();

    await page.evaluate(() => window.localStorage.removeItem('honestcost-saved-scenarios-v1'));
    await page.getByRole('button', { name: /Saglabāt/ }).click();
    evidence.journey.savedScenarioCount = await page.evaluate(() => {
      const raw = window.localStorage.getItem('honestcost-saved-scenarios-v1');
      return raw ? JSON.parse(raw).length : 0;
    });

    await page.click('.res-header .btn-ghost');
    evidence.journey.returnedToEdit = await page.locator('#screen1').isVisible();

    for (const vp of viewports) {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto(url, { waitUntil: 'domcontentloaded' });
      await page.waitForSelector('.hero h1', { timeout: 10000 });
      await page.screenshot({ path: screenshotPath(`home-${vp.name}`), fullPage: false });
      const metrics = await page.evaluate(() => ({
        innerWidth: window.innerWidth,
        scrollWidth: document.documentElement.scrollWidth,
        bodyScrollWidth: document.body.scrollWidth,
        hasHorizontalOverflow: document.documentElement.scrollWidth > window.innerWidth + 1,
        overflowCandidates: Array.from(document.querySelectorAll('body *')).map(el => {
          const rect = el.getBoundingClientRect();
          return {
            tag: el.tagName.toLowerCase(),
            id: el.id || '',
            className: typeof el.className === 'string' ? el.className : '',
            left: Math.round(rect.left),
            right: Math.round(rect.right),
            width: Math.round(rect.width),
            text: (el.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 70),
          };
        }).filter(item => item.right > window.innerWidth + 1 || item.left < -1)
          .sort((a, b) => b.right - a.right)
          .slice(0, 12),
      }));
      evidence.viewports.push({ ...vp, ...metrics });
    }

  } finally {
    await browser.close();
  }

  fs.writeFileSync(path.join(outDir, `browser-smoke-${runLabel}.json`), JSON.stringify(evidence, null, 2));
  assert.equal(evidence.journey.carDbInitiallyLoaded, false, 'CAR_DB should lazy-load');
  assert.ok(evidence.journey.carDbAfterPicker > 400, 'CAR_DB should load after picker opens');
  assert.equal(evidence.journey.resultCards, 2, 'comparison should render two result cards');
  assert.equal(evidence.journey.resultUrlHasHash, true, 'analysis should create share hash');
  assert.equal(evidence.journey.savedScenarioCount, 1, 'save should persist one scenario');
  assert.equal(evidence.journey.returnedToEdit, true, 'edit button should return to inputs');
  assert.equal(evidence.viewports.some(vp => vp.hasHorizontalOverflow), false, 'no checked viewport should overflow horizontally');
  console.log(`fable5-browser-smoke.js: evidence written to ${outDir}`);
})();
