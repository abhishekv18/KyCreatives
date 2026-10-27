import { useEffect } from "react";
import { createPortal } from "react-dom";
import { CheckCircle2, AlertCircle, X } from "lucide-react";

/**
 * A single toast, rendered into <body> so no page transform can displace it.
 * Success toasts close themselves after `duration`; the thin line along the
 * foot shows the time left. Errors stay until dismissed.
 */
export default function Toast({ toast, onClose, duration = 6000 }) {
  useEffect(() => {
    if (!toast || toast.tone === "error") return;
    const t = setTimeout(onClose, duration);
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

  return createPortal(
    <div
      key={toast.id}
      className={`toast ${error ? "toast--error" : "toast--success"}`}
      role={error ? "alert" : "status"}
      aria-live={error ? "assertive" : "polite"}
      style={{ "--toast-ms": `${duration}ms` }}
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
      {!error && <span className="toast__timer" aria-hidden="true" />}
    </div>,
    document.body
  );
}
