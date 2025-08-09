import { createContext, useContext, useState, useCallback, ReactNode, useMemo, useEffect } from "react";
import type { ProfileFilter, UserProfile } from "@shared/schema";
import { mockProfiles } from "@/data/mock-profiles";

interface SpiritualContextValue {
  filters: ProfileFilter;
  searchResults: UserProfile[];
  isSearching: boolean;
  setFilters: (filters: ProfileFilter) => void;
  searchProfiles: (filters: ProfileFilter) => Promise<void>;
  clearSearch: () => void;
}

const SpiritualContext = createContext<SpiritualContextValue | undefined>(undefined);

// Helper function to parse height for comparison
const parseHeight = (height: string): number => {
  if (!height) return 0;

  // Extract feet and inches from format like "5'6\" (168 cm)" or "5'6""
  const match = height.match(/(\d+)'(\d+)"/);
  if (match) {
    const feet = parseInt(match[1]);
    const inches = parseInt(match[2]);
    return feet * 12 + inches; // Convert to total inches
  }

  // Fallback for cm format like "(168 cm)" or "168 cm"
  const cmMatch = height.match(/\((\d+)\s*cm\)|(\d+)\s*cm/);
  if (cmMatch) {
    const cm = parseInt(cmMatch[1] || cmMatch[2]);
    return Math.round(cm / 2.54); // Convert cm to inches
  }

  return 0;
};

// Helper function to check if arrays have any common elements
const hasCommonElements = (arr1: string[], arr2: string[]): boolean => {
  return arr1.some(item => arr2.includes(item));
};

// Filter profiles based on the given filters
const filterProfiles = (profiles: UserProfile[], filters: ProfileFilter): UserProfile[] => {
  return profiles.filter(profile => {
    // Age filters
    if (filters.ageMin && profile.age < filters.ageMin) return false;
    if (filters.ageMax && profile.age > filters.ageMax) return false;

    // Height filters
    if (filters.heightMin || filters.heightMax) {
      const profileHeight = parseHeight(profile.height);

      // Skip profiles with no height data
      if (profileHeight === 0) return false;

      const minHeight = filters.heightMin ? parseHeight(filters.heightMin) : 0;
      const maxHeight = filters.heightMax ? parseHeight(filters.heightMax) : Infinity;

      if (profileHeight < minHeight || profileHeight > maxHeight) return false;
    }

    // Location filters
    if (filters.country && profile.country !== filters.country) return false;
    if (filters.state && profile.state !== filters.state) return false;
    if (filters.city && profile.city !== filters.city) return false;

    // Language filters
    if (filters.motherTongue && profile.motherTongue !== filters.motherTongue) return false;
    if (filters.otherLanguages?.length && profile.otherLanguages?.length) {
      if (!hasCommonElements(filters.otherLanguages, profile.otherLanguages)) return false;
    }

    // Education and profession
    if (filters.education && profile.education !== filters.education) return false;
    if (filters.profession && profile.profession !== filters.profession) return false;

    // Caste filters
    if (filters.caste && profile.caste !== filters.caste) return false;

    // Caste group filters
    if (filters.casteGroups?.length && !filters.casteGroups.includes("All")) {
      if (!profile.casteGroup || !filters.casteGroups.includes(profile.casteGroup)) return false;
    }

    // Caste subcaste filters
    if (filters.casteSubcastes?.length && !filters.casteSubcastes.includes("All")) {
      if (!profile.casteSubcaste || !filters.casteSubcastes.includes(profile.casteSubcaste)) return false;
    }

    // Spiritual practices
    if (filters.spiritualPractices?.length && profile.spiritualPractices?.length) {
      if (!hasCommonElements(filters.spiritualPractices, profile.spiritualPractices)) return false;
    }

    // Sacred texts
    if (filters.sacredTexts?.length && profile.sacredTexts?.length) {
      if (!hasCommonElements(filters.sacredTexts, profile.sacredTexts)) return false;
    }

    // Guru lineage
    if (filters.guruLineage && profile.guruLineage !== filters.guruLineage) return false;

    // Personal attributes
    if (filters.maritalStatus && profile.maritalStatus !== filters.maritalStatus) return false;
    if (filters.religion && profile.religion !== filters.religion) return false;
    if (filters.ethnicity && profile.ethnicity !== filters.ethnicity) return false;
    if (filters.annualIncome && profile.annualIncome !== filters.annualIncome) return false;

    // Lifestyle filters
    if (filters.smokingHabits && profile.smokingHabits !== filters.smokingHabits) return false;
    if (filters.drinkingHabits && profile.drinkingHabits !== filters.drinkingHabits) return false;
    if (filters.eatingHabits && profile.eatingHabits !== filters.eatingHabits) return false;
    if (filters.physicalStatus && profile.physicalStatus !== filters.physicalStatus) return false;
    if (filters.bloodGroup && profile.bloodGroup !== filters.bloodGroup) return false;
    if (filters.healthConditions && profile.healthConditions !== filters.healthConditions) return false;
    if (filters.dietaryLifestyle && profile.dietaryLifestyle !== filters.dietaryLifestyle) return false;

    // Other preferences
    if (filters.hasChildren && profile.hasChildren !== filters.hasChildren) return false;
    if (filters.horoscope && filters.horoscope !== "Doesn't Matter" && profile.horoscope !== filters.horoscope) return false;
    if (filters.mangalik && filters.mangalik !== "Doesn't Matter" && profile.mangalik !== filters.mangalik) return false;
    if (filters.residentialStatus && filters.residentialStatus !== "Doesn't Matter" && profile.residentialStatus !== filters.residentialStatus) return false;

    // Verification and photo filters
    if (filters.verified && !profile.verified) return false;
    if (filters.withPhoto && !profile.withPhoto) return false;

    return true;
  });
};

export function SpiritualProvider({ children }: { children: ReactNode }) {
  const [filters, setFiltersState] = useState<ProfileFilter>({
    casteGroups: [],
    casteSubcastes: []
  });
  const [searchResults, setSearchResults] = useState<UserProfile[]>(() => {
    // Initialize with first 10 profiles immediately
    return mockProfiles.slice(0, 10);
  });
  const [isSearching, setIsSearching] = useState(false);

  const searchProfiles = useCallback(async (searchFilters: ProfileFilter) => {
    setIsSearching(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));

    try {
      const filteredProfiles = filterProfiles(mockProfiles, searchFilters);
      setSearchResults(filteredProfiles);
    } catch (error) {
      console.error('Error searching profiles:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  }, []);

  const setFilters = useCallback((newFilters: ProfileFilter) => {
    setFiltersState(newFilters);
  }, []);

  const clearSearch = useCallback(() => {
    setFiltersState({
      casteGroups: [],
      casteSubcastes: []
    });
    setSearchResults(mockProfiles.slice(0, 10)); // Reset to first 10
  }, []);

  // Initial search on mount
  useEffect(() => {
    // Perform initial search with empty filters to show all profiles
    searchProfiles({
      casteGroups: [],
      casteSubcastes: []
    });
  }, []); // Run only once on mount

  const value = useMemo(() => ({
    filters,
    searchResults,
    isSearching,
    setFilters,
    searchProfiles,
    clearSearch,
  }), [filters, searchResults, isSearching, setFilters, searchProfiles, clearSearch]);

  return (
    <SpiritualContext.Provider value={value}>
      {children}
    </SpiritualContext.Provider>
  );
}

export function useSpiritualContext() {
  const context = useContext(SpiritualContext);
  if (context === undefined) {
    throw new Error('useSpiritualContext must be used within a SpiritualProvider');
  }
  return context;
}