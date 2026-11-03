import { ArrowUpRight } from "lucide-react";
import SplitHeading from "../../components/ui/SplitHeading";
import GrowthLayers from "../../components/art/GrowthLayers";
import { projectBySlug } from "../../data/projects";

/*
  Our marketing partner: BrandGap on an Ink panel, beside a drawing of what the
  agency does. The wording comes from BrandGap's own site, and the link from the
  portfolio entry, so the two pages stay in step.
*/
const PARTNER = projectBySlug.brandgap;

const SERVICES = ["Performance marketing", "Brand and creative strategy", "Social media and content", "E-commerce growth"];

export default function MarketingPartner() {
  return (
    <section className="mkp" data-tone="light" aria-labelledby="mkp-title">
      <div className="container">
        <div className="mkp__head">
          <div>
            <p className="kicker kicker--dusk t-meta">Our marketing partner</p>
            <div id="mkp-title">
              <SplitHeading as="h2" className="mkp__title" lines={["The marketing behind", "the launch."]} />
            </div>
          </div>
          <p className="mkp__side t-muted" data-reveal="up">
            We build the website and BrandGap brings the right people to it, so launch day is only the start.
          </p>
        </div>

        <div className="mkp__panel" data-reveal="up">
          <div className="mkp__copy">
            <p className="mkp__brand">
              <span className="mkp__mark">
                <img src="/images/partners/brandgap-mark.svg" alt="" width="389" height="505" loading="lazy" decoding="async" />
              </span>
              <span className="mkp__name">
                Brand<em>Gap</em>
              </span>
            </p>
            <p className="mkp__tagline">Where brand becomes growth.</p>
            <p className="mkp__body">
              A website can only sell to the people who reach it. BrandGap is the growth agency we work with to bring them
              there, helping D2C, e-commerce and service businesses grow.
            </p>
            <p className="mkp__body">A good store and good media, planned together from the first conversation.</p>
            <ul role="list" className="mkp__services">
              {SERVICES.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
            <a className="mkp__link" href={PARTNER.liveUrl} target="_blank" rel="noopener noreferrer">
              Visit BrandGap
              <ArrowUpRight size={18} strokeWidth={1.75} aria-hidden="true" />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>

          <div className="mkp__art">
            <GrowthLayers />
          </div>
        </div>
      </div>
    </section>
  );
}
