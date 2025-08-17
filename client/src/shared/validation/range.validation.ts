
export interface RangeValidationOptions {
  min: number;
  max: number;
  type?: string;
}

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export const validateRange = <T extends number>(
  minValue: T,
  maxValue: T,
  options: RangeValidationOptions
): ValidationResult => {
  const { min, max, type = 'value' } = options;

  if (minValue < min || minValue > max) {
    return {
      isValid: false,
      error: `${type} must be between ${min} and ${max}`
    };
  }

  if (maxValue < min || maxValue > max) {
    return {
      isValid: false,
      error: `${type} must be between ${min} and ${max}`
    };
  }

  if (minValue > maxValue) {
    return {
      isValid: false,
      error: `Minimum ${type} cannot be greater than maximum ${type}`
    };
  }

  return { isValid: true };
};

export const normalizeRange = <T extends number>(
  minValue: T,
  maxValue: T,
  options: RangeValidationOptions
): [T, T] => {
  const { min, max } = options;
  
  const normalizedMin = Math.max(min, Math.min(max, minValue)) as T;
  const normalizedMax = Math.max(normalizedMin, Math.min(max, maxValue)) as T;
  
  return [normalizedMin, normalizedMax];
};
