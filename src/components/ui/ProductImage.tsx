import Image from "next/image";

/** Outlined illustration of an FIBC bulk bag (lift loops, fill spout, body). */
function BulkBagIllustration({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 240 240"
      fill="none"
      className={className}
      aria-hidden="true"
      stroke="currentColor"
      strokeWidth={6}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Lift loops */}
      <path d="M74 78 C74 44 104 44 104 78" />
      <path d="M136 78 C136 44 166 44 166 78" />
      {/* Fill spout */}
      <path d="M108 62 h24 v18 h-24 z" fill="currentColor" fillOpacity="0.08" />
      {/* Bag body */}
      <path
        d="M62 80 h116 a8 8 0 0 1 8 8 l-6 104 a10 10 0 0 1 -10 9 H70 a10 10 0 0 1 -10 -9 l-6 -104 a8 8 0 0 1 8 -8 z"
        fill="currentColor"
        fillOpacity="0.05"
      />
      {/* Seam panels */}
      <path d="M100 80 L98 201" strokeWidth={3} />
      <path d="M140 80 L142 201" strokeWidth={3} />
      {/* Load label band */}
      <path d="M86 120 h68 v26 h-68 z" strokeWidth={3} fill="currentColor" fillOpacity="0.04" />
      <path d="M96 133 h48" strokeWidth={3} />
    </svg>
  );
}

/**
 * Product visual. Renders a real photo when `src` is supplied; otherwise shows
 * an on-brand bulk-bag illustration placeholder. Drop images into /public and
 * set `Product.image` to switch a product to real photography — no other code
 * changes needed.
 */
export function ProductImage({
  className = "",
  src,
  alt,
  label,
  cover = false,
  position = "center",
}: {
  className?: string;
  src?: string;
  alt?: string;
  label?: string;
  /** Crop to fill the box instead of fitting the whole image. */
  cover?: boolean;
  /** object-position when cover is used (e.g. "top", "center"). */
  position?: string;
}) {
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden ${
        src ? "bg-white" : "bg-surface-container-low"
      } ${className}`}
    >
      {src ? (
        <Image
          src={src}
          alt={alt ?? "Bulk bag product photo"}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className={cover ? "object-cover" : "object-contain"}
          style={cover ? { objectPosition: position } : undefined}
        />
      ) : (
        <>
          <div className="industrial-grid absolute inset-0 opacity-60" />
          <div className="relative flex w-full flex-col items-center text-outline">
            <BulkBagIllustration className="w-2/5 max-w-40" />
            {label && (
              <span className="mt-2 text-label-bold font-bold uppercase tracking-widest text-on-surface-variant">
                {label}
              </span>
            )}
          </div>
        </>
      )}
    </div>
  );
}
