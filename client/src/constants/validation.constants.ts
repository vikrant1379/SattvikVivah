
export const VALIDATION_RULES = {
  EMAIL: {
    PATTERN: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
    MESSAGE: 'Please enter a valid email address',
  },
  MOBILE: {
    PATTERN: /^[6-9]\d{9}$/,
    MESSAGE: 'Please enter a valid 10-digit mobile number',
  },
  PASSWORD: {
    MIN_LENGTH: 8,
    MESSAGE: 'Password must be at least 8 characters long',
  },
  AGE: {
    MIN: 18,
    MAX: 100,
    MESSAGE: 'Age must be between 18 and 100',
  },
} as const;

export const ERROR_MESSAGES = {
  REQUIRED_FIELD: 'This field is required',
  INVALID_FORMAT: 'Invalid format',
  SERVER_ERROR: 'Something went wrong. Please try again.',
  NETWORK_ERROR: 'Network error. Please check your connection.',
} as const;
