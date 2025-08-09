
import { handleApiError, parseApiResponse } from '@/utils';
import { ApiResponse } from '@/types';

export async function apiRequest(
  method: string,
  url: string,
  data?: unknown
): Promise<Response> {
  try {
    const response = await fetch(url, {
      method,
      headers: data ? { "Content-Type": "application/json" } : {},
      body: data ? JSON.stringify(data) : undefined,
      credentials: "include",
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || `HTTP ${response.status}: ${response.statusText}`);
    }

    return response;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
}

// Utility function for typed API requests
export async function typedApiRequest<T>(
  method: string,
  url: string,
  data?: unknown
): Promise<ApiResponse<T>> {
  try {
    const response = await apiRequest(method, url, data);
    return await parseApiResponse<T>(response);
  } catch (error) {
    return { error: handleApiError(error) };
  }
}

// Legacy exports for backward compatibility
export async function fetchSpiritualPractices(): Promise<string[]> {
  const response = await apiRequest("GET", "/api/spiritual-practices");
  const data = await response.json();
  return data.practices;
}

export async function fetchSacredTexts(): Promise<string[]> {
  const response = await apiRequest("GET", "/api/sacred-texts");
  const data = await response.json();
  return data.texts;
}

export async function fetchStates(): Promise<string[]> {
  const response = await apiRequest("GET", "/api/states");
  const data = await response.json();
  return data.states;
}

export async function fetchLanguages(): Promise<string[]> {
  const response = await apiRequest("GET", "/api/languages");
  const data = await response.json();
  return data.languages;
}
