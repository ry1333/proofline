import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Section, SectionHeader, Button } from './ui/Shared';
import { Check } from 'lucide-react';

const Pricing: React.FC = () => {
  const navigate = useNavigate();
  const plans = [
    {
      name: "Launch",
      price: "$2,500",
      desc: "Solid foundation.",
      features: ["Custom 5-Page Site", "Mobile Optimized", "Basic SEO", "Contact Form"]
    },
    {
      name: "Pro",
      price: "$4,800",
      desc: "Scale ready.",
      popular: true,
      features: ["Speed-to-Lead Auto", "CRM Integration", "Review Generation", "Advanced Tracking"]
    },
    {
      name: "Growth",
      price: "Custom",
      desc: "Multi-location.",
      features: ["Multi-site Management", "Custom API Integrations", "A/B Testing Program", "Priority Support"]
    }
  ];

  return (
    <Section id="pricing">
      <SectionHeader title="Investment" label="FEES" />

      <div className="grid md:grid-cols-3 gap-6">
        {plans.map((plan, idx) => (
          <div 
            key={idx} 
            className={`relative flex flex-col p-8 border ${plan.popular ? 'border-brand-accent/50 bg-brand-accent/[0.02]' : 'border-brand-border bg-brand-panel'}`}
          >
            {plan.popular && (
              <div className="absolute top-0 right-0">
                <div className="bg-brand-accent text-black text-[9px] font-mono font-bold px-3 py-1 uppercase tracking-wider">
                  Recommended
                </div>
              </div>
            )}
            
            <div className="mb-8">
              <h3 className="text-lg font-bold text-white mb-2 uppercase">{plan.name}</h3>
              <div className="text-3xl font-bold text-white mb-2 tracking-tight font-mono">{plan.price}</div>
              <p className="text-xs text-brand-textDim font-mono uppercase tracking-wider">{plan.desc}</p>
            </div>

            <div className="flex-1 mb-8 border-t border-dashed border-white/10 pt-6">
              <ul className="space-y-4">
                {plan.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-3 text-xs text-gray-300 font-mono">
                    <Check size={14} className="text-brand-accent mt-0.5 shrink-0" />
                    {feat}
                  </li>
                ))}
              </ul>
            </div>

            <Button
              variant={plan.popular ? 'primary' : 'outline'}
              className="w-full"
              onClick={() => {
                navigate('/contact');
                setTimeout(() => document.getElementById('calendar')?.scrollIntoView({ behavior: 'smooth' }), 100);
              }}
            >
              Book a 15-min Call
            </Button>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default Pricing;