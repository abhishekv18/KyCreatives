import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import SplitHeading from "../../components/ui/SplitHeading";
import ServiceVisual from "../../components/visuals/ServiceVisual";
import { services } from "../../data/services";
import { serviceIcons, serviceStage } from "../../components/ui/serviceIcons";

export default function ServicesIndex() {
  const [active, setActive] = useState(services[0].slug);

  return (
    <section className="svcx" data-tone="light" aria-labelledby="svcx-title">
      <div className="container">
        <div className="svcx__head">
          <p className="kicker kicker--dusk t-meta">Services</p>
          <div id="svcx-title">
            <SplitHeading as="h2" className="svcx__title" lines={["Six ways", "we can help."]} />
          </div>
          <p className="t-lead" data-reveal="up">
            One team for strategy, design, engineering and growth. Start with the one you need now; the rest are there
            when you are ready.
          </p>
        </div>

        <div className="svcx__grid">
          <ol role="list" className="svcx__list">
            {services.map((s, i) => {
              const Icon = serviceIcons[s.slug];
              const on = active === s.slug;
              return (
                <li key={s.slug} className={`svcx__item ${on ? "is-active" : ""}`} data-stage={serviceStage[s.slug]}>
                  <Link
                    to={s.path}
                    className="svcx__link"
                    onPointerEnter={() => setActive(s.slug)}
                    onFocus={() => setActive(s.slug)}
                  >
                    <span className="svcx__num t-meta" aria-hidden="true">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="svcx__name">
                      {s.name}
                      {s.slug === "d2c" && <span className="svcx__focus t-meta">Focus area</span>}
                    </span>
                    <span className="svcx__desc">{s.index}</span>
                    <span className="svcx__go" aria-hidden="true">
                      <Icon size={20} strokeWidth={1.5} />
                      <ArrowUpRight size={20} strokeWidth={1.5} />
                    </span>
                  </Link>
                  {/* On touch screens every service shows its own visual inline. */}
                  <div className={`svcx__inline stage stage--${serviceStage[s.slug]}`} aria-hidden="true">
                    <ServiceVisual slug={s.slug} compact />
                  </div>
                </li>
              );
            })}
          </ol>

          <div className="svcx__stage-wrap" aria-hidden="true">
            <div className="svcx__stage">
              {services.map((s) => (
                <div key={s.slug} className={`svcx__panel stage stage--${serviceStage[s.slug]} ${active === s.slug ? "is-on" : ""}`}>
                  <ServiceVisual slug={s.slug} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
