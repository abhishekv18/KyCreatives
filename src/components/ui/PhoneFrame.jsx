import { useState } from "react";

/** A plain phone outline for real mobile screenshots. Falls back to a label if the image fails. */
export default function PhoneFrame({ src, alt, label, className = "", loading = "lazy" }) {
  const [failed, setFailed] = useState(false);
  return (
    <figure className={`phone ${className}`}>
      <div className="phone__body">
        <div className="phone__screen">
          {failed ? (
            <span className="phone__fallback t-meta">{label || "Preview unavailable"}</span>
          ) : (
            <img src={src} alt={alt} loading={loading} decoding="async" width="390" height="844" onError={() => setFailed(true)} />
          )}
        </div>
      </div>
      {label && <figcaption className="phone__label t-meta">{label}</figcaption>}
    </figure>
  );
}
