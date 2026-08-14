export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  role:
    | "CUSTOMER"
    | "DISPATCHER"
    | "TECHNICIAN"
    | "MANAGER";
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  termsAccepted: boolean;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  message: string;
  role:
    | "CUSTOMER"
    | "DISPATCHER"
    | "TECHNICIAN"
    | "MANAGER";

  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}