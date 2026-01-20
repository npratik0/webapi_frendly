import { z } from "zod";

export const registerSchema = z
  .object({
    fullName: z.string().min(2, "Full name is required"),
    email: z.string().email("Invalid email"),
    dob: z.string(), // frontend only
    phone: z.string().optional(),
    gender: z.enum(["male", "female", "other"]),
    bio: z.string().max(160).optional(),
    password: z.string().min(6, "Minimum 6 characters"),
    confirmPassword: z.string(),
    terms: z.boolean().refine((v) => v === true, {
      message: "You must accept the Terms & Conditions",
    }), // frontend only
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export type RegisterFormData = z.infer<typeof registerSchema>;
