import { RegistrationForm } from "@/components/forms/RegistrationForm";
export default function RegistrationPage() {
  return (
    <div className="min-h-screen bg-[#fef4db] text-foreground font-sans relative overflow-hidden flex flex-col">
      <main className="flex-grow flex items-center justify-center w-full px-4 md:px-6 py-8 md:py-12 relative z-10">
        <RegistrationForm />
      </main>
    </div>
  );
}
