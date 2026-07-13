// Global axios client - use this for any new API modules
export { apiClient } from "./client";

// Auth API endpoints
export { authAPI } from "./auth";
export type { LoginResponse, RegisterResponse, UserResponse } from "./auth";

// Add more APIs here as modules grow:
// export { usersAPI } from "./users";
// export { productsAPI } from "./products";
// etc.
