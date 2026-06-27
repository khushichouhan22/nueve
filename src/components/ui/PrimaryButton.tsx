import * as React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const PrimaryButton = React.forwardRef<HTMLButtonElement, React.ComponentProps<typeof Button>>(
  ({ className, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        variant="default"
        className={cn(className)}
        {...props}
      />
    );
  }
);
PrimaryButton.displayName = "PrimaryButton";
