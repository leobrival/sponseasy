import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Calendar,
  Trophy,
  Mic,
  Heart,
  GraduationCap,
  Building2,
  Video,
  LucideIcon,
} from "lucide-react";

interface UseCase {
  icon: string;
  title: string;
  description: string;
}

interface UseCasesSectionProps {
  headline: string;
  items: UseCase[];
}

const iconMap: Record<string, LucideIcon> = {
  Calendar,
  Trophy,
  Mic,
  Heart,
  GraduationCap,
  Building2,
  Video,
};

export function UseCasesSection({ headline, items }: UseCasesSectionProps) {
  return (
    <section className="bg-muted/30 px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Headline */}
        <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
          {headline}
        </h2>

        {/* Use Cases Grid */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((useCase, index) => {
            const Icon = iconMap[useCase.icon] || Calendar;
            return (
              <Card
                key={index}
                className="group cursor-pointer transition-all hover:scale-105 hover:shadow-lg"
              >
                <CardHeader className="space-y-4">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold">{useCase.title}</h3>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {useCase.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
