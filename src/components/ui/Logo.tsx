import Image from "next/image";
import Link from "next/link";

/**
 * Brand lockup: the Texas Bulk Bags icon mark paired with the wordmark.
 * `onDark` switches to the white icon + light wordmark for the navy footer.
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
      className={`flex items-center gap-3 ${className}`}
    >
      <Image
        src={onDark ? "/logo-mark-dark.png" : "/logo-mark.png"}
        alt="Texas Bulk Bags logo"
        width={44}
        height={44}
        priority
        className="h-11 w-11 object-contain"
      />
      <span className="flex flex-col leading-none">
        <span
          className={`font-display text-xl font-extrabold uppercase leading-none tracking-tight ${
            onDark ? "text-white" : "text-primary"
          }`}
        >
          Texas
        </span>
        <span
          className={`mt-0.5 font-display text-[10px] font-bold uppercase leading-none tracking-[0.22em] ${
            onDark ? "text-on-primary-container" : "text-on-surface-variant"
          }`}
        >
          Bulk Bags
        </span>
      </span>
    </Link>
  );
}
