// Founding Partner Program: the content of the /partners page, taken from the
// "Partners page main content" blueprint. Figures are illustrative and the
// commission terms are the proposed terms; the partner agreement governs.

export const TIERS = [
  { min: 1, max: 1, rate: 0.1, label: "1 project", note: "Entry tier for the first closed project in the month." },
  { min: 2, max: 2, rate: 0.12, label: "2 projects", note: "A higher rate when two eligible projects close in the month." },
  { min: 3, max: Infinity, rate: 0.15, label: "3 or more", note: "Top tier for three or more eligible projects in the month." },
];

/** The tier for a number of projects closed in one calendar month. */
export const tierFor = (n) => TIERS.find((t) => n >= t.min && n <= t.max) || TIERS[0];

// Proposed recurring commission on maintenance or retainer fees
export const RECURRING = { rate: 0.05, months: 12 };

export const REPRESENT = [
  ["Websites", "Company sites, landing pages and content-managed sites."],
  ["Web applications", "Dashboards, portals and tools that run in the browser."],
  ["Mobile apps", "Android and iOS apps, from first design to store release."],
  ["SaaS", "Subscription products, built and grown with the founders."],
  ["Custom software", "Internal systems shaped around how a business works."],
];

export const STEPS = [
  ["Find the right business", "Spot a company that needs a website, app or software, and start the conversation."],
  ["Register the lead", "Send us the company's details so the opportunity is recorded under your name."],
  ["Qualify the need", "Confirm with the client what they want to build, the timeline and the budget range."],
  ["Book a discovery meeting", "Bring the client to a call with our team. You stay on the call."],
  ["Build the proposal with our team", "We scope the work, estimate it and write the proposal with you."],
  ["Support the close", "You keep the relationship moving; we answer the technical questions."],
  ["Earn as client payments arrive", "Your commission is calculated on each eligible payment the client makes."],
];

export const ROLES = {
  you: ["Prospecting and outreach", "Qualifying the client's need", "Booking discovery meetings", "Staying close to the client through the close"],
  us: ["Technical discovery", "Estimates and scoping", "Written proposals", "Design, development and delivery", "Ongoing client support"],
};

export const PAYMENT = [
  ["Tied to cleared payments", "Commission is earned when the client's payment for an eligible project has cleared, not when the contract is signed."],
  ["A statement every month", "Each month you receive a statement listing every eligible payment received and the commission it earned."],
  ["Paid in a set window", "Commission is paid out within the payment window set in your partner agreement, by bank transfer."],
];

export const REWARDS = [
  ["Quarterly recognition", "The partners who bring in the most eligible business each quarter are recognised across the team."],
  ["Milestone rewards", "Rewards when you reach set milestones in closed projects or collected revenue."],
  ["Room to grow", "Strong partners are considered first for future full-time roles as the international team grows."],
];

export const FIT = [
  "You are comfortable starting conversations with businesses you have not met.",
  "You understand what a business needs before you suggest a solution.",
  "You communicate confidently in English, written and spoken.",
  "You want to build an international client pipeline of your own.",
  "Experience in sales, business development, consulting or an agency helps.",
];

export const FAQS = [
  {
    q: "Do I need a technical background?",
    a: "No. You find and develop the opportunity; our team leads technical discovery, scoping, estimates and the proposal. It helps to understand the difference between a website, a web app and a mobile app, and we brief you on that when you join.",
  },
  {
    q: "What counts as eligible net project revenue?",
    a: "The amount the client pays us for the project's design and development work, after taxes, payment fees, refunds and third-party costs passed through to the client (such as paid plugins, hosting or ad spend). The partner agreement sets out the full list.",
  },
  {
    q: "How is my tier worked out?",
    a: "By the number of eligible projects that close in one calendar month. One project earns 10%, two earn 12% and three or more earn 15%, and the month's tier applies to each of those projects.",
  },
  {
    q: "When do I get paid?",
    a: "Commission follows the client's payments. When a payment for an eligible project clears, the commission on it appears on that month's statement and is paid within the payment window in your agreement.",
  },
  {
    q: "What if a client pays in instalments?",
    a: "You earn on each instalment as it clears, at the tier the project closed at. If a client stops paying, commission stops on the unpaid part.",
  },
  {
    q: "Is there a fee to join, or a target I must hit?",
    a: "There is no fee to join. There are no penalties for a quiet month, though we review the founding cohort regularly to keep it active.",
  },
  {
    q: "Can I work from any country?",
    a: "Yes. The program is built for partners who can reach businesses internationally. You need to be able to receive international bank transfers.",
  },
  {
    q: "How many partners are you accepting?",
    a: "Six to seven for the founding cohort. Applications are reviewed in the order they arrive, and the cohort closes when it is full.",
  },
];
