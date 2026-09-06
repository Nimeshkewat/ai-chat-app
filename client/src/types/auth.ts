import type { User } from "./user";

export interface RegisterInput {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
}
export interface CheckAuthResponse {
  success: boolean;
  user: User;
}
export interface LogoutResponse {
  success: boolean;
  message: string;
}
