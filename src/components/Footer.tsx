import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="py-6 px-5 md:px-8" style={{ backgroundColor: '#111827' }}>
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left */}
        <div className="text-white/55 text-sm">
          Propaxar · Frigiliana Property Specialist
        </div>

        {/* Center */}
        <nav className="flex items-center gap-6">
          {[
            { label: 'Alquilar', href: '/alquilar' },
            { label: 'Comprar', href: '/comprar' },
            { label: 'Invertir', href: '/invertir' },
            { label: 'Market Report', href: '/mercado' },
          ].map(link => (
            <Link
              key={link.href}
              to={link.href}
              className="text-white/35 text-sm hover:text-white/60 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right */}
        <div className="text-white/20 text-xs font-mono">
          © 2026 Propaxar · Frigiliana, Málaga
        </div>
      </div>
    </footer>
  );
};

export default Footer;
