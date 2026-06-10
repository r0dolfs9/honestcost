/* ═════════════════════════════════════════════════════════════
   HonestCost — parametric car silhouette engine
   Generates side-profile SVGs from body archetypes + per-family
   overrides, so distinctive models read instantly and every car
   gets body-correct proportions. No external assets.
   Added 2026-06-10. See RESEARCH_UX_VISUALS_2026-06-10.md.
   ═════════════════════════════════════════════════════════════ */
(function(){
'use strict';

/* Archetype parameters.
   Coordinates: viewBox 0 0 260 110, ground at y=96.
   L: length · roofY: roof top (smaller = taller car) · beltY: window sill
   wsB: windshield base x-frac of L · roofF/roofR: flat-roof span (x-fracs)
   tail: 'hatch'|'notch'|'liftback'|'wagon'|'fastback'|'box'|'round'
   nose: bonnet length frac · r: wheel radius · clear: ground clearance */
var ARCH={
  cityhatch:{L:164,roofY:44,beltY:64,wsB:.32,roofF:.44,roofR:.80,tail:'hatch', r:12,clear:8},
  hatch:    {L:194,roofY:45,beltY:65,wsB:.34,roofF:.48,roofR:.80,tail:'hatch', r:13,clear:8},
  fastback: {L:210,roofY:46,beltY:66,wsB:.35,roofF:.49,roofR:.68,tail:'fastback',r:13,clear:8},
  sedan:    {L:220,roofY:46,beltY:66,wsB:.35,roofF:.48,roofR:.70,tail:'notch', r:13,clear:8},
  sedan_l:  {L:246,roofY:44,beltY:65,wsB:.33,roofF:.45,roofR:.74,tail:'notch', r:14,clear:8},
  liftback: {L:226,roofY:46,beltY:66,wsB:.35,roofF:.47,roofR:.66,tail:'liftback',r:13,clear:8},
  wagon:    {L:230,roofY:44,beltY:65,wsB:.33,roofF:.45,roofR:.89,tail:'wagon', r:13,clear:8},
  coupe:    {L:212,roofY:52,beltY:69,wsB:.39,roofF:.51,roofR:.62,tail:'fastback',r:14,clear:7},
  coupe4:   {L:226,roofY:50,beltY:68,wsB:.37,roofF:.49,roofR:.63,tail:'fastback',r:14,clear:7},
  sports_f: {L:214,roofY:57,beltY:72,wsB:.41,roofF:.53,roofR:.63,tail:'fastback',r:15,clear:6},
  sports_rr:{L:198,roofY:55,beltY:71,wsB:.30,roofF:.42,roofR:.50,tail:'arc911',r:15,clear:6},
  gt_low:   {L:238,roofY:52,beltY:69,wsB:.32,roofF:.44,roofR:.60,tail:'fastback',r:15,clear:6},
  cuv:      {L:204,roofY:38,beltY:61,wsB:.34,roofF:.46,roofR:.82,tail:'hatch', r:14,clear:12},
  suv:      {L:222,roofY:36,beltY:59,wsB:.34,roofF:.46,roofR:.85,tail:'box',   r:15,clear:13},
  suv_l:    {L:242,roofY:32,beltY:57,wsB:.32,roofF:.42,roofR:.89,tail:'box',   r:16,clear:14},
  suv_coupe:{L:230,roofY:37,beltY:60,wsB:.34,roofF:.44,roofR:.64,tail:'fastback',r:15,clear:12},
  offroad:  {L:212,roofY:32,beltY:57,wsB:.30,roofF:.38,roofR:.91,tail:'box',   r:16,clear:16},
  onebox:   {L:234,roofY:28,beltY:60,wsB:.14,roofF:.27,roofR:.93,tail:'box',   r:14,clear:10},
  van:      {L:234,roofY:30,beltY:62,wsB:.16,roofF:.32,roofR:.95,tail:'box',   r:14,clear:11},
  mpv:      {L:226,roofY:36,beltY:61,wsB:.26,roofF:.40,roofR:.89,tail:'box',   r:13,clear:10},
  pickup:   {L:238,roofY:34,beltY:58,wsB:.30,roofF:.42,roofR:.60,tail:'bed',   r:16,clear:15},
  wedge_ev: {L:214,roofY:40,beltY:61,wsB:.28,roofF:.42,roofR:.76,tail:'hatch', r:15,clear:10},
  stream_ev:{L:232,roofY:43,beltY:65,wsB:.26,roofF:.42,roofR:.58,tail:'round', r:14,clear:8},
  retro:    {L:178,roofY:40,beltY:63,wsB:.28,roofF:.42,roofR:.76,tail:'round', r:13,clear:9},
};

/* Distinctive model families → archetype (matched against carModelFamily()
   output and against the full lowercase name as fallback). */
var FAMILY=[
  [/\b911\b/,'sports_rr'],
  [/taycan|panamera|e-tron gt|etron gt/,'gt_low'],
  [/ioniq 5\b|ioniq5/,'wedge_ev'],
  [/ioniq 6|ioniq6|eqs(?! suv)|eqe(?! suv)/,'stream_ev'],
  [/id\.? ?buzz|staria|multivan|transporter/,'onebox'],
  [/proace|pv5|vito|transit|berlingo|rifter|partner|caddy/,'van'],
  [/jogger|touran|active tourer|b \d{3}|scenic|espace|zafira/,'mpv'],
  [/duster|tank|jimny|wrangler|defender|bronco/,'offroad'],
  [/ev9|x7|gls\b|q7|q8(?! e)|range rover|xc90|escalade|tang\b/,'suv_l'],
  [/x6|x4\b|gle coupe|glc coupe|cayenne coupe|ev6/,'suv_coupe'],
  [/ora 03|mini|500e?\b|cooper/,'retro'],
  [/cla|arteon|a5 sportback|a7|gran coupe|stinger/,'coupe4'],
  [/octavia|superb|a5\b/,'liftback'],
  [/m2\b|m4\b|supra|gt86|brz|cayman|tt\b|z4|emira|cle/,'coupe'],
  [/corvette|gt3|amg gt|m8\b|r8\b/,'sports_f'],
  [/dolphin surf|spring/,'cityhatch'],
  [/s-?class|s \d{3}|7 series|740|750|i7\b|a8\b|eqs\b/,'sedan_l'],
];

function pickArch(car){
  var name=((car&&car.name)||'').toLowerCase();
  var fam=(typeof carModelFamily==='function'?carModelFamily(car):'').toLowerCase();
  var hay=fam+' '+name;
  for(var i=0;i<FAMILY.length;i++){ if(FAMILY[i][0].test(hay)) return FAMILY[i][1]; }
  var body=((car&&car.body)||'hatch').toLowerCase();
  var price=(car&&car.price)||30000;
  var tyre=(car&&car.tyre)||'mid';
  if(body==='suv') return price>72000?'suv_l':(tyre==='suv'?'suv':'cuv');
  if(body==='sedan') return price>95000?'sedan_l':'sedan';
  if(body==='wagon') return 'wagon';
  if(body==='coupe') return price>110000?'sports_f':'coupe';
  if(body==='van') return 'van';
  if(body==='pickup') return 'pickup';
  if(body==='hatch') return price<20000?'cityhatch':'hatch';
  return 'hatch';
}

function isSporty(car){
  var n=((car&&car.name)||'');
  return /\b(RS ?\d?|GTI|GTS|GTX|GT(?:-Line)?|M\d|AMG|Cupra|N(?: Performance)?|ST|vRS|Type R|M Sport Pro)\b/.test(n) || ((car&&car.kw)||0)>=300;
}

function svgFor(car){
  var arch=pickArch(car);
  var a=Object.assign({},ARCH[arch]);
  var ev=((car&&car.fuel)||'')==='ev';
  var sport=isSporty(car);
  if(sport){a.clear=Math.max(5,a.clear-2);}
  var G=96, L=a.L, x0=(260-L)/2, x1=x0+L;
  var top=a.roofY, belt=a.beltY, bot=G-a.clear;
  var r=a.r, fw=x0+L*0.79, rw=x0+L*0.21;
  var wsB=x0+L*a.wsB, roofF=x0+L*a.roofF, roofR=x0+L*a.roofR;
  var noseTip=x0+3, tailTip=x1-3;
  var bonY=belt-3;
  var t='';
  if(a.tail==='notch'){
    var dY=belt-7;
    t='Q '+(roofR+8)+' '+(top+2)+' '+(roofR+16)+' '+(dY+2)+' L '+(x1-16)+' '+dY+' Q '+(tailTip-2)+' '+(dY-1)+' '+tailTip+' '+(dY+6)+' L '+tailTip+' '+(bot-7)+' Q '+tailTip+' '+bot+' '+(tailTip-8)+' '+bot;
  }else if(a.tail==='liftback'){
    t='Q '+(x0+L*0.84)+' '+(belt-12)+' '+(x1-7)+' '+(belt-1)+' Q '+tailTip+' '+(belt+2)+' '+tailTip+' '+(belt+9)+' L '+tailTip+' '+(bot-7)+' Q '+tailTip+' '+bot+' '+(tailTip-8)+' '+bot;
  }else if(a.tail==='fastback'){
    t='Q '+(x0+L*0.86)+' '+(belt-8)+' '+(x1-6)+' '+(belt+1)+' Q '+tailTip+' '+(belt+4)+' '+tailTip+' '+(belt+12)+' L '+tailTip+' '+(bot-7)+' Q '+tailTip+' '+bot+' '+(tailTip-8)+' '+bot;
  }else if(a.tail==='arc911'){
    t='Q '+(x0+L*0.72)+' '+(top+3)+' '+(x0+L*0.86)+' '+(belt-4)+' Q '+(x1-4)+' '+(belt+3)+' '+(tailTip-1)+' '+(belt+10)+' L '+tailTip+' '+(bot-7)+' Q '+tailTip+' '+bot+' '+(tailTip-8)+' '+bot;
  }else if(a.tail==='hatch'){
    t='L '+(roofR+4)+' '+(top+2)+' Q '+(x1-9)+' '+(top+5)+' '+(x1-5)+' '+(belt-3)+' L '+tailTip+' '+(belt+4)+' L '+tailTip+' '+(bot-7)+' Q '+tailTip+' '+bot+' '+(tailTip-8)+' '+bot;
  }else if(a.tail==='box'){
    t='L '+(roofR+3)+' '+(top+1)+' Q '+(x1-5)+' '+(top+2)+' '+(x1-4)+' '+(top+9)+' L '+tailTip+' '+(bot-9)+' Q '+tailTip+' '+bot+' '+(tailTip-8)+' '+bot;
  }else if(a.tail==='round'){
    t='Q '+(x1-13)+' '+(top+5)+' '+(x1-5)+' '+(belt-1)+' Q '+tailTip+' '+(belt+8)+' '+(tailTip-1)+' '+(bot-6)+' Q '+(tailTip-1)+' '+bot+' '+(tailTip-9)+' '+bot;
  }else{
    var bX=x0+L*0.62;
    t='L '+(roofR+3)+' '+(top+2)+' L '+bX+' '+(belt-9)+' L '+bX+' '+(belt-3)+' L '+(tailTip-2)+' '+(belt-3)+' L '+tailTip+' '+(belt+1)+' L '+tailTip+' '+(bot-7)+' Q '+tailTip+' '+bot+' '+(tailTip-8)+' '+bot;
  }
  var wsTopX=(arch==='sports_rr')?(roofF+2):(roofF-5);
  var d='M '+(noseTip+8)+' '+bot
    +' Q '+noseTip+' '+bot+' '+noseTip+' '+(bot-7)
    +' L '+noseTip+' '+(bonY+5)
    +' Q '+noseTip+' '+(bonY-1)+' '+(noseTip+9)+' '+(bonY-2)
    +' L '+(wsB-3)+' '+(bonY-4)
    +' Q '+(wsB+3)+' '+(bonY-5)+' '+wsTopX+' '+(top+3)
    +' Q '+(roofF+5)+' '+top+' '+(roofF+11)+' '+top
    +' L '+(roofR-5)+' '+top+' '
    +t
    +' L '+(fw+r+4)+' '+bot
    +' A '+(r+3.5)+' '+(r+3.5)+' 0 0 0 '+(fw-r-4)+' '+bot
    +' L '+(rw+r+4)+' '+bot
    +' A '+(r+3.5)+' '+(r+3.5)+' 0 0 0 '+(rw-r-4)+' '+bot
    +' Z';
  var winTop=top+3, winBot=belt-1, bp=x0+L*0.57;
  var rwe=(a.tail==='box')?(roofR+1):(a.tail==='wagon'?roofR+3:Math.min(roofR+5,x1-15));
  var w1='M '+(wsB+6)+' '+winBot+' L '+(roofF+9)+' '+winTop+' L '+(bp-3)+' '+winTop+' L '+(bp-3)+' '+winBot+' Z';
  var w2='M '+(bp+3)+' '+winBot+' L '+(bp+3)+' '+winTop+' L '+(rwe-7)+' '+winTop+' L '+(rwe+((a.tail==='hatch'||a.tail==='box')?1:6))+' '+winBot+' Z';
  var details='';
  details+='<rect x="'+(x0+8)+'" y="'+(bot-7)+'" width="'+(L-16)+'" height="3" rx="1.5" fill="rgba(0,0,0,.16)"/>';
  details+='<line x1="'+bp+'" y1="'+(winBot+2)+'" x2="'+bp+'" y2="'+(bot-9)+'" stroke="rgba(0,0,0,.14)" stroke-width="1.4"/>';
  if(!ev) details+='<rect x="'+(noseTip+2)+'" y="'+(bot-15)+'" width="9" height="3" rx="1.5" fill="rgba(0,0,0,.32)"/>';
  details+='<rect x="'+(noseTip+3)+'" y="'+(bonY-1)+'" width="6.5" height="2.4" rx="1.2" fill="rgba(255,255,255,.8)"/>';
  details+='<rect x="'+(tailTip-8)+'" y="'+(belt+3)+'" width="5.5" height="2.2" rx="1.1" fill="rgba(20,8,8,.45)"/>';
  if(sport) details+='<rect x="'+(tailTip-20)+'" y="'+((/round|fastback|arc911/.test(a.tail))?belt-4:top-3)+'" width="16" height="2.4" rx="1.2" fill="rgba(0,0,0,.4)"/>';
  if(/suv$|suv_l|offroad|wagon|cuv|mpv/.test(arch)) details+='<rect x="'+(roofF+7)+'" y="'+(top-2.6)+'" width="'+(roofR-roofF-10)+'" height="2.2" rx="1.1" fill="rgba(0,0,0,.3)"/>';
  function wheel(cx){
    return '<circle cx="'+cx+'" cy="'+G+'" r="'+r+'" fill="#14161b"/>'
      +'<circle cx="'+cx+'" cy="'+G+'" r="'+(r*0.52)+'" fill="none" stroke="rgba(255,255,255,.30)" stroke-width="'+(ev?2.4:1.6)+'"/>'
      +(ev?'':'<circle cx="'+cx+'" cy="'+G+'" r="'+(r*0.14)+'" fill="rgba(255,255,255,.35)"/>');
  }
  return '<svg class="car-shape car-shape-svg" viewBox="0 0 260 110" role="img" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">'
    +'<ellipse cx="130" cy="99" rx="'+(L/2-6)+'" ry="3.4" fill="rgba(0,0,0,.14)"/>'
    +'<path d="'+d+'" fill="var(--visual-color,#5560f0)"/>'
    +'<path d="'+w1+'" fill="rgba(13,16,23,.82)"/>'
    +'<path d="'+w2+'" fill="rgba(13,16,23,.82)"/>'
    +details
    +wheel(rw)+wheel(fw)
    +'</svg>';
}

window.CAR_VISUALS={svg:svgFor,archetype:pickArch,ARCH:ARCH};
})();
