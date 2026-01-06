import React from 'react';
import { Section, SectionHeader, Card, fadeInUp, staggerContainer } from './ui/Shared';
import { Check, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export const Overview: React.FC = () => {
  return (
    <Section id="overview">
      <SectionHeader title="Overview" subtitle="Traditional web design is broken. It focuses on aesthetics over outcomes. We engineer systems." />
      
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        {/* Problem Panel */}
        <motion.div 
          className="relative p-8 border border-brand-border bg-brand-panel/50"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <div className="absolute top-0 left-0 bg-white/10 text-white text-[10px] font-mono uppercase px-2 py-1">/// Problem</div>
          <h3 className="text-2xl font-bold text-white mb-6 mt-4">The Leaky Bucket</h3>
          <ul className="space-y-4">
            <li className="flex items-start gap-3 text-brand-textDim text-sm">
              <span className="text-red-500 font-mono">[-]</span> Slow, bloated generic templates.
            </li>
            <li className="flex items-start gap-3 text-brand-textDim text-sm">
              <span className="text-red-500 font-mono">[-]</span> No immediate lead follow-up.
            </li>
            <li className="flex items-start gap-3 text-brand-textDim text-sm">
              <span className="text-red-500 font-mono">[-]</span> Zero data visibility or tracking.
            </li>
          </ul>
        </motion.div>

        {/* Solution Panel */}
        <motion.div 
          className="relative p-8 border border-brand-accent/30 bg-brand-accent/[0.02]"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <div className="absolute top-0 left-0 bg-brand-accent text-brand-dark text-[10px] font-mono uppercase px-2 py-1">/// Solution</div>
          <h3 className="text-2xl font-bold text-white mb-6 mt-4">The Conversion Engine</h3>
           <ul className="space-y-4">
            <li className="flex items-start gap-3 text-white text-sm">
              <span className="text-brand-accent font-mono">[+]</span> Sub-second load times & SEO.
            </li>
            <li className="flex items-start gap-3 text-white text-sm">
              <span className="text-brand-accent font-mono">[+]</span> SMS/Email auto-response in &lt;60s.
            </li>
            <li className="flex items-start gap-3 text-white text-sm">
              <span className="text-brand-accent font-mono">[+]</span> Real-time dashboard analytics.
            </li>
          </ul>
          
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-brand-accent"></div>
        </motion.div>
      </div>
    </Section>
  );
};

export const Process: React.FC = () => {
  const steps = [
    { title: "Diagnose", desc: "Audit current leaks. Establish baseline metrics." },
    { title: "Build", desc: "High-speed dev. Mobile-first. Conversion-focused." },
    { title: "Instrument", desc: "Setup tracking. Configure automation loops." },
    { title: "Iterate", desc: "A/B testing. Continuous optimization." },
  ];

  return (
    <Section id="work" className="border-t border-brand-border">
      <SectionHeader title="Process" label="PROTOCOL" />

      <div className="grid gap-0 border-l border-brand-border ml-2 md:ml-0">
        {steps.map((step, idx) => (
          <motion.div 
            key={idx}
            className="group relative pl-8 pb-16 last:pb-0"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            viewport={{ once: true }}
          >
            {/* Number Rail */}
            <div className="absolute -left-[9px] top-0 w-[18px] h-[18px] bg-brand-dark border border-brand-border flex items-center justify-center text-[9px] font-mono text-brand-textDim group-hover:border-brand-accent group-hover:text-brand-accent transition-colors">
              0{idx + 1}
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-8 group-last:border-none">
              <div>
                <h4 className="text-2xl font-bold text-white mb-2">{step.title}</h4>
                <p className="text-brand-textDim text-sm max-w-md font-mono">{step.desc}</p>
              </div>
              <ArrowRight className="text-brand-border group-hover:text-brand-accent transition-colors opacity-0 group-hover:opacity-100" />
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
};