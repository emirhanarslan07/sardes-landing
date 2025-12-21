import { 
  RiskMetrics, 
  UserData, 
  ValidationResult, 
  RiskMetricsSchema, 
  UserDataSchema 
} from "@/types/sardes-card";
import { METRIC_RANGES, ERROR_MESSAGES } from "@/constants/sardes-card";

/**
 * Validates risk metrics to ensure all values are within valid range (0-100)
 * @param metrics - The risk metrics to validate
 * @returns ValidationResult with isValid flag and error messages
 */
export function validateMetrics(metrics: RiskMetrics): ValidationResult {
  const errors: string[] = [];

  try {
    // Use Zod schema for comprehensive validation
    RiskMetricsSchema.parse(metrics);
  } catch (error) {
    if (error instanceof Error) {
      errors.push(error.message);
    }
  }

  // Additional custom validation
  const metricEntries = Object.entries(metrics) as [keyof RiskMetrics, number][];
  
  for (const [key, value] of metricEntries) {
    if (value < METRIC_RANGES.MIN_VALUE || value > METRIC_RANGES.MAX_VALUE) {
      errors.push(`${key}: ${ERROR_MESSAGES.INVALID_METRIC_RANGE}`);
    }
    
    if (typeof value !== 'number' || isNaN(value)) {
      errors.push(`${key}: Value must be a valid number`);
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Validates user data for card generation
 * @param userData - The user data to validate
 * @returns ValidationResult with isValid flag and error messages
 */
export function validateUserData(userData: UserData): ValidationResult {
  const errors: string[] = [];

  try {
    // Use Zod schema for validation
    UserDataSchema.parse(userData);
  } catch (error) {
    if (error instanceof Error) {
      errors.push(error.message);
    }
  }

  // Additional username validation
  if (!userData.userName || userData.userName.trim().length === 0) {
    errors.push(ERROR_MESSAGES.INVALID_USERNAME);
  }

  // Validate nested metrics
  const metricsValidation = validateMetrics(userData.metrics);
  if (!metricsValidation.isValid) {
    errors.push(...metricsValidation.errors);
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Calculates the overall score as arithmetic mean of all six risk metrics
 * @param metrics - The risk metrics to calculate from
 * @returns The calculated overall score (0-100)
 */
export function calculateOverallScore(metrics: RiskMetrics): number {
  const validation = validateMetrics(metrics);
  
  if (!validation.isValid) {
    throw new Error(`Invalid metrics: ${validation.errors.join(', ')}`);
  }

  const values = [
    metrics.riskScore,
    metrics.stressManagement,
    metrics.consistency,
    metrics.postLossRecovery,
    metrics.strategyAlignment,
    metrics.adaptation,
  ];

  const sum = values.reduce((acc, value) => acc + value, 0);
  const average = sum / values.length;
  
  // Round to 1 decimal place and ensure it's within valid range
  return Math.round(average * 10) / 10;
}

/**
 * Checks if all required fields are present for card generation
 * @param userData - User data to check
 * @returns boolean indicating if data is complete
 */
export function isDataComplete(userData: Partial<UserData>): userData is UserData {
  return !!(
    userData.id &&
    userData.userName &&
    userData.metrics &&
    typeof userData.metrics.riskScore === 'number' &&
    typeof userData.metrics.stressManagement === 'number' &&
    typeof userData.metrics.consistency === 'number' &&
    typeof userData.metrics.postLossRecovery === 'number' &&
    typeof userData.metrics.strategyAlignment === 'number' &&
    typeof userData.metrics.adaptation === 'number'
  );
}