"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { LoginSchema, LoginInput } from "@/lib/validators";
import { TextInput } from "@/components/ui/TextInput";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/student/dashboard";
  const [error, setError] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginInput) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (result?.error) {
        setError("Invalid email or password");
      } else {
        // Fetch session to determine role-based redirect
        const sessionRes = await fetch("/api/auth/session");
        const session = await sessionRes.json();
        
        if (session?.user?.role === "ADMIN") {
          router.push("/teacher/dashboard");
        } else {
          router.push(callbackUrl);
        }
        router.refresh();
      }
    } catch (err) {
      setError("An unexpected error occurred");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white border-4 border-black p-6 md:p-12 shadow-[4px_4px_0px_0px_#000000] md:shadow-[8px_8px_0px_0px_#000000] max-w-[450px] w-full relative z-10 flex flex-col gap-6">
      {error && (
        <div className="mb-4 p-3 bg-tertiary border-2 border-black text-black text-sm font-mono font-bold">
          {error}
        </div>
      )}

      <div className="flex flex-col gap-2 border-b-2 border-black pb-6">
        <h1 className="font-heading font-black text-4xl md:text-5xl text-black leading-none">
          Welcome <br /> Back
        </h1>
        <p className="font-mono font-bold text-xs text-black mt-2 uppercase tracking-widest">
          Student Portal Access
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <TextInput
          label="Email Address"
          type="email"
          required
          placeholder="student@university.edu"
          {...register("email")}
          error={errors.email?.message}
          disabled={isLoading}
        />

        <TextInput
          label="Password / DOB"
          type="password"
          required
          placeholder="••••••••"
          {...register("password")}
          error={errors.password?.message}
          disabled={isLoading}
        />

        <div className="flex items-center gap-2 mt-2">
          <input 
            type="checkbox" 
            id="remember" 
            className="w-4 h-4 border-2 border-black rounded-none appearance-none checked:bg-black checked:after:content-['✓'] checked:after:text-white checked:after:text-xs checked:after:flex checked:after:justify-center checked:after:items-center focus:outline-none cursor-pointer"
          />
          <label htmlFor="remember" className="font-mono font-bold text-[10px] text-black cursor-pointer uppercase">
            Remember my device
          </label>
        </div>

        <div className="flex flex-col gap-4 mt-4">
          <button 
            type="submit" 
            className="w-full bg-secondary border-2 border-black text-black font-mono font-bold text-sm py-3 shadow-[4px_4px_0px_0px_#000000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all uppercase flex justify-center items-center gap-2 disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : <>Login <span className="material-symbols-outlined text-sm">arrow_forward</span></>}
          </button>
          
          <div className="flex justify-center mt-2">
            <a href="#" className="font-mono font-bold text-[10px] text-black hover:underline uppercase tracking-widest">
              Forgot Password?
            </a>
          </div>
          
          <button 
            type="button" 
            className="w-full bg-tertiary border-2 border-black text-black font-mono font-bold text-sm py-3 shadow-[4px_4px_0px_0px_#000000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all uppercase mt-2 disabled:opacity-50" 
            onClick={() => router.push('/student/registration')} 
            disabled={isLoading}
          >
            Register for an Account
          </button>
        </div>
      </form>
    </div>
  );
}
