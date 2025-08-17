// Profile edit constants
export const PROFILE_SECTIONS = {
  BASIC: 'basic',
  ABOUT: 'about',
  EDUCATION: 'education',
  FAMILY: 'family',
  SPIRITUAL: 'spiritual',
  PHOTOS: 'photos'
} as const;

export const SECTION_LABELS = {
  [PROFILE_SECTIONS.BASIC]: 'Basic',
  [PROFILE_SECTIONS.ABOUT]: 'About',
  [PROFILE_SECTIONS.EDUCATION]: 'Education',
  [PROFILE_SECTIONS.FAMILY]: 'Family',
  [PROFILE_SECTIONS.SPIRITUAL]: 'Spiritual',
  [PROFILE_SECTIONS.PHOTOS]: 'Photos'
} as const;

export type ProfileSection = typeof PROFILE_SECTIONS[keyof typeof PROFILE_SECTIONS];