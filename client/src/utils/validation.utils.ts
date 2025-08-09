
import { VALIDATION_RULES, ERROR_MESSAGES } from '@/constants';
import { ValidationError } from '@/types';

export const validateEmail = (email: string): ValidationError | null => {
  if (!email) {
    return { field: 'email', message: ERROR_MESSAGES.REQUIRED_FIELD };
  }
  
  if (!VALIDATION_RULES.EMAIL.PATTERN.test(email)) {
    return { field: 'email', message: VALIDATION_RULES.EMAIL.MESSAGE };
  }
  
  return null;
};

export const validateMobile = (mobile: string): ValidationError | null => {
  if (!mobile) {
    return { field: 'mobile', message: ERROR_MESSAGES.REQUIRED_FIELD };
  }
  
  const cleanMobile = mobile.replace(/\D/g, '');
  if (!VALIDATION_RULES.MOBILE.PATTERN.test(cleanMobile)) {
    return { field: 'mobile', message: VALIDATION_RULES.MOBILE.MESSAGE };
  }
  
  return null;
};

export const validatePassword = (password: string): ValidationError | null => {
  if (!password) {
    return { field: 'password', message: ERROR_MESSAGES.REQUIRED_FIELD };
  }
  
  if (password.length < VALIDATION_RULES.PASSWORD.MIN_LENGTH) {
    return { field: 'password', message: VALIDATION_RULES.PASSWORD.MESSAGE };
  }
  
  return null;
};

export const validateAge = (age: number): ValidationError | null => {
  if (!age) {
    return { field: 'age', message: ERROR_MESSAGES.REQUIRED_FIELD };
  }
  
  if (age < VALIDATION_RULES.AGE.MIN || age > VALIDATION_RULES.AGE.MAX) {
    return { field: 'age', message: VALIDATION_RULES.AGE.MESSAGE };
  }
  
  return null;
};

export const validateRequired = (value: any, fieldName: string): ValidationError | null => {
  if (!value || (typeof value === 'string' && value.trim() === '')) {
    return { field: fieldName, message: ERROR_MESSAGES.REQUIRED_FIELD };
  }
  return null;
};
