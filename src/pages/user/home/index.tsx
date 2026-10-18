import { useState } from "react";
import { useAuth } from "@/components/context/use-auth";
import { PageHeader } from "@/components/common/page-header";
import { RecipeCollection } from "@/components/features/recipe/recipe-collection";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  const { user, logout } = useAuth();
  const [error, setError] = useState("");

  async function handleLogout() {
    try {
      setError("");
      await logout();
    } catch {
      setError("Unable to sign out. Please try again.");
    }
  }

  return (
    <Section>
      <PageHeader eyebrow="Your personal cookbook" title="A place for your favorites." description="The family classics. The weeknight wins. Keep the recipes you love, ready for the next time you cook.">
        <div className="flex flex-wrap items-center gap-4">
          <span className="hidden max-w-48 truncate text-emerald-950/70 sm:block">Hello, {user?.name}</span>
          <Button variant="secondary" onClick={handleLogout}>Sign out</Button>
        </div>
      </PageHeader>

      {error && <p role="alert" className="mb-6 text-rose-700">{error}</p>}

      <RecipeCollection />
    </Section>
  );
}
