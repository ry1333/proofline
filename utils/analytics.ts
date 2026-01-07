// Safe analytics helper - fires events only if gtag exists
// No runtime errors if analytics not present

type EventSource =
  | 'pricing_hero' | 'pricing_tier' | 'pricing_sticky' | 'pricing_footer' | 'pricing_retainer'
  | 'audit_hero' | 'audit_sticky' | 'audit_footer' | 'homepage_audit_section' | 'contact_form_success'
  | 'contact_footer' | 'contact_sticky';

interface AnalyticsWindow extends Window {
  gtag?: (...args: any[]) => void;
}

const getWindow = (): AnalyticsWindow | undefined => {
  if (typeof window !== 'undefined') {
    return window as AnalyticsWindow;
  }
  return undefined;
};

export const trackEvent = (eventName: string, params?: Record<string, any>) => {
  const win = getWindow();
  if (win?.gtag) {
    win.gtag('event', eventName, params);
  }
};

export const trackBookCallClick = (source: EventSource) => {
  trackEvent('book_call_click', { source });
};

export const trackRunAuditClick = (source: EventSource) => {
  trackEvent('run_free_audit_click', { source });
};

export const trackPricingTierClick = (tierId: string) => {
  trackEvent('pricing_tier_click', { tier_id: tierId });
};

export const trackRetainerInterestClick = (retainerId: string) => {
  trackEvent('retainer_interest_click', { retainer_id: retainerId });
};

// Audit page specific events
export const trackAuditCtaRequestClick = (source: EventSource) => {
  trackEvent('audit_cta_request_click', { source });
};

export const trackAuditCtaBookCallClick = (source: EventSource) => {
  trackEvent('audit_cta_book_call_click', { source });
};

export const trackAuditFormSubmitAttempt = () => {
  trackEvent('audit_form_submit_attempt', {});
};

export const trackAuditFormSubmitSuccess = (goal: string) => {
  trackEvent('audit_form_submit_success', { goal });
};

export const trackAuditFormSubmitError = (error?: string) => {
  trackEvent('audit_form_submit_error', { error });
};
