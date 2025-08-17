
export const AGE_LIMITS = {
  MIN: 18,
  MAX: 75,
} as const;

export const PROFILE_SECTIONS = {
  BASIC: 'basic',
  ABOUT: 'about',
  EDUCATION: 'education',
  FAMILY: 'family',
  PREFERENCES: 'preferences',
  PHOTOS: 'photos',
} as const;

export const SECTION_WEIGHTS = {
  [PROFILE_SECTIONS.BASIC]: 15,
  [PROFILE_SECTIONS.ABOUT]: 20,
  [PROFILE_SECTIONS.EDUCATION]: 15,
  [PROFILE_SECTIONS.FAMILY]: 15,
  [PROFILE_SECTIONS.PREFERENCES]: 20,
  [PROFILE_SECTIONS.PHOTOS]: 15,
} as const;

export const RASHI_OPTIONS = [
  'Mesha', 'Vrishabha', 'Mithuna', 'Karka', 'Simha', 'Kanya', 
  'Tula', 'Vrishchika', 'Dhanu', 'Makara', 'Kumbha', 'Meena'
] as const;

export const NAKSHATRA_OPTIONS = [
  'Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashirsha', 'Ardra',
  'Punarvasu', 'Pushya', 'Ashlesha', 'Magha', 'Purva Phalguni', 'Uttara Phalguni',
  'Hasta', 'Chitra', 'Swati', 'Vishakha', 'Anuradha', 'Jyeshtha',
  'Mula', 'Purva Ashadha', 'Uttara Ashadha', 'Shravana', 'Dhanishta', 
  'Shatabhisha', 'Purva Bhadrapada', 'Uttara Bhadrapada', 'Revati'
] as const;

export const MANGLIK_STATUS_OPTIONS = [
  { value: 'No', label: 'No' },
  { value: 'Anshik', label: 'Anshik (Partial)' },
  { value: 'Yes', label: 'Yes' }
] as const;
