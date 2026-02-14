// "use client";
// import { useState, useTransition } from "react";
// import { useForm } from "react-hook-form";
// import { forgetPasswordSchema, ForgetPasswordData } from "./schema";
// import { zodResolver } from "@hookform/resolvers/zod";
// import Link from "next/link";
// import { handleRequestPasswordReset } from "@/lib/actions/auth-action";
// import { useRouter } from "next/navigation";
// import { toast } from "react-toastify";

// const ForgetPasswordForm = () => {
//     const router = useRouter();
//     const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ForgetPasswordData>({
//         mode: "onSubmit",
//         resolver: zodResolver(forgetPasswordSchema),
//     });
//     const [error, setError] = useState<string | null>(null);
//     const [pending, setTransition] = useTransition();
//     const submit = (values: ForgetPasswordData) => {
//         setError(null);
//         setTransition(async () => {
//             try {
//                 const result = await handleRequestPasswordReset(values.email);
//                 if (result.success) {
//                     toast.success("If the email is registered, a reset link has been sent.");
//                     return router.push('/login');
//                 }else{
//                     throw new Error(result.message || 'Failed to send reset link');
//                 }
//             } catch (err: Error | any) {
//                 toast.error(err.message || 'Failed to send reset link');
//             }
//         })
//     }

//     return (
//         <form onSubmit={handleSubmit(submit)} className="space-y-4">
//             {error && (
//                 <p className="text-sm text-red-600">{error}</p>
//             )}
//             <div className="space-y-1">
//                 <label className="text-sm font-medium" htmlFor="email">Email</label>
//                 <input
//                     id="email"
//                     type="email"
//                     autoComplete="email"
//                     className="h-10 w-full rounded-md border border-black/10 dark:border-white/15 bg-background px-3 text-sm outline-none focus:border-foreground/40"
//                     {...register("email")}
//                     placeholder="you@example.com"
//                 />
//                 {errors.email?.message && (
//                     <p className="text-xs text-red-600">{errors.email.message}</p>
//                 )}
//             </div>

//             <button
//                 type="submit"
//                 disabled={isSubmitting || pending}
//                 className="h-10 w-full rounded-md bg-foreground text-background text-sm font-semibold hover:opacity-90 disabled:opacity-60"
//             >
//                 {isSubmitting || pending ? "Sending..." : "Send Link"}
//             </button>

//             <div className="mt-1 text-center text-sm">
//                 Already have an account? <Link href="/login" className="font-semibold hover:underline">Log in</Link>
//             </div>
//         </form>
//     );
// }

// export default ForgetPasswordForm;



"use client";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Mail, ArrowLeft, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { handleRequestPasswordReset } from "@/lib/actions/auth-action";
import { forgetPasswordSchema, ForgetPasswordData } from "./schema";

const ForgetPasswordForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgetPasswordData>({
    mode: "onSubmit",
    resolver: zodResolver(forgetPasswordSchema),
  });
  const [error, setError] = useState<string | null>(null);
  const [pending, setTransition] = useTransition();

  const submit = (values: ForgetPasswordData) => {
    setError(null);
    setTransition(async () => {
      try {
        const result = await handleRequestPasswordReset(values.email);
        if (result.success) {
          toast.success("If the email is registered, a reset link has been sent.");
          return router.push("/login");
        } else {
          throw new Error(result.message || "Failed to send reset link");
        }
      } catch (err: Error | any) {
        toast.error(err.message || "Failed to send reset link");
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
                <Sparkles className="w-9 h-9" />
              </div>
            </div>
            <h1 className="text-6xl font-bold italic tracking-wide mb-6">
              Frendly
            </h1>
            <p className="text-xl max-w-md mx-auto text-blue-50 leading-relaxed">
              Don't worry! We'll help you get back to connecting with your friends.
            </p>
          </div>

          <div className="max-w-md mx-auto space-y-4">
            <InfoCard
              icon="🔐"
              title="Secure Process"
              desc="Your security is our top priority"
            />
            <InfoCard
              icon="⚡"
              title="Quick Recovery"
              desc="Reset your password in minutes"
            />
            <InfoCard
              icon="📧"
              title="Email Verification"
              desc="We'll send you a secure reset link"
            />
          </div>
        </div>
      </div>

      {/* RIGHT FORM */}
      <div className="flex items-center justify-center px-6 py-12 bg-gradient-to-br from-white to-blue-50/50">
        <div className="w-full max-w-md space-y-8">
          {/* Back Button */}
          <Link
            href="/login"
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Login
          </Link>

          {/* Header */}
          <div className="space-y-2">
            <h2 className="text-4xl font-bold tracking-tight text-blue-600">
              Forgot Password?
            </h2>
            <p className="text-base text-gray-600">
              No worries, we'll send you reset instructions.
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
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-blue-500" />
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  {...register("email")}
                  placeholder="you@example.com"
                  className="w-full h-12 bg-white border-2 border-gray-200 rounded-xl pl-12 pr-4 text-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                />
              </div>
              {errors.email?.message && (
                <p className="text-xs text-red-600 mt-2 ml-1">
                  {errors.email.message}
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
                  <span>Sending...</span>
                </div>
              ) : (
                "Send Reset Link"
              )}
            </button>
          </div>

          {/* Additional Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <p className="text-sm text-gray-700 leading-relaxed">
              <span className="font-semibold text-blue-600">Note:</span> If you
              don't receive an email within 5 minutes, please check your spam
              folder or try again.
            </p>
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

function InfoCard({ icon, title, desc }: any) {
  return (
    <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-5 border border-white/20 hover:bg-white/20 transition-all duration-300">
      <div className="flex items-start gap-4">
        <div className="text-3xl">{icon}</div>
        <div>
          <h4 className="font-bold text-lg mb-1">{title}</h4>
          <p className="text-sm text-blue-100">{desc}</p>
        </div>
      </div>
    </div>
  );
}

export default ForgetPasswordForm;