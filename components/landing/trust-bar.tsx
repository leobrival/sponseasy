interface TrustBarProps {
  tagline: string;
  metrics: Array<{
    value: string;
    label: string;
  }>;
}

export function TrustBar({ tagline, metrics }: TrustBarProps) {
  return (
    <section className="border-y bg-muted/30 px-6 py-12">
      <div className="mx-auto max-w-7xl">
        <p className="text-center text-sm text-muted-foreground sm:text-base">
          {tagline}
        </p>
        <dl className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3">
          {metrics.map((metric, index) => (
            <div key={index} className="flex flex-col items-center">
              <dt className="text-4xl font-bold tracking-tight sm:text-5xl">
                {metric.value}
              </dt>
              <dd className="mt-2 text-sm text-muted-foreground">
                {metric.label}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
