type RecipeMetaProps = {
  cuisine: string;
  mealType: string[];
  difficulty: string;
  cookTimeMinutes: number;
};

export default function RecipeMeta({ cuisine, mealType, difficulty, cookTimeMinutes }: RecipeMetaProps) {
  return (
    <dl className="grid grid-cols-2 gap-5 rounded-xl bg-[#eeeee7] p-5 text-sm sm:grid-cols-4">
      <div className="min-w-0"><dt className="text-xs text-emerald-950/60">Cuisine</dt><dd className="mt-1.5 break-words font-semibold">{cuisine}</dd></div>
      <div className="min-w-0"><dt className="text-xs text-emerald-950/60">Meal type</dt><dd className="mt-1.5 break-words font-semibold">{mealType.join(", ")}</dd></div>
      <div><dt className="text-xs text-emerald-950/60">Difficulty</dt><dd className="mt-1.5 font-semibold">{difficulty}</dd></div>
      <div><dt className="text-xs text-emerald-950/60">Cook time</dt><dd className="mt-1.5 font-semibold tabular-nums">{cookTimeMinutes} mins</dd></div>
    </dl>
  );
}
