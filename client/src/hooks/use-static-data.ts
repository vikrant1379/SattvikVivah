
import { useState, useEffect, useCallback } from 'react';
import { StaticDataService } from '@/services';
import { handleApiError } from '@/utils';

export const useStaticData = () => {
  const [spiritualPractices, setSpiritualPractices] = useState<string[]>([]);
  const [sacredTexts, setSacredTexts] = useState<string[]>([]);
  const [countries, setCountries] = useState<string[]>([]);
  const [states, setStates] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [languages, setLanguages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadSpiritualPractices = useCallback(async () => {
    try {
      const data = await StaticDataService.getSpiritualPractices();
      setSpiritualPractices(data);
    } catch (err) {
      setError(handleApiError(err));
    }
  }, []);

  const loadSacredTexts = useCallback(async () => {
    try {
      const data = await StaticDataService.getSacredTexts();
      setSacredTexts(data);
    } catch (err) {
      setError(handleApiError(err));
    }
  }, []);

  const loadCountries = useCallback(async () => {
    try {
      const data = await StaticDataService.getCountries();
      setCountries(data);
    } catch (err) {
      setError(handleApiError(err));
    }
  }, []);

  const loadStates = useCallback(async (country?: string) => {
    try {
      const data = await StaticDataService.getStates(country);
      setStates(data);
    } catch (err) {
      setError(handleApiError(err));
    }
  }, []);

  const loadCities = useCallback(async (state?: string) => {
    try {
      const data = await StaticDataService.getCities(state);
      setCities(data);
    } catch (err) {
      setError(handleApiError(err));
    }
  }, []);

  const loadLanguages = useCallback(async () => {
    try {
      const data = await StaticDataService.getLanguages();
      setLanguages(data);
    } catch (err) {
      setError(handleApiError(err));
    }
  }, []);

  return {
    spiritualPractices,
    sacredTexts,
    countries,
    states,
    cities,
    languages,
    isLoading,
    error,
    loadSpiritualPractices,
    loadSacredTexts,
    loadCountries,
    loadStates,
    loadCities,
    loadLanguages
  };
};
