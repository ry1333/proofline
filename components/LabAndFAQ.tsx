import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Section } from './ui/Shared';
import { Beaker, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const LabTeaser: React.FC = () => {
  const principles = [
    { name: "Cognitive Load", desc: "Minimize choices to increase action." },
    { name: "Hick's Law", desc: "Time to decide increases with options." },
    { name: "Fitts's Law", desc: "Make important buttons big & close." },
    { name: "Social Proof", desc: "Trust is borrowed from others." },
    { name: "Message Match", desc: "Ad copy must match landing page." },
  ];

  return (
    <Section id="lab" className="py-16 border-t border-white/5">
      <div className="flex items-center gap-3 mb-8">
        <Beaker className="text-brand-accent" size={20} />
        <h3 className="text-xl font-bold text-white">The Evidence</h3>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {principles.map((p, i) => (
          <div key={i} className="p-4 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-all cursor-default group">
            <div className="text-gray-300 text-xs font-bold mb-2 uppercase tracking-wide group-hover:text-brand-accent transition-colors">{p.name}</div>
            <div className="text-[11px] text-gray-500 leading-relaxed">{p.desc}</div>
          </div>
        ))}
      </div>
    </Section>
  );
};

export const FAQ: React.FC = () => {
  const faqs = [
    { q: "How long does a build take?", a: "Typically 2-4 weeks from kickoff to launch. We move fast because we use proven frameworks." },
    { q: "Do I own the website?", a: "Yes. 100%. We don't hold your site hostage. Once paid, it's your asset." },
    { q: "Can I make edits myself?", a: "Absolutely. We build on user-friendly CMS platforms (like Webflow or WordPress) and provide a training video." },
    { q: "What results do you track?", a: "We track form submissions, click-to-calls, and booked appointments. Vanity metrics like 'hits' don't pay the bills." },
    { q: "Do you write the copy?", a: "We provide conversion-focused copy templates. We can write custom copy for an additional fee." },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <Section className="max-w-3xl mx-auto py-16">
      <h2 className="text-3xl font-bold text-center mb-12">FAQ</h2>
      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <div key={idx} className="border border-white/5 rounded-lg overflow-hidden bg-brand-panel">
            <button 
              className="w-full flex items-center justify-between p-5 text-left hover:bg-white/5 transition-colors group"
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
            >
              <span className="font-medium text-gray-300 group-hover:text-white transition-colors">{faq.q}</span>
              <ChevronDown 
                size={18}
                className={`text-gray-500 transition-transform duration-300 ${openIndex === idx ? 'rotate-180 text-brand-accent' : ''}`} 
              />
            </button>
            <AnimatePresence>
              {openIndex === idx && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="p-5 pt-0 text-gray-500 text-sm leading-relaxed border-t border-white/5 bg-black/20">
                    {faq.a}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </Section>
  );
};

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/5 bg-black py-12 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
        <div>
          <div className="text-xl font-bold text-white mb-2 tracking-tight">ProofLine</div>
          <p className="text-gray-600 text-[10px] uppercase tracking-widest">© {new Date().getFullYear()} ProofLine Studio.</p>
        </div>
        
        <div className="flex gap-8 text-[10px] font-bold tracking-widest uppercase text-gray-500">
          <Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link>
          <Link to="/terms" className="hover:text-white transition-colors">Terms</Link>
          <Link to="/evidence" className="hover:text-white transition-colors">Evidence</Link>
        </div>
      </div>
    </footer>
  );
};