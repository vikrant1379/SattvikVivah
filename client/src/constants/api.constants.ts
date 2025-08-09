
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/auth/login',
  },
  USERS: {
    BASE: '/api/users',
    BY_ID: (id: string) => `/api/users/${id}`,
  },
  PROFILES: {
    BASE: '/api/profiles',
    BY_ID: (id: string) => `/api/profiles/${id}`,
    BY_USER_ID: (userId: string) => `/api/profiles/user/${userId}`,
    SEARCH: '/api/profiles/search',
    FEATURED: '/api/profiles/featured',
  },
  INTERESTS: {
    BASE: '/api/interests',
    BY_PROFILE: (profileId: string) => `/api/interests/profile/${profileId}`,
    UPDATE_STATUS: (id: string) => `/api/interests/${id}/status`,
  },
  QUOTES: {
    RANDOM: '/api/quotes/random',
    ALL: '/api/quotes',
  },
  STATIC_DATA: {
    SPIRITUAL_PRACTICES: '/api/spiritual-practices',
    SACRED_TEXTS: '/api/sacred-texts',
    COUNTRIES: '/api/countries',
    STATES: '/api/states',
    CITIES: '/api/cities',
    LANGUAGES: '/api/languages',
  },
} as const;

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const;
