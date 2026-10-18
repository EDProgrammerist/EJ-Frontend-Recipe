import type { TableHTMLAttributes } from "react";
import { cn } from "@/lib/cn";
export function Table({ className, ...props }: TableHTMLAttributes<HTMLTableElement>) {
  return <div role="region" aria-label="Recipe directory table, scroll horizontally for more columns" tabIndex={0} className="overflow-x-auto rounded-2xl bg-white"><table className={cn("w-full min-w-[54rem] text-left text-sm [&_th]:px-5 [&_th]:py-4 [&_th]:font-semibold [&_td]:px-5 [&_td]:py-5 [&_thead]:bg-emerald-100/60 [&_tbody_tr]:border-t [&_tbody_tr]:border-emerald-900/10 [&_tbody_tr]:transition-colors [&_tbody_tr:hover]:bg-emerald-50/60", className)} {...props} /></div>;
}
