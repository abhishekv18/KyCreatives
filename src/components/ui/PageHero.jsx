import SplitHeading from "./SplitHeading";

const DARK = new Set(["ink", "violet", "dusk"]);

/**
 * Opening section for inner pages. Each page chooses a colour field (theme)
 * and may add background artwork (art) and a centrepiece (aside).
 * Text colour follows the guideline pairings: White on Ink, Violet and Dusk,
 * Ink on Flame, Orange, Cyan, Cobalt and Cloud.
 */
export default function PageHero({
  kicker,
  kickerTone,
  lines,
  lead,
  aside,
  art,
  children,
  theme = "cloud",
  className = "",
}) {
  const dark = DARK.has(theme);
  return (
    <section
      className={`phero phero--${theme} ${dark ? "on-dark" : ""} ${theme !== "cloud" ? "grain" : ""} ${
        aside ? "phero--split" : ""
      } ${className}`}
      data-tone={dark ? "dark" : theme === "cloud" ? "light" : "color"}
    >
      {art && (
        <div className="phero__art" aria-hidden="true">
          {art}
        </div>
      )}
      <div className="container phero__grid">
        <div className="phero__copy">
          {kicker && <p className={`kicker ${kickerTone ? `kicker--${kickerTone}` : ""} t-meta`}>{kicker}</p>}
          <SplitHeading as="h1" className="phero__title" lines={lines} />
          {lead && (
            <p className="t-lead phero__lead" data-reveal="up" data-delay="0.2">
              {lead}
            </p>
          )}
          {children}
        </div>
        {aside && <div className="phero__aside">{aside}</div>}
      </div>
    </section>
  );
}
