import { useState, useCallback, useEffect } from 'react';
import { AuthService } from '@/services';

interface LoginCredentials {
  email?: string;
  mobile?: string;
  password?: string;
  otp?: string;
  stayLoggedIn?: boolean;
}

interface AuthUser {
  id: string;
  firstName: string;
  lastName: string;
  name: string;
  email: string;
  mobile: string;
  isVerified: boolean;
}

export const useAuth = () => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load user on mount
  useEffect(() => {
    const loadUser = async () => {
      try {
        const currentUser = await AuthService.getCurrentUser();
        if (currentUser && AuthService.isAuthenticated()) {
          console.log('useAuth - Loading existing user:', currentUser);
          setUser(currentUser);
        } else {
          console.log('useAuth - No valid user found, clearing auth');
          await AuthService.logout();
        }
      } catch (err) {
        console.error('Failed to load user:', err);
        // If user data is corrupted, clear auth
        await AuthService.logout();
      } finally {
        setIsLoading(false);
      }
    };
    loadUser();
  }, []);

  const login = useCallback(async (credentials: LoginCredentials): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await AuthService.login(credentials);
      if (response.success) {
        setUser(response.user);
        return true;
      } else {
        setError(response.message || 'Login failed');
        return false;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const signup = useCallback(async (userData: any): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await AuthService.signup(userData);
      if (response.success) {
        setUser(response.user);
        return true;
      } else {
        setError(response.message || 'Signup failed');
        return false;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Signup failed');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const sendOtp = useCallback(async (contactMethod: string): Promise<boolean> => {
    setError(null);
    try {
      const response = await AuthService.sendOtp(contactMethod);
      if (!response.success) {
        setError(response.message || 'Failed to send OTP');
        return false;
      }
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send OTP');
      return false;
    }
  }, []);

  const verifyOtp = useCallback(async (contactMethod: string, otp: string, stayLoggedIn?: boolean): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await AuthService.verifyOtp(contactMethod, otp, stayLoggedIn);
      if (response.success) {
        setUser(response.user);
        return true;
      } else {
        setError(response.message || 'OTP verification failed');
        return false;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'OTP verification failed');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const resetPassword = useCallback(async (contactMethod: string, otp: string, newPassword: string): Promise<boolean> => {
    setError(null);
    try {
      const response = await AuthService.resetPassword(contactMethod, otp, newPassword);
      if (!response.success) {
        setError(response.message || 'Password reset failed');
        return false;
      }
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Password reset failed');
      return false;
    }
  }, []);

  const logout = useCallback(async () => {
    setIsLoading(true);
    try {
      await AuthService.logout();
      setUser(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Logout failed');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const isAuthenticated = (): boolean => {
    // If still loading, check service directly
    if (isLoading) {
      const serviceAuth = AuthService.isAuthenticated();
      console.log('Auth check (loading) - serviceAuth:', serviceAuth);
      return serviceAuth;
    }
    
    const hasUser = !!user;
    const hasToken = AuthService.isAuthenticated();
    console.log('Auth check - hasUser:', hasUser, 'hasToken:', hasToken, 'user:', user);
    return hasUser && hasToken;
  };

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    user,
    isLoading,
    error,
    login,
    signup,
    sendOtp,
    verifyOtp,
    resetPassword,
    logout,
    isAuthenticated,
    clearError
  };
};