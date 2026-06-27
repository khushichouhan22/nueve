import React from "react";

export default function Loading() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-[80vh] w-full p-4">
      <div className="bg-secondary border-4 border-black shadow-[8px_8px_0px_0px_#000000] p-8 md:p-12 flex flex-col items-center justify-center animate-pulse min-w-[280px]">
        {/* A brutalist spinning element */}
        <div className="w-16 h-16 bg-primary border-4 border-black mb-6 animate-[spin_2s_linear_infinite]" />
        
        <h2 className="font-heading font-black text-4xl md:text-5xl uppercase tracking-tighter text-black text-center">
          Loading
        </h2>
        
        <div className="mt-6 flex gap-2">
          <div className="w-4 h-4 border-2 border-black bg-white shadow-[2px_2px_0px_0px_#000000] animate-bounce" style={{ animationDelay: "0ms" }}></div>
          <div className="w-4 h-4 border-2 border-black bg-white shadow-[2px_2px_0px_0px_#000000] animate-bounce" style={{ animationDelay: "150ms" }}></div>
          <div className="w-4 h-4 border-2 border-black bg-white shadow-[2px_2px_0px_0px_#000000] animate-bounce" style={{ animationDelay: "300ms" }}></div>
        </div>
      </div>
    </div>
  );
}
