import { SpiritualProfile } from '@/types';
import { calculateCompatibilityScore, getSpiritualLevel } from './compatibility.utils';
import { formatSpiritualPractices } from './format.utils';
import { validateRequired } from './validation.utils';

// Re-export for backward compatibility
export { calculateCompatibilityScore, getSpiritualLevel, formatSpiritualPractices };

export const validateSpiritualProfile = (profile: Partial<SpiritualProfile>): string[] => {
  const errors: string[] = [];

  // Required field validations
  const requiredFields = [
    { field: 'name', value: profile.name },
    { field: 'age', value: profile.age },
    { field: 'gender', value: profile.gender }
  ];

  requiredFields.forEach(({ field, value }) => {
    const error = validateRequired(value, field);
    if (error) {
      errors.push(error.message);
    }
  });

  // Spiritual practice validation
  if (!profile.spiritualPractices || profile.spiritualPractices.length === 0) {
    errors.push('At least one spiritual practice is required');
  }

  return errors;
};

export const getProfileCompletionPercentage = (profile: SpiritualProfile): number => {
  const fields = [
    profile.name,
    profile.age,
    profile.height,
    profile.motherTongue,
    profile.state,
    profile.city,
    profile.education,
    profile.profession,
    profile.caste,
    profile.religion,
    profile.annualIncome,
    profile.spiritualPractices?.length,
    profile.sacredTexts?.length,
    profile.guruLineage,
    profile.dailySadhana,
    profile.eatingHabits,
    profile.bio,
    profile.photoUrl
  ];

  const filledFields = fields.filter(field => field !== null && field !== undefined && field !== '').length;
  return Math.round((filledFields / fields.length) * 100);
};