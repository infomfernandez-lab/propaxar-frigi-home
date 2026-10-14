// src/pages/PropiedadPublica.tsx
// Ficha pública de propiedad — datos ya preparados por la función web-propiedad.
import { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Bed, Bath, Home, MapPin, ChevronLeft, ChevronRight, MessageCircle, Mail, Phone, Ruler, Trees } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const API = "https://jkirjhpnddkrkpghpxdz.supabase.co/functions/v1/web-propiedad";
const ANON =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpraXJqaHBuZGRrcmtwZ2hweGR6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc3OTkyOTksImV4cCI6MjA5MzM3NTI5OX0.sot9GO_j8ZBXSFuccRz86Lnzfr2wiJ4w6ouV4f5ipjI";

type Bi = { es: string | null; en: string | null };
type Contacto =
  | { modo: "directo"; nombre?: string; whatsappUrl?: string; telUrl?: string; emailUrl?: string }
  | { modo: "red_agencias"; mensaje: Bi };
interface Propiedad {
  encontrada: true;
  titulo: string;
  modalidadLabel?: Bi;
  precioFormateado?: Bi;
  precioPeriodo?: string | null;
  estadoLabel?: Bi;
  tipoLabel?: Bi;
  ubicacion?: string | null;
  habitacionesLabel?: string | null;
  banosLabel?: string | null;
  m2Construidos?: number | null;
  m2Parcela?: number | null;
  imagenPortada: string;
  galeria?: string[];
  descripcion?: Bi;
  caracteristicas?: Bi[];
  analisis?: { clave: string; es: string }[];
  puntosFuertes?: string | null;
  aspectosAConsiderar?: string | null;
  contacto?: Contacto;
}

const L = {
  es: { notFound: "Propiedad no encontrada", notFoundSub: "Puede que ya no esté disponible.", back: "Volver al inicio", loading: "Cargando…", desc: "Descripción", feat: "Características", analysis: "Análisis", strong: "Puntos fuertes", consider: "Aspectos a considerar", contact: "Contacto", whatsapp: "WhatsApp", call: "Llamar", email: "Email", built: "construidos", plot: "parcela", info: "Más información" },
  en: { notFound: "Property not found", notFoundSub: "It may no longer be available.", back: "Back to home", loading: "Loading…", desc: "Description", feat: "Features", analysis: "Analysis", strong: "Strengths", consider: "Things to consider", contact: "Contact", whatsapp: "WhatsApp", call: "Call", email: "Email", built: "built", plot: "plot", info: "More information" },
};

const pick = (b: Bi | undefined, lang: "es" | "en") => (b ? b[lang] || b.es || "" : "");
const lines = (s?: string | null) => (s ? s.split("\n").map((x) => x.replace(/^[-•·]\s*/, "").trim()).filter(Boolean) : []);

export default function PropiedadPublica() {
  const { ref } = useParams<{ ref: string }>();
  const { language: lang, setLanguage } = useLanguage();
  const t = L[lang];
  const [prop, setProp] = useState<Propiedad | null>(null);
  const [state, setState] = useState<"loading" | "ok" | "notfound">("loading");

  useEffect(() => {
    window.scrollTo(0, 0);
    let cancel = false;
    setState("loading");
    fetch(`${API}?ref=${encodeURIComponent(ref ?? "")}`, { headers: { apikey: ANON, Authorization: `Bearer ${ANON}` } })
      .then((r) => r.json())
      .then((d) => {
        if (cancel) return;
        if (d?.encontrada) { setProp(d); setState("ok"); } else setState("notfound");
      })
      .catch(() => !cancel && setState("notfound"));
    return () => { cancel = true; };
  }, [ref]);

  const meta = (
    <Helmet>
      <title>{prop ? `${prop.titulo} | Propaxar` : "Propaxar"}</title>
      <meta name="robots" content="noindex, nofollow" />
    </Helmet>
  );

  if (state === "loading")
    return <div className="min-h-screen flex items-center justify-center text-muted-foreground">{meta}{t.loading}</div>;

  if (state === "notfound" || !prop)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-3 px-6 text-center">
        {meta}
        <h1 className="text-2xl font-semibold text-foreground">{t.notFound}</h1>
        <p className="text-muted-foreground">{t.notFoundSub}</p>
        <Link to="/" className="mt-4 underline text-foreground">{t.back}</Link>
      </div>
    );

  const imgs = prop.galeria && prop.galeria.length ? prop.galeria : [prop.imagenPortada];
  const precio = pick(prop.precioFormateado, lang);
  const descripcion = pick(prop.descripcion, lang);
  const feats = prop.caracteristicas ?? [];
  const analisis = prop.analisis ?? [];
  const fuertes = lines(prop.puntosFuertes);
  const considerar = lines(prop.aspectosAConsiderar);
  const c = prop.contacto;

  const stats = [
    prop.habitacionesLabel && { icon: Bed, text: prop.habitacionesLabel },
    prop.banosLabel && { icon: Bath, text: prop.banosLabel },
    prop.m2Construidos && { icon: Ruler, text: `${prop.m2Construidos} m² ${t.built}` },
    prop.m2Parcela && { icon: Trees, text: `${prop.m2Parcela} m² ${t.plot}` },
    pick(prop.tipoLabel, lang) && { icon: Home, text: pick(prop.tipoLabel, lang) },
  ].filter(Boolean) as { icon: typeof Bed; text: string }[];

  const primaryHref = c?.modo === "directo" ? c.whatsappUrl || c.telUrl || c.emailUrl : "#contacto";

  return (
    <div className="min-h-screen bg-background text-foreground pb-24 md:pb-0">
      {meta}
      <header className="sticky top-0 z-30 bg-background/90 backdrop-blur border-b border-border">
        <div className="max-w-5xl mx-auto flex items-center justify-between px-4 h-14">
          <Link to="/" className="w-9 h-9 rounded-full border border-foreground flex items-center justify-center font-semibold">P</Link>
          <div className="flex gap-1 text-sm">
            {(["es", "en"] as const).map((l) => (
              <button key={l} onClick={() => setLanguage(l)} className={`px-2 py-1 rounded ${lang === l ? "bg-foreground text-background" : "text-muted-foreground"}`}>{l.toUpperCase()}</button>
            ))}
          </div>
        </div>
      </header>

      <Gallery imgs={imgs} alt={prop.titulo} />

      <main className="max-w-5xl mx-auto px-4 py-6 md:py-10 grid md:grid-cols-[1fr_320px] gap-8">
        <div className="space-y-8 min-w-0">
          <section>
            <div className="flex flex-wrap gap-2 mb-3 text-xs uppercase tracking-wider">
              {pick(prop.modalidadLabel, lang) && <span className="px-2 py-1 bg-foreground text-background rounded">{pick(prop.modalidadLabel, lang)}</span>}
              {pick(prop.estadoLabel, lang) && <span className="px-2 py-1 border border-border rounded text-muted-foreground">{pick(prop.estadoLabel, lang)}</span>}
            </div>
            <h1 className="text-2xl md:text-4xl font-semibold leading-tight">{prop.titulo}</h1>
            {prop.ubicacion && <p className="mt-2 flex items-center gap-1 text-muted-foreground"><MapPin className="w-4 h-4" />{prop.ubicacion}</p>}
            <p className="mt-4 text-2xl font-semibold">{precio}{prop.precioPeriodo && <span className="text-base font-normal text-muted-foreground"> {prop.precioPeriodo}</span>}</p>
            {stats.length > 0 && (
              <ul className="mt-5 grid grid-cols-2 sm:grid-cols-3 gap-3">
                {stats.map(({ icon: I, text }) => (
                  <li key={text} className="flex items-center gap-2 text-sm border border-border rounded-lg px-3 py-2"><I className="w-4 h-4 shrink-0" />{text}</li>
                ))}
              </ul>
            )}
          </section>

          {descripcion && <Block title={t.desc}><p className="whitespace-pre-line leading-relaxed text-muted-foreground">{descripcion}</p></Block>}

          {feats.length > 0 && (
            <Block title={t.feat}>
              <ul className="grid sm:grid-cols-2 gap-2">{feats.map((f, i) => <li key={i} className="text-sm before:content-['—'] before:mr-2 before:text-muted-foreground">{pick(f, lang)}</li>)}</ul>
            </Block>
          )}

          {analisis.length > 0 && (
            <Block title={t.analysis}>
              <dl className="space-y-4">{analisis.map((a) => (
                <div key={a.clave}><dt className="text-xs uppercase tracking-wider text-muted-foreground mb-1">{a.clave}</dt><dd className="whitespace-pre-line text-sm leading-relaxed">{a.es}</dd></div>
              ))}</dl>
            </Block>
          )}

          {fuertes.length > 0 && <Block title={t.strong}><ul className="space-y-2">{fuertes.map((x, i) => <li key={i} className="text-sm">+ {x}</li>)}</ul></Block>}
          {considerar.length > 0 && <Block title={t.consider}><ul className="space-y-2">{considerar.map((x, i) => <li key={i} className="text-sm">· {x}</li>)}</ul></Block>}
        </div>

        {c && (
          <aside id="contacto" className="md:sticky md:top-20 h-fit border border-border rounded-xl p-5 space-y-4">
            <h2 className="text-sm uppercase tracking-wider text-muted-foreground">{t.contact}</h2>
            {c.modo === "directo" ? (
              <>
                {c.nombre && <p className="font-semibold">{c.nombre}</p>}
                <div className="grid gap-2">
                  {c.whatsappUrl && <a href={c.whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 rounded-lg bg-foreground text-background py-3 font-medium"><MessageCircle className="w-4 h-4" />{t.whatsapp}</a>}
                  {c.telUrl && <a href={c.telUrl} className="flex items-center justify-center gap-2 rounded-lg border border-border py-3"><Phone className="w-4 h-4" />{t.call}</a>}
                  {c.emailUrl && <a href={c.emailUrl} className="flex items-center justify-center gap-2 rounded-lg border border-border py-3"><Mail className="w-4 h-4" />{t.email}</a>}
                </div>
              </>
            ) : (
              <p className="text-sm leading-relaxed whitespace-pre-line">{pick(c.mensaje, lang)}</p>
            )}
          </aside>
        )}
      </main>

      {/* Barra fija móvil */}
      <div className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-background border-t border-border px-4 pt-3 flex items-center justify-between gap-3" style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))" }}>
        <p className="font-semibold leading-tight min-w-0 truncate">{precio}{prop.precioPeriodo && <span className="text-sm font-normal text-muted-foreground"> {prop.precioPeriodo}</span>}</p>
        {c && primaryHref && (
          <a href={primaryHref} {...(c.modo === "directo" && c.whatsappUrl ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="shrink-0 flex items-center gap-2 rounded-full bg-foreground text-background px-5 py-3 text-sm font-medium">
            {c.modo === "directo" ? (c.whatsappUrl ? <><MessageCircle className="w-4 h-4" />{t.whatsapp}</> : c.telUrl ? <><Phone className="w-4 h-4" />{t.call}</> : <><Mail className="w-4 h-4" />{t.email}</>) : t.info}
          </a>
        )}
      </div>
    </div>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-border pt-6">
      <h2 className="text-lg font-semibold mb-3">{title}</h2>
      {children}
    </section>
  );
}

function Gallery({ imgs, alt }: { imgs: string[]; alt: string }) {
  const [idx, setIdx] = useState(0);
  const track = useRef<HTMLDivElement>(null);
  const go = (i: number) => {
    const n = (i + imgs.length) % imgs.length;
    track.current?.scrollTo({ left: n * track.current.clientWidth, behavior: "smooth" });
  };
  const onScroll = () => {
    const el = track.current;
    if (el) setIdx(Math.round(el.scrollLeft / el.clientWidth));
  };
  return (
    <div className="relative max-w-5xl mx-auto md:px-4 md:pt-6">
      <div ref={track} onScroll={onScroll} className="flex overflow-x-auto snap-x snap-mandatory md:rounded-xl [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {imgs.map((src, i) => (
          <img key={src + i} src={src} alt={`${alt} ${i + 1}`} loading={i === 0 ? "eager" : "lazy"} className="w-full shrink-0 snap-center aspect-[4/3] md:aspect-[16/9] object-cover" />
        ))}
      </div>
      {imgs.length > 1 && (
        <>
          <button aria-label="Anterior" onClick={() => go(idx - 1)} className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 items-center justify-center"><ChevronLeft className="w-5 h-5" /></button>
          <button aria-label="Siguiente" onClick={() => go(idx + 1)} className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 items-center justify-center"><ChevronRight className="w-5 h-5" /></button>
          <span className="absolute bottom-3 right-3 md:right-7 text-xs px-2 py-1 rounded-full bg-foreground/70 text-background">{idx + 1} / {imgs.length}</span>
        </>
      )}
    </div>
  );
}
