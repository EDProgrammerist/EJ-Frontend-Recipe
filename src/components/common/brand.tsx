import { BookOpenIcon } from "@phosphor-icons/react";
import { Link } from "react-router";

export function Brand() {
  return (
    <Link to="/" aria-label="Recipe Book home" className="inline-flex shrink-0 items-center gap-2.5 rounded-lg text-emerald-950">
      <span className="grid size-10 place-items-center rounded-xl bg-emerald-900 text-white"><BookOpenIcon size={23} weight="duotone" aria-hidden="true" /></span>
      <span className="text-lg font-semibold tracking-tight">Recipe Book<span className="text-[#a38649]">.</span></span>
    </Link>
  );
}
