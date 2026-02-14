"use client";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Lock, Eye, EyeOff, Shield, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { handleResetPassword } from "@/lib/actions/auth-action";
import { resetPasswordSchema, ResetPasswordData } from "./schema";

const ResetPasswordForm = ({ token }: { token: string }) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordData>({
    mode: "onSubmit",
    resolver: zodResolver(resetPasswordSchema),
  });
  const [error, setError] = useState<string | null>(null);
  const [pending, setTransition] = useTransition();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const submit = (values: ResetPasswordData) => {
    setError(null);
    setTransition(async () => {
      try {
        const result = await handleResetPassword(token, values.newPassword);
        if (result.success) {
          toast.success("Password has been reset successfully.");
          return router.push("/login");
        } else {
          throw new Error(result.message || "Failed to reset password");
        }
      } catch (err: Error | any) {
        toast.error(err.message || "Failed to reset password");
      }
    });
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* LEFT BRANDING */}
      <div className="hidden lg:flex relative bg-gradient-to-br from-blue-600 to-blue-500 text-white items-center justify-center overflow-hidden">
        <div className="absolute w-96 h-96 bg-white/10 rounded-full -top-20 -right-20 blur-2xl" />
        <div className="absolute w-72 h-72 bg-white/10 rounded-full bottom-10 -left-20 blur-2xl" />

        <div className="relative text-center space-y-10 px-10 z-10">
          <div>
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <Shield className="w-9 h-9" />
              </div>
            </div>
            <h1 className="text-6xl font-bold italic tracking-wide mb-6">
              Frendly
            </h1>
            <p className="text-xl max-w-md mx-auto text-blue-50 leading-relaxed">
              Create a strong password to secure your account and protect your data.
            </p>
          </div>

          <div className="max-w-md mx-auto space-y-4">
            <SecurityTip
              icon="🔒"
              text="Use at least 8 characters"
            />
            <SecurityTip
              icon="🔤"
              text="Mix uppercase and lowercase letters"
            />
            <SecurityTip
              icon="🔢"
              text="Include numbers and symbols"
            />
            <SecurityTip
              icon="❌"
              text="Avoid common passwords"
            />
          </div>
        </div>
      </div>

      {/* RIGHT FORM */}
      <div className="flex items-center justify-center px-6 py-12 bg-gradient-to-br from-white to-blue-50/50">
        <div className="w-full max-w-md space-y-8">
          {/* Header */}
          <div className="space-y-2">
            <h2 className="text-4xl font-bold tracking-tight text-blue-600">
              Reset Password
            </h2>
            <p className="text-base text-gray-600">
              Enter your new password below.
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded-lg shadow-sm">
              <p className="font-medium">{error}</p>
            </div>
          )}

          {/* Form */}
          <div className="space-y-6">
            {/* New Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                New Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-blue-500" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  {...register("newPassword")}
                  placeholder="Enter new password"
                  className="w-full h-12 bg-white border-2 border-gray-200 rounded-xl pl-12 pr-12 text-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.newPassword?.message && (
                <p className="text-xs text-red-600 mt-2 ml-1">
                  {errors.newPassword.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Confirm New Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-blue-500" />
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  autoComplete="new-password"
                  {...register("confirmNewPassword")}
                  placeholder="Confirm new password"
                  className="w-full h-12 bg-white border-2 border-gray-200 rounded-xl pl-12 pr-12 text-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.confirmNewPassword?.message && (
                <p className="text-xs text-red-600 mt-2 ml-1">
                  {errors.confirmNewPassword.message}
                </p>
              )}
            </div>

            <button
              onClick={handleSubmit(submit)}
              disabled={isSubmitting || pending}
              className="w-full h-12 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200"
            >
              {isSubmitting || pending ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Resetting password...</span>
                </div>
              ) : (
                "Reset Password"
              )}
            </button>
          </div>

          {/* Password Requirements */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <p className="text-xs font-semibold text-blue-900 mb-2">
              Password Requirements:
            </p>
            <ul className="text-xs text-gray-700 space-y-1">
              <li className="flex items-center gap-2">
                <div className="w-1 h-1 bg-blue-600 rounded-full" />
                At least 8 characters long
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1 h-1 bg-blue-600 rounded-full" />
                Include uppercase and lowercase letters
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1 h-1 bg-blue-600 rounded-full" />
                Contains numbers and special characters
              </li>
            </ul>
          </div>

          {/* Login Link */}
          <p className="text-center text-sm text-gray-600">
            Remember your password?{" "}
            <Link
              href="/login"
              className="text-blue-600 hover:text-blue-700 font-semibold transition-colors"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

function SecurityTip({ icon, text }: any) {
  return (
    <div className="bg-white/15 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300">
      <div className="flex items-center gap-3">
        <div className="text-2xl">{icon}</div>
        <p className="text-sm text-blue-50 font-medium">{text}</p>
      </div>
    </div>
  );
}

export default ResetPasswordForm;