"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegistrationSchema, RegistrationInput } from "@/lib/validators";
import { TextInput } from "@/components/ui/TextInput";
import { DateInput } from "@/components/ui/DateInput";
import { NumberInput } from "@/components/ui/NumberInput";
import { useRouter } from "next/navigation";

import { submitRegistration } from "@/app/actions/registration";

export function RegistrationForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationInput>({
    resolver: zodResolver(RegistrationSchema),
  });

  const onSubmit = async (data: RegistrationInput) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await submitRegistration(data);
      if (result.success) {
        router.push(`/student/registration/success?name=${encodeURIComponent(result.name!)}&email=${encodeURIComponent(data.email)}&semester=${encodeURIComponent(result.semester!)}`);
      } else {
        setError(result.error || "An error occurred");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white border-4 border-black p-6 md:p-12 shadow-[4px_4px_0px_0px_#000000] md:shadow-[8px_8px_0px_0px_#000000] w-full md:w-1/2 lg:w-5/12 flex flex-col gap-6">
      <div className="flex flex-col gap-2 border-b-4 border-black pb-6 mb-2">
        <h1 className="font-heading font-black text-4xl text-black leading-none">
          Semester Registration
        </h1>
        <p className="font-sans font-bold text-xs text-black mt-1">
          Complete the form below to secure your classes for the upcoming term.
        </p>
      </div>

      <div className="flex flex-col gap-6">
        <TextInput
          label="Full Name"
          placeholder="Jane Doe"
          {...register("name")}
          error={errors.name?.message}
        />
        
        <TextInput
          label="Email Address"
          type="email"
          placeholder="jane.doe@university.edu"
          {...register("email")}
          error={errors.email?.message}
        />
        
        <TextInput
          label="Phone Number"
          type="tel"
          placeholder="(555) 123-4567"
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

        {/* Keeping original required fields but styled identically */}
        <div className="h-px w-full bg-black/20 my-2" />
        
        <DateInput
          label="Date of Birth"
          {...register("dob")}
          error={errors.dob?.message}
        />
        
        <NumberInput
          label="Previous Semester Attendance (%)"
          {...register("attendance", { valueAsNumber: true })}
          error={errors.attendance?.message}
        />
      </div>

      {error && (
        <div className="p-3 bg-tertiary border-2 border-black text-black text-sm font-mono font-bold">
          {error}
        </div>
      )}

      <button 
        type="submit" 
        disabled={isLoading} 
        className="w-full mt-4 bg-primary border-2 border-black text-black font-mono font-bold text-sm py-4 shadow-[4px_4px_0px_0px_#000000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all uppercase disabled:opacity-50"
      >
        {isLoading ? "PROCESSING..." : "SUBMIT REGISTRATION"}
      </button>
    </form>
  );
}
