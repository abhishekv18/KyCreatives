import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ChevronDown, X, ArrowRight, ArrowUpRight, Mail, Phone } from "lucide-react";
import Logo from "../ui/Logo";
import { Ribbons } from "../art/Art";
import { services } from "../../data/services";
import { company } from "../../data/site";
import { serviceIcons } from "../ui/serviceIcons";
import { lockScroll } from "../../lib/smooth";
import { whenReady } from "../../lib/motion";

/*
  Scroll state: hides while reading down, returns on scroll up, and reads the
  tone of the section under the header (sections declare data-tone="dark")
  so links keep their contrast over Ink, colour fields and Cloud alike.
*/
function useHeaderState(pathname) {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [tone, setTone] = useState("light");

  useEffect(() => {
    let last = window.scrollY;
    let ticking = false;
    const readTone = () => {
      const y = 38;
      const stack = document.elementsFromPoint(window.innerWidth / 2, y);
      const under = stack.find((el) => !el.closest(".site-header, .loader"));
      const zone = under?.closest("[data-tone]");
      setTone(zone?.dataset.tone === "dark" ? "dark" : "light");
    };
    const update = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      if (y > 480 && y > last + 4) setHidden(true);
      else if (y < last - 4 || y <= 480) setHidden(false);
      last = y;
      readTone();
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    // Re-read after the new route has painted, and once the intro loader has gone.
    const t = setTimeout(update, 60);
    let live = true;
    whenReady().then(() => setTimeout(() => live && update(), 50));
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      live = false;
      clearTimeout(t);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  return { scrolled, hidden, tone };
}

// One brand colour per service, used as a soft tint behind its icon.
const MENU_TONE = {
  d2c: "flame",
  "web-apps-websites": "violet",
  "mobile-apps": "cyan",
  portals: "cobalt",
  marketing: "orange",
  "design-graphics": "magenta",
};

function ServicesMenu() {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);
  const btnRef = useRef(null);
  const closeTimer = useRef();
  const location = useLocation();
  const active = location.pathname.startsWith("/services");

  const items = () => Array.from(wrapRef.current?.querySelectorAll(".svc-menu__link") || []);
  const focusItem = (i) => {
    const list = items();
    if (!list.length) return;
    list[(i + list.length) % list.length].focus();
  };

  // Close when the route changes (adjusting state during render, no effect needed).
  const [path, setPath] = useState(location.pathname);
  if (path !== location.pathname) {
    setPath(location.pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const onDoc = (e) => {
      if (!wrapRef.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener("pointerdown", onDoc);
    return () => document.removeEventListener("pointerdown", onDoc);
  }, [open]);

  const onButtonKey = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(true);
      requestAnimationFrame(() => focusItem(0));
    }
  };

  const onPanelKey = (e) => {
    const list = items();
    const i = list.indexOf(document.activeElement);
    if (i === -1) return;
    const map = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };
    if (e.key in map) {
      e.preventDefault();
      focusItem(i + map[e.key]);
    } else if (e.key === "Home") {
      e.preventDefault();
      focusItem(0);
    } else if (e.key === "End") {
      e.preventDefault();
      focusItem(list.length - 1);
    }
  };

  const onWrapKey = (e) => {
    if (e.key === "Escape" && open) {
      setOpen(false);
      btnRef.current?.focus();
    }
  };

  const hoverCapable = () => window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  return (
    <div
      className={`svc ${open ? "is-open" : ""}`}
      ref={wrapRef}
      onKeyDown={onWrapKey}
      onMouseEnter={() => {
        if (!hoverCapable()) return;
        clearTimeout(closeTimer.current);
        setOpen(true);
      }}
      onMouseLeave={() => {
        if (!hoverCapable()) return;
        closeTimer.current = setTimeout(() => setOpen(false), 180);
      }}
      onBlur={(e) => {
        if (!wrapRef.current.contains(e.relatedTarget)) setOpen(false);
      }}
    >
      <button
        ref={btnRef}
        className={`nav__link svc__btn ${active ? "is-active" : ""}`}
        aria-expanded={open}
        aria-controls="services-menu"
        onClick={() => setOpen((o) => !o)}
        onKeyDown={onButtonKey}
      >
        Services
        <ChevronDown size={16} strokeWidth={1.75} aria-hidden="true" className="svc__chev" />
      </button>
      <div id="services-menu" className="svc-menu" hidden={!open} onKeyDown={onPanelKey}>
        <div className="svc-menu__inner">
          <div className="svc-menu__head">
            <p className="svc-menu__kicker t-meta">Services</p>
            <p className="svc-menu__lede">Design, engineering and growth, from one team.</p>
          </div>
          <ul role="list" className="svc-menu__grid">
            {services.map((s, i) => {
              const Icon = serviceIcons[s.slug];
              return (
                <li key={s.slug}>
                  <Link
                    className={`svc-menu__link ${location.pathname === s.path ? "is-current" : ""}`}
                    data-hue={MENU_TONE[s.slug]}
                    to={s.path}
                    onClick={() => setOpen(false)}
                  >
                    <span className="svc-menu__icon" aria-hidden="true">
                      <Icon size={20} strokeWidth={1.5} />
                    </span>
                    <span className="svc-menu__text">
                      <span className="svc-menu__name">
                        {s.name}
                        {s.slug === "d2c" && <span className="svc-menu__focus t-meta">Focus area</span>}
                      </span>
                      <span className="svc-menu__desc">{s.short}</span>
                    </span>
                    <span className="svc-menu__num t-meta" aria-hidden="true">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="svc-menu__foot">
            <span>Not sure which one fits? We will help you choose.</span>
            <Link to="/contact" className="svc-menu__cta" onClick={() => setOpen(false)}>
              Tell us about the project
              <ArrowRight size={16} strokeWidth={1.75} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function MobileMenu({ open, onClose }) {
  const panelRef = useRef(null);
  const [svcOpen, setSvcOpen] = useState(false);
  const svcId = useId();

  useEffect(() => {
    if (!open) return;
    lockScroll(true);
    const panel = panelRef.current;
    const focusables = () =>
      Array.from(panel.querySelectorAll("a[href], button:not([disabled])")).filter((el) => el.offsetParent !== null);
    requestAnimationFrame(() => focusables()[0]?.focus());
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab") {
        const list = focusables();
        const first = list[0];
        const last = list[list.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      lockScroll(false);
    };
  }, [open, onClose]);

  return (
    <div
      ref={panelRef}
      id="mobile-menu"
      className={`mnav on-dark ${open ? "is-open" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      hidden={!open}
    >
      <Ribbons set="single" className="mnav__art" draw={false} />
      <div className="mnav__top container">
        <Logo width={124} card onClick={onClose} />
        <button className="icon-btn mnav__close" onClick={onClose} aria-label="Close menu">
          <X size={24} strokeWidth={1.5} aria-hidden="true" />
        </button>
      </div>
      <nav className="mnav__body container" aria-label="Mobile">
        <ul role="list" className="mnav__main">
          <li style={{ "--i": 0 }}>
            <NavLink to="/" end onClick={onClose}>
              Home
            </NavLink>
          </li>
          <li style={{ "--i": 1 }}>
            <NavLink to="/about" onClick={onClose}>
              About
            </NavLink>
          </li>
          <li style={{ "--i": 2 }}>
            <button
              className="mnav__toggle"
              aria-expanded={svcOpen}
              aria-controls={svcId}
              onClick={() => setSvcOpen((o) => !o)}
            >
              Services
              <ChevronDown size={26} strokeWidth={1.5} aria-hidden="true" />
            </button>
            <ul role="list" id={svcId} className="mnav__svc" hidden={!svcOpen}>
              {services.map((s) => {
                const Icon = serviceIcons[s.slug];
                return (
                  <li key={s.slug}>
                    <NavLink to={s.path} onClick={onClose}>
                      <Icon size={20} strokeWidth={1.5} aria-hidden="true" />
                      <span>{s.name}</span>
                      <ArrowRight size={18} strokeWidth={1.5} aria-hidden="true" />
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </li>
          <li style={{ "--i": 3 }}>
            <NavLink to="/contact" onClick={onClose}>
              Contact
            </NavLink>
          </li>
        </ul>
        <div className="mnav__foot">
          <Link to="/contact" className="btn btn--flame mnav__cta" onClick={onClose}>
            <span>Start a project</span>
            <ArrowUpRight className="btn__icon" size={18} strokeWidth={1.75} aria-hidden="true" />
          </Link>
          <a href={`mailto:${company.email}`}>
            <Mail size={18} strokeWidth={1.5} aria-hidden="true" /> {company.email}
          </a>
          <a href={company.phoneHref}>
            <Phone size={18} strokeWidth={1.5} aria-hidden="true" /> {company.phoneDisplay}
          </a>
        </div>
      </nav>
    </div>
  );
}

export default function Header() {
  const location = useLocation();
  const { scrolled, hidden, tone } = useHeaderState(location.pathname);
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleRef = useRef(null);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    requestAnimationFrame(() => toggleRef.current?.focus());
  }, []);

  const [path, setPath] = useState(location.pathname);
  if (path !== location.pathname) {
    setPath(location.pathname);
    setMenuOpen(false);
  }

  return (
    <>
      <header
        className={`site-header tone-${tone} ${scrolled ? "is-scrolled" : ""} ${hidden && !menuOpen ? "is-hidden" : ""}`}
      >
        <div className="container site-header__inner">
          <Logo width={136} card className="site-header__logo" />
          <nav className="nav" aria-label="Main">
            <ul role="list" className="nav__list">
              <li>
                <NavLink to="/" end className="nav__link">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/about" className="nav__link">
                  About
                </NavLink>
              </li>
              <li>
                <ServicesMenu />
              </li>
              <li>
                <NavLink to="/contact" className="nav__link">
                  Contact
                </NavLink>
              </li>
            </ul>
          </nav>
          <div className="site-header__actions">
            <Link to="/contact" className="site-header__cta">
              <span className="site-header__cta-label">Start a project</span>
              <span className="site-header__cta-icon" aria-hidden="true">
                <ArrowUpRight size={18} strokeWidth={1.75} />
              </span>
            </Link>
            <button
              ref={toggleRef}
              className="site-header__toggle"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label="Open menu"
              onClick={() => setMenuOpen(true)}
            >
              <span className="site-header__bars" aria-hidden="true">
                <i />
                <i />
              </span>
              <span className="site-header__menu-label">Menu</span>
            </button>
          </div>
        </div>
      </header>
      <MobileMenu open={menuOpen} onClose={closeMenu} />
    </>
  );
}
