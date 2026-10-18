import type { ReactNode } from "react";
import { Brand } from "./brand";
import { ArrowDownRightIcon } from "@phosphor-icons/react";

type PageHeaderProps = {
  eyebrow: string;
  title: string;
  description: string;
  children?: ReactNode;
  image?: boolean;
};

export function PageHeader({ eyebrow, title, description, children, image = true }: PageHeaderProps) {
  return (
    <header>
      <a className="skip-link" href="#recipe-content">Skip to recipes</a>
      <nav aria-label="Main navigation" className="flex min-h-24 flex-wrap items-center justify-between gap-x-4 gap-y-3 border-b border-emerald-900/10 py-5">
        <Brand />
        <div className="flex min-w-0 flex-wrap items-center gap-3 text-sm">{children}</div>
      </nav>
      <div className={`grid items-center gap-8 py-8 sm:py-12 ${image ? "md:grid-cols-[1.1fr_1fr] lg:gap-16" : ""}`}>
        <div>
          <p className="mb-4 flex items-center gap-2 text-sm font-medium text-emerald-700"><span className="h-1.5 w-1.5 rounded-full bg-[#ae8c4c]" />{eyebrow}</p>
          <h1 className="display-heading max-w-xl text-[clamp(2.75rem,5vw,4.5rem)]">{title}</h1>
          <p className="mt-5 max-w-md text-base leading-7 text-emerald-950/70">{description}</p>
          {image && <p className="mt-6 hidden items-center gap-2 text-sm font-medium sm:inline-flex">Made to be cooked, kept, and shared at the table.<ArrowDownRightIcon size={20} className="shrink-0" aria-hidden="true" /></p>}
        </div>
        {image && <div className="relative hidden overflow-hidden rounded-[1.75rem] bg-emerald-100 sm:block"><img src="/kitchen.jpg" alt="Salmon, rice, green beans and tomatoes served on a wooden board" className="h-52 w-full object-cover sm:h-64 md:h-72" /><span className="absolute bottom-4 left-4 right-4 rounded-lg bg-[#fafaf6] px-4 py-2 text-sm font-medium text-emerald-950">Good food starts with a little inspiration.</span></div>}
      </div>
    </header>
  );
}
