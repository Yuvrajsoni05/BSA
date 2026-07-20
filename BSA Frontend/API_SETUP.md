# API Setup - Login & Register Implementation

## Overview

The authentication system is now set up with:
1. **Route Handlers** - Local API endpoints that will be connected to your real backend
2. **Auth API Client** - Communicates with Route Handlers
3. **Middleware** - Edge middleware protecting routes
4. **Auth Hooks** - TanStack Query hooks for login/register/logout

## Current Architecture

```
┌──────────────────────────────────────────────────────┐
│ Client (React Components)                           │
│ - LoginForm.tsx                                      │
│ - RegisterForm.tsx                                   │
└────────────────┬─────────────────────────────────────┘
                 │ (calls)
┌────────────────▼─────────────────────────────────────┐
│ Auth Hooks (TanStack Query)                         │
│ - useAuthUser()                                      │
│ - useLoginMutation()                                 │
│ - useRegisterMutation()                              │
└────────────────┬─────────────────────────────────────┘
                 │ (calls)
┌────────────────▼─────────────────────────────────────┐
│ Auth API Client                                      │
│ - authAPI.login()                                    │
│ - authAPI.register()                                 │
│ - authAPI.getCurrentUser()                           │
└────────────────┬─────────────────────────────────────┘
                 │ (HTTP requests)
┌────────────────▼─────────────────────────────────────┐
│ Route Handlers (Next.js App Router)                 │
│ - POST /api/auth/login                              │
│ - POST /api/auth/register                           │
│ - GET /api/auth/verify                              │
└────────────────┬─────────────────────────────────────┘
                 │ (will connect to)
┌────────────────▼─────────────────────────────────────┐
│ Real Backend API (to be implemented)                │
│ - Backend endpoint URLs                             │
│ - Real database                                      │
│ - JWT token generation                              │
└──────────────────────────────────────────────────────┘
```

## Route Handlers (Local API)

### 1. Login Endpoint

**File:** `src/app/api/auth/login/route.ts`

**Method:** POST

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "Password123"
}
```

**Response (Success):**
```json
{
  "access": "mock_access_token_...",
  "refresh": "mock_refresh_token_...",
  "user": {
    "id": "user_123",
    "email": "user@example.com",
    "name": "User Name"
  }
}
```

**Response (Error):**
```json
{
  "error": "Invalid email or password"
}
```

**Test Credentials (Mock):**
- Email: `demo@example.com`
- Password: `Password123`

### 2. Register Endpoint

**File:** `src/app/api/auth/register/route.ts`

**Method:** POST

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "Password123"
}
```

**Response (Success):**
```json
{
  "id": "user_...",
  "email": "john@example.com",
  "name": "John Doe",
  "message": "Account created successfully. Please log in to continue."
}
```

**Validation:**
- Email: Must be valid email format
- Password: Min 8 chars, uppercase letter, at least one number

### 3. Verify Token Endpoint

**File:** `src/app/api/auth/verify/route.ts`

**Method:** GET

**Headers:**
```
Authorization: Bearer <access_token>
```

**Response (Success):**
```json
{
  "userId": "user_123",
  "email": "demo@example.com",
  "name": "Demo User",
  "role": "user"
}
```

**Response (Error):**
```json
{
  "error": "Invalid or expired token"
}
```

## How to Connect to Real Backend

When you have your real backend API, update these files:

### Option 1: Update Route Handlers (Recommended)

**File:** `src/app/api/auth/login/route.ts`

Replace the mock logic with a call to your backend:

```typescript
// Replace this mock logic:
if (body.email === "demo@example.com" && body.password === "Password123") {
  // ...
}

// With this real backend call:
const backendResponse = await fetch(`${process.env.BACKEND_URL}/api/auth/login/`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
});

const data = await backendResponse.json();
return NextResponse.json(data, { status: backendResponse.status });
```

### Option 2: Update Auth API Client Directly

**File:** `src/lib/api/auth.ts`

If you prefer to bypass Route Handlers and call backend directly:

```typescript
export const authAPI = {
  login: async (email: string, password: string): Promise<LoginResponse> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Login failed");
    }
    
    return response.json();
  },
  // ... other methods
};
```

## Token Storage

Currently tokens are stored in:
- **Cookies:** Set by the backend (via Set-Cookie header)
- **localStorage:** Can be used as fallback

To use localStorage:

```typescript
// In auth hooks after successful login
localStorage.setItem("accessToken", response.access);
localStorage.setItem("user", JSON.stringify(response.user));

// Retrieve in getCurrentUser
const token = localStorage.getItem("accessToken");
```

## Environment Variables

Add to `.env.local`:

```env
# Mock API (local Route Handlers)
NEXT_PUBLIC_API_URL=http://localhost:3000

# Real backend (when ready)
# NEXT_PUBLIC_BACKEND_URL=https://api.yourdomain.com
# BACKEND_URL=https://api.yourdomain.com
```

## Testing the Flow

### 1. Test Login (Mock)

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "demo@example.com",
    "password": "Password123"
  }'
```

### 2. Test Register

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "TestPassword123"
  }'
```

### 3. Test UI Flow

1. Visit `http://localhost:3000/register`
2. Fill in the registration form with:
   - Name: Any name
   - Email: test@example.com
   - Password: TestPassword123 (must have uppercase + number)
3. Submit and you should see success message
4. Click "Sign in" to go to login
5. Use `demo@example.com` / `Password123` to test login

## Next Steps

1. ✅ Local API endpoints are ready
2. ⏳ When backend is ready, update Route Handlers or Auth API
3. ⏳ Test with real credentials
4. ⏳ Implement token refresh logic
5. ⏳ Add logout endpoint to backend

## Security Notes

- Tokens should be marked as httpOnly cookies in production
- CSRF protection should be enabled
- Passwords should be hashed on backend
- Rate limiting on auth endpoints recommended
- Email verification flow recommended
- Refresh token rotation recommended

## Troubleshooting

### "Invalid email or password" on mock credentials

Make sure you're using:
- Email: `demo@example.com` (exact)
- Password: `Password123` (exact)

### Token not persisting

Check if cookies are enabled and the Set-Cookie header is present in login response.

### "No token found" in getCurrentUser

Make sure the login response is properly setting the access token in storage.
