import { useRef } from "react";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion } from "../../lib/motion";
import { getLenis } from "../../lib/smooth";
import { ArrowUpRight, ArrowRight, ArrowUp } from "lucide-react";
import Logo from "../ui/Logo";
import SocialIcon from "../ui/SocialIcon";
import { services } from "../../data/services";
import { company, social, legalNav } from "../../data/site";

// Read once when the app loads; the copyright year follows the visitor's clock.
const YEAR = new Date().getFullYear();
const MARK = "KY Creatives";

// Glides back to the top of the page, then moves keyboard focus there too.
function backToTop() {
  const reduced = prefersReducedMotion();
  const focusTop = () => document.getElementById("main")?.focus({ preventScroll: true });
  const lenis = getLenis();
  if (lenis && !reduced) {
    lenis.scrollTo(0, { duration: 1.4, onComplete: focusTop });
  } else {
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
    focusTop();
  }
}

/*
  Footer on Ink. Four bands, top to bottom:
  1. Invitation: a short line and the email on the left, the CTA on the right.
  2. Index: studio blurb and four link columns on the 12-column grid.
  3. Wordmark: "KY Creatives" set very large in a faint tint, as a signature.
  4. Base: copyright, legal links and location.
*/
export default function Footer() {
  const markRef = useRef(null);

  // The wordmark rises out of the hairline as one piece as the footer
  // scrolls into view, tied to scroll so it sinks back on the way up.
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.fromTo(
        markRef.current.querySelector(".footer__word"),
        { yPercent: 100 },
        {
          yPercent: 0,
          ease: "power2.out",
          scrollTrigger: {
            // a longer stretch of scroll and a softer lag make it a calm glide
            trigger: markRef.current,
            start: "top bottom+=240",
            end: "bottom bottom",
            scrub: 2.2,
            invalidateOnRefresh: true,
          },
        }
      );
    },
    { scope: markRef }
  );

  return (
    <footer className="footer on-dark" data-tone="dark">
      <div className="container">
        <div className="footer__invite">
          <div className="footer__invite-copy">
            <p className="footer__kicker t-meta">Have a project in mind?</p>
            <p className="footer__line">Let&rsquo;s build what&rsquo;s next, together.</p>
            <a className="footer__mail" href={`mailto:${company.email}`}>
              {company.email}
              <ArrowUpRight size={18} strokeWidth={1.75} aria-hidden="true" />
            </a>
          </div>
          <Link to="/contact" className="footer__cta">
            <span>Start a project</span>
            <span className="footer__cta-icon" aria-hidden="true">
              <ArrowRight size={18} strokeWidth={2} />
            </span>
          </Link>
        </div>

        <div className="footer__grid">
          <div className="footer__brand">
            <Logo width={132} card />
            <p>
              A design-led studio building software, web apps and mobile apps for businesses worldwide, with a special
              focus on D2C brands.
            </p>
          </div>

          <nav className="footer__col footer__col--studio" aria-label="Footer: studio">
            <h2 className="footer__h t-meta">Studio</h2>
            <ul role="list">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/#work">Selected work</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </nav>

          <nav className="footer__col footer__col--services" aria-label="Footer: services">
            <h2 className="footer__h t-meta">Services</h2>
            <ul role="list">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link to={s.path}>{s.name}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="footer__col footer__col--contact">
            <h2 className="footer__h t-meta">Contact</h2>
            <ul role="list">
              <li>
                <a href={company.phoneHref}>{company.phoneDisplay}</a>
              </li>
              <li>
                <a href={company.whatsapp} target="_blank" rel="noopener noreferrer">
                  WhatsApp<span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            </ul>
            <address className="footer__address">
              <a href={company.address.map} target="_blank" rel="noopener noreferrer">
                {company.address.lines.map((l) => (
                  <span key={l}>{l}</span>
                ))}
                <span className="sr-only"> (opens in Google Maps, new tab)</span>
              </a>
            </address>
          </div>

          <nav className="footer__col footer__col--social" aria-label="Footer: social">
            <h2 className="footer__h t-meta">Follow</h2>
            <ul role="list">
              {social.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="footer__social">
                    <SocialIcon name={s.label} size={15} brand />
                    {s.label}
                    <ArrowUpRight size={13} strokeWidth={1.75} aria-hidden="true" className="footer__social-go" />
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      <p className="footer__mark" ref={markRef} aria-hidden="true">
        <span className="footer__word">{MARK}</span>
      </p>

      <div className="container footer__base">
        <p className="t-meta">
          &copy; {YEAR} {company.name}. <span className="footer__rights">All rights reserved.</span>
        </p>
        <ul role="list" className="footer__legal">
          {legalNav.map((l) => (
            <li key={l.to}>
              <Link to={l.to}>
                <span className="footer__legal-full">{l.label}</span>
                <span className="footer__legal-short" aria-hidden="true">
                  {l.short}
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="footer__end">
          <p className="t-meta footer__place">Gurugram, India · Since {company.foundedYear}</p>
          <button type="button" className="footer__totop" onClick={backToTop} aria-label="Back to top">
            <span className="footer__totop-label t-meta" aria-hidden="true">
              Back to top
            </span>
            <span className="footer__totop-icon" aria-hidden="true">
              <ArrowUp size={16} strokeWidth={1.75} />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}
