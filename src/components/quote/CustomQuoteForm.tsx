"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { facets, getProduct } from "@/lib/products";
import { Icon } from "@/components/ui/Icon";

type Status = "idle" | "submitting" | "success" | "error";

const bodyStyles = facets.construction;
const topStyles = ["Duffle Top", "Spout Top", "Open Top", "Flap Top"];
const bottomStyles = ["Spout Bottom", "Flat Bottom", "Full-Open Bottom"];
const swlOptions = [2200, 3000, 4000];
const fabricAttributes = [
  "Coated / Laminated",
  "Sift-Proof Seams",
  "Document Pouch",
  "UV Stabilized",
];
const linerOptions = [
  "Polyethylene (PE) Liner",
  "Foil / Barrier Liner",
  "Form-Fit Liner",
];

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="mb-2 block text-label-bold font-bold uppercase text-primary">
      {children}
    </label>
  );
}

const inputClass =
  "w-full border border-industrial-gray bg-white px-3 py-3 text-body-md outline-none focus:border-primary focus:ring-2 focus:ring-primary/20";

export function CustomQuoteForm() {
  const params = useSearchParams();
  const prefill = getProduct(params.get("product") ?? "");

  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [bodyStyle, setBodyStyle] = useState(prefill?.construction ?? "U-Panel");
  const [swl, setSwl] = useState(prefill?.swl ?? 3000);
  const [safetyFactor, setSafetyFactor] = useState<"5:1" | "6:1">("5:1");
  const [fileName, setFileName] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError(null);

    const form = e.currentTarget;
    const fd = new FormData(form);
    const data = {
      ...Object.fromEntries(fd.entries()),
      bodyStyle,
      swl,
      safetyFactor,
      fabricAttributes: fd.getAll("fabric"),
      liners: fd.getAll("liner"),
      sourceProduct: prefill?.sku ?? null,
      attachment: fileName,
    };

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error ?? "Something went wrong. Please try again.");
      }
      setStatus("success");
      form.reset();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Unexpected error.");
    }
  }

  if (status === "success") {
    return (
      <div className="border border-industrial-gray bg-white p-12 text-center hard-shadow">
        <div className="mx-auto flex h-16 w-16 items-center justify-center bg-secondary">
          <Icon name="check" className="text-4xl text-white" />
        </div>
        <h2 className="mt-6 font-display text-headline-lg uppercase text-primary">
          Quote Request Received
        </h2>
        <p className="mx-auto mt-3 max-w-md text-body-md text-on-surface-variant">
          Our engineering team will review your specifications and respond with a
          formal proposal within 24 business hours.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 border-2 border-primary px-6 py-3 text-label-bold font-bold uppercase tracking-widest text-primary hover:bg-primary hover:text-on-primary"
        >
          Submit Another Request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Honeypot */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />
      {prefill && (
        <div className="flex items-center gap-2 border border-secondary bg-secondary/5 px-4 py-3 text-body-sm text-primary">
          <Icon name="info" className="text-secondary" />
          Pre-filled from <strong>{prefill.name}</strong> ({prefill.sku}). Adjust
          anything below.
        </div>
      )}

      {/* Contact information */}
      <fieldset className="border border-industrial-gray bg-white p-6 hard-shadow">
        <legend className="flex items-center gap-2 px-2 font-display text-headline-sm uppercase text-primary">
          <Icon name="badge" className="text-secondary" /> Contact Information
        </legend>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <Label>Full Name *</Label>
            <input name="name" required placeholder="e.g. John Doe" className={inputClass} />
          </div>
          <div>
            <Label>Company Name</Label>
            <input name="company" placeholder="e.g. Texas Ag Supply" className={inputClass} />
          </div>
          <div>
            <Label>Email Address *</Label>
            <input
              name="email"
              type="email"
              required
              placeholder="j.doe@company.com"
              className={inputClass}
            />
          </div>
          <div>
            <Label>Phone Number</Label>
            <input
              name="phone"
              type="tel"
              placeholder="+1 (555) 000-0000"
              className={inputClass}
            />
          </div>
          <div>
            <Label>Industry Sector</Label>
            <select name="industry" defaultValue="Agriculture" className={inputClass}>
              <option>Agriculture</option>
              <option>Chemical Manufacturing</option>
              <option>Construction / Mining</option>
              <option>Food & Ingredients</option>
              <option>Oil & Gas</option>
              <option>Waste Management</option>
              <option>Other</option>
            </select>
          </div>
        </div>
      </fieldset>

      {/* Bag construction */}
      <fieldset className="border border-industrial-gray bg-white p-6 hard-shadow">
        <legend className="flex items-center gap-2 px-2 font-display text-headline-sm uppercase text-primary">
          <Icon name="dashboard" className="text-secondary" /> Bag Construction
        </legend>
        <Label>Body Style</Label>
        <div className="mb-6 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {bodyStyles.map((style) => (
            <button
              key={style}
              type="button"
              onClick={() => setBodyStyle(style)}
              className={`border px-3 py-3 text-body-sm font-bold uppercase transition-colors ${
                bodyStyle === style
                  ? "border-2 border-primary bg-surface-container-low text-primary"
                  : "border-industrial-gray text-on-surface-variant hover:border-primary"
              }`}
            >
              {style}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <Label>Top Style</Label>
            <select name="topStyle" defaultValue={topStyles[0]} className={inputClass}>
              {topStyles.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>
          <div>
            <Label>Bottom Style</Label>
            <select name="bottomStyle" defaultValue={bottomStyles[0]} className={inputClass}>
              {bottomStyles.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>
      </fieldset>

      {/* Dimensions & load rating */}
      <fieldset className="border border-industrial-gray bg-white p-6 hard-shadow">
        <legend className="flex items-center gap-2 px-2 font-display text-headline-sm uppercase text-primary">
          <Icon name="straighten" className="text-secondary" /> Dimensions & Load
          Rating
        </legend>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label>Width (in)</Label>
            <input name="width" type="number" defaultValue={35} className={inputClass} />
          </div>
          <div>
            <Label>Length (in)</Label>
            <input name="length" type="number" defaultValue={35} className={inputClass} />
          </div>
          <div>
            <Label>Height (in)</Label>
            <input name="height" type="number" defaultValue={40} className={inputClass} />
          </div>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <Label>Safe Working Load (SWL)</Label>
            <div className="grid grid-cols-3 border border-industrial-gray">
              {swlOptions.map((opt, i) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setSwl(opt)}
                  className={`py-3 text-body-sm font-bold ${
                    i > 0 ? "border-l border-industrial-gray" : ""
                  } ${
                    swl === opt
                      ? "bg-primary text-on-primary"
                      : "text-on-surface-variant hover:bg-surface-container-low"
                  }`}
                >
                  {opt.toLocaleString()} LBS
                </button>
              ))}
            </div>
          </div>
          <div>
            <Label>Safety Factor</Label>
            <div className="grid grid-cols-2 border border-industrial-gray">
              {(["5:1", "6:1"] as const).map((sf, i) => (
                <button
                  key={sf}
                  type="button"
                  onClick={() => setSafetyFactor(sf)}
                  className={`py-3 text-body-sm font-bold ${
                    i > 0 ? "border-l border-industrial-gray" : ""
                  } ${
                    safetyFactor === sf
                      ? "bg-primary text-on-primary"
                      : "text-on-surface-variant hover:bg-surface-container-low"
                  }`}
                >
                  {sf} {sf === "6:1" ? "UN" : ""}
                </button>
              ))}
            </div>
          </div>
        </div>
      </fieldset>

      {/* Material & safety */}
      <fieldset className="border border-industrial-gray bg-white p-6 hard-shadow">
        <legend className="flex items-center gap-2 px-2 font-display text-headline-sm uppercase text-primary">
          <Icon name="shield" className="text-secondary" /> Material & Safety
        </legend>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          <div>
            <Label>Fabric Attributes</Label>
            <div className="space-y-3">
              {fabricAttributes.map((attr) => (
                <label key={attr} className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    name="fabric"
                    value={attr}
                    className="h-4 w-4 rounded-none accent-secondary"
                  />
                  <span className="text-body-md">{attr}</span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <Label>Liner Options</Label>
            <div className="space-y-3">
              {linerOptions.map((opt) => (
                <label key={opt} className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    name="liner"
                    value={opt}
                    className="h-4 w-4 rounded-none accent-secondary"
                  />
                  <span className="text-body-md">{opt}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </fieldset>

      {/* Details + technical drawings */}
      <fieldset className="border border-industrial-gray bg-white p-6 hard-shadow">
        <legend className="flex items-center gap-2 px-2 font-display text-headline-sm uppercase text-primary">
          <Icon name="description" className="text-secondary" /> Additional Details
        </legend>
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <Label>Estimated Quantity</Label>
              <input name="quantity" placeholder="e.g. 500 units" className={inputClass} />
            </div>
            <div>
              <Label>Needed By</Label>
              <input name="timeline" placeholder="e.g. within 3 weeks" className={inputClass} />
            </div>
          </div>
          <div>
            <Label>Material & Notes</Label>
            <textarea
              name="message"
              rows={3}
              placeholder="Material being stored, print/branding, certifications, delivery details…"
              className={inputClass}
            />
          </div>
          <div>
            <Label>Technical Drawings (optional)</Label>
            <label className="flex cursor-pointer flex-col items-center justify-center gap-2 border-2 border-dashed border-industrial-gray bg-surface-container-low p-8 text-center hover:border-primary">
              <Icon name="cloud_upload" className="text-3xl text-outline" />
              <span className="text-body-sm text-on-surface-variant">
                {fileName ?? "Drag & drop or browse — PDF, DXF, JPG up to 25MB"}
              </span>
              <input
                type="file"
                className="hidden"
                accept=".pdf,.dxf,.jpg,.jpeg,.png"
                onChange={(e) => setFileName(e.target.files?.[0]?.name ?? null)}
              />
            </label>
          </div>
        </div>
      </fieldset>

      {error && (
        <p className="text-body-sm text-error-red" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="flex w-full items-center justify-center gap-2 bg-secondary py-5 font-display text-headline-sm uppercase tracking-widest text-on-secondary transition-colors hover:bg-secondary-container disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : "Submit Quote Request"}
        <Icon name="send" />
      </button>
      <p className="text-center text-body-sm text-on-surface-variant">
        By submitting, you agree to our terms of manufacturing and privacy policy.
      </p>
    </form>
  );
}
