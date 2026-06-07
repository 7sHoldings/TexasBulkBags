import Link from "next/link";
import type { ComponentProps } from "react";

type Variant = "primary" | "secondary" | "outline" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 font-display text-label-bold uppercase tracking-widest transition-colors duration-200 disabled:opacity-60 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  // Solid safety red — primary actions
  primary: "bg-secondary text-on-secondary hover:bg-secondary-container",
  // Solid navy — secondary actions
  secondary: "bg-primary text-on-primary hover:bg-slate-dark",
  // Navy outline
  outline:
    "border-2 border-primary text-primary hover:bg-primary hover:text-on-primary",
  // Text only
  ghost: "text-on-surface-variant hover:text-secondary",
};

const sizes = {
  md: "px-6 py-3",
  lg: "px-8 py-4",
  sm: "px-4 py-2",
};

type CommonProps = {
  variant?: Variant;
  size?: keyof typeof sizes;
  className?: string;
};

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: CommonProps & ComponentProps<"button">) {
  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    />
  );
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: CommonProps & ComponentProps<typeof Link>) {
  return (
    <Link
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    />
  );
}
