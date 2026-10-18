import { useId, useState } from "react";
import { Plus } from "lucide-react";

/** Accessible accordion: real buttons, aria-expanded, region labelled by its question. */
export default function Faq({ items }) {
  const [open, setOpen] = useState(0);
  const base = useId();
  return (
    <div className="faq">
      {items.map((item, i) => {
        const isOpen = open === i;
        const qid = `${base}-q${i}`;
        const aid = `${base}-a${i}`;
        return (
          <div className={`faq__item ${isOpen ? "is-open" : ""}`} key={item.q}>
            <h3 className="faq__q">
              <button id={qid} aria-expanded={isOpen} aria-controls={aid} onClick={() => setOpen(isOpen ? -1 : i)}>
                <span>{item.q}</span>
                <Plus className="faq__icon" size={22} strokeWidth={1.5} aria-hidden="true" />
              </button>
            </h3>
            <div id={aid} role="region" aria-labelledby={qid} className="faq__a" hidden={!isOpen}>
              <p>{item.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
