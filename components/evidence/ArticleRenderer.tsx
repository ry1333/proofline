import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, CheckSquare, BarChart3, Quote } from 'lucide-react';
import { ArticleSection } from '../../content/evidence';

// ============================================
// CALLOUT COMPONENTS
// ============================================

interface CalloutProps {
  title?: string;
  children: React.ReactNode;
}

export const LabNote: React.FC<CalloutProps> = ({ title, children }) => (
  <div className="my-8 relative border border-brand-accent/30 bg-brand-accent/[0.02]">
    {/* Corner markers */}
    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-brand-accent/50"></div>
    <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-brand-accent/50"></div>
    <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-brand-accent/50"></div>
    <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-brand-accent/50"></div>

    <div className="border-b border-brand-accent/20 px-4 py-2 flex items-center gap-2 bg-brand-accent/5">
      <Lightbulb size={14} className="text-brand-accent" />
      <span className="font-mono text-[10px] text-brand-accent uppercase tracking-wider">
        {title || 'Lab Note'}
      </span>
    </div>
    <div className="p-4 text-brand-textDim text-sm leading-relaxed">
      {children}
    </div>
  </div>
);

export const Checklist: React.FC<CalloutProps & { items: string[] }> = ({ title, items }) => (
  <div className="my-8 relative border border-brand-border bg-brand-panel">
    {/* Corner markers */}
    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/20"></div>
    <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/20"></div>
    <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/20"></div>
    <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/20"></div>

    <div className="border-b border-brand-border px-4 py-2 flex items-center gap-2">
      <CheckSquare size={14} className="text-brand-accent" />
      <span className="font-mono text-[10px] text-brand-accent uppercase tracking-wider">
        {title || 'Implementation Checklist'}
      </span>
    </div>
    <div className="p-4">
      <ul className="space-y-2">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-start gap-3 text-sm text-brand-textDim">
            <span className="text-brand-accent font-mono text-xs mt-0.5">[ ]</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export const Measurement: React.FC<CalloutProps & { items: string[] }> = ({ title, items }) => (
  <div className="my-8 relative border border-brand-border bg-brand-panel">
    {/* Corner markers */}
    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/20"></div>
    <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/20"></div>
    <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/20"></div>
    <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/20"></div>

    <div className="border-b border-brand-border px-4 py-2 flex items-center gap-2">
      <BarChart3 size={14} className="text-brand-accent" />
      <span className="font-mono text-[10px] text-brand-accent uppercase tracking-wider">
        {title || 'What We Measure'}
      </span>
    </div>
    <div className="p-4">
      <ul className="space-y-2">
        {items.map((item, idx) => (
          <li key={idx} className="text-sm font-mono text-brand-textDim">
            <span className="text-brand-accent">→</span> {item}
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export const BlockQuote: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="my-8 pl-4 border-l-2 border-brand-accent/50">
    <div className="flex gap-2">
      <Quote size={16} className="text-brand-accent/50 flex-shrink-0 mt-1" />
      <p className="text-lg text-white/80 italic">{children}</p>
    </div>
  </div>
);

export const KeyTakeaways: React.FC<{ items: string[] }> = ({ items }) => (
  <div className="my-8 relative border border-brand-accent/40 bg-brand-accent/[0.03]">
    {/* Corner markers */}
    <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-brand-accent"></div>
    <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-brand-accent"></div>
    <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-brand-accent"></div>
    <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-brand-accent"></div>

    <div className="border-b border-brand-accent/30 px-5 py-3 bg-brand-accent/5">
      <span className="font-mono text-xs text-brand-accent uppercase tracking-wider font-bold">
        Key Takeaways
      </span>
    </div>
    <div className="p-5">
      <ul className="space-y-3">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-start gap-3 text-white">
            <span className="text-brand-accent font-bold text-lg leading-none">•</span>
            <span className="text-sm leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

// ============================================
// ARTICLE SECTION RENDERER
// ============================================

interface ArticleRendererProps {
  sections: ArticleSection[];
}

const ArticleRenderer: React.FC<ArticleRendererProps> = ({ sections }) => {
  return (
    <div className="prose-container">
      {sections.map((section, idx) => {
        switch (section.type) {
          case 'heading':
            if (section.level === 2) {
              return (
                <h2 key={idx} className="text-2xl font-bold text-white mt-12 mb-4 uppercase tracking-wide">
                  {section.content as string}
                </h2>
              );
            }
            return (
              <h3 key={idx} className="text-xl font-bold text-white mt-8 mb-3">
                {section.content as string}
              </h3>
            );

          case 'paragraph':
            return (
              <p key={idx} className="text-brand-textDim leading-[1.8] mb-6">
                {section.content as string}
              </p>
            );

          case 'list':
            return (
              <ul key={idx} className="mb-6 space-y-2 ml-4">
                {(section.content as string[]).map((item, i) => (
                  <li key={i} className="text-brand-textDim leading-relaxed flex items-start gap-2">
                    <span className="text-brand-accent mt-1.5">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            );

          case 'lab-note':
            return (
              <LabNote key={idx} title={section.title}>
                {section.content as string}
              </LabNote>
            );

          case 'checklist':
            return (
              <Checklist key={idx} title={section.title} items={section.content as string[]} />
            );

          case 'measurement':
            return (
              <Measurement key={idx} title={section.title} items={section.content as string[]} />
            );

          case 'quote':
            return <BlockQuote key={idx}>{section.content as string}</BlockQuote>;

          case 'key-takeaways':
            return <KeyTakeaways key={idx} items={section.content as string[]} />;

          default:
            return null;
        }
      })}
    </div>
  );
};

export default ArticleRenderer;
