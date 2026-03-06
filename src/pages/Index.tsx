import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import QualificationCards from "@/components/QualificationCards";
import MarketStrip from "@/components/MarketStrip";
import HowItWorks from "@/components/HowItWorks";
import TestimonialsSection from "@/components/TestimonialsSection";
import FormSection from "@/components/FormSection";
import FAQSection from "@/components/FAQSection";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      <QualificationCards />
      <MarketStrip />
      <HowItWorks />
      <TestimonialsSection />
      <FormSection />
      <FAQSection />
      <FinalCTA />
      <Footer />
    </main>
  );
};

export default Index;
