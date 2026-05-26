// Direction 2 — STUDIO
// Apple Card / Wallet — soft pillowy surfaces, large friendly numerics, warm off-white.
// Rounded everything, gentle shadows, indigo primary kept but warmed.

const { Icon: SIcon, Logo: SLogo, SAMPLE: SSAMPLE, fmtEur: sFmtEur, fmtEurMo: sFmtEurMo } = window.HC;

const studioVars = {
  ink: "#16181D",
  ink2: "#4A4E58",
  ink3: "#878B95",
  line: "#ECEAE3",
  bg: "#F4F2EC", // warm off-white
  surface: "#FFFFFF",
  accent: "#3344F0",
  accentSoft: "#EBEDFF",
  amber: "#F5A623",
  win: "#11A05F",
  winSoft: "#E5F6EE",
  lose: "#D24545",
  loseSoft: "#FBEAEA",
  carA: "#3344F0",
  carB: "#9A6CFF",
};

const studioBase = {
  fontFamily: "'Inter Tight', 'Inter', -apple-system, sans-serif",
  color: studioVars.ink,
  background: studioVars.bg,
  fontSize: 14,
  lineHeight: 1.5,
  letterSpacing: "-0.005em",
};

const studioShadow = "0 1px 2px rgba(20,22,28,.04), 0 8px 28px -8px rgba(20,22,28,.10)";
const studioShadowLg = "0 2px 4px rgba(20,22,28,.05), 0 24px 56px -16px rgba(20,22,28,.16)";

const StudioChrome = ({ children }) => (
  <div style={{ ...studioBase, minHeight: 900, padding: "28px 36px 48px" }}>
    <header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "14px 20px",
        background: studioVars.surface,
        borderRadius: 18,
        boxShadow: studioShadow,
      }}
    >
      <SLogo size={22} dotColor={studioVars.amber} textColor={studioVars.ink} weight={700} />
      <nav style={{ display: "flex", gap: 6, fontSize: 13, color: studioVars.ink2 }}>
        {["Salīdzināt", "Modeļi", "Kā tas darbojas", "Blogs"].map((l, i) => (
          <span key={l} style={{ padding: "8px 14px", borderRadius: 999, background: i === 0 ? studioVars.bg : "transparent", color: i === 0 ? studioVars.ink : studioVars.ink2 }}>
            {l}
          </span>
        ))}
      </nav>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ padding: "8px 14px", borderRadius: 999, background: studioVars.bg, fontSize: 13, color: studioVars.ink2 }}>LV</span>
        <button
          style={{
            background: studioVars.ink,
            color: studioVars.surface,
            border: "none",
            padding: "10px 18px",
            borderRadius: 999,
            fontSize: 13,
            fontWeight: 500,
            cursor: "pointer",
            fontFamily: "inherit",
          }}
        >
          Pieslēgties
        </button>
      </div>
    </header>
    {children}
  </div>
);

// ── INPUT SCREEN ──────────────────────────────────────────────
const StudioInput = () => {
  return (
    <StudioChrome>
      {/* Hero */}
      <section style={{ marginTop: 36, textAlign: "center", padding: "0 20px" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 14px", borderRadius: 999, background: studioVars.surface, boxShadow: studioShadow, fontSize: 12, color: studioVars.ink2 }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: studioVars.win }} />
          1 240 salīdzinājumi šomēnes
        </div>
        <h1
          style={{
            fontFamily: "'Inter Tight', sans-serif",
            fontWeight: 600,
            fontSize: 72,
            lineHeight: 1.02,
            letterSpacing: "-0.035em",
            marginTop: 20,
            maxWidth: 880,
            margin: "20px auto 0",
          }}
        >
          Reālā mēneša cena — <span style={{ color: studioVars.ink3 }}>nevis bukleta</span>.
        </h1>
        <p style={{ marginTop: 14, fontSize: 17, color: studioVars.ink2, maxWidth: 560, margin: "14px auto 0" }}>
          Ievadi divus auto. Mēs apvienojam amortizāciju, KASKO, riepas, apkopi un nodokli vienā skaitlī.
        </p>
      </section>

      {/* Global settings pill */}
      <div
        style={{
          margin: "32px auto 0",
          maxWidth: 720,
          background: studioVars.surface,
          borderRadius: 24,
          padding: 6,
          boxShadow: studioShadow,
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 4,
        }}
      >
        {[
          { l: "Periods", v: "5 gadi", icon: "chart" },
          { l: "Nobraukums", v: "15 000 km/g", icon: "sliders" },
          { l: "Finansēšana", v: "Līzings", icon: "coins" },
        ].map((it, i) => (
          <div key={i} style={{ padding: "14px 18px", borderRadius: 20, background: i === 0 ? studioVars.bg : "transparent", display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ width: 36, height: 36, borderRadius: 12, background: i === 0 ? studioVars.surface : studioVars.bg, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
              <SIcon name={it.icon} size={16} stroke={studioVars.ink2} />
            </span>
            <div>
              <div style={{ fontSize: 11, color: studioVars.ink3 }}>{it.l}</div>
              <div style={{ fontSize: 14, fontWeight: 500 }}>{it.v}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Two cars */}
      <div style={{ marginTop: 32, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        <StudioCarCard car={SSAMPLE.carA} accent={studioVars.carA} />
        <StudioCarCard car={SSAMPLE.carB} accent={studioVars.carB} />
      </div>

      {/* CTA */}
      <div style={{ marginTop: 40, textAlign: "center" }}>
        <button
          style={{
            background: studioVars.ink,
            color: studioVars.surface,
            border: "none",
            padding: "20px 44px",
            fontSize: 16,
            fontWeight: 500,
            borderRadius: 999,
            display: "inline-flex",
            alignItems: "center",
            gap: 12,
            cursor: "pointer",
            fontFamily: "inherit",
            boxShadow: studioShadowLg,
          }}
        >
          Salīdzināt izmaksas <SIcon name="arrow" size={16} stroke={studioVars.surface} />
        </button>
        <div style={{ marginTop: 14, fontSize: 12, color: studioVars.ink3 }}>
          Bez reģistrācijas · Aprēķini notiek tavā ierīcē
        </div>
      </div>
    </StudioChrome>
  );
};

const StudioCarCard = ({ car, accent }) => (
  <section style={{ background: studioVars.surface, borderRadius: 28, padding: 28, boxShadow: studioShadow }}>
    {/* Header */}
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
      <span style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "6px 12px 6px 6px", background: studioVars.bg, borderRadius: 999, fontSize: 12, color: studioVars.ink2 }}>
        <span style={{ width: 24, height: 24, borderRadius: "50%", background: accent, color: "white", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700 }}>
          A
        </span>
        Automobilis A
      </span>
      <span style={{ fontSize: 12, color: studioVars.ink3 }}>Lucid auto-fill</span>
    </div>

    {/* Hero search/name */}
    <div
      style={{
        background: studioVars.bg,
        borderRadius: 20,
        padding: "22px 22px 18px",
        marginBottom: 18,
      }}
    >
      <div style={{ fontSize: 11, color: studioVars.ink3, marginBottom: 6 }}>Modelis</div>
      <div style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 28, fontWeight: 600, letterSpacing: "-0.025em", lineHeight: 1.1 }}>
        {car.name}
      </div>
      <div style={{ fontSize: 13, color: studioVars.ink2, marginTop: 4 }}>{car.trim}</div>
      {/* Mini silhouette */}
      <div style={{ marginTop: 14, height: 84, borderRadius: 14, background: `linear-gradient(135deg, ${accent}11, ${accent}22)`, display: "flex", alignItems: "flex-end", justifyContent: "center", overflow: "hidden", position: "relative" }}>
        <svg viewBox="0 0 220 70" width="80%" height="80" style={{ marginBottom: -2 }}>
          <path
            d="M10 56 Q14 38 36 36 L62 22 Q86 12 122 12 L160 14 Q186 18 196 38 L208 42 Q214 46 212 56 L196 58 A10 10 0 0 1 176 58 L74 58 A10 10 0 0 1 54 58 Z"
            fill={accent}
            opacity="0.7"
          />
          <circle cx="64" cy="58" r="9" fill={studioVars.ink} />
          <circle cx="186" cy="58" r="9" fill={studioVars.ink} />
          <circle cx="64" cy="58" r="3" fill={studioVars.surface} />
          <circle cx="186" cy="58" r="3" fill={studioVars.surface} />
        </svg>
      </div>
    </div>

    {/* Big price pill */}
    <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 12, marginBottom: 16 }}>
      <div style={{ background: studioVars.bg, borderRadius: 18, padding: "14px 18px" }}>
        <div style={{ fontSize: 11, color: studioVars.ink3 }}>Cena</div>
        <div style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 30, fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1 }}>{sFmtEur(car.price)}</div>
      </div>
      <div style={{ background: studioVars.bg, borderRadius: 18, padding: "14px 18px" }}>
        <div style={{ fontSize: 11, color: studioVars.ink3 }}>Garantija</div>
        <div style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 30, fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1 }}>
          {car.warranty}<span style={{ fontSize: 14, color: studioVars.ink3 }}>g</span>
        </div>
      </div>
    </div>

    {/* Spec chips */}
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
      {[
        [car.fuelType, "fuel"],
        [`${car.consumption} L/100`, "fuel"],
        [`CO₂ ${car.co2}`, "leaf"],
        ["KASKO Std", "shield"],
        ["17″ riepas", "tire"],
        ["Vidējā klase", "chart"],
      ].map(([t, ic], i) => (
        <span
          key={i}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            padding: "8px 12px",
            borderRadius: 999,
            background: studioVars.bg,
            fontSize: 12,
            color: studioVars.ink2,
          }}
        >
          <SIcon name={ic} size={12} stroke={studioVars.ink3} />
          {t}
        </span>
      ))}
      <span
        style={{
          padding: "8px 12px",
          borderRadius: 999,
          background: studioVars.surface,
          border: `1px dashed ${studioVars.line}`,
          fontSize: 12,
          color: studioVars.ink3,
          cursor: "pointer",
        }}
      >
        + Vairāk
      </span>
    </div>
  </section>
);

// ── RESULTS SCREEN ────────────────────────────────────────────
const StudioResults = () => {
  const { carA, carB, summary, horizon } = SSAMPLE;
  const aWin = carA.monthly < carB.monthly;

  return (
    <StudioChrome>
      {/* Big verdict card */}
      <section
        style={{
          marginTop: 28,
          background: `linear-gradient(150deg, #1A1D24 0%, #25272D 60%, #2E2F35 100%)`,
          color: "#F4F2EC",
          borderRadius: 36,
          padding: "40px 44px 36px",
          boxShadow: studioShadowLg,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* glow */}
        <div style={{ position: "absolute", top: -120, right: -80, width: 380, height: 380, borderRadius: "50%", background: `radial-gradient(circle, ${studioVars.amber}33 0%, transparent 70%)`, filter: "blur(10px)" }} />
        <div style={{ position: "relative", display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 40, alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 12, color: "#9B9DA6", letterSpacing: "0.14em", textTransform: "uppercase" }}>Spriedums</div>
            <div style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 48, fontWeight: 600, letterSpacing: "-0.035em", lineHeight: 1.05, marginTop: 10 }}>
              {summary.cheaperName} ir<br />
              <span style={{ color: studioVars.amber }}>{sFmtEur(summary.totalDelta)} lētāks</span>
            </div>
            <div style={{ marginTop: 14, fontSize: 15, color: "#C9C9D0", maxWidth: 420 }}>
              {sFmtEur(summary.monthlyDelta)}/mēn starpība · {horizon} gadi · {SSAMPLE.annualKm.toLocaleString("lv-LV")} km/g.
              Galvenais ieguvums — mazāka amortizācija un zemāka KASKO bāze.
            </div>
            <div style={{ marginTop: 22, display: "flex", gap: 10 }}>
              <button style={{ background: studioVars.amber, color: studioVars.ink, border: "none", padding: "12px 22px", borderRadius: 999, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
                Skatīt detaļas
              </button>
              <button style={{ background: "rgba(255,255,255,0.1)", color: "#F4F2EC", border: "1px solid rgba(255,255,255,0.15)", padding: "12px 22px", borderRadius: 999, fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>
                Kopēt salīdzinājumu
              </button>
            </div>
          </div>
          {/* Visual scale */}
          <div>
            <StudioVerdictBars carA={carA} carB={carB} />
          </div>
        </div>
      </section>

      {/* Two result cards */}
      <div style={{ marginTop: 24, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <StudioResultCard car={carA} accent={studioVars.carA} winner={aWin} />
        <StudioResultCard car={carB} accent={studioVars.carB} winner={!aWin} />
      </div>

      {/* Depreciation explainer */}
      <section style={{ marginTop: 20, background: studioVars.surface, borderRadius: 28, padding: "28px 32px", boxShadow: studioShadow }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 18 }}>
          <div>
            <div style={{ fontSize: 12, color: studioVars.ink3, letterSpacing: "0.04em", textTransform: "uppercase" }}>Cik vērts pēc 5 gadiem</div>
            <div style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 24, fontWeight: 600, letterSpacing: "-0.025em", marginTop: 4 }}>
              Amortizācija ir <span style={{ color: studioVars.lose }}>lielākā izmaksa</span> abiem.
            </div>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
          {[carA, carB].map((car, i) => {
            const lost = car.price - car.residualCurve[5];
            const accent = i === 0 ? studioVars.carA : studioVars.carB;
            return (
              <div key={i}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                  <div style={{ fontSize: 13, fontWeight: 500 }}>{car.name}</div>
                  <div style={{ fontSize: 13, color: studioVars.ink3 }}>−{sFmtEur(lost)}</div>
                </div>
                <div style={{ height: 8, borderRadius: 4, background: studioVars.bg, position: "relative", overflow: "hidden" }}>
                  <div style={{ position: "absolute", inset: 0, width: `${(car.residualCurve[5] / car.price) * 100}%`, background: accent, borderRadius: 4 }} />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, fontFamily: "'DM Mono', monospace", fontSize: 12, color: studioVars.ink2 }}>
                  <span>{sFmtEur(car.residualCurve[5])} <span style={{ color: studioVars.ink3 }}>atlikušā</span></span>
                  <span>{Math.round((car.residualCurve[5] / car.price) * 100)}%</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </StudioChrome>
  );
};

const StudioVerdictBars = ({ carA, carB }) => {
  const max = Math.max(carA.monthly, carB.monthly);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {[carA, carB].map((c, i) => {
        const cheaper = c.monthly < (i === 0 ? carB.monthly : carA.monthly);
        const color = cheaper ? studioVars.amber : "rgba(255,255,255,0.4)";
        return (
          <div key={i}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#C9C9D0", marginBottom: 6 }}>
              <span>{c.name}</span>
              <span style={{ fontFamily: "'DM Mono', monospace" }}>{sFmtEur(c.monthly)}/mēn</span>
            </div>
            <div style={{ height: 30, borderRadius: 999, background: "rgba(255,255,255,0.06)", overflow: "hidden", position: "relative" }}>
              <div style={{ position: "absolute", inset: 0, width: `${(c.monthly / max) * 100}%`, background: color, borderRadius: 999, transition: "width 0.6s" }} />
              <div style={{ position: "absolute", left: 14, top: 0, bottom: 0, display: "flex", alignItems: "center", fontFamily: "'Inter Tight', sans-serif", fontSize: 14, fontWeight: 600, color: cheaper ? studioVars.ink : "#F4F2EC" }}>
                {cheaper ? "Lētākais" : `+${sFmtEur(c.monthly - Math.min(carA.monthly, carB.monthly))}/mēn`}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const StudioResultCard = ({ car, accent, winner }) => {
  return (
    <article style={{ background: studioVars.surface, borderRadius: 28, padding: 28, boxShadow: studioShadow, position: "relative", overflow: "hidden" }}>
      {/* Car header */}
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 22 }}>
        <div>
          <div style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 22, fontWeight: 600, letterSpacing: "-0.02em" }}>{car.name}</div>
          <div style={{ fontSize: 12, color: studioVars.ink3, marginTop: 2 }}>{car.trim}</div>
        </div>
        {winner ? (
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 12px", borderRadius: 999, background: studioVars.winSoft, color: studioVars.win, fontSize: 12, fontWeight: 600 }}>
            <SIcon name="check" size={12} stroke={studioVars.win} /> Lētākais
          </span>
        ) : (
          <span style={{ padding: "6px 12px", borderRadius: 999, background: studioVars.loseSoft, color: studioVars.lose, fontSize: 12, fontWeight: 600 }}>
            +{sFmtEur(SSAMPLE.summary.monthlyDelta)}/mēn
          </span>
        )}
      </header>

      {/* Hero number */}
      <div style={{ background: `linear-gradient(180deg, ${accent}10, ${accent}05)`, borderRadius: 22, padding: "22px 24px 18px", marginBottom: 18 }}>
        <div style={{ fontSize: 11, color: studioVars.ink3, letterSpacing: "0.04em", textTransform: "uppercase" }}>Vidējās mēneša izmaksas</div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginTop: 6 }}>
          <span style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 64, fontWeight: 600, letterSpacing: "-0.04em", lineHeight: 1, color: studioVars.ink }}>
            {sFmtEur(car.monthly)}
          </span>
          <span style={{ fontSize: 18, color: studioVars.ink3 }}>/mēn</span>
        </div>
        <div style={{ marginTop: 8, fontSize: 13, color: studioVars.ink2 }}>
          Kopā {SSAMPLE.horizon} gados — <span style={{ fontFamily: "'DM Mono', monospace", fontWeight: 500 }}>{sFmtEur(car.total5y)}</span>
        </div>
      </div>

      {/* Stacked breakdown bar */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ display: "flex", height: 14, borderRadius: 6, overflow: "hidden", marginBottom: 12 }}>
          {car.breakdown.map((row, i) => {
            const colors = [accent, accent + "CC", accent + "99", accent + "77", accent + "55", accent + "44", accent + "33", accent + "22"];
            return (
              <div
                key={i}
                style={{ width: `${(row.monthly / car.monthly) * 100}%`, background: colors[i % colors.length] }}
                title={`${row.label} · ${sFmtEurMo(row.monthly)}`}
              />
            );
          })}
        </div>
      </div>

      {/* Breakdown rows */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {car.breakdown.map((row, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 13 }}>
            <span style={{ color: studioVars.ink2 }}>{row.label}</span>
            <span style={{ fontFamily: "'DM Mono', monospace", fontWeight: 500 }}>{sFmtEurMo(row.monthly)}</span>
          </div>
        ))}
      </div>
    </article>
  );
};

Object.assign(window, { StudioInput, StudioResults });
