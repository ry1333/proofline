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
// PAGE HEADER - FUI Style
// ============================================
const PageHeader: React.FC = () => (
  <Section className="pt-32 pb-8">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl"
    >
      <p className="font-mono text-[10px] text-brand-accent uppercase tracking-[0.2em] mb-3">
        // THE LAB
      </p>
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
        Evidence
      </h1>
      <p className="text-xl text-gray-400 leading-relaxed">
        Research-informed UX principles—validated through measurement.
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
      <div className="flex items-center gap-3 mb-6">
        <div className="w-1.5 h-1.5 bg-brand-accent rounded-full"></div>
        <h2 className="font-mono text-[10px] text-brand-accent uppercase tracking-wider">
          Featured Research
        </h2>
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
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-1.5 bg-brand-accent rounded-full"></div>
          <h2 className="font-mono text-[10px] text-brand-accent uppercase tracking-wider">
            All Articles
          </h2>
        </div>
        <span className="font-mono text-[10px] text-gray-600">
          {filteredArticles.length} article{filteredArticles.length !== 1 ? 's' : ''}
        </span>
      </div>

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
        <div className="relative text-center py-16 bg-white/[0.02] border border-white/10 rounded-lg">
          {/* Corner accents */}
          <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/20"></div>
          <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/20"></div>
          <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/20"></div>
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/20"></div>

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
// CTA SECTION - FUI Style
// ============================================
const CTASection: React.FC = () => {
  const handleBookClick = () => {
    trackBookCallClick('evidence_hub');
    window.open('https://calendly.com', '_blank');
  };

  const handleAuditClick = () => {
    trackRunAuditClick('evidence_hub');
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
            // APPLY THESE PRINCIPLES
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
// DISCLAIMER
// ============================================
const Disclaimer: React.FC = () => (
  <div className="text-center py-4 border-t border-white/5">
    <p className="font-mono text-[9px] text-gray-600 uppercase tracking-wider">
      // Principles are research-informed. Outcomes depend on offer, traffic, and execution.
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
