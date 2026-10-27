import React, { useState, useEffect, useRef } from "react";
import Navbar from "./navbar";
import Footer from "./footer";
import { useLang } from "./useLang";

// ─── Design Tokens ────────────────────────────────────────────────────────────
const T = {
  bg: "#f0f4f8",
  card: "#ffffff",
  border: "#dde3ed",
  navy: "#0d2236",
  navyMid: "#1a3a5c",
  saffron: "#e87722",
  saffronLight: "#fff3e0",
  green: "#1a7a3c",
  greenLight: "#e8f5ee",
  red: "#dc2626",
  redLight: "#fef2f2",
  amber: "#d97706",
  teal: "#0891b2",
  purple: "#7c3aed",
  blue: "#1d4ed8",
  font: "'Noto Sans Devanagari','Inter','Segoe UI',system-ui,sans-serif",
  shadow: "0 2px 12px rgba(13,34,54,0.09)",
  shadowMd: "0 4px 20px rgba(13,34,54,0.13)",
  shadowLg: "0 8px 40px rgba(13,34,54,0.18)",
  radius: "10px",
  radiusSm: "7px",
  radiusLg: "16px",
};

// ─── Keyframes ────────────────────────────────────────────────────────────────
const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700;800&display=swap');

*, *::before, *::after { box-sizing: border-box; }
body { font-family: ${T.font}; background: ${T.bg}; margin: 0; }

@keyframes fadeUp {
  from { opacity:0; transform:translateY(20px); }
  to   { opacity:1; transform:translateY(0); }
}
@keyframes fadeIn  { from{opacity:0} to{opacity:1} }
@keyframes pulse   {
  0%,100%{ box-shadow:0 0 0 0 rgba(220,38,38,.4); }
  50%    { box-shadow:0 0 0 10px rgba(220,38,38,0); }
}
@keyframes pulseSaffron {
  0%,100%{ box-shadow:0 0 0 0 rgba(232,119,34,.4); }
  50%    { box-shadow:0 0 0 10px rgba(232,119,34,0); }
}
@keyframes globeBounce {
  0%,100%{ transform:translateY(0) scale(1); }
  50%    { transform:translateY(-4px) scale(1.07); }
}
@keyframes shimmer {
  0%  { background-position:-400px 0; }
  100%{ background-position: 400px 0; }
}
@keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }

.contact-card {
  transition: transform .2s ease, box-shadow .2s ease;
  cursor: pointer;
}
.contact-card:hover {
  transform: translateY(-3px);
  box-shadow: ${T.shadowLg};
}
.filter-chip {
  transition: all .18s ease;
  cursor: pointer;
}
.filter-chip:hover { opacity:.85; }
.filter-chip.active { transform:scale(1.04); }

.section-header {
  cursor: pointer;
  user-select: none;
  transition: opacity .15s;
}
.section-header:hover { opacity:.92; }

.collapse-body {
  overflow: hidden;
  transition: max-height .38s cubic-bezier(.4,0,.2,1), opacity .3s ease;
}

.globe-fab {
  animation: globeBounce 3s ease-in-out infinite;
  transition: box-shadow .15s ease;
}
.globe-fab:hover {
  animation: none;
  transform: scale(1.12);
  box-shadow: 0 6px 24px rgba(232,119,34,.5) !important;
}

.num-badge {
  font-variant-numeric: tabular-nums;
  font-weight: 800;
  letter-spacing: -.01em;
}

.helpline-chip {
  transition: transform .18s ease, box-shadow .18s ease;
}
.helpline-chip:hover {
  transform: translateY(-2px) scale(1.03);
  box-shadow: ${T.shadowMd};
}

.search-input:focus { outline:none; border-color:${T.green}; }

@media (max-width:720px) {
  .desktop-only { display:none !important; }
  .grid-4col    { grid-template-columns: repeat(2,1fr) !important; }
  .grid-6col    { grid-template-columns: repeat(2,1fr) !important; }
  .grid-7col    { grid-template-columns: repeat(3,1fr) !important; }
  .grid-8col    { grid-template-columns: repeat(2,1fr) !important; }
}
@media (min-width:721px) {
  .mobile-only { display:none !important; }
}
`;

// ─── Data ─────────────────────────────────────────────────────────────────────
const EMERGENCY = [
  {
    id:1, icon:"🚔",
    name_mr:"पोलीस\nकंट्रोल रूम", name_en:"Police\nControl Room",
    number:"100", extra:"02164 222333",
    sub_mr:"कराड पोलीस स्टेशन", sub_en:"Karad Police Station",
    color:"#1d4ed8", bg:"#eff6ff",
    img:"https://images.unsplash.com/photo-1600091166971-7f9faad6c498?w=200&q=60",
  },
  {
    id:2, icon:"🚑",
    name_mr:"रुग्णवाहिका\n(ॲम्बुलन्स)", name_en:"Ambulance\nService",
    number:"108", extra:"02164 223108",
    sub_mr:"कराड ॲम्बुलन्स सेवा", sub_en:"Karad Ambulance Service",
    color:"#dc2626", bg:"#fef2f2",
    img:"https://images.unsplash.com/photo-1587745416684-47953f16f02f?w=200&q=60",
  },
  {
    id:3, icon:"🚒",
    name_mr:"अग्निशमन दल\n(फायर ब्रिगेड)", name_en:"Fire Brigade",
    number:"101", extra:"02164 222101",
    sub_mr:"कराड फायर स्टेशन", sub_en:"Karad Fire Station",
    color:"#ea580c", bg:"#fff7ed",
    img:"https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=200&q=60",
  },
  {
    id:4, icon:"🆘",
    name_mr:"आपत्ती व्यवस्थापन\n(जिल्हा नियंत्रण कक्ष)", name_en:"Disaster Management\n(District Control)",
    number:"1077", extra:"02162 234444",
    sub_mr:"सातारा जिल्हा नियंत्रण कक्ष", sub_en:"Satara District Control",
    color:"#7c3aed", bg:"#f5f3ff",
    img:"https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=200&q=60",
  },
];

const HOSPITALS = [
  { id:1, icon:"🏥", name_mr:"कराड उपजिल्हा रुग्णालय", name_en:"Karad Sub-District Hospital",  number:"02164 222555", color:"#dc2626", img:"https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=200&q=60" },
  { id:2, icon:"🏥", name_mr:"छत्रपती प्रतापराव रुग्णालय", name_en:"Chhatrapati Prataprao Hospital", number:"02164 222666", color:"#dc2626", img:"https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=200&q=60" },
  { id:3, icon:"🏥", name_mr:"खाजगी रुग्णालये", name_en:"Private Hospitals",              number:"02164 222777", color:"#1d4ed8", img:"https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=200&q=60" },
  { id:4, icon:"🩸", name_mr:"रक्तपेढी (ब्लड बँक)", name_en:"Blood Bank",                   number:"02164 223355", color:"#dc2626", img:"https://images.unsplash.com/photo-1615461066841-6116e61058f4?w=200&q=60" },
  { id:5, icon:"👶", name_mr:"महिला व बाल आरोग्य", name_en:"Women & Child Health",           number:"02164 222888", color:"#db2777", img:"https://images.unsplash.com/photo-1584515933487-779824d29309?w=200&q=60" },
  { id:6, icon:"🧠", name_mr:"मानसिक आरोग्य सेवा", name_en:"Mental Health Service",          number:"02164 222999", color:"#7c3aed", img:"https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=200&q=60" },
];

const GOVT_OFFICES = [
  { id:1, icon:"🏛️", name_mr:"तहसील कार्यालय कराड",          name_en:"Tehsil Office Karad",         number:"02164 222200", img:"https://images.unsplash.com/photo-1486325212027-8081e485255e?w=200&q=60" },
  { id:2, icon:"🏛️", name_mr:"पंचायत समिती कराड",            name_en:"Panchayat Samiti Karad",      number:"02164 222123", img:"https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=200&q=60" },
  { id:3, icon:"🏛️", name_mr:"कराड नगरपालिका",              name_en:"Karad Municipality",          number:"02164 222400", img:"https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=200&q=60" },
  { id:4, icon:"🏢", name_mr:"जिल्हाधिकारी कार्यालय, सातारा", name_en:"Collectorate, Satara",        number:"02162 234501", img:"https://images.unsplash.com/photo-1573164713712-03790a178651?w=200&q=60" },
  { id:5, icon:"🚔", name_mr:"पोलीस उपविभागीय कार्यालय",      name_en:"Police Sub-Divisional Office", number:"02164 222345", img:"https://images.unsplash.com/photo-1600091166971-7f9faad6c498?w=200&q=60" },
  { id:6, icon:"🚗", name_mr:"परिवहन (RTO), कराड",            name_en:"Transport (RTO), Karad",      number:"02164 222390", img:"https://images.unsplash.com/photo-1577315734214-4b3dec92d9ad?w=200&q=60" },
];

const UTILITIES = [
  { id:1, icon:"💡", name_mr:"महावितरण (MSEB)",   name_en:"MSEB (Electricity)",  number:"1912", extra:"02164 222191", color:"#f59e0b" },
  { id:2, icon:"💧", name_mr:"पाणीपुरठा विभाग",   name_en:"Water Supply Dept",    number:"02164 222410", color:"#0891b2" },
  { id:3, icon:"🏗️", name_mr:"गटार / स्वच्छता",  name_en:"Drainage / Sanitation", number:"02164 222420", color:"#65a30d" },
  { id:4, icon:"🗑️", name_mr:"कचरा व्यवस्थापन", name_en:"Waste Management",      number:"02164 222421", color:"#16a34a" },
  { id:5, icon:"🛣️", name_mr:"रस्ता व दिवे (स्ट्रीट लाईट)", name_en:"Roads & Street Lights", number:"02164 222422", color:"#d97706" },
  { id:6, icon:"🏠", name_mr:"मालमत्ता कर विभाग",name_en:"Property Tax Dept",     number:"02164 222423", color:"#7c3aed" },
  { id:7, icon:"🌳", name_mr:"उद्यान विभाग",      name_en:"Garden Department",    number:"02164 222424", color:"#1a7a3c" },
];

const OTHER_SERVICES = [
  { id:1, icon:"📮", name_mr:"पोस्ट ऑफिस कराड",   name_en:"Post Office Karad",     number:"02164 222110", color:"#dc2626" },
  { id:2, icon:"🏦", name_mr:"बँका (महत्त्वाच्या)", name_en:"Banks (Important)",    number:"02164 222300", color:"#1d4ed8" },
  { id:3, icon:"⚖️", name_mr:"न्यायालय (कोर्ट)",   name_en:"Court (Judiciary)",    number:"02164 222210", color:"#374151" },
  { id:4, icon:"🏭", name_mr:"उद्योग कार्यालय",    name_en:"Industries Office",    number:"02164 222230", color:"#ea580c" },
  { id:5, icon:"🌾", name_mr:"कृषी विभाग",         name_en:"Agriculture Dept",     number:"02164 222240", color:"#16a34a" },
  { id:6, icon:"👩", name_mr:"महिला सहाय्य",       name_en:"Women Helpline",       number:"181",          color:"#db2777" },
  { id:7, icon:"👦", name_mr:"बाल सहाय्य",         name_en:"Child Helpline",       number:"1098",         color:"#7c3aed" },
  { id:8, icon:"👴", name_mr:"ज्येष्ठ नागरिक",    name_en:"Senior Citizens",      number:"14567",        color:"#0891b2" },
];

const NATIONAL_HELPLINES = [
  { id:1, icon:"👩", name_mr:"महिला हेल्पलाईन",  name_en:"Women Helpline",    number:"181",            color:"#db2777" },
  { id:2, icon:"👦", name_mr:"बाल हेल्पलाईन",   name_en:"Child Helpline",    number:"1098",           color:"#7c3aed" },
  { id:3, icon:"👴", name_mr:"ज्येष्ठ नागरिक",  name_en:"Senior Citizens",   number:"14567",          color:"#0891b2" },
  { id:4, icon:"🔒", name_mr:"सायबर क्राईम",    name_en:"Cyber Crime",       number:"1930",           color:"#374151" },
  { id:5, icon:"📞", name_mr:"ग्राहक तक्रार",   name_en:"Consumer Helpline", number:"1800 11 4000",   color:"#ea580c" },
  { id:6, icon:"❤️", name_mr:"आरोग्य हेल्पलाईन",name_en:"Health Helpline",   number:"104",            color:"#dc2626" },
  { id:7, icon:"🆘", name_mr:"आपत्ती हेल्पलाईन",name_en:"Disaster Helpline", number:"1070",           color:"#1d4ed8" },
  { id:8, icon:"🌿", name_mr:"पर्यावरण तक्रार", name_en:"Environment",       number:"1800 11 7777",   color:"#16a34a" },
];

const FILTER_CHIPS = [
  { id:"all",      label_mr:"सर्व क्रमांक",  label_en:"All Numbers",   color:T.navy },
  { id:"emergency",label_mr:"आपत्कालीन",     label_en:"Emergency",     color:"#dc2626" },
  { id:"govt",     label_mr:"शासकीय",        label_en:"Government",    color:T.green },
  { id:"health",   label_mr:"वैद्यकीय",      label_en:"Medical",       color:"#1d4ed8" },
  { id:"utility",  label_mr:"उपयुक्त सेवा", label_en:"Utility",       color:"#d97706" },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
function useMobile() {
  const [m, setM] = useState(window.innerWidth < 720);
  useEffect(() => {
    const h = () => setM(window.innerWidth < 720);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);
  return m;
}

function FadeIn({ children, delay = 0, style = {} }) {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const ob = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); ob.disconnect(); } }, { threshold: 0.1 });
    if (ref.current) ob.observe(ref.current);
    return () => ob.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ animation: v ? `fadeUp .5s cubic-bezier(.34,1.56,.64,1) ${delay}s both` : "none", opacity: v ? 1 : 0, ...style }}>
      {children}
    </div>
  );
}

// ─── Section wrapper (collapsible on mobile) ──────────────────────────────────
function Section({ icon, titleMr, titleEn, color, bgColor, lang, children, defaultOpen = true, onViewAll, viewAllLabel }) {
  const isMobile = useMobile();
  const [open, setOpen] = useState(defaultOpen);
  const toggle = () => isMobile && setOpen(o => !o);

  return (
    <div style={{ marginBottom: 22, borderRadius: T.radiusLg, overflow: "hidden", boxShadow: T.shadow }}>
      {/* Header */}
      <div
        className="section-header"
        onClick={toggle}
        style={{
          background: bgColor || color,
          padding: "13px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {/* tricolor stripe */}
          <div style={{ display: "flex", gap: 2 }}>
            {["#e87722","#ffffff","#1a7a3c"].map((c,i)=>(
              <div key={i} style={{ width:4, height:22, background:c, borderRadius:2 }}/>
            ))}
          </div>
          <div style={{ width:34, height:34, borderRadius:"50%", background:"rgba(255,255,255,.2)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18 }}>{icon}</div>
          <span style={{ color:"#fff", fontWeight:700, fontSize:"clamp(.95rem,2.5vw,1.1rem)" }}>
            {lang==="mr" ? titleMr : titleEn}
          </span>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          {onViewAll && (
            <button
              onClick={e => { e.stopPropagation(); onViewAll(); }}
              style={{ background:"rgba(255,255,255,.2)", border:"1px solid rgba(255,255,255,.4)", color:"#fff", fontSize:".75rem", fontWeight:600, padding:"4px 12px", borderRadius:"20px", cursor:"pointer", fontFamily:T.font }}
            >
              {viewAllLabel || (lang==="mr" ? "सर्व पहा →" : "View All →")}
            </button>
          )}
          {isMobile && (
            <span style={{ color:"#fff", fontSize:18, fontWeight:700, transition:"transform .3s", display:"inline-block", transform: open?"rotate(180deg)":"rotate(0deg)" }}>▾</span>
          )}
        </div>
      </div>
      {/* Body */}
      <div
        className="collapse-body"
        style={{
          maxHeight: (!isMobile || open) ? "9999px" : "0px",
          opacity:    (!isMobile || open) ? 1 : 0,
          background: T.card,
          borderTop: "none",
        }}
      >
        <div style={{ padding:"18px 16px" }}>{children}</div>
      </div>
    </div>
  );
}

// ─── Emergency Card ───────────────────────────────────────────────────────────
function EmergencyCard({ item, lang, index }) {
  const [imgErr, setImgErr] = useState(false);
  return (
    <FadeIn delay={index * 0.07}>
      <div
        className="contact-card"
        style={{
          background: item.bg,
          border: `1.5px solid ${item.color}22`,
          borderRadius: T.radiusLg,
          overflow:"hidden",
          boxShadow: T.shadow,
        }}
      >
        {/* image */}
        <div style={{ position:"relative", height:90, overflow:"hidden" }}>
          {imgErr ? (
            <div style={{ height:"100%", background:`${item.color}18`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:36 }}>{item.icon}</div>
          ) : (
            <img src={item.img} alt="" onError={()=>setImgErr(true)}
              style={{ width:"100%", height:"100%", objectFit:"cover", display:"block", filter:"brightness(.92)" }} />
          )}
          <div style={{ position:"absolute", inset:0, background:`linear-gradient(to bottom, transparent 40%, ${item.bg} 100%)` }} />
        </div>
        {/* content */}
        <div style={{ padding:"10px 12px 14px" }}>
          <div style={{ fontWeight:600, fontSize:".8rem", color:"#475569", marginBottom:4, whiteSpace:"pre-line", lineHeight:1.35 }}>
            {lang==="mr" ? item.name_mr : item.name_en}
          </div>
          {/* big number */}
          <div
            className="num-badge"
            style={{
              fontSize:"2.4rem",
              color: item.color,
              lineHeight:1,
              marginBottom:2,
              animation: item.number==="100"||item.number==="108"||item.number==="101" ? "pulse 2.5s infinite" : "none",
              display:"inline-block",
            }}
          >
            {item.number}
          </div>
          <div style={{ fontSize:".72rem", color:"#64748b", marginTop:2 }}>
            {lang==="mr" ? item.sub_mr : item.sub_en}
          </div>
          <div style={{ fontSize:".76rem", fontWeight:600, color:item.color, marginTop:3 }}>{item.extra}</div>
        </div>
      </div>
    </FadeIn>
  );
}

// ─── Service Card (hospitals / govt offices) ──────────────────────────────────
function ServiceCard({ item, lang, index }) {
  const [imgErr, setImgErr] = useState(false);
  return (
    <FadeIn delay={index * 0.055}>
      <div
        className="contact-card"
        style={{
          background: T.card,
          border: `1px solid ${T.border}`,
          borderRadius: T.radius,
          overflow:"hidden",
          boxShadow: T.shadow,
          display:"flex",
          flexDirection:"column",
        }}
      >
        <div style={{ height:80, overflow:"hidden", background:"#f1f5f9", position:"relative" }}>
          {imgErr ? (
            <div style={{ height:"100%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:30, background:`${item.color||T.navy}15` }}>{item.icon}</div>
          ) : (
            <img src={item.img} alt="" onError={()=>setImgErr(true)}
              style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }} />
          )}
          {/* top tag */}
          <div style={{ position:"absolute", top:6, left:6, background:"rgba(0,0,0,.45)", color:"#fff", fontSize:".65rem", padding:"2px 8px", borderRadius:"20px", backdropFilter:"blur(4px)" }}>
            {item.icon}
          </div>
        </div>
        <div style={{ padding:"10px 10px 12px", flex:1 }}>
          <div style={{ fontWeight:600, fontSize:".8rem", color:T.navy, lineHeight:1.35, marginBottom:6 }}>
            {lang==="mr" ? item.name_mr : item.name_en}
          </div>
          <a href={`tel:${item.number}`} style={{ textDecoration:"none" }}>
            <div style={{ fontWeight:700, color: item.color||T.green, fontSize:".82rem" }}>{item.number}</div>
          </a>
        </div>
      </div>
    </FadeIn>
  );
}

// ─── Utility Icon Card ─────────────────────────────────────────────────────────
function UtilityCard({ item, lang, index }) {
  return (
    <FadeIn delay={index * 0.05}>
      <div
        className="contact-card"
        style={{
          background: T.card,
          border: `1px solid ${T.border}`,
          borderRadius: T.radius,
          padding:"14px 10px",
          textAlign:"center",
          boxShadow: T.shadow,
        }}
      >
        <div style={{
          width:48, height:48,
          borderRadius:"50%",
          background:`${item.color}18`,
          border:`2px solid ${item.color}33`,
          display:"flex", alignItems:"center", justifyContent:"center",
          fontSize:22, margin:"0 auto 8px",
        }}>{item.icon}</div>
        <div style={{ fontSize:".72rem", color:"#64748b", marginBottom:3, lineHeight:1.3 }}>
          {lang==="mr" ? item.name_mr : item.name_en}
        </div>
        <div style={{ fontWeight:700, color:item.color, fontSize:".85rem" }}>{item.number}</div>
        {item.extra && <div style={{ fontSize:".65rem", color:"#94a3b8", marginTop:1 }}>{item.extra}</div>}
      </div>
    </FadeIn>
  );
}

// ─── Other Services Card ───────────────────────────────────────────────────────
function OtherCard({ item, lang, index }) {
  return (
    <FadeIn delay={index * 0.05}>
      <div
        className="contact-card"
        style={{
          background: T.card,
          border: `1px solid ${T.border}`,
          borderRadius: T.radius,
          padding:"12px 10px",
          textAlign:"center",
          boxShadow: T.shadow,
        }}
      >
        <div style={{
          width:40, height:40,
          borderRadius:"50%",
          background:`${item.color}15`,
          display:"flex", alignItems:"center", justifyContent:"center",
          fontSize:20, margin:"0 auto 6px",
        }}>{item.icon}</div>
        <div style={{ fontSize:".72rem", color:"#64748b", marginBottom:4, lineHeight:1.3 }}>
          {lang==="mr" ? item.name_mr : item.name_en}
        </div>
        <div style={{ fontWeight:800, color:item.color, fontSize:"1rem" }}>{item.number}</div>
      </div>
    </FadeIn>
  );
}

// ─── National Helpline Chip ───────────────────────────────────────────────────
function HelplineChip({ item, lang, index }) {
  return (
    <FadeIn delay={index * 0.04}>
      <div
        className="helpline-chip"
        style={{
          background: `${item.color}0f`,
          border:`1.5px solid ${item.color}33`,
          borderRadius: T.radius,
          padding:"12px 10px",
          textAlign:"center",
          cursor:"pointer",
        }}
      >
        <div style={{ fontSize:22, marginBottom:4 }}>{item.icon}</div>
        <div style={{ fontSize:".7rem", color:"#475569", marginBottom:3, lineHeight:1.3, fontWeight:500 }}>
          {lang==="mr" ? item.name_mr : item.name_en}
        </div>
        <div
          className="num-badge"
          style={{ color:item.color, fontSize:"1.05rem" }}
        >{item.number}</div>
      </div>
    </FadeIn>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function ContactNumbers() {
  const { lang, setLang } = useLang();
  const [langOpen, setLangOpen] = useState(false);
  const [query, setQuery]     = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const isMobile = useMobile();

  // simple search filter (number or name)
  const q = query.toLowerCase();
  const filterItem = (arr) => {
    if (!q) return arr;
    return arr.filter(i =>
      (i.name_mr||"").toLowerCase().includes(q) ||
      (i.name_en||"").toLowerCase().includes(q) ||
      (i.number||"").includes(q) ||
      (i.extra||"").includes(q)
    );
  };

  // which sections are visible based on active filter
  const show = (key) => activeFilter === "all" || activeFilter === key;

  return (
    <>
      <style>{STYLES}</style>
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <div style={{
        background:`linear-gradient(135deg, ${T.green} 0%, #145a30 50%, ${T.navy} 100%)`,
        position:"relative",
        overflow:"hidden",
        paddingBottom:0,
      }}>
        {/* tricolor top */}
        <div style={{ position:"absolute", top:0, left:0, right:0, height:5, display:"flex" }}>
          {["#e87722","#ffffff","#1a7a3c"].map((c,i)=>(<div key={i} style={{ flex:1, background:c }}/>))}
        </div>

        {/* bg pattern */}
        <div style={{ position:"absolute", top:-60, right:-80, width:320, height:320, background:"rgba(255,255,255,.04)", borderRadius:"50%" }}/>
        <div style={{ position:"absolute", bottom:-40, left:-60, width:220, height:220, background:"rgba(232,119,34,.07)", borderRadius:"50%" }}/>

        <div style={{
          maxWidth:1100, margin:"0 auto",
          paddingLeft:"max(20px,env(safe-area-inset-left,0px))",
          paddingRight:"max(20px,env(safe-area-inset-right,0px))",
          paddingBlock:"36px 0",
          position:"relative", zIndex:1,
        }}>
          <div style={{ display:"flex", alignItems:"center", gap:16, flexWrap:"wrap", justifyContent:"space-between" }}>
            {/* left */}
            <div>
              {/* location tag */}
              <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:12 }}>
                <div style={{ background:T.saffron, color:"#fff", padding:"4px 12px", borderRadius:"20px", fontSize:".75rem", fontWeight:700, display:"flex", alignItems:"center", gap:5 }}>
                  <span>📍</span> {lang==="mr" ? "कराड, जि. सातारा" : "Karad, Dist. Satara"}
                </div>
                <div style={{ background:"rgba(255,255,255,.15)", color:"#fff", padding:"4px 12px", borderRadius:"20px", fontSize:".7rem", backdropFilter:"blur(6px)" }}>
                  {lang==="mr" ? "आपल्या सेवेसाठी नेहमी उपस्थित" : "Always at your service"}
                </div>
              </div>

              {/* main title */}
              <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:10 }}>
                <div style={{ width:56, height:56, borderRadius:"50%", background:"rgba(255,255,255,.15)", border:"2px solid rgba(255,255,255,.35)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:28, flexShrink:0, backdropFilter:"blur(8px)" }}>📞</div>
                <div>
                  <h1 style={{ margin:0, color:"#fff", fontWeight:800, fontSize:"clamp(1.5rem,4.5vw,2.4rem)", lineHeight:1.1 }}>
                    {lang==="mr" ? "महत्वाचे संपर्क क्रमांक" : "Important Contact Numbers"}
                  </h1>
                  <div style={{ color:"rgba(255,255,255,.8)", fontWeight:600, fontSize:"clamp(.85rem,2vw,1rem)", marginTop:3 }}>
                    {lang==="mr" ? "कराड तालुका (जि. सातारा)" : "Karad Taluka (Dist. Satara)"}
                  </div>
                </div>
              </div>

              <div style={{
                background: T.saffron,
                color:"#fff",
                fontWeight:700,
                fontSize:".85rem",
                padding:"8px 18px",
                borderRadius:T.radius,
                display:"inline-block",
                marginBottom:16,
                boxShadow:"0 4px 16px rgba(232,119,34,.4)",
              }}>
                {lang==="mr"
                  ? "आपत्कालीन, शासकीय, वैद्यकीय, उपयुक्त सेवा – सर्व एकाच ठिकाणी"
                  : "Emergency, Government, Medical, Utility — All in One Place"}
              </div>

              {/* stats */}
              <div style={{ display:"flex", flexWrap:"wrap", gap:10 }}>
                {[
                  { n:"50+", l_mr:"संपर्क क्रमांक", l_en:"Contact Numbers" },
                  { n:"6",   l_mr:"श्रेणी",          l_en:"Categories" },
                  { n:"24×7", l_mr:"उपलब्ध",         l_en:"Available" },
                ].map((s,i)=>(
                  <div key={i} style={{ background:"rgba(255,255,255,.14)", backdropFilter:"blur(6px)", border:"1px solid rgba(255,255,255,.22)", borderRadius:T.radiusSm, padding:"6px 14px", textAlign:"center" }}>
                    <div style={{ fontWeight:800, color:T.saffron, fontSize:"1.1rem" }}>{s.n}</div>
                    <div style={{ color:"rgba(255,255,255,.8)", fontSize:".68rem" }}>{lang==="mr"?s.l_mr:s.l_en}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* right — phone mockup */}
            <div className="desktop-only" style={{ flexShrink:0 }}>
              <div style={{
                background:"rgba(255,255,255,.12)",
                backdropFilter:"blur(12px)",
                border:"2px solid rgba(255,255,255,.25)",
                borderRadius:T.radiusLg,
                padding:"18px 16px",
                width:170,
                textAlign:"center",
                boxShadow:"0 8px 32px rgba(0,0,0,.2)",
              }}>
                <div style={{ fontSize:36, marginBottom:6 }}>📱</div>
                <div style={{ color:"#fff", fontWeight:700, fontSize:".85rem", marginBottom:4 }}>
                  {lang==="mr" ? "महत्वाचे क्रमांक" : "Important Numbers"}
                </div>
                <div style={{ color:T.saffron, fontWeight:800, fontSize:"1.3rem", animation:"pulseSaffron 2.5s infinite" }}>100 | 108</div>
                <div style={{ color:"rgba(255,255,255,.7)", fontSize:".68rem", marginTop:4 }}>
                  {lang==="mr" ? "एक क्लिकवर" : "One Click Away"}
                </div>
              </div>
            </div>
          </div>

          {/* ── Search + Filter bar ─── */}
          <div style={{
            background:"rgba(255,255,255,.1)",
            backdropFilter:"blur(10px)",
            borderRadius:`${T.radiusLg} ${T.radiusLg} 0 0`,
            padding:"16px 20px",
            marginTop:20,
            border:"1px solid rgba(255,255,255,.2)",
            borderBottom:"none",
          }}>
            <div style={{ display:"flex", gap:10, flexWrap:"wrap", alignItems:"center" }}>
              {/* search */}
              <div style={{ flex:"1 1 240px", display:"flex", alignItems:"center", gap:0, background:"#fff", borderRadius:T.radius, overflow:"hidden", border:`1.5px solid ${T.border}` }}>
                <div style={{ padding:"0 12px", color:"#94a3b8", fontSize:18 }}>🔍</div>
                <input
                  className="search-input"
                  value={query}
                  onChange={e=>setQuery(e.target.value)}
                  placeholder={lang==="mr" ? "सेवा, कार्यालय किंवा नाव शोधा... (उदा. पोलीस, रुग्णालय, MSEB)" : "Search service, office or name..."}
                  style={{
                    flex:1, border:"none", background:"none",
                    fontFamily:T.font, fontSize:".85rem",
                    padding:"10px 0", color:T.navy,
                  }}
                />
                <button style={{
                  background:T.green, color:"#fff", border:"none",
                  padding:"10px 18px", fontFamily:T.font, fontWeight:700,
                  fontSize:".82rem", cursor:"pointer",
                }}>
                  {lang==="mr" ? "शोधा" : "Search"}
                </button>
              </div>
              {/* filter chips */}
              <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
                {FILTER_CHIPS.map(chip=>(
                  <button
                    key={chip.id}
                    className={`filter-chip${activeFilter===chip.id?" active":""}`}
                    onClick={()=>setActiveFilter(chip.id)}
                    style={{
                      background: activeFilter===chip.id ? chip.color : "rgba(255,255,255,.85)",
                      color: activeFilter===chip.id ? "#fff" : chip.color,
                      border:`1.5px solid ${chip.color}`,
                      padding:"6px 14px",
                      borderRadius:"20px",
                      fontFamily:T.font,
                      fontWeight:600,
                      fontSize:".75rem",
                      cursor:"pointer",
                      boxShadow: activeFilter===chip.id ? `0 2px 10px ${chip.color}44` : "none",
                    }}
                  >
                    {lang==="mr" ? chip.label_mr : chip.label_en}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT ─────────────────────────────────────────────────── */}
      <main style={{
        maxWidth:1100, margin:"0 auto",
        paddingLeft:"max(16px,env(safe-area-inset-left,0px))",
        paddingRight:"max(16px,env(safe-area-inset-right,0px))",
        paddingBlock:"20px 70px",
      }}>

        {/* ── Emergency ── */}
        {show("emergency") && (
          <Section icon="🚨" titleMr="आपत्कालीन सेवा (Emergency)" titleEn="Emergency Services" color="#dc2626" lang={lang}>
            <div className="grid-4col" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14 }}>
              {filterItem(EMERGENCY).map((item,i)=>(
                <EmergencyCard key={item.id} item={item} lang={lang} index={i} />
              ))}
            </div>
          </Section>
        )}

        {/* ── Hospitals ── */}
        {show("health") && (
          <Section icon="🏥" titleMr="वैद्यकीय सेवा (Hospitals & Health)" titleEn="Hospitals & Health Services" color={T.blue} lang={lang} onViewAll={()=>{}} viewAllLabel={lang==="mr" ? "सर्व पहा →" : "View All →"}>
            <div className="grid-6col" style={{ display:"grid", gridTemplateColumns:"repeat(6,1fr)", gap:12 }}>
              {filterItem(HOSPITALS).map((item,i)=>(
                <ServiceCard key={item.id} item={item} lang={lang} index={i} />
              ))}
            </div>
          </Section>
        )}

        {/* ── Government Offices ── */}
        {show("govt") && (
          <Section icon="🏛️" titleMr="शासकीय कार्यालये (Government Offices)" titleEn="Government Offices" color={T.teal} lang={lang} onViewAll={()=>{}} viewAllLabel={lang==="mr" ? "सर्व पहा →" : "View All →"}>
            <div className="grid-6col" style={{ display:"grid", gridTemplateColumns:"repeat(6,1fr)", gap:12 }}>
              {filterItem(GOVT_OFFICES).map((item,i)=>(
                <ServiceCard key={item.id} item={item} lang={lang} index={i} />
              ))}
            </div>
          </Section>
        )}

        {/* ── Utilities ── */}
        {show("utility") && (
          <Section icon="⚡" titleMr="महत्वाच्या नागरी सेवा (Utilities & Civic Services)" titleEn="Utilities & Civic Services" color={T.amber} lang={lang}>
            <div className="grid-7col" style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", gap:12 }}>
              {filterItem(UTILITIES).map((item,i)=>(
                <UtilityCard key={item.id} item={item} lang={lang} index={i} />
              ))}
            </div>
          </Section>
        )}

        {/* ── Other Services ── */}
        {show("all") && (
          <Section icon="📋" titleMr="इतर उपयुक्त सेवा (Other Important Services)" titleEn="Other Important Services" color={T.purple} lang={lang} onViewAll={()=>{}} viewAllLabel={lang==="mr" ? "सर्व पहा →" : "View All →"}>
            <div className="grid-8col" style={{ display:"grid", gridTemplateColumns:"repeat(8,1fr)", gap:10 }}>
              {filterItem(OTHER_SERVICES).map((item,i)=>(
                <OtherCard key={item.id} item={item} lang={lang} index={i} />
              ))}
            </div>
          </Section>
        )}

        {/* ── National Helplines ── */}
        {show("all") && (
          <Section icon="📞" titleMr="महत्वाचे हेल्पलाईन क्रमांक (National Helplines)" titleEn="National Helplines" color={T.navy} lang={lang}>
            <div className="grid-8col" style={{ display:"grid", gridTemplateColumns:"repeat(8,1fr)", gap:10 }}>
              {filterItem(NATIONAL_HELPLINES).map((item,i)=>(
                <HelplineChip key={item.id} item={item} lang={lang} index={i} />
              ))}
            </div>
          </Section>
        )}

        {/* empty state */}
        {q && filterItem([...EMERGENCY,...HOSPITALS,...GOVT_OFFICES,...UTILITIES,...OTHER_SERVICES,...NATIONAL_HELPLINES]).length === 0 && (
          <div style={{ textAlign:"center", padding:"48px 16px", color:"#94a3b8" }}>
            <div style={{ fontSize:48, marginBottom:12 }}>🔍</div>
            <div style={{ fontWeight:600, color:T.navy, fontSize:"1.05rem" }}>
              {lang==="mr" ? "कोणताही परिणाम आढळला नाही" : "No results found"}
            </div>
            <div style={{ fontSize:".85rem", marginTop:6 }}>
              {lang==="mr" ? `"${query}" साठी कोणतीही माहिती उपलब्ध नाही` : `No information found for "${query}"`}
            </div>
          </div>
        )}

      </main>

      {/* ── Globe FAB ─────────────────────────────────────────────────────── */}
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
            width:54, height:54,
            borderRadius:"50%",
            background:`linear-gradient(135deg,${T.green} 0%,${T.navy} 100%)`,
            color:"#fff",
            border:`3px solid ${T.saffron}`,
            boxShadow:T.shadowLg,
            cursor:"pointer",
            display:"flex",
            alignItems:"center",
            justifyContent:"center",
            fontSize:22,
            fontFamily:T.font,
          }}
          title={lang==="mr" ? "Switch to English" : "मराठीत बदला"}
        >
          🌐
        </button>
      </div>

      <Footer />
    </>
  );
}