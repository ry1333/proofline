import { Article } from '../types';

export const fittsLawCta: Article = {
  title: "Fitts's Law: Make Your CTA Unmissable (Without Looking Spammy)",
  description: "The science of tap targets and button design. Learn how size, placement, and contrast affect click rates—and how to apply these principles without overwhelming your visitors.",
  slug: 'fitts-law-cta',
  date: '2024-10-20',
  tags: ['Copy', 'Clarity', 'Mobile'],
  readingTime: 5,
  featured: false,
  keyTakeaways: [
    "Fitts's Law: Larger, closer targets are easier to click—but there are diminishing returns",
    "Mobile tap targets should be at least 44x44 pixels; smaller buttons frustrate users and hurt conversions",
    "Sticky CTAs can increase engagement when done tastefully, but aggressive implementation backfires"
  ],
  sections: [
    {
      type: 'heading',
      level: 2,
      content: 'Tap Targets and Mobile Realities'
    },
    {
      type: 'paragraph',
      content: "Fitts's Law, developed by psychologist Paul Fitts, describes the time required to move to a target area: larger targets that are closer to the starting position are easier to hit. In web design, this translates directly to button size and placement."
    },
    {
      type: 'paragraph',
      content: "On mobile devices, this matters enormously. Thumbs are imprecise instruments. Tap targets that work fine with a mouse cursor become frustrating on a phone screen. If visitors have to zoom in or repeatedly tap to hit your button, you're losing conversions."
    },
    {
      type: 'lab-note',
      title: 'The 44px Standard',
      content: "Apple's Human Interface Guidelines recommend a minimum tap target of 44x44 points. Google suggests 48x48 CSS pixels. These aren't arbitrary—they're based on ergonomic research about average finger size and touch accuracy."
    },
    {
      type: 'paragraph',
      content: "Small buttons don't just frustrate users—they signal low importance. A tiny 'Contact Us' link tucked in a corner suggests you don't actually want visitors to contact you."
    },
    {
      type: 'heading',
      level: 2,
      content: 'Button Size, Contrast, and Placement'
    },
    {
      type: 'heading',
      level: 3,
      content: 'Size'
    },
    {
      type: 'paragraph',
      content: "Your primary CTA should be one of the largest clickable elements on the page. This doesn't mean obnoxiously huge—but it should be clearly more prominent than secondary actions and navigation links."
    },
    {
      type: 'list',
      content: [
        'Primary CTAs: At least 44px tall on mobile, with generous horizontal padding',
        'Secondary CTAs: Slightly smaller than primary, but still easily tappable',
        'Text links: Reserve for low-priority actions',
        'Use padding generously: It increases the tap target without making the button text huge'
      ]
    },
    {
      type: 'heading',
      level: 3,
      content: 'Contrast'
    },
    {
      type: 'paragraph',
      content: "Buttons need to visually stand out from their surroundings. On a dark site like this one, a bright accent color (like green) creates immediate visual distinction. The button should be the first thing the eye lands on in its section."
    },
    {
      type: 'paragraph',
      content: "Check contrast ratios for accessibility. The text on your button needs to be readable—WCAG guidelines recommend at least 4.5:1 contrast for normal text, 3:1 for large text."
    },
    {
      type: 'heading',
      level: 3,
      content: 'Placement'
    },
    {
      type: 'paragraph',
      content: "Users expect CTAs in certain locations: after headline/value proposition, at the end of content sections, and in a fixed header or footer. Placing buttons where visitors already look reduces the distance their attention must travel."
    },
    {
      type: 'list',
      content: [
        'Above the fold: At least one CTA should be visible without scrolling',
        'After value proposition: Once you\'ve explained the benefit, offer the action',
        'End of sections: Natural pause points where visitors decide what to do next',
        'Repeated at intervals: Long pages benefit from periodic CTA reminders'
      ]
    },
    {
      type: 'heading',
      level: 2,
      content: 'Sticky CTA Bars Done Right'
    },
    {
      type: 'paragraph',
      content: "Sticky CTAs—fixed headers or footers that stay visible while scrolling—can significantly increase engagement. They keep the action always within reach. But they can also annoy visitors if done poorly."
    },
    {
      type: 'heading',
      level: 3,
      content: 'Good Sticky CTA Practices'
    },
    {
      type: 'list',
      content: [
        'Keep it minimal: One or two buttons, not a full navigation bar',
        'Make it dismissible: Or at least unobtrusive enough that it doesn\'t frustrate',
        'Delay appearance: Show it after the visitor has scrolled past the hero CTA',
        'Don\'t cover content: The bar should be slim and positioned where it won\'t interfere',
        'Match the page design: It should feel integrated, not bolted on'
      ]
    },
    {
      type: 'heading',
      level: 3,
      content: 'What to Avoid'
    },
    {
      type: 'list',
      content: [
        'Massive sticky bars that eat up screen real estate',
        'Multiple competing sticky elements (chat widget + CTA bar + cookie banner)',
        'Aggressive colors or animations that distract from content',
        'Sticky elements that cover form fields or important content'
      ]
    },
    {
      type: 'lab-note',
      title: 'Test Your Mobile Experience',
      content: "Load your site on your phone and try to use it. Can you easily tap the main CTA with your thumb? Does the sticky bar cover content or form fields? Does it feel helpful or annoying? Your gut reaction is probably similar to your visitors'."
    },
    {
      type: 'heading',
      level: 2,
      content: 'Implementation Checklist'
    },
    {
      type: 'checklist',
      title: "Apply Fitts's Law",
      content: [
        'Audit button sizes: Are all tap targets at least 44px?',
        'Check contrast: Do CTAs visually pop from the background?',
        'Review placement: Is there a CTA above the fold?',
        'Test on mobile: Can you easily tap the main CTA with your thumb?',
        'Consider a sticky CTA: Would it help or annoy?',
        'Watch session recordings: Do visitors struggle to hit buttons?'
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
        'cta_click_by_location: Which button placements drive action?',
        'sticky_cta_click: Does the sticky bar contribute to conversions?',
        'rage_clicks: Multiple clicks in same area (indicates frustration)',
        'mobile_vs_desktop: Conversion rate by device type'
      ]
    },
    {
      type: 'paragraph',
      content: "Fitts's Law is about making action easy. When the path from attention to click is frictionless, more visitors become leads."
    }
  ],
  furtherReading: [
    'Apple Human Interface Guidelines: Touch targets',
    'Google Material Design: Touch and click targets',
    'Nielsen Norman Group: Mobile usability',
    'Baymard Institute: Mobile UX research'
  ]
};
