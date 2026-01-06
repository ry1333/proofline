import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Clock } from 'lucide-react';
import { Article, formatDate } from '../../content/evidence';
import { trackEvent } from '../../utils/analytics';

interface EvidenceArticleCardProps {
  article: Article;
  index?: number;
  featured?: boolean;
}

const EvidenceArticleCard: React.FC<EvidenceArticleCardProps> = ({
  article,
  index = 0,
  featured = false,
}) => {
  const handleClick = () => {
    trackEvent('evidence_article_open', { slug: article.slug });
  };

  return (
    <motion.article
      className={`group relative border ${
        featured
          ? 'border-brand-accent/30 bg-brand-accent/[0.02]'
          : 'border-brand-border bg-brand-panel'
      } hover:border-white/20 transition-all duration-300`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      {/* Corner markers */}
      <div className={`absolute top-0 left-0 w-2 h-2 border-t border-l ${featured ? 'border-brand-accent/50' : 'border-white/20'} group-hover:border-brand-accent/50 transition-colors`}></div>
      <div className={`absolute top-0 right-0 w-2 h-2 border-t border-r ${featured ? 'border-brand-accent/50' : 'border-white/20'} group-hover:border-brand-accent/50 transition-colors`}></div>
      <div className={`absolute bottom-0 left-0 w-2 h-2 border-b border-l ${featured ? 'border-brand-accent/50' : 'border-white/20'} group-hover:border-brand-accent/50 transition-colors`}></div>
      <div className={`absolute bottom-0 right-0 w-2 h-2 border-b border-r ${featured ? 'border-brand-accent/50' : 'border-white/20'} group-hover:border-brand-accent/50 transition-colors`}></div>

      <div className="p-6">
        {/* Meta row: tags + reading time */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex flex-wrap gap-2">
            {article.tags.slice(0, 3).map((tag, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider text-brand-accent border border-brand-accent/20 bg-brand-accent/5"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-1 text-brand-textDim">
            <Clock size={12} />
            <span className="font-mono text-[10px]">{article.readingTime} min</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-brand-accent transition-colors">
          <Link to={`/evidence/${article.slug}`} onClick={handleClick} className="hover:underline">
            {article.title}
          </Link>
        </h3>

        {/* Description */}
        <p className="text-brand-textDim text-sm mb-4 line-clamp-2">
          {article.description}
        </p>

        {/* Footer: date + read link */}
        <div className="flex items-center justify-between pt-4 border-t border-brand-border/50">
          <span className="font-mono text-[10px] text-brand-textDim">
            {formatDate(article.date)}
          </span>
          <Link
            to={`/evidence/${article.slug}`}
            onClick={handleClick}
            className="inline-flex items-center gap-1 text-sm font-mono uppercase tracking-wider text-brand-textDim hover:text-brand-accent transition-colors group/link"
          >
            Read
            <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
};

export default EvidenceArticleCard;
