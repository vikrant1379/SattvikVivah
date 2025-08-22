
import { BaseApiService } from './base';
import type { RegistrationForm } from '@/components/forms/registration-form/types';

export class AuthApiService extends BaseApiService {
  async register(data: RegistrationForm) {
    return this.post('/api/users', data);
  }

  async login(email: string, password: string) {
    return this.post('/api/auth/login', { email, password });
  }

  async logout() {
    return this.post('/api/auth/logout', {});
  }

  async refreshToken() {
    return this.post('/api/auth/refresh', {});
  }
}

export const authApi = new AuthApiService();
