"use client";

import {
  useAuthUser,
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
} from "./auth-hooks";

/**
 * Main authentication hook - combines all auth operations
 * This replaces the old useAuth() from Context API
 *
 * Usage:
 * const { user, isAuthenticated, isLoading, login, logout } = useAuth();
 */
export function useAuth() {
  // Get user data and loading state
  const { data: user, isLoading: isLoadingUser, error: userError } =
    useAuthUser();

  // Get login mutation
  const loginMutation = useLoginMutation();

  // Get register mutation
  const registerMutation = useRegisterMutation();

  // Get logout mutation
  const logoutMutation = useLogoutMutation();

  return {
    // ===== STATE =====
    /**
     * Current logged-in user or null if not authenticated
     */
    user: user ?? null,

    /**
     * True while checking authentication status on app load
     * Use this to show a loading spinner on app init
     */
    isLoading: isLoadingUser,

    /**
     * True if user is logged in (user !== null)
     */
    isAuthenticated: !!user,

    /**
     * Error from fetching user (if any)
     */
    error: userError,

    // ===== METHODS =====
    /**
     * Login with email and password
     * @param email User email
     * @param password User password
     * @throws Error if login fails
     *
     * Usage:
     * try {
     *   await login("user@example.com", "password123");
     *   // User is now logged in
     * } catch (error) {
     *   console.error("Login failed:", error);
     * }
     */
    login: (email: string, password: string) =>
      loginMutation.mutateAsync({ email, password }),

    /**
     * Register a new account
     * @param email User email
     * @param password User password
     * @param name User full name
     * @throws Error if registration fails
     *
     * Note: This does NOT log the user in. They must login after registering.
     *
     * Usage:
     * try {
     *   await register("new@example.com", "password123", "John Doe");
     *   // Account created, now redirect to login
     * } catch (error) {
     *   console.error("Registration failed:", error);
     * }
     */
    register: (email: string, password: string, name: string) =>
      registerMutation.mutateAsync({ email, password, name }),

    /**
     * Logout the current user
     * Clears all cached data and cookies
     *
     * Usage:
     * await logout();
     * // User is now logged out
     */
    logout: () => logoutMutation.mutateAsync(),

    // ===== INDIVIDUAL LOADING STATES =====
    /**
     * True while login request is in progress
     * Use for disabling submit button during login
     */
    isLoggingIn: loginMutation.isPending,

    /**
     * True while registration request is in progress
     * Use for disabling submit button during registration
     */
    isRegistering: registerMutation.isPending,

    /**
     * True while logout request is in progress
     */
    isLoggingOut: logoutMutation.isPending,

    // ===== INDIVIDUAL ERROR STATES =====
    /**
     * Error from login attempt (if any)
     *
     * Usage:
     * {loginError && <div className="error">{loginError.message}</div>}
     */
    loginError: loginMutation.error,

    /**
     * Error from registration attempt (if any)
     */
    registerError: registerMutation.error,

    /**
     * Error from logout attempt (if any)
     */
    logoutError: logoutMutation.error,

    /**
     * Any error that occurred while fetching user data
     */
    userError: userError,
  };
}
