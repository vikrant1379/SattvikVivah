
import { apiRequest } from './api.service';
import { API_ENDPOINTS } from '@/constants';
import { 
  SpiritualProfile, 
  InsertSpiritualProfile, 
  ProfileFormData,
  ApiResponse 
} from '@/types';

export class ProfileService {
  static async createProfile(profileData: InsertSpiritualProfile): Promise<SpiritualProfile> {
    const response = await apiRequest('POST', API_ENDPOINTS.PROFILES.BASE, profileData);
    const data = await response.json();
    return data.profile;
  }

  static async getProfile(id: string): Promise<SpiritualProfile> {
    const response = await apiRequest('GET', API_ENDPOINTS.PROFILES.BY_ID(id));
    const data = await response.json();
    return data.profile;
  }

  static async getProfileByUserId(userId: string): Promise<SpiritualProfile> {
    const response = await apiRequest('GET', API_ENDPOINTS.PROFILES.BY_USER_ID(userId));
    const data = await response.json();
    return data.profile;
  }

  static async updateProfile(id: string, updateData: Partial<SpiritualProfile>): Promise<SpiritualProfile> {
    const response = await apiRequest('PUT', API_ENDPOINTS.PROFILES.BY_ID(id), updateData);
    const data = await response.json();
    return data.profile;
  }

  static async getFeaturedProfiles(limit: number = 6): Promise<SpiritualProfile[]> {
    const endpoint = `${API_ENDPOINTS.PROFILES.FEATURED}/${limit}`;
    const response = await apiRequest('GET', endpoint);
    const data = await response.json();
    return data.profiles;
  }

  static async validateProfileData(profileData: ProfileFormData): Promise<string[]> {
    // Client-side validation logic
    const errors: string[] = [];
    
    if (!profileData.name) errors.push('Name is required');
    if (!profileData.age) errors.push('Age is required');
    if (profileData.age && (profileData.age < 18 || profileData.age > 100)) {
      errors.push('Age must be between 18 and 100');
    }
    
    return errors;
  }
}
