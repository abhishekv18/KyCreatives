import { useEffect } from "react";
import { createPortal } from "react-dom";
import { CheckCircle2, AlertCircle, X } from "lucide-react";

/**
 * A single toast, rendered into <body> (or into `container`, e.g. an open
 * dialog, so it shows above it). Every toast closes itself after `duration`;
 * the thin line along the foot shows the time left. Escape or the close
 * button dismiss it early.
 */
export default function Toast({ toast, onClose, duration = 3500, container }) {
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(onClose, toast.action ? duration + 2500 : duration);
    return () => clearTimeout(t);
  }, [toast, onClose, duration]);

  useEffect(() => {
    if (!toast) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [toast, onClose]);

  if (!toast) return null;
  const error = toast.tone === "error";
  const Icon = error ? AlertCircle : CheckCircle2;
  const ms = toast.action ? duration + 2500 : duration;

  return createPortal(
    <div
      key={toast.id}
      className={`toast ${error ? "toast--error" : "toast--success"}`}
      role={error ? "alert" : "status"}
      aria-live={error ? "assertive" : "polite"}
      style={{ "--toast-ms": `${ms}ms` }}
    >
      <span className="toast__icon" aria-hidden="true">
        <Icon size={20} strokeWidth={1.75} />
      </span>
      <div className="toast__body">
        <p className="toast__title">{toast.title}</p>
        <p className="toast__text">{toast.text}</p>
        {toast.action && (
          <a className="toast__action" href={toast.action.href}>
            {toast.action.label}
          </a>
        )}
      </div>
      <button type="button" className="toast__close" onClick={onClose} aria-label="Dismiss notification">
        <X size={16} strokeWidth={1.75} aria-hidden="true" />
      </button>
      <span className="toast__timer" aria-hidden="true" />
    </div>,
    container || document.body
  );
}

/** A toast describing what is wrong with a form, from its { field: message } errors. */
export function formErrorToast(errors) {
  const list = Object.values(errors);
  const n = list.length;
  return {
    id: Date.now(),
    tone: "error",
    title: n === 1 ? "One thing to fix" : `${n} things to fix`,
    text: n <= 2 ? list.join(" ") : `${list[0]} ${list[1]} And ${n - 2} more.`,
  };
}
