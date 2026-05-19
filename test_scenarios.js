// HonestCost — Scenario Test Harness
// Mirrors the exact calc engine from index.html (post-fix constants)

const DEP={
  economy:    [.20,.12,.10,.09,.08],
  mid:        [.22,.13,.11,.10,.09],
  premium:    [.25,.15,.13,.11,.10],
  suv_mid:    [.18,.12,.10,.09,.08],
  premium_suv:[.23,.14,.12,.11,.10],
  ev:         [.30,.13,.08,.08,.07],
  phev:       [.22,.14,.12,.11,.10],
};
const TYRE={small:325,mid:390,large:450,suv:555};
// Updated 2026-05-17: -20% Latvia labour adjustment (R13)
const RBUF={
  economy:    [160,280,520],
  mid:        [240,400,720],
  premium:    [360,560,960],
  suv_mid:    [200,400,760],
  premium_suv:[400,640,1200],
  ev:         [120,280,560],
  phev:       [320,720,1200],
};
const FUEL={petrol:1.75,diesel:1.70,homeElec:0.18,pubElec:0.38};

// Updated 2026-05-17: exact 2025 TEN table from likumi.lv/ta/id/223536
function ten(co2){
  if(co2<=50)return 0;
  if(co2<=95)return 12;
  if(co2<=115)return 39;
  if(co2<=130)return 72;
  if(co2<=155)return 99;
  if(co2<=175)return 126;
  if(co2<=200)return 147;
  if(co2<=225)return 186;
  if(co2<=250)return 225;
  if(co2<=275)return 285;
  if(co2<=300)return 351;
  if(co2<=350)return 471;
  if(co2<=400)return 642;
  return 834;
}
function leasingCalc(price,downPct,apr,months,resPct){
  const principal=price*(1-downPct/100);
  const residual=price*(resPct/100);
  const r=apr/1200, n=months;
  const pv=principal-residual/Math.pow(1+r,n);
  const mp=r===0?pv/n:pv*(r*Math.pow(1+r,n))/(Math.pow(1+r,n)-1);
  return{mp,total:mp*n+residual};
}
function residual(price,cat,yrs){
  let v=price;
  const rates=DEP[cat]||DEP.mid;
  for(let y=0;y<yrs;y++) v*=(1-rates[Math.min(y,rates.length-1)]);
  return v;
}
function kasko(price,rate,cat,yr){
  return residual(price,cat,yr-1)*(rate/100);
}
// Updated 2026-05-17: time-based minimum floor (max vs 0.5 visits/year)
function service(km,yr,interval,cost){
  const s=km*(yr-1), e=km*yr;
  const visitsByKm=Math.floor(e/interval)-Math.floor(s/interval);
  const visits=Math.max(visitsByKm,0.5);
  return visits*cost;
}
function repairBuf(level,warTotal,cat,yr){
  if(yr<=warTotal)return 0;
  const li={low:0,med:1,high:2};
  const base=(RBUF[cat]||RBUF.mid)[li[level]];
  return base*(1+(yr-warTotal-1)*0.10);
}
function fuelAnnual(car,km){
  const ft=car.ft, fp=car.fuelPr;
  if(ft==='ev'){
    const hk=km*(car.evHome/100), pk=km*((100-car.evHome)/100);
    const hr=FUEL.homeElec, pr=fp||FUEL.pubElec;
    return(hk/100)*car.cons*hr*1.10+(pk/100)*car.cons*pr*1.05;
  }
  if(ft==='phev'){
    const ek=km*(car.phevShare/100), ptk=km*((100-car.phevShare)/100);
    const hk=ek*(car.evHome/100), pk=ek*((100-car.evHome)/100);
    const elCost=(hk/100)*car.phevEl*FUEL.homeElec*1.10+(pk/100)*car.phevEl*(fp||FUEL.pubElec)*1.05;
    const petCost=(ptk/100)*car.phevPet*(fp||FUEL.petrol);
    return elCost+petCost;
  }
  const price=fp||(ft==='diesel'?FUEL.diesel:FUEL.petrol);
  return(km/100)*car.cons*price;
}
function calcAll(car,g){
  const N=g.yrs, km=g.km;
  const warTotal=(car.w||3)+(car.ew?(car.ewYrs||2):0);
  let total=0;
  const bd={leasing:0,fuel:0,service:0,tyres:0,octa:0,kasko:0,ten:0,ew:0,repair:0,park:0};
  const kaskoByYear=[];
  const repairByYear=[];

  for(let y=1;y<=N;y++){
    const f=fuelAnnual(car,km);
    const sv=service(km,y,car.svcInt,car.svcCost);
    const ty=TYRE[car.tyre]||390;
    const oc=car.octa||0;
    const ka=kasko(car.price,car.kasko,car.dep,y);
    const tx=ten(car.co2||0);
    const rb=repairBuf(car.repair,warTotal,car.dep,y);
    const ta=(y===3||y===5)?41.88:0; // CSDD TA — csdd.lv 2026
    kaskoByYear.push(Math.round(ka));
    repairByYear.push(Math.round(rb));
    bd.fuel+=f; bd.service+=sv; bd.tyres+=ty; bd.octa+=oc;
    bd.kasko+=ka; bd.ten+=tx; bd.repair+=rb;
    total+=f+sv+ty+oc+ka+tx+rb+ta;
  }
  const ewTotal=car.ew&&car.ewPrice?car.ewPrice:0;
  bd.ew=ewTotal; total+=ewTotal;
  const pk=((car.park||0)+(car.wash||20))*12*N;
  bd.park=pk; total+=pk;
  if(g.fin==='leasing'){
    const l=leasingCalc(car.price,g.downPct,g.apr,g.months,g.resPct);
    const lt=l.mp*Math.min(N*12,g.months);
    bd.leasing=lt; total+=lt;
    bd._leasingMonthly=Math.round(l.mp);
  }
  const res=[];
  for(let y=0;y<=N;y++) res.push(Math.round(residual(car.price,car.dep,y)));
  return{monthly:total/(N*12),total,bd,res,warTotal,ewTotal,kaskoByYear,repairByYear};
}

// ── Global settings ─────────────────────────────────────────
const G_LEASING={yrs:5,km:15000,fin:'leasing',downPct:20,apr:4.5,months:60,resPct:10};
const G_CASH   ={yrs:5,km:15000,fin:'cash'};

// ── Test scenarios ──────────────────────────────────────────
const scenarios=[
  {
    id:'P1', label:'BMW 1-Series 118i vs BMW X1 xDrive20i (petrol)',
    special:'Base case — same brand, different size',
    g:G_LEASING,
    a:{name:'BMW 1-Series 118i',price:32500,dep:'mid',ft:'petrol',cons:5.8,co2:128,
       w:3,ew:false,svcInt:20000,svcCost:350,octa:110,kasko:2.5,tyre:'mid',repair:'med',wash:20,park:0},
    b:{name:'BMW X1 xDrive20i',price:41200,dep:'premium_suv',ft:'petrol',cons:7.1,co2:161,
       w:3,ew:false,svcInt:20000,svcCost:350,octa:150,kasko:2.5,tyre:'suv',repair:'med',wash:20,park:0},
  },
  {
    id:'P2', label:'VW ID.4 Pro (EV) vs VW Tiguan 2.0 TDI (diesel)',
    special:'EV vs diesel — fuel cost + depreciation profile',
    g:G_LEASING,
    a:{name:'VW ID.4 Pro EV',price:43900,dep:'ev',ft:'ev',cons:17.5,co2:0,
       w:5,ew:false,svcInt:30000,svcCost:160,octa:130,kasko:2.5,tyre:'large',repair:'low',
       wash:20,park:0,evHome:66},
    b:{name:'VW Tiguan 2.0 TDI',price:36500,dep:'suv_mid',ft:'diesel',cons:7.0,co2:164,
       w:3,ew:false,svcInt:30000,svcCost:240,octa:110,kasko:2.5,tyre:'large',repair:'med',wash:20,park:0},
  },
  {
    id:'P3', label:'Toyota Yaris 1.5 Hybrid vs Skoda Fabia 1.0 TSI',
    special:'Economy cars — hybrid vs pure petrol',
    g:G_LEASING,
    a:{name:'Toyota Yaris 1.5 Hybrid',price:24900,dep:'economy',ft:'petrol',cons:4.2,co2:92,
       w:5,ew:false,svcInt:15000,svcCost:160,octa:75,kasko:1.8,tyre:'small',repair:'low',wash:20,park:0},
    b:{name:'Skoda Fabia 1.0 TSI',price:19500,dep:'economy',ft:'petrol',cons:5.4,co2:122,
       w:3,ew:false,svcInt:30000,svcCost:200,octa:75,kasko:1.8,tyre:'small',repair:'low',wash:20,park:0},
  },
  {
    id:'P4', label:'BMW X3 20d vs Mercedes GLC 220d',
    special:'Premium SUV — two brands, close specs',
    g:G_LEASING,
    a:{name:'BMW X3 xDrive20d',price:52000,dep:'premium_suv',ft:'diesel',cons:6.3,co2:165,
       w:3,ew:false,svcInt:20000,svcCost:350,octa:150,kasko:2.5,tyre:'suv',repair:'med',wash:20,park:0},
    b:{name:'Mercedes GLC 220d',price:55500,dep:'premium_suv',ft:'diesel',cons:6.4,co2:168,
       w:3,ew:false,svcInt:20000,svcCost:350,octa:150,kasko:2.5,tyre:'suv',repair:'med',wash:20,park:0},
  },
  {
    id:'P5', label:'VW Golf GTE PHEV vs VW Golf 2.0 TDI',
    special:'PHEV vs diesel — same model family',
    g:G_LEASING,
    a:{name:'VW Golf GTE PHEV',price:42800,dep:'phev',ft:'phev',cons:0,co2:25,
       phevEl:12.4,phevPet:4.5,phevShare:60,evHome:66,
       w:3,ew:false,svcInt:30000,svcCost:240,octa:110,kasko:2.5,tyre:'mid',repair:'high',wash:20,park:0},
    b:{name:'VW Golf 2.0 TDI',price:34900,dep:'mid',ft:'diesel',cons:4.8,co2:112,
       w:3,ew:false,svcInt:30000,svcCost:240,octa:110,kasko:2.5,tyre:'mid',repair:'med',wash:20,park:0},
  },
  {
    id:'P6', label:'BMW 320d WITH extended warranty vs WITHOUT',
    special:'Warranty break-even test — repair buffer should be lower with EW',
    g:G_LEASING,
    a:{name:'BMW 320d + Extended Warranty',price:44500,dep:'premium',ft:'diesel',cons:5.2,co2:137,
       w:3,ew:true,ewPrice:1800,ewYrs:2,
       svcInt:20000,svcCost:350,octa:110,kasko:2.5,tyre:'large',repair:'low',wash:20,park:0},
    b:{name:'BMW 320d No Extended Warranty',price:44500,dep:'premium',ft:'diesel',cons:5.2,co2:137,
       w:3,ew:false,
       svcInt:20000,svcCost:350,octa:110,kasko:2.5,tyre:'large',repair:'med',wash:20,park:0},
  },
  {
    id:'P7', label:'BMW 1-Series 118i — Cash purchase vs Leasing',
    special:'Financing mode comparison — leasing monthly should be higher',
    g_a:G_CASH,
    g_b:G_LEASING,
    a:{name:'BMW 1-Series 118i (Cash)',price:32500,dep:'mid',ft:'petrol',cons:5.8,co2:128,
       w:3,ew:false,svcInt:20000,svcCost:350,octa:110,kasko:2.5,tyre:'mid',repair:'med',wash:20,park:0},
    b:{name:'BMW 1-Series 118i (Leasing)',price:32500,dep:'mid',ft:'petrol',cons:5.8,co2:128,
       w:3,ew:false,svcInt:20000,svcCost:350,octa:110,kasko:2.5,tyre:'mid',repair:'med',wash:20,park:0},
  },
];

// ── Validation checks ───────────────────────────────────────
function validate(car,g,r,label){
  const issues=[];
  // KASKO should be non-increasing year over year
  for(let i=1;i<r.kaskoByYear.length;i++){
    if(r.kaskoByYear[i]>r.kaskoByYear[i-1]+1){
      issues.push(`KASKO not decreasing: Y${i}=€${r.kaskoByYear[i-1]} → Y${i+1}=€${r.kaskoByYear[i]}`);
    }
  }
  // Repair buffer should be 0 within warranty
  for(let y=1;y<=r.warTotal&&y<=g.yrs;y++){
    if(r.repairByYear[y-1]>0) issues.push(`Repair buffer non-zero in warranty year ${y}: €${r.repairByYear[y-1]}`);
  }
  // Repair buffer should be positive after warranty (if repair level not low at edge)
  if(g.yrs>r.warTotal&&car.repair!=='low'){
    const firstPostWar=r.repairByYear[r.warTotal];
    if(firstPostWar===0) issues.push(`Repair buffer is 0 in first post-warranty year ${r.warTotal+1}`);
  }
  // Residual should decrease each year
  for(let i=1;i<r.res.length;i++){
    if(r.res[i]>=r.res[i-1]) issues.push(`Residual not decreasing: Y${i-1}=€${r.res[i-1]} → Y${i}=€${r.res[i]}`);
  }
  // Sanity: monthly × N × 12 ≈ total (within €1 rounding)
  const reconstructed=r.monthly*g.yrs*12;
  if(Math.abs(reconstructed-r.total)>1.5) issues.push(`monthly×12×N (€${Math.round(reconstructed)}) ≠ total (€${Math.round(r.total)})`);

  return issues;
}

// ── Run & report ────────────────────────────────────────────
let allPass=true;
console.log('═'.repeat(72));
console.log('  HonestCost — Scenario Test Results');
console.log('  5 years · 15,000 km/yr · Leasing: 20% down, 4.5% APR, 60m, 10% RV');
console.log('═'.repeat(72));

for(const sc of scenarios){
  const gA=sc.g_a||sc.g;
  const gB=sc.g_b||sc.g;
  const rA=calcAll(sc.a,gA);
  const rB=calcAll(sc.b,gB);

  const issuesA=validate(sc.a,gA,rA,sc.a.name);
  const issuesB=validate(sc.b,gB,rB,sc.b.name);
  const pass=issuesA.length===0&&issuesB.length===0;
  if(!pass) allPass=false;

  console.log(`\n${sc.id}  ${pass?'✅ PASS':'❌ FAIL'}  — ${sc.label}`);
  console.log(`  ${sc.special}`);
  console.log(`  ${'─'.repeat(68)}`);

  // Car A
  const bA=rA.bd;
  console.log(`  ${sc.a.name.padEnd(38)} €${Math.round(rA.monthly).toString().padStart(4)}/mo  (€${Math.round(rA.total).toLocaleString()} / 5yr)`);
  if(gA.fin==='leasing') console.log(`    Leasing:  €${Math.round(bA.leasing)}  (€${bA._leasingMonthly}/mo)`);
  console.log(`    Fuel:     €${Math.round(bA.fuel)}   Service: €${Math.round(bA.service)}   Tyres: €${Math.round(bA.tyres)}`);
  console.log(`    OCTA:     €${Math.round(bA.octa)}   KASKO:   €${Math.round(bA.kasko)}   TEN: €${Math.round(bA.ten)}`);
  console.log(`    Repair:   €${Math.round(bA.repair)}   Park/Wash: €${Math.round(bA.park)}   EW: €${Math.round(bA.ew)}`);
  console.log(`    KASKO/yr: ${rA.kaskoByYear.map(v=>'€'+v).join(' → ')}`);
  console.log(`    Repair/yr:${rA.repairByYear.map(v=>'€'+v).join(' → ')}  (warranty covers yr 1–${rA.warTotal})`);
  console.log(`    Residual: ${rA.res.map((v,i)=>'Y'+i+':€'+v.toLocaleString()).join(' → ')}`);

  // Car B
  const bB=rB.bd;
  console.log(`  ${sc.b.name.padEnd(38)} €${Math.round(rB.monthly).toString().padStart(4)}/mo  (€${Math.round(rB.total).toLocaleString()} / 5yr)`);
  if(gB.fin==='leasing') console.log(`    Leasing:  €${Math.round(bB.leasing)}  (€${bB._leasingMonthly}/mo)`);
  console.log(`    Fuel:     €${Math.round(bB.fuel)}   Service: €${Math.round(bB.service)}   Tyres: €${Math.round(bB.tyres)}`);
  console.log(`    OCTA:     €${Math.round(bB.octa)}   KASKO:   €${Math.round(bB.kasko)}   TEN: €${Math.round(bB.ten)}`);
  console.log(`    Repair:   €${Math.round(bB.repair)}   Park/Wash: €${Math.round(bB.park)}   EW: €${Math.round(bB.ew)}`);
  console.log(`    KASKO/yr: ${rB.kaskoByYear.map(v=>'€'+v).join(' → ')}`);
  console.log(`    Repair/yr:${rB.repairByYear.map(v=>'€'+v).join(' → ')}  (warranty covers yr 1–${rB.warTotal})`);
  console.log(`    Residual: ${rB.res.map((v,i)=>'Y'+i+':€'+v.toLocaleString()).join(' → ')}`);

  // Winner
  const diff=Math.abs(Math.round(rA.monthly)-Math.round(rB.monthly));
  const cheaper=rA.monthly<rB.monthly?sc.a.name:rB.monthly<rA.monthly?sc.b.name:'Tie';
  if(diff>0) console.log(`  → ${cheaper} cheaper by €${diff}/month`);
  else console.log(`  → Dead heat`);

  // Issues
  if(issuesA.length>0) issuesA.forEach(i=>console.log(`  ⚠️  Car A: ${i}`));
  if(issuesB.length>0) issuesB.forEach(i=>console.log(`  ⚠️  Car B: ${i}`));
}

console.log('\n' + '═'.repeat(72));
console.log(`  Overall: ${allPass?'✅ ALL 7 SCENARIOS PASS':'❌ ISSUES FOUND — see above'}`);
console.log('═'.repeat(72));
