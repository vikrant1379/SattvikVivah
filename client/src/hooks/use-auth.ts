
import { useState, useCallback } from 'react';
import { AuthService } from '@/services';
import { LoginCredentials, LoginResponse, AuthUser } from '@/types';
import { handleApiError } from '@/utils';

export const useAuth = () => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = useCallback(async (credentials: LoginCredentials): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await AuthService.login(credentials);
      setUser(response.user);
      return true;
    } catch (err) {
      setError(handleApiError(err));
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    setIsLoading(true);
    try {
      await AuthService.logout();
      setUser(null);
    } catch (err) {
      setError(handleApiError(err));
    } finally {
      setIsLoading(false);
    }
  }, []);

  const isAuthenticated = useCallback(() => {
    return AuthService.isAuthenticated();
  }, []);

  return {
    user,
    isLoading,
    error,
    login,
    logout,
    isAuthenticated
  };
};
