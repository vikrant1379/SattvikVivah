import type { SpiritualProfile, ProfileFilter } from "@shared/schema";

export const calculateSpiritualCompatibility = (
  profile1: SpiritualProfile,
  profile2: SpiritualProfile
): number => {
  let score = 0;
  let totalFactors = 0;

  // Spiritual practices compatibility (30%)
  const practices1 = profile1.spiritualPractices || [];
  const practices2 = profile2.spiritualPractices || [];
  if (practices1.length > 0 && practices2.length > 0) {
    const commonPractices = practices1.filter(practice =>
      practices2.includes(practice)
    );
    const practiceScore = (commonPractices.length / Math.max(practices1.length, practices2.length)) * 30;
    score += practiceScore;
    totalFactors += 30;
  }

  // Sacred texts compatibility (25%)
  const texts1 = profile1.sacredTexts || [];
  const texts2 = profile2.sacredTexts || [];
  if (texts1.length > 0 && texts2.length > 0) {
    const commonTexts = texts1.filter(text =>
      texts2.includes(text)
    );
    const textScore = (commonTexts.length / Math.max(texts1.length, texts2.length)) * 25;
    score += textScore;
    totalFactors += 25;
  }

  // Guru lineage compatibility (20%)
  if (profile1.guruLineage && profile2.guruLineage) {
    const lineageScore = profile1.guruLineage.toLowerCase() === profile2.guruLineage.toLowerCase() ? 20 : 0;
    score += lineageScore;
    totalFactors += 20;
  }

  // Dietary lifestyle compatibility (15%)
  if (profile1.dietaryLifestyle && profile2.dietaryLifestyle) {
    const dietScore = profile1.dietaryLifestyle === profile2.dietaryLifestyle ? 15 : 0;
    score += dietScore;
    totalFactors += 15;
  }

  // Location proximity (10%)
  if (profile1.state && profile2.state) {
    const locationScore = profile1.state === profile2.state ? 10 : 0;
    score += locationScore;
    totalFactors += 10;
  }

  return totalFactors > 0 ? Math.round((score / totalFactors) * 100) : 0;
};

export const formatSpiritualPractices = (practices: string[]): string => {
  if (practices.length === 0) return "No practices listed";
  if (practices.length === 1) return practices[0];
  if (practices.length === 2) return practices.join(" & ");
  return `${practices.slice(0, -1).join(", ")} & ${practices[practices.length - 1]}`;
};

export const getSpiritualLevel = (profile: SpiritualProfile): string => {
  let level = 0;
  
  if ((profile.spiritualPractices || []).length > 0) level++;
  if ((profile.sacredTexts || []).length > 0) level++;
  if (profile.guruLineage) level++;
  if (profile.dailySadhana) level++;
  if (profile.sevaActivities) level++;
  if (profile.dharmaGoals) level++;

  if (level >= 5) return "Advanced Practitioner";
  if (level >= 3) return "Regular Practitioner";
  if (level >= 1) return "Beginner";
  return "Explorer";
};

export const validateSpiritualProfile = (profile: Partial<SpiritualProfile>): string[] => {
  const errors: string[] = [];

  if (!profile.name?.trim()) {
    errors.push("Name is required");
  }

  if (!profile.age || profile.age < 18 || profile.age > 80) {
    errors.push("Please enter a valid age between 18 and 80");
  }

  if (!profile.spiritualPractices || profile.spiritualPractices.length === 0) {
    errors.push("Please select at least one spiritual practice");
  }

  if (!profile.dietaryLifestyle) {
    errors.push("Please select your dietary lifestyle");
  }

  if (!profile.state?.trim()) {
    errors.push("Please select your state");
  }

  if (!profile.motherTongue?.trim()) {
    errors.push("Please select your mother tongue");
  }

  return errors;
};

export const generateProfileDescription = (profile: SpiritualProfile): string => {
  const parts: string[] = [];

  if (profile.age) {
    parts.push(`${profile.age} years old`);
  }

  if (profile.profession) {
    parts.push(profile.profession.toLowerCase());
  }

  if (profile.city && profile.state) {
    parts.push(`from ${profile.city}, ${profile.state}`);
  } else if (profile.state) {
    parts.push(`from ${profile.state}`);
  }

  const practices = profile.spiritualPractices || [];
  if (practices.length > 0) {
    parts.push(`practicing ${formatSpiritualPractices(practices)}`);
  }

  if (profile.guruLineage) {
    parts.push(`following ${profile.guruLineage}`);
  }

  return parts.length > 0 ? parts.join(", ") + "." : "Spiritual seeker on the path of dharma.";
};

export const filterProfiles = (profiles: SpiritualProfile[], filters: ProfileFilter): SpiritualProfile[] => {
  return profiles.filter(profile => {
    // Age filter
    if (filters.ageMin && profile.age < filters.ageMin) return false;
    if (filters.ageMax && profile.age > filters.ageMax) return false;

    // Location filter
    if (filters.state && profile.state?.toLowerCase() !== filters.state.toLowerCase()) return false;
    if (filters.city && !profile.city?.toLowerCase().includes(filters.city.toLowerCase())) return false;

    // Language filter
    if (filters.motherTongue && profile.motherTongue !== filters.motherTongue) return false;

    // Spiritual practices filter
    if (filters.spiritualPractices && filters.spiritualPractices.length > 0) {
      const hasCommonPractice = filters.spiritualPractices.some(practice =>
        (profile.spiritualPractices || []).includes(practice)
      );
      if (!hasCommonPractice) return false;
    }

    // Sacred texts filter
    if (filters.sacredTexts && filters.sacredTexts.length > 0) {
      const hasCommonText = filters.sacredTexts.some(text =>
        (profile.sacredTexts || []).includes(text)
      );
      if (!hasCommonText) return false;
    }

    // Dietary lifestyle filter
    if (filters.dietaryLifestyle && profile.dietaryLifestyle !== filters.dietaryLifestyle) return false;

    // Guru lineage filter
    if (filters.guruLineage && !profile.guruLineage?.toLowerCase().includes(filters.guruLineage.toLowerCase())) return false;

    // Education filter
    if (filters.education && profile.education !== filters.education) return false;

    // Profession filter
    if (filters.profession && profile.profession !== filters.profession) return false;

    return true;
  });
};
