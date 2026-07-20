"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/useAuth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff, AlertCircle, CheckCircle } from "lucide-react";
import Link from "next/link";

// Registration schema with password validation
const registerSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"),
    confirmPassword: z.string(),
    acceptTerms: z.boolean().refine((val) => val === true, {
      message: "You must accept the terms and conditions",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type RegisterFormInputs = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const router = useRouter();
  const { register: registerUser } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [apiError, setApiError] = useState<string>("");
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<RegisterFormInputs>({
    resolver: zodResolver(registerSchema),
    mode: "onBlur",
  });

  const password = watch("password");

  const onSubmit = async (data: RegisterFormInputs) => {
    setApiError("");

    try {
      await registerUser(data.email, data.password, data.name);
      setIsSuccess(true);

      // Redirect to login after 2 seconds
      setTimeout(() => {
        router.push("/login?registered=true");
      }, 2000);
    } catch (error) {
      if (error instanceof Error) {
        setApiError(error.message || "Registration failed. Please try again.");
      } else {
        setApiError("An unexpected error occurred.");
      }
    }
  };

  if (isSuccess) {
    return (
      <div className="w-full max-w-md">
        <div className="rounded-lg border border-[#0f3d2e]/30 bg-[#0f3d2e]/5 p-8 text-center">
          <CheckCircle className="mx-auto h-12 w-12 text-[#0f3d2e]" />
          <h2 className="mt-4 text-xl font-bold text-[#0f3d2e]">Account Created!</h2>
          <p className="mt-2 text-sm text-[#0f3d2e]/70">
            Your account has been successfully created. Redirecting to login...
          </p>
        </div>
      </div>
    );
  }

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

        <h1 className="text-2xl font-bold text-[#17120e]">Create Account</h1>
        <p className="mt-2 text-sm text-[#6b6058]">
          Join us today. It only takes a minute.
        </p>

        {/* API Error Alert */}
        {apiError && (
          <div className="mt-6 flex gap-3 rounded-lg bg-red-50 p-4 text-red-700">
            <AlertCircle className="h-5 w-5 flex-shrink-0 text-red-600" />
            <p className="text-sm">{apiError}</p>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
          {/* Full Name Field */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-[#17120e]"
            >
              Full Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="John Doe"
              disabled={isSubmitting}
              className={`mt-2 block w-full rounded-lg border px-4 py-2 text-sm transition-colors ${
                errors.name
                  ? "border-red-300 bg-red-50 text-[#17120e] focus:border-red-500 focus:ring-red-500"
                  : "border-[#c9a24a]/30 bg-white text-[#17120e] focus:border-[#c9a24a] focus:ring-[#c9a24a]"
              } focus:outline-none focus:ring-1 disabled:bg-gray-50 disabled:text-gray-500`}
              {...register("name")}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

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
              disabled={isSubmitting}
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
                disabled={isSubmitting}
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
                disabled={isSubmitting}
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
            {/* Password requirements hint */}
            {password && !errors.password && (
              <p className="mt-1 text-xs text-[#0f3d2e]">✓ Password meets requirements</p>
            )}
          </div>

          {/* Confirm Password Field */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-[#17120e]"
            >
              Confirm Password
            </label>
            <div className="relative mt-2">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="••••••••"
                disabled={isSubmitting}
                className={`block w-full rounded-lg border px-4 py-2 pr-10 text-sm transition-colors ${
                  errors.confirmPassword
                    ? "border-red-300 bg-red-50 text-[#17120e] focus:border-red-500 focus:ring-red-500"
                    : "border-[#c9a24a]/30 bg-white text-[#17120e] focus:border-[#c9a24a] focus:ring-[#c9a24a]"
                } focus:outline-none focus:ring-1 disabled:bg-gray-50 disabled:text-gray-500`}
                {...register("confirmPassword")}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                disabled={isSubmitting}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6b6058] hover:text-[#17120e] disabled:opacity-50 transition-colors"
                aria-label={
                  showConfirmPassword ? "Hide password" : "Show password"
                }
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-600">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Terms Checkbox */}
          <div className="flex items-start">
            <input
              id="acceptTerms"
              type="checkbox"
              disabled={isSubmitting}
              className="mt-1 h-4 w-4 rounded border-[#c9a24a]/30 text-[#c9a24a] focus:ring-2 focus:ring-[#c9a24a] disabled:opacity-50 accent-[#c9a24a]"
              {...register("acceptTerms")}
            />
            <label
              htmlFor="acceptTerms"
              className="ml-3 text-sm text-[#17120e] select-none"
            >
              I agree to the{" "}
              <Link href="/terms" className="text-[#c9a24a] hover:underline font-medium">
                Terms and Conditions
              </Link>
            </label>
          </div>
          {errors.acceptTerms && (
            <p className="text-sm text-red-600">{errors.acceptTerms.message}</p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-6 w-full rounded-lg bg-[#c9a24a] px-4 py-2 font-medium text-white transition-colors hover:bg-[#b89438] disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Creating account..." : "Create account"}
          </button>
        </form>

        {/* Footer Link */}
        <div className="mt-6 border-t border-[#c9a24a]/20 pt-6 text-center text-sm text-[#6b6058]">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-[#c9a24a] hover:text-[#17120e] hover:underline transition-colors"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
