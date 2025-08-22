
import { z } from 'zod';

export const emailSchema = z.string()
  .min(1, "Email is required")
  .email("Please enter a valid email address")
  .refine((email) => {
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return emailRegex.test(email);
  }, "Please enter a valid email format")
  .refine((email) => {
    const parts = email.split('@');
    if (parts.length !== 2) return false;
    const [localPart, domain] = parts;

    if (!localPart || !domain) return false;

    const domainParts = domain.split('.');
    return domainParts.length >= 2 && domainParts.every(part => part.length > 0);
  }, "Please enter a valid email domain")
  .refine((email) => {
    const domain = email.split('@')[1]?.toLowerCase();
    const invalidDomains = ['test.com', 'example.com', 'temp.com', 'fake.com'];
    return domain && !invalidDomains.includes(domain);
  }, "Please enter a real email address");

export const passwordSchema = z.string()
  .min(8, "Password must be at least 8 characters")
  .max(128, "Password must be less than 128 characters")
  .refine((password) => /[a-z]/.test(password), "Password must contain at least one lowercase letter")
  .refine((password) => /[A-Z]/.test(password), "Password must contain at least one uppercase letter")
  .refine((password) => /\d/.test(password), "Password must contain at least one number")
  .refine((password) => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password), "Password must contain at least one special character");

export interface PasswordStrength {
  score: number;
  feedback: string[];
  hasLowercase: boolean;
  hasUppercase: boolean;
  hasNumber: boolean;
  hasSpecial: boolean;
  hasMinLength: boolean;
}

export const checkPasswordStrength = (password: string): PasswordStrength => {
  const hasLowercase = /[a-z]/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
  const hasMinLength = password.length >= 8;

  const checks = [hasLowercase, hasUppercase, hasNumber, hasSpecial, hasMinLength];
  const score = checks.filter(Boolean).length;

  const feedback: string[] = [];
  if (!hasMinLength) feedback.push("At least 8 characters");
  if (!hasLowercase) feedback.push("One lowercase letter");
  if (!hasUppercase) feedback.push("One uppercase letter");
  if (!hasNumber) feedback.push("One number");
  if (!hasSpecial) feedback.push("One special character");

  return {
    score,
    feedback,
    hasLowercase,
    hasUppercase,
    hasNumber,
    hasSpecial,
    hasMinLength
  };
};
