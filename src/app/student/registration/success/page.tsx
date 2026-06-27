import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function RegistrationSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ name?: string; email?: string; semester?: string }>;
}) {
  const params = await searchParams;

  if (!params.name || !params.semester) {
    redirect("/student/registration");
  }

  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-[#F3F0E9] font-sans flex items-center justify-center p-6">
      <main className="w-full max-w-[640px] bg-white border border-[#D8D4CC] py-16 px-8 md:px-16 shadow-sm">
        
        {/* Checkmark Icon */}
        <div className="flex justify-center mb-8">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M24 44C35.0457 44 44 35.0457 44 24C44 19.336 42.4042 15.0441 39.7315 11.5" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M14 24L22 32L38 10" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        {/* Heading */}
        <div className="text-center mb-12">
          <h1 className="text-[48px] md:text-[64px] font-sans font-extrabold tracking-tighter text-[#1B1B1B] leading-none mb-2">
            Registration
          </h1>
          <div className="text-[32px] md:text-[40px] font-serif italic text-[#4C4546] font-normal">
            Completed.
          </div>
        </div>

        {/* Details List */}
        <div className="w-full mb-12">
          <div className="border-t border-[#D8D4CC] flex flex-col md:flex-row md:items-center py-6 gap-2 md:gap-16">
            <span className="w-32 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#4C4546]">
              Student Name
            </span>
            <span className="text-[15px] text-[#1B1B1B]">
              {params.name}
            </span>
          </div>

          <div className="border-t border-[#D8D4CC] flex flex-col md:flex-row md:items-center py-6 gap-2 md:gap-16">
            <span className="w-32 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#4C4546]">
              Email
            </span>
            <span className="text-[15px] text-[#1B1B1B]">
              {params.email || "student@nueve.edu"}
            </span>
          </div>

          <div className="border-t border-[#D8D4CC] flex flex-col md:flex-row md:items-center py-6 gap-2 md:gap-16">
            <span className="w-32 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#4C4546]">
              Semester
            </span>
            <span className="text-[15px] text-[#1B1B1B]">
              {params.semester}
            </span>
          </div>

          <div className="border-y border-[#D8D4CC] flex flex-col md:flex-row md:items-center py-6 gap-2 md:gap-16">
            <span className="w-32 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#4C4546]">
              Date
            </span>
            <span className="text-[15px] text-[#1B1B1B]">
              {currentDate}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 w-full">
          <Link href="/student/dashboard" className="flex-1">
            <PrimaryButton className="w-full h-[52px]">
              Return To Dashboard
            </PrimaryButton>
          </Link>
          <Link href="/login" className="flex-1">
            <SecondaryButton className="w-full h-[52px]">
              Logout
            </SecondaryButton>
          </Link>
        </div>

      </main>
    </div>
  );
}
