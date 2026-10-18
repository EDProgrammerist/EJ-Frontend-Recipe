import { useEffect, useState } from "react";
import { getAllRecipesService } from "@/services/recipe-service";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MagnifyingGlassIcon, ArrowClockwiseIcon } from "@phosphor-icons/react";
import { AdminRecipesTable, type AdminRecipe } from "./admin-recipes-table";

// This feature owns the recipe request, refresh button, and request state.
export function AdminRecipes() {
  const [recipes, setRecipes] = useState<AdminRecipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reload, setReload] = useState(0);
  const [search, setSearch] = useState("");

  useEffect(function fetchRecipes() {
    let active = true;

    async function loadAllRecipes() {
      setLoading(true);
      setError("");

      try {
        const rows = await getAllRecipesService();
        if (active) {
          setRecipes(rows);
        }
      } catch {
        if (active) {
          setError("Unable to load recipes. Please try again.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadAllRecipes();

    // Ignore late responses after leaving the page or starting a new request.
    function cleanup() {
      active = false;
    }

    return cleanup;
  }, [reload]);

  function handleRefresh() {
    // Changing this value runs the fetching effect again.
    setReload(function incrementReload(currentReload) {
      return currentReload + 1;
    });
  }

  const query = search.trim().toLowerCase();
  const filteredRecipes = recipes.filter((recipe) => [recipe.name, recipe.cuisine, recipe.ownerName || "", recipe.userId].some((value) => value.toLowerCase().includes(query)));

  return (
    <section id="recipe-content" aria-label="All recipes">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div><h2 className="display-heading text-3xl">Recipe directory</h2><p className="mt-2 text-sm text-emerald-950/65" role="status">{loading ? "Gathering recipes…" : `${filteredRecipes.length} of ${recipes.length} recipes across all users`}</p></div>
        <Button variant="secondary" disabled={loading} onClick={handleRefresh}><ArrowClockwiseIcon size={18} className={loading ? "animate-spin" : ""} aria-hidden="true" />{loading ? "Refreshing…" : "Refresh recipes"}</Button>
      </div>
      <div className="relative mb-6 max-w-lg"><MagnifyingGlassIcon size={20} className="pointer-events-none absolute left-3.5 top-3.5 text-emerald-700" aria-hidden="true" /><Input type="search" aria-label="Search all recipes" placeholder="Search recipes, cuisines, or owners…" className="pl-11" value={search} onChange={(event) => setSearch(event.target.value)} /></div>
      {error ? <p role="alert" className="rounded-xl bg-rose-50 p-4 text-rose-800">{error}</p> : <AdminRecipesTable recipes={filteredRecipes} loading={loading} />}
    </section>
  );
}
