import { db } from "@/db";
import { users } from "@/db/schema/users";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

export async function verifyCredentials(email: string, password: string) {
  try {
    const result = await db.select().from(users).where(eq(users.email, email)).limit(1);
    const user = result[0];

    if (!user) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordValid) {
      return null;
    }

    return {
      id: user.id.toString(),
      email: user.email,
      name: user.name,
      role: user.role,
    };
  } catch (error) {
    console.error("Error verifying credentials:", error);
    return null;
  }
}
