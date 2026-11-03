import { CalendarDays, Check, LayoutGrid, Plus, Settings, Users } from "lucide-react";

/*
  The Web apps and websites hero: what the service makes, drawn rather than
  screenshotted. A designed website, the web app behind it and a little of the
  code that joins them, all built from the brand palette and scaled as one with
  container units. It is a concept, labelled as one, so it shows no client work
  and no real figures.
*/
const TODAY = [
  ["SV", "Site visit", "10:30", "wbs-dot--violet"],
  ["DR", "Design review", "14:00", "wbs-dot--cobalt"],
  ["HC", "Handover call", "17:00", "wbs-dot--flame"],
];

const CARDS = ["Services", "Our work", "Contact"];

function Site() {
  return (
    <div className="wbs-site">
      <div className="wbs-bar">
        <i />
        <i />
        <i />
        <span>yourbusiness.com</span>
      </div>
      <div className="wbs-site__nav">
        <b>Your Business</b>
        <span>Services</span>
        <span>Work</span>
        <span>About</span>
        <em>Book a visit</em>
      </div>
      <div className="wbs-site__hero">
        <div>
          <p className="wbs-site__eyebrow">Open all hours</p>
          <p className="wbs-site__title">
            A website that
            <br />
            <span>keeps working.</span>
          </p>
          <p className="wbs-site__lead">Clear pages, fast loading and an enquiry that reaches you.</p>
          <p className="wbs-site__cta">Get started</p>
        </div>
        <svg viewBox="0 0 200 180" className="wbs-site__art">
          <defs>
            <linearGradient id="wbs-flame" x1="0" y1="1" x2="1" y2="0">
              <stop offset="0%" stopColor="#e2418f" />
              <stop offset="100%" stopColor="#ff9533" />
            </linearGradient>
            <linearGradient id="wbs-dusk" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#7b4dd9" />
              <stop offset="100%" stopColor="#4c8deb" />
            </linearGradient>
            <clipPath id="wbs-arch">
              <path d="M28 180 V88 a72 72 0 0 1 144 0 V180 Z" />
            </clipPath>
          </defs>
          <g clipPath="url(#wbs-arch)">
            <rect width="200" height="180" fill="#ece6f8" />
            <circle cx="122" cy="70" r="32" fill="url(#wbs-flame)" />
            <path d="M0 132 C50 96 84 104 118 124 S176 138 200 112 V180 H0 Z" fill="url(#wbs-dusk)" />
            <path d="M0 158 C44 134 96 136 134 154 S184 166 200 150 V180 H0 Z" fill="#17121f" />
          </g>
          <path d="M28 180 V88 a72 72 0 0 1 144 0 V180" fill="none" stroke="#17121f" strokeOpacity="0.18" />
        </svg>
      </div>
      <ul className="wbs-site__cards">
        {CARDS.map((c, i) => (
          <li key={c}>
            <i className={`wbs-swatch wbs-swatch--${i + 1}`} />
            <b>{c}</b>
            <span />
            <span />
          </li>
        ))}
      </ul>
    </div>
  );
}

function App() {
  return (
    <div className="wbs-app">
      <div className="wbs-app__rail">
        <i className="wbs-app__logo" />
        <LayoutGrid strokeWidth={1.75} />
        <CalendarDays strokeWidth={1.75} className="is-on" />
        <Users strokeWidth={1.75} />
        <Settings strokeWidth={1.75} className="is-end" />
      </div>
      <div className="wbs-app__main">
        <div className="wbs-app__head">
          <b>Bookings</b>
          <span>This week</span>
          <em>
            <Plus strokeWidth={2.25} />
          </em>
        </div>
        <div className="wbs-app__body">
          <div className="wbs-app__chart">
            <svg viewBox="0 0 220 110" preserveAspectRatio="none">
              <defs>
                <linearGradient id="wbs-area" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#7b4dd9" stopOpacity="0.28" />
                  <stop offset="100%" stopColor="#7b4dd9" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M0 28 H220 M0 56 H220 M0 84 H220" stroke="#17121f" strokeOpacity="0.07" fill="none" vectorEffect="non-scaling-stroke" />
              <path d="M0 88 C30 84 40 58 72 62 S112 84 146 48 S196 22 220 16 V110 H0 Z" fill="url(#wbs-area)" />
              <path d="M0 88 C30 84 40 58 72 62 S112 84 146 48 S196 22 220 16" fill="none" stroke="url(#wbs-dusk)" strokeWidth="2.5" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
            </svg>
            <p>
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
            </p>
          </div>
          <ul className="wbs-app__list">
            {TODAY.map(([tag, name, time, dot]) => (
              <li key={name}>
                <i className={`wbs-dot ${dot}`}>{tag}</i>
                <b>{name}</b>
                <span>{time}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function Code() {
  return (
    <>
      <pre className="wbs-code">
        <code>
          <span className="wbs-c">{"// one team, one codebase"}</span>
          {"\n"}
          <span className="wbs-k">export function</span> <span className="wbs-f">Booking</span>
          {"() {\n  "}
          <span className="wbs-k">return</span>
          {" <"}
          <span className="wbs-t">Card</span> <span className="wbs-a">status</span>
          {"="}
          <span className="wbs-s">{'"confirmed"'}</span>
          {" />;"}
        </code>
      </pre>
      <ul className="wbs-log">
        <li>Build passed</li>
        <li>Tests passed</li>
        <li>Live</li>
      </ul>
    </>
  );
}

export default function WebBuildScene() {
  return (
    <div
      className="wbs"
      role="img"
      aria-label="A concept website in a browser window, the booking web app behind it and a panel of the code that joins them."
    >
      <div className="wbs__code" data-reveal="up" data-delay="0.1" aria-hidden="true">
        <Code />
      </div>
      <div className="wbs__site" data-reveal="up" data-delay="0.2" aria-hidden="true">
        <Site />
      </div>
      <div className="wbs__app" data-reveal="up" data-delay="0.35" aria-hidden="true">
        <App />
      </div>
      <p className="wbs__toast" data-reveal="up" data-delay="0.5" aria-hidden="true">
        <i>
          <Check strokeWidth={2.75} />
        </i>
        Booking confirmed
      </p>
    </div>
  );
}
