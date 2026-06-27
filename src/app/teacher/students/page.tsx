import React from "react";
import { TeacherNavbar } from "@/components/layout/TeacherNavbar";
import { getAllStudents } from "@/services/student.service";
import { StudentsView } from "@/components/students/StudentsView";

export const dynamic = "force-dynamic";

export default async function StudentsPage() {
  const students = await getAllStudents();

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans pb-24">
      <TeacherNavbar />
      <StudentsView initialStudents={students} />
    </div>
  );
}
