import { Link } from "react-router-dom";

/**
 * KY Creatives logo: the official flame mark with the wordmark set as live
 * text in the brand serif. "KY" carries the Flame gradient and "Creatives"
 * takes the surrounding text colour, so the logo stays sharp at any size and
 * reads clearly on light, dark and colour fields without a backing plate.
 * `size` is the wordmark's font size in px; the mark scales with it.
 */
export default function Logo({ size = 22, linked = true, onClick, className = "" }) {
  const inner = (
    <>
      <img className="logo__mark" src="/brand/ky-flame.png" width="245" height="358" alt="" decoding="async" />
      <span className="logo__word" aria-hidden="true">
        <b>KY</b> Creatives
      </span>
    </>
  );
  const style = { "--logo-size": `${size}px` };
  if (!linked)
    return (
      <span className={`logo ${className}`} style={style} role="img" aria-label="KY Creatives">
        {inner}
      </span>
    );
  return (
    <Link to="/" className={`logo ${className}`} style={style} aria-label="KY Creatives, home" onClick={onClick}>
      {inner}
    </Link>
  );
}
