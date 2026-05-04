const Footer = () => {
  return (
    <footer className="py-6 px-5 md:px-8" style={{ backgroundColor: '#111827' }}>
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-white/55 text-sm">
          Propaxar · Property Finder · Frigiliana · La Axarquía
        </div>
        <div className="text-white/20 text-xs font-mono">
          © 2026 Propaxar · Frigiliana, Málaga
        </div>
      </div>
    </footer>
  );
};

export default Footer;
