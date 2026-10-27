/*
  Purpose-built interface compositions for services that have no published
  client screens to show. Each is labelled "Concept" wherever it appears.
  They use the brand tokens only and avoid invented business metrics.
*/
import { Search, ShoppingBag, Heart, Star, Bell, ChevronRight, Check, Lock, Users, FileText, Truck, Calendar } from "lucide-react";

const ico = { size: 14, strokeWidth: 1.5, "aria-hidden": true };

export function ConceptLabel({ children = "Concept", tone = "light" }) {
  return <span className={`concept-label concept-label--${tone} t-meta`}>{children}</span>;
}

/* A product detail page for a D2C store */
export function StorefrontMock() {
  return (
    <div className="mock mock-pdp" aria-hidden="true">
      <div className="mock-pdp__nav">
        <span className="mock-pdp__brand">your brand</span>
        <span className="mock-pdp__links">
          <i>New in</i>
          <i>Shop</i>
          <i>Journal</i>
        </span>
        <span className="mock-pdp__icons">
          <Search {...ico} />
          <Heart {...ico} />
          <ShoppingBag {...ico} />
        </span>
      </div>
      <div className="mock-pdp__body">
        <div className="mock-pdp__gallery">
          <div className="mock-pdp__hero" />
          <div className="mock-pdp__thumbs">
            <i className="is-on" />
            <i />
            <i />
            <i />
          </div>
        </div>
        <div className="mock-pdp__info">
          <span className="mock-pdp__crumb">Home / Planters</span>
          <span className="mock-pdp__title">Hand-glazed stoneware planter</span>
          <span className="mock-pdp__rating">
            <Star {...ico} />
            <Star {...ico} />
            <Star {...ico} />
            <Star {...ico} />
            <Star {...ico} />
            <em>Reviews</em>
          </span>
          <span className="mock-pdp__price">Price shown here</span>
          <span className="mock-pdp__label">Size</span>
          <span className="mock-pdp__sizes">
            <i>S</i>
            <i className="is-on">M</i>
            <i>L</i>
          </span>
          <span className="mock-pdp__cta">Add to cart</span>
          <span className="mock-pdp__ship">
            <Truck {...ico} /> Delivery date shown before checkout
          </span>
        </div>
      </div>
    </div>
  );
}

/* A phone with an app home screen */
export function PhoneMock({ variant = "home" }) {
  return (
    <div className={`mock mock-phone mock-phone--${variant}`} aria-hidden="true">
      <div className="mock-phone__notch" />
      <div className="mock-phone__screen">
        <div className="mock-phone__status t-meta">
          <span>9:41</span>
          <span>●●●</span>
        </div>
        {variant === "home" ? (
          <>
            <div className="mock-phone__hello">
              <span>Good morning</span>
              <Bell {...ico} />
            </div>
            <div className="mock-phone__card mock-phone__card--grad">
              <span>Your next appointment</span>
              <strong>Tuesday, 10:30</strong>
              <em>Reschedule</em>
            </div>
            <div className="mock-phone__row">
              <span className="mock-phone__tile">
                <Calendar {...ico} />
                Book
              </span>
              <span className="mock-phone__tile">
                <FileText {...ico} />
                Records
              </span>
              <span className="mock-phone__tile">
                <Users {...ico} />
                Family
              </span>
            </div>
            <div className="mock-phone__list">
              <span>
                <i />
                Reminder set for tomorrow
                <ChevronRight {...ico} />
              </span>
              <span>
                <i />
                New message from support
                <ChevronRight {...ico} />
              </span>
              <span>
                <i />
                Receipt ready to download
                <ChevronRight {...ico} />
              </span>
            </div>
          </>
        ) : (
          <>
            <div className="mock-phone__hello">
              <span>Order status</span>
            </div>
            <div className="mock-phone__steps">
              {["Order placed", "Packed", "Out for delivery", "Delivered"].map((s, i) => (
                <span key={s} className={i < 3 ? "is-done" : ""}>
                  <i>{i < 3 ? <Check {...ico} /> : null}</i>
                  {s}
                </span>
              ))}
            </div>
            <div className="mock-phone__card">
              <span>Need help with this order?</span>
              <em>Chat with us</em>
            </div>
          </>
        )}
        <div className="mock-phone__tabbar">
          <i className="is-on" />
          <i />
          <i />
          <i />
        </div>
      </div>
    </div>
  );
}

/* A role-based portal screen */
export function PortalMock() {
  const rows = [
    ["Purchase order", "Awaiting approval", "warn"],
    ["Invoice", "Paid", "ok"],
    ["Delivery note", "Uploaded", "ok"],
    ["Price list", "Updated", "info"],
  ];
  return (
    <div className="mock mock-portal" aria-hidden="true">
      <aside className="mock-portal__side">
        <span className="mock-portal__org">Vendor portal</span>
        {["Overview", "Orders", "Invoices", "Documents", "Team"].map((s, i) => (
          <span key={s} className={i === 1 ? "is-on" : ""}>
            {s}
          </span>
        ))}
        <span className="mock-portal__role">
          <Lock {...ico} /> Role: Supplier
        </span>
      </aside>
      <div className="mock-portal__main">
        <div className="mock-portal__head">
          <span>Orders</span>
          <span className="mock-portal__search">
            <Search {...ico} /> Search orders
          </span>
        </div>
        <div className="mock-portal__table">
          <div className="mock-portal__tr mock-portal__th">
            <span>Document</span>
            <span>Status</span>
            <span>Owner</span>
          </div>
          {rows.map(([doc, status, tone]) => (
            <div className="mock-portal__tr" key={doc}>
              <span>{doc}</span>
              <span className={`mock-status mock-status--${tone}`}>{status}</span>
              <span className="mock-portal__avatar" />
            </div>
          ))}
        </div>
        <div className="mock-portal__note">
          <Users {...ico} /> Only the purchasing team can approve orders.
        </div>
      </div>
    </div>
  );
}

/* A web app workspace: structured content, labelled, no vanity numbers */
export function DashboardMock() {
  return (
    <div className="mock mock-dash" aria-hidden="true">
      <div className="mock-dash__top">
        <span className="mock-dash__logo" />
        <span className="mock-dash__tabs">
          <i className="is-on">Bookings</i>
          <i>Customers</i>
          <i>Settings</i>
        </span>
        <span className="mock-dash__user" />
      </div>
      <div className="mock-dash__body">
        <div className="mock-dash__col">
          <span className="mock-dash__h">This week</span>
          <div className="mock-dash__cal">
            {["Mon", "Tue", "Wed", "Thu", "Fri"].map((d, i) => (
              <div key={d}>
                <span>{d}</span>
                <i style={{ height: `${[40, 64, 52, 78, 30][i]}%` }} />
              </div>
            ))}
          </div>
        </div>
        <div className="mock-dash__col">
          <span className="mock-dash__h">Today</span>
          {["Site visit, Sector 37", "Design review", "Handover call"].map((t, i) => (
            <span className="mock-dash__item" key={t}>
              <i className={`dot dot--${["violet", "cobalt", "cyan"][i]}`} />
              {t}
            </span>
          ))}
          <span className="mock-dash__btn">New booking</span>
        </div>
      </div>
    </div>
  );
}

/*
  A campaign creative set in KY Creatives' own identity, shown as the formats
  it would actually run in: a 9:16 story, a 1:1 feed post and an organic
  search listing. Headlines are the examples from the brand guidelines; the
  search snippet is the studio's own description. No metrics are shown.
  Sized with container query units, so it scales as one piece.
*/
export function CampaignSet() {
  return (
    <div className="cset" aria-hidden="true">
      <div className="cset__post">
        <div className="cset__top">
          <img className="cset__mark" src="/brand/ky-flame-icon.png" alt="" width="512" height="512" loading="lazy" />
          <span className="cset__kind">Instagram post</span>
        </div>
        <div className="cset__copy">
          <p className="cset__head">Software that sells.</p>
          <p className="cset__sub">Websites, apps and stores, designed and built by one team.</p>
        </div>
        <div className="cset__foot">
          <p className="cset__url">kycreatives.com</p>
          <span className="cset__dots">
            <i className="is-on" />
            <i />
            <i />
          </span>
        </div>
      </div>

      <div className="cset__story">
        <div className="cset__bars">
          <i className="is-done" />
          <i />
        </div>
        <div className="cset__who">
          <img src="/brand/ky-flame-icon.png" alt="" width="512" height="512" loading="lazy" />
          <span>kycreatives</span>
        </div>
        <p className="cset__head">Apps that turn browsers into buyers.</p>
        <span className="cset__cta">Start a project</span>
      </div>

      <div className="cset__serp">
        <div className="cset__site">
          <img src="/brand/ky-flame-icon.png" alt="" width="512" height="512" loading="lazy" />
          <span>
            <b>KY Creatives</b>
            <em>https://kycreatives.com</em>
          </span>
        </div>
        <p className="cset__title">Design-led software, web and mobile apps | KY Creatives</p>
        <p className="cset__desc">
          A design-led studio building software, web apps and mobile apps for businesses worldwide, with a special focus on
          D2C brands.
        </p>
      </div>
    </div>
  );
}

/*
  KY Creatives' identity applied, as a studio would present it: the website
  on screen, the brand guidelines cover, the palette, and the flame mark as an
  app icon. Real assets and real details only.
*/
export function IdentitySet() {
  return (
    <div className="iset" aria-hidden="true">
      <div className="iset__web">
        <div className="iset__bar">
          <span className="iset__dots">
            <i />
            <i />
            <i />
          </span>
          <span className="iset__url">kycreatives.com</span>
        </div>
        <div className="iset__page">
          <div className="iset__nav">
            <img src="/brand/ky-creatives-logo.png" alt="" width="285" height="79" loading="lazy" />
            <span className="iset__links">
              <i />
              <i />
              <i />
            </span>
            <span className="iset__navbtn">Start a project</span>
          </div>
          <p className="iset__kicker">Design-led studio · Est. 2017</p>
          <p className="iset__h">
            What we create
            <br />
            is <em>business.</em>
          </p>
          <span className="iset__lines">
            <i />
            <i />
          </span>
          <span className="iset__ctas">
            <b>Start a project</b>
            <b className="is-ghost">See our work</b>
          </span>
          <span className="iset__tiles">
            <i />
            <i />
            <i />
          </span>
        </div>
      </div>

      <div className="iset__book">
        <img className="iset__book-mark" src="/brand/ky-flame-icon.png" alt="" width="512" height="512" loading="lazy" />
        <p className="iset__book-title">Brand guidelines</p>
        <p className="iset__book-sub">Logo, colour, type and voice</p>
        <span className="iset__book-band" />
      </div>

      <div className="iset__palette">
        <span className="iset__palette-label">Palette</span>
        <span className="iset__swatches">
          {["#E2418F", "#FF9533", "#7B4DD9", "#4C8DEB", "#6FE3F5", "#17121F"].map((c) => (
            <i key={c} style={{ background: c }} />
          ))}
        </span>
      </div>

      <div className="iset__icon">
        <img src="/brand/ky-flame-icon.png" alt="" width="512" height="512" loading="lazy" />
      </div>
    </div>
  );
}
