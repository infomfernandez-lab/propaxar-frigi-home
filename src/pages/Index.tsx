import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import FormSection from "@/components/FormSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import FinalCTA from "@/components/FinalCTA";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      <HowItWorks />
      <FormSection />
      <TestimonialsSection />
      <FAQSection />
      <FinalCTA />
    </main>
  );
};

export default Index;
