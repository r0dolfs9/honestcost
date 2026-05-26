// Direction 1 — POLESTAR
// Light, ultra-minimal, lots of whitespace, mono numerics, sharp typography.
// Single neutral palette + a hairline indigo accent. Inspired by Polestar / Porsche configurators.

const { Icon, Logo, SparkLine, SAMPLE, fmtEur, fmtEurMo } = window.HC;

const polestarVars = {
  ink: "#0B0E14",
  ink2: "#3A3F4A",
  ink3: "#7A808C",
  ink4: "#B9BDC6",
  line: "#E6E7EB",
  bg: "#FAFAF8",
  surface: "#FFFFFF",
  accent: "#2541E0",
  accentSoft: "#EEF1FE",
  win: "#197A4F",
  lose: "#B23A3A",
  amber: "#E0A23A",
};

const polestarBase = {
  fontFamily: "'Inter Tight', 'Inter', -apple-system, sans-serif",
  color: polestarVars.ink,
  background: polestarVars.bg,
  fontSize: 13,
  lineHeight: 1.45,
  letterSpacing: "-0.005em",
};

const PolestarChrome = ({ children, label, right }) => (
  <div style={{ ...polestarBase, minHeight: 900, padding: "32px 48px 48px" }}>
    <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingBottom: 28, borderBottom: `1px solid ${polestarVars.line}` }}>
      <Logo size={20} dotColor={polestarVars.amber} textColor={polestarVars.ink} weight={600} />
      <nav style={{ display: "flex", gap: 28, fontSize: 12, color: polestarVars.ink2, letterSpacing: "0.02em" }}>
        <span style={{ color: polestarVars.ink }}>Salīdzinājums</span>
        <span>Datubāze</span>
        <span>Kā mēs aprēķinām</span>
        <span>FAQ</span>
      </nav>
      <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 12, color: polestarVars.ink2 }}>
        <span>LV / EN</span>
        <span style={{ width: 1, height: 14, background: polestarVars.line }} />
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 12px", border: `1px solid ${polestarVars.line}`, borderRadius: 999 }}>
          <Icon name="user" size={13} stroke={polestarVars.ink2} /> Saglabāt
        </span>
      </div>
    </header>
    <div style={{ marginTop: 32, display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
      <div>
        <div style={{ fontSize: 11, color: polestarVars.ink3, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 8 }}>
          {label}
        </div>
      </div>
      {right}
    </div>
    {children}
  </div>
);

// ── INPUT SCREEN ──────────────────────────────────────────────
const PolestarInput = () => {
  return (
    <PolestarChrome
      label="01 — Konfigurēt"
      right={
        <div style={{ display: "flex", gap: 6, fontSize: 11, color: polestarVars.ink3 }}>
          <span style={{ color: polestarVars.ink }}>1 Konfigurēt</span>
          <span>·</span>
          <span>2 Salīdzināt</span>
          <span>·</span>
          <span>3 Lemt</span>
        </div>
      }
    >
      <h1
        style={{
          fontFamily: "'Barlow Condensed', 'Inter Tight', sans-serif",
          fontWeight: 500,
          fontSize: 64,
          lineHeight: 1,
          letterSpacing: "-0.03em",
          marginTop: 16,
          maxWidth: 800,
        }}
      >
        Ne tikai cena.<br />
        <span style={{ color: polestarVars.ink3 }}>Pilnās izmaksas, mēnesī.</span>
      </h1>
      <p style={{ marginTop: 18, fontSize: 14, color: polestarVars.ink2, maxWidth: 540 }}>
        Salīdzini divus jaunus automobiļus — ieskaitot amortizāciju, KASKO, riepas, apkopi un transporta nodokli. Latvijai, 2026.
      </p>

      {/* Global params */}
      <div style={{ marginTop: 40, display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 0, border: `1px solid ${polestarVars.line}`, background: polestarVars.surface }}>
        {[
          { l: "Periods", v: "5 gadi", sub: "1 — 10 gadi" },
          { l: "Nobraukums", v: "15 000 km/g", sub: "5 000 — 75 000" },
          { l: "Finansēšana", v: "Līzings", sub: "Pirmā 20% · 4.5% · 48m" },
          { l: "Tirgus", v: "Latvija", sub: "Cenas EUR · 2026" },
        ].map((it, i) => (
          <div key={i} style={{ padding: "22px 24px", borderRight: i < 3 ? `1px solid ${polestarVars.line}` : "none" }}>
            <div style={{ fontSize: 10, color: polestarVars.ink3, letterSpacing: "0.14em", textTransform: "uppercase" }}>{it.l}</div>
            <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 28, marginTop: 6, letterSpacing: "-0.02em" }}>{it.v}</div>
            <div style={{ fontSize: 11, color: polestarVars.ink3, marginTop: 2 }}>{it.sub}</div>
          </div>
        ))}
      </div>

      {/* Two car columns */}
      <div style={{ marginTop: 28, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28 }}>
        {[SAMPLE.carA, SAMPLE.carB].map((car, idx) => (
          <PolestarCarForm key={idx} car={car} letter={idx === 0 ? "A" : "B"} />
        ))}
      </div>

      <div style={{ marginTop: 36, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontSize: 11, color: polestarVars.ink3 }}>
          Visi aprēķini notiek tavā pārlūkā · Bez reģistrācijas
        </div>
        <button
          style={{
            background: polestarVars.ink,
            color: polestarVars.bg,
            border: "none",
            padding: "16px 32px",
            fontSize: 13,
            fontFamily: "inherit",
            fontWeight: 500,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            display: "inline-flex",
            alignItems: "center",
            gap: 12,
            cursor: "pointer",
          }}
        >
          Salīdzināt <Icon name="arrow" size={14} stroke={polestarVars.bg} />
        </button>
      </div>
    </PolestarChrome>
  );
};

const PolestarCarForm = ({ car, letter }) => (
  <section style={{ background: polestarVars.surface, border: `1px solid ${polestarVars.line}` }}>
    <header style={{ padding: "18px 24px", borderBottom: `1px solid ${polestarVars.line}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <span style={{ width: 22, height: 22, borderRadius: "50%", border: `1px solid ${polestarVars.ink}`, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 600 }}>
          {letter}
        </span>
        <span style={{ fontSize: 12, color: polestarVars.ink3, letterSpacing: "0.06em", textTransform: "uppercase" }}>
          Automobilis {letter}
        </span>
      </div>
      <Icon name="car" size={16} stroke={polestarVars.ink3} />
    </header>

    {/* Smart search */}
    <div style={{ padding: "20px 24px", borderBottom: `1px solid ${polestarVars.line}` }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 14px", border: `1px solid ${polestarVars.ink}`, background: polestarVars.bg }}>
        <Icon name="search" size={14} stroke={polestarVars.ink} />
        <span style={{ fontSize: 14, fontWeight: 500, flex: 1 }}>{car.name}</span>
        <span style={{ fontSize: 11, color: polestarVars.ink3, letterSpacing: "0.06em", textTransform: "uppercase" }}>Datubāze</span>
      </div>
      <div style={{ fontSize: 11, color: polestarVars.ink3, marginTop: 8 }}>{car.trim}</div>
    </div>

    {/* Price block */}
    <div style={{ padding: "24px 24px 20px", borderBottom: `1px solid ${polestarVars.line}`, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
      <div>
        <div style={{ fontSize: 10, color: polestarVars.ink3, letterSpacing: "0.14em", textTransform: "uppercase" }}>Cena</div>
        <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 40, marginTop: 4, letterSpacing: "-0.02em", lineHeight: 1 }}>
          {fmtEur(car.price)}
        </div>
      </div>
      <div>
        <div style={{ fontSize: 10, color: polestarVars.ink3, letterSpacing: "0.14em", textTransform: "uppercase" }}>Garantija</div>
        <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 40, marginTop: 4, letterSpacing: "-0.02em", lineHeight: 1 }}>
          {car.warranty}<span style={{ fontSize: 18, color: polestarVars.ink3 }}> gadi</span>
        </div>
      </div>
    </div>

    {/* Spec rows */}
    {[
      ["Degvielas tips", car.fuelType, "fuel"],
      ["Patēriņš", `${car.consumption} L/100km`, "fuel"],
      ["CO₂", `${car.co2} g/km`, "leaf"],
      ["Nolietojums", "Vidējā klase", "chart"],
      ["KASKO līmenis", "Standarta 2.5%", "shield"],
      ["Riepas", "17\" · €390/g", "tire"],
    ].map(([l, v, ic], i, arr) => (
      <div
        key={i}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "14px 24px",
          borderBottom: i < arr.length - 1 ? `1px solid ${polestarVars.line}` : "none",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10, color: polestarVars.ink2 }}>
          <Icon name={ic} size={14} stroke={polestarVars.ink3} />
          <span style={{ fontSize: 13 }}>{l}</span>
        </div>
        <span style={{ fontFamily: "'DM Mono', ui-monospace, monospace", fontSize: 12, color: polestarVars.ink }}>{v}</span>
      </div>
    ))}

    <button style={{ width: "100%", padding: "16px 24px", background: "transparent", border: "none", borderTop: `1px solid ${polestarVars.line}`, fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: polestarVars.ink, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, cursor: "pointer", fontFamily: "inherit" }}>
      Papildu parametri <Icon name="chevronDown" size={12} stroke={polestarVars.ink} />
    </button>
  </section>
);

// ── RESULTS SCREEN ───────────────────────────────────────────
const PolestarResults = () => {
  const { carA, carB, summary } = SAMPLE;
  const aWin = carA.monthly < carB.monthly;
  return (
    <PolestarChrome
      label="02 — Salīdzinājums"
      right={
        <div style={{ display: "flex", gap: 6, fontSize: 11, color: polestarVars.ink3 }}>
          <span>1 Konfigurēt</span>
          <span>·</span>
          <span style={{ color: polestarVars.ink }}>2 Salīdzināt</span>
          <span>·</span>
          <span>3 Lemt</span>
        </div>
      }
    >
      {/* Verdict bar */}
      <div style={{ marginTop: 18, display: "grid", gridTemplateColumns: "auto 1fr auto", gap: 40, alignItems: "end", paddingBottom: 28, borderBottom: `1px solid ${polestarVars.line}` }}>
        <div>
          <div style={{ fontSize: 11, color: polestarVars.ink3, letterSpacing: "0.14em", textTransform: "uppercase" }}>Lētākais</div>
          <div
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: 56,
              letterSpacing: "-0.025em",
              lineHeight: 1,
              marginTop: 4,
            }}
          >
            {summary.cheaperName}
          </div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 11, color: polestarVars.ink3, letterSpacing: "0.14em", textTransform: "uppercase" }}>
            Ietaupījums {summary.horizonLabel}
          </div>
          <div
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: 88,
              letterSpacing: "-0.035em",
              lineHeight: 1,
              marginTop: 4,
              color: polestarVars.win,
            }}
          >
            {fmtEur(summary.totalDelta)}
          </div>
          <div style={{ fontSize: 12, color: polestarVars.ink2, marginTop: 6 }}>
            {fmtEur(summary.monthlyDelta)} starpība katru mēnesi · {SAMPLE.horizon} gadi · {SAMPLE.annualKm.toLocaleString("lv-LV")} km/g
          </div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button style={polestarGhostBtn}>Rediģēt</button>
          <button style={polestarGhostBtn}>Kopēt saiti</button>
          <button style={polestarSolidBtn}>Saglabāt</button>
        </div>
      </div>

      {/* Two result columns */}
      <div style={{ marginTop: 32, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28 }}>
        <PolestarResultCard car={carA} letter="A" winner={aWin} />
        <PolestarResultCard car={carB} letter="B" winner={!aWin} />
      </div>

      {/* Residual curve overlay */}
      <div style={{ marginTop: 32, padding: 28, background: polestarVars.surface, border: `1px solid ${polestarVars.line}` }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 20 }}>
          <div>
            <div style={{ fontSize: 11, color: polestarVars.ink3, letterSpacing: "0.14em", textTransform: "uppercase" }}>Tirgus vērtība</div>
            <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 28, marginTop: 4, letterSpacing: "-0.02em" }}>
              Nolietojums 5 gados
            </div>
          </div>
          <div style={{ display: "flex", gap: 18, fontSize: 12, color: polestarVars.ink2 }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><span style={{ width: 18, height: 1.5, background: polestarVars.ink }} /> {carA.name}</span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><span style={{ width: 18, height: 1.5, background: polestarVars.accent }} /> {carB.name}</span>
          </div>
        </div>
        <div style={{ position: "relative", height: 180 }}>
          <svg width="100%" height="180" viewBox="0 0 800 180" preserveAspectRatio="none">
            {[0, 0.25, 0.5, 0.75, 1].map((p, i) => (
              <line key={i} x1="0" x2="800" y1={p * 180} y2={p * 180} stroke={polestarVars.line} strokeWidth="0.75" />
            ))}
            <PolestarCurve data={carA.residualCurve} color={polestarVars.ink} />
            <PolestarCurve data={carB.residualCurve} color={polestarVars.accent} dashed />
          </svg>
          <div style={{ position: "absolute", bottom: -22, left: 0, right: 0, display: "flex", justifyContent: "space-between", fontSize: 10, fontFamily: "'DM Mono', monospace", color: polestarVars.ink3 }}>
            {["0", "1", "2", "3", "4", "5"].map((y) => <span key={y}>{y}g</span>)}
          </div>
        </div>
      </div>
    </PolestarChrome>
  );
};

const PolestarCurve = ({ data, color, dashed }) => {
  const max = Math.max(...data);
  const W = 800, H = 180;
  const pts = data.map((v, i) => [(i / (data.length - 1)) * W, H - (v / max) * H * 0.95 + 4]);
  const d = pts.map(([x, y], i) => (i === 0 ? `M${x},${y}` : `L${x},${y}`)).join(" ");
  return (
    <>
      <path d={d} stroke={color} strokeWidth="1.75" fill="none" strokeDasharray={dashed ? "5 4" : "0"} />
      {pts.map(([x, y], i) => <circle key={i} cx={x} cy={y} r="3" fill={color} />)}
    </>
  );
};

const PolestarResultCard = ({ car, letter, winner }) => {
  const { horizon } = SAMPLE;
  return (
    <article style={{ background: polestarVars.surface, border: `1px solid ${polestarVars.line}`, padding: "28px 28px 24px" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 11, color: polestarVars.ink3, letterSpacing: "0.14em", textTransform: "uppercase" }}>
            <span style={{ width: 18, height: 18, borderRadius: "50%", border: `1px solid ${polestarVars.ink}`, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 600 }}>{letter}</span>
            Automobilis {letter}
          </div>
          <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 32, letterSpacing: "-0.02em", marginTop: 8, lineHeight: 1.05 }}>
            {car.name}
          </div>
          <div style={{ fontSize: 12, color: polestarVars.ink3, marginTop: 4 }}>{car.trim} · {fmtEur(car.price)}</div>
        </div>
        {winner && (
          <span style={{ padding: "5px 10px", border: `1px solid ${polestarVars.win}`, color: polestarVars.win, fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase" }}>
            Lētākais
          </span>
        )}
      </header>

      {/* Hero monthly */}
      <div style={{ paddingBottom: 24, borderBottom: `1px solid ${polestarVars.line}` }}>
        <div style={{ fontSize: 11, color: polestarVars.ink3, letterSpacing: "0.14em", textTransform: "uppercase" }}>Mēneša izmaksas</div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginTop: 2 }}>
          <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 96, letterSpacing: "-0.035em", lineHeight: 1, color: winner ? polestarVars.win : polestarVars.ink }}>
            {fmtEur(car.monthly)}
          </span>
          <span style={{ fontSize: 16, color: polestarVars.ink3 }}>/mēn</span>
        </div>
        <div style={{ fontSize: 12, color: polestarVars.ink2, marginTop: 6 }}>
          Kopā {horizon} gados — <span style={{ fontFamily: "'DM Mono', monospace" }}>{fmtEur(car.total5y)}</span>
        </div>
      </div>

      {/* Breakdown bars */}
      <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 12 }}>
        {car.breakdown.map((row, i) => (
          <div key={i}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 4 }}>
              <span style={{ color: polestarVars.ink2 }}>{row.label}</span>
              <span style={{ fontFamily: "'DM Mono', monospace", color: polestarVars.ink }}>{fmtEurMo(row.monthly)}</span>
            </div>
            <div style={{ height: 2, background: polestarVars.line, position: "relative" }}>
              <div style={{ position: "absolute", inset: 0, width: `${Math.min(row.share * 1.4, 100)}%`, background: polestarVars.ink }} />
            </div>
          </div>
        ))}
      </div>
    </article>
  );
};

const polestarGhostBtn = {
  background: "transparent",
  border: `1px solid ${polestarVars.line}`,
  color: polestarVars.ink,
  padding: "10px 16px",
  fontSize: 11,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  cursor: "pointer",
  fontFamily: "inherit",
};
const polestarSolidBtn = { ...polestarGhostBtn, background: polestarVars.ink, color: polestarVars.bg, border: `1px solid ${polestarVars.ink}` };

Object.assign(window, { PolestarInput, PolestarResults });
