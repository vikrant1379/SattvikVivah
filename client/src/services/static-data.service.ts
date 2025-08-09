
import { apiRequest } from './api.service';
import { API_ENDPOINTS } from '@/constants';

export class StaticDataService {
  static async getSpiritualPractices(): Promise<string[]> {
    const response = await apiRequest('GET', API_ENDPOINTS.STATIC_DATA.SPIRITUAL_PRACTICES);
    const data = await response.json();
    return data.practices;
  }

  static async getSacredTexts(): Promise<string[]> {
    const response = await apiRequest('GET', API_ENDPOINTS.STATIC_DATA.SACRED_TEXTS);
    const data = await response.json();
    return data.texts;
  }

  static async getCountries(): Promise<string[]> {
    const response = await apiRequest('GET', API_ENDPOINTS.STATIC_DATA.COUNTRIES);
    const data = await response.json();
    return data.countries;
  }

  static async getStates(country?: string): Promise<string[]> {
    const url = country 
      ? `${API_ENDPOINTS.STATIC_DATA.STATES}?country=${encodeURIComponent(country)}`
      : API_ENDPOINTS.STATIC_DATA.STATES;
    
    const response = await apiRequest('GET', url);
    const data = await response.json();
    return data.states;
  }

  static async getCities(state?: string): Promise<string[]> {
    const url = state
      ? `${API_ENDPOINTS.STATIC_DATA.CITIES}?state=${encodeURIComponent(state)}`
      : API_ENDPOINTS.STATIC_DATA.CITIES;
    
    const response = await apiRequest('GET', url);
    const data = await response.json();
    return data.cities;
  }

  static async getLanguages(): Promise<string[]> {
    const response = await apiRequest('GET', API_ENDPOINTS.STATIC_DATA.LANGUAGES);
    const data = await response.json();
    return data.languages;
  }
}
