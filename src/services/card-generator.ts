import { 
  SardesCard, 
  UserData, 
  CardTheme, 
  ValidationResult,
  RiskMetrics 
} from "@/types/sardes-card";
import { 
  validateUserData, 
  validateMetrics, 
  calculateOverallScore 
} from "@/utils/sardes-card-validation";
import { 
  DEFAULT_THEMES, 
  ERROR_MESSAGES, 
  CARD_CONSTANTS 
} from "@/constants/sardes-card";
import { v4 as uuidv4 } from "uuid";

/**
 * Card Generator Engine - Core component for creating Sardes Cards
 */
export class CardGeneratorEngine {
  private themes: CardTheme[] = DEFAULT_THEMES;

  /**
   * Generates a new Sardes Card from user data and theme
   * @param userData - User data including metrics and personal info
   * @param themeId - Optional theme ID, defaults to first available theme
   * @param isPremiumUser - Whether user has premium access
   * @returns Promise<SardesCard> - Generated card
   * @throws Error if validation fails or generation times out
   */
  async generateCard(
    userData: UserData, 
    themeId?: string, 
    isPremiumUser: boolean = false
  ): Promise<SardesCard> {
    const startTime = Date.now();

    try {
      // Validate user data first
      const userValidation = validateUserData(userData);
      if (!userValidation.isValid) {
        throw new Error(`Invalid user data: ${userValidation.errors.join(', ')}`);
      }

      // Get and validate theme
      const theme = this.getTheme(themeId, isPremiumUser);
      
      // Calculate overall score
      const overallScore = calculateOverallScore(userData.metrics);

      // Check generation timeout (3 seconds requirement)
      const elapsedTime = Date.now() - startTime;
      if (elapsedTime > CARD_CONSTANTS.GENERATION_TIMEOUT_MS) {
        throw new Error(ERROR_MESSAGES.GENERATION_TIMEOUT);
      }

      // Create the card
      const card: SardesCard = {
        id: uuidv4(),
        userId: userData.id,
        userName: userData.userName.trim(),
        overallScore,
        metrics: { ...userData.metrics }, // Deep copy to prevent mutations
        theme: { ...theme }, // Deep copy theme
        createdAt: new Date(),
      };

      return card;

    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Card generation failed: ${error.message}`);
      }
      throw new Error('Unknown error during card generation');
    }
  }

  /**
   * Validates risk metrics and returns validation result
   * @param metrics - Risk metrics to validate
   * @returns ValidationResult with validation status and errors
   */
  validateMetrics(metrics: RiskMetrics): ValidationResult {
    return validateMetrics(metrics);
  }

  /**
   * Calculates overall score from risk metrics
   * @param metrics - Risk metrics to calculate from
   * @returns Calculated overall score (0-100)
   */
  calculateOverallScore(metrics: RiskMetrics): number {
    return calculateOverallScore(metrics);
  }

  /**
   * Gets available themes based on user premium status
   * @param isPremiumUser - Whether user has premium access
   * @returns Array of available themes
   */
  getAvailableThemes(isPremiumUser: boolean = false): CardTheme[] {
    if (isPremiumUser) {
      return [...this.themes]; // All themes for premium users
    }
    return this.themes.filter(theme => !theme.isPremium); // Only free themes
  }

  /**
   * Gets a specific theme by ID with premium access validation
   * @param themeId - Theme ID to retrieve
   * @param isPremiumUser - Whether user has premium access
   * @returns CardTheme object
   * @throws Error if theme not found or premium required
   */
  private getTheme(themeId?: string, isPremiumUser: boolean = false): CardTheme {
    // Use first available theme if no ID provided
    if (!themeId) {
      const availableThemes = this.getAvailableThemes(isPremiumUser);
      if (availableThemes.length === 0) {
        throw new Error('No themes available');
      }
      return availableThemes[0];
    }

    // Find specific theme
    const theme = this.themes.find(t => t.id === themeId);
    if (!theme) {
      throw new Error(ERROR_MESSAGES.THEME_NOT_FOUND);
    }

    // Check premium access
    if (theme.isPremium && !isPremiumUser) {
      throw new Error(ERROR_MESSAGES.PREMIUM_REQUIRED);
    }

    return theme;
  }

  /**
   * Adds a new theme to the available themes
   * @param theme - Theme to add
   */
  addTheme(theme: CardTheme): void {
    // Validate theme doesn't already exist
    const existingTheme = this.themes.find(t => t.id === theme.id);
    if (existingTheme) {
      throw new Error(`Theme with ID '${theme.id}' already exists`);
    }

    this.themes.push({ ...theme });
  }

  /**
   * Updates user data while preserving metric accuracy during customization
   * @param originalCard - Original card data
   * @param updates - Partial updates to apply
   * @param isPremiumUser - Whether user has premium access
   * @returns Updated card with preserved metrics
   */
  updateCard(
    originalCard: SardesCard, 
    updates: Partial<Pick<SardesCard, 'userName' | 'theme'>>,
    isPremiumUser: boolean = false
  ): SardesCard {
    const updatedCard = { ...originalCard };

    // Update username if provided
    if (updates.userName !== undefined) {
      if (updates.userName.trim().length === 0) {
        throw new Error(ERROR_MESSAGES.INVALID_USERNAME);
      }
      updatedCard.userName = updates.userName.trim();
    }

    // Update theme if provided
    if (updates.theme) {
      const theme = this.getTheme(updates.theme.id, isPremiumUser);
      updatedCard.theme = { ...theme };
    }

    // Preserve metric accuracy - recalculate overall score to ensure consistency
    updatedCard.overallScore = calculateOverallScore(originalCard.metrics);

    return updatedCard;
  }

  /**
   * Batch generates multiple cards for testing or bulk operations
   * @param userDataList - Array of user data
   * @param themeId - Optional theme ID for all cards
   * @param isPremiumUser - Whether user has premium access
   * @returns Promise<SardesCard[]> - Array of generated cards
   */
  async batchGenerateCards(
    userDataList: UserData[], 
    themeId?: string, 
    isPremiumUser: boolean = false
  ): Promise<SardesCard[]> {
    const cards: SardesCard[] = [];
    const errors: string[] = [];

    for (const userData of userDataList) {
      try {
        const card = await this.generateCard(userData, themeId, isPremiumUser);
        cards.push(card);
      } catch (error) {
        if (error instanceof Error) {
          errors.push(`Failed to generate card for user ${userData.id}: ${error.message}`);
        }
      }
    }

    if (errors.length > 0 && cards.length === 0) {
      throw new Error(`Batch generation failed: ${errors.join('; ')}`);
    }

    return cards;
  }
}