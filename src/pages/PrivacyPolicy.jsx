import { usePageMeta } from "../hooks/usePageMeta";
import LegalLayout from "../components/ui/LegalLayout";
import { company } from "../data/site";

/*
  Content carried over from the Privacy Policy published on kycreatives.com,
  reorganised for readability. Wording is condensed but the substance is kept.
  The review notice lists points the company should confirm before launch.
*/
const sections = [
  {
    id: "introduction",
    title: "Introduction",
    body: (
      <>
        <p>
          This Privacy Policy describes our policies and procedures on the collection, use and disclosure of your
          information when you use this website, and tells you about your privacy rights and how the law protects you.
        </p>
        <p>
          We use your personal data to provide and improve the website. By using the website, you agree to the
          collection and use of information in accordance with this policy.
        </p>
      </>
    ),
  },
  {
    id: "definitions",
    title: "Interpretation and definitions",
    body: (
      <>
        <p>Key terms used in this policy have the meanings below.</p>
        <dl className="legal__dl">
          <dt>Company</dt>
          <dd>
            KY Creatives (also &ldquo;we&rdquo;, &ldquo;us&rdquo; or &ldquo;our&rdquo;), Tower A - 114, Ninex RMG,
            Sector 37C, Gurugram, Haryana, India.
          </dd>
          <dt>Cookies</dt>
          <dd>Small files placed on your device by a website, containing details of your browsing on that website.</dd>
          <dt>Country</dt>
          <dd>Haryana, India.</dd>
          <dt>Device</dt>
          <dd>Any device that can access the website, such as a computer, mobile phone or tablet.</dd>
          <dt>Personal data</dt>
          <dd>Any information that relates to an identified or identifiable individual.</dd>
          <dt>Service provider</dt>
          <dd>
            Any person or company that processes data on our behalf, to provide, operate or analyse the website for us.
          </dd>
          <dt>Usage data</dt>
          <dd>Data collected automatically when the website is used, such as the duration of a page visit.</dd>
          <dt>Website</dt>
          <dd>KY Creatives, accessible from https://kycreatives.com/</dd>
          <dt>You</dt>
          <dd>The individual using the website, or the company or legal entity on whose behalf they use it.</dd>
        </dl>
      </>
    ),
  },
  {
    id: "data-we-collect",
    title: "Data we collect",
    body: (
      <>
        <h3 className="legal__h3">Personal data</h3>
        <p>
          While you use the website, we may ask you to provide information that can be used to contact or identify you.
          This may include your email address, your first and last name, and your phone number.
        </p>
        <h3 className="legal__h3">Usage data</h3>
        <p>
          Usage data may be collected automatically. It may include your device&rsquo;s IP address, browser type and
          version, the pages you visit, the time and date of your visit, the time spent on those pages, unique device
          identifiers and other diagnostic data. When you use a mobile device, it may also include the type of device,
          its operating system and the type of mobile browser.
        </p>
      </>
    ),
  },
  {
    id: "cookies",
    title: "Cookies and tracking technologies",
    body: (
      <>
        <p>
          The policy published on our current website states that we may use cookies and similar technologies, such as
          web beacons, to track activity and store certain information. You can set your browser to refuse cookies or to
          warn you when a cookie is being sent. If you refuse cookies, some parts of the website may not work.
        </p>
        <p>The categories described are:</p>
        <ul>
          <li>
            <strong>Necessary cookies</strong> (session): needed to provide the website and its features.
          </li>
          <li>
            <strong>Cookie acceptance cookies</strong> (persistent): remember whether you have accepted cookies.
          </li>
          <li>
            <strong>Functionality cookies</strong> (persistent): remember choices such as language preferences.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "use-of-data",
    title: "How we use your personal data",
    body: (
      <>
        <p>We may use personal data to:</p>
        <ul>
          <li>provide, maintain and monitor the website;</li>
          <li>perform a contract for products or services you have bought or asked for;</li>
          <li>contact you by email, phone, SMS or similar about updates and services you asked about;</li>
          <li>
            send you news and information about similar services, unless you have opted out of receiving them;
          </li>
          <li>attend to and manage your requests;</li>
          <li>evaluate a merger, sale or similar transfer of our business, if that happens;</li>
          <li>analyse usage, measure campaigns and improve our website and services.</li>
        </ul>
        <p>
          We may share personal information with service providers, with affiliates and business partners, in
          connection with a business transfer, or with your consent.
        </p>
      </>
    ),
  },
  {
    id: "retention",
    title: "Retention and transfer",
    body: (
      <>
        <p>
          We keep personal data only as long as needed for the purposes in this policy, and as needed to meet legal
          obligations, resolve disputes and enforce our agreements. Usage data is generally kept for a shorter period,
          unless it is needed for security or to improve the website, or we are legally required to keep it longer.
        </p>
        <p>
          Your information may be processed in places outside your state or country, where data protection laws may
          differ. We take reasonable steps to ensure your data is handled securely and in line with this policy.
        </p>
      </>
    ),
  },
  {
    id: "your-rights",
    title: "Deleting your data",
    body: (
      <p>
        You have the right to ask us to delete personal data we hold about you, or to access or correct it. Contact us
        using the details below. We may need to keep some information where we have a legal obligation or lawful basis
        to do so.
      </p>
    ),
  },
  {
    id: "disclosure",
    title: "Disclosure of your data",
    body: (
      <>
        <p>
          If we are involved in a merger, acquisition or asset sale, your personal data may be transferred, and we will
          give notice before it becomes subject to a different policy. We may also disclose personal data where required
          by law or by valid requests from public authorities, or in good faith to:
        </p>
        <ul>
          <li>comply with a legal obligation;</li>
          <li>protect and defend our rights or property;</li>
          <li>prevent or investigate possible wrongdoing in connection with the website;</li>
          <li>protect the personal safety of users or the public;</li>
          <li>protect against legal liability.</li>
        </ul>
      </>
    ),
  },
  {
    id: "security",
    title: "Security",
    body: (
      <p>
        The security of your data matters to us, but no method of transmission over the internet or of electronic
        storage is completely secure. We use commercially acceptable means to protect your data but cannot guarantee
        its absolute security.
      </p>
    ),
  },
  {
    id: "children",
    title: "Children's privacy",
    body: (
      <p>
        The website is not directed at anyone under 13, and we do not knowingly collect personal data from children
        under 13. If you believe a child has given us personal data, contact us and we will take steps to remove it.
      </p>
    ),
  },
  {
    id: "other-sites",
    title: "Links to other websites",
    body: (
      <p>
        The website links to sites we do not operate, including client websites in our portfolio. We are not
        responsible for their content or privacy practices, and recommend you read their policies.
      </p>
    ),
  },
  {
    id: "changes",
    title: "Changes to this policy",
    body: (
      <p>
        We may update this policy from time to time. We will post the new policy on this page and let you know by email
        and/or a prominent notice on the website before the change takes effect, updating the &ldquo;last
        updated&rdquo; date. Please review this policy periodically.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact us",
    body: (
      <p>
        Questions about this policy: email <a href={`mailto:${company.email}`}>{company.email}</a> or call{" "}
        <a href={company.phoneHref}>{company.phoneDisplay}</a>.
      </p>
    ),
  },
];

export default function PrivacyPolicy() {
  usePageMeta({
    title: "Privacy Policy",
    description: "How KY Creatives collects, uses and protects personal data when you use this website.",
  });
  return (
    <LegalLayout
      title="Privacy Policy"
      lines={["Privacy Policy"]}
      lead="How we collect, use and protect personal information when you use this website."
      notice={
        <>
          <p>
            <strong>For KY Creatives to review before launch.</strong> This text is carried over from the Privacy Policy
            on the current kycreatives.com website, reorganised for readability. Please confirm it still reflects your
            practices and add an effective date.
          </p>
          <p>
            Note for review: this rebuilt site has no user accounts, does not set cookies of its own and uses no
            analytics. Its contact form opens the visitor&rsquo;s own email app and does not store or send data. It
            keeps one small session flag in the browser so the opening animation is not repeated.
          </p>
        </>
      }
      sections={sections}
    />
  );
}
