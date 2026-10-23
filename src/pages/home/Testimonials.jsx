import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight } from "lucide-react";
import SplitHeading from "../../components/ui/SplitHeading";
import { testimonials } from "../../data/testimonials";
import { reviewLinks } from "../../data/site";
import { ScrollTrigger, prefersReducedMotion } from "../../lib/motion";

/* The quote with its key phrase marked, as the client wrote it. */
function Quote({ text, highlight }) {
  const at = highlight ? text.indexOf(highlight) : -1;
  if (at < 0) return <p>{text}</p>;
  return (
    <p>
      {text.slice(0, at)}
      <span className="rq__hl">{highlight}</span>
      {text.slice(at + highlight.length)}
    </p>
  );
}

const initials = (name) =>
  name
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

function Review({ t, index, total }) {
  return (
    <li className="rcard">
      <figure>
        <p className="rcard__top t-meta" aria-hidden="true">
          <span>{t.company}</span>
          <span>
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
        </p>
        <span className="rcard__glyph" aria-hidden="true">
          &rdquo;
        </span>
        <blockquote className="rq__quote">
          <Quote text={t.quote} highlight={t.highlight} />
        </blockquote>
        <figcaption className="rcard__by">
          <span className="rcard__mono" aria-hidden="true">
            {initials(t.name)}
          </span>
          <span className="rcard__who">
            <span className="rq__name">{t.name}</span>
            <span className="rq__co t-meta">Client, {t.company}</span>
          </span>
        </figcaption>
      </figure>
    </li>
  );
}

/*
  The three published client reviews as matching cards: a row on wide screens,
  a swipeable, snapping rail on phones. The phrase each client stressed is
  marked as the section scrolls in. No ratings, portraits or counts that we
  cannot verify.
*/
export default function Testimonials() {
  const ref = useRef(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) {
        ref.current.classList.add("is-in");
        return;
      }
      ScrollTrigger.create({
        trigger: ".reviews__cards",
        start: "top 70%",
        onEnter: () => ref.current.classList.add("is-in"),
      });
    },
    { scope: ref }
  );

  return (
    <section className="reviews" ref={ref} data-tone="light" aria-labelledby="reviews-title">
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

        <ul role="list" className="reviews__cards" data-stagger="">
          {testimonials.map((t, i) => (
            <Review key={t.name} t={t} index={i} total={testimonials.length} />
          ))}
        </ul>
        <p className="reviews__hint t-meta" aria-hidden="true">
          Swipe to read all {testimonials.length} reviews
        </p>
      </div>
    </section>
  );
}
