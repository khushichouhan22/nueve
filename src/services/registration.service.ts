import { db } from "@/db";
import { users } from "@/db/schema/users";
import bcrypt from "bcryptjs";
import { RegistrationInput } from "@/lib/validators";

export async function registerStudent(data: RegistrationInput) {
  try {
    let attendanceStatus = "WARNING";
    if (data.attendance > 90) {
      attendanceStatus = "VERY_GOOD";
    } else if (data.attendance > 75) {
      attendanceStatus = "GOOD";
    } else if (data.attendance < 50) {
      attendanceStatus = "BAD";
    }

    const passwordHash = await bcrypt.hash(data.dob, 10);
    const semester = "Fall 2025";

    await db
      .insert(users)
      .values({
        name: data.name,
        email: data.email,
        passwordHash,
        dob: data.dob,
        phone: data.phone,
        attendance: data.attendance,
        attendanceStatus,
        semester,
        courses: data.courses,
        role: "STUDENT",
        registeredAt: new Date(),
      })
      .onConflictDoUpdate({
        target: users.email,
        set: {
          name: data.name,
          passwordHash,
          dob: data.dob,
          phone: data.phone,
          attendance: data.attendance,
          attendanceStatus,
          semester,
          courses: data.courses,
          registeredAt: new Date(),
          updatedAt: new Date(),
        },
      });

    return { success: true, name: data.name, semester };
  } catch (error) {
    console.error("Error registering student:", error);
    return { success: false, error: "Database error during registration" };
  }
}
