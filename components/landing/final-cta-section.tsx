import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

interface FinalCTASectionProps {
  headline: string;
  subheadline: string;
  primaryCTA: string;
  secondaryCTA: string;
  trustSignals: string[];
}

export function FinalCTASection({
  headline,
  subheadline,
  primaryCTA,
  secondaryCTA,
  trustSignals,
}: FinalCTASectionProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-primary/5 to-background px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-4xl text-center">
        {/* Headline */}
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
          {headline}
        </h2>

        {/* Subheadline */}
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
          {subheadline}
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button size="lg" className="min-w-[200px] gap-2">
            {primaryCTA}
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button size="lg" variant="outline" className="min-w-[200px]">
            {secondaryCTA}
          </Button>
        </div>

        {/* Trust Signals */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          {trustSignals.map((signal, index) => (
            <Badge key={index} variant="secondary" className="px-4 py-2 text-sm">
              ✓ {signal}
            </Badge>
          ))}
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />
      </div>
    </section>
  );
}
