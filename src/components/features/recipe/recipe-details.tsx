import { useEffect, useState } from "react";


import { getRecipeService, type Recipe } from "@/services/recipe-service";

import RecipeMeta from "@/components/common/recipe-meta";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { RecipeImage } from "@/components/common/recipe-image";
import { PencilSimpleIcon } from "@phosphor-icons/react";
import { Tag } from "@/components/ui/tag";
import UpdateRecipeForm from "@/components/features/recipe/update-recipe-form";

export function RecipeDetails({ id }: { id: string }) {


  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {

    let active = true;
    async function loadRecipe(recipeId: string) {
      try {
        const result = await getRecipeService(recipeId);
        if (active) {
          setRecipe(result);
        }
      } catch {
        if (active) {
          setError("Recipe not found, or you do not have access to it.");
        }
      }
    }

    loadRecipe(id);

    function cleanup() {
      active = false;
    }

    return cleanup;
  }, [id]);

  function openForm() {
    setOpen(true);
  }

  function closeForm() {
    setOpen(false);
  }

  function handleUpdated(updatedRecipe: Recipe) {
    setRecipe(updatedRecipe);
    closeForm();
  }

  return (
    <div className="py-8 sm:py-12">
      {error ? <p role="alert" className="rounded-xl bg-rose-50 p-5 text-sm text-rose-800">{error}</p> : !recipe ? <div role="status"><span className="sr-only">Loading recipe</span><div aria-hidden="true" className="grid gap-8 md:grid-cols-2"><div className="skeleton aspect-[4/3] rounded-2xl" /><div className="space-y-5 py-6"><div className="skeleton h-12 rounded" /><div className="skeleton h-6 w-2/3 rounded" /><div className="skeleton h-32 rounded" /></div></div></div> : <>
        <header className="grid items-center gap-7 md:grid-cols-2 lg:gap-12">
          <RecipeImage key={recipe.image} src={recipe.image} alt={recipe.name} className="aspect-[4/3] w-full rounded-2xl object-cover" />
          <div className="min-w-0">
            <p className="mb-4 text-sm font-medium text-emerald-700">{recipe.cuisine} · {recipe.mealType.join(" / ")}</p>
            <h1 className="display-heading break-words text-4xl lg:text-6xl">{recipe.name}</h1>
            <div className="mt-5 flex flex-wrap gap-2">{recipe.tags.map((tag) => <Tag key={tag}>{tag}</Tag>)}</div>
            <Button className="mt-7" variant="secondary" onClick={openForm}><PencilSimpleIcon size={18} aria-hidden="true" />Edit recipe</Button>
          </div>
        </header>
        <div className="my-8 sm:my-10"><RecipeMeta cuisine={recipe.cuisine} mealType={recipe.mealType} difficulty={recipe.difficulty} cookTimeMinutes={recipe.cookTimeMinutes} /></div>
        <div className="grid items-start gap-10 md:grid-cols-[1fr_1.5fr] lg:gap-16">
          <section className="rounded-2xl bg-white p-6 sm:p-8" aria-labelledby="ingredients-title">
            <h2 id="ingredients-title" className="display-heading text-3xl">Ingredients</h2>
            <p className="mt-2 text-sm text-emerald-950/65">Check them off as you cook.</p>
            <ul className="mt-6 space-y-1">{recipe.ingredients.map((ingredient, index) => <li key={`${ingredient}-${index}`}><label className="flex min-h-12 cursor-pointer items-start gap-3 rounded-lg py-3 text-sm leading-6"><input type="checkbox" className="recipe-check peer mt-0.5 size-5 shrink-0" /><span className="break-words peer-checked:text-emerald-950/40 peer-checked:line-through">{ingredient}</span></label></li>)}</ul>
          </section>
          <section aria-labelledby="instructions-title">
            <h2 id="instructions-title" className="display-heading text-3xl">Let's get cooking.</h2>
            <p className="mt-2 text-sm text-emerald-950/65">One step at a time.</p>
            <ol className="mt-7 space-y-7">{recipe.instructions.map((instruction, index) => <li key={`${instruction}-${index}`} className="flex gap-4"><span aria-hidden="true" className="grid size-9 shrink-0 place-items-center rounded-full bg-emerald-100 text-sm font-semibold tabular-nums">{index + 1}</span><p className="min-w-0 break-words pt-1 text-base leading-7 text-emerald-950/80"><span className="sr-only">Step {index + 1}: </span>{instruction}</p></li>)}</ol>
          </section>
        </div>
        <Modal open={open} onClose={closeForm} title="Make it your own">
          <p className="mb-6 text-sm leading-6 text-emerald-950/70">A little adjustment can make a favorite even better.</p>
          <UpdateRecipeForm recipe={recipe} onSuccess={handleUpdated} />
        </Modal>
      </>}
    </div>
  );
}
