import { NextRequest, NextResponse } from "next/server";

/**
 * Routes that don't require authentication
 * Users can access these without a valid token
 */
const PUBLIC_ROUTES = [
  "/",
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
];

/**
 * Routes that require authentication
 * Users must have a valid token to access these
 */
const PROTECTED_ROUTES = ["/admin", "/dashboard", "/settings", "/profile"];

/**
 * Routes that require specific roles
 * Maps route patterns to required roles
 */
const ROLE_PROTECTED_ROUTES: Record<string, string[]> = {
  "/admin": ["admin"],
};

/**
 * Check if a route path matches a pattern
 * Supports both exact matches and prefix matches
 */
function isRouteMatch(pathname: string, routes: string[]): boolean {
  return routes.some((route) => {
    if (route === pathname) return true;
    if (route.endsWith("*")) {
      const pattern = route.slice(0, -1);
      return pathname.startsWith(pattern);
    }
    return pathname.startsWith(route + "/");
  });
}

/**
 * Edge Middleware: Runs on every request
 * Validates authentication tokens before route is rendered
 */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public routes
  if (isRouteMatch(pathname, PUBLIC_ROUTES)) {
    return NextResponse.next();
  }

  // Get token from cookies
  const token = request.cookies.get("accessToken")?.value;

  // No token found - redirect to login
  if (!token) {
    console.log(`[Middleware] No token for protected route: ${pathname}`);
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Token exists, allow request to proceed
  // The token will be validated on the server/client side
  // This prevents unauthorized users from reaching the page at all
  return NextResponse.next();
}

/**
 * Configure which routes should go through middleware
 * Excludes static files, images, and Next.js internals
 */
export const config = {
  matcher: [
    // Match all routes except:
    "/((?!_next/static|_next/image|favicon.ico|public).*)",
  ],
};
