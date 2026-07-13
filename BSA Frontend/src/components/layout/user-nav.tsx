"use client";

import Link from "next/link";
import { useAuth } from "@/lib/useAuth";
import { LogOut, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function UserNav() {
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    setIsDropdownOpen(false);
    router.push("/");
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="h-10 w-20 animate-pulse rounded bg-gray-200" />
    );
  }

  // Not authenticated - show login/register links
  if (!isAuthenticated) {
    return (
      <div className="flex items-center gap-3">
        <Link
          href="/login"
          className="text-sm font-medium text-ivory hover:text-ivory/80 transition-colors"
        >
          Sign In
        </Link>
        <Link
          href="/register"
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
        >
          Sign Up
        </Link>
      </div>
    );
  }

  // Authenticated - show user menu
  return (
    <div className="relative">
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-ivory/5 transition-colors"
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">
          {user?.name.charAt(0).toUpperCase()}
        </div>
        <div className="hidden text-right sm:block">
          <p className="text-sm font-medium text-ivory">{user?.name}</p>
          <p className="text-xs text-ivory/60">{user?.email}</p>
        </div>
      </button>

      {/* Dropdown menu */}
      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-lg border border-ivory/10 bg-gray-900 shadow-lg z-50">
          <div className="border-b border-ivory/10 px-4 py-3 sm:hidden">
            <p className="text-sm font-medium text-ivory">{user?.name}</p>
            <p className="text-xs text-ivory/60">{user?.email}</p>
          </div>

          <Link
            href="/profile"
            className="flex items-center gap-2 px-4 py-2 text-sm text-ivory hover:bg-ivory/5 transition-colors"
            onClick={() => setIsDropdownOpen(false)}
          >
            <User className="h-4 w-4" />
            My Profile
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-ivory/5 transition-colors border-t border-ivory/10"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </div>
      )}

      {/* Close dropdown when clicking outside */}
      {isDropdownOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsDropdownOpen(false)}
        />
      )}
    </div>
  );
}
