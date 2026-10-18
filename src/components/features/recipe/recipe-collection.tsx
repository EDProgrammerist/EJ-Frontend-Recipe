import { useEffect, useState } from "react";
import { useAuth } from "@/components/context/use-auth";
import { deleteRecipeService, getRecipesService, type Recipe } from "@/services/recipe-service";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { BookOpenIcon, MagnifyingGlassIcon, PlusIcon, ArrowClockwiseIcon } from "@phosphor-icons/react";
import RecipeCard from "@/components/features/recipe/recipe-card";
import AddRecipeForm from "@/components/features/recipe/add-recipe-form";
import { Navigate } from "react-router";

export function RecipeCollection() {
  const { user, ready } = useAuth();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(0);
  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [sort, setSort] = useState("saved");
  const [pendingDelete, setPendingDelete] = useState<Recipe | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  useEffect(function fetchRecipes() {
    if (!ready || !user) return;
    let active = true;
    async function loadRecipes() {
      setLoading(true);
      try {
        const result = await getRecipesService();
        if (active) { setRecipes(result); setError(""); }
      } catch {
        if (active) setError("Unable to load recipes. Please try again.");
      } finally {
        if (active) setLoading(false);
      }
    }
    loadRecipes();
    return () => { active = false; };
  }, [ready, user, reload]);

  async function handleDelete() {
    if (!pendingDelete || deleting) return;
    setDeleteError("");
    setDeleting(true);
    try {
      await deleteRecipeService(pendingDelete.id);
      setRecipes((current) => current.filter((recipe) => recipe.id !== pendingDelete.id));
      setPendingDelete(null);
      setError("");
    } catch {
      setDeleteError("Unable to delete this recipe. Please try again.");
    } finally {
      setDeleting(false);
    }
  }

  if (!ready) return null;
  if (!user) return <Navigate to="/auth/login" replace />;

  const query = search.trim().toLowerCase();
  const filteredRecipes = recipes.filter((recipe) =>
    (!difficulty || recipe.difficulty === difficulty)
    && [recipe.name, recipe.cuisine, ...recipe.tags, ...recipe.ingredients].some((value) => value.toLowerCase().includes(query)),
  ).sort((first, second) => sort === "name" ? first.name.localeCompare(second.name) : sort === "time" ? first.cookTimeMinutes - second.cookTimeMinutes : 0);
  const hasFilters = Boolean(query || difficulty);

  function clearFilters() { setSearch(""); setDifficulty(""); }
  function handleCreated(newRecipe: Recipe) {
    setRecipes((current) => [newRecipe, ...current]);
    clearFilters();
    setOpen(false);
  }

  return (
    <section id="recipe-content" aria-labelledby="collection-title" className="pb-8">
      <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 id="collection-title" className="display-heading text-3xl sm:text-4xl">Your recipe collection</h2>
          <p className="mt-2 text-sm text-emerald-950/65" aria-live="polite">{loading ? "Gathering your favorites…" : `${recipes.length} saved ${recipes.length === 1 ? "recipe" : "recipes"}. A little inspiration for your next meal.`}</p>
        </div>
        <Button onClick={() => setOpen(true)} className="w-full sm:w-auto"><PlusIcon size={18} aria-hidden="true" />Add recipe</Button>
      </div>

      <div className="mb-7 grid gap-3 rounded-2xl bg-[#eeeee7] p-3 sm:grid-cols-[1fr_10rem_11rem] sm:p-4">
        <div className="relative">
          <MagnifyingGlassIcon className="pointer-events-none absolute left-3.5 top-3.5 text-emerald-700" size={20} aria-hidden="true" />
          <Input aria-label="Search your recipes" placeholder="Search recipes, ingredients, cuisines…" value={search} onChange={(event) => setSearch(event.target.value)} className="pl-11" type="search" />
        </div>
        <Select aria-label="Filter by difficulty" value={difficulty} onChange={(event) => setDifficulty(event.target.value)}><option value="">All difficulties</option><option>Easy</option><option>Medium</option><option>Hard</option></Select>
        <Select aria-label="Sort recipes" value={sort} onChange={(event) => setSort(event.target.value)}><option value="saved">Default order</option><option value="name">Name: A–Z</option><option value="time">Quickest first</option></Select>
      </div>

      {error && <div role="alert" className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-rose-50 p-4 text-sm text-rose-800"><p>{error}</p><Button variant="secondary" disabled={loading} onClick={() => setReload((current) => current + 1)}><ArrowClockwiseIcon size={17} aria-hidden="true" />Try again</Button></div>}

      {loading ? <div role="status"><span className="sr-only">Loading recipes</span><div aria-hidden="true" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{[0, 1, 2].map((item) => <div key={item} className="overflow-hidden rounded-2xl bg-white"><div className="skeleton aspect-[4/3]" /><div className="space-y-4 p-5"><div className="skeleton h-6 w-3/4 rounded" /><div className="skeleton h-4 w-1/2 rounded" /><div className="skeleton h-10 rounded" /></div></div>)}</div></div>
        : filteredRecipes.length ? <>
          {hasFilters && <div className="mb-5 flex items-center justify-between gap-3 text-sm"><p role="status">{filteredRecipes.length} matching {filteredRecipes.length === 1 ? "recipe" : "recipes"}</p><Button variant="tertiary" onClick={clearFilters}>Clear filters</Button></div>}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{filteredRecipes.map((recipe) => <RecipeCard key={recipe.id} {...recipe} onDelete={() => { setDeleteError(""); setPendingDelete(recipe); }} />)}</div>
        </> : !error && <div className="rounded-2xl bg-[#eeeee7] px-5 py-14 text-center sm:py-20">
          <span className="mx-auto mb-5 grid size-16 place-items-center rounded-2xl bg-[#e0e6d8] text-emerald-700"><BookOpenIcon size={32} weight="duotone" aria-hidden="true" /></span>
          <h3 className="display-heading text-3xl">{hasFilters ? "No recipes on this page." : "Every cookbook starts somewhere."}</h3>
          <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-emerald-950/70">{hasFilters ? "Try a different ingredient or clear your filters to see all your favorites." : "A family classic, a weeknight staple, or something new. Make it the first recipe in your collection."}</p>
          <Button className="mt-6" onClick={hasFilters ? clearFilters : () => setOpen(true)}>{hasFilters ? "Clear filters" : "Add your first recipe"}</Button>
        </div>}

      <Modal open={open} onClose={() => setOpen(false)} title="A new favorite">
        <p className="mb-6 text-sm leading-6 text-emerald-950/70">Give your recipe a home. Add the details you will want next time you cook.</p>
        <AddRecipeForm onSuccess={handleCreated} />
      </Modal>
      <Modal open={Boolean(pendingDelete)} onClose={() => { if (!deleting) setPendingDelete(null); }} title="Remove this recipe?">
        <p className="break-words leading-7 text-emerald-950/75">“{pendingDelete?.name}” will be permanently removed from your collection. This cannot be undone.</p>
        {deleteError && <p role="alert" className="mt-4 rounded-lg bg-rose-50 p-3 text-sm text-rose-800">{deleteError}</p>}
        <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Button variant="secondary" disabled={deleting} onClick={() => setPendingDelete(null)}>Keep recipe</Button>
          <Button disabled={deleting} onClick={handleDelete} className="bg-rose-700 hover:bg-rose-800">{deleting ? "Removing…" : "Remove recipe"}</Button>
        </div>
      </Modal>
    </section>
  );
}
