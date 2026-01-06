// ============================================
// PRICING DATA - Edit this file to update pricing page content
// ============================================

export interface PricingTier {
  id: string;
  name: string;
  label?: string; // e.g., "Most Popular"
  priceText: string;
  description: string;
  bestFor: string;
  timelineText: string;
  included: string[];
  notIncluded?: string[];
  outcomes?: string[]; // Must be non-hype, label as example if not real
  ctaText: string;
  measuredBy: string[]; // Events tracked
}

export interface Retainer {
  id: string;
  name: string;
  priceText: string;
  description: string;
  included: string[];
  bestFor: string;
  ctaText: string;
}

export interface AddOn {
  id: string;
  name: string;
  priceText: string; // e.g., "from $300"
  description: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface ComparisonFeature {
  name: string;
  launch: boolean | string;
  pro: boolean | string;
  growth: boolean | string;
}

// ============================================
// TIERS
// ============================================
export const tiers: PricingTier[] = [
  {
    id: 'launch',
    name: 'Launch',
    priceText: 'Starting at $1,500',
    description: 'A focused, conversion-ready site with essential tracking. Ship fast, measure everything.',
    bestFor: 'Solo operators and small teams validating a new offer or replacing an outdated site.',
    timelineText: '7–10 days',
    included: [
      'Up to 3 pages (Home, About, Contact)',
      'Mobile-first responsive design',
      'Primary CTA system',
      'Contact form + lead routing',
      'GA4 + basic event tracking',
      '30-day support window',
    ],
    outcomes: [
      'Lighthouse performance 90+ (Example outcome)',
      'Lead notifications in <60s',
    ],
    ctaText: 'Start Launch →',
    measuredBy: ['form_submit', 'phone_click', 'scroll_depth'],
  },
  {
    id: 'pro',
    name: 'Pro',
    label: 'Most Popular',
    priceText: 'Starting at $3,500',
    description: 'Full conversion architecture with booking integration, automation triggers, and trust systems.',
    bestFor: 'Service businesses ready to capture and convert leads systematically.',
    timelineText: '2–3 weeks',
    included: [
      'Up to 6 pages + service sections',
      'Booking integration (Calendly, etc.)',
      'SMS/email lead notifications',
      'Review request automation',
      'Trust blocks (testimonials, badges)',
      'Copywriting pass (messaging)',
      'Basic SEO + schema markup',
      '30-day support window',
    ],
    outcomes: [
      'Speed-to-lead under 60 seconds',
      'Structured data for local search',
    ],
    ctaText: 'Start Pro →',
    measuredBy: ['booked_call_click', 'form_submit', 'phone_click', 'review_prompt'],
  },
  {
    id: 'growth',
    name: 'Growth',
    priceText: 'Starting at $6,500',
    description: 'Enterprise-grade lead system with CRM pipeline, A/B testing foundation, and multi-location support.',
    bestFor: 'Established businesses scaling lead generation across locations or services.',
    timelineText: '3–5 weeks',
    included: [
      'Up to 12 pages + landing pages',
      'CRM pipeline integration',
      'Multi-location/service pages',
      'A/B experiment setup (1 variant)',
      'Advanced event instrumentation',
      'Full copywriting + messaging',
      'Technical SEO audit + fixes',
      'Priority 60-day support',
    ],
    outcomes: [
      'Full-funnel tracking enabled',
      'Experiment-ready architecture',
    ],
    ctaText: 'Start Growth →',
    measuredBy: ['booked_call_click', 'form_submit', 'phone_click', 'experiment_view', 'crm_lead_created'],
  },
];

// ============================================
// COMPARISON TABLE FEATURES
// ============================================
export const comparisonFeatures: ComparisonFeature[] = [
  { name: 'Pages included', launch: 'Up to 3', pro: 'Up to 6', growth: 'Up to 12' },
  { name: 'Custom sections (testimonials, services)', launch: '1–2', pro: '4–6', growth: 'Unlimited' },
  { name: 'Booking integration', launch: false, pro: true, growth: true },
  { name: 'Lead routing + notifications', launch: 'Email only', pro: 'SMS + Email', growth: 'SMS + Email + CRM' },
  { name: 'Review request automation', launch: false, pro: true, growth: true },
  { name: 'Analytics + event tracking', launch: 'Basic', pro: 'Standard', growth: 'Advanced' },
  { name: 'Copywriting / messaging pass', launch: false, pro: true, growth: 'Full' },
  { name: 'Basic SEO + schema', launch: false, pro: true, growth: true },
  { name: 'Technical SEO audit', launch: false, pro: false, growth: true },
  { name: 'Support window', launch: '30 days', pro: '30 days', growth: '60 days (priority)' },
  { name: 'A/B experiment setup', launch: false, pro: false, growth: '1 variant' },
  { name: 'CRM pipeline integration', launch: false, pro: false, growth: true },
  { name: 'Multi-location pages', launch: false, pro: false, growth: true },
];

// ============================================
// WHAT'S INCLUDED (EVERY BUILD)
// ============================================
export const everyBuildIncludes = [
  {
    title: 'Performance Pass',
    description: 'Core Web Vitals optimization. Fast load times, smooth interactions.',
    microLabel: 'Baseline',
  },
  {
    title: 'Conversion Architecture',
    description: 'Single primary CTA per section. Clear hierarchy, no confusion.',
    microLabel: 'Focused',
  },
  {
    title: 'Trust Signals',
    description: 'Reviews, badges, and proof blocks positioned for maximum impact.',
    microLabel: 'Credibility',
  },
  {
    title: 'Tracking Instrumentation',
    description: 'GA4 events wired to measure what matters: clicks, forms, calls.',
    microLabel: 'Instrumented',
  },
  {
    title: 'Speed-to-Lead Wiring',
    description: 'Instant notifications so you can respond before competitors.',
    microLabel: 'Routing online',
  },
  {
    title: 'Handoff + Ownership',
    description: 'You own everything. Code, domain, assets. No lock-in.',
    microLabel: 'Yours',
  },
];

// ============================================
// RETAINERS
// ============================================
export const retainers: Retainer[] = [
  {
    id: 'care',
    name: 'Care Plan',
    priceText: '$99–$299/mo',
    description: 'Keep your site running smoothly without lifting a finger.',
    included: [
      'Hosting guidance + monitoring',
      'Small content edits (text, images)',
      'Uptime + performance checks',
      'Minor bug fixes',
      'Monthly status email',
    ],
    bestFor: 'Businesses that want a worry-free site.',
    ctaText: 'Ask about Care →',
  },
  {
    id: 'optimization',
    name: 'Optimization Plan',
    priceText: '$300–$1,000+/mo',
    description: 'Continuous improvement. Monthly experiments. Compounding gains.',
    included: [
      'Monthly performance report',
      '1 experiment/month (CTA, layout, copy)',
      'Automation tweaks + refinements',
      'Conversion rate improvements',
      'Priority support',
    ],
    bestFor: 'Businesses that want compounding gains.',
    ctaText: 'Ask about Optimization →',
  },
];

// ============================================
// ADD-ONS
// ============================================
export const addOns: AddOn[] = [
  {
    id: 'landing-page',
    name: 'Additional Landing Page',
    priceText: 'from $400',
    description: 'Campaign-specific page with unique messaging and tracking.',
  },
  {
    id: 'photo-refresh',
    name: 'Photo/Video Section Refresh',
    priceText: 'from $250',
    description: 'Update imagery across key sections with new assets.',
  },
  {
    id: 'copy-rewrite',
    name: 'Copy Rewrite Pass',
    priceText: 'from $500',
    description: 'Full messaging overhaul for existing pages.',
  },
  {
    id: 'multi-location',
    name: 'Multi-Location Pages',
    priceText: 'from $200/page',
    description: 'City or region-specific pages for local SEO.',
  },
  {
    id: 'review-workflow',
    name: 'Review Generation Workflow',
    priceText: 'from $350',
    description: 'Automated review requests via SMS/email post-service.',
  },
  {
    id: 'local-seo',
    name: 'Local SEO Starter Pack',
    priceText: 'from $450',
    description: 'Google Business Profile optimization + local citations.',
  },
];

// ============================================
// PROCESS STEPS
// ============================================
export const processSteps = [
  {
    num: '01',
    title: 'Audit',
    description: 'We review your current site, baseline metrics, and goals.',
  },
  {
    num: '02',
    title: 'Build',
    description: 'Design, copy, and development—mobile-first, conversion-focused.',
  },
  {
    num: '03',
    title: 'Instrument',
    description: 'Tracking, events, and lead routing wired up and tested.',
  },
  {
    num: '04',
    title: 'Launch + Improve',
    description: 'Handoff, training, and optional ongoing optimization.',
  },
];

// ============================================
// PAYMENT TERMS
// ============================================
export const paymentTerms = {
  deposit: '50% to start, 50% at launch',
  contract: 'No long-term contract required',
  note: 'Payment plans available for Growth tier.',
};

// ============================================
// FAQs
// ============================================
export const faqs: FAQ[] = [
  {
    question: 'How fast can you launch?',
    answer: 'Launch tier ships in 7–10 days. Pro in 2–3 weeks. Growth in 3–5 weeks. Timeline depends on content readiness and feedback speed.',
  },
  {
    question: 'Who owns the website and code?',
    answer: 'You do. 100%. We hand over all files, assets, and access. No lock-in, no hostage situations.',
  },
  {
    question: 'Can I update the site myself?',
    answer: 'Yes. We can build on a CMS like Webflow or WordPress for easy editing. For static sites, we provide a simple Git-based workflow or can train your team.',
  },
  {
    question: 'What do you track?',
    answer: 'We instrument key conversion events: form submissions, phone clicks, booking clicks, scroll depth, and page engagement. Everything flows to GA4 and can feed into your CRM.',
  },
  {
    question: 'What tools do you integrate?',
    answer: 'Calendly, Formspree, Tally, Typeform, Zapier, Make, Mailchimp, Google Analytics, and most popular form/booking tools. If you use something else, ask—we likely support it.',
  },
  {
    question: 'Will this help with SEO?',
    answer: 'Pro and Growth tiers include SEO fundamentals: schema markup, meta tags, fast load times, and mobile optimization. Growth includes a technical SEO audit. We focus on foundations that compound over time.',
  },
  {
    question: 'What do you need from me to start?',
    answer: 'Brand assets (logo, colors), photos if available, access to existing accounts (domain, hosting, analytics), and 30 minutes for a kickoff call. We guide you through everything.',
  },
  {
    question: "What if I don't have photos or copy?",
    answer: 'We can source stock photos and write conversion-focused copy (included in Pro/Growth). For Launch, we provide templates and guidance to keep costs down.',
  },
  {
    question: 'What happens after launch?',
    answer: 'You get a support window (30–60 days depending on tier) for fixes and questions. After that, you can self-manage or join a Care or Optimization plan for ongoing support.',
  },
  {
    question: 'How does the free audit work?',
    answer: "We ghost-shop your business: test your response time, review your site's UX, and check your tracking setup. You get a short report with actionable recommendations within 24–48 hours. No obligation.",
  },
];

// ============================================
// GUARANTEE / PROMISE
// ============================================
export const guarantee = {
  text: 'We instrument every build so results are measurable.',
  subtext: "If we can't track it, we don't ship it.",
};

// ============================================
// HERO STRIP ITEMS
// ============================================
export const heroStripItems = [
  'Analytics + event tracking',
  'Mobile-first performance',
  'CTA + trust system',
  'Speed-to-lead routing',
];

// ============================================
// MICRO TRUST ITEMS (FOOTER CTA)
// ============================================
export const microTrustItems = [
  'Clear scope',
  'Measured outcomes',
  'Fast launch',
];
