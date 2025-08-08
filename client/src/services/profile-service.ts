import { apiRequest } from "./api-service";
import type { SpiritualProfile, InsertSpiritualProfile, ProfileFilter } from "@shared/schema";

export class ProfileService {
  static async createProfile(profile: InsertSpiritualProfile): Promise<SpiritualProfile> {
    const response = await apiRequest("POST", "/api/profiles", profile);
    const data = await response.json();
    return data.profile;
  }

  static async getProfile(id: string): Promise<SpiritualProfile> {
    const response = await apiRequest("GET", `/api/profiles/${id}`);
    const data = await response.json();
    return data.profile;
  }

  static async getProfileByUserId(userId: string): Promise<SpiritualProfile> {
    const response = await apiRequest("GET", `/api/profiles/user/${userId}`);
    const data = await response.json();
    return data.profile;
  }

  static async updateProfile(id: string, updates: Partial<SpiritualProfile>): Promise<SpiritualProfile> {
    const response = await apiRequest("PUT", `/api/profiles/${id}`, updates);
    const data = await response.json();
    return data.profile;
  }

  static async searchProfiles(filters: ProfileFilter, excludeUserId?: string): Promise<SpiritualProfile[]> {
    const response = await apiRequest("POST", "/api/profiles/search", {
      filters,
      excludeUserId
    });
    const data = await response.json();
    return data.profiles;
  }

  static async getFeaturedProfiles(limit: number = 6): Promise<SpiritualProfile[]> {
    const response = await apiRequest("GET", `/api/profiles/featured/${limit}`);
    const data = await response.json();
    return data.profiles;
  }
}
