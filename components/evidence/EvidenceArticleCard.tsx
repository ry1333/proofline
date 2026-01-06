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
      className={`group bg-brand-panel border border-brand-border rounded-lg overflow-hidden hover:border-white/20 transition-all duration-300 ${
        featured ? 'ring-1 ring-brand-accent/20' : ''
      }`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      viewport={{ once: true }}
    >
      <div className="p-6">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {article.tags.slice(0, 3).map((tag, idx) => (
            <span
              key={idx}
              className="px-2 py-1 text-[11px] font-medium uppercase tracking-wide text-brand-accent bg-brand-accent/10 rounded"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-brand-accent transition-colors leading-tight">
          <Link to={`/evidence/${article.slug}`} onClick={handleClick}>
            {article.title}
          </Link>
        </h3>

        {/* Description */}
        <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-2">
          {article.description}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-white/5">
          <div className="flex items-center gap-3 text-gray-500 text-sm">
            <span>{formatDate(article.date)}</span>
            <span>•</span>
            <div className="flex items-center gap-1">
              <Clock size={14} />
              <span>{article.readingTime} min</span>
            </div>
          </div>
          <Link
            to={`/evidence/${article.slug}`}
            onClick={handleClick}
            className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-brand-accent transition-colors"
          >
            Read
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
};

export default EvidenceArticleCard;
