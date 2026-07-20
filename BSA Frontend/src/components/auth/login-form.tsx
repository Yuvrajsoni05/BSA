"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/useAuth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff, AlertCircle } from "lucide-react";
import Link from "next/link";

// Define validation schema - Zod ensures type safety
const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean(),
});

// Infer TypeScript type from schema (automatic type generation)
type LoginFormInputs = z.infer<typeof loginSchema>;

export function LoginForm() {
  const router = useRouter();
  const { login, isLoading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [apiError, setApiError] = useState<string>("");

  // React Hook Form setup with Zod resolver
  // This handles all form state, validation, and errors automatically
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur", // Validate when user leaves a field
    defaultValues: {
      rememberMe: false,
    },
  });

  // Handle form submission
  const onSubmit = async (data: LoginFormInputs) => {
    setApiError("");

    try {
      // Call login from auth context
      await login(data.email, data.password);

      // Reset form on success
      reset();

      // Redirect to admin dashboard
      router.push("/admin");
    } catch (error) {
      // Handle API errors
      if (error instanceof Error) {
        setApiError(error.message || "Login failed. Please try again.");
      } else {
        setApiError("An unexpected error occurred.");
      }
    }
  };

  const isProcessing = isLoading || isSubmitting;

  return (
    <div className="w-full max-w-md">
      <div className="rounded-lg border border-[#c9a24a]/30 bg-white p-8 shadow-lg">
        {/* Logo/Brand */}
        <div className="mb-8 text-center">
          <h2 className="text-xl font-bold text-[#17120e]">
            SATVA <span className="text-[#c9a24a]">GOLD</span>
          </h2>
          <p className="mt-2 text-xs text-[#6b6058]">Premium Jewellery</p>
        </div>

        <h1 className="text-2xl font-bold text-[#17120e]">Sign In</h1>
        <p className="mt-2 text-sm text-[#6b6058]">
          Enter your credentials to access your account
        </p>

        {/* API Error Alert */}
        {apiError && (
          <div className="mt-6 flex gap-3 rounded-lg bg-red-50 p-4 text-red-700">
            <AlertCircle className="h-5 w-5 flex-shrink-0 text-red-600" />
            <p className="text-sm">{apiError}</p>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-5">
          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-[#17120e]"
            >
              Email address
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              disabled={isProcessing}
              className={`mt-2 block w-full rounded-lg border px-4 py-2 text-sm transition-colors ${
                errors.email
                  ? "border-red-300 bg-red-50 text-[#17120e] focus:border-red-500 focus:ring-red-500"
                  : "border-[#c9a24a]/30 bg-white text-[#17120e] focus:border-[#c9a24a] focus:ring-[#c9a24a]"
              } focus:outline-none focus:ring-1 disabled:bg-gray-50 disabled:text-gray-500`}
              {...register("email")}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-[#17120e]"
            >
              Password
            </label>
            <div className="relative mt-2">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                disabled={isProcessing}
                className={`block w-full rounded-lg border px-4 py-2 pr-10 text-sm transition-colors ${
                  errors.password
                    ? "border-red-300 bg-red-50 text-[#17120e] focus:border-red-500 focus:ring-red-500"
                    : "border-[#c9a24a]/30 bg-white text-[#17120e] focus:border-[#c9a24a] focus:ring-[#c9a24a]"
                } focus:outline-none focus:ring-1 disabled:bg-gray-50 disabled:text-gray-500`}
                {...register("password")}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isProcessing}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6b6058] hover:text-[#17120e] disabled:opacity-50 transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Remember Me Checkbox */}
          <div className="flex items-center">
            <input
              id="rememberMe"
              type="checkbox"
              disabled={isProcessing}
              className="h-4 w-4 rounded border-[#c9a24a]/30 text-[#c9a24a] focus:ring-2 focus:ring-[#c9a24a] disabled:opacity-50 accent-[#c9a24a]"
              {...register("rememberMe")}
            />
            <label
              htmlFor="rememberMe"
              className="ml-3 text-sm text-[#17120e] select-none"
            >
              Remember me for 30 days
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isProcessing}
            className="mt-6 w-full rounded-lg bg-[#c9a24a] px-4 py-2 font-medium text-white transition-colors hover:bg-[#b89438] disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isProcessing ? "Signing in..." : "Sign in"}
          </button>
        </form>

        {/* Footer Links */}
        <div className="mt-6 space-y-3 border-t border-[#c9a24a]/20 pt-6 text-sm">
          <div className="text-center">
            <Link
              href="/forgot-password"
              className="text-[#c9a24a] hover:text-[#17120e] hover:underline font-medium transition-colors"
            >
              Forgot your password?
            </Link>
          </div>
          <div className="text-center text-[#6b6058]">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="font-medium text-[#c9a24a] hover:text-[#17120e] hover:underline transition-colors"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
