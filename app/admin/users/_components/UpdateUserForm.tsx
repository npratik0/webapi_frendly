// // "use client";
// // import { Controller, useForm } from "react-hook-form";
// // import { UserData, UserSchema } from "@/app/admin/users/schemas";
// // import { zodResolver } from "@hookform/resolvers/zod";
// // import { useRef, useState, useTransition } from "react";
// // import Link from "next/link";
// // import { toast } from "react-toastify";
// // import { handleUpdateUser } from "@/lib/actions/admin/user-action";
// // import Image from "next/image";
// // export default function UpdateUserForm(
// //     { user }: { user: any }
// // ) {

// //     const [pending, startTransition] = useTransition();
// //     const { register, handleSubmit, control, reset, formState: { errors, isSubmitting } } = useForm<Partial<UserData>>({
// //         resolver: zodResolver(UserSchema.partial()),
// //         defaultValues: {
// //             firstName: user.firstName || '',
// //             lastName: user.lastName || '',
// //             email: user.email || '',
// //             username: user.username || '',
// //             image: undefined,
// //         }
// //     });
// //     const [error, setError] = useState<string | null>(null);
// //     const [previewImage, setPreviewImage] = useState<string | null>(null);
// //     const fileInputRef = useRef<HTMLInputElement>(null);

// //     const handleImageChange = (file: File | undefined, onChange: (file: File | undefined) => void) => {
// //         if (file) {
// //             const reader = new FileReader();
// //             reader.onloadend = () => {
// //                 setPreviewImage(reader.result as string);
// //             };
// //             reader.readAsDataURL(file);
// //         } else {
// //             setPreviewImage(null);
// //         }
// //         onChange(file);
// //     };

// //     const handleDismissImage = (onChange?: (file: File | undefined) => void) => {
// //         setPreviewImage(null);
// //         onChange?.(undefined);
// //         if (fileInputRef.current) {
// //             fileInputRef.current.value = '';
// //         }
// //     };

// //     const onSubmit = async (data: Partial<UserData>) => {
// //         setError(null);
// //         startTransition(async () => {
// //             try {
// //                 const formData = new FormData();
// //                 if (data.firstName) {
// //                     formData.append('firstName', data.firstName);
// //                 }
// //                 if (data.lastName) {
// //                     formData.append('lastName', data.lastName);
// //                 }
// //                 if (data.email) {
// //                     formData.append('email', data.email);
// //                 }
// //                 if (data.username) {
// //                     formData.append('username', data.username);
// //                 }

// //                 if (data.image) {
// //                     formData.append('image', data.image);
// //                 }
// //                 const response = await handleUpdateUser(user._id, formData);

// //                 if (!response.success) {
// //                     throw new Error(response.message || 'Update profile failed');
// //                 }
// //                 reset();
// //                 handleDismissImage();
// //                 toast.success('Profile Updated successfully');

// //             } catch (error: Error | any) {
// //                 toast.error(error.message || 'Update profile failed');
// //                 setError(error.message || 'Update profile failed');
// //             }
// //         });

// //     };
// //     console.log(errors);
// //     return (
// //         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
// //             {/* Profile Image Display */}
// //             <div className="mb-4">
// //                 {previewImage ? (
// //                     <div className="relative w-24 h-24">
// //                         <img
// //                             src={previewImage}
// //                             alt="Profile Image Preview"
// //                             className="w-24 h-24 rounded-full object-cover"
// //                         />
// //                         <Controller
// //                             name="image"
// //                             control={control}
// //                             render={({ field: { onChange } }) => (
// //                                 <button
// //                                     type="button"
// //                                     onClick={() => handleDismissImage(onChange)}
// //                                     className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
// //                                 >
// //                                     ✕
// //                                 </button>
// //                             )}
// //                         />
// //                     </div>
// //                 ) :

// //                     (
// //                         user.imageUrl ? (
// //                             <div className="relative w-24 h-24">
// //                                 <Image
// //                                     src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${user.imageUrl}`}
// //                                     alt="Profile Image"
// //                                     className="w-24 h-24 rounded-full object-cover"
// //                                     width={96}
// //                                     height={96}
// //                                 />
                               
// //                             </div>
// //                         ) : (
// //                             <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center">
// //                                 <span className="text-gray-600">No Image</span>
// //                             </div>
// //                         )
// //                     )}

// //             </div>
// //             {/* Profile Image Input */}
// //             <div className="mb-4">
// //                 <label className="block text-sm font-medium mb-1">Profile Image</label>
// //                 <Controller
// //                     name="image"
// //                     control={control}
// //                     render={({ field: { onChange } }) => (
// //                         <input
// //                             ref={fileInputRef}
// //                             type="file"
// //                             onChange={(e) => handleImageChange(e.target.files?.[0], onChange)}
// //                             accept=".jpg,.jpeg,.png,.webp"
// //                         />
// //                     )}
// //                 />
// //                 {errors.image && <p className="text-sm text-red-600">{errors.image.message}</p>}
// //             </div>

// //             <div className="grid grid-cols-2 gap-4">
// //                 <div className="space-y-1">
// //                     <label className="text-sm font-medium" htmlFor="firstName">First name</label>
// //                     <input
// //                         id="firstName"
// //                         type="text"
// //                         autoComplete="given-name"
// //                         className="h-10 w-full rounded-md border border-black/10 dark:border-white/15 bg-background px-3 text-sm outline-none focus:border-foreground/40"
// //                         {...register("firstName")}
// //                         placeholder="Jane"
// //                     />
// //                     {errors.firstName?.message && (
// //                         <p className="text-xs text-red-600">{errors.firstName.message}</p>
// //                     )}
// //                 </div>

// //                 <div className="space-y-1">
// //                     <label className="text-sm font-medium" htmlFor="lastName">Last name</label>
// //                     <input
// //                         id="lastName"
// //                         type="text"
// //                         autoComplete="family-name"
// //                         className="h-10 w-full rounded-md border border-black/10 dark:border-white/15 bg-background px-3 text-sm outline-none focus:border-foreground/40"
// //                         {...register("lastName")}
// //                         placeholder="Doe"
// //                     />
// //                     {errors.lastName?.message && (
// //                         <p className="text-xs text-red-600">{errors.lastName.message}</p>
// //                     )}
// //                 </div>
// //             </div>

// //             <div className="space-y-1">
// //                 <label className="text-sm font-medium" htmlFor="email">Email</label>
// //                 <input
// //                     id="email"
// //                     type="email"
// //                     autoComplete="email"
// //                     className="h-10 w-full rounded-md border border-black/10 dark:border-white/15 bg-background px-3 text-sm outline-none focus:border-foreground/40"
// //                     {...register("email")}
// //                     placeholder="you@example.com"
// //                 />
// //                 {errors.email?.message && (
// //                     <p className="text-xs text-red-600">{errors.email.message}</p>
// //                 )}
// //             </div>

// //             <div className="space-y-1">
// //                 <label className="text-sm font-medium" htmlFor="username">Username</label>
// //                 <input
// //                     id="username"
// //                     type="text"
// //                     autoComplete="username"
// //                     className="h-10 w-full rounded-md border border-black/10 dark:border-white/15 bg-background px-3 text-sm outline-none focus:border-foreground/40"
// //                     {...register("username")}
// //                     placeholder="Jane Doe"
// //                 />
// //                 {errors.username?.message && (
// //                     <p className="text-xs text-red-600">{errors.username.message}</p>
// //                 )}
// //             </div>

// //             <button
// //                 type="submit"
// //                 disabled={isSubmitting || pending}
// //                 className="h-10 w-full rounded-md bg-foreground text-background text-sm font-semibold hover:opacity-90 disabled:opacity-60"
// //             >
// //                 {isSubmitting || pending ? "Updating account..." : "Update account"}
// //             </button>
// //         </form>
// //     );
// // }


// "use client";

// import { Controller, useForm } from "react-hook-form";
// import { UserData, UserSchema } from "@/app/admin/users/schemas";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useRef, useState, useTransition } from "react";
// import { toast } from "react-toastify";
// import { handleUpdateUser } from "@/lib/actions/admin/user-action";
// import Image from "next/image";

// export default function UpdateUserForm({ user }: { user: any }) {
//   const [pending, startTransition] = useTransition();
//   const [error, setError] = useState<string | null>(null);
//   const [previewImage, setPreviewImage] = useState<string | null>(null);
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   const {
//     register,
//     handleSubmit,
//     control,
//     reset,
//     formState: { errors, isSubmitting },
//   } = useForm<Partial<UserData>>({
//     resolver: zodResolver(UserSchema.partial()),
//     defaultValues: {
//       fullName: user.fullName || "",
//       email: user.email || "",
//       username: user.username || "",
//       image: undefined,
//     },
//   });

//   const handleImageChange = (
//     file: File | undefined,
//     onChange: (file: File | undefined) => void
//   ) => {
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setPreviewImage(reader.result as string);
//       };
//       reader.readAsDataURL(file);
//     } else {
//       setPreviewImage(null);
//     }
//     onChange(file);
//   };

//   const handleDismissImage = (onChange?: (file: File | undefined) => void) => {
//     setPreviewImage(null);
//     onChange?.(undefined);
//     if (fileInputRef.current) {
//       fileInputRef.current.value = "";
//     }
//   };

//   const onSubmit = async (data: Partial<UserData>) => {
//     setError(null);

//     startTransition(async () => {
//       try {
//         const formData = new FormData();

//         if (data.fullName) formData.append("fullName", data.fullName);
//         if (data.email) formData.append("email", data.email);
//         if (data.username) formData.append("username", data.username);
//         if (data.image) formData.append("image", data.image);

//         const response = await handleUpdateUser(user._id, formData);

//         if (!response.success) {
//           throw new Error(response.message || "Update profile failed");
//         }

//         reset();
//         handleDismissImage();
//         toast.success("Profile updated successfully");
//       } catch (error: any) {
//         toast.error(error.message || "Update profile failed");
//         setError(error.message || "Update profile failed");
//       }
//     });
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//       {/* Profile Image */}
//       <div>
//         {previewImage ? (
//           <div className="relative w-24 h-24">
//             <img
//               src={previewImage}
//               alt="Preview"
//               className="w-24 h-24 rounded-full object-cover"
//             />
//             <Controller
//               name="image"
//               control={control}
//               render={({ field: { onChange } }) => (
//                 <button
//                   type="button"
//                   onClick={() => handleDismissImage(onChange)}
//                   className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
//                 >
//                   ✕
//                 </button>
//               )}
//             />
//           </div>
//         ) : user.imageUrl ? (
//           <div className="w-24 h-24 relative">
//             <Image
//               src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${user.imageUrl}`}
//               alt="Profile"
//               width={96}
//               height={96}
//               className="w-24 h-24 rounded-full object-cover"
//             />
//           </div>
//         ) : (
//           <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center">
//             <span className="text-gray-600 text-sm">No Image</span>
//           </div>
//         )}
//       </div>

//       {/* Upload */}
//       <div>
//         <label className="block text-sm font-medium mb-1">
//           Profile Image
//         </label>
//         <Controller
//           name="image"
//           control={control}
//           render={({ field: { onChange } }) => (
//             <input
//               ref={fileInputRef}
//               type="file"
//               accept=".jpg,.jpeg,.png,.webp"
//               onChange={(e) =>
//                 handleImageChange(e.target.files?.[0], onChange)
//               }
//               className="text-sm"
//             />
//           )}
//         />
//         {errors.image && (
//           <p className="text-sm text-red-600">{errors.image.message}</p>
//         )}
//       </div>

//       {/* Full Name */}
//       <div>
//         <label className="block text-sm font-medium mb-1">
//           Full Name
//         </label>
//         <input
//           type="text"
//           {...register("fullName")}
//           placeholder="John Doe"
//           className="h-10 w-full rounded-md border border-gray-300 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-blue-500"
//         />
//         {errors.fullName?.message && (
//           <p className="text-xs text-red-600">
//             {errors.fullName.message}
//           </p>
//         )}
//       </div>

//       {/* Email */}
//       <div>
//         <label className="block text-sm font-medium mb-1">
//           Email
//         </label>
//         <input
//           type="email"
//           {...register("email")}
//           placeholder="you@example.com"
//           className="h-10 w-full rounded-md border border-gray-300 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-blue-500"
//         />
//         {errors.email?.message && (
//           <p className="text-xs text-red-600">
//             {errors.email.message}
//           </p>
//         )}
//       </div>

//       {/* Username */}
//       <div>
//         <label className="block text-sm font-medium mb-1">
//           Username
//         </label>
//         <input
//           type="text"
//           {...register("username")}
//           placeholder="johndoe"
//           className="h-10 w-full rounded-md border border-gray-300 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-blue-500"
//         />
//         {errors.username?.message && (
//           <p className="text-xs text-red-600">
//             {errors.username.message}
//           </p>
//         )}
//       </div>

//       <button
//         type="submit"
//         disabled={isSubmitting || pending}
//         className="h-10 w-full rounded-md bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 disabled:opacity-60 transition"
//       >
//         {isSubmitting || pending
//           ? "Updating account..."
//           : "Update account"}
//       </button>
//     </form>
//   );
// }


"use client";

import { Controller, useForm } from "react-hook-form";
import { UserData, UserSchema } from "@/app/admin/users/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState, useTransition } from "react";
import { toast } from "react-toastify";
import { handleUpdateUser } from "@/lib/actions/admin/user-action";
import Image from "next/image";
import { Camera, X } from "lucide-react";

export default function UpdateUserForm({ user }: { user: any }) {
  const [pending, startTransition] = useTransition();
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Partial<UserData>>({
    resolver: zodResolver(UserSchema.partial()),
    defaultValues: {
      fullName: user.fullName || "",
      email: user.email || "",
      username: user.username || "",
      image: undefined,
    },
  });

  const handleImageChange = (
    file: File | undefined,
    onChange: (file: File | undefined) => void
  ) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
    }
    onChange(file);
  };

  const handleDismissImage = (onChange?: (file: File | undefined) => void) => {
    setPreviewImage(null);
    onChange?.(undefined);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const onSubmit = async (data: Partial<UserData>) => {
    startTransition(async () => {
      try {
        const formData = new FormData();

        if (data.fullName) formData.append("fullName", data.fullName);
        if (data.email) formData.append("email", data.email);
        if (data.username) formData.append("username", data.username);
        if (data.image) formData.append("image", data.image);

        const response = await handleUpdateUser(user._id, formData);

        if (!response.success) {
          throw new Error(response.message || "Update failed");
        }

        toast.success("Profile updated successfully");
        reset();
        handleDismissImage();
      } catch (error: any) {
        toast.error(error.message || "Update failed");
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center py-12 px-6">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-md p-8 space-y-8">
        {/* Header */}
        <div>
          <h2 className="text-2xl font-bold text-blue-600">
            Update User
          </h2>
          <p className="text-sm text-gray-500">
            Modify user account details
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Avatar Section */}
          <div className="flex flex-col items-center space-y-4">
            <div className="relative group">
              {previewImage ? (
                <>
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="w-28 h-28 rounded-full object-cover border-4 border-blue-100"
                  />
                  <Controller
                    name="image"
                    control={control}
                    render={({ field: { onChange } }) => (
                      <button
                        type="button"
                        onClick={() => handleDismissImage(onChange)}
                        className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-7 h-7 flex items-center justify-center shadow"
                      >
                        <X size={14} />
                      </button>
                    )}
                  />
                </>
              ) : user.imageUrl ? (
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${user.imageUrl}`}
                  alt="Profile"
                  width={112}
                  height={112}
                  className="w-28 h-28 rounded-full object-cover border-4 border-blue-100"
                />
              ) : (
                <div className="w-28 h-28 rounded-full bg-blue-50 flex items-center justify-center border-2 border-dashed border-blue-200">
                  <Camera className="text-blue-400" size={28} />
                </div>
              )}
            </div>

            <Controller
              name="image"
              control={control}
              render={({ field: { onChange } }) => (
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".jpg,.jpeg,.png,.webp"
                  onChange={(e) =>
                    handleImageChange(e.target.files?.[0], onChange)
                  }
                  className="text-sm text-gray-500"
                />
              )}
            />
          </div>

          {/* Full Name */}
          <FormInput
            label="Full Name"
            error={errors.fullName?.message}
            register={register("fullName")}
            placeholder="John Doe"
          />

          {/* Email */}
          <FormInput
            label="Email"
            type="email"
            error={errors.email?.message}
            register={register("email")}
            placeholder="you@example.com"
          />

          {/* Username */}
          <FormInput
            label="Username"
            error={errors.username?.message}
            register={register("username")}
            placeholder="johndoe"
          />

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting || pending}
            className="w-full h-11 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition disabled:opacity-60"
          >
            {isSubmitting || pending
              ? "Updating..."
              : "Update User"}
          </button>
        </form>
      </div>
    </div>
  );
}

/* Reusable Input Component */

function FormInput({
  label,
  register,
  error,
  placeholder,
  type = "text",
}: any) {
  return (
    <div>
      <label className="block text-sm font-semibold mb-2">
        {label}
      </label>
      <input
        type={type}
        {...register}
        placeholder={placeholder}
        className="w-full h-11 rounded-lg border border-gray-300 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
      />
      {error && (
        <p className="text-xs text-red-600 mt-1">{error}</p>
      )}
    </div>
  );
}