import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import SocialProof from "@/components/SocialProof";
import HowItWorks from "@/components/HowItWorks";
import ReporteTeaser from "@/components/ReporteTeaser";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import FormSection from "@/components/FormSection";
import Footer from "@/components/Footer";
import FadeInOnView from "@/components/FadeInOnView";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Navigation />
      <div className="animate-fade-in">
        <HeroSection />
      </div>
      <FadeInOnView><SocialProof /></FadeInOnView>
      <FadeInOnView><HowItWorks /></FadeInOnView>
      <FadeInOnView><ReporteTeaser /></FadeInOnView>
      <FadeInOnView><WhatsAppCTA /></FadeInOnView>
      <FadeInOnView><FormSection /></FadeInOnView>
      <Footer />
    </main>
  );
};

export default Index;
