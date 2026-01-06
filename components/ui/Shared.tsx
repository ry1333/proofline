import React from 'react';
import { motion } from 'framer-motion';
import { BaseProps } from '../../types';

export const Section: React.FC<BaseProps & { id?: string; noPadding?: boolean }> = ({ 
  children, 
  className = "", 
  id,
  noPadding = false
}) => (
  <section id={id} className={`relative w-full ${noPadding ? '' : 'py-24'} px-4 md:px-8 max-w-7xl mx-auto ${className}`}>
    {children}
  </section>
);

export const SectionHeader: React.FC<{ title: string; subtitle?: string; label?: string }> = ({ title, subtitle, label = "SYSTEM" }) => (
  <div className="mb-16 border-l border-brand-border pl-6 relative">
    <div className="absolute top-0 left-0 w-[1px] h-1/2 bg-brand-accent"></div>
    <div className="flex items-center gap-3 mb-2">
      <span className="font-mono text-[10px] text-brand-accent uppercase tracking-[0.2em]">{label} /////</span>
      <div className="h-[1px] w-12 bg-brand-border"></div>
    </div>
    <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight uppercase">{title}</h2>
    {subtitle && <p className="text-brand-textDim mt-4 max-w-xl text-sm leading-relaxed">{subtitle}</p>}
  </div>
);

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = "", 
  ...props 
}) => {
  // HUD Button: Notched bottom-right corner
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-300 hud-clip-br focus:outline-none tracking-wide relative overflow-hidden group font-mono text-xs uppercase";
  
  const variants = {
    primary: "bg-brand-accent text-brand-dark hover:bg-white hover:text-black font-bold",
    secondary: "bg-brand-border/50 text-white hover:bg-white/10 hover:border-brand-accent/50 border border-brand-border",
    outline: "bg-transparent border border-brand-accent text-brand-accent hover:bg-brand-accent/10",
    ghost: "text-brand-textDim hover:text-white"
  };

  const sizes = {
    sm: "px-4 py-2",
    md: "px-6 py-3",
    lg: "px-8 py-4"
  };

  return (
    <motion.button 
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export const Card: React.FC<BaseProps & { hoverEffect?: boolean; noPadding?: boolean; borderHighlight?: boolean }> = ({ 
  children, 
  className = "",
  hoverEffect = true,
  noPadding = false,
  borderHighlight = false
}) => (
  <div 
    className={`
      relative bg-brand-panel border border-brand-border
      ${noPadding ? 'p-0' : 'p-8'} 
      ${hoverEffect ? 'hover:border-white/20 transition-colors duration-500' : ''} 
      ${className}
    `}
  >
    {/* Corner markers */}
    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/20"></div>
    <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/20"></div>
    <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/20"></div>
    <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/20"></div>
    
    {children}
  </div>
);

export const Badge: React.FC<{ children: React.ReactNode; color?: 'accent' | 'neutral' }> = ({ 
  children, 
  color = 'accent' 
}) => {
  return (
    <span className={`
      inline-flex items-center px-2 py-0.5 text-[10px] font-mono tracking-wider uppercase
      ${color === 'accent' ? 'text-brand-accent border-brand-accent/20 bg-brand-accent/5' : 'text-gray-500 border-white/10 bg-white/5'}
      border
    `}>
      {children}
    </span>
  );
};

export const GradientText: React.FC<{ children: string; className?: string }> = ({ children, className = "" }) => (
  <span className={`text-white ${className}`}>
    {children}
  </span>
);

// Stagger Animations
export const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};