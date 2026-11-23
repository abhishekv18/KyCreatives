import { useId, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Check, Minus, Plus, AlertCircle, CheckCircle2 } from "lucide-react";
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
import { TIERS, tierFor, RECURRING, REPRESENT, STEPS, ROLES, REWARDS, FIT, FAQS, MARKETS, BACKGROUNDS, TERMS, NEXT } from "../data/partners-program";

const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY;
const WEB3FORMS_URL = "https://api.web3forms.com/submit";
const ENQUIRY_EMAIL = "kycreatives66@gmail.com";

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

/* Hero centrepiece: how a partner earns, in three plain steps on one card */
function EarnCard() {
  const value = 8000;
  const lo = value * TIERS[0].rate;
  const hi = value * TIERS[TIERS.length - 1].rate;
  return (
    <figure className="pstate" data-reveal="up">
      <div className="pstate__card">
        <div className="pstate__head">
          <div>
            <p className="pstate__kicker">How a partner earns</p>
            <p className="pstate__month">One introduction, one commission.</p>
          </div>
          <img src="/brand/ky-flame-icon.png" alt="" width="32" height="32" />
        </div>
        <ol role="list" className="pflow">
          <li>
            <span className="pflow__n">1</span>
            <span className="pflow__t">
              <b>You introduce a business</b>
              A retail brand that needs an online store
            </span>
          </li>
          <li>
            <span className="pflow__n">2</span>
            <span className="pflow__t">
              <b>We build and deliver it</b>
              Scoped, designed, built and launched by our team
            </span>
            <span className="pflow__chip">{usd(value)} project</span>
          </li>
          <li>
            <span className="pflow__n pflow__n--on">3</span>
            <span className="pflow__t">
              <b>You earn your commission</b>
              10% to 15% of the project value, in USD
            </span>
          </li>
        </ol>
        <div className="pstate__total">
          <span>
            Your commission
            <br />
            at {pct(TIERS[0].rate)} to {pct(TIERS[TIERS.length - 1].rate)}
          </span>
          <strong>
            {usd(lo)}&ndash;{usd(hi)}
          </strong>
        </div>
      </div>
    </figure>
  );
}

/* A small pill that drifts gently to and fro, pointing the way to a section */
function MovingTag({ href, tone = "light", children }) {
  const inner = (
    <>
      <span className="ptag__dot" aria-hidden="true" />
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
        <div className="calc__head">
          <MovingTag tone="dark">Earnings calculator</MovingTag>
          <SplitHeading as="h2" className="calc__title" lines={["See what a month", "could look like."]} />
          <p className="calc__lead" data-reveal="up">
            Move the numbers to match a month you have in mind. The tier is set by how many eligible projects close in the calendar month, and applies to each of them.
          </p>
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
              Illustrative only, not a forecast or a guarantee. <span className="calc__hl">Earnings</span> are calculated on eligible net project revenue.
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
    if (!WEB3FORMS_KEY) {
      window.location.assign(d.href);
      setStatus("drafted");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch(WEB3FORMS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: d.subject,
          from_name: "KY Creatives website",
          replyto: v.email.trim(),
          botcheck: botRef.current?.checked || false,
          ...Object.fromEntries(Object.entries(v).map(([k, x]) => [k, x.trim() || "Not given"])),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.success) throw new Error("Send failed");
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
          <p className="kicker t-meta">Apply</p>
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
                  ? `Thank you, ${v.name.trim().split(/\s+/)[0]}. We will reply to ${v.email.trim()} within 24 hours.`
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
                <p className="form__meta t-meta">Takes about 3 minutes</p>
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
        aside={<EarnCard />}
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
            <p className="kicker t-meta">How it works</p>
            <div id="steps-title">
              <SplitHeading className="offer__title" lines={["A simple path,", "from first call to commission."]} />
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
            <p className="kicker t-meta">Why KY Creatives</p>
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
            <p className="kicker kicker--aqua t-meta">What you will represent</p>
            <div id="rep-title">
              <SplitHeading className="offer__title" lines={["Five things businesses", "always need built."]} />
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
            <p className="kicker t-meta">Your role and ours</p>
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
            <p className="kicker kicker--aqua t-meta">Rewards and progression</p>
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
            Rewards and roles depend on eligibility set out in the partner agreement and are not guaranteed.
          </p>
        </div>
      </section>

      {/* 9. Who should apply */}
      <section className="pfit section" data-tone="light" aria-labelledby="fit-title">
        <div className="container pfit__grid">
          <div className="pfit__intro">
            <p className="kicker t-meta">Who should apply</p>
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
            <p className="kicker t-meta">Questions</p>
            <h2 id="pfaq-title" className="sfaq__title" data-reveal="up">
              Before you apply
            </h2>
            <p className="t-muted" data-reveal="up">
              Something else on your mind?{" "}
              <Link to="/contact" className="link-u">
                Ask us directly
              </Link>
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

      <Apply />
      <PartnersStrip />
      <ContactCTA
        kicker="Next step / Become a partner"
        lines={["Bring the client.", "We’ll build the rest."]}
        lead="Apply in about three minutes. We read every application ourselves and reply within 24 hours, with a call to talk it through if it looks like a fit."
        cta="Apply to become a partner"
        to="#apply"
      />
    </>
  );
}
