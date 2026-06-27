"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { signOut } from "next-auth/react";

const NAV_LINKS = [
  { name: "Dashboard", href: "/teacher/dashboard" },
  { name: "Student List", href: "/teacher/students" },
];

export function TeacherNavbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="w-full sticky top-0 border-b-4 border-black bg-[#446552] z-50">
      <div className="flex justify-between items-center w-full px-4 md:px-12 py-4 md:py-6 max-w-7xl mx-auto">
        <Link 
          href="/teacher/dashboard" 
          className="text-2xl md:text-3xl font-heading font-black tracking-tighter uppercase text-black flex items-baseline gap-1"
        >
          Nueve<span className="text-xs md:text-sm border-2 border-black px-1 leading-none rounded-none bg-secondary">9</span>
        </Link>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex gap-8 items-center">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href || (link.href !== "/teacher/dashboard" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "text-black font-heading font-bold text-lg cursor-pointer uppercase transition-all",
                  isActive ? "border-b-4 border-black pb-1" : "border-transparent pb-1 hover:border-black/50"
                )}
              >
                {link.name}
              </Link>
            );
          })}
        </div>
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="bg-secondary text-black font-bold font-mono text-sm px-6 py-2 uppercase border-2 border-black shadow-[4px_4px_0px_0px_#000000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all cursor-pointer"
          >
            Log Out
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden flex items-center justify-center p-2 border-2 border-black bg-white shadow-[2px_2px_0px_0px_#000000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span className="material-symbols-outlined text-black">
            {isMobileMenuOpen ? "close" : "menu"}
          </span>
        </button>
      </div>

      {/* Mobile Nav Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t-4 border-black bg-[#446552] flex flex-col items-center py-6 px-4 gap-6 absolute w-full left-0 shadow-[0_8px_0px_0px_#000000]">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href || (link.href !== "/teacher/dashboard" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  "text-black font-heading font-bold text-xl cursor-pointer uppercase transition-all w-full text-center py-2 border-2 border-transparent",
                  isActive ? "bg-black text-[#446552]" : "hover:bg-black/10"
                )}
              >
                {link.name}
              </Link>
            );
          })}
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              signOut({ callbackUrl: "/login" });
            }}
            className="w-full max-w-[200px] mt-4 bg-secondary text-black font-bold font-mono text-sm px-6 py-3 uppercase border-2 border-black shadow-[4px_4px_0px_0px_#000000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all cursor-pointer"
          >
            Log Out
          </button>
        </div>
      )}
    </nav>
  );
}
