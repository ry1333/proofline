import { Article } from '../types';

export const formFriction: Article = {
  title: 'Form Friction: Research-Backed Rules for Better Conversion',
  description: 'Baymard Institute research shows the average checkout has 12 fields but only needs 8. Here\'s how to reduce form friction without losing essential information.',
  slug: 'form-friction',
  date: '2024-09-25',
  tags: ['Friction', 'Clarity'],
  readingTime: 6,
  featured: false,
  sourceIds: ['baymard-form-fields', 'baymard-input-fields'],
  citations: [
    { key: '1', sourceId: 'baymard-form-fields', usedFor: 'Research on optimal form field counts' },
    { key: '2', sourceId: 'baymard-input-fields', usedFor: 'Input field design best practices' },
  ],
  keyTakeaways: [
    'The average checkout has 12 form fields, but only 8 are actually needed [1]',
    'Each additional field increases abandonment—ask only for what you need to take the next step',
    'Baymard\'s research identifies 8 key recommendations for input field design that reduce errors and friction [2]',
  ],
  sections: [
    {
      type: 'heading',
      level: 2,
      content: 'The Cost of Every Field'
    },
    {
      type: 'paragraph',
      content: "Form fields aren't free. Each one requires a decision from the visitor: Do I want to share this? Do I know this information? Is it worth the effort? The more fields, the more reasons to abandon."
    },
    {
      type: 'paragraph',
      content: "Research from Baymard Institute, based on large-scale usability testing, found that the average checkout flow contains 12 form fields. However, their analysis showed that only 8 fields are actually necessary for most checkouts.",
      cite: '1'
    },
    {
      type: 'stat',
      content: 'The average checkout has 12 form fields, but only 8 are needed. Each unnecessary field increases abandonment.',
      cite: '1'
    },
    {
      type: 'heading',
      level: 2,
      content: 'The Minimum Viable Form'
    },
    {
      type: 'paragraph',
      content: "For most service businesses, you need a way to contact the person (email or phone) and enough context to have a useful conversation. That's often just 2-3 fields. Everything beyond that is potential friction."
    },
    {
      type: 'list',
      content: [
        'Name (first name is often enough for initial contact)',
        'Contact method (email or phone—not both required)',
        'Brief description of need (optional, or a simple dropdown)'
      ]
    },
    {
      type: 'lab-note',
      title: 'The Qualification Trap',
      content: "Many businesses add fields to \"qualify\" leads: budget, timeline, company size. But over-qualifying at the form stage filters out good prospects who don't want to commit to details yet. Qualify in the conversation, not the form."
    },
    {
      type: 'heading',
      level: 2,
      content: 'Input Field Design That Reduces Errors'
    },
    {
      type: 'paragraph',
      content: "Baymard Institute's research on input field usability identifies specific design patterns that reduce user errors and form abandonment:",
      cite: '2'
    },
    {
      type: 'list',
      content: [
        'Use a single-column layout: Multi-column forms confuse scanning patterns',
        'Match field width to expected input: A ZIP code field should be shorter than an address field',
        'Use clear, specific labels: \"Full Name\" vs. generic \"Name\"',
        'Place labels above fields: Left-aligned labels slow completion',
        'Show inline validation: Real-time feedback reduces final submission errors',
        'Auto-format inputs: Phone numbers, credit cards, dates',
        'Use appropriate input types: Email, tel, number for mobile keyboards',
        'Clearly mark optional fields: Don\'t make users guess what\'s required'
      ]
    },
    {
      type: 'heading',
      level: 2,
      content: 'When to Use Multi-Step Forms'
    },
    {
      type: 'paragraph',
      content: "If you genuinely need more information, multi-step forms often outperform long single-step forms. Breaking the process into smaller commitments reduces perceived effort and leverages the psychological principle of commitment consistency."
    },
    {
      type: 'list',
      content: [
        'Step 1: Low-commitment information (name, email)',
        'Step 2: Context (what they need help with)',
        'Step 3: Details (if necessary for qualification)',
        'Show progress: Let users see how far along they are',
        'Allow back navigation: Don\'t trap users in a linear flow'
      ]
    },
    {
      type: 'heading',
      level: 2,
      content: 'Common Form Friction Mistakes'
    },
    {
      type: 'list',
      content: [
        'Requiring both email AND phone when one would suffice',
        'Asking for company name when targeting individuals',
        'Including \"How did you hear about us?\" as a required field',
        'Using CAPTCHAs when honeypot fields would work',
        'Password requirements shown only after failed attempts',
        'Tiny touch targets on mobile devices'
      ]
    },
    {
      type: 'checklist',
      title: 'Implementation Checklist',
      content: [
        'Count your current form fields: How many can you remove?',
        'Identify truly required fields: What\'s the minimum to start a conversation?',
        'Check field widths: Do they match expected input lengths?',
        'Test on mobile: Are touch targets large enough?',
        'Add inline validation: Show errors before submission',
        'Consider multi-step: Would breaking up the form reduce perceived effort?',
        'Review your confirmation: Does it set clear expectations for next steps?'
      ]
    },
    {
      type: 'measurement',
      title: 'What We Measure',
      content: [
        'form_start: How many visitors begin filling the form?',
        'form_field_focus: Which fields are filled in what order?',
        'form_field_error: Which fields cause validation errors?',
        'form_abandonment: Where do visitors drop off?',
        'form_completion_rate: Starts vs. successful submissions',
        'form_time: How long does completion take?'
      ]
    },
    {
      type: 'paragraph',
      content: "Every form field is a small barrier. Research shows that reducing fields increases submissions—not by attracting worse leads, but by removing unnecessary friction that stops good prospects from completing the process."
    }
  ]
};
