import { SpiritualProfile } from '@/types';

// Consciousness-based compatibility weights
const COMPATIBILITY_WEIGHTS = {
  SPIRITUAL_PRACTICES: 20,
  SACRED_TEXTS: 15,
  ASTROLOGICAL: 20,
  VEDIC_LIFESTYLE: 15,
  DHARMIC_GOALS: 15,
  COMMUNITY_LINEAGE: 10,
  CONSCIOUSNESS_LEVEL: 5
};

export const calculateCompatibilityScore = (
  profile1: SpiritualProfile,
  profile2: SpiritualProfile
): number => {
  let totalScore = 0;
  let maxScore = 0;

  // 1. Spiritual practices compatibility (20 points)
  const practices1 = profile1.spiritualPractices || [];
  const practices2 = profile2.spiritualPractices || [];
  if (practices1.length > 0 && practices2.length > 0) {
    const commonPractices = practices1.filter(p => practices2.includes(p));
    const practicesScore = (commonPractices.length / Math.max(practices1.length, practices2.length)) * COMPATIBILITY_WEIGHTS.SPIRITUAL_PRACTICES;
    totalScore += practicesScore;
  }
  maxScore += COMPATIBILITY_WEIGHTS.SPIRITUAL_PRACTICES;

  // 2. Astrological compatibility (20 points)
  if (profile1.gunaScore && profile2.gunaScore) {
    const avgGuna = (profile1.gunaScore + profile2.gunaScore) / 2;
    const gunaCompatibility = (avgGuna / 36) * COMPATIBILITY_WEIGHTS.ASTROLOGICAL;
    totalScore += gunaCompatibility;
  } else if (profile1.manglikStatus && profile2.manglikStatus) {
    // Basic manglik compatibility if guna scores not available
    const manglikCompatible = (profile1.manglikStatus === profile2.manglikStatus) ||
                             (profile1.manglikStatus === 'Anshik' || profile2.manglikStatus === 'Anshik');
    totalScore += manglikCompatible ? 15 : 5;
  }
  maxScore += COMPATIBILITY_WEIGHTS.ASTROLOGICAL;

  // 3. Vedic lifestyle alignment (15 points)
  let lifestyleScore = 0;
  if (profile1.ayurvedicConstitution && profile2.ayurvedicConstitution) {
    const constitutionMatch = profile1.ayurvedicConstitution === profile2.ayurvedicConstitution ? 8 : 
                             isComplementaryConstitution(profile1.ayurvedicConstitution, profile2.ayurvedicConstitution) ? 6 : 3;
    lifestyleScore += constitutionMatch;
  }
  
  // Fasting practices alignment
  const fasting1 = profile1.fastingPractices || [];
  const fasting2 = profile2.fastingPractices || [];
  if (fasting1.length > 0 && fasting2.length > 0) {
    const commonFasting = fasting1.filter(f => fasting2.includes(f));
    lifestyleScore += (commonFasting.length / Math.max(fasting1.length, fasting2.length)) * 7;
  }
  
  totalScore += lifestyleScore;
  maxScore += COMPATIBILITY_WEIGHTS.VEDIC_LIFESTYLE;

  // 4. Dharmic goals alignment (15 points)
  let dharmicScore = 0;
  
  // Ashrama goals
  const ashramas1 = profile1.ashramsGoals || [];
  const ashramas2 = profile2.ashramsGoals || [];
  if (ashramas1.length > 0 && ashramas2.length > 0) {
    const commonAshramas = ashramas1.filter(a => ashramas2.includes(a));
    dharmicScore += (commonAshramas.length / Math.max(ashramas1.length, ashramas2.length)) * 8;
  }
  
  // Spiritual goals
  const goals1 = profile1.spiritualGoals || [];
  const goals2 = profile2.spiritualGoals || [];
  if (goals1.length > 0 && goals2.length > 0) {
    const commonGoals = goals1.filter(g => goals2.includes(g));
    dharmicScore += (commonGoals.length / Math.max(goals1.length, goals2.length)) * 7;
  }
  
  totalScore += dharmicScore;
  maxScore += COMPATIBILITY_WEIGHTS.DHARMIC_GOALS;

  // 5. Community & lineage (10 points)
  let communityScore = 0;
  if (profile1.discipleLineage && profile2.discipleLineage) {
    const lineageMatch = profile1.discipleLineage === profile2.discipleLineage ? 6 : 3;
    communityScore += lineageMatch;
  }
  
  const satsang1 = profile1.satsangCommunity || [];
  const satsang2 = profile2.satsangCommunity || [];
  if (satsang1.length > 0 && satsang2.length > 0) {
    const commonSatsang = satsang1.filter(s => satsang2.includes(s));
    communityScore += (commonSatsang.length > 0) ? 4 : 0;
  }
  
  totalScore += communityScore;
  maxScore += COMPATIBILITY_WEIGHTS.COMMUNITY_LINEAGE;

  // 6. Sacred texts compatibility (15 points)
  const texts1 = profile1.sacredTexts || [];
  const texts2 = profile2.sacredTexts || [];
  if (texts1.length > 0 && texts2.length > 0) {
    const commonTexts = texts1.filter(t => texts2.includes(t));
    const textsScore = (commonTexts.length / Math.max(texts1.length, texts2.length)) * COMPATIBILITY_WEIGHTS.SACRED_TEXTS;
    totalScore += textsScore;
  }
  maxScore += COMPATIBILITY_WEIGHTS.SACRED_TEXTS;

  // 7. Consciousness level compatibility (5 points)
  const consciousness1 = calculateConsciousnessLevel(profile1);
  const consciousness2 = calculateConsciousnessLevel(profile2);
  const consciousnessCompatibility = 1 - (Math.abs(consciousness1 - consciousness2) / 4); // 4 levels max difference
  totalScore += consciousnessCompatibility * COMPATIBILITY_WEIGHTS.CONSCIOUSNESS_LEVEL;
  maxScore += COMPATIBILITY_WEIGHTS.CONSCIOUSNESS_LEVEL;

  return Math.round((totalScore / maxScore) * 100);
};

// Helper function for ayurvedic constitution compatibility
const isComplementaryConstitution = (const1: string, const2: string): boolean => {
  const complementaryPairs = [
    ['Vata', 'Kapha'],
    ['Pitta', 'Vata'],
    ['Vata-Pitta', 'Kapha'],
    ['Pitta-Kapha', 'Vata']
  ];
  
  return complementaryPairs.some(pair => 
    (pair[0] === const1 && pair[1] === const2) || 
    (pair[1] === const1 && pair[0] === const2)
  );
};

// Calculate consciousness level based on spiritual depth
const calculateConsciousnessLevel = (profile: SpiritualProfile): number => {
  let level = 0;
  
  // Spiritual practices depth
  const practicesCount = (profile.spiritualPractices || []).length;
  if (practicesCount >= 5) level += 2;
  else if (practicesCount >= 3) level += 1;
  
  // Sacred texts study
  const textsCount = (profile.sacredTexts || []).length;
  if (textsCount >= 4) level += 2;
  else if (textsCount >= 2) level += 1;
  
  // Guru lineage (indicates serious commitment)
  if (profile.discipleLineage) level += 1;
  
  // Advanced spiritual goals
  const advancedGoals = ['Self-Realization', 'Moksha Preparation', 'Guru Service'];
  const hasAdvancedGoals = (profile.spiritualGoals || []).some(goal => advancedGoals.includes(goal));
  if (hasAdvancedGoals) level += 1;
  
  // Community involvement
  const communityCount = (profile.satsangCommunity || []).length;
  if (communityCount >= 2) level += 1;
  
  // Pilgrimage experience (indicates spiritual dedication)
  const pilgrimageCount = (profile.pilgrimageExperience || []).length;
  if (pilgrimageCount >= 3) level += 1;
  
  return Math.min(level, 8); // Cap at 8 levels
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