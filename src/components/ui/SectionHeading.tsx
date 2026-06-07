export function SectionHeading({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-12 border-l-8 border-secondary pl-6">
      <h2 className="font-display text-headline-lg uppercase text-primary">
        {title}
      </h2>
      {subtitle && (
        <p className="text-body-md text-on-surface-variant">{subtitle}</p>
      )}
    </div>
  );
}
