import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";

type InfoCardProps = {
  title: string;
  children: ReactNode;
  className?: string;
};

export function InfoCard({ title, children, className }: InfoCardProps) {
  return (
    <div className={cn("bg-white border-4 border-black shadow-[8px_8px_0px_0px_#000000] flex flex-col", className)}>
      <div className="border-b-2 border-black p-4 bg-tertiary">
        <h3 className="font-heading font-black text-xl uppercase tracking-tight text-black">
          {title}
        </h3>
      </div>
      <div className="p-4 flex flex-col gap-4 bg-white">
        {children}
      </div>
    </div>
  );
}
