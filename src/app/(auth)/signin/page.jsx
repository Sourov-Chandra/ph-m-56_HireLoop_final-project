"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@heroui/react";
import {
  BsExclamationCircle,
  BsEye,
  BsEyeSlash,
  BsGoogle,
  BsApple,
} from "react-icons/bs";

import { authClient, signIn } from "@/lib/auth-client";

export default function SignInPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await signIn.email({
        email: formData.email,
        password: formData.password,
      });

      if (result?.error) {
        throw new Error(result.error.message || "Invalid credentials");
      }

      router.push("/dashboard");
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const googleLoginHandler = async (e) => {
    const data = await authClient.signIn.social({
      provider: "google",
    });
  };

  // Reusable input class for dark theme
  const inputClass =
    "w-full px-4 py-3 rounded-lg bg-zinc-950 border border-zinc-700 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-zinc-900 disabled:cursor-not-allowed transition-all";

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-black via-zinc-950 to-zinc-900 px-4">
      <div className="w-full max-w-md">
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl p-8 sm:p-10">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white">
              Sign in to your account
            </h2>
            <p className="mt-2 text-sm text-zinc-400">
              Or{" "}
              <Link
                href="/signup"
                className="text-indigo-400 hover:text-indigo-300 font-medium"
              >
                create a new account
              </Link>
            </p>
          </div>

          {/* Social Sign In Buttons */}
          <div className="flex text-center mb-6">
            <Button
              onClick={googleLoginHandler}
              type="button"
              variant="bordered"
              className="w-full bg-zinc-950 border-zinc-700 text-white hover:bg-zinc-900"
              startContent={<BsGoogle className="text-lg" />}
              disabled={loading}
            >
              Google
            </Button>
            {/* <Button
              type="button"
              variant="bordered"
              className="w-full bg-zinc-950 border-zinc-700 text-white hover:bg-zinc-900"
              startContent={<BsApple className="text-lg" />}
              disabled={loading}
            >
              Apple
            </Button> */}
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-zinc-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-3 bg-zinc-900 text-zinc-400">
                Or sign in with email
              </span>
            </div>
          </div>

          {/* Error Alert */}
          {error && (
            <div
              className="mb-4 w-full rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 flex items-start gap-3 shadow-sm"
              role="alert"
            >
              <BsExclamationCircle className="h-5 w-5 text-red-500 mt-0.5 shrink-0" />
              <div className="flex flex-col">
                <p className="text-sm font-semibold text-red-400">
                  Authentication Error
                </p>
                <p className="text-xs text-red-300 mt-0.5 leading-relaxed">
                  {error}
                </p>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field - Native Input */}
            <div className="w-full">
              <label
                htmlFor="email"
                className="block text-sm text-zinc-300 mb-1"
              >
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                disabled={loading}
                className={inputClass}
                required
              />
            </div>

            {/* Password Field - Native Input with Toggle */}
            <div className="w-full">
              <label
                htmlFor="password"
                className="block text-sm text-zinc-300 mb-1"
              >
                Password
              </label>
              <div className="relative w-full">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  disabled={loading}
                  className={`${inputClass} pr-10`}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white focus:outline-none focus:text-indigo-400 transition-colors disabled:opacity-50"
                  tabIndex={-1}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  disabled={loading}
                >
                  {showPassword ? (
                    <BsEyeSlash className="h-5 w-5" />
                  ) : (
                    <BsEye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Forgot Password Link */}
            <div className="flex justify-end">
              <Link
                href="/forgot-password"
                className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              color="primary"
              className="w-full h-12 font-semibold bg-indigo-600 hover:bg-indigo-500 text-white border-0"
              isLoading={loading}
              disabled={loading}
              size="lg"
            >
              {loading ? "Signing in..." : "Sign in"}
            </Button>
          </form>

          {/* Footer */}
          <p className="mt-8 text-center text-xs text-zinc-500">
            By signing in, you agree to our{" "}
            <Link href="/terms" className="text-zinc-400 hover:text-zinc-300">
              Terms
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-zinc-400 hover:text-zinc-300">
              Privacy Policy
            </Link>
          </p>
        </div>

        {/* Trust Badges */}
        <div className="mt-6 flex justify-center items-center gap-4 text-xs text-zinc-500">
          <div className="flex items-center gap-1">
            <BsExclamationCircle className="text-green-500" />
            <span>Encrypted connection</span>
          </div>
          <div className="flex items-center gap-1">
            <BsExclamationCircle className="text-green-500" />
            <span>2FA supported</span>
          </div>
        </div>
      </div>
    </div>
  );
}
