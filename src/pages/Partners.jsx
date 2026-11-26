import { useEffect, useId, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion } from "../lib/motion";
import { Link } from "react-router-dom";
import { ArrowRight, Check, Minus, Plus, AlertCircle, CheckCircle2, X, Send } from "lucide-react";
import { lockScroll } from "../lib/smooth";
import { usePageMeta } from "../hooks/usePageMeta";
import PageHero from "../components/ui/PageHero";
import SplitHeading from "../components/ui/SplitHeading";
import Button from "../components/ui/Button";
import Faq from "../components/ui/Faq";
import Toast from "../components/ui/Toast";
import PartnersStrip from "../components/ui/PartnersStrip";
import ContactCTA from "../components/ui/ContactCTA";
import { Glow } from "../components/art/Art";
import { company } from "../data/site";
import { TIERS, tierFor, RECURRING, REPRESENT, STEPS, ROLES, REWARDS, FIT, FAQS, MARKETS, BACKGROUNDS, TERMS, NEXT, COHORT } from "../data/partners-program";

import { ENQUIRY_EMAIL, sendEnquiry } from "../lib/enquiry";

const usd = (n) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(Math.round(n));
const pct = (r) => `${Math.round(r * 100)}%`;

/* Hero art: a wireframe globe, meridians and parallels, for an international program */
function Globe() {
  const meridians = [0.18, 0.42, 0.66, 0.88];
  const parallels = [-0.66, -0.36, 0, 0.36, 0.66];
  return (
    <svg className="pp-globe" viewBox="0 0 800 800" aria-hidden="true" focusable="false">
      <g fill="none" stroke="currentColor" strokeWidth="1.1">
        <circle cx="400" cy="400" r="360" />
        {meridians.map((m) => (
          <ellipse key={m} cx="400" cy="400" rx={360 * m} ry="360" />
        ))}
        {parallels.map((p) => {
          const y = 400 + p * 360;
          const rx = 360 * Math.sqrt(1 - p * p);
          return <ellipse key={p} cx="400" cy={y} rx={rx} ry={rx * 0.16} />;
        })}
      </g>
      <g className="pp-globe__pts">
        {[[268, 300], [520, 250], [610, 430], [330, 520], [470, 590]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="4" style={{ "--d": `${i * 0.7}s` }} />
        ))}
      </g>
    </svg>
  );
}

/*
  Founding cohort: the details open in the hero as a card. As the page
  scrolls, the card shrinks and travels to the bottom-left corner, where it
  becomes a small pill that stays with the visitor down the page. Hovering
  (or tapping) the pill opens the details again.
*/
const COHORT_POINTS = [
  ["Only 8 founding partners", "The cohort is capped at 8 and closes when it is full."],
  ["Selected on profile strength", "Each seat is offered on the strength of the applicant’s profile."],
  ["A flat 15% for 12 months", "The top rate on every project, regardless of how many you bring."],
  ["Founding partner benefits", "Recognition and rewards, early access to new partnership models and tiers, and a dedicated support team for your leads."],
];

function CohortPoints() {
  return (
    <ol role="list" className="pfc__points">
      {COHORT_POINTS.map(([t, d], i) => (
        <li key={t}>
          <span className="pfc__n">{String(i + 1).padStart(2, "0")}</span>
          <span className="pfc__t">
            <b>{t}</b>
            {d}
          </span>
        </li>
      ))}
    </ol>
  );
}

function CohortSeats() {
  return (
    <span className="pfc__seats" aria-hidden="true">
      {Array.from({ length: COHORT.seats }, (_, i) => (
        <i key={i} />
      ))}
    </span>
  );
}

const canHover = () => window.matchMedia("(hover: hover) and (pointer: fine)").matches;

function Cohort() {
  const cardRef = useRef(null);
  const pillRef = useRef(null);
  const [docked, setDocked] = useState(false);
  const [open, setOpen] = useState(false);

  // reduced motion: the pill simply appears once the hero has scrolled away
  // (otherwise it docks from the card's own journey, below)
  useEffect(() => {
    const hero = cardRef.current?.closest(".phero");
    if (!hero || !prefersReducedMotion()) return;
    const io = new IntersectionObserver(([e]) => setDocked(e.intersectionRatio < 0.12), { threshold: [0, 0.12, 0.3] });
    io.observe(hero);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!docked) setOpen(false);
  }, [docked]);

  // the card shrinks and travels to where the pill sits. Wide screens start
  // as the hero begins to scroll; phones start once the card reaches the top,
  // so it can be read first.
  useGSAP(() => {
    if (prefersReducedMotion()) return;
    const card = cardRef.current;
    const hero = card.closest(".phero");
    const absTop = () => card.getBoundingClientRect().top - (gsap.getProperty(card, "y") || 0) + window.scrollY;
    const build = (startAt, length, startStr) => {
      const target = () => {
        const pill = pillRef.current.getBoundingClientRect();
        const x0 = gsap.getProperty(card, "x") || 0;
        const r = card.getBoundingClientRect();
        const cx = r.left - x0 + r.width / 2;
        const cyAbs = absTop() + r.height / 2;
        const end = startAt() + length();
        return { x: pill.left + pill.width / 2 - cx, y: pill.top + pill.height / 2 - (cyAbs - end) };
      };
      gsap
        .timeline({
          scrollTrigger: {
            trigger: startStr.trigger,
            start: startStr.start,
            end: () => "+=" + length(),
            scrub: 0.9,
            invalidateOnRefresh: true,
            // the pill takes over just as the card arrives in the corner
            onUpdate: (self) => setDocked(self.progress > 0.8),
            onLeave: () => setDocked(true),
            onLeaveBack: () => setDocked(false),
          },
        })
        .to(card, { x: () => target().x, y: () => target().y, ease: "none", duration: 1, force3D: true }, 0)
        .to(card, { scale: 0.18, ease: "power2.inOut", duration: 1 }, 0)
        .to(card, { opacity: 0, ease: "power1.inOut", duration: 0.45 }, 0.4);
    };
    const mm = gsap.matchMedia();
    mm.add("(min-width: 960px)", () =>
      build(
        () => hero.offsetTop,
        () => hero.offsetHeight * 0.85,
        { trigger: hero, start: "top top" }
      )
    );
    mm.add("(max-width: 959px)", () =>
      build(
        () => absTop() - 72,
        () => card.offsetHeight * 0.75,
        { trigger: card, start: "top 72px" }
      )
    );
    return () => mm.revert();
  });

  const pill = (
    <div
      ref={pillRef}
      className={`pfc-pill ${docked ? "is-docked" : ""} ${open ? "is-open" : ""}`}
      onMouseEnter={() => canHover() && setOpen(true)}
      onMouseLeave={() => canHover() && setOpen(false)}
    >
      <div className="pfc-pill__panel" id="pfc-panel" role="region" aria-label="Founding cohort details" hidden={!open}>
        <p className="pfc__kicker">Founding cohort</p>
        <p className="pfc__title">
          {COHORT.seats} seats. A flat {Math.round(COHORT.rate * 100)}%.
        </p>
        <CohortPoints />
        <a className="pfc-pill__apply" href="#apply" onClick={() => setOpen(false)}>
          Apply for a seat <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
        </a>
      </div>
      <button
        type="button"
        className="pfc-pill__btn"
        aria-expanded={open}
        aria-controls="pfc-panel"
        tabIndex={docked ? 0 : -1}
        onClick={() => setOpen((o) => !o)}
      >
        <span className="pfc-pill__dot" aria-hidden="true" />
        <span className="pfc-pill__text">
          <b>Founding cohort</b>
          <small>
            {COHORT.seats} seats &middot; flat {Math.round(COHORT.rate * 100)}%
          </small>
        </span>
        <Plus className="pfc-pill__icon" size={16} strokeWidth={2} aria-hidden="true" />
      </button>
    </div>
  );

  return (
    <>
      <figure className="pfc" ref={cardRef}>
        <div className="pfc__card">
          <div className="pfc__head">
            <div>
              <p className="pfc__kicker">Founding cohort</p>
              <p className="pfc__title">
                {COHORT.seats} seats. A flat {Math.round(COHORT.rate * 100)}%.
              </p>
            </div>
            <img src="/brand/ky-flame-icon.png" alt="" width="34" height="34" />
          </div>
          <CohortPoints />
          <div className="pfc__foot">
            <CohortSeats />
            <span>Applications open</span>
          </div>
        </div>
      </figure>
      {typeof document !== "undefined" && createPortal(pill, document.body)}
    </>
  );
}

/* A small pill that drifts gently to and fro, pointing the way to a section */
function MovingTag({ href, tone = "light", children }) {
  const inner = (
    <>
      <span>{children}</span>
      {href && <ArrowRight size={14} strokeWidth={2} aria-hidden="true" />}
    </>
  );
  return href ? (
    <a href={href} className={`ptag ptag--${tone}`}>
      {inner}
    </a>
  ) : (
    <p className={`ptag ptag--${tone}`}>{inner}</p>
  );
}

/* A number stepper with large touch targets */
function Stepper({ id, value, min, max, onChange }) {
  return (
    <div className="calc__stepper">
      <button type="button" onClick={() => onChange(Math.max(min, value - 1))} disabled={value <= min} aria-label="One fewer project">
        <Minus size={18} strokeWidth={1.75} aria-hidden="true" />
      </button>
      <output id={id} aria-live="polite">
        {value}
      </output>
      <button type="button" onClick={() => onChange(Math.min(max, value + 1))} disabled={value >= max} aria-label="One more project">
        <Plus size={18} strokeWidth={1.75} aria-hidden="true" />
      </button>
    </div>
  );
}

// The maintenance-plan option is hidden until the recurring commission is
// approved; set to true to show it again.
const SHOW_MAINTENANCE = false;

function Calculator() {
  const base = useId();
  const [count, setCount] = useState(2);
  const [value, setValue] = useState(5000);
  const [care, setCare] = useState(false);
  const [fee, setFee] = useState(400);

  const r = useMemo(() => {
    const t = tierFor(count);
    const collected = count * value;
    const month = collected * t.rate;
    const perProject = value * t.rate;
    const recurring = care ? count * fee * RECURRING.rate * RECURRING.months : 0;
    return { t, collected, month, perProject, recurring };
  }, [count, value, care, fee]);

  const fill = (v, min, max) => ({ "--fill": `${((v - min) / (max - min)) * 100}%` });

  return (
    <section id="calculator" className="calc section" data-tone="dark" aria-labelledby="calc-title">
      <div className="container">
        <div className="calc__head offer__head">
          <MovingTag tone="dark">Earnings calculator</MovingTag>
          <div id="calc-title">
            <SplitHeading as="h2" className="calc__title" lines={["See what a month", "could look like."]} />
          </div>
          <div className="phead-side" data-reveal="up">
            <p className="calc__lead">
              Move the numbers to match a month you have in mind. The tier is set by how many eligible projects close in the calendar month, and applies to each of them.
            </p>
            <p className="phead-note phead-note--dark">
              <span className="phead-note__k">Founding partners</span>A flat {Math.round(COHORT.rate * 100)}% on every project for their first {COHORT.months} months.
            </p>
          </div>
        </div>

        <div className="calc__grid" data-reveal="up">
          <div className="calc__inputs">
            <div className="calc__field">
              <label htmlFor={`${base}-count`} className="calc__label">
                Projects closed this month
              </label>
              <Stepper id={`${base}-count`} value={count} min={1} max={8} onChange={setCount} />
              <ul role="list" className="calc__tiers" aria-label="Choose a commission tier">
                {TIERS.map((t) => (
                  <li key={t.label}>
                    <button
                      type="button"
                      className={t === r.t ? "is-on" : ""}
                      aria-pressed={t === r.t}
                      onClick={() => setCount(t === r.t ? count : t.min)}
                    >
                      <b>{pct(t.rate)}</b>
                      <span>{t.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="calc__field">
              <div className="calc__row">
                <label htmlFor={`${base}-value`} className="calc__label">
                  Average eligible value per project
                </label>
                <span className="calc__val">{usd(value)}</span>
              </div>
              <input
                id={`${base}-value`}
                className="calc__range"
                type="range"
                min={1000}
                max={25000}
                step={500}
                value={value}
                style={fill(value, 1000, 25000)}
                onChange={(e) => setValue(+e.target.value)}
                aria-valuetext={usd(value)}
              />
              <div className="calc__scale t-meta" aria-hidden="true">
                <span>$1,000</span>
                <span>$25,000</span>
              </div>
            </div>

            {SHOW_MAINTENANCE && (
            <div className="calc__field">
              <label className="calc__switch">
                <input type="checkbox" checked={care} onChange={(e) => setCare(e.target.checked)} />
                <span className="calc__knob" aria-hidden="true" />
                <span>
                  <b>Add a maintenance plan</b>
                  <small>Proposed: {pct(RECURRING.rate)} of each client's monthly fee, for up to {RECURRING.months} months</small>
                </span>
              </label>
              {care && (
                <div className="calc__sub">
                  <div className="calc__row">
                    <label htmlFor={`${base}-fee`} className="calc__label">
                      Monthly maintenance fee per client
                    </label>
                    <span className="calc__val">{usd(fee)}</span>
                  </div>
                  <input
                    id={`${base}-fee`}
                    className="calc__range"
                    type="range"
                    min={100}
                    max={3000}
                    step={50}
                    value={fee}
                    style={fill(fee, 100, 3000)}
                    onChange={(e) => setFee(+e.target.value)}
                    aria-valuetext={`${usd(fee)} a month`}
                  />
                </div>
              )}
            </div>
            )}
          </div>

          <div className="calc__out" aria-live="polite">
            <p className="calc__out-label">Earnings this month</p>
            <p className="calc__big">{usd(r.month)}</p>
            <dl className="calc__lines">
              <div>
                <dt>Tier</dt>
                <dd>
                  {pct(r.t.rate)} on {count} {count === 1 ? "project" : "projects"}
                </dd>
              </div>
              <div>
                <dt>Collected from clients</dt>
                <dd>{usd(r.collected)}</dd>
              </div>
              <div>
                <dt>Per project</dt>
                <dd>{usd(r.perProject)}</dd>
              </div>
              {care && (
                <div className="calc__lines-rec">
                  <dt>Maintenance, over {RECURRING.months} months</dt>
                  <dd>+ {usd(r.recurring)}</dd>
                </div>
              )}
            </dl>
            <p className="calc__note">
              Illustrative only, not a forecast or a guarantee. <strong className="calc__hl">Earnings</strong> are calculated on eligible net project revenue.
            </p>
            <Button href="#apply" variant="light">
              Apply to become a partner
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

/*
  "Ask us directly": a small form in a dialog, so a question can be sent
  without leaving the page. Native <dialog>: focus stays inside, Esc closes.
*/
const ASK_EMPTY = { name: "", email: "", question: "" };

function AskDialog({ open, onClose }) {
  const ref = useRef(null);
  const base = useId();
  const id = (k) => `${base}-${k}`;
  const [v, setV] = useState(ASK_EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | sent | drafted | failed
  const botRef = useRef(null);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) {
      d.showModal();
      lockScroll(true);
    } else if (!open && d.open) {
      d.close();
    }
  }, [open]);

  const close = () => {
    lockScroll(false);
    onClose();
    setTimeout(() => {
      setStatus("idle");
      setErrors({});
    }, 300);
  };

  const check = (x) => {
    const e = {};
    if (!x.name.trim()) e.name = "Enter your name.";
    if (!x.email.trim()) e.email = "Enter your email so we can reply.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(x.email.trim())) e.email = "Check the email address.";
    if (!x.question.trim()) e.question = "Write your question.";
    return e;
  };

  const set = (k) => (e) => {
    const next = { ...v, [k]: e.target.value };
    setV(next);
    if (Object.keys(errors).length) setErrors(check(next));
  };

  const submit = async (e) => {
    e.preventDefault();
    const errs = check(v);
    setErrors(errs);
    if (Object.keys(errs).length) {
      requestAnimationFrame(() => ref.current?.querySelector('[aria-invalid="true"]')?.focus());
      return;
    }
    const subject = `Partner program question from ${v.name.trim()}`;
    setStatus("sending");
    try {
      await sendEnquiry({
        kind: "question",
        subject,
        botcheck: botRef.current?.checked || false,
        name: v.name.trim(),
        email: v.email.trim(),
        message: v.question.trim(),
      });
      setStatus("sent");
      setV(ASK_EMPTY);
    } catch {
      setStatus("failed");
    }
  };

  const err = (k) =>
    errors[k] && (
      <p id={`${id(k)}-error`} className="field__error">
        <AlertCircle size={16} strokeWidth={1.75} aria-hidden="true" />
        {errors[k]}
      </p>
    );

  return (
    <dialog
      ref={ref}
      className="pask"
      aria-labelledby={id("title")}
      onCancel={(e) => {
        e.preventDefault();
        close();
      }}
      onClick={(e) => {
        if (e.target === ref.current) close();
      }}
    >
      <div className="pask__card">
        <div className="pask__head">
          <div>
            <p className="pask__kicker">Partner program</p>
            <h2 id={id("title")} className="pask__title">
              Ask us directly
            </h2>
          </div>
          <button type="button" className="pask__close" onClick={close} aria-label="Close">
            <X size={20} strokeWidth={1.75} aria-hidden="true" />
          </button>
        </div>

        {status === "sent" || status === "drafted" ? (
          <div className="pask__done" role="status">
            <CheckCircle2 size={30} strokeWidth={1.5} aria-hidden="true" />
            <p className="pask__done-title">{status === "sent" ? "Question sent" : "Your email draft is ready"}</p>
            <p>
              {status === "sent"
                ? "Thank you. We have emailed you a confirmation and will reply within 24 hours."
                : `Your email app should have opened with the question filled in. Press send to reach us at ${ENQUIRY_EMAIL}.`}
            </p>
            <button type="button" className="btn btn--primary" onClick={close}>
              <span>Done</span>
            </button>
          </div>
        ) : (
          <form className="pask__form" onSubmit={submit} noValidate>
            <p className="pask__lead">A question about the program, the terms or the cohort? We reply within 24 hours.</p>
            <input ref={botRef} type="checkbox" name="botcheck" className="form__trap" tabIndex={-1} autoComplete="off" aria-hidden="true" />
            <div className="pask__row">
              <div className={`field ${errors.name ? "has-error" : ""}`}>
                <label htmlFor={id("name")} className="field__label">
                  Name
                </label>
                <input
                  id={id("name")}
                  autoComplete="name"
                  value={v.name}
                  onChange={set("name")}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? `${id("name")}-error` : undefined}
                />
                {err("name")}
              </div>
              <div className={`field ${errors.email ? "has-error" : ""}`}>
                <label htmlFor={id("email")} className="field__label">
                  Email
                </label>
                <input
                  id={id("email")}
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  value={v.email}
                  onChange={set("email")}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? `${id("email")}-error` : undefined}
                />
                {err("email")}
              </div>
            </div>
            <div className={`field ${errors.question ? "has-error" : ""}`}>
              <label htmlFor={id("question")} className="field__label">
                Your question
              </label>
              <textarea
                id={id("question")}
                rows={3}
                value={v.question}
                onChange={set("question")}
                aria-invalid={!!errors.question}
                aria-describedby={errors.question ? `${id("question")}-error` : undefined}
              />
              {err("question")}
            </div>
            {status === "failed" && (
              <p className="field__error" role="alert">
                <AlertCircle size={16} strokeWidth={1.75} aria-hidden="true" />
                Not sent. Try again, or email {ENQUIRY_EMAIL}.
              </p>
            )}
            <button className="btn btn--primary pask__send" type="submit" disabled={status === "sending"}>
              <span>{status === "sending" ? "Sending" : "Send question"}</span>
              <Send className="btn__icon" size={17} strokeWidth={1.75} aria-hidden="true" />
            </button>
          </form>
        )}
      </div>
    </dialog>
  );
}

/* ---------- Application form ---------- */
const EMPTY = { name: "", email: "", country: "", phone: "", linkedin: "", experience: "", about: "" };
const EXPERIENCE = ["Under 2 years", "2 to 5 years", "5 to 10 years", "Over 10 years"];

function validate(v) {
  const e = {};
  if (!v.name.trim()) e.name = "Enter your name.";
  if (!v.email.trim()) e.email = "Enter your email address so we can reply.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) e.email = "Check the email address. It should look like name@company.com.";
  if (!v.country.trim()) e.country = "Enter the country you work from.";
  const digits = v.phone.replace(/\D/g, "").length;
  if (!v.phone.trim()) e.phone = "Enter a phone or WhatsApp number, with the country code.";
  else if (!/^[+\d\s().-]+$/.test(v.phone.trim()) || digits < 7 || digits > 15)
    e.phone = "Check the number. Include the country code, for example +1 202 555 0143.";
  if (!v.linkedin.trim()) e.linkedin = "Enter your LinkedIn profile link.";
  else if (!/linkedin\.com\/.+/i.test(v.linkedin.trim()))
    e.linkedin = "Check the link. It should look like linkedin.com/in/yourname.";
  if (!v.experience) e.experience = "Choose your years of experience.";
  if (!v.about.trim()) e.about = "Tell us a little about the businesses you can reach.";
  return e;
}

function Apply() {
  const base = useId();
  const id = (k) => `${base}-${k}`;
  const [v, setV] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [tried, setTried] = useState(false);
  const [status, setStatus] = useState("idle"); // idle | sending | done | drafted
  const [toast, setToast] = useState(null);
  const summaryRef = useRef(null);
  const botRef = useRef(null);

  const set = (k) => (e) => {
    const next = { ...v, [k]: e.target.value };
    setV(next);
    if (tried) setErrors(validate(next));
  };

  const draft = () => {
    const subject = `Founding Partner application: ${v.name.trim()} (${v.country.trim()})`;
    const body = [
      "Hello KY Creatives,",
      "",
      v.about.trim(),
      "",
      "---",
      `Name: ${v.name.trim()}`,
      `Email: ${v.email.trim()}`,
      `Country: ${v.country.trim()}`,
      `Phone or WhatsApp: ${v.phone.trim()}`,
      `LinkedIn: ${v.linkedin.trim()}`,
      `Experience: ${v.experience}`,
    ]
      .filter((l) => l !== null)
      .join("\n");
    return { subject, body, href: `mailto:${ENQUIRY_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}` };
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setTried(true);
    const errs = validate(v);
    setErrors(errs);
    if (Object.keys(errs).length) {
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }
    const d = draft();
    setStatus("sending");
    try {
      await sendEnquiry({
        kind: "partner",
        subject: d.subject,
        botcheck: botRef.current?.checked || false,
        name: v.name.trim(),
        email: v.email.trim(),
        phone: v.phone.trim(),
        message: v.about.trim(),
        country: v.country.trim(),
        linkedin: v.linkedin.trim(),
        experience: v.experience,
      });
      setStatus("done");
    } catch {
      setStatus("idle");
      setToast({
        id: Date.now(),
        tone: "error",
        title: "Your application was not sent",
        text: "Something went wrong on the way. Your answers are still in the form, so you can try again.",
        action: { label: `Or email ${ENQUIRY_EMAIL}`, href: d.href },
      });
    }
  };

  const field = (k, label, props = {}, opt = false) => (
    <div className={`field ${errors[k] ? "has-error" : ""}`}>
      <label htmlFor={id(k)} className="field__label">
        {label}
        {opt && <span className="field__opt"> (optional)</span>}
      </label>
      <input
        id={id(k)}
        name={k}
        value={v[k]}
        onChange={set(k)}
        aria-invalid={!!errors[k]}
        aria-describedby={errors[k] ? `${id(k)}-error` : undefined}
        {...props}
      />
      {errors[k] && (
        <p id={`${id(k)}-error`} className="field__error">
          <AlertCircle size={16} strokeWidth={1.75} aria-hidden="true" />
          {errors[k]}
        </p>
      )}
    </div>
  );

  const errorList = Object.entries(errors);

  return (
    <section id="apply" className="papply section" data-tone="light" aria-labelledby="apply-title">
      <div className="container papply__grid">
        <div className="papply__intro">
          <p className="kicker pbadge t-meta">Apply</p>
          <SplitHeading as="h2" className="papply__title" lines={["Apply to become", "a founding partner."]} />
          <p className="t-muted" data-reveal="up">
            Tell us about your sales experience, the markets you know and the opportunities you can create. We read every application ourselves.
          </p>
          <ol role="list" className="pnext" data-reveal="up">
            {NEXT.map(([t, d], i) => (
              <li key={t}>
                <span className="pnext__n">{String(i + 1).padStart(2, "0")}</span>
                <span className="pnext__t">
                  <b>{t}</b>
                  {d}
                </span>
              </li>
            ))}
          </ol>
          <p className="pnext__mail t-meta" data-reveal="up">
            Questions first? <a href={`mailto:${company.email}`}>{company.email}</a>
          </p>
        </div>

        <div className="papply__card" data-reveal="up">
          {status === "done" || status === "drafted" ? (
            <div className="form-result" role="status">
              <CheckCircle2 size={28} strokeWidth={1.5} aria-hidden="true" className="form-result__icon" />
              <h3 className="t-h3">{status === "done" ? "Application received" : "Your email draft is ready"}</h3>
              <p>
                {status === "done"
                  ? `Thank you, ${v.name.trim().split(/\s+/)[0]}. We have emailed a confirmation to ${v.email.trim()} and will reply within 24 hours.`
                  : `Your email app should have opened with the application filled in. Press send to reach us at ${ENQUIRY_EMAIL}.`}
              </p>
              {status === "drafted" && (
                <div className="form-result__actions">
                  <a className="btn btn--primary" href={draft().href}>
                    Open email app again
                  </a>
                  <button className="link-u" onClick={() => setStatus("idle")}>
                    Edit the application
                  </button>
                </div>
              )}
            </div>
          ) : (
            <form className="form" onSubmit={onSubmit} noValidate>
              <Toast toast={toast} onClose={() => setToast(null)} />
              <input ref={botRef} type="checkbox" name="botcheck" className="form__trap" tabIndex={-1} autoComplete="off" aria-hidden="true" />
              <div className="form__head">
                <p className="form__title">Partner application</p>
              </div>
              {tried && errorList.length > 0 && (
                <div className="form-errors" ref={summaryRef} tabIndex={-1} role="alert">
                  <p>
                    <strong>{errorList.length === 1 ? "One thing to fix" : `${errorList.length} things to fix`} first:</strong>
                  </p>
                  <ul>
                    {errorList.map(([k, msg]) => (
                      <li key={k}>
                        <a href={`#${id(k)}`}>{msg}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="form__row">
                {field("name", "Name", { autoComplete: "name" })}
                {field("email", "Email", { type: "email", autoComplete: "email", inputMode: "email" })}
              </div>
              <div className="form__row">
                {field("country", "Country you work from", { autoComplete: "country-name" })}
                {field("phone", "Phone or WhatsApp", { type: "tel", autoComplete: "tel", inputMode: "tel", placeholder: "+1 202 555 0143" })}
              </div>
              {field("linkedin", "LinkedIn profile", { type: "url", inputMode: "url", placeholder: "linkedin.com/in/yourname" })}

              <fieldset className={`field ${errors.experience ? "has-error" : ""}`}>
                <legend className="field__label">Experience in sales or business development</legend>
                <div className="papply__chips" id={id("experience")} tabIndex={-1}>
                  {EXPERIENCE.map((x) => (
                    <label key={x} className="papply__chip">
                      <input type="radio" name="experience" value={x} checked={v.experience === x} onChange={set("experience")} />
                      <span>{x}</span>
                    </label>
                  ))}
                </div>
                {errors.experience && (
                  <p className="field__error">
                    <AlertCircle size={16} strokeWidth={1.75} aria-hidden="true" />
                    {errors.experience}
                  </p>
                )}
              </fieldset>

              <div className={`field ${errors.about ? "has-error" : ""}`}>
                <label htmlFor={id("about")} className="field__label">
                  Which businesses can you reach?
                </label>
                <p className="field__hint">The markets, industries or networks you know best, and how you usually start conversations.</p>
                <textarea
                  id={id("about")}
                  name="about"
                  rows={5}
                  value={v.about}
                  onChange={set("about")}
                  aria-invalid={!!errors.about}
                  aria-describedby={errors.about ? `${id("about")}-error` : undefined}
                />
                {errors.about && (
                  <p id={`${id("about")}-error`} className="field__error">
                    <AlertCircle size={16} strokeWidth={1.75} aria-hidden="true" />
                    {errors.about}
                  </p>
                )}
              </div>

              <button className="btn btn--primary papply__send" type="submit" disabled={status === "sending"}>
                <span>{status === "sending" ? "Sending" : "Send application"}</span>
                <ArrowRight className="btn__icon" size={18} strokeWidth={1.75} aria-hidden="true" />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

export default function Partners() {
  usePageMeta({
    title: "Founding Partner Program",
    description:
      "Join KY Creatives as a founding partner. Bring international businesses the websites, apps and custom software they need, and earn 10% to 15% commission on the projects you create.",
  });

  const years = new Date().getFullYear() - company.foundedYear;
  const [ask, setAsk] = useState(false);

  return (
    <>
      <PageHero
        theme="ink"
        kicker="Founding Partner Program / International"
        kickerTone="aqua"
        lines={["Build global relationships.", "Earn on the business", "you create."]}
        lead="Join KY Creatives as a founding partner. Bring international businesses the websites, apps and custom software they need. Built, backed and completely handled by us."
        art={
          <>
            <Glow />
            <Globe />
          </>
        }
        aside={<Cohort />}
        className="phero--partners"
      >
        <div className="phero__actions" data-reveal="up" data-delay="0.3">
          <Button href="#apply">Apply to become a partner</Button>
          <Button href="#calculator" variant="ghost">
            Calculate your earnings
          </Button>
        </div>
        <p className="pearn" data-reveal="up" data-delay="0.4">
          Earn up to <strong>10% to 15%</strong> per project, in USD.
        </p>
      </PageHero>

      {/* 2. Commission tiers */}
      <section className="ptiers section" data-tone="light" aria-labelledby="tiers-title">
        <div className="container">
          <div className="offer__head">
            <MovingTag href="#calculator">How you earn?</MovingTag>
            <div id="tiers-title">
              <SplitHeading className="offer__title" lines={["The more you find,", "the more each one earns."]} />
            </div>
            <p className="t-muted" data-reveal="up">
              Your rate is set by the number of leads you bring to us and we close in a calendar month, and you earn on the net project value.
            </p>
          </div>
          <ol role="list" className="ptiers__list" data-stagger="">
            {TIERS.map((t, i) => (
              <li key={t.label} className={`ptier ptier--${i + 1}`}>
                <span className="ptier__label t-meta">{t.label} a month</span>
                <span className="ptier__rate">{pct(t.rate)}</span>
                <span className="ptier__note">{t.note}</span>
                <span className="ptier__eg">
                  On a {usd(5000)} project: <b>{usd(5000 * t.rate)}</b>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 3. Earnings calculator */}
      <Calculator />

      {/* 4. How it works */}
      <section className="psteps section" data-tone="light" aria-labelledby="steps-title">
        <div className="container">
          <div className="offer__head">
            <p className="kicker pbadge t-meta">How it works</p>
            <div id="steps-title">
              <SplitHeading className="offer__title" lines={["A simple path,", "from first call to commission."]} />
            </div>
            <div className="phead-side" data-reveal="up">
              <p className="t-muted">
                You bring the opportunity and stay close to the client. We take on everything technical, from the first discovery call to delivery.
              </p>
              <ul role="list" className="phead-facts t-meta">
                <li>
                  <b>{STEPS.length}</b> steps
                </li>
                <li>
                  <b>0</b> technical work on your side
                </li>
              </ul>
            </div>
          </div>
          <ol role="list" className="psteps__list" data-stagger="">
            {STEPS.map(([t, d], i) => (
              <li key={t} className={i === STEPS.length - 1 ? "is-last" : ""}>
                <span className="psteps__n">{i + 1}</span>
                <h3 className="psteps__t">{t}</h3>
                <p className="psteps__d">{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 5. Why KY Creatives */}
      <section className="pwhy section" data-tone="light" aria-labelledby="why-title">
        <div className="container">
          <div className="offer__head">
            <p className="kicker pbadge t-meta">Why KY Creatives</p>
            <div id="why-title">
              <SplitHeading className="offer__title" lines={["You find the opportunity.", "We build, handle and deliver", "what it needs."]} />
            </div>
            <p className="t-muted" data-reveal="up">
              Our management and development team supports discovery, technical scoping, proposals and delivery, so you are never pitching technical work alone.
            </p>
          </div>
          <ul role="list" className="pwhy__facts pwhy__facts--two" data-stagger="">
            <li>
              <b>{company.foundedYear}</b>
              <span>Building since, {years} years of client work</span>
            </li>
            <li>
              <b>1000+</b>
              <span>Projects completed by our team around the globe</span>
            </li>
          </ul>
          <p className="pwhy__more" data-reveal="up">
            <Link to="/portfolio" className="link-u">
              See the work you would be representing
            </Link>
          </p>
        </div>
      </section>

      {/* 6. What you'll represent */}
      <section className="prep section" data-tone="dark" aria-labelledby="rep-title">
        <div className="container">
          <div className="offer__head">
            <p className="kicker pbadge t-meta">What you will represent</p>
            <div id="rep-title">
              <SplitHeading className="offer__title" lines={["Five things businesses", "always need built."]} />
            </div>
            <div className="phead-side" data-reveal="up">
              <p className="prep__lead">
                Every project is designed, built and supported by our in-house team, so you can offer the full range with confidence.
              </p>
              <Link to="/portfolio" className="phead-link">
                See the work behind it <ArrowRight size={16} strokeWidth={1.75} aria-hidden="true" />
              </Link>
            </div>
          </div>
          <ol role="list" className="prep__list" data-stagger="">
            {REPRESENT.map(([t, d], i) => (
              <li key={t}>
                <span className="prep__n t-meta">{String(i + 1).padStart(2, "0")}</span>
                <span className="prep__t">{t}</span>
                <span className="prep__d">{d}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 7. Your role vs our role */}
      <section className="proles section" data-tone="light" aria-labelledby="roles-title">
        <div className="container">
          <div className="offer__head">
            <p className="kicker pbadge t-meta">Your role and ours</p>
            <div id="roles-title">
              <SplitHeading className="offer__title" lines={["Clear roles,", "so nobody guesses."]} />
            </div>
            <p className="t-muted" data-reveal="up">
              You stay involved through the close. We take on everything technical, before and after the contract.
            </p>
          </div>
          <div className="proles__grid" data-stagger="">
            <div className="proles__col proles__col--you">
              <p className="proles__h">You own</p>
              <ul role="list">
                {ROLES.you.map((x) => (
                  <li key={x}>
                    <Check size={16} strokeWidth={2} aria-hidden="true" />
                    {x}
                  </li>
                ))}
              </ul>
            </div>
            <div className="proles__col proles__col--us">
              <p className="proles__h">KY Creatives handles</p>
              <ul role="list">
                {ROLES.us.map((x) => (
                  <li key={x}>
                    <Check size={16} strokeWidth={2} aria-hidden="true" />
                    {x}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>


      {/* 8. Rewards & progression */}
      <section className="prew section" data-tone="dark" aria-labelledby="rew-title">
        <div className="container">
          <div className="offer__head">
            <p className="kicker pbadge pbadge--on-violet t-meta">Rewards and progression</p>
            <div id="rew-title">
              <SplitHeading className="offer__title" lines={["Recognition that grows", "with what you build."]} />
            </div>
          </div>
          <ul role="list" className="prew__list" data-stagger="">
            {REWARDS.map(([t, d]) => (
              <li key={t}>
                <h3>{t}</h3>
                <p>{d}</p>
              </li>
            ))}
          </ul>
          <p className="prew__note" data-reveal="up">
            Rewards and roles depend on eligibility set out in the partner agreement.
          </p>
        </div>
      </section>

      {/* 9. Who should apply */}
      <section className="pfit section" data-tone="light" aria-labelledby="fit-title">
        <div className="container pfit__grid">
          <div className="pfit__intro">
            <p className="kicker pbadge t-meta">Who should apply</p>
            <div id="fit-title">
              <SplitHeading as="h2" className="pfit__title" lines={["This is for you", "if you can say yes."]} />
            </div>
            <div className="pfit__facts" data-reveal="up">
              <div className="pfit__fact">
                <p className="pfit__label t-meta">You are based in</p>
                <p className="pfit__value">India and Nigeria</p>
              </div>
              <div className="pfit__fact">
                <p className="pfit__label t-meta">The clients you reach</p>
                <ul role="list" className="pfit__chips">
                  {MARKETS.map((m) => (
                    <li key={m}>{m}</li>
                  ))}
                </ul>
              </div>
              <div className="pfit__fact">
                <p className="pfit__label t-meta">Experience that helps</p>
                <ul role="list" className="pfit__chips pfit__chips--soft">
                  {BACKGROUNDS.map((m) => (
                    <li key={m}>{m}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <ul role="list" className="pfit__list" data-stagger="">
            {FIT.map((x) => (
              <li key={x}>
                <span className="pfit__tick" aria-hidden="true">
                  <Check size={14} strokeWidth={2.5} />
                </span>
                {x}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 10. FAQ */}
      <section className="sfaq section" data-tone="light" aria-labelledby="pfaq-title">
        <div className="container sfaq__grid">
          <div className="sfaq__intro">
            <p className="kicker pbadge t-meta">Questions</p>
            <h2 id="pfaq-title" className="sfaq__title" data-reveal="up">
              Before you apply
            </h2>
            <p className="t-muted" data-reveal="up">
              Something else on your mind?{" "}
              <button type="button" className="link-u pask__open" onClick={() => setAsk(true)} aria-haspopup="dialog">
                Ask us directly
              </button>
            </p>
            <div className="pterms" data-reveal="up">
              <p className="pterms__head t-meta">The program at a glance</p>
              <dl className="pterms__list">
                {TERMS.map(([k, val]) => (
                  <div key={k}>
                    <dt>{k}</dt>
                    <dd>{val}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          <div data-reveal="up">
            <Faq items={FAQS} />
          </div>
        </div>
      </section>

      <AskDialog open={ask} onClose={() => setAsk(false)} />
      <Apply />
      <PartnersStrip />
      <ContactCTA
        kicker="Next step / Become a partner"
        lines={["Bring the client.", "We’ll build the rest."]}
        lead="Apply now. We read every application ourselves and reply within 24 hours, with a call to talk it through if it looks like a fit."
        cta="Apply to become a partner"
        to="#apply"
      />
    </>
  );
}
