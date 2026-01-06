// Evidence Source Library
// Central repository of all research sources with proper citations

export type SourceType = 'article' | 'pdf' | 'video' | 'doc' | 'study';

export interface Source {
  id: string;
  title: string;
  author?: string;
  publisher: string;
  date?: string;
  url: string;
  type: SourceType;
  note: string; // One sentence: what this source supports
}

// ============================================
// SPEED / PERFORMANCE SOURCES
// ============================================

export const sources: Record<string, Source> = {
  // Speed / Performance
  'google-mobile-speed': {
    id: 'google-mobile-speed',
    title: 'Mobile Site Load Time Statistics',
    publisher: 'Think with Google',
    date: '2018',
    url: 'https://www.thinkwithgoogle.com/consumer-insights/consumer-trends/mobile-site-load-time-statistics/',
    type: 'article',
    note: 'Documents that 53% of mobile users abandon sites that take longer than 3 seconds to load.'
  },
  'webdev-speed-matters': {
    id: 'webdev-speed-matters',
    title: 'Why Does Speed Matter?',
    publisher: 'web.dev',
    url: 'https://web.dev/learn/performance/why-speed-matters',
    type: 'article',
    note: 'Explains the business and UX impact of page load performance.'
  },
  'webdev-cwv-business': {
    id: 'webdev-cwv-business',
    title: 'The Business Impact of Core Web Vitals',
    publisher: 'web.dev',
    url: 'https://web.dev/case-studies/vitals-business-impact',
    type: 'article',
    note: 'Case studies showing conversion improvements from Core Web Vitals optimization.'
  },
  'google-cwv-docs': {
    id: 'google-cwv-docs',
    title: 'Core Web Vitals Overview',
    publisher: 'Google Search Central',
    url: 'https://developers.google.com/search/docs/appearance/core-web-vitals',
    type: 'doc',
    note: 'Official documentation on LCP, INP, and CLS metrics and their thresholds.'
  },

  // Speed-to-Lead / Response Time
  'mit-lead-response': {
    id: 'mit-lead-response',
    title: 'Lead Response Management Study',
    author: 'James Oldroyd, Kristina McElheran',
    publisher: 'MIT / InsideSales.com',
    date: '2007',
    url: 'https://cdn2.hubspot.net/hub/25649/file-13535879-pdf/docs/mit_study.pdf',
    type: 'pdf',
    note: 'Found that leads contacted within 5 minutes are 21x more likely to qualify than those contacted after 30 minutes.'
  },
  'hbr-online-leads': {
    id: 'hbr-online-leads',
    title: 'The Short Life of Online Sales Leads',
    author: 'James Oldroyd, Kristina McElheran, David Elkington',
    publisher: 'Harvard Business Review',
    date: '2011-03',
    url: 'https://hbr.org/2011/03/the-short-life-of-online-sales-leads',
    type: 'article',
    note: 'Documents that the average B2B company takes 42 hours to respond to leads, and faster responders dramatically outperform.'
  },
  'lead-response-report': {
    id: 'lead-response-report',
    title: 'Lead Response Management Report',
    publisher: 'MarketingSherpa / InsideSales.com',
    url: 'https://content.marketingsherpa.com/heap/DG07SFSlides/LeadResponseManagementReport.pdf',
    type: 'pdf',
    note: 'Comprehensive data on lead decay curves and optimal response windows.'
  },

  // Cognitive Load / Clarity
  'nng-cognitive-load': {
    id: 'nng-cognitive-load',
    title: 'Minimize Cognitive Load to Maximize Usability',
    publisher: 'Nielsen Norman Group',
    url: 'https://www.nngroup.com/articles/minimize-cognitive-load/',
    type: 'article',
    note: 'Explains cognitive load theory and its application to interface design.'
  },
  'nng-form-cognitive-load': {
    id: 'nng-form-cognitive-load',
    title: '4 Principles to Reduce Cognitive Load in Forms',
    publisher: 'Nielsen Norman Group',
    date: '2025',
    url: 'https://www.nngroup.com/articles/4-principles-reduce-cognitive-load/',
    type: 'article',
    note: 'Practical guidelines for reducing mental effort in form completion.'
  },

  // Choice / Hick's Law
  'nng-hicks-law': {
    id: 'nng-hicks-law',
    title: "Hick's Law: Designing Long Menu Lists",
    publisher: 'Nielsen Norman Group',
    url: 'https://www.nngroup.com/videos/hicks-law-long-menus/',
    type: 'video',
    note: "Explains Hick's Law and how decision time increases logarithmically with choices."
  },
  'hick-1952': {
    id: 'hick-1952',
    title: 'On the Rate of Gain of Information',
    author: 'W.E. Hick',
    publisher: 'Quarterly Journal of Experimental Psychology',
    date: '1952',
    url: 'https://www2.psychology.uiowa.edu/faculty/mordkoff/InfoProc/pdfs/Hick%201952.pdf',
    type: 'pdf',
    note: 'Original research establishing the logarithmic relationship between choice count and decision time.'
  },

  // Click/Tap Targets / Fitts's Law
  'nng-fitts-law': {
    id: 'nng-fitts-law',
    title: "Fitts's Law and Its Applications in UX",
    publisher: 'Nielsen Norman Group',
    url: 'https://www.nngroup.com/articles/fitts-law/',
    type: 'article',
    note: "Comprehensive guide to applying Fitts's Law for button sizing and placement."
  },
  'fitts-1954': {
    id: 'fitts-1954',
    title: 'The Information Capacity of the Human Motor System in Controlling the Amplitude of Movement',
    author: 'Paul M. Fitts',
    publisher: 'Journal of Experimental Psychology',
    date: '1954',
    url: 'https://www2.psychology.uiowa.edu/faculty/mordkoff/infoproc/pdfs/Fitts%201954.pdf',
    type: 'pdf',
    note: 'Original research showing movement time is a function of distance and target size.'
  },

  // Trust / Social Proof
  'nng-trustworthy-design': {
    id: 'nng-trustworthy-design',
    title: 'Trustworthiness in Web Design: 4 Credibility Factors',
    publisher: 'Nielsen Norman Group',
    url: 'https://www.nngroup.com/articles/trustworthy-design/',
    type: 'article',
    note: 'Identifies design quality, upfront disclosure, comprehensive content, and connection to the rest of the web as trust factors.'
  },
  'nng-social-proof': {
    id: 'nng-social-proof',
    title: 'Social Proof in the User Experience',
    publisher: 'Nielsen Norman Group',
    url: 'https://www.nngroup.com/articles/social-proof-ux/',
    type: 'article',
    note: 'Explains how user testimonials, reviews, and usage statistics influence decisions.'
  },
  'spiegel-reviews': {
    id: 'spiegel-reviews',
    title: 'How Online Reviews Influence Sales',
    publisher: 'Spiegel Research Center, Northwestern University',
    url: 'https://spiegel.medill.northwestern.edu/how-online-reviews-influence-sales/',
    type: 'study',
    note: 'Found that displaying reviews can increase conversion rates by 270% for higher-priced products.'
  },
  'spiegel-reviews-pdf': {
    id: 'spiegel-reviews-pdf',
    title: 'How Online Reviews Influence Sales (Full Report)',
    publisher: 'Spiegel Research Center, Northwestern University',
    date: '2017-06',
    url: 'https://spiegel.medill.northwestern.edu/wp-content/uploads/sites/2/2021/04/Spiegel_Online-Review_eBook_Jun2017_FINAL.pdf',
    type: 'pdf',
    note: 'Comprehensive research showing reviews have greater impact on higher-priced and considered purchases.'
  },

  // Message Match / Information Scent
  'nng-info-scent': {
    id: 'nng-info-scent',
    title: 'Information Scent: How Users Decide Where to Go Next',
    publisher: 'Nielsen Norman Group',
    url: 'https://www.nngroup.com/articles/information-scent/',
    type: 'article',
    note: 'Explains how users follow cues to predict what they will find, and abandon pages with weak scent.'
  },
  'google-quality-score': {
    id: 'google-quality-score',
    title: 'About Quality Score',
    publisher: 'Google Ads Help',
    url: 'https://support.google.com/google-ads/answer/6167130?hl=en',
    type: 'doc',
    note: 'Documents how ad relevance and landing page experience affect Quality Score and ad performance.'
  },

  // Form Friction
  'baymard-form-fields': {
    id: 'baymard-form-fields',
    title: 'Checkout Optimization: Minimize Form Fields',
    publisher: 'Baymard Institute',
    date: '2024',
    url: 'https://baymard.com/blog/checkout-flow-average-form-fields',
    type: 'article',
    note: 'Research showing the average checkout has 12 form fields but only 8 are needed, and each extra field increases abandonment.'
  },
  'baymard-input-fields': {
    id: 'baymard-input-fields',
    title: '8 Recommendations for Creating Effective Input Fields',
    publisher: 'Baymard Institute',
    url: 'https://baymard.com/learn/input-fields',
    type: 'article',
    note: 'Best practices for input field design based on large-scale usability testing.'
  }
};

// Helper function to get a source by ID
export const getSource = (id: string): Source | undefined => {
  return sources[id];
};

// Helper function to get multiple sources by IDs
export const getSources = (ids: string[]): Source[] => {
  return ids.map(id => sources[id]).filter((s): s is Source => s !== undefined);
};

// Helper to format a source for display
export const formatSourceCitation = (source: Source): string => {
  const parts = [source.title];
  if (source.author) parts.push(source.author);
  parts.push(source.publisher);
  if (source.date) parts.push(source.date);
  return parts.join('. ');
};
