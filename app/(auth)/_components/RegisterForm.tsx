"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Eye, EyeOff, Camera } from "lucide-react";
import { registerSchema, RegisterData } from "../schema";

type Step = 1 | 2 | 3;

export default function RegisterForm() {
  const [step, setStep] = useState<Step>(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [avatar, setAvatar] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
  });

  const nextStep = async () => {
    const valid =
      step === 1
        ? await trigger(["fullName", "email", "dob", "phone", "gender"])
        : step === 2
        ? await trigger(["bio"])
        : true;

    if (valid) setStep((prev) => (prev + 1) as Step);
  };

  const prevStep = () => setStep((prev) => (prev - 1) as Step);

  const submit = (data: RegisterData) => {
    console.log("REGISTER DATA", data);
  };

  const handleAvatarUpload = (e: any) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setAvatar(reader.result as string);
    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* LEFT BRANDING */}
      <div className="hidden lg:flex relative bg-gradient-to-br from-blue-600 to-blue-500 text-white items-center justify-center overflow-hidden">
        <div className="absolute w-96 h-96 bg-white/10 rounded-full -top-20 -right-20" />
        <div className="absolute w-72 h-72 bg-white/10 rounded-full bottom-10 -left-20" />

        <div className="relative max-w-md space-y-8 px-6">
          <h1 className="text-5xl font-bold italic tracking-wide">Frendly</h1>
          <p className="text-blue-100 leading-relaxed">
            Join the community and start connecting with friends around the world.
          </p>

          <div className="space-y-4">
            <Feature title="Find Your Community" desc="Connect through shared interests" />
            <Feature title="Share & Connect" desc="Post moments with friends" />
            <Feature title="Global Reach" desc="Friends from 100+ countries" />
          </div>
        </div>
      </div>

      {/* RIGHT – BLENDED FORM */}
      <div className="flex items-center justify-center px-6 bg-gradient-to-br from-white to-blue-50">
        <form
          onSubmit={handleSubmit(submit)}
          className="w-full max-w-md space-y-8"
        >
          {/* HEADER */}
          <div className="text-center space-y-1">
            <h2 className="text-2xl font-semibold tracking-wide text-blue-600">
              Create Account
            </h2>
            <p className="text-sm text-gray-500">
              Let’s get you started
            </p>
          </div>

          {/* STEP INDICATOR */}
          <StepIndicator step={step} />

          {/* AVATAR */}
          {step === 1 && (
            <div className="flex justify-center">
              <label className="relative cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleAvatarUpload}
                />
                <div className="w-28 h-28 rounded-full bg-white/70 backdrop-blur border border-blue-200 flex items-center justify-center overflow-hidden">
                  {avatar ? (
                    <img
                      src={avatar}
                      alt="avatar"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Camera className="text-blue-400" size={26} />
                  )}
                </div>
                <span className="absolute bottom-1 right-1 bg-blue-600 text-white p-1.5 rounded-full">
                  <Camera size={14} />
                </span>
              </label>
            </div>
          )}

          {/* STEP 1 */}
          {step === 1 && (
            <div className="space-y-5">
              <Input label="Full Name" {...register("fullName")} error={errors.fullName?.message} />
              <Input label="Email" type="email" {...register("email")} error={errors.email?.message} />
              <Input label="Date of Birth" type="date" {...register("dob")} error={errors.dob?.message} />
              <Input label="Phone Number" {...register("phone")} error={errors.phone?.message} />

              {/* GENDER – RADIO */}
              <div>
                <label className="text-sm font-medium">Gender</label>
                <div className="flex gap-6 mt-3">
                  {["male", "female", "other"].map((g) => (
                    <label
                      key={g}
                      className="flex items-center gap-2 cursor-pointer text-sm"
                    >
                      <input
                        type="radio"
                        value={g}
                        {...register("gender")}
                        className="accent-blue-600 w-4 h-4"
                      />
                      <span className="capitalize">{g}</span>
                    </label>
                  ))}
                </div>
                {errors.gender && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.gender.message}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div>
              <label className="text-sm font-medium">Bio</label>
              <textarea
                {...register("bio")}
                className="w-full h-32 mt-2 bg-white/70 backdrop-blur border rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Tell us something about yourself..."
              />
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div className="space-y-5">
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

              <label className="flex gap-2 text-sm items-center">
                <input type="checkbox" {...register("terms")} />
                I agree to the Terms & Conditions
              </label>
              {errors.terms && (
                <p className="text-red-500 text-xs">{errors.terms.message}</p>
              )}
            </div>
          )}

          {/* ACTIONS */}
          <div className="flex gap-4 pt-2">
            {step > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="flex-1 h-11 rounded-xl border bg-white/60 hover:bg-white transition"
              >
                Back
              </button>
            )}

            {step < 3 ? (
              <button
                type="button"
                onClick={nextStep}
                className="flex-1 h-11 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                className="flex-1 h-11 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition"
              >
               <Link href="/auth/dashboard" >
              Sign Up
            </Link>
              </button>
            )}
          </div>

          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-600 font-medium">
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

/* COMPONENTS */

function Feature({ title, desc }: any) {
  return (
    <div className="bg-white/10 rounded-xl p-4">
      <h4 className="font-semibold">{title}</h4>
      <p className="text-sm text-blue-100">{desc}</p>
    </div>
  );
}

function StepIndicator({ step }: { step: number }) {
  return (
    <div className="flex justify-center items-center gap-3">
      {[1, 2, 3].map((s, i) => (
        <div key={s} className="flex items-center gap-3">
          <div
            className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold
            ${s <= step ? "bg-blue-600 text-white" : "bg-blue-100 text-blue-400"}`}
          >
            {s}
          </div>
          {i < 2 && <div className="w-10 h-[2px] bg-blue-200" />}
        </div>
      ))}
    </div>
  );
}

function Input({ label, error, ...props }: any) {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      <input
        {...props}
        className="w-full h-11 mt-2 bg-white/70 backdrop-blur border rounded-xl px-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
      />
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
}

function PasswordInput({ label, show, toggle, register, error }: any) {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      <div className="relative mt-2">
        <input
          type={show ? "text" : "password"}
          {...register}
          className="w-full h-11 bg-white/70 backdrop-blur border rounded-xl px-3 pr-10 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <button
          type="button"
          onClick={toggle}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
        >
          {show ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
}
