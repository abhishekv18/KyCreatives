import { serviceBySlug } from "../../data/services";
import { useServiceMeta } from "../../hooks/usePageMeta";
import {
  ServiceHero,
  Offerings,
  Deliverables,
  RelatedWork,
  ServiceFaq,
  OtherServices,
} from "../../components/service/ServiceBlocks";
import SplitHeading from "../../components/ui/SplitHeading";
import PhoneFrame from "../../components/ui/PhoneFrame";
import ContactCTA from "../../components/ui/ContactCTA";
import { Arcs } from "../../components/art/Art";
import { StorefrontMock, ConceptLabel } from "../../components/visuals/Visuals";

const service = serviceBySlug.d2c;

// What a product page has to do, in the order a shopper meets it.
const ANATOMY = [
  { title: "Photography first", body: "Large, honest images with every angle and detail a shopper would check in a store." },
  { title: "Title, price and proof together", body: "Name, price and reviews sit in one glance, before any scrolling." },
  { title: "Options that make sense", body: "Variants show what is available, so nobody picks a size that cannot ship." },
  { title: "One clear action", body: "Add to cart is the strongest thing on the page and never moves." },
  { title: "No surprises later", body: "Delivery dates and returns appear before checkout, not after payment." },
];

function HeroPhones() {
  return (
    <div className="d2c-hero">
      <Arcs className="d2c-hero__arcs" color="#17121F" />
      <div className="d2c-phones" aria-label="Client stores on a phone">
        <PhoneFrame
          className="d2c-phones__b"
          src="/images/work/m-vibhadesigns.webp"
          alt="Vibha Designs store on a phone"
          label="vibhadesigns.com"
          loading="eager"
        />
        <PhoneFrame
          className="d2c-phones__a"
          src="/images/work/m-thedecorshed.webp"
          alt="The Decorshed store on a phone"
          label="thedecorshed.com"
          loading="eager"
        />
        <PhoneFrame
          className="d2c-phones__c"
          src="/images/work/m-notahoax.webp"
          alt="Notahoax fragrance store on a phone"
          label="notahoax.in"
          loading="eager"
        />
      </div>
      <p className="d2c-hero__tag t-meta">3 live client stores, as shoppers see them on a phone</p>
    </div>
  );
}

function Anatomy() {
  return (
    <section className="anat section" data-tone="light" aria-labelledby="anat-title">
      <div className="container anat__grid">
        <div className="anat__copy">
          <p className="kicker t-meta">Product pages</p>
          <div id="anat-title">
            <SplitHeading className="anat__title" lines={["Where the sale", "is actually made."]} />
          </div>
          <p className="t-lead" data-reveal="up">
            Most shoppers decide on the product page. We design it to answer their questions in the order they ask
            them.
          </p>
          <ol className="anat__list" role="list">
            {ANATOMY.map((a, i) => (
              <li key={a.title} data-reveal="up">
                <span className="anat__num t-meta" aria-hidden="true">
                  {i + 1}
                </span>
                <div>
                  <h3 className="anat__h">{a.title}</h3>
                  <p className="t-muted">{a.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <figure className="anat__visual">
          <div className="anat__stage stage stage--flame" data-reveal="wipe">
            <div className="anat__mock">
              <StorefrontMock />
              {[1, 2, 3, 4, 5].map((n) => (
                <span key={n} className={`anat__pin anat__pin--${n} t-meta`} aria-hidden="true">
                  {n}
                </span>
              ))}
            </div>
          </div>
          <figcaption>
            <ConceptLabel>Concept product page, numbered to match the list</ConceptLabel>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

export default function D2C() {
  useServiceMeta(service);
  return (
    <div className="svcpage svcpage--flame">
      <ServiceHero service={service} theme="flame" focus aside={<HeroPhones />} />
      <RelatedWork
        slugs={service.related}
        title={["D2C stores", "we have built."]}
        lead="Online stores for decor, gifts, pet apparel, fragrance, personal care and fashion brands. Each one is live today."
      />
      <Anatomy />
      <Offerings
        service={service}
        title={["Everything a D2C store needs,", "from first page to checkout."]}
        lead="Pick one piece or the whole store. We are honest about what your platform allows, and say so before we quote."
      />
      <Deliverables items={service.deliverables} tone="ink" title={["What a store", "project includes"]} />
      <ServiceFaq faqs={service.faqs} />
      <OtherServices current={service.slug} />
      <ContactCTA lines={["Tell us what", "your brand sells."]} />
    </div>
  );
}
