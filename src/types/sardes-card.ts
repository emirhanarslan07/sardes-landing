import { z } from "zod";

// Risk Metrics Interface - 6 key performance indicators
export interface RiskMetrics {
  riskScore: number;        // 0-100 (displayed as XX/100)
  stressManagement: number; // 0-100 (displayed as XX%)
  consistency: number;      // 0-100 (displayed as XX%)
  postLossRecovery: number; // 0-100 (displayed as XX%)
  strategyAlignment: number; // 0-100 (displayed as XX%)
  adaptation: number;       // 0-100 (displayed as XX%)
}

// Card Theme Interface for visual customization
export interface CardTheme {
  id: string;
  name: string;
  backgroundImage: string;
  primaryColor: string;
  secondaryColor: string;
  textColor: string;
  isPremium: boolean;
}

// Main Sardes Card Interface
export interface SardesCard {
  id: string;
  userId: string;
  userName: string;
  overallScore: number;     // Calculated arithmetic mean of all metrics
  metrics: RiskMetrics;
  theme: CardTheme;
  createdAt: Date;
  imageUrl?: string;        // Optional exported image URL
}

// User Card Collection Interface
export interface UserCardCollection {
  userId: string;
  cards: SardesCard[];
  totalCards: number;
  latestCard?: SardesCard;
}

// Additional interfaces for system functionality
export interface UserData {
  id: string;
  userName: string;
  metrics: RiskMetrics;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export type ExportFormat = 'png' | 'jpeg' | 'webp';
export type SocialPlatform = 'twitter' | 'linkedin' | 'instagram' | 'facebook';

// Zod Validation Schemas for type safety and runtime validation
export const RiskMetricsSchema = z.object({
  riskScore: z.number().min(0).max(100),
  stressManagement: z.number().min(0).max(100),
  consistency: z.number().min(0).max(100),
  postLossRecovery: z.number().min(0).max(100),
  strategyAlignment: z.number().min(0).max(100),
  adaptation: z.number().min(0).max(100),
});

export const CardThemeSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  backgroundImage: z.string().url(),
  primaryColor: z.string().regex(/^#[0-9A-F]{6}$/i),
  secondaryColor: z.string().regex(/^#[0-9A-F]{6}$/i),
  textColor: z.string().regex(/^#[0-9A-F]{6}$/i),
  isPremium: z.boolean(),
});

export const SardesCardSchema = z.object({
  id: z.string().min(1),
  userId: z.string().min(1),
  userName: z.string().min(1),
  overallScore: z.number().min(0).max(100),
  metrics: RiskMetricsSchema,
  theme: CardThemeSchema,
  createdAt: z.date(),
  imageUrl: z.string().url().optional(),
});

export const UserDataSchema = z.object({
  id: z.string().min(1),
  userName: z.string().min(1),
  metrics: RiskMetricsSchema,
});