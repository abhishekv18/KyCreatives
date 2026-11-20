import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight, Check } from "lucide-react";
import { usePageMeta } from "../hooks/usePageMeta";
import PageHero from "../components/ui/PageHero";
import SplitHeading from "../components/ui/SplitHeading";
import QuickEnquiry from "../components/ui/QuickEnquiry";
import PartnersStrip from "../components/ui/PartnersStrip";
import ContactCTA from "../components/ui/ContactCTA";
import { Glow, Orbits } from "../components/art/Art";
import { apps, designs } from "../data/apps";
import { gsap, prefersReducedMotion } from "../lib/motion";

/** A slim phone frame around a real app screen. */
function Phone({ src, alt = "", className = "", eager = false }) {
  return (
    <div className={`aphone ${className}`}>
      <div className="aphone__screen">
        <img src={src} alt={alt} width="390" height="792" loading={eager ? "eager" : "lazy"} decoding="async" />
      </div>
    </div>
  );
}

/* Hero: MaaCubs up front with a second of its screens, Achievam beside it */
function HeroPhones() {
  const byApp = Object.fromEntries(apps.map((a) => [a.slug, a]));
  const set = [byApp.maacubs?.screens[0], byApp.maacubs?.screens[1], byApp.achievam?.screens[0]].filter(Boolean);
  return (
    <div className="ahphones" aria-hidden="true">
      {set.map((src, k) => (
        <Phone key={src} src={src} className={`ahphones__p ahphones__p--${k + 1}`} eager />
      ))}
      {byApp.maacubs && (
        <p className="ahphones__tag ahphones__tag--a" style={{ "--c": byApp.maacubs.accent }}>
          <i />
          MaaCubs <span>Healthcare</span>
        </p>
      )}
      {byApp.achievam && (
        <p className="ahphones__tag ahphones__tag--b" style={{ "--c": byApp.achievam.accent }}>
          <i />
          Achievam <span>Exam prep</span>
        </p>
      )}
    </div>
  );
}

/*
  One app per band: its name and story across the top, every screen laid out
  side by side below in matching phones, then what we built in a ruled row.
  The row of phones drifts sideways as the band scrolls past.
*/
function AppCase({ app, index }) {
  const ref = useRef(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.fromTo(
        ".acase__phones",
        { xPercent: 3 },
        { xPercent: -3, ease: "none", scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: 1 } }
      );
    },
    { scope: ref }
  );

  return (
    <section
      className={`acase acase--${index % 2 ? "b" : "a"}`}
      ref={ref}
      style={{ "--app": app.accent, "--app-tint": app.tint }}
      data-tone="light"
      aria-labelledby={`acase-${app.slug}`}
    >
      <div className="container">
        <div className="acase__head">
          <div className="acase__id">
            <p className="acase__index t-meta">
              <span>{String(index + 1).padStart(2, "0")}</span>
              {app.kind}
            </p>
            <h2 id={`acase-${app.slug}`} className="acase__name">
              {app.name}
            </h2>
            <p className="acase__sector">{app.sector}</p>
          </div>
          <div className="acase__about">
            <p className="acase__summary">{app.summary}</p>
            <div className="acase__foot">
              <ul role="list" className="acase__chips">
                {app.platforms.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
              <a className="acase__link" href={app.link.href} target="_blank" rel="noopener noreferrer">
                {app.link.label}
                <ArrowUpRight size={18} strokeWidth={1.75} aria-hidden="true" />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="acase__rail">
        <ul role="list" className="acase__phones" data-stagger="" aria-label={`${app.name} screens`}>
          {app.screens.map((src, k) => (
            <li key={src}>
              <Phone src={src} alt={`${app.name} app, screen ${k + 1}`} />
            </li>
          ))}
        </ul>
      </div>

      <div className="container">
        <ul role="list" className="acase__built" data-stagger="">
          {app.built.map((b) => (
            <li key={b}>
              <Check size={16} strokeWidth={2} aria-hidden="true" />
              {b}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* Product design: frames from a Figma file, set like boards on a desk */
function DesignCase({ design }) {
  return (
    <section className="adesign" data-tone="dark" aria-labelledby={`ad-${design.slug}`}>
      <div className="container">
        <div className="adesign__head">
          <p className="kicker kicker--aqua t-meta">Product design</p>
          <h2 id={`ad-${design.slug}`} className="adesign__title">
            {design.name}
          </h2>
          <p className="adesign__lead">{design.summary}</p>
        </div>
        <ul role="list" className="adesign__frames" data-stagger="">
          {design.frames.map((src, k) => (
            <li key={src} className={`adesign__frame adesign__frame--${k + 1}`}>
              <img src={src} alt={`${design.name} design, frame ${k + 1}`} loading="lazy" decoding="async" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default function Apps() {
  usePageMeta({
    title: "Applications and Software",
    description: "Mobile apps designed and built by KY Creatives: healthcare and exam preparation apps for Android, shown screen by screen.",
  });

  return (
    <>
      <PageHero
        theme="ink"
        kicker="Portfolio / Applications and Software"
        kickerTone="aqua"
        lines={["Apps people", "keep on their phone."]}
        lead="Healthcare, learning and everyday services, designed and engineered by the same team. Every screen here is from an app in use."
        art={
          <>
            <Glow />
            <Orbits />
          </>
        }
        aside={<HeroPhones />}
        className="phero--apps"
      >
        <ul role="list" className="afacts t-meta" data-reveal="up" data-delay="0.3">
          <li>
            <span>Platforms</span>
            Android and iOS
          </li>
          <li>
            <span>Scope</span>
            Design to store release
          </li>
          <li>
            <span>Team</span>
            One, start to finish
          </li>
        </ul>
      </PageHero>

      <div className="aintro">
        <div className="container aintro__inner">
          <SplitHeading as="h2" className="aintro__title" lines={["Real screens,", "from apps in use."]} />
          <p className="aintro__lead" data-reveal="up">
            Each app below is shown screen by screen, as its users see it, with the features we designed and built.
          </p>
        </div>
      </div>

      {apps.map((a, k) => (
        <AppCase key={a.slug} app={a} index={k} />
      ))}

      {designs.map((d) => (
        <DesignCase key={d.slug} design={d} />
      ))}

      <QuickEnquiry
        source="Portfolio: Applications"
        kicker="Start your app"
        lines={["Have an app in mind?", "Let's build it right."]}
        lead="Tell us who the app is for and what it needs to do. We reply within 24 hours on business days."
        theme="mobile"
        interest="Mobile application"
      />
      <PartnersStrip />
      <ContactCTA lines={["Your app could", "be the next one."]} />
    </>
  );
}
