import { Link } from "react-router-dom";

/**
 * Official KY Creatives logo, used untouched (no recolouring, effects or stretching).
 * On dark grounds pass `card` so it sits on a white card, as the guidelines require.
 */
export default function Logo({ width = 148, card = false, linked = true, onClick, className = "" }) {
  const img = (
    <img
      src="/brand/ky-creatives-logo.png"
      width={285}
      height={79}
      alt="KY Creatives"
      decoding="async"
    />
  );
  const inner = card ? <span className="logo-card">{img}</span> : img;
  // Width is a custom property so a context (e.g. the condensed header) can resize it in CSS.
  const style = { "--logo-w": `${width}px` };
  if (!linked)
    return (
      <span className={`logo ${className}`} style={style}>
        {inner}
      </span>
    );
  return (
    <Link to="/" className={`logo ${className}`} style={style} aria-label="KY Creatives, home" onClick={onClick}>
      {inner}
    </Link>
  );
}
