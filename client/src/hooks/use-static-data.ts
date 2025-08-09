
import { useState, useEffect, useCallback, useMemo } from 'react';
import { StaticDataService } from '@/services';
import { handleApiError } from '@/utils';

interface LoadingStatus {
  isLoading: boolean;
  isComplete: boolean;
  progress: number;
}

interface StaticDataState {
  spiritualPractices: string[];
  sacredTexts: string[];
  countries: string[];
  states: string[];
  cities: string[];
  languages: string[];
}

interface StaticDataHook extends StaticDataState {
  isLoading: boolean;
  error: string | null;
  loadingStatus: LoadingStatus;
  loadCommonData: () => Promise<void>;
  loadLocationData: (country?: string, state?: string) => Promise<void>;
  refreshData: (dataType?: keyof StaticDataState) => Promise<void>;
  clearError: () => void;
}

export const useStaticData = (): StaticDataHook => {
  // State management with better TypeScript support
  const [state, setState] = useState<StaticDataState>({
    spiritualPractices: [],
    sacredTexts: [],
    countries: [],
    states: [],
    cities: [],
    languages: []
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loadedData, setLoadedData] = useState<Set<string>>(new Set());

  // Memoized loading status calculation
  const loadingStatus = useMemo((): LoadingStatus => {
    const totalDataTypes = 6; // spiritual, texts, countries, states, cities, languages
    const loadedCount = loadedData.size;
    const progress = (loadedCount / totalDataTypes) * 100;
    
    return {
      isLoading,
      isComplete: loadedCount === totalDataTypes,
      progress: Math.round(progress)
    };
  }, [isLoading, loadedData]);

  // Generic data loader with error handling
  const loadData = useCallback(async <T>(
    dataLoader: () => Promise<T>,
    stateKey: keyof StaticDataState,
    dataType: string
  ): Promise<T | null> => {
    try {
      const data = await StaticDataService.getDataWithMetrics(dataLoader, dataType);
      
      setState(prevState => ({
        ...prevState,
        [stateKey]: data
      }));
      
      setLoadedData(prev => new Set([...prev, dataType]));
      return data;
    } catch (err) {
      const errorMessage = handleApiError(err);
      setError(errorMessage);
      console.error(`Failed to load ${dataType}:`, err);
      return null;
    }
  }, []);

  // Optimized batch loading with progress tracking
  const loadCommonData = useCallback(async (): Promise<void> => {
    if (loadingStatus.isComplete) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Load data in batches for better UX
      const batch1 = [
        () => loadData(StaticDataService.getSpiritualPractices, 'spiritualPractices', 'spiritual'),
        () => loadData(StaticDataService.getSacredTexts, 'sacredTexts', 'texts')
      ];
      
      const batch2 = [
        () => loadData(StaticDataService.getCountries, 'countries', 'countries'),
        () => loadData(StaticDataService.getLanguages, 'languages', 'languages')
      ];

      // Execute batches sequentially for better perceived performance
      await Promise.allSettled(batch1.map(fn => fn()));
      await Promise.allSettled(batch2.map(fn => fn()));
      
    } catch (err) {
      setError(handleApiError(err));
    } finally {
      setIsLoading(false);
    }
  }, [loadData, loadingStatus.isComplete]);

  // Location-specific data loading
  const loadLocationData = useCallback(async (
    country?: string, 
    state?: string
  ): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      const locationData = await StaticDataService.getLocationData(country, state);
      
      setState(prevState => ({
        ...prevState,
        countries: locationData.countries.length > 0 ? locationData.countries : prevState.countries,
        states: locationData.states,
        cities: locationData.cities
      }));

      // Update loaded data tracking
      const newLoadedData = new Set([...loadedData]);
      if (locationData.countries.length > 0) newLoadedData.add('countries');
      if (locationData.states.length > 0) newLoadedData.add('states');
      if (locationData.cities.length > 0) newLoadedData.add('cities');
      setLoadedData(newLoadedData);

    } catch (err) {
      setError(handleApiError(err));
    } finally {
      setIsLoading(false);
    }
  }, [loadedData]);

  // Selective data refresh
  const refreshData = useCallback(async (
    dataType?: keyof StaticDataState
  ): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      if (dataType) {
        // Refresh specific data type
        switch (dataType) {
          case 'spiritualPractices':
            await loadData(StaticDataService.getSpiritualPractices, 'spiritualPractices', 'spiritual');
            break;
          case 'sacredTexts':
            await loadData(StaticDataService.getSacredTexts, 'sacredTexts', 'texts');
            break;
          case 'countries':
            await loadData(StaticDataService.getCountries, 'countries', 'countries');
            break;
          case 'languages':
            await loadData(StaticDataService.getLanguages, 'languages', 'languages');
            break;
          default:
            throw new Error(`Unknown data type: ${dataType}`);
        }
      } else {
        // Refresh all data
        await loadCommonData();
      }
    } catch (err) {
      setError(handleApiError(err));
    } finally {
      setIsLoading(false);
    }
  }, [loadData, loadCommonData]);

  // Clear error state
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Auto-load common data on mount
  useEffect(() => {
    if (!loadingStatus.isComplete && !isLoading) {
      loadCommonData();
    }
  }, [loadCommonData, loadingStatus.isComplete, isLoading]);

  // Preload high-priority data
  useEffect(() => {
    StaticDataService.preloadByPriority('high');
  }, []);

  return {
    ...state,
    isLoading,
    error,
    loadingStatus,
    loadCommonData,
    loadLocationData,
    refreshData,
    clearError
  };
};
