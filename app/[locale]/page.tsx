import { HeroSection } from "@/components/landing/hero-section";
import { TrustBar } from "@/components/landing/trust-bar";
import { ProblemSection } from "@/components/landing/problem-section";
import { HowItWorks } from "@/components/landing/how-it-works";
import { TestimonialsSection } from "@/components/landing/testimonials-section";
import { FeaturesSection } from "@/components/landing/features-section";
import { UseCasesSection } from "@/components/landing/use-cases-section";
import { PricingSection } from "@/components/landing/pricing-section";
import { FAQSection } from "@/components/landing/faq-section";
import { FinalCTASection } from "@/components/landing/final-cta-section";
import { Footer } from "@/components/landing/footer";
import { getContent } from "@/lib/get-content";
import { type Locale } from "@/i18n.config";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params as { locale: Locale };
  const landingPageContent = getContent(locale);

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <HeroSection
        headline={landingPageContent.hero.headline}
        subheadline={landingPageContent.hero.subheadline}
        primaryCTA={landingPageContent.hero.primaryCTA}
        secondaryCTA={landingPageContent.hero.secondaryCTA}
        trustBadges={landingPageContent.hero.trustBadges}
      />

      {/* Trust Bar */}
      <TrustBar
        tagline={landingPageContent.trustBar.tagline}
        metrics={landingPageContent.trustBar.metrics}
      />

      {/* Problem Agitation */}
      <ProblemSection
        headline={landingPageContent.problemAgitation.headline}
        problems={landingPageContent.problemAgitation.problems}
        transition={landingPageContent.problemAgitation.transition}
      />

      {/* How It Works */}
      <HowItWorks
        headline={landingPageContent.howItWorks.headline}
        subheadline={landingPageContent.howItWorks.subheadline}
        steps={landingPageContent.howItWorks.steps}
        cta={landingPageContent.howItWorks.cta}
      />

      {/* Testimonials */}
      <TestimonialsSection
        headline={landingPageContent.testimonials.headline}
        items={landingPageContent.testimonials.items}
      />

      {/* Features */}
      <FeaturesSection
        headline={landingPageContent.features.headline}
        items={landingPageContent.features.items}
      />

      {/* Use Cases */}
      <UseCasesSection
        headline={landingPageContent.useCases.headline}
        items={landingPageContent.useCases.items}
      />

      {/* Pricing */}
      <PricingSection
        headline={landingPageContent.pricing.headline}
        subheadline={landingPageContent.pricing.subheadline}
        tiers={landingPageContent.pricing.tiers}
        additionalInfo={landingPageContent.pricing.additionalInfo}
      />

      {/* FAQ */}
      <FAQSection
        headline={landingPageContent.faq.headline}
        items={landingPageContent.faq.items}
        cta={landingPageContent.faq.cta}
      />

      {/* Final CTA */}
      <FinalCTASection
        headline={landingPageContent.finalCTA.headline}
        subheadline={landingPageContent.finalCTA.subheadline}
        primaryCTA={landingPageContent.finalCTA.primaryCTA}
        secondaryCTA={landingPageContent.finalCTA.secondaryCTA}
        trustSignals={landingPageContent.finalCTA.trustSignals}
      />

      {/* Footer */}
      <Footer
        tagline={landingPageContent.footer.tagline}
        sections={landingPageContent.footer.sections}
        social={landingPageContent.footer.social}
        copyright={landingPageContent.footer.copyright}
      />
    </main>
  );
}
