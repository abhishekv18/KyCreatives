/**
 * A heading set as explicit lines, so line breaks are art-directed rather than
 * left to chance, and each line can rise into view. Screen readers get the
 * full sentence once via aria-label.
 */
export default function SplitHeading({ as: Tag = "h2", lines, className = "", manual = false, delay }) {
  const text = lines.join(" ");
  return (
    <Tag
      className={className}
      aria-label={text}
      {...(manual ? { "data-reveal-manual": "" } : { "data-split": "" })}
      {...(delay ? { "data-delay": delay } : {})}
    >
      {lines.map((line, i) => (
        <span className="split-line" aria-hidden="true" key={i}>
          <span>{line}</span>
        </span>
      ))}
    </Tag>
  );
}
