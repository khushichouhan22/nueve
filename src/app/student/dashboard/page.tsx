import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getStudentByEmail } from "@/services/student.service";
import { Navbar } from "@/components/layout/Navbar";
import { redirect } from "next/navigation";
import { format } from "date-fns";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function StudentDashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect("/login");
  }

  const student = await getStudentByEmail(session.user.email);

  if (!student) {
    return (
      <div className="min-h-screen bg-[#F3F0E9] text-[#1B1B1B] flex items-center justify-center">
        Error loading student data.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground pb-24 font-sans flex flex-col">
      <Navbar />
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-12 pt-8 md:pt-12">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Profile Card */}
          <div className="lg:col-span-5 xl:col-span-4 flex flex-col h-full">
            <div className="bg-secondary border-4 border-black p-4 md:p-6 shadow-[4px_4px_0px_0px_#000000] md:shadow-[8px_8px_0px_0px_#000000] flex flex-col gap-6 h-full">
              <div className="flex justify-between items-start border-b-4 border-black pb-4">
                <h2 className="font-heading font-black text-xl text-black uppercase tracking-widest">
                  Student Profile
                </h2>
                <span className="material-symbols-outlined text-black">person</span>
              </div>
              
              <div className="flex flex-col gap-1">
                <h3 className="font-heading font-black text-2xl md:text-3xl text-black leading-none">{student.name}</h3>
                <p className="font-mono font-bold text-xs text-black/70 uppercase">ID: {student.id.split('-')[0]}</p>
                <div className="mt-2 inline-flex border-2 border-black bg-white px-3 py-1 font-mono font-bold text-xs text-black w-fit max-w-full overflow-hidden text-ellipsis">
                  {student.email}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-2">
                <div className="bg-white border-2 border-black p-3 flex flex-col gap-1 shadow-[2px_2px_0px_0px_#000000] col-span-1">
                  <span className="font-mono font-bold text-[10px] uppercase text-black">Attendance</span>
                  <span className="font-heading font-black text-2xl text-black">{student.attendance}%</span>
                </div>
                <div className="bg-white border-2 border-black p-3 flex flex-col gap-1 shadow-[2px_2px_0px_0px_#000000] col-span-1">
                  <span className="font-mono font-bold text-[10px] uppercase text-black">Semester</span>
                  <span className="font-heading font-black text-xl text-black">{student.semester}</span>
                </div>
                <div className="bg-white border-2 border-black p-3 flex flex-col gap-1 shadow-[2px_2px_0px_0px_#000000] col-span-1">
                  <span className="font-mono font-bold text-[10px] uppercase text-black">Status</span>
                  <span className="font-heading font-black text-xl text-black">Active</span>
                </div>
                <div className="bg-white border-2 border-black p-3 flex flex-col gap-1 shadow-[2px_2px_0px_0px_#000000] col-span-1">
                  <span className="font-mono font-bold text-[10px] uppercase text-black">Phone</span>
                  <span className="font-mono font-black text-xs text-black mt-1 truncate">{student.phone}</span>
                </div>
              </div>

              <div className="mt-auto pt-6">
                <Link href="/student/profile" className="block w-full text-center bg-white border-2 border-black text-black font-mono font-bold text-sm py-3 shadow-[4px_4px_0px_0px_#000000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all uppercase">
                  Edit Profile
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: Status Cards */}
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-8">
            
            {/* Registration Status */}
            <div className="bg-tertiary border-4 border-black p-4 md:p-8 shadow-[4px_4px_0px_0px_#000000] md:shadow-[8px_8px_0px_0px_#000000]">
              <div className="flex justify-between items-start border-b-4 border-black pb-4 mb-6">
                <h2 className="font-heading font-black text-xl text-black uppercase tracking-widest">
                  Registration Status
                </h2>
                <span className="material-symbols-outlined text-black">how_to_reg</span>
              </div>
              
              <div className="flex flex-col gap-6 mb-8">
                <div>
                  <h3 className="font-heading font-black text-4xl md:text-5xl xl:text-6xl text-black">Registered</h3>
                  <p className="font-sans font-bold text-black text-sm mt-2">
                    Successfully registered for {student.semester}.
                  </p>
                </div>
                <div className="bg-white border-2 border-black p-3 text-center w-full shadow-[4px_4px_0px_0px_#000000]">
                  <div className="font-mono font-bold text-[10px] text-black uppercase border-b-2 border-black pb-1 mb-1">
                    Reg. Date
                  </div>
                  <div className="font-sans font-bold text-black text-sm">
                    {student.registeredAt ? format(new Date(student.registeredAt), "MMM d, yyyy") : "N/A"}
                  </div>
                </div>
              </div>

              <div className="w-full h-8 border-2 border-black bg-white flex shadow-[4px_4px_0px_0px_#000000] mb-8 relative">
                <div className="h-full bg-primary border-r-2 border-black" style={{ width: '100%' }}></div>
                <div className="absolute inset-0 flex items-center justify-center font-mono font-bold text-[10px] uppercase text-black pointer-events-none mix-blend-difference text-white">
                  Completed
                </div>
              </div>
            </div>

            {/* Attendance Status */}
            <div className="bg-white border-4 border-black p-4 md:p-8 shadow-[4px_4px_0px_0px_#000000] md:shadow-[8px_8px_0px_0px_#000000]">
              <div className="flex justify-between items-start border-b-4 border-black pb-4 mb-6">
                <h2 className="font-heading font-black text-xl text-black uppercase tracking-widest">
                  Attendance Metrics
                </h2>
                <span className="material-symbols-outlined text-black">analytics</span>
              </div>
              
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center border-b-2 border-black pb-4">
                  <div>
                    <h3 className="font-sans font-bold text-black">Current Attendance</h3>
                    <p className="font-mono font-bold text-[10px] text-black/70 uppercase">Total active days</p>
                  </div>
                  <div className="bg-primary border-2 border-black px-3 py-1 font-mono font-bold text-black shadow-[2px_2px_0px_0px_#000000]">
                    {student.attendance}% Attd.
                  </div>
                </div>
                <div className="flex justify-between items-center pb-2">
                  <div>
                    <h3 className="font-sans font-bold text-black">Academic Standing</h3>
                    <p className="font-mono font-bold text-[10px] text-black/70 uppercase">Based on attendance</p>
                  </div>
                  <div className={`border-2 border-black px-3 py-1 font-mono font-bold text-black uppercase text-xs shadow-[2px_2px_0px_0px_#000000] ${
                    student.attendanceStatus === 'BAD' || student.attendanceStatus === 'WARNING' ? 'bg-tertiary' : 'bg-primary'
                  }`}>
                    {student.attendanceStatus.replace('_', ' ')}
                  </div>
                </div>
              </div>
            </div>

            {/* My Courses */}
            <div className="bg-white border-4 border-black p-4 md:p-8 shadow-[4px_4px_0px_0px_#000000] md:shadow-[8px_8px_0px_0px_#000000]">
              <div className="flex justify-between items-start border-b-4 border-black pb-4 mb-6">
                <h2 className="font-heading font-black text-xl text-black uppercase tracking-widest">
                  My Courses
                </h2>
                <span className="material-symbols-outlined text-black">menu_book</span>
              </div>
              
              <div className="flex flex-col gap-3">
                {student.courses && student.courses.length > 0 ? (
                  student.courses.map((course, idx) => (
                    <div key={idx} className="flex justify-between items-center border-b-2 border-black pb-3 last:border-0 last:pb-0">
                      <div>
                        <h3 className="font-sans font-bold text-black">{course}</h3>
                        <p className="font-mono font-bold text-[10px] text-black/70 uppercase">Registered</p>
                      </div>
                      <span className="material-symbols-outlined text-black">check_circle</span>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-4">
                    <p className="font-mono font-bold text-sm text-black/70 uppercase">No courses selected</p>
                  </div>
                )}
              </div>
            </div>

            {/* Action Required */}
            {(student.attendanceStatus === 'BAD' || student.attendanceStatus === 'WARNING') && (
              <div className="bg-white border-4 border-black p-4 md:p-8 shadow-[4px_4px_0px_0px_#000000] md:shadow-[8px_8px_0px_0px_#000000]">
                <div className="flex justify-between items-start border-b-4 border-black pb-4 mb-6">
                  <h2 className="font-heading font-black text-xl text-black uppercase tracking-widest">
                    Action Required
                  </h2>
                  <span className="material-symbols-outlined text-black">warning</span>
                </div>
                
                <div className="bg-secondary border-2 border-black p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-[2px_2px_0px_0px_#000000] md:shadow-[4px_4px_0px_0px_#000000]">
                  <div className="flex items-center gap-4">
                    <div className="bg-white border-2 border-black w-10 h-10 flex items-center justify-center flex-shrink-0">
                      <span className="material-symbols-outlined text-black">mail</span>
                    </div>
                    <div>
                      <h3 className="font-sans font-bold text-black">Low Attendance Warning</h3>
                      <p className="font-mono font-bold text-[10px] text-black/70 uppercase">Please contact your academic advisor</p>
                    </div>
                  </div>
                  <a href="mailto:advisor@nueve.edu" className="inline-block bg-white border-2 border-black text-black font-mono font-bold text-xs px-4 py-2 uppercase whitespace-nowrap shadow-[2px_2px_0px_0px_#000000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all">
                    Contact Now
                  </a>
                </div>
              </div>
            )}

          </div>
        </div>
      </main>
    </div>
  );
}
