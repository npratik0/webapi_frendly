// "use client";

// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import Link from "next/link";
// import { Eye, EyeOff, Camera } from "lucide-react";
// import { toast } from "react-hot-toast";
// import { registerSchema, RegisterFormData } from "./schema";
// import { useRouter } from "next/navigation";


// type Step = 1 | 2 | 3;

// export default function RegisterForm() {
//   const [step, setStep] = useState<Step>(1);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirm, setShowConfirm] = useState(false);
//   const [avatar, setAvatar] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);

//   const router = useRouter();

//   const {
//     register,
//     handleSubmit,
//     trigger,
//     reset,
//     formState: { errors },
//   } = useForm<RegisterFormData>({
//     resolver: zodResolver(registerSchema),
//     defaultValues: {
//       fullName: "",
//       email: "",
//       dob: "",
//       phone: "",
//       gender: "male",
//       bio: "",
//       password: "",
//       confirmPassword: "",
//       terms: false,
//     },
//   });

//   const nextStep = async () => {
//     const valid =
//       step === 1
//         ? await trigger(["fullName", "email", "dob", "phone", "gender"])
//         : step === 2
//         ? await trigger(["bio"])
//         : true;

//     if (valid) setStep((prev) => (prev + 1) as Step);
//   };

//   const prevStep = () => setStep((prev) => (prev - 1) as Step);

//   const submit = async (data: RegisterFormData) => {
//     try {
//       setLoading(true);

//       // const payload = {
//       //   fullName: data.fullName,
//       //   email: data.email,
//       //   username:
//       //     data.email.split("@")[0] + Math.floor(Math.random() * 1000),
//       //   phoneNumber: data.phone ? Number(data.phone) : undefined,
//       //   gender: data.gender,
//       //   password: data.password,
//       //   bio: data.bio || "",
//       //   profilePicture: avatar || "",
//       //   role: "user",
//       // };

//       const payload = {
//   fullName: data.fullName,
//   username: data.email.split("@")[0] + Math.floor(Math.random() * 1000),
//   email: data.email,
//   phoneNumber: Number(data.phone),
//   gender: data.gender,
//   password: data.password,
//   confirmPassword: data.confirmPassword
// };


//       const res = await fetch("http://localhost:5050/api/auth/register", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       const result = await res.json();
//       if (!res.ok) throw new Error(result.message || "Registration failed");

//       toast.success("Account created successfully!");
//       reset();
//       setAvatar(null);
//       setStep(1);

//       setTimeout(() => {
//   router.push("/login");
// }, 1500);

//     } catch (err: any) {
//       toast.error(err.message || "Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;
//     const reader = new FileReader();
//     reader.onload = () => setAvatar(reader.result as string);
//     reader.readAsDataURL(file);
//   };

//   return (
//     <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
//       {/* LEFT BRANDING */}
//       <div className="hidden lg:flex relative bg-linear-to-br from-blue-600 to-blue-500 text-white items-center justify-center overflow-hidden">
//         <div className="absolute w-96 h-96 bg-white/10 rounded-full -top-20 -right-20" />
//         <div className="absolute w-72 h-72 bg-white/10 rounded-full bottom-10 -left-20" />
//         <div className="relative max-w-md space-y-8 px-6">
//           <h1 className="text-5xl font-bold italic tracking-wide">Frendly</h1>
//           <p className="text-blue-100">
//             Join the community and start connecting with friends.
//           </p>
//           <div className="space-y-4">
//             <Feature title="Find Your Community" desc="Connect through interests" />
//             <Feature title="Share & Connect" desc="Post moments with friends" />
//             <Feature title="Global Reach" desc="Friends worldwide" />
//           </div>
//         </div>
//       </div>

//       {/* RIGHT FORM */}
//       <div className="flex items-center justify-center px-6 bg-linear-to-br from-white to-blue-50">
//         <form
//           onSubmit={handleSubmit(submit)}
//           className="w-full max-w-md space-y-8"
//         >
//           <Header />
//           <StepIndicator step={step} />

//           {step === 1 && (
//             <>
//               <Avatar avatar={avatar} onUpload={handleAvatarUpload} />
//               <Input label="Full Name" {...register("fullName")} error={errors.fullName?.message} />
//               <Input label="Email" type="email" {...register("email")} error={errors.email?.message} />
//               <Input label="Date of Birth" type="date" {...register("dob")} error={errors.dob?.message} />
//               <Input label="Phone Number" {...register("phone")} error={errors.phone?.message} />
//               <Gender register={register} error={errors.gender?.message} />
//             </>
//           )}

//           {step === 2 && <Textarea label="Bio" {...register("bio")} />}

//           {step === 3 && (
//             <>
//               <PasswordInput
//                 label="Password"
//                 show={showPassword}
//                 toggle={() => setShowPassword(!showPassword)}
//                 register={register("password")}
//                 error={errors.password?.message}
//               />
//               <PasswordInput
//                 label="Confirm Password"
//                 show={showConfirm}
//                 toggle={() => setShowConfirm(!showConfirm)}
//                 register={register("confirmPassword")}
//                 error={errors.confirmPassword?.message}
//               />
//               <Terms register={register} error={errors.terms?.message} />
//             </>
//           )}

//           <Actions step={step} loading={loading} next={nextStep} back={prevStep} />

//           <p className="text-center text-sm">
//             Already have an account?{" "}
//             <Link href="/login" className="text-blue-600 font-medium">
//               Sign In
//             </Link>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// }

// /* ---------- Components (UI unchanged) ---------- */

// function Header() {
//   return (
//     <div className="text-center">
//       <h2 className="text-2xl font-semibold text-blue-600">Create Account</h2>
//       <p className="text-sm text-gray-500">Let’s get you started</p>
//     </div>
//   );
// }

// function Feature({ title, desc }: any) {
//   return (
//     <div className="bg-white/10 rounded-xl p-4">
//       <h4 className="font-semibold">{title}</h4>
//       <p className="text-sm text-blue-100">{desc}</p>
//     </div>
//   );
// }

// function StepIndicator({ step }: { step: number }) {
//   return (
//     <div className="flex justify-center gap-3">
//       {[1, 2, 3].map((s, i) => (
//         <div key={s} className="flex items-center gap-3">
//           <div className={`w-9 h-9 rounded-full flex items-center justify-center ${s <= step ? "bg-blue-600 text-white" : "bg-blue-100 text-blue-400"}`}>
//             {s}
//           </div>
//           {i < 2 && <div className="w-10 h-0.5 bg-blue-200" />}
//         </div>
//       ))}
//     </div>
//   );
// }

// function Avatar({ avatar, onUpload }: any) {
//   return (
//     <div className="flex justify-center">
//       <label className="relative cursor-pointer">
//         <input type="file" hidden accept="image/*" onChange={onUpload} />
//         <div className="w-28 h-28 rounded-full border flex items-center justify-center overflow-hidden">
//           {avatar ? <img src={avatar} className="w-full h-full object-cover" /> : <Camera />}
//         </div>
//       </label>
//     </div>
//   );
// }

// function Input({ label, error, ...props }: any) {
//   return (
//     <div>
//       <label className="text-sm font-medium">{label}</label>
//       <input {...props} className="w-full h-11 mt-2 border rounded-xl px-3" />
//       {error && <p className="text-xs text-red-500">{error}</p>}
//     </div>
//   );
// }

// function Textarea({ label, ...props }: any) {
//   return (
//     <div>
//       <label className="text-sm font-medium">{label}</label>
//       <textarea {...props} className="w-full h-32 mt-2 border rounded-xl p-3" />
//     </div>
//   );
// }

// function PasswordInput({ label, show, toggle, register, error }: any) {
//   return (
//     <div>
//       <label className="text-sm font-medium">{label}</label>
//       <div className="relative mt-2">
//         <input type={show ? "text" : "password"} {...register} className="w-full h-11 border rounded-xl px-3 pr-10" />
//         <button type="button" onClick={toggle} className="absolute right-3 top-1/2 -translate-y-1/2">
//           {show ? <EyeOff size={16} /> : <Eye size={16} />}
//         </button>
//       </div>
//       {error && <p className="text-xs text-red-500">{error}</p>}
//     </div>
//   );
// }

// function Gender({ register, error }: any) {
//   return (
//     <div>
//       <label className="text-sm font-medium">Gender</label>
//       <div className="flex gap-6 mt-2">
//         {["male", "female", "other"].map((g) => (
//           <label key={g} className="flex items-center gap-2">
//             <input type="radio" value={g} {...register("gender")} />
//             <span className="capitalize">{g}</span>
//           </label>
//         ))}
//       </div>
//       {error && <p className="text-xs text-red-500">{error}</p>}
//     </div>
//   );
// }

// function Terms({ register, error }: any) {
//   return (
//     <div>
//       <label className="flex gap-2 text-sm">
//         <input type="checkbox" {...register("terms")} />
//         I agree to the Terms & Conditions
//       </label>
//       {error && <p className="text-xs text-red-500">{error}</p>}
//     </div>
//   );
// }

// function Actions({ step, loading, next, back }: any) {
//   return (
//     <div className="flex gap-4">
//       {step > 1 && (
//         <button type="button" onClick={back} className="flex-1 border rounded-xl">
//           Back
//         </button>
//       )}
//       {step < 3 ? (
//         <button type="button" onClick={next} className="flex-1 h-11 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition">
//           Next
//         </button>
//       ) : (
//         <button type="submit" disabled={loading} className="flex-1 h-11 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition">
//           {loading ? "Creating..." : "Sign Up"}
//         </button>
//       )}
//     </div>
//   );
// }






"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Eye, EyeOff, Camera, ChevronDown } from "lucide-react";
import { toast } from "react-hot-toast";
import { registerSchema, RegisterFormData } from "./schema";
import { useRouter } from "next/navigation";

type Step = 1 | 2 | 3;

const countries = [
  { code: "NP", name: "Nepal", flag: "🇳🇵", dialCode: "+977" },
  { code: "US", name: "United States", flag: "🇺🇸", dialCode: "+1" },
  { code: "GB", name: "United Kingdom", flag: "🇬🇧", dialCode: "+44" },
  { code: "IN", name: "India", flag: "🇮🇳", dialCode: "+91" },
  { code: "AU", name: "Australia", flag: "🇦🇺", dialCode: "+61" },
];

export default function RegisterForm() {
  const [step, setStep] = useState<Step>(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [avatar, setAvatar] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(countries[0]); // Nepal default
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    trigger,
    reset,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      dob: "",
      phone: "",
      gender: "male",
      bio: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
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

  const submit = async (data: RegisterFormData) => {
    try {
      setLoading(true);

      const payload = {
        fullName: data.fullName,
        username: data.email.split("@")[0] + Math.floor(Math.random() * 1000),
        email: data.email,
        phoneNumber: Number(data.phone),
        gender: data.gender,
        password: data.password,
        confirmPassword: data.confirmPassword,
      };

      const res = await fetch("http://localhost:5050/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Registration failed");

      toast.success("Account created successfully!");
      reset();
      setAvatar(null);
      setStep(1);

      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        <div className="absolute w-96 h-96 bg-white/10 rounded-full -top-20 -right-20 blur-2xl" />
        <div className="absolute w-72 h-72 bg-white/10 rounded-full bottom-10 -left-20 blur-2xl" />

        <div className="relative max-w-md space-y-10 px-10 z-10">
          <div>
            <h1 className="text-6xl font-bold italic tracking-wide mb-6">Frendly</h1>
            <p className="text-xl text-blue-50 leading-relaxed">
              Join the community and start connecting with friends around the world.
            </p>
          </div>

          <div className="space-y-5">
            <Feature title="Find Your Community" desc="Connect through shared interests and hobbies" />
            <Feature title="Share & Connect" desc="Post moments and memories with your friends" />
            <Feature title="Global Reach" desc="Make friends from over 100 countries" />
          </div>
        </div>
      </div>

      {/* RIGHT FORM */}
      <div className="flex items-center justify-center px-6 py-12 bg-gradient-to-br from-white to-blue-50/50">
        <div className="w-full max-w-md space-y-8">
          <Header />
          <StepIndicator step={step} />

          <div className="space-y-6">
            {step === 1 && (
              <>
                <Avatar avatar={avatar} onUpload={handleAvatarUpload} />
                <Input label="Full Name" {...register("fullName")} error={errors.fullName?.message} placeholder="John Doe" />
                <Input label="Email" type="email" {...register("email")} error={errors.email?.message} placeholder="you@example.com" />
                <Input label="Date of Birth" type="date" {...register("dob")} error={errors.dob?.message} />
                
                {/* Phone Number with Country Selector */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                  <div className="flex gap-2">
                    {/* Country Selector */}
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                        className="h-12 px-3 bg-white border-2 border-gray-200 rounded-xl flex items-center gap-2 hover:border-gray-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                      >
                        <span className="text-2xl">{selectedCountry.flag}</span>
                        <span className="text-sm font-medium text-gray-700">{selectedCountry.dialCode}</span>
                        <ChevronDown className="w-4 h-4 text-gray-500" />
                      </button>

                      {showCountryDropdown && (
                        <div className="absolute top-full left-0 mt-2 w-64 bg-white border-2 border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden">
                          {countries.map((country) => (
                            <button
                              key={country.code}
                              type="button"
                              onClick={() => {
                                setSelectedCountry(country);
                                setShowCountryDropdown(false);
                              }}
                              className="w-full px-4 py-3 flex items-center gap-3 hover:bg-blue-50 transition-colors text-left"
                            >
                              <span className="text-2xl">{country.flag}</span>
                              <div className="flex-1">
                                <p className="text-sm font-medium text-gray-900">{country.name}</p>
                                <p className="text-xs text-gray-500">{country.dialCode}</p>
                              </div>
                              {selectedCountry.code === country.code && (
                                <div className="w-2 h-2 bg-blue-600 rounded-full" />
                              )}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Phone Input */}
                    <div className="flex-1">
                      <input
                        type="tel"
                        {...register("phone")}
                        placeholder="Enter phone number"
                        className="w-full h-12 bg-white border-2 border-gray-200 rounded-xl px-4 text-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                      />
                    </div>
                  </div>
                  {errors.phone && <p className="text-xs text-red-600 mt-2 ml-1">{errors.phone.message}</p>}
                </div>

                <Gender register={register} error={errors.gender?.message} />
              </>
            )}

            {step === 2 && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Bio (Optional)</label>
                <textarea
                  {...register("bio")}
                  placeholder="Tell us about yourself..."
                  rows={5}
                  className="w-full bg-white border-2 border-gray-200 rounded-xl p-4 text-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all resize-none"
                />
              </div>
            )}

            {step === 3 && (
              <>
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
                <Terms register={register} error={errors.terms?.message} />
              </>
            )}

            <Actions step={step} loading={loading} next={nextStep} back={prevStep} submit={handleSubmit(submit)} />

            <p className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link href="/login" className="text-blue-600 hover:text-blue-700 font-semibold transition-colors">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Components ---------- */

function Header() {
  return (
    <div className="text-center space-y-2">
      <h2 className="text-4xl font-bold tracking-tight text-blue-600">Create Account</h2>
      <p className="text-base text-gray-600">Let's get you started</p>
    </div>
  );
}

function Feature({ title, desc }: any) {
  return (
    <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-5 border border-white/20 hover:bg-white/20 transition-all duration-300">
      <h4 className="font-bold text-lg mb-1">{title}</h4>
      <p className="text-sm text-blue-100">{desc}</p>
    </div>
  );
}

function StepIndicator({ step }: { step: number }) {
  return (
    <div className="flex justify-center items-center gap-2">
      {[1, 2, 3].map((s, i) => (
        <div key={s} className="flex items-center">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
              s <= step
                ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/30"
                : "bg-gray-200 text-gray-400"
            }`}
          >
            {s}
          </div>
          {i < 2 && (
            <div className={`w-16 h-1 mx-1 rounded transition-all duration-300 ${s < step ? "bg-gradient-to-r from-blue-600 to-blue-500" : "bg-gray-200"}`} />
          )}
        </div>
      ))}
    </div>
  );
}

function Avatar({ avatar, onUpload }: any) {
  return (
    <div className="flex justify-center">
      <label className="relative cursor-pointer group">
        <input type="file" hidden accept="image/*" onChange={onUpload} />
        <div className="w-28 h-28 rounded-full border-4 border-dashed border-gray-300 group-hover:border-blue-500 flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 to-white transition-all">
          {avatar ? (
            <img src={avatar} className="w-full h-full object-cover" alt="Avatar" />
          ) : (
            <Camera className="w-10 h-10 text-gray-400 group-hover:text-blue-500 transition-colors" />
          )}
        </div>
      </label>
    </div>
  );
}

function Input({ label, error, ...props }: any) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>
      <input
        {...props}
        className="w-full h-12 bg-white border-2 border-gray-200 rounded-xl px-4 text-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
      />
      {error && <p className="text-xs text-red-600 mt-2 ml-1">{error}</p>}
    </div>
  );
}

function PasswordInput({ label, show, toggle, register, error }: any) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>
      <div className="relative">
        <input
          type={show ? "text" : "password"}
          {...register}
          placeholder="Enter your password"
          className="w-full h-12 bg-white border-2 border-gray-200 rounded-xl px-4 pr-12 text-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
        />
        <button
          type="button"
          onClick={toggle}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
        >
          {show ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
        </button>
      </div>
      {error && <p className="text-xs text-red-600 mt-2 ml-1">{error}</p>}
    </div>
  );
}

function Gender({ register, error }: any) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">Gender</label>
      <div className="grid grid-cols-3 gap-3">
        {["male", "female", "other"].map((g) => (
          <label key={g} className="relative cursor-pointer">
            <input type="radio" value={g} {...register("gender")} className="peer sr-only" />
            <div className="h-11 border-2 border-gray-200 rounded-xl flex items-center justify-center capitalize font-medium text-sm peer-checked:border-blue-600 peer-checked:bg-blue-50 peer-checked:text-blue-600 hover:border-gray-300 transition-all">
              {g}
            </div>
          </label>
        ))}
      </div>
      {error && <p className="text-xs text-red-600 mt-2 ml-1">{error}</p>}
    </div>
  );
}

function Terms({ register, error }: any) {
  return (
    <div>
      <label className="flex items-start gap-3 cursor-pointer group">
        <input
          type="checkbox"
          {...register("terms")}
          className="mt-0.5 w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <span className="text-sm text-gray-700">
          I agree to the{" "}
          <a href="#" className="text-blue-600 hover:text-blue-700 font-semibold">
            Terms & Conditions
          </a>
        </span>
      </label>
      {error && <p className="text-xs text-red-600 mt-2 ml-1">{error}</p>}
    </div>
  );
}

function Actions({ step, loading, next, back, submit }: any) {
  return (
    <div className="flex gap-3 pt-2">
      {step > 1 && (
        <button
          type="button"
          onClick={back}
          className="flex-1 h-12 border-2 border-gray-200 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all"
        >
          Back
        </button>
      )}
      {step < 3 ? (
        <button
          type="button"
          onClick={next}
          className="flex-1 h-12 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-200"
        >
          Next
        </button>
      ) : (
        <button
          type="button"
          onClick={submit}
          disabled={loading}
          className="flex-1 h-12 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200"
        >
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Creating...</span>
            </div>
          ) : (
            "Sign Up"
          )}
        </button>
      )}
    </div>
  );
}
