import { Icon } from "@/components/ui/Icon";

/**
 * Placeholder product visual used until real photography is supplied.
 * Renders a clean industrial "bulk bag" silhouette on a tonal background.
 */
export function ProductImage({
  className = "",
  label,
}: {
  className?: string;
  label?: string;
}) {
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden bg-surface-container-low ${className}`}
    >
      <div className="industrial-grid absolute inset-0 opacity-60" />
      <div className="relative flex flex-col items-center text-outline">
        <Icon name="shopping_bag" className="text-7xl" filled />
        {label && (
          <span className="mt-2 text-label-bold font-bold uppercase tracking-widest text-on-surface-variant">
            {label}
          </span>
        )}
      </div>
    </div>
  );
}
