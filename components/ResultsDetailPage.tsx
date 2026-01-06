import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Check, Clock, Code, Target, Truck, BarChart3, Layers } from 'lucide-react';
import { Section, Button, Badge } from './ui/Shared';
import { getCaseStudyBySlug } from '../data/caseStudies';

// PageHeader for Detail Page
const DetailPageHeader: React.FC<{ category: string; name: string; year: number }> = ({ category, name, year }) => (
  <Section className="pt-32 pb-8">
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Back link */}
      <Link
        to="/results"
        className="inline-flex items-center gap-2 text-brand-textDim hover:text-white transition-colors mb-8 group"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        <span className="font-mono text-sm uppercase tracking-wider">Back to Results</span>
      </Link>

      <div className="border-l border-brand-border pl-6 relative">
        <div className="absolute top-0 left-0 w-[1px] h-1/2 bg-brand-accent"></div>
        <div className="flex items-center gap-3 mb-4">
          <Badge>{category}</Badge>
          <div className="h-[1px] w-8 bg-brand-border"></div>
          <span className="font-mono text-[10px] text-brand-textDim">{year}</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">{name}</h1>
      </div>
    </motion.div>
  </Section>
);

// Section Card Component
const SectionCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  accentBorder?: boolean;
}> = ({ icon, title, children, accentBorder = false }) => (
  <motion.div
    className={`relative border ${accentBorder ? 'border-brand-accent/30 bg-brand-accent/[0.02]' : 'border-brand-border bg-brand-panel'}`}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
  >
    {/* Corner markers */}
    <div className={`absolute top-0 left-0 w-2 h-2 border-t border-l ${accentBorder ? 'border-brand-accent/40' : 'border-white/20'}`}></div>
    <div className={`absolute top-0 right-0 w-2 h-2 border-t border-r ${accentBorder ? 'border-brand-accent/40' : 'border-white/20'}`}></div>
    <div className={`absolute bottom-0 left-0 w-2 h-2 border-b border-l ${accentBorder ? 'border-brand-accent/40' : 'border-white/20'}`}></div>
    <div className={`absolute bottom-0 right-0 w-2 h-2 border-b border-r ${accentBorder ? 'border-brand-accent/40' : 'border-white/20'}`}></div>

    {/* Header */}
    <div className={`border-b ${accentBorder ? 'border-brand-accent/20 bg-brand-accent/5' : 'border-brand-border'} px-6 py-3 flex items-center gap-3`}>
      <span className="text-brand-accent">{icon}</span>
      <span className="font-mono text-[10px] text-brand-accent uppercase tracking-[0.2em]">{title}</span>
    </div>

    <div className="p-6">{children}</div>
  </motion.div>
);

// CTA Section for Detail Page
const DetailCTASection: React.FC = () => {
  const handleBookClick = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'book_call_click', { page: 'results_detail' });
    }
    window.open('https://calendly.com', '_blank');
  };

  const handleAuditClick = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'run_audit_click', { page: 'results_detail' });
    }
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
          <span className="font-mono text-[10px] text-brand-accent uppercase tracking-[0.2em]">INITIALIZE /////</span>
        </div>

        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 uppercase">Ready for similar results?</h2>
        <p className="text-brand-textDim mb-10">
          Let's discuss how we can apply these strategies to your business.
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

// Main Detail Page Component
const ResultsDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const study = slug ? getCaseStudyBySlug(slug) : undefined;

  useEffect(() => {
    if (slug && typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'case_study_open', { slug });
    }
  }, [slug]);

  if (!study) {
    return (
      <Section className="pt-32 pb-20 text-center">
        <h1 className="text-3xl font-bold text-white mb-4">Case study not found</h1>
        <p className="text-brand-textDim mb-8">The deployment you're looking for doesn't exist.</p>
        <Button onClick={() => navigate('/results')}>Back to Results</Button>
      </Section>
    );
  }

  return (
    <>
      <DetailPageHeader category={study.category} name={study.name} year={study.year} />

      <Section className="py-8">
        {/* One-liner */}
        <motion.p
          className="text-xl text-brand-textDim max-w-3xl mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {study.oneLiner}
        </motion.p>

        {/* Deliverables tags */}
        <motion.div
          className="flex flex-wrap gap-2 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {study.deliverables.map((tag, idx) => (
            <span
              key={idx}
              className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider text-white border border-brand-border bg-black/50"
            >
              {tag}
            </span>
          ))}
        </motion.div>

        {/* Main content grid */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Objective */}
          {study.objective && (
            <SectionCard icon={<Target size={16} />} title="OBJECTIVE">
              <p className="text-brand-textDim leading-relaxed">{study.objective}</p>
            </SectionCard>
          )}

          {/* Timeline */}
          {study.timeline && (
            <SectionCard icon={<Clock size={16} />} title="TIMELINE">
              <p className="text-2xl font-bold text-white">{study.timeline}</p>
              <p className="text-brand-textDim text-sm mt-1">from kickoff to launch</p>
            </SectionCard>
          )}
        </div>

        {/* What we shipped */}
        {study.whatWeShipped && study.whatWeShipped.length > 0 && (
          <div className="mb-8">
            <SectionCard icon={<Truck size={16} />} title="WHAT WE SHIPPED">
              <ul className="space-y-3">
                {study.whatWeShipped.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-brand-textDim">
                    <span className="text-brand-accent font-mono text-xs mt-0.5">[+]</span>
                    {item}
                  </li>
                ))}
              </ul>
            </SectionCard>
          </div>
        )}

        {/* Two column: Instrumentation + Stack */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Instrumentation */}
          {study.instrumentation && study.instrumentation.length > 0 && (
            <SectionCard icon={<BarChart3 size={16} />} title="INSTRUMENTATION">
              <p className="text-brand-textDim text-sm mb-4">Events tracked:</p>
              <div className="flex flex-wrap gap-2">
                {study.instrumentation.map((event, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 text-[10px] font-mono text-brand-accent border border-brand-accent/20 bg-brand-accent/5"
                  >
                    {event}
                  </span>
                ))}
              </div>
            </SectionCard>
          )}

          {/* Stack */}
          {study.stack && study.stack.length > 0 && (
            <SectionCard icon={<Layers size={16} />} title="STACK">
              <div className="flex flex-wrap gap-2">
                {study.stack.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 text-xs font-mono text-white border border-brand-border bg-black/30"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </SectionCard>
          )}
        </div>

        {/* Outcome */}
        {(study.outcome || study.metrics.length > 0) && (
          <SectionCard icon={<Code size={16} />} title="OUTCOME" accentBorder>
            {study.outcome && (
              <p className="text-white leading-relaxed mb-6">{study.outcome}</p>
            )}

            {study.metrics.length > 0 && (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {study.metrics.map((metric, idx) => (
                  <div
                    key={idx}
                    className="p-4 border border-brand-border bg-black/30 text-center"
                  >
                    <div className="text-2xl font-bold text-white mb-1">{metric.value}</div>
                    <div className="text-brand-textDim text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2">
                      {metric.label}
                      {metric.isExample && (
                        <span className="px-1 py-0.5 text-[8px] text-yellow-500 border border-yellow-500/30 bg-yellow-500/10">
                          Example
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </SectionCard>
        )}
      </Section>

      <DetailCTASection />
    </>
  );
};

export default ResultsDetailPage;
