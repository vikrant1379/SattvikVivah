
import { cachedApiRequest, batchRequests, preloadData } from './api.service';
import { API_ENDPOINTS } from '@/constants';

// Type definitions for better TypeScript support
interface StaticDataResponse<T> {
  [key: string]: T;
}

interface LocationData {
  countries: string[];
  states: string[];
  cities: string[];
}

interface CacheConfig {
  ttl: number;
  preload: boolean;
}

export class StaticDataService {
  private static readonly CACHE_TTL = 30 * 60 * 1000; // 30 minutes for static data
  private static readonly LOCATION_CACHE_TTL = 60 * 60 * 1000; // 1 hour for location data
  private static readonly LONG_CACHE_TTL = 2 * 60 * 60 * 1000; // 2 hours for very static data

  // Cache configuration for different data types
  private static readonly CACHE_CONFIGS: Record<string, CacheConfig> = {
    spiritualPractices: { ttl: this.CACHE_TTL, preload: true },
    sacredTexts: { ttl: this.CACHE_TTL, preload: true },
    countries: { ttl: this.LOCATION_CACHE_TTL, preload: true },
    states: { ttl: this.LOCATION_CACHE_TTL, preload: false },
    cities: { ttl: this.LOCATION_CACHE_TTL, preload: false },
    languages: { ttl: this.LONG_CACHE_TTL, preload: true },
  };

  static async getSpiritualPractices(): Promise<string[]> {
    const config = this.CACHE_CONFIGS.spiritualPractices;
    const data = await cachedApiRequest<StaticDataResponse<string[]>>(
      API_ENDPOINTS.STATIC_DATA.SPIRITUAL_PRACTICES,
      { method: 'GET', cache: true, cacheTTL: config.ttl }
    );
    return data.practices || [];
  }

  static async getSacredTexts(): Promise<string[]> {
    const config = this.CACHE_CONFIGS.sacredTexts;
    const data = await cachedApiRequest<StaticDataResponse<string[]>>(
      API_ENDPOINTS.STATIC_DATA.SACRED_TEXTS,
      { method: 'GET', cache: true, cacheTTL: config.ttl }
    );
    return data.texts || [];
  }

  static async getCountries(): Promise<string[]> {
    const config = this.CACHE_CONFIGS.countries;
    const data = await cachedApiRequest<StaticDataResponse<string[]>>(
      API_ENDPOINTS.STATIC_DATA.COUNTRIES,
      { method: 'GET', cache: true, cacheTTL: config.ttl }
    );
    return data.countries || [];
  }

  static async getStates(country?: string): Promise<string[]> {
    const config = this.CACHE_CONFIGS.states;
    const url = country 
      ? `${API_ENDPOINTS.STATIC_DATA.STATES}?country=${encodeURIComponent(country)}`
      : API_ENDPOINTS.STATIC_DATA.STATES;
    
    const data = await cachedApiRequest<StaticDataResponse<string[]>>(
      url,
      { method: 'GET', cache: true, cacheTTL: config.ttl }
    );
    return data.states || [];
  }

  static async getCities(state?: string): Promise<string[]> {
    const config = this.CACHE_CONFIGS.cities;
    const url = state
      ? `${API_ENDPOINTS.STATIC_DATA.CITIES}?state=${encodeURIComponent(state)}`
      : API_ENDPOINTS.STATIC_DATA.CITIES;
    
    const data = await cachedApiRequest<StaticDataResponse<string[]>>(
      url,
      { method: 'GET', cache: true, cacheTTL: config.ttl }
    );
    return data.cities || [];
  }

  static async getLanguages(): Promise<string[]> {
    const config = this.CACHE_CONFIGS.languages;
    const data = await cachedApiRequest<StaticDataResponse<string[]>>(
      API_ENDPOINTS.STATIC_DATA.LANGUAGES,
      { method: 'GET', cache: true, cacheTTL: config.ttl }
    );
    return data.languages || [];
  }

  // Optimized batch loading with error resilience
  static async preloadCommonData(): Promise<void> {
    const requests = [
      () => this.getSpiritualPractices().catch(() => []),
      () => this.getSacredTexts().catch(() => []),
      () => this.getCountries().catch(() => []),
      () => this.getLanguages().catch(() => [])
    ];

    try {
      await batchRequests(requests, 3); // Reduced concurrency for better stability
    } catch (error) {
      console.warn('Failed to preload some static data:', error);
    }
  }

  // Enhanced location data loading with smart caching
  static async getLocationData(country?: string, state?: string): Promise<LocationData> {
    const requests: Array<() => Promise<string[]>> = [
      () => this.getCountries(),
      () => country ? this.getStates(country) : Promise.resolve([]),
      () => state ? this.getCities(state) : Promise.resolve([])
    ];

    try {
      const [countries, states, cities] = await batchRequests(requests, 2);
      return { countries, states, cities };
    } catch (error) {
      console.warn('Failed to load location data:', error);
      return { countries: [], states: [], cities: [] };
    }
  }

  // Intelligent preloading based on user behavior
  static preloadByPriority(priority: 'high' | 'low' = 'low'): void {
    const highPriorityUrls = [
      API_ENDPOINTS.STATIC_DATA.SPIRITUAL_PRACTICES,
      API_ENDPOINTS.STATIC_DATA.SACRED_TEXTS,
    ];

    const lowPriorityUrls = [
      API_ENDPOINTS.STATIC_DATA.COUNTRIES,
      API_ENDPOINTS.STATIC_DATA.LANGUAGES,
    ];

    const urls = priority === 'high' ? highPriorityUrls : [...highPriorityUrls, ...lowPriorityUrls];
    
    preloadData(urls, priority, this.CACHE_TTL);
  }

  // Cache warming for critical data
  static async warmCache(): Promise<void> {
    // Warm cache with most frequently accessed data
    const criticalData = [
      this.getSpiritualPractices,
      this.getSacredTexts,
      this.getCountries
    ];

    const warmingPromises = criticalData.map(fn => 
      fn.call(this).catch(error => 
        console.warn(`Failed to warm cache for ${fn.name}:`, error)
      )
    );

    await Promise.allSettled(warmingPromises);
  }

  // Performance monitoring
  static async getDataWithMetrics<T>(
    dataFetcher: () => Promise<T>,
    dataType: string
  ): Promise<T> {
    const startTime = performance.now();
    
    try {
      const result = await dataFetcher();
      const endTime = performance.now();
      
      if (endTime - startTime > 1000) {
        console.warn(`Slow data fetch for ${dataType}: ${endTime - startTime}ms`);
      }
      
      return result;
    } catch (error) {
      console.error(`Data fetch failed for ${dataType}:`, error);
      throw error;
    }
  }
}
