import { useEffect, useState } from "react";
import { prefersReducedMotion } from "../../lib/motion";

/*
  Designed screens for the laptop in the consultation section: four slides
  per theme, built from the brand palette (no client screenshots). They
  cycle on their own, pause on hover, and hold still with reduced motion.
  Every slide is decorative; the section's copy carries the meaning.
*/

const THEMES = {
  web: {
    url: "yourbrand.com",
    accent: "#7b4dd9",
    slides: [
      { type: "hero", brand: "northwind", kicker: "Consulting · Est. 2014", h: ["Advice that", "moves the needle."], art: "orb" },
      { type: "cards", title: "What we do", items: [["Strategy", "#7b4dd9"], ["Operations", "#4c8deb"], ["Growth", "#e2418f"]] },
      { type: "dash", title: "Enquiries this week", bars: [42, 64, 50, 78, 90, 58, 70] },
      { type: "split", title: "Book a call", lines: 3, cta: "Choose a time" },
    ],
  },
  d2c: {
    url: "yourstore.in",
    accent: "#e2418f",
    slides: [
      { type: "hero", brand: "maison", kicker: "New season · Free shipping", h: ["Made for slow", "Sunday mornings."], art: "vase" },
      { type: "shop", title: "Bestsellers", items: [["Table vase", "₹1,890", "#ff9533"], ["Linen throw", "₹2,450", "#e2418f"], ["Stone bowl", "₹990", "#7b4dd9"]] },
      { type: "product", name: "Ceramic table vase", price: "₹1,890" },
      { type: "dash", title: "Orders this week", bars: [30, 48, 44, 70, 62, 88, 96] },
    ],
  },
  mobile: {
    url: "app.yourbrand.com",
    accent: "#7b4dd9",
    slides: [
      { type: "hero", brand: "pulse", kicker: "Android · iOS", h: ["Your day,", "in one tap."], art: "phones" },
      { type: "cards", title: "Features", items: [["Bookings", "#7b4dd9"], ["Reminders", "#4c8deb"], ["Payments", "#6fe3f5"]] },
      { type: "dash", title: "Daily active users", bars: [40, 46, 52, 60, 66, 74, 82] },
      { type: "split", title: "Get the app", lines: 2, cta: "Download" },
    ],
  },
  portals: {
    url: "portal.yourbrand.com",
    accent: "#4c8deb",
    slides: [
      { type: "table", title: "Orders", rows: [["PO-1042", "Approved", "#16a06b"], ["PO-1043", "Waiting", "#ff9533"], ["PO-1044", "Paid", "#16a06b"], ["PO-1045", "Draft", "#5b5668"]] },
      { type: "dash", title: "Approvals this month", bars: [24, 38, 52, 46, 60, 72, 68] },
      { type: "cards", title: "Roles", items: [["Admin", "#4c8deb"], ["Supplier", "#7b4dd9"], ["Finance", "#6fe3f5"]] },
      { type: "split", title: "Sign in", lines: 2, cta: "Continue" },
    ],
  },
  marketing: {
    url: "ads.yourbrand.com",
    accent: "#ff9533",
    slides: [
      { type: "dash", title: "Campaign results", bars: [28, 40, 36, 58, 66, 80, 92] },
      { type: "posts", title: "This week's posts", items: ["#7b4dd9", "#e2418f", "#ff9533"] },
      { type: "hero", brand: "launch", kicker: "Search · Social · Email", h: ["Reach the people", "ready to buy."], art: "chart" },
      { type: "cards", title: "Channels", items: [["Search", "#4c8deb"], ["Social", "#e2418f"], ["Email", "#ff9533"]] },
    ],
  },
  design: {
    url: "brand.yourbrand.com",
    accent: "#26b5cc",
    slides: [
      { type: "brand" },
      { type: "posts", title: "Social templates", items: ["#7b4dd9", "#17121f", "#e2418f"] },
      { type: "hero", brand: "atelier", kicker: "Identity · Print · Digital", h: ["A brand that looks", "like itself."], art: "orb" },
      { type: "cards", title: "Deliverables", items: [["Logo", "#7b4dd9"], ["Guidelines", "#17121f"], ["Templates", "#26b5cc"]] },
    ],
  },
  portfolio: {
    url: "kycreatives.com/work",
    accent: "#7b4dd9",
    slides: [
      { type: "hero", brand: "your brand", kicker: "Designed and built by KY Creatives", h: ["Your website,", "next on this list."], art: "orb" },
      { type: "shop", title: "Online stores", items: [["Decor", "Store", "#ff9533"], ["Fashion", "Store", "#e2418f"], ["Wellness", "Store", "#7b4dd9"]] },
      { type: "dash", title: "Launch to growth", bars: [26, 34, 48, 56, 70, 82, 94] },
      { type: "brand" },
    ],
  },
};

// small illustrations inside the card images: products for shops, UI for services
const SHOP_OBJ = ["vase", "tee", "bottle"];
const CARD_OBJ = ["chart", "grid", "spark"];

function Nav({ brand, accent }) {
  return (
    <div className="ls-nav">
      <b style={{ color: accent }}>{brand}</b>
      <span className="ls-nav__links">
        <i />
        <i />
        <i />
      </span>
      <span className="ls-nav__btn" style={{ background: accent }} />
    </div>
  );
}

function Slide({ s, accent }) {
  switch (s.type) {
    case "hero":
      return (
        <div className="ls ls--hero">
          <Nav brand={s.brand} accent={accent} />
          <div className="ls-hero">
            <div>
              <span className="ls-kicker">{s.kicker}</span>
              <span className="ls-h">
                {s.h[0]}
                <br />
                <em style={{ color: accent }}>{s.h[1]}</em>
              </span>
              <span className="ls-lines">
                <i />
                <i />
              </span>
              <span className="ls-btns">
                <b style={{ background: accent }}>Get started</b>
                <b className="is-ghost">Learn more</b>
              </span>
            </div>
            <div className={`ls-art ls-art--${s.art}`} style={{ "--a": accent }}>
              <i />
              <i />
              <i />
            </div>
          </div>
        </div>
      );
    case "cards":
    case "shop":
      return (
        <div className="ls ls--cards">
          <Nav brand={s.brand || "yourbrand"} accent={accent} />
          <div className="ls-head">
            <span>
              <span className="ls-kicker">{s.type === "shop" ? "Shop the edit" : "Our services"}</span>
              <span className="ls-title">{s.title}</span>
            </span>
            <em style={{ color: accent }}>View all →</em>
          </div>
          <div className="ls-cards">
            {s.items.map(([name, sub, c], n) => (
              <span key={name} className="ls-card">
                <i style={{ "--c": c || sub }}>
                  <b className={`ls-obj ls-obj--${(s.type === "shop" ? SHOP_OBJ : CARD_OBJ)[n % 3]}`} />
                  {s.type === "shop" && <u>{n === 0 ? "Bestseller" : "New"}</u>}
                </i>
                <b>{name}</b>
                {s.type === "shop" ? (
                  <span className="ls-card__row">
                    <em>{sub}</em>
                    <small style={{ background: accent }}>+</small>
                  </span>
                ) : (
                  <>
                    <span className="ls-lines ls-lines--card">
                      <i />
                      <i />
                    </span>
                    <em style={{ color: accent }}>Learn more →</em>
                  </>
                )}
              </span>
            ))}
          </div>
          <div className="ls-logos">
            <span>{s.type === "shop" ? "Free shipping · Easy returns · Secure checkout" : "Trusted by growing teams"}</span>
            <i />
            <i />
            <i />
            <i />
          </div>
        </div>
      );
    case "dash":
      return (
        <div className="ls ls--dash">
          <span className="ls-side">
            <i style={{ background: accent }} />
            <i />
            <i />
            <i />
          </span>
          <div className="ls-dash">
            <span className="ls-title">{s.title}</span>
            <span className="ls-stats">
              {["+24%", "1,280", "4.8"].map((v) => (
                <b key={v}>
                  {v}
                  <i />
                </b>
              ))}
            </span>
            <span className="ls-chart">
              {s.bars.map((h, i) => (
                <i key={i} style={{ height: `${h}%`, background: i === s.bars.length - 1 ? accent : undefined }} />
              ))}
            </span>
          </div>
        </div>
      );
    case "split":
      return (
        <div className="ls ls--split">
          <div className="ls-split__art" style={{ background: `linear-gradient(150deg, ${accent}, #4c8deb)` }}>
            <i />
            <i />
            <span className="ls-cal">
              <b>
                November <em>2026</em>
              </b>
              <span className="ls-cal__days">
                {["M", "T", "W", "T", "F", "S", "S"].map((d, n) => (
                  <u key={n}>{d}</u>
                ))}
                {Array.from({ length: 28 }).map((_, n) => (
                  <i key={n} className={n === 17 ? "is-on" : n % 7 > 4 ? "is-off" : ""}>
                    {n + 1}
                  </i>
                ))}
              </span>
            </span>
            <span className="ls-chip">
              <i /> 30-min video call
            </span>
          </div>
          <div className="ls-split__form">
            <span className="ls-kicker">Free, no obligation</span>
            <span className="ls-title">{s.title}</span>
            {["Name", "Work email"].slice(0, Math.max(2, s.lines - 1)).map((l) => (
              <span key={l} className="ls-field">
                <em>{l}</em>
                <span className="ls-input" />
              </span>
            ))}
            <span className="ls-field">
              <em>Pick a time · Wed 18</em>
              <span className="ls-slots">
                {["10:00", "11:30", "15:30", "17:00"].map((t, n) => (
                  <i key={t} className={n === 2 ? "is-on" : ""} style={n === 2 ? { background: accent } : undefined}>
                    {t}
                  </i>
                ))}
              </span>
            </span>
            <b style={{ background: accent }}>{s.cta}</b>
          </div>
        </div>
      );
    case "product":
      return (
        <div className="ls ls--product">
          <div className="ls-product__img">
            <span className="ls-vase" />
          </div>
          <div className="ls-product__info">
            <span className="ls-kicker">Home / Vases</span>
            <span className="ls-h ls-h--sm">{s.name}</span>
            <span className="ls-price">{s.price}</span>
            <span className="ls-swatch">
              <i />
              <i />
              <i />
            </span>
            <b style={{ background: "#17121f" }}>Add to bag</b>
          </div>
        </div>
      );
    case "table":
      return (
        <div className="ls ls--dash">
          <span className="ls-side">
            <i style={{ background: accent }} />
            <i />
            <i />
          </span>
          <div className="ls-dash">
            <span className="ls-title">{s.title}</span>
            <span className="ls-table">
              {s.rows.map(([id, st, c]) => (
                <span key={id}>
                  <b>{id}</b>
                  <em>
                    <i style={{ background: c }} />
                    {st}
                  </em>
                  <i className="ls-avatar" />
                </span>
              ))}
            </span>
          </div>
        </div>
      );
    case "posts":
      return (
        <div className="ls ls--cards">
          <div className="ls-profile">
            <span className="ls-profile__pic" style={{ background: accent }} />
            <span>
              <b>yourbrand</b>
              <em>Instagram · scheduled</em>
            </span>
            <span className="ls-profile__stats">
              <b>
                248<em>posts</em>
              </b>
              <b>
                12.4k<em>followers</em>
              </b>
            </span>
          </div>
          <span className="ls-title">{s.title}</span>
          <div className="ls-posts">
            {s.items.map((c, n) => (
              <span key={n} className="ls-postwrap">
                <span className="ls-post" style={{ background: c }}>
                  <i />
                  <b>{["Software that sells.", "Launch week.", "Built to grow."][n]}</b>
                </span>
                <span className="ls-post__meta">
                  <em>{["Mon 10:00", "Wed 18:30", "Fri 12:00"][n]}</em>
                  <u>♥ {["1.2k", "860", "2.1k"][n]}</u>
                </span>
              </span>
            ))}
          </div>
        </div>
      );
    default:
      return (
        <div className="ls ls--brand">
          <span className="ls-brand__col">
            <span className="ls-kicker">Logo</span>
            <span className="ls-mark">
              <img src="/brand/ky-flame.png" alt="" width="245" height="358" loading="lazy" />
            </span>
          </span>
          <span className="ls-brand__col">
            <span className="ls-kicker">Type</span>
            <span className="ls-aa">Aa</span>
            <span className="ls-typeline">Libre Baskerville · Display</span>
            <span className="ls-typeline">DM Sans · Text</span>
            <span className="ls-kicker ls-kicker--gap">Colour</span>
            <span className="ls-sw">
              {["#e2418f", "#ff9533", "#7b4dd9", "#4c8deb", "#6fe3f5", "#17121f"].map((c) => (
                <i key={c} style={{ background: c }} />
              ))}
            </span>
          </span>
        </div>
      );
  }
}

export default function LaptopSlides({ theme = "web" }) {
  const t = THEMES[theme] || THEMES.web;
  const [i, setI] = useState(0);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion() || hover) return;
    const id = setInterval(() => setI((n) => (n + 1) % t.slides.length), 3400);
    return () => clearInterval(id);
  }, [hover, t.slides.length]);

  return (
    <div className="laptop" aria-hidden="true" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <div className="laptop__lid">
        <span className="laptop__cam" />
        <div className="laptop__screen">
          <div className="laptop__bar">
            <span className="laptop__dots">
              <i />
              <i />
              <i />
            </span>
            <span className="laptop__url">{t.url}</span>
          </div>
          <div className="laptop__slides">
            {t.slides.map((s, n) => (
              <div
                key={n}
                className="laptop__slide"
                data-state={n === i ? "on" : n === (i - 1 + t.slides.length) % t.slides.length ? "out" : "in"}
              >
                <Slide s={s} accent={t.accent} />
              </div>
            ))}
          </div>
          <span className="laptop__pips">
            {t.slides.map((_, n) => (
              <i key={n} className={n === i ? "is-on" : ""} />
            ))}
          </span>
        </div>
      </div>
      <div className="laptop__base">
        <span className="laptop__notch" />
      </div>
    </div>
  );
}
