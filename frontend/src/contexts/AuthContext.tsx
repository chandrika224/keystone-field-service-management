import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import type {
  LoginRequest,
  User,
} from "@/types/auth";

import { authService } from "@/services/authService";

import {
  saveTokens,
  clearTokens,
  getAccessToken,
} from "@/utils/token";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;

  login: (
    credentials: LoginRequest
  ) => Promise<void>;

  logout: () => Promise<void>;

  refreshUser: () => Promise<void>;
}

const AuthContext =
  createContext<AuthContextType | null>(
    null
  );

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [user, setUser] =
    useState<User | null>(null);

  const [loading, setLoading] =
    useState(true);

  const isAuthenticated =
    !!user;

  useEffect(() => {
    initializeAuth();
  }, []);

  async function initializeAuth() {
    try {
      const token =
        getAccessToken();

      if (!token) {
        setLoading(false);
        return;
      }

      const profile =
        await authService.getProfile();

      setUser(profile);
    } catch (error) {
      clearTokens();
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  async function login(
    credentials: LoginRequest
  ) {
    const response =
      await authService.login(
        credentials
      );

    saveTokens(
      response.accessToken,
      response.refreshToken
    );

    setUser(response.user);
  }

  async function logout() {
    try {
      await authService.logout();
    } catch {
      // Ignore backend logout errors
    }

    clearTokens();

    setUser(null);
  }

  async function refreshUser() {
    try {
      const profile =
        await authService.getProfile();

      setUser(profile);
    } catch {
      setUser(null);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated,
        login,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context =
    useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}