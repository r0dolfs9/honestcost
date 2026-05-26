// Direction 3 — COCKPIT
// Dark technical UI — Linear / Vercel × BMW M dashboard. Signal-yellow accent,
// hairline grid lines, mono numerics, dense data. Performance car telemetry vibe.

const { Icon: CIcon, Logo: CLogo, SAMPLE: CSAMPLE, fmtEur: cFmtEur, fmtEurMo: cFmtEurMo } = window.HC;

const cockpitVars = {
  ink: "#F1F2F4",
  ink2: "#A4A8B2",
  ink3: "#666B76",
  ink4: "#3A3D45",
  line: "#23262D",
  line2: "#15171C",
  bg: "#0A0B0E",
  surface: "#101218",
  surface2: "#15171D",
  signal: "#F5D547", // signal yellow
  signalGlow: "rgba(245, 213, 71, 0.16)",
  accent: "#5B7BFF",
  win: "#5DE5A1",
  lose: "#FF6B6B",
  carA: "#5B7BFF",
  carB: "#F5D547",
};

const cockpitBase = {
  fontFamily: "'Inter Tight', 'Inter', -apple-system, sans-serif",
  color: cockpitVars.ink,
  background: cockpitVars.bg,
  fontSize: 13,
  lineHeight: 1.45,
  letterSpacing: "-0.005em",
  fontFeatureSettings: '"ss01", "cv11"',
};

const CockpitChrome = ({ children, screen }) => (
  <div style={{ ...cockpitBase, minHeight: 900, padding: "20px 28px 40px", backgroundImage: `radial-gradient(circle at 50% 0%, rgba(245,213,71,0.04), transparent 50%)` }}>
    {/* Top status bar */}
    <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 16px", border: `1px solid ${cockpitVars.line}`, borderRadius: 10, background: cockpitVars.surface, fontFamily: "'JetBrains Mono', 'DM Mono', monospace", fontSize: 11, color: cockpitVars.ink2 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <CLogo size={18} dotColor={cockpitVars.signal} textColor={cockpitVars.ink} weight={600} />
        <span style={{ width: 1, height: 14, background: cockpitVars.line }} />
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6, color: cockpitVars.signal }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: cockpitVars.signal, boxShadow: `0 0 8px ${cockpitVars.signal}` }} />
          LIVE
        </span>
        <span>v2.4.1</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 11 }}>
        <span>SCREEN: {screen}</span>
        <span>MKT: LV·EUR</span>
        <span>2026.Q2</span>
        <span style={{ color: cockpitVars.ink }}>kaspars@</span>
      </div>
    </header>
    {children}
  </div>
);

const cockpitLabel = (text) => (
  <div style={{ fontFamily: "'JetBrains Mono', 'DM Mono', monospace", fontSize: 10, color: cockpitVars.ink3, letterSpacing: "0.14em", textTransform: "uppercase" }}>{text}</div>
);

// ── INPUT SCREEN ────────────────────────────────────────────
const CockpitInput = () => {
  return (
    <CockpitChrome screen="01_CONFIG">
      {/* Title block */}
      <section style={{ marginTop: 24, display: "grid", gridTemplateColumns: "1fr auto", gap: 32, alignItems: "end", paddingBottom: 18, borderBottom: `1px solid ${cockpitVars.line}` }}>
        <div>
          {cockpitLabel("01 // configure_comparison")}
          <h1 style={{ fontFamily: "'Barlow Condensed', 'Inter Tight', sans-serif", fontWeight: 500, fontSize: 64, lineHeight: 0.95, letterSpacing: "-0.03em", marginTop: 10 }}>
            Tava nākamā auto<br />
            <span style={{ color: cockpitVars.signal }}>īstā cena.</span>
          </h1>
        </div>
        <div style={{ textAlign: "right" }}>
          {cockpitLabel("sample_pairs")}
          <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 6, alignItems: "flex-end" }}>
            {["BMW 118i × X1", "ID.4 × Tiguan", "Yaris × Fabia"].map((p, i) => (
              <span key={i} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, padding: "5px 10px", border: `1px solid ${cockpitVars.line}`, borderRadius: 4, background: i === 0 ? cockpitVars.surface : "transparent", color: i === 0 ? cockpitVars.signal : cockpitVars.ink2, cursor: "pointer" }}>
                ↑ {p}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Global params row */}
      <section style={{ marginTop: 20, display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
        {[
          { l: "horizon", v: "5", unit: "years", range: "1—10" },
          { l: "annual_km", v: "15 000", unit: "km/y", range: "5k—75k" },
          { l: "financing", v: "leasing", unit: "20% / 4.5% / 48m", range: "" },
          { l: "currency", v: "EUR", unit: "Latvia · 2026", range: "" },
        ].map((it, i) => (
          <div key={i} style={{ background: cockpitVars.surface, border: `1px solid ${cockpitVars.line}`, borderRadius: 8, padding: "14px 16px" }}>
            {cockpitLabel(it.l)}
            <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginTop: 6 }}>
              <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 30, letterSpacing: "-0.02em", lineHeight: 1 }}>{it.v}</span>
              <span style={{ fontSize: 11, color: cockpitVars.ink3, fontFamily: "'JetBrains Mono', monospace" }}>{it.unit}</span>
            </div>
            {it.range && <div style={{ marginTop: 8, height: 2, background: cockpitVars.line, position: "relative" }}>
              <div style={{ position: "absolute", inset: 0, width: i === 0 ? "44%" : i === 1 ? "14%" : "60%", background: cockpitVars.signal }} />
            </div>}
            {it.range && <div style={{ marginTop: 4, fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: cockpitVars.ink3, display: "flex", justifyContent: "space-between" }}>
              <span>{it.range.split("—")[0]}</span>
              <span>{it.range.split("—")[1]}</span>
            </div>}
          </div>
        ))}
      </section>

      {/* Two cars */}
      <div style={{ marginTop: 20, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <CockpitCarForm car={CSAMPLE.carA} letter="A" accent={cockpitVars.carA} />
        <CockpitCarForm car={CSAMPLE.carB} letter="B" accent={cockpitVars.carB} />
      </div>

      {/* Action bar */}
      <div style={{ marginTop: 20, display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 20px", border: `1px solid ${cockpitVars.line}`, borderRadius: 8, background: cockpitVars.surface }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: cockpitVars.ink2 }}>
          STATUS: <span style={{ color: cockpitVars.win }}>READY</span> · 2/2 vehicles configured · client-side compute
        </div>
        <button
          style={{
            background: cockpitVars.signal,
            color: cockpitVars.bg,
            border: "none",
            padding: "12px 28px",
            fontSize: 13,
            fontFamily: "'JetBrains Mono', monospace",
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            cursor: "pointer",
            borderRadius: 4,
            boxShadow: `0 0 24px ${cockpitVars.signalGlow}`,
          }}
        >
          Run_compare() <CIcon name="arrow" size={14} stroke={cockpitVars.bg} />
        </button>
      </div>
    </CockpitChrome>
  );
};

const CockpitCarForm = ({ car, letter, accent }) => (
  <section style={{ background: cockpitVars.surface, border: `1px solid ${cockpitVars.line}`, borderRadius: 8, overflow: "hidden" }}>
    {/* Header */}
    <div style={{ padding: "14px 18px", borderBottom: `1px solid ${cockpitVars.line}`, display: "flex", alignItems: "center", justifyContent: "space-between", background: cockpitVars.surface2 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ width: 28, height: 28, borderRadius: 4, background: accent, color: cockpitVars.bg, display: "inline-flex", alignItems: "center", justifyContent: "center", fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 15 }}>
          {letter}
        </span>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: cockpitVars.ink2, letterSpacing: "0.1em", textTransform: "uppercase" }}>
          unit_{letter.toLowerCase()}
        </span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: cockpitVars.ink3 }}>
        <span style={{ width: 6, height: 6, borderRadius: "50%", background: cockpitVars.win }} />
        validated
      </div>
    </div>

    {/* Search */}
    <div style={{ padding: 14, borderBottom: `1px solid ${cockpitVars.line}` }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", background: cockpitVars.bg, border: `1px solid ${cockpitVars.line}`, borderRadius: 6 }}>
        <CIcon name="search" size={13} stroke={cockpitVars.ink3} />
        <span style={{ fontSize: 14, fontWeight: 500, flex: 1 }}>{car.name}</span>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: cockpitVars.signal }}>DB · MATCH</span>
      </div>
      <div style={{ marginTop: 8, fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: cockpitVars.ink3 }}>{car.trim}</div>
    </div>

    {/* Price + warranty in big numbers */}
    <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", borderBottom: `1px solid ${cockpitVars.line}` }}>
      <div style={{ padding: "16px 18px", borderRight: `1px solid ${cockpitVars.line}` }}>
        {cockpitLabel("price")}
        <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 36, letterSpacing: "-0.02em", marginTop: 4, lineHeight: 1 }}>
          {cFmtEur(car.price)}
        </div>
      </div>
      <div style={{ padding: "16px 18px" }}>
        {cockpitLabel("warranty")}
        <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 36, letterSpacing: "-0.02em", marginTop: 4, lineHeight: 1 }}>
          {car.warranty}<span style={{ fontSize: 14, color: cockpitVars.ink3 }}>g</span>
        </div>
      </div>
    </div>

    {/* Telemetry-style param grid */}
    <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "'JetBrains Mono', monospace", fontSize: 12 }}>
      <tbody>
        {[
          ["fuel_type", car.fuelType.toLowerCase(), null],
          ["consumption", `${car.consumption} L/100km`, "wltp"],
          ["co2_emission", `${car.co2} g/km`, "wltp"],
          ["dep_category", "mid_class", null],
          ["kasko_tier", "standard_2.5%", null],
          ["tire_class", "17in · €390/y", null],
          ["service_interval", `${20000} km`, null],
          ["repair_risk", "med", null],
        ].map(([k, v, tag], i, arr) => (
          <tr key={i} style={{ borderBottom: i < arr.length - 1 ? `1px solid ${cockpitVars.line}` : "none" }}>
            <td style={{ padding: "10px 18px", color: cockpitVars.ink3, width: "45%" }}>{k}</td>
            <td style={{ padding: "10px 18px", color: cockpitVars.ink, textAlign: "right" }}>
              {v}{tag && <span style={{ marginLeft: 8, color: cockpitVars.signal, fontSize: 10 }}>[{tag}]</span>}
            </td>
          </tr>
        ))}
      </tbody>
    </table>

    <button style={{ width: "100%", padding: "12px", background: "transparent", border: "none", borderTop: `1px solid ${cockpitVars.line}`, color: cockpitVars.ink2, fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
      $ edit_params <CIcon name="chevronDown" size={12} stroke={cockpitVars.ink2} />
    </button>
  </section>
);

// ── RESULTS SCREEN ─────────────────────────────────────────
const CockpitResults = () => {
  const { carA, carB, summary, horizon } = CSAMPLE;
  const aWin = carA.monthly < carB.monthly;
  return (
    <CockpitChrome screen="02_OUTPUT">
      {/* Headline verdict */}
      <section style={{ marginTop: 20, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
        <div style={{ gridColumn: "1 / 3", background: cockpitVars.surface, border: `1px solid ${cockpitVars.line}`, borderRadius: 8, padding: "26px 32px", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 0, right: 0, width: 240, height: 240, background: `radial-gradient(circle, ${cockpitVars.signalGlow} 0%, transparent 70%)`, filter: "blur(8px)" }} />
          <div style={{ position: "relative" }}>
            {cockpitLabel("verdict // cheaper_unit")}
            <div style={{ display: "flex", alignItems: "flex-start", gap: 32, marginTop: 12 }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 56, letterSpacing: "-0.03em", lineHeight: 0.95 }}>
                  {summary.cheaperName}
                </div>
                <div style={{ marginTop: 8, fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: cockpitVars.ink2 }}>
                  unit_a · saves <span style={{ color: cockpitVars.signal }}>{cFmtEur(summary.totalDelta)}</span> over {horizon}y
                </div>
              </div>
              <div>
                {cockpitLabel("Δ_total")}
                <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 88, letterSpacing: "-0.035em", lineHeight: 1, color: cockpitVars.signal, textShadow: `0 0 32px ${cockpitVars.signalGlow}` }}>
                  −{cFmtEur(summary.totalDelta)}
                </div>
                <div style={{ marginTop: 4, fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: cockpitVars.ink2, textAlign: "right" }}>
                  {cFmtEur(summary.monthlyDelta)}/mo · 60 months
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action / share panel */}
        <div style={{ background: cockpitVars.surface, border: `1px solid ${cockpitVars.line}`, borderRadius: 8, padding: 16, display: "flex", flexDirection: "column", gap: 8 }}>
          {cockpitLabel("actions")}
          {[
            { l: "edit_params", k: "⌘E" },
            { l: "copy_link", k: "⌘L" },
            { l: "export_pdf", k: "⌘P" },
            { l: "save_to_account", k: "⌘S" },
          ].map((a, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 12px", background: cockpitVars.bg, border: `1px solid ${cockpitVars.line}`, borderRadius: 4, fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: cockpitVars.ink, cursor: "pointer" }}>
              <span>$ {a.l}</span>
              <span style={{ color: cockpitVars.ink3 }}>{a.k}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Two result cards */}
      <div style={{ marginTop: 12, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <CockpitResultCard car={carA} letter="A" accent={cockpitVars.carA} winner={aWin} />
        <CockpitResultCard car={carB} letter="B" accent={cockpitVars.carB} winner={!aWin} />
      </div>

      {/* Telemetry strip */}
      <section style={{ marginTop: 12, background: cockpitVars.surface, border: `1px solid ${cockpitVars.line}`, borderRadius: 8, padding: "20px 24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 14 }}>
          {cockpitLabel("depreciation_curve // 60m")}
          <div style={{ display: "flex", gap: 14, fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: cockpitVars.ink2 }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><span style={{ width: 12, height: 1.5, background: cockpitVars.carA }} /> A</span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><span style={{ width: 12, height: 1.5, background: cockpitVars.carB }} /> B</span>
          </div>
        </div>
        <CockpitDepChart />
      </section>
    </CockpitChrome>
  );
};

const CockpitDepChart = () => {
  const { carA, carB } = CSAMPLE;
  const max = Math.max(...carA.residualCurve, ...carB.residualCurve);
  const W = 1100, H = 160;
  const toPts = (data) => data.map((v, i) => [(i / (data.length - 1)) * W, H - (v / max) * (H - 20)]);
  const path = (pts) => pts.map(([x, y], i) => (i === 0 ? `M${x},${y}` : `L${x},${y}`)).join(" ");
  const ptsA = toPts(carA.residualCurve);
  const ptsB = toPts(carB.residualCurve);
  return (
    <div style={{ position: "relative" }}>
      <svg width="100%" height={H + 24} viewBox={`0 0 ${W} ${H + 24}`} preserveAspectRatio="none" style={{ overflow: "visible" }}>
        {[0, 0.25, 0.5, 0.75, 1].map((p, i) => (
          <g key={i}>
            <line x1="0" x2={W} y1={p * H} y2={p * H} stroke={cockpitVars.line} strokeWidth="0.75" strokeDasharray="2 4" />
            <text x={W} y={p * H - 4} fontFamily="JetBrains Mono, monospace" fontSize="10" fill={cockpitVars.ink3} textAnchor="end">
              {Math.round(max * (1 - p) / 1000)}k€
            </text>
          </g>
        ))}
        <path d={path(ptsB)} stroke={cockpitVars.carB} strokeWidth="1.5" fill="none" />
        <path d={path(ptsA)} stroke={cockpitVars.carA} strokeWidth="1.5" fill="none" />
        {[...ptsA, ...ptsB].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="2" fill={cockpitVars.bg} stroke={i < ptsA.length ? cockpitVars.carA : cockpitVars.carB} strokeWidth="1.5" />
        ))}
        {["00", "12", "24", "36", "48", "60"].map((m, i) => (
          <text key={i} x={(i / 5) * W} y={H + 18} fontFamily="JetBrains Mono, monospace" fontSize="10" fill={cockpitVars.ink3} textAnchor={i === 0 ? "start" : i === 5 ? "end" : "middle"}>
            t+{m}m
          </text>
        ))}
      </svg>
    </div>
  );
};

const CockpitResultCard = ({ car, letter, accent, winner }) => {
  return (
    <article style={{ background: cockpitVars.surface, border: `1px solid ${cockpitVars.line}`, borderRadius: 8, padding: "20px 22px 18px", position: "relative", overflow: "hidden" }}>
      {/* Header */}
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ width: 24, height: 24, borderRadius: 4, background: accent, color: cockpitVars.bg, display: "inline-flex", alignItems: "center", justifyContent: "center", fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 14 }}>
            {letter}
          </span>
          <div>
            <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 22, letterSpacing: "-0.015em", lineHeight: 1 }}>{car.name}</div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: cockpitVars.ink3, marginTop: 4 }}>{car.trim}</div>
          </div>
        </div>
        {winner ? (
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 9px", background: cockpitVars.signalGlow, border: `1px solid ${cockpitVars.signal}`, color: cockpitVars.signal, fontSize: 10, fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.08em", borderRadius: 3, textTransform: "uppercase" }}>
            ★ WINNER
          </span>
        ) : (
          <span style={{ padding: "4px 9px", background: "rgba(255,107,107,0.1)", border: `1px solid ${cockpitVars.lose}`, color: cockpitVars.lose, fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", borderRadius: 3 }}>
            +{cFmtEur(CSAMPLE.summary.monthlyDelta)}/mo
          </span>
        )}
      </header>

      {/* Hero number */}
      <div style={{ padding: "16px 0 14px", borderBottom: `1px solid ${cockpitVars.line}` }}>
        {cockpitLabel("monthly_cost · 60m_avg")}
        <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginTop: 6 }}>
          <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 76, letterSpacing: "-0.035em", lineHeight: 0.9, color: winner ? cockpitVars.signal : cockpitVars.ink }}>
            {cFmtEur(car.monthly)}
          </span>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: cockpitVars.ink3 }}>/mo</span>
        </div>
        <div style={{ marginTop: 6, fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: cockpitVars.ink2 }}>
          Σ 60m = <span style={{ color: cockpitVars.ink }}>{cFmtEur(car.total5y)}</span>
        </div>
      </div>

      {/* Breakdown table */}
      <table style={{ width: "100%", borderCollapse: "collapse", marginTop: 14, fontFamily: "'JetBrains Mono', monospace", fontSize: 11 }}>
        <thead>
          <tr style={{ borderBottom: `1px solid ${cockpitVars.line}` }}>
            <th style={{ padding: "6px 0", textAlign: "left", color: cockpitVars.ink3, fontWeight: 400, letterSpacing: "0.06em", textTransform: "uppercase", fontSize: 10 }}>category</th>
            <th style={{ padding: "6px 0", textAlign: "right", color: cockpitVars.ink3, fontWeight: 400, letterSpacing: "0.06em", textTransform: "uppercase", fontSize: 10 }}>/mo</th>
            <th style={{ padding: "6px 0", textAlign: "right", color: cockpitVars.ink3, fontWeight: 400, letterSpacing: "0.06em", textTransform: "uppercase", fontSize: 10 }}>share</th>
          </tr>
        </thead>
        <tbody>
          {car.breakdown.map((row, i) => (
            <tr key={i}>
              <td style={{ padding: "8px 0", color: cockpitVars.ink2 }}>{row.label.toLowerCase().replace(/\s+/g, "_")}</td>
              <td style={{ padding: "8px 0", textAlign: "right", color: cockpitVars.ink }}>{cFmtEur(row.monthly)}</td>
              <td style={{ padding: "8px 0", textAlign: "right", color: cockpitVars.ink3, width: 80 }}>
                <span style={{ display: "inline-block", width: 40, height: 2, background: cockpitVars.line, position: "relative", marginRight: 8, verticalAlign: "middle" }}>
                  <span style={{ position: "absolute", inset: 0, width: `${Math.min(row.share * 1.4, 100)}%`, background: accent }} />
                </span>
                {row.share}%
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr style={{ borderTop: `1px solid ${cockpitVars.line}` }}>
            <td style={{ padding: "10px 0", color: cockpitVars.ink, fontWeight: 600 }}>TOTAL</td>
            <td style={{ padding: "10px 0", textAlign: "right", color: cockpitVars.ink, fontWeight: 600 }}>{cFmtEur(car.monthly)}</td>
            <td style={{ padding: "10px 0", textAlign: "right", color: cockpitVars.ink3 }}>100%</td>
          </tr>
        </tfoot>
      </table>
    </article>
  );
};

Object.assign(window, { CockpitInput, CockpitResults });
