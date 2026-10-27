import { useState, useEffect, useRef } from "react";
import {
  Globe, ChevronDown, Phone, Send, Shield, AlertTriangle,
  MapPin, Clock, CheckCircle, X, RefreshCw, Search,
  Volume2, Wine, Dice5, Sparkles, Ban, Pill, Store,
  Car, Music, Users, FileText, ChevronRight, BadgeAlert,
  Siren, ShieldCheck, Eye, BookOpen
} from "lucide-react";
import Navbar from "./navbar";
import Footer from "./footer";
import { useLang } from "./useLang";

// ── Design tokens (Police / Govt of Maharashtra) ──────────────────────────────
const T = {
  navy:      "#0a1628",   // deep police navy
  navyMid:   "#0d2347",
  navyLight: "#1a3a6b",
  saffron:   "#ff6600",   // Maharashtra govt saffron
  saffSoft:  "#fff4ec",
  gold:      "#c9a227",
  goldSoft:  "#fffaec",
  red:       "#c0392b",
  redSoft:   "#fdf3f2",
  green:     "#1a7a45",
  greenSoft: "#edfaf3",
  bg:        "#f0f2f7",
  card:      "#ffffff",
  border:    "#dde2ec",
  borderDk:  "#b8c1d4",
  text:      "#0d1b2e",
  textSub:   "#4a5672",
  textMuted: "#8896b0",
  shadow:    "0 1px 4px rgba(10,22,40,0.07), 0 4px 14px rgba(10,22,40,0.05)",
  shadowHov: "0 6px 24px rgba(10,22,40,0.13)",
  radius:    10,
  font:      "'Noto Sans Devanagari','Noto Sans','Segoe UI',system-ui,sans-serif",
};

// ── Complaint types (from screenshot) ────────────────────────────────────────
const COMPLAINT_TYPES = [
  { id:"vehicle",   mr:"गाडींचा आवाज",            en:"Vehicle Noise",        icon:<Car size={18}/>,     color:"#1565c0", soft:"#e8f0fe" },
  { id:"sound",     mr:"जोरात वाजणारा माईक/डी.जे.", en:"Loud Mic / DJ",        icon:<Music size={18}/>,   color:"#6a1b9a", soft:"#f3e5f5" },
  { id:"liquor",    mr:"बेकायदेशीर दारू विक्री",    en:"Illegal Liquor Sale",  icon:<Wine size={18}/>,    color:"#b71c1c", soft:"#ffebee" },
  { id:"matka",     mr:"मटका/प्रचार",               en:"Matka / Gambling",     icon:<Dice5 size={18}/>,   color:"#e65100", soft:"#fff3e0" },
  { id:"tantra",    mr:"तंत्र मंत्र (सर्व धर्मीय)", en:"Black Magic / Tantra", icon:<Sparkles size={18}/>,color:"#4a148c", soft:"#f3e5f5" },
  { id:"jadutona",  mr:"जादू टोणा",                 en:"Jadoo Tona",           icon:<Eye size={18}/>,     color:"#880e4f", soft:"#fce4ec" },
  { id:"gutka",     mr:"गुटखा व बंदी असणारे",       en:"Gutka / Banned Items", icon:<Ban size={18}/>,     color:"#37474f", soft:"#eceff1" },
  { id:"drugs",     mr:"अंमली पदार्थ",               en:"Drugs / Narcotics",    icon:<Pill size={18}/>,    color:"#1b5e20", soft:"#e8f5e9" },
  { id:"encroach",  mr:"अतिक्रमण",                  en:"Encroachment",         icon:<Store size={18}/>,   color:"#0277bd", soft:"#e1f5fe" },
  { id:"other",     mr:"इतर तक्रार",                en:"Other Complaint",      icon:<FileText size={18}/>,color:"#455a64", soft:"#eceff1" },
];

// ── Sample recent complaints ──────────────────────────────────────────────────
const RECENT = [
  { id:"PM-2024-0891", type:"sound",   mr:"जोरात माईक लावला आहे मध्यरात्री",     en:"Loud mic playing past midnight",      address:"मुख्य बाजार, कराड",  status:"pending",    date:"आज, ११:३०" },
  { id:"PM-2024-0888", type:"liquor",  mr:"दुकानात बेकायदेशीर दारू विकत आहेत",  en:"Illegal liquor being sold in shop",   address:"स्टँड जवळ, कराड",   status:"inprogress", date:"काल, ०८:१५" },
  { id:"PM-2024-0884", type:"vehicle", mr:"रात्री गाड्यांचा आवाज त्रासदायक आहे", en:"Vehicles making noise at night",     address:"एसटी रोड, कराड",    status:"resolved",   date:"१० ऑक्टो" },
  { id:"PM-2024-0880", type:"drugs",   mr:"परिसरात अंमली पदार्थ विकले जातात",    en:"Drugs being sold in the area",        address:"वसाहत, कराड",       status:"pending",    date:"०९ ऑक्टो" },
  { id:"PM-2024-0875", type:"matka",   mr:"घरात मटका चालत आहे",                  en:"Matka gambling running in house",     address:"गांधी चौक, कराड",   status:"inprogress", date:"०८ ऑक्टो" },
  { id:"PM-2024-0870", type:"gutka",   mr:"दुकानात गुटखा विकत आहेत",             en:"Gutka being sold in shop",            address:"बाजारपेठ, कराड",    status:"resolved",   date:"०७ ऑक्टो" },
];

const STATUS_CFG = {
  pending:    { mr:"प्रलंबित",     en:"Pending",     color:"#92400e", bg:"#fef9c3", border:"#fde68a", icon:<Clock size={11}/> },
  inprogress: { mr:"कार्यवाही",    en:"In Progress", color:"#1e40af", bg:"#dbeafe", border:"#bfdbfe", icon:<RefreshCw size={11}/> },
  resolved:   { mr:"निराकरण",      en:"Resolved",    color:"#166534", bg:"#dcfce7", border:"#86efac", icon:<CheckCircle size={11}/> },
};

// ── Complaint type chip ───────────────────────────────────────────────────────
function TypeChip({ ct, selected, onClick, lang }) {
  const [hov, setHov] = useState(false);
  const active = selected === ct.id;
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display:"flex", flexDirection:"column", alignItems:"center",
        justifyContent:"center", gap:5, padding:"11px 8px",
        background: active ? ct.color : hov ? ct.soft : T.card,
        color:      active ? "white"  : hov ? ct.color : T.textSub,
        border:     active ? `1.5px solid ${ct.color}` : `1.5px solid ${hov ? ct.color+"88" : T.border}`,
        borderRadius: T.radius,
        cursor:"pointer", fontFamily:T.font,
        fontWeight: active ? 700 : 500,
        fontSize:"clamp(0.62rem,1.5vw,0.72rem)", lineHeight:1.25,
        textAlign:"center",
        boxShadow: active ? `0 3px 12px ${ct.color}44` : T.shadow,
        transform: active ? "translateY(-2px)" : hov ? "translateY(-1px)" : "none",
        transition:"all 0.16s ease",
        minHeight:72,
      }}
    >
      <span style={{ opacity: active || hov ? 1 : 0.6 }}>{ct.icon}</span>
      <span>{lang==="mr" ? ct.mr.split("/")[0].trim() : ct.en.split("/")[0].trim()}</span>
    </button>
  );
}

// ── Recent complaint card ─────────────────────────────────────────────────────
function ComplaintCard({ c, index, lang }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  const [hov, setHov] = useState(false);
  const ct     = COMPLAINT_TYPES.find(t => t.id === c.type) || COMPLAINT_TYPES[9];
  const status = STATUS_CFG[c.status];

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if(e.isIntersecting) setVis(true); }, { threshold:0.05 });
    if(ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background:T.card,
        border:`1px solid ${hov ? T.borderDk : T.border}`,
        borderLeft:`4px solid ${ct.color}`,
        borderRadius:T.radius,
        padding:"13px 14px",
        boxShadow: hov ? T.shadowHov : T.shadow,
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(14px)",
        transition:`opacity 0.32s ease ${index*0.055}s, transform 0.32s ease ${index*0.055}s, box-shadow 0.18s, border-color 0.18s`,
        display:"flex", flexDirection:"column", gap:8,
      }}
    >
      <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:8 }}>
        <div style={{ display:"flex", alignItems:"center", gap:7, flex:1, minWidth:0 }}>
          <span style={{ color:ct.color, flexShrink:0 }}>{ct.icon}</span>
          <p style={{ margin:0, fontSize:"0.84rem", fontWeight:600, color:T.text, lineHeight:1.35, fontFamily:T.font }}>
            {lang==="mr" ? c.mr : c.en}
          </p>
        </div>
        <span style={{ display:"inline-flex", alignItems:"center", gap:3, flexShrink:0, fontSize:"0.66rem", fontWeight:700, color:status.color, background:status.bg, border:`1px solid ${status.border}`, borderRadius:20, padding:"2px 8px" }}>
          {status.icon} {lang==="mr" ? status.mr : status.en}
        </span>
      </div>
      <div style={{ display:"flex", alignItems:"center", gap:14, flexWrap:"wrap" }}>
        <span style={{ display:"flex", alignItems:"center", gap:4, fontSize:"0.71rem", color:T.textMuted }}>
          <MapPin size={11}/> {c.address}
        </span>
        <span style={{ display:"flex", alignItems:"center", gap:4, fontSize:"0.71rem", color:T.textMuted }}>
          <Clock size={11}/> {c.date}
        </span>
      </div>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", paddingTop:6, borderTop:`1px solid ${T.border}` }}>
        <span style={{ fontFamily:"monospace", fontSize:"0.69rem", color:T.textMuted, letterSpacing:"0.5px" }}>{c.id}</span>
        <button style={{ display:"flex", alignItems:"center", gap:3, fontSize:"0.7rem", color:ct.color, fontWeight:600, background:"none", border:"none", cursor:"pointer", fontFamily:T.font }}>
          {lang==="mr"?"तपशील":"View"} <ChevronRight size={12}/>
        </button>
      </div>
    </div>
  );
}

// ── Registration Form ─────────────────────────────────────────────────────────
function MitrForm({ lang, selectedType, onTypeSelect }) {
  const [form, setForm]       = useState({ type:"", address:"", phone:"", psNo:"" });
  const [submitted, setSubmit] = useState(false);
  const [loading, setLoading]  = useState(false);
  const [trackId, setTrackId]  = useState("");

  const L = {
    typeLabel:    lang==="mr" ? "तक्रारीचे स्वरूप"   : "Complaint Type",
    address:      lang==="mr" ? "पत्ता"               : "Address",
    phone:        lang==="mr" ? "मो."                 : "Mobile No.",
    psLabel:      lang==="mr" ? "पोलीस स्टेशन चा नंबर" : "Police Station Number",
    submit:       lang==="mr" ? "तक्रार नोंदवा"       : "Submit Complaint",
    placeholder:  lang==="mr" ? "उदा. मुख्य रस्ता, कराड" : "e.g. Main Road, Karad",
    phPlaceholder:lang==="mr" ? "मो. ९८९९९९९९९९"      : "Mobile number",
    psPlaceholder:lang==="mr" ? "पोलीस स्टेशन नंबर"   : "e.g. 02164-222333",
    required:     lang==="mr" ? "आवश्यक फील्ड भरा"   : "Please fill required fields",
    typeTip:      lang==="mr" ? "वरून तक्रारीचा प्रकार निवडा" : "Select type from above",
  };

  const inputBase = {
    width:"100%", padding:"10px 13px",
    border:`1.5px solid ${T.border}`, borderRadius:7,
    fontSize:"0.85rem", color:T.text, background:"white",
    outline:"none", fontFamily:T.font,
    transition:"border-color 0.18s, box-shadow 0.18s",
    boxSizing:"border-box",
  };
  const focusIn  = e => { e.target.style.borderColor=T.navyLight; e.target.style.boxShadow=`0 0 0 3px rgba(26,58,107,0.12)`; };
  const focusOut = e => { e.target.style.borderColor=T.border;    e.target.style.boxShadow="none"; };
  const lbl      = txt => <label style={{ display:"block", fontSize:"0.74rem", fontWeight:700, color:T.textSub, marginBottom:5, fontFamily:T.font }}>{txt}</label>;

  const handleSubmit = e => {
    e.preventDefault();
    if (!form.address || !form.phone) return;
    setLoading(true);
    const id = "PM-2024-" + Math.floor(800 + Math.random()*200);
    setTimeout(() => { setLoading(false); setTrackId(id); setSubmit(true); }, 1200);
  };

  if (submitted) return (
    <div style={{ textAlign:"center", padding:"28px 16px" }}>
      <div style={{ width:54, height:54, borderRadius:"50%", background:T.greenSoft, border:"2px solid #86efac", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 12px" }}>
        <ShieldCheck size={26} color={T.green}/>
      </div>
      <h3 style={{ margin:"0 0 5px", fontSize:"0.96rem", fontWeight:800, color:T.text, fontFamily:T.font }}>
        {lang==="mr" ? "तक्रार नोंदवली गेली!" : "Complaint Registered!"}
      </h3>
      <p style={{ margin:"0 0 12px", fontSize:"0.78rem", color:T.textSub }}>
        {lang==="mr" ? "तुमचा तक्रार क्रमांक:" : "Your complaint ID:"}
      </p>
      <div style={{ background:T.goldSoft, border:`1.5px solid ${T.gold}`, borderRadius:7, padding:"9px 18px", display:"inline-block", fontFamily:"monospace", fontSize:"0.98rem", fontWeight:800, color:T.navyMid, letterSpacing:"1px" }}>
        {trackId}
      </div>
      <p style={{ margin:"10px 0 0", fontSize:"0.73rem", color:T.textMuted }}>
        {lang==="mr" ? "हा क्रमांक जतन करा. ७२ तासांत कार्यवाही होईल." : "Save this ID. Action will be taken within 72 hours."}
      </p>
      <button onClick={() => { setSubmit(false); setForm({type:"",address:"",phone:"",psNo:""}); onTypeSelect(null); }}
        style={{ marginTop:16, background:T.navy, color:"white", border:"none", borderRadius:7, padding:"9px 20px", fontSize:"0.8rem", fontWeight:700, cursor:"pointer", fontFamily:T.font }}>
        {lang==="mr" ? "नवीन तक्रार" : "New Complaint"}
      </button>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} style={{ display:"flex", flexDirection:"column", gap:13 }}>
      {/* Selected type display */}
      <div>
        {lbl(L.typeLabel)}
        {selectedType ? (
          <div style={{ display:"flex", alignItems:"center", gap:8, padding:"9px 12px", background:COMPLAINT_TYPES.find(c=>c.id===selectedType)?.soft||T.bg, border:`1.5px solid ${COMPLAINT_TYPES.find(c=>c.id===selectedType)?.color||T.border}`, borderRadius:7 }}>
            <span style={{ color:COMPLAINT_TYPES.find(c=>c.id===selectedType)?.color }}>{COMPLAINT_TYPES.find(c=>c.id===selectedType)?.icon}</span>
            <span style={{ fontSize:"0.83rem", fontWeight:700, color:COMPLAINT_TYPES.find(c=>c.id===selectedType)?.color, flex:1, fontFamily:T.font }}>
              {lang==="mr" ? COMPLAINT_TYPES.find(c=>c.id===selectedType)?.mr : COMPLAINT_TYPES.find(c=>c.id===selectedType)?.en}
            </span>
            <button type="button" onClick={() => onTypeSelect(null)} style={{ background:"none", border:"none", cursor:"pointer", color:T.textMuted, display:"flex" }}><X size={14}/></button>
          </div>
        ) : (
          <div style={{ padding:"9px 12px", background:T.bg, border:`1.5px dashed ${T.borderDk}`, borderRadius:7, fontSize:"0.78rem", color:T.textMuted, fontFamily:T.font, display:"flex", alignItems:"center", gap:6 }}>
            <AlertTriangle size={13}/> {L.typeTip}
          </div>
        )}
      </div>

      {/* Address */}
      <div>
        {lbl(L.address)}
        <input style={inputBase} placeholder={L.placeholder}
          value={form.address} onChange={e=>setForm(p=>({...p,address:e.target.value}))}
          onFocus={focusIn} onBlur={focusOut}/>
      </div>

      {/* Mobile */}
      <div>
        {lbl(L.phone)}
        <input style={inputBase} placeholder={L.phPlaceholder} type="tel"
          value={form.phone} onChange={e=>setForm(p=>({...p,phone:e.target.value}))}
          onFocus={focusIn} onBlur={focusOut}/>
      </div>

      {/* Police Station — WhatsApp-style green field (matches screenshot) */}
      <div>
        {lbl(L.psLabel)}
        <div style={{ position:"relative" }}>
          <div style={{ position:"absolute", left:11, top:"50%", transform:"translateY(-50%)", width:22, height:22, borderRadius:"50%", background:"#25D366", display:"flex", alignItems:"center", justifyContent:"center" }}>
            <Phone size={11} color="white"/>
          </div>
          <input
            style={{ ...inputBase, paddingLeft:42, background:"#e8fbe8", borderColor:"#a7f3a0" }}
            placeholder={L.psPlaceholder}
            value={form.psNo} onChange={e=>setForm(p=>({...p,psNo:e.target.value}))}
            onFocus={e => { e.target.style.borderColor="#25D366"; e.target.style.boxShadow="0 0 0 3px rgba(37,211,102,0.12)"; }}
            onBlur={e  => { e.target.style.borderColor="#a7f3a0"; e.target.style.boxShadow="none"; }}
          />
        </div>
      </div>

      {/* Complaint text reminder (from screenshot's body copy) */}
      <div style={{ background:T.goldSoft, border:`1px solid ${T.gold}44`, borderRadius:7, padding:"10px 13px" }}>
        <p style={{ margin:0, fontSize:"0.73rem", color:"#5a3e00", lineHeight:1.65, fontFamily:T.font }}>
          {lang==="mr"
            ? "तक्रारीच्या स्वरूपात गाडींचा आवाज, जोरात वाजणारा माईक/डी.जे., बेकायदेशीर दारू विक्री, मटका, प्रचार, तंत्र मंत्र (सर्व धर्मीय), जादू टोणा, गुटखा व बंदी असणारे अंमली पदार्थ, या सोबत जागा, दुकान यांचा पत्ता लिहणे."
            : "Complaints can include: vehicle noise, loud mic/DJ, illegal liquor, matka/gambling, black magic, gutka & banned substances. Please include the full address of the location/shop."}
        </p>
      </div>

      <button type="submit" disabled={loading || !form.address || !form.phone}
        style={{
          background: (!form.address || !form.phone) ? T.border : `linear-gradient(135deg,${T.navy},${T.navyLight})`,
          color: (!form.address || !form.phone) ? T.textMuted : "white",
          border:"none", borderRadius:7, padding:"12px",
          fontSize:"0.87rem", fontWeight:700,
          cursor: (!form.address || !form.phone) ? "not-allowed" : "pointer",
          display:"flex", alignItems:"center", justifyContent:"center", gap:7,
          fontFamily:T.font, transition:"opacity 0.18s",
          boxShadow: (!form.address || !form.phone) ? "none" : `0 4px 16px rgba(10,22,40,0.3)`,
        }}
        onMouseEnter={e => { if(form.address && form.phone && !loading) e.currentTarget.style.opacity="0.88"; }}
        onMouseLeave={e => { e.currentTarget.style.opacity="1"; }}
      >
        {loading
          ? <><RefreshCw size={14} style={{animation:"spin 0.8s linear infinite"}}/> {lang==="mr"?"नोंदवत आहे…":"Submitting…"}</>
          : <><Send size={14}/> {L.submit}</>
        }
      </button>
    </form>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function PoliceMitr() {
  const { lang, setLang } = useLang();
  const [langOpen, setLangOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [headerVis, setHeaderVis] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [selectedType, setSelectedType] = useState(null);
  const [searchQ, setSearchQ]   = useState("");
  const [statusFil, setStatusFil] = useState("all");

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 720);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setHeaderVis(true), 60);
    return () => clearTimeout(t);
  }, []);

  // When user picks a type on mobile, auto-open the form
  const handleTypeSelect = (id) => {
    setSelectedType(id);
    if (isMobile && id) setFormOpen(true);
  };

  const L = {
    title:     lang==="mr" ? "पोलीस मित्र"                : "Police Mitra",
    subtitle:  lang==="mr" ? "तक्रारीची माहिती भरा."       : "File a Police Complaint",
    formHead:  lang==="mr" ? "तक्रार नोंदवा"              : "Register Complaint",
    recent:    lang==="mr" ? "अलीकडील तक्रारी"            : "Recent Complaints",
    selectType:lang==="mr" ? "तक्रारीचा प्रकार निवडा"     : "Select Complaint Type",
    search:    lang==="mr" ? "तक्रार शोधा…"               : "Search complaints…",
    allStatus: lang==="mr" ? "सर्व"                       : "All",
    found:     lang==="mr" ? "तक्रारी"                    : "complaints",
    emergency: lang==="mr" ? "आपत्कालीन: 100"             : "Emergency: 100",
  };

  const stats = {
    total:    RECENT.length,
    pending:  RECENT.filter(c=>c.status==="pending").length,
    progress: RECENT.filter(c=>c.status==="inprogress").length,
    resolved: RECENT.filter(c=>c.status==="resolved").length,
  };

  const filtered = RECENT
    .filter(c => !selectedType || c.type === selectedType)
    .filter(c => statusFil==="all" || c.status===statusFil)
    .filter(c => !searchQ || (lang==="mr"?c.mr:c.en).toLowerCase().includes(searchQ.toLowerCase()));

  return (
    <div style={{ minHeight:"100vh", background:T.bg, fontFamily:T.font, color:T.text }}>
      <Navbar/>

      {/* ── Hero banner ── */}
      <div style={{
        background:`linear-gradient(135deg, ${T.navy} 0%, ${T.navyMid} 55%, ${T.navyLight} 100%)`,
        borderBottom:`3px solid ${T.saffron}`,
        opacity: headerVis ? 1 : 0,
        transform: headerVis ? "none" : "translateY(-12px)",
        transition:"opacity 0.45s ease, transform 0.45s ease",
      }}>
        <div style={{ maxWidth:1100, margin:"0 auto", padding: isMobile ? "18px 14px 16px" : "26px 24px 20px" }}>

          {/* Top row */}
          <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:10, marginBottom:16 }}>
            <div style={{ display:"flex", gap:14, alignItems:"center" }}>
              {/* Police shield badge */}
              <div style={{
                width: isMobile?44:54, height: isMobile?44:54, borderRadius:"50%",
                background:"rgba(255,255,255,0.1)",
                border:"2px solid rgba(255,255,255,0.2)",
                display:"flex", alignItems:"center", justifyContent:"center",
                flexShrink:0,
                boxShadow:"0 2px 12px rgba(0,0,0,0.2)",
              }}>
                <Shield size={isMobile?22:28} color={T.saffron}/>
              </div>
              <div>
                {/* Maharashtra tricolor dots */}
                <div style={{ display:"flex", gap:4, marginBottom:5 }}>
                  {["#ff6600","#ffffff","#138808"].map((c,i) => (
                    <div key={i} style={{ width:22, height:4, background:c, borderRadius:2 }}/>
                  ))}
                </div>
                <h1 style={{ margin:0, color:"white", fontWeight:900, fontSize:"clamp(1.15rem,4vw,1.85rem)", letterSpacing:"-0.3px", lineHeight:1.15, fontFamily:T.font }}>
                  {L.title}
                </h1>
                <p style={{ margin:"4px 0 0", color:"rgba(255,255,255,0.55)", fontSize:"0.78rem" }}>
                  {lang==="mr" ? "कराड पोलीस · महाराष्ट्र" : "Karad Police · Maharashtra"}
                </p>
              </div>
            </div>

            {/* Emergency + form CTA */}
            <div style={{ display:"flex", flexDirection:"column", gap:7, alignItems:"flex-end" }}>
              <a href="tel:100" style={{
                display:"flex", alignItems:"center", gap:6,
                background:T.red, color:"white",
                border:"none", borderRadius:7,
                padding:"7px 14px", fontSize:"0.78rem", fontWeight:800,
                textDecoration:"none", cursor:"pointer",
                boxShadow:`0 2px 10px rgba(192,57,43,0.5)`,
                fontFamily:T.font,
                animation:"pulse 2s ease infinite",
              }}>
                <Siren size={14}/> {L.emergency}
              </a>
              <button
                onClick={() => { if(isMobile) setFormOpen(o=>!o); }}
                style={{
                  display:"flex", alignItems:"center", gap:5,
                  background:T.saffron, color:"white",
                  border:"none", borderRadius:7,
                  padding:"7px 14px", fontSize:"0.76rem", fontWeight:700,
                  cursor:"pointer", fontFamily:T.font,
                  boxShadow:`0 2px 10px rgba(255,102,0,0.4)`,
                  transition:"transform 0.15s",
                  whiteSpace:"nowrap",
                }}
                onMouseEnter={e=>e.currentTarget.style.transform="scale(1.03)"}
                onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}
              >
                <BadgeAlert size={13}/>
                {lang==="mr" ? "तक्रार नोंदवा" : "File Complaint"}
              </button>
            </div>
          </div>

          {/* Stats row */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:8 }}>
            {[
              { label:lang==="mr"?"एकूण":"Total",         val:stats.total,    c:"rgba(255,255,255,0.9)" },
              { label:lang==="mr"?"प्रलंबित":"Pending",    val:stats.pending,  c:"#fde68a" },
              { label:lang==="mr"?"कार्यवाही":"Progress",  val:stats.progress, c:"#93c5fd" },
              { label:lang==="mr"?"निराकरण":"Resolved",    val:stats.resolved, c:"#86efac" },
            ].map((s,i) => (
              <div key={i} style={{ background:"rgba(255,255,255,0.07)", borderRadius:7, padding: isMobile?"7px 8px":"9px 12px", border:"1px solid rgba(255,255,255,0.1)", textAlign:"center" }}>
                <div style={{ fontSize:"clamp(1rem,3vw,1.5rem)", fontWeight:900, color:s.c, lineHeight:1 }}>{s.val}</div>
                <div style={{ fontSize:"0.64rem", color:"rgba(255,255,255,0.5)", marginTop:3 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Body ── */}
      <div style={{ maxWidth:1100, margin:"0 auto", padding: isMobile ? "14px 12px 80px" : "22px 24px 80px" }}>
        <div style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 340px", gap:18, alignItems:"start" }}>

          {/* LEFT — type grid + recent complaints */}
          <div style={{ display:"flex", flexDirection:"column", gap:14 }}>

            {/* Type selection grid */}
            <div style={{ background:T.card, borderRadius:T.radius, border:`1px solid ${T.border}`, boxShadow:T.shadow, overflow:"hidden" }}>
              <div style={{ background:`linear-gradient(90deg,${T.navy},${T.navyLight})`, padding:"11px 16px", display:"flex", alignItems:"center", gap:8 }}>
                <BookOpen size={15} color={T.saffron}/>
                <span style={{ color:"white", fontWeight:800, fontSize:"0.88rem", fontFamily:T.font }}>
                  {L.selectType}
                </span>
                {selectedType && (
                  <button onClick={() => setSelectedType(null)}
                    style={{ marginLeft:"auto", background:"rgba(255,255,255,0.15)", border:"none", borderRadius:5, padding:"3px 9px", color:"white", fontSize:"0.7rem", cursor:"pointer", display:"flex", alignItems:"center", gap:4, fontFamily:T.font }}>
                    <X size={11}/> {lang==="mr"?"साफ":"Clear"}
                  </button>
                )}
              </div>
              <div style={{ padding:"12px", display:"grid", gridTemplateColumns: isMobile ? "repeat(4,1fr)" : "repeat(5,1fr)", gap:8 }}>
                {COMPLAINT_TYPES.map(ct => (
                  <TypeChip key={ct.id} ct={ct}
                    selected={selectedType}
                    onClick={() => handleTypeSelect(selectedType===ct.id ? null : ct.id)}
                    lang={lang}/>
                ))}
              </div>
            </div>

            {/* Search + filter */}
            <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
              <div style={{ position:"relative", flex:1, minWidth:150 }}>
                <Search size={13} style={{ position:"absolute", left:10, top:"50%", transform:"translateY(-50%)", color:T.textMuted }}/>
                <input value={searchQ} onChange={e=>setSearchQ(e.target.value)} placeholder={L.search}
                  style={{ width:"100%", padding:"9px 10px 9px 31px", border:`1.5px solid ${T.border}`, borderRadius:7, fontSize:"0.82rem", color:T.text, background:"white", outline:"none", fontFamily:T.font, boxSizing:"border-box", transition:"border-color 0.18s" }}
                  onFocus={e=>e.target.style.borderColor=T.navyLight}
                  onBlur={e=>e.target.style.borderColor=T.border}/>
                {searchQ && <button onClick={()=>setSearchQ("")} style={{ position:"absolute", right:7, top:"50%", transform:"translateY(-50%)", background:"none", border:"none", cursor:"pointer", display:"flex", color:T.textMuted }}><X size={13}/></button>}
              </div>
              <select value={statusFil} onChange={e=>setStatusFil(e.target.value)}
                style={{ padding:"9px 11px", border:`1.5px solid ${T.border}`, borderRadius:7, fontSize:"0.8rem", color:T.text, background:"white", cursor:"pointer", outline:"none", fontFamily:T.font }}>
                <option value="all">{L.allStatus}</option>
                <option value="pending">{lang==="mr"?"प्रलंबित":"Pending"}</option>
                <option value="inprogress">{lang==="mr"?"कार्यवाही":"In Progress"}</option>
                <option value="resolved">{lang==="mr"?"निराकरण":"Resolved"}</option>
              </select>
            </div>

            {/* Count */}
            <p style={{ margin:0, fontSize:"0.78rem", color:T.textSub }}>
              <strong style={{ color:T.text }}>{filtered.length}</strong> {L.found}
            </p>

            {/* Complaint list */}
            <div style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fill, minmax(280px,1fr))", gap:10 }}>
              {filtered.length === 0 ? (
                <div style={{ gridColumn:"1/-1", background:T.card, borderRadius:T.radius, border:`1px solid ${T.border}`, padding:"48px 20px", textAlign:"center", boxShadow:T.shadow }}>
                  <Shield size={28} color={T.textMuted} style={{ margin:"0 auto 10px", display:"block", opacity:0.35 }}/>
                  <div style={{ fontWeight:600, color:T.textSub, marginBottom:4 }}>{lang==="mr"?"तक्रार सापडली नाही":"No complaints found"}</div>
                  <button onClick={() => { setSearchQ(""); setSelectedType(null); setStatusFil("all"); }}
                    style={{ marginTop:10, background:T.navy, color:"white", border:"none", borderRadius:7, padding:"7px 16px", fontSize:"0.77rem", fontWeight:600, cursor:"pointer", fontFamily:T.font }}>
                    {lang==="mr"?"सर्व दाखवा":"Show all"}
                  </button>
                </div>
              ) : (
                filtered.map((c,i) => <ComplaintCard key={c.id} c={c} index={i} lang={lang}/>)
              )}
            </div>
          </div>

          {/* RIGHT — form */}
          <div style={{
            background:T.card, borderRadius:T.radius, border:`1px solid ${T.border}`,
            overflow:"hidden", boxShadow:T.shadow,
            position: isMobile ? "static" : "sticky", top:80,
          }}>
            {/* Panel header — tappable on mobile */}
            <div
              onClick={() => isMobile && setFormOpen(o=>!o)}
              style={{
                background:`linear-gradient(90deg,${T.navy},${T.navyLight})`,
                borderBottom:`3px solid ${T.saffron}`,
                padding:"13px 18px",
                display:"flex", alignItems:"center", justifyContent:"space-between",
                cursor: isMobile ? "pointer" : "default", userSelect:"none",
              }}
            >
              <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                <BadgeAlert size={16} color={T.saffron}/>
                <span style={{ color:"white", fontWeight:800, fontSize:"0.9rem", fontFamily:T.font }}>
                  {L.formHead}
                </span>
              </div>
              {isMobile && (
                <ChevronDown size={16} color="white" style={{ transform:formOpen?"rotate(180deg)":"rotate(0deg)", transition:"transform 0.28s ease" }}/>
              )}
            </div>

            {/* Form body — collapsible on mobile */}
            <div style={{ maxHeight: isMobile && !formOpen ? 0 : "900px", overflow:"hidden", transition:"max-height 0.42s ease" }}>
              <div style={{ padding:"18px" }}>
                <MitrForm lang={lang} selectedType={selectedType} onTypeSelect={handleTypeSelect}/>
              </div>
            </div>

            {/* Helpline strip */}
            {!isMobile && (
              <div style={{ padding:"12px 18px", borderTop:`1px solid ${T.border}`, background:T.bg, display:"flex", gap:8 }}>
                {[
                  { label:"पोलीस", num:"100", color:T.red },
                  { label:"महिला", num:"1091", color:"#7b1fa2" },
                  { label:"साइबर", num:"1930", color:T.navyLight },
                ].map((h,i) => (
                  <a key={i} href={`tel:${h.num}`} style={{
                    flex:1, display:"flex", flexDirection:"column", alignItems:"center",
                    gap:2, padding:"8px 4px", borderRadius:7,
                    background:"white", border:`1px solid ${T.border}`,
                    textDecoration:"none", transition:"border-color 0.15s",
                  }}
                    onMouseEnter={e=>e.currentTarget.style.borderColor=h.color}
                    onMouseLeave={e=>e.currentTarget.style.borderColor=T.border}>
                    <Phone size={13} color={h.color}/>
                    <span style={{ fontSize:"0.72rem", fontWeight:800, color:h.color }}>{h.num}</span>
                    <span style={{ fontSize:"0.62rem", color:T.textMuted }}>{h.label}</span>
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer/>

      {/* ── Language FAB ── */}
      <div className="legacy-language-switcher" style={{ position:"fixed", bottom:24, right:24, zIndex:300 }}>
        {langOpen && (
          <div style={{ position:"absolute", bottom:62, right:0, background:"white", borderRadius:T.radius, boxShadow:T.shadowHov, overflow:"hidden", minWidth:148, animation:"slideUp 0.17s ease both", border:`1px solid ${T.border}` }}>
            {[{code:"mr",label:"🇮🇳  मराठी"},{code:"en",label:"🇬🇧  English"}].map(o=>(
              <button key={o.code} onClick={()=>{setLang(o.code);setLangOpen(false);}}
                style={{ display:"flex", alignItems:"center", width:"100%", padding:"10px 16px", border:"none", cursor:"pointer", fontSize:"0.83rem", fontWeight:lang===o.code?700:500, background:lang===o.code?"#eef2f9":"white", color:lang===o.code?T.navy:T.textSub, borderLeft:lang===o.code?`3px solid ${T.navy}`:"3px solid transparent", fontFamily:T.font, transition:"background 0.12s" }}>
                {o.label}
              </button>
            ))}
          </div>
        )}
        <button
          onClick={()=>setLangOpen(o=>!o)}
          style={{
            width:50, height:50, borderRadius:"50%",
            background:`linear-gradient(135deg,${T.navy},${T.navyLight})`,
            border:`2px solid ${T.saffron}`,
            cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center",
            boxShadow:`0 4px 18px rgba(10,22,40,0.45)`,
            transition:"transform 0.2s ease",
          }}
          onMouseEnter={e=>e.currentTarget.style.transform="scale(1.1)"}
          onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}
        >
          <Globe size={20} color="white"/>
        </button>
      </div>

      <style>{`
        @keyframes slideUp { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        @keyframes spin    { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes pulse   { 0%,100%{box-shadow:0 2px 10px rgba(192,57,43,0.5)} 50%{box-shadow:0 2px 18px rgba(192,57,43,0.85)} }
        * { box-sizing:border-box; }
        ::-webkit-scrollbar{width:5px}
        ::-webkit-scrollbar-track{background:#f0f2f7}
        ::-webkit-scrollbar-thumb{background:#b8c1d4;border-radius:5px}
        select option{background:white;color:#0d1b2e}
      `}</style>
    </div>
  );
}