import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Section, Button, fadeInUp, staggerContainer } from './ui/Shared';
import {
  Check,
  ChevronDown,
  ChevronRight,
  Clock,
  Globe,
  Zap,
  BarChart3,
  Search,
  Wrench,
  Settings,
  RefreshCw,
  FileText,
  Phone,
  Mail,
  Calendar,
  Shield,
  Camera,
  Palette,
  Key,
} from 'lucide-react';
import { processContent } from '../content/process';
import { trackBookCallClick, trackRunAuditClick } from '../utils/analytics';

// ============================================
// HERO SECTION
// ============================================
const HeroSection: React.FC = () => {
  const { hero } = processContent;

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
        <p className="text-xl md:text-2xl text-gray-400 leading-relaxed mb-10 max-w-3xl">
          {hero.subhead}
        </p>

        {/* What to Expect Strip */}
        <div className="relative border border-brand-border bg-brand-panel p-6">
          {/* Corner markers */}
          <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-brand-accent"></div>
          <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-brand-accent"></div>
          <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-brand-accent"></div>
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-brand-accent"></div>

          <div className="flex items-center gap-2 mb-4">
            <span className="font-mono text-[10px] text-brand-accent uppercase tracking-wider">
              What to expect
            </span>
          </div>

          <div className="flex flex-wrap gap-3">
            {hero.expectStrip.map((item, idx) => (
              <div
                key={idx}
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-brand-accent/10 border border-brand-accent/20 text-brand-accent"
              >
                <Check size={12} />
                <span className="font-mono text-xs uppercase tracking-wider">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </Section>
  );
};

// ============================================
// IN 60 SECONDS SUMMARY
// ============================================
const SummarySection: React.FC = () => {
  const { summary } = processContent;

  return (
    <Section className="py-12 border-t border-white/5">
      <motion.div
        className="max-w-3xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        {/* Section header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1.5 h-1.5 bg-brand-accent rounded-full"></div>
          <h2 className="font-mono text-[10px] text-brand-accent uppercase tracking-wider">
            {summary.title}
          </h2>
        </div>

        {/* Paragraphs */}
        <div className="space-y-4 mb-6">
          {summary.paragraphs.map((para, idx) => (
            <p key={idx} className="text-lg text-gray-300 leading-relaxed flex items-start gap-3">
              <span className="text-brand-accent font-mono text-sm mt-1">{idx + 1}.</span>
              {para}
            </p>
          ))}
        </div>

        {/* Timeline chip */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded">
          <Clock size={14} className="text-brand-accent" />
          <span className="font-mono text-sm text-gray-400">{summary.timelineChip}</span>
        </div>
      </motion.div>
    </Section>
  );
};

// ============================================
// 4-STEP FLOW - Interactive Stepper
// ============================================
const stepIcons = [Search, Wrench, Settings, RefreshCw];

const StepsSection: React.FC = () => {
  const { steps } = processContent;
  const [activeStep, setActiveStep] = useState(0);
  const [expandedMobile, setExpandedMobile] = useState<number | null>(0);

  return (
    <Section className="py-16 border-t border-white/5">
      {/* Section header */}
      <div className="flex items-center gap-3 mb-10">
        <div className="w-1.5 h-1.5 bg-brand-accent rounded-full"></div>
        <h2 className="font-mono text-[10px] text-brand-accent uppercase tracking-wider">
          The 4-Step Flow
        </h2>
        <div className="h-[1px] flex-1 bg-brand-border"></div>
      </div>

      {/* Desktop: Horizontal Stepper */}
      <div className="hidden lg:block">
        {/* Step tabs */}
        <div className="flex border-b border-brand-border mb-8">
          {steps.map((step, idx) => {
            const Icon = stepIcons[idx];
            const isActive = activeStep === idx;
            return (
              <button
                key={step.id}
                onClick={() => setActiveStep(idx)}
                className={`flex-1 py-4 px-6 text-left transition-all relative group ${
                  isActive ? 'bg-brand-accent/5' : 'hover:bg-white/[0.02]'
                }`}
              >
                {/* Active indicator */}
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-accent"
                  />
                )}

                <div className="flex items-center gap-3">
                  <span
                    className={`font-mono text-2xl font-bold ${
                      isActive ? 'text-brand-accent' : 'text-white/20 group-hover:text-white/40'
                    }`}
                  >
                    {step.id}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <Icon
                        size={16}
                        className={isActive ? 'text-brand-accent' : 'text-gray-500'}
                      />
                      <span
                        className={`font-bold uppercase tracking-wide ${
                          isActive ? 'text-white' : 'text-gray-400'
                        }`}
                      >
                        {step.title}
                      </span>
                    </div>
                    <span className="font-mono text-[10px] text-gray-500">{step.duration}</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active step content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="grid md:grid-cols-2 gap-8"
          >
            {/* Left: What You Get */}
            <div className="relative border border-brand-accent/30 bg-brand-accent/[0.02] p-6">
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-brand-accent"></div>
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-brand-accent"></div>
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-brand-accent"></div>
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-brand-accent"></div>

              <h4 className="font-mono text-[10px] text-brand-accent uppercase tracking-wider mb-4">
                What You Get
              </h4>
              <ul className="space-y-3">
                {steps[activeStep].whatYouGet.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-gray-300">
                    <Check size={14} className="text-brand-accent mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: What We Need + Tags */}
            <div className="space-y-6">
              <div className="relative border border-brand-border bg-brand-panel p-6">
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/20"></div>
                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/20"></div>
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/20"></div>
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/20"></div>

                <h4 className="font-mono text-[10px] text-gray-500 uppercase tracking-wider mb-4">
                  What We Need From You
                </h4>
                <ul className="space-y-2">
                  {steps[activeStep].whatWeNeedFromYou.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-gray-400">
                      <ChevronRight size={14} className="text-gray-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Deliverables tags */}
              <div className="flex flex-wrap gap-2">
                {steps[activeStep].deliverablesTags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 text-[10px] font-mono uppercase tracking-wider text-brand-accent border border-brand-accent/30 bg-brand-accent/5"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Mobile: Accordion */}
      <div className="lg:hidden space-y-3">
        {steps.map((step, idx) => {
          const Icon = stepIcons[idx];
          const isExpanded = expandedMobile === idx;
          return (
            <div
              key={step.id}
              className={`border ${isExpanded ? 'border-brand-accent/30 bg-brand-accent/[0.02]' : 'border-brand-border bg-brand-panel'}`}
            >
              <button
                onClick={() => setExpandedMobile(isExpanded ? null : idx)}
                className="w-full p-4 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`font-mono text-xl font-bold ${isExpanded ? 'text-brand-accent' : 'text-white/20'}`}
                  >
                    {step.id}
                  </span>
                  <Icon size={16} className={isExpanded ? 'text-brand-accent' : 'text-gray-500'} />
                  <span className={`font-bold uppercase ${isExpanded ? 'text-white' : 'text-gray-400'}`}>
                    {step.title}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[10px] text-gray-500">{step.duration}</span>
                  <ChevronDown
                    size={16}
                    className={`text-gray-500 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                  />
                </div>
              </button>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 pt-0 space-y-4">
                      <p className="text-gray-400 text-sm">{step.summary}</p>

                      <div>
                        <h4 className="font-mono text-[10px] text-brand-accent uppercase tracking-wider mb-2">
                          What You Get
                        </h4>
                        <ul className="space-y-2">
                          {step.whatYouGet.map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-gray-300 text-sm">
                              <Check size={12} className="text-brand-accent mt-0.5" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {step.deliverablesTags.map((tag, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 text-[9px] font-mono uppercase tracking-wider text-brand-accent border border-brand-accent/30"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
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
// TIMELINE & CHECKPOINTS
// ============================================
const TimelineSection: React.FC = () => {
  const { timeline } = processContent;

  return (
    <Section className="py-16 border-t border-white/5">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-1.5 h-1.5 bg-brand-accent rounded-full"></div>
        <h2 className="font-mono text-[10px] text-brand-accent uppercase tracking-wider">
          {timeline.title}
        </h2>
      </div>

      <p className="text-xl text-gray-300 mb-2">{timeline.totalDurationText}</p>
      <p className="text-sm text-gray-500 mb-8">{timeline.note}</p>

      {/* Timeline visualization */}
      <div className="relative">
        {/* Progress line */}
        <div className="absolute top-6 left-0 right-0 h-0.5 bg-brand-border hidden md:block"></div>

        <div className="grid md:grid-cols-4 gap-4">
          {timeline.checkpoints.map((checkpoint, idx) => (
            <motion.div
              key={idx}
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
            >
              {/* Dot */}
              <div className="hidden md:flex w-3 h-3 bg-brand-accent rounded-full mb-4 relative z-10 items-center justify-center">
                <div className="w-1.5 h-1.5 bg-brand-dark rounded-full"></div>
              </div>

              <div className="p-4 border border-brand-border bg-brand-panel">
                <span className="font-mono text-[10px] text-brand-accent uppercase tracking-wider block mb-1">
                  {checkpoint.day}
                </span>
                <h4 className="font-bold text-white mb-1">{checkpoint.label}</h4>
                <p className="text-sm text-gray-500">{checkpoint.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
};

// ============================================
// WHAT WE NEED FROM YOU
// ============================================
const inputIcons = [FileText, Shield, Palette, Key];

const InputsSection: React.FC = () => {
  const { inputs } = processContent;

  return (
    <Section className="py-16 border-t border-white/5">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-1.5 h-1.5 bg-brand-accent rounded-full"></div>
        <h2 className="font-mono text-[10px] text-brand-accent uppercase tracking-wider">
          {inputs.title}
        </h2>
      </div>

      <p className="text-gray-400 mb-8">{inputs.callout}</p>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {inputs.groups.map((group, idx) => {
          const Icon = inputIcons[idx];
          return (
            <motion.div
              key={idx}
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

              <div className="flex items-center gap-2 mb-4">
                <Icon size={16} className="text-brand-accent" />
                <h3 className="font-bold text-white text-sm uppercase">{group.title}</h3>
              </div>

              <ul className="space-y-2">
                {group.items.map((item, i) => (
                  <li key={i} className="text-sm text-gray-400 flex items-start gap-2">
                    <span className="text-brand-accent/50 mt-1">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
};

// ============================================
// DELIVERABLES - 3 Column Grid
// ============================================
const deliverableIcons: Record<string, React.ElementType> = {
  globe: Globe,
  zap: Zap,
  'bar-chart': BarChart3,
};

const DeliverablesSection: React.FC = () => {
  const { deliverables } = processContent;

  return (
    <Section className="py-16 border-t border-white/5">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-1.5 h-1.5 bg-brand-accent rounded-full"></div>
        <h2 className="font-mono text-[10px] text-brand-accent uppercase tracking-wider">
          {deliverables.title}
        </h2>
      </div>

      <p className="text-gray-400 mb-8">{deliverables.subtitle}</p>

      <div className="grid md:grid-cols-3 gap-6">
        {deliverables.columns.map((col, idx) => {
          const Icon = deliverableIcons[col.icon] || Globe;
          return (
            <motion.div
              key={idx}
              className="relative border border-brand-border bg-brand-panel overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-brand-accent"></div>
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-brand-accent"></div>
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-brand-accent"></div>
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-brand-accent"></div>

              {/* Header */}
              <div className="p-5 border-b border-brand-border flex items-center gap-3">
                <Icon size={20} className="text-brand-accent" />
                <h3 className="font-bold text-white uppercase">{col.title}</h3>
              </div>

              {/* Items */}
              <div className="p-5">
                <ul className="space-y-2">
                  {col.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                      <Check size={12} className="text-brand-accent mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
};

// ============================================
// HOW WE MEASURE
// ============================================
const MeasurementSection: React.FC = () => {
  const { measurement } = processContent;

  return (
    <Section className="py-16 border-t border-white/5">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-1.5 h-1.5 bg-brand-accent rounded-full"></div>
        <h2 className="font-mono text-[10px] text-brand-accent uppercase tracking-wider">
          {measurement.title}
        </h2>
      </div>

      <p className="text-gray-400 mb-8">{measurement.subtitle}</p>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Events we track */}
        <div className="relative border border-brand-border bg-brand-panel p-6">
          <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/20"></div>
          <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/20"></div>
          <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/20"></div>
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/20"></div>

          <h4 className="font-mono text-[10px] text-gray-500 uppercase tracking-wider mb-4">
            Events We Track
          </h4>
          <div className="flex flex-wrap gap-2">
            {measurement.events.map((event, idx) => (
              <code
                key={idx}
                className="px-2 py-1 bg-black/50 text-brand-accent text-xs font-mono border border-brand-accent/20"
              >
                {event}
              </code>
            ))}
          </div>
        </div>

        {/* What we report */}
        <div className="relative border border-brand-accent/30 bg-brand-accent/[0.02] p-6">
          <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-brand-accent"></div>
          <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-brand-accent"></div>
          <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-brand-accent"></div>
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-brand-accent"></div>

          <h4 className="font-mono text-[10px] text-brand-accent uppercase tracking-wider mb-4">
            What We Report
          </h4>
          <ul className="space-y-3">
            {measurement.whatWeReport.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <BarChart3 size={14} className="text-brand-accent mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-white text-sm font-medium">{item.label}</span>
                  <span className="text-gray-500 text-sm"> — {item.description}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="font-mono text-[10px] text-gray-600 uppercase tracking-wider mt-6">
        // {measurement.disclaimer}
      </p>
    </Section>
  );
};

// ============================================
// AFTER LAUNCH
// ============================================
const AfterLaunchSection: React.FC = () => {
  const { afterLaunch } = processContent;

  return (
    <Section className="py-16 border-t border-white/5">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-1.5 h-1.5 bg-brand-accent rounded-full"></div>
        <h2 className="font-mono text-[10px] text-brand-accent uppercase tracking-wider">
          {afterLaunch.title}
        </h2>
      </div>

      <p className="text-gray-400 mb-8">{afterLaunch.subtitle}</p>

      <div className="grid md:grid-cols-2 gap-6">
        {afterLaunch.plans.map((plan, idx) => (
          <motion.div
            key={idx}
            className={`relative border overflow-hidden ${
              idx === 1
                ? 'border-brand-accent/30 bg-brand-accent/[0.02]'
                : 'border-brand-border bg-brand-panel'
            }`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            viewport={{ once: true }}
          >
            <div
              className={`absolute top-0 left-0 w-2 h-2 border-t border-l ${idx === 1 ? 'border-brand-accent' : 'border-white/20'}`}
            ></div>
            <div
              className={`absolute top-0 right-0 w-2 h-2 border-t border-r ${idx === 1 ? 'border-brand-accent' : 'border-white/20'}`}
            ></div>
            <div
              className={`absolute bottom-0 left-0 w-2 h-2 border-b border-l ${idx === 1 ? 'border-brand-accent' : 'border-white/20'}`}
            ></div>
            <div
              className={`absolute bottom-0 right-0 w-2 h-2 border-b border-r ${idx === 1 ? 'border-brand-accent' : 'border-white/20'}`}
            ></div>

            {/* Header */}
            <div className="p-6 border-b border-brand-border">
              <h3 className="text-xl font-bold text-white mb-1">{plan.title}</h3>
              <p className="font-mono text-[10px] text-brand-accent uppercase tracking-wider">
                {plan.subtitle}
              </p>
            </div>

            {/* Content */}
            <div className="p-6">
              <p className="text-sm text-gray-500 mb-4">{plan.whoItsFor}</p>

              <ul className="space-y-2 mb-6">
                {plan.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                    <Check size={12} className="text-brand-accent mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

              <a
                href={`/pricing#${plan.ctaAnchor}`}
                className="inline-flex items-center gap-2 text-brand-accent text-sm font-medium hover:underline"
              >
                {plan.ctaText}
                <ChevronRight size={14} />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
};

// ============================================
// FAQ ACCORDION
// ============================================
const FAQSection: React.FC = () => {
  const { faq } = processContent;
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <Section className="py-16 border-t border-white/5">
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
  const { finalCta } = processContent;
  const navigate = useNavigate();

  const handleBookClick = () => {
    trackBookCallClick('process_final_cta');
    navigate('/contact');
    setTimeout(() => document.getElementById('calendar')?.scrollIntoView({ behavior: 'smooth' }), 100);
  };

  const handleAuditClick = () => {
    trackRunAuditClick('process_final_cta');
    navigate('/contact');
    setTimeout(() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' }), 100);
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
  const { stickyCta } = processContent;
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past 400px (roughly past the hero)
      setIsVisible(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleBookClick = () => {
    trackBookCallClick('process_sticky_cta');
    navigate('/contact');
  };

  const handleAuditClick = () => {
    trackRunAuditClick('process_sticky_cta');
    navigate('/contact');
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
              // Ready to start?
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
// MAIN PROCESS PAGE
// ============================================
const ProcessPage: React.FC = () => {
  return (
    <>
      <HeroSection />
      <SummarySection />
      <StepsSection />
      <TimelineSection />
      <InputsSection />
      <DeliverablesSection />
      <MeasurementSection />
      <AfterLaunchSection />
      <FAQSection />
      <FinalCTASection />
    </>
  );
};

export default ProcessPage;
