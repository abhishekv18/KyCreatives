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

/* A campaign plan across channels */
export function CampaignMock() {
  const lanes = [
    ["Search", [1, 4], "violet"],
    ["Social", [2, 6], "magenta"],
    ["Paid", [3, 5], "orange"],
    ["Email", [5, 7], "cobalt"],
  ];
  return (
    <div className="mock mock-plan" aria-hidden="true">
      <div className="mock-plan__head">
        <span>Launch campaign plan</span>
        <span className="t-meta">Weeks 1 to 8</span>
      </div>
      <div className="mock-plan__grid">
        <div className="mock-plan__weeks">
          <span />
          {Array.from({ length: 8 }, (_, i) => (
            <span key={i} className="t-meta">
              W{i + 1}
            </span>
          ))}
        </div>
        {lanes.map(([name, [from, to], tone]) => (
          <div className="mock-plan__lane" key={name}>
            <span>{name}</span>
            <i className={`mock-plan__bar bg-${tone}`} style={{ gridColumn: `${from + 1} / ${to + 2}` }} />
          </div>
        ))}
      </div>
      <div className="mock-plan__foot">
        <span>
          <Check {...ico} /> Tracking checked
        </span>
        <span>
          <Check {...ico} /> Landing page live
        </span>
        <span className="is-todo">Monthly report</span>
      </div>
    </div>
  );
}

/* KY Creatives' own identity system, presented as a design sheet (real work) */
export function BrandSheet() {
  const swatches = [
    ["Magenta", "#E2418F"],
    ["Orange", "#FF9533"],
    ["Violet", "#7B4DD9"],
    ["Cobalt", "#4C8DEB"],
    ["Cyan", "#6FE3F5"],
    ["Ink", "#17121F"],
  ];
  return (
    <div className="mock mock-brand" aria-hidden="true">
      <div className="mock-brand__type">
        <span className="mock-brand__aa">Aa</span>
        <span>
          <strong>Libre Baskerville</strong>
          <em>Display and headlines</em>
        </span>
      </div>
      <div className="mock-brand__swatches">
        {swatches.map(([n, hex]) => (
          <span key={n} style={{ "--c": hex }}>
            <i />
            <b>{n}</b>
            <em className="t-meta">{hex}</em>
          </span>
        ))}
      </div>
      <div className="mock-brand__grads">
        <i className="bg-flame" />
        <i className="bg-dusk" />
        <i className="bg-aqua" />
      </div>
      <div className="mock-brand__icon">
        <img src="/brand/ky-flame-icon.png" alt="" width="512" height="512" loading="lazy" />
        <span>
          <strong>Flame icon</strong>
          <em>Favicon, app icon, avatar</em>
        </span>
      </div>
    </div>
  );
}
