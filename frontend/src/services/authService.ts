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
  register: async (
    request: RegisterRequest
  ): Promise<string> => {
    const response = await api.post<string>(
      `${AUTH_URL}/register`,
      request
    );

    return response.data;
  },

  login: async (
      credentials: LoginRequest
    ): Promise<LoginResponse> => {

      const response = await api.post<LoginResponse>(
        "/auth/login",
        credentials
      );

      return response.data;
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
      `${AUTH_URL}/profile`
    );

    return response.data;
  },

  logout: async (): Promise<void> => {
    await api.post(`${AUTH_URL}/logout`);
  },
};