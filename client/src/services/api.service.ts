import { createApiUrl, handleApiError } from '@/utils';
import { ApiResponse } from '@/types';

// Enhanced cache entry interface with better typing
interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number;
  etag?: string;
}

// Request configuration with comprehensive options
interface RequestConfig {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  body?: unknown;
  cache?: boolean;
  cacheTTL?: number;
  timeout?: number;
  retries?: number;
  etag?: boolean;
}

// Cache statistics for monitoring
interface CacheStats {
  hits: number;
  misses: number;
  size: number;
}

class ApiCache {
  private cache = new Map<string, CacheEntry<any>>();
  private readonly DEFAULT_TTL = 5 * 60 * 1000; // 5 minutes
  private readonly MAX_CACHE_SIZE = 100; // Prevent memory leaks
  private stats: CacheStats = { hits: 0, misses: 0, size: 0 };

  set<T>(key: string, data: T, ttl: number = this.DEFAULT_TTL, etag?: string): void {
    // Implement LRU eviction if cache is full
    if (this.cache.size >= this.MAX_CACHE_SIZE) {
      const firstKey = this.cache.keys().next().value;
      if (firstKey) {
        this.cache.delete(firstKey);
      }
    }

    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl,
      etag
    });
    this.stats.size = this.cache.size;
  }

  get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    if (!entry) {
      this.stats.misses++;
      return null;
    }

    const now = Date.now();
    if (now - entry.timestamp > entry.ttl) {
      this.cache.delete(key);
      this.stats.misses++;
      this.stats.size = this.cache.size;
      return null;
    }

    this.stats.hits++;
    return entry.data;
  }

  getEtag(key: string): string | undefined {
    const entry = this.cache.get(key);
    return entry?.etag;
  }

  clear(): void {
    this.cache.clear();
    this.stats = { hits: 0, misses: 0, size: 0 };
  }

  delete(key: string): boolean {
    const deleted = this.cache.delete(key);
    this.stats.size = this.cache.size;
    return deleted;
  }

  getStats(): CacheStats {
    return { ...this.stats };
  }

  // Clean expired entries
  cleanup(): void {
    const now = Date.now();
    for (const [key, entry] of this.cache.entries()) {
      if (now - entry.timestamp > entry.ttl) {
        this.cache.delete(key);
      }
    }
    this.stats.size = this.cache.size;
  }
}

const apiCache = new ApiCache();

// Cleanup expired cache entries every 10 minutes
setInterval(() => apiCache.cleanup(), 10 * 60 * 1000);

// Enhanced retry logic with exponential backoff
async function retryRequest<T>(
  fn: () => Promise<T>,
  retries: number = 3,
  baseDelay: number = 1000
): Promise<T> {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      if (attempt === retries) {
        throw error;
      }

      // Don't retry on 4xx errors (client errors)
      if (error instanceof Error && error.message.includes('4')) {
        throw error;
      }

      // Exponential backoff with jitter
      const delay = baseDelay * Math.pow(2, attempt) + Math.random() * 1000;
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  throw new Error('Retry limit exceeded');
}

export async function apiRequest(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
  url: string,
  data?: unknown,
  config: Partial<RequestConfig> = {}
): Promise<Response> {
  const {
    timeout = 30000,
    retries = 3,
    headers = {},
    etag = false
  } = config;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  const requestHeaders: Record<string, string> = {
    ...headers,
    ...(data ? { "Content-Type": "application/json" } : {})
  };

  // Add ETag support for conditional requests
  if (etag && method === 'GET') {
    const cachedEtag = apiCache.getEtag(`${method}:${url}`);
    if (cachedEtag) {
      requestHeaders['If-None-Match'] = cachedEtag;
    }
  }

  const makeRequest = async (): Promise<Response> => {
    const response = await fetch(url, {
      method,
      headers: requestHeaders,
      body: data ? JSON.stringify(data) : undefined,
      credentials: "include",
      signal: controller.signal,
    });

    if (!response.ok && response.status !== 304) {
      const errorText = await response.text().catch(() => response.statusText);
      throw new Error(`${response.status}: ${errorText}`);
    }

    return response;
  };

  try {
    return await retryRequest(makeRequest, retries);
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('Request timeout');
    }
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
}

export async function cachedApiRequest<T>(
  url: string,
  config: RequestConfig = { method: 'GET', cache: true }
): Promise<T> {
  const { method, cache = true, cacheTTL, etag = true, ...requestConfig } = config;

  // Only cache GET requests
  if (method === 'GET' && cache) {
    const cacheKey = `${method}:${url}`;
    const cached = apiCache.get<T>(cacheKey);
    if (cached) {
      return cached;
    }
  }

  const response = await apiRequest(method, url, requestConfig.body, {
    ...requestConfig,
    etag
  });

  // Handle 304 Not Modified
  if (response.status === 304 && method === 'GET') {
    const cacheKey = `${method}:${url}`;
    const cached = apiCache.get<T>(cacheKey);
    if (cached) {
      return cached;
    }
  }

  const data = await response.json();

  // Cache successful GET responses with ETag support
  if (method === 'GET' && cache && response.ok) {
    const cacheKey = `${method}:${url}`;
    const responseEtag = response.headers.get('etag');
    apiCache.set(cacheKey, data, cacheTTL, responseEtag || undefined);
  }

  return data;
}

// Batch request utility with concurrency control
export async function batchRequests<T>(
  requests: Array<() => Promise<T>>,
  concurrency: number = 5
): Promise<T[]> {
  const results: T[] = [];

  for (let i = 0; i < requests.length; i += concurrency) {
    const batch = requests.slice(i, i + concurrency);
    const batchResults = await Promise.all(batch.map(request => request()));
    results.push(...batchResults);
  }

  return results;
}

// Enhanced preload utility with priority support
export function preloadData(
  urls: string[], 
  priority: 'high' | 'low' = 'low',
  cacheTTL?: number
): void {
  const preloadFn = () => {
    urls.forEach(url => {
      cachedApiRequest(url, { 
        method: 'GET', 
        cache: true, 
        cacheTTL 
      }).catch(() => {
        // Silently fail preload requests
      });
    });
  };

  if ('requestIdleCallback' in window && priority === 'low') {
    requestIdleCallback(preloadFn, { timeout: 5000 });
  } else {
    // High priority or no requestIdleCallback support
    setTimeout(preloadFn, 0);
  }
}

// Utility function for typed API requests with better error handling
export async function typedApiRequest<T>(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
  url: string,
  data?: unknown,
  config?: Partial<RequestConfig>
): Promise<ApiResponse<T>> {
  try {
    const response = await apiRequest(method, url, data, config);
    const responseData = await response.json();
    return { data: responseData };
  } catch (error) {
    return { error: handleApiError(error) };
  }
}

// Cache management utilities
export const cacheManager = {
  getStats: () => apiCache.getStats(),
  clear: () => apiCache.clear(),
  delete: (key: string) => apiCache.delete(key),
  cleanup: () => apiCache.cleanup()
};

export { apiCache };