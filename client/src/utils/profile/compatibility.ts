
export const calculateCompatibilityScore = (profile1: any, profile2: any): number => {
  let score = 0;
  let totalFactors = 0;

  // Religion compatibility (25%)
  if (profile1.religion === profile2.religion) score += 25;
  totalFactors += 25;

  // Location compatibility (20%)
  if (profile1.state === profile2.state) {
    score += profile1.city === profile2.city ? 20 : 15;
  }
  totalFactors += 20;

  // Education level compatibility (15%)
  const educationLevels = ['High School', 'Diploma', 'Bachelor', 'Master', 'Doctorate'];
  const level1 = educationLevels.indexOf(profile1.education) || 0;
  const level2 = educationLevels.indexOf(profile2.education) || 0;
  const levelDiff = Math.abs(level1 - level2);
  score += Math.max(0, 15 - (levelDiff * 3));
  totalFactors += 15;

  // Age compatibility (10%)
  const ageDiff = Math.abs(profile1.age - profile2.age);
  score += Math.max(0, 10 - ageDiff);
  totalFactors += 10;

  return Math.round((score / totalFactors) * 100);
};
