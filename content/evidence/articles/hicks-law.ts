import { Article } from '../types';

export const hicksLaw: Article = {
  title: "Hick's Law in Web Design: Fewer Choices, More Action",
  description: "Every additional option on your page increases decision time. Learn how to structure navigation, CTAs, and service offerings to help visitors choose faster.",
  slug: 'hicks-law',
  date: '2024-11-05',
  tags: ['Choice', 'Clarity'],
  readingTime: 6,
  featured: false,
  keyTakeaways: [
    "Hick's Law: Decision time increases logarithmically with the number of choices",
    "More options often leads to fewer conversions, not more—a phenomenon called choice overload",
    "Strategic reduction of choices at key decision points accelerates the path to conversion"
  ],
  sections: [
    {
      type: 'heading',
      level: 2,
      content: 'How Choice Overload Kills Conversions'
    },
    {
      type: 'paragraph',
      content: "Hick's Law, named after psychologist William Edmund Hick, describes a simple relationship: the more options someone has, the longer it takes them to make a decision. In web design, longer decision times mean more opportunities for visitors to abandon the process entirely."
    },
    {
      type: 'paragraph',
      content: "This seems counterintuitive. Shouldn't more options be better? Shouldn't visitors appreciate having choices? Research suggests otherwise. When faced with too many options, people often experience decision paralysis—they choose nothing rather than risk choosing wrong."
    },
    {
      type: 'lab-note',
      title: 'The Jam Study',
      content: "The famous jam study by Sheena Iyengar found that shoppers were far more likely to purchase when presented with 6 options versus 24. More variety attracted attention, but fewer options drove action. This pattern repeats across industries and contexts."
    },
    {
      type: 'paragraph',
      content: "On your website, every link in your navigation, every service listed, every pricing tier, and every CTA button is a choice. Each one adds to the cognitive burden your visitors carry as they try to figure out what to do next."
    },
    {
      type: 'heading',
      level: 2,
      content: 'Navigation and CTA Patterns That Reduce Friction'
    },
    {
      type: 'paragraph',
      content: "The most common offenders are bloated navigation menus and unclear CTA hierarchies. Here's how to fix them:"
    },
    {
      type: 'heading',
      level: 3,
      content: 'Navigation'
    },
    {
      type: 'paragraph',
      content: "Most visitors use navigation to orient themselves and find one or two key pages. They don't need access to every page from the main menu. A focused navigation with 4-6 items serves the vast majority of use cases."
    },
    {
      type: 'list',
      content: [
        'Prioritize by visitor intent: What do most visitors actually want to find?',
        'Use dropdowns sparingly: They add complexity and are often ignored',
        'Consider progressive disclosure: Show basic options first, reveal more only when needed',
        'Mobile matters more: Hamburger menus already limit choices—apply the same thinking to desktop'
      ]
    },
    {
      type: 'heading',
      level: 3,
      content: 'CTAs'
    },
    {
      type: 'paragraph',
      content: "Every page should have a clear primary action. If you want visitors to book a call, make that button prominent and repeat it where it makes sense. Don't dilute attention with competing actions of equal visual weight."
    },
    {
      type: 'list',
      content: [
        'One primary CTA per viewport: Don\'t make visitors choose between two equally prominent options',
        'Consistent CTA language: Use the same phrasing throughout (e.g., "Book a Call" everywhere, not "Contact Us" in some places)',
        'Visual hierarchy: Primary CTAs should be visually dominant; secondary options visually subdued'
      ]
    },
    {
      type: 'heading',
      level: 2,
      content: 'Service Sites vs SaaS: What Changes'
    },
    {
      type: 'paragraph',
      content: "Service businesses and SaaS products face different choice architecture challenges."
    },
    {
      type: 'heading',
      level: 3,
      content: 'Service Businesses'
    },
    {
      type: 'paragraph',
      content: "The main challenge is often too many service offerings presented at once. A landscaping company might offer 15 different services, but listing all of them creates overwhelm. Better: group into 3-4 categories, with detail pages for those who want specifics."
    },
    {
      type: 'heading',
      level: 3,
      content: 'SaaS Products'
    },
    {
      type: 'paragraph',
      content: "SaaS companies often struggle with pricing tiers and feature comparisons. The classic three-tier pricing model works precisely because it limits choice while offering perceived flexibility. More than three tiers typically reduces conversion rates."
    },
    {
      type: 'lab-note',
      title: 'The Decoy Effect',
      content: "Strategic pricing often uses a 'decoy' tier to make the preferred option look like better value. This reduces effective choices from three to two while maintaining the appearance of flexibility."
    },
    {
      type: 'heading',
      level: 2,
      content: 'Implementation Checklist'
    },
    {
      type: 'checklist',
      title: "Apply Hick's Law",
      content: [
        'Audit your navigation: Can you reduce to 5 items or fewer?',
        'Review CTAs: Is there one clear primary action on each page?',
        'Check service listings: Are they grouped into digestible categories?',
        'Examine your pricing: Are you offering too many tiers?',
        'Test on mobile first: Constraints often reveal what\'s truly essential',
        'Watch user recordings: Where do visitors hesitate?'
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
        'nav_click: Which navigation items are actually used?',
        'cta_click_by_location: Which CTA placements drive action?',
        'time_on_page: Does reduced choice speed up decisions?',
        'exit_page: Where do visitors leave the site?'
      ]
    },
    {
      type: 'paragraph',
      content: "Hick's Law reminds us that helping visitors decide is as important as giving them options. The goal isn't to limit what's possible—it's to make the right choice obvious."
    }
  ],
  furtherReading: [
    'Sheena Iyengar: The Art of Choosing',
    'Barry Schwartz: The Paradox of Choice',
    'Nielsen Norman Group: Navigation design research'
  ]
};
