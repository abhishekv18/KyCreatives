import { ArrowUpRight } from "lucide-react";
import SplitHeading from "../../components/ui/SplitHeading";
import { testimonials } from "../../data/testimonials";
import { reviewLinks } from "../../data/site";

// White, Ink, White rhythm; each review carries one of the three signature gradients.
const ACCENTS = ["flame", "dusk", "aqua"];

const initials = (name) =>
  name
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

/*
  The three published client reviews, as an editorial sheet: three equal
  columns ruled by hairlines, each quote set in Baskerville and signed at the
  foot. No ratings, portraits or counts that we cannot verify.
*/
export default function Testimonials() {
  return (
    <section className="reviews" data-tone="light" aria-labelledby="reviews-title">
      <div className="container">
        <div className="reviews__head">
          <p className="kicker t-meta">Client reviews</p>
          <div id="reviews-title">
            <SplitHeading as="h2" className="reviews__title" lines={["In their", "own words."]} />
          </div>
          <div className="reviews__sources" data-reveal="up">
            <p className="t-muted">Read more reviews from our clients on</p>
            <p className="reviews__links">
              <a href={reviewLinks.trustpilot} target="_blank" rel="noopener noreferrer">
                Trustpilot
                <ArrowUpRight size={16} strokeWidth={1.75} aria-hidden="true" />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
              <a href={reviewLinks.google} target="_blank" rel="noopener noreferrer">
                Google
                <ArrowUpRight size={16} strokeWidth={1.75} aria-hidden="true" />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </p>
          </div>
        </div>

        <ul role="list" className="reviews__grid" data-stagger="">
          {testimonials.map((t, i) => (
            <li key={t.name} className={`review review--${ACCENTS[i % 3]} ${i === 1 ? "review--feature on-dark" : ""}`}>
              <figure>
                <p className="review__index t-meta" aria-hidden="true">
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  <span className="review__mark">&ldquo;</span>
                </p>
                <blockquote className="review__quote">
                  <p>{t.quote}</p>
                </blockquote>
                <figcaption className="review__by">
                  <span className="review__avatar" aria-hidden="true">
                    {initials(t.name)}
                  </span>
                  <span className="review__who">
                    <span className="review__name">{t.name}</span>
                    <span className="review__co t-meta">{t.company}</span>
                  </span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
