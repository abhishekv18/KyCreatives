import { Link } from "react-router-dom";
import { ArrowUpRight, Mail } from "lucide-react";
import SplitHeading from "./SplitHeading";
import { company } from "../../data/site";

/**
 * Closing invitation used at the end of every page: a full-bleed Flame field
 * with Ink type (a readable pairing in the guidelines). `lines` lets each page
 * phrase the invitation for its own reader.
 */
export default function ContactCTA({
  lines = ["Tell us what you want", "to build next."],
  lead = "Share a few lines about your business and the problem to solve. We aim to reply within 24 hours on business days, with questions rather than a sales script.",
}) {
  return (
    <section className="cta" data-tone="light" aria-labelledby="cta-title">
      <div className="cta__rings" aria-hidden="true">
        <i />
        <i />
        <i />
      </div>
      <div className="container cta__inner">
        <p className="cta__kicker t-meta" data-reveal="fade">
          Next step / Start a project
        </p>
        <div id="cta-title" className="cta__title-wrap">
          <SplitHeading as="h2" className="cta__title" lines={lines} />
        </div>
        <div className="cta__bottom">
          <p className="cta__lead" data-reveal="up">
            {lead}
          </p>
          <div className="cta__actions" data-reveal="up" data-delay="0.1">
            <Link to="/contact" className="cta__button">
              <span>Start a project</span>
              <span className="cta__button-icon" aria-hidden="true">
                <ArrowUpRight size={22} strokeWidth={1.75} />
              </span>
            </Link>
            <a className="cta__mail" href={`mailto:${company.email}`}>
              <Mail size={20} strokeWidth={1.5} aria-hidden="true" />
              <span>{company.email}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
