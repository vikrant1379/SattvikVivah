import { createContext, useContext, useState, useCallback, useMemo, ReactNode } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { ProfileFilter, SpiritualProfile } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";

interface SpiritualContextType {
  filters: ProfileFilter;
  setFilters: (filters: ProfileFilter) => void;
  searchResults: SpiritualProfile[];
  isSearching: boolean;
  searchProfiles: (filters: ProfileFilter) => void;
  clearSearch: () => void;
}

const SpiritualContext = createContext<SpiritualContextType | undefined>(undefined);

export const useSpiritualContext = (): SpiritualContextType => {
  const context = useContext(SpiritualContext);
  if (!context) {
    throw new Error("useSpiritualContext must be used within a SpiritualContextProvider");
  }
  return context;
};

interface SpiritualContextProviderProps {
  children: ReactNode;
}

export const SpiritualContextProvider = ({ children }: SpiritualContextProviderProps) => {
  const [filters, setFilters] = useState<ProfileFilter>({});
  const [searchResults, setSearchResults] = useState<SpiritualProfile[]>([]);
  
  const queryClient = useQueryClient();

  const searchMutation = useMutation({
    mutationFn: async (searchFilters: ProfileFilter) => {
      const response = await apiRequest("POST", "/api/profiles/search", {
        filters: searchFilters
      });
      return response.json();
    },
    onSuccess: (data) => {
      setSearchResults(data.profiles || []);
    },
    onError: (error) => {
      console.error("Search failed:", error);
      setSearchResults([]);
    },
  });

  const searchProfiles = useCallback((searchFilters: ProfileFilter) => {
    searchMutation.mutate(searchFilters);
  }, [searchMutation]);

  const clearSearch = useCallback(() => {
    setSearchResults([]);
    setFilters({});
    searchMutation.reset();
  }, [searchMutation]);

  const contextValue = useMemo(() => ({
    filters,
    setFilters,
    searchResults,
    isSearching: searchMutation.isPending,
    searchProfiles,
    clearSearch,
  }), [
    filters,
    searchResults,
    searchMutation.isPending,
    searchProfiles,
    clearSearch,
  ]);

  return (
    <SpiritualContext.Provider value={contextValue}>
      {children}
    </SpiritualContext.Provider>
  );
};
import { createContext, useContext, useState, useCallback, ReactNode, useMemo } from "react";
import type { ProfileFilter, UserProfile } from "@shared/schema";

interface SpiritualContextValue {
  filters: ProfileFilter;
  searchResults: UserProfile[];
  isSearching: boolean;
  setFilters: (filters: ProfileFilter) => void;
  searchProfiles: (filters: ProfileFilter) => Promise<void>;
  clearSearch: () => void;
}

const SpiritualContext = createContext<SpiritualContextValue | undefined>(undefined);

// Mock data for demonstration
const mockProfiles: UserProfile[] = [
  {
    id: "1",
    name: "Priyanka Sharma",
    age: 29,
    gender: "Female",
    height: "5'5\"",
    location: "Mumbai, Maharashtra",
    profession: "Software Engineer",
    education: "B.Tech Computer Science",
    religion: "Hindu",
    motherTongue: "Hindi",
    verified: true,
    profileImage: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400",
    bio: "Looking for a life partner who shares similar values and spiritual beliefs."
  },
  {
    id: "2",
    name: "Divya Singh",
    age: 27,
    gender: "Female",
    height: "5'3\"",
    location: "Delhi, India",
    profession: "Doctor",
    education: "MBBS",
    religion: "Hindu",
    motherTongue: "Hindi",
    verified: true,
    profileImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
    bio: "Seeking a caring and understanding partner for a blessed journey together."
  },
  {
    id: "3",
    name: "Anita Patel",
    age: 26,
    gender: "Female",
    height: "5'4\"",
    location: "Ahmedabad, Gujarat",
    profession: "Teacher",
    education: "M.Ed",
    religion: "Hindu",
    motherTongue: "Gujarati",
    verified: false,
    profileImage: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400",
    bio: "Traditional values with modern outlook, looking for my soulmate."
  },
  {
    id: "4",
    name: "Rahul Kumar",
    age: 31,
    gender: "Male",
    height: "5'9\"",
    location: "Bangalore, Karnataka",
    profession: "Business Analyst",
    education: "MBA",
    religion: "Hindu",
    motherTongue: "Telugu",
    verified: true,
    profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    bio: "Family-oriented person looking for a life partner to share spiritual journey."
  },
  {
    id: "5",
    name: "Deepika Reddy",
    age: 28,
    gender: "Female",
    height: "5'6\"",
    location: "Hyderabad, Telangana",
    profession: "Marketing Manager",
    education: "MBA Marketing",
    religion: "Hindu",
    motherTongue: "Telugu",
    verified: true,
    profileImage: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400",
    bio: "Spiritual, ambitious, and family-oriented seeking meaningful connection."
  },
  {
    id: "6",
    name: "Arjun Nair",
    age: 30,
    gender: "Male",
    height: "5'8\"",
    location: "Kochi, Kerala",
    profession: "Architect",
    education: "B.Arch",
    religion: "Hindu",
    motherTongue: "Malayalam",
    verified: false,
    profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
    bio: "Creative professional seeking a understanding and supportive life partner."
  }
];

export const SpiritualContextProvider = ({ children }: { children: ReactNode }) => {
  const [filters, setFilters] = useState<ProfileFilter>({});
  const [searchResults, setSearchResults] = useState<UserProfile[]>(mockProfiles);
  const [isSearching, setIsSearching] = useState(false);

  const searchProfiles = useCallback(async (newFilters: ProfileFilter) => {
    setIsSearching(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simple filtering logic for demo
    let filtered = mockProfiles;
    
    if (newFilters.ageMin || newFilters.ageMax) {
      filtered = filtered.filter(profile => {
        const age = profile.age;
        const minAge = newFilters.ageMin || 18;
        const maxAge = newFilters.ageMax || 70;
        return age >= minAge && age <= maxAge;
      });
    }
    
    if (newFilters.religion) {
      filtered = filtered.filter(profile => 
        profile.religion?.toLowerCase().includes(newFilters.religion!.toLowerCase())
      );
    }
    
    if (newFilters.motherTongue) {
      filtered = filtered.filter(profile => 
        profile.motherTongue?.toLowerCase().includes(newFilters.motherTongue!.toLowerCase())
      );
    }
    
    if (newFilters.verified) {
      filtered = filtered.filter(profile => profile.verified);
    }
    
    setSearchResults(filtered);
    setIsSearching(false);
  }, []);

  const clearSearch = useCallback(() => {
    setFilters({});
    setSearchResults(mockProfiles);
  }, []);

  const value = useMemo(() => ({
    filters,
    searchResults,
    isSearching,
    setFilters,
    searchProfiles,
    clearSearch
  }), [filters, searchResults, isSearching, searchProfiles, clearSearch]);

  return (
    <SpiritualContext.Provider value={value}>
      {children}
    </SpiritualContext.Provider>
  );
};

export const useSpiritualContext = () => {
  const context = useContext(SpiritualContext);
  if (!context) {
    throw new Error("useSpiritualContext must be used within SpiritualContextProvider");
  }
  return context;
};
