import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import SocialProof from "@/components/SocialProof";
import HowItWorks from "@/components/HowItWorks";
import ReporteTeaser from "@/components/ReporteTeaser";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      <SocialProof />
      <HowItWorks />
      <ReporteTeaser />
      <WhatsAppCTA />
      <Footer />
    </main>
  );
};

export default Index;
