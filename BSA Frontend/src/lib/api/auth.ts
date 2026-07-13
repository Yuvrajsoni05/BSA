import { apiClient } from "./client";

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

export const authAPI = {
  login: async (email: string, password: string): Promise<LoginResponse> => {
    const response = await apiClient.post<LoginResponse>("/auth/login/", {
      email,
      password,
    });
    return response.data;
  },

  register: async (
    email: string,
    password: string,
    name: string
  ): Promise<RegisterResponse> => {
    const response = await apiClient.post<RegisterResponse>(
      "/auth/register/",
      {
        email,
        password,
        name,
      }
    );
    return response.data;
  },

  logout: async (): Promise<void> => {
    try {
      await apiClient.post("/auth/logout/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  },

  refresh: async (token: string): Promise<LoginResponse> => {
    const response = await apiClient.post<LoginResponse>("/auth/refresh/", {
      refresh: token,
    });
    return response.data;
  },

  getCurrentUser: async (): Promise<UserResponse> => {
    const response = await apiClient.get<UserResponse>("/auth/user/");
    return response.data;
  },
};
