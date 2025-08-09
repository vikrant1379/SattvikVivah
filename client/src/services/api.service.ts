
import { createApiUrl, handleApiError } from '@/utils';

// Simple in-memory cache with TTL
interface CacheEntry<T> = {
  data: T;
  timestamp: number;
  ttl: number;
}

class ApiCache {
  private cache = new Map<string, CacheEntry<any>>();
  private readonly DEFAULT_TTL = 5 * 60 * 1000; // 5 minutes

  set<T>(key: string, data: T, ttl: number = this.DEFAULT_TTL): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl
    });
  }

  get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    if (!entry) return null;

    const now = Date.now();
    if (now - entry.timestamp > entry.ttl) {
      this.cache.delete(key);
      return null;
    }

    return entry.data;
  }

  clear(): void {
    this.cache.clear();
  }

  delete(key: string): boolean {
    return this.cache.delete(key);
  }
}

const apiCache = new ApiCache();

interface RequestConfig {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  body?: unknown;
  cache?: boolean;
  cacheTTL?: number;
}

export async function apiRequest(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
  url: string,
  data?: unknown
): Promise<Response> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 30000); // 30s timeout

  try {
    const response = await fetch(url, {
      method,
      headers: data ? { "Content-Type": "application/json" } : {},
      body: data ? JSON.stringify(data) : undefined,
      credentials: "include",
      signal: controller.signal,
    });

    if (!response.ok) {
      const text = (await response.text()) || response.statusText;
      throw new Error(`${response.status}: ${text}`);
    }

    return response;
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('Request timeout');
    }
    throw error;
  } finally {
    clearTimeout(timeout);
  }
}

export async function cachedApiRequest<T>(
  url: string,
  config: RequestConfig = { method: 'GET', cache: true }
): Promise<T> {
  const { method, cache = true, cacheTTL, ...requestConfig } = config;
  
  // Only cache GET requests
  if (method === 'GET' && cache) {
    const cacheKey = `${method}:${url}`;
    const cached = apiCache.get<T>(cacheKey);
    if (cached) {
      return cached;
    }
  }

  const response = await apiRequest(method, url, requestConfig.body);
  const data = await response.json();

  // Cache successful GET responses
  if (method === 'GET' && cache) {
    const cacheKey = `${method}:${url}`;
    apiCache.set(cacheKey, data, cacheTTL);
  }

  return data;
}

// Batch request utility for multiple API calls
export async function batchRequests<T>(
  requests: Array<() => Promise<T>>
): Promise<T[]> {
  return Promise.all(requests.map(request => request()));
}

// Preload utility for prefetching data
export function preloadData(urls: string[], priority: 'high' | 'low' = 'low'): void {
  if ('requestIdleCallback' in window && priority === 'low') {
    requestIdleCallback(() => {
      urls.forEach(url => {
        cachedApiRequest(url, { method: 'GET', cache: true });
      });
    });
  } else {
    urls.forEach(url => {
      cachedApiRequest(url, { method: 'GET', cache: true });
    });
  }
}

export { apiCache };
