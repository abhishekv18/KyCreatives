import { useCallback, useId, useRef, useState } from "react";
import { AlertCircle, Send, ShieldCheck, Check } from "lucide-react";
import Toast from "./Toast";
import LaptopSlides from "./LaptopSlides";
import { WEB3FORMS_KEY, ENQUIRY_EMAIL, sendEnquiry } from "../../lib/enquiry";

const EMPTY = { name: "", email: "", phone: "", message: "" };
const NEEDS = ["Website", "Online store", "Mobile app", "Portal", "Marketing", "Branding"];

function validate(v) {
  const e = {};
  if (!v.name.trim()) e.name = "Enter your name.";
  if (!v.email.trim()) e.email = "Enter your email address.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) e.email = "Check the email address.";
  const digits = v.phone.replace(/\D/g, "").length;
  if (!v.phone.trim()) e.phone = "Enter a phone number.";
  else if (!/^[+\d\s().-]+$/.test(v.phone.trim()) || digits < 7 || digits > 15) e.phone = "Check the phone number.";
  return e;
}

/**
 * A short consultation form beside a laptop showing real work: used under the
 * hero of every service page and at the foot of the portfolio. Sends through
 * Web3Forms; on success the form clears and a toast confirms it.
 */
export default function QuickEnquiry({
  source,
  kicker = "Free consultation",
  lines = ["Let's start your", "business online today."],
  lead = "Tell us a little about what you need. We reply within 24 hours on business days, with honest advice and a clear next step.",
  theme = "web",
  interest,
  tone = "violet",
}) {
  const base = useId();
  const id = (k) => `${base}-${k}`;
  const [values, setValues] = useState(EMPTY);
  const [needs, setNeeds] = useState(interest ? [interest] : []);
  const toggleNeed = (n) => setNeeds((l) => (l.includes(n) ? l.filter((x) => x !== n) : [...l, n]));
  const [errors, setErrors] = useState({});
  const [tried, setTried] = useState(false);
  const [sending, setSending] = useState(false);
  const [toast, setToast] = useState(null);
  const closeToast = useCallback(() => setToast(null), []);
  const botRef = useRef(null);

  const set = (k) => (e) => {
    const next = { ...values, [k]: e.target.value };
    setValues(next);
    if (tried) setErrors(validate(next));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setTried(true);
    const errs = validate(values);
    setErrors(errs);
    if (Object.keys(errs).length) {
      document.getElementById(id(Object.keys(errs)[0]))?.focus();
      return;
    }
    const v = values;
    const subject = `Consultation request: ${source}`;
    if (!WEB3FORMS_KEY) {
      const body = `Name: ${v.name}\nEmail: ${v.email}\nPhone: ${v.phone}\n\n${v.message}`;
      window.location.assign(`mailto:${ENQUIRY_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
      return;
    }
    setSending(true);
    setToast(null);
    try {
      await sendEnquiry({
        subject,
        botcheck: botRef.current?.checked || false,
        name: v.name.trim(),
        email: v.email.trim(),
        phone: v.phone.trim(),
        page: source,
        interested_in: needs.join(", ") || "Not specified",
        message: v.message.trim() || "No message given",
      });
      setValues(EMPTY);
      setNeeds(interest ? [interest] : []);
      setErrors({});
      setTried(false);
      setToast({
        id: Date.now(),
        tone: "success",
        title: "Request sent",
        text: `Thank you, ${v.name.trim().split(/\s+/)[0]}. We will be in touch within 24 hours on business days.`,
      });
    } catch {
      setToast({
        id: Date.now(),
        tone: "error",
        title: "Your request was not sent",
        text: "Something went wrong on the way. Your details are still in the form, so you can try again.",
        action: { label: `Or email ${ENQUIRY_EMAIL}`, href: `mailto:${ENQUIRY_EMAIL}` },
      });
    } finally {
      setSending(false);
    }
  };

  const field = (k, label, props = {}) => (
    <div className={`field qe-field ${errors[k] ? "has-error" : ""}`}>
      <label htmlFor={id(k)} className="field__label">
        {label}
        {props.optional ? <span className="field__opt"> (optional)</span> : null}
      </label>
      {k === "message" ? (
        <textarea id={id(k)} rows={4} value={values[k]} onChange={set(k)} placeholder={props.placeholder} />
      ) : (
        <input
          id={id(k)}
          value={values[k]}
          onChange={set(k)}
          aria-invalid={!!errors[k]}
          aria-describedby={errors[k] ? `${id(k)}-error` : undefined}
          {...props.input}
        />
      )}
      {errors[k] && (
        <p id={`${id(k)}-error`} className="field__error">
          <AlertCircle size={16} strokeWidth={1.75} aria-hidden="true" />
          {errors[k]}
        </p>
      )}
    </div>
  );

  return (
    <section className={`qe qe--${tone}`} data-tone="light" aria-labelledby={id("title")}>
      <div className="container qe__grid">
        <div className="qe__intro">
          <p className="kicker t-meta">{kicker}</p>
          <h2 id={id("title")} className="qe__title">
            {lines[0]}
            <br />
            <span>{lines[1]}</span>
          </h2>
          <p className="qe__lead">{lead}</p>
          <LaptopSlides theme={theme} />
          <ul role="list" className="qe__points">
            {["Reply within 24 hours", "A clear plan and price", "One team, start to finish"].map((t) => (
              <li key={t}>
                <Check size={16} strokeWidth={2} aria-hidden="true" />
                {t}
              </li>
            ))}
          </ul>
        </div>

        <form className="qe__card" onSubmit={onSubmit} noValidate>
          <Toast toast={toast} onClose={closeToast} />
          <input ref={botRef} type="checkbox" name="botcheck" className="form__trap" tabIndex={-1} autoComplete="off" aria-hidden="true" />
          <div className="qe__card-head">
            <p className="qe__card-title">Get a free consultation</p>
            <p className="qe__card-meta t-meta">
              <span className="qe__live" aria-hidden="true" /> Replies within a day
            </p>
          </div>
          <fieldset className="qe__needs">
            <legend className="field__label">What do you need?</legend>
            <div className="qe__chips">
              {NEEDS.map((n) => (
                <label key={n} className="qe__chip">
                  <input type="checkbox" checked={needs.includes(n)} onChange={() => toggleNeed(n)} />
                  <span>{n}</span>
                </label>
              ))}
            </div>
          </fieldset>
          {field("name", "Name", { input: { autoComplete: "name" } })}
          <div className="qe__row">
            {field("email", "Email", { input: { type: "email", autoComplete: "email", inputMode: "email" } })}
            {field("phone", "Phone", { input: { type: "tel", autoComplete: "tel", inputMode: "tel", placeholder: "+91 98765 43210" } })}
          </div>
          {field("message", "Message", { optional: true, placeholder: "What would you like to build or improve?" })}
          <button
            type="submit"
            className={`btn btn--primary qe__submit ${sending ? "is-busy" : ""}`}
            disabled={sending}
            aria-busy={sending}
          >
            <span>{sending ? "Sending" : "Make an enquiry"}</span>
            {sending ? <span className="form__spinner" aria-hidden="true" /> : <Send size={18} strokeWidth={1.75} aria-hidden="true" className="btn__icon" />}
          </button>
          <p className="qe__note t-meta">
            <ShieldCheck size={14} strokeWidth={1.75} aria-hidden="true" /> No spam. Your details go only to our team.
          </p>
        </form>
      </div>
    </section>
  );
}
