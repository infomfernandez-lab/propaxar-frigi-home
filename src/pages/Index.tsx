import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import FormSection from "@/components/FormSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FinalCTA from "@/components/FinalCTA";

const Index = () => {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <HowItWorks />
      <FormSection />
      <TestimonialsSection />
      <FinalCTA />
    </main>
  );
};

export default Index;
