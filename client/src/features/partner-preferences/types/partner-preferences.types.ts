
export interface PartnerPreferences {
  ageRange: [number, number];
  heightRange: [string, string];
  education: string[];
  profession: string[];
  religion: string;
  caste: string[];
  motherTongue: string[];
  location: string[];
  annualIncome: string;
  maritalStatus: string[];
  eatingHabits: string[];
  spiritualPractices: string[];
  gunaMatchMin: number;
}

export interface PreferenceValidationResult {
  isValid: boolean;
  errors: string[];
}

export interface RangeValidationOptions {
  min: number;
  max: number;
  type: 'age' | 'height';
}
