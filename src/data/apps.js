// Mobile apps and product design for the Applications and Software portfolio.
// Screens are real captures from each app, with the phone status bar cropped.
// An app with no screens yet is left out of the page until they arrive.

const screens = (slug, n) => Array.from({ length: n }, (_, i) => `/images/apps/${slug}-${i + 1}.webp`);

export const apps = [
  {
    slug: "maacubs",
    name: "MaaCubs",
    sector: "Mother and baby healthcare",
    kind: "Android app",
    accent: "#6b46c8",
    tint: "#efe9fb",
    summary:
      "A doctor-led care app for families planning a baby, expecting one or raising one, with tracking, a health library and online consultations in one place.",
    built: [
      "Care journeys chosen at sign-up",
      "Cycle and pregnancy tracking",
      "Fertility, diet and wellness library",
      "Doctor consultations by specialty and language",
    ],
    platforms: ["Android", "Doctor consultations"],
    link: { href: "https://www.maacubs.com/", label: "maacubs.com" },
    screens: screens("maacubs", 5),
  },
  {
    slug: "achievam",
    name: "Achievam",
    sector: "Exam preparation",
    kind: "Android app",
    accent: "#1f3a8a",
    tint: "#e8edfa",
    summary:
      "A test-series app for students preparing for school boards, CUET and competitive exams, with practice papers organised by class, subject and exam.",
    built: [
      "Test series by exam and class",
      "Chapter-wise practice papers",
      "Instructor and category browsing",
      "Email, mobile and Google sign-in",
    ],
    platforms: ["Android", "Google Play"],
    link: { href: "https://play.google.com/store/apps/details?id=com.achievam.scholar", label: "Google Play" },
    screens: screens("achievam", 3),
  },
].filter((a) => a.screens.length);

// Product design shown from the Figma file; added once the frames are exported.
export const designs = [];
