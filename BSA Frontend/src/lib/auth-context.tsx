"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import Cookies from "js-cookie";
import { authAPI } from "./api";

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
    const initAuth = async () => {
      try {
        const storedUser = Cookies.get("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Failed to initialize auth:", error);
        Cookies.remove("accessToken");
        Cookies.remove("user");
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await authAPI.login(email, password);
      Cookies.set("accessToken", response.access, {
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });

      if (response.user) {
        setUser(response.user);
        Cookies.set("user", JSON.stringify(response.user), {
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
        });
      }
    } catch (error) {
      throw error;
    }
  };

  const register = async (email: string, password: string, name: string) => {
    try {
      await authAPI.register(email, password, name);
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    await authAPI.logout();
    setUser(null);
  };

  if (!isHydrated) {
    return <>{children}</>;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
