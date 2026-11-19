import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion } from "../../lib/motion";

/*
  What a marketing partner does, drawn: one campaign pulled apart into its three
  layers. Creative (a row of social ads), Media (the campaigns running, each with its spend) and Growth
  (the columns and curve it all answers to), stacked in isometric on the Ink panel. The layers
  start closed together and open out as the figure arrives; reduced motion shows
  them open. A drawing rather than a chart, so it carries no figures.
*/
const W = 300;
const H = 210;
const X0 = 200;
const TOPS = [20, 185, 350]; // each layer's back corner
const LAYERS = [
  ["Creative", "Ads and brand stories"],
  ["Media", "Performance campaigns"],
  ["Growth", "Tracked, tested, improved"],
];

const MAGENTA = "#e2418f";
const ORANGE = "#ff9533";
const VIOLET = "#7b4dd9";
const COBALT = "#4c8deb";
const CYAN = "#6fe3f5";
const INK = "#17121f";
const CLOUD = "#f6f3fb";
const LINE = "rgb(246 243 251 / 0.72)";
const LINE_SOFT = "rgb(246 243 251 / 0.3)";

const hair = { fill: "none", stroke: LINE, strokeWidth: 0.9, vectorEffect: "non-scaling-stroke" };
const soft = { ...hair, stroke: LINE_SOFT };

/** Plane coordinates onto the isometric layer whose back corner is at (X0, y). */
const iso = (y) => `matrix(0.866 0.5 -0.866 0.5 ${X0} ${y})`;
const pt = (u, v, y) => [X0 + 0.866 * (u - v), y + 0.5 * (u + v)];

function Plate({ fill, stroke = LINE_SOFT }) {
  return <rect width={W} height={H} rx={7} fill={fill} stroke={stroke} strokeWidth={1} vectorEffect="non-scaling-stroke" />;
}

// three social ads in a row: the image, a caption and the reactions under each
const POSTS = [16, 110, 204];

function Reactions({ x }) {
  return (
    <g fill="none" stroke={LINE} strokeWidth={1} vectorEffect="non-scaling-stroke">
      <path d={`M${x + 6} ${136} c-3 -4 -8 -1 -5 3 l5 5 l5 -5 c3 -4 -2 -7 -5 -3z`} fill={MAGENTA} stroke="none" />
      <circle cx={x + 22} cy={138} r={4.5} />
      <path d={`M${x + 34} ${141} l9 -6 l-9 -3z`} />
    </g>
  );
}

function CreativeLayer({ uid }) {
  return (
    <>
      <Plate fill="#1d1628" />
      {POSTS.map((x) => (
        <g key={x}>
          <rect x={x} y={14} width={80} height={140} rx={5} fill="#271f35" stroke={LINE_SOFT} strokeWidth={1} vectorEffect="non-scaling-stroke" />
          <circle cx={x + 10} cy={24} r={4} fill={LINE_SOFT} />
          <rect x={x + 18} y={22} width={30} height={4} rx={2} fill={LINE_SOFT} />
        </g>
      ))}
      {/* a product shot */}
      <rect x={20} y={32} width={72} height={78} rx={3} fill={`url(#${uid}-flame)`} />
      <circle cx={56} cy={68} r={18} fill={CLOUD} opacity={0.92} />
      <circle cx={56} cy={68} r={8} fill={ORANGE} />
      {/* a video ad */}
      <rect x={114} y={32} width={72} height={78} rx={3} fill={VIOLET} />
      <circle cx={150} cy={71} r={13} fill="rgb(246 243 251 / 0.22)" />
      <path d="M146 64 L157 71 L146 78 Z" fill={CLOUD} />
      {/* a headline ad */}
      <rect x={208} y={32} width={72} height={78} rx={3} fill={CLOUD} />
      <rect x={216} y={44} width={50} height={7} rx={2} fill={INK} />
      <rect x={216} y={56} width={36} height={7} rx={2} fill={INK} />
      <rect x={216} y={90} width={34} height={11} rx={5.5} fill={COBALT} />
      {POSTS.map((x) => (
        <g key={`c${x}`}>
          <rect x={x + 4} y={116} width={52} height={4} rx={2} fill={LINE_SOFT} />
          <Reactions x={x + 4} />
        </g>
      ))}
      {/* a measured edge: the drawing's dimension line */}
      <path d="M16 197 H284 M16 194 V200 M284 194 V200" fill="none" stroke={ORANGE} strokeWidth={0.9} vectorEffect="non-scaling-stroke" />
    </>
  );
}

// a campaign manager: each row a live campaign, its channel, its spend and a switch
const CAMPAIGNS = [
  { y: 50, color: VIOLET, icon: "play", fill: 0.82 },
  { y: 102, color: COBALT, icon: "search", fill: 0.6 },
  { y: 154, color: CYAN, icon: "post", fill: 0.72 },
];

function ChannelIcon({ kind, x, y }) {
  const stroke = { fill: "none", stroke: CLOUD, strokeWidth: 1.4, vectorEffect: "non-scaling-stroke", strokeLinecap: "round" };
  if (kind === "play") return <path d={`M${x - 3} ${y - 5} L${x + 5} ${y} L${x - 3} ${y + 5} Z`} fill={CLOUD} />;
  if (kind === "search")
    return (
      <g {...stroke}>
        <circle cx={x - 1.5} cy={y - 1.5} r={4.5} />
        <path d={`M${x + 2} ${y + 2} L${x + 6} ${y + 6}`} />
      </g>
    );
  return (
    <g {...stroke}>
      <rect x={x - 6} y={y - 6} width={12} height={12} rx={3} />
      <circle cx={x} cy={y} r={3} />
    </g>
  );
}

function MediaLayer() {
  return (
    <>
      <Plate fill="#272033" />
      <path d="M0 26 H300" {...soft} />
      {[14, 26, 38].map((x, i) => (
        <circle key={x} cx={x} cy={13} r={3} fill={i ? LINE_SOFT : ORANGE} />
      ))}
      <rect x={226} y={7} width={58} height={13} rx={6.5} fill={`url(#glayers-cta)`} />
      {CAMPAIGNS.map(({ y, color, icon, fill }) => (
        <g key={y}>
          <rect x={14} y={y} width={272} height={40} rx={7} fill="#30283f" stroke={LINE_SOFT} strokeWidth={1} vectorEffect="non-scaling-stroke" />
          <rect x={24} y={y + 8} width={24} height={24} rx={6} fill={color} />
          <ChannelIcon kind={icon} x={36} y={y + 20} />
          <rect x={58} y={y + 12} width={56} height={5} rx={2.5} fill="rgb(246 243 251 / 0.7)" />
          <rect x={58} y={y + 23} width={36} height={4} rx={2} fill={LINE_SOFT} />
          {/* spend against budget */}
          <rect x={128} y={y + 17} width={100} height={6} rx={3} fill="rgb(246 243 251 / 0.12)" />
          <rect x={128} y={y + 17} width={100 * fill} height={6} rx={3} fill={color} />
          {/* the campaign is on */}
          <rect x={244} y={y + 13} width={28} height={14} rx={7} fill={ORANGE} />
          <circle cx={265} cy={y + 20} r={5} fill={CLOUD} />
        </g>
      ))}
    </>
  );
}

function GrowthLayer() {
  return (
    <>
      <Plate fill={CLOUD} stroke="transparent" />
      {[36, 72, 108, 144, 180].map((y) => (
        <path key={y} d={`M18 ${y} H282`} fill="none" stroke={INK} strokeOpacity={0.09} strokeWidth={1} vectorEffect="non-scaling-stroke" />
      ))}
      {[66, 114, 162, 210, 258].map((x) => (
        <path key={x} d={`M${x} 18 V192`} fill="none" stroke={INK} strokeOpacity={0.09} strokeWidth={1} vectorEffect="non-scaling-stroke" />
      ))}
    </>
  );
}

// Columns standing on the Growth plate, drawn in screen space so they rise as
// they travel to the right; a line laid flat on the plate would read as falling.
const COLUMNS = [14, 26, 38, 52, 66, 88].map((h, i) => {
  const u = 70 + i * 38;
  const v = 196 - i * 21;
  const s = 11;
  const [lx, ly] = pt(u - s, v + s, TOPS[2]);
  const [fx, fy] = pt(u + s, v + s, TOPS[2]);
  const [rx, ry] = pt(u + s, v - s, TOPS[2]);
  const [bx, by] = pt(u - s, v - s, TOPS[2]);
  return {
    left: `${lx},${ly} ${fx},${fy} ${fx},${fy - h} ${lx},${ly - h}`,
    right: `${fx},${fy} ${rx},${ry} ${rx},${ry - h} ${fx},${fy - h}`,
    top: `${lx},${ly - h} ${fx},${fy - h} ${rx},${ry - h} ${bx},${by - h}`,
    cx: (lx + rx) / 2,
    cy: (ly + ry) / 2 - h - 16,
  };
});
const CURVE = COLUMNS.reduce((d, c, i) => {
  if (i === 0) return `M${c.cx} ${c.cy}`;
  const p = COLUMNS[i - 1];
  const mid = (p.cx + c.cx) / 2;
  return `${d} C${mid} ${p.cy} ${mid} ${c.cy} ${c.cx} ${c.cy}`;
}, "");

function GrowthColumns({ uid }) {
  const end = COLUMNS[COLUMNS.length - 1];
  return (
    <>
      {COLUMNS.map((c, i) => {
        const last = i === COLUMNS.length - 1;
        return (
          <g key={c.top}>
            <polygon points={c.left} fill={last ? MAGENTA : VIOLET} />
            <polygon points={c.right} fill={last ? "#c9307a" : "#5f35b5"} />
            <polygon points={c.top} fill={last ? ORANGE : "#a98aea"} />
          </g>
        );
      })}
      <path d={CURVE} fill="none" stroke={`url(#${uid}-flame)`} strokeWidth={2.5} strokeLinecap="round" />
      <circle cx={end.cx} cy={end.cy} r={5} fill={ORANGE} />
      <circle cx={end.cx} cy={end.cy} r={10} fill="none" stroke={ORANGE} strokeOpacity={0.5} strokeWidth={1} />
    </>
  );
}

/** The layers, painted back to front: Growth at the bottom, Creative on top. */
function Stack({ uid }) {
  const corners = [
    [0, 0],
    [W, 0],
    [0, H],
    [W, H],
  ];
  return (
    <>
      <defs>
        <radialGradient id={`${uid}-haze`}>
          <stop offset="0%" stopColor={VIOLET} stopOpacity={0.36} />
          <stop offset="100%" stopColor={VIOLET} stopOpacity={0} />
        </radialGradient>
        <linearGradient id="glayers-cta" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={MAGENTA} />
          <stop offset="100%" stopColor={ORANGE} />
        </linearGradient>
        <linearGradient id={`${uid}-flame`} x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor={MAGENTA} />
          <stop offset="100%" stopColor={ORANGE} />
        </linearGradient>
      </defs>
      <ellipse cx={X0 + 39} cy={370} rx={235} ry={170} fill={`url(#${uid}-haze)`} />

      {/* Dashed verticals tie the same corner through all three layers */}
      <g className="glayers__ties">
        {corners.map(([u, v]) => {
          const [x, y1] = pt(u, v, TOPS[0]);
          const [, y2] = pt(u, v, TOPS[2]);
          return <path key={`${u}${v}`} d={`M${x} ${y1} V${y2}`} {...soft} strokeDasharray="2 5" />;
        })}
      </g>

      <g className="glayers__plate" data-i="2">
        <g transform={iso(TOPS[2])}>
          <GrowthLayer />
        </g>
        <GrowthColumns uid={uid} />
      </g>
      <g className="glayers__plate" data-i="1">
        <g transform={iso(TOPS[1])}>
          <MediaLayer />
        </g>
      </g>
      <g className="glayers__plate" data-i="0">
        <g transform={iso(TOPS[0])}>
          <CreativeLayer uid={uid} />
        </g>
      </g>
    </>
  );
}

/** Leader lines from each layer's right corner to its name. Wide layout only. */
function Labels() {
  return TOPS.map((top, i) => {
    const [x, y] = pt(W, 0, top);
    return (
      <g key={top} className="glayers__label">
        <path d={`M${x + 8} ${y} H${x + 34}`} fill="none" stroke={ORANGE} strokeWidth={1} vectorEffect="non-scaling-stroke" />
        <circle cx={x + 8} cy={y} r={2.5} fill={ORANGE} />
        <text x={x + 44} y={y + 3} fontSize={25} fill={CLOUD} style={{ fontFamily: "var(--font-display)" }}>
          {LAYERS[i][0]}
        </text>
        <text x={x + 44} y={y + 27} fontSize={16} fill="rgb(246 243 251 / 0.68)" style={{ fontFamily: "var(--font-sans)" }}>
          {LAYERS[i][1]}
        </text>
      </g>
    );
  });
}

const ALT = "One campaign pulled apart into three layers: ad creative on a storyboard, a channel plan beneath it, and rising columns with a growth curve at the bottom.";

export default function GrowthLayers() {
  const ref = useRef(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const scrollTrigger = { trigger: ref.current, start: "top 78%", once: true };
      gsap.utils.toArray(".glayers__plate", ref.current).forEach((plate) => {
        const i = Number(plate.dataset.i);
        gsap.from(plate, { y: (1 - i) * 165, autoAlpha: i === 1 ? 1 : 0, duration: 1.1, delay: 0.1, ease: "expo.out", scrollTrigger });
      });
      gsap.from(".glayers__ties", { autoAlpha: 0, duration: 0.7, delay: 0.55, scrollTrigger });
      gsap.from(".glayers__label", { autoAlpha: 0, x: -8, duration: 0.7, delay: 0.7, stagger: 0.12, ease: "power3.out", scrollTrigger });
    },
    { scope: ref }
  );

  return (
    <div className="glayers" ref={ref}>
      {/* Wide: the stack with its labels beside it */}
      <svg className="glayers__wide" viewBox="0 0 716 625" role="img" aria-label={ALT}>
        <Stack uid="glayers-wide" />
        <Labels />
      </svg>
      {/* Narrower: the stack alone, with the same labels set as text beneath */}
      <div className="glayers__narrow">
        <svg viewBox="0 0 480 625" role="img" aria-label={ALT}>
          <Stack uid="glayers" />
        </svg>
        <ul role="list" className="glayers__legend">
          {LAYERS.map(([name, note]) => (
            <li key={name}>
              <span className="glayers__name">{name}</span>
              <span className="glayers__note">{note}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
