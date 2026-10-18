import { AuthFormHeader } from "@/components/features/auth/auth-form-header";
import { Link } from "react-router";
import { LoginForm } from "@/components/features/auth/login-form";

export default function LoginPage() {
  return (
    <div>
      <AuthFormHeader title="Welcome back." description="Your next favorite meal is waiting. Make yourself at home." />
      <LoginForm />
      <p className="mt-8 text-center text-sm text-emerald-950/70">New to Recipe Book? <Link className="rounded font-semibold text-emerald-900 underline decoration-emerald-900/30 underline-offset-4 hover:decoration-emerald-900" to="/auth/signup">Create an account</Link></p>
    </div>
  );
}
