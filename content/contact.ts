// Contact Page Content
// Edit this file to update all copy on the /contact page

export const contactContent = {
  // ============================================
  // HERO SECTION
  // ============================================
  hero: {
    title: 'Contact',
    micro: 'CONNECTION PROTOCOL',
    subhead: "Tell us what you're building. We'll respond fast and clearly.",
    expectStrip: [
      '15-min call',
      'Clear scope',
      'Measured outcomes',
      'Fast response',
    ],
    primaryCta: 'Book a 15-min Call',
    secondaryCta: 'Run Free Audit',
    helperLine: 'Free audit delivered in 24–48h. No spam.',
  },

  // ============================================
  // CONTACT METHODS
  // ============================================
  contactMethods: {
    email: 'hello@proofline.co',
    phone: '', // Optional - leave empty to hide
    locationText: 'Based in Colorado — working local + remote',
  },

  // ============================================
  // RESPONSE PROMISE
  // ============================================
  responsePromise: 'Replies within 12 hours',
  responseHours: '12', // Used in various places

  // ============================================
  // BOOK A CALL SECTION
  // ============================================
  bookCall: {
    title: 'Book a 15-min Call',
    bullets: [
      'Confirm fit for your project',
      'Get a recommended tier',
      'Walk through next steps',
    ],
    buttonText: 'Open Calendar',
    fallbackText: 'Prefer text/email? Use the form — we reply within 12 hours.',
  },

  // ============================================
  // CALENDAR CONFIG
  // ============================================
  calendar: {
    // Custom booking widget is embedded on /contact page
    // linkUrl is used for external "Book a Call" buttons
    linkUrl: '/contact#calendar',
  },

  // ============================================
  // CONTACT FORM
  // ============================================
  form: {
    title: 'Send a Message',
    fields: {
      name: {
        label: 'Name',
        placeholder: 'Your name',
        required: true,
      },
      email: {
        label: 'Email',
        placeholder: 'you@company.com',
        required: true,
      },
      phone: {
        label: 'Phone',
        placeholder: '(optional)',
        required: false,
      },
      business: {
        label: 'Business Name',
        placeholder: '(optional)',
        required: false,
      },
      website: {
        label: 'Website URL',
        placeholder: 'https://...',
        required: false,
      },
      goal: {
        label: 'Primary Goal',
        placeholder: 'Select your main goal',
        required: true,
        options: [
          { value: '', label: 'Select your main goal' },
          { value: 'more-calls', label: 'More calls' },
          { value: 'more-bookings', label: 'More bookings' },
          { value: 'more-form-leads', label: 'More form leads' },
          { value: 'better-trust', label: 'Better trust / credibility' },
          { value: 'faster-site', label: 'Faster site' },
          { value: 'not-sure', label: 'Not sure yet' },
        ],
      },
      message: {
        label: 'Message',
        placeholder: 'Tell us about your project, timeline, and any questions...',
        required: true,
      },
      wantAudit: {
        label: 'I want the Free Audit',
      },
      leadSource: {
        label: 'Where do most leads come from?',
        placeholder: 'Select source',
        options: [
          { value: '', label: 'Select source (optional)' },
          { value: 'google', label: 'Google / Search' },
          { value: 'referrals', label: 'Referrals / Word of mouth' },
          { value: 'social', label: 'Social media' },
          { value: 'ads', label: 'Paid ads' },
          { value: 'other', label: 'Other' },
        ],
      },
    },
    submitLabel: 'Send Message',
    submittingLabel: 'Sending...',
    reassurance: 'No spam. Clear replies. Typically within 12 hours.',
    successMessage: "Thanks for reaching out! We'll get back to you within 12 hours.",
    successCta: 'Want to schedule now?',
    errorMessage: 'Something went wrong. Please try again or email us directly.',
  },

  // ============================================
  // AUDIT BLURB
  // ============================================
  auditBlurb: 'Get a free audit of your current site with actionable recommendations.',

  // ============================================
  // WHAT HAPPENS NEXT
  // ============================================
  whatHappensNext: {
    title: 'What happens next',
    steps: [
      {
        id: '01',
        title: 'We reply',
        description: 'Within 12 hours with questions or next steps',
      },
      {
        id: '02',
        title: 'We review',
        description: 'Your goal + current funnel get analyzed',
      },
      {
        id: '03',
        title: 'You get a plan',
        description: 'Clear recommendation: tier + timeline + scope',
      },
    ],
  },

  // ============================================
  // QUICK LINKS
  // ============================================
  quickLinks: {
    title: 'Explore More',
    links: [
      {
        title: 'See Pricing',
        description: 'Transparent tiers for every stage',
        href: '/pricing',
      },
      {
        title: 'View the Process',
        description: 'How we diagnose, build, and iterate',
        href: '/process',
      },
      {
        title: 'Read the Evidence',
        description: 'Research-backed UX principles',
        href: '/evidence',
      },
    ],
  },

  // ============================================
  // CONTACT DETAILS PANEL
  // ============================================
  contactDetails: {
    title: 'Direct Contact',
    remoteNote: 'Remote projects welcomed.',
  },

  // ============================================
  // FAQ
  // ============================================
  faq: [
    {
      q: 'How fast do you respond?',
      a: 'We typically reply within 12 hours on business days. Urgent requests are flagged and handled faster when possible.',
    },
    {
      q: "What's the typical timeline?",
      a: 'Most projects launch in 7–14 days. Timeline depends on scope and how quickly we receive your content and feedback.',
    },
    {
      q: 'Do you work locally and remotely?',
      a: "Yes. We're based in Colorado but work with clients nationwide. Everything is handled remotely via video calls, async communication, and shared project boards.",
    },
    {
      q: 'Do I need content/photos ready?',
      a: "It helps, but it's not required to start. We'll guide you through what's needed and can help fill gaps during the onboarding process.",
    },
    {
      q: 'Can you integrate my booking system?',
      a: 'Yes. We integrate with Calendly, Cal.com, Acuity, and most popular booking tools. If you use something else, ask—we likely support it.',
    },
    {
      q: 'What tools do you use?',
      a: 'We use a modern, lightweight stack: Git-based builds, Calendly for scheduling, Formspree/Tally/Typeform for forms, Zapier/Make for automation, and Google Analytics + Search Console for tracking.',
    },
    {
      q: 'What does the free audit include?',
      a: 'A quick review of your current site covering: page speed, mobile experience, CTA clarity, trust signals, and top 3 priority recommendations. Delivered as a short video or doc within 24–48 hours.',
    },
    {
      q: 'How do payments work?',
      a: '50% to start, 50% at launch. We accept credit card, ACH, or wire transfer. No surprise fees—scope is locked before we begin.',
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
  // STICKY CTA
  // ============================================
  stickyCta: {
    primaryCta: 'Book a 15-min Call',
    secondaryCta: 'Run Free Audit',
  },
};

export type ContactContent = typeof contactContent;
