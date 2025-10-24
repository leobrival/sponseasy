import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Blocks,
  Palette,
  BarChart3,
  FileText,
  Users,
  Globe,
  Copy,
  Smartphone,
  LucideIcon,
} from "lucide-react";

interface Feature {
  icon: string;
  title: string;
  description: string;
}

interface FeaturesSectionProps {
  headline: string;
  items: Feature[];
}

const iconMap: Record<string, LucideIcon> = {
  Blocks,
  Palette,
  BarChart3,
  FileText,
  Users,
  Globe,
  Copy,
  Smartphone,
};

export function FeaturesSection({ headline, items }: FeaturesSectionProps) {
  return (
    <section className="px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Headline */}
        <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
          {headline}
        </h2>

        {/* Features Grid */}
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((feature, index) => {
            const Icon = iconMap[feature.icon] || Blocks;
            return (
              <Card
                key={index}
                className="group relative overflow-hidden border-2 transition-all hover:border-primary/50 hover:shadow-lg"
              >
                <CardHeader>
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-transform group-hover:scale-110">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
