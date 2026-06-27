"use client";

import React, { useState } from "react";
import { User } from "@/db/schema/users";
import { format } from "date-fns";
import { deleteStudent, updateStudent } from "@/app/actions/student";
import { useRouter } from "next/navigation";
import { jsPDF } from "jspdf";

interface StudentDetailPanelProps {
  student: User | null;
  onClose: () => void;
}

export function StudentDetailPanel({ student, onClose }: StudentDetailPanelProps) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    dob: "",
  });

  React.useEffect(() => {
    if (student) {
      setFormData({
        name: student.name,
        phone: student.phone || "",
        dob: student.dob || "",
      });
      setIsEditing(false);
    }
  }, [student]);

  if (!student) return null;

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      setIsDeleting(true);
      await deleteStudent(student.id);
      setIsDeleting(false);
      onClose();
      router.refresh();
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    await updateStudent(student.id, formData);
    setIsSaving(false);
    setIsEditing(false);
    router.refresh();
  };

  const exportTranscript = () => {
    const doc = new jsPDF();
    
    // Header
    doc.setFillColor(68, 101, 82); // Primary green color
    doc.rect(0, 0, 210, 40, "F");
    
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(24);
    doc.text("NUEVE 9", 20, 20);
    doc.setFontSize(14);
    doc.setFont("helvetica", "normal");
    doc.text("OFFICIAL TRANSCRIPT", 20, 30);
    
    // Reset colors
    doc.setTextColor(0, 0, 0);
    
    // Student Information Section
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("STUDENT INFORMATION", 20, 55);
    
    doc.setLineWidth(0.5);
    doc.line(20, 58, 190, 58);
    
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`Name: ${student.name}`, 20, 68);
    doc.text(`Student ID: ${student.id.split('-')[0]}`, 120, 68); // Shortened ID
    doc.text(`Email: ${student.email}`, 20, 78);
    doc.text(`DOB: ${student.dob || 'N/A'}`, 120, 78);
    
    // Academic Information Section
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("ACADEMIC RECORD", 20, 95);
    doc.line(20, 98, 190, 98);
    
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`Semester: ${student.semester || 'N/A'}`, 20, 108);
    doc.text(`Registration Date: ${student.registeredAt ? format(new Date(student.registeredAt), "MMM d, yyyy") : 'N/A'}`, 20, 118);
    doc.text(`Attendance: ${student.attendance}% (${student.attendanceStatus.replace('_', ' ')})`, 120, 118);

    // Courses Section
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("REGISTERED COURSES", 20, 135);
    doc.line(20, 138, 190, 138);

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    
    let yPos = 148;
    if (student.courses && student.courses.length > 0) {
      student.courses.forEach((course) => {
        // Draw a small bullet
        doc.circle(22, yPos - 1.5, 1, 'F');
        doc.text(course, 26, yPos);
        yPos += 8;
      });
    } else {
      doc.text("No courses registered for this semester.", 20, yPos);
    }
    
    // Footer
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text(`Generated on ${format(new Date(), "MMM d, yyyy 'at' h:mm a")}`, 20, 280);
    doc.text("This document is an unofficial copy unless accompanied by an official seal.", 20, 285);

    doc.save(`${student.name.replace(/\s+/g, '_')}_Transcript.pdf`);
  };

  return (
    <div className="w-full p-4 md:p-6 bg-white">
      <div className="flex flex-col border-4 border-black bg-[#fef4db] p-6 md:p-8 gap-8 shadow-[4px_4px_0px_0px_#000000] md:shadow-[8px_8px_0px_0px_#000000]">
        {/* Panel Header */}
        <div className="flex justify-between items-start border-b-4 border-black pb-6">
          <div className="flex flex-col gap-1 w-full mr-4">
            {isEditing ? (
              <input
                className="w-full bg-white border-2 border-black px-3 py-2 font-heading font-black text-2xl leading-none text-black focus:outline-none focus:bg-primary transition-colors"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            ) : (
              <h2 className="font-heading font-black text-3xl leading-none text-black uppercase">{student.name}</h2>
            )}
            <span className="text-xs font-mono font-bold text-black uppercase mt-2">ID: {student.id}</span>
          </div>
          <button onClick={onClose} className="text-black bg-white border-2 border-black px-2 py-2 shadow-[2px_2px_0px_0px_#000000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all flex-shrink-0">
            <span className="material-symbols-outlined font-bold" style={{ fontVariationSettings: "'FILL' 0" }}>close</span>
          </button>
        </div>
        
        {/* Personal Info */}
        <div className="flex flex-col gap-4">
          <h3 className="text-xs font-heading font-black tracking-widest text-black uppercase bg-secondary border-2 border-black inline-block px-3 py-1 self-start shadow-[2px_2px_0px_0px_#000000]">Personal Information</h3>
          <div className="flex flex-col gap-4 text-black text-sm font-sans font-bold mt-2">
            <div className="flex flex-col sm:flex-row sm:justify-between border-b-2 border-black pb-2 gap-1 sm:gap-4">
              <span className="text-black/70 w-24 flex-shrink-0 uppercase font-mono text-xs">Email</span>
              <span className="break-all text-right">{student.email}</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between border-b-2 border-black pb-2 gap-1 sm:gap-4">
              <span className="text-black/70 w-24 flex-shrink-0 uppercase font-mono text-xs">Phone</span>
              {isEditing ? (
                <input
                  className="bg-white border-2 border-black px-2 py-1 w-full max-w-[200px] text-right focus:outline-none focus:bg-primary"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              ) : (
                <span className="text-right">{student.phone || "N/A"}</span>
              )}
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between border-b-2 border-black pb-2 gap-1 sm:gap-4">
              <span className="text-black/70 w-24 flex-shrink-0 uppercase font-mono text-xs">DOB</span>
              {isEditing ? (
                <input
                  type="date"
                  className="bg-white border-2 border-black px-2 py-1 w-full max-w-[200px] text-right focus:outline-none focus:bg-primary"
                  value={formData.dob}
                  onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                />
              ) : (
                <span className="text-right">{student.dob || "N/A"}</span>
              )}
            </div>
          </div>
        </div>

        {/* Registration Info */}
        <div className="flex flex-col gap-4">
          <h3 className="text-xs font-heading font-black tracking-widest text-black uppercase bg-tertiary border-2 border-black inline-block px-3 py-1 self-start shadow-[2px_2px_0px_0px_#000000]">Registration Status</h3>
          <div className="flex flex-col gap-4 text-black text-sm font-sans font-bold mt-2">
            <div className="flex justify-between border-b-2 border-black pb-2">
              <span className="text-black/70 uppercase font-mono text-xs">Registration Date</span>
              <span className="text-right">{student.registeredAt ? format(new Date(student.registeredAt), "MMM d, yyyy") : "N/A"}</span>
            </div>
            <div className="flex justify-between border-b-2 border-black pb-2">
              <span className="text-black/70 uppercase font-mono text-xs">Semester</span>
              <span>{student.semester || "N/A"}</span>
            </div>
          </div>
        </div>

        {/* Selected Courses */}
        <div className="flex flex-col gap-4">
          <h3 className="text-xs font-heading font-black tracking-widest text-black uppercase bg-primary border-2 border-black inline-block px-3 py-1 self-start shadow-[2px_2px_0px_0px_#000000]">Selected Courses</h3>
          <div className="flex flex-col gap-2 mt-2">
            {student.courses && student.courses.length > 0 ? (
              student.courses.map((course, idx) => (
                <div key={idx} className="bg-white border-2 border-black px-3 py-2 text-sm font-sans font-bold text-black shadow-[2px_2px_0px_0px_#000000]">
                  {course}
                </div>
              ))
            ) : (
              <div className="text-xs font-mono font-bold uppercase text-black/70">No courses selected</div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-4 pt-6 border-t-4 border-black">
          {isEditing ? (
            <div className="flex gap-4">
              <button onClick={() => setIsEditing(false)} className="w-1/2 bg-white border-2 border-black text-black text-sm font-mono font-bold py-3 shadow-[4px_4px_0px_0px_#000000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all uppercase">
                Cancel
              </button>
              <button onClick={handleSave} disabled={isSaving} className="w-1/2 bg-primary border-2 border-black text-black text-sm font-mono font-bold py-3 shadow-[4px_4px_0px_0px_#000000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all uppercase disabled:opacity-50 disabled:cursor-not-allowed">
                {isSaving ? "Saving" : "Save"}
              </button>
            </div>
          ) : (
            <button onClick={() => setIsEditing(true)} className="w-full bg-white border-2 border-black text-black text-sm font-mono font-bold py-3 shadow-[4px_4px_0px_0px_#000000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all uppercase">
              Edit Record
            </button>
          )}
          
          <button onClick={exportTranscript} className="w-full bg-secondary border-2 border-black text-black text-sm font-mono font-bold py-3 shadow-[4px_4px_0px_0px_#000000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all uppercase">
            Export Transcript
          </button>
          <button onClick={handleDelete} disabled={isDeleting} className="w-full text-black hover:text-white hover:bg-black border-2 border-transparent hover:border-black text-xs font-mono font-bold py-2 uppercase mt-2 transition-colors disabled:opacity-50">
            {isDeleting ? "Deleting..." : "Delete Student"}
          </button>
        </div>
      </div>
    </div>
  );
}
