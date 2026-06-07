import type { Metadata } from "next";
import { QuoteListClient } from "@/components/quote/QuoteListClient";

export const metadata: Metadata = {
  title: "Quote List",
  description:
    "Review the bulk bags on your quote list and submit them for volume pricing.",
};

export default function QuoteListPage() {
  return <QuoteListClient />;
}
