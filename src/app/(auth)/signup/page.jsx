"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Description, Label, Radio, RadioGroup } from "@heroui/react";
import { Button } from "@heroui/react";

import {
  BsEye,
  BsEyeSlash,
  BsCheckCircle,
  BsExclamationCircle,
  BsGoogle,
} from "react-icons/bs";

import { signUp, signOut, authClient } from "@/lib/auth-client";

export default function SignUpPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  // field errors
  const [errors, setErrors] = useState({});

  const [passwordStrength, setPasswordStrength] = useState(0);
  const [role, setRole] = useState("seeker");

  const calculatePasswordStrength = (password) => {
    let strength = 0;

    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;

    return Math.min(strength, 5);
  };

  const validateField = (name, value) => {
    switch (name) {
      case "name":
        if (!value.trim()) return "Full name is required";
        if (value.trim().length < 2)
          return "Name must be at least 2 characters";
        return "";

      case "email":
        if (!value.trim()) return "Email is required";

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          return "Please enter a valid email address";

        return "";

      case "password":
        if (!value) return "Password is required";

        if (value.length < 8) return "Password must be at least 8 characters";

        if (!/[A-Z]/.test(value))
          return "Include at least one uppercase letter";

        if (!/[a-z]/.test(value))
          return "Include at least one lowercase letter";

        if (!/\d/.test(value)) return "Include at least one number";

        return "";

      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // live validation
    const fieldError = validateField(name, value);

    setErrors((prev) => ({
      ...prev,
      [name]: fieldError,
    }));

    if (name === "password") {
      setPasswordStrength(calculatePasswordStrength(value));
    }
  };

  const validateForm = () => {
    const newErrors = {
      name: validateField("name", formData.name),
      email: validateField("email", formData.email),
      password: validateField("password", formData.password),
      terms: !agreedToTerms
        ? "Please agree to the Terms and Privacy Policy"
        : "",
    };

    setErrors(newErrors);

    return !Object.values(newErrors).some((error) => error);
  };

  // app/sign-up/page.jsx

  // Add signOut to your import (as backup, but autoSignIn: false is the real fix)


  // Use this handleSubmit — the one you had commented out
  /* const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);

    try {
      const result = await signUp.email({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        autoSignIn: false, // ← this is the key fix
      });
      await signOut();

      if (result?.error) {
        throw new Error(result.error.message || "Failed to create account");
      }

      router.push(
        "/sign-in?message=Account created successfully! Please sign in.",
      );
    } catch (err) {
      setErrors((prev) => ({
        ...prev,
        submit: err.message || "Something went wrong. Please try again.",
      }));
    } finally {
      setLoading(false);
    }
  };
 */


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);

    try {
      const result = await signUp.email({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: role,
      });

      console.log(result, "result");

      if (result?.error) {
        throw new Error(result.error.message || "Failed to create account");
      }

      // Only sign out after confirming signup succeeded
      await signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push(
              "/signin?message=Account created successfully! Please sign in.",
            );
          },
        },
      });
    } catch (err) {
      setErrors((prev) => ({
        ...prev,
        submit: err.message || "Something went wrong. Please try again.",
      }));
    } finally {
      setLoading(false);
    }
  };
  const strengthConfig = [
    { label: "", color: "bg-zinc-700" },
    { label: "Very Weak", color: "bg-red-500" },
    { label: "Weak", color: "bg-orange-500" },
    { label: "Fair", color: "bg-yellow-500" },
    { label: "Strong", color: "bg-lime-500" },
    { label: "Very Strong", color: "bg-green-500" },
  ];

  //google
  const googleHandler = async () => {
    const data = await authClient.signIn.social({
      provider: "google",
    });
  }


  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-black via-zinc-950 to-zinc-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="bg-zinc-900 rounded-2xl shadow-2xl p-8 sm:p-10 border border-zinc-800">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-500/10 mb-4 mx-auto border border-indigo-500/20">
              <svg
                className="w-8 h-8 text-indigo-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                />
              </svg>
            </div>

            <h2 className="text-3xl font-bold text-white">
              Create your account
            </h2>

            <p className="mt-2 text-sm text-zinc-400">
              Already have an account?{" "}
              <Link
                href="/signin"
                className="font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>

          {/* Social Button */}
          <div className="mb-6">
            <Button
              onClick={googleHandler}
              type="button"
              variant="bordered"
              className="w-full border-zinc-700 bg-zinc-950 text-white hover:bg-zinc-800"
              startContent={<BsGoogle className="text-lg" />}
              disabled={loading}
            >
              Continue with Google
            </Button>
          </div>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-zinc-800"></div>
            </div>

            <div className="relative flex justify-center text-sm">
              <span className="px-3 bg-zinc-900 text-zinc-500">
                Or sign up with email
              </span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Submit Error */}
            {errors.submit && (
              <div
                className="rounded-lg bg-red-500/10 border border-red-500/20 p-4 flex items-start gap-3 w-full"
                role="alert"
              >
                <BsExclamationCircle className="h-5 w-5 text-red-400 mt-0.5 shrink-0" />

                <p className="text-sm font-semibold text-red-500">
                  {errors.submit}
                </p>
              </div>
            )}

            {/* Name */}
            <div className="w-full">
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-zinc-300 mb-1.5"
              >
                Full Name
              </label>

              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                disabled={loading}
                className={`w-full px-4 py-3 rounded-lg border bg-zinc-950 text-white focus:outline-none focus:ring-2 placeholder:text-zinc-500 disabled:bg-zinc-800 disabled:cursor-not-allowed transition-all ${
                  errors.name
                    ? "border-red-500 focus:ring-red-500"
                    : "border-zinc-700 focus:ring-indigo-500"
                }`}
              />

              {errors.name && (
                <p className="mt-1 text-sm font-medium text-red-500">
                  {errors.name}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="w-full">
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-zinc-300 mb-1.5"
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
                className={`w-full px-4 py-3 rounded-lg border bg-zinc-950 text-white focus:outline-none focus:ring-2 placeholder:text-zinc-500 disabled:bg-zinc-800 disabled:cursor-not-allowed transition-all ${
                  errors.email
                    ? "border-red-500 focus:ring-red-500"
                    : "border-zinc-700 focus:ring-indigo-500"
                }`}
              />

              {errors.email && (
                <p className="mt-1 text-sm font-medium text-red-500">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="w-full">
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-zinc-300 mb-1.5"
              >
                Password
              </label>

              <div className="relative w-full">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  disabled={loading}
                  className={`w-full px-4 py-3 pr-12 rounded-lg border bg-zinc-950 text-white focus:outline-none focus:ring-2 placeholder:text-zinc-500 disabled:bg-zinc-800 disabled:cursor-not-allowed transition-all ${
                    errors.password
                      ? "border-red-500 focus:ring-red-500"
                      : "border-zinc-700 focus:ring-indigo-500"
                  }`}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-zinc-500 hover:text-zinc-300 focus:outline-none transition-colors"
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

              {errors.password && (
                <p className="mt-1 text-sm font-medium text-red-500">
                  {errors.password}
                </p>
              )}

              {/* Password Strength */}
              {formData.password && (
                <div className="mt-2 w-full">
                  <div className="flex gap-1 mb-1">
                    {[1, 2, 3, 4, 5].map((level) => (
                      <div
                        key={level}
                        className={`h-1.5 flex-1 rounded-full transition-colors ${
                          level <= passwordStrength
                            ? strengthConfig[passwordStrength].color
                            : "bg-zinc-700"
                        }`}
                      />
                    ))}
                  </div>

                  <p
                    className={`text-xs ${
                      passwordStrength <= 2
                        ? "text-red-400"
                        : passwordStrength <= 3
                          ? "text-orange-400"
                          : "text-green-400"
                    }`}
                  >
                    {strengthConfig[passwordStrength].label}
                  </p>
                </div>
              )}

              <p className="mt-1 text-xs text-zinc-500">
                Use 8+ characters with uppercase, lowercase & numbers
              </p>
            </div>

            {/* role selection */}
      <Label>Select your role</Label>
      <RadioGroup onChange={(value) => setRole(value)} defaultValue="seeker" name="plan-orientation" orientation="horizontal">
        <Radio value="seeker">
          <Radio.Control>
            <Radio.Indicator />
          </Radio.Control>
          <Radio.Content>
            <Label>Seeker</Label>
          </Radio.Content>
        </Radio>
        <Radio value="recruiter">
          <Radio.Control>
            <Radio.Indicator />
          </Radio.Control>
          <Radio.Content>
            <Label>Recruiter</Label>
          </Radio.Content>
        </Radio>
        {/* <Radio value="teams">
          <Radio.Control>
            <Radio.Indicator />
          </Radio.Control>
          <Radio.Content>
            <Label>Teams</Label>
            <Description>Up to 10 teammates</Description>
          </Radio.Content>
        </Radio> */}
      </RadioGroup>

            {/* Terms */}
            <div className="w-full">
              <div className="flex items-start gap-3">
                <input
                  id="terms"
                  type="checkbox"
                  checked={agreedToTerms}
                  onChange={(e) => {
                    setAgreedToTerms(e.target.checked);

                    setErrors((prev) => ({
                      ...prev,
                      terms: e.target.checked
                        ? ""
                        : "Please agree to the Terms and Privacy Policy",
                    }));
                  }}
                  className="mt-1 h-4 w-4 rounded border-zinc-700 bg-zinc-900 text-indigo-500 focus:ring-indigo-500"
                  disabled={loading}
                />

                <label htmlFor="terms" className="text-sm text-zinc-400">
                  I agree to the{" "}
                  <Link
                    href="/terms"
                    className="text-indigo-400 hover:text-indigo-300 font-medium"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy"
                    className="text-indigo-400 hover:text-indigo-300 font-medium"
                  >
                    Privacy Policy
                  </Link>
                </label>
              </div>

              {errors.terms && (
                <p className="mt-1 text-sm font-medium text-red-500">
                  {errors.terms}
                </p>
              )}
            </div>

            {/* Submit */}
            <Button
              type="submit"
              color="primary"
              className="w-full h-12 text-base font-semibold mt-2"
              disabled={loading || !agreedToTerms}
              isLoading={loading}
              size="lg"
            >
              {loading ? "Creating account..." : "Create Account"}
            </Button>
          </form>

          {/* Footer */}
          <p className="mt-8 text-center text-xs text-zinc-500">
            By signing up, you agree to receive account-related emails.
          </p>
        </div>

        {/* Trust Badges */}
        <div className="mt-6 flex justify-center items-center gap-4 text-xs text-zinc-500 flex-wrap">
          <div className="flex items-center gap-1">
            <BsCheckCircle className="text-green-500" />
            <span>Secure signup</span>
          </div>

          <div className="flex items-center gap-1">
            <BsCheckCircle className="text-green-500" />
            <span>No credit card required</span>
          </div>
        </div>
      </div>
    </div>
  );
}
