import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import GuaranteeSection from "@/components/GuaranteeSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FinalCTA from "@/components/FinalCTA";

const Index = () => {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <HowItWorks />
      <GuaranteeSection />
      <TestimonialsSection />
      <FinalCTA />
    </main>
  );
};

export default Index;
