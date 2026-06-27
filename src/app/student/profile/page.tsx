import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getStudentByEmail } from "@/services/student.service";
import { Navbar } from "@/components/layout/Navbar";
import { StudentProfileForm } from "@/components/forms/StudentProfileForm";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function StudentProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect("/login");
  }

  const student = await getStudentByEmail(session.user.email);

  if (!student) {
    return (
      <div className="min-h-screen bg-background text-text-primary flex items-center justify-center">
        Error loading student data.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground pb-24 font-sans flex flex-col">
      <Navbar />
      <main className="flex-grow w-full max-w-5xl mx-auto px-4 md:px-6 lg:px-12 pt-8 md:pt-12 flex flex-col gap-8 md:gap-12">
        <header className="border-b-4 border-black pb-8">
          <h1 className="text-5xl md:text-7xl font-heading font-black text-black leading-none uppercase flex flex-wrap gap-4 items-center">
            Student
            <span className="bg-primary px-3 py-1 text-black border-4 border-black inline-block">Profile</span>
          </h1>
          <p className="font-mono font-bold text-black mt-6 text-lg border-l-4 border-black pl-4">
            View your personal and academic information.
          </p>
        </header>

        <section className="bg-white border-4 border-black p-6 md:p-12 shadow-[4px_4px_0px_0px_#000000] md:shadow-[8px_8px_0px_0px_#000000] w-full max-w-3xl mx-auto">
          <StudentProfileForm student={{
            name: student.name,
            email: student.email,
            dob: student.dob,
            phone: student.phone,
            courses: student.courses,
          }} />
        </section>
      </main>
    </div>
  );
}
