import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const EncuentraTuAlquiler = () => {
  return (
    <div className="min-h-screen" style={{ fontFamily: "'Inter', sans-serif" }}>
      <Navigation />

      {/* 1. HERO */}
      <section
        className="relative min-h-[70vh] flex items-center justify-center"
        style={{ backgroundColor: 'hsl(222, 28%, 16%)' }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(https://propaxar.com/wp-content/uploads/2026/01/Gemini_Generated_Image_wyt8u3wyt8u3wyt8.png)`,
          }}
        />
        <div className="absolute inset-0" style={{ backgroundColor: 'rgba(17,24,39,0.72)' }} />
        <div className="relative z-10 text-center px-5 pt-24 pb-16 max-w-[800px] mx-auto">
          <h1 className="text-[34px] md:text-[54px] font-extrabold text-white leading-[1.1] mb-4">
            Encuentra tu alquiler
          </h1>
          <p className="text-[18px] md:text-[22px] text-white/80 leading-[1.5]">
            Placeholder — contenido del hero próximamente.
          </p>
        </div>
      </section>

      {/* 2. CUALIFICACIÓN */}
      <section id="cualificar" className="py-20 px-5 md:px-8" style={{ backgroundColor: '#F4F6F8' }}>
        <div className="max-w-[1200px] mx-auto">
          <h2
            className="text-[28px] md:text-[40px] font-extrabold leading-[1.15] mb-4"
            style={{ color: 'hsl(222, 28%, 16%)' }}
          >
            Cualificación
          </h2>
          <p className="text-[15px] leading-[1.7]" style={{ color: '#6B7280' }}>
            Placeholder — contenido de cualificación próximamente.
          </p>
        </div>
      </section>

      {/* 3. EL REPORTE */}
      <section id="reporte" className="py-20 px-5 md:px-8 bg-white">
        <div className="max-w-[1200px] mx-auto">
          <h2
            className="text-[28px] md:text-[40px] font-extrabold leading-[1.15] mb-4"
            style={{ color: 'hsl(222, 28%, 16%)' }}
          >
            El Reporte
          </h2>
          <p className="text-[15px] leading-[1.7]" style={{ color: '#6B7280' }}>
            Placeholder — contenido del reporte próximamente.
          </p>
        </div>
      </section>

      {/* 4. CAPTURA EMAIL */}
      <section id="avisar" className="py-20 px-5 md:px-8" style={{ backgroundColor: '#F4F6F8' }}>
        <div className="max-w-[1200px] mx-auto">
          <h2
            className="text-[28px] md:text-[40px] font-extrabold leading-[1.15] mb-4"
            style={{ color: 'hsl(222, 28%, 16%)' }}
          >
            Captura email
          </h2>
          <p className="text-[15px] leading-[1.7]" style={{ color: '#6B7280' }}>
            Placeholder — formulario de captura próximamente.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default EncuentraTuAlquiler;
