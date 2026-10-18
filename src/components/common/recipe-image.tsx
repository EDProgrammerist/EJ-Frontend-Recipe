import { useState } from "react";
import { CookingPotIcon } from "@phosphor-icons/react";

export function RecipeImage({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const [failed, setFailed] = useState(false);
  if (failed) return <div role="img" aria-label={alt} className={`grid place-items-center bg-emerald-100 text-emerald-700 ${className || ""}`}><CookingPotIcon size={42} weight="duotone" aria-hidden="true" /></div>;
  return <img src={src} alt={alt} className={className} loading="lazy" onError={() => setFailed(true)} />;
}
