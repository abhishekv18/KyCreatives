import { useEffect, useId, useRef, useState } from "react";
import { Mail, Phone, MessageCircle, MapPin, Info, CheckCircle2, AlertCircle, Copy, Check, ArrowUpRight, HelpCircle } from "lucide-react";
import { usePageMeta } from "../hooks/usePageMeta";
import PageHero from "../components/ui/PageHero";
import { Arcs } from "../components/art/Art";
import { services } from "../data/services";
import { serviceIcons } from "../components/ui/serviceIcons";
import SocialIcon from "../components/ui/SocialIcon";
import { company, social, reviewLinks } from "../data/site";

const NOT_SURE = "Not sure yet";
const SERVICE_OPTIONS = [...services.map((s) => s.name), NOT_SURE];
const SERVICE_ICON = Object.fromEntries(services.map((s) => [s.name, serviceIcons[s.slug]]));

const clock = new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit" });

/* The quickest ways to reach the studio, with the studio's local time. */
function ReachCard() {
  const [now, setNow] = useState(() => clock.format(new Date()));
  useEffect(() => {
    const t = setInterval(() => setNow(clock.format(new Date())), 20000);
    return () => clearInterval(t);
  }, []);
  const ways = [
    { icon: Mail, label: "Email", value: company.email, href: `mailto:${company.email}` },
    { icon: MessageCircle, label: "WhatsApp", value: "Message the studio", href: company.whatsapp, external: true },
    { icon: Phone, label: "Call", value: company.phoneDisplay, href: company.phoneHref },
  ];
  return (
    <div className="reach" data-reveal="up" data-delay="0.25">
      <div className="reach__head">
        <p className="reach__title">Quickest ways to reach us</p>
        <p className="reach__time t-meta">
          <span className="reach__dot" aria-hidden="true" />
          Gurugram <strong>{now}</strong> IST
        </p>
      </div>
      <ul role="list" className="reach__list">
        {ways.map(({ icon: Icon, label, value, href, external }) => (
          <li key={label}>
            <a href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
              <span className="reach__icon" aria-hidden="true">
                <Icon size={18} strokeWidth={1.6} />
              </span>
              <span className="reach__text">
                <span className="reach__label t-meta">{label}</span>
                <span className="reach__value">{value}</span>
              </span>
              <ArrowUpRight className="reach__arrow" size={18} strokeWidth={1.75} aria-hidden="true" />
              {external && <span className="sr-only"> (opens in a new tab)</span>}
            </a>
          </li>
        ))}
      </ul>
      <p className="reach__foot">We aim to reply within 24 hours on business days.</p>
    </div>
  );
}

const NEXT = [
  {
    title: "We read and reply",
    body: "Within 24 hours on business days, with questions about your goals rather than a sales script.",
  },
  {
    title: "A first conversation",
    body: "A call or a written exchange, whichever suits you, to understand the business, the users and the timing.",
  },
  {
    title: "A clear proposal",
    body: "Scope, timeline and cost in writing, so you can decide with everything in front of you.",
  },
];

const EMPTY = { name: "", email: "", company: "", phone: "", services: [], budget: "", details: "" };

/* "Not sure yet" stands alone: picking it clears the services, picking a service clears it. */
function toggleService(list, option) {
  if (list.includes(option)) return list.filter((o) => o !== option);
  if (option === NOT_SURE) return [NOT_SURE];
  return SERVICE_OPTIONS.filter((o) => o !== NOT_SURE && (o === option || list.includes(o)));
}

function serviceSummary(list) {
  if (list.length <= 2) return list.join(" and ");
  return `${list[0]}, ${list[1]} and ${list.length - 2} more`;
}

function validate(v) {
  const e = {};
  if (!v.name.trim()) e.name = "Enter your name.";
  if (!v.email.trim()) e.email = "Enter your email address so we can reply.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim()))
    e.email = "Check the email address. It should look like name@company.com.";
  // Phone is not required; when given it should look like a real number.
  const phone = v.phone.trim();
  const digits = phone.replace(/\D/g, "").length;
  if (phone && (!/^[+\d\s().-]+$/.test(phone) || digits < 7 || digits > 15))
    e.phone = "Check the phone number. Include the country code, for example +91 98765 43210.";
  if (!v.services.length) e.services = "Choose at least one service, or Not sure yet.";
  if (v.details.trim().length < 20) e.details = "Tell us a little more about the project, at least a sentence or two.";
  return e;
}

function buildEmail(v) {
  const subject = `Project enquiry: ${serviceSummary(v.services)}${v.company ? ` for ${v.company}` : ""}`;
  const lines = [
    "Hello KY Creatives,",
    "",
    v.details.trim(),
    "",
    "---",
    `Name: ${v.name.trim()}`,
    `Email: ${v.email.trim()}`,
    v.company.trim() ? `Company or brand: ${v.company.trim()}` : null,
    v.phone.trim() ? `Phone: ${v.phone.trim()}` : null,
    `${v.services.length > 1 ? "Services" : "Service"}: ${v.services.join(", ")}`,
    v.budget.trim() ? `Budget: ${v.budget.trim()}` : null,
  ].filter((l) => l !== null);
  const body = lines.join("\n");
  return { subject, body, href: `mailto:${company.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}` };
}

function Field({ id, label, optional, error, hint, children }) {
  return (
    <div className={`field ${error ? "has-error" : ""}`}>
      <label htmlFor={id} className="field__label">
        {label}
        {optional && <span className="field__opt"> (optional)</span>}
      </label>
      {hint && (
        <p id={`${id}-hint`} className="field__hint">
          {hint}
        </p>
      )}
      {children}
      {error && (
        <p id={`${id}-error`} className="field__error">
          <AlertCircle size={16} strokeWidth={1.75} aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  );
}

function EnquiryForm() {
  const base = useId();
  const id = (k) => `${base}-${k}`;
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState("idle"); // idle | opening | opened
  const [draft, setDraft] = useState(null);
  const [copied, setCopied] = useState(false);
  const summaryRef = useRef(null);
  const resultRef = useRef(null);

  const set = (k) => (e) => {
    const next = { ...values, [k]: e.target.value };
    setValues(next);
    if (submitted) setErrors(validate(next));
  };

  const toggle = (option) => {
    const next = { ...values, services: toggleService(values.services, option) };
    setValues(next);
    if (submitted) setErrors(validate(next));
  };

  const describedBy = (k, hint) =>
    [hint && `${id(k)}-hint`, errors[k] && `${id(k)}-error`].filter(Boolean).join(" ") || undefined;

  const onSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    const errs = validate(values);
    setErrors(errs);
    if (Object.keys(errs).length) {
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }
    const d = buildEmail(values);
    setDraft(d);
    setStatus("opening");
    // Hand the message to the visitor's email app. Nothing is sent from this site.
    window.location.href = d.href;
    setTimeout(() => {
      setStatus("opened");
      requestAnimationFrame(() => resultRef.current?.focus());
    }, 600);
  };

  const copy = async () => {
    if (!draft) return;
    try {
      await navigator.clipboard.writeText(`To: ${company.email}\nSubject: ${draft.subject}\n\n${draft.body}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  const errorList = Object.entries(errors);

  if (status === "opened" && draft) {
    return (
      <div className="form-result" ref={resultRef} tabIndex={-1} role="status">
        <CheckCircle2 size={28} strokeWidth={1.5} aria-hidden="true" className="form-result__icon" />
        <h2 className="t-h3">Your email draft is ready</h2>
        <p>
          Your email app should have opened with the message filled in. <strong>Nothing has been sent yet.</strong>{" "}
          Press send in your email app to reach us at {company.email}.
        </p>
        <p className="t-muted">
          If no email app opened, copy the message and send it from any email account, or write to us directly.
        </p>
        <div className="form-result__actions">
          <button className="btn btn--primary" onClick={copy}>
            {copied ? <Check size={18} aria-hidden="true" /> : <Copy size={18} strokeWidth={1.75} aria-hidden="true" />}
            <span>{copied ? "Message copied" : "Copy message"}</span>
          </button>
          <a className="btn btn--ghost" href={draft.href}>
            Open email app again
          </a>
          <button
            className="link-u"
            onClick={() => {
              setStatus("idle");
              setDraft(null);
            }}
          >
            Edit the enquiry
          </button>
        </div>
        <span className="sr-only" aria-live="polite">
          {copied ? "Message copied to clipboard" : ""}
        </span>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={onSubmit} noValidate aria-describedby={`${base}-note`}>
      <div className="form__head">
        <p className="form__title">Project enquiry</p>
        <p className="form__meta t-meta">Takes about 2 minutes</p>
      </div>
      {submitted && errorList.length > 0 && (
        <div className="form-errors" ref={summaryRef} tabIndex={-1} role="alert">
          <p>
            <strong>
              {errorList.length === 1 ? "One thing to fix" : `${errorList.length} things to fix`} before we can draft your
              email:
            </strong>
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

      <fieldset className="form__set">
        <legend className="form__legend">
          <span className="t-meta">01</span> About you
        </legend>
      <div className="form__row">
        <Field id={id("name")} label="Name" error={errors.name}>
          <input
            id={id("name")}
            name="name"
            autoComplete="name"
            value={values.name}
            onChange={set("name")}
            aria-invalid={!!errors.name}
            aria-describedby={describedBy("name")}
          />
        </Field>
        <Field id={id("email")} label="Email" error={errors.email}>
          <input
            id={id("email")}
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            value={values.email}
            onChange={set("email")}
            aria-invalid={!!errors.email}
            aria-describedby={describedBy("email")}
          />
        </Field>
      </div>

      <div className="form__row">
        <Field id={id("company")} label="Company or brand" optional>
          <input
            id={id("company")}
            name="company"
            autoComplete="organization"
            value={values.company}
            onChange={set("company")}
          />
        </Field>
        <Field id={id("phone")} label="Phone" error={errors.phone}>
          <input
            id={id("phone")}
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            placeholder="+91 98765 43210"
            value={values.phone}
            onChange={set("phone")}
            aria-invalid={!!errors.phone}
            aria-describedby={describedBy("phone")}
          />
        </Field>
      </div>
      </fieldset>

      <fieldset className="form__set">
        <legend className="form__legend">
          <span className="t-meta">02</span> Your project
        </legend>
      <fieldset className={`field choice ${errors.services ? "has-error" : ""}`}>
        <legend className="field__label choice__legend" id={`${id("services")}-label`}>
          <span>Services</span>
          <span className="choice__count" aria-live="polite">
            {values.services.length > 0 && values.services[0] !== NOT_SURE ? `${values.services.length} selected` : ""}
          </span>
        </legend>
        <p id={`${id("services")}-hint`} className="field__hint">
          Choose all that apply.
        </p>
        <div
          id={id("services")}
          role="group"
          aria-labelledby={`${id("services")}-label`}
          aria-invalid={!!errors.services}
          aria-describedby={describedBy("services", true)}
          tabIndex={-1}
          className="choice__grid"
        >
          {SERVICE_OPTIONS.map((o) => {
            const Icon = SERVICE_ICON[o] || HelpCircle;
            return (
              <label key={o} className={`choice__item ${o === NOT_SURE ? "choice__item--alt" : ""}`}>
                <input
                  type="checkbox"
                  name="services"
                  value={o}
                  checked={values.services.includes(o)}
                  onChange={() => toggle(o)}
                />
                <span className="choice__box">
                  <span className="choice__icon" aria-hidden="true">
                    <Icon size={18} strokeWidth={1.6} />
                  </span>
                  <span className="choice__name">{o}</span>
                  <span className="choice__tick" aria-hidden="true">
                    <Check size={13} strokeWidth={3} />
                  </span>
                </span>
              </label>
            );
          })}
        </div>
        {errors.services && (
          <p id={`${id("services")}-error`} className="field__error">
            <AlertCircle size={16} strokeWidth={1.75} aria-hidden="true" />
            {errors.services}
          </p>
        )}
      </fieldset>
      <Field id={id("budget")} label="Budget" optional>
        <input
          id={id("budget")}
          name="budget"
          value={values.budget}
          onChange={set("budget")}
          placeholder="e.g. INR 5,00,000 to 8,00,000"
          aria-describedby={describedBy("budget")}
        />
      </Field>

      <Field
        id={id("details")}
        label="Project details"
        error={errors.details}
        hint="What do you want to build or improve, and by when?"
      >
        <textarea
          id={id("details")}
          name="details"
          rows={6}
          value={values.details}
          onChange={set("details")}
          aria-invalid={!!errors.details}
          aria-describedby={describedBy("details", true)}
        />
      </Field>
      </fieldset>

      <div className="form__foot">
        <div className="form__note" id={`${base}-note`}>
          <Info size={16} strokeWidth={1.75} aria-hidden="true" />
          <p>
            Nothing is sent from this page. Continue opens your email app with a message to {company.email}, ready to
            review and send.
          </p>
        </div>
        <button type="submit" className="btn btn--primary form__submit" disabled={status === "opening"}>
          <span>{status === "opening" ? "Opening your email app" : "Continue in your email app"}</span>
          <Mail size={18} strokeWidth={1.75} aria-hidden="true" className="btn__icon" />
        </button>
      </div>
    </form>
  );
}

export default function Contact() {
  usePageMeta({
    title: "Contact and start a project",
    description:
      "Tell KY Creatives about your project. Email info@kycreatives.com or call +91 76697 50672. Studio in Gurugram, India, working with clients worldwide.",
  });

  return (
    <>
      <PageHero
        theme="dusk"
        kicker="Contact"
        kickerTone="aqua"
        lines={["Tell us what", "you want to build."]}
        lead="A few lines are enough to start. We will reply with questions, an honest view of what it takes, and the next step."
        className="phero--contact"
        art={<Arcs />}
        aside={<ReachCard />}
      />

      <section className="contact section" data-tone="light" aria-label="Contact details and enquiry form">
        <div className="container contact__grid">
          <aside className="contact__details" data-reveal="up">
            <div className="contact__block">
              <h2 className="contact__h t-meta">Reach us directly</h2>
              <ul role="list" className="contact__list">
                <li>
                  <span className="contact__icon" aria-hidden="true">
                    <Mail size={18} strokeWidth={1.6} />
                  </span>
                  <div>
                    <span className="contact__label">Email</span>
                    <a href={`mailto:${company.email}`}>{company.email}</a>
                  </div>
                </li>
                <li>
                  <span className="contact__icon" aria-hidden="true">
                    <Phone size={18} strokeWidth={1.6} />
                  </span>
                  <div>
                    <span className="contact__label">Phone</span>
                    <a href={company.phoneHref}>{company.phoneDisplay}</a>
                  </div>
                </li>
                <li>
                  <span className="contact__icon" aria-hidden="true">
                    <MessageCircle size={18} strokeWidth={1.6} />
                  </span>
                  <div>
                    <span className="contact__label">WhatsApp</span>
                    <a href={company.whatsapp} target="_blank" rel="noopener noreferrer">
                      Message us on WhatsApp<span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </div>
                </li>
                <li>
                  <span className="contact__icon" aria-hidden="true">
                    <MapPin size={18} strokeWidth={1.6} />
                  </span>
                  <div>
                    <span className="contact__label">Studio</span>
                    <address>
                      <a href={company.address.map} target="_blank" rel="noopener noreferrer" className="contact__map">
                        {company.address.lines.map((l) => (
                          <span key={l}>{l}</span>
                        ))}
                        <span className="contact__map-cta">
                          View on Google Maps <ArrowUpRight size={14} strokeWidth={1.75} aria-hidden="true" />
                        </span>
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    </address>
                  </div>
                </li>
              </ul>
            </div>

            <div className="contact__block">
              <h2 className="contact__h t-meta">Follow the studio</h2>
              <ul role="list" className="contact__social">
                {social.map((s) => (
                  <li key={s.label}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer" data-network={s.label.toLowerCase()}>
                      <span className="contact__social-mark">
                        <SocialIcon name={s.label} size={20} brand />
                      </span>
                      <span className="contact__social-name">{s.label}</span>
                      <ArrowUpRight size={16} strokeWidth={1.75} aria-hidden="true" className="contact__social-go" />
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="contact__block">
              <h2 className="contact__h t-meta">Client reviews</h2>
              <p className="contact__reviews">
                <a href={reviewLinks.trustpilot} target="_blank" rel="noopener noreferrer">
                  Trustpilot
                  <ArrowUpRight size={14} strokeWidth={1.75} aria-hidden="true" />
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
                <a href={reviewLinks.google} target="_blank" rel="noopener noreferrer">
                  Google
                  <ArrowUpRight size={14} strokeWidth={1.75} aria-hidden="true" />
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </p>
            </div>
          </aside>

          <div className="contact__form" data-reveal="up" data-delay="0.1">
            <EnquiryForm />
          </div>
        </div>
      </section>

      <section className="cnext section grain" data-tone="color" aria-labelledby="cnext-title">
        <div className="cta__rings cnext__rings" aria-hidden="true">
          <i />
          <i />
          <i />
        </div>
        <div className="container">
          <div className="cnext__head">
            <p className="kicker kicker--ink t-meta">What happens next</p>
            <h2 id="cnext-title" className="cnext__title">
              From first message to a clear plan.
            </h2>
            <p className="cnext__promise" data-reveal="up">
              <span className="cta__rings cnext__halo" aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
              <strong>24h</strong>
              <span>First reply, on business days</span>
            </p>
          </div>
          <ol role="list" className="cnext__list" data-stagger="">
            {NEXT.map((n, i) => (
              <li key={n.title} className={`cnext__step cnext__step--${i}`}>
                <span className="cnext__num t-meta">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="cnext__h">{n.title}</h3>
                <p>{n.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
