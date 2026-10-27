import React, { useState, useEffect, useRef } from "react";
import Navbar from "./navbar";
import Footer from "./footer";
import { useLang } from "./useLang";

// ─── Design Tokens (Swiggy/Zomato inspired + Maharashtra) ────────────────────
const T = {
  bg:          "#f9fafb",
  card:        "#ffffff",
  border:      "#e5e7eb",
  navy:        "#0d2236",
  green:       "#1a7a3c",
  greenDark:   "#145a2c",
  greenLight:  "#e8f5ee",
  saffron:     "#e87722",
  saffronLight:"#fff3e0",
  amber:       "#d97706",
  red:         "#dc2626",
  orange:      "#ea580c",
  blue:        "#1d4ed8",
  purple:      "#7c3aed",
  teal:        "#0891b2",
  gold:        "#f59e0b",
  font:        "'Noto Sans Devanagari','Inter','Segoe UI',system-ui,sans-serif",
  shadow:      "0 2px 12px rgba(13,34,54,0.08)",
  shadowMd:    "0 4px 20px rgba(13,34,54,0.12)",
  shadowLg:    "0 8px 40px rgba(13,34,54,0.16)",
  radius:      "12px",
  radiusSm:    "8px",
  radiusLg:    "18px",
  radiusXl:    "24px",
};

// ─── Global Styles ────────────────────────────────────────────────────────────
const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700;800;900&display=swap');

*,*::before,*::after{box-sizing:border-box;}
body{font-family:${T.font};background:${T.bg};margin:0;}

@keyframes fadeUp{from{opacity:0;transform:translateY(22px);}to{opacity:1;transform:translateY(0);}}
@keyframes fadeIn{from{opacity:0;}to{opacity:1;}}
@keyframes slideRight{from{opacity:0;transform:translateX(-18px);}to{opacity:1;transform:translateX(0);}}
@keyframes scaleIn{from{opacity:0;transform:scale(.9);}to{opacity:1;transform:scale(1);}}
@keyframes float{0%,100%{transform:translateY(0);}50%{transform:translateY(-8px);}}
@keyframes pulse{0%,100%{box-shadow:0 0 0 0 rgba(26,122,60,.4);}50%{box-shadow:0 0 0 14px rgba(26,122,60,0);}}
@keyframes pulseSaffron{0%,100%{box-shadow:0 0 0 0 rgba(232,119,34,.4);}50%{box-shadow:0 0 0 14px rgba(232,119,34,0);}}
@keyframes countUp{from{opacity:0;transform:translateY(10px);}to{opacity:1;transform:translateY(0);}}
@keyframes shimmer{0%{background-position:-600px 0;}100%{background-position:600px 0;}}
@keyframes globeBounce{0%,100%{transform:translateY(0) scale(1);}50%{transform:translateY(-5px) scale(1.07);}}
@keyframes dash{to{stroke-dashoffset:0;}}
@keyframes marqueeLeft{from{transform:translateX(0);}to{transform:translateX(-50%);}}

.btn-primary{
  background:linear-gradient(135deg,${T.green} 0%,${T.greenDark} 100%);
  color:#fff;border:none;border-radius:${T.radius};
  padding:13px 26px;font-family:${T.font};font-weight:700;font-size:.9rem;
  cursor:pointer;display:inline-flex;align-items:center;gap:8px;
  transition:all .22s ease;box-shadow:0 4px 16px rgba(26,122,60,.3);
  text-decoration:none;
}
.btn-primary:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgba(26,122,60,.4);}

.btn-outline{
  background:transparent;color:${T.navy};
  border:2px solid ${T.border};border-radius:${T.radius};
  padding:11px 22px;font-family:${T.font};font-weight:600;font-size:.88rem;
  cursor:pointer;display:inline-flex;align-items:center;gap:7px;
  transition:all .2s ease;text-decoration:none;
}
.btn-outline:hover{border-color:${T.green};color:${T.green};background:${T.greenLight};}

.btn-saffron{
  background:linear-gradient(135deg,${T.saffron} 0%,${T.amber} 100%);
  color:#fff;border:none;border-radius:${T.radius};
  padding:13px 26px;font-family:${T.font};font-weight:700;font-size:.9rem;
  cursor:pointer;display:inline-flex;align-items:center;gap:8px;
  transition:all .22s ease;box-shadow:0 4px 16px rgba(232,119,34,.3);
  text-decoration:none;
}
.btn-saffron:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgba(232,119,34,.45);}

.card-hover{transition:transform .22s ease,box-shadow .22s ease;cursor:pointer;}
.card-hover:hover{transform:translateY(-4px);box-shadow:${T.shadowLg};}

.quick-card{transition:all .2s ease;cursor:pointer;}
.quick-card:hover{transform:translateY(-3px) scale(1.01);box-shadow:${T.shadowMd};}

.feature-icon{
  transition:transform .25s cubic-bezier(.34,1.56,.64,1);
}
.quick-card:hover .feature-icon{transform:scale(1.18) rotate(-5deg);}

.arrow-btn{
  width:32px;height:32px;border-radius:50%;
  background:${T.green};border:none;color:#fff;
  display:flex;align-items:center;justify-content:center;
  cursor:pointer;font-size:14px;
  transition:all .2s ease;flex-shrink:0;
}
.arrow-btn:hover{background:${T.greenDark};transform:scale(1.12);}

.step-card{transition:transform .2s ease,box-shadow .2s ease;}
.step-card:hover{transform:translateY(-3px);box-shadow:${T.shadowMd};}

.stat-chip{
  transition:transform .2s ease;
}
.stat-chip:hover{transform:translateY(-3px);}

.tag-chip{
  display:inline-flex;align-items:center;gap:5px;
  padding:5px 12px;border-radius:20px;font-weight:600;font-size:.75rem;
  border:1.5px solid;
}

.globe-fab{
  animation:globeBounce 3s ease-in-out infinite;
  transition:box-shadow .15s ease;
}
.globe-fab:hover{
  animation:none;transform:scale(1.12);
  box-shadow:0 6px 24px rgba(232,119,34,.5)!important;
}

.check-item{display:flex;align-items:flex-start;gap:8px;margin-bottom:7px;font-size:.85rem;color:#374151;}
.check-icon{width:18px;height:18px;border-radius:50%;background:${T.green};color:#fff;display:flex;align-items:center;justify-content:center;font-size:10px;flex-shrink:0;margin-top:1px;}

/* Ticker tape */
.ticker-track{display:flex;gap:40px;white-space:nowrap;animation:marqueeLeft 18s linear infinite;}
.ticker-track:hover{animation-play-state:paused;}

@media(max-width:720px){
  .desktop-only{display:none!important;}
  .hero-grid{grid-template-columns:1fr!important;}
  .quick-grid{grid-template-columns:repeat(2,1fr)!important;}
  .three-col{grid-template-columns:1fr!important;}
  .kirana-grid{grid-template-columns:1fr!important;}
  .steps-row{flex-direction:column!important;align-items:stretch!important;}
  .stats-grid{grid-template-columns:repeat(2,1fr)!important;}
  .footer-cta-grid{grid-template-columns:1fr!important;}
  .values-row{flex-wrap:wrap!important;gap:12px!important;}
}
@media(min-width:721px){.mobile-only{display:none!important;}}
`;

// ─── Helpers ──────────────────────────────────────────────────────────────────
function FadeIn({ children, delay = 0, dir = "up", style = {} }) {
  const ref  = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const ob = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); ob.disconnect(); }}, { threshold: 0.1 });
    if (ref.current) ob.observe(ref.current);
    return () => ob.disconnect();
  }, []);
  const anim = dir === "right" ? "slideRight" : dir === "scale" ? "scaleIn" : "fadeUp";
  return (
    <div ref={ref} style={{ animation: v ? `${anim} .55s cubic-bezier(.34,1.56,.64,1) ${delay}s both` : "none", opacity: v ? 1 : 0, ...style }}>
      {children}
    </div>
  );
}

// ─── Ticker Tape ──────────────────────────────────────────────────────────────
function Ticker({ lang }) {
  const items = [
    { mr: "🚀 तेज डिलीवरी",        en: "🚀 Fast Delivery" },
    { mr: "✅ विश्वसनीय सेवा",      en: "✅ Trusted Service" },
    { mr: "💰 कमी खर्चात",         en: "💰 Low Cost" },
    { mr: "📦 500+ जुड़ी दुकानें",  en: "📦 500+ Partner Shops" },
    { mr: "🛵 लोकल डिलीवरी",       en: "🛵 Local Delivery" },
    { mr: "🏆 10,000+ डिलीवरी/माह", en: "🏆 10K+ Monthly Deliveries" },
    { mr: "🌿 FMCG उत्पाद",        en: "🌿 FMCG Products" },
    { mr: "👩 महिला उद्यमी प्रशिक्षण", en: "👩 Women Entrepreneur Training" },
  ];
  const doubled = [...items, ...items];
  return (
    <div style={{ background: T.green, padding: "8px 0", overflow: "hidden", borderBottom: `3px solid ${T.saffron}` }}>
      <div className="ticker-track">
        {doubled.map((item, i) => (
          <span key={i} style={{ color: "#fff", fontWeight: 600, fontSize: ".82rem", flexShrink: 0 }}>
            {lang === "mr" ? item.mr : item.en}
            <span style={{ color: "rgba(255,255,255,.4)", marginLeft: 20 }}>|</span>
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Tricolor stripe ──────────────────────────────────────────────────────────
const Tricolor = ({ height = 4 }) => (
  <div style={{ display: "flex", height }}>
    {["#e87722","#ffffff","#1a7a3c"].map((c,i) => <div key={i} style={{ flex:1, background:c }}/>)}
  </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────
export default function DeliveryHome() {
  const { lang, setLang } = useLang();
  const [langOpen, setLangOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(null);

  // mobile section toggle
  const toggleSection = (id) => setActiveSection(prev => prev === id ? null : id);
  const isMobile = () => window.innerWidth < 720;

  return (
    <>
      <style>{STYLES}</style>
      <Navbar />
      <Tricolor height={5} />
      <Ticker lang={lang} />

      {/* ══════════════════════════════════════════════════════════════════════
          HERO SECTION
      ══════════════════════════════════════════════════════════════════════ */}
      <section style={{
        background: `linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 40%, #fef9ee 100%)`,
        position: "relative",
        overflow: "hidden",
        paddingTop: 0,
      }}>
        {/* decorative blobs */}
        <div style={{ position:"absolute", top:-80, right:-80, width:360, height:360, background:"rgba(26,122,60,.06)", borderRadius:"50%", pointerEvents:"none" }}/>
        <div style={{ position:"absolute", bottom:-60, left:-60, width:260, height:260, background:"rgba(232,119,34,.06)", borderRadius:"50%", pointerEvents:"none" }}/>

        <div style={{
          maxWidth:1180, margin:"0 auto",
          paddingLeft:"max(20px,env(safe-area-inset-left,0px))",
          paddingRight:"max(20px,env(safe-area-inset-right,0px))",
          paddingBlock:"44px 0",
          position:"relative", zIndex:1,
        }}>
          <div className="hero-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:32, alignItems:"center" }}>
            {/* LEFT */}
            <div>
              {/* badge */}
              <FadeIn delay={0}>
                <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:`${T.green}18`, border:`1.5px solid ${T.green}33`, borderRadius:"20px", padding:"6px 14px", marginBottom:14 }}>
                  <span style={{ fontSize:16 }}>🛵</span>
                  <span style={{ fontWeight:700, color:T.green, fontSize:".78rem", letterSpacing:".04em" }}>
                    {lang==="mr" ? "कराड तालुका — तेज डिलीवरी सेवा" : "Karad Taluka — Fast Delivery Service"}
                  </span>
                </div>
              </FadeIn>

              {/* headline */}
              <FadeIn delay={0.08}>
                <h1 style={{ margin:"0 0 6px", lineHeight:1.1, fontWeight:900 }}>
                  <span style={{ display:"block", fontSize:"clamp(2rem,5vw,3rem)", color:T.saffron }}>
                    {lang==="mr" ? "आपकी दुकान" : "Your Shop"}
                  </span>
                  <span style={{ display:"block", fontSize:"clamp(2rem,5vw,3rem)", color:T.green, marginTop:2 }}>
                    {lang==="mr" ? "हमारी डिलीवरी सेवा" : "Our Delivery Service"}
                  </span>
                </h1>
              </FadeIn>

              <FadeIn delay={0.14}>
                <p style={{ color:"#4b5563", fontSize:"clamp(.88rem,1.8vw,1rem)", lineHeight:1.7, margin:"12px 0 24px", maxWidth:420 }}>
                  {lang==="mr"
                    ? "कराड और आस्पास के क्षेत्र में तेज, सुरक्षित और भरोसेमंद डिलीवरी – अब और आसान।"
                    : "Fast, safe and reliable delivery in Karad and surrounding areas — now even easier."}
                </p>
              </FadeIn>

              {/* feature pills */}
              <FadeIn delay={0.18}>
                <div style={{ display:"flex", flexWrap:"wrap", gap:10, marginBottom:28 }}>
                  {[
                    { icon:"🛵", label_mr:"लोकल डिलीवरी", label_en:"Local Delivery",   color:T.green },
                    { icon:"⚡", label_mr:"तेज डिलीवरी",   label_en:"Fast Delivery",    color:T.saffron },
                    { icon:"🛡️",label_mr:"सुरक्षित हैंडलिंग",label_en:"Safe Handling",  color:T.blue },
                    { icon:"💰", label_mr:"कम खर्च में",   label_en:"Low Cost",         color:T.amber },
                  ].map((f,i)=>(
                    <div key={i} style={{
                      display:"flex", alignItems:"center", gap:6,
                      background:"#fff", border:`1.5px solid ${f.color}33`,
                      borderRadius:"20px", padding:"7px 14px",
                      boxShadow:`0 2px 8px ${f.color}18`,
                    }}>
                      <div style={{ width:30, height:30, borderRadius:"50%", background:`${f.color}15`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:15 }} className="feature-icon">{f.icon}</div>
                      <span style={{ fontWeight:600, color:T.navy, fontSize:".8rem" }}>{lang==="mr"?f.label_mr:f.label_en}</span>
                    </div>
                  ))}
                </div>
              </FadeIn>

              {/* CTA buttons */}
              <FadeIn delay={0.22}>
                <div style={{ display:"flex", flexWrap:"wrap", gap:12 }}>
                  <button className="btn-primary" style={{ animation:"pulse 2.8s ease-in-out infinite" }}>
                    <span>🏪</span>
                    {lang==="mr" ? "दुकानदार के रूप में जुड़ें →" : "Join as Shopkeeper →"}
                  </button>
                  <button className="btn-outline">
                    <span>ℹ️</span>
                    {lang==="mr" ? "अधिक जानकारी →" : "Learn More →"}
                  </button>
                </div>
              </FadeIn>
            </div>

            {/* RIGHT — images */}
            <FadeIn delay={0.1} dir="scale" style={{ position:"relative" }}>
              <div style={{ position:"relative", paddingBottom:20 }}>
                {/* main delivery photo */}
                <div style={{
                  borderRadius:T.radiusXl,
                  overflow:"hidden",
                  boxShadow:T.shadowLg,
                  position:"relative",
                  aspectRatio:"4/3",
                }}>
                  <img
                    src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&q=80"
                    alt="Delivery"
                    style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }}
                  />
                  <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top, rgba(13,34,54,.3) 0%, transparent 60%)" }}/>
                  {/* brand badge on image */}
                  <div style={{
                    position:"absolute", bottom:16, left:16,
                    background:"rgba(255,255,255,.92)", backdropFilter:"blur(8px)",
                    borderRadius:T.radius, padding:"8px 14px",
                    display:"flex", alignItems:"center", gap:8,
                    boxShadow:T.shadowMd,
                  }}>
                    <span style={{ fontSize:20 }}>🏍️</span>
                    <div>
                      <div style={{ fontWeight:700, color:T.green, fontSize:".8rem" }}>{lang==="mr"?"खुशहाल मुआशरा":"Khushhaal Mushaira"}</div>
                      <div style={{ fontSize:".68rem", color:"#64748b" }}>{lang==="mr"?"Delivery Partner":"Delivery Partner"}</div>
                    </div>
                  </div>
                </div>

                {/* FMCG floating card */}
                <div style={{
                  position:"absolute", top:16, right:-16,
                  background:"#fff", borderRadius:T.radiusLg,
                  padding:"12px 16px", boxShadow:T.shadowLg,
                  border:`1px solid ${T.border}`,
                  minWidth:160, animation:"float 3s ease-in-out infinite",
                  zIndex:2,
                }}>
                  <div style={{ fontWeight:700, color:T.navy, fontSize:".82rem", marginBottom:4 }}>
                    {lang==="mr"?"हमारे FMCG उत्पाद":"Our FMCG Products"}
                  </div>
                  <div style={{ fontSize:".72rem", color:"#64748b", marginBottom:8 }}>
                    {lang==="mr"?"रोज़मर्रां की जरूरतें":"Daily essentials"}
                  </div>
                  <div style={{ display:"flex", gap:6 }}>
                    {["🌾","🛢️","🧴","🧂"].map((e,i)=>(
                      <div key={i} style={{ width:28, height:28, borderRadius:"50%", background:`${T.green}18`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:14 }}>{e}</div>
                    ))}
                  </div>
                </div>

                {/* products image */}
                <div style={{
                  position:"absolute", bottom:-10, right:0,
                  width:"45%", borderRadius:T.radius, overflow:"hidden",
                  boxShadow:T.shadowMd, border:`2px solid ${T.border}`,
                }}>
                  <img
                    src="https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=300&q=70"
                    alt="FMCG Products"
                    style={{ width:"100%", aspectRatio:"4/3", objectFit:"cover", display:"block" }}
                  />
                </div>

                {/* "view products" button overlay */}
                <div style={{
                  position:"absolute", bottom:6, right:0, width:"45%", display:"flex", justifyContent:"center",
                }}>
                  <button className="btn-primary" style={{ fontSize:".72rem", padding:"7px 12px", borderRadius:T.radiusSm, gap:4, whiteSpace:"nowrap" }}>
                    {lang==="mr"?"हमारे उत्पाद देखें →":"View Products →"}
                  </button>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          4 QUICK CARDS
      ══════════════════════════════════════════════════════════════════════ */}
      <section style={{
        background:"#fff",
        borderTop:`1px solid ${T.border}`,
        borderBottom:`1px solid ${T.border}`,
      }}>
        <div style={{
          maxWidth:1180, margin:"0 auto",
          paddingLeft:"max(16px,env(safe-area-inset-left,0px))",
          paddingRight:"max(16px,env(safe-area-inset-right,0px))",
          paddingBlock:"20px",
        }}>
          <div className="quick-grid" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14 }}>
            {[
              { icon:"🏪", color:T.orange,  bg:"#fff7ed", title_mr:"दुकानदारों के लिए डिलीवरी सेवा",   title_en:"Delivery for Shopkeepers",    desc_mr:"आपकी दुकान से ग्राहक तक हम पहुंचाएं।", desc_en:"We deliver from your shop to the customer." },
              { icon:"🛒", color:T.green,   bg:T.greenLight, title_mr:"FMCG उत्पाद खरीदें",         title_en:"Buy FMCG Products",          desc_mr:"घर और दुकानों के लिए गुणवत्तायुक्त उत्पाद।", desc_en:"Quality products for home & shops." },
              { icon:"👥", color:T.blue,    bg:"#eff6ff", title_mr:"डिलीवरी पार्टनर बनें",           title_en:"Become Delivery Partner",    desc_mr:"रोज़गार का अवसर अपने क्षेत्र में।", desc_en:"Employment opportunity in your area." },
              { icon:"👩", color:T.purple,  bg:"#f5f3ff", title_mr:"महिला उद्यमी प्रशिक्षण",         title_en:"Women Entrepreneur Training",desc_mr:"घर बैठे बिज़नेस सीखें और आत्मनिर्भर बनें।", desc_en:"Learn business from home, become self-reliant." },
            ].map((c,i)=>(
              <FadeIn key={i} delay={i*0.07}>
                <div className="quick-card" style={{ background:c.bg, borderRadius:T.radiusLg, padding:"18px 16px", border:`1.5px solid ${c.color}20`, boxShadow:T.shadow }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:10 }}>
                    <div className="feature-icon" style={{ width:44, height:44, borderRadius:"50%", background:`${c.color}20`, border:`2px solid ${c.color}30`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22 }}>{c.icon}</div>
                    <button className="arrow-btn"
                      style={{ background:c.color }}
                    >→</button>
                  </div>
                  <div style={{ fontWeight:700, color:T.navy, fontSize:".9rem", marginBottom:5, lineHeight:1.35 }}>
                    {lang==="mr"?c.title_mr:c.title_en}
                  </div>
                  <div style={{ fontSize:".78rem", color:"#6b7280", lineHeight:1.55 }}>
                    {lang==="mr"?c.desc_mr:c.desc_en}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          KIRANA PARTNER SECTION
      ══════════════════════════════════════════════════════════════════════ */}
      <section style={{ paddingBlock:"40px 0", background:T.bg }}>
        <div style={{
          maxWidth:1180, margin:"0 auto",
          paddingLeft:"max(16px,env(safe-area-inset-left,0px))",
          paddingRight:"max(16px,env(safe-area-inset-right,0px))",
        }}>
          <div className="kirana-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:28, alignItems:"center" }}>
            {/* LEFT */}
            <FadeIn delay={0} dir="right">
              <div style={{ background:"#fff", borderRadius:T.radiusXl, overflow:"hidden", boxShadow:T.shadowMd, border:`1px solid ${T.border}` }}>
                {/* header */}
                <div style={{ background:`linear-gradient(135deg,${T.green} 0%,${T.greenDark} 100%)`, padding:"18px 22px" }}>
                  <Tricolor height={3} />
                  <div style={{ marginTop:10, display:"flex", alignItems:"center", gap:10 }}>
                    <div style={{ width:42, height:42, borderRadius:"50%", background:"rgba(255,255,255,.2)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:22 }}>🏪</div>
                    <div>
                      <h2 style={{ margin:0, color:"#fff", fontSize:"1.15rem", fontWeight:800, lineHeight:1.25 }}>
                        {lang==="mr"?"दुकानदारों के लिए डिलीवरी पार्टनर सेवा":"Delivery Partner Service for Shopkeepers"}
                      </h2>
                    </div>
                  </div>
                </div>

                <div style={{ padding:"20px 22px" }}>
                  {/* kirana store image */}
                  <div style={{ borderRadius:T.radius, overflow:"hidden", marginBottom:16, position:"relative" }}>
                    <img
                      src="https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=500&q=70"
                      alt="Kirana Store"
                      style={{ width:"100%", height:160, objectFit:"cover", display:"block" }}
                    />
                    <div style={{ position:"absolute", top:10, left:10, background:"rgba(255,255,255,.92)", backdropFilter:"blur(6px)", borderRadius:T.radiusSm, padding:"4px 12px", fontWeight:700, color:T.orange, fontSize:".8rem" }}>
                      KIRANA STORE
                    </div>
                  </div>

                  {/* checklist */}
                  {[
                    { mr:"आपके उत्पाद की पिकअप और डिलीवरी",           en:"Pickup and delivery of your products" },
                    { mr:"किराने, दवा, सब्ज़ी, FMCG हर प्रकार की दुकान",en:"Grocery, medicine, vegetables, FMCG all shop types" },
                    { mr:"रियल टाइम ट्रैकिंग",                         en:"Real time tracking" },
                    { mr:"कम लागत और विश्वसनीय सेवा",                  en:"Low cost and reliable service" },
                    { mr:"नियमित डिलीवरी पार्टनर नेटवर्क",              en:"Regular delivery partner network" },
                  ].map((item,i)=>(
                    <div key={i} className="check-item">
                      <div className="check-icon">✓</div>
                      <span>{lang==="mr"?item.mr:item.en}</span>
                    </div>
                  ))}

                  <button className="btn-primary" style={{ marginTop:16, width:"100%", justifyContent:"center" }}>
                    {lang==="mr"?"अभी रजिस्टर करें →":"Register Now →"}
                  </button>
                </div>
              </div>
            </FadeIn>

            {/* RIGHT */}
            <FadeIn delay={0.1}>
              <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
                {/* sub-service chips */}
                <div style={{ display:"flex", flexWrap:"wrap", gap:10, marginBottom:4 }}>
                  {[
                    { icon:"🛵", label_mr:"लोकल डिलीवरी (कराड और आसपास)", label_en:"Local Delivery (Karad & nearby)", color:T.green },
                    { icon:"📦", label_mr:"एक ही दिन डिलीवरी",            label_en:"Same Day Delivery",              color:T.saffron },
                    { icon:"🏭", label_mr:"बल्क ऑर्डर डिलीवरी",           label_en:"Bulk Order Delivery",            color:T.orange },
                  ].map((chip,i)=>(
                    <div key={i} className="tag-chip" style={{ color:chip.color, borderColor:`${chip.color}33`, background:`${chip.color}0f` }}>
                      <span>{chip.icon}</span>
                      {lang==="mr"?chip.label_mr:chip.label_en}
                    </div>
                  ))}
                </div>

                {/* "How easy?" card */}
                <div style={{ background:"#fff", borderRadius:T.radiusLg, border:`1px solid ${T.border}`, boxShadow:T.shadow, overflow:"hidden" }}>
                  <div style={{ background:`${T.navy}`, padding:"12px 18px", display:"flex", alignItems:"center", gap:8 }}>
                    <Tricolor height={3} />
                  </div>
                  <div style={{ padding:"16px 18px" }}>
                    <div style={{ fontWeight:700, color:T.navy, fontSize:".9rem", marginBottom:14, display:"flex", alignItems:"center", gap:6 }}>
                      <span>🤔</span> {lang==="mr"?"कितना आसान है?":"How Easy Is It?"}
                    </div>
                    <div className="steps-row" style={{ display:"flex", alignItems:"center", gap:6, flexWrap:"wrap" }}>
                      {[
                        { n:1, icon:"🏪", label_mr:"दुकानदार रजिस्टर करें",  label_en:"Register as Shopkeeper" },
                        { n:2, icon:"📋", label_mr:"डिलीवरी अनुरोध बनाएं",    label_en:"Create Delivery Request" },
                        { n:3, icon:"🛵", label_mr:"हम पिकअप करेंगे",        label_en:"We Pick Up" },
                        { n:4, icon:"📍", label_mr:"ग्राहक तक डिलीवरी",     label_en:"Customer Delivery" },
                      ].map((step,i,arr)=>(
                        <React.Fragment key={i}>
                          <div className="step-card" style={{
                            flex:"1 1 70px", textAlign:"center",
                            background:T.greenLight, borderRadius:T.radius,
                            padding:"12px 8px", border:`1px solid ${T.green}22`,
                          }}>
                            <div style={{
                              width:34, height:34, borderRadius:"50%",
                              background:T.green, color:"#fff",
                              display:"flex", alignItems:"center", justifyContent:"center",
                              fontSize:16, margin:"0 auto 6px",
                            }}>{step.icon}</div>
                            <div style={{ fontWeight:700, color:T.green, fontSize:".68rem" }}>{step.n}</div>
                            <div style={{ fontSize:".68rem", color:T.navy, lineHeight:1.3, fontWeight:500 }}>
                              {lang==="mr"?step.label_mr:step.label_en}
                            </div>
                          </div>
                          {i < arr.length-1 && (
                            <div style={{ color:T.saffron, fontWeight:700, fontSize:"1.1rem", flexShrink:0 }}>→</div>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                </div>

                {/* delivery partner photo card */}
                <div style={{ borderRadius:T.radiusLg, overflow:"hidden", boxShadow:T.shadow, position:"relative" }}>
                  <img
                    src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=70"
                    alt="Delivery Partner"
                    style={{ width:"100%", height:140, objectFit:"cover", display:"block" }}
                  />
                  <div style={{ position:"absolute", inset:0, background:"linear-gradient(to right, rgba(13,34,54,.6) 0%, transparent 100%)" }}/>
                  <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", paddingLeft:16 }}>
                    <div>
                      <div style={{ color:"#fff", fontWeight:800, fontSize:"1rem" }}>{lang==="mr"?"डिलीवरी पार्टनर":"Delivery Partner"}</div>
                      <div style={{ color:"rgba(255,255,255,.8)", fontSize:".75rem" }}>{lang==="mr"?"विश्वसनीय टीम":"Trusted Team"}</div>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          3-COLUMN: FMCG | ORDER TRACKING | DELIVERY PARTNER
      ══════════════════════════════════════════════════════════════════════ */}
      <section style={{ paddingBlock:"40px" }}>
        <div style={{
          maxWidth:1180, margin:"0 auto",
          paddingLeft:"max(16px,env(safe-area-inset-left,0px))",
          paddingRight:"max(16px,env(safe-area-inset-right,0px))",
        }}>
          <div className="three-col" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:20 }}>

            {/* ── FMCG ── */}
            <FadeIn delay={0}>
              <div className="card-hover" style={{ background:"#fff", borderRadius:T.radiusXl, overflow:"hidden", boxShadow:T.shadowMd, border:`1px solid ${T.border}`, height:"100%" }}>
                <div style={{ background:`linear-gradient(135deg,${T.saffron},${T.amber})`, padding:"16px 20px" }}>
                  <Tricolor height={3} />
                  <div style={{ marginTop:8, display:"flex", alignItems:"center", gap:8 }}>
                    <span style={{ fontSize:24 }}>🌾</span>
                    <div style={{ color:"#fff", fontWeight:800, fontSize:"1.05rem" }}>
                      {lang==="mr"?"FMCG उत्पाद":"FMCG Products"}
                    </div>
                  </div>
                  <div style={{ color:"rgba(255,255,255,.85)", fontSize:".78rem", marginTop:4 }}>
                    {lang==="mr"?"हमारे भरोसेमंद और गुणवत्तायुक्त उत्पाद":"Our trusted & quality products"}
                  </div>
                </div>
                <div style={{ padding:"16px 20px" }}>
                  {/* product image */}
                  <div style={{ borderRadius:T.radius, overflow:"hidden", marginBottom:14 }}>
                    <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&q=70"
                      alt="FMCG" style={{ width:"100%", height:130, objectFit:"cover", display:"block" }}/>
                  </div>
                  {[
                    { mr:"किराना सामान",          en:"Grocery Items" },
                    { mr:"मसाले और अनाज",         en:"Spices & Grains" },
                    { mr:"खाद्य तेल और Health प्रोडक्ट", en:"Edible Oil & Health Products" },
                    { mr:"हाइजीन और घरेलू उपयोग उत्पाद", en:"Hygiene & Household Products" },
                    { mr:"प्रतिस्पर्धी कीमतें",  en:"Competitive Prices" },
                  ].map((item,i)=>(
                    <div key={i} className="check-item">
                      <div className="check-icon" style={{ background:T.saffron }}>✓</div>
                      <span>{lang==="mr"?item.mr:item.en}</span>
                    </div>
                  ))}
                  <button className="btn-saffron" style={{ marginTop:14, width:"100%", justifyContent:"center" }}>
                    {lang==="mr"?"सभी उत्पाद देखें →":"View All Products →"}
                  </button>
                </div>
              </div>
            </FadeIn>

            {/* ── ORDER TRACKING ── */}
            <FadeIn delay={0.09}>
              <div className="card-hover" style={{ background:"#fff", borderRadius:T.radiusXl, overflow:"hidden", boxShadow:T.shadowMd, border:`1px solid ${T.border}`, height:"100%" }}>
                <div style={{ background:`linear-gradient(135deg,${T.blue},#1e40af)`, padding:"16px 20px" }}>
                  <Tricolor height={3} />
                  <div style={{ marginTop:8, display:"flex", alignItems:"center", gap:8 }}>
                    <span style={{ fontSize:24 }}>📍</span>
                    <div style={{ color:"#fff", fontWeight:800, fontSize:"1.05rem" }}>
                      {lang==="mr"?"ऑर्डर ट्रैक करें रियल टाइम में":"Track Order in Real Time"}
                    </div>
                  </div>
                  <div style={{ color:"rgba(255,255,255,.85)", fontSize:".78rem", marginTop:4 }}>
                    {lang==="mr"?"लाइव ट्रैकिंग से जानें आपका ऑर्डर कहाँ है।":"Know where your order is with live tracking."}
                  </div>
                </div>
                <div style={{ padding:"16px 20px" }}>
                  {/* phone mockup */}
                  <div style={{ borderRadius:T.radius, overflow:"hidden", marginBottom:14, position:"relative" }}>
                    <img src="https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=400&q=70"
                      alt="Tracking" style={{ width:"100%", height:130, objectFit:"cover", display:"block" }}/>
                    <div style={{ position:"absolute", inset:0, background:"rgba(29,78,216,.2)" }}/>
                  </div>
                  {/* tracking steps */}
                  {[
                    { icon:"✅", label_mr:"ऑर्डर कन्फर्म",  label_en:"Order Confirmed",    done:true },
                    { icon:"📦", label_mr:"पिकअप हो गया",   label_en:"Picked Up",           done:true },
                    { icon:"🛵", label_mr:"रास्ते में है",   label_en:"On the Way",          done:false },
                    { icon:"🏠", label_mr:"डिलीवरी पर है",  label_en:"Out for Delivery",    done:false },
                  ].map((step,i)=>(
                    <div key={i} style={{ display:"flex", alignItems:"center", gap:10, padding:"7px 0", borderBottom: i<3?`1px dashed ${T.border}`:"none" }}>
                      <div style={{ width:28, height:28, borderRadius:"50%", background:step.done?`${T.blue}18`:"#f1f5f9", border:`1.5px solid ${step.done?T.blue:T.border}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, flexShrink:0 }}>{step.icon}</div>
                      <span style={{ fontSize:".8rem", color:step.done?T.navy:"#9ca3af", fontWeight:step.done?600:400 }}>
                        {lang==="mr"?step.label_mr:step.label_en}
                      </span>
                      {step.done && <span style={{ marginLeft:"auto", color:T.blue, fontWeight:700, fontSize:".7rem" }}>✓</span>}
                    </div>
                  ))}
                  <button className="btn-primary" style={{ marginTop:14, width:"100%", justifyContent:"center", background:`linear-gradient(135deg,${T.blue},#1e40af)`, boxShadow:"0 4px 14px rgba(29,78,216,.3)" }}>
                    {lang==="mr"?"ऑर्डर ट्रैक करें →":"Track Order →"}
                  </button>
                </div>
              </div>
            </FadeIn>

            {/* ── DELIVERY PARTNER ── */}
            <FadeIn delay={0.18}>
              <div className="card-hover" style={{ background:"#fff", borderRadius:T.radiusXl, overflow:"hidden", boxShadow:T.shadowMd, border:`1px solid ${T.border}`, height:"100%" }}>
                <div style={{ background:`linear-gradient(135deg,${T.green},${T.greenDark})`, padding:"16px 20px" }}>
                  <Tricolor height={3} />
                  <div style={{ marginTop:8, display:"flex", alignItems:"center", gap:8 }}>
                    <span style={{ fontSize:24 }}>🏍️</span>
                    <div style={{ color:"#fff", fontWeight:800, fontSize:"1.05rem" }}>
                      {lang==="mr"?"डिलीवरी पार्टनर बनें":"Become Delivery Partner"}
                    </div>
                  </div>
                </div>
                <div style={{ padding:"16px 20px" }}>
                  {/* rider photo */}
                  <div style={{ borderRadius:T.radius, overflow:"hidden", marginBottom:14 }}>
                    <img src="https://images.unsplash.com/photo-1622640203025-55d77b451ab7?w=400&q=70"
                      alt="Delivery Partner" style={{ width:"100%", height:130, objectFit:"cover", display:"block" }}/>
                  </div>
                  {[
                    { mr:"अपने क्षेत्र में काम करें",        en:"Work in your area" },
                    { mr:"लचीले समय",                       en:"Flexible hours" },
                    { mr:"अतिरिक्त आय का अवसर",             en:"Extra income opportunity" },
                    { mr:"विश्वसनीय संगठन के साथ",           en:"With a trusted organization" },
                    { mr:"सुरक्षित और सम्मानजनक काम",       en:"Safe and dignified work" },
                  ].map((item,i)=>(
                    <div key={i} className="check-item">
                      <div className="check-icon">✓</div>
                      <span>{lang==="mr"?item.mr:item.en}</span>
                    </div>
                  ))}
                  <button className="btn-saffron" style={{ marginTop:14, width:"100%", justifyContent:"center", animation:"pulseSaffron 2.5s infinite" }}>
                    {lang==="mr"?"अब जुड़ें →":"Join Now →"}
                  </button>
                </div>
              </div>
            </FadeIn>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          STATS BAR
      ══════════════════════════════════════════════════════════════════════ */}
      <section style={{ background:"#fff", borderTop:`1px solid ${T.border}`, borderBottom:`1px solid ${T.border}` }}>
        <div style={{
          maxWidth:1180, margin:"0 auto",
          paddingLeft:"max(16px,env(safe-area-inset-left,0px))",
          paddingRight:"max(16px,env(safe-area-inset-right,0px))",
          paddingBlock:"28px",
        }}>
          <div className="stats-grid" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:16 }}>
            {[
              { icon:"🏪", val:"500+",    label_mr:"जुड़ी हुई दुकानें",    label_en:"Partner Shops",      color:T.orange },
              { icon:"📦", val:"10,000+", label_mr:"डिलीवरी प्रति माह",   label_en:"Monthly Deliveries", color:T.green },
              { icon:"👥", val:"100+",    label_mr:"डिलीवरी पार्टनर",     label_en:"Delivery Partners",  color:T.blue },
              { icon:"🌿", val:"200+",    label_mr:"FMCG उत्पाद",          label_en:"FMCG Products",      color:T.saffron },
            ].map((s,i)=>(
              <FadeIn key={i} delay={i*0.07}>
                <div className="stat-chip" style={{
                  background:`${s.color}0c`, border:`1.5px solid ${s.color}22`,
                  borderRadius:T.radiusLg, padding:"20px 16px",
                  textAlign:"center", boxShadow:T.shadow,
                }}>
                  <div style={{ fontSize:32, marginBottom:6 }}>{s.icon}</div>
                  <div style={{ fontWeight:900, color:s.color, fontSize:"1.8rem", lineHeight:1, fontVariantNumeric:"tabular-nums" }}>{s.val}</div>
                  <div style={{ fontSize:".78rem", color:"#6b7280", marginTop:4, fontWeight:500 }}>
                    {lang==="mr"?s.label_mr:s.label_en}
                  </div>
                  <div style={{ fontSize:".68rem", color:"#9ca3af", marginTop:2 }}>
                    {lang==="mr"?"कराड और आसपास के क्षेत्र":"Karad and surrounding area"}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          FOOTER CTA
      ══════════════════════════════════════════════════════════════════════ */}
      <section style={{ background:`linear-gradient(135deg,${T.navy} 0%,#1a3a5c 50%,${T.greenDark} 100%)`, paddingBlock:"40px" }}>
        <Tricolor height={4} />
        <div style={{
          maxWidth:1180, margin:"0 auto",
          paddingLeft:"max(20px,env(safe-area-inset-left,0px))",
          paddingRight:"max(20px,env(safe-area-inset-right,0px))",
          paddingBlock:"28px 8px",
        }}>
          <div className="footer-cta-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:28, alignItems:"center" }}>
            {/* left */}
            <FadeIn>
              <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:14 }}>
                <div style={{ width:56, height:56, borderRadius:"50%", background:"rgba(255,255,255,.15)", border:"2px solid rgba(255,255,255,.3)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:28 }}>🌙</div>
                <div>
                  <div style={{ color:"#fff", fontWeight:800, fontSize:"1.1rem", lineHeight:1.2 }}>खुशहाल मुआशरा</div>
                  <div style={{ color:"rgba(255,255,255,.7)", fontSize:".78rem" }}>Social Welfare &amp; Charitable Trust, Karad</div>
                  <div style={{ color:"rgba(255,255,255,.55)", fontSize:".72rem" }}>रोज़गार · स्वरोज़गार · व्यापार सहयोग · सामाजिक विकास</div>
                </div>
              </div>
              <p style={{ color:"rgba(255,255,255,.75)", fontSize:".88rem", lineHeight:1.7, margin:"0 0 20px", maxWidth:400 }}>
                <span style={{ color:"rgba(255,255,255,.4)", fontSize:"1.5rem", lineHeight:0.5, verticalAlign:"middle" }}>"</span>
                {lang==="mr"
                  ? " समाज की तरक्की आपके सहयोग से..."
                  : " Society's progress with your cooperation..."}
                <span style={{ color:"rgba(255,255,255,.4)", fontSize:"1.5rem", lineHeight:0.5, verticalAlign:"middle" }}>"</span>
              </p>
              <button className="btn-saffron" style={{ animation:"pulseSaffron 2.5s infinite" }}>
                {lang==="mr"?"हमसे जुड़ें →":"Join Us →"}
              </button>
            </FadeIn>

            {/* right — values */}
            <FadeIn delay={0.1}>
              <div className="values-row" style={{ display:"flex", justifyContent:"flex-end", gap:20, flexWrap:"wrap" }}>
                {[
                  { icon:"❤️", label_mr:"विश्वास\nभरोसेमंद सेवा",   label_en:"Trust\nReliable Service",       color:T.saffron },
                  { icon:"🌱", label_mr:"समाज\nका विकास",          label_en:"Society's\nDevelopment",        color:T.green },
                  { icon:"👩", label_mr:"महिलाओं\nका सशक्तिकरण",  label_en:"Women's\nEmpowerment",          color:"#db2777" },
                  { icon:"🏘️", label_mr:"स्थानीय\nरोज़गार",        label_en:"Local\nEmployment",             color:T.blue },
                ].map((v,i)=>(
                  <div key={i} style={{ textAlign:"center", minWidth:80 }}>
                    <div style={{ width:50, height:50, borderRadius:"50%", background:`${v.color}25`, border:`2px solid ${v.color}40`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:24, margin:"0 auto 8px" }}>{v.icon}</div>
                    <div style={{ color:"rgba(255,255,255,.85)", fontSize:".73rem", fontWeight:600, lineHeight:1.4, whiteSpace:"pre-line" }}>
                      {lang==="mr"?v.label_mr:v.label_en}
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── Globe FAB ──────────────────────────────────────────────────────── */}
      <div className="legacy-language-switcher" style={{
        position:"fixed",
        bottom:`calc(24px + env(safe-area-inset-bottom,0px))`,
        right:`calc(24px + env(safe-area-inset-right,0px))`,
        zIndex:1000,
      }}>
        {langOpen && (
          <div style={{
            position:"absolute", bottom:62, right:0,
            background:"white", borderRadius:T.radius,
            boxShadow:T.shadowLg, overflow:"hidden",
            minWidth:148, border:`1px solid ${T.border}`,
            animation:"fadeUp 0.17s ease both",
          }}>
            {[{ code:"mr", label:"🇮🇳  मराठी" }, { code:"en", label:"🇬🇧  English" }].map(o => (
              <button key={o.code}
                onClick={() => { setLang(o.code); setLangOpen(false); }}
                style={{
                  display:"flex", alignItems:"center", width:"100%",
                  padding:"10px 16px", border:"none", cursor:"pointer",
                  fontSize:".83rem", fontWeight: lang===o.code ? 700 : 500,
                  background: lang===o.code ? T.greenLight : "white",
                  color: lang===o.code ? T.green : "#555",
                  borderLeft: lang===o.code ? `3px solid ${T.green}` : "3px solid transparent",
                  fontFamily:T.font, transition:"background 0.12s",
                }}
              >
                {o.label}
              </button>
            ))}
          </div>
        )}
        <button
          className="globe-fab"
          onClick={() => setLangOpen(o => !o)}
          style={{
            width:56, height:56,
            borderRadius:"50%",
            background:`linear-gradient(135deg,${T.green},${T.navy})`,
            color:"#fff",
            border:`3px solid ${T.saffron}`,
            boxShadow:T.shadowLg,
            cursor:"pointer",
            display:"flex", alignItems:"center", justifyContent:"center",
            fontSize:22,
            fontFamily:T.font,
          }}
          title={lang==="mr"?"Switch to English":"मराठीत बदला"}
        >
          🌐
        </button>
      </div>

      <Footer />
    </>
  );
}