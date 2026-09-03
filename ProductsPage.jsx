import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ALL_PRODUCTS = [
  {
    id: 1,
    category: "Frames",
    title: "WPC Door Frames",
    desc: "Termite-proof, waterproof, and dimensionally stable — no warping, no swelling, zero maintenance.",
    tag: "Best Seller",
    img: "/featured-door.jpeg",
    features: ["100% Waterproof", "Termite Proof", "Zero Maintenance", "High Screw Holding"],
  },
  {
    id: 2,
    category: "Shutters",
    title: "WPC Door Shutters",
    desc: "Beautiful shutters that replicate natural wood without any of its drawbacks. Laminate, veneer, and paint-ready.",
    tag: null,
    img: "/door2.jpeg",
    features: ["Natural Wood Look", "Fire Retardant", "Screwable & Nailable", "Router Friendly"],
  },
  {
    id: 3,
    category: "Bathroom Vanities",
    title: "WPC Window Frames",
    desc: "Stays true in all weather — ideal for bathrooms, kitchens, and high-humidity zones.",
    tag: null,
    img: "/Bathroom.png",
    features: ["All-Weather Stable", "Moisture Proof", "Eco-Friendly", "Long Lasting"],
  },
  {
    id: 4,
    category: "Shutters",
    title: "WPC Window Shutter Frames",
    desc: "Robust composite shutter frames resistant to borer, termite, and seasonal expansion.",
    tag: null,
    img: "/window1.png",
    features: ["Borer Resistant", "Smooth Operation", "No Expansion", "Low Maintenance"],
  },
  {
    id: 5,
    category: "Gates",
    title: "Gates & Fencing",
    desc: "3-Layer WPC boards for partitions, cladding, and structural paneling — the perfect plywood alternative.",
    tag: "New",
    img: "/Gates.png",
    features: ["Plywood Alternative", "Easy to Cut", "Paintable", "CNC Friendly"],
  },
  {
    id: 6,
    category: "Interiors",
    title: "Kitchen & Interiors",
    desc: "Custom modular kitchens and interior furniture from our in-house fabrication facility — end to end.",
    tag: null,
    img: "/Kitchen.png",
    features: ["Custom Design", "In-House Fabrication", "End-to-End", "Premium Finish"],
  },
];

const CATEGORIES = ["All", "Frames", "Shutters", "Bathroom Vanities", "Gates", "Interiors"];

function DXLogo({ size = 34 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <rect width="40" height="40" rx="8" fill="#1a4d2e" />
      <text x="4" y="28" fontFamily="Georgia,serif" fontWeight="900" fontSize="22" fill="#8B5E3C">D</text>
      <text x="20" y="28" fontFamily="Georgia,serif" fontWeight="900" fontSize="22" fill="#fff">X</text>
    </svg>
  );
}

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [hovered, setHovered] = useState(null);
  const [lightbox, setLightbox] = useState(null); // { src, title }
  const navigate = useNavigate();

  const filtered = activeCategory === "All"
    ? ALL_PRODUCTS
    : ALL_PRODUCTS.filter(p => p.category === activeCategory);

  return (
    <div style={{ fontFamily: "'Segoe UI',system-ui,-apple-system,sans-serif", minHeight: "100vh", background: "#f4f9f6" }}>

      {/* ── Navbar ── */}
      <nav style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(255,255,255,0.97)", backdropFilter: "blur(14px)", boxShadow: "0 2px 16px rgba(0,0,0,0.07)", padding: "0 5%" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={() => navigate("/")}>
            <DXLogo size={34} />
            <div>
              <div style={{ color: "#1a4d2e", fontWeight: 800, fontSize: 16, letterSpacing: 0.5, lineHeight: 1 }}>DuraCoreX</div>
              <div style={{ color: "#8B5E3C", fontSize: 8, letterSpacing: 1.5, textTransform: "uppercase" }}>The WPC Hub</div>
            </div>
          </div>
          <button onClick={() => navigate("/")}
            style={{ background: "none", border: "1.5px solid #2d6a4f", color: "#1a4d2e", borderRadius: 8, padding: "8px 20px", fontWeight: 600, fontSize: 13, cursor: "pointer" }}>
            ← Back to Home
          </button>
        </div>
      </nav>

      {/* ── Page Header ── */}
      <div className="pp-header" style={{ padding: "52px 5% 40px", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2.5, textTransform: "uppercase", color: "#8B5E3C", marginBottom: 10 }}>Our Product Range</div>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
          <div>
            <h1 className="pp-h1" style={{ color: "#1a4d2e", fontSize: "clamp(24px, 3.5vw, 38px)", fontWeight: 800, fontFamily: "Georgia,serif", margin: "0 0 10px", lineHeight: 1.15 }}>
              Premium Floresta WPC Products
            </h1>
            <p style={{ color: "#5a7a6a", fontSize: 14, lineHeight: 1.7, margin: 0, maxWidth: 500 }}>
              Karnataka's trusted range of Wood Polymer Composite solutions — termite-proof, waterproof, and built to last.
            </p>
          </div>
          <div className="pp-badge" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#fff", border: "1.5px solid #e0ede6", borderRadius: 12, padding: "10px 18px" }}>
            <img src="/floresta-logo2.png" alt="Floresta WPC" style={{ height: 32, width: "auto", objectFit: "contain" }} />
            <div style={{ width: 1, height: 24, background: "#d0e8d8" }} />
            <div>
              <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", color: "#8B5E3C" }}>Authorized</div>
              <div style={{ fontSize: 10, fontWeight: 700, color: "#1a4d2e" }}>Channel Partner</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Category Tabs ── */}
      <div className="pp-tabs" style={{ background: "#fff", borderTop: "1px solid #e8f0eb", borderBottom: "1px solid #e8f0eb", padding: "0 5%", display: "flex", gap: 0, overflowX: "auto" }}>
        {CATEGORIES.map(cat => (
          <button key={cat} onClick={() => setActiveCategory(cat)}
            style={{
              background: "none", border: "none", padding: "14px 22px",
              fontWeight: 700, fontSize: 13, cursor: "pointer",
              color: activeCategory === cat ? "#1a4d2e" : "#8aab96",
              borderBottom: `2.5px solid ${activeCategory === cat ? "#1a4d2e" : "transparent"}`,
              transition: "all 0.2s", whiteSpace: "nowrap",
            }}>
            {cat}
          </button>
        ))}
      </div>

      {/* ── Product Grid ── */}
      <div style={{ padding: "40px 5% 80px", maxWidth: 1200, margin: "0 auto" }}>
        <div className="pp-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 24 }}>
          {filtered.map((product) => (
            <div key={product.id}
              onMouseEnter={() => setHovered(product.id)}
              onMouseLeave={() => setHovered(null)}
              style={{
                background: "#fff", borderRadius: 18, overflow: "hidden",
                border: `1.5px solid ${hovered === product.id ? "#2d6a4f" : "#e8f0eb"}`,
                boxShadow: hovered === product.id ? "0 12px 40px rgba(26,77,46,0.12)" : "0 2px 10px rgba(0,0,0,0.04)",
                transition: "all 0.28s ease",
                transform: hovered === product.id ? "translateY(-5px)" : "translateY(0)",
                display: "flex", flexDirection: "column",
              }}>

              {/* Image */}
              <div className="pp-img" style={{ position: "relative", height: 260, background: product.img ? "#f2f2f2" : "#eef5f0", overflow: "hidden", cursor: product.img ? "zoom-in" : "default" }}
                onClick={() => product.img && setLightbox({ src: product.img, title: product.title })}>
                {product.img ? (
                  <img src={product.img} alt={product.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", transition: "transform 0.45s ease", transform: hovered === product.id ? "scale(1.05)" : "scale(1)", display: "block" }} />
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", gap: 8 }}>
                    <div style={{ fontSize: 40, opacity: 0.3 }}>🏗️</div>
                    <span style={{ fontSize: 11, color: "#8aab96", fontWeight: 600 }}>Image Coming Soon</span>
                  </div>
                )}
                {product.tag && (
                  <div style={{ position: "absolute", top: 12, left: 12, background: "#8B5E3C", color: "#fff", fontSize: 9, fontWeight: 700, borderRadius: 20, padding: "4px 11px", letterSpacing: 0.5 }}>
                    {product.tag}
                  </div>
                )}
              </div>

              {/* Content */}
              <div style={{ padding: "14px 16px 14px", display: "flex", flexDirection: "column", flex: 1 }}>
                <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", color: "#8B5E3C", marginBottom: 3 }}>{product.category}</div>
                <h3 style={{ color: "#1a4d2e", fontWeight: 800, fontSize: 15, fontFamily: "Georgia,serif", margin: "0 0 12px", lineHeight: 1.3 }}>{product.title}</h3>

                <button
                  onClick={() => navigate("/?enquiry=1")}
                  style={{
                    background: hovered === product.id ? "#1a4d2e" : "transparent",
                    color: hovered === product.id ? "#fff" : "#1a4d2e",
                    border: "1.5px solid #1a4d2e", borderRadius: 9,
                    padding: "9px", fontWeight: 700, fontSize: 12,
                    cursor: "pointer", transition: "all 0.25s", width: "100%",
                  }}>
                  Enquire Now →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Lightbox ── */}
      {lightbox && (
        <div onClick={() => setLightbox(null)}
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: 24, cursor: "zoom-out" }}>
          <div onClick={e => e.stopPropagation()} style={{ position: "relative", maxWidth: "90vw", maxHeight: "90vh" }}>
            <img src={lightbox.src} alt={lightbox.title}
              style={{ maxWidth: "90vw", maxHeight: "85vh", objectFit: "contain", borderRadius: 16, boxShadow: "0 24px 80px rgba(0,0,0,0.5)", display: "block" }} />
            <div style={{ position: "absolute", bottom: -36, left: 0, right: 0, textAlign: "center", color: "rgba(255,255,255,0.7)", fontSize: 13, fontWeight: 600 }}>{lightbox.title}</div>
            <button onClick={() => setLightbox(null)}
              style={{ position: "absolute", top: -14, right: -14, width: 34, height: 34, borderRadius: "50%", background: "#fff", border: "none", fontSize: 18, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 12px rgba(0,0,0,0.3)", color: "#333", fontWeight: 700 }}>
              ×
            </button>
          </div>
        </div>
      )}

      {/* ── Footer strip ── */}
      <div style={{ background: "#1a4d2e", padding: "22px 5%", textAlign: "center" }}>
        <p style={{ color: "rgba(200,230,210,0.65)", fontSize: 12, margin: 0 }}>
          © 2025 DuraCoreX — The WPC Hub · Karnataka's Authorized Floresta WPC Channel Partner
        </p>
      </div>

      <style>{`
        @media (max-width: 600px) {
          .pp-grid { grid-template-columns: 1fr !important; padding: 28px 5% 60px !important; }
          .pp-header { padding: 36px 5% 24px !important; }
          .pp-h1 { font-size: 22px !important; }
          .pp-badge { display: none !important; }
          .pp-tabs button { padding: 12px 14px !important; font-size: 12px !important; }
          .pp-img { height: 200px !important; }
        }
        @media (max-width: 400px) {
          .pp-h1 { font-size: 19px !important; }
          .pp-img { height: 170px !important; }
        }
      `}</style>
    </div>
  );
}
