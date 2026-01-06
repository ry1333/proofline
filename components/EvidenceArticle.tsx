import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, BookOpen } from 'lucide-react';
import { Section, Button, Badge } from './ui/Shared';
import ArticleRenderer, { KeyTakeaways } from './evidence/ArticleRenderer';
import { getArticleBySlug, formatDate } from '../content/evidence';
import { trackEvent, trackBookCallClick, trackRunAuditClick } from '../utils/analytics';

// ============================================
// ARTICLE HEADER - Clean, readable
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
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
      {/* Back link */}
      <Link
        to="/evidence"
        className="inline-flex items-center gap-2 text-gray-400 hover:text-brand-accent transition-colors mb-8 group"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm">Back to The Lab</span>
      </Link>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-6">
        {tags.map((tag, idx) => (
          <span
            key={idx}
            className="px-2 py-1 text-[11px] font-medium uppercase tracking-wide text-brand-accent bg-brand-accent/10 rounded"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">{title}</h1>

      {/* Description */}
      <p className="text-xl text-gray-400 leading-relaxed mb-6">{description}</p>

      {/* Meta row */}
      <div className="flex items-center gap-4 text-sm text-gray-500">
        <span>{formatDate(date)}</span>
        <span>•</span>
        <div className="flex items-center gap-1">
          <Clock size={14} />
          <span>{readingTime} min read</span>
        </div>
      </div>
    </motion.div>
  </Section>
);

// ============================================
// FURTHER READING - Clean style
// ============================================
const FurtherReading: React.FC<{ items: string[] }> = ({ items }) => (
  <div className="mt-12 pt-8 border-t border-white/10">
    <div className="flex items-center gap-2 mb-4">
      <BookOpen size={16} className="text-brand-accent" />
      <span className="font-semibold text-white text-sm">Further Reading</span>
    </div>
    <ul className="space-y-2">
      {items.map((item, idx) => (
        <li key={idx} className="flex items-start gap-2 text-gray-400 text-[15px]">
          <span className="text-brand-accent">→</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

// ============================================
// DISCLAIMER - Subtle
// ============================================
const ArticleDisclaimer: React.FC = () => (
  <div className="mt-8 pt-4 border-t border-white/5">
    <p className="text-xs text-gray-600">
      Principles are research-informed. Outcomes depend on offer, traffic, and execution. We instrument and test.
    </p>
  </div>
);

// ============================================
// CTA SECTION - Simple and clean
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
    <Section className="py-20 border-t border-white/5">
      <motion.div
        className="text-center max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h3 className="text-3xl font-bold text-white mb-4">
          Want us to apply these principles to your site?
        </h3>
        <p className="text-gray-400 mb-8">
          Get a custom audit or book a discovery call to discuss your project.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
          <Button size="lg" onClick={handleBookClick}>Book a 15-min Call</Button>
          <Button size="lg" variant="secondary" onClick={handleAuditClick}>
            Run Free Audit
          </Button>
        </div>

        <p className="text-sm text-gray-500">
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
        <Button onClick={() => navigate('/evidence')}>Back to The Lab</Button>
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
