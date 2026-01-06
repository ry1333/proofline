import React from 'react';
import { ResponsiveContainer, AreaChart, Area, CartesianGrid, XAxis, Tooltip } from 'recharts';
import { ArrowRight, Activity, Zap, Check, Terminal } from 'lucide-react';
import { Button } from './ui/Shared';
import { motion } from 'framer-motion';

const data = [
  { name: '01', val: 12 },
  { name: '02', val: 19 },
  { name: '03', val: 15 },
  { name: '04', val: 28 },
  { name: '05', val: 32 },
  { name: '06', val: 45 },
  { name: '07', val: 58 },
];

const Hero: React.FC = () => {
  return (
    <div className="relative w-full min-h-screen pt-32 pb-20 px-4 flex items-center justify-center overflow-hidden bg-brand-dark">
      {/* Background Tech */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-dot-grid opacity-[0.15]"></div>
        {/* Diagonal Light Streak */}
        <div className="absolute -top-[20%] right-[10%] w-[1px] h-[150%] bg-white/5 rotate-[15deg] blur-[1px]"></div>
        <div className="absolute -top-[20%] right-[25%] w-[400px] h-[150%] bg-streak-gradient rotate-[15deg]"></div>
      </div>

      <div className="relative z-10 max-w-7xl w-full mx-auto grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        
        {/* Left Content */}
        <div className="space-y-10 text-center lg:text-left">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="inline-flex items-center gap-3 border-l-2 border-brand-accent pl-4"
          >
             <span className="font-mono text-[10px] text-brand-accent tracking-[0.2em] uppercase">System Online • v2.0</span>
          </motion.div>

          <motion.h1 
            className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[0.9] tracking-tighter text-white uppercase"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Web + <br/>
            Automation <br/>
            <span className="text-brand-textDim text-4xl md:text-5xl lg:text-6xl normal-case font-light tracking-normal">that turns clicks into booked calls.</span>
          </motion.h1>

          <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 0.2 }}
             className="space-y-6"
          >
            <p className="text-gray-400 max-w-lg mx-auto lg:mx-0 font-light leading-relaxed">
              Fast sites + instant lead follow-up. Evidence-based UX. Measured results.
            </p>

            <div className="flex flex-col gap-2 font-mono text-xs text-brand-textDim">
               <div className="flex items-center gap-2">
                 <div className="w-1 h-1 bg-brand-accent"></div>
                 Speed-to-lead workflows
               </div>
               <div className="flex items-center gap-2">
                 <div className="w-1 h-1 bg-brand-accent"></div>
                 Conversion landing pages
               </div>
               <div className="flex items-center gap-2">
                 <div className="w-1 h-1 bg-brand-accent"></div>
                 Tracking + Reporting
               </div>
            </div>
          </motion.div>

          <motion.div 
            className="flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start pt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Button size="lg" className="w-full sm:w-auto" onClick={() => document.getElementById('audit-form')?.scrollIntoView({ behavior: 'smooth' })}>
              Book a 15-min Call
            </Button>
            <Button variant="outline" size="lg" className="w-full sm:w-auto" onClick={() => document.getElementById('audit-form')?.scrollIntoView({ behavior: 'smooth' })}>
              Run Free Audit
            </Button>
          </motion.div>
        </div>

        {/* Right Dashboard Mockup (HUD Style) */}
        <motion.div 
          className="relative group"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          {/* Main Frame */}
          <div className="relative bg-[#050505] border border-brand-border hud-clip-corners p-1">
             <div className="absolute top-0 right-0 p-2 font-mono text-[10px] text-brand-accent opacity-50">/// LIVE_FEED</div>
             
             <div className="border border-white/5 p-6 h-[400px] flex flex-col relative overflow-hidden bg-dot-matrix bg-[length:10px_10px]">
                {/* Header */}
                <div className="flex justify-between items-end mb-8 border-b border-white/10 pb-4">
                  <div>
                    <div className="text-[10px] font-mono text-gray-500 uppercase">Metric</div>
                    <div className="text-2xl font-bold text-white">Lead Velocity</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] font-mono text-brand-accent uppercase flex items-center gap-2">
                       <div className="w-1.5 h-1.5 bg-brand-accent animate-pulse"></div> 
                       Active
                    </div>
                    <div className="text-xl font-mono text-white">0m 42s</div>
                  </div>
                </div>

                {/* Graph */}
                <div className="flex-1 w-full relative">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                      <defs>
                        <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#00FF94" stopOpacity={0.1}/>
                          <stop offset="95%" stopColor="#00FF94" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="2 2" stroke="#222" vertical={false} />
                      <XAxis dataKey="name" stroke="#444" fontSize={10} tickLine={false} axisLine={false} fontFamily="JetBrains Mono" />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#000', border: '1px solid #333', borderRadius: '0px' }}
                        itemStyle={{ color: '#00FF94', fontFamily: 'JetBrains Mono' }}
                      />
                      <Area type="monotone" dataKey="val" stroke="#00FF94" strokeWidth={1} fill="url(#chartGradient)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                {/* Bottom Data */}
                <div className="grid grid-cols-3 gap-4 mt-6 pt-4 border-t border-white/10">
                   <div>
                      <div className="text-[9px] font-mono text-gray-600 uppercase">Conv. Rate</div>
                      <div className="text-sm text-white font-bold">4.8%</div>
                   </div>
                   <div>
                      <div className="text-[9px] font-mono text-gray-600 uppercase">Bookings</div>
                      <div className="text-sm text-white font-bold">142</div>
                   </div>
                   <div>
                      <div className="text-[9px] font-mono text-gray-600 uppercase">Status</div>
                      <div className="text-sm text-brand-accent font-mono">OPTIMAL</div>
                   </div>
                </div>
             </div>
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute -bottom-4 -right-4 w-24 h-24 border-r border-b border-brand-border/50 rounded-br-3xl pointer-events-none"></div>
        </motion.div>
      </div>
    </div >
  );
};

export default Hero;