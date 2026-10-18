import { serviceBySlug } from "../../data/services";
import { useServiceMeta } from "../../hooks/usePageMeta";
import {
  ServiceHero,
  Offerings,
  Deliverables,
  ServiceFaq,
  OtherServices,
} from "../../components/service/ServiceBlocks";
import SplitHeading from "../../components/ui/SplitHeading";
import ContactCTA from "../../components/ui/ContactCTA";
import { BrandSheet } from "../../components/visuals/Visuals";
import { company } from "../../data/site";

const service = serviceBySlug["design-graphics"];

function HeroVisual() {
  return (
    <figure className="dsg-hero">
      <div className="dsg-hero__sheet" data-reveal="up">
        <BrandSheet />
      </div>
      <div className="dsg-hero__card" data-reveal="up" data-delay="0.3" aria-hidden="true">
        <img src="/brand/ky-creatives-logo.png" alt="" width="285" height="79" />
      </div>
      <figcaption className="t-meta">From the KY Creatives brand guidelines, our own identity system</figcaption>
    </figure>
  );
}

/* One identity carried across formats, set in the KY Creatives identity
   itself with the official logo, palette and type. */
function SystemGallery() {
  return (
    <section className="sys section on-dark" data-tone="dark" aria-labelledby="sys-title">
      <div className="container">
        <div className="cmp__head">
          <p className="kicker kicker--aqua t-meta">One system, many formats</p>
          <div id="sys-title">
            <SplitHeading className="offer__title" lines={["The same brand,", "wherever it appears."]} />
          </div>
          <p className="roles__lead" data-reveal="up">
            A good identity holds together on a business card, a social post and a website banner. Here is ours, applied
            the way we would apply yours.
          </p>
        </div>

        <div className="sys__grid" aria-hidden="true">
          <figure className="sys__item sys__item--post" data-reveal="up">
            <div className="sys__post">
              <span className="rule-flame" />
              <p>What we create is business.</p>
              <img src="/brand/ky-flame-icon.png" alt="" width="512" height="512" loading="lazy" />
            </div>
            <figcaption className="t-meta">Social post, 1080 x 1080</figcaption>
          </figure>

          <figure className="sys__item sys__item--card" data-reveal="up" data-delay="0.08">
            <div className="sys__cards">
              <div className="sys__card sys__card--front">
                <img src="/brand/ky-creatives-logo.png" alt="" width="285" height="79" loading="lazy" />
              </div>
              <div className="sys__card sys__card--back">
                <strong>Design-led software, web and mobile apps.</strong>
                <span className="t-meta">{company.email}</span>
                <span className="t-meta">kycreatives.com</span>
              </div>
            </div>
            <figcaption className="t-meta">Business card, front and back</figcaption>
          </figure>

          <figure className="sys__item sys__item--banner" data-reveal="wipe">
            <div className="sys__banner">
              <div>
                <p className="sys__banner-title">Apps that turn browsers into buyers.</p>
                <span className="sys__banner-btn">Start a project</span>
              </div>
              <div className="sys__banner-art" />
            </div>
            <figcaption className="t-meta">Website banner, 1440 x 480</figcaption>
          </figure>

          <figure className="sys__item sys__item--doc" data-reveal="up" data-delay="0.2">
            <div className="sys__doc">
              <img src="/brand/ky-creatives-logo.png" alt="" width="285" height="79" loading="lazy" />
              <p className="sys__doc-title">Your checkout rebuild: week 3 update</p>
              <span className="sys__doc-line" />
              <span className="sys__doc-line sys__doc-line--short" />
              <span className="sys__doc-line" />
            </div>
            <figcaption className="t-meta">Proposal and report cover</figcaption>
          </figure>
        </div>
        <p className="sys__note t-meta">
          Concept applications shown in the KY Creatives identity. Headlines are examples from our brand guidelines.
        </p>
      </div>
    </section>
  );
}

export default function DesignGraphics() {
  useServiceMeta(service);
  return (
    <div className="svcpage svcpage--cyan">
      <ServiceHero service={service} theme="cyan" aside={<HeroVisual />} />
      <SystemGallery />
      <Offerings
        service={service}
        title={["Identity, interfaces", "and everyday creative."]}
        lead="We design brand and product together, so your logo, your website and your next social post share one set of rules."
      />
      <Deliverables items={service.deliverables} tone="flame" title={["What you take", "away"]} />
      <ServiceFaq faqs={service.faqs} />
      <OtherServices current={service.slug} />
      <ContactCTA lines={["Tell us where your brand", "needs to show up."]} />
    </div>
  );
}
