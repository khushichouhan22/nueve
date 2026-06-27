import { db } from "@/db";
import { users } from "@/db/schema/users";
import { eq, count, gte, avg, desc } from "drizzle-orm";

export async function getDashboardMetrics() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  try {
    const [registrationsToday] = await db
      .select({ value: count() })
      .from(users)
      .where(gte(users.registeredAt, today));

    const [totalStudents] = await db
      .select({ value: count() })
      .from(users)
      .where(eq(users.role, "STUDENT"));

    const [lowAttendanceStudents] = await db
      .select({ value: count() })
      .from(users)
      .where(eq(users.attendanceStatus, "BAD"));

    const [averageAttendanceResult] = await db
      .select({ value: avg(users.attendance) })
      .from(users)
      .where(eq(users.role, "STUDENT"));

    return {
      registrationsToday: registrationsToday?.value ?? 0,
      totalStudents: totalStudents?.value ?? 0,
      lowAttendanceStudents: lowAttendanceStudents?.value ?? 0,
      averageAttendance: averageAttendanceResult?.value
        ? Math.round(Number(averageAttendanceResult.value))
        : 0,
    };
  } catch (error) {
    console.error("Error fetching dashboard metrics:", error);
    return {
      registrationsToday: 0,
      totalStudents: 0,
      lowAttendanceStudents: 0,
      averageAttendance: 0,
    };
  }
}

export async function getRecentRegistrations(limitCount: number = 5) {
  try {
    return await db
      .select()
      .from(users)
      .where(eq(users.role, "STUDENT"))
      .orderBy(desc(users.registeredAt))
      .limit(limitCount);
  } catch (error) {
    console.error("Error fetching recent registrations:", error);
    return [];
  }
}
