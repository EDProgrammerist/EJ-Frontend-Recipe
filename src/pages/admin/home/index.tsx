import { useState } from "react";
import { useAuth } from "@/components/context/use-auth";
import { PageHeader } from "@/components/common/page-header";
import { AdminRecipes } from "@/components/features/admin/admin-recipes";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";

export default function AdminPage() {
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
      <PageHeader eyebrow="Administration" title="The whole cookbook." description="A clear view of the recipes and the people behind them." image={false}>
        <div className="flex flex-wrap items-center gap-4">
          <span className="hidden max-w-48 truncate sm:block">{user?.name}</span>
          <Button variant="secondary" onClick={handleLogout}>Sign out</Button>
        </div>
      </PageHeader>

      {error && <p role="alert" className="mb-6 text-rose-700">{error}</p>}

      <AdminRecipes />
    </Section>
  );
}
