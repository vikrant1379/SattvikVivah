
export const PROFILE_SECTIONS = {
  BASIC_INFO: 'basic-info',
  EDUCATION_CAREER: 'education-career',
  FAMILY: 'family',
  LIFESTYLE: 'lifestyle',
  SPIRITUAL: 'spiritual',
  PARTNER_PREFERENCES: 'partner-preferences',
} as const;

export const REQUIRED_PROFILE_FIELDS = [
  'name',
  'age',
  'height',
  'city',
  'state',
  'profession',
  'education',
  'motherTongue',
  'religion',
  'caste',
] as const;
