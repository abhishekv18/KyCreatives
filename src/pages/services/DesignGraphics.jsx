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
import { Guides } from "../../components/art/Art";
import { IdentitySet } from "../../components/visuals/Visuals";
import { company } from "../../data/site";

const service = serviceBySlug["design-graphics"];

function HeroVisual() {
  return (
    <figure className="dsg-hero">
      <div data-reveal="up">
        <IdentitySet />
      </div>
      <figcaption className="t-meta">Our own identity applied: letterhead, guidelines and app icon</figcaption>
    </figure>
  );
}

/* How a brand system works: a few rules on the left, the same rules applied on
   the right. Shown in the KY Creatives identity with the official logo,
   palette and type. */
const RULES = [
  { n: "01", name: "Logo", note: "Full logo and flame icon" },
  { n: "02", name: "Colour", note: "Six colours, two gradients" },
  { n: "03", name: "Type", note: "Libre Baskerville and DM Sans" },
  { n: "04", name: "Voice", note: "Plain words, no jargon" },
];

const SWATCHES = ["#E2418F", "#FF9533", "#7B4DD9", "#4C8DEB", "#6FE3F5", "#17121F"];

function RuleSample({ n }) {
  if (n === "01")
    return (
      <span className="bsys__logo">
        <img src="/brand/ky-creatives-logo.png" alt="" width="285" height="79" loading="lazy" />
      </span>
    );
  if (n === "02")
    return (
      <span className="bsys__swatches">
        {SWATCHES.map((c) => (
          <i key={c} style={{ background: c }} />
        ))}
      </span>
    );
  if (n === "03")
    return (
      <span className="bsys__type">
        <b>Aa</b>
        <i>Aa</i>
      </span>
    );
  return <span className="bsys__voice">&ldquo;Start a project&rdquo;</span>;
}

function Uses({ rules }) {
  return (
    <span className="bsys__uses">
      <span className="sr-only">Uses rules {rules.join(", ")}</span>
      {rules.map((r) => (
        <i key={r} aria-hidden="true">
          {r}
        </i>
      ))}
    </span>
  );
}

function SystemGallery() {
  return (
    <section className="sys section on-dark" data-tone="dark" aria-labelledby="sys-title">
      <div className="container">
        <div className="cmp__head">
          <p className="kicker kicker--aqua t-meta">How a brand system works</p>
          <div id="sys-title">
            <SplitHeading className="offer__title" lines={["Set the rules once,", "use them everywhere."]} />
          </div>
          <p className="roles__lead" data-reveal="up">
            A brand system is a short set of rules: logo, colour, type and voice. Every card, post and page follows them,
            so customers recognise you wherever they meet you.
          </p>
        </div>

        <div className="bsys">
          <div className="bsys__rules" data-reveal="up">
            <p className="bsys__label t-meta">The rules</p>
            <ol role="list">
              {RULES.map((r) => (
                <li key={r.n}>
                  <span className="bsys__n t-meta">{r.n}</span>
                  <span className="bsys__text">
                    <strong>{r.name}</strong>
                    <span>{r.note}</span>
                  </span>
                  <span className="bsys__sample" aria-hidden="true">
                    <RuleSample n={r.n} />
                  </span>
                </li>
              ))}
            </ol>
          </div>

          <div className="bsys__apps">
            <p className="bsys__label t-meta">Applied</p>
            <div className="bsys__grid">
              <figure className="bsys__app" data-reveal="up">
                <div className="bsys__frame" aria-hidden="true">
                  <div className="sys__post">
                    <span className="rule-flame" />
                    <p>What we create is business.</p>
                    <img src="/brand/ky-flame-icon.png" alt="" width="512" height="512" loading="lazy" />
                  </div>
                </div>
                <figcaption>
                  <span>
                    <strong>Social post</strong> 1080 x 1080
                  </span>
                  <Uses rules={["01", "02", "03", "04"]} />
                </figcaption>
              </figure>

              <figure className="bsys__app" data-reveal="up" data-delay="0.08">
                <div className="bsys__frame" aria-hidden="true">
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
                </div>
                <figcaption>
                  <span>
                    <strong>Business card</strong> front and back
                  </span>
                  <Uses rules={["01", "02", "03"]} />
                </figcaption>
              </figure>

              <figure className="bsys__app bsys__app--wide" data-reveal="up" data-delay="0.16">
                <div className="bsys__frame" aria-hidden="true">
                  <div className="sys__banner">
                    <div>
                      <p className="sys__banner-title">Apps that turn browsers into buyers.</p>
                      <span className="sys__banner-btn">Start a project</span>
                    </div>
                    <div className="sys__banner-art" />
                  </div>
                </div>
                <figcaption>
                  <span>
                    <strong>Website banner</strong> 1440 x 480
                  </span>
                  <Uses rules={["02", "03", "04"]} />
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
        <p className="sys__note t-meta">Concept applications in the KY Creatives identity.</p>
      </div>
    </section>
  );
}

export default function DesignGraphics() {
  useServiceMeta(service);
  return (
    <div className="svcpage svcpage--cyan">
      <ServiceHero service={service} theme="cyan" art={<Guides />} aside={<HeroVisual />} />
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
