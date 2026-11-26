// Service content. Offerings are drawn from what kycreatives.com lists today
// (service menus, enquiry form options and the web portfolio page) and from the
// brand positioning. Anything that depends on a project's platform or scope is
// marked `scoped: true` so the page can say so plainly instead of promising it.

// Every service the studio offers. Marketing and Design & Graphics are not
// promoted across the site for now: they stay in the footer, keep their
// pages, and are delivered with BrandGap.
export const allServices = [
  {
    slug: "web-apps-websites",
    path: "/services/website-development",
    name: "Website Development",
    navLabel: "Website",
    short: "Company websites that are fast, clear and easy to update.",
    index: "Business websites, landing pages and content-managed sites, designed and engineered by the same team.",
    accent: "dusk",
    meta: {
      title: "Website development for businesses",
      description:
        "KY Creatives designs and develops business websites, landing pages and content-managed sites that load fast, rank well and are easy to update.",
    },
    hero: {
      lines: ["A website that explains", "your business clearly."],
      lead: "We design and develop company websites and landing pages that load fast, read clearly on every screen and stay easy for your team to update after launch.",
    },
    offerings: [
      {
        title: "Business websites",
        body: "Company websites that say what you do in plain words and lead visitors to the next step.",
      },
      {
        title: "Landing pages",
        body: "Focused pages for one campaign, one product or one audience, ready to connect to your ads and forms.",
      },
      {
        title: "Content-managed websites",
        body: "WordPress or a headless CMS set up so your team can publish pages, news and case studies without a developer.",
      },
      {
        title: "Website redesign",
        body: "A clearer structure, a modern design and faster pages, with redirects in place so search rankings carry over.",
      },
      {
        title: "Responsive build",
        body: "Layouts tested from small phones to wide monitors, with accessible markup and visible focus states.",
      },
      {
        title: "SEO foundations and analytics",
        body: "Clean page structure, metadata, sitemaps and analytics set up from day one.",
      },
      {
        title: "Integrations",
        body: "Forms, CRM, email and booking tools connected to the site, in code another developer can pick up.",
        scoped: true,
      },
    ],
    deliverables: [
      "Sitemap and page structure",
      "Interface design for desktop and mobile",
      "Front-end and back-end build on an agreed stack",
      "Content entry, SEO basics and analytics setup",
      "Documentation and a handover call",
    ],
    faqs: [
      {
        q: "Which technologies do you use?",
        a: "Our recent work includes WordPress, Shopify, PHP, Node.js and hand-written front ends. We choose the stack per project and explain the reason.",
      },
      {
        q: "Can we update the content ourselves?",
        a: "Yes. We set up a content system your team can use and show you how.",
      },
      {
        q: "Do you work with clients in other countries?",
        a: "Yes. We work with businesses across time zones and plan calls and reviews around your working hours.",
      },
    ],
    cta: "Tell us what the website needs to do.",
    related: ["property-box", "pinkdinosaur", "brandgap", "abhinaybuilders"],
  },
  {
    slug: "d2c",
    path: "/services/ecommerce-development",
    name: "E-commerce Development",
    navLabel: "E-commerce",
    short: "Online stores your customers love to shop.",
    index:
      "Shopify and custom online stores for D2C brands, B2B and wholesale buyers and multi-vendor marketplaces, built to sell and easy to run.",
    accent: "flame",
    meta: {
      title: "E-commerce development: Shopify and custom online stores",
      description:
        "KY Creatives designs and develops e-commerce stores: Shopify and custom builds, redesign and migration, checkout and payments, shipping automation and conversion optimisation.",
    },
    hero: {
      lines: ["Build an online store", "your customers love to shop."],
      lead: "We design and develop e-commerce experiences that make shopping easier, streamline operations and help ambitious brands sell online.",
    },
    offerings: [
      {
        title: "Shopify development",
        body: "Theme customisation or a fully custom Shopify theme, set up around how your catalogue and team actually work.",
      },
      {
        title: "Custom e-commerce development",
        body: "Custom stores for D2C brands, B2B and wholesale ordering, and multi-vendor marketplaces, when a platform theme is not enough.",
      },
      {
        title: "Store redesign and migration",
        body: "A redesign of your current store, or a move to a new platform with products, customers, orders and SEO carried across.",
      },
      {
        title: "Checkout and payment integrations",
        body: "Payment gateways, wallets and a shorter path from cart to order placed, within what your platform allows.",
        scoped: true,
      },
      {
        title: "Shipping and order automation",
        body: "Courier and shipping integrations, order status updates and the routine steps your team should not do by hand.",
        scoped: true,
      },
      {
        title: "Performance and conversion optimisation",
        body: "Faster pages, clearer product detail and fewer steps to buy, measured against your store's own numbers.",
      },
    ],
    deliverables: [
      "Store design for home, collection, product, cart and content pages",
      "Shopify or custom build, connected to your products and payments",
      "Mobile and desktop testing on real devices",
      "Launch checklist: redirects, metadata, analytics, payment test orders",
      "Handover session so your team can run the store day to day",
    ],
    faqs: [
      {
        q: "Do you only work with Shopify?",
        a: "No. We build on Shopify, WordPress and custom code. We recommend a platform once we understand your catalogue, team and budget.",
      },
      {
        q: "Do you build B2B and wholesale stores?",
        a: "Yes. We build trade ordering with customer-specific pricing and minimum quantities, and multi-vendor marketplaces, scoped to your model.",
      },
      {
        q: "Can you redesign or migrate our existing store?",
        a: "Yes. We review what you have, tell you what to keep and what to rebuild, and carry products, customers, orders and SEO across.",
      },
      {
        q: "Will you look after the store after launch?",
        a: "Yes. We offer maintenance for updates, backups, security and fixes, and can keep improving the store with you each month.",
      },
    ],
    cta: "Tell us what you sell and who buys it.",
    related: ["thedecorshed", "ramysprofessional", "vibhadesigns", "thelabelbysiya", "rugsandroses", "dudle", "petsway", "notahoax"],
  },
  {
    slug: "mobile-apps",
    path: "/services/mobile-app-development",
    name: "Mobile App Development",
    navLabel: "Mobile App",
    short: "iOS and Android apps people use every day.",
    index: "iOS, Android and cross-platform apps, from product design to app-store release, with design and engineering in one team.",
    accent: "aqua",
    meta: {
      title: "Mobile app development for iOS and Android",
      description:
        "KY Creatives designs and develops iOS, Android and cross-platform apps: UI/UX, backend and APIs, payments, testing, app-store deployment and ongoing improvements.",
    },
    hero: {
      lines: ["From your idea to an app", "people use every day."],
      lead: "We design and develop mobile applications that connect businesses with customers, simplify operations and bring digital products to life.",
    },
    offerings: [
      {
        title: "iOS development",
        body: "iPhone and iPad apps that follow Apple's guidelines and feel at home on the platform.",
      },
      {
        title: "Android development",
        body: "Apps for the wide range of Android phones, tested across screen sizes and OS versions.",
      },
      {
        title: "Cross-platform applications",
        body: "One codebase for iOS and Android when it suits the product. We explain the trade-offs before you decide.",
      },
      {
        title: "UI/UX and product design",
        body: "User flows, clear navigation and every state of every screen: loading, empty, error and offline.",
      },
      {
        title: "Backend and API integrations",
        body: "The APIs and admin tools an app needs, or connections to the systems you already run.",
        scoped: true,
      },
      {
        title: "Authentication and payment systems",
        body: "Secure sign-in, OTP and social logins, and in-app or gateway payments.",
        scoped: true,
      },
      {
        title: "Testing and app-store deployment",
        body: "Test builds you can install along the way, then store listings, review and release.",
      },
      {
        title: "Maintenance and feature improvements",
        body: "Updates for new OS versions, fixes, and new features released in small, regular steps.",
      },
    ],
    deliverables: [
      "Product scope and feature priorities",
      "User flows and interface design",
      "App build, with test builds you can install along the way",
      "Store listing preparation and release support",
      "Post-launch fixes and an improvement plan",
    ],
    faqs: [
      {
        q: "Native or cross-platform?",
        a: "It depends on the features, budget and timeline. We recommend one after discovery and write down why, so you can decide with the full picture.",
      },
      {
        q: "Can you build the back end as well?",
        a: "Yes. We can build the APIs and admin tools an app needs, or connect to systems you already run.",
      },
      {
        q: "Do you help with app-store submission?",
        a: "Yes. We prepare the build and listing material and support you through review, using your developer accounts.",
      },
    ],
    cta: "Tell us who the app is for and what it should do.",
    related: [],
  },
  {
    slug: "portals",
    path: "/services/custom-software-development",
    name: "Custom Software Development",
    navLabel: "Custom Software",
    short: "Software built around the way your business works.",
    index:
      "Custom business applications, CRM and ERP systems, SaaS products, portals and workflow automation, built around your process.",
    accent: "dusk",
    meta: {
      title: "Custom software development: business apps, CRM, ERP and SaaS",
      description:
        "KY Creatives develops custom software: business applications, CRM and ERP systems, SaaS products, customer and vendor portals, internal tools, workflow automation and API integrations.",
    },
    hero: {
      lines: ["Software built around your business,", "not the other way around."],
      lead: "We develop custom software, business platforms and web applications that solve operational challenges and support the way your organisation works.",
    },
    offerings: [
      {
        title: "Custom business applications",
        body: "Web applications built around one process your team runs every day, from booking and quoting to approvals.",
      },
      {
        title: "CRM and ERP systems",
        body: "Sales pipelines, customer records, inventory, purchasing and reporting in one system shaped to your business.",
      },
      {
        title: "SaaS product development",
        body: "Subscription products with onboarding, accounts, billing and the everyday screens your users return to.",
      },
      {
        title: "Customer, vendor and employee portals",
        body: "One secure place where each person sees what they need: orders, documents, requests and updates.",
      },
      {
        title: "Internal management systems",
        body: "Admin dashboards and back-office tools that replace spreadsheets and email threads.",
      },
      {
        title: "Workflow automation",
        body: "Routine steps such as notifications, approvals and data entry handled by the system, not by hand.",
      },
      {
        title: "API and third-party integrations",
        body: "Connections to payment, accounting, messaging and the other tools you already use.",
        scoped: true,
      },
      {
        title: "Cloud deployment and maintenance",
        body: "Hosting, backups, monitoring and updates on cloud infrastructure, agreed with you before launch.",
      },
    ],
    deliverables: [
      "Map of roles, permissions and the tasks each role performs",
      "Data model and the screens for each role",
      "Build, with staged access for your team to test",
      "Data import from your current sheets or system",
      "Training material and a handover session",
    ],
    faqs: [
      {
        q: "Can the software connect to the tools we already use?",
        a: "Often, yes. We check what your current tools allow during discovery and confirm what can be connected before the build starts.",
      },
      {
        q: "How do you handle sensitive data?",
        a: "We keep access role-based, store only what the system needs and agree hosting and backup arrangements with you before launch.",
      },
      {
        q: "Can we start small?",
        a: "Yes. Most systems start with one process done well, then grow from there.",
      },
    ],
    cta: "Tell us which process you want to move out of spreadsheets.",
    related: [],
  },
  {
    slug: "marketing",
    path: "/services/marketing",
    name: "Marketing",
    navLabel: "Marketing",
    short: "Search, social and paid campaigns, planned around your sales.",
    index:
      "SEO, social media, paid advertising, content and lead generation, measured against the numbers your business cares about.",
    accent: "flame",
    meta: {
      title: "Digital marketing: SEO, social media and paid advertising",
      description:
        "KY Creatives plans and runs digital marketing: SEO, local search, social media, Google and Meta advertising, content, email, SMS and lead generation.",
    },
    hero: {
      lines: ["Marketing you can", "read in the numbers."],
      lead: "We plan, run and report on campaigns across search, social and paid media, and we connect them to the website so you can see what each one brings in.",
    },
    offerings: [
      {
        title: "Search engine optimisation",
        body: "Technical fixes, page structure and content that help search engines understand your site, plus local SEO for Google Maps.",
      },
      {
        title: "Social media marketing",
        body: "A content calendar, designed posts and community management for the platforms your customers actually use.",
      },
      {
        title: "Paid advertising",
        body: "Google Ads, Meta and YouTube campaigns with clear budgets, tracked conversions and regular adjustments.",
      },
      {
        title: "Content marketing",
        body: "Articles, product copy and email content written in plain language for the people you want to reach.",
      },
      {
        title: "Lead generation",
        body: "Landing pages, forms and lead capture tied to a CRM, so every enquiry is recorded and followed up.",
      },
      {
        title: "Campaign planning and management",
        body: "One plan across channels, with email and SMS where they fit, and a monthly report in plain words.",
      },
    ],
    deliverables: [
      "Audit of your current channels, site and tracking",
      "Channel plan with budgets and goals for each",
      "Creative and copy for each campaign",
      "Tracking and conversion setup",
      "Monthly report and next-month plan",
    ],
    faqs: [
      {
        q: "Can you guarantee rankings or a number of leads?",
        a: "No. Results depend on your market, offer, budget and site. We set realistic goals together, track them openly and adjust when something is not working.",
      },
      {
        q: "Who owns the ad accounts?",
        a: "We recommend the accounts are created in your business name with us given access, so your data stays with you.",
      },
      {
        q: "Do you also fix the website?",
        a: "Yes. Because we build websites too, we can fix the landing pages and tracking that campaigns depend on.",
      },
    ],
    cta: "Tell us where your customers come from today.",
    related: [],
  },
  {
    slug: "design-graphics",
    path: "/services/design-graphics",
    name: "Design & Graphics",
    navLabel: "Design & Graphics",
    short: "Brand identity, interface design and creative for every channel.",
    index:
      "Brand identity, UI/UX, logos, social creatives, print material and video, designed as one consistent system.",
    accent: "aqua",
    meta: {
      title: "Brand identity, UI/UX and graphic design",
      description:
        "KY Creatives designs brand identities, logos, UI/UX, social media creatives, brochures, banners and campaign assets that work together as one system.",
    },
    hero: {
      lines: ["A brand that looks", "like itself everywhere."],
      lead: "We design identities, interfaces and everyday creative as one system, so your website, social posts, print and packaging feel like the same company.",
    },
    offerings: [
      {
        title: "UI/UX design",
        body: "Research, user flows, wireframes and interface design for websites, web apps and mobile apps.",
      },
      {
        title: "Brand identity",
        body: "Logo, colour, type, imagery and tone of voice, written down in guidelines your team can follow.",
      },
      {
        title: "Logo design",
        body: "A mark built to work at favicon size and on a building, in colour and in one colour.",
      },
      {
        title: "Graphic design",
        body: "Brochures, flyers, posters, business cards and website banners in your brand system.",
      },
      {
        title: "Social media creatives",
        body: "Post and story templates, campaign sets and ad creative sized for each platform.",
      },
      {
        title: "Campaign assets and video",
        body: "Promotional, corporate, testimonial and training videos, plus the creative a digital campaign needs.",
      },
    ],
    deliverables: [
      "Moodboards and design directions to choose from",
      "Final artwork in every format you need",
      "Brand guidelines or a design system file",
      "Editable templates for repeat work",
      "Print-ready and web-ready exports",
    ],
    faqs: [
      {
        q: "Can you refresh our brand without starting over?",
        a: "Yes. We often keep what people already recognise and fix the parts that are inconsistent or hard to use.",
      },
      {
        q: "Do we get the source files?",
        a: "We agree the file handover at the start of the project, so you know exactly what you will receive.",
      },
      {
        q: "Can you design for print as well as screens?",
        a: "Yes. We prepare print-ready files and can advise on paper and finishes with your printer.",
      },
    ],
    cta: "Tell us about your brand and where it needs to show up.",
    related: [],
  },
];

export const HIDDEN_SERVICES = ["marketing", "design-graphics"];

// The services promoted in menus, lists and forms
const ORDER = ["d2c", "mobile-apps", "portals", "web-apps-websites"];
export const services = allServices
  .filter((s) => !HIDDEN_SERVICES.includes(s.slug))
  .sort((a, b) => ORDER.indexOf(a.slug) - ORDER.indexOf(b.slug));

export const serviceBySlug = Object.fromEntries(allServices.map((s) => [s.slug, s]));

// The five stages every project moves through.
export const process = [
  {
    title: "Understand the business",
    body: "We start with your customers, your numbers and your constraints. Not a template.",
  },
  {
    title: "Define the direction",
    body: "Scope, priorities, structure and visual direction, agreed in writing before design begins.",
  },
  {
    title: "Design and build",
    body: "Designers and engineers work side by side, sharing progress you can click through as it takes shape.",
  },
  {
    title: "Test and launch",
    body: "Checks on real devices, speed and accessibility reviews, then a planned launch.",
  },
  {
    title: "Improve over time",
    body: "After launch we watch how people use it, fix what slows them down and keep the product current.",
  },
];
