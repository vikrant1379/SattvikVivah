
import { AGE_CONSTRAINTS, VALIDATION_MESSAGES } from '../constants/partner-preferences.constants';
import { heightOptions } from '@/data/static-options';
import type { PreferenceValidationResult, RangeValidationOptions } from '../types/partner-preferences.types';

export const validateAgeRange = (minAge: number, maxAge: number): PreferenceValidationResult => {
  const errors: string[] = [];

  if (minAge < AGE_CONSTRAINTS.MIN || minAge > AGE_CONSTRAINTS.MAX) {
    errors.push(VALIDATION_MESSAGES.AGE_OUT_OF_BOUNDS);
  }

  if (maxAge < AGE_CONSTRAINTS.MIN || maxAge > AGE_CONSTRAINTS.MAX) {
    errors.push(VALIDATION_MESSAGES.AGE_OUT_OF_BOUNDS);
  }

  if (minAge > maxAge) {
    errors.push(VALIDATION_MESSAGES.AGE_RANGE_INVALID);
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

export const validateHeightRange = (minHeight: string, maxHeight: string): PreferenceValidationResult => {
  const errors: string[] = [];
  
  const minHeightIndex = heightOptions.indexOf(minHeight);
  const maxHeightIndex = heightOptions.indexOf(maxHeight);

  if (minHeightIndex === -1 || maxHeightIndex === -1) {
    errors.push('Invalid height selection');
  }

  if (minHeightIndex > maxHeightIndex) {
    errors.push(VALIDATION_MESSAGES.HEIGHT_RANGE_INVALID);
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

export const validateRange = (min: number, max: number, options: RangeValidationOptions): PreferenceValidationResult => {
  const errors: string[] = [];

  if (min < options.min || min > options.max) {
    errors.push(`${options.type} must be between ${options.min} and ${options.max}`);
  }

  if (max < options.min || max > options.max) {
    errors.push(`${options.type} must be between ${options.min} and ${options.max}`);
  }

  if (min > max) {
    errors.push(`Minimum ${options.type} cannot be greater than maximum ${options.type}`);
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};
