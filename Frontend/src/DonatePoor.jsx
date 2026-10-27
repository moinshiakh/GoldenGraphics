// DonatePoor.jsx — Donate Needy / Donor Portal
// React + Vite + inline styles (no Tailwind required)
// Font: add to index.html → <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;600;700;900&family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">

import { useState, useEffect, useRef, useCallback } from "react";
import Navbar from "./navbar";
import Footer from "./footer";
import { useLang } from "./useLang";

// ── Design tokens ─────────────────────────────────────────────────────────────
const T = {
  bg:        "#f4f6fb",
  card:      "#ffffff",
  border:    "#e4e8f0",
  borderDk:  "#c8cfdf",
  navy:      "#0d2236",
  navyMid:   "#14324f",
  green:     "#16a34a",
  greenSoft: "#dcfce7",
  amber:     "#d97706",
  amberSoft: "#fef3c7",
  purple:    "#7c3aed",
  purpleSoft:"#ede9fe",
  red:       "#dc2626",
  redSoft:   "#fee2e2",
  text:      "#111827",
  textSub:   "#4b5563",
  textMuted: "#9ca3af",
  shadow:    "0 1px 4px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)",
  shadowMd:  "0 4px 20px rgba(0,0,0,0.09)",
  shadowHov: "0 8px 32px rgba(0,0,0,0.13)",
  radius:    12,
  font:      "'Noto Sans Devanagari','Inter','Segoe UI',system-ui,sans-serif",
};

// ── Donor data ────────────────────────────────────────────────────────────────
const DONORS = [
  {
    id: 1,
    name_mr: "श्री. रमेश पाटील",
    name_en: "Shri. Ramesh Patil",
    role_mr: "समाजसेवक, कराड",
    role_en: "Social Worker, Karad",
    since_mr: "२०१८ पासून दाता",
    since_en: "Donor since 2018",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    avatarFallback: "RP",
    accentColor: "#d97706",
    accentSoft:  "#fef3c7",
    accentBorder:"#fcd34d",
    docs: [
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&q=75",
      "https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=400&q=75",
      "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=400&q=75",
      "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=400&q=75",
      "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=400&q=75",
      "https://images.unsplash.com/photo-1416339306562-f3d12fefd36f?w=400&q=75",
    ],
    bank: { name_mr: "बँक ऑफ महाराष्ट्र", name_en: "Bank of Maharashtra", acNo: "12340100012345", ifsc: "MAHB0001234", upi: "ramesh.patil@upi" },
    total_mr: "₹२,४५,०००+", total_en: "₹2,45,000+",
    helped_mr: "४५० कुटुंबे", helped_en: "450 Families",
  },
  {
    id: 2,
    name_mr: "सौ. सुनीता देशमुख",
    name_en: "Sau. Sunita Deshmukh",
    role_mr: "उद्योजिका, सातारा",
    role_en: "Entrepreneur, Satara",
    since_mr: "२०२० पासून दाता",
    since_en: "Donor since 2020",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    avatarFallback: "SD",
    accentColor: "#7c3aed",
    accentSoft:  "#ede9fe",
    accentBorder:"#c4b5fd",
    docs: [
      "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=400&q=75",
      "https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=400&q=75",
      "https://images.unsplash.com/photo-1524069290683-0457abfe42c3?w=400&q=75",
      "https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=400&q=75",
      "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=400&q=75",
      "https://images.unsplash.com/photo-1542810634-71277d95dcbb?w=400&q=75",
    ],
    bank: { name_mr: "स्टेट बँक ऑफ इंडिया", name_en: "State Bank of India", acNo: "56780200056789", ifsc: "SBIN0005678", upi: "sunita.deshmukh@sbi" },
    total_mr: "₹१,८०,०००+", total_en: "₹1,80,000+",
    helped_mr: "३२० कुटुंबे", helped_en: "320 Families",
  },
  {
    id: 3,
    name_mr: "डॉ. अनिल जोशी",
    name_en: "Dr. Anil Joshi",
    role_mr: "डॉक्टर, पुणे",
    role_en: "Doctor, Pune",
    since_mr: "२०१९ पासून दाता",
    since_en: "Donor since 2019",
    avatar: "https://randomuser.me/api/portraits/men/67.jpg",
    avatarFallback: "AJ",
    accentColor: "#0891b2",
    accentSoft:  "#cffafe",
    accentBorder:"#67e8f9",
    docs: [
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&q=75",
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&q=75",
      "https://images.unsplash.com/photo-1584515933487-779824d29309?w=400&q=75",
      "https://images.unsplash.com/photo-1578496479914-7ef3b0193be3?w=400&q=75",
      "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=400&q=75",
      "https://images.unsplash.com/photo-1551884170-09fb70a3a2ed?w=400&q=75",
    ],
    bank: { name_mr: "HDFC बँक", name_en: "HDFC Bank", acNo: "91230300091234", ifsc: "HDFC0009123", upi: "anil.joshi@hdfc" },
    total_mr: "₹३,१०,०००+", total_en: "₹3,10,000+",
    helped_mr: "५८० कुटुंबे", helped_en: "580 Families",
  },
];

// ── Needy people (same card layout) ──────────────────────────────────────────
const NEEDY = [
  {
    id: 1,
    name_mr: "कमला बाई शिंदे",
    name_en: "Kamala Bai Shinde",
    role_mr: "विधवा, माण तालुका",
    role_en: "Widow, Man Taluka",
    need_mr: "अन्न व औषध सहाय्य",
    need_en: "Food & Medicine Support",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    avatarFallback: "KS",
    accentColor: "#dc2626",
    accentSoft:  "#fee2e2",
    accentBorder:"#fca5a5",
    docs: [
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&q=75",
      "https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=400&q=75",
      "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=400&q=75",
      "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=400&q=75",
      "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=400&q=75",
      "https://images.unsplash.com/photo-1416339306562-f3d12fefd36f?w=400&q=75",
    ],
    bank: { name_mr: "ट्रस्ट खाते – कमला", name_en: "Trust A/C – Kamala", acNo: "11110100011111", ifsc: "MAHB0000100", upi: "trust.kamala@upi" },
    needed_mr: "₹५,०००/महिना", needed_en: "₹5,000/month",
    helped_mr: "३ मुले", helped_en: "3 Children",
  },
  {
    id: 2,
    name_mr: "मोहम्मद युसूफ",
    name_en: "Mohammed Yusuf",
    role_mr: "अपंग कामगार, कराड",
    role_en: "Disabled Worker, Karad",
    need_mr: "उपचार व पुनर्वसन",
    need_en: "Treatment & Rehabilitation",
    avatar: "https://randomuser.me/api/portraits/men/55.jpg",
    avatarFallback: "MY",
    accentColor: "#16a34a",
    accentSoft:  "#dcfce7",
    accentBorder:"#86efac",
    docs: [
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&q=75",
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&q=75",
      "https://images.unsplash.com/photo-1584515933487-779824d29309?w=400&q=75",
      "https://images.unsplash.com/photo-1578496479914-7ef3b0193be3?w=400&q=75",
      "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=400&q=75",
      "https://images.unsplash.com/photo-1551884170-09fb70a3a2ed?w=400&q=75",
    ],
    bank: { name_mr: "ट्रस्ट खाते – युसूफ", name_en: "Trust A/C – Yusuf", acNo: "22220200022222", ifsc: "MAHB0000200", upi: "trust.yusuf@upi" },
    needed_mr: "₹८,०००/महिना", needed_en: "₹8,000/month",
    helped_mr: "कुटुंब – ५", helped_en: "Family of 5",
  },
  {
    id: 3,
    name_mr: "गीता ताई मोरे",
    name_en: "Geeta Tai More",
    role_mr: "वृद्ध एकाकी महिला",
    role_en: "Elderly Lone Woman",
    need_mr: "निवारा व आहार",
    need_en: "Shelter & Nutrition",
    avatar: "https://randomuser.me/api/portraits/women/82.jpg",
    avatarFallback: "GM",
    accentColor: "#7c3aed",
    accentSoft:  "#ede9fe",
    accentBorder:"#c4b5fd",
    docs: [
      "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=400&q=75",
      "https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=400&q=75",
      "https://images.unsplash.com/photo-1524069290683-0457abfe42c3?w=400&q=75",
      "https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=400&q=75",
      "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=400&q=75",
      "https://images.unsplash.com/photo-1542810634-71277d95dcbb?w=400&q=75",
    ],
    bank: { name_mr: "ट्रस्ट खाते – गीता", name_en: "Trust A/C – Geeta", acNo: "33330300033333", ifsc: "MAHB0000300", upi: "trust.geeta@upi" },
    needed_mr: "₹४,५००/महिना", needed_en: "₹4,500/month",
    helped_mr: "एकटी राहते", helped_en: "Lives alone",
  },
];

// ── Lightbox ──────────────────────────────────────────────────────────────────
function Lightbox({ images, startIndex, onClose }) {
  const [cur, setCur] = useState(startIndex);

  useEffect(() => {
    const fn = e => {
      if (e.key === "Escape")      onClose();
      if (e.key === "ArrowRight")  setCur(c => (c + 1) % images.length);
      if (e.key === "ArrowLeft")   setCur(c => (c - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, []);

  return (
    <div onClick={onClose} style={{
      position:"fixed", inset:0, zIndex:9999,
      background:"rgba(5,5,15,0.93)",
      display:"flex", alignItems:"center", justifyContent:"center",
      padding:16, animation:"fadeIn 0.18s ease",
    }}>
      {/* Close */}
      <button onClick={onClose} style={{ position:"absolute", top:16, right:16, width:40, height:40, borderRadius:"50%", background:"rgba(255,255,255,0.12)", border:"1px solid rgba(255,255,255,0.2)", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", zIndex:10 }}>
        <svg viewBox="0 0 24 24" width="18" height="18" stroke="white" strokeWidth="2" fill="none"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
      {/* Prev */}
      <button onClick={e=>{e.stopPropagation();setCur(c=>(c-1+images.length)%images.length);}} style={{ position:"absolute", left:12, top:"50%", transform:"translateY(-50%)", width:44, height:44, borderRadius:"50%", background:"rgba(255,255,255,0.12)", border:"1px solid rgba(255,255,255,0.2)", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", zIndex:10 }}>
        <svg viewBox="0 0 24 24" width="20" height="20" stroke="white" strokeWidth="2.5" fill="none"><polyline points="15 18 9 12 15 6"/></svg>
      </button>
      {/* Image */}
      <div onClick={e=>e.stopPropagation()} style={{ maxWidth:"90vw", maxHeight:"86vh", position:"relative" }}>
        <img key={cur} src={images[cur]} alt="" style={{ maxWidth:"90vw", maxHeight:"84vh", borderRadius:12, objectFit:"cover", display:"block", boxShadow:"0 24px 64px rgba(0,0,0,0.5)", animation:"zoomIn 0.2s ease" }}/>
        <div style={{ position:"absolute", bottom:10, left:"50%", transform:"translateX(-50%)", background:"rgba(0,0,0,0.6)", color:"white", fontSize:"0.72rem", fontWeight:700, padding:"3px 12px", borderRadius:20 }}>
          {cur + 1} / {images.length}
        </div>
      </div>
      {/* Dots */}
      <div style={{ position:"absolute", bottom:14, left:"50%", transform:"translateX(-50%)", display:"flex", gap:6 }}>
        {images.map((_,i) => <button key={i} onClick={e=>{e.stopPropagation();setCur(i);}} style={{ width:i===cur?20:8, height:8, borderRadius:4, border:"none", cursor:"pointer", background:i===cur?"white":"rgba(255,255,255,0.35)", transition:"all 0.2s ease", padding:0 }}/>)}
      </div>
      {/* Next */}
      <button onClick={e=>{e.stopPropagation();setCur(c=>(c+1)%images.length);}} style={{ position:"absolute", right:12, top:"50%", transform:"translateY(-50%)", width:44, height:44, borderRadius:"50%", background:"rgba(255,255,255,0.12)", border:"1px solid rgba(255,255,255,0.2)", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", zIndex:10 }}>
        <svg viewBox="0 0 24 24" width="20" height="20" stroke="white" strokeWidth="2.5" fill="none"><polyline points="9 18 15 12 9 6"/></svg>
      </button>
    </div>
  );
}

// ── Auto-Slider document grid ─────────────────────────────────────────────────
function DocSlider({ docs, accent }) {
  const [activeSlide, setActiveSlide] = useState(0);  // 0 = first 3 docs, 1 = last 3 docs
  const [lightbox, setLightbox]       = useState(null);
  const [hovIdx, setHovIdx]           = useState(null);
  const totalSlides = 2; // always 2 pages of 3

  // Auto-advance every 3s
  useEffect(() => {
    const t = setInterval(() => setActiveSlide(s => (s + 1) % totalSlides), 3000);
    return () => clearInterval(t);
  }, []);

  const visibleDocs = docs.slice(activeSlide * 3, activeSlide * 3 + 3);

  return (
    <>
      {lightbox !== null && <Lightbox images={docs} startIndex={lightbox} onClose={() => setLightbox(null)}/>}
      <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
        {/* 2×3 doc grid — shows 3 at a time, slides */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:5, minHeight:120 }}>
          {visibleDocs.map((img, i) => {
            const globalIdx = activeSlide * 3 + i;
            return (
              <div
                key={`${activeSlide}-${i}`}
                onClick={() => setLightbox(globalIdx)}
                onMouseEnter={() => setHovIdx(globalIdx)}
                onMouseLeave={() => setHovIdx(null)}
                style={{
                  borderRadius:8, overflow:"hidden",
                  cursor:"pointer", aspectRatio:"1",
                  border:`1.5px solid ${hovIdx===globalIdx ? accent : T.border}`,
                  boxShadow: hovIdx===globalIdx ? `0 4px 14px ${accent}44` : T.shadow,
                  transition:"all 0.18s ease",
                  transform: hovIdx===globalIdx ? "scale(1.04)" : "scale(1)",
                  animation: "slideIn 0.28s ease both",
                  position:"relative",
                  background:"#f0f0f0",
                }}
              >
                <img src={img} alt="" style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }}/>
                {/* Expand icon on hover */}
                {hovIdx===globalIdx && (
                  <div style={{ position:"absolute", inset:0, background:"rgba(0,0,0,0.32)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                    <svg viewBox="0 0 24 24" width="20" height="20" stroke="white" strokeWidth="2" fill="none"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></svg>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        {/* Dot + manual nav */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"2px 2px" }}>
          <div style={{ display:"flex", gap:5 }}>
            {Array.from({length:totalSlides}).map((_,i) => (
              <button key={i} onClick={() => setActiveSlide(i)}
                style={{ width:i===activeSlide?22:8, height:8, borderRadius:4, border:"none", cursor:"pointer", background:i===activeSlide?accent:T.borderDk, transition:"all 0.22s ease", padding:0 }}/>
            ))}
          </div>
          <div style={{ display:"flex", gap:4 }}>
            <button onClick={() => setActiveSlide(s=>(s-1+totalSlides)%totalSlides)}
              style={{ width:26, height:26, borderRadius:"50%", background:T.bg, border:`1px solid ${T.border}`, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", transition:"background 0.15s" }}
              onMouseEnter={e=>e.currentTarget.style.background=T.border}
              onMouseLeave={e=>e.currentTarget.style.background=T.bg}>
              <svg viewBox="0 0 24 24" width="13" height="13" stroke={T.textSub} strokeWidth="2.5" fill="none"><polyline points="15 18 9 12 15 6"/></svg>
            </button>
            <button onClick={() => setActiveSlide(s=>(s+1)%totalSlides)}
              style={{ width:26, height:26, borderRadius:"50%", background:T.bg, border:`1px solid ${T.border}`, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", transition:"background 0.15s" }}
              onMouseEnter={e=>e.currentTarget.style.background=T.border}
              onMouseLeave={e=>e.currentTarget.style.background=T.bg}>
              <svg viewBox="0 0 24 24" width="13" height="13" stroke={T.textSub} strokeWidth="2.5" fill="none"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

// ── Bank / Donate Section ─────────────────────────────────────────────────────
function DonateSection({ person, lang, mode }) {
  const [copied, setCopied] = useState(null);
  const [showUPI, setShowUPI] = useState(false);
  const { bank, accentColor, accentSoft, accentBorder } = person;

  const copy = (text, key) => {
    navigator.clipboard?.writeText(text).catch(()=>{});
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  const btnLabel = mode === "donor"
    ? (lang==="mr" ? "दान करा" : "Donate")
    : (lang==="mr" ? "मदत करा" : "Help Now");

  return (
    <div style={{
      background: accentSoft,
      border: `1.5px solid ${accentBorder}`,
      borderRadius: T.radius,
      padding:"14px",
      display:"flex", flexDirection:"column", gap:10,
    }}>
      {/* Header */}
      <div style={{ display:"flex", alignItems:"center", gap:7 }}>
        <div style={{ width:28, height:28, borderRadius:"50%", background:accentColor, display:"flex", alignItems:"center", justifyContent:"center" }}>
          <svg viewBox="0 0 24 24" width="14" height="14" fill="white"><path d="M19 5H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zm0 12H5V7h14v10z"/><path d="M5 11h14v2H5z"/></svg>
        </div>
        <div>
          <div style={{ fontWeight:800, fontSize:"0.82rem", color:accentColor, fontFamily:T.font }}>
            {btnLabel}
          </div>
          <div style={{ fontSize:"0.66rem", color:T.textMuted, fontFamily:T.font }}>
            {lang==="mr" ? bank.name_mr : bank.name_en}
          </div>
        </div>
      </div>

      {/* A/C number */}
      <div style={{ background:"white", borderRadius:8, padding:"9px 12px", border:`1px solid ${accentBorder}` }}>
        <div style={{ fontSize:"0.62rem", color:T.textMuted, fontFamily:T.font, marginBottom:2 }}>
          {lang==="mr" ? "बँक खाते क्र." : "Bank A/c No."}
        </div>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", gap:6 }}>
          <span style={{ fontFamily:"monospace", fontSize:"0.85rem", fontWeight:700, color:T.text, letterSpacing:"0.5px" }}>
            {bank.acNo}
          </span>
          <button onClick={() => copy(bank.acNo, "acNo")} style={{ flexShrink:0, width:26, height:26, borderRadius:6, background:copied==="acNo"?T.greenSoft:T.bg, border:`1px solid ${copied==="acNo"?"#86efac":T.border}`, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", transition:"all 0.15s" }}>
            {copied==="acNo"
              ? <svg viewBox="0 0 24 24" width="12" height="12" stroke={T.green} strokeWidth="3" fill="none"><polyline points="20 6 9 17 4 12"/></svg>
              : <svg viewBox="0 0 24 24" width="12" height="12" stroke={T.textMuted} strokeWidth="2" fill="none"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
            }
          </button>
        </div>
        <div style={{ fontSize:"0.62rem", color:T.textMuted, fontFamily:T.font, marginTop:3 }}>
          IFSC: <span style={{ fontFamily:"monospace", fontWeight:600, color:T.textSub }}>{bank.ifsc}</span>
        </div>
      </div>

      {/* UPI */}
      <button onClick={() => setShowUPI(o=>!o)}
        style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:6, padding:"8px", background:accentColor, color:"white", border:"none", borderRadius:8, cursor:"pointer", fontSize:"0.77rem", fontWeight:700, fontFamily:T.font, transition:"opacity 0.15s" }}
        onMouseEnter={e=>e.currentTarget.style.opacity="0.88"}
        onMouseLeave={e=>e.currentTarget.style.opacity="1"}
      >
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="white" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>
        {showUPI ? (lang==="mr"?"UPI बंद करा":"Hide UPI") : (lang==="mr"?"UPI / QR पेमेंट":"UPI / QR Pay")}
      </button>

      {showUPI && (
        <div style={{ background:"white", borderRadius:8, padding:"10px 12px", border:`1px solid ${accentBorder}`, animation:"slideIn 0.2s ease" }}>
          {/* QR placeholder */}
          <div style={{ width:80, height:80, margin:"0 auto 8px", background:`${accentColor}15`, borderRadius:8, border:`2px solid ${accentBorder}`, display:"flex", alignItems:"center", justifyContent:"center" }}>
            <svg viewBox="0 0 100 100" width="60" height="60">
              <rect x="10" y="10" width="30" height="30" rx="3" fill="none" stroke={accentColor} strokeWidth="5"/>
              <rect x="18" y="18" width="14" height="14" fill={accentColor} rx="1"/>
              <rect x="60" y="10" width="30" height="30" rx="3" fill="none" stroke={accentColor} strokeWidth="5"/>
              <rect x="68" y="18" width="14" height="14" fill={accentColor} rx="1"/>
              <rect x="10" y="60" width="30" height="30" rx="3" fill="none" stroke={accentColor} strokeWidth="5"/>
              <rect x="18" y="68" width="14" height="14" fill={accentColor} rx="1"/>
              <rect x="60" y="60" width="8" height="8" fill={accentColor}/>
              <rect x="72" y="60" width="8" height="8" fill={accentColor}/>
              <rect x="60" y="72" width="8" height="8" fill={accentColor}/>
              <rect x="72" y="72" width="8" height="8" fill={accentColor}/>
              <rect x="48" y="10" width="8" height="8" fill={accentColor}/>
              <rect x="10" y="48" width="8" height="8" fill={accentColor}/>
              <rect x="48" y="48" width="8" height="8" fill={accentColor}/>
            </svg>
          </div>
          <div style={{ textAlign:"center" }}>
            <div style={{ fontSize:"0.7rem", color:T.textMuted, fontFamily:T.font }}>UPI ID</div>
            <div style={{ fontFamily:"monospace", fontSize:"0.8rem", fontWeight:700, color:accentColor }}>{bank.upi}</div>
          </div>
          <button onClick={() => copy(bank.upi, "upi")}
            style={{ width:"100%", marginTop:8, padding:"6px", background:copied==="upi"?T.greenSoft:T.bg, border:`1px solid ${copied==="upi"?"#86efac":T.border}`, borderRadius:6, cursor:"pointer", fontSize:"0.72rem", fontWeight:600, color:copied==="upi"?T.green:T.textSub, fontFamily:T.font, transition:"all 0.15s" }}>
            {copied==="upi" ? (lang==="mr"?"कॉपी झाले ✓":"Copied ✓") : (lang==="mr"?"UPI कॉपी करा":"Copy UPI ID")}
          </button>
        </div>
      )}
    </div>
  );
}

// ── Person Card (Donor or Needy) ──────────────────────────────────────────────
function PersonCard({ person, index, lang, mode }) {
  const ref = useRef(null);
  const [vis, setVis]     = useState(false);
  const [hov, setHov]     = useState(false);
  const [imgErr, setImgErr] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold:0.06 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const { accentColor, accentSoft, accentBorder } = person;

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: T.card,
        border: `1.5px solid ${hov ? accentBorder : T.border}`,
        borderTop: `4px solid ${accentColor}`,
        borderRadius: T.radius,
        padding: "18px",
        boxShadow: hov ? T.shadowHov : T.shadow,
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(18px)",
        transition: `opacity 0.35s ease ${index*0.08}s, transform 0.35s ease ${index*0.08}s, box-shadow 0.2s, border-color 0.2s`,
        display: "flex", flexDirection: "column", gap: 14,
      }}
    >
      {/* ── Row 1: Avatar circle + name ── */}
      <div style={{ display:"flex", alignItems:"center", gap:14 }}>
        {/* Avatar circle */}
        <div style={{
          width:72, height:72, borderRadius:"50%", flexShrink:0,
          border:`3px solid ${accentColor}`,
          boxShadow:`0 0 0 3px ${accentSoft}, 0 4px 14px ${accentColor}44`,
          overflow:"hidden", background:accentSoft,
          display:"flex", alignItems:"center", justifyContent:"center",
          transition:"transform 0.2s ease, box-shadow 0.2s ease",
          transform: hov ? "scale(1.05)" : "scale(1)",
        }}>
          {!imgErr ? (
            <img src={person.avatar} alt={person.name_en} onError={()=>setImgErr(true)}
              style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }}/>
          ) : (
            <span style={{ fontFamily:T.font, fontWeight:900, fontSize:"1.3rem", color:accentColor }}>
              {person.avatarFallback}
            </span>
          )}
        </div>

        {/* Name + role */}
        <div style={{ flex:1, minWidth:0 }}>
          <h3 style={{ margin:"0 0 3px", fontFamily:T.font, fontWeight:800, fontSize:"0.95rem", color:T.text, lineHeight:1.25 }}>
            {lang==="mr" ? person.name_mr : person.name_en}
          </h3>
          <div style={{ fontSize:"0.74rem", color:T.textSub, fontFamily:T.font, marginBottom:4 }}>
            {lang==="mr" ? person.role_mr : person.role_en}
          </div>
          <span style={{ display:"inline-flex", alignItems:"center", gap:4, fontSize:"0.63rem", fontWeight:700, color:accentColor, background:accentSoft, border:`1px solid ${accentBorder}`, borderRadius:20, padding:"2px 8px", fontFamily:T.font }}>
            {lang==="mr"
              ? (mode==="donor" ? person.since_mr : person.need_mr)
              : (mode==="donor" ? person.since_en : person.need_en)}
          </span>
        </div>
      </div>

      {/* ── Row 2: Document slider ── */}
      <div>
        <div style={{ fontSize:"0.68rem", fontWeight:700, color:T.textMuted, fontFamily:T.font, marginBottom:6, textTransform:"uppercase", letterSpacing:"0.5px" }}>
          {lang==="mr" ? "📄 दस्तावेज / कार्य फोटो" : "📄 Documents / Work Photos"}
        </div>
        <DocSlider docs={person.docs} accent={accentColor}/>
      </div>

      {/* ── Row 3: Stats ── */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
        {[
          {
            label: lang==="mr" ? (mode==="donor" ? "एकूण दान" : "मासिक गरज") : (mode==="donor" ? "Total Donated" : "Monthly Need"),
            value: lang==="mr" ? (mode==="donor" ? person.total_mr : person.needed_mr) : (mode==="donor" ? person.total_en : person.needed_en),
          },
          {
            label: lang==="mr" ? (mode==="donor" ? "मदत केली" : "कुटुंब") : (mode==="donor" ? "Helped" : "Family"),
            value: lang==="mr" ? (mode==="donor" ? person.helped_mr : person.helped_mr) : (mode==="donor" ? person.helped_en : person.helped_en),
          },
        ].map((s,i) => (
          <div key={i} style={{ background:accentSoft, border:`1px solid ${accentBorder}`, borderRadius:8, padding:"8px 10px", textAlign:"center" }}>
            <div style={{ fontWeight:800, fontSize:"0.88rem", color:accentColor, fontFamily:"monospace" }}>{s.value}</div>
            <div style={{ fontSize:"0.63rem", color:T.textMuted, fontFamily:T.font, marginTop:2 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* ── Row 4: Bank / Donate ── */}
      <DonateSection person={person} lang={lang} mode={mode}/>
    </div>
  );
}

// ── Section with mobile collapse ──────────────────────────────────────────────
function CollapsibleSection({ id, title, icon, accentColor, children, isMobile, defaultOpen=true }) {
  const [open, setOpen] = useState(defaultOpen || !isMobile);

  return (
    <section id={id}>
      {/* Section header */}
      <button
        onClick={() => isMobile && setOpen(o=>!o)}
        style={{
          width:"100%",
          display:"flex", alignItems:"center", justifyContent:"space-between",
          background:"white",
          borderRadius: open ? "12px 12px 0 0" : T.radius,
          border:`1px solid ${T.border}`,
          borderBottom: open ? "none" : `1px solid ${T.border}`,
          padding:"14px 20px",
          cursor: isMobile ? "pointer" : "default",
          userSelect:"none",
          boxShadow: T.shadow,
          marginBottom: open ? 0 : 4,
        }}
      >
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <div style={{ width:36, height:36, borderRadius:8, background:accentColor, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1.1rem" }}>
            {icon}
          </div>
          <span style={{ fontFamily:T.font, fontWeight:900, fontSize:"clamp(0.95rem,3vw,1.2rem)", color:T.text }}>
            {title}
          </span>
        </div>
        {isMobile && (
          <svg viewBox="0 0 24 24" width="18" height="18" stroke={T.textMuted} strokeWidth="2.5" fill="none"
            style={{ transform:open?"rotate(180deg)":"rotate(0deg)", transition:"transform 0.26s ease", flexShrink:0 }}>
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        )}
      </button>

      {/* Collapsible grid */}
      <div style={{
        maxHeight: isMobile && !open ? 0 : "4000px",
        overflow:"hidden",
        transition:"max-height 0.42s cubic-bezier(0.4,0,0.2,1)",
        background:"white",
        borderRadius: "0 0 12px 12px",
        border: open ? `1px solid ${T.border}` : "none",
        borderTop:"none",
        padding: open ? "16px" : "0 16px",
      }}>
        {children}
      </div>
    </section>
  );
}

// ── Section heading ───────────────────────────────────────────────────────────
function SectionHead({ mr, en, lang, accent }) {
  return (
    <div style={{ textAlign:"center", marginBottom:22 }}>
      <div style={{ display:"inline-flex", alignItems:"center", gap:10 }}>
        <div style={{ width:32, height:3, background:accent, borderRadius:2 }}/>
        <h2 style={{ margin:0, fontFamily:T.font, fontSize:"clamp(1.1rem,3.5vw,1.5rem)", fontWeight:900, color:T.text }}>
          {lang==="mr" ? mr : en}
        </h2>
        <div style={{ width:32, height:3, background:accent, borderRadius:2 }}/>
      </div>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function DonatePoor() {
  const { lang, setLang } = useLang();
  const [langOpen, setLangOpen]   = useState(false);
  const [isMobile, setIsMobile]   = useState(false);
  const [headerVis, setHeaderVis] = useState(false);
  const [selectedAmt, setSelectedAmt] = useState(501);
  const [customAmt,   setCustomAmt]   = useState("");

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 720);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  useEffect(() => { const t = setTimeout(() => setHeaderVis(true), 60); return () => clearTimeout(t); }, []);

  const finalAmt = customAmt || selectedAmt;

  return (
    <div style={{ minHeight:"100vh", background:T.bg, fontFamily:T.font, color:T.text }}>
      <Navbar/>

      {/* ── Hero ── */}
      <div style={{
        background:"linear-gradient(135deg,#0f1c3a 0%,#1a2d55 55%,#16a34a 100%)",
        borderBottom:"3px solid #d97706",
        padding: isMobile ? "22px 14px 20px" : "32px 24px 26px",
        opacity: headerVis ? 1 : 0,
        transform: headerVis ? "none" : "translateY(-10px)",
        transition:"opacity 0.45s ease, transform 0.45s ease",
      }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <div style={{ display:"flex", gap:0, marginBottom:12 }}>
            {["#ff9933","#ffffff","#138808"].map((c,i)=>
              <div key={i} style={{ flex:1, height:4, background:c }}/>
            )}
          </div>
          <div style={{ display:"grid", gridTemplateColumns: isMobile?"1fr":"1fr 1fr", gap:24, alignItems:"center" }}>
            <div>
              <span style={{ display:"inline-block", background:"rgba(217,119,6,0.2)", border:"1px solid rgba(217,119,6,0.4)", color:"#fbbf24", fontSize:"0.67rem", fontWeight:800, padding:"3px 12px", borderRadius:20, letterSpacing:"1px", marginBottom:12, fontFamily:T.font }}>
                {lang==="mr" ? "खुशहाल मुशायरा ट्रस्ट" : "KHUSHAL MUSHAIRA TRUST"}
              </span>
              <h1 style={{ margin:"0 0 10px", color:"white", fontWeight:900, fontSize:"clamp(1.4rem,4.5vw,2.2rem)", lineHeight:1.15, fontFamily:T.font }}>
                {lang==="mr" ? "एक हात मदतीचा," : "Lend a Helping Hand,"}
                <br/>
                <span style={{ background:"linear-gradient(90deg,#fbbf24,#f472b6)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
                  {lang==="mr" ? "उमेदीचा सूर्योदय." : "Kindle a New Hope."}
                </span>
              </h1>
              <p style={{ margin:"0 0 18px", color:"rgba(255,255,255,0.65)", fontSize:"0.84rem", lineHeight:1.65, fontFamily:T.font, maxWidth:420 }}>
                {lang==="mr"
                  ? "तुमची छोटी मदत एका गरजू कुटुंबाच्या जीवनात मोठा बदल घडवू शकते — अन्न, शिक्षण, निवारा आणि आरोग्य सेवांच्या रूपात."
                  : "Your small contribution can create a big change in a needy family's life — through food, education, shelter, and healthcare."}
              </p>
              <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                <a href="#donors" style={{ display:"inline-flex", alignItems:"center", gap:6, background:"linear-gradient(135deg,#d97706,#f59e0b)", color:"white", fontFamily:T.font, fontWeight:800, fontSize:"0.82rem", padding:"10px 20px", borderRadius:24, textDecoration:"none", boxShadow:"0 3px 14px rgba(217,119,6,0.45)", transition:"transform 0.15s" }}
                  onMouseEnter={e=>e.currentTarget.style.transform="scale(1.03)"}
                  onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}>
                  💛 {lang==="mr" ? "दाते पहा" : "View Donors"}
                </a>
                <a href="#needy" style={{ display:"inline-flex", alignItems:"center", gap:6, background:"rgba(255,255,255,0.1)", color:"white", border:"1px solid rgba(255,255,255,0.25)", fontFamily:T.font, fontWeight:700, fontSize:"0.82rem", padding:"10px 20px", borderRadius:24, textDecoration:"none", transition:"background 0.15s" }}
                  onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,0.18)"}
                  onMouseLeave={e=>e.currentTarget.style.background="rgba(255,255,255,0.1)"}>
                  🤝 {lang==="mr" ? "गरजू पहा" : "View Needy"}
                </a>
              </div>
            </div>

            {/* Quick donate widget */}
            <div style={{ background:"rgba(255,255,255,0.06)", borderRadius:14, border:"1px solid rgba(255,255,255,0.12)", padding:"20px", backdropFilter:"blur(8px)" }}>
              <div style={{ fontFamily:T.font, fontWeight:800, color:"white", fontSize:"0.92rem", marginBottom:12 }}>
                {lang==="mr" ? "⚡ त्वरित दान करा" : "⚡ Quick Donate"}
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:7, marginBottom:10 }}>
                {[251,501,1101,2501].map(amt => (
                  <button key={amt} onClick={() => { setSelectedAmt(amt); setCustomAmt(""); }}
                    style={{ padding:"8px 4px", borderRadius:8, border:"none", cursor:"pointer", fontFamily:T.font, fontSize:"0.75rem", fontWeight:700, transition:"all 0.15s",
                      background: selectedAmt===amt && !customAmt ? "linear-gradient(135deg,#d97706,#f59e0b)" : "rgba(255,255,255,0.1)",
                      color: selectedAmt===amt && !customAmt ? "white" : "rgba(255,255,255,0.75)",
                      boxShadow: selectedAmt===amt && !customAmt ? "0 3px 10px rgba(217,119,6,0.4)" : "none",
                    }}>
                    ₹{amt.toLocaleString("en-IN")}
                  </button>
                ))}
              </div>
              <div style={{ position:"relative", marginBottom:10 }}>
                <span style={{ position:"absolute", left:11, top:"50%", transform:"translateY(-50%)", color:"rgba(255,255,255,0.5)", fontSize:"0.85rem" }}>₹</span>
                <input type="number" min="1" placeholder={lang==="mr"?"रक्कम लिहा":"Custom amount"} value={customAmt} onChange={e=>setCustomAmt(e.target.value)}
                  style={{ width:"100%", padding:"9px 11px 9px 26px", background:"rgba(255,255,255,0.08)", border:"1px solid rgba(255,255,255,0.18)", borderRadius:8, color:"white", fontFamily:T.font, fontSize:"0.84rem", outline:"none", boxSizing:"border-box" }}/>
              </div>
              <button style={{ width:"100%", padding:"11px", background:"linear-gradient(135deg,#d97706,#f59e0b)", border:"none", borderRadius:24, color:"white", fontFamily:T.font, fontWeight:800, fontSize:"0.88rem", cursor:"pointer", boxShadow:"0 3px 14px rgba(217,119,6,0.45)", transition:"transform 0.15s" }}
                onMouseEnter={e=>e.currentTarget.style.transform="scale(1.02)"}
                onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}>
                ₹{Number(finalAmt||0).toLocaleString("en-IN")} {lang==="mr" ? "दान करा →" : "Donate →"}
              </button>
              <p style={{ margin:"8px 0 0", textAlign:"center", fontSize:"0.63rem", color:"rgba(255,255,255,0.4)", fontFamily:T.font }}>
                🔒 {lang==="mr" ? "८०जी करमुक्त · सुरक्षित पेमेंट" : "80G Tax Exempt · Secure Payment"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main body ── */}
      <div style={{ maxWidth:1100, margin:"0 auto", padding: isMobile?"14px 12px 80px":"26px 24px 80px", display:"flex", flexDirection:"column", gap:28 }}>

        {/* ════ DONORS SECTION ════ */}
        <div id="donors">
          <SectionHead
            mr="आमचे दाते — उदार हृदयाचे माणसे"
            en="Our Generous Donors"
            lang={lang}
            accent="#d97706"
          />
          <CollapsibleSection
            id="donors-grid"
            title={lang==="mr" ? "दाते" : "Donors"}
            icon="💛"
            accentColor="#fef3c7"
            isMobile={isMobile}
            defaultOpen
          >
            <div style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3,1fr)", gap:16 }}>
              {DONORS.map((d,i) => (
                <PersonCard key={d.id} person={d} index={i} lang={lang} mode="donor"/>
              ))}
            </div>
          </CollapsibleSection>
        </div>

        {/* Divider */}
        <div style={{ height:1, background:`linear-gradient(90deg,transparent,${T.borderDk},transparent)` }}/>

        {/* ════ NEEDY SECTION ════ */}
        <div id="needy">
          <SectionHead
            mr="गरजू व्यक्ती — तुमच्या मदतीची वाट पाहत आहेत"
            en="Needy Individuals — Awaiting Your Help"
            lang={lang}
            accent="#dc2626"
          />
          <CollapsibleSection
            id="needy-grid"
            title={lang==="mr" ? "गरजू लोक" : "Needy People"}
            icon="🤝"
            accentColor="#fee2e2"
            isMobile={isMobile}
            defaultOpen
          >
            <div style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3,1fr)", gap:16 }}>
              {NEEDY.map((n,i) => (
                <PersonCard key={n.id} person={n} index={i} lang={lang} mode="needy"/>
              ))}
            </div>
          </CollapsibleSection>
        </div>
      </div>

      <Footer/>

      {/* ── Language FAB ── */}
      <div className="legacy-language-switcher" style={{ position:"fixed", bottom:24, right:24, zIndex:300 }}>
        {langOpen && (
          <div style={{ position:"absolute", bottom:60, right:0, background:"white", borderRadius:T.radius, boxShadow:T.shadowHov, overflow:"hidden", minWidth:148, animation:"slideUp 0.17s ease both", border:`1px solid ${T.border}` }}>
            {[{code:"mr",label:"🇮🇳  मराठी"},{code:"en",label:"🇬🇧  English"}].map(o=>(
              <button key={o.code} onClick={()=>{setLang(o.code);setLangOpen(false);}}
                style={{ display:"flex", alignItems:"center", width:"100%", padding:"10px 16px", border:"none", cursor:"pointer", fontSize:"0.83rem", fontWeight:lang===o.code?700:500, background:lang===o.code?"#fef9e7":"white", color:lang===o.code?T.amber:T.textSub, borderLeft:lang===o.code?`3px solid ${T.amber}`:"3px solid transparent", fontFamily:T.font }}>
                {o.label}
              </button>
            ))}
          </div>
        )}
        <button onClick={()=>setLangOpen(o=>!o)}
          style={{
            width:50, height:50, borderRadius:"50%",
            background:"linear-gradient(135deg,#d97706,#f59e0b)",
            border:"2px solid #fcd34d", cursor:"pointer",
            display:"flex", alignItems:"center", justifyContent:"center",
            boxShadow:"0 4px 18px rgba(217,119,6,0.45)",
            transition:"transform 0.2s ease",
          }}
          onMouseEnter={e=>e.currentTarget.style.transform="scale(1.1)"}
          onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}
        >
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="white" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
        </button>
      </div>

      <style>{`
        @keyframes fadeIn  { from{opacity:0} to{opacity:1} }
        @keyframes zoomIn  { from{opacity:0;transform:scale(0.92)} to{opacity:1;transform:scale(1)} }
        @keyframes slideIn { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        @keyframes slideUp { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        * { box-sizing:border-box; }
        ::-webkit-scrollbar{width:5px;height:5px}
        ::-webkit-scrollbar-track{background:#f4f6fb}
        ::-webkit-scrollbar-thumb{background:#c8cfdf;border-radius:5px}
        input[type=number]::-webkit-inner-spin-button,
        input[type=number]::-webkit-outer-spin-button { -webkit-appearance:none; margin:0; }
      `}</style>
    </div>
  );
}