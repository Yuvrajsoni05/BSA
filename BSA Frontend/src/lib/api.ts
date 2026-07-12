import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = Cookies.get("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      Cookies.remove("accessToken");
      Cookies.remove("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

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
    } finally {
      Cookies.remove("accessToken");
      Cookies.remove("user");
    }
  },

  refresh: async (token: string): Promise<LoginResponse> => {
    const response = await apiClient.post<LoginResponse>("/auth/refresh/", {
      refresh: token,
    });
    return response.data;
  },

  getCurrentUser: async () => {
    const response = await apiClient.get("/auth/user/");
    return response.data;
  },
};
