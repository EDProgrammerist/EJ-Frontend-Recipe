import { Table } from "@/components/ui/table";
import { Tag } from "@/components/ui/tag";
import { RecipeImage } from "@/components/common/recipe-image";
import type { AdminRecipe } from "@/services/recipe-service";

export type { AdminRecipe } from "@/services/recipe-service";

type AdminRecipesTableProps = {
  recipes: AdminRecipe[];
  loading: boolean;
};

export function AdminRecipesTable({ recipes, loading }: AdminRecipesTableProps) {
  if (loading) return <div role="status"><span className="sr-only">Loading all recipes</span><div className="space-y-3" aria-hidden="true">{[0, 1, 2].map((item) => <div key={item} className="skeleton h-24 rounded-xl" />)}</div></div>;
  if (!recipes.length) return <div className="rounded-2xl bg-[#eeeee7] px-5 py-16 text-center"><h3 className="display-heading text-3xl">No recipes to show yet.</h3><p className="mt-3 text-sm text-emerald-950/70">Recipes will appear here when a user saves one. If you are searching, try another name.</p></div>;
  return (
    <>
      <div className="space-y-4 md:hidden">{recipes.map((recipe) => <article key={recipe.id} className="rounded-xl bg-white p-5">
        <div className="flex items-center gap-4"><RecipeImage key={recipe.image} src={recipe.image} alt={recipe.name} className="size-16 shrink-0 rounded-lg object-cover" /><div className="min-w-0"><h3 className="break-words text-base font-semibold">{recipe.name}</h3><p className="mt-1 text-sm text-emerald-950/65">{recipe.cuisine} · {recipe.cookTimeMinutes} min</p></div></div>
        <div className="mt-4 flex flex-wrap items-center gap-2"><Tag>{recipe.difficulty}</Tag>{recipe.mealType.map((meal) => <Tag key={meal}>{meal}</Tag>)}</div>
        <p className="mt-4 break-words text-sm text-emerald-950/70">By <span className="font-semibold text-emerald-950">{recipe.ownerName || "Unnamed user"}</span></p>
        <details className="mt-3 text-xs text-emerald-950/65"><summary className="min-h-8 cursor-pointer py-1">Owner details</summary><p className="break-all py-2">ID: {recipe.userId}</p></details>
      </article>)}</div>
      <div className="hidden md:block"><Table>
        <caption className="sr-only">Recipes from all users</caption>
        <thead><tr><th scope="col">Recipe</th><th scope="col">Cuisine</th><th scope="col">Meal type</th><th scope="col">Difficulty</th><th scope="col">Cook time</th><th scope="col">Owner</th></tr></thead>
        <tbody>{recipes.map((recipe) => <tr key={recipe.id}>
          <td><div className="flex min-w-52 items-center gap-3"><RecipeImage key={recipe.image} src={recipe.image} alt={recipe.name} className="size-12 shrink-0 rounded-lg object-cover" /><span className="font-semibold">{recipe.name}</span></div></td>
          <td>{recipe.cuisine}</td><td>{recipe.mealType.join(", ")}</td><td><Tag>{recipe.difficulty}</Tag></td><td className="whitespace-nowrap tabular-nums">{recipe.cookTimeMinutes} mins</td>
          <td><p className="font-medium">{recipe.ownerName || "Unnamed user"}</p><span className="mt-1 block max-w-48 break-all text-xs text-emerald-950/55">{recipe.userId}</span></td>
        </tr>)}</tbody>
      </Table></div>
    </>
  );
}
