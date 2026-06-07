import type { Metadata } from "next";
import { CatalogClient } from "@/components/catalog/CatalogClient";

export const metadata: Metadata = {
  title: "Standard FIBC Bulk Bags — Catalog",
  description:
    "Browse heavy-duty FIBC bulk bags by top style, construction, and safe working load. U-panel, circular, baffle, food-grade, UN-rated and conductive options in stock.",
};

export default function ProductsPage() {
  return <CatalogClient />;
}
