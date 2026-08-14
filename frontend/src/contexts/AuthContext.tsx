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

      const token = getAccessToken();

      if (token) {
        // Temporary
        setUser({} as User);
      }

      setLoading(false);
    }
async function login(credentials: LoginRequest): Promise<User> {
  const response = await authService.login(credentials);

  console.log("Login Response:", response);

  saveAccessToken(response.token);

  console.log("Token Saved Successfully");
  console.log("User Role:", response.role);

  const loggedInUser: User = {
    id: response.id,
    firstName: response.firstName,
    lastName: response.lastName,
    email: response.email,
    role: response.role,
  };

  setUser(loggedInUser);

  return loggedInUser;

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