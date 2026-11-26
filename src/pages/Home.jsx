import { usePageMeta } from "../hooks/usePageMeta";
import Hero from "./home/Hero";
import Manifesto from "./home/Manifesto";
import ClientBand from "./home/ClientBand";
import Positioning from "./home/Positioning";
import Work from "./home/Work";
import ServicesIndex from "./home/ServicesIndex";
import TechPartners from "./home/TechPartners";
import Process from "./home/Process";
import Testimonials from "./home/Testimonials";
import Partners from "./home/Partners";
import MarketingPartner from "./home/MarketingPartner";
import ContactCTA from "../components/ui/ContactCTA";

/*
  Colour rhythm of the homepage, as chapters of rising intensity:
  Ink hero -> White studio sheet with the client names -> partners and Ink work
  -> Cloud services with colour stages -> Violet process -> Cloud quotes and
  principles -> Flame CTA -> Ink footer.
*/
export default function Home() {
  usePageMeta({
    title: null,
    description:
      "KY Creatives designs and develops e-commerce platforms, mobile applications and custom software for businesses worldwide. Discuss your next digital project with our team.",
  });

  return (
    <>
      {/* The hero holds still while the manifesto sheet slides over it. */}
      <div className="opening">
        <Hero />
        <Manifesto />
        <ClientBand />
      </div>
      <TechPartners />
      <Work />
      <ServicesIndex />
      <Process />
      <Testimonials />
      <Partners />
      <Positioning />
      <MarketingPartner />
      <ContactCTA />
    </>
  );
}
