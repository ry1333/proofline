import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock } from 'lucide-react';
import { Section, Button } from './ui/Shared';
import ArticleRenderer, { KeyTakeaways } from './evidence/ArticleRenderer';
import SourcesList from './evidence/SourcesList';
import { getArticleBySlug, formatDate } from '../content/evidence';
import { trackEvent, trackBookCallClick, trackRunAuditClick } from '../utils/analytics';

// ============================================
// ARTICLE HEADER - FUI Style with readability
// ============================================
interface ArticleHeaderProps {
  title: string;
  description: string;
  tags: string[];
  date: string;
  readingTime: number;
  sourceCount?: number;
}

const ArticleHeader: React.FC<ArticleHeaderProps> = ({
  title,
  description,
  tags,
  date,
  readingTime,
  sourceCount = 0,
}) => (
  <Section className="pt-32 pb-8">
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
      {/* Back link */}
      <Link
        to="/evidence"
        className="inline-flex items-center gap-2 text-gray-500 hover:text-brand-accent transition-colors mb-8 group"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        <span className="font-mono text-[11px] uppercase tracking-wider">Back to Evidence</span>
      </Link>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-6">
        {tags.map((tag, idx) => (
          <span
            key={idx}
            className="px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider text-brand-accent border border-brand-accent/30 bg-brand-accent/5 rounded"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Title */}
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight tracking-tight">
        {title}
      </h1>

      {/* Description */}
      <p className="text-lg md:text-xl text-gray-400 leading-relaxed mb-6 max-w-2xl">
        {description}
      </p>

      {/* Meta row */}
      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
        <span className="font-mono text-[11px]">{formatDate(date)}</span>
        <span className="text-gray-700">•</span>
        <div className="flex items-center gap-1">
          <Clock size={14} />
          <span className="font-mono text-[11px]">{readingTime} min read</span>
        </div>
        {sourceCount > 0 && (
          <>
            <span className="text-gray-700">•</span>
            <span className="font-mono text-[11px]">{sourceCount} source{sourceCount !== 1 ? 's' : ''}</span>
          </>
        )}
      </div>
    </motion.div>
  </Section>
);

// ============================================
// DISCLAIMER - FUI Style
// ============================================
const ArticleDisclaimer: React.FC = () => (
  <div className="mt-8 pt-4 border-t border-white/5">
    <p className="font-mono text-[9px] text-gray-600 uppercase tracking-wider">
      // Principles are research-informed. Outcomes depend on offer, traffic, and execution.
    </p>
  </div>
);

// ============================================
// CTA SECTION - FUI Style
// ============================================
const ArticleCTA: React.FC = () => {
  const handleBookClick = () => {
    trackBookCallClick('evidence_article_footer');
    window.open('https://calendly.com', '_blank');
  };

  const handleAuditClick = () => {
    trackRunAuditClick('evidence_article_footer');
    window.location.href = '/#audit-form';
  };

  return (
    <Section className="py-16 border-t border-white/5">
      <motion.div
        className="relative border border-brand-accent/30 bg-brand-accent/[0.02] p-8 md:p-10 text-center max-w-3xl mx-auto rounded-lg"
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
            // APPLY THIS RESEARCH
          </span>
        </div>

        <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
          Want us to apply these principles to your site?
        </h3>

        <p className="text-gray-400 mb-8 max-w-xl mx-auto">
          Get a custom audit or book a discovery call to discuss your project.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4">
          <Button size="lg" onClick={handleBookClick}>Book a 15-min Call</Button>
          <Button size="lg" variant="secondary" onClick={handleAuditClick}>
            Run Free Audit
          </Button>
        </div>

        <p className="font-mono text-[10px] text-gray-600 uppercase tracking-wider">
          Free audit delivered in 24–48h. No spam.
        </p>
      </motion.div>
    </Section>
  );
};

// ============================================
// MAIN ARTICLE PAGE
// ============================================
const EvidenceArticle: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const article = slug ? getArticleBySlug(slug) : undefined;

  useEffect(() => {
    if (slug) {
      trackEvent('evidence_article_open', { slug });
    }
    // Scroll to top on mount
    window.scrollTo(0, 0);
  }, [slug]);

  if (!article) {
    return (
      <Section className="pt-32 pb-20 text-center">
        <h1 className="text-3xl font-bold text-white mb-4">Article not found</h1>
        <p className="text-gray-400 mb-8">
          The article you're looking for doesn't exist or has been moved.
        </p>
        <Button onClick={() => navigate('/evidence')}>Back to Evidence</Button>
      </Section>
    );
  }

  return (
    <>
      <ArticleHeader
        title={article.title}
        description={article.description}
        tags={article.tags}
        date={article.date}
        readingTime={article.readingTime}
        sourceCount={article.sourceIds?.length || 0}
      />

      <Section className="py-8">
        {/* Article content container - readable width */}
        <div className="max-w-[760px]" style={{ lineHeight: '1.7' }}>
          {/* Key Takeaways */}
          {article.keyTakeaways && article.keyTakeaways.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <KeyTakeaways items={article.keyTakeaways} />
            </motion.div>
          )}

          {/* Article Body */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <ArticleRenderer sections={article.sections} />
          </motion.div>

          {/* Sources Panel */}
          {article.sourceIds && article.sourceIds.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              id="sources"
            >
              <SourcesList sourceIds={article.sourceIds} />
            </motion.div>
          )}

          {/* Disclaimer */}
          <ArticleDisclaimer />
        </div>
      </Section>

      <ArticleCTA />
    </>
  );
};

export default EvidenceArticle;
