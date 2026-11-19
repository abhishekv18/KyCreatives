import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight, Star } from "lucide-react";
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

function Stars({ className = "" }) {
  return (
    <span className={`stars ${className}`} role="img" aria-label="Five stars">
      {[0, 1, 2, 3, 4].map((i) => (
        <i key={i}>
          <Star strokeWidth={0} aria-hidden="true" />
        </i>
      ))}
    </span>
  );
}

/* The two review platforms, set as small branded badges */
function GoogleMark() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" className="tbadge__logo">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
    </svg>
  );
}

function TrustpilotMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="tbadge__logo">
      <path fill="#00b67a" d="M12 1.5l2.82 8.68h9.13l-7.39 5.37 2.82 8.68L12 18.86l-7.38 5.37 2.82-8.68L.05 10.18h9.13z" />
    </svg>
  );
}

function Review({ t }) {
  return (
    <li className="rcard">
      <figure>
        <div className="rcard__top">
          <Stars />
          <span className="rcard__glyph" aria-hidden="true">
            &rdquo;
          </span>
        </div>
        <blockquote className="rq__quote">
          <Quote text={t.quote} highlight={t.highlight} />
        </blockquote>
        <figcaption className="rcard__by">
          <span className="rcard__mono" aria-hidden="true">
            {initials(t.name)}
          </span>
          <span className="rcard__who">
            <span className="rq__name">{t.name}</span>
            <span className="rq__co">{t.company}</span>
          </span>
        </figcaption>
      </figure>
    </li>
  );
}

/*
  The three published client reviews as matching cards: a row on wide screens,
  a swipeable, snapping rail on phones. The phrase each client stressed is
  marked as the section scrolls in. Each carries the five stars the client
  gave, and the head links to the two platforms the reviews live on.
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
          <p className="reviews__sources t-muted" data-reveal="up">
            Words from the businesses we have designed and built for, published just as they wrote them.
          </p>
        </div>

        <div className="reviews__bar" data-reveal="up">
          <div className="reviews__score">
            <strong>5.0</strong>
            <span>
              <Stars />
              <span className="reviews__score-note">Average rating from our clients</span>
            </span>
          </div>
          <div className="reviews__badges">
              <a className="tbadge" href={reviewLinks.trustpilot} target="_blank" rel="noopener noreferrer">
                <span className="tbadge__head">
                  <TrustpilotMark />
                  <b>Trustpilot</b>
                  <ArrowUpRight size={15} strokeWidth={1.75} aria-hidden="true" className="tbadge__arrow" />
                </span>
                <Stars className="stars--tp" />
                <span className="tbadge__note">Read our reviews</span>
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
              <a className="tbadge" href={reviewLinks.google} target="_blank" rel="noopener noreferrer">
                <span className="tbadge__head">
                  <GoogleMark />
                  <b>Google</b>
                  <ArrowUpRight size={15} strokeWidth={1.75} aria-hidden="true" className="tbadge__arrow" />
                </span>
                <Stars className="stars--google" />
                <span className="tbadge__note">Review us on Google</span>
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
          </div>
        </div>

        <ul role="list" className="reviews__cards" data-stagger="">
          {testimonials.map((t) => (
            <Review key={t.name} t={t} />
          ))}
        </ul>
        <p className="reviews__hint t-meta" aria-hidden="true">
          Swipe to read all {testimonials.length} reviews
        </p>
      </div>
    </section>
  );
}
