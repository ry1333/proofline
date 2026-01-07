import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { Section, Button, Card } from './ui/Shared';
import {
  Check,
  ChevronDown,
  ArrowRight,
  Loader2,
  CheckCircle,
  AlertCircle,
  BarChart3,
  Shield,
  Smartphone,
  Zap,
  Send,
  FileText,
  Video,
  Clock,
  ExternalLink,
  Plus,
  Minus,
} from 'lucide-react';
import {
  trackAuditCtaRequestClick,
  trackAuditCtaBookCallClick,
  trackAuditFormSubmitAttempt,
  trackAuditFormSubmitSuccess,
  trackAuditFormSubmitError,
} from '../utils/analytics';
import { submitAuditForm, isValidEmail, isValidUrl, normalizeUrl, type AuditFormData } from '../lib/forms';

// ============================================
// CONSTANTS
// ============================================
const CALENDLY_URL = 'https://calendly.com/proofline/15min';
const FALLBACK_EMAIL = 'hello@proofline.co';

// ============================================
// SECTION 1: HERO
// ============================================
const HeroSection: React.FC = () => {
  const scrollToForm = () => {
    trackAuditCtaRequestClick('audit_hero');
    document.getElementById('audit-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleBookCall = () => {
    trackAuditCtaBookCallClick('audit_hero');
    window.open(CALENDLY_URL, '_blank');
  };

  const trustChips = ['Mobile-first', 'Tracking-ready', 'Clear next steps', 'Local-friendly'];

  return (
    <Section className="pt-32 pb-16">
      <motion.div
        className="max-w-4xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Micro badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-brand-accent/10 border border-brand-accent/30 mb-6">
          <div className="w-1.5 h-1.5 bg-brand-accent rounded-full animate-pulse"></div>
          <span className="font-mono text-[10px] text-brand-accent uppercase tracking-[0.2em]">
            Audit Protocol
          </span>
        </div>

        {/* H1 */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-6 leading-tight">
          Free Website +<br className="hidden sm:block" /> Speed-to-Lead Audit
        </h1>

        {/* Subhead */}
        <p className="text-lg md:text-xl text-gray-400 leading-relaxed mb-4 max-w-2xl">
          We review your website like a conversion lab: clarity, trust, speed, and lead response.
        </p>

        {/* One-line deliverable */}
        <div className="flex items-center gap-2 mb-8 text-gray-300">
          <FileText size={16} className="text-brand-accent" />
          <span className="text-sm">You get a 1-page report + a short Loom walkthrough.</span>
        </div>

        {/* CTA Row */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <Button size="lg" onClick={scrollToForm} className="w-full sm:w-auto">
            Request Free Audit
            <ArrowRight size={16} className="ml-2" />
          </Button>
          <Button size="lg" variant="secondary" onClick={handleBookCall} className="w-full sm:w-auto">
            Book a 15-min Call
            <ExternalLink size={14} className="ml-2" />
          </Button>
        </div>

        {/* Helper line */}
        <p className="font-mono text-[10px] text-gray-500 uppercase tracking-wider mb-8">
          Delivered in 24–48h. No spam.
        </p>

        {/* Trust chips */}
        <div className="flex flex-wrap gap-2">
          {trustChips.map((chip) => (
            <div
              key={chip}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10"
            >
              <Check size={12} className="text-brand-accent" />
              <span className="font-mono text-[10px] text-gray-400 uppercase tracking-wider">{chip}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </Section>
  );
};

// ============================================
// SECTION 2: WHAT YOU GET (4 Cards)
// ============================================
const WhatYouGetSection: React.FC = () => {
  const cards = [
    {
      icon: BarChart3,
      title: 'Conversion Breakdown',
      bullets: ['Above-the-fold clarity', 'CTA placement + copy', 'Funnel friction points'],
    },
    {
      icon: Shield,
      title: 'Trust Audit',
      bullets: ['Reviews/proof placement', 'Credibility blocks', 'Social proof gaps'],
    },
    {
      icon: Smartphone,
      title: 'Speed + Mobile UX',
      bullets: ['Load bottlenecks (high level)', 'Mobile friction points', 'Core Web Vitals review'],
    },
    {
      icon: Zap,
      title: 'Speed-to-Lead System',
      bullets: ['Follow-up gaps', 'Booking + routing flow', 'Response time pathway'],
    },
  ];

  return (
    <Section className="py-16 border-t border-white/5">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-1.5 h-1.5 bg-brand-accent rounded-full"></div>
        <h2 className="font-mono text-[10px] text-brand-accent uppercase tracking-wider">
          What you'll receive
        </h2>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card, idx) => (
          <motion.div
            key={card.title}
            className="relative border border-brand-border bg-brand-panel p-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            viewport={{ once: true }}
          >
            {/* Corner markers */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/20"></div>
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/20"></div>
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/20"></div>
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/20"></div>

            <card.icon size={20} className="text-brand-accent mb-3" />
            <h3 className="font-bold text-white text-sm uppercase tracking-wide mb-3">{card.title}</h3>
            <ul className="space-y-2">
              {card.bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-2 text-xs text-gray-400">
                  <Check size={12} className="text-brand-accent mt-0.5 flex-shrink-0" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </Section>
  );
};

// ============================================
// SECTION 3: WHAT WE CHECK (Checklist)
// ============================================
const WhatWeCheckSection: React.FC = () => {
  const checks = [
    'Headline/message match',
    'Navigation simplicity',
    'Primary CTA visibility',
    'Form friction',
    'Trust stack placement',
    'Mobile layout issues',
    'Page speed / heavy assets',
    'Contact/booking clarity',
    'Response-time pathway',
    'Tracking readiness (GA4)',
  ];

  return (
    <Section className="py-16 border-t border-white/5">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-1.5 h-1.5 bg-brand-accent rounded-full"></div>
        <h2 className="font-mono text-[10px] text-brand-accent uppercase tracking-wider">
          What we check
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {checks.map((check, idx) => (
          <motion.div
            key={check}
            className="flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/10"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.03 }}
            viewport={{ once: true }}
          >
            <Check size={12} className="text-brand-accent flex-shrink-0" />
            <span className="text-xs text-gray-300">{check}</span>
          </motion.div>
        ))}
      </div>
    </Section>
  );
};

// ============================================
// SECTION 4: THE FORM
// ============================================
const AuditFormSection: React.FC = () => {
  const navigate = useNavigate();
  const [showOptional, setShowOptional] = useState(false);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState<AuditFormData>({
    name: '',
    email: '',
    business: '',
    website: '',
    goal: '',
    phone: '',
    city: '',
    industry: '',
    leadSource: '',
    message: '',
  });

  const goalOptions = [
    { value: '', label: 'Select your primary goal...' },
    { value: 'more_calls', label: 'More calls' },
    { value: 'more_bookings', label: 'More bookings' },
    { value: 'more_form_leads', label: 'More form leads' },
    { value: 'better_trust', label: 'Better trust' },
    { value: 'faster_site', label: 'Faster site' },
    { value: 'not_sure', label: 'Not sure' },
  ];

  const industryOptions = [
    { value: '', label: 'Select industry...' },
    { value: 'home_services', label: 'Home services' },
    { value: 'med_spa', label: 'Med spa / Wellness' },
    { value: 'professional', label: 'Professional services' },
    { value: 'other', label: 'Other' },
  ];

  const leadSourceOptions = [
    { value: '', label: 'How did you find us?' },
    { value: 'google', label: 'Google' },
    { value: 'facebook_ig', label: 'Facebook / Instagram' },
    { value: 'referral', label: 'Referral' },
    { value: 'not_sure', label: 'Not sure' },
  ];

  const validateField = (name: string, value: string): string => {
    if (name === 'name' && !value.trim()) return 'Name is required';
    if (name === 'email') {
      if (!value.trim()) return 'Email is required';
      if (!isValidEmail(value)) return 'Please enter a valid email';
    }
    if (name === 'business' && !value.trim()) return 'Business name is required';
    if (name === 'website') {
      if (!value.trim()) return 'Website URL is required';
      if (!isValidUrl(value)) return 'Please enter a valid URL';
    }
    if (name === 'goal' && !value) return 'Please select a goal';
    return '';
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    if (error) {
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    trackAuditFormSubmitAttempt();

    // Validate required fields
    const newErrors: Record<string, string> = {};
    ['name', 'email', 'business', 'website', 'goal'].forEach((field) => {
      const error = validateField(field, formData[field as keyof AuditFormData] as string);
      if (error) newErrors[field] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    // Normalize website URL
    const submitData = {
      ...formData,
      website: normalizeUrl(formData.website),
    };

    const result = await submitAuditForm(submitData);

    if (result.success) {
      trackAuditFormSubmitSuccess(formData.goal);
      setStatus('success');
      // Navigate to thanks page or show success
      navigate('/thanks');
    } else {
      trackAuditFormSubmitError(result.error);
      setStatus('error');
      setErrorMessage(result.error || 'Something went wrong. Please try again.');
    }
  };

  const inputClasses = (fieldName: string) =>
    `w-full px-4 py-3 bg-black/50 border ${
      errors[fieldName] ? 'border-red-500' : 'border-brand-border'
    } text-white placeholder-gray-600 focus:border-brand-accent focus:outline-none transition-colors text-base`;

  if (status === 'success') {
    return (
      <Section id="audit-form" className="py-16 border-t border-white/5">
        <div className="max-w-2xl mx-auto">
          <div className="relative border border-brand-accent/30 bg-brand-accent/[0.02] p-8 text-center">
            <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-brand-accent"></div>
            <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-brand-accent"></div>
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-brand-accent"></div>
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-brand-accent"></div>

            <CheckCircle size={48} className="text-brand-accent mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">Audit Request Received!</h3>
            <p className="text-gray-400 mb-6">
              We'll review your site and send your audit within 24–48 hours.
            </p>
            <Button onClick={() => window.open(CALENDLY_URL, '_blank')}>
              Book a 15-min Call
              <ExternalLink size={14} className="ml-2" />
            </Button>
          </div>
        </div>
      </Section>
    );
  }

  return (
    <Section id="audit-form" className="py-16 border-t border-white/5">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-1.5 h-1.5 bg-brand-accent rounded-full"></div>
        <h2 className="font-mono text-[10px] text-brand-accent uppercase tracking-wider">
          Request your audit
        </h2>
      </div>

      <div className="max-w-2xl mx-auto">
        <motion.div
          className="relative border border-brand-accent/30 bg-brand-accent/[0.02] overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Corner markers */}
          <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-brand-accent"></div>
          <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-brand-accent"></div>
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-brand-accent"></div>
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-brand-accent"></div>

          {/* Header */}
          <div className="p-5 border-b border-brand-accent/20 flex items-center gap-3">
            <Send size={18} className="text-brand-accent" />
            <h3 className="font-bold text-white uppercase tracking-wide">Free Audit Request</h3>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-5 md:p-8 space-y-5">
            {/* Full Name */}
            <div>
              <label htmlFor="name" className="block text-xs font-mono text-gray-500 uppercase tracking-wider mb-1">
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="John Smith"
                className={inputClasses('name')}
                aria-invalid={!!errors.name}
              />
              {errors.name && (
                <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                  <AlertCircle size={12} /> {errors.name}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-xs font-mono text-gray-500 uppercase tracking-wider mb-1">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="john@company.com"
                className={inputClasses('email')}
                aria-invalid={!!errors.email}
              />
              {errors.email && (
                <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                  <AlertCircle size={12} /> {errors.email}
                </p>
              )}
            </div>

            {/* Business Name */}
            <div>
              <label htmlFor="business" className="block text-xs font-mono text-gray-500 uppercase tracking-wider mb-1">
                Business Name *
              </label>
              <input
                type="text"
                id="business"
                name="business"
                value={formData.business}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Acme Plumbing"
                className={inputClasses('business')}
                aria-invalid={!!errors.business}
              />
              {errors.business && (
                <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                  <AlertCircle size={12} /> {errors.business}
                </p>
              )}
            </div>

            {/* Website URL */}
            <div>
              <label htmlFor="website" className="block text-xs font-mono text-gray-500 uppercase tracking-wider mb-1">
                Website URL *
              </label>
              <input
                type="text"
                id="website"
                name="website"
                value={formData.website}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="www.yoursite.com"
                className={inputClasses('website')}
                aria-invalid={!!errors.website}
              />
              {errors.website && (
                <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                  <AlertCircle size={12} /> {errors.website}
                </p>
              )}
            </div>

            {/* Primary Goal */}
            <div>
              <label htmlFor="goal" className="block text-xs font-mono text-gray-500 uppercase tracking-wider mb-1">
                Primary Goal *
              </label>
              <select
                id="goal"
                name="goal"
                value={formData.goal}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`${inputClasses('goal')} appearance-none cursor-pointer`}
                aria-invalid={!!errors.goal}
              >
                {goalOptions.map((opt) => (
                  <option key={opt.value} value={opt.value} className="bg-brand-dark">
                    {opt.label}
                  </option>
                ))}
              </select>
              {errors.goal && (
                <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                  <AlertCircle size={12} /> {errors.goal}
                </p>
              )}
            </div>

            {/* Optional Fields Toggle */}
            <button
              type="button"
              onClick={() => setShowOptional(!showOptional)}
              className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
              aria-expanded={showOptional}
            >
              {showOptional ? <Minus size={14} /> : <Plus size={14} />}
              <span>{showOptional ? 'Hide optional fields' : 'Add more details (optional)'}</span>
            </button>

            {/* Optional Fields */}
            <AnimatePresence>
              {showOptional && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="space-y-5 overflow-hidden"
                >
                  {/* Phone + City */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="phone" className="block text-xs font-mono text-gray-500 uppercase tracking-wider mb-1">
                        Phone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="(941) 555-0123"
                        className={inputClasses('phone')}
                      />
                    </div>
                    <div>
                      <label htmlFor="city" className="block text-xs font-mono text-gray-500 uppercase tracking-wider mb-1">
                        City / Service Area
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="Sarasota, FL"
                        className={inputClasses('city')}
                      />
                    </div>
                  </div>

                  {/* Industry + Lead Source */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="industry" className="block text-xs font-mono text-gray-500 uppercase tracking-wider mb-1">
                        Industry
                      </label>
                      <select
                        id="industry"
                        name="industry"
                        value={formData.industry}
                        onChange={handleChange}
                        className={`${inputClasses('industry')} appearance-none cursor-pointer`}
                      >
                        {industryOptions.map((opt) => (
                          <option key={opt.value} value={opt.value} className="bg-brand-dark">
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="leadSource" className="block text-xs font-mono text-gray-500 uppercase tracking-wider mb-1">
                        How did you find us?
                      </label>
                      <select
                        id="leadSource"
                        name="leadSource"
                        value={formData.leadSource}
                        onChange={handleChange}
                        className={`${inputClasses('leadSource')} appearance-none cursor-pointer`}
                      >
                        {leadSourceOptions.map((opt) => (
                          <option key={opt.value} value={opt.value} className="bg-brand-dark">
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-xs font-mono text-gray-500 uppercase tracking-wider mb-1">
                      Anything else we should know?
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your business or specific concerns..."
                      rows={3}
                      className={`${inputClasses('message')} resize-none`}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Error message */}
            {status === 'error' && (
              <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-400 text-sm flex items-start gap-2">
                <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
                <div>
                  <p>{errorMessage}</p>
                  <p className="text-xs mt-1">
                    Or email us directly at{' '}
                    <a href={`mailto:${FALLBACK_EMAIL}`} className="underline hover:text-red-300">
                      {FALLBACK_EMAIL}
                    </a>
                  </p>
                </div>
              </div>
            )}

            {/* Submit */}
            <Button type="submit" className="w-full" disabled={status === 'submitting'}>
              {status === 'submitting' ? (
                <>
                  <Loader2 size={16} className="animate-spin mr-2" />
                  Submitting...
                </>
              ) : (
                <>
                  Request Free Audit
                  <ArrowRight size={16} className="ml-2" />
                </>
              )}
            </Button>

            {/* Reassurance */}
            <p className="font-mono text-[10px] text-gray-500 uppercase tracking-wider text-center">
              Delivered in 24–48h. No spam.
            </p>
          </form>
        </motion.div>
      </div>
    </Section>
  );
};

// ============================================
// SECTION 5: WHAT HAPPENS NEXT
// ============================================
const WhatHappensNextSection: React.FC = () => {
  const steps = [
    { id: '01', title: 'Submit the form', desc: 'Takes 60 seconds' },
    { id: '02', title: 'We review + record', desc: 'Your personalized Loom' },
    { id: '03', title: 'Receive your audit', desc: 'Within 24–48 hours' },
  ];

  return (
    <Section className="py-16 border-t border-white/5">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-1.5 h-1.5 bg-brand-accent rounded-full"></div>
        <h2 className="font-mono text-[10px] text-brand-accent uppercase tracking-wider">
          What happens next
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-6">
        {steps.map((step, idx) => (
          <motion.div
            key={step.id}
            className="relative border border-brand-border bg-brand-panel p-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            viewport={{ once: true }}
          >
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/20"></div>
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/20"></div>
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/20"></div>
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/20"></div>

            <span className="font-mono text-2xl font-bold text-brand-accent/30 block mb-2">
              {step.id}
            </span>
            <h3 className="font-bold text-white mb-1">{step.title}</h3>
            <p className="text-sm text-gray-500">{step.desc}</p>

            {idx < 2 && (
              <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10">
                <ArrowRight size={16} className="text-brand-border" />
              </div>
            )}
          </motion.div>
        ))}
      </div>

      <p className="font-mono text-[10px] text-gray-500 uppercase tracking-wider text-center">
        If there's a fast win, we'll highlight it first.
      </p>
    </Section>
  );
};

// ============================================
// SECTION 6: TRUST WITHOUT RESULTS
// ============================================
const TrustSection: React.FC = () => (
  <Section className="py-16 border-t border-white/5">
    <motion.div
      className="relative border border-brand-border bg-brand-panel p-6 md:p-8 max-w-2xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/20"></div>
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/20"></div>
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/20"></div>
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/20"></div>

      <div className="flex items-center gap-2 mb-4">
        <Video size={18} className="text-brand-accent" />
        <h3 className="font-bold text-white uppercase tracking-wide text-sm">
          Early studio — documented deployments
        </h3>
      </div>

      <p className="text-gray-400 text-sm leading-relaxed mb-4">
        We're building ProofLine publicly. You'll get a clear audit whether you hire us or not.
      </p>

      <div className="flex flex-wrap gap-4 text-sm">
        <Link to="/process" className="text-brand-accent hover:underline flex items-center gap-1">
          See the process <ArrowRight size={14} />
        </Link>
        <Link to="/contact" className="text-brand-accent hover:underline flex items-center gap-1">
          Contact <ArrowRight size={14} />
        </Link>
      </div>
    </motion.div>
  </Section>
);

// ============================================
// SECTION 7: FAQ
// ============================================
const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      q: 'What exactly do I receive?',
      a: 'A 1-page PDF report covering conversion clarity, trust signals, mobile UX, and speed-to-lead. Plus a short Loom video walking you through the findings with specific recommendations.',
    },
    {
      q: 'Is it really free?',
      a: 'Yes. No hidden fees, no automatic charges. We offer this to demonstrate our approach and build relationships with local businesses.',
    },
    {
      q: 'Do you need access to my website?',
      a: 'No. We review your live site as a visitor would. We don\'t need any logins or backend access.',
    },
    {
      q: 'How long does it take?',
      a: 'You\'ll receive your audit within 24–48 hours of submitting the form.',
    },
    {
      q: 'Will you spam me?',
      a: 'No. You\'ll receive your audit and maybe one follow-up email. That\'s it. No newsletters or sales sequences.',
    },
    {
      q: 'What if I want you to implement the fixes?',
      a: 'We can discuss that after you receive the audit. There\'s no obligation, and the audit is valuable whether you work with us or not.',
    },
    {
      q: 'Do you work locally in Sarasota?',
      a: 'Yes! We\'re based in Sarasota and specialize in helping local service businesses. We also work with clients remotely.',
    },
  ];

  return (
    <Section className="py-16 border-t border-white/5">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-1.5 h-1.5 bg-brand-accent rounded-full"></div>
        <h2 className="font-mono text-[10px] text-brand-accent uppercase tracking-wider">
          Frequently Asked Questions
        </h2>
      </div>

      <div className="max-w-3xl mx-auto space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className={`border ${isOpen ? 'border-brand-accent/30 bg-brand-accent/[0.02]' : 'border-brand-border bg-brand-panel'}`}
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full p-4 flex items-center justify-between text-left"
                aria-expanded={isOpen}
                aria-controls={`faq-audit-${idx}`}
              >
                <span className={`font-medium ${isOpen ? 'text-white' : 'text-gray-300'}`}>
                  {faq.q}
                </span>
                <ChevronDown
                  size={16}
                  className={`text-gray-500 transition-transform flex-shrink-0 ml-4 ${isOpen ? 'rotate-180' : ''}`}
                />
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    id={`faq-audit-${idx}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4 text-gray-400 text-sm leading-relaxed">{faq.a}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </Section>
  );
};

// ============================================
// SECTION 8: FINAL CTA
// ============================================
const FinalCTASection: React.FC = () => {
  const scrollToForm = () => {
    trackAuditCtaRequestClick('audit_footer');
    document.getElementById('audit-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleBookCall = () => {
    trackAuditCtaBookCallClick('audit_footer');
    window.open(CALENDLY_URL, '_blank');
  };

  return (
    <Section className="py-20 border-t border-white/5">
      <motion.div
        className="relative border border-brand-accent/30 bg-brand-accent/[0.02] p-8 md:p-12 text-center max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-brand-accent"></div>
        <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-brand-accent"></div>
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-brand-accent"></div>
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-brand-accent"></div>

        <div className="mb-4">
          <span className="font-mono text-[10px] text-brand-accent uppercase tracking-[0.2em]">
            // Ready?
          </span>
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
          Want the audit — or ready to deploy?
        </h2>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4">
          <Button size="lg" onClick={scrollToForm} className="w-full sm:w-auto">
            Request Free Audit
            <ArrowRight size={16} className="ml-2" />
          </Button>
          <Button size="lg" variant="secondary" onClick={handleBookCall} className="w-full sm:w-auto">
            Book a 15-min Call
            <ExternalLink size={14} className="ml-2" />
          </Button>
        </div>

        <p className="font-mono text-[10px] text-gray-500 uppercase tracking-wider">
          Delivered in 24–48h. No spam.
        </p>
      </motion.div>
    </Section>
  );
};

// ============================================
// STICKY CTA BAR
// ============================================
const StickyCTABar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past hero (roughly 500px)
      setIsVisible(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToForm = () => {
    trackAuditCtaRequestClick('audit_sticky');
    document.getElementById('audit-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleBookCall = () => {
    trackAuditCtaBookCallClick('audit_sticky');
    window.open(CALENDLY_URL, '_blank');
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-brand-dark/95 backdrop-blur-sm border-t border-brand-border"
        >
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
            <span className="hidden sm:block font-mono text-[10px] text-gray-500 uppercase tracking-wider">
              // Free audit request
            </span>
            <div className="flex items-center gap-3 w-full sm:w-auto justify-center sm:justify-end">
              <Button size="sm" onClick={scrollToForm}>
                Request Free Audit
              </Button>
              <Button size="sm" variant="secondary" onClick={handleBookCall}>
                Book a 15-min Call
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// ============================================
// MAIN AUDIT PAGE
// ============================================
const AuditPage: React.FC = () => {
  return (
    <>
      <HeroSection />
      <WhatYouGetSection />
      <WhatWeCheckSection />
      <AuditFormSection />
      <WhatHappensNextSection />
      <TrustSection />
      <FAQSection />
      <FinalCTASection />
      <StickyCTABar />
    </>
  );
};

export default AuditPage;
