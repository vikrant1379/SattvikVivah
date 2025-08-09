
import { User, InsertUser } from '@shared/schema';

export type AuthUser = {
  id: string;
  email: string;
  profileFor: string;
  gender: string;
};

export type LoginCredentials = {
  email?: string;
  mobile?: string;
  password: string;
};

export type LoginResponse = {
  user: AuthUser;
  message: string;
};

export { User, InsertUser };
