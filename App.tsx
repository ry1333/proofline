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
import PricingPage from './components/PricingPage';
import ContactPage from './components/ContactPage';
import EvidenceHub from './components/EvidenceHub';
import EvidenceArticle from './components/EvidenceArticle';
import PrivacyPage from './components/PrivacyPage';
import TermsPage from './components/TermsPage';
import NotFoundPage from './components/NotFoundPage';

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
    <BrowserRouter basename="/proofline">
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/process" element={<ProcessPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/evidence" element={<EvidenceHub />} />
          <Route path="/evidence/:slug" element={<EvidenceArticle />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
