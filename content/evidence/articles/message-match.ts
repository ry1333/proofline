import { Article } from '../types';

export const messageMatch: Article = {
  title: 'Message Match: Why Visitors Bounce When Expectations Break',
  description: 'Nielsen Norman Group research on information scent explains why visitors leave when landing pages don\'t match what brought them there. Here\'s how to align messaging across touchpoints.',
  slug: 'message-match',
  date: '2024-10-15',
  tags: ['Copy', 'Clarity', 'Trust'],
  readingTime: 6,
  featured: false,
  sourceIds: ['nng-info-scent', 'google-quality-score'],
  citations: [
    { key: '1', sourceId: 'nng-info-scent', usedFor: 'Information scent and user navigation behavior' },
    { key: '2', sourceId: 'google-quality-score', usedFor: 'Landing page experience and Quality Score' },
  ],
  keyTakeaways: [
    'Users follow "information scent"—cues that predict what they\'ll find. Weak scent causes abandonment [1]',
    'Google Ads Quality Score explicitly factors in landing page relevance and experience [2]',
    'Message match means your landing page headline should mirror the ad, search result, or link that brought visitors there',
  ],
  sections: [
    {
      type: 'heading',
      level: 2,
      content: 'The Science of Information Scent'
    },
    {
      type: 'paragraph',
      content: "When someone clicks a link, they have a specific expectation. They saw a promise—in an ad, a search result, or a social post—and they clicked because that promise matched their intent. Nielsen Norman Group research describes this as \"information scent\": the cues users follow to predict what they'll find.",
      cite: '1'
    },
    {
      type: 'stat',
      content: 'Users follow information scent like animals foraging for food—they abandon paths with weak scent and pursue strong scent.',
      cite: '1'
    },
    {
      type: 'paragraph',
      content: "When your landing page doesn't immediately confirm they're in the right place, the scent breaks. This happens in milliseconds. Visitors don't read your page carefully, then decide it's not relevant. They glance at the headline, don't see what they expected, and hit the back button."
    },
    {
      type: 'heading',
      level: 2,
      content: 'Why Google Cares About This'
    },
    {
      type: 'paragraph',
      content: "If you're running Google Ads, message match isn't just good UX—it directly affects your ad performance. Google's Quality Score explicitly includes \"landing page experience\" as a component, which measures whether your landing page content is relevant to the ad and useful to users.",
      cite: '2'
    },
    {
      type: 'lab-note',
      title: 'The Quality Score Connection',
      content: "Higher Quality Scores mean lower costs per click and better ad positions. Google rewards advertisers whose landing pages deliver on what the ad promises. Message mismatch costs you twice: once in bounces, again in higher ad costs.",
      cite: '2'
    },
    {
      type: 'heading',
      level: 2,
      content: 'Aligning Headlines with Traffic Sources'
    },
    {
      type: 'heading',
      level: 3,
      content: 'Paid Ads'
    },
    {
      type: 'paragraph',
      content: "If your ad says \"Emergency Plumbing - Available 24/7,\" your landing page headline should say something like \"24/7 Emergency Plumbing\" or \"Emergency Plumber Available Now\"—not \"Welcome to ABC Plumbing, Your Full-Service Plumbing Experts.\""
    },
    {
      type: 'list',
      content: [
        'Mirror the ad headline language in your page headline',
        'Use the same key phrases and promises',
        'Match the visual style if the ad has imagery',
        'Consider dedicated landing pages for different ad campaigns'
      ]
    },
    {
      type: 'heading',
      level: 3,
      content: 'Organic Search'
    },
    {
      type: 'paragraph',
      content: "For SEO traffic, the \"ad\" is your title tag and meta description. If someone searches \"best roof repair denver\" and clicks your result, the landing page should clearly be about roof repair in Denver—not your generic homepage.",
      cite: '1'
    },
    {
      type: 'heading',
      level: 3,
      content: 'Social and Referral'
    },
    {
      type: 'paragraph',
      content: "If you're promoting specific content or offers on social media, the landing page should match that specific content or offer. Don't send social traffic to your homepage and hope they find what was promoted."
    },
    {
      type: 'heading',
      level: 2,
      content: 'Service Pages That Match Local Intent'
    },
    {
      type: 'paragraph',
      content: "Local service businesses often underestimate the importance of location-specific landing pages. Someone searching \"HVAC repair Phoenix\" has different intent than someone searching \"HVAC company\"—and they expect to see Phoenix mentioned on the page they land on."
    },
    {
      type: 'list',
      content: [
        'Create location-specific pages for each service area',
        'Include the city/region name in the headline',
        'Mention local landmarks, neighborhoods, or context',
        'Show local reviews and testimonials when possible',
        'Include a local phone number and address'
      ]
    },
    {
      type: 'heading',
      level: 2,
      content: 'Common Message Match Mistakes'
    },
    {
      type: 'list',
      content: [
        'Sending all ad traffic to the homepage',
        'Using generic headlines that could apply to any business',
        'Promoting specific offers but landing on general service pages',
        'Ignoring location intent for local searches',
        'Changing the offer between ad and landing page (bait and switch)'
      ]
    },
    {
      type: 'checklist',
      title: 'Implementation Checklist',
      content: [
        'Audit your top traffic sources: Where are visitors coming from?',
        'Compare ad copy to landing page headlines: Do they match?',
        'Check search queries: What are people actually searching?',
        'Create dedicated landing pages for major campaigns',
        'Build location-specific pages for local service areas',
        'Build service-specific pages for distinct offerings',
        'Test headline variations that better match intent'
      ]
    },
    {
      type: 'measurement',
      title: 'What We Measure',
      content: [
        'bounce_rate_by_source: Do some traffic sources bounce more?',
        'time_on_page_by_source: Does matched messaging increase engagement?',
        'conversion_rate_by_landing_page: Which pages convert their traffic?',
        'quality_score: Google Ads landing page experience component'
      ]
    },
    {
      type: 'paragraph',
      content: "Message match is one of the highest-leverage fixes for wasted ad spend. When visitors immediately see what they expected, they stay. When they don't, they leave—and research shows they decide in milliseconds."
    }
  ]
};
