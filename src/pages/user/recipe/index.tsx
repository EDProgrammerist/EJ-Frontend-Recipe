import { Link, useParams } from "react-router";
import { Section } from "@/components/ui/section";
import { RecipeDetails } from "@/components/features/recipe/recipe-details";
import { Brand } from "@/components/common/brand";

export default function RecipePage() {
  const { id } = useParams();

  // The page reads the URL; the feature fetches and displays that recipe.
  return (
    <Section>
      <nav aria-label="Recipe navigation" className="flex flex-wrap items-center justify-between gap-4 border-b border-emerald-900/10 py-6"><Brand />
      <Link to="/user" className="inline-flex min-h-11 items-center rounded text-sm font-medium text-emerald-800 hover:text-emerald-950">
        ← Back to recipes
      </Link>
      </nav>

      {id && <RecipeDetails key={id} id={id} />}
    </Section>
  );
}
