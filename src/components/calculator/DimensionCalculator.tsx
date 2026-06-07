"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";

type System = "imperial" | "metric";

const materials = [
  { name: "Corn", density: 45 },
  { name: "Cement", density: 94 },
  { name: "Fertilizer", density: 60 },
  { name: "Sand", density: 100 },
];

const footprints = [
  { value: 35, label: '35" × 35" (Standard)' },
  { value: 37, label: '37" × 37" (Wide)' },
  { value: 39, label: '39" × 39" (Export)' },
  { value: 42, label: '42" × 42" (Oversize)' },
];

const FREEBOARD = 1.1; // 10% headroom for safe fill

export function DimensionCalculator() {
  const [system, setSystem] = useState<System>("imperial");
  const [payload, setPayload] = useState(2200);
  const [density, setDensity] = useState(55);
  const [footprint, setFootprint] = useState(35);

  const result = useMemo(() => {
    const safePayload = Math.max(0, payload);
    const safeDensity = Math.max(1, density);
    const usableVolume = safePayload / safeDensity; // ft³
    const designVolume = usableVolume * FREEBOARD;
    const areaFt = (footprint / 12) ** 2;
    const heightIn = (designVolume / areaFt) * 12;
    const recommendedSwl = [2200, 3000, 4000].find((s) => s >= safePayload) ?? 4000;
    return {
      totalVolume: designVolume,
      heightIn,
      recommendedSwl,
    };
  }, [payload, density, footprint]);

  const labelUnits =
    system === "imperial"
      ? { payload: "Target Payload (lbs)", density: "Bulk Density (lbs/ft³)" }
      : { payload: "Target Payload (kg)", density: "Bulk Density (kg/m³)" };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      {/* Parameters */}
      <div className="space-y-8 border-r border-industrial-gray px-margin-mobile py-8 md:px-8">
        <div className="border border-industrial-gray bg-white p-6 hard-shadow md:p-8">
          <h2 className="flex items-center gap-3 font-display text-headline-md text-primary">
            <Icon name="tune" className="text-secondary" /> Calculation Parameters
          </h2>

          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="space-y-3">
              <span className="text-label-bold font-bold uppercase text-on-surface-variant">
                Measurement System
              </span>
              <div className="grid grid-cols-2 overflow-hidden border-2 border-industrial-gray">
                {(["imperial", "metric"] as const).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSystem(s)}
                    className={`py-3 text-label-bold font-bold uppercase ${
                      system === s
                        ? "bg-secondary text-on-secondary"
                        : "text-on-surface-variant hover:bg-surface-container-low"
                    }`}
                  >
                    {s === "imperial" ? "Imperial (lbs)" : "Metric (kg)"}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <label
                htmlFor="payload"
                className="block text-label-bold font-bold uppercase text-on-surface-variant"
              >
                {labelUnits.payload}
              </label>
              <input
                id="payload"
                type="number"
                value={payload}
                onChange={(e) => setPayload(Number(e.target.value))}
                className="h-12 w-full border-2 border-industrial-gray px-4 font-sans text-lg outline-none focus:border-secondary"
              />
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="space-y-3">
              <label
                htmlFor="density"
                className="block text-label-bold font-bold uppercase text-on-surface-variant"
              >
                {labelUnits.density}
              </label>
              <input
                id="density"
                type="number"
                value={density}
                onChange={(e) => setDensity(Number(e.target.value))}
                className="h-12 w-full border-2 border-industrial-gray px-4 font-sans text-lg outline-none focus:border-secondary"
              />
            </div>
            <div className="space-y-3">
              <label
                htmlFor="footprint"
                className="block text-label-bold font-bold uppercase text-on-surface-variant"
              >
                Bag Width / Depth (in)
              </label>
              <select
                id="footprint"
                value={footprint}
                onChange={(e) => setFootprint(Number(e.target.value))}
                className="h-12 w-full border-2 border-industrial-gray px-4 font-sans text-lg outline-none focus:border-secondary"
              >
                {footprints.map((f) => (
                  <option key={f.value} value={f.value}>
                    {f.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Material density reference */}
          <div className="mt-8">
            <h3 className="mb-4 text-label-bold font-bold uppercase tracking-widest text-primary">
              Material Density Reference
            </h3>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {materials.map((m) => (
                <div
                  key={m.name}
                  className="flex flex-col justify-between border border-industrial-gray bg-surface-container-low p-4 transition-colors hover:border-secondary"
                >
                  <div>
                    <p className="text-label-bold font-bold text-primary">
                      {m.name.toUpperCase()}
                    </p>
                    <p className="font-sans text-xs text-on-surface-variant">
                      {m.density} lb/ft³
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setDensity(m.density)}
                    className="mt-4 self-start border-b border-transparent text-[10px] font-bold uppercase text-secondary hover:border-secondary"
                  >
                    Use Value
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="bg-surface-container-low px-margin-mobile py-8 md:px-8">
        <div className="flex h-full flex-col border border-industrial-gray bg-white">
          <header className="flex items-center justify-between bg-primary-container p-6 text-white">
            <h2 className="flex items-center gap-3 font-display text-headline-md">
              <Icon name="analytics" className="text-secondary-fixed" /> Calculation
              Results
            </h2>
            <span className="flex items-center gap-2 rounded bg-white/10 px-3 py-1">
              <Icon name="verified" className="text-sm text-success-green" filled />
              <span className="text-[10px] font-bold uppercase">Engineered Spec</span>
            </span>
          </header>

          <div className="flex flex-1 flex-col gap-8 p-6 md:p-8">
            <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2">
              {/* Visual */}
              <div className="flex min-h-[280px] flex-col items-center justify-center border-2 border-dashed border-industrial-gray bg-surface p-8">
                <div className="flex w-40 flex-col items-center">
                  <div className="mb-[-2px] h-6 w-32 rounded-t-full border-2 border-primary bg-white" />
                  <div
                    className="industrial-grid flex w-40 items-end justify-center border-4 border-primary bg-white"
                    style={{ height: 200 }}
                  >
                    <span className="pb-2 font-sans text-mono-spec font-bold text-primary">
                      {result.heightIn.toFixed(1)} in
                    </span>
                  </div>
                </div>
                <p className="mt-4 text-center text-label-bold font-bold uppercase text-on-surface-variant">
                  Visual Volume Approximation
                </p>
              </div>

              {/* Numbers */}
              <div className="space-y-6">
                <div>
                  <p className="text-label-bold font-bold uppercase text-on-surface-variant">
                    Required Bag Height
                  </p>
                  <p className="font-display text-headline-xl text-secondary">
                    {result.heightIn.toFixed(1)}{" "}
                    <span className="text-headline-md">in</span>
                  </p>
                </div>
                <div className="border-t border-industrial-gray pt-4">
                  <p className="text-label-bold font-bold uppercase text-on-surface-variant">
                    Total Volume (10% freeboard)
                  </p>
                  <p className="font-display text-headline-md text-primary">
                    {result.totalVolume.toFixed(1)} ft³
                  </p>
                </div>
                <div className="border-t border-industrial-gray pt-4">
                  <p className="text-label-bold font-bold uppercase text-on-surface-variant">
                    Recommended SWL Rating
                  </p>
                  <p className="font-display text-headline-md text-primary">
                    {result.recommendedSwl.toLocaleString()} lbs
                    <span className="ml-2 text-body-sm text-on-surface-variant">
                      5:1 single-trip
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-auto flex flex-col gap-3 sm:flex-row">
              <Link
                href="/custom-quote"
                className="flex flex-1 items-center justify-center gap-2 bg-secondary px-6 py-4 font-display text-label-bold uppercase tracking-widest text-on-secondary hover:bg-secondary-container"
              >
                <Icon name="request_quote" /> Request This Spec
              </Link>
              <Link
                href="/products"
                className="flex flex-1 items-center justify-center gap-2 border-2 border-primary px-6 py-4 font-display text-label-bold uppercase tracking-widest text-primary hover:bg-primary hover:text-on-primary"
              >
                Browse Catalog
              </Link>
            </div>

            <p className="flex items-start gap-2 border-t border-industrial-gray pt-4 text-body-sm text-on-surface-variant">
              <Icon name="info" className="text-warning-amber" />
              Calculations include a standard 10% freeboard for safe filling.
              Actual capacity may vary based on material flow characteristics and
              filling equipment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
