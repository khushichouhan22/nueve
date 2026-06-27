import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getDashboardMetrics, getRecentRegistrations } from "@/services/analytics.service";
import { TeacherNavbar } from "@/components/layout/TeacherNavbar";
import { TeacherStatCard } from "@/components/dashboard/TeacherStatCard";
import { RecentRegistrationsTable } from "@/components/dashboard/RecentRegistrationsTable";
import { ExportReportButton } from "@/components/dashboard/ExportReportButton";

export const dynamic = "force-dynamic";

export default async function TeacherDashboardPage() {
  const session = await getServerSession(authOptions);
  const metrics = await getDashboardMetrics();
  const recentRegistrations = await getRecentRegistrations(5);

  return (
    <div className="min-h-screen bg-background text-foreground pb-24 flex flex-col font-sans">
      <TeacherNavbar />
      
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 md:px-12 py-8 md:py-[120px] flex flex-col gap-8 md:gap-12">
        {/* Header Section */}
        <section className="flex flex-col md:flex-row md:justify-between items-start md:items-end gap-6 mb-4">
          <div>
            <h1 className="text-4xl md:text-6xl leading-none font-heading font-black text-black capitalize tracking-tight">
              Admin Dashboard
            </h1>
            <p className="mt-4 text-black font-sans font-medium text-lg">
              Hello, {session?.user?.name || "Administrator"}. Here is the overview of the system.
            </p>
          </div>
          <div className="flex md:justify-end mt-4 md:mt-0">
            <ExportReportButton metrics={metrics} recentRegistrations={recentRegistrations} />
          </div>
        </section>

        {/* Statistics Section */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <TeacherStatCard 
            title="Registrations Today" 
            value={metrics.registrationsToday} 
            iconName="person_add" 
            index="01"
            bgColorClass="bg-primary"
            tagText="+12% from yesterday"
            tagBgColorClass="bg-white"
          />
          <TeacherStatCard 
            title="Total Students" 
            value={metrics.totalStudents} 
            iconName="school" 
            index="02"
            bgColorClass="bg-secondary"
            tagText="Active Semester"
            tagBgColorClass="bg-white"
          />
          <TeacherStatCard 
            title="Low Attendance" 
            value={metrics.lowAttendanceStudents} 
            iconName="warning" 
            index="03"
            bgColorClass="bg-tertiary"
            tagText="Requires Action"
            tagBgColorClass="bg-white"
          />
          <TeacherStatCard 
            title="Avg Attendance" 
            value={`${metrics.averageAttendance}%`} 
            iconName="bar_chart" 
            index="04"
            bgColorClass="bg-white"
            tagText="Target: 90%"
            tagBgColorClass="bg-primary"
          />
        </section>

        {/* Activity Layout */}
        <section className="w-full">
          <RecentRegistrationsTable registrations={recentRegistrations} />
        </section>
      </main>

    </div>
  );
}
