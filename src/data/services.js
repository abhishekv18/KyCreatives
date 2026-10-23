// Service content. Offerings are drawn from what kycreatives.com lists today
// (service menus, enquiry form options and the web portfolio page) and from the
// brand positioning. Anything that depends on a project's platform or scope is
// marked `scoped: true` so the page can say so plainly instead of promising it.

export const services = [
  {
    slug: "web-apps-websites",
    path: "/services/web-apps-websites",
    name: "Web Apps & Websites",
    navLabel: "Web Apps & Websites",
    short: "Websites and web apps that are fast, clear and easy to grow.",
    index:
      "Company websites, landing pages and custom web applications, designed and engineered by the same team.",
    accent: "dusk",
    meta: {
      title: "Website and web application development",
      description:
        "Business websites, landing pages, custom web applications, SaaS interfaces and dashboards, designed and built by KY Creatives.",
    },
    hero: {
      lines: ["From a five-page website", "to a working product."],
      lead: "We design and build websites and web applications that explain your business clearly, load fast and stay easy to change after launch.",
    },
    offerings: [
      {
        title: "Business websites",
        body: "Corporate and company websites that say what you do in plain words and lead visitors to the next step.",
      },
      {
        title: "Landing pages",
        body: "Focused pages for one campaign, one product or one audience, ready to connect to your ads and forms.",
      },
      {
        title: "Custom web applications",
        body: "Booking systems, marketplaces, learning platforms and internal tools built around your process.",
      },
      {
        title: "SaaS interfaces",
        body: "Onboarding, settings, billing views and the everyday screens your users return to most.",
      },
      {
        title: "Dashboards",
        body: "Views that answer the questions your team asks every day, with data labelled clearly and nothing decorative.",
      },
      {
        title: "Responsive implementation",
        body: "Layouts tested from small phones to wide monitors, with accessible markup and visible focus states.",
      },
      {
        title: "Integrations and maintainability",
        body: "Connections to the CRM, payment, email or analytics tools you already use, in code another developer can pick up.",
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
        a: "Yes, when the project needs it. We set up a content system your team can use and show you how.",
      },
      {
        q: "Do you work with clients outside India?",
        a: "Yes. We work with businesses across time zones and plan calls and reviews around your working hours.",
      },
    ],
    cta: "Tell us what the website or app needs to do.",
    related: ["property-box", "pinkdinosaur", "australglazing", "couponvolume"],
  },
  {
    slug: "d2c",
    path: "/services/d2c",
    name: "D2C Services",
    navLabel: "D2C Services",
    short: "Storefronts for brands that sell direct.",
    index:
      "Our focus area. Brand led online stores built for conversion, retention and repeat purchase, on Shopify or custom code.",
    accent: "flame",
    meta: {
      title: "D2C ecommerce websites and Shopify storefronts",
      description:
        "KY Creatives designs and builds D2C storefronts: Shopify and custom ecommerce, product pages, cart and checkout improvements, and mobile-first shopping.",
    },
    hero: {
      lines: ["Stores that make", "buying the easy part."],
      lead: "D2C is our focus area. We design and build online stores for brands that sell direct, so the product looks right, the page loads fast and checkout gets out of the way.",
    },
    offerings: [
      {
        title: "Shopify storefronts",
        body: "Theme customisation or a fully custom theme, set up around how your catalogue and team actually work.",
      },
      {
        title: "Custom ecommerce builds",
        body: "When a platform theme is not enough: custom stores and multi-vendor marketplaces with the features your model needs.",
      },
      {
        title: "Product page experience",
        body: "Clear photography, honest product detail, variant pickers that make sense and the answers buyers look for before they commit.",
      },
      {
        title: "Cart and checkout improvements",
        body: "We review every step between add to cart and order placed, and remove the ones that do not need to be there, within what your platform allows.",
      },
      {
        title: "Mobile-first shopping",
        body: "Most D2C traffic arrives on a phone. We design for the thumb first, then scale up to the desktop.",
      },
      {
        title: "Payments and integrations",
        body: "Payment gateway setup, plus shipping, reviews, email and analytics tools chosen to fit your platform.",
        scoped: true,
      },
      {
        title: "Storefront performance",
        body: "Image handling, script audits and page weight budgets, so the store stays quick as the catalogue grows.",
      },
    ],
    deliverables: [
      "Storefront design for home, collection, product, cart and content pages",
      "Theme or custom build, connected to your products and payments",
      "Mobile and desktop testing on real devices",
      "Launch checklist: redirects, metadata, analytics, payment test orders",
      "Handover session so your team can run the store day to day",
    ],
    faqs: [
      {
        q: "Do you only work with Shopify?",
        a: "No. We have built stores on Shopify, WordPress and custom code. We recommend a platform once we understand your catalogue, team and budget.",
      },
      {
        q: "Can you redesign our existing store?",
        a: "Yes. We start by reviewing what you have, then tell you what can be kept, what should be rebuilt and why.",
      },
      {
        q: "Will you look after the store after launch?",
        a: "We offer website maintenance plans for updates, backups, security and fixes. We can also keep improving the store with you on a monthly basis.",
      },
    ],
    cta: "Tell us about your brand and what you sell.",
    related: ["thedecorshed", "vibhadesigns", "petsway", "globalayurveda", "nirmaltrends", "notahoax"],
  },
  {
    slug: "mobile-apps",
    path: "/services/mobile-apps",
    name: "Mobile Apps",
    navLabel: "Mobile Apps",
    short: "Android and iOS apps people keep on their home screen.",
    index:
      "Android and iOS apps, from first screens to store release, with the design and engineering in one team.",
    accent: "aqua",
    meta: {
      title: "Mobile app design and development for Android and iOS",
      description:
        "KY Creatives designs and builds Android and iOS apps: native or cross-platform, mobile UI, integrations, and ongoing improvements after release.",
    },
    hero: {
      lines: ["Apps that earn a place", "on the home screen."],
      lead: "We design and build Android and iOS apps for businesses that want a direct line to their customers, or a better tool for their own team.",
    },
    offerings: [
      {
        title: "Android and iOS apps",
        body: "Apps for both stores, designed to feel at home on each platform rather than copied from one to the other.",
      },
      {
        title: "Cross-platform development",
        body: "One codebase for both platforms when it suits the product. We explain the trade-offs before you decide.",
      },
      {
        title: "Mobile UI design",
        body: "Clear navigation, readable type, generous touch targets and states for loading, empty and error screens.",
      },
      {
        title: "Integrations",
        body: "Logins, payments, notifications, maps and your own back-end services, scoped to what the app needs.",
        scoped: true,
      },
      {
        title: "Maintenance and improvements",
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
        q: "Do you help with app store submission?",
        a: "Yes. We prepare the build and listing material and support you through review, using your developer accounts.",
      },
    ],
    cta: "Tell us who the app is for and what it should do.",
    related: [],
  },
  {
    slug: "portals",
    path: "/services/portals",
    name: "Portals",
    navLabel: "Portals",
    short: "Portals and business tools that match how your team works.",
    index:
      "Customer, vendor and employee portals, CRMs and admin dashboards with the right access for each role.",
    accent: "dusk",
    meta: {
      title: "Customer, vendor and employee portal development",
      description:
        "KY Creatives builds business portals: customer, vendor and employee portals, admin dashboards, role-based access, sales CRMs and ERP-style tools.",
    },
    hero: {
      lines: ["One place for the work", "that runs your business."],
      lead: "Portals replace spreadsheets, email threads and repeated phone calls with one secure place where each person sees what they need and does their part.",
    },
    offerings: [
      {
        title: "Customer portals",
        body: "Let customers place and track orders, download invoices, raise requests and update their details without calling you.",
      },
      {
        title: "Vendor and B2B portals",
        body: "Give suppliers and trade buyers a shared space for catalogues, purchase orders, pricing tiers and documents.",
      },
      {
        title: "Employee portals",
        body: "Leave, attendance, announcements, training and internal documents in one place your team can reach from anywhere.",
      },
      {
        title: "Admin dashboards",
        body: "The control room behind your website or app: content, users, orders and reports in one screen.",
      },
      {
        title: "Role-based access",
        body: "Clear permissions so each person sees and changes only what their role allows, with a record of who did what.",
      },
      {
        title: "CRM and ERP-style tools",
        body: "Sales CRMs, lead capture, online exam systems and travel booking portals built around your process.",
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
        q: "Can the portal connect to the software we already use?",
        a: "Often, yes. We check what your current tools allow during discovery and confirm what can be connected before the build starts.",
      },
      {
        q: "How do you handle sensitive data?",
        a: "We keep access role-based, store only what the portal needs and agree hosting and backup arrangements with you before launch.",
      },
      {
        q: "Can we start small?",
        a: "Yes. Most portals start with one role and one job done well, then grow from there.",
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

export const serviceBySlug = Object.fromEntries(services.map((s) => [s.slug, s]));

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
