import type { TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  error?: string;
};

export function Textarea({ className, error, ...props }: TextareaProps) {
  return (
    <div>
      <textarea className={cn("field min-h-24 resize-y", className)} aria-invalid={error ? true : undefined} aria-describedby={error && props.id ? `${props.id}-error` : undefined} {...props} />
      {error && <p id={props.id ? `${props.id}-error` : undefined} className="mt-1.5 text-sm text-red-700">{error}</p>}
    </div>
  );
}
