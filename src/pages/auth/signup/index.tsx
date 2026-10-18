import { AuthFormHeader } from "@/components/features/auth/auth-form-header";
import { Link } from "react-router";
import { SignupForm } from "@/components/features/auth/signup-form";

export default function SignupPage() {
  return (
    <div>
      <AuthFormHeader title="Start your cookbook." description="Keep the recipes you love. Find a little inspiration for what comes next." />
      <SignupForm />
      <p className="mt-8 text-center text-sm text-emerald-950/70">Already have a cookbook? <Link className="rounded font-semibold text-emerald-900 underline decoration-emerald-900/30 underline-offset-4 hover:decoration-emerald-900" to="/auth/login">Sign in</Link></p>
    </div>
  );
}
