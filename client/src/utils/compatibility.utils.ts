
import { SpiritualProfile } from '@/types';
import { COMPATIBILITY_WEIGHTS, SPIRITUAL_LEVELS } from '@/constants';

export const calculateCompatibilityScore = (
  profile1: SpiritualProfile,
  profile2: SpiritualProfile
): number => {
  let score = 0;
  let totalFactors = 0;

  // Spiritual practices compatibility
  if ((profile1.spiritualPractices || []).length > 0 && (profile2.spiritualPractices || []).length > 0) {
    const practices1 = new Set(profile1.spiritualPractices || []);
    const practices2 = new Set(profile2.spiritualPractices || []);
    const commonPractices = new Set([...practices1].filter(x => practices2.has(x)));
    const practicesScore = (commonPractices.size / Math.max(practices1.size, practices2.size)) * COMPATIBILITY_WEIGHTS.SPIRITUAL_PRACTICES;
    score += practicesScore;
    totalFactors += COMPATIBILITY_WEIGHTS.SPIRITUAL_PRACTICES;
  }

  // Sacred texts compatibility
  if ((profile1.sacredTexts || []).length > 0 && (profile2.sacredTexts || []).length > 0) {
    const texts1 = new Set(profile1.sacredTexts || []);
    const texts2 = new Set(profile2.sacredTexts || []);
    const commonTexts = new Set([...texts1].filter(x => texts2.has(x)));
    const textsScore = (commonTexts.size / Math.max(texts1.size, texts2.size)) * COMPATIBILITY_WEIGHTS.SACRED_TEXTS;
    score += textsScore;
    totalFactors += COMPATIBILITY_WEIGHTS.SACRED_TEXTS;
  }

  // Guru lineage compatibility
  if (profile1.guruLineage && profile2.guruLineage) {
    const lineageScore = profile1.guruLineage === profile2.guruLineage ? COMPATIBILITY_WEIGHTS.GURU_LINEAGE : 0;
    score += lineageScore;
    totalFactors += COMPATIBILITY_WEIGHTS.GURU_LINEAGE;
  }

  // Daily sadhana compatibility
  if (profile1.dailySadhana && profile2.dailySadhana) {
    const sadhanaScore = profile1.dailySadhana === profile2.dailySadhana ? COMPATIBILITY_WEIGHTS.DAILY_SADHANA : 0;
    score += sadhanaScore;
    totalFactors += COMPATIBILITY_WEIGHTS.DAILY_SADHANA;
  }

  // Dietary lifestyle compatibility
  if (profile1.eatingHabits && profile2.eatingHabits) {
    const dietScore = profile1.eatingHabits === profile2.eatingHabits ? COMPATIBILITY_WEIGHTS.DIETARY_LIFESTYLE : 0;
    score += dietScore;
    totalFactors += COMPATIBILITY_WEIGHTS.DIETARY_LIFESTYLE;
  }

  // Location proximity
  if (profile1.state && profile2.state) {
    const locationScore = profile1.state === profile2.state ? COMPATIBILITY_WEIGHTS.LOCATION_PROXIMITY : 0;
    score += locationScore;
    totalFactors += COMPATIBILITY_WEIGHTS.LOCATION_PROXIMITY;
  }

  return totalFactors > 0 ? Math.round((score / totalFactors) * 100) : 0;
};

export const getSpiritualLevel = (profile: SpiritualProfile): string => {
  let level = 0;
  
  if ((profile.spiritualPractices || []).length > 0) level++;
  if ((profile.sacredTexts || []).length > 0) level++;
  if (profile.guruLineage) level++;
  if (profile.dailySadhana) level++;
  if (profile.sevaActivities) level++;
  if (profile.dharmaGoals) level++;

  if (level >= 5) return SPIRITUAL_LEVELS.ADVANCED_PRACTITIONER;
  if (level >= 3) return SPIRITUAL_LEVELS.REGULAR_PRACTITIONER;
  if (level >= 1) return SPIRITUAL_LEVELS.BEGINNER;
  return SPIRITUAL_LEVELS.EXPLORER;
};

export const getCompatibilityLabel = (score: number): string => {
  if (score >= 90) return 'Excellent Match';
  if (score >= 80) return 'Very Good Match';
  if (score >= 70) return 'Good Match';
  if (score >= 60) return 'Fair Match';
  return 'Limited Match';
};

export const getCompatibilityColor = (score: number): string => {
  if (score >= 90) return 'text-green-600';
  if (score >= 80) return 'text-green-500';
  if (score >= 70) return 'text-yellow-500';
  if (score >= 60) return 'text-orange-500';
  return 'text-red-500';
};
