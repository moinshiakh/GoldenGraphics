import { useState, useEffect, useRef } from "react";
import {
  Globe, Phone, Star, MapPin, ChevronRight, ChevronDown,
  Shield, Award, Clock, Users, Search, Filter, CheckCircle,
  Wrench, Zap, Paintbrush, HardHat, Layers, Grid, List
} from "lucide-react";
import Navbar from "./navbar";
import Footer from "./footer";

// ─── Design tokens (Ministry of Labour / Govt India) ─────────────────────────
const T = {
  govBlue:    "#003580",
  govBlueMid: "#0056b3",
  govBlueHov: "#004494",
  saffron:    "#FF671F",
  green:      "#046A38",
  accent:     "#f5a623",
  accentSoft: "#fef8ec",
  red:        "#c0392b",
  bg:         "#f0f4fb",
  card:       "#ffffff",
  border:     "#dce3ef",
  borderDark: "#b0bdda",
  text:       "#0d1b2e",
  textSub:    "#4a5a72",
  textMuted:  "#8896ae",
  shadow:     "0 1px 3px rgba(0,53,128,0.07), 0 4px 14px rgba(0,53,128,0.05)",
  shadowHov:  "0 6px 24px rgba(0,53,128,0.13)",
  radius:     8,
  font:       "'Noto Sans Devanagari','Noto Sans','Segoe UI',system-ui,sans-serif",
};

// ─── Categories ───────────────────────────────────────────────────────────────
const CATEGORIES = [
  { id:"plumber",    en:"Plumber",      mr:"प्लंबर",        icon:<Wrench size={18}/>,    color:"#1565c0", soft:"#e3f0ff", border:"#90caf9" },
  { id:"electric",   en:"Electrician",  mr:"इलेक्ट्रिशियन", icon:<Zap size={18}/>,       color:"#e65100", soft:"#fff3e0", border:"#ffcc80" },
  { id:"helper",     en:"Helper",       mr:"हेल्पर",         icon:<Users size={18}/>,     color:"#2e7d32", soft:"#e8f5e9", border:"#a5d6a7" },
  { id:"painter",    en:"Painter",      mr:"पेंटर",          icon:<Paintbrush size={18}/>,color:"#6a1b9a", soft:"#f3e5f5", border:"#ce93d8" },
  { id:"centring",   en:"Centring",     mr:"सेंट्रिंग",      icon:<HardHat size={18}/>,   color:"#4e342e", soft:"#efebe9", border:"#bcaaa4" },
  { id:"farshi",     en:"Farshiwala",   mr:"फर्शीवाला",      icon:<Layers size={18}/>,    color:"#00695c", soft:"#e0f2f1", border:"#80cbc4" },
  { id:"aluminium",  en:"Aluminium",    mr:"अल्युमिनियम",   icon:<Grid size={18}/>,      color:"#37474f", soft:"#eceff1", border:"#b0bec5" },
  { id:"gavandi",    en:"Gavandi",      mr:"गवंडी",          icon:<HardHat size={18}/>,   color:"#795548", soft:"#efebe9", border:"#bcaaa4" },
  { id:"carpenter",  en:"Carpenter",    mr:"सुतार",          icon:<Wrench size={18}/>,    color:"#bf360c", soft:"#fbe9e7", border:"#ffab91" },
  { id:"welder",     en:"Welder",       mr:"वेल्डर",         icon:<Shield size={18}/>,    color:"#1a237e", soft:"#e8eaf6", border:"#9fa8da" },
  { id:"mason",      en:"Mason",        mr:"गवंडी कामगार",   icon:<HardHat size={18}/>,   color:"#827717", soft:"#f9fbe7", border:"#dce775" },
  { id:"other",      en:"Other",        mr:"इतर",            icon:<Filter size={18}/>,    color:"#455a64", soft:"#eceff1", border:"#90a4ae" },
];

// ─── Workers per category ─────────────────────────────────────────────────────
const makeWorkers = (cat) => [
  { id:1,  name:"Shabbir Shaikh",    phone:"9890625465", rating:4.8, location:"कराड",     exp:"५ वर्षे",  avail:true  },
  { id:2,  name:"Ramesh Patil",      phone:"9822334455", rating:4.5, location:"कराड",     exp:"३ वर्षे",  avail:true  },
  { id:3,  name:"Imran Shaikh",      phone:"9765432100", rating:4.2, location:"मलकापूर",  exp:"७ वर्षे",  avail:false },
  { id:4,  name:"Vikram Jadhav",     phone:"9812345678", rating:4.9, location:"कराड",     exp:"१० वर्षे", avail:true  },
  { id:5,  name:"Akbar Khan",        phone:"9876543210", rating:4.0, location:"कोरेगाव",  exp:"२ वर्षे",  avail:true  },
  { id:6,  name:"Suresh More",       phone:"9988776655", rating:4.6, location:"कराड",     exp:"८ वर्षे",  avail:true  },
  { id:7,  name:"Rajan Sawant",      phone:"9123456789", rating:3.9, location:"वाई",      exp:"४ वर्षे",  avail:false },
  { id:8,  name:"Salim Shaikh",      phone:"9900112233", rating:4.7, location:"कराड",     exp:"६ वर्षे",  avail:true  },
].map(w => ({ ...w, category: cat }));

// ─── Stars component ──────────────────────────────────────────────────────────
function Stars({ rating }) {
  return (
    <span style={{ display:"inline-flex", alignItems:"center", gap:2 }}>
      {[1,2,3,4,5].map(i => (
        <Star key={i} size={11}
          fill={i <= Math.round(rating) ? T.accent : "none"}
          color={i <= Math.round(rating) ? T.accent : T.textMuted}
        />
      ))}
      <span style={{ fontSize:"0.7rem", color:T.textMuted, marginLeft:2 }}>{rating}</span>
    </span>
  );
}

// ─── Worker Row ───────────────────────────────────────────────────────────────
function WorkerRow({ worker, index, lang }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  const [hov, setHov] = useState(false);

  useEffect(() => {
    setVis(false);
    const t = setTimeout(() => {
      const obs = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) setVis(true); },
        { threshold: 0.05 }
      );
      if (ref.current) obs.observe(ref.current);
      return () => obs.disconnect();
    }, 30);
    return () => clearTimeout(t);
  }, [worker.id, worker.category]);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display:"grid",
        gridTemplateColumns:"2fr 1.4fr 1.6fr auto auto",
        alignItems:"center",
        gap:0,
        background: hov ? "#f5f8ff" : T.card,
        border: `1px solid ${hov ? T.borderDark : T.border}`,
        borderLeft: `3px solid ${hov ? T.govBlueMid : T.govBlue}`,
        borderRadius: T.radius,
        overflow:"hidden",
        opacity: vis ? 1 : 0,
        transform: vis ? "translateX(0)" : "translateX(-24px)",
        transition: `opacity 0.32s ease ${index * 0.05}s, transform 0.32s ease ${index * 0.05}s, box-shadow 0.18s, border-color 0.18s, background 0.18s`,
        boxShadow: hov ? T.shadowHov : T.shadow,
        cursor:"default",
      }}
    >
      {/* Name + Stars */}
      <div style={{ padding:"13px 16px", borderRight:`1px solid ${T.border}` }}>
        <div style={{ fontWeight:700, fontSize:"0.88rem", color:T.text, marginBottom:3, fontFamily:T.font }}>
          {worker.name}
        </div>
        <Stars rating={worker.rating}/>
      </div>

      {/* Phone */}
      <div style={{ padding:"13px 14px", borderRight:`1px solid ${T.border}` }}>
        <a href={`tel:${worker.phone}`}
          onClick={e=>e.stopPropagation()}
          style={{
            display:"inline-flex", alignItems:"center", gap:5,
            fontSize:"0.8rem", color:T.govBlueMid, fontWeight:600,
            textDecoration:"none", fontFamily:T.font,
          }}
        >
          <Phone size={12} color={T.govBlueMid}/> {worker.phone}
        </a>
      </div>

      {/* Location + Exp */}
      <div style={{ padding:"13px 14px", borderRight:`1px solid ${T.border}` }}>
        <div style={{ display:"flex", alignItems:"center", gap:4, fontSize:"0.76rem", color:T.textSub, marginBottom:2 }}>
          <MapPin size={11} color={T.textMuted}/> {worker.location}
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:4, fontSize:"0.73rem", color:T.textMuted }}>
          <Clock size={10} color={T.textMuted}/> {worker.exp}
        </div>
      </div>

      {/* Available badge */}
      <div style={{ padding:"13px 12px", borderRight:`1px solid ${T.border}` }}>
        <span style={{
          display:"inline-flex", alignItems:"center", gap:3,
          fontSize:"0.68rem", fontWeight:700, padding:"3px 8px",
          borderRadius:20,
          background: worker.avail ? "#dcfce7" : "#fee2e2",
          color:       worker.avail ? T.green    : T.red,
          border:`1px solid ${worker.avail ? "#86efac" : "#fca5a5"}`,
          whiteSpace:"nowrap",
        }}>
          {worker.avail
            ? <><CheckCircle size={9}/> {lang==="mr"?"उपलब्ध":"Available"}</>
            : <><Clock size={9}/> {lang==="mr"?"व्यस्त":"Busy"}</>
          }
        </span>
      </div>

      {/* Arrow CTA */}
      <div style={{ padding:"13px 14px" }}>
        <button style={{
          background: hov ? T.govBlue : "none",
          border: `1px solid ${hov ? T.govBlue : T.borderDark}`,
          borderRadius:6, width:30, height:30,
          display:"flex", alignItems:"center", justifyContent:"center",
          cursor:"pointer", color: hov ? "white" : T.textMuted,
          transition:"all 0.18s",
        }}>
          <ChevronRight size={14}/>
        </button>
      </div>
    </div>
  );
}

// ─── Category Button ──────────────────────────────────────────────────────────
function CategoryButton({ cat, selected, onClick, lang, index }) {
  const [hov, setHov] = useState(false);
  const active = selected;

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display:"flex", flexDirection:"column",
        alignItems:"center", justifyContent:"center",
        gap:6, padding:"11px 6px",
        background: active ? cat.color : hov ? cat.soft : T.card,
        color:      active ? "white"   : hov ? cat.color : T.textSub,
        border: active
          ? `2px solid ${cat.color}`
          : `1.5px solid ${hov ? cat.border : T.border}`,
        borderRadius: T.radius,
        cursor:"pointer", fontFamily:T.font,
        fontWeight: active ? 700 : 500,
        fontSize:"0.73rem", lineHeight:1.25, textAlign:"center",
        boxShadow: active
          ? `0 4px 14px ${cat.color}44`
          : hov ? `0 2px 10px ${cat.color}22` : T.shadow,
        transform: active ? "translateY(-2px)" : hov ? "translateY(-1px)" : "none",
        transition:"all 0.18s ease",
        animation: `catPop 0.3s ease ${index * 0.04}s both`,
        position:"relative", overflow:"hidden",
        minWidth:0,
      }}
    >
      <span style={{
        opacity: active ? 1 : hov ? 0.85 : 0.6,
        display:"flex", alignItems:"center",
      }}>
        {cat.icon}
      </span>
      <span>{lang==="mr" ? cat.mr : cat.en}</span>

      {/* Shimmer on hover */}
      {hov && !active && (
        <span style={{
          position:"absolute", inset:0,
          background:"linear-gradient(120deg,transparent 30%,rgba(255,255,255,0.4) 50%,transparent 70%)",
          backgroundSize:"200% 100%",
          animation:"shimmer 0.55s ease forwards",
          pointerEvents:"none",
        }}/>
      )}
    </button>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function LabourService() {
  const [lang, setLang]             = useState("mr");
  const [langOpen, setLangOpen]     = useState(false);
  const [selected, setSelected]     = useState(CATEGORIES[0].id);
  const [workerKey, setWorkerKey]   = useState(0);
  const [isMobile, setIsMobile]     = useState(false);
  const [catOpen, setCatOpen]       = useState(false);  // mobile collapse
  const [headerVis, setHeaderVis]   = useState(false);
  const [search, setSearch]         = useState("");

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 700);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setHeaderVis(true), 70);
    return () => clearTimeout(t);
  }, []);

  const handleSelect = (id) => {
    setSelected(id);
    setWorkerKey(k => k + 1);
    if (isMobile) setCatOpen(false);
  };

  const activeCat  = CATEGORIES.find(c => c.id === selected) || CATEGORIES[0];
  const workers    = makeWorkers(selected);
  const filtered   = search
    ? workers.filter(w => w.name.toLowerCase().includes(search.toLowerCase()) || w.phone.includes(search))
    : workers;

  const L = {
    title:    lang==="mr" ? "कामगार सेवा केंद्र"       : "Labour Service Centre",
    subtitle: lang==="mr" ? "कुशल कामगार शोधा · कराड"  : "Find Skilled Workers · Karad",
    catLabel: lang==="mr" ? "विभाग निवडा"               : "Select Category",
    searchPh: lang==="mr" ? "कामगार शोधा…"              : "Search worker…",
    found:    lang==="mr" ? "कामगार सापडले"             : "workers found",
    noResult: lang==="mr" ? "कामगार सापडला नाही"        : "No workers found",
    registered: lang==="mr" ? "नोंदणीकृत कामगार"       : "Registered Workers",
    verified:   lang==="mr" ? "सत्यापित"                : "Verified",
    total:      lang==="mr" ? "एकूण विभाग"              : "Departments",
    avail:      lang==="mr" ? "उपलब्ध"                  : "Available",
  };

  return (
    <div style={{ minHeight:"100vh", background:T.bg, fontFamily:T.font, color:T.text }}>
      <Navbar/>

      {/* ── Govt authority header ── */}
      <div style={{
        background:`linear-gradient(100deg, ${T.govBlue} 0%, #00448f 55%, ${T.govBlueMid} 100%)`,
        borderBottom:`3px solid ${T.saffron}`,
        opacity: headerVis ? 1 : 0,
        transform: headerVis ? "none" : "translateY(-10px)",
        transition:"opacity 0.45s ease, transform 0.45s ease",
      }}>
        <div style={{ maxWidth:1100, margin:"0 auto", padding: isMobile ? "18px 14px" : "26px 24px" }}>
          <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:12 }}>
            <div>
              {/* Tricolor bar */}
              <div style={{ display:"flex", gap:4, marginBottom:10 }}>
                {[T.saffron, "#ffffff", T.green].map((c,i) => (
                  <div key={i} style={{ width:30, height:5, background:c, borderRadius:2, opacity: c==="#ffffff"?0.7:1 }}/>
                ))}
              </div>
              <h1 style={{
                margin:0, color:"white", fontWeight:900,
                fontSize:"clamp(1.1rem,4vw,1.75rem)",
                lineHeight:1.2, fontFamily:T.font, letterSpacing:"-0.3px",
              }}>
                {L.title}
              </h1>
              <p style={{ margin:"5px 0 0", color:"rgba(255,255,255,0.6)", fontSize:"0.8rem" }}>
                {L.subtitle}
              </p>
            </div>
            {/* Ministry badge */}
            <div style={{
              flexShrink:0, background:"rgba(255,255,255,0.1)",
              border:"1px solid rgba(255,255,255,0.2)",
              borderRadius:8, padding:"8px 14px", textAlign:"center",
            }}>
              <div style={{ fontSize:"0.62rem", color:"rgba(255,255,255,0.55)", marginBottom:2, letterSpacing:"0.3px" }}>
                {lang==="mr" ? "अंतर्गत" : "Under"}
              </div>
              <div style={{ fontSize:"0.75rem", color:"white", fontWeight:700, lineHeight:1.3 }}>
                {lang==="mr" ? "कामगार मंत्रालय" : "Ministry of Labour"}
              </div>
            </div>
          </div>

          {/* Stats strip */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:8, marginTop:16 }}>
            {[
              { label:L.registered, value:"२,५४०+" },
              { label:L.verified,   value:"१,८९०"   },
              { label:L.total,      value:CATEGORIES.length },
            ].map((s,i) => (
              <div key={i} style={{
                background:"rgba(255,255,255,0.08)", borderRadius:6,
                padding: isMobile ? "8px 10px" : "10px 16px",
                border:"1px solid rgba(255,255,255,0.12)", textAlign:"center",
              }}>
                <div style={{ fontSize:"clamp(1.1rem,3vw,1.5rem)", fontWeight:900, color:"white", lineHeight:1 }}>{s.value}</div>
                <div style={{ fontSize:"0.66rem", color:"rgba(255,255,255,0.5)", marginTop:3 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Body ── */}
      <div style={{ maxWidth:1100, margin:"0 auto", padding: isMobile ? "14px 12px 80px" : "22px 24px 80px" }}>

        {/* ── Category panel ── */}
        <div style={{
          background:T.card, borderRadius:T.radius,
          border:`1px solid ${T.border}`,
          boxShadow:T.shadow, marginBottom:14,
          overflow:"hidden",
        }}>
          {/* Panel header — tappable on mobile */}
          <div
            onClick={() => isMobile && setCatOpen(o=>!o)}
            style={{
              padding:"12px 16px",
              display:"flex", alignItems:"center", justifyContent:"space-between",
              background:`linear-gradient(90deg,${T.govBlue},${T.govBlueMid})`,
              cursor: isMobile ? "pointer" : "default",
              userSelect:"none",
            }}
          >
            <div style={{ display:"flex", alignItems:"center", gap:8 }}>
              <span style={{ color:T.accent, display:"flex" }}><HardHat size={15}/></span>
              <span style={{ color:"white", fontWeight:700, fontSize:"0.88rem", fontFamily:T.font }}>
                {L.catLabel}
              </span>
              {isMobile && (
                <span style={{
                  background:activeCat.soft, color:activeCat.color,
                  fontSize:"0.7rem", fontWeight:700,
                  padding:"2px 10px", borderRadius:20,
                  border:`1px solid ${activeCat.border}`,
                }}>
                  {lang==="mr" ? activeCat.mr : activeCat.en}
                </span>
              )}
            </div>
            {isMobile && (
              <ChevronDown size={16} color="white" style={{
                transform: catOpen ? "rotate(180deg)" : "rotate(0deg)",
                transition:"transform 0.28s ease",
              }}/>
            )}
          </div>

          {/* Grid — collapsible on mobile */}
          <div style={{
            maxHeight: isMobile && !catOpen ? 0 : "600px",
            overflow:"hidden",
            transition:"max-height 0.38s ease",
          }}>
            <div style={{ padding:"14px" }}>
              <div style={{
                display:"grid",
                gridTemplateColumns:"repeat(4,1fr)",
                gap:8,
              }}>
                {CATEGORIES.map((cat,i) => (
                  <CategoryButton
                    key={cat.id} cat={cat} index={i}
                    selected={selected===cat.id}
                    onClick={() => handleSelect(cat.id)}
                    lang={lang}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Selected category banner ── */}
        <div
          key={`banner-${selected}`}
          style={{
            display:"flex", alignItems:"center", justifyContent:"space-between",
            gap:10, flexWrap:"wrap",
            background:T.card,
            border:`1px solid ${activeCat.border}`,
            borderLeft:`4px solid ${activeCat.color}`,
            borderRadius:T.radius,
            padding:"12px 18px",
            marginBottom:12,
            boxShadow:`0 2px 10px ${activeCat.color}18`,
            animation:"popIn 0.28s cubic-bezier(.22,.68,0,1.35) both",
          }}
        >
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <div style={{
              width:36, height:36, borderRadius:8,
              background:activeCat.soft, color:activeCat.color,
              display:"flex", alignItems:"center", justifyContent:"center",
            }}>
              {activeCat.icon}
            </div>
            <div>
              <div style={{ fontWeight:800, fontSize:"0.95rem", color:activeCat.color, fontFamily:T.font }}>
                {lang==="mr" ? activeCat.mr : activeCat.en}
              </div>
              <div style={{ fontSize:"0.72rem", color:T.textMuted }}>
                {filtered.length} {L.found}
              </div>
            </div>
          </div>

          {/* Search bar */}
          <div style={{ position:"relative", flex:1, maxWidth:280, minWidth:160 }}>
            <Search size={13} style={{ position:"absolute", left:10, top:"50%", transform:"translateY(-50%)", color:T.textMuted }}/>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder={L.searchPh}
              style={{
                width:"100%", padding:"8px 10px 8px 30px",
                border:`1.5px solid ${T.border}`, borderRadius:6,
                fontSize:"0.8rem", color:T.text, background:T.bg,
                outline:"none", fontFamily:T.font, boxSizing:"border-box",
                transition:"border-color 0.18s",
              }}
              onFocus={e => { e.target.style.borderColor=T.govBlueMid; }}
              onBlur={e  => { e.target.style.borderColor=T.border; }}
            />
          </div>
        </div>

        {/* ── Worker table header ── */}
        <div style={{
          display:"grid",
          gridTemplateColumns:"2fr 1.4fr 1.6fr auto auto",
          gap:0, padding:"8px 16px",
          fontSize:"0.7rem", fontWeight:700,
          color:T.textMuted, letterSpacing:"0.4px",
          textTransform:"uppercase",
          marginBottom:6,
        }}>
          <span>{lang==="mr"?"नांव / रेटिंग":"Name / Rating"}</span>
          <span>{lang==="mr"?"संपर्क":"Contact"}</span>
          <span>{lang==="mr"?"स्थान / अनुभव":"Location / Exp"}</span>
          <span style={{ whiteSpace:"nowrap" }}>{lang==="mr"?"स्थिती":"Status"}</span>
          <span></span>
        </div>

        {/* ── Worker rows ── */}
        <div key={workerKey} style={{ display:"flex", flexDirection:"column", gap:6 }}>
          {filtered.length === 0 ? (
            <div style={{
              background:T.card, borderRadius:T.radius,
              border:`1px solid ${T.border}`,
              padding:"40px 20px", textAlign:"center",
              color:T.textMuted, boxShadow:T.shadow,
            }}>
              <Users size={28} style={{ margin:"0 auto 10px", display:"block", opacity:0.35 }}/>
              <div style={{ fontWeight:600, color:T.textSub }}>
                {L.noResult}
              </div>
            </div>
          ) : (
            filtered.map((w, i) => (
              <WorkerRow key={`${selected}-${w.id}`} worker={w} index={i} lang={lang}/>
            ))
          )}
        </div>
      </div>

      <Footer/>

      {/* ── Language FAB ── */}
      <div style={{ position:"fixed", bottom:24, right:24, zIndex:300 }}>
        {langOpen && (
          <div style={{
            position:"absolute", bottom:62, right:0,
            background:"white", borderRadius:10,
            boxShadow:"0 8px 30px rgba(0,0,0,0.14)",
            overflow:"hidden", minWidth:148,
            animation:"slideUp 0.18s ease both",
            border:`1px solid ${T.border}`,
          }}>
            {[{code:"mr",label:"🇮🇳  मराठी"},{code:"en",label:"🇬🇧  English"}].map(o=>(
              <button key={o.code}
                onClick={() => { setLang(o.code); setLangOpen(false); }}
                style={{
                  display:"flex", alignItems:"center", width:"100%",
                  padding:"10px 16px", border:"none", cursor:"pointer",
                  fontSize:"0.84rem", fontWeight:lang===o.code?700:500,
                  background: lang===o.code ? "#eff4ff" : "white",
                  color:      lang===o.code ? T.govBlue : T.textSub,
                  borderLeft: lang===o.code ? `3px solid ${T.govBlue}` : "3px solid transparent",
                  fontFamily:T.font, transition:"background 0.12s",
                }}
              >{o.label}</button>
            ))}
          </div>
        )}
        <button
          onClick={() => setLangOpen(o=>!o)}
          style={{
            width:50, height:50, borderRadius:"50%",
            background:`linear-gradient(135deg,${T.govBlue},${T.govBlueMid})`,
            border:`2px solid ${T.saffron}`,
            cursor:"pointer",
            display:"flex", alignItems:"center", justifyContent:"center",
            boxShadow:`0 4px 18px ${T.govBlue}55`,
            transition:"transform 0.2s ease",
          }}
          onMouseEnter={e => { e.currentTarget.style.transform="scale(1.1)"; }}
          onMouseLeave={e => { e.currentTarget.style.transform="scale(1)"; }}
        >
          <Globe size={20} color="white"/>
        </button>
      </div>

      <style>{`
        @keyframes popIn   { from{opacity:0;transform:scale(0.94)} to{opacity:1;transform:scale(1)} }
        @keyframes catPop  { from{opacity:0;transform:translateY(8px) scale(0.95)} to{opacity:1;transform:translateY(0) scale(1)} }
        @keyframes shimmer { from{background-position:-200% center} to{background-position:200% center} }
        @keyframes slideUp { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        * { box-sizing:border-box; }
        @media (max-width:600px) {
          /* worker rows stack to 2 cols on phone */
        }
        ::-webkit-scrollbar{width:6px}
        ::-webkit-scrollbar-track{background:#f0f3fa}
        ::-webkit-scrollbar-thumb{background:#b0bdda;border-radius:6px}
      `}</style>
    </div>
  );
}