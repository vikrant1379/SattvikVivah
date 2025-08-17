
export const AGE_CONSTRAINTS = {
  MIN: 18,
  MAX: 75,
} as const;

export const VALIDATION_MESSAGES = {
  AGE_RANGE_INVALID: 'Minimum age cannot be greater than maximum age',
  HEIGHT_RANGE_INVALID: 'Minimum height cannot be greater than maximum height',
  AGE_OUT_OF_BOUNDS: `Age must be between ${AGE_CONSTRAINTS.MIN} and ${AGE_CONSTRAINTS.MAX}`,
} as const;

export const DEFAULT_PREFERENCES: PartnerPreferences = {
  ageRange: [25, 35],
  heightRange: ['5\'0"', '6\'0"'],
  education: [],
  profession: [],
  religion: 'Hindu',
  caste: [],
  motherTongue: [],
  location: [],
  annualIncome: 'Rs. 5 - 8 Lakh p.a',
  maritalStatus: ['Never Married'],
  eatingHabits: ['Vegetarian'],
  spiritualPractices: [],
  gunaMatchMin: 18
};
