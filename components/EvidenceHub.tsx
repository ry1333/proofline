import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Section, Button, Badge, staggerContainer, fadeInUp } from './ui/Shared';
import EvidenceArticleCard from './evidence/EvidenceArticleCard';
import TagChips from './evidence/TagChips';
import SearchInput from './evidence/SearchInput';
import {
  articles,
  getFeaturedArticles,
  getUsedTags,
  filterArticles,
  EvidenceTag,
  principles,
} from '../content/evidence';
import { trackBookCallClick, trackRunAuditClick } from '../utils/analytics';

// ============================================
// PAGE HEADER
// ============================================
const PageHeader: React.FC = () => {
  const handleBookClick = () => {
    trackBookCallClick('pricing_hero');
    window.open('https://calendly.com', '_blank');
  };

  const handleAuditClick = () => {
    trackRunAuditClick('pricing_hero');
    window.location.href = '/#audit-form';
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
          <Badge>THE LAB</Badge>
          <div className="h-[1px] w-12 bg-brand-border"></div>
        </div>
        <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tight uppercase mb-4">
          Evidence
        </h1>
        <p className="text-brand-textDim text-lg max-w-2xl">
          Research-informed UX principles — validated through measurement.
        </p>
      </motion.div>

      {/* CTAs */}
      <motion.div
        className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4"
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
        className="font-mono text-[10px] text-brand-textDim uppercase tracking-wider"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        // Free audit delivered in 24–48h. No spam.
      </motion.p>
    </Section>
  );
};

// ============================================
// FEATURED ARTICLES SECTION
// ============================================
const FeaturedSection: React.FC = () => {
  const featured = getFeaturedArticles();

  if (featured.length === 0) return null;

  return (
    <Section className="py-8">
      <div className="mb-6 flex items-center gap-3">
        <span className="font-mono text-[10px] text-brand-accent uppercase tracking-[0.2em]">
          FEATURED /////
        </span>
        <div className="h-[1px] flex-1 bg-brand-border"></div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featured.slice(0, 3).map((article, idx) => (
          <EvidenceArticleCard key={article.slug} article={article} index={idx} featured />
        ))}
      </div>
    </Section>
  );
};

// ============================================
// ARTICLES LIBRARY SECTION
// ============================================
const LibrarySection: React.FC = () => {
  const [selectedTag, setSelectedTag] = useState<EvidenceTag | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const tags = getUsedTags();

  const filteredArticles = useMemo(() => {
    return filterArticles(selectedTag, searchQuery);
  }, [selectedTag, searchQuery]);

  return (
    <Section className="py-12 border-t border-brand-border">
      <div className="mb-8 border-l border-brand-border pl-6 relative">
        <div className="absolute top-0 left-0 w-[1px] h-1/2 bg-brand-accent"></div>
        <div className="flex items-center gap-3 mb-2">
          <span className="font-mono text-[10px] text-brand-accent uppercase tracking-[0.2em]">
            LIBRARY /////
          </span>
        </div>
        <h2 className="text-3xl font-bold text-white tracking-tight uppercase">All Articles</h2>
      </div>

      {/* Filters */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
          <TagChips tags={tags} selectedTag={selectedTag} onTagSelect={setSelectedTag} />
          <div className="w-full lg:w-64">
            <SearchInput
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search articles..."
            />
          </div>
        </div>
      </div>

      {/* Articles Grid */}
      {filteredArticles.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article, idx) => (
            <EvidenceArticleCard key={article.slug} article={article} index={idx} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 border border-brand-border bg-brand-panel">
          <p className="text-brand-textDim">No articles found matching your criteria.</p>
          <button
            onClick={() => {
              setSelectedTag(null);
              setSearchQuery('');
            }}
            className="mt-4 text-brand-accent hover:underline font-mono text-sm"
          >
            Clear filters
          </button>
        </div>
      )}
    </Section>
  );
};

// ============================================
// PRINCIPLES STRIP
// ============================================
const PrinciplesStrip: React.FC = () => (
  <Section className="py-8 border-t border-brand-border">
    <div className="mb-4 flex items-center gap-3">
      <span className="font-mono text-[10px] text-brand-textDim uppercase tracking-[0.2em]">
        PRINCIPLES WE USE /////
      </span>
      <div className="h-[1px] flex-1 bg-brand-border"></div>
    </div>

    <motion.div
      className="flex flex-wrap gap-2"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {principles.map((principle, idx) => (
        <motion.span
          key={idx}
          variants={fadeInUp}
          className="px-3 py-1.5 text-xs font-mono uppercase tracking-wider text-brand-textDim border border-brand-border bg-brand-panel"
        >
          {principle}
        </motion.span>
      ))}
    </motion.div>
  </Section>
);

// ============================================
// DISCLAIMER
// ============================================
const Disclaimer: React.FC = () => (
  <div className="text-center py-4">
    <p className="font-mono text-[9px] text-brand-textDim/60 uppercase tracking-wider">
      // Principles are research-informed; outcomes depend on offer, traffic, and execution. We
      instrument and test.
    </p>
  </div>
);

// ============================================
// CTA SECTION
// ============================================
const CTASection: React.FC = () => {
  const handleBookClick = () => {
    trackBookCallClick('pricing_footer');
    window.open('https://calendly.com', '_blank');
  };

  const handleAuditClick = () => {
    trackRunAuditClick('pricing_footer');
    window.location.href = '/#audit-form';
  };

  return (
    <Section className="py-20 border-t border-brand-border">
      <motion.div
        className="text-center max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="mb-8">
          <span className="font-mono text-[10px] text-brand-accent uppercase tracking-[0.2em]">
            INITIALIZE /////
          </span>
        </div>

        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 uppercase">
          Put these principles to work
        </h2>
        <p className="text-brand-textDim mb-10">
          Get a custom audit of your current site or book a discovery call.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
          <Button size="lg" onClick={handleBookClick}>
            Book a 15-min Call
          </Button>
          <Button size="lg" variant="secondary" onClick={handleAuditClick}>
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
// MAIN EVIDENCE HUB PAGE
// ============================================
const EvidenceHub: React.FC = () => {
  return (
    <>
      <PageHeader />
      <FeaturedSection />
      <LibrarySection />
      <PrinciplesStrip />
      <Disclaimer />
      <CTASection />
    </>
  );
};

export default EvidenceHub;
