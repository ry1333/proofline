import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Zap } from 'lucide-react';
import { Button } from './ui/Shared';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Define nav links - all are routes now
  const navLinks = [
    { name: 'Process', href: '/process', isRoute: true },
    { name: 'Results', href: '/results', isRoute: true },
    { name: 'Pricing', href: '/pricing', isRoute: true },
    { name: 'Evidence', href: '/evidence', isRoute: true },
  ];

  // Check if a route is active (handles both exact and prefix matches)
  const isRouteActive = (href: string) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname === href || location.pathname.startsWith(href + '/');
  };

  const scrollToAudit = () => document.getElementById('audit-form')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        isScrolled 
          ? 'bg-brand-dark/80 backdrop-blur-md border-white/5 py-3' 
          : 'bg-transparent border-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group cursor-pointer">
          <div className="w-8 h-8 rounded bg-brand-accent flex items-center justify-center text-black font-bold shadow-[0_0_15px_rgba(0,255,148,0.2)] group-hover:shadow-[0_0_20px_rgba(0,255,148,0.4)] transition-all">
            <Zap size={18} fill="currentColor" />
          </div>
          <span className="text-lg font-bold tracking-tight text-white group-hover:text-gray-200 transition-colors">ProofLine</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            link.isRoute ? (
              <Link
                key={link.name}
                to={link.href}
                className={`text-sm font-medium transition-colors ${
                  isRouteActive(link.href)
                    ? 'text-brand-accent'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            ) : (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
              >
                {link.name}
              </a>
            )
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:block">
          <Button size="sm" onClick={scrollToAudit}>
            Book a 15-min Call
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gray-300 hover:text-white"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-brand-panel border-b border-white/10 p-4 flex flex-col gap-4 shadow-2xl">
          {navLinks.map((link) => (
            link.isRoute ? (
              <Link
                key={link.name}
                to={link.href}
                className={`text-base font-medium ${
                  isRouteActive(link.href)
                    ? 'text-brand-accent'
                    : 'text-gray-300 hover:text-white'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ) : (
              <a
                key={link.name}
                href={link.href}
                className="text-base font-medium text-gray-300 hover:text-white"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            )
          ))}
          <Button className="w-full" onClick={() => {
            setIsMobileMenuOpen(false);
            scrollToAudit();
          }}>
            Book a 15-min Call
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;