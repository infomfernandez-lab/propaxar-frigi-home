import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Navigation />
      <div className="animate-fade-in">
        <HeroSection />
      </div>
      <Footer />
    </main>
  );
};

export default Index;
