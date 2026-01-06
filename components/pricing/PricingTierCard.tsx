import React from 'react';
import { motion } from 'framer-motion';
import { Check, Clock } from 'lucide-react';
import { PricingTier } from '../../data/pricing';
import { Button } from '../ui/Shared';
import { trackPricingTierClick, trackBookCallClick } from '../../utils/analytics';

interface PricingTierCardProps {
  tier: PricingTier;
  index?: number;
}

const PricingTierCard: React.FC<PricingTierCardProps> = ({ tier, index = 0 }) => {
  const isHighlighted = !!tier.label;

  const handleCTAClick = () => {
    trackPricingTierClick(tier.id);
    trackBookCallClick('pricing_tier');
    document.getElementById('pricing-cta')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.div
      className={`relative flex flex-col h-full border ${
        isHighlighted
          ? 'border-brand-accent/40 bg-brand-accent/[0.02]'
          : 'border-brand-border bg-brand-panel'
      }`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      {/* Corner markers */}
      <div className={`absolute top-0 left-0 w-2 h-2 border-t border-l ${isHighlighted ? 'border-brand-accent/60' : 'border-white/20'}`}></div>
      <div className={`absolute top-0 right-0 w-2 h-2 border-t border-r ${isHighlighted ? 'border-brand-accent/60' : 'border-white/20'}`}></div>
      <div className={`absolute bottom-0 left-0 w-2 h-2 border-b border-l ${isHighlighted ? 'border-brand-accent/60' : 'border-white/20'}`}></div>
      <div className={`absolute bottom-0 right-0 w-2 h-2 border-b border-r ${isHighlighted ? 'border-brand-accent/60' : 'border-white/20'}`}></div>

      {/* Label badge */}
      {tier.label && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="px-3 py-1 bg-brand-accent text-brand-dark text-[10px] font-mono uppercase tracking-wider font-bold">
            {tier.label}
          </span>
        </div>
      )}

      {/* Header */}
      <div className={`border-b ${isHighlighted ? 'border-brand-accent/20 bg-brand-accent/5' : 'border-brand-border'} px-6 py-4`}>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-2xl font-bold text-white">{tier.name}</h3>
          <div className="flex items-center gap-1 text-brand-textDim">
            <Clock size={12} />
            <span className="font-mono text-[10px] uppercase">{tier.timelineText}</span>
          </div>
        </div>
        <div className="text-xl font-bold text-brand-accent">{tier.priceText}</div>
      </div>

      {/* Content */}
      <div className="flex-1 p-6">
        {/* Description */}
        <p className="text-brand-textDim text-sm mb-4">{tier.description}</p>

        {/* Best for */}
        <div className="mb-6 p-3 border border-brand-border bg-black/30">
          <span className="font-mono text-[10px] text-brand-textDim uppercase tracking-wider">Best for:</span>
          <p className="text-white text-sm mt-1">{tier.bestFor}</p>
        </div>

        {/* Included list */}
        <div className="mb-6">
          <span className="font-mono text-[10px] text-brand-accent uppercase tracking-wider mb-3 block">Included:</span>
          <ul className="space-y-2">
            {tier.included.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-brand-textDim">
                <Check size={14} className="text-brand-accent mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Outcomes */}
        {tier.outcomes && tier.outcomes.length > 0 && (
          <div className="mb-6">
            <span className="font-mono text-[10px] text-brand-textDim uppercase tracking-wider mb-2 block">Expected outcomes:</span>
            <ul className="space-y-1">
              {tier.outcomes.map((outcome, idx) => (
                <li key={idx} className="text-xs text-brand-textDim font-mono">
                  → {outcome}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className={`border-t ${isHighlighted ? 'border-brand-accent/20' : 'border-brand-border'} p-6`}>
        {/* Measured by */}
        <div className="mb-4">
          <span className="font-mono text-[9px] text-brand-textDim uppercase tracking-wider">
            Measured by: {tier.measuredBy.join(', ')}
          </span>
        </div>

        <Button
          variant={isHighlighted ? 'primary' : 'secondary'}
          className="w-full"
          onClick={handleCTAClick}
        >
          {tier.ctaText}
        </Button>
      </div>
    </motion.div>
  );
};

export default PricingTierCard;
