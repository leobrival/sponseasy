import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, PlayCircle } from "lucide-react";

interface HeroSectionProps {
  headline: string;
  subheadline: string;
  primaryCTA: string;
  secondaryCTA: string;
  trustBadges: string[];
}

export function HeroSection({
  headline,
  subheadline,
  primaryCTA,
  secondaryCTA,
  trustBadges,
}: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background to-muted/20 px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-5xl text-center">
        {/* Headline */}
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
          {headline}
        </h1>

        {/* Subheadline */}
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl">
          {subheadline}
        </p>

        {/* CTAs */}
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Button size="lg" className="gap-2">
            {primaryCTA}
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button size="lg" variant="outline" className="gap-2">
            <PlayCircle className="h-5 w-5" />
            {secondaryCTA}
          </Button>
        </div>

        {/* Trust Badges */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          {trustBadges.map((badge, index) => (
            <Badge key={index} variant="secondary" className="px-4 py-2 text-sm">
              ✓ {badge}
            </Badge>
          ))}
        </div>

        {/* Hero Visual Placeholder */}
        <div className="mt-16 rounded-xl border bg-muted/50 p-8 shadow-2xl">
          <div className="aspect-video rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
            <p className="text-muted-foreground">Product Screenshot / Video</p>
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
        <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-primary to-primary/30 opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]" />
      </div>
    </section>
  );
}
