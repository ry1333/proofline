// Evidence Article Types and Helpers

export type EvidenceTag =
  | 'Clarity'
  | 'Trust'
  | 'Friction'
  | 'Choice'
  | 'Speed'
  | 'Proof'
  | 'Copy'
  | 'Mobile'
  | 'Automation';

export interface ArticleFrontmatter {
  title: string;
  description: string;
  slug: string;
  date: string; // ISO date string
  tags: EvidenceTag[];
  readingTime: number; // minutes
  featured?: boolean;
  cover?: string;
  canonical?: string;
  draft?: boolean;
}

export interface ArticleSection {
  type: 'heading' | 'paragraph' | 'list' | 'lab-note' | 'checklist' | 'measurement' | 'quote' | 'key-takeaways';
  level?: 2 | 3; // for headings
  content: string | string[];
  title?: string; // for callouts
}

export interface Article extends ArticleFrontmatter {
  keyTakeaways?: string[];
  sections: ArticleSection[];
  furtherReading?: string[];
}

// Calculate reading time from sections
export const calculateReadingTime = (sections: ArticleSection[]): number => {
  let wordCount = 0;

  sections.forEach(section => {
    if (typeof section.content === 'string') {
      wordCount += section.content.split(/\s+/).length;
    } else if (Array.isArray(section.content)) {
      section.content.forEach(item => {
        wordCount += item.split(/\s+/).length;
      });
    }
    if (section.title) {
      wordCount += section.title.split(/\s+/).length;
    }
  });

  // Average reading speed: 200 words per minute
  return Math.max(1, Math.ceil(wordCount / 200));
};

// Format date for display
export const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

// All available tags for filtering
export const allTags: EvidenceTag[] = [
  'Clarity',
  'Trust',
  'Friction',
  'Choice',
  'Speed',
  'Proof',
  'Copy',
  'Mobile',
  'Automation'
];

// Principles for the mini strip
export const principles = [
  'Cognitive Load',
  "Hick's Law",
  "Fitts's Law",
  'Social Proof',
  'Message Match',
  'Speed-to-Lead'
];
