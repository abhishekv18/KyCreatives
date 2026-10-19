import { Link } from "react-router-dom";
import { usePageMeta } from "../hooks/usePageMeta";
import LegalLayout from "../components/ui/LegalLayout";
import { company } from "../data/site";

/*
  Content carried over from "Refund & Cancellation Policy - Website Maintenance
  Plans" on kycreatives.com (/refund_returns/), lightly edited for readability.
  The figures in the summary are the ones stated in that policy.
*/
const FACTS = [
  ["30 days", "to request a refund of the subscription fee after your first purchase"],
  ["7 business days", "to process a refund once it is approved"],
  ["Original method", "refunds are paid back to the payment method you used"],
];

const sections = [
  {
    id: "overview",
    title: "Overview",
    body: (
      <>
        <p>
          Thank you for choosing a KY Creatives website maintenance plan. We work to keep your website running smoothly,
          and we understand that circumstances may change. This policy explains how you can cancel a plan and when a
          refund applies.
        </p>
        <dl className="legal__facts">
          {FACTS.map(([k, v]) => (
            <div key={k}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
      </>
    ),
  },
  {
    id: "cancellation",
    title: "Cancelling a maintenance plan",
    body: (
      <ul>
        <li>You can cancel your website maintenance plan at any time by contacting our support team.</li>
        <li>On cancellation, any unused portion of your subscription fee is not refunded.</li>
        <li>Cancelling the plan ends the associated services and benefits.</li>
      </ul>
    ),
  },
  {
    id: "refunds",
    title: "Refunds",
    body: (
      <ul>
        <li>We offer a refund of the subscription fee within the first 30 days of your initial purchase.</li>
        <li>
          To request one, contact our support team within that period with your purchase details and the reason for the
          request.
        </li>
        <li>Refunds are processed within 7 business days after approval.</li>
        <li>Refunds are issued to the original payment method used for the purchase.</li>
      </ul>
    ),
  },
  {
    id: "exclusions",
    title: "Exclusions",
    body: (
      <ul>
        <li>
          This policy does not cover additional services or products bought together with the website maintenance plan.
        </li>
        <li>
          No refunds are given for domain registrations, hosting, third-party software licences or any other service not
          directly included in the maintenance plan.
        </li>
      </ul>
    ),
  },
  {
    id: "changes",
    title: "Changes to the plan",
    body: (
      <ul>
        <li>We may modify or discontinue any part of the website maintenance plan without prior notice.</li>
        <li>
          If we do, you receive a prorated refund for any unused portion of your subscription fee, calculated from the
          date of the change.
        </li>
      </ul>
    ),
  },
  {
    id: "responsibilities",
    title: "Your responsibilities",
    body: (
      <ul>
        <li>
          Please provide accurate, up-to-date information about your website and any access credentials we need.
        </li>
        <li>
          Missing information or cooperation can affect our ability to carry out the maintenance and may affect
          eligibility for a refund.
        </li>
      </ul>
    ),
  },
  {
    id: "scope",
    title: "What this policy covers",
    body: (
      <p>
        This policy applies only to our website maintenance plans. It does not cover other services or products offered
        on our website. See also our <Link to="/terms-and-conditions">Terms &amp; Conditions</Link>.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact us",
    body: (
      <p>
        Questions about cancellations or refunds: email <a href={`mailto:${company.email}`}>{company.email}</a> or call{" "}
        <a href={company.phoneHref}>{company.phoneDisplay}</a>.
      </p>
    ),
  },
];

export default function RefundsAndCancellation() {
  usePageMeta({
    title: "Refunds & Cancellation",
    description: "How to cancel a KY Creatives website maintenance plan, and when a refund applies.",
  });
  return (
    <LegalLayout
      title="Refunds & Cancellation"
      lines={["Refunds &", "Cancellation"]}
      lead="How to cancel a website maintenance plan, and when a refund applies."
      notice={
        <p>
          <strong>For KY Creatives to review before launch.</strong> This policy is carried over from the current
          kycreatives.com website and covers website maintenance plans only. Refund terms for project work are not
          covered here and should be confirmed separately.
        </p>
      }
      sections={sections}
    />
  );
}
