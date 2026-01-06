import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { faqs } from '../../data/pricing';

const FAQAccordion: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleKeyDown = (event: React.KeyboardEvent, index: number) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleItem(index);
    }
  };

  return (
    <div className="space-y-2">
      {faqs.map((faq, idx) => {
        const isOpen = openIndex === idx;
        const headerId = `faq-header-${idx}`;
        const panelId = `faq-panel-${idx}`;

        return (
          <div
            key={idx}
            className="border border-brand-border bg-brand-panel overflow-hidden"
          >
            <button
              id={headerId}
              aria-expanded={isOpen}
              aria-controls={panelId}
              className="w-full flex items-center justify-between p-5 text-left hover:bg-white/5 transition-colors group focus:outline-none focus:ring-1 focus:ring-brand-accent/50"
              onClick={() => toggleItem(idx)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
            >
              <span className="font-medium text-gray-300 group-hover:text-white transition-colors pr-4">
                {faq.question}
              </span>
              <ChevronDown
                size={18}
                className={`text-gray-500 transition-transform duration-300 flex-shrink-0 ${
                  isOpen ? 'rotate-180 text-brand-accent' : ''
                }`}
              />
            </button>

            <AnimatePresence>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={headerId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="p-5 pt-0 text-gray-400 text-sm leading-relaxed border-t border-brand-border bg-black/20">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};

export default FAQAccordion;
