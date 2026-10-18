import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
type TagProps = { children: ReactNode; className?: string };
export function Tag({ children, className }: TagProps) {
  return <span className={cn("max-w-full break-words rounded-md bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-800", className)}>{children}</span>;
}
