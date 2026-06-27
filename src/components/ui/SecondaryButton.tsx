import * as React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const SecondaryButton = React.forwardRef<HTMLButtonElement, React.ComponentProps<typeof Button>>(
  ({ className, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        variant="secondary"
        className={cn(className)}
        {...props}
      />
    );
  }
);
SecondaryButton.displayName = "SecondaryButton";
