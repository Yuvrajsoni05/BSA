# API Module Template

This file shows how to create new API modules following the established pattern.

## Example: Users API

Create a new file `src/lib/api/users.ts`:

```typescript
import { apiClient } from "./client";

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface UpdateUserPayload {
  name?: string;
  email?: string;
}

export const usersAPI = {
  // GET /users/:id
  getUser: async (id: string): Promise<User> => {
    const response = await apiClient.get<User>(`/users/${id}/`);
    return response.data;
  },

  // GET /users
  listUsers: async (params?: { limit?: number; offset?: number }) => {
    const response = await apiClient.get("/users/", { params });
    return response.data;
  },

  // PATCH /users/:id
  updateUser: async (id: string, data: UpdateUserPayload): Promise<User> => {
    const response = await apiClient.patch<User>(`/users/${id}/`, data);
    return response.data;
  },

  // DELETE /users/:id
  deleteUser: async (id: string): Promise<void> => {
    await apiClient.delete(`/users/${id}/`);
  },
};
```

## Then export from index.ts

Update `src/lib/api/index.ts`:

```typescript
export { apiClient } from "./client";
export { authAPI } from "./auth";
export type { LoginResponse, RegisterResponse, UserResponse } from "./auth";

// Add your new APIs
export { usersAPI } from "./users";
export type { User, UpdateUserPayload } from "./users";
```

## Use with TanStack Query

In your components:

```typescript
import { usersAPI } from "@/lib/api";
import { useQuery, useMutation } from "@tanstack/react-query";

export function UserProfile({ userId }: { userId: string }) {
  const { data: user, isLoading } = useQuery({
    queryKey: ["users", userId],
    queryFn: () => usersAPI.getUser(userId),
  });

  const updateMutation = useMutation({
    mutationFn: (data) => usersAPI.updateUser(userId, data),
    onSuccess: () => {
      // Invalidate cache after update
      queryClient.invalidateQueries({ queryKey: ["users", userId] });
    },
  });

  return (
    // Your component JSX
  );
}
```

## Key Points

- ✅ All APIs use the same `apiClient` with global interceptors
- ✅ Token is automatically added to all requests
- ✅ 401 errors redirect to login automatically
- ✅ Consistent error handling across all modules
- ✅ TypeScript interfaces for all requests/responses
- ✅ Easy to test and mock individual API modules
