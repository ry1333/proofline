// Form submission utilities for ProofLine
// Handles Formspree integration with graceful fallbacks

export interface AuditFormData {
  name: string;
  email: string;
  business: string;
  website: string;
  goal: string;
  phone?: string;
  city?: string;
  industry?: string;
  leadSource?: string;
  message?: string;
}

export interface FormSubmitResult {
  success: boolean;
  error?: string;
}

/**
 * Get Formspree endpoint from environment
 * Falls back gracefully if not configured
 */
export const getFormspreeEndpoint = (): string | null => {
  const endpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT;
  const formId = import.meta.env.VITE_FORMSPREE_ID;

  if (endpoint) return endpoint;
  if (formId) return `https://formspree.io/f/${formId}`;

  return null;
};

/**
 * Submit audit form to Formspree
 * Handles errors gracefully without crashing
 */
export const submitAuditForm = async (data: AuditFormData): Promise<FormSubmitResult> => {
  const endpoint = getFormspreeEndpoint();

  if (!endpoint) {
    console.warn('Formspree endpoint not configured. Set VITE_FORMSPREE_ENDPOINT or VITE_FORMSPREE_ID');
    return {
      success: false,
      error: 'Form endpoint not configured. Please email us directly.'
    };
  }

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        _subject: `Audit Request: ${data.business} - ${data.website}`,
        _replyto: data.email,
      }),
    });

    if (response.ok) {
      return { success: true };
    }

    // Handle specific error codes
    if (response.status === 422) {
      return { success: false, error: 'Please check your email address and try again.' };
    }

    return { success: false, error: 'Submission failed. Please try again or email us directly.' };
  } catch (error) {
    console.error('Form submission error:', error);
    return {
      success: false,
      error: 'Network error. Please check your connection and try again.'
    };
  }
};

/**
 * Validate email format
 */
export const isValidEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

/**
 * Validate URL format (loose validation)
 */
export const isValidUrl = (url: string): boolean => {
  if (!url) return true; // Optional field
  // Accept with or without protocol
  return /^(https?:\/\/)?[\w-]+(\.[\w-]+)+/.test(url);
};

/**
 * Normalize website URL (add https if missing)
 */
export const normalizeUrl = (url: string): string => {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  return `https://${url}`;
};
