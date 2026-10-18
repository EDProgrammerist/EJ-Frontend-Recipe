import { useNavigate } from "react-router";
import { useState, type SubmitEvent } from "react";
import { useAuth } from "@/components/context/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/ui/password-input";
import { ArrowRightIcon } from "@phosphor-icons/react";

function getErrorMessage(error: unknown) {
  if (typeof error === "object" && error !== null && "response" in error) {
    const response = (error as { response?: { data?: { message?: string } } }).response;
    if (response?.data?.message) return response.data.message;
  }
  return "Could not connect to the API. Check that the API server is running.";
}

export function SignupForm() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  // Keep field values in React state; the auth context calls the API service.
  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setBusy(true);
    try {
      const currentUser = await signup(name, email, password);
      // Navigate after the context has received the authenticated user.
      const destination = currentUser.role === "ADMIN" ? "/admin" : "/user";
      navigate(destination, { replace: true });
    } catch (requestError) {
      setError(getErrorMessage(requestError));
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 grid gap-5">
      <div>
        <Label htmlFor="auth-name">Name</Label>
        <Input id="auth-name" autoComplete="name" placeholder="Your name" required minLength={2} value={name} onChange={(event) => setName(event.target.value)} />
      </div>
      <div>
        <Label htmlFor="auth-email">Email</Label>
        <Input id="auth-email" type="email" autoComplete="email" placeholder="you@example.com" required value={email} onChange={(event) => setEmail(event.target.value)} />
      </div>
      <div>
        <Label htmlFor="auth-password">Password</Label>
        <PasswordInput id="auth-password" autoComplete="new-password" placeholder="Create a password" required minLength={8} aria-describedby="password-help" value={password} onChange={(event) => setPassword(event.target.value)} />
      </div>
      <p id="password-help" className="-mt-2 text-xs leading-6 text-emerald-950/65">Use at least 8 characters, including one uppercase letter and one number.</p>
      {error && <p role="alert" className="rounded-lg bg-rose-50 p-3 text-sm leading-6 text-rose-800">{error}</p>}
      <Button type="submit" disabled={busy} className="mt-1 min-h-12 w-full">{busy ? "Creating your account…" : <>Create account<ArrowRightIcon size={18} aria-hidden="true" /></>}</Button>
    </form>
  );
}
