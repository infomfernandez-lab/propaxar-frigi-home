import { useState, useEffect } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Navigation = () => {
  const { language, setLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { label: t('nav.howItWorks'), id: 'how-it-works' },
    { label: t('nav.services'), id: 'form-section' },
    { label: t('nav.testimonials'), id: 'testimonials' },
    { label: t('nav.faq'), id: 'faq-section' },
    { label: t('nav.contact'), id: 'final-cta' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-card shadow-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-5 md:px-10">
        <div className="flex items-center justify-between h-[70px]">
          {/* Logo */}
          <div className="flex flex-col">
            <span className="text-[22px] font-bold text-primary">
              PROPAXAR
            </span>
            <span className="text-[12px] uppercase tracking-wide text-foreground-muted -mt-1">
              {t('nav.subtitle')}
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`text-[15px] font-medium transition-colors hover:text-primary ${
                  isScrolled ? "text-foreground" : "text-white"
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            {/* Language Toggle */}
            <div className={`flex items-center text-sm font-medium ${isScrolled ? "text-foreground" : "text-white"}`}>
              <button
                onClick={() => setLanguage('es')}
                className={`px-2 py-1 rounded transition-colors ${
                  language === 'es' ? 'text-primary font-bold' : 'hover:text-primary'
                }`}
              >
                ES
              </button>
              <span className="opacity-50">|</span>
              <button
                onClick={() => setLanguage('en')}
                className={`px-2 py-1 rounded transition-colors ${
                  language === 'en' ? 'text-primary font-bold' : 'hover:text-primary'
                }`}
              >
                EN
              </button>
            </div>

            {/* Desktop CTA */}
            <button
              onClick={() => scrollToSection('form-section')}
              className="hidden md:flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-semibold px-4 py-2 rounded-lg transition-all"
            >
              {t('nav.start')}
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-2 ${isScrolled ? "text-foreground" : "text-white"}`}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[70px] bg-card z-40 animate-fade-in">
          <div className="flex flex-col p-6 gap-4">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-lg font-medium text-foreground py-3 border-b border-border text-left hover:text-primary transition-colors"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => scrollToSection('form-section')}
              className="mt-4 flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 py-4 rounded-lg transition-all"
            >
              {t('nav.start')}
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
