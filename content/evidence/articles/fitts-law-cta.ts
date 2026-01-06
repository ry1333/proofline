import { Article } from '../types';

export const fittsLawCta: Article = {
  title: "Fitts's Law: Why Button Size and Placement Matter",
  description: "The time to reach a target is a function of distance and size. Research from 1954 still defines how we design clickable elements today.",
  slug: 'fitts-law-cta',
  date: '2024-10-28',
  tags: ['Friction', 'Mobile', 'Clarity'],
  readingTime: 5,
  featured: false,
  sourceIds: ['fitts-1954', 'nng-fitts-law'],
  citations: [
    { key: '1', sourceId: 'fitts-1954', usedFor: 'Original research on movement time and target acquisition' },
    { key: '2', sourceId: 'nng-fitts-law', usedFor: 'UX applications and practical guidelines' },
  ],
  keyTakeaways: [
    "Movement time increases with distance and decreases with target size [1]",
    "Larger buttons and closer placement reduce interaction cost [2]",
    "On mobile, tap targets should be at least 48×48 pixels for reliable interaction",
  ],
  sections: [
    {
      type: 'heading',
      level: 2,
      content: 'The Original Research'
    },
    {
      type: 'paragraph',
      content: "In 1954, psychologist Paul Fitts published research in the Journal of Experimental Psychology on human motor control that would eventually become foundational to interface design. His key finding: the time required to move to a target depends on the distance to the target and the size of the target.",
      cite: '1'
    },
    {
      type: 'stat',
      content: "Fitts's Law formula: MT = a + b × log₂(2D/W), where MT is movement time, D is distance, and W is target width.",
      cite: '1'
    },
    {
      type: 'paragraph',
      content: "The practical implication: larger targets that are closer to the user's current position are faster and easier to interact with. This applies to mouse cursors, touch screens, and any pointing interaction."
    },
    {
      type: 'heading',
      level: 2,
      content: 'Why This Matters for Conversion'
    },
    {
      type: 'paragraph',
      content: "Every interaction on your website has a cost. Fitts's Law quantifies part of that cost: the physical effort required to reach and click a target. When buttons are small or far from where users expect them, you're adding unnecessary friction.",
      cite: '2'
    },
    {
      type: 'lab-note',
      title: 'Mobile Impact',
      content: "Fitts's Law is especially critical on mobile. Thumbs are imprecise, screens are small, and users are often in distracting environments. A button that's easy to tap on desktop can be frustrating on mobile, leading to mis-taps and abandonment.",
      cite: '2'
    },
    {
      type: 'heading',
      level: 2,
      content: 'Applying Fitts\'s Law to CTAs'
    },
    {
      type: 'heading',
      level: 3,
      content: 'Make Buttons Larger'
    },
    {
      type: 'paragraph',
      content: "Bigger targets are faster to reach and less error-prone. Nielsen Norman Group recommends minimum tap targets of 1cm × 1cm (roughly 48×48 pixels) with adequate spacing between targets.",
      cite: '2'
    },
    {
      type: 'heading',
      level: 3,
      content: 'Place CTAs Strategically'
    },
    {
      type: 'paragraph',
      content: "Distance matters. On desktop, corners and edges of the screen are \"infinite targets\"—users can slam the cursor in that direction without overshooting. On mobile, the lower center of the screen is in the natural thumb zone."
    },
    {
      type: 'heading',
      level: 3,
      content: 'Consider the Flow'
    },
    {
      type: 'paragraph',
      content: "Where will the user's cursor or thumb be when they're ready to click? After reading a form, their attention is at the bottom. After scrolling through benefits, they're likely center-screen. Place CTAs in the path they're already on."
    },
    {
      type: 'heading',
      level: 2,
      content: 'Common Fitts\'s Law Violations'
    },
    {
      type: 'list',
      content: [
        'Tiny \"Submit\" buttons on forms that don\'t scale with the form width',
        'Text links instead of buttons for important actions',
        'CTAs buried in corners away from the content that motivated the click',
        'Touch targets with insufficient padding between them (causing mis-taps)',
        'Floating action buttons placed in thumb-unfriendly zones on mobile'
      ]
    },
    {
      type: 'heading',
      level: 2,
      content: 'Practical Guidelines'
    },
    {
      type: 'paragraph',
      content: "Based on Fitts's Law and usability research, here are concrete recommendations:",
      cite: '2'
    },
    {
      type: 'list',
      content: [
        'Desktop buttons: Minimum 44×44 pixels, ideally larger for primary CTAs',
        'Mobile tap targets: Minimum 48×48 pixels with 8px spacing between targets',
        'Form submit buttons: Full width or at least as wide as the longest input field',
        'Sticky CTAs: Consider fixed-position buttons for long pages',
        'Cursor proximity: Place secondary actions near primary ones when both are relevant'
      ]
    },
    {
      type: 'checklist',
      title: 'Implementation Checklist',
      content: [
        'Measure your CTA buttons: Are they at least 44×44px on desktop?',
        'Test on mobile: Can you reliably tap buttons with your thumb?',
        'Check spacing: Is there enough room between tap targets?',
        'Review form flow: Is the submit button easy to reach after filling fields?',
        'Consider sticky CTAs: Would a fixed button help on longer pages?'
      ]
    },
    {
      type: 'measurement',
      title: 'What We Measure',
      content: [
        'cta_click: Conversion on primary buttons',
        'rage_clicks: Repeated rapid clicks indicating frustration',
        'mis_tap_rate: Clicks on elements adjacent to the intended target',
        'time_to_click: Correlation between button size/position and click speed',
        'mobile_vs_desktop: Conversion rate differences by device type'
      ]
    },
    {
      type: 'paragraph',
      content: "Fitts's Law reminds us that interface design is physical. The easier you make it to reach and click your most important elements, the more people will do so."
    }
  ]
};
