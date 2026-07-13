"use client";

import { useAuth } from "@/lib/useAuth";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export function AdminTopbar({ title }: { title: string }) {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  return (
    <div className="flex h-20 items-center justify-between border-b border-ivory/10 px-6 md:px-10">
      <h1 className="font-display text-2xl text-ivory">{title}</h1>

      <div className="flex items-center gap-4">
        {user && (
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-medium text-ivory">{user.name}</p>
              <p className="text-xs text-ivory/60">{user.email}</p>
            </div>
            <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
              {user.name.charAt(0).toUpperCase()}
            </div>
          </div>
        )}

        <button
          onClick={handleLogout}
          className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700"
          aria-label="Logout"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </div>
  );
}
