import Link from "next/link";
import { nav, site } from "@/lib/site";
import { Icon } from "@/components/ui/Icon";
import { NewsletterForm } from "@/components/NewsletterForm";

export function Footer() {
  return (
    <footer className="grid w-full grid-cols-1 gap-8 border-t-4 border-secondary bg-primary-container px-margin-mobile py-12 md:grid-cols-4 md:px-8">
      <div className="space-y-6">
        <h4 className="font-display text-headline-sm font-extrabold uppercase tracking-tight text-surface-container-lowest">
          {site.name}
        </h4>
        <div className="space-y-2 text-body-sm text-on-primary-container">
          <p className="flex items-center gap-2">
            <Icon name="location_on" className="text-base" />
            {site.address}
          </p>
          <p className="flex items-center gap-2">
            <a href={site.phoneHref} className="flex items-center gap-2 hover:text-white">
              <Icon name="call" className="text-base" />
              {site.phone}
            </a>
          </p>
          <p className="flex items-center gap-2">
            <a href={site.emailHref} className="flex items-center gap-2 hover:text-white">
              <Icon name="mail" className="text-base" />
              {site.email}
            </a>
          </p>
          <p className="flex items-center gap-2">
            <Icon name="schedule" className="text-base" />
            {site.hours}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <h5 className="text-label-bold font-bold uppercase tracking-widest text-on-primary-container">
          Explore
        </h5>
        <div className="flex flex-col gap-2">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-label-bold font-bold uppercase tracking-widest text-on-primary-container transition-colors hover:text-secondary-fixed"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h5 className="text-label-bold font-bold uppercase tracking-widest text-on-primary-container">
          Compliance & Standards
        </h5>
        <div className="flex flex-col gap-2">
          {["FIBCA Certified", "UN Rated", "ISO 9001:2015", "Food-Grade / BRC"].map(
            (label) => (
              <span
                key={label}
                className="text-label-bold font-bold uppercase tracking-widest text-on-primary-container opacity-80"
              >
                {label}
              </span>
            ),
          )}
        </div>
      </div>

      <div className="flex flex-col justify-between gap-6">
        <div className="space-y-2">
          <h5 className="text-label-bold font-bold uppercase tracking-widest text-on-primary-container">
            Newsletter
          </h5>
          <NewsletterForm />
        </div>
        <p className="text-body-sm text-on-primary-container opacity-60">
          © {new Date().getFullYear()} {site.name}. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
