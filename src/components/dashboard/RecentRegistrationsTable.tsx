import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

export type RegistrationData = {
  id: string;
  name: string;
  email: string | null;
  attendance: number;
  registeredAt: Date | null;
  attendanceStatus: string;
};


function getStatusStyles(status: string) {
  switch (status) {
    case "GOOD":
    case "VERY_GOOD":
    case "Confirmed": // fallback for mock
      return "bg-primary border-black";
    case "WARNING":
    case "Pending":
      return "bg-secondary border-black";
    case "BAD":
    case "Waitlisted":
      return "bg-tertiary border-black";
    default:
      return "bg-white border-black";
  }
}

export function RecentRegistrationsTable({ registrations }: { registrations: RegistrationData[] }) {
  return (
    <div className="w-full bg-[#fef4db] border-4 border-black shadow-[8px_8px_0px_0px_#000000] flex flex-col mt-4">
      <div className="border-b-4 border-black p-4 md:p-6 bg-[#fef4db]">
        <h2 className="font-heading font-black text-2xl md:text-3xl tracking-tight text-black capitalize">Recent Registrations</h2>
      </div>
      {/* Mobile Card View */}
      <div className="md:hidden flex flex-col gap-6 p-4 bg-white border-b-4 border-black">
        {registrations.map((reg) => (
          <div key={reg.id} className="border-2 border-black bg-[#fef4db] p-4 flex flex-col gap-3 shadow-[4px_4px_0px_0px_#000000]">
            <div className="flex justify-between items-start border-b-2 border-black pb-3">
              <div className="flex flex-col gap-1">
                <span className="font-bold text-xl leading-none">{reg.name}</span>
                <span className="font-mono font-bold text-xs uppercase">#{reg.id.slice(0, 8)}</span>
              </div>
              <span className={cn("inline-block border-2 px-2 py-1 text-xs font-mono font-bold uppercase", getStatusStyles(reg.attendanceStatus))}>
                {reg.attendanceStatus}
              </span>
            </div>
            
            <div className="flex flex-col gap-2 text-sm font-sans font-bold py-1">
              <div className="flex justify-between items-center">
                <span className="font-mono font-bold text-[10px] uppercase text-black/70">Email</span>
                <span className="truncate max-w-[200px]">{reg.email || "N/A"}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-mono font-bold text-[10px] uppercase text-black/70">Attendance</span>
                <span className="text-base">{reg.attendance}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-mono font-bold text-[10px] uppercase text-black/70">Date</span>
                <span>{reg.registeredAt ? format(reg.registeredAt, "MMM d, yyyy") : "N/A"}</span>
              </div>
            </div>
            
            <div className="mt-1 pt-3 border-t-2 border-black">
              <Link href={`/teacher/students?studentId=${reg.id}`} className="block text-center bg-white text-black font-mono font-bold text-xs px-4 py-2 border-2 border-black shadow-[2px_2px_0px_0px_#000000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all w-full uppercase tracking-widest">
                Edit Record
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left border-collapse bg-[#fef4db]">
          <thead>
            <tr className="border-b-4 border-black">
              <th className="text-xs font-mono font-bold text-black py-4 px-6 uppercase whitespace-nowrap">ID</th>
              <th className="text-xs font-mono font-bold text-black py-4 px-6 uppercase whitespace-nowrap">Student Name</th>
              <th className="text-xs font-mono font-bold text-black py-4 px-6 uppercase whitespace-nowrap hidden sm:table-cell">Email</th>
              <th className="text-xs font-mono font-bold text-black py-4 px-6 uppercase whitespace-nowrap text-center">Attendance</th>
              <th className="text-xs font-mono font-bold text-black py-4 px-6 uppercase whitespace-nowrap hidden md:table-cell">Date</th>
              <th className="text-xs font-mono font-bold text-black py-4 px-6 uppercase whitespace-nowrap text-center">Status</th>
              <th className="text-xs font-mono font-bold text-black py-4 px-6 uppercase whitespace-nowrap text-center">Action</th>
            </tr>
          </thead>
          <tbody className="text-sm font-sans text-black">
            {registrations.map((reg) => (
              <tr key={reg.id} className="border-b-2 border-black hover:bg-white transition-colors group">
                <td className="py-4 px-6 font-mono font-medium text-xs whitespace-nowrap">#{reg.id.slice(0, 8)}</td>
                <td className="py-4 px-6 font-bold whitespace-nowrap">{reg.name}</td>
                <td className="py-4 px-6 hidden sm:table-cell whitespace-nowrap">{reg.email}</td>
                <td className="py-4 px-6 text-center font-bold text-lg whitespace-nowrap">
                  {reg.attendance}%
                </td>
                <td className="py-4 px-6 hidden md:table-cell whitespace-nowrap">
                  {reg.registeredAt ? format(reg.registeredAt, "MMM d, yyyy") : "N/A"}
                </td>
                <td className="py-4 px-6 text-center whitespace-nowrap">
                  <span className={cn("inline-block border-2 px-2 py-1 text-xs font-mono font-bold", getStatusStyles(reg.attendanceStatus))}>
                    {reg.attendanceStatus}
                  </span>
                </td>
                <td className="py-4 px-6 text-center whitespace-nowrap">
                  <Link href={`/teacher/students?studentId=${reg.id}`} className="inline-block bg-white text-black font-mono font-bold text-xs px-3 py-1 border-2 border-black shadow-[2px_2px_0px_0px_#000000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all">
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="p-4 flex justify-center items-center bg-[#fef4db]">
        <Link 
          href="/teacher/students" 
          className="text-xs font-mono font-bold text-black hover:underline uppercase transition-colors"
        >
          View All Registrations
        </Link>
      </div>
    </div>
  );
}
