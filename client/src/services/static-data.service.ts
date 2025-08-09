
import { cachedApiRequest, batchRequests } from './api.service';
import { API_ENDPOINTS } from '@/constants';

export class StaticDataService {
  private static readonly CACHE_TTL = 30 * 60 * 1000; // 30 minutes for static data

  static async getSpiritualPractices(): Promise<string[]> {
    const data = await cachedApiRequest<{ practices: string[] }>(
      API_ENDPOINTS.STATIC_DATA.SPIRITUAL_PRACTICES,
      { method: 'GET', cache: true, cacheTTL: this.CACHE_TTL }
    );
    return data.practices;
  }

  static async getSacredTexts(): Promise<string[]> {
    const data = await cachedApiRequest<{ texts: string[] }>(
      API_ENDPOINTS.STATIC_DATA.SACRED_TEXTS,
      { method: 'GET', cache: true, cacheTTL: this.CACHE_TTL }
    );
    return data.texts;
  }

  static async getCountries(): Promise<string[]> {
    const data = await cachedApiRequest<{ countries: string[] }>(
      API_ENDPOINTS.STATIC_DATA.COUNTRIES,
      { method: 'GET', cache: true, cacheTTL: this.CACHE_TTL }
    );
    return data.countries;
  }

  static async getStates(country?: string): Promise<string[]> {
    const url = country 
      ? `${API_ENDPOINTS.STATIC_DATA.STATES}?country=${encodeURIComponent(country)}`
      : API_ENDPOINTS.STATIC_DATA.STATES;
    
    const data = await cachedApiRequest<{ states: string[] }>(
      url,
      { method: 'GET', cache: true, cacheTTL: this.CACHE_TTL }
    );
    return data.states;
  }

  static async getCities(state?: string): Promise<string[]> {
    const url = state
      ? `${API_ENDPOINTS.STATIC_DATA.CITIES}?state=${encodeURIComponent(state)}`
      : API_ENDPOINTS.STATIC_DATA.CITIES;
    
    const data = await cachedApiRequest<{ cities: string[] }>(
      url,
      { method: 'GET', cache: true, cacheTTL: this.CACHE_TTL }
    );
    return data.cities;
  }

  static async getLanguages(): Promise<string[]> {
    const data = await cachedApiRequest<{ languages: string[] }>(
      API_ENDPOINTS.STATIC_DATA.LANGUAGES,
      { method: 'GET', cache: true, cacheTTL: this.CACHE_TTL }
    );
    return data.languages;
  }

  // Batch load common static data
  static async preloadCommonData(): Promise<void> {
    const requests = [
      () => this.getSpiritualPractices(),
      () => this.getSacredTexts(),
      () => this.getCountries(),
      () => this.getLanguages()
    ];

    await batchRequests(requests);
  }

  // Get all location data at once for better performance
  static async getLocationData(country?: string, state?: string): Promise<{
    countries: string[];
    states: string[];
    cities: string[];
  }> {
    const requests = [
      () => this.getCountries(),
      () => this.getStates(country),
      () => this.getCities(state)
    ];

    const [countries, states, cities] = await batchRequests(requests);
    
    return { countries, states, cities };
  }
}
