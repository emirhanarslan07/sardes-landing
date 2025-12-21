import { CardGeneratorEngine } from "../card-generator";
import { UserData, RiskMetrics } from "@/types/sardes-card";
import { DEFAULT_METRICS } from "@/constants/sardes-card";

describe('CardGeneratorEngine', () => {
  let cardGenerator: CardGeneratorEngine;
  let mockUserData: UserData;

  beforeEach(() => {
    cardGenerator = new CardGeneratorEngine();
    mockUserData = {
      id: "test-user-1",
      userName: "Test User",
      metrics: { ...DEFAULT_METRICS }
    };
  });

  describe('calculateOverallScore', () => {
    it('should calculate correct arithmetic mean of all metrics', () => {
      const metrics: RiskMetrics = {
        riskScore: 88,
        stressManagement: 94,
        consistency: 87,
        postLossRecovery: 91,
        strategyAlignment: 76,
        adaptation: 92,
      };

      const result = cardGenerator.calculateOverallScore(metrics);
      const expected = (88 + 94 + 87 + 91 + 76 + 92) / 6; // 88
      
      expect(result).toBe(Math.round(expected * 10) / 10);
    });

    it('should throw error for invalid metrics', () => {
      const invalidMetrics = {
        ...DEFAULT_METRICS,
        riskScore: 150, // Invalid: > 100
      };

      expect(() => {
        cardGenerator.calculateOverallScore(invalidMetrics);
      }).toThrow('Invalid metrics');
    });
  });

  describe('validateMetrics', () => {
    it('should validate correct metrics', () => {
      const result = cardGenerator.validateMetrics(DEFAULT_METRICS);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should reject metrics outside valid range', () => {
      const invalidMetrics = {
        ...DEFAULT_METRICS,
        stressManagement: -5, // Invalid: < 0
        adaptation: 105, // Invalid: > 100
      };

      const result = cardGenerator.validateMetrics(invalidMetrics);
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });
  });

  describe('generateCard', () => {
    it('should generate valid card with correct overall score', async () => {
      const card = await cardGenerator.generateCard(mockUserData);

      expect(card.id).toBeDefined();
      expect(card.userId).toBe(mockUserData.id);
      expect(card.userName).toBe(mockUserData.userName);
      expect(card.overallScore).toBe(88); // Expected from DEFAULT_METRICS
      expect(card.metrics).toEqual(mockUserData.metrics);
      expect(card.theme).toBeDefined();
      expect(card.createdAt).toBeInstanceOf(Date);
    });

    it('should throw error for invalid user data', async () => {
      const invalidUserData = {
        ...mockUserData,
        userName: "", // Invalid: empty username
      };

      await expect(cardGenerator.generateCard(invalidUserData)).rejects.toThrow('Invalid user data');
    });

    it('should use premium theme when user has premium access', async () => {
      const card = await cardGenerator.generateCard(mockUserData, "premium-black", true);
      expect(card.theme.isPremium).toBe(true);
    });

    it('should reject premium theme for non-premium user', async () => {
      await expect(
        cardGenerator.generateCard(mockUserData, "premium-black", false)
      ).rejects.toThrow('Premium subscription required');
    });
  });

  describe('getAvailableThemes', () => {
    it('should return only free themes for non-premium users', () => {
      const themes = cardGenerator.getAvailableThemes(false);
      expect(themes.every(theme => !theme.isPremium)).toBe(true);
    });

    it('should return all themes for premium users', () => {
      const freeThemes = cardGenerator.getAvailableThemes(false);
      const allThemes = cardGenerator.getAvailableThemes(true);
      expect(allThemes.length).toBeGreaterThan(freeThemes.length);
    });
  });

  describe('updateCard', () => {
    it('should preserve metric accuracy when updating theme', async () => {
      const originalCard = await cardGenerator.generateCard(mockUserData);
      const availableThemes = cardGenerator.getAvailableThemes(false);
      const newTheme = availableThemes[1]; // Different theme

      const updatedCard = cardGenerator.updateCard(originalCard, { theme: newTheme });

      expect(updatedCard.metrics).toEqual(originalCard.metrics);
      expect(updatedCard.overallScore).toBe(originalCard.overallScore);
      expect(updatedCard.theme.id).toBe(newTheme.id);
    });

    it('should update username while preserving metrics', async () => {
      const originalCard = await cardGenerator.generateCard(mockUserData);
      const newUserName = "Updated User Name";

      const updatedCard = cardGenerator.updateCard(originalCard, { userName: newUserName });

      expect(updatedCard.userName).toBe(newUserName);
      expect(updatedCard.metrics).toEqual(originalCard.metrics);
      expect(updatedCard.overallScore).toBe(originalCard.overallScore);
    });
  });
});