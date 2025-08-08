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
