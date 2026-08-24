// login

import { ApiResponse } from './api';

export interface LoginInput {
  email: string;
  password: string;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  payday_date: string;
  alert_threshold: number;
  created_at: string;
}

export interface LoginData {
  user: AuthUser;
  token: string;
}

export type LoginResponse = ApiResponse<LoginData>;

// register
export interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

export type RegisterResponse = ApiResponse<LoginData>;
