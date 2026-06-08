import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { Icon } from "@/components/ui/Icon";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Texas Bulk Bags",
  description:
    "Get in touch with Texas Bulk Bags in Kerens, TX. Call, email, or send us a message for FIBC bulk bag quotes and support.",
};

const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
  "1001 NW 2nd St, Kerens, TX 75144",
)}&output=embed`;

export default function ContactPage() {
  return (
    <div className="px-margin-mobile py-10 md:px-8">
      <div className="mb-10 border-l-8 border-secondary pl-6">
        <h1 className="font-display text-headline-xl uppercase text-primary">
          Contact Us
        </h1>
        <p className="mt-2 max-w-2xl text-body-lg text-on-surface-variant">
          Questions, quotes, or technical support — our Texas team is ready to
          help.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <a
              href={site.phoneHref}
              className="border border-industrial-gray bg-white p-6 hard-shadow hover:border-secondary"
            >
              <Icon name="call" className="text-2xl text-secondary" />
              <h2 className="mt-2 text-label-bold font-bold uppercase text-on-surface-variant">
                Phone
              </h2>
              <p className="font-display text-headline-sm text-primary">
                {site.phone}
              </p>
            </a>
            <a
              href={site.emailHref}
              className="border border-industrial-gray bg-white p-6 hard-shadow hover:border-secondary"
            >
              <Icon name="mail" className="text-2xl text-secondary" />
              <h2 className="mt-2 text-label-bold font-bold uppercase text-on-surface-variant">
                Email
              </h2>
              <p className="font-display text-headline-sm text-primary">
                {site.email}
              </p>
            </a>
            <div className="border border-industrial-gray bg-white p-6 hard-shadow">
              <Icon name="location_on" className="text-2xl text-secondary" />
              <h2 className="mt-2 text-label-bold font-bold uppercase text-on-surface-variant">
                Address
              </h2>
              <p className="text-body-md text-primary">{site.address}</p>
            </div>
            <div className="border border-industrial-gray bg-white p-6 hard-shadow">
              <Icon name="schedule" className="text-2xl text-secondary" />
              <h2 className="mt-2 text-label-bold font-bold uppercase text-on-surface-variant">
                Hours
              </h2>
              <p className="text-body-md text-primary">{site.hours}</p>
            </div>
          </div>

          <div className="overflow-hidden border border-industrial-gray hard-shadow">
            <iframe
              title="Texas Bulk Bags location map"
              src={mapSrc}
              className="h-64 w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        <ContactForm />
      </div>
    </div>
  );
}
