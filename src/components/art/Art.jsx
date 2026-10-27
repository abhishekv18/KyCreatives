/*
  Original SVG artwork for KY Creatives, built only from the official palette.
  The motif is the "ribbon": broad gradient bands (Flame, Dusk, Aqua) that
  carry the eye across a composition and between sections. It is deliberately
  not derived from the flame mark, which the guidelines reserve as a stamp.

  All artwork is decorative (aria-hidden). Paths marked data-draw are drawn in
  by the motion system; with reduced motion they are simply shown.
*/
import { useId } from "react";

const STOPS = {
  flame: ["#E2418F", "#FF9533"],
  dusk: ["#7B4DD9", "#4C8DEB"],
  aqua: ["#6FE3F5", "#4C8DEB"],
  sunset: ["#FF9533", "#E2418F"],
};

function Grad({ id, kind, x1 = "0", y1 = "0", x2 = "1", y2 = "0" }) {
  const [a, b] = STOPS[kind];
  return (
    <linearGradient id={id} x1={x1} y1={y1} x2={x2} y2={y2}>
      <stop offset="0" stopColor={a} />
      <stop offset="1" stopColor={b} />
    </linearGradient>
  );
}

/* Ribbon sets, drawn on a 1440 x 900 canvas. Each set is a deliberate composition. */
const SETS = {
  // Hero: three bands rising from lower left, sweeping behind the product stage.
  hero: [
    { d: "M-120 760 C 220 600, 460 880, 780 700 S 1220 300, 1580 380", w: 120, g: "dusk", o: 0.95 },
    { d: "M-120 640 C 200 470, 560 800, 860 590 S 1260 230, 1580 250", w: 64, g: "flame", o: 1 },
    { d: "M-120 860 C 300 760, 640 980, 1000 780 S 1360 560, 1580 620", w: 34, g: "aqua", o: 1 },
  ],
  // Footer: a calmer, wider arc across the top right.
  footer: [
    { d: "M260 -40 C 520 180, 840 40, 1080 220 S 1380 420, 1600 300", w: 110, g: "dusk", o: 0.9 },
    { d: "M420 -60 C 640 120, 920 10, 1140 160 S 1420 330, 1620 210", w: 46, g: "flame", o: 1 },
    { d: "M120 40 C 420 260, 780 180, 1040 330 S 1360 520, 1600 440", w: 22, g: "aqua", o: 1 },
  ],
  // Section accent: a single pair crossing a field.
  accent: [
    { d: "M-80 520 C 300 300, 620 700, 980 460 S 1380 200, 1560 260", w: 90, g: "aqua", o: 0.9 },
    { d: "M-80 600 C 340 420, 660 780, 1020 560 S 1400 320, 1560 380", w: 36, g: "flame", o: 1 },
  ],
  // Menu / small panels: one confident stroke.
  single: [{ d: "M-60 700 C 360 520, 640 860, 1000 620 S 1360 300, 1540 340", w: 80, g: "flame", o: 1 }],
};

/*
  Quiet hero light for dark pages: two soft pools of Dusk and Cobalt behind the
  centrepiece. Pure CSS, so it scales cleanly to any screen without cropping
  into hard bands the way the ribbons do on narrow viewports.
*/
export function Glow({ className = "" }) {
  return <div className={`art-glow ${className}`} />;
}

/*
  Column guides: fine vertical hairlines on the page's own grid, fading out
  toward the edges. A quiet, structural texture for colour-field heroes.
*/
export function Guides({ className = "", tone = "light" }) {
  return <div className={`art-guides art-guides--${tone} ${className}`} />;
}

/*
  Growth chart for Marketing: a row of rising bars along the foot of the
  hero, dashed gridlines behind them, and a trend line joining the bar tops.
  Drawn in Ink at low opacity so it reads as texture on the colour field.
*/
const BARS = [70, 95, 85, 125, 115, 160, 150, 195, 190, 235, 260, 300];

export function ChartLines({ className = "" }) {
  const w = 1440 / BARS.length;
  const bw = w * 0.52;
  const tops = BARS.map((h, i) => [i * w + w / 2, 900 - h]);
  const trend = tops.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y - 28}`).join(" ");
  return (
    <svg
      className={`art-chart ${className}`}
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMax slice"
      aria-hidden="true"
      focusable="false"
    >
      {[560, 660, 760, 860].map((y) => (
        <line
          key={y}
          x1="0"
          x2="1440"
          y1={y}
          y2={y}
          stroke="#17121F"
          strokeOpacity="0.1"
          strokeWidth="1"
          strokeDasharray="2 8"
        />
      ))}
      {BARS.map((h, i) => (
        <rect
          key={i}
          x={i * w + (w - bw) / 2}
          y={900 - h}
          width={bw}
          height={h + 12}
          rx="10"
          fill="#17121F"
          fillOpacity={0.05 + i * 0.006}
        />
      ))}
      <path d={trend} fill="none" stroke="#17121F" strokeOpacity="0.28" strokeWidth="1.75" strokeLinejoin="round" />
      {tops.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y - 28} r="4.5" fill="#FFFFFF" fillOpacity="0.85" stroke="#17121F" strokeOpacity="0.35" strokeWidth="1.5" />
      ))}
    </svg>
  );
}

/*
  Background patterns shared with the Home services panels, so each service
  hero carries the same texture as its panel: "chart" for Marketing,
  "layout" for Design and Graphics.
*/
export function Pattern({ kind, className = "" }) {
  return <div className={`art-pattern art-pattern--${kind} ${className}`} />;
}

export function Ribbons({ set = "hero", className = "", draw = true }) {
  const uid = useId().replace(/:/g, "");
  const paths = SETS[set];
  return (
    <svg
      className={`art-ribbons ${className}`}
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        {paths.map((p, i) => (
          <Grad key={i} id={`${uid}-g${i}`} kind={p.g} />
        ))}
      </defs>
      {paths.map((p, i) => (
        <path
          key={i}
          d={p.d}
          fill="none"
          stroke={`url(#${uid}-g${i})`}
          strokeWidth={p.w}
          strokeLinecap="round"
          opacity={p.o}
          data-ribbon={p.g}
          pathLength="1"
          {...(draw ? { "data-draw": "" } : {})}
        />
      ))}
    </svg>
  );
}

/*
  Light hero artwork: translucent layered waves, like stacked sheets of tinted
  paper cresting from the right. Back to front: Aqua, Dusk, Flame, so the
  composition warms as it comes forward. Each layer carries a white highlight
  edge and a faint Ink shadow offset, which is what makes it read as crafted
  layers rather than a flat gradient. Layers are groups (data-wave) so the
  motion system can lift and drift them independently.
*/
// Crests are deliberately irregular in height and spacing, and two sheets
// fold back over their neighbours, so the stack reads as hand-arranged.
const WAVES = [
  { d: "M1000 10 C 900 30, 860 210, 700 270 C 540 330, 360 360, 250 520 C 170 640, 150 820, 120 1000 L1000 1000 Z", g: "aqua", a: 0.34 },
  { d: "M1000 190 C 930 200, 880 300, 780 345 C 640 410, 470 430, 400 560 C 340 680, 330 860, 300 1000 L1000 1000 Z", g: "dusk", a: 0.3 },
  { d: "M1000 250 C 950 300, 930 420, 840 470 C 720 540, 600 560, 540 660 C 490 750, 470 900, 450 1000 L1000 1000 Z", g: "aqua", a: 0.4 },
  { d: "M1000 430 C 930 440, 900 540, 820 575 C 730 615, 660 640, 620 720 C 585 800, 580 920, 570 1000 L1000 1000 Z", g: "dusk", a: 0.5 },
  { d: "M1000 540 C 960 590, 950 680, 890 715 C 820 755, 750 770, 720 840 C 700 890, 700 960, 690 1000 L1000 1000 Z", g: "flame", a: 0.6 },
  { d: "M1000 700 C 950 705, 930 790, 880 820 C 830 850, 800 880, 790 940 C 786 965, 786 985, 785 1000 L1000 1000 Z", g: "sunset", a: 0.74 },
];

export function Waves({ className = "" }) {
  const uid = useId().replace(/:/g, "");
  return (
    <svg
      className={`art-waves ${className}`}
      viewBox="0 0 1000 1000"
      preserveAspectRatio="xMaxYMax slice"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        {WAVES.map((w, i) => {
          const [a, b] = STOPS[w.g];
          return (
            // Colour sits at the crest and falls away beneath it, so tone only
            // builds where sheets overlap: translucent, never a flat band.
            <linearGradient key={i} id={`${uid}-w${i}`} x1="1" y1="0" x2="0.35" y2="1">
              <stop offset="0" stopColor={a} stopOpacity={w.a} />
              <stop offset="0.45" stopColor={b} stopOpacity={w.a * 0.55} />
              <stop offset="1" stopColor={b} stopOpacity="0.04" />
            </linearGradient>
          );
        })}
      </defs>
      {WAVES.map((w, i) => (
        <g key={i} data-wave={i}>
          {/* soft shadow: the same sheet, offset and barely tinted with Ink */}
          <path d={w.d} fill="#17121F" opacity="0.03" transform="translate(-8 12)" />
          <path d={w.d} fill={`url(#${uid}-w${i})`} />
          {/* paper edge highlight */}
          <path d={w.d} fill="none" stroke="#FFFFFF" strokeWidth="2.5" strokeOpacity="0.9" />
        </g>
      ))}
    </svg>
  );
}

/* Blueprint grid: fine lines every 8 units with stronger lines every 64. */
export function Blueprint({ className = "", tone = "dark" }) {
  const uid = useId().replace(/:/g, "");
  const line = tone === "dark" ? "rgba(111,227,245,0.10)" : "rgba(23,18,31,0.07)";
  const major = tone === "dark" ? "rgba(111,227,245,0.20)" : "rgba(23,18,31,0.12)";
  return (
    <svg className={`art-grid ${className}`} aria-hidden="true" focusable="false">
      <defs>
        <pattern id={`${uid}-m`} width="16" height="16" patternUnits="userSpaceOnUse">
          <path d="M16 0H0V16" fill="none" stroke={line} strokeWidth="1" />
        </pattern>
        <pattern id={`${uid}-M`} width="128" height="128" patternUnits="userSpaceOnUse">
          <rect width="128" height="128" fill={`url(#${uid}-m)`} />
          <path d="M128 0H0V128" fill="none" stroke={major} strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${uid}-M)`} />
    </svg>
  );
}

/* Concentric arcs, used behind mobile devices (a "signal" around the phone). */
export function Arcs({ className = "", color = "#6FE3F5" }) {
  return (
    <svg className={`art-arcs ${className}`} viewBox="0 0 800 800" aria-hidden="true" focusable="false">
      {[120, 200, 280, 360].map((r, i) => (
        <circle
          key={r}
          cx="400"
          cy="400"
          r={r}
          fill="none"
          stroke={color}
          strokeOpacity={0.5 - i * 0.1}
          strokeWidth="1.5"
          strokeDasharray={i % 2 ? "4 10" : "none"}
          pathLength="1"
          data-draw=""
        />
      ))}
    </svg>
  );
}

/* A hand-drawn style underline stroke, drawn in under a headline word. */
export function Stroke({ className = "", kind = "flame" }) {
  const uid = useId().replace(/:/g, "");
  return (
    <svg className={`art-stroke ${className}`} viewBox="0 0 600 40" preserveAspectRatio="none" aria-hidden="true" focusable="false">
      <defs>
        <Grad id={`${uid}-s`} kind={kind} />
      </defs>
      <path
        d="M6 28 C 120 12, 260 10, 380 18 S 540 30, 594 14"
        fill="none"
        stroke={`url(#${uid}-s)`}
        strokeWidth="9"
        strokeLinecap="round"
        pathLength="1"
        data-draw=""
      />
    </svg>
  );
}

/* Large quotation mark for testimonials. */
export function QuoteMark({ className = "" }) {
  const uid = useId().replace(/:/g, "");
  return (
    <svg className={`art-quote ${className}`} viewBox="0 0 120 96" aria-hidden="true" focusable="false">
      <defs>
        <Grad id={`${uid}-q`} kind="flame" x2="1" y2="1" />
      </defs>
      <path
        fill={`url(#${uid}-q)`}
        d="M0 96V58C0 24 18 4 50 0l4 14C36 20 28 32 27 48h24v48H0Zm66 0V58c0-34 18-54 50-58l4 14c-18 6-26 18-27 34h24v48H66Z"
      />
    </svg>
  );
}
