import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Section, SectionHeader, Button } from './ui/Shared';
import { Terminal, Check, ArrowRight } from 'lucide-react';
import { trackRunAuditClick } from '../utils/analytics';

const AuditForm: React.FC = () => {
  const navigate = useNavigate();

  const handleGetAudit = () => {
    trackRunAuditClick('homepage_audit_section');
    navigate('/contact');
    setTimeout(() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' }), 100);
  };

  const handleBookCall = () => {
    trackRunAuditClick('homepage_audit_section');
    navigate('/contact');
    setTimeout(() => document.getElementById('calendar')?.scrollIntoView({ behavior: 'smooth' }), 100);
  };

  return (
    <Section id="audit-form" className="py-20 border-t border-brand-border">
      <div className="max-w-4xl mx-auto">
        <SectionHeader
          title="Initialize"
          label="START"
          subtitle="Get a free audit of your current site with actionable recommendations."
        />

        <div className="grid md:grid-cols-2 gap-0 border border-brand-border bg-brand-panel">

          {/* Left: What You Get */}
          <div className="p-8 md:p-12 border-b md:border-b-0 md:border-r border-brand-border bg-dot-matrix bg-[length:20px_20px]">
            <div className="flex items-center gap-2 mb-6 text-brand-accent">
              <Terminal size={20} />
              <span className="font-mono text-sm uppercase tracking-wider">Free Audit Includes</span>
            </div>

            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Check size={16} className="text-brand-accent mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-white text-sm font-bold">Page Speed Analysis</div>
                  <div className="text-gray-500 text-xs">Core Web Vitals + load time review</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Check size={16} className="text-brand-accent mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-white text-sm font-bold">Mobile Experience Check</div>
                  <div className="text-gray-500 text-xs">Responsiveness + touch targets</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Check size={16} className="text-brand-accent mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-white text-sm font-bold">CTA & Trust Signal Review</div>
                  <div className="text-gray-500 text-xs">Conversion blockers identified</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Check size={16} className="text-brand-accent mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-white text-sm font-bold">Top 3 Priority Fixes</div>
                  <div className="text-gray-500 text-xs">Actionable next steps</div>
                </div>
              </li>
            </ul>

            <div className="mt-6 pt-6 border-t border-white/10">
              <div className="font-mono text-[10px] text-gray-500 uppercase tracking-wider">
                Delivered in 24–48 hours • No spam
              </div>
            </div>
          </div>

          {/* Right: CTA */}
          <div className="p-8 md:p-12 flex flex-col justify-center">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-3">
                Ready to see what's possible?
              </h3>
              <p className="text-gray-400 mb-8">
                Get your free audit or book a quick call to discuss your project.
              </p>

              <div className="space-y-3">
                <Button onClick={handleGetAudit} className="w-full">
                  Get Free Audit
                  <ArrowRight size={16} className="ml-2" />
                </Button>

                <Button variant="secondary" onClick={handleBookCall} className="w-full">
                  Book a 15-min Call
                </Button>
              </div>

              <div className="text-center font-mono text-[9px] text-gray-600 mt-6 uppercase">
                // No commitment required
              </div>
            </div>
          </div>

        </div>
      </div>
    </Section>
  );
};

export default AuditForm;
