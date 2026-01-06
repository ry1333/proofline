import React from 'react';
import { motion } from 'framer-motion';
import { Section, Card, Button, Badge, fadeInUp, staggerContainer } from './ui/Shared';
import { ArrowRight, Check, Zap, Settings, BarChart3, RefreshCw } from 'lucide-react';

// PageHeader Component
const PageHeader: React.FC = () => (
  <Section className="pt-32 pb-16">
    <motion.div
      className="border-l border-brand-border pl-6 relative"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="absolute top-0 left-0 w-[1px] h-1/2 bg-brand-accent"></div>
      <div className="flex items-center gap-3 mb-4">
        <Badge>SYSTEM v2.0</Badge>
        <div className="h-[1px] w-12 bg-brand-border"></div>
      </div>
      <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tight uppercase mb-4">Process</h1>
      <p className="text-brand-textDim text-lg max-w-2xl font-mono">
        A repeatable build loop: diagnose → build → instrument → iterate.
      </p>
    </motion.div>
  </Section>
);

// Timeline Step Data
const timelineSteps = [
  {
    num: '01',
    title: 'Diagnose',
    desc: 'Audit leaks. Set baseline.',
    chip: 'Baseline set',
    icon: BarChart3
  },
  {
    num: '02',
    title: 'Build',
    desc: 'High-speed build. Explainable UX.',
    chip: 'Lighthouse pass',
    icon: Zap
  },
  {
    num: '03',
    title: 'Instrument',
    desc: 'Events + tracking + attribution.',
    chip: 'Data accuracy',
    icon: Settings
  },
  {
    num: '04',
    title: 'Iterate',
    desc: 'Tests + refinements.',
    chip: 'Conversion rate',
    icon: RefreshCw
  },
];

// Timeline HUD Panel
const TimelinePanel: React.FC = () => (
  <Section className="py-16">
    <div className="border border-brand-border bg-brand-panel relative">
      {/* Corner markers */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-brand-accent"></div>
      <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-brand-accent"></div>
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-brand-accent"></div>
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-brand-accent"></div>

      {/* Header */}
      <div className="border-b border-brand-border px-6 py-3 flex items-center gap-2">
        <span className="font-mono text-[10px] text-brand-accent uppercase tracking-[0.2em]">PROTOCOL_SEQUENCE</span>
        <div className="h-[1px] flex-1 bg-brand-border"></div>
        <span className="font-mono text-[10px] text-brand-textDim">4 PHASES</span>
      </div>

      {/* Timeline Grid */}
      <div className="grid md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-brand-border">
        {timelineSteps.map((step, idx) => (
          <motion.div
            key={idx}
            className="p-6 group hover:bg-white/[0.02] transition-colors relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            viewport={{ once: true }}
          >
            {/* Step Number */}
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-3xl font-bold text-white/10 group-hover:text-brand-accent/30 transition-colors">
                {step.num}
              </span>
              <step.icon className="w-5 h-5 text-brand-textDim group-hover:text-brand-accent transition-colors" />
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-wide">{step.title}</h3>

            {/* Description */}
            <p className="text-brand-textDim text-sm font-mono mb-4">{step.desc}</p>

            {/* Chip */}
            <div className="inline-flex items-center gap-1.5 px-2 py-1 bg-brand-accent/10 border border-brand-accent/20 text-brand-accent text-[10px] font-mono uppercase tracking-wider">
              <Check size={10} />
              {step.chip}
            </div>

            {/* Connector arrow (hidden on last item and mobile) */}
            {idx < 3 && (
              <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10">
                <ArrowRight className="w-4 h-4 text-brand-border" />
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  </Section>
);

// What We Deploy Section
const interfaceBullets = [
  'Mobile-first design',
  'Conversion landing pages',
  'SEO foundation',
  'Analytics setup',
  'Schema markup',
];

const engineBullets = [
  'Instant lead capture',
  'SMS/email notifications',
  'Auto-follow-up',
  'Auto-booking link',
  'Review requests',
];

const WhatWeDeploySection: React.FC = () => (
  <Section className="py-16 border-t border-brand-border">
    <div className="mb-12 border-l border-brand-border pl-6 relative">
      <div className="absolute top-0 left-0 w-[1px] h-1/2 bg-brand-accent"></div>
      <div className="flex items-center gap-3 mb-2">
        <span className="font-mono text-[10px] text-brand-accent uppercase tracking-[0.2em]">DELIVERABLES /////</span>
      </div>
      <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight uppercase">What We Deploy</h2>
    </div>

    <div className="grid md:grid-cols-2 gap-8">
      {/* The Interface Card */}
      <motion.div
        className="relative border border-brand-border bg-brand-panel overflow-hidden"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
      >
        {/* Corner markers */}
        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/20"></div>
        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/20"></div>
        <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/20"></div>
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/20"></div>

        <div className="p-8">
          <div className="flex items-center gap-2 mb-6">
            <span className="font-mono text-brand-accent text-sm">01.</span>
            <h3 className="text-2xl font-bold text-white uppercase">The Interface</h3>
          </div>

          <ul className="space-y-3 mb-8">
            {interfaceBullets.map((item, idx) => (
              <li key={idx} className="flex items-center gap-3 text-brand-textDim text-sm">
                <span className="text-brand-accent font-mono text-xs">[+]</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Footer */}
        <div className="border-t border-brand-border px-8 py-4 bg-black/30">
          <span className="font-mono text-[10px] text-brand-accent uppercase tracking-wider">
            Focus: Trust & Velocity
          </span>
        </div>
      </motion.div>

      {/* The Engine Card */}
      <motion.div
        className="relative border border-brand-accent/30 bg-brand-accent/[0.02] overflow-hidden"
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
      >
        {/* Corner markers */}
        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-brand-accent/40"></div>
        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-brand-accent/40"></div>
        <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-brand-accent/40"></div>
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-brand-accent/40"></div>

        <div className="p-8">
          <div className="flex items-center gap-2 mb-6">
            <span className="font-mono text-brand-accent text-sm">02.</span>
            <h3 className="text-2xl font-bold text-white uppercase">The Engine</h3>
          </div>

          <ul className="space-y-3 mb-8">
            {engineBullets.map((item, idx) => (
              <li key={idx} className="flex items-center gap-3 text-white text-sm">
                <span className="text-brand-accent font-mono text-xs">[+]</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Footer */}
        <div className="border-t border-brand-accent/20 px-8 py-4 bg-brand-accent/5">
          <span className="font-mono text-[10px] text-brand-accent uppercase tracking-wider">
            Latency target: Under 5 minutes
          </span>
        </div>
      </motion.div>
    </div>
  </Section>
);

// Deliverables Checklist
const deliverables = [
  'Speed pass',
  'CTA system',
  'Form friction reduction',
  'Trust signals',
  'Event tracking',
  'Routing rules',
];

const DeliverablesChecklist: React.FC = () => (
  <Section className="py-16 border-t border-brand-border">
    <div className="mb-8 flex items-center gap-3">
      <span className="font-mono text-[10px] text-brand-textDim uppercase tracking-[0.2em]">CHECKLIST /////</span>
      <div className="h-[1px] flex-1 bg-brand-border"></div>
    </div>

    <motion.div
      className="flex flex-wrap gap-3"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {deliverables.map((item, idx) => (
        <motion.div
          key={idx}
          variants={fadeInUp}
          className="inline-flex items-center gap-2 px-4 py-2 border border-brand-border bg-brand-panel hover:border-brand-accent/30 transition-colors group"
        >
          <Check size={12} className="text-brand-accent" />
          <span className="font-mono text-xs text-brand-textDim group-hover:text-white transition-colors uppercase tracking-wider">
            {item}
          </span>
        </motion.div>
      ))}
    </motion.div>
  </Section>
);

// CTA Section
const CTASection: React.FC = () => (
  <Section className="py-20 border-t border-brand-border">
    <motion.div
      className="text-center max-w-2xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="mb-8">
        <span className="font-mono text-[10px] text-brand-accent uppercase tracking-[0.2em]">INITIALIZE /////</span>
      </div>

      <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 uppercase">Ready to start?</h2>
      <p className="text-brand-textDim mb-10">
        Get a custom audit of your current site or book a discovery call.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
        <Button size="lg" onClick={() => window.open('https://calendly.com', '_blank')}>
          Book a 15-min Call
        </Button>
        <Button variant="secondary" size="lg" onClick={() => document.getElementById('audit-form')?.scrollIntoView({ behavior: 'smooth' })}>
          Run Free Audit
        </Button>
      </div>

      <p className="font-mono text-[10px] text-brand-textDim uppercase tracking-wider">
        // Free audit delivered in 24–48h. No spam.
      </p>
    </motion.div>
  </Section>
);

// Main Process Page Component
const ProcessPage: React.FC = () => {
  return (
    <>
      <PageHeader />
      <TimelinePanel />
      <WhatWeDeploySection />
      <DeliverablesChecklist />
      <CTASection />
    </>
  );
};

export default ProcessPage;
