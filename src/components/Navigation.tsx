import { useState, useEffect } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link, useLocation } from "react-router-dom";

const Navigation = () => {
  const { language, setLanguage, t } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { label: t('nav.rent'), href: '/alquilar' },
    { label: t('nav.buy'), href: '/comprar' },
    { label: t('nav.invest'), href: '/invertir' },
    { label: 'Market Report', href: '/mercado' },
  ];

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-[60px]" style={{ backgroundColor: 'hsl(222, 28%, 16%)' }}>
      <div className="max-w-[1200px] mx-auto px-5 md:px-8 h-full">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div
              className="w-[34px] h-[34px] rounded-full flex items-center justify-center text-sm font-bold bg-white/20 text-white"
            >
              P
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`text-[14px] font-medium px-3.5 py-2 rounded-md transition-colors ${
                  location.pathname === link.href
                    ? 'text-white/95 bg-white/[0.07]'
                    : 'text-white/60 hover:text-white/95 hover:bg-white/[0.07]'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            {/* Language Toggle */}
            <div className="flex items-center text-[13px] font-medium text-white/60">
              <button
                onClick={() => setLanguage('es')}
                className={`px-1.5 py-1 transition-colors ${
                  language === 'es' ? 'text-white font-bold' : 'hover:text-white/90'
                }`}
              >
                ES
              </button>
              <span className="opacity-30">|</span>
              <button
                onClick={() => setLanguage('en')}
                className={`px-1.5 py-1 transition-colors ${
                  language === 'en' ? 'text-white font-bold' : 'hover:text-white/90'
                }`}
              >
                EN
              </button>
            </div>

            {/* Desktop CTA */}
            <Link
              to="/empezar"
              className="hidden md:flex items-center gap-1.5 text-[13px] font-semibold px-4 py-2 text-white transition-all"
              style={{ backgroundColor: 'hsl(210, 53%, 24%)', borderRadius: '7px' }}
            >
              {t('nav.start')} <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-white/80"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[60px] z-40 animate-fade-in" style={{ backgroundColor: 'hsl(222, 28%, 16%)' }}>
          <div className="flex flex-col p-6 gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="text-base font-medium text-white/70 py-3 border-b border-white/10 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/empezar"
              className="mt-4 flex items-center justify-center gap-2 text-white font-semibold px-6 py-3.5 transition-all"
              style={{ backgroundColor: 'hsl(210, 53%, 24%)', borderRadius: '7px' }}
            >
              {t('nav.start')} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
