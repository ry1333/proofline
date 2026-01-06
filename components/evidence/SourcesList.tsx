import React from 'react';
import { ExternalLink, FileText, Video, File, BookOpen } from 'lucide-react';
import { Source, SourceType, getSources } from '../../content/evidence/sources';

// ============================================
// SOURCE TYPE ICON
// ============================================
const SourceIcon: React.FC<{ type: SourceType }> = ({ type }) => {
  const iconClass = "text-brand-accent flex-shrink-0";
  const size = 14;

  switch (type) {
    case 'pdf':
      return <FileText size={size} className={iconClass} />;
    case 'video':
      return <Video size={size} className={iconClass} />;
    case 'study':
      return <BookOpen size={size} className={iconClass} />;
    case 'doc':
      return <File size={size} className={iconClass} />;
    default:
      return <ExternalLink size={size} className={iconClass} />;
  }
};

// ============================================
// INDIVIDUAL SOURCE ITEM
// ============================================
interface SourceItemProps {
  source: Source;
  index: number;
}

const SourceItem: React.FC<SourceItemProps> = ({ source, index }) => (
  <li id={`source-${source.id}`} className="group">
    <a
      href={source.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-start gap-3 p-3 -mx-3 rounded hover:bg-white/[0.03] transition-colors"
    >
      {/* Citation number */}
      <span className="font-mono text-xs text-brand-accent mt-0.5 w-5 flex-shrink-0">
        [{index + 1}]
      </span>

      {/* Icon */}
      <SourceIcon type={source.type} />

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start gap-2">
          <span className="text-white text-sm font-medium group-hover:text-brand-accent transition-colors">
            {source.title}
          </span>
          <ExternalLink size={12} className="text-gray-600 mt-1 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

        <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 mt-1 text-xs text-gray-500">
          {source.author && (
            <>
              <span>{source.author}</span>
              <span className="text-gray-700">•</span>
            </>
          )}
          <span>{source.publisher}</span>
          {source.date && (
            <>
              <span className="text-gray-700">•</span>
              <span>{source.date}</span>
            </>
          )}
          <span className="px-1.5 py-0.5 bg-white/5 rounded text-[10px] uppercase tracking-wide text-gray-500">
            {source.type}
          </span>
        </div>

        <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">
          {source.note}
        </p>
      </div>
    </a>
  </li>
);

// ============================================
// SOURCES LIST PANEL
// ============================================
interface SourcesListProps {
  sourceIds: string[];
}

const SourcesList: React.FC<SourcesListProps> = ({ sourceIds }) => {
  const sourcesData = getSources(sourceIds);

  if (sourcesData.length === 0) return null;

  return (
    <div className="mt-12 relative">
      {/* HUD Panel */}
      <div className="border border-white/10 bg-white/[0.02] rounded-lg overflow-hidden">
        {/* Header */}
        <div className="px-5 py-4 border-b border-white/10 bg-white/[0.02]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 bg-brand-accent rounded-full"></div>
              <h4 className="font-semibold text-white">Sources</h4>
            </div>
            <span className="font-mono text-[10px] text-gray-600 uppercase tracking-wider">
              {sourcesData.length} reference{sourcesData.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>

        {/* Sources list */}
        <div className="px-5 py-4">
          <ul className="space-y-1">
            {sourcesData.map((source, idx) => (
              <SourceItem key={source.id} source={source} index={idx} />
            ))}
          </ul>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-white/5 bg-black/20">
          <p className="font-mono text-[10px] text-gray-600">
            // All sources verified. Click to view original research.
          </p>
        </div>
      </div>

      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-brand-accent/30"></div>
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-brand-accent/30"></div>
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-brand-accent/30"></div>
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-brand-accent/30"></div>
    </div>
  );
};

export default SourcesList;

// ============================================
// INLINE CITATION COMPONENT
// ============================================
interface CiteProps {
  id: string; // Citation key (e.g., "1")
  sourceId?: string; // Optional source ID for linking
}

export const Cite: React.FC<CiteProps> = ({ id, sourceId }) => (
  <sup>
    <a
      href={sourceId ? `#source-${sourceId}` : '#sources'}
      className="font-mono text-[10px] text-brand-accent hover:text-white transition-colors px-0.5"
    >
      [{id}]
    </a>
  </sup>
);
