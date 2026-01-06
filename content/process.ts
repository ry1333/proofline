// Process Page Content
// Edit this file to update all copy on the /process page

export const processContent = {
  // ============================================
  // HERO SECTION
  // ============================================
  hero: {
    title: 'Process',
    micro: 'SYSTEM v2.0',
    subhead: 'A repeatable build loop that turns clicks into booked calls — with measurable tracking.',
    expectStrip: [
      'Clear scope',
      'Fast launch',
      'Measurable tracking',
      'Simple handoff',
    ],
  },

  // ============================================
  // IN 60 SECONDS SUMMARY
  // ============================================
  summary: {
    title: 'In 60 Seconds',
    paragraphs: [
      'We audit your current funnel and define the goal.',
      'We build a fast, conversion-first site + follow-up automation.',
      'We instrument tracking so outcomes are measurable, then iterate.',
    ],
    timelineChip: 'Typical timeline: 7–14 days',
  },

  // ============================================
  // THE 4-STEP FLOW
  // ============================================
  steps: [
    {
      id: '01',
      title: 'Diagnose',
      summary: 'We audit your current site, identify leaks, and set a measurable baseline.',
      whatYouGet: [
        'Funnel audit report',
        'Conversion baseline metrics',
        'Priority recommendations',
        'Competitive quick scan',
      ],
      whatWeNeedFromYou: [
        'Access to current site (if exists)',
        'Google Analytics access (if exists)',
        'Your top 3 business goals',
      ],
      duration: '1–2 days',
      deliverablesTags: ['Audit', 'Baseline', 'Strategy'],
    },
    {
      id: '02',
      title: 'Build',
      summary: 'We design and develop a fast, mobile-first site optimized for conversions.',
      whatYouGet: [
        'Conversion-first landing pages',
        'Mobile-first responsive design',
        'Speed-optimized build',
        'SEO foundation + schema',
        'Trust blocks + CTAs',
      ],
      whatWeNeedFromYou: [
        'Business info (services, areas)',
        'Photos + logos',
        'Reviews/testimonials',
        'Content preferences',
      ],
      duration: '5–7 days',
      deliverablesTags: ['Website', 'Design', 'Content'],
    },
    {
      id: '03',
      title: 'Instrument',
      summary: 'We wire up tracking, automation, and lead routing so nothing gets lost.',
      whatYouGet: [
        'GA4 + key events configured',
        'Lead capture forms',
        'Instant email/SMS alerts',
        'Auto-follow-up sequence',
        'Booking link integration',
      ],
      whatWeNeedFromYou: [
        'Email/phone for alerts',
        'Booking calendar link',
        'Preferred CRM (optional)',
      ],
      duration: '1–2 days',
      deliverablesTags: ['Tracking', 'Automation', 'Alerts'],
    },
    {
      id: '04',
      title: 'Iterate',
      summary: 'We launch, monitor performance, and make data-driven improvements.',
      whatYouGet: [
        'Launch + DNS cutover',
        'Performance monitoring',
        'Weekly check-in (first month)',
        'Optimization recommendations',
      ],
      whatWeNeedFromYou: [
        'DNS/domain access',
        'Feedback on leads',
        'Availability for check-ins',
      ],
      duration: 'Ongoing',
      deliverablesTags: ['Launch', 'Monitoring', 'Optimization'],
    },
  ],

  // ============================================
  // TIMELINE & CHECKPOINTS
  // ============================================
  timeline: {
    title: 'Timeline & Checkpoints',
    totalDurationText: 'Most projects launch in 7–14 days',
    note: 'Timelines depend on how fast we receive content and feedback.',
    checkpoints: [
      { day: 'Day 1–2', label: 'Kickoff + Baseline', description: 'Discovery call, audit, and goal alignment' },
      { day: 'Day 3–7', label: 'First Draft Review', description: 'Site design and structure ready for feedback' },
      { day: 'Day 8–10', label: 'Instrumentation Verified', description: 'Tracking, automation, and forms tested' },
      { day: 'Day 10–14', label: 'Launch + Handoff', description: 'Go live and knowledge transfer complete' },
    ],
  },

  // ============================================
  // WHAT WE NEED FROM YOU
  // ============================================
  inputs: {
    title: 'What We Need From You',
    callout: "Don't have this yet? We'll help you fill gaps.",
    groups: [
      {
        title: 'Business Basics',
        items: [
          'Your services and pricing (if public)',
          'Service area / locations',
          'Business phone and email',
          'Hours of operation',
        ],
      },
      {
        title: 'Proof & Trust',
        items: [
          'Google/Yelp reviews (we can pull these)',
          'Photos of your work or team',
          'Licenses, certifications, awards',
          'Client testimonials (if available)',
        ],
      },
      {
        title: 'Preferences',
        items: [
          'Brand colors and logo',
          'Examples of sites you like',
          'Tone preferences (professional, friendly, etc.)',
        ],
      },
      {
        title: 'Access',
        items: [
          'Domain registrar login (for DNS)',
          'Google Analytics access (if exists)',
          'Current hosting access (if migrating)',
        ],
      },
    ],
  },

  // ============================================
  // WHAT YOU GET - DELIVERABLES
  // ============================================
  deliverables: {
    title: 'What You Get',
    subtitle: 'Every deployment includes these tangible deliverables.',
    columns: [
      {
        title: 'Website',
        icon: 'globe',
        items: [
          'Conversion-first page layout',
          'Mobile-first responsive design',
          'Speed optimization (90+ Lighthouse)',
          'Service pages with clear CTAs',
          'Trust blocks (reviews, badges)',
          'Contact forms with validation',
          'SEO foundation + meta tags',
          'Schema markup for local SEO',
          'SSL certificate included',
        ],
      },
      {
        title: 'Automation',
        icon: 'zap',
        items: [
          'Lead capture form system',
          'Instant email notification',
          'Instant SMS alert (optional)',
          'Lead routing rules',
          'Auto-follow-up email',
          'Booking link integration',
          'Review request flow (optional)',
          'CRM integration (optional)',
        ],
      },
      {
        title: 'Tracking',
        icon: 'bar-chart',
        items: [
          'GA4 installed and configured',
          'book_call_click event',
          'form_submit event',
          'phone_click event',
          'audit_submit event',
          'Scroll depth tracking',
          'Traffic source attribution',
          'Reporting template',
        ],
      },
    ],
  },

  // ============================================
  // HOW WE MEASURE
  // ============================================
  measurement: {
    title: 'How We Measure',
    subtitle: 'No vanity metrics. We track what matters for your business.',
    events: [
      'page_view',
      'scroll_depth',
      'cta_click',
      'form_start',
      'form_submit',
      'book_call_click',
      'phone_click',
      'audit_submit',
    ],
    whatWeReport: [
      { label: 'Traffic + Source', description: 'Where visitors come from' },
      { label: 'CTA Clicks', description: 'How many click your main buttons' },
      { label: 'Form Submits', description: 'Leads captured' },
      { label: 'Booked Calls', description: 'Appointments scheduled' },
      { label: 'Response Time', description: 'Speed-to-lead proxy (with automation)' },
    ],
    disclaimer: 'Results depend on offer + traffic. We instrument and test.',
  },

  // ============================================
  // AFTER LAUNCH
  // ============================================
  afterLaunch: {
    title: 'After Launch',
    subtitle: 'Two paths to keep your site performing.',
    plans: [
      {
        title: 'Care Plan',
        subtitle: 'Maintenance & Stability',
        whoItsFor: 'Businesses who want peace of mind without active optimization.',
        items: [
          'Monthly content edits (up to 2 hours)',
          'Security updates and backups',
          'Uptime monitoring',
          'Bug fixes and compatibility updates',
          'Email support',
        ],
        ctaText: 'See Care Plan',
        ctaAnchor: 'care-plan',
      },
      {
        title: 'Optimization Plan',
        subtitle: 'Growth & Experimentation',
        whoItsFor: 'Businesses who want to actively improve conversion rates.',
        items: [
          'Everything in Care Plan',
          'Monthly performance report',
          '1 A/B test or experiment per month',
          'Conversion rate recommendations',
          'Automation tweaks and improvements',
          'Priority support',
        ],
        ctaText: 'See Optimization Plan',
        ctaAnchor: 'optimization-plan',
      },
    ],
  },

  // ============================================
  // FAQ
  // ============================================
  faq: [
    {
      q: 'How fast can you launch?',
      a: 'Most projects launch in 7–14 days. Timeline depends on how quickly we receive your content and feedback. Rush projects are possible for an additional fee.',
    },
    {
      q: 'How many revisions are included?',
      a: 'We include 2 rounds of revisions in every project. Additional revisions are billed hourly. Most clients need only 1 round because we align closely during discovery.',
    },
    {
      q: 'Who owns the website and code?',
      a: 'You do. Once the project is complete and paid, you own all code, content, and assets. We provide full access to everything.',
    },
    {
      q: 'Can I edit the website myself?',
      a: 'Yes. We can set up a simple CMS for basic edits, or provide documentation for direct code edits. Most clients prefer to let us handle updates via the Care Plan.',
    },
    {
      q: 'What do you need from me to get started?',
      a: 'Business basics (services, contact info), photos/logos, and any existing reviews. Don\'t worry if you\'re missing something—we\'ll help fill gaps during onboarding.',
    },
    {
      q: 'Do you handle hosting?',
      a: 'Yes. We host on high-performance infrastructure with SSL, CDN, and automatic backups included. You can also self-host if you prefer.',
    },
    {
      q: 'What exactly do you track?',
      a: 'We track meaningful actions: CTA clicks, form submissions, phone clicks, booked calls, and scroll depth. No vanity metrics—only data that connects to business outcomes.',
    },
    {
      q: 'What happens after launch?',
      a: 'We offer two retainer options: Care Plan (maintenance + stability) or Optimization Plan (active improvement + experiments). Both include monthly check-ins and priority support.',
    },
  ],

  // ============================================
  // FINAL CTA
  // ============================================
  finalCta: {
    micro: 'INITIALIZE',
    title: 'Ready to deploy your lead system?',
    subtitle: 'Get a custom audit of your current site or book a discovery call to discuss your project.',
    primaryCta: 'Book a 15-min Call',
    secondaryCta: 'Run Free Audit',
    helperLine: 'Free audit delivered in 24–48h. No spam.',
  },

  // ============================================
  // STICKY CTA (appears after scrolling past hero)
  // ============================================
  stickyCta: {
    primaryCta: 'Book a 15-min Call',
    secondaryCta: 'Run Free Audit',
  },
};

export type ProcessContent = typeof processContent;
