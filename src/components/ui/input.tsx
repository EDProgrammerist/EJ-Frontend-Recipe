import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  error?: string;
};

export function Input({ className, error, ...props }: InputProps) {
  return (
    <div>
      <input className={cn("field", className)} aria-invalid={error ? true : undefined} aria-describedby={error && props.id ? `${props.id}-error` : undefined} {...props} />
      {error && <p id={props.id ? `${props.id}-error` : undefined} className="mt-1.5 text-sm text-red-700">{error}</p>}
    </div>
  );
}
