import React from "react";
import { cn } from "@/lib/utils";

type TeacherStatCardProps = {
  title: string;
  value: string | number;
  iconName: string;
  index: string;
  tagText?: string;
  bgColorClass?: string;
  tagBgColorClass?: string;
};

export function TeacherStatCard({ title, value, iconName, tagText, bgColorClass = "bg-white", tagBgColorClass = "bg-white" }: TeacherStatCardProps) {
  return (
    <div className={cn("border-4 border-black p-6 flex flex-col justify-between min-h-[160px] md:h-48 shadow-[4px_4px_0px_0px_#000000] md:shadow-[8px_8px_0px_0px_#000000]", bgColorClass)}>
      <div className="flex justify-between items-start">
        <span className="text-sm font-mono font-bold uppercase text-black">
          {title}
        </span>
        <span className="material-symbols-outlined text-black">
          {iconName}
        </span>
      </div>
      <div>
        <span className="text-6xl font-heading font-black text-black block mb-2 leading-none">
          {value}
        </span>
        {tagText && (
          <span className={cn("inline-block border-2 border-black px-2 py-1 text-xs font-mono font-bold text-black", tagBgColorClass)}>
            {tagText}
          </span>
        )}
      </div>
    </div>
  );
}
