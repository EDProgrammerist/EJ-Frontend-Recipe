import { AuthHeader } from "@/components/features/auth/auth-header";
import { Brand } from "@/components/common/brand";
import { Navigate, Outlet } from "react-router";
import { useAuth } from "@/components/context/use-auth";

export default function AuthLayout() {
  const { user, ready } = useAuth();

  if (ready && user) return <Navigate to={user.role === "ADMIN" ? "/admin" : "/user"} replace />;
  return (
    <main className="grid min-h-dvh lg:grid-cols-[1fr_1fr]">
      <aside className="auth-photo relative hidden min-h-dvh overflow-hidden lg:flex lg:items-end">
        <img src="/kitchen.jpg" alt="Salmon, rice, green beans and tomatoes served on a wooden board" className="absolute inset-0 h-full w-full object-cover" />
        <div className="relative z-10 max-w-xl p-12 text-white xl:p-16">
          <p className="mb-5 text-sm font-medium">For the love of a good meal</p>
          <p className="display-heading text-[clamp(3rem,4.5vw,5rem)]">Good food.<br />Great memories.</p>
          <p className="mt-6 max-w-sm text-base leading-7 text-white/90">A home for the dishes you come back to, and the ones you have yet to discover.</p>
          <p className="mt-12 text-xs text-white/80">Food photography · Unsplash</p>
        </div>
      </aside>
      <div className="flex min-w-0 flex-col px-6 py-7 sm:px-12 lg:px-14 xl:px-24">
        <div className="mx-auto w-full max-w-md"><Brand /></div>
        <div className="page-enter mx-auto my-auto w-full max-w-md py-12 sm:py-16">
          <AuthHeader />
          {ready ? <Outlet /> : <div role="status" className="mt-8 space-y-5"><span className="sr-only">Checking your session</span><div className="skeleton h-12 rounded-lg" /><div className="skeleton h-12 rounded-lg" /></div>}
        </div>
        <p className="text-center text-xs leading-6 text-emerald-950/60">Your recipes, all in one place. A little less searching, a little more cooking.</p>
      </div>
    </main>
  );
}
