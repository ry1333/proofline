import { Article } from '../types';

export const aboveTheFold: Article = {
  title: 'Above-the-Fold Checklist',
  description: 'The first viewport is prime real estate. Here\'s exactly what should be there—and what shouldn\'t.',
  slug: 'above-the-fold',
  date: '2024-10-01',
  tags: ['Clarity', 'Copy'],
  readingTime: 3,
  featured: false,
  draft: true,
  keyTakeaways: [
    'Above the fold should answer: What is this? Is it for me? What should I do?',
    'One clear headline, one primary CTA, one trust signal',
    'Remove anything that doesn\'t directly support the conversion goal'
  ],
  sections: [
    {
      type: 'heading',
      level: 2,
      content: 'What "Above the Fold" Means Today'
    },
    {
      type: 'paragraph',
      content: 'The "fold" isn\'t a fixed line anymore—screen sizes vary wildly. But the principle remains: the first thing visitors see matters most. This is where you make or break their decision to keep scrolling.'
    },
    {
      type: 'paragraph',
      content: 'Your above-the-fold content should answer three questions instantly: What is this? Is it for me? What should I do next?'
    },
    {
      type: 'heading',
      level: 2,
      content: 'The Essential Elements'
    },
    {
      type: 'list',
      content: [
        'Clear headline stating your value proposition',
        'Brief supporting text (1-2 sentences max)',
        'One primary CTA button',
        'Simple trust indicator (review score, client count)',
        'Navigation that doesn\'t compete with the CTA'
      ]
    },
    {
      type: 'heading',
      level: 2,
      content: 'What to Remove'
    },
    {
      type: 'list',
      content: [
        'Sliders and carousels (they dilute focus)',
        'Multiple competing CTAs',
        'Generic stock photos that add no information',
        'Walls of text',
        'Auto-playing video'
      ]
    },
    {
      type: 'paragraph',
      content: '[This article will be expanded with detailed examples and implementation guidance.]'
    }
  ],
  furtherReading: [
    'Nielsen Norman Group: Above the fold research',
    'CXL: Hero section best practices'
  ]
};

export const formFriction: Article = {
  title: 'Form Friction: Fewer Fields, Better Leads',
  description: 'Every form field is a barrier. Learn how to capture what you need without losing leads to abandonment.',
  slug: 'form-friction',
  date: '2024-09-25',
  tags: ['Friction', 'Clarity'],
  readingTime: 3,
  featured: false,
  draft: true,
  keyTakeaways: [
    'Each additional form field reduces conversion rate',
    'Ask only for what you need to take the next step',
    'Multi-step forms can outperform long single-step forms'
  ],
  sections: [
    {
      type: 'heading',
      level: 2,
      content: 'The Cost of Every Field'
    },
    {
      type: 'paragraph',
      content: 'Form fields aren\'t free. Each one requires a decision from the visitor: Do I want to share this? Do I know this information? Is it worth the effort? The more fields, the more reasons to abandon.'
    },
    {
      type: 'paragraph',
      content: 'Research consistently shows that reducing form fields increases submissions. The question is: what\'s the minimum you need to take the next step?'
    },
    {
      type: 'heading',
      level: 2,
      content: 'The Minimum Viable Form'
    },
    {
      type: 'paragraph',
      content: 'For most service businesses, you need a way to contact the person (email or phone) and enough context to have a useful conversation. That\'s often just 2-3 fields.'
    },
    {
      type: 'list',
      content: [
        'Name (first name is often enough)',
        'Contact method (email or phone)',
        'Brief description of need (optional, or dropdown)'
      ]
    },
    {
      type: 'heading',
      level: 2,
      content: 'When to Use Multi-Step Forms'
    },
    {
      type: 'paragraph',
      content: 'If you genuinely need more information, multi-step forms often outperform long single-step forms. Breaking the process into smaller commitments reduces perceived effort.'
    },
    {
      type: 'paragraph',
      content: '[This article will be expanded with form design patterns and A/B testing examples.]'
    }
  ],
  furtherReading: [
    'Baymard Institute: Form usability research',
    'HubSpot: Form optimization studies'
  ]
};

export const caseStudiesThatSell: Article = {
  title: 'Case Studies That Sell: How to Write Them',
  description: 'Most case studies are boring. Here\'s how to structure them so they actually convince prospects to take action.',
  slug: 'case-studies-that-sell',
  date: '2024-09-20',
  tags: ['Proof', 'Trust', 'Copy'],
  readingTime: 3,
  featured: false,
  draft: true,
  keyTakeaways: [
    'Structure: Problem → Solution → Measurable Result',
    'Lead with the outcome, not the process',
    'Include specific numbers whenever possible'
  ],
  sections: [
    {
      type: 'heading',
      level: 2,
      content: 'Why Most Case Studies Fail'
    },
    {
      type: 'paragraph',
      content: 'Most case studies read like project reports: "We did this, then this, then this." They focus on what the company did rather than what the client got. Prospects don\'t care about your process—they care about results.'
    },
    {
      type: 'heading',
      level: 2,
      content: 'The Structure That Works'
    },
    {
      type: 'list',
      content: [
        'Lead with the result: Start with the headline outcome',
        'Establish the problem: What was the client struggling with?',
        'Describe the solution: What did you do (briefly)?',
        'Show the impact: Specific, measurable outcomes',
        'Include a quote: Let the client validate in their own words'
      ]
    },
    {
      type: 'heading',
      level: 2,
      content: 'Making Results Concrete'
    },
    {
      type: 'paragraph',
      content: 'Vague results don\'t convince. "Improved their marketing" means nothing. "Increased lead volume by 47% in 90 days" is specific and credible. If you don\'t have exact numbers, use directional language: "reduced response time from hours to minutes."'
    },
    {
      type: 'paragraph',
      content: '[This article will be expanded with templates and examples of effective case studies.]'
    }
  ],
  furtherReading: [
    'CXL: Case study best practices',
    'Copyblogger: Storytelling in marketing'
  ]
};
