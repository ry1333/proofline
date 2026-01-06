import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Home, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md"
      >
        {/* Error Icon */}
        <div className="mb-8">
          <div className="w-20 h-20 mx-auto rounded-xl bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center">
            <AlertTriangle className="text-brand-accent" size={40} />
          </div>
        </div>

        {/* Error Code */}
        <div className="mb-4">
          <span className="text-7xl md:text-8xl font-bold text-white tracking-tight">404</span>
        </div>

        {/* Message */}
        <h1 className="text-xl md:text-2xl font-semibold text-white mb-4">
          Page Not Found
        </h1>
        <p className="text-gray-500 mb-8">
          The page you're looking for doesn't exist or has been moved.
          Let's get you back on track.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-white/10 text-gray-300 hover:text-white hover:bg-white/5 transition-all"
          >
            <ArrowLeft size={18} />
            Go Back
          </button>
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-brand-accent text-black font-semibold hover:bg-brand-accent/90 transition-all"
          >
            <Home size={18} />
            Back to Home
          </Link>
        </div>

        {/* HUD Decorative Element */}
        <div className="mt-12 pt-8 border-t border-white/5">
          <p className="text-[10px] uppercase tracking-widest text-gray-600">
            Error Code: PAGE_NOT_FOUND
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;
