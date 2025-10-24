import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  headline: string;
  items: FAQItem[];
  cta: {
    text: string;
    button: string;
  };
}

export function FAQSection({ headline, items, cta }: FAQSectionProps) {
  return (
    <section className="bg-muted/30 px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Headline */}
        <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
          {headline}
        </h2>

        {/* FAQ Accordion */}
        <Accordion
          type="single"
          collapsible
          className="mt-16"
          defaultValue="item-0"
        >
          {items.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left text-lg font-semibold">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-lg font-medium">{cta.text}</p>
          <Button variant="outline" size="lg" className="mt-4">
            {cta.button}
          </Button>
        </div>
      </div>
    </section>
  );
}
