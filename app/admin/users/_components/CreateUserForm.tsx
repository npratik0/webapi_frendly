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