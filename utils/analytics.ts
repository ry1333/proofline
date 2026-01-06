// Safe analytics helper - fires events only if gtag exists
// No runtime errors if analytics not present

type EventSource = 'pricing_hero' | 'pricing_tier' | 'pricing_sticky' | 'pricing_footer' | 'pricing_retainer';

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
