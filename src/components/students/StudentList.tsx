import React from "react";
import { cn } from "@/lib/utils";
import { User } from "@/db/schema/users";
import { StudentDetailPanel } from "@/components/students/StudentDetailPanel";

function getStatusStyle(status: string) {
  switch (status) {
    case "GOOD":
    case "VERY_GOOD":
      return "bg-primary border-black text-black";
    case "WARNING":
      return "bg-secondary border-black text-black";
    case "BAD":
      return "bg-tertiary border-black text-black";
    default:
      return "bg-white border-black text-black";
  }
}

interface StudentListProps {
  students: User[];
  selectedStudent: User | null;
  onSelect?: (student: User) => void;
  onClose: () => void;
}

export function StudentList({ students, selectedStudent, onSelect, onClose }: StudentListProps) {
  return (
    <section className="flex flex-col bg-white border-4 border-black shadow-[8px_8px_0px_0px_#000000] mt-4">
      {/* Table Header (Hidden on small mobile) */}
      <div className="hidden sm:grid grid-cols-12 gap-4 py-4 px-6 border-b-4 border-black bg-secondary text-xs font-mono font-bold text-black uppercase">
        <div className="col-span-4">Student</div>
        <div className="col-span-3">Contact</div>
        <div className="col-span-2 text-right">Attendance</div>
        <div className="col-span-2 text-center">Status</div>
        <div className="col-span-1 text-right">Action</div>
      </div>
      
      {/* Row Items */}
      {students.map((student) => (
        <React.Fragment key={student.id}>
          <div 
            onClick={() => selectedStudent?.id === student.id ? onClose() : onSelect?.(student)} 
            className={`grid grid-cols-1 sm:grid-cols-12 gap-4 py-4 px-6 border-b-2 border-black last:border-b-0 items-center transition-colors hover:bg-primary/20 cursor-pointer group ${selectedStudent?.id === student.id ? 'bg-primary/10' : 'bg-white'}`}
          >
            <div className="col-span-1 sm:col-span-4 flex flex-col gap-1">
              <span className="font-bold text-lg leading-tight text-black">{student.name}</span>
              <span className="text-black font-mono font-bold text-xs uppercase">ID: {student.id.split('-')[0]}</span>
            </div>
            <div className="col-span-1 sm:col-span-3 flex flex-col gap-1">
              <span className="text-black font-sans truncate text-sm">{student.email}</span>
              <span className="text-black/70 font-sans text-xs font-bold">{student.phone}</span>
            </div>
            <div className="col-span-1 sm:col-span-2 sm:text-right">
              <span className="font-heading font-black text-2xl text-black">{student.attendance}%</span>
            </div>
            <div className="col-span-1 sm:col-span-2 text-left sm:text-center">
              <span className={cn("inline-block px-2 py-1 border-2 text-xs font-mono font-bold uppercase", getStatusStyle(student.attendanceStatus))}>
                {student.attendanceStatus.replace("_", " ")}
              </span>
            </div>
            <div className="col-span-1 sm:col-span-1 sm:text-right">
              <button className="bg-white text-black font-mono font-bold text-xs px-3 py-1 border-2 border-black shadow-[2px_2px_0px_0px_#000000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all">
                {selectedStudent?.id === student.id ? "Close" : "View"}
              </button>
            </div>
          </div>
          {/* Inline Detail Panel */}
          {selectedStudent?.id === student.id && (
            <div className="border-b-2 border-black bg-white">
              <StudentDetailPanel student={student} onClose={onClose} />
            </div>
          )}
        </React.Fragment>
      ))}
    </section>
  );
}
