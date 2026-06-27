import React from "react";
import { StatCard } from "./StatCard";

type DashboardStatsProps = {
  registrationsToday: number;
  totalStudents: number;
  lowAttendanceStudents: number;
  averageAttendance: number;
};

export function DashboardStats({
  registrationsToday,
  totalStudents,
  lowAttendanceStudents,
  averageAttendance,
}: DashboardStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
      <StatCard title="Registrations Today" value={registrationsToday} />
      <StatCard title="Total Students" value={totalStudents} />
      <StatCard title="Low Attendance" value={lowAttendanceStudents} />
      <StatCard title="Average Attendance" value={`${averageAttendance}%`} />
    </div>
  );
}
