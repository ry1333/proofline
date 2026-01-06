import React from 'react';
import { EvidenceTag } from '../../content/evidence';
import { trackEvent } from '../../utils/analytics';

interface TagChipsProps {
  tags: EvidenceTag[];
  selectedTag: EvidenceTag | null;
  onTagSelect: (tag: EvidenceTag | null) => void;
}

const TagChips: React.FC<TagChipsProps> = ({ tags, selectedTag, onTagSelect }) => {
  const handleTagClick = (tag: EvidenceTag | null) => {
    if (tag) {
      trackEvent('evidence_tag_filter', { tag });
    }
    onTagSelect(tag);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {/* All button */}
      <button
        onClick={() => handleTagClick(null)}
        className={`px-3 py-1.5 text-[11px] font-mono uppercase tracking-wider border transition-colors ${
          selectedTag === null
            ? 'bg-brand-accent text-brand-dark border-brand-accent'
            : 'bg-transparent text-brand-textDim border-brand-border hover:border-white/30 hover:text-white'
        }`}
      >
        All
      </button>

      {/* Tag buttons */}
      {tags.map((tag) => (
        <button
          key={tag}
          onClick={() => handleTagClick(tag)}
          className={`px-3 py-1.5 text-[11px] font-mono uppercase tracking-wider border transition-colors ${
            selectedTag === tag
              ? 'bg-brand-accent text-brand-dark border-brand-accent'
              : 'bg-transparent text-brand-textDim border-brand-border hover:border-brand-accent/50 hover:text-white'
          }`}
        >
          {tag}
        </button>
      ))}
    </div>
  );
};

export default TagChips;
