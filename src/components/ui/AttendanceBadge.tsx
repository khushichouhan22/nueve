import React from "react";
import { cn } from "@/lib/utils";

type AttendanceBadgeProps = {
  status: "VERY_GOOD" | "GOOD" | "WARNING" | "BAD" | string;
};

export function AttendanceBadge({ status }: AttendanceBadgeProps) {
  const getStyles = () => {
    switch (status) {
      case "VERY_GOOD":
      case "GOOD":
        return "bg-primary text-black";
      case "WARNING":
        return "bg-secondary text-black";
      case "BAD":
        return "bg-[#ffdad6] text-black"; // Light red error container
      default:
        return "bg-white text-black";
    }
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-1 rounded-none text-xs font-mono font-bold border-2 border-black uppercase tracking-wider",
        getStyles()
      )}
    >
      {status.replace("_", " ")}
    </span>
  );
}
