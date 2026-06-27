import * as React from "react";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";

export interface DateInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  required?: boolean;
}

export const DateInput = React.forwardRef<HTMLInputElement, DateInputProps>(
  ({ className, label, error, required, id, placeholder, ...props }, ref) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;

    return (
      <div className="relative w-full flex flex-col gap-1">
        <label
          htmlFor={inputId}
          className={cn(
            "font-mono font-bold text-sm uppercase text-black",
            error && "text-destructive"
          )}
        >
          {label} {required && <span className="text-destructive">*</span>}
        </label>
        <div className="relative w-full">
          <input
            id={inputId}
            ref={ref}
            type="date"
            placeholder={placeholder || "mm/dd/yyyy"}
            className={cn(
              "w-full bg-white border-2 border-black rounded-none px-4 py-3 text-base font-sans outline-none transition-all shadow-none",
              "[&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:z-10",
              "focus:bg-primary focus:shadow-[4px_4px_0px_0px_#000000]",
              error && "border-destructive focus:border-destructive focus:bg-white",
              className
            )}
            {...props}
          />
          <CalendarIcon className="absolute right-3 top-3 w-5 h-5 text-black pointer-events-none" />
        </div>
        {error && <span className="text-xs text-destructive font-mono font-bold mt-1">{error}</span>}
      </div>
    );
  }
);
DateInput.displayName = "DateInput";
