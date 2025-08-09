
import { SpiritualProfile, InsertSpiritualProfile, ProfileFilter } from '@shared/schema';

export type ProfileSearchFilters = ProfileFilter;

export type ProfileFormData = Partial<InsertSpiritualProfile>;

export type ProfileCompatibilityData = {
  spiritualPractices: string[];
  sacredTexts: string[];
  guruLineage?: string;
  dailySadhana?: string;
  eatingHabits?: string;
  state?: string;
};

export type SpiritualLevel = 'Explorer' | 'Beginner' | 'Regular Practitioner' | 'Advanced Practitioner';

export { SpiritualProfile, InsertSpiritualProfile, ProfileFilter };
