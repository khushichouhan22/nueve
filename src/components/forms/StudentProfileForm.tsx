"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateStudentSchema, UpdateStudentInput } from "@/lib/validators";
import { updateStudentProfile } from "@/app/actions/student";
import { TextInput } from "@/components/ui/TextInput";
import { useRouter } from "next/navigation";

type StudentData = {
  name: string;
  email: string;
  dob: string;
  phone: string;
  courses: string[] | null;
};

export function StudentProfileForm({ student }: { student: StudentData }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: "error" | "success"; text: string } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateStudentInput>({
    resolver: zodResolver(UpdateStudentSchema),
    defaultValues: {
      name: student.name,
      dob: student.dob,
      phone: student.phone,
      courses: student.courses || [],
    },
  });

  const onSubmit = async (data: UpdateStudentInput) => {
    setIsSubmitting(true);
    setMessage(null);
    
    try {
      const result = await updateStudentProfile(data);
      if (result.success) {
        setMessage({ type: "success", text: "Profile updated successfully." });
        router.refresh();
      } else {
        setMessage({ type: "error", text: result.error || "Failed to update profile." });
      }
    } catch {
      setMessage({ type: "error", text: "An unexpected error occurred." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      {message && (
        <div className={`p-4 border-2 border-black font-mono font-bold text-sm ${message.type === 'success' ? 'bg-primary' : 'bg-tertiary'} text-black shadow-[4px_4px_0px_0px_#000000]`}>
          {message.text}
        </div>
      )}

      <TextInput
        label="Full Name"
        {...register("name")}
        error={errors.name?.message}
      />
      
      <div className="relative w-full flex flex-col gap-1 opacity-70">
        <label className="font-mono font-bold text-sm uppercase text-black">
          Email Address (Read Only)
        </label>
        <input
          type="email"
          value={student.email}
          readOnly
          disabled
          className="w-full bg-black/5 border-2 border-black rounded-none px-4 py-3 text-base font-sans outline-none cursor-not-allowed"
        />
      </div>

      <TextInput
        label="Date of Birth"
        type="date"
        {...register("dob")}
        error={errors.dob?.message}
      />

      <TextInput
        label="Phone Number"
        type="tel"
        {...register("phone")}
        error={errors.phone?.message}
      />

      <div className="flex flex-col gap-2">
        <label className="font-mono font-bold text-xs uppercase text-black">
          Course Selection
        </label>
        <div className="flex flex-col gap-2">
          {["Intro to Computer Science", "Advanced Mathematics", "Principles of Economics", "World History", "Graphic Design 101"].map((course, idx) => (
            <label key={idx} className="flex items-center gap-3 border-2 border-black p-3 cursor-pointer hover:bg-secondary/20 transition-colors group">
              <input 
                type="checkbox" 
                value={course}
                {...register("courses")}
                className="w-4 h-4 border-2 border-black rounded-none appearance-none checked:bg-black checked:after:content-['✓'] checked:after:text-white checked:after:text-xs checked:after:flex checked:after:justify-center checked:after:items-center focus:outline-none cursor-pointer" 
              />
              <span className="font-sans font-bold text-sm text-black group-hover:underline">{course}</span>
            </label>
          ))}
        </div>
        {errors.courses && <span className="text-xs text-destructive font-mono font-bold mt-1">{errors.courses.message}</span>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-4 bg-secondary border-2 border-black text-black font-mono font-bold text-lg py-4 uppercase tracking-widest shadow-[4px_4px_0px_0px_#000000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Saving..." : "Save Changes"}
      </button>
    </form>
  );
}
