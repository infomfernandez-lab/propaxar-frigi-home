import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";

const Navigation = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-[60px]" style={{ backgroundColor: 'hsl(222, 28%, 16%)' }}>
      <div className="max-w-[1200px] mx-auto px-5 md:px-8 h-full">
        <div className="flex items-center justify-between h-full">
          <Link to="/" className="flex items-center">
            <div className="w-[34px] h-[34px] rounded-full flex items-center justify-center text-sm font-bold bg-white/20 text-white">
              P
            </div>
          </Link>

          <div className="flex items-center text-[13px] font-medium text-white/60">
            <button
              onClick={() => setLanguage('es')}
              className={`px-1.5 py-1 transition-colors ${language === 'es' ? 'text-white font-bold' : 'hover:text-white/90'}`}
            >
              ES
            </button>
            <span className="opacity-30">|</span>
            <button
              onClick={() => setLanguage('en')}
              className={`px-1.5 py-1 transition-colors ${language === 'en' ? 'text-white font-bold' : 'hover:text-white/90'}`}
            >
              EN
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
