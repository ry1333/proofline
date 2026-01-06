import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Section, Button } from './ui/Shared';
import BookingWidget from './booking/BookingWidget';
import {
  Check,
  ChevronDown,
  ChevronRight,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Calendar,
  MessageSquare,
  ArrowRight,
  Loader2,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import { contactContent } from '../content/contact';
import { trackEvent, trackBookCallClick, trackRunAuditClick } from '../utils/analytics';

// ============================================
// HERO SECTION
// ============================================
const HeroSection: React.FC = () => {
  const { hero } = contactContent;

  return (
    <Section className="pt-32 pb-12">
      <motion.div
        className="max-w-4xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Micro label */}
        <div className="flex items-center gap-3 mb-4">
          <span className="font-mono text-[10px] text-brand-accent uppercase tracking-[0.2em]">
            // {hero.micro}
          </span>
          <div className="h-[1px] w-12 bg-brand-border"></div>
        </div>

        {/* Title */}
        <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tight mb-6">
          {hero.title}
        </h1>

        {/* Subhead */}
        <p className="text-xl md:text-2xl text-gray-400 leading-relaxed mb-8 max-w-3xl">
          {hero.subhead}
        </p>

        {/* Expectation Strip */}
        <div className="flex flex-wrap gap-3">
          {hero.expectStrip.map((item, idx) => (
            <div
              key={idx}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 text-gray-400"
            >
              <Check size={12} className="text-brand-accent" />
              <span className="font-mono text-xs uppercase tracking-wider">{item}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </Section>
  );
};

// ============================================
// BOOK A CALL PANEL
// ============================================
const BookCallPanel: React.FC = () => {
  const { bookCall, calendar, responseHours } = contactContent;

  return (
    <div id="calendar" className="relative border border-brand-accent/30 bg-brand-accent/[0.02] overflow-hidden h-full flex flex-col">
      {/* Corner markers */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-brand-accent"></div>
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-brand-accent"></div>
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-brand-accent"></div>
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-brand-accent"></div>

      {/* Header */}
      <div className="p-5 border-b border-brand-accent/20 flex items-center gap-3">
        <Calendar size={18} className="text-brand-accent" />
        <h3 className="font-bold text-white uppercase tracking-wide">{bookCall.title}</h3>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col">
        {/* Bullets */}
        <ul className="space-y-3 mb-4">
          {bookCall.bullets.map((bullet, idx) => (
            <li key={idx} className="flex items-start gap-3 text-gray-300">
              <Check size={14} className="text-brand-accent mt-0.5 flex-shrink-0" />
              <span className="text-sm">{bullet}</span>
            </li>
          ))}
        </ul>

        {/* Booking Widget */}
        <div className="flex-1">
          <BookingWidget organizationSlug="proofline" />
        </div>

        {/* Fallback text */}
        <p className="font-mono text-[10px] text-gray-500 uppercase tracking-wider text-center mt-4">
          {bookCall.fallbackText.replace('[X]', responseHours)}
        </p>
      </div>
    </div>
  );
};

// ============================================
// CONTACT FORM
// ============================================
const ContactForm: React.FC = () => {
  const { form, responseHours, calendar } = contactContent;
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    business: '',
    website: '',
    goal: '',
    message: '',
    wantAudit: false,
    leadSource: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const validateField = (name: string, value: string): string => {
    if (name === 'name' && !value.trim()) return 'Name is required';
    if (name === 'email') {
      if (!value.trim()) return 'Email is required';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email';
    }
    if (name === 'goal' && !value) return 'Please select a goal';
    if (name === 'message' && !value.trim()) return 'Message is required';
    return '';
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const newValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;

    setFormData((prev) => ({ ...prev, [name]: newValue }));

    // Clear error on change
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

    // Validate all required fields
    const newErrors: Record<string, string> = {};
    ['name', 'email', 'goal', 'message'].forEach((field) => {
      const error = validateField(field, formData[field as keyof typeof formData] as string);
      if (error) newErrors[field] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setStatus('submitting');
    trackEvent('contact_form_submit_attempt', {});

    try {
      // Get Formspree endpoint from env or use placeholder
      const formspreeId = import.meta.env.VITE_FORMSPREE_ID || 'YOUR_FORMSPREE_ID';
      const endpoint = `https://formspree.io/f/${formspreeId}`;

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          _subject: `New Contact: ${formData.name} - ${formData.goal}`,
        }),
      });

      if (response.ok) {
        setStatus('success');
        trackEvent('contact_form_submit_success', { goal: formData.goal, wantAudit: formData.wantAudit });
        setFormData({
          name: '',
          email: '',
          phone: '',
          business: '',
          website: '',
          goal: '',
          message: '',
          wantAudit: false,
          leadSource: '',
        });
      } else {
        throw new Error('Form submission failed');
      }
    } catch {
      setStatus('error');
      trackEvent('contact_form_submit_error', {});
    }
  };

  const handleBookNow = () => {
    trackBookCallClick('contact_form_success');
    window.open(calendar.linkUrl, '_blank');
  };

  if (status === 'success') {
    return (
      <div className="relative border border-brand-accent/30 bg-brand-accent/[0.02] overflow-hidden h-full">
        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-brand-accent"></div>
        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-brand-accent"></div>
        <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-brand-accent"></div>
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-brand-accent"></div>

        <div className="p-8 text-center">
          <CheckCircle size={48} className="text-brand-accent mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Message Sent!</h3>
          <p className="text-gray-400 mb-6">{form.successMessage}</p>
          <p className="text-sm text-gray-500 mb-4">{form.successCta}</p>
          <Button onClick={handleBookNow}>
            Book a 15-min Call
            <ExternalLink size={14} className="ml-2" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div
      id="contact-form"
      className="relative border border-brand-border bg-brand-panel overflow-hidden h-full"
    >
      {/* Corner markers */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/20"></div>
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/20"></div>
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/20"></div>
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/20"></div>

      {/* Header */}
      <div className="p-5 border-b border-brand-border flex items-center gap-3">
        <MessageSquare size={18} className="text-brand-accent" />
        <h3 className="font-bold text-white uppercase tracking-wide">{form.title}</h3>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-5 space-y-4">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-xs font-mono text-gray-500 uppercase tracking-wider mb-1">
            {form.fields.name.label} *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder={form.fields.name.placeholder}
            className={`w-full px-4 py-3 bg-black/50 border ${
              errors.name ? 'border-red-500' : 'border-brand-border'
            } text-white placeholder-gray-600 focus:border-brand-accent focus:outline-none transition-colors`}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'name-error' : undefined}
          />
          {errors.name && (
            <p id="name-error" className="text-red-400 text-xs mt-1 flex items-center gap-1">
              <AlertCircle size={12} /> {errors.name}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-xs font-mono text-gray-500 uppercase tracking-wider mb-1">
            {form.fields.email.label} *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder={form.fields.email.placeholder}
            className={`w-full px-4 py-3 bg-black/50 border ${
              errors.email ? 'border-red-500' : 'border-brand-border'
            } text-white placeholder-gray-600 focus:border-brand-accent focus:outline-none transition-colors`}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
          {errors.email && (
            <p id="email-error" className="text-red-400 text-xs mt-1 flex items-center gap-1">
              <AlertCircle size={12} /> {errors.email}
            </p>
          )}
        </div>

        {/* Phone + Business (2 col on desktop) */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="phone" className="block text-xs font-mono text-gray-500 uppercase tracking-wider mb-1">
              {form.fields.phone.label}
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder={form.fields.phone.placeholder}
              className="w-full px-4 py-3 bg-black/50 border border-brand-border text-white placeholder-gray-600 focus:border-brand-accent focus:outline-none transition-colors"
            />
          </div>
          <div>
            <label htmlFor="business" className="block text-xs font-mono text-gray-500 uppercase tracking-wider mb-1">
              {form.fields.business.label}
            </label>
            <input
              type="text"
              id="business"
              name="business"
              value={formData.business}
              onChange={handleChange}
              placeholder={form.fields.business.placeholder}
              className="w-full px-4 py-3 bg-black/50 border border-brand-border text-white placeholder-gray-600 focus:border-brand-accent focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Website */}
        <div>
          <label htmlFor="website" className="block text-xs font-mono text-gray-500 uppercase tracking-wider mb-1">
            {form.fields.website.label}
          </label>
          <input
            type="url"
            id="website"
            name="website"
            value={formData.website}
            onChange={handleChange}
            placeholder={form.fields.website.placeholder}
            className="w-full px-4 py-3 bg-black/50 border border-brand-border text-white placeholder-gray-600 focus:border-brand-accent focus:outline-none transition-colors"
          />
        </div>

        {/* Goal dropdown */}
        <div>
          <label htmlFor="goal" className="block text-xs font-mono text-gray-500 uppercase tracking-wider mb-1">
            {form.fields.goal.label} *
          </label>
          <select
            id="goal"
            name="goal"
            value={formData.goal}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full px-4 py-3 bg-black/50 border ${
              errors.goal ? 'border-red-500' : 'border-brand-border'
            } text-white focus:border-brand-accent focus:outline-none transition-colors appearance-none cursor-pointer`}
            aria-invalid={!!errors.goal}
            aria-describedby={errors.goal ? 'goal-error' : undefined}
          >
            {form.fields.goal.options.map((opt) => (
              <option key={opt.value} value={opt.value} className="bg-brand-dark">
                {opt.label}
              </option>
            ))}
          </select>
          {errors.goal && (
            <p id="goal-error" className="text-red-400 text-xs mt-1 flex items-center gap-1">
              <AlertCircle size={12} /> {errors.goal}
            </p>
          )}
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="block text-xs font-mono text-gray-500 uppercase tracking-wider mb-1">
            {form.fields.message.label} *
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder={form.fields.message.placeholder}
            rows={4}
            className={`w-full px-4 py-3 bg-black/50 border ${
              errors.message ? 'border-red-500' : 'border-brand-border'
            } text-white placeholder-gray-600 focus:border-brand-accent focus:outline-none transition-colors resize-none`}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? 'message-error' : undefined}
          />
          {errors.message && (
            <p id="message-error" className="text-red-400 text-xs mt-1 flex items-center gap-1">
              <AlertCircle size={12} /> {errors.message}
            </p>
          )}
        </div>

        {/* Want audit checkbox */}
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            id="wantAudit"
            name="wantAudit"
            checked={formData.wantAudit}
            onChange={handleChange}
            className="mt-1 w-4 h-4 bg-black/50 border border-brand-border text-brand-accent focus:ring-brand-accent focus:ring-offset-0 cursor-pointer"
          />
          <label htmlFor="wantAudit" className="text-sm text-gray-300 cursor-pointer">
            {form.fields.wantAudit.label}
          </label>
        </div>

        {/* Conditional lead source field */}
        <AnimatePresence>
          {formData.wantAudit && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <label htmlFor="leadSource" className="block text-xs font-mono text-gray-500 uppercase tracking-wider mb-1">
                {form.fields.leadSource.label}
              </label>
              <select
                id="leadSource"
                name="leadSource"
                value={formData.leadSource}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-black/50 border border-brand-border text-white focus:border-brand-accent focus:outline-none transition-colors appearance-none cursor-pointer"
              >
                {form.fields.leadSource.options.map((opt) => (
                  <option key={opt.value} value={opt.value} className="bg-brand-dark">
                    {opt.label}
                  </option>
                ))}
              </select>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error message */}
        {status === 'error' && (
          <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-400 text-sm flex items-center gap-2">
            <AlertCircle size={16} />
            {form.errorMessage}
          </div>
        )}

        {/* Submit button */}
        <Button type="submit" className="w-full" disabled={status === 'submitting'}>
          {status === 'submitting' ? (
            <>
              <Loader2 size={16} className="animate-spin mr-2" />
              {form.submittingLabel}
            </>
          ) : (
            form.submitLabel
          )}
        </Button>

        {/* Reassurance */}
        <p className="font-mono text-[10px] text-gray-600 uppercase tracking-wider text-center">
          {form.reassurance.replace('[X]', responseHours)}
        </p>
      </form>
    </div>
  );
};

// ============================================
// TWO-COLUMN MAIN SECTION
// ============================================
const MainSection: React.FC = () => (
  <Section className="py-8">
    <div className="grid lg:grid-cols-2 gap-8">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
      >
        <BookCallPanel />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
      >
        <ContactForm />
      </motion.div>
    </div>
  </Section>
);

// ============================================
// WHAT HAPPENS NEXT
// ============================================
const WhatHappensNextSection: React.FC = () => {
  const { whatHappensNext } = contactContent;

  return (
    <Section className="py-12 border-t border-white/5">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-1.5 h-1.5 bg-brand-accent rounded-full"></div>
        <h2 className="font-mono text-[10px] text-brand-accent uppercase tracking-wider">
          {whatHappensNext.title}
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {whatHappensNext.steps.map((step, idx) => (
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
            <p className="text-sm text-gray-500">{step.description}</p>

            {/* Arrow connector (hidden on last and mobile) */}
            {idx < 2 && (
              <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10">
                <ArrowRight size={16} className="text-brand-border" />
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </Section>
  );
};

// ============================================
// QUICK LINKS
// ============================================
const QuickLinksSection: React.FC = () => {
  const { quickLinks } = contactContent;

  return (
    <Section className="py-12 border-t border-white/5">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-1.5 h-1.5 bg-brand-accent rounded-full"></div>
        <h2 className="font-mono text-[10px] text-brand-accent uppercase tracking-wider">
          {quickLinks.title}
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {quickLinks.links.map((link, idx) => (
          <motion.div
            key={link.href}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            viewport={{ once: true }}
          >
            <Link
              to={link.href}
              className="relative block border border-brand-border bg-brand-panel p-5 hover:border-brand-accent/30 transition-colors group"
            >
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/20 group-hover:border-brand-accent/40 transition-colors"></div>
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/20 group-hover:border-brand-accent/40 transition-colors"></div>
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/20 group-hover:border-brand-accent/40 transition-colors"></div>
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/20 group-hover:border-brand-accent/40 transition-colors"></div>

              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-white group-hover:text-brand-accent transition-colors">
                  {link.title}
                </h3>
                <ChevronRight size={16} className="text-gray-600 group-hover:text-brand-accent transition-colors" />
              </div>
              <p className="text-sm text-gray-500">{link.description}</p>
            </Link>
          </motion.div>
        ))}
      </div>
    </Section>
  );
};

// ============================================
// CONTACT DETAILS
// ============================================
const ContactDetailsSection: React.FC = () => {
  const { contactMethods, contactDetails } = contactContent;

  return (
    <Section className="py-12 border-t border-white/5">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-1.5 h-1.5 bg-brand-accent rounded-full"></div>
        <h2 className="font-mono text-[10px] text-brand-accent uppercase tracking-wider">
          {contactDetails.title}
        </h2>
      </div>

      <div className="relative border border-brand-border bg-brand-panel p-6 max-w-md">
        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/20"></div>
        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/20"></div>
        <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/20"></div>
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/20"></div>

        <div className="space-y-4">
          {/* Email */}
          <a
            href={`mailto:${contactMethods.email}`}
            className="flex items-center gap-3 text-gray-300 hover:text-brand-accent transition-colors group"
          >
            <Mail size={18} className="text-gray-500 group-hover:text-brand-accent" />
            <span>{contactMethods.email}</span>
          </a>

          {/* Phone */}
          {contactMethods.phone && (
            <a
              href={`tel:${contactMethods.phone}`}
              className="flex items-center gap-3 text-gray-300 hover:text-brand-accent transition-colors group"
            >
              <Phone size={18} className="text-gray-500 group-hover:text-brand-accent" />
              <span>{contactMethods.phone}</span>
            </a>
          )}

          {/* Location */}
          {contactMethods.locationText && (
            <div className="flex items-center gap-3 text-gray-400">
              <MapPin size={18} className="text-gray-500" />
              <span>{contactMethods.locationText}</span>
            </div>
          )}
        </div>

        <p className="font-mono text-[10px] text-gray-600 uppercase tracking-wider mt-4">
          {contactDetails.remoteNote}
        </p>
      </div>
    </Section>
  );
};

// ============================================
// FAQ ACCORDION
// ============================================
const FAQSection: React.FC = () => {
  const { faq } = contactContent;
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <Section className="py-12 border-t border-white/5">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-1.5 h-1.5 bg-brand-accent rounded-full"></div>
        <h2 className="font-mono text-[10px] text-brand-accent uppercase tracking-wider">
          Frequently Asked Questions
        </h2>
      </div>

      <div className="max-w-3xl space-y-3">
        {faq.map((item, idx) => {
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
                aria-controls={`faq-${idx}`}
              >
                <span className={`font-medium ${isOpen ? 'text-white' : 'text-gray-300'}`}>
                  {item.q}
                </span>
                <ChevronDown
                  size={16}
                  className={`text-gray-500 transition-transform flex-shrink-0 ml-4 ${isOpen ? 'rotate-180' : ''}`}
                />
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    id={`faq-${idx}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4 text-gray-400 text-sm leading-relaxed">{item.a}</div>
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
// FINAL CTA
// ============================================
const FinalCTASection: React.FC = () => {
  const { finalCta, calendar } = contactContent;

  const handleBookClick = () => {
    trackBookCallClick('contact_footer');
    window.open(calendar.linkUrl, '_blank');
  };

  const handleAuditClick = () => {
    trackRunAuditClick('contact_footer');
    document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Section className="py-20 border-t border-white/5">
      <motion.div
        className="relative border border-brand-accent/30 bg-brand-accent/[0.02] p-8 md:p-12 text-center max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        {/* Corner markers */}
        <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-brand-accent"></div>
        <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-brand-accent"></div>
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-brand-accent"></div>
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-brand-accent"></div>

        <div className="mb-4">
          <span className="font-mono text-[10px] text-brand-accent uppercase tracking-[0.2em]">
            // {finalCta.micro}
          </span>
        </div>

        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{finalCta.title}</h2>

        <p className="text-gray-400 mb-8 max-w-xl mx-auto">{finalCta.subtitle}</p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4">
          <Button size="lg" onClick={handleBookClick}>
            {finalCta.primaryCta}
          </Button>
          <Button size="lg" variant="secondary" onClick={handleAuditClick}>
            {finalCta.secondaryCta}
          </Button>
        </div>

        <p className="font-mono text-[10px] text-gray-600 uppercase tracking-wider">
          {finalCta.helperLine}
        </p>
      </motion.div>
    </Section>
  );
};

// ============================================
// STICKY CTA BAR
// ============================================
const StickyCTABar: React.FC = () => {
  const { stickyCta, calendar } = contactContent;
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleBookClick = () => {
    trackBookCallClick('contact_sticky');
    window.open(calendar.linkUrl, '_blank');
  };

  const handleAuditClick = () => {
    trackRunAuditClick('contact_sticky');
    document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
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
              // Ready to connect?
            </span>
            <div className="flex items-center gap-3 w-full sm:w-auto justify-center sm:justify-end">
              <Button size="sm" onClick={handleBookClick}>
                {stickyCta.primaryCta}
              </Button>
              <Button size="sm" variant="secondary" onClick={handleAuditClick}>
                {stickyCta.secondaryCta}
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// ============================================
// MAIN CONTACT PAGE
// ============================================
const ContactPage: React.FC = () => {
  return (
    <>
      <HeroSection />
      <MainSection />
      <WhatHappensNextSection />
      <QuickLinksSection />
      <ContactDetailsSection />
      <FAQSection />
      <FinalCTASection />
    </>
  );
};

export default ContactPage;
