
import { ApiResponse } from '@/types';

export const handleApiError = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === 'string') {
    return error;
  }
  return 'An unexpected error occurred';
};

export const buildQueryParams = (params: Record<string, any>): string => {
  const queryParams = new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      queryParams.append(key, String(value));
    }
  });
  
  return queryParams.toString();
};

export const createApiUrl = (endpoint: string, params?: Record<string, any>): string => {
  const baseUrl = endpoint;
  if (!params) return baseUrl;
  
  const queryString = buildQueryParams(params);
  return queryString ? `${baseUrl}?${queryString}` : baseUrl;
};

export const parseApiResponse = async <T>(response: Response): Promise<ApiResponse<T>> => {
  try {
    const data = await response.json();
    return { data };
  } catch (error) {
    return { error: 'Failed to parse response' };
  }
};
