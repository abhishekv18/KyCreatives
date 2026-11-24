import { useState } from "react";

/**
 * A realistic iPhone for real mobile screenshots: titanium frame, black
 * bezel, Dynamic Island, side buttons, status bar and a soft glass sheen.
 * Sized in container units, so it reads correctly at any width.
 * Falls back to a label if the image fails.
 */
export default function PhoneFrame({ src, alt, label, className = "", loading = "lazy" }) {
  const [failed, setFailed] = useState(false);
  return (
    <figure className={`phone iphone ${className}`}>
      <div className="iphone__device">
        <span className="iphone__btn iphone__btn--action" aria-hidden="true" />
        <span className="iphone__btn iphone__btn--up" aria-hidden="true" />
        <span className="iphone__btn iphone__btn--down" aria-hidden="true" />
        <span className="iphone__btn iphone__btn--power" aria-hidden="true" />
        <div className="iphone__frame">
          <div className="iphone__bezel">
            <div className="iphone__screen">
              <div className="iphone__status" aria-hidden="true">
                <span className="iphone__time">9:41</span>
                <span className="iphone__island" />
                <span className="iphone__icons">
                  <svg viewBox="0 0 18 12">
                    <rect x="0" y="8" width="3" height="4" rx="0.8" />
                    <rect x="5" y="5.5" width="3" height="6.5" rx="0.8" />
                    <rect x="10" y="3" width="3" height="9" rx="0.8" />
                    <rect x="15" y="0" width="3" height="12" rx="0.8" />
                  </svg>
                  <svg viewBox="0 0 16 12">
                    <path d="M8 2.2c2.3 0 4.4.9 6 2.4l1.2-1.3C13.3 1.5 10.8.4 8 .4S2.7 1.5.8 3.3L2 4.6c1.6-1.5 3.7-2.4 6-2.4Zm0 3.6c1.4 0 2.7.5 3.6 1.4l1.2-1.3C11.5 4.7 9.8 4 8 4s-3.5.7-4.8 1.9l1.2 1.3c1-.9 2.2-1.4 3.6-1.4Zm0 3.6c.5 0 1 .2 1.3.5L8 11.4 6.7 9.9c.3-.3.8-.5 1.3-.5Z" />
                  </svg>
                  <span className="iphone__battery">
                    <i />
                  </span>
                </span>
              </div>
              <div className="iphone__view">
                {failed ? (
                  <span className="phone__fallback t-meta">{label || "Preview unavailable"}</span>
                ) : (
                  <img src={src} alt={alt} loading={loading} decoding="async" width="390" height="844" onError={() => setFailed(true)} />
                )}
              </div>
              <span className="iphone__home" aria-hidden="true" />
              <span className="iphone__glass" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>
      {label && <figcaption className="phone__label t-meta">{label}</figcaption>}
    </figure>
  );
}
