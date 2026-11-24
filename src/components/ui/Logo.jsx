import { Link } from "react-router-dom";

/**
 * KY Creatives logo: the original artwork (flame mark with the gradient
 * wordmark), as used on kycreatives.com. `size` sets its scale: the logo
 * is drawn at about 1.75x that height.
 */
export default function Logo({ size = 22, linked = true, onClick, className = "" }) {
  // the original KY Creatives logo: flame mark and gradient wordmark
  const inner = <img className="logo__img" src="/brand/ky-creatives-logo.png" width="285" height="79" alt="" decoding="async" />;
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
