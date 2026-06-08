import Image from "next/image";
import Link from "next/link";

/**
 * Brand lockup.
 * - Header (default): the full Texas Bulk Bags logo image (on the white bar).
 * - Footer (`onDark`): white icon mark + wordmark, since the full logo has a
 *   white background and would show as a box on the navy footer.
 */
export function Logo({
  onDark = false,
  className = "",
}: {
  onDark?: boolean;
  className?: string;
}) {
  if (!onDark) {
    return (
      <Link
        href="/"
        aria-label="Texas Bulk Bags — home"
        className={`flex items-center ${className}`}
      >
        <Image
          src="/logo-full.jpg"
          alt="Texas Bulk Bags"
          width={1280}
          height={853}
          priority
          className="h-12 w-auto sm:h-14"
        />
      </Link>
    );
  }

  return (
    <Link
      href="/"
      aria-label="Texas Bulk Bags — home"
      className={`flex items-center gap-3 ${className}`}
    >
      <Image
        src="/logo-mark-dark.png"
        alt="Texas Bulk Bags logo"
        width={44}
        height={44}
        className="h-11 w-11 shrink-0 object-contain"
      />
      <span className="flex flex-col leading-none">
        <span className="font-display text-xl font-extrabold uppercase leading-none tracking-tight text-white">
          Texas
        </span>
        <span className="mt-0.5 font-display text-[10px] font-bold uppercase leading-none tracking-[0.22em] text-on-primary-container">
          Bulk Bags
        </span>
      </span>
    </Link>
  );
}
