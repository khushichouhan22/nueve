import {
  pgTable,
  uuid,
  varchar,
  integer,
  date,
  timestamp,
  text,
} from "drizzle-orm/pg-core";
import { InferSelectModel } from "drizzle-orm";

export type User = InferSelectModel<typeof users>;

export const users = pgTable("users", {
  id: uuid("id")
    .defaultRandom()
    .primaryKey(),

  name: varchar("name", {
    length: 255,
  }).notNull(),

  email: varchar("email", {
    length: 255,
  })
    .unique()
    .notNull(),

  passwordHash: text("password_hash")
    .notNull(),

  dob: date("dob")
    .notNull(),

  phone: varchar("phone", {
    length: 20,
  }).notNull(),

  attendance: integer("attendance")
    .notNull(),

  attendanceStatus: varchar(
    "attendance_status",
    {
      length: 20,
    }
  ).notNull(),

  semester: varchar("semester", {
    length: 50,
  }).notNull(),

  role: varchar("role", {
    length: 20,
  })
    .default("STUDENT")
    .notNull(),

  registeredAt: timestamp(
    "registered_at"
  ).defaultNow(),

  createdAt: timestamp(
    "created_at"
  ).defaultNow(),

  updatedAt: timestamp(
    "updated_at"
  ).defaultNow(),

  courses: text("courses").array(),
});
