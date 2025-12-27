import { z } from "zod";

export const loginSchema = z.object({
    email: z.email({ message: "Enter a valid email" }),
    password: z.string().min(6, { message: "Minimum 6 characters" }),
});

export type LoginData = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    fullName: z.string().min(3, "Full name is required"),
    email: z.string().email("Invalid email"),
    dob: z.string().min(1, "Date of birth required"),
    phone: z.string().min(7, "Phone number required"),

    gender: z
      .string()
      .refine((v) => ["male", "female", "other"].includes(v), {
        message: "Select gender",
      }),

    bio: z.string().optional(),

    password: z.string().min(6, "Minimum 6 characters"),
    confirmPassword: z.string(),

    // Fixed terms field
    terms: z.literal(true).refine((v) => v === true, {
      message: "Accept terms & conditions",
    }),
  })
  .refine((d) => d.password === d.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export type RegisterData = z.infer<typeof registerSchema>;


