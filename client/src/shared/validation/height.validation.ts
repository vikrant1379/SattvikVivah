
import { heightOptions } from '@/data/static-options';

export const validateHeightOption = (height: string): boolean => {
  return heightOptions.includes(height);
};

export const validateHeightRange = (minHeight: string, maxHeight: string): { isValid: boolean; error?: string } => {
  if (!validateHeightOption(minHeight) || !validateHeightOption(maxHeight)) {
    return {
      isValid: false,
      error: 'Invalid height selection'
    };
  }

  const minIndex = heightOptions.indexOf(minHeight);
  const maxIndex = heightOptions.indexOf(maxHeight);

  if (minIndex > maxIndex) {
    return {
      isValid: false,
      error: 'Minimum height cannot be greater than maximum height'
    };
  }

  return { isValid: true };
};

export const getHeightIndex = (height: string): number => {
  return heightOptions.indexOf(height);
};

export const filterHeightOptionsFromMin = (minHeight: string): string[] => {
  const minIndex = getHeightIndex(minHeight);
  return heightOptions.filter((_, index) => index >= minIndex);
};
