// Vox Front — All marketing copy lives here.
// Do NOT put copy inside component files.
// Edit this file only when changing wording.
// Components import from here and never define their own text.

export const COPY = {
  // ============ HEADER ============
  header: {
    brand: "Vox Front",
    nav: {
      howItWorks: "How it works",
      useCases: "Use cases",
      dashboard: "Dashboard",
      faq: "FAQ",
    },
    signIn: "Sign in",
    bookDemo: "Book a demo",
  },

  // ============ HERO ============
  hero: {
    headline: "Every call answered. Every appointment booked.",
    subhead: "Vox Front answers every call, 24 hours a day. It checks your calendar and books appointments automatically. You see every call in one dashboard.",
    ctaPrimary: "Book a demo",
    ctaSecondary: "See how it works",
  },

  // ============ HOW IT WORKS ============
  howItWorks: {
    label: "How it works",
    headline: "Three steps from call to booking.",
    steps: [
      {
        num: "01",
        title: "Answer",
        desc: "Every call answered in under a second. Vox Front speaks naturally and asks the right questions.",
      },
      {
        num: "02",
        title: "Book",
        desc: "Vox Front checks your calendar and books appointments automatically.",
      },
      {
        num: "03",
        title: "Report",
        desc: "Every call logged with a transcript and summary. You always know what to follow up on.",
      },
    ],
  },

  // ============ REAL SITUATIONS ============
  realSituations: {
    label: "Use cases",
    headline: "What Vox Front handles.",
    subhead: "Busy weekdays. Late-night calls. Multiple lines at once. These are the situations Vox Front handles.",
    items: [
      "Answer calls when your team is busy",
      "Handle calls after business hours",
      "Book, reschedule, and confirm appointments",
      "Send a reminder 24 hours before",
      "Transfer urgent calls to the right person",
      "Answer common questions automatically",
      "Handle multiple calls at the same time",
    ],
  },

  // ============ DASHBOARD ============
  dashboard: {
    label: "Dashboard",
    headline: "Every call, captured.",
    subhead: "See every call, transcript, and outcome in one place.",
  },

  // ============ SECURITY ============
  security: {
    label: "Security",
    headline: "Sensitive details never reach our database.",
    subhead: "Every transcript scanned before storage. Credit cards, SSNs, and phone numbers are redacted automatically.",
    items: [
      "Credit card numbers",
      "Social Security numbers",
      "Phone numbers",
      "Other PII patterns",
    ],
  },

  // ============ FAQ ============
  faq: {
    label: "FAQ",
    headline: "Questions, answered.",
    items: [
      {
        q: "Does Vox Front work after business hours?",
        a: "Yes. It answers calls 24/7, including weekends and holidays.",
      },
      {
        q: "Can it book appointments on its own?",
        a: "Yes. It checks your live Google Calendar and books, reschedules, or cancels as needed.",
      },
      {
        q: "Can I review every conversation?",
        a: "Yes. Every call is recorded and transcribed in your dashboard.",
      },
      {
        q: "What happens with urgent calls?",
        a: "Vox Front can transfer urgent calls to a designated number or notify your team by SMS or email.",
      },
      {
        q: "How is customer data protected?",
        a: "Transcripts are scanned before storage. Credit card numbers, SSNs, and phone numbers are redacted automatically.",
      },
      {
        q: "How long does setup take?",
        a: "Most businesses are live in under 10 minutes.",
      },
      {
        q: "Which industries is this built for?",
        a: "Dental practices, auto repair, salons and spas, law firms, and home services like plumbing, electrical, and HVAC.",
      },
    ],
  },

  // ============ CTA ============
  cta: {
    headline: "Stop losing calls.",
    ctaPrimary: "Book a demo",
    ctaSecondary: "Talk to the team",
  },

  // ============ FOOTER ============
  footer: {
    description: "Vox Front answers your calls and books your appointments, around the clock.",
    status: "All systems operational",
    copyright: "© 2026 Vox Front. All rights reserved.",
    product: {
      heading: "Product",
      items: ["How it works", "Dashboard", "Pricing", "Integrations"],
    },
    company: {
      heading: "Company",
      items: ["About", "Blog", "Careers", "Contact"],
    },
    resources: {
      heading: "Resources",
      items: ["Help center", "Security", "Privacy", "Terms"],
    },
  },
} as const;
