import type { LabelHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";
type LabelProps = LabelHTMLAttributes<HTMLLabelElement> & { children: ReactNode; error?: boolean | string };
export function Label({ className, children, error, ...props }: LabelProps) {
  return <label className={cn("mb-2 block text-sm font-medium", error ? "text-red-700" : "text-emerald-950", className)} {...props}>{children}</label>;
}
