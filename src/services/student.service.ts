import { db } from "@/db";
import { users } from "@/db/schema/users";
import { eq } from "drizzle-orm";

export async function getStudentByEmail(email: string) {
  try {
    const [student] = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);
    
    return student || null;
  } catch (error) {
    console.error("Error fetching student by email:", error);
    return null;
  }
}

export async function getAllStudents() {
  try {
    return await db
      .select()
      .from(users)
      .where(eq(users.role, "STUDENT"));
  } catch (error) {
    console.error("Error fetching all students:", error);
    return [];
  }
}
