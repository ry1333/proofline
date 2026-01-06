import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import { Overview, Process } from './components/ValueProps';
import { TrustBar, Deployments } from './components/SocialProof';
import Pricing from './components/Pricing';
import AuditForm from './components/AuditForm';
import { Footer } from './components/LabAndFAQ';
import ProcessPage from './components/ProcessPage';
import ResultsPage from './components/ResultsPage';
import ResultsDetailPage from './components/ResultsDetailPage';
import PricingPage from './components/PricingPage';

// Home page content
const HomePage: React.FC = () => (
  <>
    <Hero />
    <TrustBar />
    <Overview />
    <Process />
    <Deployments />
    <Pricing />
    <AuditForm />
  </>
);

// Layout wrapper with nav/footer
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="min-h-screen w-full bg-brand-dark overflow-x-hidden selection:bg-brand-accent/30 selection:text-white">
    <div className="fixed inset-0 pointer-events-none z-50 scanlines opacity-50"></div>
    <Navbar />
    <main>{children}</main>
    <Footer />
  </div>
);

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/process" element={<ProcessPage />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/results/:slug" element={<ResultsDetailPage />} />
          <Route path="/pricing" element={<PricingPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
