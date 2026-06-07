import { Hero } from "@/components/Hero";
import { Products } from "@/components/Products";
import { Features } from "@/components/Features";
import { About } from "@/components/About";
import { QuoteForm } from "@/components/QuoteForm";

export default function Home() {
  return (
    <>
      <Hero />
      <Products />
      <Features />
      <About />
      <QuoteForm />
    </>
  );
}
