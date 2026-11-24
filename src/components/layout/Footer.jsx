import { useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion } from "../../lib/motion";
import { getLenis } from "../../lib/smooth";
import { ArrowUpRight, ArrowRight, ArrowUp, Phone } from "lucide-react";
import { WhatsAppMark } from "../ui/WhatsAppButton";
import Logo from "../ui/Logo";
import SocialIcon from "../ui/SocialIcon";
import { allServices as services } from "../../data/services";
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
// The footer's invitation, phrased for the page it closes
const INVITES = {
  default: { kicker: "Have a project in mind?", line: "Let’s build what’s next, together.", cta: "Start a project", to: "/contact" },
  "/about": { kicker: "Work with the team", line: "Meet the people who will build it.", cta: "Start a project", to: "/contact" },
  "/contact": { kicker: "Prefer a quick chat?", line: "Message us. We reply within a day.", cta: "Fill in the enquiry", to: "/contact#enquiry" },
  "/portfolio": { kicker: "Like what you see?", line: "Your website could be the next one here.", cta: "Start your website", to: "/contact" },
  "/portfolio/apps": { kicker: "Have an app in mind?", line: "Let’s put it on your customers’ phones.", cta: "Start your app", to: "/contact" },
  "/partners": { kicker: "Questions before you apply?", line: "Talk to us about partnering.", cta: "Apply now", to: "/partners#apply" },
  "/services/web-apps-websites": { kicker: "Need a website or web app?", line: "Let’s build one that’s fast and easy to grow.", cta: "Start your project", to: "/contact" },
  "/services/d2c": { kicker: "Selling direct?", line: "Let’s build a store that sells.", cta: "Start your store", to: "/contact" },
  "/services/mobile-apps": { kicker: "Planning an app?", line: "Let’s earn a place on the home screen.", cta: "Start your app", to: "/contact" },
  "/services/portals": { kicker: "Outgrown spreadsheets?", line: "Let’s build the tool your team needs.", cta: "Start your portal", to: "/contact" },
  "/services/marketing": { kicker: "Ready to grow?", line: "Let’s plan campaigns you can measure.", cta: "Plan your campaign", to: "/contact" },
  "/services/design-graphics": { kicker: "Need a stronger brand?", line: "Let’s design an identity people remember.", cta: "Start your brand", to: "/contact" },
  "/privacy-policy": { kicker: "Questions about your data?", line: "Ask us. We’ll answer plainly.", cta: "Contact us", to: "/contact" },
  "/terms-and-conditions": { kicker: "Questions about these terms?", line: "Ask us before you start.", cta: "Contact us", to: "/contact" },
  "/refunds-and-cancellation": { kicker: "Questions about a refund?", line: "Talk to us. We’ll sort it out.", cta: "Contact us", to: "/contact" },
};

export default function Footer() {
  const markRef = useRef(null);
  const { pathname } = useLocation();
  const invite = INVITES[pathname.replace(/\/$/, "")] || INVITES.default;

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
            <p className="footer__kicker t-meta">{invite.kicker}</p>
            <p className="footer__line">{invite.line}</p>
            <a className="footer__mail" href={`mailto:${company.email}`}>
              {company.email}
              <ArrowUpRight size={18} strokeWidth={1.75} aria-hidden="true" />
            </a>
          </div>
          {/* a same-page target (#apply) is a plain anchor, so the page scrolls to it */}
          {invite.to.startsWith(pathname + "#") ? (
            <a href={invite.to.slice(pathname.length)} className="footer__cta">
              <span>{invite.cta}</span>
              <span className="footer__cta-icon" aria-hidden="true">
                <ArrowRight size={18} strokeWidth={2} />
              </span>
            </a>
          ) : (
            <Link to={invite.to} className="footer__cta">
              <span>{invite.cta}</span>
              <span className="footer__cta-icon" aria-hidden="true">
                <ArrowRight size={18} strokeWidth={2} />
              </span>
            </Link>
          )}
        </div>

        <div className="footer__grid">
          <div className="footer__brand">
            <Logo size={26} />
            <p>
              A design-led company building software, web apps and mobile apps for businesses worldwide since{" "}
              {company.foundedYear}, with a special focus on D2C brands.
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
                <Link to="/portfolio">Portfolio</Link>
              </li>
              <li>
                <Link to="/partners">Partners</Link>
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
                <a href={company.phoneHref} className="footer__reach">
                  <span className="footer__reach-icon" aria-hidden="true">
                    <Phone size={14} strokeWidth={2} />
                  </span>
                  <span>
                    <span className="sr-only">Call </span>
                    {company.phoneDisplay}
                  </span>
                </a>
              </li>
              <li>
                <a href={company.whatsapp} target="_blank" rel="noopener noreferrer" className="footer__reach footer__reach--wa">
                  <span className="footer__reach-icon" aria-hidden="true">
                    <WhatsAppMark />
                  </span>
                  <span>
                    <span className="sr-only">WhatsApp </span>
                    {company.phoneDisplay}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </span>
                </a>
              </li>
            </ul>
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
