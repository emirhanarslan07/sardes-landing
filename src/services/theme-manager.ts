import { CardTheme } from "@/types/sardes-card";
import { DEFAULT_THEMES, ERROR_MESSAGES } from "@/constants/sardes-card";

/**
 * Theme Manager - Handles card visual themes and customization options
 */
export class ThemeManager {
  private themes: CardTheme[] = [...DEFAULT_THEMES];

  /**
   * Gets all available themes based on user premium status
   * @param isPremiumUser - Whether user has premium access
   * @returns Array of available themes
   */
  getAvailableThemes(isPremiumUser: boolean = false): CardTheme[] {
    if (isPremiumUser) {
      return this.themes.map(theme => ({ ...theme })); // Deep copy to prevent mutations
    }
    return this.themes.filter(theme => !theme.isPremium).map(theme => ({ ...theme }));
  }

  /**
   * Gets a specific theme by ID with premium access validation
   * @param themeId - Theme ID to retrieve
   * @param isPremiumUser - Whether user has premium access
   * @returns CardTheme object
   * @throws Error if theme not found or premium required
   */
  getThemeById(themeId: string, isPremiumUser: boolean = false): CardTheme {
    const theme = this.themes.find(t => t.id === themeId);
    
    if (!theme) {
      throw new Error(ERROR_MESSAGES.THEME_NOT_FOUND);
    }

    if (theme.isPremium && !isPremiumUser) {
      throw new Error(ERROR_MESSAGES.PREMIUM_REQUIRED);
    }

    return { ...theme }; // Return copy to prevent mutations
  }

  /**
   * Gets the default theme for non-premium users
   * @returns Default CardTheme
   */
  getDefaultTheme(): CardTheme {
    const freeThemes = this.getAvailableThemes(false);
    if (freeThemes.length === 0) {
      throw new Error('No free themes available');
    }
    return { ...freeThemes[0] };
  }

  /**
   * Adds a new custom theme
   * @param theme - Theme to add
   * @throws Error if theme ID already exists
   */
  addCustomTheme(theme: CardTheme): void {
    const existingTheme = this.themes.find(t => t.id === theme.id);
    if (existingTheme) {
      throw new Error(`Theme with ID '${theme.id}' already exists`);
    }

    // Validate theme structure
    this.validateTheme(theme);
    
    this.themes.push({ ...theme });
  }

  /**
   * Updates an existing theme
   * @param themeId - ID of theme to update
   * @param updates - Partial theme updates
   * @throws Error if theme not found
   */
  updateTheme(themeId: string, updates: Partial<Omit<CardTheme, 'id'>>): CardTheme {
    const themeIndex = this.themes.findIndex(t => t.id === themeId);
    if (themeIndex === -1) {
      throw new Error(ERROR_MESSAGES.THEME_NOT_FOUND);
    }

    const updatedTheme = {
      ...this.themes[themeIndex],
      ...updates,
    };

    this.validateTheme(updatedTheme);
    this.themes[themeIndex] = updatedTheme;

    return { ...updatedTheme };
  }

  /**
   * Removes a custom theme (cannot remove default themes)
   * @param themeId - ID of theme to remove
   * @throws Error if theme not found or is default theme
   */
  removeTheme(themeId: string): void {
    const themeIndex = this.themes.findIndex(t => t.id === themeId);
    if (themeIndex === -1) {
      throw new Error(ERROR_MESSAGES.THEME_NOT_FOUND);
    }

    // Prevent removal of default themes
    const isDefaultTheme = DEFAULT_THEMES.some(t => t.id === themeId);
    if (isDefaultTheme) {
      throw new Error('Cannot remove default themes');
    }

    this.themes.splice(themeIndex, 1);
  }

  /**
   * Gets themes by category (free/premium)
   * @param isPremium - Whether to get premium themes
   * @returns Array of themes in the specified category
   */
  getThemesByCategory(isPremium: boolean): CardTheme[] {
    return this.themes
      .filter(theme => theme.isPremium === isPremium)
      .map(theme => ({ ...theme }));
  }

  /**
   * Searches themes by name
   * @param searchTerm - Search term to match against theme names
   * @param isPremiumUser - Whether user has premium access
   * @returns Array of matching themes
   */
  searchThemes(searchTerm: string, isPremiumUser: boolean = false): CardTheme[] {
    const availableThemes = this.getAvailableThemes(isPremiumUser);
    const searchLower = searchTerm.toLowerCase();
    
    return availableThemes.filter(theme => 
      theme.name.toLowerCase().includes(searchLower)
    );
  }

  /**
   * Validates theme structure and properties
   * @param theme - Theme to validate
   * @throws Error if theme is invalid
   */
  private validateTheme(theme: CardTheme): void {
    if (!theme.id || theme.id.trim().length === 0) {
      throw new Error('Theme ID is required');
    }

    if (!theme.name || theme.name.trim().length === 0) {
      throw new Error('Theme name is required');
    }

    // Validate color format (hex colors)
    const colorRegex = /^#[0-9A-F]{6}$/i;
    if (!colorRegex.test(theme.primaryColor)) {
      throw new Error('Primary color must be a valid hex color');
    }
    if (!colorRegex.test(theme.secondaryColor)) {
      throw new Error('Secondary color must be a valid hex color');
    }
    if (!colorRegex.test(theme.textColor)) {
      throw new Error('Text color must be a valid hex color');
    }

    // Validate background image URL
    if (!theme.backgroundImage || theme.backgroundImage.trim().length === 0) {
      throw new Error('Background image URL is required');
    }
  }

  /**
   * Applies theme to card element styles
   * @param theme - Theme to apply
   * @returns CSS style object
   */
  getThemeStyles(theme: CardTheme): Record<string, string> {
    return {
      '--card-primary-color': theme.primaryColor,
      '--card-secondary-color': theme.secondaryColor,
      '--card-text-color': theme.textColor,
      '--card-background-image': `url(${theme.backgroundImage})`,
    };
  }

  /**
   * Checks if a theme provides good contrast for readability
   * @param theme - Theme to check
   * @returns boolean indicating if theme has good readability
   */
  hasGoodReadability(theme: CardTheme): boolean {
    // Simple contrast check - in real implementation, you'd use proper contrast ratio calculation
    const textColor = theme.textColor.toLowerCase();
    const primaryColor = theme.primaryColor.toLowerCase();
    
    // Basic check: light text on dark background or dark text on light background
    const isLightText = textColor === '#ffffff' || textColor === '#fff';
    const isDarkPrimary = this.isColorDark(primaryColor);
    const isDarkText = textColor === '#000000' || textColor === '#000';
    const isLightPrimary = !isDarkPrimary;
    
    return (isLightText && isDarkPrimary) || (isDarkText && isLightPrimary);
  }

  /**
   * Simple helper to determine if a color is dark
   * @param hexColor - Hex color string
   * @returns boolean indicating if color is dark
   */
  private isColorDark(hexColor: string): boolean {
    const hex = hexColor.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    
    // Calculate luminance (simplified)
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance < 0.5;
  }

  /**
   * Gets theme statistics
   * @returns Object with theme counts and categories
   */
  getThemeStats(): {
    total: number;
    free: number;
    premium: number;
    defaultThemes: number;
    customThemes: number;
  } {
    const freeThemes = this.themes.filter(t => !t.isPremium);
    const premiumThemes = this.themes.filter(t => t.isPremium);
    const defaultThemeIds = DEFAULT_THEMES.map(t => t.id);
    const customThemes = this.themes.filter(t => !defaultThemeIds.includes(t.id));

    return {
      total: this.themes.length,
      free: freeThemes.length,
      premium: premiumThemes.length,
      defaultThemes: DEFAULT_THEMES.length,
      customThemes: customThemes.length,
    };
  }
}