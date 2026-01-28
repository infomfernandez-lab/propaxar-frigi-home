import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";

const FormSection = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="form-section" className="py-20 bg-muted">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12 opacity-0 animate-fade-in-up" style={{ animationDelay: "0ms" }}>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Reserva tu consulta gratuita
            </h2>
            <p className="text-lg text-muted-foreground">
              Cuéntame qué buscas y te llamo en menos de 24 horas.
            </p>
          </div>

          {!submitted ? (
            <form
              onSubmit={handleSubmit}
              className="space-y-6 bg-background p-8 rounded-xl shadow-lg opacity-0 animate-fade-in-up"
              style={{ animationDelay: "100ms" }}
            >
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    Nombre completo
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    placeholder="Tu nombre"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    placeholder="tu@email.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                  Teléfono (con prefijo internacional)
                </label>
                <input
                  type="tel"
                  id="phone"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  placeholder="+49 123 456 789"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                  ¿Qué tipo de propiedad buscas?
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                  placeholder="Cuéntame sobre tu situación: tipo de propiedad, presupuesto, cuándo planeas mudarte..."
                />
              </div>

              <button
                type="submit"
                className="w-full btn-hero justify-center"
              >
                Enviar solicitud
                <Send className="w-5 h-5" />
              </button>

              <p className="text-center text-sm text-muted-foreground">
                🔒 Tus datos están seguros. Nunca los compartiré con terceros.
              </p>
            </form>
          ) : (
            <div className="text-center bg-background p-12 rounded-xl shadow-lg opacity-0 animate-fade-in-up">
              <CheckCircle className="w-16 h-16 text-accent mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-foreground mb-4">
                ¡Gracias por contactarme!
              </h3>
              <p className="text-lg text-muted-foreground">
                Te llamaré en menos de 24 horas para conocer más sobre lo que buscas.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FormSection;
