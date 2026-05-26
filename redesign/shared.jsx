// Shared sample data + tiny icon set across all three directions.
// Pure presentational — numbers come from the existing BMW 118i vs X1 example.

const SAMPLE = {
  horizon: 5,
  annualKm: 15000,
  financing: "leasing",
  carA: {
    name: "BMW 118i",
    trim: "M Sport · Benzīns · 1.5L",
    price: 32500,
    co2: 128,
    consumption: 5.8,
    fuelType: "Benzīns",
    warranty: 3,
    monthly: 487,
    total5y: 29220,
    delta: 0,
    breakdown: [
      { label: "Amortizācija", monthly: 312, total: 18720, share: 64 },
      { label: "Līzings (procenti)", monthly: 45, total: 2700, share: 9 },
      { label: "Degviela", monthly: 72, total: 4320, share: 15 },
      { label: "KASKO", monthly: 67, total: 4020, share: 14 },
      { label: "Apkope", monthly: 18, total: 1080, share: 4 },
      { label: "Riepas", monthly: 33, total: 1980, share: 7 },
      { label: "OCTA", monthly: 8, total: 480, share: 2 },
      { label: "Transp. nodoklis", monthly: 12, total: 720, share: 2 },
    ],
    residualCurve: [32500, 25350, 22055, 19629, 17666, 16075],
  },
  carB: {
    name: "BMW X1 xDrive20i",
    trim: "M Sport · Benzīns · 2.0L AWD",
    price: 41200,
    co2: 161,
    consumption: 7.1,
    fuelType: "Benzīns",
    warranty: 3,
    monthly: 631,
    total5y: 37860,
    delta: 144,
    breakdown: [
      { label: "Amortizācija", monthly: 408, total: 24480, share: 65 },
      { label: "Līzings (procenti)", monthly: 58, total: 3480, share: 9 },
      { label: "Degviela", monthly: 85, total: 5100, share: 13 },
      { label: "KASKO", monthly: 87, total: 5220, share: 14 },
      { label: "Apkope", monthly: 18, total: 1080, share: 3 },
      { label: "Riepas", monthly: 46, total: 2760, share: 7 },
      { label: "OCTA", monthly: 9, total: 540, share: 1 },
      { label: "Transp. nodoklis", monthly: 15, total: 900, share: 2 },
    ],
    residualCurve: [41200, 31724, 27282, 24008, 21367, 19444],
  },
  summary: {
    cheaperName: "BMW 118i",
    monthlyDelta: 144,
    totalDelta: 8640,
    horizonLabel: "5 gados",
  },
};

const fmtEur = (n) =>
  "€" + Math.round(n).toLocaleString("lv-LV").replace(/,/g, "\u00A0");
const fmtEurMo = (n) => fmtEur(n) + "/mēn";

// ── Tiny SVG icon set (single-source-of-truth, monoline 1.5px) ──
const Icon = ({ name, size = 16, stroke = "currentColor", style = {} }) => {
  const paths = {
    car: <path d="M3 13l1.5-5a3 3 0 0 1 2.9-2.2h9.2A3 3 0 0 1 19.5 8L21 13M3 13v5h3v-2h12v2h3v-5M3 13h18M7 16.5h.01M17 16.5h.01" />,
    spark: <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" />,
    bolt: <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" />,
    fuel: <path d="M3 22V5a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v17M3 22h11M3 10h11M14 8l3 0a2 2 0 0 1 2 2v7a1.5 1.5 0 1 0 3 0v-9l-3-3" />,
    arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
    check: <path d="M5 12l4 4 10-10" />,
    cross: <path d="M6 6l12 12M18 6L6 18" />,
    info: <><circle cx="12" cy="12" r="9" /><path d="M12 8h.01M11 12h1v5h1" /></>,
    search: <><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></>,
    settings: <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1A2 2 0 1 1 4.3 17l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1A2 2 0 1 1 7 4.3l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1A2 2 0 1 1 19.7 7l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z" /></>,
    chart: <path d="M3 21h18M5 21V10M10 21V5M15 21v-7M20 21V12" />,
    sliders: <path d="M4 6h8M16 6h4M4 12h2M10 12h10M4 18h12M20 18h0M14 4v4M8 10v4M18 16v4" />,
    user: <><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 4-7 8-7s8 3 8 7" /></>,
    chevron: <path d="M9 6l6 6-6 6" />,
    chevronDown: <path d="M6 9l6 6 6-6" />,
    leaf: <path d="M3 21c0-9 6-15 18-15-0 12-6 18-15 18a9 9 0 0 1-3-3zM10 14L3 21" />,
    coins: <><circle cx="8" cy="8" r="6" /><path d="M22 14a6 6 0 1 1-12 0M14 8h.01" /></>,
    shield: <path d="M12 2l9 4v6c0 5-3.5 9-9 10-5.5-1-9-5-9-10V6l9-4z" />,
    wrench: <path d="M14.7 6.3a4 4 0 0 1 5 5l-1.7 1.7-4.3-4.3 1-2.4zM3 21l9.7-9.7 4.3 4.3L7.3 25.3 3 21z" />,
    tire: <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="3" /><path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8" /></>,
  };
  const p = paths[name] || paths.spark;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={stroke}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ flexShrink: 0, ...style }}
    >
      {p}
    </svg>
  );
};

// Logo — H mark + amber dot
const Logo = ({ size = 22, dotColor = "#F5A623", textColor = "currentColor", weight = 700 }) => (
  <span
    style={{
      display: "inline-flex",
      alignItems: "baseline",
      gap: 0,
      fontFamily: "'Barlow Condensed', 'Inter Tight', sans-serif",
      fontSize: size,
      fontWeight: weight,
      letterSpacing: "-0.02em",
      color: textColor,
      lineHeight: 1,
    }}
  >
    <span>Honest</span>
    <span
      style={{
        display: "inline-block",
        width: size * 0.18,
        height: size * 0.18,
        borderRadius: "50%",
        background: dotColor,
        margin: `0 ${size * 0.05}px ${size * 0.12}px`,
      }}
    />
    <span>Cost</span>
  </span>
);

// Tiny line chart for residual / depreciation curves
const SparkLine = ({ data, color = "#3B4FE4", width = 200, height = 60, fill = null }) => {
  const max = Math.max(...data);
  const min = Math.min(...data) * 0.9;
  const stepX = width / (data.length - 1);
  const pts = data.map((v, i) => [i * stepX, height - ((v - min) / (max - min)) * height]);
  const d = pts.map(([x, y], i) => (i === 0 ? `M${x},${y}` : `L${x},${y}`)).join(" ");
  const dFill = `${d} L${width},${height} L0,${height} Z`;
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ overflow: "visible" }}>
      {fill && <path d={dFill} fill={fill} />}
      <path d={d} stroke={color} strokeWidth="1.75" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {pts.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i === 0 || i === pts.length - 1 ? 3 : 0} fill={color} />
      ))}
    </svg>
  );
};

window.HC = { SAMPLE, fmtEur, fmtEurMo, Icon, Logo, SparkLine };
