
import { useState, useEffect, useCallback, useMemo } from 'react';
import { StaticDataService } from '@/services';
import { handleApiError } from '@/utils';

interface UseStaticDataOptions {
  preload?: boolean;
  autoLoadCommon?: boolean;
}

export const useStaticData = (options: UseStaticDataOptions = {}) => {
  const { preload = false, autoLoadCommon = true } = options;
  
  const [spiritualPractices, setSpiritualPractices] = useState<string[]>([]);
  const [sacredTexts, setSacredTexts] = useState<string[]>([]);
  const [countries, setCountries] = useState<string[]>([]);
  const [states, setStates] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [languages, setLanguages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loadedData, setLoadedData] = useState<Set<string>>(new Set());

  // Memoized loading status
  const loadingStatus = useMemo(() => ({
    hasData: spiritualPractices.length > 0 || sacredTexts.length > 0,
    isComplete: loadedData.has('spiritual') && loadedData.has('texts') && loadedData.has('countries'),
    completionPercentage: (loadedData.size / 6) * 100
  }), [spiritualPractices.length, sacredTexts.length, loadedData]);

  const updateLoadedData = useCallback((key: string) => {
    setLoadedData(prev => new Set([...prev, key]));
  }, []);

  const loadSpiritualPractices = useCallback(async () => {
    if (loadedData.has('spiritual')) return;
    
    try {
      setIsLoading(true);
      const data = await StaticDataService.getSpiritualPractices();
      setSpiritualPractices(data);
      updateLoadedData('spiritual');
    } catch (err) {
      setError(handleApiError(err));
    } finally {
      setIsLoading(false);
    }
  }, [loadedData, updateLoadedData]);

  const loadSacredTexts = useCallback(async () => {
    if (loadedData.has('texts')) return;
    
    try {
      setIsLoading(true);
      const data = await StaticDataService.getSacredTexts();
      setSacredTexts(data);
      updateLoadedData('texts');
    } catch (err) {
      setError(handleApiError(err));
    } finally {
      setIsLoading(false);
    }
  }, [loadedData, updateLoadedData]);

  const loadCountries = useCallback(async () => {
    if (loadedData.has('countries')) return;
    
    try {
      setIsLoading(true);
      const data = await StaticDataService.getCountries();
      setCountries(data);
      updateLoadedData('countries');
    } catch (err) {
      setError(handleApiError(err));
    } finally {
      setIsLoading(false);
    }
  }, [loadedData, updateLoadedData]);

  const loadStates = useCallback(async (country?: string) => {
    const key = `states_${country || 'all'}`;
    if (loadedData.has(key)) return;
    
    try {
      setIsLoading(true);
      const data = await StaticDataService.getStates(country);
      setStates(data);
      updateLoadedData(key);
    } catch (err) {
      setError(handleApiError(err));
    } finally {
      setIsLoading(false);
    }
  }, [loadedData, updateLoadedData]);

  const loadCities = useCallback(async (state?: string) => {
    const key = `cities_${state || 'all'}`;
    if (loadedData.has(key)) return;
    
    try {
      setIsLoading(true);
      const data = await StaticDataService.getCities(state);
      setCities(data);
      updateLoadedData(key);
    } catch (err) {
      setError(handleApiError(err));
    } finally {
      setIsLoading(false);
    }
  }, [loadedData, updateLoadedData]);

  const loadLanguages = useCallback(async () => {
    if (loadedData.has('languages')) return;
    
    try {
      setIsLoading(true);
      const data = await StaticDataService.getLanguages();
      setLanguages(data);
      updateLoadedData('languages');
    } catch (err) {
      setError(handleApiError(err));
    } finally {
      setIsLoading(false);
    }
  }, [loadedData, updateLoadedData]);

  // Batch load common data
  const loadCommonData = useCallback(async () => {
    if (loadingStatus.isComplete) return;
    
    try {
      setIsLoading(true);
      await StaticDataService.preloadCommonData();
      // Update all states at once to reduce re-renders
      const [practices, texts, countriesData, langs] = await Promise.all([
        StaticDataService.getSpiritualPractices(),
        StaticDataService.getSacredTexts(),
        StaticDataService.getCountries(),
        StaticDataService.getLanguages()
      ]);
      
      setSpiritualPractices(practices);
      setSacredTexts(texts);
      setCountries(countriesData);
      setLanguages(langs);
      
      setLoadedData(new Set(['spiritual', 'texts', 'countries', 'languages']));
    } catch (err) {
      setError(handleApiError(err));
    } finally {
      setIsLoading(false);
    }
  }, [loadingStatus.isComplete]);

  // Load location data efficiently
  const loadLocationData = useCallback(async (country?: string, state?: string) => {
    try {
      setIsLoading(true);
      const { countries: countriesData, states: statesData, cities: citiesData } = 
        await StaticDataService.getLocationData(country, state);
      
      setCountries(countriesData);
      setStates(statesData);
      setCities(citiesData);
      
      updateLoadedData('countries');
      updateLoadedData(`states_${country || 'all'}`);
      updateLoadedData(`cities_${state || 'all'}`);
    } catch (err) {
      setError(handleApiError(err));
    } finally {
      setIsLoading(false);
    }
  }, [updateLoadedData]);

  // Auto-load common data on mount
  useEffect(() => {
    if (autoLoadCommon && !loadingStatus.hasData) {
      loadCommonData();
    }
  }, [autoLoadCommon, loadCommonData, loadingStatus.hasData]);

  // Preload data in the background
  useEffect(() => {
    if (preload && !isLoading) {
      requestIdleCallback(() => {
        loadCommonData();
      });
    }
  }, [preload, isLoading, loadCommonData]);

  return {
    spiritualPractices,
    sacredTexts,
    countries,
    states,
    cities,
    languages,
    isLoading,
    error,
    loadingStatus,
    loadSpiritualPractices,
    loadSacredTexts,
    loadCountries,
    loadStates,
    loadCities,
    loadLanguages,
    loadCommonData,
    loadLocationData
  };
};
