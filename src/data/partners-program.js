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

// Recurring commission on maintenance fees: not published. The calculator
// option that uses it stays hidden (SHOW_MAINTENANCE in Partners.jsx).
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
  ["Book a discovery meeting", "Bring the client to a call with our team. You stay on the call."],
  ["Support the close", "You keep the relationship moving; we answer the technical questions."],
  ["Earn your commission", "10% to 15% of the eligible project value, by your monthly tier, paid in USD."],
];

export const ROLES = {
  you: ["Prospecting and outreach", "Qualifying the client's need", "Booking discovery meetings", "Staying close to the client through the close"],
  us: ["Technical discovery", "Estimates and scoping", "Written proposals", "Design, development and delivery", "Ongoing client support"],
};

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
  "You can work independently and keep your own pipeline moving.",
];

export const FAQS = [
  {
    q: "Is this a salaried job?",
    a: "No. It is an independent, commission-based partnership. There is no fixed salary or guaranteed income.",
  },
  {
    q: "Where can partners be based?",
    a: "The founding cohort is open to professionals based in India.",
  },
  {
    q: "Which clients will I target?",
    a: "Businesses in the US, UK, Canada, Australia, the UAE and Western Europe.",
  },
  {
    q: "Do I need technical skills?",
    a: "No. You need to understand what a business needs and communicate confidently. Our team handles technical discovery, scoping, estimates and delivery.",
  },
  {
    q: "How much can I earn?",
    a: "It depends on how many projects close in a month and their eligible value: 10% for one project, 12% for two and 15% for three or more. Earnings are not guaranteed.",
  },
  {
    q: "How are my leads protected?",
    a: "Each lead we accept is registered to you for 12 months, subject to activity, verification and duplicate-lead rules.",
  },
  {
    q: "Can I work with other companies?",
    a: "Yes. The partnership is non-exclusive, as long as there is no conflict of interest or misuse of confidential information.",
  },
  {
    q: "Are meeting bonuses paid?",
    a: "Yes. A $25 bonus is paid for each qualified first meeting that the client attends and accepts, up to a monthly cap.",
  },
  {
    q: "Can I become a full-time employee?",
    a: "High-performing partners may be considered after three to six months if a suitable role is open. It is not guaranteed and involves a separate selection process.",
  },
  {
    q: "Is there a joining fee?",
    a: "No. There is no application or joining fee.",
  },
];

export const MARKETS = ["United States", "United Kingdom", "Canada", "Australia", "UAE", "Western Europe"];

export const BACKGROUNDS = ["Sales", "Business development", "Consulting", "Agency", "Freelance networks"];

// Key terms beside the FAQ: only what is stated in the FAQ answers
export const TERMS = [
  ["Commission", "10% to 15% per project"],
  ["Paid in", "USD"],
  ["Lead protection", "12 months"],
  ["Meeting bonus", "$25 per qualified first meeting"],
  ["Arrangement", "Independent, non-exclusive"],
  ["Joining fee", "None"],
];

// What happens after an application is sent
export const NEXT = [
  ["Send your application", "About three minutes. No fee, no obligation."],
  ["Hear back within 24 hours", "We read every application ourselves."],
  ["A 30-minute call", "Meet the team and talk through your markets and network."],
  ["Onboarding", "Your partner agreement, the services you will represent and how to register leads."],
];
