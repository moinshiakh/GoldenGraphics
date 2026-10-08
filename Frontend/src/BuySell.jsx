import { useState, useEffect, useRef } from "react";
import { Globe, ChevronRight, ChevronDown, Camera, MapPin, Tag, Plus, Sparkles, X, ChevronLeft } from "lucide-react";
import Navbar from "./navbar";
import Footer from "./footer";

const CATEGORIES = [
  { en: "CAR",       mr: "कार"        },
  { en: "BIKE",      mr: "बाईक"       },
  { en: "FURNITURE", mr: "फर्निचर"    },
  { en: "ELECTRIC",  mr: "इलेक्ट्रिक" },
  { en: "PLOT",      mr: "प्लॉट"      },
  { en: "FLAT",      mr: "फ्लॅट"      },
  { en: "RENT",      mr: "भाडे"       },
  { en: "FARM",      mr: "शेत"        },
];

const LISTINGS = {
  SALE: {
    CAR: [
      { id: 1, title: "Tata Tiago XT 2021", details: "Petrol · 28,000 km · First Owner", address: "Karad, Satara, MH", price: "₹4,85,000",
        images: [
          "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=600&q=80",
          "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&q=80",
          "https://images.unsplash.com/photo-1542362567-b07e54358753?w=600&q=80",
        ]},
      { id: 2, title: "Maruti Brezza ZXi", details: "Petrol · 42,000 km · 2020 Model", address: "Pune, MH", price: "₹8,20,000",
        images: [
          "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600&q=80",
          "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600&q=80",
          "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=600&q=80",
        ]},
      { id: 3, title: "Tata Nano CX", details: "Petrol · 18,000 km · 2018 Model", address: "Satara, MH", price: "₹1,75,000",
        images: [
          "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600&q=80",
          "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&q=80",
          "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=600&q=80",
        ]},
    ],
    BIKE: [
      { id: 4, title: "Honda Activa 6G", details: "Petrol · 12,000 km · 2022", address: "Kolhapur, MH", price: "₹68,000",
        images: [
          "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
          "https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?w=600&q=80",
          "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=600&q=80",
        ]},
      { id: 5, title: "Bajaj Pulsar 150", details: "Petrol · 35,000 km · 2019", address: "Nashik, MH", price: "₹55,000",
        images: [
          "https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=600&q=80",
          "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=600&q=80",
          "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=600&q=80",
        ]},
    ],
    FURNITURE: [
      { id: 6, title: "Sofa Set 5 Seater", details: "Wood + Fabric · Good Condition", address: "Pune, MH", price: "₹18,000",
        images: [
          "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80",
          "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=600&q=80",
          "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=600&q=80",
        ]},
    ],
    ELECTRIC: [
      { id: 7, title: 'LG 43" Smart TV', details: "4K · 2 yrs old · Working", address: "Mumbai, MH", price: "₹22,000",
        images: [
          "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=600&q=80",
          "https://images.unsplash.com/photo-1461151304267-38535e780c79?w=600&q=80",
          "https://images.unsplash.com/photo-1571415060716-baff5f717c37?w=600&q=80",
        ]},
    ],
    PLOT: [
      { id: 8, title: "500 sqft NA Plot", details: "Ready to Build · Clear Title", address: "Karad, MH", price: "₹12,00,000",
        images: [
          "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=80",
          "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=80",
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
        ]},
    ],
    FLAT: [
      { id: 9, title: "2 BHK Flat", details: "750 sqft · 3rd Floor · Lift", address: "Satara, MH", price: "₹35,00,000",
        images: [
          "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80",
          "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=80",
          "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=600&q=80",
        ]},
    ],
    RENT: [
      { id: 10, title: "1 RK for Rent", details: "300 sqft · Furnished · Parking", address: "Pune, MH", price: "₹8,000/mo",
        images: [
          "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&q=80",
          "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=600&q=80",
          "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80",
        ]},
    ],
    FARM: [
      { id: 11, title: "2 Acre Farm Land", details: "Water Source · Road Access", address: "Karad, MH", price: "₹28,00,000",
        images: [
          "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=80",
          "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=600&q=80",
          "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80",
        ]},
    ],
  },
  BUY: {
    CAR: [
      { id: 12, title: "Need Hatchback Car", details: "Budget ₹3-5L · Petrol · 2018+", address: "Satara, MH", price: "Budget: ₹5L",
        images: [
          "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=600&q=80",
          "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600&q=80",
          "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=600&q=80",
        ]},
      { id: 13, title: "Wanted SUV", details: "Budget ₹8-12L · Any Fuel", address: "Pune, MH", price: "Budget: ₹12L",
        images: [
          "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=600&q=80",
          "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600&q=80",
          "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600&q=80",
        ]},
    ],
    BIKE: [
      { id: 14, title: "Need 125cc Bike", details: "Budget ₹40-60K · 2019+", address: "Kolhapur, MH", price: "Budget: ₹60K",
        images: [
          "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
          "https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=600&q=80",
          "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=600&q=80",
        ]},
    ],
    FURNITURE: [],
    ELECTRIC: [
      { id: 15, title: "Need Washing Machine", details: "Front Load · 7kg · Budget ₹20K", address: "Nashik, MH", price: "Budget: ₹20K",
        images: [
          "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=600&q=80",
          "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&q=80",
          "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=600&q=80",
        ]},
    ],
    PLOT: [],
    FLAT: [
      { id: 16, title: "Need 2BHK Flat", details: "600-800 sqft · Lift · Parking", address: "Pune, MH", price: "Budget: ₹40L",
        images: [
          "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80",
          "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=80",
          "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=600&q=80",
        ]},
    ],
    RENT: [
      { id: 17, title: "Need 1BHK on Rent", details: "Semi-furnished · Near Highway", address: "Satara, MH", price: "₹7-9K/mo",
        images: [
          "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&q=80",
          "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=600&q=80",
          "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80",
        ]},
    ],
    FARM: [],
  },
};

// ── Lightbox Modal ────────────────────────────────────────────────────────────
function Lightbox({ images, startIndex, onClose }) {
  const [current, setCurrent] = useState(startIndex);

  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const prev = () => setCurrent(c => (c - 1 + images.length) % images.length);
  const next = () => setCurrent(c => (c + 1) % images.length);

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 1000,
        background: "rgba(0,0,0,0.88)",
        display: "flex", alignItems: "center", justifyContent: "center",
        animation: "fadeIn 0.2s ease",
      }}
    >
      {/* Close */}
      <button
        onClick={onClose}
        style={{
          position: "absolute", top: 16, right: 16,
          background: "rgba(255,255,255,0.15)", border: "none",
          borderRadius: "50%", width: 40, height: 40,
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", zIndex: 10,
          transition: "background 0.2s",
        }}
        onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.3)"}
        onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.15)"}
      >
        <X size={20} color="white" />
      </button>

      {/* Prev */}
      <button
        onClick={e => { e.stopPropagation(); prev(); }}
        style={{
          position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)",
          background: "rgba(255,255,255,0.15)", border: "none",
          borderRadius: "50%", width: 44, height: 44,
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", zIndex: 10, transition: "background 0.2s",
        }}
        onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.3)"}
        onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.15)"}
      >
        <ChevronLeft size={24} color="white" />
      </button>

      {/* Image */}
      <div onClick={e => e.stopPropagation()} style={{ maxWidth: "88vw", maxHeight: "82vh", position: "relative" }}>
        <img
          key={current}
          src={images[current]}
          alt={`Photo ${current + 1}`}
          style={{
            maxWidth: "88vw", maxHeight: "80vh",
            borderRadius: 12, objectFit: "cover",
            boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
            animation: "zoomIn 0.25s ease",
            display: "block",
          }}
        />
        {/* Counter */}
        <div style={{
          position: "absolute", bottom: 12, left: "50%", transform: "translateX(-50%)",
          background: "rgba(0,0,0,0.6)", color: "white",
          padding: "4px 14px", borderRadius: 20,
          fontSize: "0.78rem", fontWeight: 600, letterSpacing: "1px",
        }}>
          {current + 1} / {images.length}
        </div>
        {/* Dot indicators */}
        <div style={{
          position: "absolute", bottom: -28, left: "50%", transform: "translateX(-50%)",
          display: "flex", gap: 6,
        }}>
          {images.map((_, i) => (
            <button
              key={i}
              onClick={e => { e.stopPropagation(); setCurrent(i); }}
              style={{
                width: i === current ? 20 : 8, height: 8,
                borderRadius: 4, border: "none", cursor: "pointer",
                background: i === current ? "white" : "rgba(255,255,255,0.4)",
                transition: "all 0.25s ease", padding: 0,
              }}
            />
          ))}
        </div>
      </div>

      {/* Next */}
      <button
        onClick={e => { e.stopPropagation(); next(); }}
        style={{
          position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)",
          background: "rgba(255,255,255,0.15)", border: "none",
          borderRadius: "50%", width: 44, height: 44,
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", zIndex: 10, transition: "background 0.2s",
        }}
        onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.3)"}
        onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.15)"}
      >
        <ChevronRight size={24} color="white" />
      </button>
    </div>
  );
}

// ── Photo Strip (thumbnail row, click to open lightbox) ───────────────────────
function PhotoStrip({ images, accent, onOpen }) {
  const [hovered, setHovered] = useState(null);

  if (!images || images.length === 0) {
    return (
      <div style={{
        background: `linear-gradient(135deg, ${accent}18, ${accent}30)`,
        border: `1.5px dashed ${accent}80`,
        borderRadius: 10,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        gap: 6, minHeight: 110,
      }}>
        <Camera size={26} color={accent} strokeWidth={1.5} />
        <span style={{ fontSize: "0.72rem", color: accent, fontWeight: 600 }}>No Photos</span>
      </div>
    );
  }

  const main = images[0];
  const thumbs = images.slice(1);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
      {/* Main image */}
      <div
        onClick={() => onOpen(0)}
        onMouseEnter={() => setHovered("main")}
        onMouseLeave={() => setHovered(null)}
        style={{
          position: "relative", borderRadius: 9, overflow: "hidden",
          cursor: "pointer", aspectRatio: "16/9",
          boxShadow: hovered === "main" ? `0 6px 20px ${accent}50` : "0 2px 8px rgba(0,0,0,0.12)",
          transition: "box-shadow 0.2s",
        }}
      >
        <img
          src={main}
          alt="main"
          style={{
            width: "100%", height: "100%", objectFit: "cover",
            transform: hovered === "main" ? "scale(1.04)" : "scale(1)",
            transition: "transform 0.35s ease",
            display: "block",
          }}
        />
        {/* Photo count badge */}
        <div style={{
          position: "absolute", bottom: 7, right: 7,
          background: "rgba(0,0,0,0.65)", color: "white",
          fontSize: "0.65rem", fontWeight: 700,
          padding: "2px 8px", borderRadius: 10,
          display: "flex", alignItems: "center", gap: 4,
          backdropFilter: "blur(4px)",
        }}>
          <Camera size={10} color="white" />
          {images.length} Photos
        </div>
        {/* Hover overlay */}
        {hovered === "main" && (
          <div style={{
            position: "absolute", inset: 0,
            background: `${accent}22`,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <span style={{
              background: "rgba(0,0,0,0.55)", color: "white",
              fontSize: "0.72rem", fontWeight: 700,
              padding: "5px 12px", borderRadius: 20,
              backdropFilter: "blur(4px)",
            }}>
              View Photos
            </span>
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {thumbs.length > 0 && (
        <div style={{ display: "flex", gap: 5 }}>
          {thumbs.map((img, i) => (
            <div
              key={i}
              onClick={() => onOpen(i + 1)}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                flex: 1, borderRadius: 6, overflow: "hidden",
                cursor: "pointer", aspectRatio: "1",
                boxShadow: hovered === i ? `0 4px 12px ${accent}50` : "0 1px 4px rgba(0,0,0,0.1)",
                transition: "box-shadow 0.2s",
                position: "relative",
              }}
            >
              <img
                src={img}
                alt={`thumb ${i + 1}`}
                style={{
                  width: "100%", height: "100%", objectFit: "cover",
                  transform: hovered === i ? "scale(1.08)" : "scale(1)",
                  transition: "transform 0.3s ease",
                  display: "block",
                }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Listing Card ──────────────────────────────────────────────────────────────
function ListingCard({ item, index, accent, mode }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [lightbox, setLightbox] = useState(null); // index or null

  useEffect(() => {
    setVisible(false);
    const t = setTimeout(() => {
      const obs = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) setVisible(true); },
        { threshold: 0.06 }
      );
      if (ref.current) obs.observe(ref.current);
      return () => obs.disconnect();
    }, 40);
    return () => clearTimeout(t);
  }, [item.id]);

  return (
    <>
      {lightbox !== null && (
        <Lightbox images={item.images} startIndex={lightbox} onClose={() => setLightbox(null)} />
      )}
      <div
        ref={ref}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: hovered ? "#fff" : "#fffef0",
          border: `1.5px solid ${hovered ? accent : "#e8d87a"}`,
          borderRadius: 12, overflow: "hidden",
          boxShadow: hovered
            ? `0 8px 28px rgba(0,0,0,0.10), 0 0 0 2px ${accent}28`
            : "0 2px 8px rgba(0,0,0,0.06)",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(22px)",
          transition: `opacity 0.4s ease ${index * 0.07}s, transform 0.4s ease ${index * 0.07}s, box-shadow 0.22s, border-color 0.22s, background 0.18s`,
        }}
      >
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
          {/* Left: details */}
          <div style={{
            padding: "14px 16px", borderRight: "1px solid #e8d87a",
            display: "flex", flexDirection: "column", gap: 6,
          }}>
            <div style={{ fontWeight: 800, fontSize: "0.92rem", color: "#1a1a1a", lineHeight: 1.3 }}>
              {item.title}
            </div>
            <div style={{ fontSize: "0.78rem", color: "#555", lineHeight: 1.4 }}>
              {item.details}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 2 }}>
              <MapPin size={12} color="#e53e3e" />
              <span style={{ fontSize: "0.74rem", color: "#666" }}>{item.address}</span>
            </div>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 4,
              background: mode === "SALE"
                ? "linear-gradient(135deg, #e53e3e, #c0392b)"
                : "linear-gradient(135deg, #16a34a, #0e7f2e)",
              color: "white", padding: "4px 10px", borderRadius: 20,
              fontSize: "0.78rem", fontWeight: 700,
              alignSelf: "flex-start", marginTop: 2,
              boxShadow: mode === "SALE"
                ? "0 2px 8px rgba(229,62,62,0.35)"
                : "0 2px 8px rgba(22,163,74,0.35)",
            }}>
              <Tag size={11} />
              {item.price}
            </div>
          </div>

          {/* Right: photos */}
          <div style={{ padding: "12px 10px" }}>
            <PhotoStrip images={item.images} accent={accent} onOpen={(i) => setLightbox(i)} />
          </div>
        </div>
      </div>
    </>
  );
}

// ── Category Button ───────────────────────────────────────────────────────────
function CatButton({ cat, isSelected, onClick, lang }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: isSelected
          ? "linear-gradient(135deg, #6a0dad, #9b00ff)"
          : hov ? "#fffbe6" : "#fffef5",
        border: isSelected ? "2px solid #5a0099" : `1.5px solid ${hov ? "#b8860b" : "#c8b060"}`,
        color: isSelected ? "#ffee00" : "#3a2e00",
        fontWeight: 800, fontSize: "clamp(0.65rem, 1.6vw, 0.8rem)",
        padding: "9px 4px 7px", borderRadius: 7, cursor: "pointer",
        textAlign: "center", textTransform: "uppercase", letterSpacing: "0.4px",
        lineHeight: 1.2,
        boxShadow: isSelected
          ? "0 4px 16px rgba(139,0,255,0.38)"
          : hov ? "0 3px 10px rgba(184,134,11,0.22)" : "0 1px 3px rgba(0,0,0,0.08)",
        transform: isSelected ? "scale(1.06) translateY(-2px)" : hov ? "scale(1.03)" : "scale(1)",
        transition: "all 0.18s ease", outline: "none",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        gap: 2, minHeight: 48, width: "100%",
        position: "relative", overflow: "hidden",
      }}
    >
      <span>{lang === "mr" ? cat.mr : cat.en}</span>
      <span style={{ fontSize: "0.58rem", opacity: 0.7, fontWeight: 500 }}>
        {lang === "mr" ? cat.en : cat.mr}
      </span>
      {hov && !isSelected && (
        <span style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(110deg,transparent 30%,rgba(255,255,255,0.45) 50%,transparent 70%)",
          backgroundSize: "200% 100%",
          animation: "shimmer 0.5s ease forwards",
          pointerEvents: "none",
        }} />
      )}
    </button>
  );
}

// ── Mode Panel ────────────────────────────────────────────────────────────────
function ModePanel({ mode, modeColor, lang, isMobile }) {
  const [selected, setSelected] = useState("CAR");
  const [open, setOpen] = useState(!isMobile);
  const listings = LISTINGS[mode][selected] || [];
  const accent = mode === "SALE" ? "#c0392b" : "#16a34a";

  return (
    <div style={{
      flex: 1, minWidth: 0, background: "white", borderRadius: 14,
      boxShadow: "0 4px 20px rgba(0,0,0,0.08)", overflow: "hidden",
      border: `1.5px solid ${modeColor}44`,
    }}>
      <div
        onClick={() => isMobile && setOpen(o => !o)}
        style={{
          background: `linear-gradient(135deg, ${modeColor}, ${modeColor}cc)`,
          padding: "12px 16px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          cursor: isMobile ? "pointer" : "default", userSelect: "none",
        }}
      >
        <span style={{ color: "white", fontWeight: 900, fontSize: "clamp(1rem, 3vw, 1.3rem)", letterSpacing: "4px", textTransform: "uppercase" }}>
          {mode === "SALE" ? (lang === "mr" ? "विक्री" : "SALE") : (lang === "mr" ? "खरेदी" : "BUY")}
        </span>
        {isMobile && (
          <ChevronDown size={20} color="white" style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s ease" }} />
        )}
      </div>

      <div style={{ maxHeight: isMobile && !open ? 0 : "4000px", overflow: "hidden", transition: "max-height 0.4s ease" }}>
        <div style={{ padding: "12px 12px 8px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 7 }}>
            {CATEGORIES.map(cat => (
              <CatButton key={cat.en} cat={cat} isSelected={selected === cat.en} onClick={() => setSelected(cat.en)} lang={lang} />
            ))}
          </div>
        </div>

        <div key={`${mode}-${selected}`} style={{
          margin: "4px 12px 10px",
          background: "linear-gradient(135deg, #6a0dad, #9b00ff)",
          color: "#ffee00", fontWeight: 900,
          fontSize: "clamp(0.85rem, 2.5vw, 1rem)", letterSpacing: "3px",
          textAlign: "center", padding: "10px 0", borderRadius: 8,
          border: "2px solid #5a0099", boxShadow: "0 4px 18px rgba(139,0,255,0.32)",
          animation: "popIn 0.28s cubic-bezier(.22,.68,0,1.4) both",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
        }}>
          <span style={{ textTransform: "uppercase" }}>
            {lang === "mr" ? (CATEGORIES.find(c => c.en === selected)?.mr || selected) : selected}
          </span>
          {listings.length === 0 && (
            <span style={{ fontSize: "0.7rem", opacity: 0.8, fontWeight: 600 }}>
              ({lang === "mr" ? "कोणीही नाही" : "No listings"})
            </span>
          )}
        </div>

        <div style={{ margin: "0 12px 12px", display: "flex", justifyContent: "flex-end" }}>
          <button style={{
            display: "flex", alignItems: "center", gap: 6,
            background: "linear-gradient(135deg, #f39c12, #e67e22)",
            color: "white", border: "none", borderRadius: 20,
            padding: "7px 14px", fontSize: "0.75rem", fontWeight: 700,
            cursor: "pointer", boxShadow: "0 3px 12px rgba(243,156,18,0.4)",
            transition: "transform 0.18s",
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.04)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; }}
          >
            <Plus size={13} />
            {lang === "mr" ? "१ महिन्यासाठी जाहिरात द्या" : "ADD FOR 1 MONTH ONLY"}
          </button>
        </div>

        <div style={{ padding: "0 12px 16px", display: "flex", flexDirection: "column", gap: 10 }}>
          {listings.length === 0 ? (
            <div style={{ textAlign: "center", padding: "32px 16px", color: "#bbb", fontSize: "0.88rem" }}>
              <div style={{ fontSize: "2rem", marginBottom: 8 }}>📭</div>
              {lang === "mr" ? "या विभागात कोणीही नाही" : "No listings in this category yet"}
            </div>
          ) : (
            listings.map((item, i) => (
              <ListingCard key={`${mode}-${selected}-${item.id}`} item={item} index={i} accent={accent} mode={mode} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function BuySell() {
  const [lang, setLang] = useState("en");
  const [langOpen, setLangOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setHeaderVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(160deg, #f0efe8 0%, #e6e4db 100%)", fontFamily: "'Segoe UI', Arial, sans-serif" }}>
      <Navbar />

      <main style={{ maxWidth: 1200, margin: "0 auto", padding: "28px 16px 80px" }}>
        <div style={{
          textAlign: "center", marginBottom: 28,
          opacity: headerVisible ? 1 : 0,
          transform: headerVisible ? "translateY(0)" : "translateY(-16px)",
          transition: "opacity 0.5s ease, transform 0.5s ease",
        }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 10,
            background: "linear-gradient(135deg, #1a1a2e, #2d2d5e)",
            color: "white", padding: "10px 28px 10px 20px",
            borderRadius: 50, boxShadow: "0 4px 20px rgba(0,0,0,0.18)", marginBottom: 8,
          }}>
            <Sparkles size={18} color="#f1c40f" />
            <h1 style={{ margin: 0, fontSize: "clamp(1rem, 4vw, 1.6rem)", fontWeight: 900, letterSpacing: "4px" }}>
              {lang === "mr" ? "खरेदी व विक्री" : "BUY & SELL"}
            </h1>
          </div>
          <p style={{ margin: 0, color: "#777", fontSize: "0.85rem", letterSpacing: "0.5px" }}>
            {lang === "mr" ? "खरेदी करा · विका · भाड्याने द्या" : "Buy · Sell · Rent · Near You"}
          </p>
          <div style={{ width: 60, height: 3, background: "linear-gradient(90deg,#e53e3e,#16a34a)", margin: "10px auto 0", borderRadius: 2 }} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 16, alignItems: "start" }}>
          <ModePanel mode="SALE" modeColor="#c0392b" lang={lang} isMobile={isMobile} />
          <ModePanel mode="BUY"  modeColor="#16a34a" lang={lang} isMobile={isMobile} />
        </div>
      </main>

      <Footer />

      {/* Language FAB */}
      <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 200 }}>
        {langOpen && (
          <div style={{
            position: "absolute", bottom: 60, right: 0,
            background: "white", borderRadius: 12,
            boxShadow: "0 8px 28px rgba(0,0,0,0.14)",
            overflow: "hidden", minWidth: 140,
            animation: "slideUp 0.2s ease both", border: "1px solid #eee",
          }}>
            {[{ code: "en", label: "🇬🇧  English" }, { code: "mr", label: "🇮🇳  मराठी" }].map(opt => (
              <button key={opt.code}
                onClick={() => { setLang(opt.code); setLangOpen(false); }}
                style={{
                  display: "flex", alignItems: "center", width: "100%",
                  padding: "10px 16px", border: "none", cursor: "pointer",
                  fontSize: "0.85rem", fontWeight: lang === opt.code ? 700 : 500,
                  background: lang === opt.code ? "#f3e8ff" : "white",
                  color: lang === opt.code ? "#6a0dad" : "#333",
                  borderLeft: lang === opt.code ? "3px solid #8b00ff" : "3px solid transparent",
                  transition: "background 0.15s",
                }}
                onMouseEnter={e => { if (lang !== opt.code) e.currentTarget.style.background = "#fafafa"; }}
                onMouseLeave={e => { if (lang !== opt.code) e.currentTarget.style.background = "white"; }}
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
          onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.12) rotate(15deg)"; }}
          onMouseLeave={e => { e.currentTarget.style.transform = "scale(1) rotate(0deg)"; }}
        >
          <Globe size={22} color="white" />
        </button>
      </div>

      <style>{`
        @keyframes popIn { from { opacity:0; transform:scale(0.88) translateY(4px); } to { opacity:1; transform:scale(1) translateY(0); } }
        @keyframes slideUp { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
        @keyframes shimmer { from { background-position:-200% center; } to { background-position:200% center; } }
        @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
        @keyframes zoomIn { from { opacity:0; transform:scale(0.92); } to { opacity:1; transform:scale(1); } }
        * { box-sizing:border-box; }
      `}</style>
    </div>
  );
}
