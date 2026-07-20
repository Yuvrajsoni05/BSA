"use client";

import { Navbar } from "@/components/layout/navbar";
import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#f4efe4]">
      <Navbar />
      <div className="flex min-h-[calc(100vh-80px)] items-center justify-center px-4 py-12">
        <LoginForm />
      </div>
    </div>
  );
}
