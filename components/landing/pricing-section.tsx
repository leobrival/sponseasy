import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

interface PricingTier {
  name: string;
  price: number;
  period: string;
  description: string;
  features: string[];
  cta: string;
  highlighted: boolean;
  badge?: string;
}

interface PricingSectionProps {
  headline: string;
  subheadline: string;
  tiers: PricingTier[];
  additionalInfo: string[];
}

export function PricingSection({
  headline,
  subheadline,
  tiers,
  additionalInfo,
}: PricingSectionProps) {
  return (
    <section id="pricing" className="px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            {headline}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">{subheadline}</p>
        </div>

        {/* Pricing Tiers */}
        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {tiers.map((tier, index) => (
            <Card
              key={index}
              className={`relative flex flex-col ${
                tier.highlighted
                  ? "border-primary shadow-xl ring-2 ring-primary"
                  : ""
              }`}
            >
              {tier.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <Badge className="bg-primary px-4 py-1 text-xs font-semibold">
                    {tier.badge}
                  </Badge>
                </div>
              )}

              <CardHeader>
                <CardTitle className="text-2xl">{tier.name}</CardTitle>
                <CardDescription>{tier.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">{tier.price}€</span>
                  <span className="text-muted-foreground">/{tier.period}</span>
                </div>
              </CardHeader>

              <CardContent className="flex-1">
                <ul className="space-y-3">
                  {tier.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter>
                <Button
                  className="w-full"
                  size="lg"
                  variant={tier.highlighted ? "default" : "outline"}
                >
                  {tier.cta}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-12 space-y-2 text-center text-sm text-muted-foreground">
          {additionalInfo.map((info, index) => (
            <p key={index}>✓ {info}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
