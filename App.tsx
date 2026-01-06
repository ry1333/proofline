import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import { Overview, Process } from './components/ValueProps';
import { TrustBar, Deployments } from './components/SocialProof';
import Pricing from './components/Pricing';
import AuditForm from './components/AuditForm';
import { Footer } from './components/LabAndFAQ'; // Reusing Footer for now

const App: React.FC = () => {
  return (
    <div className="min-h-screen w-full bg-brand-dark overflow-x-hidden selection:bg-brand-accent/30 selection:text-white">
      <div className="fixed inset-0 pointer-events-none z-50 scanlines opacity-50"></div>
      
      <Navbar />
      
      <main>
        <Hero />
        
        <TrustBar />
        
        <Overview />
        
        <Process />
        
        <Deployments />
        
        <Pricing />
        
        <AuditForm />
      </main>

      <Footer />
    </div>
  );
};

export default App;