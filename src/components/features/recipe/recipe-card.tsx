import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Tag } from "@/components/ui/tag";
import { RecipeImage } from "@/components/common/recipe-image";
import { ArrowUpRightIcon, ClockIcon, TrashIcon } from "@phosphor-icons/react";

type RecipeCardProps = {
  id: string;
  image: string;
  name: string;
  cuisine: string;
  mealType: string[];
  difficulty: "Easy" | "Medium" | "Hard";
  cookTimeMinutes: number;
  tags: string[];
  onDelete: (id: string) => void;
};

export default function RecipeCard({ id, image, name, cuisine, mealType, difficulty, cookTimeMinutes, tags, onDelete }: RecipeCardProps) {
  return (
    <article className="group flex min-w-0 flex-col overflow-hidden rounded-2xl bg-white transition-shadow hover:shadow-lg hover:shadow-emerald-950/5">
      <Link to={`/recipe/${id}`} className="recipe-link relative block overflow-hidden" aria-label={`View ${name}`}>
        <RecipeImage key={image} src={image} alt={name} className="recipe-photo aspect-[4/3] w-full object-cover" />
        <span className="absolute bottom-4 left-4 rounded-md bg-[#fafaf6] px-3 py-1.5 text-xs font-semibold">{difficulty}</span>
      </Link>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="mb-2 break-words text-xs font-medium text-emerald-700">{cuisine} · {mealType.join(" / ")}</p>
        <h3 className="display-heading break-words text-2xl"><Link to={`/recipe/${id}`} className="rounded hover:text-emerald-700">{name}</Link></h3>
        <p className="mt-3 flex items-center gap-1.5 text-sm text-emerald-950/70"><ClockIcon size={17} aria-hidden="true" /><span className="tabular-nums">{cookTimeMinutes} min</span><span className="mx-1 text-emerald-950/20">/</span>Cooking time</p>
        {tags.length > 0 && <div className="mt-4 flex flex-wrap gap-1.5">{tags.slice(0, 3).map((tag) => <Tag key={tag}>{tag}</Tag>)}{tags.length > 3 && <Tag>+{tags.length - 3}</Tag>}</div>}
        <div className="mt-auto flex items-center justify-between gap-3 border-t border-emerald-900/10 pt-4">
          <Link to={`/recipe/${id}`} className="inline-flex min-h-11 items-center gap-2 rounded text-sm font-semibold hover:text-emerald-700">View recipe<ArrowUpRightIcon size={17} aria-hidden="true" /></Link>
          <Button variant="tertiary" onClick={() => onDelete(id)} className="size-11 shrink-0 px-0 text-emerald-950/55 hover:bg-rose-50 hover:text-rose-700" aria-label={`Delete ${name}`}><TrashIcon size={19} aria-hidden="true" /></Button>
        </div>
      </div>
    </article>
  );
}
