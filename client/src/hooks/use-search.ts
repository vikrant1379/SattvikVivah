
import { useState, useCallback } from 'react';
import { SearchService } from '@/services';
import { SpiritualProfile, ProfileSearchFilters } from '@/types';
import { handleApiError } from '@/utils';

export const useSearch = () => {
  const [profiles, setProfiles] = useState<SpiritualProfile[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const searchProfiles = useCallback(async (
    filters: ProfileSearchFilters,
    excludeUserId?: string
  ): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      const validationErrors = SearchService.validateSearchFilters(filters);
      if (validationErrors.length > 0) {
        setError(validationErrors[0]);
        return;
      }

      const response = await SearchService.searchProfiles(filters, excludeUserId);
      setProfiles(response.profiles);
      setHasSearched(true);
    } catch (err) {
      setError(handleApiError(err));
      setProfiles([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearSearch = useCallback(() => {
    setProfiles([]);
    setError(null);
    setHasSearched(false);
  }, []);

  return {
    profiles,
    isLoading,
    error,
    hasSearched,
    searchProfiles,
    clearSearch
  };
};
