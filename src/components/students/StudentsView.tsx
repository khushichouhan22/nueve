"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { User } from "@/db/schema/users";
import { StudentList } from "@/components/students/StudentList";

export function StudentsView({ initialStudents }: { initialStudents: User[] }) {
  const searchParams = useSearchParams();
  const studentIdParam = searchParams.get("studentId");
  
  const [selectedStudent, setSelectedStudent] = useState<User | null>(null);

  useEffect(() => {
    if (studentIdParam) {
      const student = initialStudents.find(s => s.id === studentIdParam);
      if (student) {
        setSelectedStudent(student);
      }
    }
  }, [studentIdParam, initialStudents]);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("All Statuses");
  const [sortBy, setSortBy] = useState("Name (A-Z)");

  const filteredAndSortedStudents = useMemo(() => {
    let result = [...initialStudents];

    // Filter by search
    if (searchQuery.trim()) {
      const lowerQuery = searchQuery.toLowerCase();
      result = result.filter(
        (s) =>
          s.name.toLowerCase().includes(lowerQuery) ||
          s.id.toLowerCase().includes(lowerQuery) ||
          (s.email && s.email.toLowerCase().includes(lowerQuery))
      );
    }

    // Filter by status
    if (filterStatus !== "All Statuses") {
      let mappedStatus = "";
      if (filterStatus === "Very Good") mappedStatus = "VERY_GOOD";
      else if (filterStatus === "Good") mappedStatus = "GOOD";
      else if (filterStatus === "Warning") mappedStatus = "WARNING";
      else if (filterStatus === "Bad") mappedStatus = "BAD";
      
      if (mappedStatus) {
        result = result.filter((s) => s.attendanceStatus === mappedStatus);
      }
    }

    // Sort
    result.sort((a, b) => {
      if (sortBy === "Name (A-Z)") {
        return a.name.localeCompare(b.name);
      } else if (sortBy === "Attendance (Low-High)") {
        return a.attendance - b.attendance;
      } else if (sortBy === "Recent Registration") {
        const dateA = a.registeredAt ? new Date(a.registeredAt).getTime() : 0;
        const dateB = b.registeredAt ? new Date(b.registeredAt).getTime() : 0;
        return dateB - dateA; // Descending
      }
      return 0;
    });

    return result;
  }, [initialStudents, searchQuery, filterStatus, sortBy]);

  return (
    <main className="flex-grow w-full max-w-[1440px] mx-auto px-5 md:px-16 py-[120px] flex flex-col lg:flex-row gap-6">
      {/* Main Area: Header + Controls + List */}
      <div className="w-full flex flex-col gap-16 transition-all duration-300">
        {/* Page Header */}
        <header className="flex flex-col gap-4 border-b-4 border-black pb-8">
          <h1 className="text-5xl md:text-7xl leading-none font-heading font-black text-black uppercase tracking-tight">
            Student Records
          </h1>
          <p className="font-mono font-bold text-lg text-black mt-2 border-l-4 border-black pl-4">
            Manage semester registrations and attendance records
          </p>
        </header>

        {/* Top Controls */}
        <section className="flex flex-col sm:flex-row gap-6 items-end bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_#000000]">
          <div className="flex-grow flex flex-col gap-2 w-full">
            <label className="text-xs font-heading font-black tracking-widest text-black uppercase">Search</label>
            <div className="relative flex items-center bg-white border-2 border-black px-4 py-3 shadow-[4px_4px_0px_0px_#000000] focus-within:bg-primary transition-colors">
              <span className="material-symbols-outlined text-black mr-2 font-bold">search</span>
              <input 
                className="bg-transparent border-none p-0 focus:ring-0 text-black w-full placeholder-black/50 font-sans font-bold outline-none" 
                placeholder="Name, ID, or Email" 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="flex-shrink-0 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <div className="flex flex-col gap-2 w-full sm:w-48">
              <label className="text-xs font-heading font-black tracking-widest text-black uppercase">Filter Status</label>
              <select 
                className="bg-white border-2 border-black px-4 py-3 text-black font-sans font-bold w-full appearance-none outline-none shadow-[4px_4px_0px_0px_#000000] focus:bg-secondary transition-colors cursor-pointer"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option>All Statuses</option>
                <option>Very Good</option>
                <option>Good</option>
                <option>Warning</option>
                <option>Bad</option>
              </select>
            </div>
            <div className="flex flex-col gap-2 w-full sm:w-48">
              <label className="text-xs font-heading font-black tracking-widest text-black uppercase">Sort By</label>
              <select 
                className="bg-white border-2 border-black px-4 py-3 text-black font-sans font-bold w-full appearance-none outline-none shadow-[4px_4px_0px_0px_#000000] focus:bg-secondary transition-colors cursor-pointer"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option>Name (A-Z)</option>
                <option>Attendance (Low-High)</option>
                <option>Recent Registration</option>
              </select>
            </div>
          </div>
        </section>

        {/* Student List */}
        <StudentList 
          students={filteredAndSortedStudents} 
          selectedStudent={selectedStudent}
          onSelect={setSelectedStudent} 
          onClose={() => setSelectedStudent(null)}
        />
      </div>
    </main>
  );
}
