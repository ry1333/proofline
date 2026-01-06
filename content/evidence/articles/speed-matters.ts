import { Article } from '../types';

export const speedMatters: Article = {
  title: 'Why Speed Matters: The Business Case for Fast Websites',
  description: 'Google research shows 53% of mobile users abandon sites that take longer than 3 seconds to load. Here\'s what the data says about speed and conversion.',
  slug: 'speed-matters',
  date: '2024-11-20',
  tags: ['Speed', 'Mobile'],
  readingTime: 6,
  featured: true,
  sourceIds: ['google-mobile-speed', 'webdev-speed-matters', 'webdev-cwv-business', 'google-cwv-docs'],
  citations: [
    { key: '1', sourceId: 'google-mobile-speed', usedFor: '53% mobile abandonment after 3 seconds' },
    { key: '2', sourceId: 'webdev-speed-matters', usedFor: 'Speed impact on user experience and business' },
    { key: '3', sourceId: 'webdev-cwv-business', usedFor: 'Case studies on Core Web Vitals improvements' },
    { key: '4', sourceId: 'google-cwv-docs', usedFor: 'Core Web Vitals metrics and thresholds' },
  ],
  keyTakeaways: [
    '53% of mobile users abandon sites that take longer than 3 seconds to load [1]',
    'Core Web Vitals (LCP, INP, CLS) are now Google ranking factors [4]',
    'Real-world case studies show measurable conversion improvements from speed optimization [3]',
  ],
  sections: [
    {
      type: 'heading',
      level: 2,
      content: 'The 3-Second Rule'
    },
    {
      type: 'paragraph',
      content: "Research from Google found that 53% of mobile site visitors will leave a page that takes longer than three seconds to load. This isn't a preference—it's behavior measured across millions of page views.",
      cite: '1'
    },
    {
      type: 'stat',
      content: '53% of mobile users abandon sites that take longer than 3 seconds to load.',
      cite: '1'
    },
    {
      type: 'paragraph',
      content: "The same research showed that as page load time goes from 1 second to 3 seconds, the probability of bounce increases by 32%. From 1 to 5 seconds, it increases by 90%. Speed isn't a nice-to-have—it's foundational.",
      cite: '1'
    },
    {
      type: 'heading',
      level: 2,
      content: 'Why Speed Affects Everything'
    },
    {
      type: 'paragraph',
      content: "Web.dev documentation from Google outlines how speed impacts multiple business metrics: user engagement, conversion rates, user retention, and even SEO rankings. Slow sites don't just lose impatient users—they signal low quality.",
      cite: '2'
    },
    {
      type: 'lab-note',
      title: 'The Perception Problem',
      content: "Speed perception matters as much as actual speed. A page that loads progressively (showing content as it becomes available) feels faster than one that stays blank and then appears all at once—even if the total load time is the same.",
      cite: '2'
    },
    {
      type: 'heading',
      level: 2,
      content: 'Core Web Vitals: The Metrics That Matter'
    },
    {
      type: 'paragraph',
      content: "Google's Core Web Vitals are three specific metrics that measure user experience. As of 2021, they're ranking factors in Google Search, meaning they directly affect your organic visibility.",
      cite: '4'
    },
    {
      type: 'heading',
      level: 3,
      content: 'LCP (Largest Contentful Paint)'
    },
    {
      type: 'paragraph',
      content: "LCP measures how long it takes for the main content to appear. Google considers 2.5 seconds or less as \"good.\" This is about perceived load time—when users feel the page is ready.",
      cite: '4'
    },
    {
      type: 'heading',
      level: 3,
      content: 'INP (Interaction to Next Paint)'
    },
    {
      type: 'paragraph',
      content: "INP measures responsiveness—how quickly the page responds to user interactions like clicks and taps. Good scores are 200 milliseconds or less. Sluggish interactivity frustrates users even after the page appears loaded.",
      cite: '4'
    },
    {
      type: 'heading',
      level: 3,
      content: 'CLS (Cumulative Layout Shift)'
    },
    {
      type: 'paragraph',
      content: "CLS measures visual stability—how much the page layout shifts as it loads. A good score is 0.1 or less. Layout shifts cause mis-clicks and frustration, especially on mobile.",
      cite: '4'
    },
    {
      type: 'heading',
      level: 2,
      content: 'Real-World Business Impact'
    },
    {
      type: 'paragraph',
      content: "Web.dev documents multiple case studies showing measurable business improvements from Core Web Vitals optimization. These aren't theoretical—they're documented results from real companies.",
      cite: '3'
    },
    {
      type: 'list',
      content: [
        'Reduced bounce rates when LCP improves',
        'Increased conversions when INP becomes more responsive',
        'Lower abandonment when CLS eliminates layout shifts',
        'Better SEO rankings as Core Web Vitals improve'
      ]
    },
    {
      type: 'heading',
      level: 2,
      content: 'Quick Wins for Speed'
    },
    {
      type: 'list',
      content: [
        'Compress and properly size images (often the biggest LCP culprit)',
        'Use a CDN to serve assets from locations near your users',
        'Minimize render-blocking JavaScript',
        'Reserve space for images and ads to prevent layout shifts',
        'Use modern image formats (WebP, AVIF)',
        'Implement lazy loading for below-fold content',
        'Consider a performance-focused hosting provider'
      ]
    },
    {
      type: 'checklist',
      title: 'Implementation Checklist',
      content: [
        'Run PageSpeed Insights on your key pages',
        'Check Core Web Vitals in Google Search Console',
        'Identify your largest images and optimize them',
        'Test on real mobile devices, not just desktop',
        'Set up monitoring to track speed over time',
        'Address any render-blocking resources',
        'Reserve space for dynamic content to prevent CLS'
      ]
    },
    {
      type: 'measurement',
      title: 'What We Measure',
      content: [
        'lcp: Largest Contentful Paint (target: < 2.5s)',
        'inp: Interaction to Next Paint (target: < 200ms)',
        'cls: Cumulative Layout Shift (target: < 0.1)',
        'ttfb: Time to First Byte (server response time)',
        'bounce_rate_by_speed: Correlation between load time and bounces',
        'conversion_by_speed: Does faster = more conversions?'
      ]
    },
    {
      type: 'paragraph',
      content: "Speed is no longer optional. With 53% of mobile users abandoning slow sites and Core Web Vitals affecting search rankings, performance optimization is a direct investment in conversion and visibility. The research is clear: faster sites win."
    }
  ]
};
