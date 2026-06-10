/* HonestCost row-level car source metadata.
   This file is audit evidence, not calculator input yet.
   Status meanings:
   - verified: row is source-backed enough for current use.
   - mismatch: current source disagrees with the DB row.
   - needs_mapping: source exists, but trim/spec mapping needs manual review.
*/

window.CAR_SOURCES = {
  tesla_m3_rwd: {
    checkedAt: '2026-06-01',
    status: 'mismatch',
    dbPrice: 42000,
    currentPrice: 31870,
    currentTrimName: 'Tesla Model 3 Rear-Wheel Drive',
    sourceUrls: ['https://www.tesla.com/en_LV/model3/design'],
    notes: 'Tesla Latvia configurator showed order summary EUR 31,870 before savings; DB price EUR 42,000 is materially stale.'
  },
  tesla_m3_lr: {
    checkedAt: '2026-06-01',
    status: 'mismatch',
    dbPrice: 49000,
    currentPrice: 41990,
    currentTrimName: 'Tesla Model 3 Long Range All-Wheel Drive',
    sourceUrls: ['https://www.tesla.com/en_LV/model3/design'],
    notes: 'Tesla Latvia configurator showed Long Range AWD at EUR 41,990; DB price EUR 49,000 is materially stale.'
  },
  tesla_my_rwd: {
    checkedAt: '2026-06-01',
    status: 'needs_mapping',
    dbPrice: 45000,
    currentTrimName: 'Tesla Model Y Rear-Wheel Drive / current Latvia configurator',
    sourceUrls: ['https://www.tesla.com/en_LV/modely/design'],
    notes: 'Official Latvia configurator is the right source, but current price must be captured from the dynamic configurator before changing DB price.'
  },
  tesla_my_lr: {
    checkedAt: '2026-06-01',
    status: 'needs_mapping',
    dbPrice: 53000,
    currentTrimName: 'Tesla Model Y Long Range All-Wheel Drive / current Latvia configurator',
    sourceUrls: ['https://www.tesla.com/en_LV/modely/design'],
    notes: 'Official Latvia configurator is the right source, but current price must be captured from the dynamic configurator before changing DB price.'
  },
  toyota_yaris_hyb: {
    checkedAt: '2026-06-10',
    status: 'mismatch',
    resolved: true,
    dbUpdatedAt: '2026-06-10',
    dbUpdateAudit: 'CAR_DB_UPDATE_AUDIT_2026-06-10_TOYOTA_DACIA.md',
    dbPrice: 23900,
    currentPrice: 26700,
    currentTrimName: 'Toyota Yaris Style 1.5 Hybrid 130 e-CVT',
    sourceUrls: ['https://toyota.wess.lv/vehicles/yaris/prices'],
    notes: 'Re-verified 2026-06-10 in live WESS price table: Style Hybrid 130 e-CVT EUR 26,700, CO2 95 g/km. kW NOT updated: page prints (68 kW) for Hybrid 130, which conflicts with the 96 kW shown for the same powertrain on the Yaris Cross page; DB keeps 85 kW until clarified.'
  },
  toyota_yaris_cross_hyb: {
    checkedAt: '2026-06-10',
    status: 'mismatch',
    resolved: true,
    dbUpdatedAt: '2026-06-10',
    dbUpdateAudit: 'CAR_DB_UPDATE_AUDIT_2026-06-10_TOYOTA_DACIA.md',
    dbPrice: 30500,
    currentPrice: 30000,
    currentTrimName: 'Toyota Yaris Cross Style 1.5 Hybrid 130 e-CVT AWD-i (96 kW)',
    sourceUrls: ['https://toyota.wess.lv/vehicles/yaris-cross/prices'],
    notes: 'Live WESS price table 2026-06-10: Style Hybrid 130 AWD-i (Pilnpiedziņa) EUR 30,000, 96 kW. CO2/consumption columns are not shown on this page, so DB cons 4.4 and co2 102 remain unverified.'
  },
  toyota_corolla_hyb: {
    checkedAt: '2026-06-10',
    status: 'mismatch',
    resolved: true,
    dbUpdatedAt: '2026-06-10',
    dbUpdateAudit: 'CAR_DB_UPDATE_AUDIT_2026-06-10_TOYOTA_DACIA.md',
    dbPrice: 28500,
    currentPrice: 28400,
    currentListPrice: 28400,
    currentCampaignPrice: 24300,
    currentPriceBasis: 'list',
    currentTrimName: 'Toyota Corolla Sedan Active 1.8 Hybrid e-CVT (72 kW)',
    sourceUrls: ['https://toyota.wess.lv/vehicles/corolla/prices'],
    notes: 'Live WESS price table 2026-06-10: Corolla sedan Active 1.8 Hybrid EUR 28,400 list / EUR 24,300 campaign, CO2 100 g/km, 4.4 l/100km, 72 kW. Per pricing policy DB uses list price. Old DB row used stale Style trim naming and hatch body.'
  },
  dacia_sandero: {
    checkedAt: '2026-06-10',
    status: 'needs_mapping',
    dbPrice: 14500,
    currentPrice: 14490,
    currentTrimName: 'Dacia Sandero entry price (cena no)',
    sourceUrls: ['https://www.dacia.lv/lv/cars/sandero/home.html'],
    notes: 'Dacia Latvia model page shows Sandero from EUR 14,490 on 2026-06-10. Entry price only; Essential trim mapping, engine, WLTP and CO2 must be captured from the configurator/price list before changing DB values.'
  },
  dacia_sandero_step: {
    checkedAt: '2026-06-10',
    status: 'needs_mapping',
    dbPrice: 16900,
    currentPrice: 15690,
    currentTrimName: 'Dacia Sandero Stepway entry price (cena no)',
    sourceUrls: ['https://www.dacia.lv/'],
    notes: 'Dacia Latvia homepage banner shows new Sandero Stepway from EUR 15,690 on 2026-06-10. DB row is the TCe 100 LPG trim; exact trim price must be mapped before any DB change.'
  },
  dacia_duster: {
    checkedAt: '2026-06-10',
    status: 'needs_mapping',
    dbPrice: 22900,
    currentPrice: 17690,
    currentTrimName: 'Dacia Duster entry price (cena no)',
    sourceUrls: ['https://www.dacia.lv/lv/cars/duster-suv/home.html'],
    notes: 'Dacia Latvia Duster page shows from EUR 17,690 on 2026-06-10 (base trim; a 21,800 special edition was also advertised). DB row is the higher 1.2 TCe 130 4x2 trim, so the entry price is not a direct mismatch; trim-level capture needed.'
  },
  dacia_spring: {
    checkedAt: '2026-06-10',
    status: 'needs_mapping',
    dbPrice: 17900,
    currentPrice: 17390,
    currentTrimName: 'Dacia Spring entry price (cena no)',
    sourceUrls: ['https://www.dacia.lv/lv/cars/spring/home.html'],
    notes: 'Dacia Latvia Spring page shows from EUR 17,390 on 2026-06-10. DB row is Spring Electric 65; trim/battery mapping needed before changing DB price.'
  },
  toyota_chr_hyb: {
    checkedAt: '2026-06-01',
    status: 'mismatch',
    resolved: true,
    dbUpdatedAt: '2026-06-02',
    dbUpdateAudit: 'CAR_DB_UPDATE_AUDIT_2026-06-02_TOYOTA.md',
    dbPrice: 36500,
    currentPrice: 39500,
    currentTrimName: 'Toyota C-HR 2.0 Hybrid AWD-i Style',
    sourceUrls: [
      'https://mediacontent.toyota.ee/pricelists/Toyota_C-HR_Pricelist_LV.pdf',
      'https://www.toyota.lv/new-cars/c-hr'
    ],
    notes: 'Toyota Latvia C-HR price list supports 2.0 Hybrid AWD-i Style at EUR 39,500; DB price EUR 36,500 is stale.'
  },
  toyota_chr_phev: {
    checkedAt: '2026-06-01',
    status: 'needs_mapping',
    dbPrice: 39900,
    currentTrimName: 'Toyota C-HR 2.0 Plug-in Hybrid current Latvia trims',
    sourceUrls: [
      'https://mediacontent.toyota.ee/pricelists/Toyota_C-HR_Pricelist_LV.pdf',
      'https://www.toyota.lv/new-cars/c-hr'
    ],
    notes: 'Current Latvia price list has multiple PHEV trims. Select exact trim before changing DB price, WLTP consumption, CO2, or EV range.'
  },
  toyota_rav4_hyb: {
    checkedAt: '2026-06-01',
    status: 'mismatch',
    resolved: true,
    dbUpdatedAt: '2026-06-02',
    dbUpdateAudit: 'CAR_DB_UPDATE_AUDIT_2026-06-02_TOYOTA.md',
    dbPrice: 42900,
    currentPrice: 46900,
    currentTrimName: 'Toyota RAV4 2.5 Hybrid Dynamic Force AWD-i Style',
    sourceUrls: [
      'https://mediacontent.toyota.ee/pricelists/RAV4_Pricelist_LV.pdf',
      'https://www.toyota.lv/new-cars/rav4'
    ],
    notes: 'Toyota Latvia RAV4 price list supports Hybrid AWD-i Style at EUR 46,900; DB price EUR 42,900 is stale.'
  },
  toyota_rav4_phev: {
    checkedAt: '2026-06-01',
    status: 'needs_mapping',
    dbPrice: 51500,
    currentTrimName: 'Toyota RAV4 Plug-in Hybrid AWD-i current Latvia trims',
    sourceUrls: [
      'https://mediacontent.toyota.ee/pricelists/RAV4_Pricelist_LV.pdf',
      'https://www.toyota.lv/new-cars/rav4'
    ],
    notes: 'DB price is near current AWD-i Style pricing, but the row lacks exact trim mapping. Keep as needs_mapping until trim, WLTP and EV range are selected.'
  },
  skoda_fabia_10tsi_se: {
    checkedAt: '2026-06-01',
    status: 'mismatch',
    dbPrice: 21400,
    currentPrice: 20200,
    currentTrimName: 'Skoda Fabia Selection 1.0 TSI current Latvia price list',
    sourceUrls: [
      'https://www.skoda.lv/modeli/jauna_fabia/jauna_fabia',
      'https://ru-lv.skoda-auto.com/_doc/0bd26db5-acd2-4d59-90b5-fa99f2e0aecd'
    ],
    notes: 'Current Skoda Latvia sources use Essence / Selection / Monte Carlo naming. Selection was captured around EUR 20,200; DB row needs trim remap before live DB price changes.'
  },
  skoda_octavia_15: {
    checkedAt: '2026-06-01',
    status: 'needs_mapping',
    dbPrice: 29500,
    currentPrice: 27850,
    currentTrimName: 'Skoda Octavia 1.5 TSI 110 kW Essence',
    sourceUrls: ['https://www.skoda.lv/_doc/9436f79d-4c35-47b5-91bb-c7a9814f6bd8'],
    notes: 'DB row uses old Ambition trim naming. Current Latvia price list shows 1.5 TSI 110 kW Essence at EUR 27,850; map exact trim before changing DB values.'
  },
  skoda_octavia_20tdi: {
    checkedAt: '2026-06-01',
    status: 'mismatch',
    resolved: true,
    dbUpdatedAt: '2026-06-02',
    dbUpdateAudit: 'CAR_DB_UPDATE_AUDIT_2026-06-02_SKODA.md',
    dbPrice: 32900,
    currentPrice: 32620,
    currentTrimName: 'Skoda Octavia 2.0 TDI DSG current Latvia price list',
    sourceUrls: ['https://www.skoda.lv/_doc/9436f79d-4c35-47b5-91bb-c7a9814f6bd8'],
    notes: 'Current Skoda Latvia price list shows 2.0 TDI DSG around EUR 32,620. DB row uses stale Style naming and old warranty assumptions.'
  },
  skoda_octavia_etsi: {
    checkedAt: '2026-06-01',
    status: 'needs_mapping',
    dbPrice: 33400,
    currentPrice: 30330,
    currentTrimName: 'Skoda Octavia 1.5 m-Hybrid DSG current Latvia price list',
    sourceUrls: ['https://www.skoda.lv/_doc/9436f79d-4c35-47b5-91bb-c7a9814f6bd8'],
    notes: 'Current Skoda Latvia price list shows 1.5 m-Hybrid DSG around EUR 30,330. DB row uses older e-TSI DSG Style naming and should be remapped before price update.'
  },
  skoda_octavia_rs: {
    checkedAt: '2026-06-01',
    status: 'mismatch',
    resolved: true,
    dbUpdatedAt: '2026-06-02',
    dbUpdateAudit: 'CAR_DB_UPDATE_AUDIT_2026-06-02_SKODA.md',
    dbPrice: 41800,
    currentPrice: 39010,
    currentTrimName: 'Skoda Octavia RS current Latvia price list',
    sourceUrls: ['https://www.skoda.lv/_doc/9436f79d-4c35-47b5-91bb-c7a9814f6bd8'],
    notes: 'Current Skoda Latvia price list shows RS around EUR 39,010 and 195 kW; DB row is stale at EUR 41,800 and 180 kW.'
  },
  vw_golf_15: {
    checkedAt: '2026-06-01',
    status: 'needs_mapping',
    dbPrice: 30500,
    currentTrimName: 'Volkswagen Golf 1.5 TSI current Latvia price list',
    sourceUrls: [
      'https://www.volkswagen.lv/lv/chose-your-volkswagen/models/the-new-golf.html',
      'https://www.volkswagen.lv/idhub/content/dam/onehub_pkw/importers/lv/price-lists/lv/golf/Golf_PA_26_03_24_cenas_LV.pdf'
    ],
    notes: 'Volkswagen Latvia Golf page and 24.03.2026 price-list PDF are the current sources. Exact Style/engine mapping and price must be captured from the PDF before changing DB values.'
  },
  vw_golf_20tdi: {
    checkedAt: '2026-06-01',
    status: 'needs_mapping',
    dbPrice: 33800,
    currentTrimName: 'Volkswagen Golf 2.0 TDI current Latvia price list',
    sourceUrls: [
      'https://www.volkswagen.lv/lv/chose-your-volkswagen/models/the-new-golf.html',
      'https://www.volkswagen.lv/idhub/content/dam/onehub_pkw/importers/lv/price-lists/lv/golf/Golf_PA_26_03_24_cenas_LV.pdf'
    ],
    notes: 'Volkswagen Latvia Golf page and 24.03.2026 price-list PDF are the current sources. Exact diesel trim, warranty, WLTP and price must be captured from the PDF before changing DB values.'
  },
  vw_id3_pro: {
    checkedAt: '2026-06-01',
    status: 'mismatch',
    resolved: true,
    dbUpdatedAt: '2026-06-02',
    dbUpdateAudit: 'CAR_DB_UPDATE_AUDIT_2026-06-02_VW.md',
    dbPrice: 39900,
    currentPrice: 46050,
    currentListPrice: 46050,
    currentCampaignPrice: 39520,
    currentPriceBasis: 'list',
    currentTrimName: 'Volkswagen ID.3 Pro',
    sourceUrls: ['https://www.volkswagen.lv/idhub/content/dam/onehub_pkw/importers/lv/price-lists/lv/id-3/ID.3_08_07_cenas_LV.pdf'],
    notes: 'VW Latvia ID.3 price list shows Pro regular EUR 46,050 and campaign EUR 39,520. Per pricing policy, car-db.js should use list price unless the row is explicitly an offer.'
  },
  vw_id3_pro_s: {
    checkedAt: '2026-06-01',
    status: 'mismatch',
    dbPrice: 49900,
    currentPrice: 49740,
    currentListPrice: 49740,
    currentCampaignPrice: 43860,
    currentPriceBasis: 'list',
    currentTrimName: 'Volkswagen ID.3 Pro S',
    sourceUrls: ['https://www.volkswagen.lv/idhub/content/dam/onehub_pkw/importers/lv/price-lists/lv/id-3/ID.3_08_07_cenas_LV.pdf'],
    notes: 'VW Latvia ID.3 price list shows Pro S regular EUR 49,740 and campaign EUR 43,860. Per pricing policy, car-db.js should use list price unless the row is explicitly an offer.'
  },
  vw_idbuzz: {
    checkedAt: '2026-06-01',
    status: 'mismatch',
    resolved: true,
    dbUpdatedAt: '2026-06-02',
    dbUpdateAudit: 'CAR_DB_UPDATE_AUDIT_2026-06-02_VW.md',
    dbPrice: 64900,
    currentPrice: 53666,
    currentListPrice: 53666,
    currentCampaignPrice: 47116,
    currentPriceBasis: 'list',
    currentTrimName: 'Volkswagen ID. Buzz Pro NWB MY26',
    sourceUrls: ['https://www.volkswagen.lv/idhub/content/dam/onehub_pkw/importers/lv/price-lists/lv/id-buzz/IDBuzz_cenas_MY26_17.02.2026_LV.pdf'],
    notes: 'VW Latvia ID. Buzz MY26 price list shows Pro NWB regular EUR 53,666 and campaign EUR 47,116. Per pricing policy, car-db.js should use list price unless the row is explicitly an offer; DB row also has stale battery, kW and range assumptions.'
  }
};
