import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Section, Button } from './ui/Shared';
import {
  CheckCircle,
  Clock,
  Video,
  FileText,
  ArrowRight,
  ExternalLink,
  Calendar,
} from 'lucide-react';
import { trackAuditCtaBookCallClick } from '../utils/analytics';
import { useNavigate } from 'react-router-dom';

const BOOKING_URL = '/contact#calendar';

const ThanksPage: React.FC = () => {
  const navigate = useNavigate();

  const handleBookCall = () => {
    trackAuditCtaBookCallClick('audit_footer');
    navigate(BOOKING_URL);
  };

  return (
    <Section className="pt-32 pb-20">
      <motion.div
        className="max-w-2xl mx-auto text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Success Icon */}
        <div className="relative inline-block mb-6">
          <div className="absolute inset-0 bg-brand-accent/20 blur-xl rounded-full"></div>
          <CheckCircle size={64} className="text-brand-accent relative" />
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
          Audit Request Received
        </h1>

        {/* Subhead */}
        <p className="text-lg text-gray-400 mb-8 max-w-xl mx-auto">
          Thanks for requesting your free website audit. We're on it.
        </p>

        {/* What to Expect Panel */}
        <motion.div
          className="relative border border-brand-accent/30 bg-brand-accent/[0.02] p-6 md:p-8 mb-8 text-left"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {/* Corner markers */}
          <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-brand-accent"></div>
          <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-brand-accent"></div>
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-brand-accent"></div>
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-brand-accent"></div>

          <h2 className="font-mono text-[10px] text-brand-accent uppercase tracking-wider mb-4">
            // What happens next
          </h2>

          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 flex items-center justify-center bg-brand-accent/10 border border-brand-accent/30 flex-shrink-0">
                <Clock size={16} className="text-brand-accent" />
              </div>
              <div>
                <h3 className="font-bold text-white text-sm mb-1">24–48 Hour Turnaround</h3>
                <p className="text-sm text-gray-400">We'll review your site and prepare your personalized audit.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 flex items-center justify-center bg-brand-accent/10 border border-brand-accent/30 flex-shrink-0">
                <FileText size={16} className="text-brand-accent" />
              </div>
              <div>
                <h3 className="font-bold text-white text-sm mb-1">1-Page Report</h3>
                <p className="text-sm text-gray-400">Clear findings on conversion, trust, mobile UX, and speed-to-lead.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 flex items-center justify-center bg-brand-accent/10 border border-brand-accent/30 flex-shrink-0">
                <Video size={16} className="text-brand-accent" />
              </div>
              <div>
                <h3 className="font-bold text-white text-sm mb-1">Loom Walkthrough</h3>
                <p className="text-sm text-gray-400">A short video explaining the findings and recommendations.</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Book a Call CTA */}
        <motion.div
          className="relative border border-brand-border bg-brand-panel p-6 md:p-8 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/20"></div>
          <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/20"></div>
          <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/20"></div>
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/20"></div>

          <div className="flex items-center justify-center gap-2 mb-3">
            <Calendar size={18} className="text-brand-accent" />
            <h3 className="font-bold text-white">Want to discuss your project sooner?</h3>
          </div>
          <p className="text-sm text-gray-400 mb-4">
            Book a quick 15-minute call to talk about your goals and see if we're a fit.
          </p>
          <Button onClick={handleBookCall}>
            Book a 15-min Call
            <ArrowRight size={14} className="ml-2" />
          </Button>
        </motion.div>

        {/* Links */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Link to="/" className="text-gray-400 hover:text-brand-accent transition-colors flex items-center gap-1">
            Back to home <ArrowRight size={14} />
          </Link>
          <Link to="/process" className="text-gray-400 hover:text-brand-accent transition-colors flex items-center gap-1">
            See our process <ArrowRight size={14} />
          </Link>
          <Link to="/evidence" className="text-gray-400 hover:text-brand-accent transition-colors flex items-center gap-1">
            Read our insights <ArrowRight size={14} />
          </Link>
        </motion.div>

        {/* Reassurance */}
        <p className="font-mono text-[10px] text-gray-600 uppercase tracking-wider mt-8">
          // No spam. Just your audit.
        </p>
      </motion.div>
    </Section>
  );
};

export default ThanksPage;
