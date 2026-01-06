import React from 'react';
import { Section, SectionHeader, Card, staggerContainer, fadeInUp, Badge } from './ui/Shared';
import { ExternalLink, TrendingUp, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

export const TrustBar: React.FC = () => {
  const companies = ["Apex Roofing", "City Dental", "Law Partners", "Metro HVAC", "Urban Fitness"];

  return (
    <div className="w-full border-b border-brand-border bg-black py-8">
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-3">
            <span className="text-[10px] font-mono text-gray-600 uppercase tracking-widest">/// Trusted by 50+ businesses</span>
        </div>
        <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
            {companies.map((company, i) => (
                <span key={i} className="text-sm font-bold text-gray-400 font-mono tracking-tighter uppercase">{company}</span>
            ))}
        </div>
      </div>
    </div>
  );
};

export const Deployments: React.FC = () => {
    const studies = [
        {
            industry: "Home Services",
            title: "Bailey Wildfire Solutions",
            result: "+210% Leads",
            desc: "Lead-gen site + tracking + form routing.",
            id: "CS-01"
        },
        {
            industry: "Legal Services",
            title: "Harding Family Law",
            result: "2m Response",
            desc: "Automated intake system & calendar booking.",
            id: "CS-02"
        },
        {
            industry: "Healthcare",
            title: "Smile Bright Dental",
            result: "+45 Bookings",
            desc: "Rebuilt funnel & patient recall SMS loops.",
            id: "CS-03"
        }
    ];

    return (
        <Section className="py-20" id="results">
            <SectionHeader title="Deployments" label="CASE_LOGS" />

            <motion.div 
              className="grid md:grid-cols-3 gap-6"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
                {studies.map((study, idx) => (
                    <motion.div key={idx} variants={fadeInUp}>
                        <div className="group cursor-pointer h-full flex flex-col border border-brand-border bg-brand-panel hover:border-white/20 transition-all duration-300 relative">
                            {/* Technical Header */}
                            <div className="flex justify-between items-center p-4 border-b border-white/5 bg-white/[0.02]">
                                <span className="font-mono text-[10px] text-gray-500">{study.id}</span>
                                <Badge color="neutral">{study.industry}</Badge>
                            </div>
                            
                            {/* Abstract Visual Area */}
                            <div className="h-32 w-full bg-dot-matrix bg-[length:4px_4px] opacity-30 border-b border-white/5 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-16 h-full bg-gradient-to-l from-brand-accent/5 to-transparent"></div>
                            </div>
                            
                            <div className="p-6 flex flex-col flex-grow">
                                <h3 className="text-lg font-bold text-white mb-2 uppercase tracking-tight">{study.title}</h3>
                                <p className="text-brand-textDim text-xs font-mono mb-6 leading-relaxed">{study.desc}</p>
                                
                                <div className="mt-auto pt-4 border-t border-white/5">
                                    <div className="flex justify-between items-end">
                                      <div className="flex flex-col">
                                         <span className="text-[9px] text-gray-600 uppercase font-mono mb-1">Example Outcome</span>
                                         <span className="text-brand-accent font-bold font-mono">{study.result}</span>
                                      </div>
                                      <ArrowUpRight size={16} className="text-gray-600 group-hover:text-white transition-colors" />
                                    </div>
                                </div>
                            </div>

                            {/* Corner Decors */}
                            <div className="absolute bottom-0 left-0 w-2 h-2 border-l border-b border-white/30"></div>
                            <div className="absolute top-0 right-0 w-2 h-2 border-r border-t border-white/30"></div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </Section>
    );
};