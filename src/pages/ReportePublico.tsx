// src/pages/ReportePublico.tsx
// Página pública dinámica del reporte personalizado · Propaxar
// Ruta: /r/:slug — datos desde Supabase, diseño idéntico a ReporteHenriEN

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  ChevronDown, ChevronUp, Check, AlertTriangle, Star, ExternalLink, MessageCircle, Mail,
  Download, FileText, Globe, CreditCard, Shield, TrendingUp, Package, Trash2, Droplets,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import heroImg from "@/assets/frigiliana-street.jpg";
import { supabase } from "@/lib/supabase";

// --------------------------- Tipos ---------------------------

type Idioma = "en" | "es" | "nl" | "de" | "fr";
type PropSel = { propiedad_id: string; orden: number; analisis_personalizado?: string | null };

type Reporte = {
  id: string;
  slug: string;
  lead_id: string | null;
  idioma: Idioma;
  estado: "activo" | "inactivo" | "borrador";
  nombre_cliente: string | null;
  texto_mercado: string | null;
  texto_recomendacion: string | null;
  propiedades_seleccionadas: PropSel[];
  created_at: string;
};

type Propiedad = {
  id: string;
  ref_interna: string | null;
  titulo: string;
  tipo: string | null;
  operacion: string | null;
  zona: string | null;
  precio: number | null;
  habitaciones: number | null;
  banos: number | null;
  m2_construidos: number | null;
  piscina: string | null;
  amueblado?: boolean | null;
  mascotas_permitidas: boolean | null;
  disponible: boolean | null;
  disponible_desde: string | null;
  propaxar_direct: boolean | null;
  puntos_fuertes: string | null;
  aspectos_a_considerar: string | null;
  descripcion: string | null;
  imagenes?: string[] | null;
  url_listado?: string | null;
  analisis_acceso?: string | null;
  analisis_agua?: string | null;
  analisis_internet?: string | null;
  analisis_vecindario?: string | null;
  analisis_historial?: string | null;
  analisis_propietario?: string | null;
  valoracion_calidad?: number | null;
  valoracion_ubicacion?: number | null;
  valoracion_precio?: number | null;
  texto_calidad?: string | null;
  texto_ubicacion?: string | null;
  texto_precio?: string | null;
};

type Lead = {
  id: string;
  persona: { nombre: string | null; apellidos: string | null; nacionalidad: string | null; idioma: string | null } | null;
  demanda: {
    tipo_operacion: string | null;
    presupuesto_max: number | null;
    zona_preferida: string | null;
    tipo_propiedad: string | null;
    habitaciones_min: number | null;
    mascotas: boolean | null;
    fecha_entrada: string | null;
    flexibilidad: string | null;
  } | null;
};

// --------------------------- i18n ---------------------------

const T: Record<Idioma, Record<string, string>> = {
  en: {
    hero_title: "Your Personal Property Report",
    hero_prepared: "Prepared exclusively for",
    hero_by: "by Manuel Fernández · Propaxar · La Axarquía",
    hero_zone: "Frigiliana · La Axarquía",
    hero_confidential: "Confidential",
    hero_quote: "I have personally visited and analysed each of these properties with your profile in mind. This is not an automated list — it is a curated selection based on your specific needs.",
    profile_title: "Your Search Profile",
    profile_req: "YOUR REQUIREMENTS",
    profile_you: "YOUR PROFILE",
    op: "Operation", budget: "Budget", zone: "Zone", type: "Type", bedrooms: "Min. bedrooms",
    pets: "Pets", move_in: "Move-in date", flex: "Flexibility",
    name: "Name", nationality: "Nationality", language: "Language",
    market_title: "Current Market in La Axarquía",
    props_title: "Your Selected Properties", props_subtitle: "Sorted by compatibility with your profile",
    best_match: "#1 BEST MATCH", good_option: "#2 STRONG ALTERNATIVE", option: "#3 OPTION",
    direct: "PROPAXAR DIRECT ✨",
    view_full: "VIEW FULL ANALYSIS", hide: "CLOSE ANALYSIS",
    strengths: "ADVANTAGES", considerations: "CONSIDERATIONS",
    custom_analysis: "Manuel's analysis for you",
    request_viewing: "Request Viewing", view_listing: "View on Propaxar",
    compare_title: "Property Comparison", criteria: "Criteria", your_need: "Your Need",
    rec_title: "My Recommendation for You",
    arrange: "ARRANGE A VIEWING",
    next_title: "Next Steps",
    n1_t: "Tell me which interest you", n1_d: "I'll confirm availability and arrange viewings",
    n2_t: "We arrange viewings", n2_d: "Remote viewing by video call possible",
    n3_t: "You choose, I handle the rest", n3_d: "Contract, conditions, handover · Everything included",
    inactive: "This report is not available.",
    properties_label: "Properties Selected", available: "Available",
    yes: "Yes", no: "No", any: "Any", price: "Price", bedrooms_l: "Bedrooms", bathrooms: "Bathrooms",
    surface: "Surface", pool: "Pool", furnished: "Furnished", available_l: "Available",
    compat: "Compatibility Score", click_enlarge: "Click to enlarge", ratings: "📊 RATINGS",
    quality: "QUALITY", location: "LOCATION", price_t: "PRICE",
    excellent: "EXCELLENT", good: "GOOD", fair: "FAIR",
    confidential_for: "This report is confidential and prepared exclusively for",
    valid_until: "Report valid until",
    pdf_title: "DOWNLOAD YOUR REPORT", pdf_sub: "Save offline · Print it · Share it", pdf_btn: "DOWNLOAD PDF",
  },
  es: {
    hero_title: "Tu Reporte de Propiedades Personalizado",
    hero_prepared: "Preparado exclusivamente para",
    hero_by: "por Manuel Fernández · Propaxar · La Axarquía",
    hero_zone: "Frigiliana · La Axarquía",
    hero_confidential: "Confidencial",
    hero_quote: "He visitado y analizado personalmente cada una de estas propiedades pensando en tu perfil. No es una lista automatizada — es una selección curada según tus necesidades específicas.",
    profile_title: "Tu Perfil de Búsqueda",
    profile_req: "TUS REQUISITOS", profile_you: "TU PERFIL",
    op: "Operación", budget: "Presupuesto", zone: "Zona", type: "Tipo", bedrooms: "Habitaciones mín.",
    pets: "Mascotas", move_in: "Fecha entrada", flex: "Flexibilidad",
    name: "Nombre", nationality: "Nacionalidad", language: "Idioma",
    market_title: "Mercado actual en La Axarquía",
    props_title: "Propiedades Seleccionadas", props_subtitle: "Ordenadas por compatibilidad con tu perfil",
    best_match: "#1 MEJOR OPCIÓN", good_option: "#2 ALTERNATIVA SÓLIDA", option: "#3 OPCIÓN",
    direct: "PROPAXAR DIRECT ✨",
    view_full: "VER ANÁLISIS COMPLETO", hide: "CERRAR ANÁLISIS",
    strengths: "VENTAJAS", considerations: "A CONSIDERAR",
    custom_analysis: "Análisis de Manuel para ti",
    request_viewing: "Solicitar visita", view_listing: "Ver en Propaxar",
    compare_title: "Comparación de Propiedades", criteria: "Criterio", your_need: "Tu necesidad",
    rec_title: "Mi Recomendación para Ti",
    arrange: "AGENDAR VISITA",
    next_title: "Próximos Pasos",
    n1_t: "Dime cuáles te interesan", n1_d: "Confirmaré disponibilidad y agendaré visitas",
    n2_t: "Agendamos las visitas", n2_d: "Posible visita remota por videollamada",
    n3_t: "Tú eliges, yo me encargo", n3_d: "Contrato, condiciones, entrega · Todo incluido",
    inactive: "Este reporte no está disponible.",
    properties_label: "Propiedades seleccionadas", available: "Disponible",
    yes: "Sí", no: "No", any: "Indiferente", price: "Precio", bedrooms_l: "Habitaciones", bathrooms: "Baños",
    surface: "Superficie", pool: "Piscina", furnished: "Amueblado", available_l: "Disponible",
    compat: "Puntuación de compatibilidad", click_enlarge: "Clic para ampliar", ratings: "📊 VALORACIONES",
    quality: "CALIDAD", location: "UBICACIÓN", price_t: "PRECIO",
    excellent: "EXCELENTE", good: "BUENO", fair: "ACEPTABLE",
    confidential_for: "Este reporte es confidencial y preparado exclusivamente para",
    valid_until: "Reporte válido hasta",
    pdf_title: "DESCARGA TU REPORTE", pdf_sub: "Guárdalo offline · Imprímelo · Compártelo", pdf_btn: "DESCARGAR PDF",
  },
  nl: {
    hero_title: "Uw Persoonlijk Vastgoedrapport",
    hero_prepared: "Exclusief samengesteld voor",
    hero_by: "door Manuel Fernández · Propaxar · La Axarquía",
    hero_zone: "Frigiliana · La Axarquía", hero_confidential: "Vertrouwelijk",
    hero_quote: "Ik heb elk van deze panden persoonlijk bezocht en geanalyseerd met uw profiel in gedachten.",
    profile_title: "Uw Zoekprofiel", profile_req: "UW WENSEN", profile_you: "UW PROFIEL",
    op: "Type", budget: "Budget", zone: "Zone", type: "Soort", bedrooms: "Min. slaapkamers",
    pets: "Huisdieren", move_in: "Inhuisdatum", flex: "Flexibiliteit",
    name: "Naam", nationality: "Nationaliteit", language: "Taal",
    market_title: "Huidige markt in La Axarquía",
    props_title: "Geselecteerde Panden", props_subtitle: "Op compatibiliteit gesorteerd",
    best_match: "#1 BESTE MATCH", good_option: "#2 STERK ALTERNATIEF", option: "#3 OPTIE",
    direct: "PROPAXAR DIRECT ✨",
    view_full: "VOLLEDIGE ANALYSE", hide: "ANALYSE SLUITEN",
    strengths: "VOORDELEN", considerations: "AANDACHTSPUNTEN",
    custom_analysis: "Manuel's analyse voor u",
    request_viewing: "Bezichtiging aanvragen", view_listing: "Bekijk op Propaxar",
    compare_title: "Vergelijking", criteria: "Criterium", your_need: "Uw wens",
    rec_title: "Mijn aanbeveling voor u", arrange: "BEZICHTIGING REGELEN",
    next_title: "Volgende Stappen",
    n1_t: "Laat uw favorieten weten", n1_d: "Ik bevestig beschikbaarheid",
    n2_t: "Wij regelen bezichtigingen", n2_d: "Op afstand via video mogelijk",
    n3_t: "U kiest, ik regel de rest", n3_d: "Contract, voorwaarden, sleutels · Alles inbegrepen",
    inactive: "Dit rapport is niet beschikbaar.", properties_label: "Geselecteerde panden", available: "Beschikbaar",
    yes: "Ja", no: "Nee", any: "Geen voorkeur", price: "Prijs", bedrooms_l: "Slaapkamers", bathrooms: "Badkamers",
    surface: "Oppervlakte", pool: "Zwembad", furnished: "Gemeubileerd", available_l: "Beschikbaar",
    compat: "Compatibiliteitsscore", click_enlarge: "Klik om te vergroten", ratings: "📊 BEOORDELINGEN",
    quality: "KWALITEIT", location: "LOCATIE", price_t: "PRIJS",
    excellent: "UITSTEKEND", good: "GOED", fair: "REDELIJK",
    confidential_for: "Dit rapport is vertrouwelijk en samengesteld voor", valid_until: "Geldig tot",
    pdf_title: "DOWNLOAD UW RAPPORT", pdf_sub: "Offline · Printen · Delen", pdf_btn: "PDF DOWNLOADEN",
  },
  de: {
    hero_title: "Ihr persönlicher Immobilienbericht",
    hero_prepared: "Exklusiv erstellt für", hero_by: "von Manuel Fernández · Propaxar · La Axarquía",
    hero_zone: "Frigiliana · La Axarquía", hero_confidential: "Vertraulich",
    hero_quote: "Ich habe jede dieser Immobilien persönlich besichtigt und mit Blick auf Ihr Profil analysiert.",
    profile_title: "Ihr Suchprofil", profile_req: "IHRE ANFORDERUNGEN", profile_you: "IHR PROFIL",
    op: "Vorgang", budget: "Budget", zone: "Lage", type: "Typ", bedrooms: "Min. Zimmer",
    pets: "Haustiere", move_in: "Einzugsdatum", flex: "Flexibilität",
    name: "Name", nationality: "Nationalität", language: "Sprache",
    market_title: "Aktueller Markt in La Axarquía",
    props_title: "Ausgewählte Immobilien", props_subtitle: "Sortiert nach Kompatibilität",
    best_match: "#1 BESTE OPTION", good_option: "#2 STARKE ALTERNATIVE", option: "#3 OPTION",
    direct: "PROPAXAR DIRECT ✨",
    view_full: "VOLLSTÄNDIGE ANALYSE", hide: "ANALYSE SCHLIESSEN",
    strengths: "VORTEILE", considerations: "ZU BEACHTEN",
    custom_analysis: "Manuels Analyse für Sie",
    request_viewing: "Besichtigung anfragen", view_listing: "Auf Propaxar ansehen",
    compare_title: "Immobilienvergleich", criteria: "Kriterium", your_need: "Ihr Wunsch",
    rec_title: "Meine Empfehlung für Sie", arrange: "BESICHTIGUNG VEREINBAREN",
    next_title: "Nächste Schritte",
    n1_t: "Sagen Sie mir Ihre Favoriten", n1_d: "Ich bestätige Verfügbarkeit",
    n2_t: "Wir vereinbaren Besichtigungen", n2_d: "Per Videoanruf möglich",
    n3_t: "Sie wählen, ich kümmere mich", n3_d: "Vertrag, Bedingungen, Übergabe · Alles inklusive",
    inactive: "Dieser Bericht ist nicht verfügbar.", properties_label: "Ausgewählte Immobilien", available: "Verfügbar",
    yes: "Ja", no: "Nein", any: "Egal", price: "Preis", bedrooms_l: "Zimmer", bathrooms: "Bäder",
    surface: "Fläche", pool: "Pool", furnished: "Möbliert", available_l: "Verfügbar",
    compat: "Kompatibilität", click_enlarge: "Zum Vergrößern klicken", ratings: "📊 BEWERTUNGEN",
    quality: "QUALITÄT", location: "LAGE", price_t: "PREIS",
    excellent: "AUSGEZEICHNET", good: "GUT", fair: "MITTEL",
    confidential_for: "Vertraulich, exklusiv erstellt für", valid_until: "Gültig bis",
    pdf_title: "BERICHT HERUNTERLADEN", pdf_sub: "Offline · Drucken · Teilen", pdf_btn: "PDF HERUNTERLADEN",
  },
  fr: {
    hero_title: "Votre Rapport Immobilier Personnel",
    hero_prepared: "Préparé exclusivement pour", hero_by: "par Manuel Fernández · Propaxar · La Axarquía",
    hero_zone: "Frigiliana · La Axarquía", hero_confidential: "Confidentiel",
    hero_quote: "J'ai personnellement visité et analysé chacun de ces biens en pensant à votre profil.",
    profile_title: "Votre Profil de Recherche", profile_req: "VOS EXIGENCES", profile_you: "VOTRE PROFIL",
    op: "Opération", budget: "Budget", zone: "Zone", type: "Type", bedrooms: "Chambres min.",
    pets: "Animaux", move_in: "Date d'emménagement", flex: "Flexibilité",
    name: "Nom", nationality: "Nationalité", language: "Langue",
    market_title: "Marché actuel à La Axarquía",
    props_title: "Propriétés Sélectionnées", props_subtitle: "Triées par compatibilité",
    best_match: "#1 MEILLEURE OPTION", good_option: "#2 ALTERNATIVE SOLIDE", option: "#3 OPTION",
    direct: "PROPAXAR DIRECT ✨",
    view_full: "ANALYSE COMPLÈTE", hide: "FERMER L'ANALYSE",
    strengths: "AVANTAGES", considerations: "À CONSIDÉRER",
    custom_analysis: "Analyse de Manuel pour vous",
    request_viewing: "Demander une visite", view_listing: "Voir sur Propaxar",
    compare_title: "Comparaison", criteria: "Critère", your_need: "Votre besoin",
    rec_title: "Ma recommandation pour vous", arrange: "ORGANISER UNE VISITE",
    next_title: "Prochaines Étapes",
    n1_t: "Indiquez vos favoris", n1_d: "Je confirme la disponibilité",
    n2_t: "Nous organisons les visites", n2_d: "Visite à distance possible",
    n3_t: "Vous choisissez, je m'occupe du reste", n3_d: "Contrat, conditions, remise · Tout inclus",
    inactive: "Ce rapport n'est pas disponible.", properties_label: "Propriétés sélectionnées", available: "Disponible",
    yes: "Oui", no: "Non", any: "Indifférent", price: "Prix", bedrooms_l: "Chambres", bathrooms: "SdB",
    surface: "Surface", pool: "Piscine", furnished: "Meublé", available_l: "Disponible",
    compat: "Score de compatibilité", click_enlarge: "Cliquez pour agrandir", ratings: "📊 ÉVALUATIONS",
    quality: "QUALITÉ", location: "EMPLACEMENT", price_t: "PRIX",
    excellent: "EXCELLENT", good: "BON", fair: "CORRECT",
    confidential_for: "Confidentiel, préparé exclusivement pour", valid_until: "Valide jusqu'au",
    pdf_title: "TÉLÉCHARGER VOTRE RAPPORT", pdf_sub: "Hors ligne · Imprimer · Partager", pdf_btn: "TÉLÉCHARGER PDF",
  },
};

// --------------------------- Localized rich content ---------------------------

type DocItem = { title: string; urgency: string; urgencyColor: string; description: string; steps: string[]; tip: string; icon: "file" | "card" | "globe" | "shield" };
type LogItem = { title: string; countryside: string; town: string; icon: "package" | "trash" | "droplets" };
type ProAnalysisLabels = { title: string; access: string; water: string; internet: string; neighbourhood: string; history: string; owner: string };

const SECTIONS: Record<Idioma, {
  proAnalysis: ProAnalysisLabels;
  docsTitle: string; docsSubtitle: string;
  logisticsTitle: string; logisticsSubtitle: string;
  countryside: string; inTown: string;
  chartTitle: string; chartSubtitle: string; chartTooltip: string;
  docs: DocItem[];
  logistics: LogItem[];
}> = {
  en: {
    proAnalysis: { title: "🔍 MY PROFESSIONAL ANALYSIS", access: "Access & Parking", water: "Water & Services", internet: "Internet & Connectivity", neighbourhood: "Neighbourhood & Noise", history: "Property History", owner: "Owner Profile" },
    docsTitle: "Documentation & Legal Requirements", docsSubtitle: "What you need to rent legally in Spain",
    logisticsTitle: "Country vs Town Living Logistics", logisticsSubtitle: "The Insider's Truth",
    countryside: "🌿 IN THE COUNTRYSIDE", inTown: "🏘️ IN THE TOWN",
    chartTitle: "Market Evolution in Frigiliana", chartSubtitle: "Average price +6% yearly · Long-term rental availability <1%", chartTooltip: "Average price",
    docs: [
      { icon: "file", title: "NIE (Foreigners' ID Number)", urgency: "ESSENTIAL", urgencyColor: "hsl(0 72% 51%)", description: "Required for ALL contracts, bank accounts, utilities. Without it, you literally cannot rent.", steps: ["Apply at Spanish Consulate (home country) or Police Station (Spain)", "Processing: 2-4 weeks from abroad, 1-2 weeks in Spain", "Documents: passport, application form EX-15, proof of reason"], tip: "💡 Start this NOW if you don't have one. It's the #1 blocker." },
      { icon: "card", title: "Spanish Bank Account", urgency: "ESSENTIAL", urgencyColor: "hsl(0 72% 51%)", description: "Most landlords require rent via Spanish bank transfer. Also needed for utilities (Endesa, Aqualia).", steps: ["Open at any bank with NIE + passport (Sabadell, CaixaBank, BBVA)", "Some banks allow opening remotely (N26, Openbank)", "Processing: same day in branch with NIE"], tip: "💡 I can recommend a branch in Nerja where they speak English." },
      { icon: "globe", title: "Empadronamiento (Town Registration)", urgency: "WITHIN 3 MONTHS", urgencyColor: "hsl(39 76% 51%)", description: "Mandatory registration at your local town hall. Required for healthcare (SAS), voting, and residency.", steps: ["Go to Frigiliana Town Hall with rental contract + passport", "Free of charge, done same day", "Needed for: public healthcare, schools, residency application"], tip: "💡 I'll accompany you to Town Hall." },
      { icon: "shield", title: "Rental Contract Essentials", urgency: "AT SIGNING", urgencyColor: "hsl(213 56% 43%)", description: "Spanish rental law (LAU) protects tenants. Key things to verify in your contract.", steps: ["Minimum duration (for individual landlords)", "Deposit: max 2 months rent", "Rent increases tied to CPI, max once per year", "I review ALL contracts before you sign"], tip: "💡 Never sign without understanding every clause." },
    ],
    logistics: [
      { icon: "package", title: "Package Delivery and Amazon", countryside: "There is no door-to-door delivery in rural Frigiliana. We'll help you register at a local Parcel Point.", town: "Each home has its own address with door-to-door delivery." },
      { icon: "trash", title: "Waste Collection", countryside: "The garbage truck does not access rural lanes. Waste is deposited at clean points on the main road.", town: "Collection house by house. Put garbage out after 9:30 PM." },
      { icon: "droplets", title: "Water", countryside: "Water in rural houses usually comes from community or private wells.", town: "Water from the municipal network, generally managed by Aqualia." },
    ],
  },
  es: {
    proAnalysis: { title: "🔍 MI ANÁLISIS PROFESIONAL", access: "Acceso y aparcamiento", water: "Agua y servicios", internet: "Internet y conectividad", neighbourhood: "Vecindario y ruido", history: "Historial de la propiedad", owner: "Perfil del propietario" },
    docsTitle: "Documentación y Requisitos Legales", docsSubtitle: "Lo que necesitas para alquilar legalmente en España",
    logisticsTitle: "Vivir en el Campo vs en el Pueblo", logisticsSubtitle: "La verdad desde dentro",
    countryside: "🌿 EN EL CAMPO", inTown: "🏘️ EN EL PUEBLO",
    chartTitle: "Evolución del mercado en Frigiliana", chartSubtitle: "Precio medio +6% anual · Disponibilidad larga estancia <1%", chartTooltip: "Precio medio",
    docs: [
      { icon: "file", title: "NIE (Número de Identificación de Extranjero)", urgency: "ESENCIAL", urgencyColor: "hsl(0 72% 51%)", description: "Imprescindible para TODOS los contratos, cuentas y suministros. Sin él no puedes alquilar.", steps: ["Solicitar en Consulado o Comisaría de Policía", "Tramitación: 2-4 semanas desde el extranjero, 1-2 en España", "Documentos: pasaporte, EX-15, justificación"], tip: "💡 Empieza YA si no lo tienes. Es el bloqueo #1." },
      { icon: "card", title: "Cuenta bancaria española", urgency: "ESENCIAL", urgencyColor: "hsl(0 72% 51%)", description: "La mayoría de propietarios exigen transferencia bancaria española.", steps: ["Apertura con NIE + pasaporte (Sabadell, CaixaBank, BBVA)", "Algunos bancos permiten apertura remota (N26, Openbank)", "Mismo día en sucursal"], tip: "💡 Te recomiendo una sucursal en Nerja con personal inglés." },
      { icon: "globe", title: "Empadronamiento", urgency: "EN 3 MESES", urgencyColor: "hsl(39 76% 51%)", description: "Inscripción obligatoria en el ayuntamiento. Necesario para sanidad, voto y residencia.", steps: ["Acude al Ayuntamiento de Frigiliana con contrato + pasaporte", "Gratuito, mismo día", "Necesario para sanidad, colegios, residencia"], tip: "💡 Te acompaño al Ayuntamiento." },
      { icon: "shield", title: "Contrato de alquiler: lo esencial", urgency: "AL FIRMAR", urgencyColor: "hsl(213 56% 43%)", description: "La LAU protege al inquilino. Puntos clave a verificar.", steps: ["Duración mínima (propietario particular)", "Fianza: máximo 2 meses", "Subida ligada al IPC, máximo 1 vez al año", "Reviso TODOS los contratos antes de firmar"], tip: "💡 Nunca firmes sin entender cada cláusula." },
    ],
    logistics: [
      { icon: "package", title: "Paquetería y Amazon", countryside: "No hay entrega puerta a puerta en zonas rurales de Frigiliana. Te ayudamos a registrarte en un Punto de Entrega local.", town: "Cada vivienda tiene su dirección con entrega puerta a puerta." },
      { icon: "trash", title: "Recogida de basura", countryside: "El camión no accede a caminos rurales. La basura se deposita en puntos limpios en la carretera principal.", town: "Recogida casa por casa. Saca la basura después de las 21:30." },
      { icon: "droplets", title: "Agua", countryside: "En casas rurales suele venir de pozos comunitarios o privados.", town: "Agua de la red municipal, gestionada por Aqualia." },
    ],
  },
  nl: {
    proAnalysis: { title: "🔍 MIJN PROFESSIONELE ANALYSE", access: "Toegang & Parkeren", water: "Water & Diensten", internet: "Internet & Verbinding", neighbourhood: "Buurt & Geluid", history: "Geschiedenis", owner: "Profiel eigenaar" },
    docsTitle: "Documentatie & Juridische Vereisten", docsSubtitle: "Wat u nodig heeft om legaal te huren in Spanje",
    logisticsTitle: "Wonen op het platteland vs in het dorp", logisticsSubtitle: "De insider waarheid",
    countryside: "🌿 OP HET PLATTELAND", inTown: "🏘️ IN HET DORP",
    chartTitle: "Marktontwikkeling in Frigiliana", chartSubtitle: "Gemiddelde prijs +6%/jaar · Beschikbaarheid langdurige huur <1%", chartTooltip: "Gemiddelde prijs",
    docs: [
      { icon: "file", title: "NIE (ID-nummer)", urgency: "ESSENTIEEL", urgencyColor: "hsl(0 72% 51%)", description: "Vereist voor ALLE contracten en rekeningen.", steps: ["Aanvraag bij consulaat of politiebureau", "Verwerking: 2-4 weken vanuit buitenland", "Documenten: paspoort, EX-15"], tip: "💡 Begin NU als u die nog niet heeft." },
      { icon: "card", title: "Spaanse bankrekening", urgency: "ESSENTIEEL", urgencyColor: "hsl(0 72% 51%)", description: "Verhuurders eisen meestal Spaanse overschrijving.", steps: ["Openen met NIE + paspoort", "Op afstand mogelijk (N26, Openbank)", "Zelfde dag in filiaal"], tip: "💡 Ik raad een Engelstalige bank in Nerja aan." },
      { icon: "globe", title: "Empadronamiento", urgency: "BINNEN 3 MAANDEN", urgencyColor: "hsl(39 76% 51%)", description: "Verplichte registratie bij gemeentehuis.", steps: ["Naar gemeentehuis met contract + paspoort", "Gratis, zelfde dag", "Nodig voor zorg en residentie"], tip: "💡 Ik ga met u mee." },
      { icon: "shield", title: "Huurcontract essentials", urgency: "BIJ ONDERTEKENING", urgencyColor: "hsl(213 56% 43%)", description: "Spaanse huurwet beschermt huurders.", steps: ["Minimumduur", "Borg: max 2 maanden", "Verhoging gekoppeld aan CPI", "Ik beoordeel alle contracten"], tip: "💡 Teken nooit zonder begrip." },
    ],
    logistics: [
      { icon: "package", title: "Pakketbezorging en Amazon", countryside: "Geen bezorging aan huis in landelijke gebieden. Wij helpen bij een Parcel Point.", town: "Elke woning heeft adres met bezorging aan huis." },
      { icon: "trash", title: "Vuilophaal", countryside: "Vuilniswagen komt niet in landwegen. Naar containers op hoofdweg.", town: "Huis-aan-huis ophaal. Vuilnis na 21:30 buiten." },
      { icon: "droplets", title: "Water", countryside: "Water uit gemeenschaps- of privéputten.", town: "Water uit gemeentenet, beheerd door Aqualia." },
    ],
  },
  de: {
    proAnalysis: { title: "🔍 MEINE PROFESSIONELLE ANALYSE", access: "Zugang & Parken", water: "Wasser & Versorgung", internet: "Internet & Konnektivität", neighbourhood: "Nachbarschaft & Lärm", history: "Objekthistorie", owner: "Eigentümerprofil" },
    docsTitle: "Dokumentation & rechtliche Anforderungen", docsSubtitle: "Was Sie für legales Mieten in Spanien brauchen",
    logisticsTitle: "Land- vs. Stadtleben Logistik", logisticsSubtitle: "Die Insider-Wahrheit",
    countryside: "🌿 AUF DEM LAND", inTown: "🏘️ IM ORT",
    chartTitle: "Marktentwicklung in Frigiliana", chartSubtitle: "Durchschnittspreis +6% jährlich · Langzeitmiete <1%", chartTooltip: "Durchschnittspreis",
    docs: [
      { icon: "file", title: "NIE (Ausländer-ID)", urgency: "UNERLÄSSLICH", urgencyColor: "hsl(0 72% 51%)", description: "Erforderlich für ALLE Verträge und Konten.", steps: ["Antrag im Konsulat oder bei der Polizei", "Bearbeitung: 2-4 Wochen aus dem Ausland", "Unterlagen: Pass, EX-15"], tip: "💡 Beginnen Sie JETZT damit." },
      { icon: "card", title: "Spanisches Bankkonto", urgency: "UNERLÄSSLICH", urgencyColor: "hsl(0 72% 51%)", description: "Vermieter verlangen meist spanische Überweisung.", steps: ["Eröffnung mit NIE + Pass", "Manche Banken auch remote (N26, Openbank)", "Gleicher Tag in Filiale"], tip: "💡 Englischsprachige Filiale in Nerja empfohlen." },
      { icon: "globe", title: "Empadronamiento", urgency: "INNERHALB 3 MONATEN", urgencyColor: "hsl(39 76% 51%)", description: "Pflichtmeldung beim Rathaus.", steps: ["Rathaus mit Vertrag + Pass", "Kostenlos, gleicher Tag", "Nötig für Gesundheit, Schule"], tip: "💡 Ich begleite Sie." },
      { icon: "shield", title: "Mietvertrag Wesentliches", urgency: "BEI UNTERZEICHNUNG", urgencyColor: "hsl(213 56% 43%)", description: "Spanisches Mietrecht (LAU) schützt Mieter.", steps: ["Mindestlaufzeit", "Kaution: max 2 Monate", "Erhöhung an CPI gebunden", "Ich prüfe alle Verträge"], tip: "💡 Niemals ohne Verständnis unterschreiben." },
    ],
    logistics: [
      { icon: "package", title: "Paketzustellung und Amazon", countryside: "Keine Zustellung in ländlichen Gebieten. Wir helfen bei Parcel Point.", town: "Jede Wohnung mit Adresse und Zustellung." },
      { icon: "trash", title: "Müllabfuhr", countryside: "Müllwagen fährt keine Landwege. Zu Sammelpunkten an Hauptstraße.", town: "Haus-zu-Haus. Müll nach 21:30 raus." },
      { icon: "droplets", title: "Wasser", countryside: "Wasser aus Gemeinschafts- oder Privatbrunnen.", town: "Wasser vom Stadtnetz, betrieben von Aqualia." },
    ],
  },
  fr: {
    proAnalysis: { title: "🔍 MON ANALYSE PROFESSIONNELLE", access: "Accès & Stationnement", water: "Eau & Services", internet: "Internet & Connectivité", neighbourhood: "Voisinage & Bruit", history: "Historique du bien", owner: "Profil du propriétaire" },
    docsTitle: "Documentation et exigences légales", docsSubtitle: "Ce qu'il vous faut pour louer légalement en Espagne",
    logisticsTitle: "Vivre à la campagne vs au village", logisticsSubtitle: "La vérité des connaisseurs",
    countryside: "🌿 À LA CAMPAGNE", inTown: "🏘️ AU VILLAGE",
    chartTitle: "Évolution du marché à Frigiliana", chartSubtitle: "Prix moyen +6% annuel · Disponibilité location longue durée <1%", chartTooltip: "Prix moyen",
    docs: [
      { icon: "file", title: "NIE (Numéro d'identification)", urgency: "ESSENTIEL", urgencyColor: "hsl(0 72% 51%)", description: "Requis pour TOUS les contrats et comptes.", steps: ["Demande au Consulat ou Commissariat", "Traitement: 2-4 semaines depuis l'étranger", "Documents: passeport, EX-15"], tip: "💡 Commencez MAINTENANT." },
      { icon: "card", title: "Compte bancaire espagnol", urgency: "ESSENTIEL", urgencyColor: "hsl(0 72% 51%)", description: "Les bailleurs exigent virement espagnol.", steps: ["Ouverture avec NIE + passeport", "Certaines banques à distance (N26, Openbank)", "Même jour en agence"], tip: "💡 Agence anglophone à Nerja recommandée." },
      { icon: "globe", title: "Empadronamiento", urgency: "DANS 3 MOIS", urgencyColor: "hsl(39 76% 51%)", description: "Inscription obligatoire à la mairie.", steps: ["Mairie avec contrat + passeport", "Gratuit, même jour", "Nécessaire pour santé, école"], tip: "💡 Je vous accompagne." },
      { icon: "shield", title: "Contrat de location: l'essentiel", urgency: "À LA SIGNATURE", urgencyColor: "hsl(213 56% 43%)", description: "Le droit espagnol (LAU) protège les locataires.", steps: ["Durée minimale", "Caution: max 2 mois", "Hausse liée à l'IPC", "Je révise tous les contrats"], tip: "💡 Ne signez jamais sans comprendre." },
    ],
    logistics: [
      { icon: "package", title: "Livraison de colis et Amazon", countryside: "Pas de livraison à domicile en zones rurales. Nous vous aidons à utiliser un Point Relais.", town: "Chaque logement a son adresse avec livraison à domicile." },
      { icon: "trash", title: "Collecte des déchets", countryside: "Le camion ne va pas sur les chemins. Déposer aux points propres sur la route principale.", town: "Collecte porte à porte. Sortir après 21h30." },
      { icon: "droplets", title: "Eau", countryside: "Eau de puits communautaires ou privés.", town: "Eau du réseau municipal, géré par Aqualia." },
    ],
  },
};

const ICONS: Record<string, JSX.Element> = {
  file: <FileText className="w-7 h-7" />, card: <CreditCard className="w-7 h-7" />, globe: <Globe className="w-7 h-7" />, shield: <Shield className="w-7 h-7" />,
  package: <Package className="w-7 h-7" />, trash: <Trash2 className="w-7 h-7" />, droplets: <Droplets className="w-7 h-7" />,
};

// --------------------------- Helpers ---------------------------

type Status = "ok" | "warn" | "fail";

function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.12 });
    obs.observe(el); return () => obs.disconnect();
  }, []);
  return { ref, className: `transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}` };
}

const Stars = ({ count, max = 5 }: { count: number; max?: number }) => (
  <span className="inline-flex gap-0.5">
    {Array.from({ length: max }, (_, i) => (
      <Star key={i} className={`w-4 h-4 ${i < count ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
    ))}
  </span>
);

const StatusIcon = ({ status }: { status: Status }) => {
  if (status === "ok") return <span className="text-green-600">✅</span>;
  if (status === "warn") return <span className="text-amber-500">⚠️</span>;
  return <span className="text-red-500">❌</span>;
};

function Lightbox({ images, initialIndex, onClose }: { images: string[]; initialIndex: number; onClose: () => void }) {
  const [idx, setIdx] = useState(initialIndex);
  const safe = images && images.length > 0 ? images : [];
  const cur = safe[idx] ?? "";
  const prev = useCallback(() => setIdx((i) => (i === 0 ? safe.length - 1 : i - 1)), [safe.length]);
  const next = useCallback(() => setIdx((i) => (i + 1) % safe.length), [safe.length]);
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const k = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); if (e.key === "ArrowLeft") prev(); if (e.key === "ArrowRight") next(); };
    document.addEventListener("keydown", k);
    return () => { document.removeEventListener("keydown", k); document.body.style.overflow = "unset"; };
  }, [onClose, prev, next]);
  if (!cur) return null;
  return createPortal(
    <div style={{ position: "fixed", inset: 0, zIndex: 99999, backgroundColor: "black" }} onClick={onClose}>
      <button onClick={(e) => { e.stopPropagation(); onClose(); }} style={{ position: "fixed", top: 12, right: 12, zIndex: 100000, backgroundColor: "white", color: "black", border: "none", borderRadius: "50%", width: 50, height: 50, fontSize: 28, fontWeight: "bold", cursor: "pointer" }}>×</button>
      {safe.length > 1 && <button onClick={(e) => { e.stopPropagation(); prev(); }} style={{ position: "fixed", left: 12, top: "50%", transform: "translateY(-50%)", zIndex: 100000, backgroundColor: "white", color: "black", border: "none", borderRadius: "50%", width: 50, height: 50, fontSize: 24, fontWeight: "bold", cursor: "pointer" }}>←</button>}
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", padding: "70px 60px" }} onClick={(e) => e.stopPropagation()}>
        <img key={cur} src={cur} alt={`Photo ${idx + 1}`} style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }} />
      </div>
      {safe.length > 1 && <button onClick={(e) => { e.stopPropagation(); next(); }} style={{ position: "fixed", right: 12, top: "50%", transform: "translateY(-50%)", zIndex: 100000, backgroundColor: "white", color: "black", border: "none", borderRadius: "50%", width: 50, height: 50, fontSize: 24, fontWeight: "bold", cursor: "pointer" }}>→</button>}
      {safe.length > 1 && <div style={{ position: "fixed", bottom: 16, left: "50%", transform: "translateX(-50%)", backgroundColor: "white", color: "black", borderRadius: 999, padding: "6px 16px", fontWeight: "bold", fontSize: 14 }}>{idx + 1} / {safe.length}</div>}
    </div>,
    document.body
  );
}

// --------------------------- Criteria & Match ---------------------------

type CriteriaResult = {
  price: Status; beds: Status; baths: Status; surface: Status; pool: Status;
  furnished: Status; pets: Status; availableNow: Status;
  matchCount: number; matchTotal: number;
};

function buildCriteria(prop: Propiedad, demand: Lead["demanda"]): CriteriaResult {
  const c: CriteriaResult = { price: "ok", beds: "ok", baths: "ok", surface: "ok", pool: "ok", furnished: "ok", pets: "ok", availableNow: "ok", matchCount: 0, matchTotal: 8 };
  // Price
  const pmax = Number(demand?.presupuesto_max ?? 0);
  const precio = Number(prop.precio ?? 0);
  if (pmax > 0 && precio > 0) {
    if (precio <= pmax) c.price = "ok";
    else if (precio <= pmax * 1.1) c.price = "warn";
    else c.price = "fail";
  }
  // Beds
  const hmin = demand?.habitaciones_min ?? null;
  if (hmin != null && prop.habitaciones != null) {
    if (prop.habitaciones >= hmin) c.beds = "ok";
    else if (prop.habitaciones === hmin - 1) c.beds = "warn";
    else c.beds = "fail";
  }
  // Baths (no demand) — ok if >=1
  c.baths = (prop.banos ?? 0) >= 1 ? "ok" : "warn";
  // Surface — informational
  c.surface = "ok";
  // Pool
  c.pool = prop.piscina && prop.piscina !== "no" ? "ok" : "warn";
  // Furnished
  c.furnished = prop.amueblado === false ? "warn" : "ok";
  // Pets
  if (demand?.mascotas) c.pets = prop.mascotas_permitidas ? "ok" : "fail";
  else c.pets = "ok";
  // Available
  c.availableNow = prop.disponible === false ? "warn" : "ok";

  c.matchCount = (["price", "beds", "baths", "surface", "pool", "furnished", "pets", "availableNow"] as const)
    .filter((k) => c[k] === "ok").length;
  return c;
}

function matchScoreFromCriteria(c: CriteriaResult) {
  const score = c.matchCount / c.matchTotal;
  return Math.round(score * 100);
}

const WHATSAPP = "34662317561";
const EMAIL = "info@propaxar.es";

function rankMeta(rank: number, t: Record<string, string>) {
  if (rank === 0) return { label: t.best_match, color: "hsl(142 71% 45%)" };
  if (rank === 1) return { label: t.good_option, color: "hsl(213 56% 43%)" };
  return { label: t.option, color: "hsl(222 28% 16%)" };
}

function fmtPrecio(n: number | null, op: string | null | undefined) {
  if (!n) return "—";
  const isRent = op !== "venta" && op !== "compra";
  return `€${n.toLocaleString("en-US")}${isRent ? "/mes" : ""}`;
}

function ratingLabel(stars: number, t: Record<string, string>) {
  if (stars >= 5) return t.excellent;
  if (stars >= 4) return t.good;
  return t.fair;
}

function splitLines(s: string | null | undefined): string[] {
  if (!s) return [];
  return s.split(/\r?\n+/).map((x) => x.replace(/^[-•·\s]+/, "").trim()).filter(Boolean);
}

// --------------------------- Property Card ---------------------------

function PropertyCard({
  prop, sel, criteria, rank, t, S, waMsg,
}: {
  prop: Propiedad; sel: PropSel; criteria: CriteriaResult; rank: number;
  t: Record<string, string>; S: typeof SECTIONS["en"]; waMsg: string;
}) {
  const [open, setOpen] = useState(rank === 0);
  const [lightbox, setLightbox] = useState<{ open: boolean; index: number }>({ open: false, index: 0 });
  const fade = useFadeIn();
  const photos = prop.imagenes ?? [];
  const hasPhotos = photos.length > 0;
  const meta = rankMeta(rank, t);
  const matchPct = matchScoreFromCriteria(criteria);
  const stars = {
    quality: prop.valoracion_calidad ?? 4,
    location: prop.valoracion_ubicacion ?? 4,
    price: prop.valoracion_precio ?? 4,
  };
  const texts = {
    quality: prop.texto_calidad ?? prop.descripcion ?? "",
    location: prop.texto_ubicacion ?? "",
    price: prop.texto_precio ?? "",
  };
  const pa = {
    access: prop.analisis_acceso, water: prop.analisis_agua, internet: prop.analisis_internet,
    neighbourhood: prop.analisis_vecindario, history: prop.analisis_historial, owner: prop.analisis_propietario,
  };
  const pros = splitLines(prop.puntos_fuertes);
  const cons = splitLines(prop.aspectos_a_considerar);
  const listingUrl = prop.url_listado ?? "";

  return (
    <div ref={fade.ref} className={fade.className}>
      {lightbox.open && hasPhotos && (
        <Lightbox images={photos} initialIndex={lightbox.index} onClose={() => setLightbox({ open: false, index: 0 })} />
      )}

      <Card className="overflow-hidden border-0" style={{ boxShadow: "0 4px 24px hsl(0 0% 0%/0.08)", borderRadius: 12 }}>
        <div className="flex flex-wrap gap-2 px-5 pt-5">
          <span className="px-3 py-1 rounded-full text-xs font-bold text-white" style={{ background: meta.color }}>{meta.label}</span>
          {prop.propaxar_direct && (
            <span className="px-3 py-1 rounded-full text-xs font-bold text-white" style={{ background: "hsl(39 76% 61%)" }}>{t.direct}</span>
          )}
        </div>

        {hasPhotos && (
          <div className="relative h-52 bg-gray-200 overflow-hidden cursor-pointer mx-5 mt-3 rounded-lg" onClick={() => setLightbox({ open: true, index: 0 })}>
            <img src={photos[0]} alt={prop.titulo} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" loading="lazy" />
            <div className="absolute bottom-3 right-3 bg-black/50 text-white text-xs px-2 py-1 rounded-full">📷 {photos.length}</div>
          </div>
        )}

        <CardContent className="p-5 space-y-3">
          <h3 className="text-lg font-bold" style={{ color: "hsl(213 56% 23%)" }}>
            {prop.ref_interna ? `${prop.ref_interna} · ` : ""}{prop.titulo}{prop.zona ? ` · ${prop.zona}` : ""}
          </h3>

          <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-sm">
            <div className="flex justify-between"><span>{t.price}:</span><span className="font-semibold">{fmtPrecio(prop.precio, prop.operacion)} <StatusIcon status={criteria.price} /></span></div>
            <div className="flex justify-between"><span>{t.bedrooms_l}:</span><span className="font-semibold">{prop.habitaciones ?? "—"} <StatusIcon status={criteria.beds} /></span></div>
            <div className="flex justify-between"><span>{t.bathrooms}:</span><span className="font-semibold">{prop.banos ?? "—"} <StatusIcon status={criteria.baths} /></span></div>
            <div className="flex justify-between"><span>{t.surface}:</span><span className="font-semibold">{prop.m2_construidos ? `${prop.m2_construidos}m²` : "—"} <StatusIcon status={criteria.surface} /></span></div>
            <div className="flex justify-between"><span>{t.pool}:</span><span className="font-semibold">{prop.piscina && prop.piscina !== "no" ? prop.piscina : t.no} <StatusIcon status={criteria.pool} /></span></div>
            <div className="flex justify-between"><span>{t.furnished}:</span><span className="font-semibold">{prop.amueblado === false ? t.no : t.yes} <StatusIcon status={criteria.furnished} /></span></div>
            <div className="flex justify-between"><span>{t.pets}:</span><span className="font-semibold">{prop.mascotas_permitidas ? t.yes : t.no} <StatusIcon status={criteria.pets} /></span></div>
            <div className="flex justify-between"><span>{t.available_l}:</span><span className="font-semibold">{prop.disponible === false ? t.no : t.yes} <StatusIcon status={criteria.availableNow} /></span></div>
          </div>

          <div className="pt-2">
            <div className="flex justify-between text-sm mb-1">
              <span className="font-semibold" style={{ color: "hsl(213 56% 23%)" }}>{t.compat}</span>
              <span className="font-bold" style={{ color: criteria.matchCount >= criteria.matchTotal - 1 ? "hsl(142 71% 45%)" : "hsl(39 76% 51%)" }}>
                {criteria.matchCount}/{criteria.matchTotal} · {matchPct}%
              </span>
            </div>
            <Progress value={matchPct} className="h-3" />
          </div>

          {listingUrl && (
            <div className="flex flex-wrap gap-2 pt-1">
              <a href={listingUrl}><Button variant="outline" size="sm" className="text-xs"><ExternalLink className="w-3 h-3 mr-1" /> {t.view_listing}</Button></a>
            </div>
          )}

          <Button className="w-full mt-2 font-semibold" style={{ background: "hsl(213 56% 23%)", color: "#fff", borderRadius: 8 }} onClick={() => setOpen(!open)}>
            {open ? t.hide : t.view_full}
            {open ? <ChevronUp className="ml-2 w-4 h-4" /> : <ChevronDown className="ml-2 w-4 h-4" />}
          </Button>
        </CardContent>

        {open && (
          <div className="border-t px-5 pb-6 space-y-6 animate-fade-in">
            {hasPhotos && (
              <div className="pt-4">
                <p className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: "hsl(215 19% 34%)" }}>{t.click_enlarge}</p>
                <div className="grid grid-cols-3 gap-2">
                  {photos.map((src, i) => (
                    <img key={i} src={src} alt={`Photo ${i + 1}`} className="rounded-lg w-full h-24 object-cover cursor-pointer hover:opacity-80 hover:scale-105 transition-all duration-200" loading="lazy" onClick={() => setLightbox({ open: true, index: i })} />
                  ))}
                </div>
              </div>
            )}

            {/* Custom analysis from CRM */}
            {sel.analisis_personalizado && (
              <div className="rounded-xl p-5" style={{ background: "hsl(213 56% 23%/0.04)" }}>
                <h4 className="font-bold mb-2" style={{ color: "hsl(213 56% 23%)" }}>✍️ {t.custom_analysis}</h4>
                <p className="text-sm whitespace-pre-line" style={{ color: "hsl(215 19% 34%)" }}>{sel.analisis_personalizado}</p>
              </div>
            )}

            {/* Ratings tabs */}
            <div>
              <h4 className="font-bold mb-3" style={{ color: "hsl(213 56% 23%)" }}>{t.ratings}</h4>
              <Tabs defaultValue="quality">
                <TabsList className="w-full">
                  <TabsTrigger value="quality" className="flex-1 text-xs">{t.quality}</TabsTrigger>
                  <TabsTrigger value="location" className="flex-1 text-xs">{t.location}</TabsTrigger>
                  <TabsTrigger value="price" className="flex-1 text-xs">{t.price_t}</TabsTrigger>
                </TabsList>
                {(["quality", "location", "price"] as const).map((key) => (
                  <TabsContent key={key} value={key} className="mt-3 space-y-2">
                    <div className="flex items-center gap-2">
                      <Stars count={stars[key]} />
                      <span className="text-sm font-semibold">({stars[key]}/5)</span>
                      <Badge className="text-xs" style={{ background: "hsl(142 71% 45%)", color: "#fff", border: "none" }}>{ratingLabel(stars[key], t)}</Badge>
                    </div>
                    {texts[key] && <p className="text-sm whitespace-pre-line" style={{ color: "hsl(215 19% 34%)" }}>{texts[key]}</p>}
                  </TabsContent>
                ))}
              </Tabs>
            </div>

            {/* Professional analysis */}
            {(pa.access || pa.water || pa.internet || pa.neighbourhood || pa.history || pa.owner) && (
              <div className="rounded-xl p-5 space-y-4" style={{ background: "hsl(142 71% 45%/0.06)" }}>
                <h4 className="font-bold" style={{ color: "hsl(213 56% 23%)" }}>{S.proAnalysis.title}</h4>
                {([
                  [S.proAnalysis.access, pa.access],
                  [S.proAnalysis.water, pa.water],
                  [S.proAnalysis.internet, pa.internet],
                  [S.proAnalysis.neighbourhood, pa.neighbourhood],
                  [S.proAnalysis.history, pa.history],
                  [S.proAnalysis.owner, pa.owner],
                ] as const).filter(([, v]) => v).map(([label, text]) => (
                  <div key={label}>
                    <p className="text-xs font-bold uppercase tracking-wide mb-1" style={{ color: "hsl(213 56% 23%)" }}>{label}</p>
                    <p className="text-sm" style={{ color: "hsl(215 19% 34%)" }}>{text}</p>
                  </div>
                ))}
              </div>
            )}

            {pros.length > 0 && (
              <div>
                <h4 className="font-bold flex items-center gap-2 mb-2" style={{ color: "hsl(142 71% 45%)" }}>
                  <Check className="w-4 h-4" /> {t.strengths}
                </h4>
                <ul className="space-y-1">
                  {pros.map((x, i) => <li key={i} className="text-sm flex items-start gap-2"><Check className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "hsl(142 71% 45%)" }} />{x}</li>)}
                </ul>
              </div>
            )}

            {cons.length > 0 && (
              <div>
                <h4 className="font-bold flex items-center gap-2 mb-2 text-amber-600">
                  <AlertTriangle className="w-4 h-4" /> {t.considerations}
                </h4>
                <ul className="space-y-1">
                  {cons.map((x, i) => <li key={i} className="text-sm flex items-start gap-2"><AlertTriangle className="w-4 h-4 mt-0.5 shrink-0 text-amber-500" />{x}</li>)}
                </ul>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-2 pt-2">
              <a href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(waMsg + " — " + (prop.ref_interna ?? prop.titulo))}`} target="_blank" rel="noopener noreferrer" className="flex-1">
                <Button className="w-full font-semibold" style={{ background: "hsl(142 71% 45%)", color: "#fff", borderRadius: 8 }}>
                  <MessageCircle className="w-4 h-4 mr-2" /> 📅 {t.request_viewing}
                </Button>
              </a>
              {listingUrl && (
                <a href={listingUrl} className="flex-1">
                  <Button variant="outline" className="w-full font-semibold" style={{ borderRadius: 8 }}>
                    <ExternalLink className="w-4 h-4 mr-2" /> 🔗 {t.view_listing}
                  </Button>
                </a>
              )}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}

// --------------------------- Comparison Table ---------------------------

function ComparisonTable({ items, t }: { items: { prop: Propiedad; criteria: CriteriaResult }[]; t: Record<string, string> }) {
  const fade = useFadeIn();
  const statusBg = (s: Status) => s === "ok" ? "hsl(142 71% 45%/0.1)" : s === "warn" ? "hsl(39 76% 61%/0.15)" : "hsl(0 72% 51%/0.1)";
  const rows: { label: string; key: keyof CriteriaResult | "total"; values: { text: string; status: Status }[] }[] = [
    { label: t.price, key: "price", values: items.map((x) => ({ text: fmtPrecio(x.prop.precio, x.prop.operacion), status: x.criteria.price })) },
    { label: t.bedrooms_l, key: "beds", values: items.map((x) => ({ text: String(x.prop.habitaciones ?? "—"), status: x.criteria.beds })) },
    { label: t.bathrooms, key: "baths", values: items.map((x) => ({ text: String(x.prop.banos ?? "—"), status: x.criteria.baths })) },
    { label: t.surface, key: "surface", values: items.map((x) => ({ text: x.prop.m2_construidos ? `${x.prop.m2_construidos}m²` : "—", status: x.criteria.surface })) },
    { label: t.pool, key: "pool", values: items.map((x) => ({ text: x.prop.piscina && x.prop.piscina !== "no" ? "✅" : "—", status: x.criteria.pool })) },
    { label: t.furnished, key: "furnished", values: items.map((x) => ({ text: x.prop.amueblado === false ? "—" : "✅", status: x.criteria.furnished })) },
    { label: t.pets, key: "pets", values: items.map((x) => ({ text: x.prop.mascotas_permitidas ? "✅" : "—", status: x.criteria.pets })) },
    { label: t.available_l, key: "availableNow", values: items.map((x) => ({ text: x.prop.disponible === false ? "—" : "✅", status: x.criteria.availableNow })) },
    { label: "TOTAL", key: "total", values: items.map((x) => ({ text: `${x.criteria.matchCount}/${x.criteria.matchTotal}`, status: x.criteria.matchCount >= x.criteria.matchTotal - 1 ? "ok" : "warn" })) },
  ];

  return (
    <div ref={fade.ref} className={fade.className}>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-xs font-bold whitespace-nowrap">{t.criteria}</TableHead>
              {items.map((x, i) => (
                <TableHead key={i} className="text-xs font-bold whitespace-nowrap">{x.prop.ref_interna ?? `#${i + 1}`} · {x.prop.titulo}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((r, i) => (
              <TableRow key={i} className={i === rows.length - 1 ? "font-bold" : ""}>
                <TableCell className="text-xs font-semibold whitespace-nowrap">{r.label}</TableCell>
                {r.values.map((v, j) => (
                  <TableCell key={j} className="text-xs" style={{ background: statusBg(v.status) }}>{v.text}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

// --------------------------- Main Page ---------------------------

export default function ReportePublico() {
  const { slug } = useParams<{ slug: string }>();
  const testUrl = (supabase as any).supabaseUrl || "NO URL";
  const [debugQuery, setDebugQuery] = useState<string>("loading...");
  const [debugError, setDebugError] = useState<string>("");

  useEffect(() => {
    (async () => {
      try {
        const { data, error } = await supabase.from("reportes").select("count").limit(1);
        setDebugQuery(JSON.stringify(data));
        setDebugError(error ? JSON.stringify(error) : "no error");
      } catch (e: any) {
        setDebugError("EXCEPTION: " + (e?.message || String(e)));
      }
    })();
  }, []);

  return (
    <div style={{ padding: "40px", fontFamily: "monospace" }}>
      <h1>DEBUG</h1>
      <p>Slug from URL: {slug}</p>
      <p>Supabase client URL: {testUrl}</p>
      <p>Test query result: {debugQuery}</p>
      <p>Test query error: {debugError}</p>
    </div>
  );
  const [reporte, setReporte] = useState<Reporte | null>(null);
  const [propiedades, setPropiedades] = useState<Propiedad[]>([]);
  const [lead, setLead] = useState<Lead | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [debug, setDebug] = useState<string>("");
  const [inactivo, setInactivo] = useState<string | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const heroFade = useFadeIn();
  const profileFade = useFadeIn();
  const marketFade = useFadeIn();
  const docsFade = useFadeIn();
  const propsFade = useFadeIn();
  const logisticsFade = useFadeIn();
  const chartFade = useFadeIn();
  const compFade = useFadeIn();
  const recoFade = useFadeIn();
  const stepsFade = useFadeIn();
  const pdfFade = useFadeIn();

  useEffect(() => {
    (async () => {
      if (!slug) { setError("Slug ausente en la URL."); setLoading(false); return; }
      try {
        console.log("[ReportePublico] Buscando slug:", slug);
        const { data: r, error: rError } = await supabase
          .from("reportes")
          .select("*")
          .eq("slug", slug)
          .maybeSingle();
        console.log("[ReportePublico] Resultado:", { data: r, error: rError });
        setDebug(`slug="${slug}" · data=${r ? "OK" : "null"} · error=${rError?.message ?? "none"}`);
        if (rError) { setError("Supabase error: " + rError.message); setLoading(false); return; }
        if (!r) { setError("Reporte no encontrado con slug: " + slug); setLoading(false); return; }
        if (r.estado !== "activo") { setInactivo(r.estado); setLoading(false); return; }
        setReporte(r as Reporte);
        const ids = ((r.propiedades_seleccionadas as PropSel[]) ?? []).map((p) => p.propiedad_id);
        if (ids.length) {
          const { data: props, error: pError } = await supabase.from("propiedades").select("*").in("id", ids);
          if (pError) { setError("Supabase error (propiedades): " + pError.message); setLoading(false); return; }
          setPropiedades((props ?? []) as Propiedad[]);
        }
        if (r.lead_id) {
          const { data: l, error: lError } = await supabase
            .from("leads")
            .select("id, persona:personas(nombre, apellidos, nacionalidad, idioma), demanda:demandas(tipo_operacion, presupuesto_max, zona_preferida, tipo_propiedad, habitaciones_min, mascotas, fecha_entrada, flexibilidad)")
            .eq("id", r.lead_id)
            .maybeSingle();
          if (lError) { console.warn("Lead fetch warning:", lError.message); }
          if (l) setLead(l as unknown as Lead);
        }
        setLoading(false);
      } catch (e: any) {
        setError("Error inesperado: " + (e?.message ?? String(e)));
        setLoading(false);
      }
    })();
  }, [slug]);

  const idioma: Idioma = reporte?.idioma ?? "en";
  const t = T[idioma];
  const S = SECTIONS[idioma];

  const ordered = useMemo(() => {
    if (!reporte) return [];
    const sels = [...(reporte.propiedades_seleccionadas ?? [])].sort((a, b) => a.orden - b.orden);
    const map = new Map(propiedades.map((p) => [p.id, p]));
    return sels
      .map((s) => {
        const prop = map.get(s.propiedad_id);
        if (!prop) return null;
        const criteria = buildCriteria(prop, lead?.demanda ?? null);
        return { sel: s, prop, criteria };
      })
      .filter((x): x is { sel: PropSel; prop: Propiedad; criteria: CriteriaResult } => x !== null);
  }, [reporte, propiedades, lead]);

  const handleDownloadPdf = async () => {
    const html2pdf = (await import("html2pdf.js")).default;
    const el = contentRef.current;
    if (!el) return;
    el.querySelectorAll("[data-no-print]").forEach((n) => ((n as HTMLElement).style.display = "none"));
    await html2pdf().set({
      margin: 10,
      filename: `Propaxar_Report_${slug ?? "report"}_${new Date().toISOString().slice(0, 10)}.pdf`,
      image: { type: "jpeg", quality: 0.95 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    }).from(el).save();
    el.querySelectorAll("[data-no-print]").forEach((n) => ((n as HTMLElement).style.display = ""));
  };

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-500">
        <Helmet><meta name="robots" content="noindex, nofollow" /></Helmet>
        <p>…</p>
      </main>
    );
  }
  if (error) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-slate-50 px-6">
        <Helmet><meta name="robots" content="noindex, nofollow" /></Helmet>
        <div className="max-w-xl w-full border border-red-300 bg-red-50 text-red-800 rounded-lg p-6">
          <p className="font-semibold mb-2">No se pudo cargar el reporte</p>
          <p className="text-sm break-words">{error}</p>
          <p className="mt-4 text-xs text-red-700/70">slug: {slug ?? "—"}</p>
        </div>
      </main>
    );
  }
  if (inactivo) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-slate-50 px-6">
        <Helmet><meta name="robots" content="noindex, nofollow" /></Helmet>
        <div className="text-center max-w-md">
          <p className="text-xl font-semibold text-slate-700">Este reporte no está disponible</p>
          <p className="mt-2 text-sm text-slate-500">Estado: {inactivo}</p>
          <p className="mt-1 text-xs text-slate-400">slug: {slug} · {debug}</p>
        </div>
      </main>
    );
  }
  if (notFound || !reporte) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-slate-50">
        <Helmet><meta name="robots" content="noindex, nofollow" /></Helmet>
        <div className="text-center px-6">
          <p className="text-xl font-semibold text-slate-700">{T.es.inactive}</p>
          <p className="mt-2 text-sm text-slate-500">Propaxar · Manuel Fernández</p>
        </div>
      </main>
    );
  }

  const persona = lead?.persona;
  const demanda = lead?.demanda;
  const cliente = (reporte.nombre_cliente
    ?? [persona?.nombre, persona?.apellidos].filter(Boolean).join(" ").trim())
    || "—";
  const fechaStr = new Date(reporte.created_at).toLocaleDateString(idioma, { month: "long", year: "numeric" });
  const validUntil = new Date(reporte.created_at);
  validUntil.setMonth(validUntil.getMonth() + 6);
  const validStr = validUntil.toLocaleDateString(idioma, { month: "long", year: "numeric" });
  const numProps = ordered.length;
  const hasCampo = ordered.some((x) => (x.prop.zona ?? "").toLowerCase().includes("campo"));

  const waMsg = `Hello Manuel, I'm ${cliente}. I'd like to arrange a viewing.`;
  const WHATSAPP_LINK = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(waMsg)}`;
  const EMAIL_LINK = `mailto:${EMAIL}?subject=${encodeURIComponent(`Report Inquiry - ${cliente}`)}`;

  return (
    <>
      <Helmet>
        <html lang={idioma} />
        <title>{`${t.hero_title} · ${cliente} · Propaxar`}</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta property="og:title" content={t.hero_title} />
        <meta property="og:description" content="Stop searching. Start finding." />
      </Helmet>

      {/* HERO */}
      <section className="relative h-screen flex items-center justify-center text-center text-white overflow-hidden">
        <img src={heroImg} alt="Frigiliana" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/55" />
        <div ref={heroFade.ref} className={`relative z-10 px-6 max-w-xl ${heroFade.className}`}>
          <img src="/propaxar-vision.png" alt="Propaxar" className="h-10 mx-auto mb-6 opacity-90" />
          <h1 className="text-4xl md:text-6xl font-bold leading-tight text-white mb-3">{t.hero_title}</h1>
          <p className="text-xl md:text-2xl font-medium mt-4 text-white/90">
            {t.hero_prepared} <strong>{cliente}</strong>
          </p>
          <p className="text-base mt-2 text-white/70">{t.hero_by}</p>
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {[`🗓 ${fechaStr}`, `🏡 ${numProps} ${t.properties_label}`, `📍 ${t.hero_zone}`, `🌐 ${t.hero_confidential}`].map((b) => (
              <span key={b} className="px-3 py-1.5 rounded-full text-xs font-medium bg-white/15 text-white/90 backdrop-blur-sm">{b}</span>
            ))}
          </div>
          <p className="text-sm mt-8 italic text-white/60 max-w-md mx-auto leading-relaxed">
            "{t.hero_quote}"<br />— Manuel Fernández, Propaxar
          </p>
          <ChevronDown className="mx-auto mt-8 w-8 h-8 animate-bounce text-white/60" />
        </div>
      </section>

      <div ref={contentRef}>
        {/* PROFILE */}
        <section className="py-16 px-4 md:px-8 max-w-5xl mx-auto" ref={profileFade.ref}>
          <div className={profileFade.className}>
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-10" style={{ color: "hsl(213 56% 23%)" }}>{t.profile_title}</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-0" style={{ boxShadow: "0 4px 20px hsl(0 0% 0%/0.07)", borderRadius: 12 }}>
                <CardContent className="p-6">
                  <h3 className="font-bold mb-4 text-sm uppercase tracking-wide" style={{ color: "hsl(213 56% 23%)" }}>{t.profile_req}</h3>
                  <div className="space-y-2">
                    {([
                      [t.op, demanda?.tipo_operacion ?? "—"],
                      [t.budget, demanda?.presupuesto_max ? `€${Number(demanda.presupuesto_max).toLocaleString("en-US")}` : "—"],
                      [t.zone, demanda?.zona_preferida ?? t.any],
                      [t.type, demanda?.tipo_propiedad ?? t.any],
                      [t.bedrooms, demanda?.habitaciones_min != null ? String(demanda.habitaciones_min) : t.any],
                      [t.pets, demanda?.mascotas ? t.yes : t.no],
                      [t.move_in, demanda?.fecha_entrada ?? "—"],
                      [t.flex, demanda?.flexibilidad ?? "—"],
                    ] as [string, string][]).map(([k, v]) => (
                      <div key={k} className="flex justify-between text-sm">
                        <span style={{ color: "hsl(215 19% 34%)" }}>{k}</span>
                        <span className="font-semibold text-right" style={{ color: "hsl(213 56% 23%)" }}>{v}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card className="border-0" style={{ boxShadow: "0 4px 20px hsl(0 0% 0%/0.07)", borderRadius: 12 }}>
                <CardContent className="p-6">
                  <h3 className="font-bold mb-4 text-sm uppercase tracking-wide" style={{ color: "hsl(213 56% 23%)" }}>{t.profile_you}</h3>
                  <div className="space-y-2">
                    {([
                      [t.name, cliente],
                      [t.nationality, persona?.nacionalidad ?? "—"],
                      [t.language, persona?.idioma ?? idioma.toUpperCase()],
                    ] as [string, string][]).map(([k, v]) => (
                      <div key={k} className="flex justify-between text-sm">
                        <span style={{ color: "hsl(215 19% 34%)" }}>{k}</span>
                        <span className="font-semibold text-right" style={{ color: "hsl(213 56% 23%)" }}>{v}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* MARKET CONTEXT */}
        {reporte.texto_mercado && (
          <section className="py-12 px-4 md:px-8 max-w-5xl mx-auto" ref={marketFade.ref}>
            <div className={marketFade.className}>
              <Card className="border-0" style={{ boxShadow: "0 4px 20px hsl(0 0% 0%/0.07)", borderRadius: 12 }}>
                <CardContent className="p-8">
                  <h2 className="text-xl font-bold mb-4" style={{ color: "hsl(213 56% 23%)" }}>{t.market_title} · {fechaStr}</h2>
                  <p className="text-sm leading-relaxed whitespace-pre-line" style={{ color: "hsl(215 19% 34%)" }}>{reporte.texto_mercado}</p>
                </CardContent>
              </Card>
            </div>
          </section>
        )}

        {/* DOCUMENTATION */}
        <section className="py-16 px-4 md:px-8 max-w-5xl mx-auto" ref={docsFade.ref}>
          <div className={docsFade.className}>
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-2" style={{ color: "hsl(213 56% 23%)" }}>{S.docsTitle}</h2>
            <p className="text-center text-sm mb-10" style={{ color: "hsl(215 19% 34%)" }}>{S.docsSubtitle}</p>
            <div className="grid sm:grid-cols-2 gap-6">
              {S.docs.map((doc, i) => (
                <Card key={i} className="border-0 overflow-hidden" style={{ boxShadow: "0 4px 20px hsl(0 0% 0%/0.07)", borderRadius: 12 }}>
                  <CardContent className="p-6 space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0" style={{ background: "hsl(213 56% 23%/0.08)", color: "hsl(213 56% 23%)" }}>{ICONS[doc.icon]}</div>
                      <div>
                        <h3 className="font-bold text-sm" style={{ color: "hsl(213 56% 23%)" }}>{doc.title}</h3>
                        <span className="inline-block text-xs font-bold mt-1 px-2 py-0.5 rounded-full text-white" style={{ background: doc.urgencyColor }}>{doc.urgency}</span>
                      </div>
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: "hsl(215 19% 34%)" }}>{doc.description}</p>
                    <ul className="space-y-1">
                      {doc.steps.map((s, j) => (
                        <li key={j} className="text-sm flex items-start gap-2">
                          <Check className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "hsl(142 71% 45%)" }} />
                          <span style={{ color: "hsl(215 19% 34%)" }}>{s}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="text-xs font-medium" style={{ color: "hsl(213 56% 40%)" }}>{doc.tip}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* PROPERTIES */}
        <section className="py-16 px-4 md:px-8 max-w-5xl mx-auto" ref={propsFade.ref}>
          <div className={propsFade.className}>
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-2" style={{ color: "hsl(213 56% 23%)" }}>{t.props_title}</h2>
            <p className="text-center text-sm mb-10" style={{ color: "hsl(215 19% 34%)" }}>{t.props_subtitle}</p>
            <div className="grid grid-cols-1 gap-6">
              {ordered.map((x, i) => (
                <PropertyCard key={x.prop.id} prop={x.prop} sel={x.sel} criteria={x.criteria} rank={i} t={t} S={S} waMsg={waMsg} />
              ))}
            </div>
          </div>
        </section>

        {/* LOGISTICS */}
        {hasCampo && (
          <section className="py-16 px-4 md:px-8 max-w-5xl mx-auto" ref={logisticsFade.ref}>
            <div className={logisticsFade.className}>
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-1" style={{ color: "hsl(213 56% 23%)" }}>{S.logisticsTitle}</h2>
              <p className="text-center text-sm mb-10" style={{ color: "hsl(215 19% 34%)" }}>{S.logisticsSubtitle}</p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {S.logistics.map((c, i) => (
                  <Card key={i} className="border" style={{ borderColor: "hsl(212 26% 83%)", borderRadius: 12 }}>
                    <CardContent className="p-6 space-y-4">
                      <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: "hsl(213 56% 23%/0.08)", color: "hsl(213 56% 23%)" }}>{ICONS[c.icon]}</div>
                      <h3 className="font-bold text-sm" style={{ color: "hsl(213 56% 23%)" }}>{c.title}</h3>
                      <div className="space-y-3">
                        <div>
                          <p className="text-xs font-bold uppercase tracking-wide mb-1" style={{ color: "hsl(213 56% 23%)" }}>{S.countryside}</p>
                          <p className="text-sm leading-relaxed" style={{ color: "hsl(215 19% 34%)" }}>{c.countryside}</p>
                        </div>
                        <div className="border-t pt-3" style={{ borderColor: "hsl(212 26% 90%)" }}>
                          <p className="text-xs font-bold uppercase tracking-wide mb-1" style={{ color: "hsl(213 56% 40%)" }}>{S.inTown}</p>
                          <p className="text-sm leading-relaxed" style={{ color: "hsl(215 19% 34%)" }}>{c.town}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* MARKET CHART */}
        <section className="py-12 px-4 md:px-8 max-w-5xl mx-auto" ref={chartFade.ref}>
          <div className={chartFade.className}>
            <Card className="border-0" style={{ boxShadow: "0 4px 20px hsl(0 0% 0%/0.07)", borderRadius: 12 }}>
              <CardContent className="p-6 md:p-8">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp className="w-5 h-5" style={{ color: "hsl(142 71% 45%)" }} />
                  <h3 className="font-bold" style={{ color: "hsl(213 56% 23%)" }}>{S.chartTitle}</h3>
                </div>
                <p className="text-xs mb-6" style={{ color: "hsl(215 19% 34%)" }}>{S.chartSubtitle}</p>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={[
                      { year: "2020", price: 650 }, { year: "2021", price: 690 }, { year: "2022", price: 730 },
                      { year: "2023", price: 780 }, { year: "2024", price: 830 }, { year: "2025", price: 880 }, { year: "2026", price: 935 },
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(212 26% 83%)" />
                      <XAxis dataKey="year" tick={{ fontSize: 12, fill: "hsl(215 19% 34%)" }} />
                      <YAxis tick={{ fontSize: 12, fill: "hsl(215 19% 34%)" }} tickFormatter={(v) => `€${v}`} />
                      <Tooltip formatter={(value: number) => [`€${value}/month`, S.chartTooltip]} />
                      <Line type="monotone" dataKey="price" stroke="hsl(213 56% 23%)" strokeWidth={2.5} dot={{ fill: "hsl(213 56% 23%)", r: 4 }} activeDot={{ r: 6, fill: "hsl(142 71% 45%)" }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* COMPARISON TABLE */}
        {ordered.length > 1 && (
          <section className="py-16 px-4 md:px-8 max-w-5xl mx-auto" style={{ background: "hsl(210 20% 98%)" }} ref={compFade.ref}>
            <div className={compFade.className}>
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-10" style={{ color: "hsl(213 56% 23%)" }}>{t.compare_title}</h2>
              <ComparisonTable items={ordered} t={t} />
            </div>
          </section>
        )}

        {/* RECOMMENDATION */}
        {reporte.texto_recomendacion && (
          <section className="py-16 px-4 md:px-8 max-w-5xl mx-auto" ref={recoFade.ref}>
            <div className={recoFade.className}>
              <Card className="border-0 overflow-hidden" style={{ background: "linear-gradient(135deg, hsl(142 71% 45%), hsl(142 71% 38%))", borderRadius: 16 }}>
                <CardContent className="p-8 text-white space-y-4">
                  <h2 className="text-2xl font-bold text-white">🏆 {t.rec_title}{cliente !== "—" ? `, ${cliente.split(" ")[0]}` : ""}</h2>
                  <div className="text-sm leading-relaxed text-white/90 whitespace-pre-line">{reporte.texto_recomendacion}</div>
                  <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" data-no-print>
                    <Button className="mt-4 text-base font-bold px-10 py-5" style={{ background: "#fff", color: "hsl(142 71% 35%)", borderRadius: 10 }}>
                      <MessageCircle className="w-5 h-5 mr-2" /> {t.arrange}
                    </Button>
                  </a>
                </CardContent>
              </Card>
            </div>
          </section>
        )}

        {/* NEXT STEPS */}
        <section className="py-16 px-4 md:px-8 max-w-5xl mx-auto" style={{ background: "hsl(210 20% 98%)" }} ref={stepsFade.ref}>
          <div className={stepsFade.className}>
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-10" style={{ color: "hsl(213 56% 23%)" }}>{t.next_title}</h2>
            <div className="grid sm:grid-cols-3 gap-8">
              {[
                { num: "1️⃣", title: t.n1_t, desc: t.n1_d },
                { num: "2️⃣", title: t.n2_t, desc: t.n2_d },
                { num: "3️⃣", title: t.n3_t, desc: t.n3_d },
              ].map((s, i) => (
                <div key={i} className="text-center space-y-3">
                  <div className="text-4xl">{s.num}</div>
                  <h3 className="font-bold text-sm" style={{ color: "hsl(213 56% 23%)" }}>{s.title}</h3>
                  <p className="text-sm" style={{ color: "hsl(215 19% 34%)" }}>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PDF DOWNLOAD */}
        <section className="py-16 px-4 md:px-8 max-w-3xl mx-auto text-center" ref={pdfFade.ref} data-no-print>
          <div className={pdfFade.className}>
            <Card className="border-0" style={{ boxShadow: "0 4px 24px hsl(0 0% 0%/0.08)", borderRadius: 16 }}>
              <CardContent className="p-8 space-y-4">
                <Download className="w-10 h-10 mx-auto" style={{ color: "hsl(142 71% 45%)" }} />
                <h2 className="text-xl font-bold" style={{ color: "hsl(213 56% 23%)" }}>{t.pdf_title}</h2>
                <p className="text-sm" style={{ color: "hsl(215 19% 34%)" }}>{t.pdf_sub}</p>
                <Button onClick={handleDownloadPdf} className="text-base font-bold px-10 py-5" style={{ background: "hsl(142 71% 45%)", color: "#fff", borderRadius: 10 }}>
                  <Download className="w-5 h-5 mr-2" /> {t.pdf_btn}
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>

      {/* FOOTER */}
      <footer className="py-12 px-4 text-center text-white" style={{ background: "hsl(213 56% 23%)" }} data-no-print>
        <img src="/propaxar-vision.png" alt="Propaxar" className="h-8 mx-auto mb-6 brightness-200" />
        <p className="text-xl font-bold mb-1 text-white">Manuel Fernández · Propaxar</p>
        <p className="text-sm text-white/70 mb-4">Your Personal Property Expert in La Axarquía</p>
        <div className="flex flex-col sm:flex-row justify-center gap-3 mb-4">
          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
            <Button className="font-semibold" style={{ background: "hsl(142 71% 45%)", color: "#fff", borderRadius: 8 }}>
              <MessageCircle className="w-4 h-4 mr-2" /> +34 662 317 561
            </Button>
          </a>
          <a href={EMAIL_LINK}>
            <Button variant="outline" className="font-semibold border-white/30 text-white hover:bg-white/10" style={{ borderRadius: 8 }}>
              <Mail className="w-4 h-4 mr-2" /> {EMAIL}
            </Button>
          </a>
        </div>
        <p className="text-sm text-white/70">🌐 propaxar.es</p>
        <p className="text-xs text-white/50 mt-2">📍 Frigiliana · La Axarquía · Andalucía</p>
        <div className="mt-6 pt-4 border-t border-white/20 text-xs text-white/50 space-y-1">
          <p><em>{t.confidential_for} {cliente}.</em></p>
          <p>© {new Date().getFullYear()} Propaxar · {t.valid_until} {validStr}</p>
        </div>
      </footer>
    </>
  );
}
