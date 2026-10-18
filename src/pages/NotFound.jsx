import { usePageMeta } from "../hooks/usePageMeta";
import PageHero from "../components/ui/PageHero";
import Button from "../components/ui/Button";
import { Ribbons } from "../components/art/Art";

export default function NotFound() {
  usePageMeta({ title: "Page not found", description: "This page does not exist on the KY Creatives website." });
  return (
    <PageHero
      theme="ink"
      art={<Ribbons set="footer" />}
      kicker="404"
      lines={["This page", "does not exist."]}
      lead="The link may be old or mistyped. Start again from the home page, or tell us what you were looking for."
    >
      <div className="phero__actions" data-reveal="up" data-delay="0.3">
        <Button to="/" variant="flame">Go to the home page</Button>
        <Button to="/contact" variant="ghost">
          Contact us
        </Button>
      </div>
    </PageHero>
  );
}
