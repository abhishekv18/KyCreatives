import { useState } from "react";

/**
 * A quiet browser window used to present real client sites.
 * Image dimensions are reserved through aspect-ratio to avoid layout shift,
 * and a failed image falls back to a labelled placeholder.
 */
export default function BrowserFrame({
  domain,
  src,
  srcSet,
  sizes = "(min-width: 900px) 50vw, 100vw",
  alt,
  ratio = "4 / 5",
  loading = "lazy",
  fetchPriority,
  scrollable = false,
  className = "",
  imgProps = {},
}) {
  const [failed, setFailed] = useState(false);
  return (
    <figure className={`browser ${scrollable ? "browser--scroll" : ""} ${className}`}>
      <div className="browser__bar" aria-hidden="true">
        <span className="browser__dots">
          <i />
          <i />
          <i />
        </span>
        {domain && <span className="browser__url t-meta">{domain}</span>}
      </div>
      <div className="browser__view" style={{ aspectRatio: ratio }}>
        {failed ? (
          <div className="browser__fallback t-meta">{domain || "Preview unavailable"}</div>
        ) : (
          <img
            src={src}
            srcSet={srcSet}
            sizes={srcSet ? sizes : undefined}
            alt={alt}
            loading={loading}
            decoding="async"
            fetchPriority={fetchPriority}
            onError={() => setFailed(true)}
            {...imgProps}
          />
        )}
      </div>
    </figure>
  );
}
