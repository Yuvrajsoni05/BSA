// Re-export from new modular API structure for backward compatibility
export { apiClient } from "./api/client";
export { authAPI } from "./api/auth";
export type { LoginResponse, RegisterResponse, UserResponse } from "./api/auth";
