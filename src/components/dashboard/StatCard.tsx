import React from "react";

type StatCardProps = {
  title: string;
  value: number | string;
};

export function StatCard({ title, value }: StatCardProps) {
  return (
    <div className="p-6 border border-[#D8D4CC] bg-[#FAF8F4] shadow-sm rounded-lg flex flex-col gap-2">
      <h3 className="text-[14px] font-semibold text-[#7E7576] tracking-wider uppercase">
        {title}
      </h3>
      <p className="text-[32px] font-bold text-[#1B1B1B] font-sans">
        {value}
      </p>
    </div>
  );
}
