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
      style={{ width, height: "auto" }}
      decoding="async"
    />
  );
  const inner = card ? <span className="logo-card">{img}</span> : img;
  if (!linked) return <span className={`logo ${className}`}>{inner}</span>;
  return (
    <Link to="/" className={`logo ${className}`} aria-label="KY Creatives, home" onClick={onClick}>
      {inner}
    </Link>
  );
}
