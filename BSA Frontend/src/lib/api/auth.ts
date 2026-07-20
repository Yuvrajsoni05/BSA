export interface LoginResponse {
  access: string;
  refresh?: string;
  user?: {
    id: string;
    email: string;
    name: string;
  };
}

export interface RegisterResponse {
  id: string;
  email: string;
  name: string;
  message?: string;
}

export interface UserResponse {
  id: string;
  email: string;
  name: string;
}

/**
 * Auth API - Calls local Route Handlers
 * These Route Handlers will be connected to real backend API later
 */
export const authAPI = {
  /**
   * Login with email and password
   * POST /api/auth/login
   */
  login: async (email: string, password: string): Promise<LoginResponse> => {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Login failed");
    }

    return response.json();
  },

  /**
   * Register new user
   * POST /api/auth/register
   */
  register: async (
    email: string,
    password: string,
    name: string
  ): Promise<RegisterResponse> => {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Registration failed");
    }

    return response.json();
  },

  /**
   * Logout user
   * Currently just clears local data
   */
  logout: async (): Promise<void> => {
    try {
      // In production, call logout endpoint to invalidate token
      // await fetch("/api/auth/logout", { method: "POST" });
      console.log("User logged out");
    } catch (error) {
      console.error("Logout error:", error);
    }
  },

  /**
   * Refresh access token
   * POST /api/auth/refresh
   */
  refresh: async (token: string): Promise<LoginResponse> => {
    const response = await fetch("/api/auth/refresh", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh: token }),
    });

    if (!response.ok) {
      throw new Error("Token refresh failed");
    }

    return response.json();
  },

  /**
   * Verify token and get current user
   * GET /api/auth/verify
   */
  getCurrentUser: async (): Promise<UserResponse> => {
    const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;

    if (!token) {
      throw new Error("No token found");
    }

    const response = await fetch("/api/auth/verify", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Verification failed");
    }

    return response.json();
  },
};
