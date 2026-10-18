import type { ReactNode } from "react";

type SectionProps = {
  children: ReactNode;
};

export function Section({ children }: SectionProps) {
  // Shared page width and responsive padding keep every screen aligned.
  return (
    <main id="main-content" className="page-enter mx-auto min-h-dvh max-w-7xl px-5 pb-12 sm:px-8 lg:px-12">
      {children}
    </main>
  );
}
