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

  // ==========================================================
  // INITIALIZE AUTHENTICATION
  // ==========================================================

  useEffect(() => {
    initializeAuth();
  }, []);

  async function initializeAuth() {
    try {
      const token = getAccessToken();

      if (!token) {
        setUser(null);
        return;
      }

      /*
       * We currently don't have a /profile endpoint.
       *
       * Therefore, after a browser refresh we cannot
       * reconstruct the complete User object from the backend.
       *
       * Login will populate the user state.
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

  // ==========================================================
  // LOGIN
  // ==========================================================

  async function login(
    credentials: LoginRequest
  ): Promise<User> {

    const response =
      await authService.login(credentials);

    console.log(
      "Login Response:",
      response
    );

    // Save JWT
    saveAccessToken(
      response.token
    );

    console.log(
      "Token Saved Successfully"
    );

    console.log(
      "User Role:",
      response.role
    );

    /*
     * Convert backend LoginResponse
     * into frontend User object.
     *
     * IMPORTANT:
     * customerId is included here.
     */

    const loggedInUser: User = {
      id: response.id,
      customerId: response.customerId,
      firstName: response.firstName,
      lastName: response.lastName,
      email: response.email,
      phone: response.phone,
      address: response.address,
      role: response.role,
    };

    // Store logged-in user in AuthContext
    setUser(loggedInUser);

    // Return user to caller
    return loggedInUser;
  }

  // ==========================================================
  // LOGOUT
  // ==========================================================

  async function logout() {
    try {
      await authService.logout();
    } catch {
      /*
       * Ignore backend logout errors.
       * We still clear the local authentication state.
       */
    }

    clearTokens();

    setUser(null);
  }

  // ==========================================================
  // REFRESH USER
  // ==========================================================

  async function refreshUser() {
    /*
     * /auth/profile does not currently exist.
     *
     * The current user is already stored in AuthContext.
     */

    setUser(
      (currentUser) => currentUser
    );
  }

  // ==========================================================
  // PROVIDER
  // ==========================================================

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

// ============================================================
// useAuth HOOK
// ============================================================

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