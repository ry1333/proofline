import { ReactNode } from 'react';

export interface BaseProps {
  className?: string;
  children?: ReactNode;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface Metric {
  label: string;
  value: string;
  trend: 'up' | 'down' | 'neutral';
  trendValue: string;
}

export interface CaseStudy {
  client: string;
  industry: string;
  goal: string;
  outcome: string;
  image?: string;
}

export interface PricingTier {
  name: string;
  price: string;
  description: string;
  features: string[];
  isPopular?: boolean;
}