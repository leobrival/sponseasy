import { X } from "lucide-react";

interface ProblemSectionProps {
  headline: string;
  problems: string[];
  transition: string;
}

export function ProblemSection({ headline, problems, transition }: ProblemSectionProps) {
  return (
    <section className="px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {headline}
        </h2>
        <ul className="mt-10 space-y-4">
          {problems.map((problem, index) => (
            <li
              key={index}
              className="flex items-center gap-3 text-left text-lg"
            >
              <X className="h-5 w-5 flex-shrink-0 text-destructive" />
              <span className="text-muted-foreground">{problem}</span>
            </li>
          ))}
        </ul>
        <p className="mt-10 text-lg font-medium">{transition}</p>
      </div>
    </section>
  );
}
