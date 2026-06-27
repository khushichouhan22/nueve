"use server";

import { RegistrationSchema, RegistrationInput } from "@/lib/validators";
import { registerStudent } from "@/services/registration.service";

export async function submitRegistration(data: RegistrationInput) {
  const parsed = RegistrationSchema.safeParse(data);
  
  if (!parsed.success) {
    return { success: false, error: "Invalid data submitted" };
  }

  const result = await registerStudent(parsed.data);
  return result;
}
