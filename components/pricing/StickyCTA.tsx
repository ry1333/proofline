import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/Shared';
import { trackBookCallClick, trackRunAuditClick } from '../../utils/analytics';

interface StickyCTAProps {
  showAfterPx?: number;
}

const StickyCTA: React.FC<StickyCTAProps> = ({ showAfterPx = 600 }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > showAfterPx);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showAfterPx]);

  const handleBookClick = () => {
    trackBookCallClick('pricing_sticky');
    window.open('https://calendly.com', '_blank');
  };

  const handleAuditClick = () => {
    trackRunAuditClick('pricing_sticky');
    window.location.href = '/#audit-form';
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-0 left-0 right-0 z-40 border-t border-brand-border bg-brand-dark/95 backdrop-blur-md"
        >
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
            {/* Left side - minimal text (hidden on mobile) */}
            <div className="hidden sm:block">
              <span className="font-mono text-[10px] text-brand-textDim uppercase tracking-wider">
                Ready to start?
              </span>
            </div>

            {/* Right side - buttons */}
            <div className="flex items-center gap-3 w-full sm:w-auto justify-center sm:justify-end">
              <Button size="sm" onClick={handleBookClick}>
                Book a 15-min Call
              </Button>
              <Button size="sm" variant="secondary" onClick={handleAuditClick}>
                Run Free Audit
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StickyCTA;
