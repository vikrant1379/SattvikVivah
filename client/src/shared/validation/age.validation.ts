
export const AGE_CONSTRAINTS = {
  MIN: 18,
  MAX: 75,
} as const;

export const validateAge = (age: number): boolean => {
  return age >= AGE_CONSTRAINTS.MIN && age <= AGE_CONSTRAINTS.MAX;
};

export const validateAgeRange = (minAge: number, maxAge: number): { isValid: boolean; error?: string } => {
  if (!validateAge(minAge) || !validateAge(maxAge)) {
    return {
      isValid: false,
      error: `Age must be between ${AGE_CONSTRAINTS.MIN} and ${AGE_CONSTRAINTS.MAX}`
    };
  }

  if (minAge > maxAge) {
    return {
      isValid: false,
      error: 'Minimum age cannot be greater than maximum age'
    };
  }

  return { isValid: true };
};

export const normalizeAge = (age: number): number => {
  return Math.max(AGE_CONSTRAINTS.MIN, Math.min(AGE_CONSTRAINTS.MAX, age));
};
