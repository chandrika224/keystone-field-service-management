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

  // Restore authentication after page refresh
  async function initializeAuth() {
    try {
      const token = getAccessToken();

      if (!token) {
        setUser(null);
        return;
      }

      /*
       * We currently don't have a /profile endpoint
       * in the backend.
       *
       * Therefore, we cannot restore the complete user
       * from the backend here.
       *
       * Authentication will be restored after login
       * using the user information returned by /login.
       */
      setUser(null);

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
      const response = await authService.login(credentials);

      console.log("Login Response:", response);

      // Save JWT
      saveAccessToken(response.token);

      console.log("Token Saved Successfully");
      console.log("User Role:", response.role);

      // Convert LoginResponse into User
      const loggedInUser: User = {
        id: response.id,
        firstName: response.firstName,
        lastName: response.lastName,
        email: response.email,
        phone: response.phone,
        address: response.address,
        role: response.role,
      };

      setUser(loggedInUser);

      return loggedInUser;
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
    /*
     * /auth/profile does not currently exist
     * in the backend.
     *
     * Since the current user is already stored
     * in AuthContext, there is nothing to fetch here.
     */
    setUser((currentUser) => currentUser);
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