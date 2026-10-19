import { usePageMeta } from "../hooks/usePageMeta";
import Hero from "./home/Hero";
import Manifesto from "./home/Manifesto";
import ClientBand from "./home/ClientBand";
import Positioning from "./home/Positioning";
import Work from "./home/Work";
import ServicesIndex from "./home/ServicesIndex";
import Process from "./home/Process";
import Testimonials from "./home/Testimonials";
import Partners from "./home/Partners";
import ContactCTA from "../components/ui/ContactCTA";

/*
  Colour rhythm of the homepage, as chapters of rising intensity:
  Ink hero -> Cloud band and studio -> Ink work -> Cloud services with
  colour stages -> Violet process -> Cloud quotes -> Flame CTA -> Ink footer.
*/
export default function Home() {
  usePageMeta({
    title: null,
    description:
      "KY Creatives is a design-led studio building software, web apps and mobile apps for businesses worldwide, with a special focus on D2C brands.",
  });

  return (
    <>
      {/* The hero holds still while the manifesto sheet slides over it. */}
      <div className="opening">
        <Hero />
        <Manifesto />
      </div>
      <ClientBand />
      <Positioning />
      <Work />
      <ServicesIndex />
      <Process />
      <Testimonials />
      <Partners />
      <ContactCTA />
    </>
  );
}
