"use client";

import { Navbar } from "@/components/layout/navbar";
import { RegisterForm } from "@/components/auth/register-form";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-[#f4efe4]">
      <Navbar />
      <div className="flex min-h-[calc(100vh-80px)] items-center justify-center px-4 py-12">
        <RegisterForm />
      </div>
    </div>
  );
}
