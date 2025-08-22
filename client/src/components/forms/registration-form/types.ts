
import { z } from 'zod';
import { emailSchema, passwordSchema } from '@/utils/auth/validation';

export const registrationSchema = z.object({
  profileFor: z.string().min(1, "Please select who you're creating this profile for"),
  gender: z.string().min(1, "Please select gender"),
  email: emailSchema,
  password: passwordSchema,
});

export type RegistrationForm = z.infer<typeof registrationSchema>;
