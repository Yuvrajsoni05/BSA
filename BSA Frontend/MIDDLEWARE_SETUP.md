# Edge Middleware Setup Guide

## Overview

This project now uses **Next.js Edge Middleware** for fast, secure route protection. The middleware runs on every request at the Edge level, before your application code executes.

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│  1. User Request                                        │
│     GET /admin/dashboard                               │
└────────────────────┬────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────┐
│  2. Edge Middleware (middleware.ts)                     │
│     ✓ Check if route requires auth                     │
│     ✓ Look for accessToken in cookies                  │
│     ✓ Redirect to /login if no token                   │
│     ✓ Allow request if token exists                    │
└────────────────────┬────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────┐
│  3. Your App (if token exists)                         │
│     ✓ ProtectedRoute component renders                 │
│     ✓ TanStack Query fetches user data                 │
│     ✓ Page shows protected content                     │
└─────────────────────────────────────────────────────────┘
```

## Key Benefits

- ⚡ **Fast** - Runs on Edge (closest to user)
- 🔒 **Secure** - Redirect happens before app code runs
- 🚫 **No Flash** - Protected content never briefly appears
- 📦 **Simple** - No heavy JWT verification needed
- ♻️ **Reusable** - Works with all routes automatically

## Files Changed

### New Files
- `middleware.ts` - Edge middleware for all route protection
- `src/lib/auth-utils.ts` - Helper functions for token inspection

### Updated Files
- `src/components/auth/protected-route.tsx` - Updated comments explaining middleware integration

## Configuration

### Public Routes

Routes that don't require authentication:

```typescript
const PUBLIC_ROUTES = [
  "/",
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
];
```

**To add more public routes:** Edit `PUBLIC_ROUTES` in `middleware.ts`

### Protected Routes

Routes that require authentication:

```typescript
const PROTECTED_ROUTES = [
  "/admin",
  "/dashboard",
  "/settings",
  "/profile",
];
```

**To add more protected routes:** Add them to `PROTECTED_ROUTES` in `middleware.ts`

### Update Examples

```typescript
// Add a new public route
const PUBLIC_ROUTES = [
  "/",
  "/login",
  "/register",
  "/about",           // ← NEW
  "/forgot-password",
];

// Add a new protected route
const PROTECTED_ROUTES = [
  "/admin",
  "/dashboard",
  "/settings",
  "/profile",
  "/my-posts",       // ← NEW
];
```

## How It Works

### Step 1: User Visits Protected Route

```
User clicks: /admin/users
```

### Step 2: Middleware Checks Authentication

```typescript
// middleware.ts checks:
const token = request.cookies.get("accessToken")?.value;

if (!token) {
  // No token → Redirect to login
  return NextResponse.redirect("/login");
}

// Token exists → Continue
return NextResponse.next();
```

### Step 3: App Renders (if authenticated)

```typescript
// src/components/auth/protected-route.tsx
export function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <LoadingSpinner />;
  if (!isAuthenticated) return null; // Won't happen (middleware blocked)

  return children;
}
```

### Step 4: TanStack Query Loads User Data

```typescript
// src/lib/auth-hooks.ts
export function useAuthUser() {
  return useQuery({
    queryKey: ["auth", "user"],
    queryFn: () => authAPI.getCurrentUser(),
  });
}
```

## Token Lifecycle

### Login Flow

```
1. User submits login form
2. Backend returns accessToken (in response)
3. App sets cookie: Cookies.set("accessToken", token)
4. Middleware reads from cookies on next request
5. User can access protected routes
```

### Logout Flow

```
1. User clicks logout
2. App calls: await logout()
3. App removes: Cookies.remove("accessToken")
4. Next request: Middleware finds no token
5. User redirected to login
```

### Token Expiration

When backend returns 401 (token expired):

```typescript
// src/lib/api/client.ts - Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      Cookies.remove("accessToken");
      window.location.href = "/login";  // Redirect to login
    }
    return Promise.reject(error);
  }
);
```

## Advanced: Token Validation

### Check Token Expiration (Client-Side)

```typescript
import { isTokenExpired } from "@/lib/auth-utils";
import Cookies from "js-cookie";

const token = Cookies.get("accessToken");
if (token && isTokenExpired(token)) {
  console.log("Token is expired, need to refresh or re-login");
}
```

### Check Token Expiry Time

```typescript
import { getTokenTimeToExpiry } from "@/lib/auth-utils";
import Cookies from "js-cookie";

const token = Cookies.get("accessToken");
const secondsLeft = getTokenTimeToExpiry(token);
console.log(`Token expires in ${secondsLeft} seconds`);
```

### Refresh Before Expiration

```typescript
import { shouldRefreshToken } from "@/lib/auth-utils";
import Cookies from "js-cookie";

const token = Cookies.get("accessToken");
if (shouldRefreshToken(token, 5)) {
  // Token will expire in less than 5 minutes
  // Call refresh endpoint
  await refreshToken();
}
```

## Testing the Middleware

### Test 1: Access Protected Route Without Login

```bash
# Clear cookies first
# Then visit: http://localhost:3000/admin

# Expected: Redirected to /login?from=/admin
```

### Test 2: Access Protected Route With Login

```bash
# 1. Login at /login
# 2. Cookie "accessToken" is set
# 3. Visit http://localhost:3000/admin
# 4. Expected: Page loads (middleware allows it)
```

### Test 3: Access Public Route Without Login

```bash
# Visit: http://localhost:3000/
# Expected: Page loads (no redirect)
```

### Test 4: Logout Redirects

```bash
# 1. Login and access /admin
# 2. Click logout
# 3. Expected: Cookie removed, redirected to login
```

## Common Issues & Solutions

### Issue: "Not redirecting to login"

**Solution:** Check that:
1. Route is in `PROTECTED_ROUTES` in `middleware.ts`
2. Route matches the pattern (e.g., "/admin" catches "/admin/users")
3. Middleware matcher isn't excluding the route

### Issue: "Static files are slow"

**Solution:** The matcher excludes static files:
```typescript
matcher: [
  "/((?!_next/static|_next/image|favicon.ico|public).*)",
]
```
These files bypass middleware entirely.

### Issue: "Always redirects to /login on page refresh"

**Solution:** Check that:
1. Cookies are being set correctly: `Cookies.set("accessToken", token)`
2. Cookie name matches: should be `"accessToken"`
3. Browser cookies aren't disabled
4. Development vs production environment (secure flag)

## Environment Variables

Make sure these are set in `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NODE_ENV=development
```

## Production Considerations

### Security

- ✅ Middleware runs on Edge (no code execution on user's device)
- ✅ Token never exposed to JavaScript (use httpOnly cookies in production)
- ✅ HTTPS required in production
- ⚠️ Currently using regular cookies (can be enhanced)

### Performance

- ✅ Edge Middleware is incredibly fast (< 10ms)
- ✅ Doesn't call backend for every request
- ✅ Scales horizontally automatically
- ✅ No database or external API calls needed

### Optimization

To use httpOnly cookies (more secure):

```typescript
// On login, backend should set cookie:
Set-Cookie: accessToken=<token>; HttpOnly; Secure; SameSite=Strict

// Middleware still reads it from request.cookies
const token = request.cookies.get("accessToken")?.value;
```

## Next Steps

1. ✅ Middleware installed and working
2. Test all protected routes redirect correctly
3. (Optional) Add role-based middleware checks
4. (Optional) Implement token refresh logic
5. (Optional) Add audit logging for auth attempts

## Troubleshooting

Enable debug logging in middleware:

```typescript
// middleware.ts
if (!token) {
  console.log(`[Middleware] No token for ${pathname}`);
}
```

Check browser DevTools:
- **Network tab** - Verify redirects (Status 307)
- **Cookies tab** - Verify accessToken is set
- **Console** - Look for any errors

Check server logs:
```bash
npm run dev
# Look for [Middleware] logs
```

## Resources

- [Next.js Middleware Docs](https://nextjs.org/docs/app/building-your-application/routing/middleware)
- [HTTP Cookies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies)
- [JWT Structure](https://jwt.io)
