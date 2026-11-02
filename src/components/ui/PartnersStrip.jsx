import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { partners } from "../../data/partners";

function Logo({ p, hidden }) {
  return (
    <li className="pstrip__item" aria-hidden={hidden || undefined}>
      {p.wordmark ? (
        <span
          className={`pstrip__word ${p.wordmark.serif ? "pstrip__word--serif" : ""}`}
          style={{ color: p.wordmark.color }}
          aria-hidden="true"
        >
          {p.wordmark.text}
        </span>
      ) : (
        <img src={p.image} alt={hidden ? "" : `${p.name} logo`} loading="lazy" decoding="async" />
      )}
      {!hidden && p.wordmark && <span className="sr-only">{p.name}</span>}
    </li>
  );
}

/*
  A compact, single-row version of the client logos for inner pages: a short
  line on the left and the logos gliding past on the right. The full two-row
  section stays on the home page; both read from the same partners list.
*/
export default function PartnersStrip() {
  return (
    <section className="pstrip" data-tone="light" aria-labelledby="pstrip-title">
      <div className="container pstrip__inner">
        <div className="pstrip__intro">
          <p className="kicker t-meta">Our clients</p>
          <h2 id="pstrip-title" className="pstrip__title">
            Trusted by <b>{partners.length}</b> businesses
          </h2>
          <Link to="/portfolio" className="pstrip__link">
            See their websites
            <ArrowUpRight size={16} strokeWidth={1.75} aria-hidden="true" />
          </Link>
        </div>
        <div className="pstrip__rail">
          <ul role="list" className="pstrip__track" aria-label="Client logos">
            {partners.map((p) => (
              <Logo key={p.name} p={p} />
            ))}
            {partners.map((p) => (
              <Logo key={`${p.name}-dup`} p={p} hidden />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
