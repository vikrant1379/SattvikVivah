
import { QueryClient, QueryFunction, QueryKey } from "@tanstack/react-query";

// Enhanced error handling with typed responses
async function throwIfResNotOk(res: Response): Promise<void> {
  if (!res.ok) {
    const contentType = res.headers.get('content-type');
    let errorMessage: string;
    
    try {
      if (contentType?.includes('application/json')) {
        const errorData = await res.json();
        errorMessage = errorData.message || errorData.error || res.statusText;
      } else {
        errorMessage = await res.text() || res.statusText;
      }
    } catch {
      errorMessage = res.statusText;
    }
    
    throw new Error(`${res.status}: ${errorMessage}`);
  }
}

// Enhanced API request with timeout and retry logic
export async function apiRequest(
  method: string,
  url: string,
  data?: unknown,
  timeout: number = 30000
): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const res = await fetch(url, {
      method,
      headers: data ? { "Content-Type": "application/json" } : {},
      body: data ? JSON.stringify(data) : undefined,
      credentials: "include",
      signal: controller.signal,
    });

    await throwIfResNotOk(res);
    return res;
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('Request timeout');
    }
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
}

type UnauthorizedBehavior = "returnNull" | "throw";

interface QueryOptions {
  on401: UnauthorizedBehavior;
  timeout?: number;
}

export const getQueryFn: <T>(options: QueryOptions) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior, timeout = 30000 }) =>
  async ({ queryKey, signal }) => {
    const url = (queryKey as string[]).join("/");
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    // Combine external signal with timeout signal
    if (signal) {
      signal.addEventListener('abort', () => controller.abort());
    }

    try {
      const res = await fetch(url, {
        credentials: "include",
        signal: controller.signal,
      });

      if (unauthorizedBehavior === "returnNull" && res.status === 401) {
        return null;
      }

      await throwIfResNotOk(res);
      return await res.json();
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        throw new Error('Request timeout or cancelled');
      }
      throw error;
    } finally {
      clearTimeout(timeoutId);
    }
  };

// Enhanced query client with optimized caching strategy
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 30 * 60 * 1000, // 30 minutes (formerly cacheTime)
      retry: (failureCount, error) => {
        // Don't retry on 4xx errors except 429 (rate limit)
        if (error instanceof Error && error.message.includes('4')) {
          const status = parseInt(error.message.split(':')[0]);
          return status === 429 && failureCount < 3;
        }
        return failureCount < 3;
      },
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
    mutations: {
      retry: (failureCount, error) => {
        // Only retry mutations on network errors, not client errors
        if (error instanceof Error && error.message.includes('4')) {
          return false;
        }
        return failureCount < 2;
      },
      retryDelay: 1000,
    },
  },
});

// Prefetch utility for critical data
export const prefetchQueries = async (queries: Array<{
  queryKey: QueryKey;
  queryFn?: QueryFunction;
  staleTime?: number;
}>) => {
  const prefetchPromises = queries.map(({ queryKey, queryFn, staleTime }) =>
    queryClient.prefetchQuery({
      queryKey,
      queryFn: queryFn || getQueryFn({ on401: "throw" }),
      staleTime: staleTime || 5 * 60 * 1000,
    })
  );

  await Promise.allSettled(prefetchPromises);
};

// Cache invalidation helpers
export const cacheHelpers = {
  invalidateUserData: () => {
    queryClient.invalidateQueries({ queryKey: ['user'] });
    queryClient.invalidateQueries({ queryKey: ['profile'] });
  },
  
  invalidateStaticData: () => {
    queryClient.invalidateQueries({ queryKey: ['spiritual-practices'] });
    queryClient.invalidateQueries({ queryKey: ['sacred-texts'] });
    queryClient.invalidateQueries({ queryKey: ['countries'] });
    queryClient.invalidateQueries({ queryKey: ['states'] });
    queryClient.invalidateQueries({ queryKey: ['cities'] });
    queryClient.invalidateQueries({ queryKey: ['languages'] });
  },

  prefetchStaticData: () => prefetchQueries([
    { queryKey: ['/api/spiritual-practices'], staleTime: 30 * 60 * 1000 },
    { queryKey: ['/api/sacred-texts'], staleTime: 30 * 60 * 1000 },
    { queryKey: ['/api/countries'], staleTime: 60 * 60 * 1000 },
    { queryKey: ['/api/languages'], staleTime: 60 * 60 * 1000 },
  ]),

  clearAll: () => queryClient.clear(),
};
