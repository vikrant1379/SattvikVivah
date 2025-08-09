
# Development Guidelines

This document outlines the best practices, coding standards, and architectural patterns to follow when developing and maintaining this spiritual matchmaking application.

## Table of Contents

1. [TypeScript Standards](#typescript-standards)
2. [ESLint Compliance](#eslint-compliance)
3. [Code Architecture](#code-architecture)
4. [File Organization](#file-organization)
5. [Performance Guidelines](#performance-guidelines)
6. [Testing Standards](#testing-standards)
7. [Git Workflow](#git-workflow)

## TypeScript Standards

### Type Safety
- **Always use strict TypeScript**: Enable all strict compiler options
- **No `any` types**: Use proper type definitions or `unknown` with type guards
- **Explicit return types**: Always define return types for functions and methods
- **Interface over type aliases**: Use interfaces for object shapes, types for unions/primitives

```typescript
// ✅ Good
interface IUserProfile {
  readonly id: string;
  name: string;
  age: number;
  preferences: SpiritualPreferences;
}

const getUserProfile = async (id: string): Promise<IUserProfile> => {
  // implementation
};

// ❌ Bad
const getUserProfile = async (id: any) => {
  // implementation
};
```

### Naming Conventions
- **Interfaces**: Prefix with `I` (e.g., `IUserProfile`)
- **Types**: PascalCase (e.g., `SpiritualProfile`)
- **Enums**: PascalCase with UPPER_CASE members
- **Functions/Variables**: camelCase
- **Classes**: PascalCase
- **Constants**: UPPER_SNAKE_CASE

### Type Definitions
```typescript
// Service layer types
interface IApiService {
  readonly baseUrl: string;
  request<T>(method: HttpMethod, endpoint: string, data?: unknown): Promise<T>;
}

// Domain types
type SpiritualPractice = 'meditation' | 'yoga' | 'prayer' | 'chanting';
type ProfileStatus = 'active' | 'inactive' | 'suspended';

// Utility types
type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
type ApiResponse<T> = {
  readonly data: T;
  readonly message: string;
  readonly success: boolean;
};
```

## ESLint Compliance

### Code Quality Rules
- **Maximum complexity**: 10 (functions should be simple and focused)
- **Maximum function length**: 100 lines
- **Maximum parameters**: 5 parameters per function
- **No magic numbers**: Use named constants

### Import Organization
```typescript
// 1. Node modules
import React, { useCallback, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';

// 2. Internal modules (absolute imports)
import { ProfileService } from '@/services';
import { IUserProfile } from '@/types';

// 3. Relative imports
import './component.css';

// 4. Type-only imports (last)
import type { ComponentProps } from 'react';
```

### Error Handling
```typescript
// ✅ Good - Explicit error handling
const fetchUserProfile = async (id: string): Promise<IUserProfile> => {
  try {
    const profile = await ProfileService.getProfile(id);
    return profile;
  } catch (error) {
    throw new Error(`Failed to fetch profile: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

// ❌ Bad - Silent failures
const fetchUserProfile = async (id: string) => {
  const profile = await ProfileService.getProfile(id).catch(() => null);
  return profile;
};
```

## Code Architecture

### Layered Architecture
```
client/src/
├── components/          # Presentation layer
│   ├── ui/             # Reusable UI components
│   ├── forms/          # Form-specific components
│   └── layout/         # Layout components
├── hooks/              # Custom React hooks
├── services/           # Business logic layer
├── utils/              # Pure utility functions
├── types/              # Type definitions
├── constants/          # Application constants
└── contexts/           # React contexts
```

### Service Layer Pattern
```typescript
// services/profile.service.ts
export class ProfileService {
  private static readonly cache = new Map<string, IUserProfile>();

  static async getProfile(id: string): Promise<IUserProfile> {
    // Check cache first
    if (this.cache.has(id)) {
      return this.cache.get(id)!;
    }

    // Fetch from API
    const profile = await apiRequest<IUserProfile>('GET', `/api/profiles/${id}`);
    
    // Cache result
    this.cache.set(id, profile);
    
    return profile;
  }

  static clearCache(): void {
    this.cache.clear();
  }
}
```

### Custom Hooks Pattern
```typescript
// hooks/use-profile.ts
interface IUseProfileReturn {
  readonly profile: IUserProfile | null;
  readonly isLoading: boolean;
  readonly error: Error | null;
  readonly refetch: () => Promise<void>;
}

export const useProfile = (userId: string): IUseProfileReturn => {
  const {
    data: profile,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['profile', userId],
    queryFn: () => ProfileService.getProfile(userId),
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  });

  return {
    profile: profile ?? null,
    isLoading,
    error: error as Error | null,
    refetch,
  };
};
```

### Context Provider Pattern
```typescript
// contexts/spiritual-context.tsx
interface ISpiritualContextValue {
  readonly filters: IProfileFilter;
  readonly searchResults: readonly IUserProfile[];
  readonly isSearching: boolean;
  setFilters: (filters: IProfileFilter) => void;
  searchProfiles: (filters: IProfileFilter) => Promise<void>;
  clearSearch: () => void;
}

export const SpiritualContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Implementation with proper memoization
  const contextValue = useMemo<ISpiritualContextValue>(() => ({
    // ... context implementation
  }), [/* dependencies */]);

  return (
    <SpiritualContext.Provider value={contextValue}>
      {children}
    </SpiritualContext.Provider>
  );
};
```

## File Organization

### Component Structure
```typescript
// components/profile/profile-card.tsx
interface IProfileCardProps {
  readonly profile: IUserProfile;
  readonly onInterestClick?: (profileId: string) => void;
  readonly className?: string;
}

export const ProfileCard: React.FC<IProfileCardProps> = ({
  profile,
  onInterestClick,
  className
}) => {
  const handleInterestClick = useCallback(() => {
    onInterestClick?.(profile.id);
  }, [onInterestClick, profile.id]);

  return (
    <Card className={cn('profile-card', className)}>
      {/* Component JSX */}
    </Card>
  );
};

ProfileCard.displayName = 'ProfileCard';
```

### Index Files
```typescript
// services/index.ts
export { ProfileService } from './profile.service';
export { AuthService } from './auth.service';
export { SearchService } from './search.service';

// Export types
export type { IProfileService } from './profile.service';
```

## Performance Guidelines

### React Performance
- Use `React.memo` for expensive components
- Implement `useMemo` and `useCallback` appropriately
- Avoid inline objects/functions in render
- Use React Query for server state management

### Bundle Optimization
- Use dynamic imports for code splitting
- Implement tree shaking
- Optimize images and assets
- Use proper caching strategies

### Memory Management
```typescript
// utils/performance.utils.ts
export class PerformanceMonitor {
  private static readonly observers = new Set<PerformanceObserver>();

  static startMonitoring(): void {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        if (entry.duration > 100) {
          console.warn(`Slow operation detected: ${entry.name} took ${entry.duration}ms`);
        }
      });
    });

    observer.observe({ entryTypes: ['measure', 'navigation'] });
    this.observers.add(observer);
  }

  static cleanup(): void {
    this.observers.forEach(observer => observer.disconnect());
    this.observers.clear();
  }
}
```

## Testing Standards

### Unit Tests
```typescript
// __tests__/profile.service.test.ts
describe('ProfileService', () => {
  beforeEach(() => {
    ProfileService.clearCache();
  });

  it('should cache profile data', async () => {
    const mockProfile = createMockProfile();
    jest.spyOn(ProfileService, 'getProfile').mockResolvedValue(mockProfile);

    const profile1 = await ProfileService.getProfile('123');
    const profile2 = await ProfileService.getProfile('123');

    expect(ProfileService.getProfile).toHaveBeenCalledTimes(1);
    expect(profile1).toBe(profile2);
  });
});
```

### Component Tests
```typescript
// __tests__/profile-card.test.tsx
describe('ProfileCard', () => {
  const mockProfile = createMockProfile();

  it('should render profile information correctly', () => {
    render(<ProfileCard profile={mockProfile} />);
    
    expect(screen.getByText(mockProfile.name)).toBeInTheDocument();
    expect(screen.getByText(`Age: ${mockProfile.age}`)).toBeInTheDocument();
  });

  it('should call onInterestClick when interest button is clicked', () => {
    const mockOnInterestClick = jest.fn();
    render(
      <ProfileCard profile={mockProfile} onInterestClick={mockOnInterestClick} />
    );

    fireEvent.click(screen.getByText('Show Interest'));
    expect(mockOnInterestClick).toHaveBeenCalledWith(mockProfile.id);
  });
});
```

## Git Workflow

### Commit Messages
```
feat: add profile matching algorithm
fix: resolve caching issue in profile service
docs: update API documentation
style: format code according to eslint rules
refactor: extract common profile utilities
test: add unit tests for search functionality
perf: optimize profile loading performance
```

### Branch Naming
- `feature/profile-matching`
- `bugfix/cache-memory-leak`
- `hotfix/security-vulnerability`
- `refactor/service-layer-cleanup`

### Pre-commit Checks
```bash
# Before committing, always run:
npm run type-check
npm run lint:check
npm run test
```

## Quality Gates

### Definition of Done
- [ ] TypeScript compilation passes with no errors
- [ ] ESLint passes with no warnings
- [ ] All tests pass
- [ ] Code coverage >= 80%
- [ ] Performance metrics within acceptable range
- [ ] Accessibility standards met (WCAG 2.1 AA)
- [ ] Code reviewed and approved
- [ ] Documentation updated

### Code Review Checklist
- [ ] Proper TypeScript types used throughout
- [ ] Error handling implemented correctly
- [ ] Performance implications considered
- [ ] Security vulnerabilities checked
- [ ] Accessibility guidelines followed
- [ ] Mobile responsiveness verified
- [ ] Browser compatibility tested

---

## Quick Reference Commands

```bash
# Code quality check
npm run code-quality

# Fix ESLint issues automatically
npm run lint:fix

# Type checking
npm run type-check

# Run development server
npm run dev

# Build for production
npm run build
```

Remember: **Code quality is not negotiable.** Every piece of code should meet these standards before being merged into the main branch.
