import React from 'react';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { comparisonFeatures } from '../../data/pricing';

const ComparisonTable: React.FC = () => {
  const renderValue = (value: boolean | string) => {
    if (typeof value === 'boolean') {
      return value ? (
        <Check size={16} className="text-brand-accent mx-auto" />
      ) : (
        <X size={16} className="text-brand-textDim/30 mx-auto" />
      );
    }
    return <span className="text-white text-sm">{value}</span>;
  };

  return (
    <motion.div
      className="relative border border-brand-border bg-brand-panel overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      {/* Corner markers */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/20"></div>
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/20"></div>
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/20"></div>
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/20"></div>

      {/* Header bar */}
      <div className="border-b border-brand-border px-4 py-3 flex items-center gap-2">
        <span className="font-mono text-[10px] text-brand-accent uppercase tracking-[0.2em]">COMPARE_TIERS</span>
        <div className="h-[1px] flex-1 bg-brand-border"></div>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-brand-border">
              <th className="text-left p-4 text-brand-textDim font-mono text-xs uppercase tracking-wider">Feature</th>
              <th className="p-4 text-center text-white font-bold">Launch</th>
              <th className="p-4 text-center text-brand-accent font-bold bg-brand-accent/5">Pro</th>
              <th className="p-4 text-center text-white font-bold">Growth</th>
            </tr>
          </thead>
          <tbody>
            {comparisonFeatures.map((feature, idx) => (
              <tr
                key={idx}
                className={`border-b border-brand-border/50 ${idx % 2 === 0 ? 'bg-black/20' : ''}`}
              >
                <td className="p-4 text-brand-textDim text-sm">{feature.name}</td>
                <td className="p-4 text-center">{renderValue(feature.launch)}</td>
                <td className="p-4 text-center bg-brand-accent/5">{renderValue(feature.pro)}</td>
                <td className="p-4 text-center">{renderValue(feature.growth)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden">
        {comparisonFeatures.map((feature, idx) => (
          <div
            key={idx}
            className={`p-4 border-b border-brand-border/50 ${idx % 2 === 0 ? 'bg-black/20' : ''}`}
          >
            <div className="text-brand-textDim text-sm font-medium mb-3">{feature.name}</div>
            <div className="grid grid-cols-3 gap-2">
              <div className="text-center">
                <div className="font-mono text-[9px] text-brand-textDim uppercase mb-1">Launch</div>
                <div>{renderValue(feature.launch)}</div>
              </div>
              <div className="text-center bg-brand-accent/5 py-1 -mx-1 px-1">
                <div className="font-mono text-[9px] text-brand-accent uppercase mb-1">Pro</div>
                <div>{renderValue(feature.pro)}</div>
              </div>
              <div className="text-center">
                <div className="font-mono text-[9px] text-brand-textDim uppercase mb-1">Growth</div>
                <div>{renderValue(feature.growth)}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default ComparisonTable;
