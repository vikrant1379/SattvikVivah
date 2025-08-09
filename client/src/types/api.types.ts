
export type ApiResponse<T> = {
  data?: T;
  error?: string;
  message?: string;
};

export type PaginatedResponse<T> = {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
};

export type SearchProfilesRequest = {
  filters: Record<string, any>;
  excludeUserId?: string;
};

export type SearchProfilesResponse = {
  profiles: any[];
};
