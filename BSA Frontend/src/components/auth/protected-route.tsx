"use client";

import { useAuth } from "@/lib/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: "admin" | "user"; // For role-based access
}

/**
 * Wrapper component that protects routes from unauthenticated access.
 *
 * NOTE: With Edge Middleware enabled, unauthenticated users are already
 * redirected at the Edge before this component renders. This component
 * serves as a secondary check and handles loading states.
 *
 * Architecture:
 * 1. Edge Middleware (middleware.ts) - Fast token check at Edge level
 * 2. This Component - Secondary check + loading state
 * 3. TanStack Query - Fetches full user data and manages state
 *
 * Flow for unauthenticated user:
 * Request → Middleware redirects to /login → Never reaches this component
 *
 * Flow for authenticated user:
 * Request → Middleware allows → This component renders → TanStack Query fetches user
 *
 * Usage:
 * <ProtectedRoute requiredRole="admin">
 *   <AdminDashboard />
 * </ProtectedRoute>
 */
export function ProtectedRoute({
  children,
  requiredRole,
}: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Wait for auth to finish loading
    if (isLoading) return;

    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    // TODO: Add role-based checks if needed
    // if (requiredRole && !hasRequiredRole(user, requiredRole)) {
    //   router.push("/unauthorized");
    // }
  }, [isAuthenticated, isLoading, router, requiredRole, user]);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600" />
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render anything if not authenticated (router.push is handling redirect)
  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
