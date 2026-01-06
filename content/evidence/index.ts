// Evidence Article Index
// This file aggregates all articles and provides helper functions

import { Article, EvidenceTag } from './types';
import { speedToLead } from './articles/speed-to-lead';
import { cognitiveLoad } from './articles/cognitive-load';
import { hicksLaw } from './articles/hicks-law';
import { trustSignals } from './articles/trust-signals';
import { fittsLawCta } from './articles/fitts-law-cta';
import { messageMatch } from './articles/message-match';
import { aboveTheFold, formFriction, caseStudiesThatSell } from './articles/stubs';

// All articles (including drafts)
const allArticlesRaw: Article[] = [
  speedToLead,
  cognitiveLoad,
  hicksLaw,
  trustSignals,
  fittsLawCta,
  messageMatch,
  aboveTheFold,
  formFriction,
  caseStudiesThatSell,
];

// Published articles only (sorted by date, newest first)
export const articles: Article[] = allArticlesRaw
  .filter(a => !a.draft)
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

// All articles including drafts
export const allArticles: Article[] = allArticlesRaw
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

// Get featured articles
export const getFeaturedArticles = (): Article[] => {
  return articles.filter(a => a.featured);
};

// Get article by slug
export const getArticleBySlug = (slug: string): Article | undefined => {
  return allArticlesRaw.find(a => a.slug === slug);
};

// Get articles by tag
export const getArticlesByTag = (tag: EvidenceTag): Article[] => {
  return articles.filter(a => a.tags.includes(tag));
};

// Get all unique tags from published articles
export const getUsedTags = (): EvidenceTag[] => {
  const tags = new Set<EvidenceTag>();
  articles.forEach(a => a.tags.forEach(t => tags.add(t)));
  return Array.from(tags).sort();
};

// Search articles by title and description
export const searchArticles = (query: string): Article[] => {
  const lowerQuery = query.toLowerCase();
  return articles.filter(
    a =>
      a.title.toLowerCase().includes(lowerQuery) ||
      a.description.toLowerCase().includes(lowerQuery)
  );
};

// Filter articles by tag and search query
export const filterArticles = (
  tag?: EvidenceTag | null,
  query?: string
): Article[] => {
  let result = articles;

  if (tag) {
    result = result.filter(a => a.tags.includes(tag));
  }

  if (query && query.trim()) {
    const lowerQuery = query.toLowerCase().trim();
    result = result.filter(
      a =>
        a.title.toLowerCase().includes(lowerQuery) ||
        a.description.toLowerCase().includes(lowerQuery)
    );
  }

  return result;
};

// Re-export types
export * from './types';
