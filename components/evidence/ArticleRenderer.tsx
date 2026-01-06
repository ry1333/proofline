import React from 'react';
import { Lightbulb, CheckCircle, BarChart3, TrendingUp } from 'lucide-react';
import { ArticleSection } from '../../content/evidence';

// ============================================
// INLINE CITATION COMPONENT
// ============================================
const InlineCite: React.FC<{ cite: string }> = ({ cite }) => (
  <sup className="font-mono text-[10px] text-brand-accent hover:text-white transition-colors cursor-pointer ml-0.5">
    [{cite}]
  </sup>
);

// Helper to render content with optional citation
const ContentWithCite: React.FC<{ content: string; cite?: string }> = ({ content, cite }) => (
  <>
    {content}
    {cite && <InlineCite cite={cite} />}
  </>
);

// ============================================
// CALLOUT COMPONENTS - FUI style with readability
// ============================================

interface CalloutProps {
  title?: string;
  children: React.ReactNode;
  cite?: string;
}

export const LabNote: React.FC<CalloutProps> = ({ title, children, cite }) => (
  <div className="my-8 relative bg-brand-accent/5 border border-brand-accent/20 rounded-lg p-5">
    {/* Corner accents */}
    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-brand-accent/50"></div>
    <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-brand-accent/50"></div>

    <div className="flex items-center gap-2 mb-2">
      <Lightbulb size={16} className="text-brand-accent" />
      <span className="font-mono text-[10px] text-brand-accent uppercase tracking-wider">
        {title || 'Key Insight'}
      </span>
    </div>
    <div className="text-gray-300 text-[15px] leading-relaxed">
      {children}
      {cite && <InlineCite cite={cite} />}
    </div>
  </div>
);

export const Checklist: React.FC<CalloutProps & { items: string[] }> = ({ title, items }) => (
  <div className="my-8 relative bg-white/[0.02] border border-white/10 rounded-lg p-5">
    {/* Corner accents */}
    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/20"></div>
    <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/20"></div>

    <div className="flex items-center gap-2 mb-4">
      <CheckCircle size={16} className="text-brand-accent" />
      <span className="font-mono text-[10px] text-brand-accent uppercase tracking-wider">
        {title || 'Implementation Checklist'}
      </span>
    </div>
    <ul className="space-y-3">
      {items.map((item, idx) => (
        <li key={idx} className="flex items-start gap-3 text-gray-300">
          <span className="w-5 h-5 rounded border border-brand-accent/30 bg-brand-accent/5 flex-shrink-0 mt-0.5 flex items-center justify-center font-mono text-[10px] text-brand-accent">
            {idx + 1}
          </span>
          <span className="text-[15px] leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

export const Measurement: React.FC<CalloutProps & { items: string[] }> = ({ title, items }) => (
  <div className="my-8 relative bg-white/[0.02] border border-white/10 rounded-lg p-5">
    {/* Corner accents */}
    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/20"></div>
    <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/20"></div>

    <div className="flex items-center gap-2 mb-4">
      <BarChart3 size={16} className="text-brand-accent" />
      <span className="font-mono text-[10px] text-brand-accent uppercase tracking-wider">
        {title || 'What We Measure'}
      </span>
    </div>
    <div className="grid gap-2">
      {items.map((item, idx) => (
        <div key={idx} className="flex items-center gap-2 text-gray-300 text-[15px]">
          <span className="text-brand-accent font-mono text-xs">→</span>
          <code className="text-brand-accent bg-black/30 px-1.5 py-0.5 rounded font-mono text-xs">
            {item.split(':')[0]}
          </code>
          {item.includes(':') && (
            <span className="text-gray-400">{item.split(':').slice(1).join(':')}</span>
          )}
        </div>
      ))}
    </div>
  </div>
);

export const BlockQuote: React.FC<{ children: React.ReactNode; cite?: string }> = ({ children, cite }) => (
  <blockquote className="my-8 pl-5 border-l-2 border-brand-accent/50 bg-white/[0.01] py-4 pr-4 rounded-r">
    <p className="text-lg text-gray-300 italic leading-relaxed">
      {children}
      {cite && <InlineCite cite={cite} />}
    </p>
  </blockquote>
);

export const KeyTakeaways: React.FC<{ items: string[] }> = ({ items }) => (
  <div className="my-8 relative bg-brand-accent/5 border border-brand-accent/20 rounded-lg p-6">
    {/* Corner accents */}
    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-brand-accent/50"></div>
    <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-brand-accent/50"></div>
    <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-brand-accent/50"></div>
    <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-brand-accent/50"></div>

    <h4 className="font-mono text-[10px] text-brand-accent uppercase tracking-wider mb-4 flex items-center gap-2">
      <span className="w-1.5 h-1.5 bg-brand-accent rounded-full"></span>
      Key Takeaways
    </h4>
    <ul className="space-y-3">
      {items.map((item, idx) => (
        <li key={idx} className="flex items-start gap-3 text-gray-200">
          <span className="text-brand-accent font-mono text-sm mt-0.5">•</span>
          <span className="text-[15px] leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

// ============================================
// STAT CALLOUT - For cited statistics
// ============================================
export const StatCallout: React.FC<{ content: string; cite?: string }> = ({ content, cite }) => (
  <div className="my-6 flex items-center gap-3 p-4 bg-brand-accent/5 border border-brand-accent/20 rounded-lg">
    <TrendingUp size={20} className="text-brand-accent flex-shrink-0" />
    <p className="text-white font-medium">
      {content}
      {cite && <InlineCite cite={cite} />}
    </p>
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
                <ContentWithCite content={section.content as string} cite={section.cite} />
              </p>
            );

          case 'stat':
            return (
              <StatCallout key={idx} content={section.content as string} cite={section.cite} />
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
              <LabNote key={idx} title={section.title} cite={section.cite}>
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
            return <BlockQuote key={idx} cite={section.cite}>{section.content as string}</BlockQuote>;

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
