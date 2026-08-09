import { useState, useEffect, useRef } from "react";

// ── Palette ────────────────────────────────────────────────────
// Primary:   #1a4d2e  (dark forest green)
// Mid:       #2d6a4f
// Accent:    #8B5E3C  (warm wood brown)
// Light bg:  #f4f9f6
// ───────────────────────────────────────────────────────────────

// ── Data ───────────────────────────────────────────────────────
const ROLES = ["Homeowner", "Dealer", "Architect", "Contractor"];

const ROLE_NAV = {
  Homeowner:  ["Home", "About", "Products", "Features", "Gallery", "Contact"],
  Dealer:     ["Home", "About", "Products", "Dealer Enquiry", "Contact"],
  Architect:  ["Home", "About", "Products", "Features", "Gallery", "Contact"],
  Contractor: ["Home", "About", "Products", "Features", "Contact"],
};

const PRODUCTS = [
  { icon: "🚪", title: "WPC Door Frames",           desc: "Precision-engineered frames built for strength, moisture resistance, and a lifetime of performance." },
  { icon: "🪵", title: "WPC Door Shutters",          desc: "Beautiful, termite-proof shutters that replicate natural wood without any of its drawbacks." },
  { icon: "🪟", title: "WPC Window Frames",          desc: "Dimensionally stable frames that stay true in all weather and require zero maintenance." },
  { icon: "🏗️", title: "WPC Window Shutter Frames", desc: "Robust composite shutter frames engineered for long-lasting, smooth operation." },
  { icon: "📋", title: "WPC Boards & Panels",        desc: "3-Layer WPC boards ideal for partitions, cladding, and structural paneling." },
  { icon: "🍽️", title: "Kitchen & Interiors",       desc: "Custom modular kitchens and interior furniture crafted at our in-house fabrication facility." },
];

const FEATURES = [
  { icon: "💧", title: "100% Waterproof",        desc: "Completely moisture-resistant — ideal for bathrooms, kitchens, and high-humidity zones." },
  { icon: "🐛", title: "Termite & Borer Proof",  desc: "Chemically resistant to all wood-boring insects. No treatment needed, ever." },
  { icon: "🔥", title: "Fire Retardant",          desc: "Engineered with fire-retardant additives to improve the safety of your space." },
  { icon: "🔧", title: "Carpenter-Friendly",      desc: "Easy to cut, drill, nail, and machine — just like natural wood in the workshop." },
  { icon: "🔩", title: "High Screw Holding",      desc: "Excellent fastener retention ensures joints stay firm for decades." },
  { icon: "📐", title: "Dimensional Stability",   desc: "No warping, swelling, or shrinking. Stays perfectly flat in any climate." },
  { icon: "💪", title: "No Cracking / Splitting", desc: "Superior mechanical properties hold up under heavy use and impact." },
  { icon: "🌱", title: "Eco-Friendly",            desc: "A sustainable alternative to natural wood — protecting forests one project at a time." },
];

const GALLERY_ITEMS = [
  { label: "Door Frames",      bg: "#2d6a4f", span: 2 },
  { label: "Modular Kitchen",  bg: "#1a4d2e", span: 1 },
  { label: "WPC Boards",       bg: "#3a7d5c", span: 1 },
  { label: "Interior Panels",  bg: "#245c3a", span: 2 },
  { label: "Window Frames",    bg: "#1e5535", span: 1 },
  { label: "Custom Furniture", bg: "#2f7050", span: 1 },
];

const DEALERS = [
  { name: "DuraCoreX — Bangalore HQ",   area: "Koramangala, Bangalore",    phone: "+91 98XXX XXXXX" },
  { name: "DuraCoreX — Mysore",         area: "Saraswathipuram, Mysore",   phone: "+91 97XXX XXXXX" },
  { name: "DuraCoreX — Hubli",          area: "Deshpande Nagar, Hubli",    phone: "+91 96XXX XXXXX" },
  { name: "DuraCoreX — Mangalore",      area: "Hampankatta, Mangalore",    phone: "+91 95XXX XXXXX" },
  { name: "DuraCoreX — Belgaum",        area: "Shahapur, Belgaum",         phone: "+91 94XXX XXXXX" },
  { name: "DuraCoreX — Hassan",         area: "BM Road, Hassan",           phone: "+91 93XXX XXXXX" },
];

// ── Helpers ────────────────────────────────────────────────────
function scrollTo(id) {
  const el = document.getElementById(id.toLowerCase().replace(/\s+/g, "-"));
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

// ── Logo ───────────────────────────────────────────────────────
function DXLogo({ size = 48 }) {
  return (
    <img
      src="/dx-logo-final.png"
      alt="DuraCoreX Logo"
      style={{
        height: size,
        width: "auto",
        objectFit: "contain",
        display: "block",
        borderRadius: 6,
      }}
    />
  );
}

// ── Animated Counter ───────────────────────────────────────────
function AnimatedCounter({ target, suffix = "", duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const start = Date.now();
        const tick = () => {
          const elapsed = Date.now() - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.floor(eased * target));
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

// ── WhatsApp Float Button ──────────────────────────────────────
function WhatsAppButton() {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href="https://wa.me/919XXXXXXXXX?text=Hi%20DuraCoreX%2C%20I%20am%20interested%20in%20WPC%20products"
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "fixed",
        bottom: 28,
        right: 28,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        gap: 10,
        background: "#25D366",
        color: "#fff",
        borderRadius: 50,
        padding: hovered ? "14px 22px 14px 18px" : "14px",
        boxShadow: "0 4px 20px rgba(37,211,102,0.5)",
        textDecoration: "none",
        fontWeight: 700,
        fontSize: 14,
        transition: "all 0.3s cubic-bezier(0.34,1.56,0.64,1)",
        overflow: "hidden",
        whiteSpace: "nowrap",
      }}
    >
      {/* WhatsApp SVG */}
      <svg width="22" height="22" viewBox="0 0 24 24" fill="white" style={{ flexShrink: 0 }}>
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.121 1.532 5.854L.057 23.786a.5.5 0 0 0 .65.65l5.932-1.475A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.944 9.944 0 0 1-5.073-1.384l-.363-.215-3.761.936.952-3.671-.236-.375A9.959 9.959 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
      </svg>
      <span style={{ maxWidth: hovered ? 120 : 0, opacity: hovered ? 1 : 0, transition: "all 0.3s", overflow: "hidden" }}>
        Chat with us
      </span>
    </a>
  );
}

// ── Navbar ─────────────────────────────────────────────────────
const NAV_LINKS_SIMPLE = ["Home", "About", "Products", "Features", "Gallery", "Contact"];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      {/* Main nav */}
      <nav style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: scrolled ? "rgba(255,255,255,0.98)" : "rgba(255,255,255,0.92)",
        backdropFilter: "blur(14px)",
        boxShadow: scrolled ? "0 2px 16px rgba(0,0,0,0.1)" : "0 1px 8px rgba(0,0,0,0.08)",
        transition: "all 0.35s",
        padding: "0 5%",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 60 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }} onClick={() => scrollTo("home")}>
            <DXLogo size={34} />
            <div>
              <div style={{ color: "#1a4d2e", fontWeight: 800, fontSize: 16, letterSpacing: 0.5, lineHeight: 1 }}>DuraCoreX</div>
              <div style={{ color: "#8B5E3C", fontSize: 8, letterSpacing: 1.5, textTransform: "uppercase" }}>The WPC Hub</div>
            </div>
          </div>

          {/* Desktop */}
          <div style={{ display: "flex", gap: 28, alignItems: "center" }} className="dx-desktop-nav">
            {NAV_LINKS_SIMPLE.map((link) => (
              <button key={link} onClick={() => { setMenuOpen(false); scrollTo(link); }}
                style={{ background: "none", border: "none", color: "#1a3a24", fontWeight: 600, fontSize: 13, cursor: "pointer", letterSpacing: 0.5, padding: "4px 0", borderBottom: "2px solid transparent", transition: "all 0.2s" }}
                onMouseEnter={(e) => { e.target.style.borderBottomColor = "#8B5E3C"; e.target.style.color = "#1a4d2e"; }}
                onMouseLeave={(e) => { e.target.style.borderBottomColor = "transparent"; e.target.style.color = "#1a3a24"; }}>
                {link}
              </button>
            ))}
          </div>

          {/* Hamburger */}
          <button onClick={() => setMenuOpen(!menuOpen)}
            style={{ background: "none", border: "none", cursor: "pointer", display: "none", flexDirection: "column", gap: 5 }}
            className="dx-hamburger">
            {[0,1,2].map(i => <div key={i} style={{ width: 24, height: 2, background: "#1a4d2e", borderRadius: 2 }} />)}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div style={{ background: "#1a4d2e", padding: "12px 5%", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
            {NAV_LINKS_SIMPLE.map(link => (
              <button key={link} onClick={() => { setMenuOpen(false); scrollTo(link); }}
                style={{ display: "block", background: "none", border: "none", color: "#e8f5e9", fontSize: 15, fontWeight: 600, padding: "10px 0", cursor: "pointer", width: "100%", textAlign: "left" }}>
                {link}
              </button>
            ))}
          </div>
        )}
      </nav>

      <style>{`
        @media (max-width: 900px) { .dx-desktop-nav { display: none !important; } .dx-hamburger { display: flex !important; } }
      `}</style>
    </>
  );
}

// ── Hero ───────────────────────────────────────────────────────
function Hero() {
  return (
    <section id="home" style={{
      minHeight: "100vh",
      background: "#061410",
      display: "flex", alignItems: "center", justifyContent: "center",
      position: "relative", overflow: "hidden",
      padding: "100px 5% 60px",
    }}>
      {/* Layer 1: blurred fill — covers edges where portrait image doesn't reach */}
      <img
        src="/hero-bg.png"
        alt=""
        aria-hidden="true"
        style={{
          position: "absolute", top: 0, left: 0,
          width: "100%", height: "100%",
          objectFit: "cover",
          filter: "blur(28px) brightness(0.45) saturate(1.2)",
          transform: "scale(1.08)",
          pointerEvents: "none", userSelect: "none",
        }}
      />
      {/* Layer 2: sharp full image — objectFit contain so nothing is cropped */}
      <img
        src="/hero-bg.png"
        alt=""
        aria-hidden="true"
        style={{
          position: "absolute", top: 0, left: 0,
          width: "100%", height: "100%",
          objectFit: "contain",
          objectPosition: "center center",
          pointerEvents: "none", userSelect: "none",
        }}
      />
      {/* Layer 3: dark overlay for text legibility */}
      <div style={{
        position: "absolute", top: 0, left: 0, width: "100%", height: "100%",
        background: "linear-gradient(to right, rgba(4,12,7,0.88) 0%, rgba(4,12,7,0.65) 45%, rgba(4,12,7,0.2) 100%)",
      }} />

      <div className="hero-grid" style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center", width: "100%", position: "relative", zIndex: 1 }}>
        {/* Left — text */}
        <div>
          <div className="dx-hero-badge" style={{ display: "inline-block", background: "rgba(139,94,60,0.18)", border: "1px solid rgba(139,94,60,0.45)", borderRadius: 20, padding: "4px 12px", color: "#c9956d", fontSize: 10, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 14, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "100%" }}>
            Floresta WPC · Authorized Channel Partner · Karnataka
          </div>
          <h1 style={{ color: "#fff", fontSize: "clamp(20px,5vw,38px)", fontWeight: 700, lineHeight: 1.22, marginBottom: 14, fontFamily: "Georgia,serif", letterSpacing: "-0.3px" }}>
            Build Smarter.<br />
            <span style={{ color: "#c9956d" }}>Build Stronger.</span><br />
            Build with WPC.
          </h1>
          <p style={{ color: "rgba(210,235,220,0.82)", fontSize: 13, lineHeight: 1.75, marginBottom: 24, maxWidth: 400 }}>
            Karnataka's trusted destination for premium Wood Polymer Composite solutions — serving builders, architects, contractors, and homeowners.
          </p>

          {/* Buttons + logo box — constrained to button row width */}
          <div style={{ display: "inline-flex", flexDirection: "column", gap: 10 }}>
            <div className="dx-hero-btns" style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <button onClick={() => scrollTo("products")}
                style={{ background: "#8B5E3C", color: "#fff", border: "none", borderRadius: 7, padding: "10px 22px", fontWeight: 600, fontSize: 13, cursor: "pointer", transition: "all 0.2s", boxShadow: "0 4px 16px rgba(139,94,60,0.35)" }}
                onMouseEnter={e => { e.target.style.background = "#6e4a2f"; e.target.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.target.style.background = "#8B5E3C"; e.target.style.transform = "translateY(0)"; }}>
                Explore Products →
              </button>
              <button onClick={() => scrollTo("dealer-enquiry")}
                style={{ background: "transparent", color: "#fff", border: "1.5px solid rgba(255,255,255,0.35)", borderRadius: 7, padding: "10px 22px", fontWeight: 600, fontSize: 13, cursor: "pointer", transition: "all 0.2s" }}
                onMouseEnter={e => { e.target.style.borderColor = "#fff"; e.target.style.background = "rgba(207, 191, 191, 0.85)"; }}
                onMouseLeave={e => { e.target.style.borderColor = "rgba(255,255,255,0.35)"; e.target.style.background = "transparent"; }}>
                Dealer Enquiry
              </button>
            </div>

            {/* Floresta logo — matches button row width */}
            <div style={{
              background: "linear-gradient(135deg, #e8f5ee, #f4f9f6)",
              border: "2px solid #2d6a4f",
              borderRadius: 10,
              padding: "8px 16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
              gap: 12,
            }}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", color: "#8B5E3C" }}>Authorized Partner</span>
                <span style={{ fontSize: 8, color: "#4a6358", letterSpacing: 0.5 }}>Karnataka</span>
              </div>
              <img src="/floresta-logo-full.png" alt="Floresta WPC" style={{ height: 44, width: "auto", objectFit: "contain", borderRadius: 6 }} />
            </div>
          </div>
        </div>

        {/* Right — feature bullets */}
        <div className="hero-card" style={{ display: "flex", justifyContent: "flex-end" }}>
          {/* Animated running border wrapper */}
          <div className="dx-running-border" style={{ borderRadius: 20, padding: 2, position: "relative" }}>
          <div style={{
            background: "linear-gradient(145deg, rgba(10,28,18,0.92), rgba(20,50,32,0.88))",
            backdropFilter: "blur(20px)",
            borderRadius: 17,
            padding: "28px 30px",
            boxShadow: "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)",
            position: "relative", zIndex: 1,
          }}>
            {/* Header */}
            <div style={{ marginBottom: 18 }}>
              <div style={{ color: "#8B5E3C", fontSize: 9, fontWeight: 700, letterSpacing: 2.5, textTransform: "uppercase", marginBottom: 4 }}>Build with Floresta WPC</div>
              <div style={{ width: 32, height: 2, background: "linear-gradient(to right, #8B5E3C, transparent)", borderRadius: 2 }} />
            </div>

            {/* Bullets */}
            {[
              "100% Genuine — Actual WPC",
              "European Technology",
              "100% Waterproof & Moisture Proof",
              "Termite & Borer Resistant",
              "Fire Retardant Grade",
              "Eco-Friendly & Sustainable",
              "High Screw Holding Capacity",
            ].map((item, i) => (
              <div key={item} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: i < 6 ? 11 : 0 }}>
                <div style={{
                  width: 6, height: 6, borderRadius: "50%",
                  background: i < 2 ? "#c9956d" : "#8B5E3C",
                  flexShrink: 0,
                  boxShadow: i < 2 ? "0 0 6px rgba(201,149,109,0.6)" : "none",
                }} />
                <span style={{
                  color: i < 2 ? "#f0d5bc" : "#d4ead9",
                  fontSize: 12.5,
                  fontWeight: i < 2 ? 600 : 500,
                }}>{item}</span>
              </div>
            ))}
          </div>
          </div>{/* end running border wrapper */}
        </div>
      </div>

      {/* Scroll hint */}
      <div style={{ position: "absolute", bottom: 24, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 6, color: "rgba(255,255,255,0.3)", fontSize: 10 }}>
        <div style={{ width: 1, height: 30, background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.3))" }} />
        <span>Scroll</span>
      </div>
    </section>
  );
}

// ── Live Counter Strip ─────────────────────────────────────────
function CounterStrip() {
  const stats = [
    { target: 1200,  suffix: "+", label: "Sqft WPC Installed Daily" },
    { target: 500,   suffix: "+", label: "Projects Delivered" },
    { target: 50,    suffix: "+", label: "Dealer Partners" },
    { target: 10,    suffix: "+", label: "Years of Excellence" },
  ];

  return (
    <div style={{ background: "#8B5E3C", padding: "32px 5%" }}>
      <div className="dx-counter-grid" style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20, textAlign: "center" }}>
        {stats.map(s => (
          <div key={s.label}>
            <div style={{ color: "#fff", fontSize: 36, fontWeight: 900, fontFamily: "Georgia,serif" }}>
              <AnimatedCounter target={s.target} suffix={s.suffix} />
            </div>
            <div style={{ color: "rgba(255,255,255,0.75)", fontSize: 13, fontWeight: 500, marginTop: 6 }}>{s.label}</div>
          </div>
        ))}
      </div>
      <style>{`@media(max-width:600px){#counter-grid{grid-template-columns:repeat(2,1fr)!important}}`}</style>
    </div>
  );
}

// ── Fade-in on scroll ──────────────────────────────────────────
function FadeIn({ children, delay = 0, style = {} }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(28px)",
      transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      ...style,
    }}>
      {children}
    </div>
  );
}

// ── Section Header ─────────────────────────────────────────────
function SectionHeader({ tag, title, subtitle, light = false }) {
  return (
    <FadeIn>
      <div style={{ textAlign: "center", marginBottom: 52 }}>
        <div style={{ color: "#8B5E3C", fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", marginBottom: 12 }}>{tag}</div>
        <h2 style={{ color: light ? "#fff" : "#1a4d2e", fontSize: "clamp(22px,2.5vw,32px)", fontWeight: 700, fontFamily: "Georgia,serif", lineHeight: 1.25, marginBottom: subtitle ? 14 : 0 }}>{title}</h2>
        {subtitle && <p style={{ color: light ? "#a8d5b5" : "#4a6358", fontSize: 15, maxWidth: 520, margin: "0 auto", lineHeight: 1.7 }}>{subtitle}</p>}
      </div>
    </FadeIn>
  );
}

// ── About ──────────────────────────────────────────────────────
function About() {
  return (
    <section id="about" style={{ padding: 0, background: "#f4f9f6", overflow: "hidden" }}>

      {/* ── Top: DuraCoreX — main focus ── */}
      <div style={{ padding: "60px 5%", background: "#f4f9f6", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -60, right: -60, width: 260, height: 260, borderRadius: "50%", background: "rgba(139,94,60,0.07)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: -40, left: "30%", width: 180, height: 180, borderRadius: "50%", background: "rgba(255,255,255,0.03)", pointerEvents: "none" }} />

        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }} className="dx-about-grid">

          {/* Left — DuraCoreX brand image */}
          <FadeIn>
            <img
              src="/dx-brand.png"
              alt="DuraCoreX — Strength. Style. Sustainability."
              style={{
                width: "100%",
                height: "auto",
                borderRadius: 20,
                display: "block",
                boxShadow: "0 24px 60px rgba(0,0,0,0.35)",
              }}
            />
          </FadeIn>

          {/* Right — about text */}
          <FadeIn delay={150}>
            <div style={{ color: "#8B5E3C", fontSize: 10, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", marginBottom: 12 }}>Who We Are</div>
            <h2 style={{ color: "#1a4d2e", fontSize: "clamp(22px,2.4vw,32px)", fontWeight: 700, fontFamily: "Georgia,serif", lineHeight: 1.25, marginBottom: 20 }}>
              Karnataka's Trusted<br />WPC Solutions Hub
            </h2>
            {/* Floresta logo — big & bright */}
            <div style={{ display: "inline-flex", alignItems: "center", gap: 12, background: "#fff", border: "2px solid #2d6a4f", borderRadius: 14, padding: "12px 20px", marginBottom: 24, boxShadow: "0 4px 18px rgba(26,77,46,0.12)" }}>
              <img src="/floresta-logo2.png" alt="Floresta WPC" style={{ height: 52, width: "auto", objectFit: "contain", display: "block" }} />
              <div style={{ width: 1, height: 36, background: "#d0e8d8" }} />
              <div>
                <div style={{ fontSize: 10, color: "#8B5E3C", fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 3 }}>Authorized Partner</div>
                <div style={{ fontSize: 12, color: "#1a4d2e", fontWeight: 600 }}>Karnataka, India</div>
              </div>
            </div>
            <p style={{ color: "#4a6358", fontSize: 15, lineHeight: 1.85, marginBottom: 16 }}>
              <strong style={{ color: "#1a4d2e" }}>DuraCoreX</strong> is Karnataka's premier destination for premium Wood Polymer Composite solutions. As the <strong style={{ color: "#8B5E3C" }}>Authorized Channel Partner for Floresta WPC</strong>, we bring advanced European technology products directly to builders, architects, contractors, and homeowners across the state.
            </p>
            <p style={{ color: "#4a6358", fontSize: 15, lineHeight: 1.85, marginBottom: 28 }}>
              What sets us apart is our <strong style={{ color: "#1a4d2e" }}>in-house joinery and fabrication facility</strong> — equipped with precision machinery to deliver customized WPC doors, windows, kitchen units, and interior panels end-to-end, from selection to installation.
            </p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {["Builders", "Architects", "Contractors", "Homeowners", "Interior Designers"].map(t => (
                <span key={t} style={{ background: "#e8f5e9", color: "#1a4d2e", border: "1px solid #b8dfc4", borderRadius: 20, padding: "5px 14px", fontSize: 12, fontWeight: 600 }}>{t}</span>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>


      <style>{`
        @media (max-width: 900px) {
          .dx-about-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          .dx-floresta-strip { grid-template-columns: 1fr !important; gap: 20px !important; }
          .dx-floresta-strip > div:nth-child(2) { display: none !important; }
          .dx-floresta-facts { grid-template-columns: repeat(2,1fr) !important; }
        }
        @media (max-width: 520px) {
          .dx-floresta-facts { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

// ── Products ───────────────────────────────────────────────────
const PRODUCTS_EXT = [
  { icon: "🚪", title: "WPC Door Frames",           desc: "Precision-engineered frames built for strength, moisture resistance, and a lifetime of performance.", tag: "Best Seller", img: "/frames1.png" },
  { icon: "🪵", title: "WPC Door Shutters",          desc: "Beautiful, termite-proof shutters that replicate natural wood without any of its drawbacks.", tag: null, img: "/door1.png" },
  { icon: "🪟", title: "WPC Window Frames",          desc: "Dimensionally stable frames that stay true in all weather and require zero maintenance.", tag: null, img: "/frames2.png" },
  { icon: "🏗️", title: "WPC Window Shutter Frames", desc: "Robust composite shutter frames engineered for long-lasting, smooth operation.", tag: null, img: "/door2.png" },
  { icon: "📋", title: "WPC Boards & Panels",        desc: "3-Layer WPC boards ideal for partitions, cladding, and structural paneling.", tag: "New", img: null },
  { icon: "🍽️", title: "Kitchen & Interiors",       desc: "Custom modular kitchens and interior furniture crafted at our in-house fabrication facility.", tag: null, img: null },
];

function ProductCard({ product, index }) {
  const [hovered, setHovered] = useState(false);
  return (
    <FadeIn delay={index * 90}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          borderRadius: 18,
          overflow: "hidden",
          border: `1.5px solid ${hovered ? "#2d6a4f" : "#e0ede6"}`,
          transition: "all 0.35s cubic-bezier(0.34,1.1,0.64,1)",
          transform: hovered ? "translateY(-8px)" : "translateY(0)",
          boxShadow: hovered ? "0 20px 48px rgba(26,77,46,0.14)" : "0 2px 12px rgba(0,0,0,0.04)",
          background: "#fff",
          cursor: "default",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}>

        {/* Image area */}
        <div style={{
          position: "relative",
          height: 220,
          background: product.img
            ? "#f0f0f0"
            : hovered
              ? "linear-gradient(135deg, #1a4d2e, #2d6a4f)"
              : "linear-gradient(135deg, #e8f5e9, #c8e6c9)",
          transition: "background 0.35s ease",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}>
          {product.img ? (
            <>
              <img
                src={product.img}
                alt={product.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center",
                  transition: "transform 0.5s ease",
                  transform: hovered ? "scale(1.06)" : "scale(1)",
                  display: "block",
                }}
              />
              {/* Dark overlay on hover */}
              <div style={{
                position: "absolute", inset: 0,
                background: "rgba(10,30,18,0.3)",
                opacity: hovered ? 1 : 0,
                transition: "opacity 0.35s",
              }} />
            </>
          ) : (
            <>
              {/* Decorative circles inside placeholder */}
              <div style={{ position: "absolute", top: -20, right: -20, width: 100, height: 100, borderRadius: "50%", background: "rgba(255,255,255,0.08)" }} />
              <div style={{ position: "absolute", bottom: -15, left: -15, width: 70, height: 70, borderRadius: "50%", background: "rgba(255,255,255,0.06)" }} />
              <div style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
                <div style={{ fontSize: 48, marginBottom: 8, filter: hovered ? "brightness(0) invert(1)" : "none", transition: "filter 0.3s" }}>{product.icon}</div>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: hovered ? "rgba(255,255,255,0.6)" : "#6b8f7a" }}>Image Coming Soon</div>
              </div>
            </>
          )}

          {/* Tag badge */}
          {product.tag && (
            <div style={{
              position: "absolute", top: 12, left: 12,
              background: product.tag === "Best Seller" ? "#8B5E3C" : "#1a4d2e",
              color: "#fff", fontSize: 10, fontWeight: 700,
              padding: "4px 10px", borderRadius: 6, letterSpacing: 0.5,
              zIndex: 2,
            }}>
              {product.tag}
            </div>
          )}

          {/* Hover overlay CTA */}
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0,
            background: "rgba(0,0,0,0.32)",
            padding: "10px 16px",
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.3s",
            display: "flex", alignItems: "center", justifyContent: "center",
            zIndex: 2,
          }}>
            <span style={{ color: "#fff", fontSize: 12, fontWeight: 700, letterSpacing: 0.5 }}>View Details →</span>
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: "20px 22px 24px", flex: 1, display: "flex", flexDirection: "column" }}>
          <h3 style={{ color: "#1a4d2e", fontSize: 15, fontWeight: 700, marginBottom: 8, fontFamily: "Georgia,serif", lineHeight: 1.3 }}>{product.title}</h3>
          <p style={{ color: "#4a6358", fontSize: 13, lineHeight: 1.7, flex: 1, marginBottom: 16 }}>{product.desc}</p>
          <div style={{
            display: "flex", alignItems: "center", gap: 6,
            color: hovered ? "#8B5E3C" : "#2d6a4f",
            fontSize: 12, fontWeight: 700, transition: "color 0.3s",
          }}>
            <span>Enquire Now</span>
            <span style={{ transition: "transform 0.3s", transform: hovered ? "translateX(4px)" : "translateX(0)" }}>→</span>
          </div>
        </div>
      </div>
    </FadeIn>
  );
}

function Products() {
  return (
    <section id="products" style={{ padding: "60px 5% 80px", background: "#fff" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <SectionHeader
          tag="What We Offer"
          title="WPC Products for Every Space"
          subtitle="Doors, windows, boards & custom interiors — all genuine Floresta WPC."
        />
        <div className="dx-prod-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
          {PRODUCTS_EXT.map((p, i) => (
            <ProductCard key={p.title} product={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Features ───────────────────────────────────────────────────
const FEAT_SLIDES = [
  { img: "/feat-15reasons.png",    label: "15 Reasons to Choose Floresta WPC" },
  { img: "/feat-termite.png",      label: "Termite Proof & Borer Proof" },
  { img: "/feat-nailable.png",     label: "Nailable & Screwable" },
  { img: "/feat-laminate.png",     label: "Laminate & Veneer Pasting" },
  { img: "/feat-recycle.png",      label: "Eco-Friendly — Recycle Products" },
  { img: "/feat-fire.png",         label: "Fire Retardant" },
  { img: "/feat-moisture.png",     label: "Moisture Proof" },
  { img: "/feat-waterproof.png",   label: "100% Waterproof" },
  { img: "/feat-kitchen.png",      label: "No Harmful Chemical" },
  { img: "/feat-247.png",          label: "24/7 Support Helpline" },
  { img: "/feat-genuine.png",      label: "100% Original Product" },
  { img: "/feat-budget.png",       label: "Budget Friendly" },
  { img: "/feat-zeroemission.png", label: "Zero Emission Product" },
  { img: "/feat-plywoods.png",    label: "Better Than Plywood — Choose WPC" },
  { img: "/feat-connectivity.png",label: "Easy Connectivity" },
];

function Features() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = FEAT_SLIDES.length;

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setCurrent(c => (c + 1) % total), 1500);
    return () => clearInterval(t);
  }, [paused, total]);

  const prev = () => setCurrent(c => (c - 1 + total) % total);
  const next = () => setCurrent(c => (c + 1) % total);

  return (
    <section id="features" style={{ padding: "60px 0 30px", background: "#f4f9f6", position: "relative", overflow: "hidden" }}>
      {/* Background accents */}
      <div style={{ position: "absolute", top: -100, right: -100, width: 400, height: 400, borderRadius: "50%", background: "rgba(139,94,60,0.07)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: -80, left: -80, width: 280, height: 280, borderRadius: "50%", background: "rgba(255,255,255,0.025)", pointerEvents: "none" }} />

      {/* Header */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 5%", position: "relative", zIndex: 1, marginBottom: 28 }}>
        <SectionHeader
          tag="Key Features"
          title="Why Floresta WPC Stands Apart"
          subtitle="15 reasons why Floresta WPC is Karnataka's preferred wood alternative."
        />
      </div>

      {/* Carousel */}
      <div
        style={{ position: "relative", zIndex: 1 }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Slides track */}
        <div style={{ overflow: "hidden" }}>
          <div style={{
            display: "flex",
            transform: `translateX(-${current * 100}%)`,
            transition: "transform 0.55s cubic-bezier(0.4,0,0.2,1)",
          }}>
            {FEAT_SLIDES.map((slide) => (
              <div key={slide.img} style={{
                minWidth: "100%",
                display: "flex",
                justifyContent: "center",
                padding: "0 80px",
                boxSizing: "border-box",
              }}>
                <div style={{
                  width: "100%",
                  maxWidth: 340,
                  borderRadius: 22,
                  overflow: "hidden",
                  boxShadow: "0 32px 80px rgba(0,0,0,0.55)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}>
                  <img
                    src={slide.img}
                    alt={slide.label}
                    style={{ width: "100%", height: "auto", display: "block" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Arrow buttons */}
        <button onClick={prev} style={{
          position: "absolute", left: "3%", top: "50%", transform: "translateY(-50%)",
          background: "#fff", border: "1.5px solid #c8e0d2",
          color: "#1a4d2e", borderRadius: "50%",
          width: 48, height: 48, fontSize: 22, cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
          transition: "all 0.25s", zIndex: 2,
        }}
          onMouseEnter={e => { e.currentTarget.style.background = "#8B5E3C"; e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "#8B5E3C"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.color = "#1a4d2e"; e.currentTarget.style.borderColor = "#c8e0d2"; }}
        >‹</button>
        <button onClick={next} style={{
          position: "absolute", right: "3%", top: "50%", transform: "translateY(-50%)",
          background: "#fff", border: "1.5px solid #c8e0d2",
          color: "#1a4d2e", borderRadius: "50%",
          width: 48, height: 48, fontSize: 22, cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
          transition: "all 0.25s", zIndex: 2,
        }}
          onMouseEnter={e => { e.currentTarget.style.background = "#8B5E3C"; e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "#8B5E3C"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.color = "#1a4d2e"; e.currentTarget.style.borderColor = "#c8e0d2"; }}
        >›</button>
      </div>

      {/* Slide label */}
      <div style={{ textAlign: "center", marginTop: 28, padding: "0 5%" }}>
        <span style={{ color: "#1a4d2e", fontSize: 15, fontWeight: 600, letterSpacing: 0.3 }}>
          {FEAT_SLIDES[current].label}
        </span>
      </div>

      {/* Dot indicators */}
      <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 20 }}>
        {FEAT_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            style={{
              width: i === current ? 28 : 8,
              height: 8, borderRadius: 4, border: "none", cursor: "pointer", padding: 0,
              background: i === current ? "#8B5E3C" : "rgba(26,77,46,0.2)",
              transition: "all 0.35s ease",
            }}
          />
        ))}
      </div>

      {/* Counter */}
      <div style={{ textAlign: "center", marginTop: 10, color: "rgba(26,77,46,0.4)", fontSize: 11, letterSpacing: 1 }}>
        {current + 1} / {total}
      </div>
    </section>
  );
}

// ── Gallery ────────────────────────────────────────────────────
function Gallery() {
  return (
    <section id="gallery" style={{ padding: "50px 5% 80px", background: "#f4f9f6" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <SectionHeader tag="Gallery" title="Our Work Speaks for Itself" />
        <div className="dx-gal-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gridTemplateRows: "200px 200px", gap: 14 }}>
          {GALLERY_ITEMS.map((item, i) => (
            <div key={item.label}
              style={{ background: `linear-gradient(135deg,${item.bg},${item.bg}cc)`, borderRadius: 12, display: "flex", alignItems: "flex-end", padding: 18, position: "relative", overflow: "hidden", gridColumn: `span ${item.span}`, cursor: "pointer", transition: "transform 0.3s" }}
              onMouseEnter={e => e.currentTarget.style.transform = "scale(1.025)"}
              onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}>
              {[...Array(5)].map((_, j) => (
                <div key={j} style={{ position: "absolute", top: `${10+j*18}%`, left: 0, right: 0, height: 1, background: "rgba(255,255,255,0.05)", transform: `rotate(${-3+j}deg)` }} />
              ))}
              <div style={{ background: "rgba(0,0,0,0.4)", color: "#fff", borderRadius: 8, padding: "5px 14px", fontSize: 13, fontWeight: 700, zIndex: 1 }}>{item.label}</div>
              <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", fontSize: 44, opacity: 0.12 }}>🪵</div>
            </div>
          ))}
        </div>
        {/* <p style={{ textAlign: "center", color: "#4a6358", fontSize: 14, marginTop: 20 }}>
          📸 Add your project photos here — contact us to feature your installation.
        </p> */}
      </div>
    </section>
  );
}


// ── Dealer Enquiry ─────────────────────────────────────────────
function DealerEnquiry() {
  const [form, setForm] = useState({ name: "", business: "", city: "", phone: "", email: "", type: "Become a Dealer", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const handle = e => setForm({ ...form, [e.target.name]: e.target.value });

  const inp = {
    width: "100%", padding: "11px 14px", border: "1.5px solid #dde8e2", borderRadius: 10,
    fontSize: 13.5, background: "#fafcfb", color: "#1a4d2e", outline: "none",
    boxSizing: "border-box", transition: "border-color 0.2s, background 0.2s", fontFamily: "inherit",
  };

  const TYPES = [
    { id: "Become a Dealer", icon: "🤝" },
    { id: "Product Purchase", icon: "🛒" },
    { id: "Custom Project", icon: "🏗️" },
    { id: "General Inquiry", icon: "💬" },
  ];

  return (
    <section id="dealer-enquiry" style={{ padding: "40px 5% 70px", background: "#fff" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        {submitted ? (
          <div style={{ background: "linear-gradient(135deg,#1a4d2e,#2d6a4f)", borderRadius: 24, padding: "80px 40px", textAlign: "center", color: "#fff" }}>
            <div style={{ fontSize: 56, marginBottom: 20 }}>✅</div>
            <h3 style={{ fontSize: 24, fontWeight: 800, fontFamily: "Georgia,serif", marginBottom: 10 }}>Enquiry Received!</h3>
            <p style={{ color: "#a8d5b5", fontSize: 15, lineHeight: 1.7 }}>We'll get back to you within 24 hours.</p>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: 0, borderRadius: 24, overflow: "hidden", border: "1.5px solid #e0ede6", boxShadow: "0 8px 40px rgba(26,77,46,0.08)" }}>

            {/* Left panel — dark */}
            <div style={{ background: "linear-gradient(160deg,#0d2b1a,#1a4d2e)", padding: "44px 36px", display: "flex", flexDirection: "column" }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "#8B5E3C", marginBottom: 10 }}>Dealer Enquiry</div>
              <h2 style={{ fontSize: 24, fontWeight: 800, fontFamily: "Georgia,serif", color: "#fff", lineHeight: 1.25, marginBottom: 14 }}>
                Become a<br/>DuraCoreX Partner
              </h2>
              <p style={{ fontSize: 13, color: "#a8d5b5", lineHeight: 1.7, marginBottom: 32 }}>
                Join Karnataka's fastest-growing WPC dealer network. Fill in the form and our team will reach out within 24 hours.
              </p>

              {/* Perks */}
              {["Genuine Floresta WPC stock", "Dedicated sales support", "Marketing materials provided", "Fast order fulfilment"].map(perk => (
                <div key={perk} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                  <div style={{ width: 20, height: 20, borderRadius: "50%", background: "rgba(139,94,60,0.3)", border: "1.5px solid #8B5E3C", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><polyline points="2,6 5,9 10,3" stroke="#c9956d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  <span style={{ fontSize: 13, color: "#d4ead9" }}>{perk}</span>
                </div>
              ))}

              <div style={{ marginTop: "auto", paddingTop: 32, borderTop: "1px solid rgba(255,255,255,0.08)" }}>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>We respond within 24 hours · Mon–Sat, 9am–6pm</div>
              </div>
            </div>

            {/* Right panel — form */}
            <form onSubmit={e => { e.preventDefault(); setSubmitted(true); }}
              style={{ background: "#fff", padding: "44px 40px" }}>

              {/* Type selector */}
              <div className="dx-type-selector" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8, marginBottom: 28 }}>
                {TYPES.map(t => (
                  <button key={t.id} type="button" onClick={() => setForm({ ...form, type: t.id })}
                    style={{
                      background: form.type === t.id ? "#1a4d2e" : "#f4f9f6",
                      color: form.type === t.id ? "#fff" : "#4a6358",
                      border: `1.5px solid ${form.type === t.id ? "#1a4d2e" : "#dde8e2"}`,
                      borderRadius: 10, padding: "8px 6px", fontSize: 11, fontWeight: 700,
                      cursor: "pointer", transition: "all 0.2s", textAlign: "center", lineHeight: 1.4,
                    }}>
                    <div style={{ fontSize: 16, marginBottom: 3 }}>{t.icon}</div>
                    {t.id}
                  </button>
                ))}
              </div>

              {/* Fields 2-col */}
              <div className="dx-form-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
                {[
                  { name: "name",     label: "Full Name",      placeholder: "Your full name",      type: "text" },
                  { name: "business", label: "Business Name",  placeholder: "Company / shop name", type: "text" },
                  { name: "city",     label: "City / District",placeholder: "City or district",    type: "text" },
                  { name: "phone",    label: "Phone Number",   placeholder: "+91 XXXXX XXXXX",     type: "tel" },
                ].map(f => (
                  <div key={f.name}>
                    <label style={{ display: "block", color: "#4a6358", fontSize: 11, fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase", marginBottom: 5 }}>{f.label}</label>
                    <input type={f.type} name={f.name} value={form[f.name]} onChange={handle} placeholder={f.placeholder} required style={inp}
                      onFocus={e => { e.target.style.borderColor = "#1a4d2e"; e.target.style.background = "#fff"; }}
                      onBlur={e => { e.target.style.borderColor = "#dde8e2"; e.target.style.background = "#fafcfb"; }} />
                  </div>
                ))}
              </div>

              <div style={{ marginBottom: 14 }}>
                <label style={{ display: "block", color: "#4a6358", fontSize: 11, fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase", marginBottom: 5 }}>Email Address</label>
                <input type="email" name="email" value={form.email} onChange={handle} placeholder="your@email.com" style={inp}
                  onFocus={e => { e.target.style.borderColor = "#1a4d2e"; e.target.style.background = "#fff"; }}
                  onBlur={e => { e.target.style.borderColor = "#dde8e2"; e.target.style.background = "#fafcfb"; }} />
              </div>

              <div style={{ marginBottom: 24 }}>
                <label style={{ display: "block", color: "#4a6358", fontSize: 11, fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase", marginBottom: 5 }}>Message <span style={{ fontWeight: 400, textTransform: "none", letterSpacing: 0 }}>(optional)</span></label>
                <textarea name="message" value={form.message} onChange={handle} placeholder="Tell us about your requirements..." rows={3}
                  style={{ ...inp, resize: "none" }}
                  onFocus={e => { e.target.style.borderColor = "#1a4d2e"; e.target.style.background = "#fff"; }}
                  onBlur={e => { e.target.style.borderColor = "#dde8e2"; e.target.style.background = "#fafcfb"; }} />
              </div>

              <button type="submit"
                style={{ width: "100%", background: "#1a4d2e", color: "#fff", border: "none", borderRadius: 10, padding: "14px", fontWeight: 700, fontSize: 14, cursor: "pointer", letterSpacing: 0.3, transition: "all 0.2s" }}
                onMouseEnter={e => { e.target.style.background = "#2d6a4f"; e.target.style.transform = "translateY(-1px)"; }}
                onMouseLeave={e => { e.target.style.background = "#1a4d2e"; e.target.style.transform = "translateY(0)"; }}>
                Submit Enquiry →
              </button>

              <p style={{ textAlign: "center", fontSize: 11, color: "#9ab5a5", marginTop: 14 }}>
                We respond within 24 hours · Mon–Sat, 9am–6pm
              </p>
            </form>
          </div>
        )}
      </div>
      <style>{`
        @media(max-width:860px){ #dealer-enquiry .dx-form-grid{ grid-template-columns:1fr !important; } }
        @media(max-width:720px){ #dealer-enquiry>div>div>div:first-child{ display:none !important; } }
        @media(max-width:520px){
          #dealer-enquiry .dx-type-selector{ grid-template-columns:repeat(2,1fr) !important; }
          #dealer-enquiry form{ padding:28px 18px !important; }
        }
      `}</style>
    </section>
  );
}

// ── Contact ────────────────────────────────────────────────────
function Contact() {
  const WA_SVG = (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.121 1.532 5.854L.057 23.786a.5.5 0 0 0 .65.65l5.932-1.475A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.944 9.944 0 0 1-5.073-1.384l-.363-.215-3.761.936.952-3.671-.236-.375A9.959 9.959 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
  );
  const IG_SVG = (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
  );
  const FB_SVG = (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.235 2.686.235v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.269h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/></svg>
  );

  return (
    <section id="contact" style={{ background: "#f4f9f6", padding: "80px 5%" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <SectionHeader tag="Contact Us" title="Get in Touch with DuraCoreX"
          subtitle="We're here Monday to Saturday. Reach us by call, WhatsApp, email, or follow us on social media." />

        {/* Main contact grid */}
        <div className="dx-contact-main" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 36 }}>

          {/* Left — info rows in one card */}
          <div style={{ background: "#fff", borderRadius: 16, border: "1.5px solid #e0ede6", overflow: "hidden" }}>
            {[
              { svg: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1a4d2e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>, label: "Location", value: "DuraCoreX — The WPC Hub", sub: "Bangalore, Karnataka, India" },
              { svg: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1a4d2e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.36 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16.92z"/></svg>, label: "Phone", value: "+91 XXXXX XXXXX", sub: "Mon – Sat, 9:00 AM – 6:00 PM" },
              { svg: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1a4d2e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>, label: "Email", value: "info@duracorex.com", sub: "support@duracorex.com" },
              { svg: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1a4d2e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>, label: "Hours", value: "Monday – Saturday", sub: "9:00 AM – 6:00 PM  ·  Sunday Closed" },
            ].map((item, i, arr) => (
              <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 20px", borderBottom: i < arr.length - 1 ? "1px solid #f0f6f2" : "none" }}>
                <div style={{ width: 34, height: 34, borderRadius: 9, background: "#f0f8f4", border: "1px solid #d4e8db", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  {item.svg}
                </div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.2, textTransform: "uppercase", color: "#8B5E3C", marginBottom: 2 }}>{item.label}</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#1a4d2e", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.value}</div>
                  <div style={{ fontSize: 12, color: "#6b8f7a", marginTop: 1 }}>{item.sub}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Right — CTAs + social */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>

            {/* Call */}
            <a href="tel:+919XXXXXXXXX"
              style={{ background: "#1a4d2e", borderRadius: 12, padding: "14px 18px", display: "flex", alignItems: "center", gap: 12, textDecoration: "none", border: "1.5px solid #2d6a4f", transition: "opacity 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.opacity = "0.88"}
              onMouseLeave={e => e.currentTarget.style.opacity = "1"}>
              <div style={{ width: 36, height: 36, borderRadius: 9, background: "rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.36 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16.92z"/></svg>
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>Call Us Directly</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.65)" }}>+91 XXXXX XXXXX</div>
              </div>
              <span style={{ marginLeft: "auto", color: "#fff", fontSize: 18 }}>→</span>
            </a>

            {/* Social row */}
            <div style={{ background: "#fff", borderRadius: 12, border: "1.5px solid #e0ede6", padding: "14px 18px", flex: 1 }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", color: "#8B5E3C", marginBottom: 12 }}>Follow Us</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {[
                  { href: "https://instagram.com/duracorex", icon: IG_SVG, bg: "linear-gradient(135deg,#f09433,#dc2743,#bc1888)", label: "Instagram", handle: "@duracorex", color: "#bc1888", rowBg: "#fff5f9", border: "#ffd6e8" },
                  { href: "https://facebook.com/duracorex", icon: FB_SVG, bg: "#1877f2", label: "Facebook", handle: "DuraCoreX", color: "#1877f2", rowBg: "#f0f5ff", border: "#d0dcff" },
                ].map(s => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                    style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 12px", borderRadius: 9, background: s.rowBg, border: `1px solid ${s.border}`, textDecoration: "none", transition: "opacity 0.2s" }}
                    onMouseEnter={e => e.currentTarget.style.opacity = "0.8"}
                    onMouseLeave={e => e.currentTarget.style.opacity = "1"}>
                    <div style={{ width: 28, height: 28, borderRadius: 7, background: s.bg, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", flexShrink: 0 }}>{s.icon}</div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: s.color }}>{s.label}</div>
                    <div style={{ fontSize: 11, color: "#999", marginLeft: 4 }}>{s.handle}</div>
                    <span style={{ marginLeft: "auto", color: s.color, fontSize: 13 }}>↗</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @media(max-width:860px){ .dx-contact-main{ grid-template-columns:1fr !important; } }
      `}</style>
    </section>
  );
}

// ── Footer ─────────────────────────────────────────────────────
function Footer() {
  const links = ["About", "Products", "Features", "Gallery", "Contact"];
  const products = ["WPC Door Frames", "WPC Door Shutters", "WPC Window Frames", "WPC Boards", "Kitchen Interiors"];

  return (
    <footer style={{ background: "#0a1f12", padding: "52px 5% 28px", color: "#a8d5b5" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div id="dx-footer-grid" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 48, marginBottom: 44 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
              <DXLogo size={40} />
              <div>
                <div style={{ color: "#fff", fontWeight: 800, fontSize: 18 }}>DuraCoreX</div>
                <div style={{ color: "#a8d5b5", fontSize: 10, letterSpacing: 2 }}>THE WPC HUB</div>
              </div>
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.8, maxWidth: 300, color: "#7ab08d" }}>
              Authorized Channel Partner for Floresta WPC in Karnataka. Building smarter, stronger, greener spaces.
            </p>
          </div>
          <div>
            <div style={{ color: "#fff", fontWeight: 700, fontSize: 13, marginBottom: 18, letterSpacing: 0.5 }}>Quick Links</div>
            {links.map(l => (
              <div key={l} onClick={() => scrollTo(l)} style={{ color: "#7ab08d", fontSize: 14, marginBottom: 11, cursor: "pointer", transition: "color 0.2s" }}
                onMouseEnter={e => e.target.style.color = "#fff"} onMouseLeave={e => e.target.style.color = "#7ab08d"}>{l}</div>
            ))}
          </div>
          <div>
            <div style={{ color: "#fff", fontWeight: 700, fontSize: 13, marginBottom: 18 }}>Products</div>
            {products.map(p => <div key={p} style={{ color: "#7ab08d", fontSize: 14, marginBottom: 11 }}>{p}</div>)}
          </div>
        </div>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 24, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <div style={{ fontSize: 13 }}>© 2026 DuraCoreX — The WPC Hub. All rights reserved.</div>
          <div style={{ fontSize: 13, color: "#c9956d", fontWeight: 600 }}>Build Smarter. Build Stronger. Build with Floresta WPC.</div>
        </div>
      </div>
    </footer>
  );
}

// ── Global responsive styles ───────────────────────────────────
const GLOBAL_CSS = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { overflow-x: hidden; -webkit-text-size-adjust: 100%; }

  @keyframes borderSpin {
    0%   { background-position: 0% 50%; }
    100% { background-position: 200% 50%; }
  }
  .dx-running-border {
    background: linear-gradient(90deg, #2a0e00, #8B5E3C, #c9956d, #e8b887, #f0c898, #c9956d, #8B5E3C, #2a0e00);
    background-size: 300% 100%;
    animation: borderSpin 3s linear infinite;
  }
  img { max-width: 100%; height: auto; }

  /* ── Tablet (≤900px) ── */
  @media (max-width: 900px) {
    /* Navbar */
    .dx-desktop-nav { display: none !important; }
    .dx-hamburger { display: flex !important; }

    /* Hero: stack, hide feature card, lock to full screen */
    .hero-grid { grid-template-columns: 1fr !important; }
    .hero-card { display: none !important; }
    #home { height: 100dvh !important; min-height: 100dvh !important; padding: 70px 5% 32px !important; display: flex !important; align-items: center !important; }

    /* About */
    #about > div { grid-template-columns: 1fr !important; gap: 32px !important; }
    #about > div > div:first-child { display: none !important; }

    /* Products 2-col */
    .dx-prod-grid { grid-template-columns: repeat(2,1fr) !important; }

    /* Features 2-col */
    .dx-feat-grid { grid-template-columns: repeat(2,1fr) !important; }

    /* Dealers 2-col */
    .dx-deal-grid { grid-template-columns: repeat(2,1fr) !important; }

    /* Contact 2-col */
    .dx-contact-grid { grid-template-columns: repeat(2,1fr) !important; }
    .dx-cta { flex-direction: column !important; align-items: flex-start !important; gap: 12px !important; }
  }

  /* ── Mobile (≤600px) ── */
  @media (max-width: 600px) {
    /* Global section padding */
    section { padding-left: 4% !important; padding-right: 4% !important; }
    section[style*="padding"] { padding-top: 56px !important; padding-bottom: 56px !important; }

    /* Hero — locked to full screen height, content centered */
    #home { height: 100dvh !important; min-height: 100dvh !important; padding: 70px 4% 28px !important; }
    #home h1 { margin-bottom: 8px !important; }
    #home p { margin-bottom: 16px !important; }

    /* Counter strip: 2×2 on mobile */
    .dx-counter-grid { grid-template-columns: repeat(2,1fr) !important; gap: 16px !important; }

    /* Products 1-col */
    .dx-prod-grid { grid-template-columns: 1fr !important; }

    /* Features 1-col */
    .dx-feat-grid { grid-template-columns: 1fr !important; }

    /* Gallery: single col */
    .dx-gal-grid { grid-template-columns: 1fr !important; }
    .dx-gal-grid > div { grid-column: span 1 !important; height: 160px !important; }

    /* Dealers 1-col */
    .dx-deal-grid { grid-template-columns: 1fr !important; }

    /* Enquiry form: 1-col */
    .dx-form-grid { grid-template-columns: 1fr !important; }
    #dealer-enquiry form { padding: 24px 16px !important; }

    /* Contact 1-col */
    .dx-contact-grid { grid-template-columns: 1fr !important; }

    /* Footer 1-col */
    #dx-footer-grid { grid-template-columns: 1fr !important; gap: 28px !important; }

    /* Buttons full-width */
    .dx-hero-btns { flex-direction: column !important; width: 100% !important; }
    .dx-hero-btns button { width: 100% !important; text-align: center !important; }

    /* WhatsApp button — smaller, bottom-right clear of buttons */
    a[href*="wa.me"] { bottom: 16px !important; right: 16px !important; padding: 11px !important; }

    /* Hero badge — shrink font so it fits one line */
    .dx-hero-badge { font-size: 8px !important; letter-spacing: 1px !important; padding: 3px 10px !important; }

    /* Hero heading — cap at 22px on mobile */
    #home h1 { font-size: 22px !important; line-height: 1.3 !important; margin-bottom: 10px !important; }

    /* Hero paragraph — smaller and tighter */
    #home p { font-size: 12px !important; line-height: 1.6 !important; margin-bottom: 18px !important; }
  }

  /* ── Small mobile (≤380px) ── */
  @media (max-width: 380px) {
    #home h1 { font-size: 20px !important; }
    .dx-counter-grid > div > div:first-child { font-size: 28px !important; }
    nav { padding: 0 3% !important; }
    .dx-hero-badge { display: none !important; }
  }
`;

// ── App ────────────────────────────────────────────────────────
export default function App() {
  return (
    <div style={{ fontFamily: "'Segoe UI',system-ui,-apple-system,sans-serif", margin: 0, padding: 0 }}>
      <style>{GLOBAL_CSS}</style>
      <Navbar />
      <div>
        <Hero />
        <About />
        <Products />
        <Features />
        <Gallery />
        <DealerEnquiry />
        <Contact />
        <Footer />
      </div>
      <WhatsAppButton />
    </div>
  );
}
