import { Link } from "react-router-dom";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import Logo from "../ui/Logo";
import { Ribbons } from "../art/Art";
import { services } from "../../data/services";
import { serviceIcons } from "../ui/serviceIcons";
import { company, social, legalNav } from "../../data/site";

// Read once when the app loads; the copyright year follows the visitor's clock.
const YEAR = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="footer on-dark" data-tone="dark">
      <div className="footer__art" data-draw-scrub="">
        <Ribbons set="footer" />
      </div>

      <div className="container footer__inner">
        <div className="footer__lead">
          <p className="t-meta footer__kicker">Write to us</p>
          <a className="footer__mail" href={`mailto:${company.email}`}>
            <span>{company.email}</span>
            <ArrowUpRight className="footer__mail-icon" aria-hidden="true" strokeWidth={1.25} />
          </a>
          <div className="footer__quick">
            <a href={company.phoneHref}>{company.phoneDisplay}</a>
            <a href={company.whatsapp} target="_blank" rel="noopener noreferrer">
              WhatsApp<span className="sr-only"> (opens in a new tab)</span>
            </a>
            <Link to="/contact" className="footer__start">
              Start a project
              <ArrowRight size={18} strokeWidth={1.75} aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className="footer__grid">
          <div className="footer__brand">
            <Logo width={164} card />
            <p>
              A design-led studio building software, web apps and mobile apps for businesses worldwide, with a special
              focus on D2C brands. Working with clients since {company.foundedYear}.
            </p>
          </div>

          <nav className="footer__col" aria-label="Footer: studio">
            <h2 className="footer__h t-meta">Studio</h2>
            <ul role="list">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
              <li>
                <Link to="/#work">Selected work</Link>
              </li>
            </ul>
          </nav>

          <nav className="footer__col footer__col--svc" aria-label="Footer: services">
            <h2 className="footer__h t-meta">Services</h2>
            <ul role="list">
              {services.map((s) => {
                const Icon = serviceIcons[s.slug];
                return (
                  <li key={s.slug}>
                    <Link to={s.path}>
                      <Icon size={16} strokeWidth={1.5} aria-hidden="true" />
                      {s.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="footer__col">
            <h2 className="footer__h t-meta">Studio address</h2>
            <address className="footer__address">
              {company.address.lines.map((l) => (
                <span key={l}>{l}</span>
              ))}
            </address>
            <ul role="list" className="footer__social">
              {social.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer">
                    {s.label}
                    <ArrowUpRight size={14} strokeWidth={1.5} aria-hidden="true" />
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="container footer__bottom">
        <p className="t-meta">
          &copy; {YEAR} {company.name}. All rights reserved.
        </p>
        <ul role="list" className="footer__legal">
          {legalNav.map((l) => (
            <li key={l.to}>
              <Link to={l.to}>{l.label}</Link>
            </li>
          ))}
        </ul>
        <p className="t-meta footer__place">Gurugram, India / Worldwide</p>
      </div>

      <p className="footer__mark" aria-hidden="true">
        <span>What we create</span>
        <span>is business.</span>
      </p>
    </footer>
  );
}
