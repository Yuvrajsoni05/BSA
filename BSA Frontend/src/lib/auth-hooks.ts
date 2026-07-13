import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authAPI, LoginResponse } from "./api/auth";
import Cookies from "js-cookie";

// Query key constant - used to identify this specific query in the cache
const AUTH_QUERY_KEY = ["auth", "user"];

interface User {
  id: string;
  email: string;
  name: string;
}

/**
 * Fetch current user data from server or cookies
 * This query runs on app load to check if user is still authenticated
 */
export function useAuthUser() {
  return useQuery({
    queryKey: AUTH_QUERY_KEY,
    queryFn: async () => {
      // Try to get user from server first
      try {
        const token = Cookies.get("accessToken");
        if (!token) {
          return null;
        }
        const user = await authAPI.getCurrentUser();
        return user as User;
      } catch (error) {
        // If server call fails, try cookies as fallback
        const storedUser = Cookies.get("user");
        if (storedUser) {
          return JSON.parse(storedUser) as User;
        }
        return null;
      }
    },
    staleTime: Infinity, // User data doesn't go stale (we'll invalidate it on logout)
    retry: 1, // Retry once on failure
    enabled: true, // Always enabled
  });
}

/**
 * Login mutation - handles email/password authentication
 * Returns user data and stores token in cookies
 */
export function useLoginMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }): Promise<User> => {
      const response = await authAPI.login(email, password);

      // Store token in cookies (authAPI also does this, but being explicit)
      Cookies.set("accessToken", response.access, {
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });

      // Store user data in cookies for quick access
      if (response.user) {
        Cookies.set("user", JSON.stringify(response.user), {
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
        });
      }

      return response.user as User;
    },
    onSuccess: (user) => {
      // Update the React Query cache with the new user data
      // This makes the useAuthUser hook return immediately with the new user
      queryClient.setQueryData(AUTH_QUERY_KEY, user);
    },
    onError: (error) => {
      // If login fails, make sure to clear any stored data
      Cookies.remove("accessToken");
      Cookies.remove("user");
    },
  });
}

/**
 * Register mutation - creates a new user account
 * Note: This doesn't log the user in automatically
 */
export function useRegisterMutation() {
  return useMutation({
    mutationFn: async ({
      email,
      password,
      name,
    }: {
      email: string;
      password: string;
      name: string;
    }) => {
      const response = await authAPI.register(email, password, name);
      return response;
    },
  });
}

/**
 * Logout mutation - clears session and removes cookies
 * Also clears all React Query cache
 */
export function useLogoutMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      // Call logout endpoint (removes server-side session)
      await authAPI.logout();
      // Note: authAPI.logout() also removes cookies, but we do it again to be sure
      Cookies.remove("accessToken");
      Cookies.remove("user");
    },
    onSuccess: () => {
      // Clear user data from React Query cache
      queryClient.setQueryData(AUTH_QUERY_KEY, null);

      // Clear all queries from cache to reset the app state
      // This prevents stale data from appearing after logout
      queryClient.clear();
    },
    onError: (error) => {
      // Even if logout fails, clear local data
      Cookies.remove("accessToken");
      Cookies.remove("user");
      queryClient.setQueryData(AUTH_QUERY_KEY, null);
    },
  });
}

/**
 * Refresh token mutation - gets a new access token using refresh token
 */
export function useRefreshTokenMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (refreshToken: string): Promise<LoginResponse> => {
      const response = await authAPI.refresh(refreshToken);

      // Update stored access token
      Cookies.set("accessToken", response.access, {
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });

      return response;
    },
    onSuccess: (response) => {
      // Update user data if included in response
      if (response.user) {
        Cookies.set("user", JSON.stringify(response.user), {
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
        });
        queryClient.setQueryData(AUTH_QUERY_KEY, response.user);
      }
    },
  });
}
