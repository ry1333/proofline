import { Article } from '../types';

export const cognitiveLoad: Article = {
  title: 'Cognitive Load: Why Simpler Pages Convert Better',
  description: 'Research from Nielsen Norman Group shows that reducing mental effort directly improves usability and conversion. Here\'s how to apply cognitive load theory to your website.',
  slug: 'cognitive-load',
  date: '2024-11-10',
  tags: ['Clarity', 'Friction', 'Copy'],
  readingTime: 6,
  featured: true,
  sourceIds: ['nng-cognitive-load', 'nng-form-cognitive-load'],
  citations: [
    { key: '1', sourceId: 'nng-cognitive-load', usedFor: 'Cognitive load theory in UX' },
    { key: '2', sourceId: 'nng-form-cognitive-load', usedFor: 'Form-specific cognitive load principles' },
  ],
  keyTakeaways: [
    'Every element on a page competes for the same limited mental resources [1]',
    'Reducing cognitive load is about elimination, not just simplification',
    'Form design is particularly sensitive to cognitive load—each field adds friction [2]',
  ],
  sections: [
    {
      type: 'heading',
      level: 2,
      content: 'What Is Cognitive Load?'
    },
    {
      type: 'paragraph',
      content: "Cognitive load refers to the amount of mental effort required to process information. In the context of web design, it's the mental work a visitor must do to understand your page, evaluate your offer, and take action."
    },
    {
      type: 'paragraph',
      content: "According to Nielsen Norman Group, cognitive load in UX comes from three sources: intrinsic load (the inherent complexity of the task), extraneous load (unnecessary complexity added by poor design), and germane load (effort spent learning and forming mental models).",
      cite: '1'
    },
    {
      type: 'lab-note',
      title: 'The Key Insight',
      content: "Your visitors have limited mental bandwidth. Every element on your page—every option, every piece of text, every design flourish—competes for that same limited resource. The page that wins is the one that makes the desired action feel effortless.",
      cite: '1'
    },
    {
      type: 'heading',
      level: 2,
      content: 'How Cognitive Overload Kills Conversions'
    },
    {
      type: 'paragraph',
      content: "When cognitive load exceeds capacity, visitors don't just slow down—they leave. The brain's response to overwhelm is often to avoid the decision entirely. This manifests as:"
    },
    {
      type: 'list',
      content: [
        'High bounce rates on pages with too much information',
        'Form abandonment when fields feel overwhelming',
        'Decision paralysis when options are unclear or too numerous',
        'Reduced trust when the page feels cluttered or confusing'
      ]
    },
    {
      type: 'heading',
      level: 2,
      content: 'Reducing Cognitive Load: Four Principles'
    },
    {
      type: 'heading',
      level: 3,
      content: '1. Eliminate Before You Simplify'
    },
    {
      type: 'paragraph',
      content: "The most effective way to reduce cognitive load is to remove elements entirely. Before asking \"how can I make this simpler?\", ask \"do I need this at all?\" Every navigation item, every section, every word should justify its existence."
    },
    {
      type: 'heading',
      level: 3,
      content: '2. Use Recognition Over Recall'
    },
    {
      type: 'paragraph',
      content: "Recognizing something is easier than remembering it. This principle supports using clear labels, visible options, and consistent patterns. Don't make visitors remember information from earlier—show it to them.",
      cite: '1'
    },
    {
      type: 'heading',
      level: 3,
      content: '3. Chunk Information'
    },
    {
      type: 'paragraph',
      content: "Break complex information into smaller, digestible pieces. Group related items together. Use visual hierarchy to show relationships. The goal is to let visitors process one chunk at a time rather than everything at once."
    },
    {
      type: 'heading',
      level: 3,
      content: '4. Reduce Form Friction'
    },
    {
      type: 'paragraph',
      content: "Forms are particularly sensitive to cognitive load. Nielsen Norman Group identifies four key principles for form design: minimize the number of fields, use clear and specific labels, provide inline validation, and maintain a logical order.",
      cite: '2'
    },
    {
      type: 'stat',
      content: 'Each additional form field increases the mental effort required and raises the likelihood of abandonment.',
      cite: '2'
    },
    {
      type: 'heading',
      level: 2,
      content: 'Applying This to Your Website'
    },
    {
      type: 'paragraph',
      content: "Audit your key pages through the lens of cognitive load. For each element, ask: Does this help the visitor take the action I want? If the answer isn't a clear yes, it's a candidate for removal."
    },
    {
      type: 'checklist',
      title: 'Implementation Checklist',
      content: [
        'Audit your homepage: Count every distinct element competing for attention',
        'Review your forms: Can you remove any fields without losing essential information?',
        'Check your navigation: Are there items that get minimal clicks but add visual noise?',
        'Simplify your copy: Can you say the same thing in fewer words?',
        'Test with fresh eyes: Show the page to someone unfamiliar and watch where they struggle'
      ]
    },
    {
      type: 'measurement',
      title: 'What We Measure',
      content: [
        'time_on_page: How long visitors spend (too long can indicate confusion)',
        'scroll_depth: Are visitors reaching your CTA?',
        'form_field_focus_time: Which fields cause hesitation?',
        'form_abandonment: Where are visitors dropping off?',
        'click_confusion: Clicks on non-interactive elements indicate unclear hierarchy'
      ]
    },
    {
      type: 'paragraph',
      content: "Reducing cognitive load isn't about making your site boring—it's about making it clear. The clearer the path to conversion, the more visitors will take it."
    }
  ]
};
