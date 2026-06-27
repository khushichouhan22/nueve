import { loadEnvConfig } from "@next/env";
loadEnvConfig(process.cwd());

console.log("DATABASE_URL is:", process.env.DATABASE_URL);

import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";

async function main() {
  const { db } = await import("./index");
  const { users } = await import("./schema/users");

  console.log("Seeding database...");

  // Seed Admin if not exists (keep the original behavior mostly)
  try {
    const existingAdmin = await db.select().from(users).where(eq(users.role, "ADMIN")).limit(1);
    if (existingAdmin.length === 0) {
      const passwordHash = await bcrypt.hash("Admin@123", 10);
      await db.insert(users).values({
        name: "Administrator",
        email: "admin@nueve.edu",
        passwordHash,
        dob: "2000-01-01",
        phone: "0000000000",
        attendance: 100,
        attendanceStatus: "GOOD",
        semester: "N/A",
        role: "ADMIN",
      });
      console.log("Admin seeded successfully.");
    } else {
      console.log("Admin already exists, skipping...");
    }
  } catch (error) {
    console.error("Error seeding admin:", error);
  }

  // Remove existing students
  try {
    await db.delete(users).where(eq(users.role, "STUDENT"));
    console.log("Cleared existing students.");

    const studentsToInsert = [
      { name: "Eleanor Vance", email: "e.vance@nueve.edu", dob: "2000-05-15", attendance: 98, status: "VERY_GOOD", semester: "Fall 2026", date: "2026-06-14T09:00:00Z" },
      { name: "Theodore Montague", email: "t.montague@nueve.edu", dob: "1999-11-20", attendance: 85, status: "GOOD", semester: "Fall 2026", date: "2026-06-14T10:30:00Z" },
      { name: "Beatrice Baudelaire", email: "b.baudelaire@nueve.edu", dob: "2001-02-14", attendance: 62, status: "WARNING", semester: "Fall 2026", date: "2026-06-13T14:15:00Z" },
      { name: "Arthur Pendelton", email: "a.pendelton@nueve.edu", dob: "1998-08-08", attendance: 100, status: "VERY_GOOD", semester: "Fall 2026", date: "2026-06-12T11:45:00Z" },
      { name: "Clara Oswin", email: "c.oswin@nueve.edu", dob: "2002-04-01", attendance: 91, status: "VERY_GOOD", semester: "Fall 2026", date: "2026-06-12T08:20:00Z" },
      { name: "David Copperfield", email: "d.copperfield@nueve.edu", dob: "1999-07-22", attendance: 75, status: "WARNING", semester: "Fall 2026", date: "2026-06-11T16:00:00Z" },
      { name: "Elizabeth Bennet", email: "e.bennet@nueve.edu", dob: "2000-01-28", attendance: 95, status: "VERY_GOOD", semester: "Fall 2026", date: "2026-06-10T13:10:00Z" },
      { name: "Fitzwilliam Darcy", email: "f.darcy@nueve.edu", dob: "1998-12-15", attendance: 88, status: "GOOD", semester: "Fall 2026", date: "2026-06-09T09:45:00Z" },
      { name: "Jane Eyre", email: "j.eyre@nueve.edu", dob: "2001-10-31", attendance: 99, status: "VERY_GOOD", semester: "Fall 2026", date: "2026-06-08T15:30:00Z" },
      { name: "Oliver Twist", email: "o.twist@nueve.edu", dob: "2002-03-12", attendance: 45, status: "BAD", semester: "Fall 2026", date: "2026-06-07T11:20:00Z" },
      { name: "Sherlock Holmes", email: "s.holmes@nueve.edu", dob: "1997-01-06", attendance: 92, status: "VERY_GOOD", semester: "Fall 2026", date: "2026-06-06T14:40:00Z" },
      { name: "John Watson", email: "j.watson@nueve.edu", dob: "1998-07-07", attendance: 89, status: "GOOD", semester: "Fall 2026", date: "2026-06-05T10:15:00Z" }
    ];

    for (const s of studentsToInsert) {
      const passwordHash = await bcrypt.hash(s.dob, 10);
      await db.insert(users).values({
        name: s.name,
        email: s.email,
        dob: s.dob,
        phone: "555-0100",
        attendance: s.attendance,
        attendanceStatus: s.status,
        semester: s.semester,
        role: "STUDENT",
        passwordHash: passwordHash,
        registeredAt: new Date(s.date),
      });
    }

    console.log(`Successfully seeded ${studentsToInsert.length} students.`);
  } catch (error) {
    console.error("Error seeding students:", error);
  }

  process.exit(0);
}

main();
