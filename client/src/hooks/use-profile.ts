
import { useState, useCallback } from 'react';
import { ProfileService } from '@/services';
import { SpiritualProfile, ProfileFormData } from '@/types';
import { handleApiError } from '@/utils';

export const useProfile = () => {
  const [profile, setProfile] = useState<SpiritualProfile | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createProfile = useCallback(async (profileData: ProfileFormData): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      const validationErrors = await ProfileService.validateProfileData(profileData);
      if (validationErrors.length > 0) {
        setError(validationErrors[0]);
        return false;
      }

      const newProfile = await ProfileService.createProfile(profileData as any);
      setProfile(newProfile);
      return true;
    } catch (err) {
      setError(handleApiError(err));
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateProfile = useCallback(async (id: string, updateData: Partial<SpiritualProfile>): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      const updatedProfile = await ProfileService.updateProfile(id, updateData);
      setProfile(updatedProfile);
      return true;
    } catch (err) {
      setError(handleApiError(err));
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getProfile = useCallback(async (id: string): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      const fetchedProfile = await ProfileService.getProfile(id);
      setProfile(fetchedProfile);
    } catch (err) {
      setError(handleApiError(err));
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    profile,
    isLoading,
    error,
    createProfile,
    updateProfile,
    getProfile,
    setProfile
  };
};
