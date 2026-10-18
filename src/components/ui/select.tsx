import type { SelectHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  error?: string;
};

export function Select({ className, error, children, ...props }: SelectProps) {
  return (
    <div>
      <select
        className={cn("field pr-8", className)}
        aria-invalid={error ? true : undefined}
        aria-describedby={error && props.id ? `${props.id}-error` : undefined}
        {...props}
      >
        {children}
      </select>
      {error && <p id={props.id ? `${props.id}-error` : undefined} className="mt-1.5 text-sm text-red-700">{error}</p>}
    </div>
  );
}
