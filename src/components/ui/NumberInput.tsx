import * as React from "react";
import { cn } from "@/lib/utils";

export interface NumberInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  required?: boolean;
}

export const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
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
        <input
          id={inputId}
          ref={ref}
          type="number"
          placeholder={placeholder || " "}
          className={cn(
            "w-full bg-white border-2 border-black rounded-none px-4 py-3 text-base font-sans outline-none transition-all shadow-none",
            "focus:bg-primary focus:shadow-[4px_4px_0px_0px_#000000]",
            error && "border-destructive focus:border-destructive focus:bg-white",
            className
          )}
          {...props}
        />
        {error && <span className="text-xs text-destructive font-mono font-bold mt-1">{error}</span>}
      </div>
    );
  }
);
NumberInput.displayName = "NumberInput";
