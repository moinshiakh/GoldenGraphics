import { useState, useEffect, useRef } from "react";
import { Globe } from "lucide-react";
import Navbar from "./navbar";
import Footer from "./footer";

const CATEGORIES = [
  { label: "PLUMBER",    bg: "#fffacd", border: "#b8860b", text: "#5a3e00", glow: "rgba(184,134,11,0.4)"  },
  { label: "ELECTRICAN", bg: "#d2b48c", border: "#8b6914", text: "#3b2000", glow: "rgba(139,105,20,0.4)"  },
  { label: "HELPER",     bg: "#ffff00", border: "#b8a000", text: "#3b3000", glow: "rgba(184,160,0,0.5)"   },
  { label: "PAINTER",    bg: "#cc0000", border: "#800000", text: "#ffffff", glow: "rgba(204,0,0,0.45)"    },
  { label: "CENTRING",   bg: "#a0a060", border: "#6b6b30", text: "#ffffff", glow: "rgba(107,107,48,0.4)"  },
  { label: "FARSHIWALA", bg: "#add8e6", border: "#4a90b8", text: "#003050", glow: "rgba(74,144,184,0.4)"  },
  { label: "ALLUMINIU",  bg: "#ffd700", border: "#b8860b", text: "#3b2000", glow: "rgba(255,215,0,0.5)"   },
  { label: "GAVANDI",    bg: "#fffacd", border: "#b8860b", text: "#5a3e00", glow: "rgba(184,134,11,0.4)"  },
  { label: "PLUMBER",    bg: "#b0f0e0", border: "#2e8b57", text: "#003020", glow: "rgba(46,139,87,0.4)"   },
];

const WORKERS = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  name: "SHABBIR",
  phone: "9890625465",
  review: "REVIEW**********",
}));

function WorkerRow({ worker, index }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1.5fr",
        border: hovered ? "1.5px solid #b8860b" : "1.5px solid #c8b060",
        borderRadius: 5,
        overflow: "hidden",
        background: hovered ? "#fffbe0" : "#fffde7",
        boxShadow: hovered ? "0 4px 18px rgba(184,134,11,0.18)" : "0 1px 4px rgba(0,0,0,0.07)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0)" : "translateX(-32px)",
        transition: `opacity 0.4s ease ${index * 0.05}s, transform 0.4s ease ${index * 0.05}s, box-shadow 0.2s, border-color 0.2s, background 0.2s`,
        cursor: "pointer",
      }}
    >
      <div style={{
        padding: "10px 14px", fontWeight: 700, fontSize: "0.88rem",
        color: "#222", borderRight: "1.5px solid #c8b060",
        display: "flex", alignItems: "center", letterSpacing: "0.8px",
      }}>
        {worker.name}
      </div>
      <div style={{
        padding: "10px 14px", fontSize: "0.85rem", color: "#333",
        borderRight: "1.5px solid #c8b060",
        display: "flex", alignItems: "center", letterSpacing: "0.3px",
      }}>
        {worker.phone}
      </div>
      <div style={{
        padding: "10px 10px", fontSize: "0.75rem", color: "#555",
        display: "flex", alignItems: "center", letterSpacing: "0.2px",
        wordBreak: "break-all",
      }}>
        {worker.review}
      </div>
    </div>
  );
}

export default function LabourService() {
  const [selected, setSelected] = useState("PLUMBER");
  const [langOpen, setLangOpen] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [gridVisible, setGridVisible] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setHeaderVisible(true), 100);
    const t2 = setTimeout(() => setGridVisible(true), 300);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const selectedCat = CATEGORIES.find(c => c.label === selected) || CATEGORIES[0];

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg,#f0f0f0 0%,#e4e4e4 100%)", fontFamily: "Arial, sans-serif" }}>
      <Navbar />

      <main style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 16px 60px" }}>

        {/* ── Title ── */}
        <div style={{
          textAlign: "center", marginBottom: 28,
          opacity: headerVisible ? 1 : 0,
          transform: headerVisible ? "translateY(0)" : "translateY(-20px)",
          transition: "opacity 0.5s ease, transform 0.5s ease",
        }}>
          <h1 style={{
            fontSize: "clamp(1.4rem, 4vw, 2.2rem)", fontWeight: 900,
            letterSpacing: "4px", color: "#1a1a1a",
            textTransform: "uppercase", margin: 0,
            textShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}>
            LABOURS
          </h1>
          <div style={{ width: 60, height: 3, background: "linear-gradient(90deg,#8b00ff,#e53e3e)", margin: "10px auto 0", borderRadius: 2 }} />
        </div>

        {/* ── Category Grid ── */}
        <div style={{
          background: "linear-gradient(135deg,#d8d8d8,#c8c8c8)",
          border: "2px solid #aaa",
          borderRadius: 10,
          padding: "14px",
          marginBottom: 20,
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          opacity: gridVisible ? 1 : 0,
          transform: gridVisible ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.5s ease, transform 0.5s ease",
        }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 8,
          }}>
            {CATEGORIES.map((cat, i) => (
              <CategoryButton
                key={i}
                cat={cat}
                index={i}
                isSelected={selected === cat.label}
                onClick={() => setSelected(cat.label)}
                gridVisible={gridVisible}
              />
            ))}
          </div>
        </div>

        {/* ── Selected Category Header ── */}
        <div
          key={selected}
          style={{
            background: "linear-gradient(135deg,#7b00e0,#9b00ff)",
            color: "#ffff00",
            fontWeight: 900,
            fontSize: "clamp(0.95rem, 3vw, 1.15rem)",
            letterSpacing: "3px",
            textAlign: "center",
            padding: "12px 0",
            marginBottom: 14,
            borderRadius: 6,
            textTransform: "uppercase",
            border: "2px solid #5a0099",
            boxShadow: "0 4px 20px rgba(139,0,255,0.35)",
            animation: "popIn 0.3s cubic-bezier(.22,.68,0,1.4) both",
          }}
        >
          {selected}
        </div>

        {/* ── Worker List ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {WORKERS.map((w, i) => (
            <WorkerRow key={`${selected}-${w.id}`} worker={w} index={i} />
          ))}
        </div>
      </main>

      <Footer />

      {/* ── Globe / Language FAB ── */}
      <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 100 }}>
        {langOpen && (
          <div style={{
            position: "absolute", bottom: 58, right: 0,
            background: "white", borderRadius: 12,
            boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
            overflow: "hidden", minWidth: 130,
            animation: "slideUp 0.2s ease both",
          }}>
            {[{ code: "en", label: "🇬🇧 English" }, { code: "mr", label: "🇮🇳 मराठी" }].map(opt => (
              <button key={opt.code}
                style={{
                  display: "block", width: "100%", textAlign: "left",
                  padding: "10px 16px", border: "none", cursor: "pointer",
                  fontSize: "0.82rem", fontWeight: 500,
                  background: "white", color: "#333",
                  borderLeft: "3px solid transparent",
                  transition: "background 0.15s",
                }}
                onMouseEnter={e => { e.currentTarget.style.background = "#f9f9f9"; e.currentTarget.style.borderLeftColor = "#8b00ff"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "white"; e.currentTarget.style.borderLeftColor = "transparent"; }}
                onClick={() => setLangOpen(false)}
              >
                {opt.label}
              </button>
            ))}
          </div>
        )}
        <button
          onClick={() => setLangOpen(o => !o)}
          style={{
            width: 52, height: 52, borderRadius: "50%",
            background: "linear-gradient(135deg,#8b00ff,#5a0099)",
            border: "none", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 4px 20px rgba(139,0,255,0.5)",
            transition: "transform 0.25s ease, box-shadow 0.25s ease",
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.12) rotate(15deg)"; e.currentTarget.style.boxShadow = "0 6px 28px rgba(139,0,255,0.65)"; }}
          onMouseLeave={e => { e.currentTarget.style.transform = "scale(1) rotate(0deg)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(139,0,255,0.5)"; }}
        >
          <Globe size={22} color="white" />
        </button>
      </div>

      <style>{`
        @keyframes popIn {
          from { opacity: 0; transform: scale(0.88); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes catPop {
          from { opacity: 0; transform: scale(0.8) translateY(10px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes shimmer {
          from { background-position: -200% center; }
          to   { background-position: 200% center; }
        }
        * { box-sizing: border-box; }
        @media (max-width: 600px) {
          .cat-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }
      `}</style>
    </div>
  );
}

function CategoryButton({ cat, index, isSelected, onClick, gridVisible }) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: isSelected
          ? `linear-gradient(135deg, ${cat.bg}, ${cat.border}22)`
          : cat.bg,
        border: isSelected ? `2.5px solid ${cat.border}` : `2px solid ${cat.border}`,
        color: cat.text,
        fontWeight: 800,
        fontSize: "clamp(0.7rem, 2vw, 0.88rem)",
        letterSpacing: "0.5px",
        padding: "10px 6px",
        borderRadius: 5,
        cursor: "pointer",
        textAlign: "center",
        textTransform: "uppercase",
        boxShadow: isSelected
          ? `0 4px 16px ${cat.glow}, inset 0 0 0 2px ${cat.border}44`
          : hovered
            ? `0 4px 14px ${cat.glow}`
            : "0 1px 4px rgba(0,0,0,0.1)",
        transform: isSelected
          ? "scale(1.06) translateY(-2px)"
          : hovered
            ? "scale(1.03) translateY(-1px)"
            : "scale(1) translateY(0)",
        transition: "transform 0.2s ease, box-shadow 0.2s ease, border 0.15s ease",
        opacity: gridVisible ? 1 : 0,
        animation: gridVisible ? `catPop 0.35s ease ${index * 0.06}s both` : "none",
        outline: "none",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Shimmer overlay on hover */}
      {hovered && (
        <span style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.35) 50%, transparent 70%)",
          backgroundSize: "200% 100%",
          animation: "shimmer 0.6s ease forwards",
          pointerEvents: "none",
        }} />
      )}
      {cat.label}
    </button>
  );
}
