import Image from "next/image";
import Link from "next/link";

/**
 * Brand lockup using the full Texas Bulk Bags logo.
 * - Header (default): logo on the white bar.
 * - Footer (`onDark`): logo on a white tile, since the artwork has a white
 *   background and would otherwise sit awkwardly on the navy footer.
 */
export function Logo({
  onDark = false,
  className = "",
}: {
  onDark?: boolean;
  className?: string;
}) {
  return (
    <Link
      href="/"
      aria-label="Texas Bulk Bags — home"
      className={`inline-flex ${className}`}
    >
      <span
        className={
          onDark ? "inline-block rounded-md bg-white p-3" : "inline-flex"
        }
      >
        <Image
          src="/logo-full.jpg"
          alt="Texas Bulk Bags"
          width={1280}
          height={853}
          quality={95}
          priority={!onDark}
          className={onDark ? "h-14 w-auto" : "h-14 w-auto sm:h-16"}
        />
      </span>
    </Link>
  );
}
