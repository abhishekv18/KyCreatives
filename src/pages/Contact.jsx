import { useId, useRef, useState } from "react";
import { Mail, Phone, MessageCircle, MapPin, Info, CheckCircle2, AlertCircle, Copy, Check } from "lucide-react";
import { usePageMeta } from "../hooks/usePageMeta";
import PageHero from "../components/ui/PageHero";
import { services } from "../data/services";
import { Arcs } from "../components/art/Art";
import { company } from "../data/site";

const SERVICE_OPTIONS = [...services.map((s) => s.name), "Not sure yet"];

const EMPTY = { name: "", email: "", company: "", service: "", budget: "", details: "" };

function validate(v) {
  const e = {};
  if (!v.name.trim()) e.name = "Enter your name.";
  if (!v.email.trim()) e.email = "Enter your email address so we can reply.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim()))
    e.email = "Check the email address. It should look like name@company.com.";
  if (!v.service) e.service = "Choose the service closest to what you need, or Not sure yet.";
  if (v.details.trim().length < 20) e.details = "Tell us a little more about the project, at least a sentence or two.";
  return e;
}

function buildEmail(v) {
  const subject = `Project enquiry: ${v.service}${v.company ? ` for ${v.company}` : ""}`;
  const lines = [
    "Hello KY Creatives,",
    "",
    v.details.trim(),
    "",
    "---",
    `Name: ${v.name.trim()}`,
    `Email: ${v.email.trim()}`,
    v.company.trim() ? `Company or brand: ${v.company.trim()}` : null,
    `Service: ${v.service}`,
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
        <Field id={id("service")} label="Service" error={errors.service}>
          <div className="select">
            <select
              id={id("service")}
              name="service"
              value={values.service}
              onChange={set("service")}
              aria-invalid={!!errors.service}
              aria-describedby={describedBy("service")}
            >
              <option value="" disabled>
                Choose a service
              </option>
              {SERVICE_OPTIONS.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </div>
        </Field>
      </div>

      <Field
        id={id("budget")}
        label="Budget"
        optional
        hint="A rough range in any currency helps us suggest the right scope."
      >
        <input
          id={id("budget")}
          name="budget"
          value={values.budget}
          onChange={set("budget")}
          placeholder="For example: USD 8,000 to 12,000"
          aria-describedby={describedBy("budget", true)}
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

      <div className="form__note" id={`${base}-note`}>
        <Info size={18} strokeWidth={1.75} aria-hidden="true" />
        <p>
          This form does not send anything by itself. When you continue, your email app opens with a message to{" "}
          {company.email}, ready for you to review and send.
        </p>
      </div>

      <button type="submit" className="btn btn--primary form__submit" disabled={status === "opening"}>
        <span>{status === "opening" ? "Opening your email app" : "Continue in your email app"}</span>
        <Mail size={18} strokeWidth={1.75} aria-hidden="true" className="btn__icon" />
      </button>
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
        theme="violet"
        kickerTone="aqua"
        art={<Arcs className="contact__arcs" />}
        kicker="Contact"
        lines={["Tell us what", "you want to build."]}
        lead="A few lines are enough to start. We will reply with questions, an honest view of what it takes, and the next step."
      />
      <section className="contact section" data-tone="light" aria-label="Contact details and enquiry form">
        <div className="container contact__grid">
          <aside className="contact__details on-dark" data-tone="dark" data-reveal="up">
            <h2 className="contact__h">Reach us directly</h2>
            <ul role="list" className="contact__list">
              <li>
                <Mail size={20} strokeWidth={1.5} aria-hidden="true" />
                <div>
                  <span className="t-meta">Email</span>
                  <a href={`mailto:${company.email}`}>{company.email}</a>
                </div>
              </li>
              <li>
                <Phone size={20} strokeWidth={1.5} aria-hidden="true" />
                <div>
                  <span className="t-meta">Phone</span>
                  <a href={company.phoneHref}>{company.phoneDisplay}</a>
                </div>
              </li>
              <li>
                <MessageCircle size={20} strokeWidth={1.5} aria-hidden="true" />
                <div>
                  <span className="t-meta">WhatsApp</span>
                  <a href={company.whatsapp} target="_blank" rel="noopener noreferrer">
                    Message us on WhatsApp<span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </div>
              </li>
              <li>
                <MapPin size={20} strokeWidth={1.5} aria-hidden="true" />
                <div>
                  <span className="t-meta">Studio</span>
                  <address>
                    {company.address.lines.map((l) => (
                      <span key={l}>{l}</span>
                    ))}
                  </address>
                </div>
              </li>
            </ul>
            <p className="contact__note t-muted">
              We aim to answer every enquiry within 24 hours on business days (India Standard Time).
            </p>
          </aside>
          <div className="contact__form" data-reveal="up" data-delay="0.1">
            <EnquiryForm />
          </div>
        </div>
      </section>
    </>
  );
}
