import React from 'react';
import { Lightbulb, CheckCircle, BarChart3, Quote } from 'lucide-react';
import { ArticleSection } from '../../content/evidence';

// ============================================
// CALLOUT COMPONENTS - Clean, readable style
// ============================================

interface CalloutProps {
  title?: string;
  children: React.ReactNode;
}

export const LabNote: React.FC<CalloutProps> = ({ title, children }) => (
  <div className="my-8 bg-brand-accent/5 border-l-4 border-brand-accent rounded-r-lg p-5">
    <div className="flex items-center gap-2 mb-2">
      <Lightbulb size={18} className="text-brand-accent" />
      <span className="font-semibold text-white text-sm">
        {title || 'Key Insight'}
      </span>
    </div>
    <div className="text-gray-300 text-[15px] leading-relaxed">
      {children}
    </div>
  </div>
);

export const Checklist: React.FC<CalloutProps & { items: string[] }> = ({ title, items }) => (
  <div className="my-8 bg-white/[0.02] border border-white/10 rounded-lg p-5">
    <div className="flex items-center gap-2 mb-4">
      <CheckCircle size={18} className="text-brand-accent" />
      <span className="font-semibold text-white">
        {title || 'Checklist'}
      </span>
    </div>
    <ul className="space-y-3">
      {items.map((item, idx) => (
        <li key={idx} className="flex items-start gap-3 text-gray-300">
          <span className="w-5 h-5 rounded border border-white/20 flex-shrink-0 mt-0.5 flex items-center justify-center text-[10px] text-gray-500">
            {idx + 1}
          </span>
          <span className="text-[15px] leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

export const Measurement: React.FC<CalloutProps & { items: string[] }> = ({ title, items }) => (
  <div className="my-8 bg-white/[0.02] border border-white/10 rounded-lg p-5">
    <div className="flex items-center gap-2 mb-4">
      <BarChart3 size={18} className="text-brand-accent" />
      <span className="font-semibold text-white">
        {title || 'What We Measure'}
      </span>
    </div>
    <div className="grid gap-2">
      {items.map((item, idx) => (
        <div key={idx} className="flex items-center gap-2 text-gray-300 text-[15px]">
          <span className="text-brand-accent">→</span>
          <code className="text-gray-400 bg-black/30 px-1.5 py-0.5 rounded text-sm">
            {item.split(':')[0]}
          </code>
          {item.includes(':') && (
            <span className="text-gray-500">{item.split(':').slice(1).join(':')}</span>
          )}
        </div>
      ))}
    </div>
  </div>
);

export const BlockQuote: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <blockquote className="my-8 pl-5 border-l-2 border-gray-600">
    <p className="text-lg text-gray-300 italic leading-relaxed">{children}</p>
  </blockquote>
);

export const KeyTakeaways: React.FC<{ items: string[] }> = ({ items }) => (
  <div className="my-8 bg-brand-accent/5 border border-brand-accent/20 rounded-lg p-6">
    <h4 className="font-semibold text-white mb-4 flex items-center gap-2">
      <span className="w-1.5 h-1.5 bg-brand-accent rounded-full"></span>
      Key Takeaways
    </h4>
    <ul className="space-y-3">
      {items.map((item, idx) => (
        <li key={idx} className="flex items-start gap-3 text-gray-200">
          <span className="text-brand-accent font-bold mt-0.5">•</span>
          <span className="text-[15px] leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

// ============================================
// ARTICLE SECTION RENDERER - Clean typography
// ============================================

interface ArticleRendererProps {
  sections: ArticleSection[];
}

const ArticleRenderer: React.FC<ArticleRendererProps> = ({ sections }) => {
  return (
    <div className="article-content">
      {sections.map((section, idx) => {
        switch (section.type) {
          case 'heading':
            if (section.level === 2) {
              return (
                <h2 key={idx} className="text-2xl font-bold text-white mt-12 mb-5 leading-tight">
                  {section.content as string}
                </h2>
              );
            }
            return (
              <h3 key={idx} className="text-xl font-semibold text-white mt-8 mb-4 leading-tight">
                {section.content as string}
              </h3>
            );

          case 'paragraph':
            return (
              <p key={idx} className="text-gray-300 text-[16px] leading-[1.8] mb-5">
                {section.content as string}
              </p>
            );

          case 'list':
            return (
              <ul key={idx} className="mb-6 space-y-2.5 ml-1">
                {(section.content as string[]).map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-300 text-[16px] leading-relaxed">
                    <span className="text-brand-accent mt-2 w-1.5 h-1.5 bg-brand-accent rounded-full flex-shrink-0"></span>
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
