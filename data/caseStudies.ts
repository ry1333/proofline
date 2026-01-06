export interface Metric {
  label: string;
  value: string;
  isExample: boolean;
}

export interface CaseStudy {
  slug: string;
  category: string;
  name: string;
  oneLiner: string;
  deliverables: string[];
  stack: string[];
  year: number;
  thumbnail?: string;
  metrics: Metric[];
  featured?: boolean;
  // Detail page fields
  objective?: string;
  whatWeShipped?: string[];
  instrumentation?: string[];
  outcome?: string;
  timeline?: string;
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'bailey-wildfire',
    category: 'SERVICE',
    name: 'Bailey Wildfire Solutions',
    oneLiner: 'Fire mitigation company needed faster lead response and better tracking.',
    deliverables: ['WEB', 'AUTOMATION', 'TRACKING', 'CRM'],
    stack: ['Next.js', 'Tailwind', 'Zapier', 'GA4', 'GTM'],
    year: 2024,
    metrics: [
      { label: 'Speed-to-lead', value: '<60s', isExample: false },
      { label: 'Form submissions', value: '+127%', isExample: true },
      { label: 'Lighthouse score', value: '98', isExample: false },
    ],
    featured: true,
    objective: 'Replace outdated WordPress site with a conversion-optimized platform. Implement instant lead notifications and automated follow-up sequences.',
    whatWeShipped: [
      'Mobile-first landing page with clear CTAs',
      'Multi-step quote request form',
      'Instant SMS + email notifications to owner',
      'Automated follow-up sequence (24h, 72h)',
      'Google Business Profile optimization',
      'Review request automation',
    ],
    instrumentation: [
      'form_submit',
      'quote_request_start',
      'quote_request_complete',
      'click_to_call',
      'scroll_depth_50',
      'scroll_depth_90',
    ],
    outcome: 'Owner now receives leads within 60 seconds via SMS. Automated follow-up reduced manual workload by ~5 hours/week.',
    timeline: '3 weeks',
  },
  {
    slug: 'summit-dental',
    category: 'HEALTHCARE',
    name: 'Summit Dental Group',
    oneLiner: 'Multi-location dental practice needed unified booking and patient tracking.',
    deliverables: ['WEB', 'BOOKING', 'TRACKING'],
    stack: ['Webflow', 'Calendly', 'GA4', 'Segment'],
    year: 2024,
    metrics: [
      { label: 'Online bookings', value: '+85%', isExample: true },
      { label: 'Page load', value: '1.2s', isExample: false },
    ],
    objective: 'Consolidate 3 location websites into one cohesive brand with centralized booking.',
    whatWeShipped: [
      'Unified multi-location website',
      'Location-aware booking widget',
      'Patient journey tracking across touchpoints',
      'Automated appointment reminders',
    ],
    instrumentation: [
      'booking_start',
      'booking_complete',
      'location_select',
      'service_select',
    ],
    outcome: 'Patients can now book online 24/7. Front desk calls reduced significantly.',
    timeline: '4 weeks',
  },
  {
    slug: 'ironclad-roofing',
    category: 'SERVICE',
    name: 'Ironclad Roofing',
    oneLiner: 'Roofing contractor needed to capture storm-damage leads fast.',
    deliverables: ['WEB', 'AUTOMATION', 'SEO'],
    stack: ['Next.js', 'Vercel', 'Make', 'GA4'],
    year: 2024,
    metrics: [
      { label: 'Organic traffic', value: '+210%', isExample: true },
      { label: 'Lead response', value: '<2min', isExample: false },
    ],
    objective: 'Build storm-damage landing pages that rank locally and convert visitors into inspection requests.',
    whatWeShipped: [
      'Service area landing pages (12 cities)',
      'Storm damage assessment form',
      'Instant lead routing to sales team',
      'Local SEO schema markup',
    ],
    instrumentation: [
      'inspection_request',
      'city_page_view',
      'phone_click',
      'form_start',
    ],
    outcome: 'Now ranking page 1 for multiple storm damage keywords in target markets.',
    timeline: '5 weeks',
  },
  {
    slug: 'precision-plumbing',
    category: 'SERVICE',
    name: 'Precision Plumbing Co',
    oneLiner: 'Emergency plumber needed 24/7 lead capture with smart routing.',
    deliverables: ['WEB', 'AUTOMATION', 'TRACKING'],
    stack: ['Astro', 'Cloudflare', 'Twilio', 'GA4'],
    year: 2023,
    metrics: [
      { label: 'After-hours leads', value: '+340%', isExample: true },
      { label: 'Speed score', value: '100', isExample: false },
    ],
    objective: 'Capture emergency leads 24/7 and route to on-call technician immediately.',
    whatWeShipped: [
      'Ultra-fast static site (100 Lighthouse)',
      'Smart call routing by time of day',
      'Emergency vs. scheduled job forms',
      'Technician availability dashboard',
    ],
    instrumentation: [
      'emergency_call',
      'schedule_request',
      'after_hours_submit',
    ],
    outcome: 'Emergency calls now route directly to on-call tech. No more missed after-hours leads.',
    timeline: '3 weeks',
  },
  {
    slug: 'verde-landscaping',
    category: 'SERVICE',
    name: 'Verde Landscaping',
    oneLiner: 'Landscaping company needed seasonal campaign landing pages.',
    deliverables: ['WEB', 'CRM', 'TRACKING'],
    stack: ['Webflow', 'HubSpot', 'GA4', 'Hotjar'],
    year: 2024,
    metrics: [
      { label: 'Spring campaign CVR', value: '12.4%', isExample: false },
      { label: 'Cost per lead', value: '-42%', isExample: true },
    ],
    objective: 'Create high-converting seasonal landing pages for spring/fall cleanup campaigns.',
    whatWeShipped: [
      'Seasonal campaign templates',
      'Before/after photo galleries',
      'Instant quote calculator',
      'CRM integration with lead scoring',
    ],
    instrumentation: [
      'quote_calculator_use',
      'gallery_view',
      'campaign_form_submit',
    ],
    outcome: 'Spring campaign achieved 12.4% conversion rate, well above industry average.',
    timeline: '2 weeks',
  },
  {
    slug: 'atlas-consulting',
    category: 'B2B',
    name: 'Atlas Consulting Group',
    oneLiner: 'Management consultancy needed a credibility-first web presence.',
    deliverables: ['WEB', 'SEO', 'TRACKING'],
    stack: ['Next.js', 'Sanity', 'Vercel', 'GA4'],
    year: 2024,
    metrics: [
      { label: 'Time on site', value: '+180%', isExample: true },
      { label: 'Discovery calls', value: '+65%', isExample: true },
    ],
    objective: 'Establish thought leadership positioning with case study-driven website.',
    whatWeShipped: [
      'Case study template system',
      'Team credential highlights',
      'Gated content lead magnets',
      'LinkedIn retargeting pixel setup',
    ],
    instrumentation: [
      'case_study_view',
      'content_download',
      'discovery_call_book',
    ],
    outcome: 'Website now serves as primary sales enablement tool for initial prospect conversations.',
    timeline: '6 weeks',
  },
];

// Helper to get featured case study
export const getFeaturedCaseStudy = (): CaseStudy | undefined => {
  return caseStudies.find(cs => cs.featured);
};

// Helper to get case study by slug
export const getCaseStudyBySlug = (slug: string): CaseStudy | undefined => {
  return caseStudies.find(cs => cs.slug === slug);
};

// Helper to get all non-featured case studies
export const getGridCaseStudies = (): CaseStudy[] => {
  return caseStudies.filter(cs => !cs.featured);
};
