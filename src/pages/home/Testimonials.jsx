import { ArrowUpRight } from "lucide-react";
import { QuoteMark } from "../../components/art/Art";
import { testimonials } from "../../data/testimonials";
import { reviewLinks } from "../../data/site";

/**
 * Static editorial layout: one lead quote set large on Cloud, two supporting
 * quotes on Cyan and Orange fields (Ink text, readable brand pairings).
 * No carousel, no invented ratings or portraits.
 */
export default function Testimonials() {
  const [lead, ...rest] = testimonials;
  const tones = ["cyan", "orange"];
  return (
    <section className="quotes" data-tone="light" aria-labelledby="quotes-title">
      <div className="container">
        <div className="quotes__top">
          <h2 id="quotes-title" className="kicker t-meta">
            What clients say
          </h2>
          <p className="quotes__more">
            <span className="t-muted">More reviews on</span>
            <a className="link-u" href={reviewLinks.trustpilot} target="_blank" rel="noopener noreferrer">
              Trustpilot
              <ArrowUpRight size={16} strokeWidth={1.75} aria-hidden="true" />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            <a className="link-u" href={reviewLinks.google} target="_blank" rel="noopener noreferrer">
              Google
              <ArrowUpRight size={16} strokeWidth={1.75} aria-hidden="true" />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </p>
        </div>
        <figure className="quotes__lead">
          <QuoteMark className="quotes__mark" />
          <blockquote data-reveal="up">
            <p>{lead.quote}</p>
          </blockquote>
          <figcaption data-reveal="up" data-delay="0.1">
            <span className="quotes__name">{lead.name}</span>
            <span className="quotes__co t-meta">{lead.company}</span>
          </figcaption>
        </figure>
        <div className="quotes__rest">
          {rest.map((t, i) => (
            <figure key={t.name} className={`quotes__item quotes__item--${tones[i]}`} data-reveal="up" data-delay={i * 0.1}>
              <blockquote>
                <p>{t.quote}</p>
              </blockquote>
              <figcaption>
                <span className="quotes__name">{t.name}</span>
                <span className="quotes__co t-meta">{t.company}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
