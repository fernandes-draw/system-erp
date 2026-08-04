export interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
}

export interface AuthState {
  access: string;
  refresh: string;
  user: User;
}

export interface LoginPayload {
  email: string;
  password?: string;
}

export interface RegisterPayload {
  username: string;
  password?: string;
  email: string;
  first_name: string;
  last_name: string;
}

export interface ApiErrorResponse {
  detail?: string;
  [key: string]: unknown;
}