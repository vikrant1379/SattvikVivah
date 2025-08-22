
export const isProfileComplete = (profile: any): boolean => {
  const requiredFields = ['name', 'age', 'city', 'state', 'profession', 'education'];
  return requiredFields.every(field => profile[field] && profile[field].trim() !== '');
};

export const calculateProfileCompleteness = (profile: any): number => {
  const allFields = [
    'name', 'age', 'height', 'city', 'state', 'profession', 'education',
    'motherTongue', 'religion', 'caste', 'bio', 'spiritualPractices', 'profileImage'
  ];
  
  const filledFields = allFields.filter(field => {
    const value = profile[field];
    return value && (Array.isArray(value) ? value.length > 0 : value.toString().trim() !== '');
  });
  
  return Math.round((filledFields.length / allFields.length) * 100);
};
