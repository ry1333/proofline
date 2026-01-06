import { Article } from '../types';

export const hicksLaw: Article = {
  title: "Hick's Law: How Too Many Choices Kill Conversions",
  description: "The time to make a decision increases logarithmically with the number of options. Here's how to apply this 70-year-old principle to modern web design.",
  slug: 'hicks-law',
  date: '2024-11-05',
  tags: ['Choice', 'Clarity', 'Friction'],
  readingTime: 6,
  featured: false,
  sourceIds: ['hick-1952', 'nng-hicks-law'],
  citations: [
    { key: '1', sourceId: 'hick-1952', usedFor: 'Original research on decision time and choice' },
    { key: '2', sourceId: 'nng-hicks-law', usedFor: 'UX applications of Hick\'s Law' },
  ],
  keyTakeaways: [
    "Decision time increases logarithmically with the number of choices [1]",
    "Fewer options don't just speed up decisions—they increase the likelihood of any decision being made",
    "The principle applies to navigation, pricing tiers, CTAs, and feature lists [2]",
  ],
  sections: [
    {
      type: 'heading',
      level: 2,
      content: 'The Original Research'
    },
    {
      type: 'paragraph',
      content: "In 1952, British psychologist W.E. Hick published research in the Quarterly Journal of Experimental Psychology showing that the time it takes to make a decision increases logarithmically with the number of alternatives. The more options you present, the longer it takes for someone to choose—and the more likely they are to choose nothing at all.",
      cite: '1'
    },
    {
      type: 'stat',
      content: "Hick's original formula: RT = a + b × log₂(n), where RT is reaction time and n is the number of choices.",
      cite: '1'
    },
    {
      type: 'paragraph',
      content: "This wasn't just theoretical. Hick's experiments measured actual response times and found a predictable, mathematical relationship between options and decision speed."
    },
    {
      type: 'heading',
      level: 2,
      content: 'What This Means for Web Design'
    },
    {
      type: 'paragraph',
      content: "Every time you present options on your website—navigation items, pricing tiers, product variants, form choices—you're asking visitors to make decisions. Each decision point is a moment where they might leave instead.",
      cite: '2'
    },
    {
      type: 'lab-note',
      title: 'The Paradox of Choice',
      content: "More options feel like more value to the business owner. But to the visitor, more options mean more work. The paradox: by offering everything, you make it harder for anyone to choose anything."
    },
    {
      type: 'heading',
      level: 2,
      content: 'Where Hick\'s Law Applies'
    },
    {
      type: 'heading',
      level: 3,
      content: 'Navigation Menus'
    },
    {
      type: 'paragraph',
      content: "Every item in your navigation is a choice. Nielsen Norman Group suggests keeping primary navigation manageable and using categorization to reduce visible choices. Beyond 7±2 items, visitors spend more time scanning than acting.",
      cite: '2'
    },
    {
      type: 'heading',
      level: 3,
      content: 'Pricing Pages'
    },
    {
      type: 'paragraph',
      content: "Three pricing tiers is the classic pattern for a reason. More than three, and visitors struggle to compare. With three, you can create a clear \"good, better, best\" hierarchy that guides them toward a decision."
    },
    {
      type: 'heading',
      level: 3,
      content: 'Calls to Action'
    },
    {
      type: 'paragraph',
      content: "One primary CTA per page section is the goal. When you have \"Schedule a Demo,\" \"Watch Video,\" \"Download Whitepaper,\" and \"Contact Us\" all competing, none of them win. Pick the action that matters most and make it obvious."
    },
    {
      type: 'heading',
      level: 3,
      content: 'Form Fields'
    },
    {
      type: 'paragraph',
      content: "Dropdowns with 50 options are Hick's Law violations. If you must present many options, use autocomplete search or progressive disclosure. Let users narrow down choices rather than scanning a massive list."
    },
    {
      type: 'heading',
      level: 2,
      content: 'Applying This Strategically'
    },
    {
      type: 'paragraph',
      content: "Reducing choices doesn't mean removing value. It means being strategic about when and how you present options:"
    },
    {
      type: 'list',
      content: [
        'Prioritize: What\'s the one action you most want visitors to take? Make that prominent.',
        'Sequence: Instead of showing everything at once, reveal options progressively',
        'Categorize: Group similar options to reduce perceived complexity',
        'Default: Pre-select the most common choice where appropriate',
        'Hide: Move secondary options to \"Advanced\" or expandable sections'
      ]
    },
    {
      type: 'checklist',
      title: 'Implementation Checklist',
      content: [
        'Count your main navigation items: Can you reduce to 7 or fewer?',
        'Review your pricing page: Are you presenting more than 3-4 clear options?',
        'Check each page section: Is there one clear primary CTA?',
        'Audit your forms: Are there dropdowns with more than 10 options?',
        'Test removal: Try removing one option and measure the impact on conversions'
      ]
    },
    {
      type: 'measurement',
      title: 'What We Measure',
      content: [
        'nav_click: Which navigation items get used (and which don\'t)',
        'pricing_tier_select: Which tier visitors choose most often',
        'cta_click_rate: Conversion rate on primary CTA',
        'time_to_click: How long visitors take before clicking',
        'dropdown_abandon: Where visitors leave long selection lists'
      ]
    },
    {
      type: 'paragraph',
      content: "Hick's Law isn't about dumbing down your offering. It's about respecting your visitors' limited attention and making the path to conversion as clear as possible."
    }
  ]
};
