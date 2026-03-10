import { Helmet } from "react-helmet-async";
import heroImg from "@/assets/frigiliana-street.jpg";

const WHATSAPP_LINK = "https://wa.me/34662317561?text=Hello%20Manuel%2C%20I%27m%20Henri%20Gloudemans.%20I%27d%20like%20to%20arrange%20a%20viewing.";

/* ─── Rating dots helper ─── */
function Dots({ filled, color }: { filled: number; color: string }) {
  return (
    <div style={{ display: "flex", gap: 4 }}>
      {[1, 2, 3, 4, 5].map(i => (
        <div
          key={i}
          style={{
            width: 8, height: 8, borderRadius: "50%",
            background: i <= filled ? color : "#e5e3df",
          }}
        />
      ))}
    </div>
  );
}

/* ─── Property Card ─── */
interface Property {
  ref: string;
  zone: string;
  name: string;
  price: string;
  priceLabel: string;
  matchLabel: string;
  matchType: "excellent" | "good" | "top";
  barColor: string;
  specs: string[];
  pros: string[];
  cons: string[];
  locationRating: number;
  priceRating: number;
  qualityRating: number;
  internet: string;
  listingUrl: string;
}

const properties: Property[] = [
  {
    ref: "pa194",
    zone: "Loma de la Cruz",
    name: "Casa Zambra",
    price: "€1,600",
    priceLabel: "per month · long-term",
    matchLabel: "✓ Strong match",
    matchType: "excellent",
    barColor: "#2d6a4f",
    specs: ["🛏 3 bedrooms", "🚿 2 bathrooms", "📐 100 m²", "🏊 Private pool", "🚗 Parking", "🐾 Pets allowed", "🌊 Sea & mountain views"],
    pros: [
      "Direct car access from the track",
      "South-facing — natural light all day",
      "Spectacular panoramic views",
      "5 minutes from Frigiliana village",
      "Reliable owners — fast response if needed",
      "Available immediately",
    ],
    cons: [
      "Adjacent house (well separated, high privacy)",
      "Occasional car sounds from the track — not intrusive",
    ],
    locationRating: 5,
    priceRating: 4,
    qualityRating: 5,
    internet: "📶 Mobile coverage: excellent · WiMAX up to 60mb · Starlink option up to 300mb",
    listingUrl: "/property/villaenfrigiliana",
  },
  {
    ref: "pa224",
    zone: "Loma de la Cruz",
    name: "Cortijo Los Olivos",
    price: "€1,600",
    priceLabel: "per month · long-term",
    matchLabel: "✓ Strong match",
    matchType: "excellent",
    barColor: "#2d6a4f",
    specs: ["🛏 3 bedrooms", "🚿 1 bathroom", "📐 75 m²", "🏊 Private pool", "🚗 Private parking", "🐾 Pets allowed", "🌊 Sea, field & mountain views"],
    pros: [
      "One of the best rural areas in Frigiliana",
      "High-quality construction, recently painted",
      "New windows installed — excellent insulation",
      "Private vehicle entrance",
      "High privacy despite nearby neighbours",
      "Reliable local owner",
    ],
    cons: [
      "Medium-sized bedrooms",
      "1 bathroom for 3 bedrooms",
      "€1,600 slightly above comparable — limited negotiation margin",
    ],
    locationRating: 5,
    priceRating: 3,
    qualityRating: 4,
    internet: "📶 Mobile coverage: good · WiMAX up to 60mb · Starlink option up to 300mb",
    listingUrl: "/property/villaolivos",
  },
  {
    ref: "pa226",
    zone: "Frigiliana Norte",
    name: "Villa Celia",
    price: "€2,500",
    priceLabel: "per month · all expenses included",
    matchLabel: "◎ Top of budget",
    matchType: "top",
    barColor: "hsl(222, 28%, 16%)",
    specs: ["🛏 4 bedrooms", "🚿 2 bathrooms", "📐 200 m²", "🏊 Private pool", "🚗 Parking", "🐾 Pets allowed", "🌳 Garden, orchard & terrace"],
    pros: [
      "Very large — 200m² usable + extensive outdoor spaces",
      "Sun all day, excellent natural light",
      "Direct road access from the Torrox road",
      "All expenses included in the price",
      "4 bedrooms — space for a home office",
      "Sea, field & mountain views",
    ],
    cons: [
      "Light traffic noise during peak hours",
      "At the top of your stated budget",
      "Worth it if space and comfort are the priority",
    ],
    locationRating: 4,
    priceRating: 3,
    qualityRating: 5,
    internet: "📶 WiMAX up to 60mb · Starlink option up to 200mb",
    listingUrl: "/property/villacelia",
  },
];

const css = {
  navy: "hsl(222, 28%, 16%)",
  navyLight: "hsl(222, 28%, 22%)",
  gold: "hsl(38, 65%, 52%)",
  cream: "#F8F7F5",
  white: "#FFFFFF",
  text: "#1a1a2e",
  muted: "#6b7280",
  border: "#e5e3df",
  green: "#2d6a4f",
};

export default function ReporteHenriEN() {
  return (
    <>
      <Helmet>
        <title>Propaxar · Property Report · Henri Gloudemans</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div style={{ fontFamily: "'DM Sans', sans-serif", background: css.cream, color: css.text, lineHeight: 1.6, minHeight: "100vh" }}>
        {/* HEADER */}
        <header style={{ background: css.navy, padding: "48px 40px 40px", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: -60, right: -60, width: 280, height: 280, borderRadius: "50%", background: "rgba(255,255,255,0.04)" }} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 36, flexWrap: "wrap", gap: 12 }}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, color: css.white, letterSpacing: "0.05em" }}>
              Prop<span style={{ color: css.gold }}>axar</span>
            </div>
            <div style={{ textAlign: "right", color: "rgba(255,255,255,0.5)", fontSize: 12, fontWeight: 300, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>
              <div>Property Report</div>
              <div>Frigiliana · March 2026</div>
            </div>
          </div>
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.12)", paddingTop: 28 }}>
            <div style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: css.gold, fontWeight: 500, marginBottom: 8 }}>Prepared for</div>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 36, color: css.white, lineHeight: 1.1, marginBottom: 6 }}>Henri Gloudemans</h1>
            <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 14, fontWeight: 300 }}>Long-term rental · Frigiliana · Couple · Pet-friendly</p>
          </div>
        </header>

        {/* PROFILE STRIP */}
        <div style={{ background: css.white, borderBottom: `1px solid ${css.border}`, padding: "20px 40px", display: "flex", gap: 0, flexWrap: "wrap" }}>
          {[
            { label: "Budget", value: "€1,500 – €2,500/mo" },
            { label: "Occupants", value: "Couple" },
            { label: "Pets", value: "Yes" },
            { label: "Property type", value: "Rural / Independent" },
            { label: "Urgency", value: "Urgent", badge: true },
            { label: "Duration", value: "Long-term (years)" },
          ].map((item, i, arr) => (
            <div key={i} style={{ flex: 1, minWidth: 130, padding: "0 24px 0 0", borderRight: i < arr.length - 1 ? `1px solid ${css.border}` : "none", marginRight: i < arr.length - 1 ? 24 : 0, marginBottom: 8 }}>
              <div style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: css.muted, fontWeight: 500, marginBottom: 4 }}>{item.label}</div>
              <div style={{ fontSize: 14, fontWeight: 500, color: css.text }}>
                {item.value}
                {item.badge && <span style={{ display: "inline-block", marginLeft: 8, padding: "2px 8px", borderRadius: 4, fontSize: 11, fontWeight: 500, background: "#fef3c7", color: "#92400e" }}>Urgent</span>}
              </div>
            </div>
          ))}
        </div>

        {/* INTRO */}
        <section style={{ padding: "48px 40px 32px", maxWidth: 720 }}>
          <div style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: css.gold, fontWeight: 500, marginBottom: 12 }}>My Analysis</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, lineHeight: 1.3, color: css.navy, marginBottom: 16 }}>Three properties. Selected personally for your profile.</h2>
          <p style={{ color: "#4b5563", fontSize: 15, fontWeight: 300, lineHeight: 1.7 }}>
            These are the three properties I have available right now that match what you're looking for: rural, independent, pet-friendly, with parking and views. I've visited each one, I know the owners personally, and I'll give you my honest take on each — including what I'd tell a friend before signing.
          </p>
        </section>

        {/* PROPERTIES */}
        <section style={{ padding: "8px 40px 48px" }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, color: css.navy, marginBottom: 24, paddingBottom: 12, borderBottom: `1px solid ${css.border}` }}>Selected Properties</h2>

          {properties.map((p) => (
            <div key={p.ref} style={{ background: css.white, borderRadius: 14, border: `1px solid ${css.border}`, marginBottom: 28, overflow: "hidden", transition: "box-shadow 0.2s" }}>
              {/* Top color bar */}
              <div style={{ height: 4, background: p.barColor }} />

              <div style={{ padding: "28px 32px" }}>
                {/* Header */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
                  <div>
                    <div style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: css.muted, marginBottom: 4 }}>{p.ref} · {p.name} · {p.zone}</div>
                    <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, color: css.navy }}>{p.name}</div>
                    <div style={{
                      display: "inline-flex", alignItems: "center", gap: 5, padding: "4px 10px", borderRadius: 20, fontSize: 11, fontWeight: 500, marginTop: 6,
                      background: p.matchType === "excellent" ? "#dcfce7" : p.matchType === "top" ? "#f8fafc" : "#fef9c3",
                      color: p.matchType === "excellent" ? "#166534" : p.matchType === "top" ? css.navy : "#854d0e",
                    }}>{p.matchLabel}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, color: css.navy, fontWeight: 600 }}>{p.price}</div>
                    <div style={{ fontSize: 12, color: css.muted, fontWeight: 300 }}>{p.priceLabel}</div>
                  </div>
                </div>

                {/* Specs */}
                <div style={{ display: "flex", gap: 24, padding: "16px 0", borderTop: `1px solid ${css.border}`, borderBottom: `1px solid ${css.border}`, marginBottom: 20, flexWrap: "wrap" }}>
                  {p.specs.map((s, i) => (
                    <span key={i} style={{ fontSize: 13, color: "#374151" }}>{s}</span>
                  ))}
                </div>

                {/* Pros / Cons */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
                  <div style={{ padding: 16, borderRadius: 8, background: "#f0fdf4", border: "1px solid #bbf7d0" }}>
                    <div style={{ fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase" as const, fontWeight: 600, color: "#166534", marginBottom: 10 }}>Advantages</div>
                    <ul style={{ listStyle: "none", padding: 0, fontSize: 13, color: "#374151", fontWeight: 300 }}>
                      {p.pros.map((pro, i) => (
                        <li key={i} style={{ padding: "2px 0", paddingLeft: 14, position: "relative" }}>
                          <span style={{ position: "absolute", left: 0, color: css.muted, fontSize: 11 }}>—</span>{pro}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div style={{ padding: 16, borderRadius: 8, background: "#fffbeb", border: "1px solid #fde68a" }}>
                    <div style={{ fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase" as const, fontWeight: 600, color: "#92400e", marginBottom: 10 }}>Honest considerations</div>
                    <ul style={{ listStyle: "none", padding: 0, fontSize: 13, color: "#374151", fontWeight: 300 }}>
                      {p.cons.map((con, i) => (
                        <li key={i} style={{ padding: "2px 0", paddingLeft: 14, position: "relative" }}>
                          <span style={{ position: "absolute", left: 0, color: css.muted, fontSize: 11 }}>—</span>{con}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Ratings */}
                <div style={{ display: "flex", gap: 20, marginBottom: 20, flexWrap: "wrap" }}>
                  <div style={{ flex: 1, minWidth: 100 }}>
                    <div style={{ fontSize: 11, color: css.muted, textTransform: "uppercase" as const, letterSpacing: "0.08em", marginBottom: 6 }}>Location</div>
                    <Dots filled={p.locationRating} color={css.navy} />
                  </div>
                  <div style={{ flex: 1, minWidth: 100 }}>
                    <div style={{ fontSize: 11, color: css.muted, textTransform: "uppercase" as const, letterSpacing: "0.08em", marginBottom: 6 }}>Price</div>
                    <Dots filled={p.priceRating} color={css.gold} />
                  </div>
                  <div style={{ flex: 1, minWidth: 100 }}>
                    <div style={{ fontSize: 11, color: css.muted, textTransform: "uppercase" as const, letterSpacing: "0.08em", marginBottom: 6 }}>Quality</div>
                    <Dots filled={p.qualityRating} color={css.green} />
                  </div>
                </div>

                {/* Internet */}
                <div style={{ background: "#f8fafc", border: `1px solid ${css.border}`, borderRadius: 8, padding: "12px 16px", fontSize: 13, color: "#374151", marginBottom: 16 }}>
                  {p.internet}
                </div>

                {/* CTA */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 16, borderTop: `1px solid ${css.border}`, flexWrap: "wrap", gap: 12 }}>
                  <span style={{ fontSize: 12, color: css.green, fontWeight: 500 }}>✓ Available now</span>
                  <a href={p.listingUrl} style={{ display: "inline-flex", alignItems: "center", gap: 6, background: css.navy, color: css.white, textDecoration: "none", padding: "10px 20px", borderRadius: 8, fontSize: 13, fontWeight: 500, letterSpacing: "0.02em" }}>
                    View full listing →
                  </a>
                </div>
              </div>
            </div>
          ))}

          {/* RECOMMENDATION */}
          <div style={{ background: css.navy, borderRadius: 14, padding: "32px 36px", marginBottom: 48, color: css.white }}>
            <div style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: css.gold, fontWeight: 500, marginBottom: 12 }}>Manuel's Recommendation</div>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, marginBottom: 14, lineHeight: 1.3 }}>If I were choosing for you, I'd start with Casa Zambra.</h3>
            <p style={{ fontSize: 14, fontWeight: 300, color: "rgba(255,255,255,0.75)", lineHeight: 1.7 }}>
              It has the best combination of location, quality and value for your profile. South-facing, panoramic views, excellent access, reliable owners — and available now. Cortijo Los Olivos is a strong alternative if you prefer the Loma de la Cruz area specifically. Villa Celia is for you if space is the priority and you're comfortable at the top of your budget — all expenses included makes the real cost more comparable than it looks.
            </p>
          </div>

          {/* NEXT STEPS */}
          <div style={{ background: css.white, border: `1px solid ${css.border}`, borderRadius: 14, padding: "28px 32px", marginBottom: 48 }}>
            <div style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: css.gold, fontWeight: 500, marginBottom: 8 }}>Next Steps</div>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, color: css.navy, marginBottom: 16 }}>What happens now</h3>
            <ol style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {[
                "Tell me which property or properties interest you — I'll confirm availability and arrange viewings.",
                "I can organise a remote viewing by video call if you're not yet in Spain.",
                "Once you choose, I handle everything with the owner — contract, conditions, handover.",
              ].map((step, i) => (
                <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 14, padding: "10px 0", borderBottom: i < 2 ? `1px solid ${css.border}` : "none", fontSize: 14, fontWeight: 300, color: "#374151" }}>
                  <span style={{ width: 24, height: 24, borderRadius: "50%", background: css.navy, color: css.white, fontSize: 11, fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>{i + 1}</span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* FOOTER */}
        <footer style={{ background: css.navy, padding: "32px 40px", color: "rgba(255,255,255,0.5)", fontSize: 12, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, color: css.white }}>
            Prop<span style={{ color: css.gold }}>axar</span> <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "rgba(255,255,255,0.5)", marginLeft: 4 }}>Frigiliana</span>
          </div>
          <div style={{ textAlign: "right", lineHeight: 1.8 }}>
            Manuel Fernández · +34 662 317 561 · info@propaxar.com · propaxar.es
          </div>
        </footer>
      </div>
    </>
  );
}
