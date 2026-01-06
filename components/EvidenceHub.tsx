import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Section, Button } from './ui/Shared';
import EvidenceArticleCard from './evidence/EvidenceArticleCard';
import TagChips from './evidence/TagChips';
import SearchInput from './evidence/SearchInput';
import {
  articles,
  getFeaturedArticles,
  getUsedTags,
  filterArticles,
  EvidenceTag,
} from '../content/evidence';
import { trackBookCallClick, trackRunAuditClick } from '../utils/analytics';

// ============================================
// PAGE HEADER - Clean, simple
// ============================================
const PageHeader: React.FC = () => (
  <Section className="pt-32 pb-8">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl"
    >
      <p className="text-brand-accent font-medium mb-3">The Lab</p>
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
        Evidence-Based UX
      </h1>
      <p className="text-xl text-gray-400 leading-relaxed">
        Research-informed principles for building websites that convert.
        We test and measure everything.
      </p>
    </motion.div>
  </Section>
);

// ============================================
// FEATURED ARTICLES
// ============================================
const FeaturedSection: React.FC = () => {
  const featured = getFeaturedArticles();

  if (featured.length === 0) return null;

  return (
    <Section className="py-8">
      <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-6">
        Featured Articles
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featured.slice(0, 3).map((article, idx) => (
          <EvidenceArticleCard key={article.slug} article={article} index={idx} featured />
        ))}
      </div>
    </Section>
  );
};

// ============================================
// ARTICLES LIBRARY
// ============================================
const LibrarySection: React.FC = () => {
  const [selectedTag, setSelectedTag] = useState<EvidenceTag | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const tags = getUsedTags();

  const filteredArticles = useMemo(() => {
    return filterArticles(selectedTag, searchQuery);
  }, [selectedTag, searchQuery]);

  return (
    <Section className="py-12 border-t border-white/5">
      <h2 className="text-2xl font-bold text-white mb-8">All Articles</h2>

      {/* Filters */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
          <TagChips tags={tags} selectedTag={selectedTag} onTagSelect={setSelectedTag} />
          <div className="w-full lg:w-72">
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
        <div className="text-center py-16 bg-white/[0.02] rounded-lg border border-white/5">
          <p className="text-gray-400 mb-4">No articles found matching your criteria.</p>
          <button
            onClick={() => {
              setSelectedTag(null);
              setSearchQuery('');
            }}
            className="text-brand-accent hover:underline text-sm"
          >
            Clear filters
          </button>
        </div>
      )}
    </Section>
  );
};

// ============================================
// CTA SECTION - Simple and clean
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
    <Section className="py-20 border-t border-white/5">
      <motion.div
        className="text-center max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold text-white mb-4">
          Want us to apply these principles to your site?
        </h2>
        <p className="text-gray-400 mb-8">
          Get a custom audit or book a discovery call to discuss your project.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
          <Button size="lg" onClick={handleBookClick}>
            Book a 15-min Call
          </Button>
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
// DISCLAIMER - Subtle
// ============================================
const Disclaimer: React.FC = () => (
  <div className="text-center py-4 border-t border-white/5">
    <p className="text-xs text-gray-600">
      Principles are research-informed. Outcomes depend on offer, traffic, and execution. We instrument and test.
    </p>
  </div>
);

// ============================================
// MAIN PAGE
// ============================================
const EvidenceHub: React.FC = () => {
  return (
    <>
      <PageHeader />
      <FeaturedSection />
      <LibrarySection />
      <CTASection />
      <Disclaimer />
    </>
  );
};

export default EvidenceHub;
