import { usePageMeta } from "../hooks/usePageMeta";
import LegalLayout from "../components/ui/LegalLayout";
import { company } from "../data/site";

/*
  Sections 2 to 10 reproduce the "Terms and Conditions - Website Maintenance
  Plans" published on kycreatives.com, lightly edited for readability.
  Section 1 is a new, clearly marked draft covering general use of this website,
  for the company to review: no existing source covers it.
*/
const sections = [
  {
    id: "website-use",
    title: "Use of this website",
    draft: true,
    body: (
      <>
        <p>
          This website presents KY Creatives and its services. Content is provided for general information and may
          change without notice. Project screenshots show work for our clients; their names, brands and websites
          belong to them.
        </p>
        <p>
          Contacting us through this website does not create a contract. Any project is governed by a separate proposal
          or agreement between you and KY Creatives.
        </p>
      </>
    ),
  },
  {
    id: "scope",
    title: "Website maintenance plans",
    body: (
      <p>
        The following terms apply to the website maintenance plans offered by KY Creatives (&ldquo;Company&rdquo;,
        &ldquo;we&rdquo;, &ldquo;us&rdquo;). By purchasing and subscribing to a maintenance plan, you
        (&ldquo;Customer&rdquo;, &ldquo;you&rdquo;) agree to be bound by these terms.
      </p>
    ),
  },
  {
    id: "service",
    title: "Service description",
    body: (
      <ul>
        <li>
          Our maintenance plans provide ongoing support, updates and technical assistance for your website. The services
          in each plan are described on our website and may change.
        </li>
        <li>Maintenance plans do not cover website development or design services unless explicitly specified.</li>
      </ul>
    ),
  },
  {
    id: "billing",
    title: "Subscription and billing",
    body: (
      <ul>
        <li>By subscribing, you authorise us to charge the subscription fee to the payment method provided.</li>
        <li>Subscription fees are billed in advance on a recurring basis, as specified on our website.</li>
        <li>Late or missed payments may result in the suspension or termination of maintenance services.</li>
      </ul>
    ),
  },
  {
    id: "limitations",
    title: "Service limitations",
    body: (
      <ul>
        <li>
          Plans are designed for websites built on commonly used platforms and technologies. We may not be able to
          maintain websites using proprietary or custom-built systems.
        </li>
        <li>
          We work to keep your website secure and performing well, but we do not guarantee that maintenance will be
          error-free, uninterrupted or free from vulnerabilities.
        </li>
      </ul>
    ),
  },
  {
    id: "responsibilities",
    title: "Customer responsibilities",
    body: (
      <ul>
        <li>
          You are responsible for giving us accurate, current information about your website, including access to
          hosting, domain providers and any other necessary details.
        </li>
        <li>You agree to cooperate with us and respond promptly to requests related to the maintenance services.</li>
      </ul>
    ),
  },
  {
    id: "ip",
    title: "Intellectual property",
    body: (
      <ul>
        <li>
          Intellectual property in the maintenance services, including software, tools and documentation, remains the
          property of KY Creatives.
        </li>
        <li>You may not reproduce, distribute or modify our intellectual property without prior written consent.</li>
      </ul>
    ),
  },
  {
    id: "termination",
    title: "Termination",
    body: (
      <ul>
        <li>You may end your subscription at any time by notifying us in writing or through the cancellation process.</li>
        <li>
          We may suspend or terminate services without notice if these terms or applicable laws or regulations are
          violated.
        </li>
      </ul>
    ),
  },
  {
    id: "liability",
    title: "Limitation of liability",
    body: (
      <ul>
        <li>
          KY Creatives is not liable for any direct, indirect, incidental, consequential or punitive damages arising
          from the use of, or inability to use, the maintenance services.
        </li>
        <li>
          We are not responsible for damages, losses or liabilities caused by third parties, including hacking, cyber
          attacks or unauthorised access to your website.
        </li>
      </ul>
    ),
  },
  {
    id: "changes",
    title: "Changes and governing law",
    body: (
      <>
        <p>
          We may update these terms at any time. Changes take effect when posted on our website, and you are
          responsible for reviewing them regularly.
        </p>
        <p>
          These terms are governed by the laws applicable in Haryana, India, and disputes are subject to the courts of
          Haryana.
        </p>
      </>
    ),
  },
  {
    id: "contact",
    title: "Contact us",
    body: (
      <p>
        Questions about these terms: email <a href={`mailto:${company.email}`}>{company.email}</a> or call{" "}
        <a href={company.phoneHref}>{company.phoneDisplay}</a>.
      </p>
    ),
  },
];

export default function TermsAndConditions() {
  usePageMeta({
    title: "Terms & Conditions",
    description: "Terms for using the KY Creatives website and for KY Creatives website maintenance plans.",
  });
  return (
    <LegalLayout
      title="Terms & Conditions"
      lines={["Terms & Conditions"]}
      lead="Terms for using this website and for our website maintenance plans."
      notice={
        <p>
          <strong>For KY Creatives to review before launch.</strong> The maintenance plan terms are carried over from
          the current kycreatives.com website. The first section, on general use of this website, is a new draft marked
          for review. Project, payment and refund terms are not covered here and should be confirmed separately.
        </p>
      }
      sections={sections}
    />
  );
}
