import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { CaseStudy } from '../data/caseStudies';

interface DeploymentCardProps {
  study: CaseStudy;
  index?: number;
}

const DeploymentCard: React.FC<DeploymentCardProps> = ({ study, index = 0 }) => {
  const handleClick = () => {
    // Fire analytics event if available
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'case_study_open', { slug: study.slug });
    }
  };

  return (
    <motion.div
      className="group relative border border-brand-border bg-brand-panel hover:border-white/20 transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      {/* Corner markers */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/20 group-hover:border-brand-accent/50 transition-colors"></div>
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/20 group-hover:border-brand-accent/50 transition-colors"></div>
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/20 group-hover:border-brand-accent/50 transition-colors"></div>
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/20 group-hover:border-brand-accent/50 transition-colors"></div>

      <div className="p-6">
        {/* Category tag */}
        <div className="mb-4">
          <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-mono tracking-wider uppercase text-brand-accent border border-brand-accent/20 bg-brand-accent/5">
            {study.category}
          </span>
        </div>

        {/* Project name */}
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-brand-accent transition-colors">
          {study.name}
        </h3>

        {/* One-liner */}
        <p className="text-brand-textDim text-sm mb-4 line-clamp-2">
          {study.oneLiner}
        </p>

        {/* Deliverable tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {study.deliverables.slice(0, 4).map((tag, idx) => (
            <span
              key={idx}
              className="px-2 py-1 text-[10px] font-mono uppercase tracking-wider text-brand-textDim border border-brand-border bg-black/30"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* View link */}
        <Link
          to={`/results/${study.slug}`}
          onClick={handleClick}
          className="inline-flex items-center gap-2 text-sm font-mono uppercase tracking-wider text-brand-textDim hover:text-brand-accent transition-colors group/link"
        >
          View deployment
          <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
        </Link>
      </div>
    </motion.div>
  );
};

export default DeploymentCard;
