import { SpiritualProfile } from '@/types';
import { COMPATIBILITY_WEIGHTS, SPIRITUAL_LEVELS } from '@/constants';

export const calculateCompatibilityScore = (
  profile1: SpiritualProfile,
  profile2: SpiritualProfile
): number => {
  let totalScore = 0;
  let maxScore = 0;

  // Spiritual practices compatibility (25 points)
  const practices1 = profile1.spiritualPractices || [];
  const practices2 = profile2.spiritualPractices || [];
  const commonPractices = practices1.filter(p => practices2.includes(p));
  const practicesScore = (commonPractices.length / Math.max(practices1.length, practices2.length, 1)) * COMPATIBILITY_WEIGHTS.SPIRITUAL_PRACTICES;
  totalScore += practicesScore;
  maxScore += COMPATIBILITY_WEIGHTS.SPIRITUAL_PRACTICES;

  // Astrological compatibility (20 points)
  if (profile1.gunaScore && profile2.gunaScore) {
    const gunaCompatibility = Math.min(profile1.gunaScore, profile2.gunaScore) / 36;
    totalScore += gunaCompatibility * 20;
    maxScore += 20;
  }

  // Vedic lifestyle alignment (15 points)
  if (profile1.ayurvedicConstitution && profile2.ayurvedicConstitution) {
    const constitutionMatch = profile1.ayurvedicConstitution === profile2.ayurvedicConstitution ? 15 : 8;
    totalScore += constitutionMatch;
    maxScore += 15;
  }

  // Dharmic goals alignment (15 points)
  const goals1 = profile1.spiritualGoals || [];
  const goals2 = profile2.spiritualGoals || [];
  const commonGoals = goals1.filter(g => goals2.includes(g));
  const goalsScore = (commonGoals.length / Math.max(goals1.length, goals2.length, 1)) * 15;
  totalScore += goalsScore;
  maxScore += 15;

  // Community & lineage (10 points)
  if (profile1.guruLineage && profile2.guruLineage) {
    const lineageMatch = profile1.guruLineage === profile2.guruLineage ? 10 : 5;
    totalScore += lineageMatch;
    maxScore += 10;
  }

  // Sacred texts compatibility (15 points)
  const texts1 = profile1.sacredTexts || [];
  const texts2 = profile2.sacredTexts || [];
  const commonTexts = texts1.filter(t => texts2.includes(t));
  const textsScore = (commonTexts.length / Math.max(texts1.length, texts2.length, 1)) * COMPATIBILITY_WEIGHTS.SACRED_TEXTS;
  totalScore += textsScore;
  maxScore += COMPATIBILITY_WEIGHTS.SACRED_TEXTS;

  return Math.round((totalScore / maxScore) * 100);
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