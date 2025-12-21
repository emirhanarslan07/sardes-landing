import { CardTheme } from "@/types/sardes-card";

// Metric ranges and validation constants
export const METRIC_RANGES = {
  MIN_VALUE: 0,
  MAX_VALUE: 100,
} as const;

// Default metric values for testing and fallbacks
export const DEFAULT_METRICS = {
  riskScore: 88,
  stressManagement: 94,
  consistency: 87,
  postLossRecovery: 91,
  strategyAlignment: 76,
  adaptation: 92,
} as const;

// Card generation constants
export const CARD_CONSTANTS = {
  GENERATION_TIMEOUT_MS: 3000, // 3 seconds as per requirements
  MIN_USERNAME_LENGTH: 1,
  MAX_USERNAME_LENGTH: 50,
} as const;

// Export dimensions for social media optimization
export const EXPORT_DIMENSIONS = {
  SQUARE: { width: 1080, height: 1080 }, // Instagram square
  LANDSCAPE: { width: 1200, height: 630 }, // Facebook/Twitter
  STORY: { width: 1080, height: 1920 }, // Instagram/Facebook story
} as const;

// Default FIFA-style card themes
export const DEFAULT_THEMES: CardTheme[] = [
  {
    id: "classic-gold",
    name: "Classic Gold",
    backgroundImage: "/themes/classic-gold-bg.jpg",
    primaryColor: "#FFD700",
    secondaryColor: "#FFA500",
    textColor: "#000000",
    isPremium: false,
  },
  {
    id: "modern-blue",
    name: "Modern Blue",
    backgroundImage: "/themes/modern-blue-bg.jpg",
    primaryColor: "#1E40AF",
    secondaryColor: "#3B82F6",
    textColor: "#FFFFFF",
    isPremium: false,
  },
  {
    id: "elegant-purple",
    name: "Elegant Purple",
    backgroundImage: "/themes/elegant-purple-bg.jpg",
    primaryColor: "#7C3AED",
    secondaryColor: "#A855F7",
    textColor: "#FFFFFF",
    isPremium: false,
  },
  {
    id: "premium-black",
    name: "Premium Black",
    backgroundImage: "/themes/premium-black-bg.jpg",
    primaryColor: "#000000",
    secondaryColor: "#374151",
    textColor: "#FFFFFF",
    isPremium: true,
  },
  {
    id: "premium-gradient",
    name: "Premium Gradient",
    backgroundImage: "/themes/premium-gradient-bg.jpg",
    primaryColor: "#EC4899",
    secondaryColor: "#8B5CF6",
    textColor: "#FFFFFF",
    isPremium: true,
  },
];

// Metric display configuration
export const METRIC_CONFIG = {
  riskScore: {
    label: "Risk Skoru",
    suffix: "/100",
    icon: "📊",
  },
  stressManagement: {
    label: "Stres Yönetimi",
    suffix: "%",
    icon: "🧘",
  },
  consistency: {
    label: "Tutarlılık",
    suffix: "%",
    icon: "📈",
  },
  postLossRecovery: {
    label: "Kayıp Sonrası",
    suffix: "%",
    icon: "💪",
  },
  strategyAlignment: {
    label: "Strateji Uyumu",
    suffix: "%",
    icon: "🎯",
  },
  adaptation: {
    label: "Adaptasyon",
    suffix: "%",
    icon: "🔄",
  },
} as const;

// Error messages for validation
export const ERROR_MESSAGES = {
  INVALID_METRIC_RANGE: "Metric values must be between 0 and 100",
  MISSING_USER_DATA: "User data is required for card generation",
  INVALID_USERNAME: "Username must be between 1 and 50 characters",
  THEME_NOT_FOUND: "Selected theme not found",
  PREMIUM_REQUIRED: "Premium subscription required for this theme",
  GENERATION_TIMEOUT: "Card generation timed out",
  EXPORT_FAILED: "Failed to export card image",
} as const;