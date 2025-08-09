
// Performance monitoring and analytics utilities

interface PerformanceMetrics {
  loadTime: number;
  renderTime: number;
  apiCallDuration: number;
  cacheHitRate: number;
  errorRate: number;
}

interface ApiMetrics {
  endpoint: string;
  method: string;
  duration: number;
  status: number;
  cacheHit: boolean;
  timestamp: number;
}

class PerformanceMonitor {
  private metrics: ApiMetrics[] = [];
  private readonly MAX_METRICS = 1000; // Prevent memory leaks

  // Track API call performance
  trackApiCall(metrics: ApiMetrics): void {
    this.metrics.push(metrics);
    
    // Keep only recent metrics
    if (this.metrics.length > this.MAX_METRICS) {
      this.metrics = this.metrics.slice(-this.MAX_METRICS);
    }

    // Log slow API calls
    if (metrics.duration > 3000) {
      console.warn(`Slow API call detected: ${metrics.method} ${metrics.endpoint} took ${metrics.duration}ms`);
    }
  }

  // Get performance statistics
  getStats(): PerformanceMetrics {
    const now = Date.now();
    const recentMetrics = this.metrics.filter(m => now - m.timestamp < 5 * 60 * 1000); // Last 5 minutes

    const totalCalls = recentMetrics.length;
    const cacheHits = recentMetrics.filter(m => m.cacheHit).length;
    const errors = recentMetrics.filter(m => m.status >= 400).length;
    const avgDuration = totalCalls > 0 
      ? recentMetrics.reduce((sum, m) => sum + m.duration, 0) / totalCalls 
      : 0;

    return {
      loadTime: performance.now(),
      renderTime: 0, // To be implemented with React profiler
      apiCallDuration: avgDuration,
      cacheHitRate: totalCalls > 0 ? (cacheHits / totalCalls) * 100 : 0,
      errorRate: totalCalls > 0 ? (errors / totalCalls) * 100 : 0
    };
  }

  // Clear old metrics
  cleanup(): void {
    const cutoff = Date.now() - 30 * 60 * 1000; // Keep last 30 minutes
    this.metrics = this.metrics.filter(m => m.timestamp > cutoff);
  }
}

export const performanceMonitor = new PerformanceMonitor();

// Performance observer for Core Web Vitals
export const observeWebVitals = (): void => {
  if ('PerformanceObserver' in window) {
    // Largest Contentful Paint
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        console.log('LCP:', entry.startTime);
      }
    }).observe({ entryTypes: ['largest-contentful-paint'] });

    // First Input Delay
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        console.log('FID:', (entry as any).processingStart - entry.startTime);
      }
    }).observe({ entryTypes: ['first-input'] });

    // Cumulative Layout Shift
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!(entry as any).hadRecentInput) {
          console.log('CLS:', (entry as any).value);
        }
      }
    }).observe({ entryTypes: ['layout-shift'] });
  }
};

// Bundle size analyzer (development only)
export const analyzeBundleSize = (): void => {
  if (process.env.NODE_ENV === 'development') {
    console.log('Bundle analysis available in browser dev tools');
  }
};

// Memory usage monitoring
export const monitorMemoryUsage = (): void => {
  if ('memory' in performance) {
    const memory = (performance as any).memory;
    console.log('Memory usage:', {
      used: `${Math.round(memory.usedJSHeapSize / 1048576)} MB`,
      total: `${Math.round(memory.totalJSHeapSize / 1048576)} MB`,
      limit: `${Math.round(memory.jsHeapSizeLimit / 1048576)} MB`
    });
  }
};

// Cleanup interval for performance monitor
setInterval(() => performanceMonitor.cleanup(), 5 * 60 * 1000);
