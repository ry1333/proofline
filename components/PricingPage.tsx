import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, ArrowRight, CreditCard } from 'lucide-react';
import { Section, Button, Badge, staggerContainer, fadeInUp } from './ui/Shared';
import PricingTierCard from './pricing/PricingTierCard';
import ComparisonTable from './pricing/ComparisonTable';
import FAQAccordion from './pricing/FAQAccordion';
import {
  tiers,
  retainers,
  addOns,
  everyBuildIncludes,
  processSteps,
  paymentTerms,
  guarantee,
  heroStripItems,
  microTrustItems,
} from '../data/pricing';
import { trackBookCallClick, trackRunAuditClick, trackRetainerInterestClick } from '../utils/analytics';

// ============================================
// HERO SECTION
// ============================================
const PricingHero: React.FC = () => {
  const navigate = useNavigate();

  const handleBookClick = () => {
    trackBookCallClick('pricing_hero');
    navigate('/contact');
    setTimeout(() => document.getElementById('calendar')?.scrollIntoView({ behavior: 'smooth' }), 100);
  };

  const handleAuditClick = () => {
    trackRunAuditClick('pricing_hero');
    navigate('/contact');
    setTimeout(() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' }), 100);
  };

  return (
    <Section className="pt-32 pb-12">
      <motion.div
        className="border-l border-brand-border pl-6 relative mb-10"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="absolute top-0 left-0 w-[1px] h-1/2 bg-brand-accent"></div>
        <div className="flex items-center gap-3 mb-4">
          <Badge>PACKAGES</Badge>
          <div className="h-[1px] w-12 bg-brand-border"></div>
        </div>
        <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tight uppercase mb-4">Pricing</h1>
        <p className="text-brand-textDim text-lg max-w-2xl">
          Choose a deployment tier. Every build includes tracking + speed-to-lead fundamentals.
        </p>
      </motion.div>

      {/* CTAs */}
      <motion.div
        className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Button size="lg" onClick={handleBookClick}>
          Book a 15-min Call
        </Button>
        <Button size="lg" variant="secondary" onClick={handleAuditClick}>
          Run Free Audit
        </Button>
      </motion.div>

      <motion.p
        className="font-mono text-[10px] text-brand-textDim uppercase tracking-wider mb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        // Free audit delivered in 24–48h. No spam.
      </motion.p>

      {/* What's included strip */}
      <motion.div
        className="border border-brand-border bg-brand-panel p-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex items-center gap-2 mb-3">
          <span className="font-mono text-[9px] text-brand-accent uppercase tracking-wider">Every tier includes:</span>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          {heroStripItems.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2 text-sm text-brand-textDim">
              <Check size={12} className="text-brand-accent" />
              {item}
            </div>
          ))}
        </div>
      </motion.div>
    </Section>
  );
};

// ============================================
// TIER CARDS SECTION
// ============================================
const TierCardsSection: React.FC = () => (
  <Section className="py-12">
    <div className="mb-8 flex items-center gap-3">
      <span className="font-mono text-[10px] text-brand-textDim uppercase tracking-[0.2em]">DEPLOYMENT_TIERS /////</span>
      <div className="h-[1px] flex-1 bg-brand-border"></div>
    </div>

    <div className="grid md:grid-cols-3 gap-6">
      {tiers.map((tier, idx) => (
        <PricingTierCard key={tier.id} tier={tier} index={idx} />
      ))}
    </div>
  </Section>
);

// ============================================
// COMPARE TIERS SECTION
// ============================================
const CompareTiersSection: React.FC = () => (
  <Section className="py-12 border-t border-brand-border">
    <div className="mb-8 border-l border-brand-border pl-6 relative">
      <div className="absolute top-0 left-0 w-[1px] h-1/2 bg-brand-accent"></div>
      <div className="flex items-center gap-3 mb-2">
        <span className="font-mono text-[10px] text-brand-accent uppercase tracking-[0.2em]">MATRIX /////</span>
      </div>
      <h2 className="text-3xl font-bold text-white tracking-tight uppercase">Compare Tiers</h2>
    </div>

    <ComparisonTable />
  </Section>
);

// ============================================
// WHAT'S INCLUDED (EVERY BUILD) SECTION
// ============================================
const EveryBuildSection: React.FC = () => (
  <Section className="py-12 border-t border-brand-border">
    <div className="mb-8 border-l border-brand-border pl-6 relative">
      <div className="absolute top-0 left-0 w-[1px] h-1/2 bg-brand-accent"></div>
      <div className="flex items-center gap-3 mb-2">
        <span className="font-mono text-[10px] text-brand-accent uppercase tracking-[0.2em]">STANDARD /////</span>
      </div>
      <h2 className="text-3xl font-bold text-white tracking-tight uppercase">What's Included (Every Build)</h2>
    </div>

    <motion.div
      className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {everyBuildIncludes.map((item, idx) => (
        <motion.div
          key={idx}
          variants={fadeInUp}
          className="relative border border-brand-border bg-brand-panel p-5 hover:border-white/20 transition-colors"
        >
          {/* Corner markers */}
          <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/20"></div>
          <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/20"></div>
          <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/20"></div>
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/20"></div>

          <div className="flex items-center justify-between mb-3">
            <h3 className="text-white font-bold">{item.title}</h3>
            <span className="px-2 py-0.5 text-[9px] font-mono uppercase tracking-wider text-brand-accent border border-brand-accent/20 bg-brand-accent/5">
              {item.microLabel}
            </span>
          </div>
          <p className="text-brand-textDim text-sm">{item.description}</p>
        </motion.div>
      ))}
    </motion.div>
  </Section>
);

// ============================================
// RETAINERS SECTION
// ============================================
const RetainersSection: React.FC = () => {
  const handleRetainerClick = (retainerId: string) => {
    trackRetainerInterestClick(retainerId);
    document.getElementById('pricing-cta')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Section className="py-12 border-t border-brand-border">
      <div className="mb-8 border-l border-brand-border pl-6 relative">
        <div className="absolute top-0 left-0 w-[1px] h-1/2 bg-brand-accent"></div>
        <div className="flex items-center gap-3 mb-2">
          <span className="font-mono text-[10px] text-brand-accent uppercase tracking-[0.2em]">RECURRING /////</span>
        </div>
        <h2 className="text-3xl font-bold text-white tracking-tight uppercase">Care + Optimization</h2>
        <p className="text-brand-textDim mt-2 text-sm">Optional ongoing support after launch.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {retainers.map((retainer, idx) => (
          <motion.div
            key={retainer.id}
            className="relative border border-brand-border bg-brand-panel"
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

            {/* Header */}
            <div className="border-b border-brand-border px-6 py-4">
              <h3 className="text-xl font-bold text-white mb-1">{retainer.name}</h3>
              <div className="text-brand-accent font-bold">{retainer.priceText}</div>
            </div>

            {/* Content */}
            <div className="p-6">
              <p className="text-brand-textDim text-sm mb-4">{retainer.description}</p>

              <ul className="space-y-2 mb-6">
                {retainer.included.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-brand-textDim">
                    <Check size={14} className="text-brand-accent mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="p-3 border border-brand-border bg-black/30 mb-4">
                <span className="font-mono text-[10px] text-brand-textDim uppercase">Best for:</span>
                <p className="text-white text-sm mt-1">{retainer.bestFor}</p>
              </div>

              <Button
                variant="secondary"
                className="w-full"
                onClick={() => handleRetainerClick(retainer.id)}
              >
                {retainer.ctaText}
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
};

// ============================================
// ADD-ONS SECTION
// ============================================
const AddOnsSection: React.FC = () => (
  <Section className="py-12 border-t border-brand-border">
    <div className="mb-8 flex items-center gap-3">
      <span className="font-mono text-[10px] text-brand-textDim uppercase tracking-[0.2em]">ADD_ONS /////</span>
      <div className="h-[1px] flex-1 bg-brand-border"></div>
    </div>

    <motion.div
      className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {addOns.map((addon) => (
        <motion.div
          key={addon.id}
          variants={fadeInUp}
          className="p-4 border border-brand-border bg-brand-panel hover:border-white/20 transition-colors"
        >
          <div className="flex items-start justify-between gap-2 mb-2">
            <h4 className="text-white font-medium text-sm">{addon.name}</h4>
            <span className="font-mono text-[10px] text-brand-accent whitespace-nowrap">{addon.priceText}</span>
          </div>
          <p className="text-brand-textDim text-xs">{addon.description}</p>
        </motion.div>
      ))}
    </motion.div>
  </Section>
);

// ============================================
// PROCESS + PAYMENT SECTION
// ============================================
const ProcessPaymentSection: React.FC = () => (
  <Section className="py-12 border-t border-brand-border">
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Process */}
      <div>
        <div className="mb-6 flex items-center gap-3">
          <span className="font-mono text-[10px] text-brand-accent uppercase tracking-[0.2em]">PROCESS /////</span>
        </div>
        <h3 className="text-2xl font-bold text-white mb-6 uppercase">How It Works</h3>

        <div className="space-y-4">
          {processSteps.map((step, idx) => (
            <motion.div
              key={idx}
              className="flex gap-4"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex-shrink-0 w-8 h-8 border border-brand-border bg-brand-panel flex items-center justify-center font-mono text-[10px] text-brand-accent">
                {step.num}
              </div>
              <div>
                <h4 className="text-white font-bold mb-1">{step.title}</h4>
                <p className="text-brand-textDim text-sm">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Payment */}
      <div>
        <div className="mb-6 flex items-center gap-3">
          <span className="font-mono text-[10px] text-brand-accent uppercase tracking-[0.2em]">PAYMENTS /////</span>
        </div>
        <h3 className="text-2xl font-bold text-white mb-6 uppercase">Terms</h3>

        <motion.div
          className="border border-brand-border bg-brand-panel p-6"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-4">
            <CreditCard className="text-brand-accent" size={20} />
            <span className="text-white font-bold">Payment Structure</span>
          </div>

          <ul className="space-y-3 mb-6">
            <li className="flex items-center gap-2 text-brand-textDim text-sm">
              <Check size={14} className="text-brand-accent" />
              {paymentTerms.deposit}
            </li>
            <li className="flex items-center gap-2 text-brand-textDim text-sm">
              <Check size={14} className="text-brand-accent" />
              {paymentTerms.contract}
            </li>
            {paymentTerms.note && (
              <li className="text-brand-textDim text-xs font-mono mt-2">
                // {paymentTerms.note}
              </li>
            )}
          </ul>

          <div className="p-3 border border-brand-accent/20 bg-brand-accent/5">
            <p className="text-brand-accent text-sm font-medium">{guarantee.text}</p>
            <p className="text-brand-textDim text-xs mt-1">{guarantee.subtext}</p>
          </div>
        </motion.div>
      </div>
    </div>
  </Section>
);

// ============================================
// FAQ SECTION
// ============================================
const FAQSection: React.FC = () => (
  <Section className="py-12 border-t border-brand-border">
    <div className="mb-8 border-l border-brand-border pl-6 relative">
      <div className="absolute top-0 left-0 w-[1px] h-1/2 bg-brand-accent"></div>
      <div className="flex items-center gap-3 mb-2">
        <span className="font-mono text-[10px] text-brand-accent uppercase tracking-[0.2em]">SUPPORT /////</span>
      </div>
      <h2 className="text-3xl font-bold text-white tracking-tight uppercase">FAQ</h2>
    </div>

    <div className="max-w-3xl">
      <FAQAccordion />
    </div>
  </Section>
);

// ============================================
// FINAL CTA SECTION
// ============================================
const FinalCTASection: React.FC = () => {
  const navigate = useNavigate();

  const handleBookClick = () => {
    trackBookCallClick('pricing_footer');
    navigate('/contact');
    setTimeout(() => document.getElementById('calendar')?.scrollIntoView({ behavior: 'smooth' }), 100);
  };

  const handleAuditClick = () => {
    trackRunAuditClick('pricing_footer');
    navigate('/contact');
    setTimeout(() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' }), 100);
  };

  return (
    <Section id="pricing-cta" className="py-20 border-t border-brand-border">
      <motion.div
        className="relative border border-brand-accent/30 bg-brand-accent/[0.02] p-8 md:p-12 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        {/* Corner markers */}
        <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-brand-accent"></div>
        <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-brand-accent"></div>
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-brand-accent"></div>
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-brand-accent"></div>

        <div className="mb-6">
          <span className="font-mono text-[10px] text-brand-accent uppercase tracking-[0.2em]">INITIALIZE /////</span>
        </div>

        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 uppercase">
          Ready to deploy your lead system?
        </h2>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
          <Button size="lg" onClick={handleBookClick}>
            Book a 15-min Call
          </Button>
          <Button size="lg" variant="secondary" onClick={handleAuditClick}>
            Run Free Audit
          </Button>
        </div>

        <p className="font-mono text-[10px] text-brand-textDim uppercase tracking-wider mb-8">
          // Free audit delivered in 24–48h. No spam.
        </p>

        {/* Micro trust row */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {microTrustItems.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2 text-sm text-brand-textDim">
              <Check size={12} className="text-brand-accent" />
              {item}
            </div>
          ))}
        </div>
      </motion.div>
    </Section>
  );
};

// ============================================
// MAIN PRICING PAGE
// ============================================
const PricingPage: React.FC = () => {
  return (
    <>
      <PricingHero />
      <TierCardsSection />
      <CompareTiersSection />
      <EveryBuildSection />
      <RetainersSection />
      <AddOnsSection />
      <ProcessPaymentSection />
      <FAQSection />
      <FinalCTASection />
    </>
  );
};

export default PricingPage;
