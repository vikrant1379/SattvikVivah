
import { apiRequest } from '@/lib/queryClient';

export class BaseApiService {
  protected async get<T>(endpoint: string): Promise<T> {
    const response = await apiRequest('GET', endpoint);
    return response.json();
  }

  protected async post<T>(endpoint: string, data: unknown): Promise<T> {
    const response = await apiRequest('POST', endpoint, data);
    return response.json();
  }

  protected async put<T>(endpoint: string, data: unknown): Promise<T> {
    const response = await apiRequest('PUT', endpoint, data);
    return response.json();
  }

  protected async delete<T>(endpoint: string): Promise<T> {
    const response = await apiRequest('DELETE', endpoint);
    return response.json();
  }
}
