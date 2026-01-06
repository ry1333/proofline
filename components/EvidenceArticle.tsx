import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, BookOpen } from 'lucide-react';
import { Section, Button, Badge } from './ui/Shared';
import ArticleRenderer, { KeyTakeaways } from './evidence/ArticleRenderer';
import { getArticleBySlug, formatDate } from '../content/evidence';
import { trackEvent, trackBookCallClick, trackRunAuditClick } from '../utils/analytics';

// ============================================
// ARTICLE HEADER
// ============================================
interface ArticleHeaderProps {
  title: string;
  description: string;
  tags: string[];
  date: string;
  readingTime: number;
}

const ArticleHeader: React.FC<ArticleHeaderProps> = ({
  title,
  description,
  tags,
  date,
  readingTime,
}) => (
  <Section className="pt-32 pb-8">
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      {/* Back link */}
      <Link
        to="/evidence"
        className="inline-flex items-center gap-2 text-brand-textDim hover:text-white transition-colors mb-8 group"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        <span className="font-mono text-sm uppercase tracking-wider">Back to Evidence</span>
      </Link>

      {/* Meta row */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        {tags.map((tag, idx) => (
          <span
            key={idx}
            className="px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider text-brand-accent border border-brand-accent/20 bg-brand-accent/5"
          >
            {tag}
          </span>
        ))}
        <span className="text-brand-textDim/50">•</span>
        <span className="font-mono text-[11px] text-brand-textDim">{formatDate(date)}</span>
        <span className="text-brand-textDim/50">•</span>
        <div className="flex items-center gap-1 text-brand-textDim">
          <Clock size={12} />
          <span className="font-mono text-[11px]">{readingTime} min read</span>
        </div>
      </div>

      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-6">{title}</h1>

      {/* Description */}
      <p className="text-xl text-brand-textDim max-w-3xl leading-relaxed">{description}</p>
    </motion.div>
  </Section>
);

// ============================================
// FURTHER READING
// ============================================
const FurtherReading: React.FC<{ items: string[] }> = ({ items }) => (
  <div className="mt-12 pt-8 border-t border-brand-border">
    <div className="flex items-center gap-2 mb-4">
      <BookOpen size={16} className="text-brand-accent" />
      <span className="font-mono text-[10px] text-brand-accent uppercase tracking-wider">
        Further Reading
      </span>
    </div>
    <ul className="space-y-2">
      {items.map((item, idx) => (
        <li key={idx} className="text-brand-textDim text-sm">
          → {item}
        </li>
      ))}
    </ul>
  </div>
);

// ============================================
// DISCLAIMER
// ============================================
const ArticleDisclaimer: React.FC = () => (
  <div className="mt-8 pt-4 border-t border-brand-border/50">
    <p className="font-mono text-[9px] text-brand-textDim/60 uppercase tracking-wider">
      // Principles are research-informed; outcomes depend on offer, traffic, and execution. We
      instrument and test.
    </p>
  </div>
);

// ============================================
// CTA SECTION
// ============================================
const ArticleCTA: React.FC = () => {
  const handleBookClick = () => {
    trackBookCallClick('pricing_footer');
    window.open('https://calendly.com', '_blank');
  };

  const handleAuditClick = () => {
    trackRunAuditClick('pricing_footer');
    window.location.href = '/#audit-form';
  };

  return (
    <Section className="py-16 border-t border-brand-border">
      <motion.div
        className="relative border border-brand-accent/30 bg-brand-accent/[0.02] p-8 md:p-10 text-center max-w-3xl mx-auto"
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
            APPLY THIS /////
          </span>
        </div>

        <h3 className="text-2xl font-bold text-white mb-4">
          Want us to apply these principles to your site?
        </h3>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4">
          <Button onClick={handleBookClick}>Book a 15-min Call</Button>
          <Button variant="secondary" onClick={handleAuditClick}>
            Run Free Audit
          </Button>
        </div>

        <p className="font-mono text-[10px] text-brand-textDim uppercase tracking-wider">
          // Free audit delivered in 24–48h. No spam.
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
        <p className="text-brand-textDim mb-8">
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
      />

      <Section className="py-8">
        <div className="max-w-[800px]">
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

          {/* Further Reading */}
          {article.furtherReading && article.furtherReading.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <FurtherReading items={article.furtherReading} />
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
