import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { articles, getArticle, type Block } from "@/lib/articles";
import { site } from "@/lib/site";
import { Icon } from "@/components/ui/Icon";
import { ButtonLink } from "@/components/ui/Button";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return { title: "Article Not Found" };
  return { title: article.title, description: article.excerpt };
}

function renderBlock(block: Block, i: number) {
  if (block.type === "h2") {
    return (
      <h2
        key={i}
        className="mt-10 font-display text-headline-md uppercase text-primary"
      >
        {block.text}
      </h2>
    );
  }
  if (block.type === "ul") {
    return (
      <ul key={i} className="mt-4 space-y-2">
        {block.items.map((item) => (
          <li key={item} className="flex items-start gap-2 text-body-lg text-on-surface-variant">
            <Icon name="check" className="mt-1 text-base text-secondary" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    );
  }
  return (
    <p key={i} className="mt-4 text-body-lg text-on-surface-variant">
      {block.text}
    </p>
  );
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.date,
    author: { "@type": "Organization", name: site.name },
    publisher: { "@type": "Organization", name: site.name },
  };

  return (
    <article className="px-margin-mobile py-10 md:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav className="mb-6 flex items-center gap-2 text-body-sm text-on-surface-variant">
        <Link href="/" className="hover:text-secondary">
          Home
        </Link>
        <Icon name="chevron_right" className="text-sm" />
        <Link href="/resources" className="hover:text-secondary">
          Resources
        </Link>
        <Icon name="chevron_right" className="text-sm" />
        <span className="font-bold text-primary">{article.title}</span>
      </nav>

      <div className="mx-auto max-w-3xl">
        <span className="text-label-bold font-bold uppercase tracking-widest text-secondary">
          {article.category}
        </span>
        <h1 className="mt-2 font-display text-headline-xl uppercase leading-tight text-primary">
          {article.title}
        </h1>
        <p className="mt-3 text-body-sm text-on-surface-variant">
          {new Date(article.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}{" "}
          · {article.readMinutes} min read
        </p>

        <div className="mt-8 border-t border-industrial-gray pt-4">
          {article.body.map(renderBlock)}
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border border-industrial-gray bg-surface-container-highest p-8 md:flex-row md:items-center">
          <div>
            <h2 className="font-display text-headline-sm uppercase text-primary">
              Need help speccing a bag?
            </h2>
            <p className="mt-1 text-body-md text-on-surface-variant">
              Our team will recommend the right configuration for your material.
            </p>
          </div>
          <ButtonLink href="/custom-quote">Request a Quote</ButtonLink>
        </div>
      </div>
    </article>
  );
}
