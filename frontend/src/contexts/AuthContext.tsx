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
  clearTokens,
  getAccessToken,
  saveAccessToken,
} from "@/utils/token";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;

  login: (
    credentials: LoginRequest
  ) => Promise<User>;

  logout: () => Promise<void>;

  refreshUser: () => Promise<void>;
}

const AuthContext =
  createContext<AuthContextType | null>(null);

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [user, setUser] =
    useState<User | null>(null);

  const [loading, setLoading] =
    useState(true);

  const isAuthenticated = !!user;

  useEffect(() => {
    initializeAuth();
  }, []);

  // Restore logged-in user after page refresh
  async function initializeAuth() {
    try {
      const token = getAccessToken();

      if (!token) {
        setUser(null);
        return;
      }

      const profile =
        await authService.getProfile();

      setUser(profile);

    } catch (error) {
      console.error(
        "Failed to initialize authentication:",
        error
      );

      clearTokens();
      setUser(null);

    } finally {
      setLoading(false);
    }
  }

  // Login
  async function login(
    credentials: LoginRequest
  ): Promise<User> {

    const response =
      await authService.login(credentials);

    console.log(
      "Login Response:",
      response
    );

    saveAccessToken(response.token);

    console.log(
      "Token Saved Successfully"
    );

    console.log(
      "User Role:",
      response.role
    );

    // Get complete user data from database
    const profile =
      await authService.getProfile();

    setUser(profile);

    return profile;
  }

  // Logout
  async function logout() {
    try {
      await authService.logout();
    } catch {
      // Ignore backend logout errors
    }

    clearTokens();
    setUser(null);
  }

  // Refresh current user
  async function refreshUser() {
    try {
      const profile =
        await authService.getProfile();

      setUser(profile);

    } catch (error) {
      console.error(
        "Failed to refresh user:",
        error
      );

      clearTokens();
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