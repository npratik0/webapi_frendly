// "use client";

// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import Link from "next/link";
// import { useTransition, useState } from "react";
// import { useRouter } from "next/navigation";
// import { LoginData, loginSchema } from "../schema";
// import { Mail, Lock, Eye, EyeOff } from "lucide-react";
// import Image from "next/image";
// import GoogleLogo from "@/public/google.png";
// // import { handleLogin } from "@/lib/actions/auth-action";
// import { handleLogin } from "@/lib/actions/auth-action";

// export default function LoginForm() {
//   // const router = useRouter();
//   // const [pending, startTransition] = useTransition();
//   // const [showPassword, setShowPassword] = useState(false);
//   // const [error, setError] = useState<string | null>(null);

//   // const {
//   //   register,
//   //   handleSubmit,
//   //   formState: { errors, isSubmitting },
//   // } = useForm<LoginData>({
//   //   resolver: zodResolver(loginSchema),
//   // });

//   // const submit = async (values: LoginData) => {
//   //   setError(null);

//   //   startTransition(async () => {
//   //     try {
//   //       const res = await fetch(
//   //         `http://localhost:5050/api/auth/login`,
//   //         {
//   //           method: "POST",
//   //           headers: {
//   //             "Content-Type": "application/json",
//   //           },
//   //           body: JSON.stringify(values),
//   //         }
//   //       );

//   //       const data = await res.json();

//   //       if (!res.ok) {
//   //         throw new Error(data.message || "Invalid email or password");
//   //       }

//   //       // Save auth data
//   //       localStorage.setItem("token", data.token);
//   //       localStorage.setItem("user", JSON.stringify(data.user));

//   //       // Redirect after login
//   //       router.push("/auth/dashboard");
//   //     } catch (err: any) {
//   //       setError(err.message);
//   //     }
//   //   });
//   // };
//   const router = useRouter();
//     const {
//         register,
//         handleSubmit,
//         formState: { errors, isSubmitting },
//     } = useForm<LoginData>({
//         resolver: zodResolver(loginSchema),
//         mode: "onSubmit",
//     });
//     const [showPassword, setShowPassword] = useState(false);
//     const [pending, setTransition] = useTransition()
//     const [error, setError] = useState<string | null>(null);

//     const submit = async (values: LoginData) => {
//         setError(null);

//         // GOTO
//         setTransition(async () => {
//             try {
//                 const response = await handleLogin(values);
//                 if (!response.success) {
//                     throw new Error(response.message);
//                 }
//                 if (response.success) {
//                     router.push("/auth/dashboard");
//                 } else {
//                     setError('Login failed');
//                 }
//             } catch (err: Error | any) {
//                 setError(err.message || 'Login failed');
//             }
//         })
//     };

//   return (
//     <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
//       {/* LEFT BRANDING */}
//       <div className="hidden lg:flex relative bg-linear-to-br from-blue-600 to-blue-500 text-white items-center justify-center overflow-hidden">
//         <div className="absolute w-96 h-96 bg-white/10 rounded-full -top-20 -right-20" />
//         <div className="absolute w-72 h-72 bg-white/10 rounded-full bottom-10 -left-20" />

//         <div className="relative text-center space-y-10 px-10">
//           <div>
//             <h1 className="text-5xl font-bold italic tracking-wide">
//               Frendly
//             </h1>
//             <p className="mt-6 text-lg max-w-md mx-auto text-blue-100">
//               Connect with friends and the world around you on Frendly.
//             </p>
//           </div>

//           <div className="flex gap-6 justify-center">
//             <Stat value="10M+" label="Users" />
//             <Stat value="50M+" label="Posts" />
//             <Stat value="100+" label="Countries" />
//           </div>
//         </div>
//       </div>

//       {/* RIGHT LOGIN */}
//       <div className="flex items-center justify-center px-6 bg-linear-to-br from-white to-blue-50">
//         <div className="w-full max-w-md space-y-8">
//           {/* HEADER */}
//           <div className="text-center space-y-1">
//             <h2 className="text-3xl font-semibold tracking-wide text-blue-600">
//               Welcome Back
//             </h2>
//             <p className="text-sm text-gray-500">
//               Log in to continue to Frendly
//             </p>
//           </div>

//           {/* ERROR MESSAGE */}
//           {error && (
//             <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-2 rounded-lg">
//               {error}
//             </div>
//           )}

      


//           {/* FORM */}
//           <form onSubmit={handleSubmit(submit)} className="space-y-5">
//             {/* EMAIL */}
//             <div>
//               <label className="text-sm font-medium">Email</label>
//               <div className="relative mt-2">
//                 <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-500" />
//                 <input
//                   type="email"
//                   {...register("email")}
//                   placeholder="Enter your email"
//                   className="w-full h-11 bg-white/70 border rounded-xl pl-11 pr-4 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
//                 />
//               </div>
//               {errors.email && (
//                 <p className="text-xs text-red-600 mt-1">
//                   {errors.email.message}
//                 </p>
//               )}
//             </div>

//             {/* PASSWORD */}
//             <div>
//               <label className="text-sm font-medium">Password</label>
//               <div className="relative mt-2">
//                 <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-500" />
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   {...register("password")}
//                   placeholder="Enter your password"
//                   className="w-full h-11 bg-white/70 border rounded-xl pl-11 pr-11 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-4 top-1/2 -translate-y-1/2"
//                 >
//                   {showPassword ? (
//                     <EyeOff className="h-4 w-4 text-gray-500" />
//                   ) : (
//                     <Eye className="h-4 w-4 text-gray-500" />
//                   )}
//                 </button>
//               </div>
//               {errors.password && (
//                 <p className="text-xs text-red-600 mt-1">
//                   {errors.password.message}
//                 </p>
//               )}
//             </div>

//             {/* FORGOT */}
//             <div className="text-right">
//               <Link
//                 href="/forgot-password"
//                 className="text-sm text-blue-600 hover:underline"
//               >
//                 Forgot password?
//               </Link>
//             </div>

//             {/* LOGIN BUTTON */}
//             <button
//               type="submit"
//               disabled={isSubmitting || pending}
//               className="w-full h-11 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition disabled:opacity-60"
//             >
//               {isSubmitting || pending ? "Signing in..." : "Sign In"}
//             </button>
//           </form>

//           {/* DIVIDER */}
//           <div className="relative">
//             <div className="absolute inset-0 flex items-center">
//               <span className="w-full border-t border-blue-200" />
//             </div>
//             <div className="relative flex justify-center text-xs uppercase">
//               <span className="bg-white px-2 text-gray-400">
//                 Or continue with
//               </span>
//             </div>
//           </div>

//           {/* GOOGLE LOGIN */}
//           <button
//             type="button"
//             className="w-full h-11 rounded-xl border bg-white flex items-center justify-center gap-3 text-sm font-medium hover:bg-blue-600 hover:text-white transition"
//           >
//             <Image src={GoogleLogo} alt="Google" width={26} height={26} />
//             Sign in with Google
//           </button>

//           {/* REGISTER */}
//           <p className="text-center text-sm text-gray-600">
//             Don’t have an account?{" "}
//             <Link href="/register" className="text-blue-600 font-medium">
//               Sign up
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// function Stat({ value, label }: { value: string; label: string }) {
//   return (
//     <div className="bg-white/15 rounded-xl px-8 py-5 text-center">
//       <p className="text-2xl font-bold">{value}</p>
//       <p className="text-sm opacity-90">{label}</p>
//     </div>
//   );
// }



"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useTransition, useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import GoogleLogo from "@/public/google.png";
import { handleLogin } from "@/lib/actions/auth-action";
import { LoginData, loginSchema } from "../schema";

// // Add these types at the top
// type LoginData = {
//   email: string;
//   password: string;
// };

// const loginSchema = {
//   // Your schema here
// };

export default function LoginForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    mode: "onSubmit",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [pending, setTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const submit = async (values: LoginData) => {
    setError(null);
    setTransition(async () => {
      try {
        const response = await handleLogin(values);
        if (!response.success) {
          throw new Error(response.message);
        }
        if (response.success) {
          // if(response.data.role == 'admin'){
          //   router.push("/admin");
          // }else{
          //     router.push("/auth/dashboard");
          // }
          if(response.data?.role == 'admin'){
            return router.replace("/admin");
          }
          if(response.data?.role == 'user'){
            return router.replace("/auth/dashboard");
          }
          return router.replace("/");
        } else {
          setError("Login failed");
        }
      } catch (err: Error | any) {
        setError(err.message || "Login failed");
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
            <h1 className="text-6xl font-bold italic tracking-wide mb-6">
              Frendly
            </h1>
            <p className="text-xl max-w-md mx-auto text-blue-50 leading-relaxed">
              Connect with friends and the world around you on Frendly.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto">
            <Stat value="10M+" label="Users" />
            <Stat value="50M+" label="Posts" />
            <Stat value="100+" label="Countries" />
          </div>
        </div>
      </div>

      {/* RIGHT LOGIN */}
      <div className="flex items-center justify-center px-6 py-12 bg-gradient-to-br from-white to-blue-50/50">
        <div className="w-full max-w-md space-y-8">
          {/* HEADER */}
          <div className="text-center space-y-2">
            <h2 className="text-4xl font-bold tracking-tight text-blue-600">
              Welcome Back
            </h2>
            <p className="text-base text-gray-600">
              Log in to continue to Frendly
            </p>
          </div>

          {/* ERROR MESSAGE */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded-lg shadow-sm">
              <p className="font-medium">{error}</p>
            </div>
          )}

          {/* FORM */}
          <div className="space-y-6">
            {/* EMAIL */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-blue-500" />
                <input
                  type="email"
                  {...register("email")}
                  placeholder="Enter your email"
                  className="w-full h-12 bg-white border-2 border-gray-200 rounded-xl pl-12 pr-4 text-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                />
              </div>
              {errors.email && (
                <p className="text-xs text-red-600 mt-2 ml-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* PASSWORD */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-blue-500" />
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  placeholder="Enter your password"
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
              {errors.password && (
                <p className="text-xs text-red-600 mt-2 ml-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* FORGOT */}
            <div className="text-right">
              <Link
                href="/forgot-password"
                className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            {/* LOGIN BUTTON */}
            <button
              onClick={handleSubmit(submit)}
              disabled={isSubmitting || pending}
              className="w-full h-12 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200"
            >
              {isSubmitting || pending ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Signing in...</span>
                </div>
              ) : (
                "Sign In"
              )}
            </button>
          </div>

          {/* DIVIDER */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t-2 border-gray-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-4 text-gray-500 font-medium">
                Or continue with
              </span>
            </div>
          </div>

          {/* GOOGLE LOGIN */}
          <button
            type="button"
            className="w-full h-12 rounded-xl border-2 border-gray-200 bg-white flex items-center justify-center gap-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
          >
            <Image src={GoogleLogo} alt="Google" width={20} height={20} />
            Sign in with Google
          </button>

          {/* REGISTER */}
          <p className="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link href="/register" className="text-blue-600 hover:text-blue-700 font-semibold transition-colors">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="bg-white/15 backdrop-blur-sm rounded-2xl px-6 py-5 text-center border border-white/20 hover:bg-white/20 transition-all duration-300">
      <p className="text-3xl font-bold mb-1">{value}</p>
      <p className="text-sm text-blue-100">{label}</p>
    </div>
  );
}