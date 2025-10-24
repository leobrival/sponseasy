import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

interface Step {
  number: number;
  title: string;
  description: string;
  details: string[];
}

interface HowItWorksProps {
  headline: string;
  subheadline: string;
  steps: Step[];
  cta: string;
}

export function HowItWorks({ headline, subheadline, steps, cta }: HowItWorksProps) {
  return (
    <section className="bg-muted/30 px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {headline}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">{subheadline}</p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {steps.map((step) => (
            <Card key={step.number} className="relative">
              <CardContent className="p-8">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <span className="text-xl font-bold">{step.number}</span>
                </div>
                <h3 className="text-xl font-semibold">{step.title}</h3>
                <p className="mt-2 text-muted-foreground">{step.description}</p>
                <ul className="mt-6 space-y-2">
                  {step.details.map((detail, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <span className="mt-1 text-primary">•</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
                {/* Screenshot placeholder */}
                <div className="mt-6 aspect-video rounded-lg bg-muted" />
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button size="lg" className="gap-2">
            {cta}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
