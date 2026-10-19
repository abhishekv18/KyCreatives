import { useState } from "react";
import { Pause, Play } from "lucide-react";
import SplitHeading from "../../components/ui/SplitHeading";
import { partners } from "../../data/partners";

function Card({ p, hidden }) {
  return (
    <li className="pcard" aria-hidden={hidden || undefined}>
      <span className="pcard__logo">
        <img
          src={p.image}
          alt={hidden ? "" : p.name ? `${p.name} logo` : "Partner logo"}
          decoding="async"
          className={p.shape ? `pcard__img--${p.shape}` : undefined}
        />
      </span>
      <span className="pcard__name">{p.short || p.name || "Partner"}</span>
    </li>
  );
}

/*
  Partner logos from the original site as a slow two-row slider. Every mark
  sits on an identical white card, so ten very different logos read as one
  set. Rows drift in opposite directions; hover, focus or the Pause button
  stops them, and with reduced motion they become a still, wrapping grid.
*/
export default function Partners() {
  const [paused, setPaused] = useState(false);
  const half = Math.ceil(partners.length / 2);
  const rows = [partners.slice(0, half), partners.slice(half)];

  return (
    <section className="partners" data-tone="light" aria-labelledby="partners-title">
      <div className="container partners__head">
        <p className="kicker kicker--dusk t-meta">Our partners</p>
        <div id="partners-title">
          <SplitHeading as="h2" className="partners__title" lines={["The businesses", "behind the work."]} />
        </div>
        <div className="partners__side" data-reveal="up">
          <p className="t-muted">Brands, organisations and public projects that have partnered with KY Creatives.</p>
          <button
            type="button"
            className="partners__toggle"
            aria-pressed={paused}
            onClick={() => setPaused((v) => !v)}
          >
            {paused ? <Play size={14} strokeWidth={2} aria-hidden="true" /> : <Pause size={14} strokeWidth={2} aria-hidden="true" />}
            {paused ? "Play" : "Pause"} logos
          </button>
        </div>
      </div>

      <div className={`marquee ${paused ? "is-paused" : ""}`}>
        {rows.map((row, r) => (
          <div key={r} className={`marquee__row ${r ? "marquee__row--rev" : ""}`}>
            <ul role="list" className="marquee__track" aria-label={r ? undefined : "Partner logos"}>
              {row.map((p) => (
                <Card key={p.image} p={p} />
              ))}
              {/* Duplicate set for a seamless loop; hidden from assistive tech */}
              {row.map((p) => (
                <Card key={`${p.image}-dup`} p={p} hidden />
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
