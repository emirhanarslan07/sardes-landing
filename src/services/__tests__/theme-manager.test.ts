import { ThemeManager } from "../theme-manager";
import { CardTheme } from "@/types/sardes-card";
import { DEFAULT_THEMES } from "@/constants/sardes-card";

describe('ThemeManager', () => {
  let themeManager: ThemeManager;

  beforeEach(() => {
    themeManager = new ThemeManager();
  });

  describe('getAvailableThemes', () => {
    it('should return only free themes for non-premium users', () => {
      const themes = themeManager.getAvailableThemes(false);
      expect(themes.every(theme => !theme.isPremium)).toBe(true);
      expect(themes.length).toBeGreaterThan(0);
    });

    it('should return all themes for premium users', () => {
      const freeThemes = themeManager.getAvailableThemes(false);
      const allThemes = themeManager.getAvailableThemes(true);
      expect(allThemes.length).toBeGreaterThan(freeThemes.length);
      expect(allThemes.some(theme => theme.isPremium)).toBe(true);
    });

    it('should return copies to prevent mutations', () => {
      const themes = themeManager.getAvailableThemes(true);
      const originalTheme = themes[0];
      originalTheme.name = "Modified Name";
      
      const themesAgain = themeManager.getAvailableThemes(true);
      expect(themesAgain[0].name).not.toBe("Modified Name");
    });
  });

  describe('getThemeById', () => {
    it('should return correct theme for valid ID', () => {
      const theme = themeManager.getThemeById("classic-gold", false);
      expect(theme.id).toBe("classic-gold");
      expect(theme.name).toBe("Classic Gold");
    });

    it('should throw error for non-existent theme', () => {
      expect(() => {
        themeManager.getThemeById("non-existent", false);
      }).toThrow('Selected theme not found');
    });

    it('should allow premium themes for premium users', () => {
      const theme = themeManager.getThemeById("premium-black", true);
      expect(theme.isPremium).toBe(true);
    });

    it('should reject premium themes for non-premium users', () => {
      expect(() => {
        themeManager.getThemeById("premium-black", false);
      }).toThrow('Premium subscription required');
    });
  });

  describe('getDefaultTheme', () => {
    it('should return a valid default theme', () => {
      const theme = themeManager.getDefaultTheme();
      expect(theme).toBeDefined();
      expect(theme.isPremium).toBe(false);
      expect(theme.id).toBeDefined();
    });
  });

  describe('addCustomTheme', () => {
    const customTheme: CardTheme = {
      id: "custom-test",
      name: "Custom Test Theme",
      backgroundImage: "https://example.com/bg.jpg",
      primaryColor: "#FF0000",
      secondaryColor: "#00FF00",
      textColor: "#FFFFFF",
      isPremium: false,
    };

    it('should add valid custom theme', () => {
      themeManager.addCustomTheme(customTheme);
      const theme = themeManager.getThemeById("custom-test", false);
      expect(theme.name).toBe("Custom Test Theme");
    });

    it('should throw error for duplicate theme ID', () => {
      themeManager.addCustomTheme(customTheme);
      expect(() => {
        themeManager.addCustomTheme(customTheme);
      }).toThrow('Theme with ID \'custom-test\' already exists');
    });

    it('should validate theme structure', () => {
      const invalidTheme = {
        ...customTheme,
        primaryColor: "invalid-color", // Invalid hex color
      };

      expect(() => {
        themeManager.addCustomTheme(invalidTheme);
      }).toThrow('Primary color must be a valid hex color');
    });
  });

  describe('getThemesByCategory', () => {
    it('should return only free themes when isPremium is false', () => {
      const freeThemes = themeManager.getThemesByCategory(false);
      expect(freeThemes.every(theme => !theme.isPremium)).toBe(true);
    });

    it('should return only premium themes when isPremium is true', () => {
      const premiumThemes = themeManager.getThemesByCategory(true);
      expect(premiumThemes.every(theme => theme.isPremium)).toBe(true);
    });
  });

  describe('searchThemes', () => {
    it('should find themes by name', () => {
      const results = themeManager.searchThemes("gold", false);
      expect(results.some(theme => theme.name.toLowerCase().includes("gold"))).toBe(true);
    });

    it('should be case insensitive', () => {
      const results = themeManager.searchThemes("BLUE", false);
      expect(results.some(theme => theme.name.toLowerCase().includes("blue"))).toBe(true);
    });

    it('should respect premium access', () => {
      const freeResults = themeManager.searchThemes("premium", false);
      const premiumResults = themeManager.searchThemes("premium", true);
      expect(premiumResults.length).toBeGreaterThanOrEqual(freeResults.length);
    });
  });

  describe('getThemeStyles', () => {
    it('should return CSS custom properties', () => {
      const theme = themeManager.getDefaultTheme();
      const styles = themeManager.getThemeStyles(theme);
      
      expect(styles['--card-primary-color']).toBe(theme.primaryColor);
      expect(styles['--card-secondary-color']).toBe(theme.secondaryColor);
      expect(styles['--card-text-color']).toBe(theme.textColor);
      expect(styles['--card-background-image']).toContain(theme.backgroundImage);
    });
  });

  describe('hasGoodReadability', () => {
    it('should return true for light text on dark background', () => {
      const darkTheme: CardTheme = {
        id: "test-dark",
        name: "Test Dark",
        backgroundImage: "test.jpg",
        primaryColor: "#000000",
        secondaryColor: "#333333",
        textColor: "#FFFFFF",
        isPremium: false,
      };

      expect(themeManager.hasGoodReadability(darkTheme)).toBe(true);
    });

    it('should return true for dark text on light background', () => {
      const lightTheme: CardTheme = {
        id: "test-light",
        name: "Test Light",
        backgroundImage: "test.jpg",
        primaryColor: "#FFFFFF",
        secondaryColor: "#CCCCCC",
        textColor: "#000000",
        isPremium: false,
      };

      expect(themeManager.hasGoodReadability(lightTheme)).toBe(true);
    });
  });

  describe('getThemeStats', () => {
    it('should return correct statistics', () => {
      const stats = themeManager.getThemeStats();
      
      expect(stats.total).toBe(DEFAULT_THEMES.length);
      expect(stats.free).toBeGreaterThan(0);
      expect(stats.premium).toBeGreaterThan(0);
      expect(stats.defaultThemes).toBe(DEFAULT_THEMES.length);
      expect(stats.customThemes).toBe(0);
      expect(stats.free + stats.premium).toBe(stats.total);
    });

    it('should update stats when custom themes are added', () => {
      const customTheme: CardTheme = {
        id: "stats-test",
        name: "Stats Test",
        backgroundImage: "https://example.com/bg.jpg",
        primaryColor: "#FF0000",
        secondaryColor: "#00FF00",
        textColor: "#FFFFFF",
        isPremium: false,
      };

      const statsBefore = themeManager.getThemeStats();
      themeManager.addCustomTheme(customTheme);
      const statsAfter = themeManager.getThemeStats();

      expect(statsAfter.total).toBe(statsBefore.total + 1);
      expect(statsAfter.customThemes).toBe(statsBefore.customThemes + 1);
    });
  });
});