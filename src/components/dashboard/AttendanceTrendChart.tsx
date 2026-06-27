import React from "react";

export function AttendanceTrendChart() {
  return (
    <div className="lg:col-span-4 flex flex-col">
      <div className="flex justify-between items-end border-b border-[#D8D4CC] pb-4 mb-6">
        <h2 className="font-bold text-[24px] leading-[1.3] tracking-[0.05em] text-[#1B1B1B]">Attendance Trend</h2>
        <span className="text-[12px] font-semibold tracking-[0.1em] text-[#4C4546] uppercase">Oct &apos;24</span>
      </div>
      <div className="bg-[#FAF8F4] border border-[#D8D4CC] flex-grow p-6 flex flex-col relative overflow-hidden min-h-[300px]">
        {/* Minimalist SVG Chart Placeholder */}
        <div className="absolute inset-0 p-6 flex flex-col justify-between opacity-20 pointer-events-none z-0">
          <div className="border-b border-[#7E7576] w-full h-0"></div>
          <div className="border-b border-[#7E7576] w-full h-0"></div>
          <div className="border-b border-[#7E7576] w-full h-0"></div>
          <div className="border-b border-[#7E7576] w-full h-0"></div>
        </div>
        <div className="relative z-10 w-full h-full flex items-end">
          <svg className="w-full h-auto stroke-[#000000] fill-none overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 50">
            <path d="M0,40 L10,35 L20,38 L30,25 L40,28 L50,15 L60,20 L70,10 L80,18 L90,5 L100,8" strokeLinejoin="round" strokeWidth="0.5"></path>
            {/* Data points */}
            <circle className="fill-[#000000]" cx="30" cy="25" r="1"></circle>
            <circle className="fill-[#000000]" cx="70" cy="10" r="1"></circle>
            <circle className="fill-[#000000]" cx="90" cy="5" r="1"></circle>
          </svg>
        </div>
        <div className="flex justify-between mt-4 border-t border-[#D8D4CC] pt-2 z-10">
          <span className="text-[12px] font-semibold tracking-[0.1em] text-[#4C4546]">W1</span>
          <span className="text-[12px] font-semibold tracking-[0.1em] text-[#4C4546]">W2</span>
          <span className="text-[12px] font-semibold tracking-[0.1em] text-[#4C4546]">W3</span>
          <span className="text-[12px] font-semibold tracking-[0.1em] text-[#4C4546]">W4</span>
        </div>
      </div>
    </div>
  );
}
