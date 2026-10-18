import { AlertTriangle } from "lucide-react";
import PageHero from "./PageHero";

/**
 * Readable long-form layout for policies: a sticky contents list on wide
 * screens and a comfortable measure for the text. `notice` is shown above the
 * content when the text needs review by the company.
 */
export default function LegalLayout({ title, lines, lead, notice, sections }) {
  return (
    <>
      <PageHero kicker={title} lines={lines} lead={lead} className="phero--legal" />
      <section className="legal section" data-tone="light" aria-label={title}>
        <div className="container legal__grid">
          <nav className="legal__toc" aria-label="On this page">
            <p className="t-label">On this page</p>
            <ol>
              {sections.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`}>{s.title}</a>
                </li>
              ))}
            </ol>
          </nav>
          <article className="legal__body">
            {notice && (
              <div className="legal__notice" role="note">
                <AlertTriangle size={20} strokeWidth={1.75} aria-hidden="true" />
                <div>{notice}</div>
              </div>
            )}
            {sections.map((s) => (
              <section key={s.id} id={s.id} className="legal__section" aria-labelledby={`${s.id}-h`}>
                <h2 id={`${s.id}-h`} className="legal__h">
                  {s.title}
                  {s.draft && <span className="legal__draft t-meta">Draft for review</span>}
                </h2>
                {s.body}
              </section>
            ))}
          </article>
        </div>
      </section>
    </>
  );
}
