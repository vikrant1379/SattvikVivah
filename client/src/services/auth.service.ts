import { apiRequest } from './api.service';

interface LoginCredentials {
  email?: string;
  mobile?: string;
  password?: string;
  otp?: string;
  stayLoggedIn?: boolean;
}

interface SignupData {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  password: string;
  dateOfBirth: string;
  gender: string;
  lookingFor: string;
  profileFor: string;
  religion: string;
  community: string;
  motherTongue: string;
  country: string;
  state: string;
  city: string;
  height: string;
  maritalStatus: string;
  education: string;
  profession: string;
  annualIncome: string;
}

interface AuthUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  isVerified: boolean;
}

interface LoginResponse {
  success: boolean;
  user: AuthUser;
  token: string;
  message: string;
}

interface OtpResponse {
  success: boolean;
  message: string;
}

export class AuthService {
  private static TOKEN_KEY = 'auth_token';
  private static USER_KEY = 'auth_user';

  static async login(credentials: LoginCredentials): Promise<LoginResponse> {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });

      const data = await response.json();

      if (data.success) {
        this.setAuthData(data.token, data.user, credentials.stayLoggedIn);
      }

      return data;
    } catch (error) {
      throw new Error('Login failed. Please try again.');
    }
  }

  static async signup(userData: SignupData): Promise<LoginResponse> {
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });

      const data = await response.json();

      if (data.success) {
        this.setAuthData(data.token, data.user, false);
      }

      return data;
    } catch (error) {
      throw new Error('Signup failed. Please try again.');
    }
  }

  static async sendOtp(contactMethod: string): Promise<OtpResponse> {
    try {
      const response = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contactMethod })
      });

      return response.json();
    } catch (error) {
      throw new Error('Failed to send OTP. Please try again.');
    }
  }

  static async verifyOtp(contactMethod: string, otp: string, stayLoggedIn?: boolean): Promise<LoginResponse> {
    try {
      const response = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contactMethod, otp })
      });

      const data = await response.json();

      if (data.success) {
        this.setAuthData(data.token, data.user, stayLoggedIn);
      }

      return data;
    } catch (error) {
      throw new Error('OTP verification failed. Please try again.');
    }
  }

  static async resetPassword(contactMethod: string, otp: string, newPassword: string): Promise<{ success: boolean; message: string }> {
    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contactMethod, otp, newPassword })
      });

      return response.json();
    } catch (error) {
      throw new Error('Password reset failed. Please try again.');
    }
  }

  static async getCurrentUser(): Promise<AuthUser | null> {
    const userStr = localStorage.getItem(this.USER_KEY) || sessionStorage.getItem(this.USER_KEY);
    if (!userStr) return null;

    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  }

  static async logout(): Promise<void> {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    sessionStorage.removeItem(this.TOKEN_KEY);
    sessionStorage.removeItem(this.USER_KEY);
  }

  static isAuthenticated(): boolean {
    const token = localStorage.getItem('auth_token');
    const user = localStorage.getItem('auth_user');
    return !!(token && user);
  }

  static getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY) || sessionStorage.getItem(this.TOKEN_KEY);
  }

  private static setAuthData(token: string, user: AuthUser, persistent: boolean = false) {
    const storage = persistent ? localStorage : sessionStorage;
    storage.setItem(this.TOKEN_KEY, token);
    storage.setItem(this.USER_KEY, JSON.stringify(user));
  }
}