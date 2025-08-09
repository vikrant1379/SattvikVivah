
import { apiRequest } from './api.service';
import type { 
  SpiritualProfile, 
  InsertSpiritualProfile, 
  ProfileFilter 
} from '@shared/schema';
import { API_ENDPOINTS } from '@/constants';

export interface ProfileFormData extends Omit<InsertSpiritualProfile, 'id' | 'userId' | 'createdAt' | 'updatedAt'> {
  // Additional form-specific fields if needed
}

/**
 * Service class for handling spiritual profile operations
 * Provides comprehensive CRUD operations and validation
 */
export class ProfileService {
  /**
   * Creates a new spiritual profile
   */
  static async createProfile(profileData: InsertSpiritualProfile): Promise<SpiritualProfile> {
    const response = await apiRequest('POST', API_ENDPOINTS.PROFILES.BASE, profileData);
    const data = await response.json();
    return data.profile;
  }

  /**
   * Retrieves a profile by ID
   */
  static async getProfile(id: string): Promise<SpiritualProfile> {
    const response = await apiRequest('GET', API_ENDPOINTS.PROFILES.BY_ID(id));
    const data = await response.json();
    return data.profile;
  }

  /**
   * Retrieves a profile by user ID
   */
  static async getProfileByUserId(userId: string): Promise<SpiritualProfile> {
    const response = await apiRequest('GET', API_ENDPOINTS.PROFILES.BY_USER_ID(userId));
    const data = await response.json();
    return data.profile;
  }

  /**
   * Updates an existing profile
   */
  static async updateProfile(id: string, updateData: Partial<SpiritualProfile>): Promise<SpiritualProfile> {
    const response = await apiRequest('PUT', API_ENDPOINTS.PROFILES.BY_ID(id), updateData);
    const data = await response.json();
    return data.profile;
  }

  /**
   * Searches for profiles based on filters
   */
  static async searchProfiles(filters: ProfileFilter, excludeUserId?: string): Promise<SpiritualProfile[]> {
    const response = await apiRequest('POST', '/api/profiles/search', {
      filters,
      excludeUserId
    });
    const data = await response.json();
    return data.profiles;
  }

  /**
   * Retrieves featured profiles for homepage display
   */
  static async getFeaturedProfiles(limit: number = 6): Promise<SpiritualProfile[]> {
    const endpoint = `${API_ENDPOINTS.PROFILES.FEATURED}/${limit}`;
    const response = await apiRequest('GET', endpoint);
    const data = await response.json();
    return data.profiles;
  }

  /**
   * Client-side validation for profile form data
   * Returns array of validation errors
   */
  static async validateProfileData(profileData: ProfileFormData): Promise<string[]> {
    const errors: string[] = [];
    
    if (!profileData.name) errors.push('Name is required');
    if (!profileData.age) errors.push('Age is required');
    if (profileData.age && (profileData.age < 18 || profileData.age > 100)) {
      errors.push('Age must be between 18 and 100');
    }
    
    // Add more validation rules as needed
    return errors;
  }
}
