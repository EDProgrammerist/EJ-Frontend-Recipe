type AuthFormHeaderProps = {
  title: string;
  description: string;
};

export function AuthFormHeader({ title, description }: AuthFormHeaderProps) {
  return (
    <header>
      <h1 className="display-heading text-4xl sm:text-5xl">{title}</h1>
      <p className="mt-4 text-base leading-7 text-emerald-950/70">{description}</p>
    </header>
  );
}
