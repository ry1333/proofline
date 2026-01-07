import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { Section, Button } from './ui/Shared';
import {
  Check,
  ChevronDown,
  ArrowRight,
  Loader2,
  CheckCircle,
  AlertCircle,
  Send,
  FileText,
  Video,
  ExternalLink,
  Plus,
  Minus,
  AlertTriangle,
  Zap,
  Target,
  Clock,
  Smartphone,
  MousePointer,
  Star,
  MessageCircle,
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
// SECTION 1: HERO (Restructured for clarity)
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

  const trustChips = ['Mobile-first', 'Tracking-ready', 'Clear next steps', 'Sarasota local'];

  return (
    <Section className="pt-32 pb-12">
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
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-6 leading-[1.1]">
          Free Website +<br className="hidden sm:block" /> Speed-to-Lead Audit
        </h1>

        {/* Subhead - Plain language */}
        <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-3 max-w-2xl">
          We find what's costing you calls and bookings: clarity, trust, speed, and follow-up.
        </p>

        {/* Definition line */}
        <p className="text-sm text-gray-500 mb-6 max-w-2xl leading-relaxed">
          <span className="text-brand-accent font-medium">Speed-to-lead</span> = how fast you respond after someone reaches out.
        </p>

        {/* Deliverable line */}
        <div className="flex items-center gap-2 mb-8 text-gray-300">
          <FileText size={16} className="text-brand-accent flex-shrink-0" />
          <span className="text-sm leading-relaxed">You get a 1-page report + a short Loom walkthrough.</span>
        </div>

        {/* CTA Row */}
        <div className="flex flex-col sm:flex-row gap-3 mb-3">
          <Button size="lg" onClick={scrollToForm} className="w-full sm:w-auto">
            Request Free Audit
            <ArrowRight size={16} className="ml-2" />
          </Button>
          <Button size="lg" variant="secondary" onClick={handleBookCall} className="w-full sm:w-auto">
            Book a 15-min Call
            <ExternalLink size={14} className="ml-2" />
          </Button>
        </div>

        {/* Helper line - Updated */}
        <p className="font-mono text-[11px] text-gray-500 uppercase tracking-wider mb-8">
          Delivered in 24–48h. No spam. No login needed.
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
// SECTION 2: SAMPLE AUDIT PREVIEW (Visual)
// ============================================
const SampleAuditPreview: React.FC = () => {
  const exampleFindings = [
    {
      title: 'CTA not visible on mobile',
      impact: 'Visitors don\'t know what to do next',
      fix: 'Add primary CTA above the fold + sticky mobile button',
    },
    {
      title: 'No reviews near booking form',
      impact: 'People hesitate without social proof',
      fix: 'Add 2-3 testimonials or star rating near the form',
    },
    {
      title: 'Slow response after form submit',
      impact: 'Leads go cold within 5 minutes',
      fix: 'Set up instant email/SMS confirmation + calendar link',
    },
  ];

  return (
    <Section className="py-12 border-t border-white/5">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-1.5 h-1.5 bg-brand-accent rounded-full"></div>
        <h2 className="font-mono text-[10px] text-brand-accent uppercase tracking-wider">
          See exactly what you'll receive
        </h2>
      </div>
      <p className="text-xs text-gray-500 mb-8 font-mono uppercase tracking-wider">
        Example preview (not a client report)
      </p>

      {/* Example Audit Report Panel */}
      <motion.div
        className="relative border border-brand-accent/30 bg-brand-panel overflow-hidden mb-8"
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
        <div className="p-4 border-b border-brand-accent/20 flex items-center gap-3">
          <FileText size={16} className="text-brand-accent" />
          <span className="font-mono text-xs text-brand-accent uppercase tracking-wider">
            Example 1-Page Audit
          </span>
        </div>

        {/* Report Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/10">
          {/* Top 3 Leaks */}
          <div className="p-5">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle size={14} className="text-red-400" />
              <h3 className="font-mono text-[10px] text-red-400 uppercase tracking-wider font-bold">
                Top 3 Leaks
              </h3>
            </div>
            <ul className="space-y-2">
              <li className="text-sm text-gray-300 leading-relaxed">• CTA buried below fold</li>
              <li className="text-sm text-gray-300 leading-relaxed">• No trust signals visible</li>
              <li className="text-sm text-gray-300 leading-relaxed">• Form asks too much</li>
            </ul>
          </div>

          {/* Quick Wins */}
          <div className="p-5">
            <div className="flex items-center gap-2 mb-3">
              <Zap size={14} className="text-yellow-400" />
              <h3 className="font-mono text-[10px] text-yellow-400 uppercase tracking-wider font-bold">
                Quick Wins (48h)
              </h3>
            </div>
            <ul className="space-y-2">
              <li className="text-sm text-gray-300 leading-relaxed">• Move phone # to header</li>
              <li className="text-sm text-gray-300 leading-relaxed">• Add Google rating badge</li>
              <li className="text-sm text-gray-300 leading-relaxed">• Shorten contact form</li>
            </ul>
          </div>

          {/* Recommended Fixes */}
          <div className="p-5">
            <div className="flex items-center gap-2 mb-3">
              <Target size={14} className="text-brand-accent" />
              <h3 className="font-mono text-[10px] text-brand-accent uppercase tracking-wider font-bold">
                Recommended Fixes
              </h3>
            </div>
            <ul className="space-y-2">
              <li className="text-sm text-gray-300 leading-relaxed">• Redesign hero section</li>
              <li className="text-sm text-gray-300 leading-relaxed">• Add testimonial section</li>
              <li className="text-sm text-gray-300 leading-relaxed">• Optimize mobile layout</li>
            </ul>
          </div>

          {/* Speed-to-Lead Checklist */}
          <div className="p-5">
            <div className="flex items-center gap-2 mb-3">
              <Clock size={14} className="text-blue-400" />
              <h3 className="font-mono text-[10px] text-blue-400 uppercase tracking-wider font-bold">
                Speed-to-Lead
              </h3>
            </div>
            <ul className="space-y-2">
              <li className="text-sm text-gray-300 leading-relaxed">• Auto-reply: Missing</li>
              <li className="text-sm text-gray-300 leading-relaxed">• Calendar link: None</li>
              <li className="text-sm text-gray-300 leading-relaxed">• SMS notify: Not set</li>
            </ul>
          </div>
        </div>
      </motion.div>

      {/* Example Findings Cards */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-1.5 h-1.5 bg-white/30 rounded-full"></div>
        <h3 className="font-mono text-[10px] text-gray-500 uppercase tracking-wider">
          Example findings with fixes
        </h3>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {exampleFindings.map((finding, idx) => (
          <motion.div
            key={finding.title}
            className="relative border border-brand-border bg-brand-panel p-4"
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

            {/* Screenshot placeholder */}
            <div className="h-16 mb-3 bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 flex items-center justify-center">
              <span className="font-mono text-[9px] text-gray-600 uppercase">Screenshot area</span>
            </div>

            <h4 className="font-bold text-white text-sm mb-2 leading-snug">{finding.title}</h4>

            <div className="space-y-2">
              <div>
                <span className="font-mono text-[9px] text-red-400 uppercase tracking-wider">Impact:</span>
                <p className="text-xs text-gray-400 leading-relaxed">{finding.impact}</p>
              </div>
              <div>
                <span className="font-mono text-[9px] text-brand-accent uppercase tracking-wider">Fix:</span>
                <p className="text-xs text-gray-300 leading-relaxed">{finding.fix}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
};

// ============================================
// SECTION 3: COMMON LEAKS (Skim section)
// ============================================
const CommonLeaksSection: React.FC = () => {
  const leaks = [
    { icon: MousePointer, text: 'No clear CTA above the fold' },
    { icon: Smartphone, text: 'Slow on mobile' },
    { icon: Star, text: 'No reviews near CTA' },
    { icon: Target, text: 'Too many choices' },
    { icon: AlertCircle, text: 'Form friction' },
    { icon: MessageCircle, text: 'No instant follow-up' },
  ];

  return (
    <Section className="py-12 border-t border-white/5">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-1.5 h-1.5 bg-brand-accent rounded-full"></div>
        <h2 className="font-mono text-[10px] text-brand-accent uppercase tracking-wider">
          Common leaks we catch in Sarasota business websites
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {leaks.map((leak, idx) => (
          <motion.div
            key={leak.text}
            className="flex flex-col items-center gap-2 px-3 py-4 bg-white/5 border border-white/10 text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.05 }}
            viewport={{ once: true }}
          >
            <leak.icon size={18} className="text-brand-accent" />
            <span className="text-xs text-gray-300 leading-snug">{leak.text}</span>
          </motion.div>
        ))}
      </div>
    </Section>
  );
};

// ============================================
// SECTION 4: FORM + PREVIEW (2-Column Layout)
// ============================================
const FormAndPreviewSection: React.FC = () => {
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
    { value: '', label: 'What\'s your main goal?' },
    { value: 'more_calls', label: 'More phone calls' },
    { value: 'more_bookings', label: 'More bookings' },
    { value: 'more_form_leads', label: 'More form leads' },
    { value: 'better_trust', label: 'Build more trust' },
    { value: 'faster_site', label: 'Faster website' },
    { value: 'not_sure', label: 'Not sure yet' },
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

    const submitData = {
      ...formData,
      website: normalizeUrl(formData.website),
    };

    const result = await submitAuditForm(submitData);

    if (result.success) {
      trackAuditFormSubmitSuccess(formData.goal);
      setStatus('success');
      navigate('/thanks');
    } else {
      trackAuditFormSubmitError(result.error);
      setStatus('error');
      setErrorMessage(result.error || 'Something went wrong. Please try again.');
    }
  };

  const inputClasses = (fieldName: string) =>
    `w-full px-4 py-3.5 bg-black/50 border ${
      errors[fieldName] ? 'border-red-500' : 'border-brand-border'
    } text-white placeholder-gray-500 focus:border-brand-accent focus:outline-none transition-colors text-base leading-normal`;

  if (status === 'success') {
    return (
      <Section id="audit-form" className="py-12 border-t border-white/5">
        <div className="max-w-2xl mx-auto">
          <div className="relative border border-brand-accent/30 bg-brand-accent/[0.02] p-8 text-center">
            <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-brand-accent"></div>
            <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-brand-accent"></div>
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-brand-accent"></div>
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-brand-accent"></div>

            <CheckCircle size={48} className="text-brand-accent mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">Audit Request Received!</h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
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
    <Section id="audit-form" className="py-12 border-t border-white/5">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-1.5 h-1.5 bg-brand-accent rounded-full"></div>
        <h2 className="font-mono text-[10px] text-brand-accent uppercase tracking-wider">
          Request your free audit
        </h2>
      </div>

      {/* 2-Column Layout */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left: Form */}
        <motion.div
          className="relative border border-brand-accent/30 bg-brand-accent/[0.02] overflow-hidden"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          {/* Corner markers */}
          <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-brand-accent"></div>
          <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-brand-accent"></div>
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-brand-accent"></div>
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-brand-accent"></div>

          {/* Header */}
          <div className="p-4 border-b border-brand-accent/20 flex items-center gap-3">
            <Send size={16} className="text-brand-accent" />
            <h3 className="font-bold text-white uppercase tracking-wide text-sm">Free Audit Request</h3>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-5 md:p-6 space-y-4">
            {/* Name + Email Row */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-xs font-mono text-gray-400 uppercase tracking-wider mb-1.5">
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
              <div>
                <label htmlFor="email" className="block text-xs font-mono text-gray-400 uppercase tracking-wider mb-1.5">
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
            </div>

            {/* Business Name */}
            <div>
              <label htmlFor="business" className="block text-xs font-mono text-gray-400 uppercase tracking-wider mb-1.5">
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
              <label htmlFor="website" className="block text-xs font-mono text-gray-400 uppercase tracking-wider mb-1.5">
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
              <p className="text-[11px] text-gray-500 mt-1.5 leading-relaxed">
                We don't need access — just the public link.
              </p>
              {errors.website && (
                <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                  <AlertCircle size={12} /> {errors.website}
                </p>
              )}
            </div>

            {/* Primary Goal */}
            <div>
              <label htmlFor="goal" className="block text-xs font-mono text-gray-400 uppercase tracking-wider mb-1.5">
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
              className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors py-1"
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
                  className="space-y-4 overflow-hidden"
                >
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="phone" className="block text-xs font-mono text-gray-400 uppercase tracking-wider mb-1.5">
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
                      <label htmlFor="city" className="block text-xs font-mono text-gray-400 uppercase tracking-wider mb-1.5">
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

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="industry" className="block text-xs font-mono text-gray-400 uppercase tracking-wider mb-1.5">
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
                      <label htmlFor="leadSource" className="block text-xs font-mono text-gray-400 uppercase tracking-wider mb-1.5">
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

                  <div>
                    <label htmlFor="message" className="block text-xs font-mono text-gray-400 uppercase tracking-wider mb-1.5">
                      Anything else?
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your business..."
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
                  <p className="leading-relaxed">{errorMessage}</p>
                  <p className="text-xs mt-1">
                    Or email us at{' '}
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
            <p className="font-mono text-[11px] text-gray-500 uppercase tracking-wider text-center leading-relaxed">
              Delivered in 24–48h. No spam. No login needed.
            </p>
          </form>
        </motion.div>

        {/* Right: What You Get */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          {/* What's included */}
          <div className="relative border border-brand-border bg-brand-panel p-5">
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/20"></div>
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/20"></div>
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/20"></div>
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/20"></div>

            <h3 className="font-mono text-[10px] text-brand-accent uppercase tracking-wider mb-4">
              What's included
            </h3>
            <ul className="space-y-3">
              {[
                '1-page PDF with top issues + fixes',
                'Loom video walkthrough (3-5 min)',
                'Speed-to-lead assessment',
                'Mobile + desktop review',
                'Prioritized action items',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check size={14} className="text-brand-accent mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-300 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Timeline */}
          <div className="relative border border-brand-border bg-brand-panel p-5">
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/20"></div>
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/20"></div>
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/20"></div>
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/20"></div>

            <h3 className="font-mono text-[10px] text-brand-accent uppercase tracking-wider mb-4">
              How it works
            </h3>
            <div className="space-y-4">
              {[
                { num: '01', text: 'Submit the form (60 seconds)' },
                { num: '02', text: 'We review + record your Loom' },
                { num: '03', text: 'Audit delivered in 24–48h' },
              ].map((step) => (
                <div key={step.num} className="flex items-start gap-3">
                  <span className="font-mono text-lg font-bold text-brand-accent/30">{step.num}</span>
                  <span className="text-sm text-gray-300 leading-relaxed pt-1">{step.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Trust callout */}
          <div className="relative border border-brand-border bg-brand-panel p-5">
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/20"></div>
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/20"></div>
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/20"></div>
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/20"></div>

            <div className="flex items-center gap-2 mb-2">
              <Video size={14} className="text-brand-accent" />
              <h3 className="font-mono text-[10px] text-brand-accent uppercase tracking-wider">
                No strings attached
              </h3>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              The audit is yours whether you hire us or not. We're building ProofLine publicly and want to help local businesses.
            </p>
          </div>
        </motion.div>
      </div>
    </Section>
  );
};

// ============================================
// SECTION 5: FAQ (Condensed)
// ============================================
const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      q: 'What exactly do I receive?',
      a: 'A 1-page PDF report covering your top conversion issues, quick wins, and a speed-to-lead assessment. Plus a 3-5 minute Loom video walking you through everything.',
    },
    {
      q: 'Is it really free?',
      a: 'Yes. No hidden fees. We use this to demonstrate our approach and build relationships with Sarasota businesses.',
    },
    {
      q: 'Do you need access to my website?',
      a: 'No. We review your live site as a visitor would. No logins or backend access needed.',
    },
    {
      q: 'How long does it take?',
      a: 'You\'ll receive your audit within 24–48 hours of submitting the form.',
    },
    {
      q: 'Will you spam me?',
      a: 'No. You\'ll get your audit and maybe one follow-up. That\'s it.',
    },
  ];

  return (
    <Section className="py-12 border-t border-white/5">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-1.5 h-1.5 bg-brand-accent rounded-full"></div>
        <h2 className="font-mono text-[10px] text-brand-accent uppercase tracking-wider">
          Questions
        </h2>
      </div>

      <div className="max-w-3xl space-y-2">
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
                <span className={`font-medium text-sm ${isOpen ? 'text-white' : 'text-gray-300'} leading-relaxed`}>
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
// SECTION 6: FINAL CTA (Updated)
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
    <Section className="py-16 border-t border-white/5">
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

        <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 leading-tight">
          Get your free audit today
        </h2>

        <p className="text-gray-400 text-sm mb-6 max-w-md mx-auto leading-relaxed">
          If we find a fast win, we'll highlight it first. No spam, no sales pitch — just useful insights.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-4">
          <Button size="lg" onClick={scrollToForm} className="w-full sm:w-auto">
            Request Free Audit
            <ArrowRight size={16} className="ml-2" />
          </Button>
          <Button size="lg" variant="secondary" onClick={handleBookCall} className="w-full sm:w-auto">
            Book a 15-min Call
            <ExternalLink size={14} className="ml-2" />
          </Button>
        </div>

        <p className="font-mono text-[11px] text-gray-500 uppercase tracking-wider">
          Delivered in 24–48h. No spam. No login needed.
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
      setIsVisible(window.scrollY > 600);
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
              // Free audit — 24–48h delivery
            </span>
            <div className="flex items-center gap-3 w-full sm:w-auto justify-center sm:justify-end">
              <Button size="sm" onClick={scrollToForm}>
                Request Free Audit
              </Button>
              <Button size="sm" variant="secondary" onClick={handleBookCall}>
                Book a Call
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
      <SampleAuditPreview />
      <CommonLeaksSection />
      <FormAndPreviewSection />
      <FAQSection />
      <FinalCTASection />
      <StickyCTABar />
    </>
  );
};

export default AuditPage;
