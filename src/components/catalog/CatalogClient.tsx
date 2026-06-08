"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { facets, products as allProducts, standardFibc } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { Icon } from "@/components/ui/Icon";

type Sort = "capacity" | "price" | "volume";

type Filters = {
  capacity: number[]; // minimum SWL thresholds
  footprint: number[]; // bag width (in)
};

const emptyFilters: Filters = { capacity: [], footprint: [] };

function FilterGroup({
  title,
  options,
  selected,
  onToggle,
  render,
}: {
  title: string;
  options: (string | number)[];
  selected: (string | number)[];
  onToggle: (value: string | number) => void;
  render?: (v: string | number) => string;
}) {
  return (
    <div>
      <h3 className="mb-4 text-label-bold font-bold uppercase text-primary">
        {title}
      </h3>
      <div className="space-y-3">
        {options.map((opt) => (
          <label
            key={String(opt)}
            className="group flex cursor-pointer items-center gap-3"
          >
            <input
              type="checkbox"
              checked={selected.includes(opt)}
              onChange={() => onToggle(opt)}
              className="h-4 w-4 rounded-none border-industrial-gray text-secondary accent-secondary focus:ring-secondary"
            />
            <span className="text-body-md transition-colors group-hover:text-secondary">
              {render ? render(opt) : opt}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}

export function CatalogClient() {
  const [filters, setFilters] = useState<Filters>(emptyFilters);
  const [sort, setSort] = useState<Sort>("capacity");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  function toggle(key: keyof Filters, value: string | number) {
    setFilters((prev) => {
      const list = prev[key];
      const num = Number(value);
      const next = list.includes(num)
        ? list.filter((v) => v !== num)
        : [...list, num];
      return { ...prev, [key]: next };
    });
  }

  const filtered = useMemo(() => {
    const result = allProducts.filter((p) => {
      if (filters.capacity.length && p.swl < Math.min(...filters.capacity)) {
        return false;
      }
      if (filters.footprint.length && !filters.footprint.includes(p.baseFootprint)) {
        return false;
      }
      return true;
    });

    return [...result].sort((a, b) => {
      if (sort === "capacity") return b.swl - a.swl;
      if (sort === "price") return a.priceFrom - b.priceFrom;
      return (b.volumeFt3 ?? 0) - (a.volumeFt3 ?? 0);
    });
  }, [filters, sort]);

  const activeChips: { key: keyof Filters; value: number; label: string }[] = [
    ...filters.capacity.map((v) => ({
      key: "capacity" as const,
      value: v,
      label: `SWL ≥ ${v.toLocaleString()} lbs`,
    })),
    ...filters.footprint.map((v) => ({
      key: "footprint" as const,
      value: v,
      label: `${v}" wide`,
    })),
  ];

  const hasFilters = activeChips.length > 0;

  const sidebar = (
    <div className="space-y-8 p-6">
      <FilterGroup
        title="Min Capacity (SWL)"
        options={facets.capacity}
        selected={filters.capacity}
        onToggle={(v) => toggle("capacity", v)}
        render={(v) => `${Number(v).toLocaleString()} lbs+`}
      />
      <FilterGroup
        title="Bag Width"
        options={facets.footprint}
        selected={filters.footprint}
        onToggle={(v) => toggle("footprint", v)}
        render={(v) => `${v}"`}
      />
      <button
        type="button"
        onClick={() => setFilters(emptyFilters)}
        className="w-full border border-secondary py-3 text-label-bold font-bold uppercase tracking-widest text-secondary transition-all hover:bg-secondary hover:text-white"
      >
        Clear All Filters
      </button>
    </div>
  );

  return (
    <div className="flex">
      {/* Desktop sidebar */}
      <aside className="sticky top-20 hidden h-[calc(100vh-5rem)] w-80 shrink-0 overflow-y-auto border-r border-industrial-gray bg-surface-container-lowest lg:block">
        <div className="border-b border-industrial-gray p-6">
          <h2 className="mb-2 font-display text-headline-sm uppercase tracking-tight text-secondary">
            Filters
          </h2>
          <p className="text-body-sm text-on-surface-variant">
            Refine by capacity and size
          </p>
        </div>
        {sidebar}
      </aside>

      <div className="min-w-0 flex-1 px-margin-mobile py-8 md:px-8">
        {/* Breadcrumb + header */}
        <nav className="mb-4 flex items-center gap-2 text-body-sm text-on-surface-variant">
          <Link href="/" className="hover:text-secondary">
            Home
          </Link>
          <Icon name="chevron_right" className="text-sm" />
          <span className="font-bold text-primary">Bulk Bags</span>
        </nav>
        <div className="flex flex-col items-start justify-between gap-4 border-b-2 border-primary pb-6 md:flex-row md:items-end">
          <div>
            <h1 className="font-display text-headline-xl leading-tight text-primary">
              Standard FIBC Bulk Bags
            </h1>
            <p className="max-w-2xl text-body-lg text-on-surface-variant">
              {standardFibc.tagline} Heavy-duty bags for agriculture, chemical,
              construction, and more — in stock and built to your spec.
            </p>
            <p className="mt-2 font-display text-headline-sm text-secondary">
              ${standardFibc.priceMin.toFixed(2)} – ${standardFibc.priceMax.toFixed(2)}
              <span className="ml-1 text-body-sm font-normal text-on-surface-variant">
                / bag
              </span>
            </p>
          </div>
          <div className="flex items-center gap-4">
            <label
              htmlFor="sort"
              className="text-label-bold font-bold uppercase text-on-surface-variant"
            >
              Sort by:
            </label>
            <select
              id="sort"
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              className="border border-industrial-gray bg-white px-4 py-2 text-body-md outline-none focus:ring-2 focus:ring-secondary"
            >
              <option value="capacity">Capacity: High to Low</option>
              <option value="price">Price: Low to High</option>
              <option value="volume">Volume: High to Low</option>
            </select>
          </div>
        </div>

        {/* Mobile filter toggle */}
        <button
          type="button"
          onClick={() => setMobileFiltersOpen((v) => !v)}
          className="mt-6 flex w-full items-center justify-center gap-2 border border-primary py-3 text-label-bold font-bold uppercase tracking-widest text-primary lg:hidden"
        >
          <Icon name="tune" /> {mobileFiltersOpen ? "Hide" : "Show"} Filters
        </button>
        {mobileFiltersOpen && (
          <div className="mt-2 border border-industrial-gray bg-white lg:hidden">
            {sidebar}
          </div>
        )}

        {/* Active chips */}
        <div className="mt-6 flex flex-wrap items-center gap-2">
          {hasFilters ? (
            activeChips.map((chip) => (
              <button
                key={`${chip.key}-${chip.value}`}
                type="button"
                onClick={() => toggle(chip.key, chip.value)}
                className="flex items-center gap-2 rounded border border-outline-variant bg-surface-container-high px-3 py-1"
              >
                <span className="text-label-bold font-bold text-primary">
                  {chip.label}
                </span>
                <Icon name="close" className="text-sm hover:text-secondary" />
              </button>
            ))
          ) : (
            <span className="text-body-sm text-on-surface-variant">
              Showing all {filtered.length} sizes
            </span>
          )}
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        ) : (
          <div className="mt-12 border border-industrial-gray bg-white p-12 text-center">
            <Icon name="search_off" className="text-5xl text-outline" />
            <p className="mt-4 text-body-lg text-on-surface-variant">
              No bags match these filters.
            </p>
            <button
              type="button"
              onClick={() => setFilters(emptyFilters)}
              className="mt-4 text-label-bold font-bold uppercase tracking-widest text-secondary"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
