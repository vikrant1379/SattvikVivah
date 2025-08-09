
import { apiRequest } from './api.service';
import { API_ENDPOINTS } from '@/constants';
import { SearchProfilesRequest, SearchProfilesResponse, ProfileSearchFilters } from '@/types';

export class SearchService {
  static async searchProfiles(
    filters: ProfileSearchFilters,
    excludeUserId?: string
  ): Promise<SearchProfilesResponse> {
    const requestData: SearchProfilesRequest = {
      filters,
      excludeUserId
    };

    const response = await apiRequest('POST', API_ENDPOINTS.PROFILES.SEARCH, requestData);
    return response.json();
  }

  static buildSearchFilters(formData: Record<string, any>): ProfileSearchFilters {
    const filters: ProfileSearchFilters = {};

    // Age filters
    if (formData.ageMin) filters.ageMin = parseInt(formData.ageMin);
    if (formData.ageMax) filters.ageMax = parseInt(formData.ageMax);

    // Location filters
    if (formData.country) filters.country = formData.country;
    if (formData.state) filters.state = formData.state;
    if (formData.city) filters.city = formData.city;

    // Spiritual filters
    if (formData.spiritualPractices?.length) filters.spiritualPractices = formData.spiritualPractices;
    if (formData.sacredTexts?.length) filters.sacredTexts = formData.sacredTexts;
    if (formData.guruLineage) filters.guruLineage = formData.guruLineage;

    // Personal filters
    if (formData.education) filters.education = formData.education;
    if (formData.profession) filters.profession = formData.profession;
    if (formData.maritalStatus) filters.maritalStatus = formData.maritalStatus;
    if (formData.caste) filters.caste = formData.caste;
    if (formData.religion) filters.religion = formData.religion;

    return filters;
  }

  static validateSearchFilters(filters: ProfileSearchFilters): string[] {
    const errors: string[] = [];

    if (filters.ageMin && filters.ageMax && filters.ageMin > filters.ageMax) {
      errors.push('Minimum age cannot be greater than maximum age');
    }

    return errors;
  }
}
