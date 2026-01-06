import React from 'react';
import { Section, SectionHeader, Button } from './ui/Shared';
import { Terminal } from 'lucide-react';

const AuditForm: React.FC = () => {
  return (
    <Section id="audit-form" className="py-20 border-t border-brand-border">
      <div className="max-w-4xl mx-auto">
        <SectionHeader title="Initialize" label="START" subtitle="Request your free audit. We ghost-shop your business to test response time." />

        <div className="grid md:grid-cols-2 gap-0 border border-brand-border bg-brand-panel">
          
          {/* Left: Info */}
          <div className="p-8 md:p-12 border-b md:border-b-0 md:border-r border-brand-border bg-dot-matrix bg-[length:20px_20px]">
            <div className="flex items-center gap-2 mb-6 text-brand-accent">
              <Terminal size={20} />
              <span className="font-mono text-sm uppercase tracking-wider">Audit_Parameters</span>
            </div>
            
            <ul className="space-y-6">
              <li className="group">
                <div className="text-[10px] font-mono text-gray-500 uppercase mb-1 group-hover:text-brand-accent transition-colors">01 // Scope</div>
                <div className="text-white text-sm font-bold">UX/UI Analysis</div>
              </li>
              <li className="group">
                <div className="text-[10px] font-mono text-gray-500 uppercase mb-1 group-hover:text-brand-accent transition-colors">02 // Metric</div>
                <div className="text-white text-sm font-bold">Speed-to-Lead Test</div>
              </li>
              <li className="group">
                <div className="text-[10px] font-mono text-gray-500 uppercase mb-1 group-hover:text-brand-accent transition-colors">03 // Output</div>
                <div className="text-white text-sm font-bold">Conversion Roadmap</div>
              </li>
            </ul>
          </div>

          {/* Right: Form */}
          <div className="p-8 md:p-12">
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-1">
                <label className="block text-[10px] font-mono text-gray-500 uppercase tracking-wider">Name_ID</label>
                <input type="text" className="w-full bg-black border border-white/10 p-3 text-white text-sm font-mono focus:outline-none focus:border-brand-accent transition-colors" placeholder="John Doe" />
              </div>
              
              <div className="space-y-1">
                <label className="block text-[10px] font-mono text-gray-500 uppercase tracking-wider">Target_URL</label>
                <input type="url" className="w-full bg-black border border-white/10 p-3 text-white text-sm font-mono focus:outline-none focus:border-brand-accent transition-colors" placeholder="example.com" />
              </div>

              <div className="space-y-1">
                <label className="block text-[10px] font-mono text-gray-500 uppercase tracking-wider">Comm_Link</label>
                <input type="email" className="w-full bg-black border border-white/10 p-3 text-white text-sm font-mono focus:outline-none focus:border-brand-accent transition-colors" placeholder="john@company.com" />
              </div>

              <Button type="submit" className="w-full mt-4">
                Execute Request
              </Button>
              
              <div className="text-center font-mono text-[9px] text-gray-600 mt-4 uppercase">
                // Turnaround: 24-48h
              </div>
            </form>
          </div>

        </div>
      </div>
    </Section>
  );
};

export default AuditForm;