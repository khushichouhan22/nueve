import { Suspense } from "react";
import { LoginForm } from "@/components/forms/LoginForm";

export const metadata = {
  title: "Login | Student Registration",
  description: "Sign in to the Student Semester Registration System",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#fef4db] text-foreground flex flex-col antialiased relative overflow-hidden">
      {/* Background Shapes */}
      <div className="absolute top-0 left-0 w-64 h-64 border-[1px] border-black/20 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 border-[1px] border-black/20 rotate-45 translate-x-1/4 translate-y-1/4 pointer-events-none"></div>

      <main className="flex-grow flex items-center justify-center w-full px-6 py-12 relative z-10">
        <Suspense fallback={<div>Loading form...</div>}>
          <LoginForm />
        </Suspense>
      </main>
    </div>
  );
}
