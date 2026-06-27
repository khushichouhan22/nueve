"use client";

import React from "react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { User } from "@/db/schema/users";
import { format } from "date-fns";

interface ExportReportButtonProps {
  metrics: {
    registrationsToday: number;
    totalStudents: number;
    lowAttendanceStudents: number;
    averageAttendance: number;
  };
  recentRegistrations: User[];
}

export function ExportReportButton({ metrics, recentRegistrations }: ExportReportButtonProps) {
  const handleExport = () => {
    const doc = new jsPDF();
    
    // Header
    doc.setFont("helvetica", "bold");
    doc.setFontSize(24);
    doc.text("Academic Overview Report", 14, 22);
    
    doc.setFont("helvetica", "italic");
    doc.setFontSize(12);
    doc.setTextColor(100);
    doc.text(`Generated on: ${format(new Date(), "MMM d, yyyy")}`, 14, 30);
    
    // Metrics Section
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0);
    doc.setFontSize(16);
    doc.text("Key Metrics", 14, 45);
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text(`Registrations Today: ${metrics.registrationsToday}`, 14, 55);
    doc.text(`Total Students: ${metrics.totalStudents}`, 14, 65);
    doc.text(`Low Attendance Students: ${metrics.lowAttendanceStudents}`, 14, 75);
    doc.text(`Average Attendance: ${metrics.averageAttendance}%`, 14, 85);
    
    // Recent Registrations Table
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("Recent Registrations", 14, 105);
    
    const tableData = recentRegistrations.map((student) => [
      student.name,
      student.email || "N/A",
      student.semester,
      student.attendanceStatus,
      student.registeredAt ? format(new Date(student.registeredAt), "MMM d, yyyy") : "N/A"
    ]);

    autoTable(doc, {
      startY: 110,
      head: [["Name", "Email", "Semester", "Status", "Date"]],
      body: tableData,
      theme: "striped",
      headStyles: { fillColor: [0, 0, 0] }
    });

    // Save PDF
    doc.save(`Academic_Report_${format(new Date(), "yyyy-MM-dd")}.pdf`);
  };

  return (
    <button 
      onClick={handleExport}
      className="bg-[#000000] text-[#FFFFFF] font-bold text-[14px] px-8 py-3 rounded-none uppercase tracking-[0.1em] hover:bg-[#5E5E5E] transition-colors"
    >
      Export Report
    </button>
  );
}
