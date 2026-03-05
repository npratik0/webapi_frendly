// "use client";
// import { Controller, useForm } from "react-hook-form";
// // import { UserData, UserSchema } from "@/app/admin/users/schema";
// import { UserData, UserSchema } from "@/app/admin/users/schemas";

// import { zodResolver } from "@hookform/resolvers/zod";
// import { useRef, useState, useTransition } from "react";
// import Link from "next/link";
// import { toast } from "react-toastify";
// import { handleCreateUser } from "@/lib/actions/admin/user-action";
// export default function CreateUserForm() {

//     const [pending, startTransition] = useTransition();
//     const { register, handleSubmit, control, reset, formState: { errors, isSubmitting } } = useForm<UserData>({
//         resolver: zodResolver(UserSchema)
//     });
//     const [error, setError] = useState<string | null>(null);
//     const [previewImage, setPreviewImage] = useState<string | null>(null);
//     const fileInputRef = useRef<HTMLInputElement>(null);

//     const handleImageChange = (file: File | undefined, onChange: (file: File | undefined) => void) => {
//         if (file) {
//             const reader = new FileReader();
//             reader.onloadend = () => {
//                 setPreviewImage(reader.result as string);
//             };
//             reader.readAsDataURL(file);
//         } else {
//             setPreviewImage(null);
//         }
//         onChange(file);
//     };

//     const handleDismissImage = (onChange?: (file: File | undefined) => void) => {
//         setPreviewImage(null);
//         onChange?.(undefined);
//         if (fileInputRef.current) {
//             fileInputRef.current.value = '';
//         }
//     };

//     const onSubmit = async (data: UserData) => {
//         setError(null);
//         startTransition(async () => {
//             try {
//                 const formData = new FormData();
//                 if (data.firstName) {
//                     formData.append('firstName', data.firstName);
//                 }
//                 if (data.lastName) {
//                     formData.append('lastName', data.lastName);
//                 }

//                 formData.append('email', data.email);
//                 formData.append('username', data.username);
//                 formData.append('password', data.password);
//                 formData.append('confirmPassword', data.confirmPassword);

//                 if (data.image) {
//                     formData.append('image', data.image);
//                 }
//                 const response = await handleCreateUser(formData);

//                 if (!response.success) {
//                     throw new Error(response.message || 'Create profile failed');
//                 }
//                 reset();
//                 handleDismissImage();
//                 toast.success('Profile Created successfully');

//             } catch (error: Error | any) {
//                 toast.error(error.message || 'Create profile failed');
//                 setError(error.message || 'Create profile failed');
//             }
//         });

//     };
//     console.log(errors);
//     return (
//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//             {/* Profile Image Display */}
//             <div className="mb-4">
//                 {previewImage ? (
//                     <div className="relative w-24 h-24">
//                         <img
//                             src={previewImage}
//                             alt="Profile Image Preview"
//                             className="w-24 h-24 rounded-full object-cover"
//                         />
//                         <Controller
//                             name="image"
//                             control={control}
//                             render={({ field: { onChange } }) => (
//                                 <button
//                                     type="button"
//                                     onClick={() => handleDismissImage(onChange)}
//                                     className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
//                                 >
//                                     ✕
//                                 </button>
//                             )}
//                         />
//                     </div>
//                 ) : (
//                     <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center">
//                         <span className="text-gray-600">No Image</span>
//                     </div>
//                 )}

//             </div>
//             {/* Profile Image Input */}
//             <div className="mb-4">
//                 <label className="block text-sm font-medium mb-1">Profile Image</label>
//                 <Controller
//                     name="image"
//                     control={control}
//                     render={({ field: { onChange } }) => (
//                         <input
//                             ref={fileInputRef}
//                             type="file"
//                             onChange={(e) => handleImageChange(e.target.files?.[0], onChange)}
//                             accept=".jpg,.jpeg,.png,.webp"
//                         />
//                     )}
//                 />
//                 {errors.image && <p className="text-sm text-red-600">{errors.image.message}</p>}
//             </div>

//             <div className="grid grid-cols-2 gap-4">
//                 <div className="space-y-1">
//                     <label className="text-sm font-medium" htmlFor="firstName">First name</label>
//                     <input
//                         id="firstName"
//                         type="text"
//                         autoComplete="given-name"
//                         className="h-10 w-full rounded-md border border-black/10 dark:border-white/15 bg-background px-3 text-sm outline-none focus:border-foreground/40"
//                         {...register("firstName")}
//                         placeholder="Jane"
//                     />
//                     {errors.firstName?.message && (
//                         <p className="text-xs text-red-600">{errors.firstName.message}</p>
//                     )}
//                 </div>

//                 <div className="space-y-1">
//                     <label className="text-sm font-medium" htmlFor="lastName">Last name</label>
//                     <input
//                         id="lastName"
//                         type="text"
//                         autoComplete="family-name"
//                         className="h-10 w-full rounded-md border border-black/10 dark:border-white/15 bg-background px-3 text-sm outline-none focus:border-foreground/40"
//                         {...register("lastName")}
//                         placeholder="Doe"
//                     />
//                     {errors.lastName?.message && (
//                         <p className="text-xs text-red-600">{errors.lastName.message}</p>
//                     )}
//                 </div>
//             </div>

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

//             <div className="space-y-1">
//                 <label className="text-sm font-medium" htmlFor="username">Username</label>
//                 <input
//                     id="username"
//                     type="text"
//                     autoComplete="username"
//                     className="h-10 w-full rounded-md border border-black/10 dark:border-white/15 bg-background px-3 text-sm outline-none focus:border-foreground/40"
//                     {...register("username")}
//                     placeholder="Jane Doe"
//                 />
//                 {errors.username?.message && (
//                     <p className="text-xs text-red-600">{errors.username.message}</p>
//                 )}
//             </div>
//             <div className="space-y-1">
//                 <label className="text-sm font-medium" htmlFor="password">Password</label>
//                 <input
//                     id="password"
//                     type="password"
//                     autoComplete="new-password"
//                     className="h-10 w-full rounded-md border border-black/10 dark:border-white/15 bg-background px-3 text-sm outline-none focus:border-foreground/40"
//                     {...register("password")}
//                     placeholder="••••••"
//                 />
//                 {errors.password?.message && (
//                     <p className="text-xs text-red-600">{errors.password.message}</p>
//                 )}
//             </div>

//             <div className="space-y-1">
//                 <label className="text-sm font-medium" htmlFor="confirmPassword">Confirm password</label>
//                 <input
//                     id="confirmPassword"
//                     type="password"
//                     autoComplete="new-password"
//                     className="h-10 w-full rounded-md border border-black/10 dark:border-white/15 bg-background px-3 text-sm outline-none focus:border-foreground/40"
//                     {...register("confirmPassword")}
//                     placeholder="••••••"
//                 />
//                 {errors.confirmPassword?.message && (
//                     <p className="text-xs text-red-600">{errors.confirmPassword.message}</p>
//                 )}
//             </div>

//             <button
//                 type="submit"
//                 disabled={isSubmitting || pending}
//                 className="h-10 w-full rounded-md bg-foreground text-background text-sm font-semibold hover:opacity-90 disabled:opacity-60"
//             >
//                 {isSubmitting || pending ? "Creating account..." : "Create account"}
//             </button>
//         </form>
//     );
// }



"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Camera } from "lucide-react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { adminCreateUserSchema, AdminCreateUserFormData } from "../schemas";

export default function CreateUserForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [avatar, setAvatar] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AdminCreateUserFormData>({
    resolver: zodResolver(adminCreateUserSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      gender: "male",
      password: "",
      confirmPassword: "",
      role: "user", // default role
    },
  });

  const submit = async (data: any) => {
    try {
      setLoading(true);

      const payload = {
        fullName: data.fullName,
        username:
          data.email.split("@")[0] + Math.floor(Math.random() * 1000),
        email: data.email,
        phoneNumber: Number(data.phone),
        gender: data.gender,
        password: data.password,
        confirmPassword: data.confirmPassword,
        role: data.role, // 🔥 added role
      };

      const res = await fetch(
        "http://localhost:5050/api/admin/create-user",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const result = await res.json();
      if (!res.ok)
        throw new Error(result.message || "User creation failed");

      toast.success("User created successfully!");
      reset();
      setAvatar(null);

      setTimeout(() => {
        router.push("/admin/users");
      }, 1200);
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarUpload = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () =>
      setAvatar(reader.result as string);
    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center py-12 px-6">
      <div className="w-full max-w-xl bg-white p-8 rounded-2xl shadow-md space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-blue-600">
            Create New User
          </h2>
          <p className="text-gray-600 text-sm">
            Admin panel user creation
          </p>
        </div>

        {/* Avatar */}
        <div className="flex justify-center">
          <label className="relative cursor-pointer group">
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleAvatarUpload}
            />
            <div className="w-24 h-24 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden hover:border-blue-500 transition">
              {avatar ? (
                <img
                  src={avatar}
                  className="w-full h-full object-cover"
                  alt="Avatar"
                />
              ) : (
                <Camera className="w-8 h-8 text-gray-400 group-hover:text-blue-500" />
              )}
            </div>
          </label>
        </div>

        {/* Full Name */}
        <Input
          label="Full Name"
          register={register("fullName")}
          error={errors.fullName?.message}
        />

        {/* Email */}
        <Input
          label="Email"
          type="email"
          register={register("email")}
          error={errors.email?.message}
        />

        {/* Phone */}
        <Input
          label="Phone Number"
          register={register("phone")}
          error={errors.phone?.message}
        />

        {/* Gender */}
        <div>
          <label className="block text-sm font-semibold mb-2">
            Gender
          </label>
          <select
            {...register("gender")}
            className="w-full h-11 border border-gray-300 rounded-lg px-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Role Selector 🔥 */}
        <div>
          <label className="block text-sm font-semibold mb-2">
            Role
          </label>
          <select
            {...register("role")}
            className="w-full h-11 border border-gray-300 rounded-lg px-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        {/* Password */}
        <PasswordInput
          label="Password"
          show={showPassword}
          toggle={() => setShowPassword(!showPassword)}
          register={register("password")}
          error={errors.password?.message}
        />

        <PasswordInput
          label="Confirm Password"
          show={showConfirm}
          toggle={() => setShowConfirm(!showConfirm)}
          register={register("confirmPassword")}
          error={errors.confirmPassword?.message}
        />

        {/* Submit */}
        <button
          onClick={handleSubmit(submit)}
          disabled={loading}
          className="w-full h-11 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition disabled:opacity-60"
        >
          {loading ? "Creating User..." : "Create User"}
        </button>
      </div>
    </div>
  );
}

/* ---------- Small Reusable Components ---------- */

function Input({ label, register, error, type = "text" }: any) {
  return (
    <div>
      <label className="block text-sm font-semibold mb-2">
        {label}
      </label>
      <input
        type={type}
        {...register}
        className="w-full h-11 border border-gray-300 rounded-lg px-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
      />
      {error && (
        <p className="text-xs text-red-600 mt-1">{error}</p>
      )}
    </div>
  );
}

function PasswordInput({
  label,
  show,
  toggle,
  register,
  error,
}: any) {
  return (
    <div>
      <label className="block text-sm font-semibold mb-2">
        {label}
      </label>
      <div className="relative">
        <input
          type={show ? "text" : "password"}
          {...register}
          className="w-full h-11 border border-gray-300 rounded-lg px-3 pr-10 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <button
          type="button"
          onClick={toggle}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
        >
          {show ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
      {error && (
        <p className="text-xs text-red-600 mt-1">{error}</p>
      )}
    </div>
  );
}