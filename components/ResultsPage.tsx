import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { Section, Button, Badge } from './ui/Shared';
import DeploymentCard from './DeploymentCard';
import { getFeaturedCaseStudy, getGridCaseStudies } from '../data/caseStudies';

// PageHeader Component
const PageHeader: React.FC = () => (
  <Section className="pt-32 pb-16">
    <motion.div
      className="border-l border-brand-border pl-6 relative"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="absolute top-0 left-0 w-[1px] h-1/2 bg-brand-accent"></div>
      <div className="flex items-center gap-3 mb-4">
        <Badge>DEPLOYMENTS</Badge>
        <div className="h-[1px] w-12 bg-brand-border"></div>
      </div>
      <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tight uppercase mb-4">Results</h1>
      <p className="text-brand-textDim text-lg max-w-2xl font-mono">
        Real businesses. Measured improvements.
      </p>
    </motion.div>
  </Section>
);

// Featured Deployment Component
const FeaturedDeployment: React.FC = () => {
  const featured = getFeaturedCaseStudy();

  if (!featured) return null;

  const handleClick = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'case_study_open', { slug: featured.slug });
    }
  };

  return (
    <Section className="py-8">
      <div className="mb-6 flex items-center gap-3">
        <span className="font-mono text-[10px] text-brand-textDim uppercase tracking-[0.2em]">FEATURED /////</span>
        <div className="h-[1px] flex-1 bg-brand-border"></div>
      </div>

      <motion.div
        className="relative border border-brand-accent/30 bg-brand-accent/[0.02] overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Corner markers */}
        <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-brand-accent"></div>
        <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-brand-accent"></div>
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-brand-accent"></div>
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-brand-accent"></div>

        {/* Header bar */}
        <div className="border-b border-brand-accent/20 px-6 py-3 flex items-center gap-2 bg-brand-accent/5">
          <span className="font-mono text-[10px] text-brand-accent uppercase tracking-[0.2em]">CASE_STUDY</span>
          <div className="h-[1px] flex-1 bg-brand-accent/20"></div>
          <span className="font-mono text-[10px] text-brand-textDim">{featured.year}</span>
        </div>

        <div className="p-8 md:p-10">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left column */}
            <div>
              {/* Category tag */}
              <div className="mb-4">
                <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-mono tracking-wider uppercase text-brand-accent border border-brand-accent/30 bg-brand-accent/10">
                  {featured.category}
                </span>
              </div>

              {/* Name */}
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{featured.name}</h2>

              {/* One-liner */}
              <p className="text-brand-textDim mb-6">{featured.oneLiner}</p>

              {/* Deliverables */}
              <div className="flex flex-wrap gap-2 mb-8">
                {featured.deliverables.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider text-white border border-brand-border bg-black/50"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <Link
                to={`/results/${featured.slug}`}
                onClick={handleClick}
                className="inline-flex items-center gap-2 text-sm font-mono uppercase tracking-wider text-brand-accent hover:text-white transition-colors group"
              >
                View full case study
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Right column - Metrics */}
            <div className="flex flex-col justify-center">
              <div className="space-y-4">
                {featured.metrics.map((metric, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-4 border border-brand-border bg-black/30"
                  >
                    <div className="flex items-center gap-3">
                      <Check size={14} className="text-brand-accent" />
                      <span className="text-brand-textDim text-sm font-mono uppercase">{metric.label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-white font-bold text-lg">{metric.value}</span>
                      {metric.isExample && (
                        <span className="px-1.5 py-0.5 text-[8px] font-mono uppercase tracking-wider text-yellow-500 border border-yellow-500/30 bg-yellow-500/10">
                          Example
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </Section>
  );
};

// Deployments Grid
const DeploymentsGrid: React.FC = () => {
  const studies = getGridCaseStudies();

  return (
    <Section className="py-16 border-t border-brand-border">
      <div className="mb-8 flex items-center gap-3">
        <span className="font-mono text-[10px] text-brand-textDim uppercase tracking-[0.2em]">ALL DEPLOYMENTS /////</span>
        <div className="h-[1px] flex-1 bg-brand-border"></div>
        <span className="font-mono text-[10px] text-brand-textDim">{studies.length} PROJECTS</span>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {studies.map((study, idx) => (
          <DeploymentCard key={study.slug} study={study} index={idx} />
        ))}
      </div>
    </Section>
  );
};

// CTA Section
const CTASection: React.FC = () => {
  const handleBookClick = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'book_call_click', { page: 'results' });
    }
    window.open('https://calendly.com', '_blank');
  };

  const handleAuditClick = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'run_audit_click', { page: 'results' });
    }
    document.getElementById('audit-form')?.scrollIntoView({ behavior: 'smooth' });
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
          <span className="font-mono text-[10px] text-brand-accent uppercase tracking-[0.2em]">INITIALIZE /////</span>
        </div>

        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 uppercase">Your turn</h2>
        <p className="text-brand-textDim mb-10">
          See how we can improve your conversion metrics.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
          <Button size="lg" onClick={handleBookClick}>
            Book a 15-min Call
          </Button>
          <Button variant="secondary" size="lg" onClick={handleAuditClick}>
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

// Main Results Page
const ResultsPage: React.FC = () => {
  return (
    <>
      <PageHeader />
      <FeaturedDeployment />
      <DeploymentsGrid />
      <CTASection />
    </>
  );
};

export default ResultsPage;
