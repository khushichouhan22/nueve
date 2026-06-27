"use server";

import { db } from "@/db";
import { users } from "@/db/schema/users";
import { eq } from "drizzle-orm";
import { UpdateStudentInput, UpdateStudentSchema } from "@/lib/validators";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function deleteStudent(id: string) {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "ADMIN") {
    return { success: false, error: "Unauthorized" };
  }

  try {
    await db.delete(users).where(eq(users.id, id));
    return { success: true };
  } catch (error) {
    console.error("Error deleting student:", error);
    return { success: false, error: "Failed to delete student" };
  }
}

export async function updateStudent(id: string, data: UpdateStudentInput) {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "ADMIN") {
    return { success: false, error: "Unauthorized" };
  }

  const parsed = UpdateStudentSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: "Invalid data" };
  }

  try {
    await db
      .update(users)
      .set({
        name: parsed.data.name,
        phone: parsed.data.phone,
        dob: parsed.data.dob,
        courses: parsed.data.courses,
        updatedAt: new Date(),
      })
      .where(eq(users.id, id));

    return { success: true };
  } catch (error) {
    console.error("Error updating student:", error);
    return { success: false, error: "Failed to update student" };
  }
}

export async function updateStudentProfile(data: UpdateStudentInput) {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.email) {
    return { success: false, error: "Unauthorized" };
  }

  const parsed = UpdateStudentSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: "Invalid data" };
  }

  try {
    await db
      .update(users)
      .set({
        name: parsed.data.name,
        phone: parsed.data.phone,
        dob: parsed.data.dob,
        courses: parsed.data.courses,
        updatedAt: new Date(),
      })
      .where(eq(users.email, session.user.email));

    return { success: true };
  } catch (error) {
    console.error("Error updating profile:", error);
    return { success: false, error: "Failed to update profile" };
  }
}
