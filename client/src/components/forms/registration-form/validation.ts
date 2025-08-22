
import { RegistrationForm } from './types';

export const validateRegistrationForm = (data: RegistrationForm): string[] => {
  const errors: string[] = [];

  if (!data.profileFor) errors.push("Profile creation purpose is required");
  if (!data.gender) errors.push("Gender selection is required");
  if (!data.email) errors.push("Email address is required");
  if (!data.password) errors.push("Password is required");

  return errors;
};
