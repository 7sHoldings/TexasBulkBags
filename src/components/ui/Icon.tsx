type IconProps = {
  name: string;
  className?: string;
  filled?: boolean;
};

/** Renders a Google Material Symbols (Outlined) glyph. */
export function Icon({ name, className = "", filled = false }: IconProps) {
  return (
    <span
      aria-hidden="true"
      className={`material-symbols-outlined ${className}`}
      style={filled ? { fontVariationSettings: '"FILL" 1' } : undefined}
    >
      {name}
    </span>
  );
}
