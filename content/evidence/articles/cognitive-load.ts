import { Article } from '../types';

export const cognitiveLoad: Article = {
  title: 'Cognitive Load: Why Simple Pages Convert Better',
  description: 'Your visitors have limited mental bandwidth. Every element on your page competes for it. Learn how to reduce friction and increase conversions by designing for how the brain actually works.',
  slug: 'cognitive-load',
  date: '2024-11-10',
  tags: ['Clarity', 'Friction'],
  readingTime: 7,
  featured: true,
  keyTakeaways: [
    'The brain can only process a limited amount of information at once—every extra element on your page uses up that capacity',
    'Visitors make decisions faster and convert more often when pages have clear visual hierarchy and fewer choices',
    'The "one primary CTA per screen" rule eliminates decision paralysis and guides visitors toward action'
  ],
  sections: [
    {
      type: 'heading',
      level: 2,
      content: 'The Brain Hates Decisions Under Uncertainty'
    },
    {
      type: 'paragraph',
      content: "Cognitive load refers to the amount of mental effort required to process information. Your working memory—the part of your brain that handles active thinking—has severe limitations. It can only hold a few items at once, and it tires quickly."
    },
    {
      type: 'paragraph',
      content: "When someone lands on your website, their brain immediately starts processing: What is this? Is it relevant to me? What should I do next? Every element on your page—images, text, buttons, navigation, animations—adds to that processing burden."
    },
    {
      type: 'lab-note',
      title: 'Three Types of Cognitive Load',
      content: "Intrinsic load is the inherent complexity of the task (understanding your service). Extraneous load is friction from poor design (confusing layout, unclear copy). Germane load is the effort of building understanding (reading your value proposition). Good design minimizes extraneous load so visitors can focus on what matters."
    },
    {
      type: 'paragraph',
      content: "When cognitive load exceeds capacity, people don't just slow down—they bail. They click back to Google. They close the tab. They leave without taking action, even if your offer would have been perfect for them."
    },
    {
      type: 'heading',
      level: 2,
      content: 'Remove Choices, Shorten Scanning'
    },
    {
      type: 'paragraph',
      content: "The most effective way to reduce cognitive load is to remove unnecessary elements. This isn't about making your page sparse or boring—it's about ruthless prioritization."
    },
    {
      type: 'paragraph',
      content: "Ask yourself: Does this element directly support the goal of the page? If not, it's adding load without adding value."
    },
    {
      type: 'list',
      content: [
        'Remove competing CTAs: If you want someone to book a call, don\'t also ask them to sign up for a newsletter, follow you on social media, and read your blog',
        'Reduce navigation options: Your header doesn\'t need 12 links. Most visitors only need 3-4 paths',
        'Cut filler content: Generic stock photos, meaningless taglines, and "welcome to our website" text all add load without adding value',
        'Simplify forms: Every field is a micro-decision. Ask for the minimum you need to take the next step'
      ]
    },
    {
      type: 'heading',
      level: 2,
      content: 'The One Primary CTA Per Screen Rule'
    },
    {
      type: 'paragraph',
      content: "One of the most impactful changes you can make is committing to a single primary call-to-action per viewport. This doesn't mean you can only have one button on the page—it means that at any given scroll position, there should be one clear next step."
    },
    {
      type: 'paragraph',
      content: "When visitors see multiple CTAs of equal visual weight, they have to decide which one to click. That decision uses cognitive resources and creates friction. Many will choose neither."
    },
    {
      type: 'lab-note',
      title: 'Primary vs Secondary',
      content: "It's fine to have a secondary CTA (like 'Learn more' alongside 'Book a call'), but the visual hierarchy must be clear. Primary CTAs get high contrast, larger size, and prominent placement. Secondary CTAs should be visually subdued."
    },
    {
      type: 'heading',
      level: 2,
      content: 'Practical Before/After Examples'
    },
    {
      type: 'heading',
      level: 3,
      content: 'Navigation'
    },
    {
      type: 'paragraph',
      content: "Before: Home | About | Services | Blog | Resources | Portfolio | Testimonials | Contact | FAQ | Careers"
    },
    {
      type: 'paragraph',
      content: "After: Services | Results | Pricing | Contact"
    },
    {
      type: 'paragraph',
      content: "The streamlined navigation reduces choices by 60% while still providing access to everything visitors actually need."
    },
    {
      type: 'heading',
      level: 3,
      content: 'Hero Section'
    },
    {
      type: 'paragraph',
      content: "Before: Headline, subhead, three bullet points, video embed, two CTAs (Contact Us + Watch Demo), trust badges, and a scrolling testimonial."
    },
    {
      type: 'paragraph',
      content: "After: Clear headline, supporting subhead, one primary CTA, and a simple trust indicator."
    },
    {
      type: 'paragraph',
      content: "The simplified hero focuses attention on the value proposition and desired action. Everything else moves below the fold."
    },
    {
      type: 'heading',
      level: 2,
      content: 'Implementation Checklist'
    },
    {
      type: 'checklist',
      title: 'Reduce Cognitive Load',
      content: [
        'Audit your navigation: Can you cut it to 4-5 items?',
        'Review your hero: Is there one clear CTA above the fold?',
        'Check each section: Does every element support the section goal?',
        'Count your form fields: Can you remove any?',
        'Test on mobile: Cognitive load is even more critical on small screens',
        'Watch session recordings: Where do visitors pause or abandon?'
      ]
    },
    {
      type: 'heading',
      level: 2,
      content: 'What We Measure'
    },
    {
      type: 'measurement',
      title: 'Key Events',
      content: [
        'scroll_depth: How far do visitors scroll before leaving?',
        'time_to_first_click: How quickly do visitors engage?',
        'cta_click_rate: Primary CTA clicks / page views',
        'form_abandonment: Started but not completed',
        'bounce_rate: Left without any interaction'
      ]
    },
    {
      type: 'paragraph',
      content: "Reducing cognitive load isn't about dumbing down your message—it's about respecting your visitors' mental bandwidth. When you make it easy to understand and act, more people will."
    }
  ],
  furtherReading: [
    'Nielsen Norman Group: Cognitive load research',
    'John Sweller: Cognitive load theory',
    'Steve Krug: Don\'t Make Me Think'
  ]
};
