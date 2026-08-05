import api from "@/lib/api";
import type {
  LoginRequest,
  LoginResponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
  RegisterRequest,
  User,
} from "@/types/auth";

const AUTH_URL = "/auth";

export const authService = {
  login: async (
    credentials: LoginRequest
  ): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>(
      `${AUTH_URL}/login`,
      credentials
    );

    return response.data;
  },

  register: async (
      request: RegisterRequest
    ): Promise<void> => {
      await api.post(
        `${AUTH_URL}/register`,
        request
      );
    },

  refreshToken: async (
    request: RefreshTokenRequest
  ): Promise<RefreshTokenResponse> => {
    const response = await api.post<RefreshTokenResponse>(
      `${AUTH_URL}/refresh`,
      request
    );

    return response.data;
  },

  getProfile: async (): Promise<User> => {
    const response = await api.get<User>(
      `${AUTH_URL}/me`
    );

    return response.data;
  },

  logout: async (): Promise<void> => {
    await api.post(`${AUTH_URL}/logout`);
  },
};