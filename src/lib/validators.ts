import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export type LoginInput = z.infer<typeof LoginSchema>;

export const RegistrationSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  dob: z.string().min(1, { message: "Date of birth is required" }),
  phone: z.string().min(1, { message: "Phone number is required" }),
  attendance: z.number().min(0).max(100, { message: "Must be between 0 and 100" }),
  courses: z.array(z.string()).min(1, { message: "Select at least one course" }),
});

export type RegistrationInput = z.infer<typeof RegistrationSchema>;

export const UpdateStudentSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  phone: z.string().min(1, { message: "Phone number is required" }),
  dob: z.string().min(1, { message: "Date of birth is required" }),
  courses: z.array(z.string()).optional(),
});

export type UpdateStudentInput = z.infer<typeof UpdateStudentSchema>;
