import { useState, useEffect, useRef } from "react";
import {
  AlertTriangle, CheckCircle, Clock, MapPin, Phone, Upload,
  ChevronDown, ChevronRight, X, Globe, FileText, Send,
  Trash2, Droplets, Zap, Construction, Trees, Car,
  Building, WifiOff, ShieldAlert, MoreHorizontal, Search,
  Bell, User, Menu, ArrowRight, Camera, RefreshCw
} from "lucide-react";
import Navbar from "./navbar";
import Footer from "./footer";

// ─── Design tokens (MCGM/Govt India palette) ─────────────────────────────────
const T = {
  govBlue:    "#003580",   // deep navy — authority
  govBlueMid: "#0056b3",
  govBlueHov: "#004494",
  accent:     "#f5a623",   // amber — municipal/govt warmth (matches BMC brand)
  accentDark: "#d4891a",
  accentSoft: "#fef8ec",
  red:        "#c0392b",
  redSoft:    "#fdf0ef",
  green:      "#1a7a45",
  greenSoft:  "#edfaf3",
  bg:         "#f2f5fa",
  pageBg:     "#eaeff7",
  card:       "#ffffff",
  border:     "#dce3ef",
  borderDark: "#b0bdda",
  text:       "#0d1b2e",
  textSub:    "#4a5a72",
  textMuted:  "#8896ae",
  shadow:     "0 1px 3px rgba(0,53,128,0.07), 0 4px 14px rgba(0,53,128,0.05)",
  shadowHov:  "0 4px 20px rgba(0,53,128,0.14)",
  radius:     8,
  font:       "'Noto Sans Devanagari','Noto Sans','Segoe UI',system-ui,sans-serif",
};

// ─── Categories ───────────────────────────────────────────────────────────────
const CATEGORIES = [
  { id:"drainage",  icon:<Droplets size={20}/>,     en:"Drainage",        mr:"गटार",           color:"#1565c0", soft:"#e8f0fe" },
  { id:"water",     icon:<Droplets size={20}/>,     en:"Water Supply",    mr:"पाणीपुरवठा",      color:"#0277bd", soft:"#e1f5fe" },
  { id:"road",      icon:<Construction size={20}/>, en:"Roads",           mr:"रस्ते",           color:"#4527a0", soft:"#ede7f6" },
  { id:"lights",    icon:<Zap size={20}/>,           en:"Street Lights",   mr:"दिवे",            color:"#e65100", soft:"#fff3e0" },
  { id:"garbage",   icon:<Trash2 size={20}/>,        en:"Garbage",         mr:"कचरा",            color:"#2e7d32", soft:"#e8f5e9" },
  { id:"trees",     icon:<Trees size={20}/>,         en:"Trees",           mr:"झाडे",            color:"#388e3c", soft:"#f1f8e9" },
  { id:"parking",   icon:<Car size={20}/>,           en:"Parking",         mr:"पार्किंग",        color:"#6a1b9a", soft:"#f3e5f5" },
  { id:"building",  icon:<Building size={20}/>,      en:"Construction",    mr:"बांधकाम",         color:"#795548", soft:"#efebe9" },
  { id:"encroach",  icon:<ShieldAlert size={20}/>,   en:"Encroachment",    mr:"अतिक्रमण",        color:"#c62828", soft:"#ffebee" },
  { id:"noise",     icon:<WifiOff size={20}/>,       en:"Noise",           mr:"आवाज",            color:"#00838f", soft:"#e0f7fa" },
  { id:"stray",     icon:<MoreHorizontal size={20}/>,en:"Stray Animals",   mr:"भटके प्राणी",     color:"#558b2f", soft:"#f9fbe7" },
  { id:"other",     icon:<FileText size={20}/>,      en:"Other",           mr:"इतर",             color:"#455a64", soft:"#eceff1" },
];

// ─── Sample complaints ────────────────────────────────────────────────────────
const BASE_COMPLAINTS = [
  { id:101, cat:"drainage", title:"आमच्या घरासमोरील गटार तुंबले आहे.",    date:"०८ ऑक्टोबर २०२४", citizen:"रमेश पाटील",    ward:"वॉर्ड ०५", status:"pending",    id_no:"NMC-2024-1101" },
  { id:102, cat:"garbage",  title:"आमच्या घरासमोरील कचरा उचलला नाही.",   date:"०७ ऑक्टोबर २०२४", citizen:"सुनिता देशमुख", ward:"वॉर्ड ०३", status:"inprogress", id_no:"NMC-2024-1098" },
  { id:103, cat:"lights",   title:"रस्त्यावरील दिवे बंद आहेत.",          date:"०६ ऑक्टोबर २०२४", citizen:"अहमद खान",      ward:"वॉर्ड ०८", status:"resolved",   id_no:"NMC-2024-1092" },
  { id:104, cat:"road",     title:"रस्त्यावर मोठे खड्डे पडले आहेत.",    date:"०५ ऑक्टोबर २०२४", citizen:"प्रिया जोशी",   ward:"वॉर्ड ०२", status:"pending",    id_no:"NMC-2024-1087" },
  { id:105, cat:"water",    title:"पाण्याचा पुरवठा बंद झाला आहे.",       date:"०४ ऑक्टोबर २०२४", citizen:"विजय कदम",      ward:"वॉर्ड ११", status:"inprogress", id_no:"NMC-2024-1081" },
  { id:106, cat:"drainage", title:"नाल्यातून दुर्गंधी येत आहे.",          date:"०३ ऑक्टोबर २०२४", citizen:"मीरा सावंत",    ward:"वॉर्ड ०७", status:"resolved",   id_no:"NMC-2024-1075" },
  { id:107, cat:"trees",    title:"झाड पडण्याच्या धोक्यात आहे.",         date:"०२ ऑक्टोबर २०२४", citizen:"सागर मोरे",     ward:"वॉर्ड ०४", status:"pending",    id_no:"NMC-2024-1069" },
  { id:108, cat:"building", title:"अनधिकृत बांधकाम सुरू आहे.",           date:"०१ ऑक्टोबर २०२४", citizen:"अनिता शिंदे",   ward:"वॉर्ड ०९", status:"inprogress", id_no:"NMC-2024-1062" },
  { id:109, cat:"garbage",  title:"भंगार आणि कचरा रस्त्यावर आहे.",       date:"३० सप्टें २०२४",  citizen:"रफिक शेख",      ward:"वॉर्ड ०१", status:"pending",    id_no:"NMC-2024-1055" },
];

// ─── Status config ────────────────────────────────────────────────────────────
const STATUS = {
  pending:    { en:"Pending",     mr:"प्रलंबित",    color:"#b45309", bg:"#fef9c3", border:"#fde68a", icon:<Clock size={12}/> },
  inprogress: { en:"In Progress", mr:"प्रगतीपथावर", color:"#1d4ed8", bg:"#dbeafe", border:"#bfdbfe", icon:<RefreshCw size={12}/> },
  resolved:   { en:"Resolved",    mr:"निराकरण झाले",color:"#15803d", bg:"#dcfce7", border:"#86efac", icon:<CheckCircle size={12}/> },
};

// ─── Complaint Card ───────────────────────────────────────────────────────────
function ComplaintCard({ c, index, lang }) {
  const ref   = useRef(null);
  const [vis, setVis] = useState(false);
  const [hov, setHov] = useState(false);
  const cat    = CATEGORIES.find(x => x.id === c.cat) || CATEGORIES[11];
  const status = STATUS[c.status];

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVis(true); },
      { threshold:0.06 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: T.card,
        border: `1px solid ${hov ? T.borderDark : T.border}`,
        borderTop: `3px solid ${cat.color}`,
        borderRadius: T.radius,
        padding: "16px",
        boxShadow: hov ? T.shadowHov : T.shadow,
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(12px)",
        transition: `opacity 0.3s ease ${index * 0.05}s, transform 0.3s ease ${index * 0.05}s, box-shadow 0.18s, border-color 0.18s`,
        display: "flex", flexDirection: "column", gap: 10,
        cursor: "default",
      }}
    >
      {/* Header row */}
      <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:8 }}>
        <div style={{
          width:36, height:36, borderRadius:8, flexShrink:0,
          background:cat.soft, display:"flex", alignItems:"center",
          justifyContent:"center", color:cat.color,
        }}>
          {cat.icon}
        </div>
        <span style={{
          display:"inline-flex", alignItems:"center", gap:4,
          fontSize:"0.68rem", fontWeight:700,
          color:status.color, background:status.bg,
          border:`1px solid ${status.border}`,
          borderRadius:20, padding:"3px 9px",
          flexShrink:0,
        }}>
          {status.icon}
          {lang==="mr" ? status.mr : status.en}
        </span>
      </div>

      {/* Complaint text */}
      <p style={{
        margin:0, fontSize:"0.86rem", fontWeight:600, color:T.text,
        lineHeight:1.45, fontFamily:T.font,
      }}>
        {c.title}
      </p>

      {/* Meta */}
      <div style={{ display:"flex", flexDirection:"column", gap:4 }}>
        <div style={{ display:"flex", alignItems:"center", gap:5, fontSize:"0.72rem", color:T.textSub }}>
          <User size={11} color={T.textMuted}/>
          <span>{c.citizen}</span>
          <span style={{ color:T.border }}>·</span>
          <MapPin size={11} color={T.textMuted}/>
          <span>{c.ward}</span>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:5, fontSize:"0.71rem", color:T.textMuted }}>
          <Clock size={11}/>
          <span>{c.date}</span>
          <span style={{ color:T.border }}>·</span>
          <span style={{ fontFamily:"monospace", letterSpacing:"0.3px", fontSize:"0.69rem" }}>{c.id_no}</span>
        </div>
      </div>

      {/* Bottom CTA */}
      <div style={{
        display:"flex", alignItems:"center", justifyContent:"space-between",
        paddingTop:8, borderTop:`1px solid ${T.border}`, marginTop:2,
      }}>
        <span style={{
          fontSize:"0.7rem", color:cat.color, fontWeight:600,
          background:cat.soft, padding:"2px 8px", borderRadius:4,
        }}>
          {lang==="mr" ? cat.mr : cat.en}
        </span>
        <button style={{
          display:"flex", alignItems:"center", gap:4,
          fontSize:"0.72rem", color:T.govBlueMid, fontWeight:600,
          background:"none", border:"none", cursor:"pointer",
          padding:0, fontFamily:T.font,
        }}>
          {lang==="mr" ? "तपशील" : "View details"} <ChevronRight size={12}/>
        </button>
      </div>
    </div>
  );
}

// ─── Category Filter Button ───────────────────────────────────────────────────
function CatButton({ cat, selected, onClick, lang }) {
  return (
    <button
      onClick={onClick}
      style={{
        display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
        gap:6, padding:"12px 8px",
        background: selected ? cat.color : T.card,
        color: selected ? "white" : T.textSub,
        border: selected ? `1.5px solid ${cat.color}` : `1.5px solid ${T.border}`,
        borderRadius: T.radius,
        cursor:"pointer", fontFamily:T.font,
        fontWeight: selected ? 700 : 500,
        fontSize:"0.74rem", lineHeight:1.2,
        boxShadow: selected ? `0 3px 12px ${cat.color}44` : T.shadow,
        transition:"all 0.16s ease",
        transform: selected ? "translateY(-1px)" : "none",
        minWidth:0,
      }}
      onMouseEnter={e => { if(!selected) { e.currentTarget.style.borderColor=cat.color; e.currentTarget.style.color=cat.color; e.currentTarget.style.background=cat.soft; } }}
      onMouseLeave={e => { if(!selected) { e.currentTarget.style.borderColor=T.border; e.currentTarget.style.color=T.textSub; e.currentTarget.style.background=T.card; } }}
    >
      <span style={{ opacity: selected ? 1 : 0.7 }}>{cat.icon}</span>
      <span style={{ textAlign:"center" }}>{lang==="mr" ? cat.mr : cat.en}</span>
    </button>
  );
}

// ─── Registration Form ────────────────────────────────────────────────────────
function ComplaintForm({ lang, onClose }) {
  const [form, setForm] = useState({ name:"", type:"", address:"", phone:"", photo:null });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]     = useState(false);
  const [trackId, setTrackId]     = useState("");

  const L = {
    name:    lang==="mr" ? "नांव"              : "Full Name",
    type:    lang==="mr" ? "कामाचे स्वरूप"    : "Complaint Type",
    address: lang==="mr" ? "पत्ता"            : "Address",
    phone:   lang==="mr" ? "मो."              : "Mobile No.",
    photo:   lang==="mr" ? "फोटो अपलोड करा"  : "Upload Photo",
    submit:  lang==="mr" ? "तक्रार नोंदवा"    : "Submit Complaint",
    whatsapp:lang==="mr" ? "तुमची तक्रार अपलोड करा. तक्रारीच्या खाली दिनांक दिसली पाहिजे" : "Upload your complaint. The date should appear below the complaint.",
  };
  const inputStyle = {
    width:"100%", padding:"10px 13px",
    border:`1.5px solid ${T.border}`, borderRadius:6,
    fontSize:"0.86rem", color:T.text, background:"white",
    outline:"none", fontFamily:T.font,
    transition:"border-color 0.18s, box-shadow 0.18s",
    boxSizing:"border-box",
  };
  const focus = e => { e.target.style.borderColor=T.govBlueMid; e.target.style.boxShadow=`0 0 0 3px ${T.govBlueMid}18`; };
  const blur  = e => { e.target.style.borderColor=T.border;     e.target.style.boxShadow="none"; };
  const label = (text) => (
    <label style={{ display:"block", fontSize:"0.76rem", fontWeight:600, color:T.textSub, marginBottom:5, fontFamily:T.font }}>
      {text}
    </label>
  );

  const handleSubmit = e => {
    e.preventDefault();
    if (!form.name || !form.phone) return;
    setLoading(true);
    const id = "NMC-2024-" + Math.floor(1000 + Math.random()*9000);
    setTimeout(() => { setLoading(false); setTrackId(id); setSubmitted(true); }, 1300);
  };

  if (submitted) return (
    <div style={{
      background:"white", borderRadius:T.radius, padding:"30px 24px",
      textAlign:"center", border:`1px solid ${T.border}`,
      boxShadow:T.shadow,
    }}>
      <div style={{
        width:56, height:56, borderRadius:"50%", background:T.greenSoft,
        display:"flex", alignItems:"center", justifyContent:"center",
        margin:"0 auto 14px", border:`2px solid #86efac`,
      }}>
        <CheckCircle size={26} color={T.green}/>
      </div>
      <h3 style={{ margin:"0 0 6px", fontSize:"1rem", color:T.text, fontWeight:800, fontFamily:T.font }}>
        {lang==="mr" ? "तक्रार यशस्वीरित्या नोंदवली!" : "Complaint Registered!"}
      </h3>
      <p style={{ margin:"0 0 14px", fontSize:"0.82rem", color:T.textSub }}>
        {lang==="mr" ? "आपला तक्रार क्रमांक:" : "Your complaint number:"}
      </p>
      <div style={{
        background:T.accentSoft, border:`1.5px solid ${T.accent}`,
        borderRadius:6, padding:"10px 20px", display:"inline-block",
        fontFamily:"monospace", fontSize:"1rem", fontWeight:700,
        color:T.accentDark, letterSpacing:"1px",
      }}>{trackId}</div>
      <p style={{ margin:"12px 0 0", fontSize:"0.76rem", color:T.textMuted }}>
        {lang==="mr" ? "हा क्रमांक जतन करा. तुमची तक्रार ७–१० कार्यदिवसांत सोडवली जाईल." : "Save this number. Your complaint will be resolved in 7–10 working days."}
      </p>
      <button onClick={() => { setSubmitted(false); setForm({name:"",type:"",address:"",phone:"",photo:null}); }}
        style={{
          marginTop:18, background:T.govBlue, color:"white",
          border:"none", borderRadius:6, padding:"9px 20px",
          fontSize:"0.82rem", fontWeight:700, cursor:"pointer",
          fontFamily:T.font,
        }}>
        {lang==="mr" ? "नवीन तक्रार" : "New Complaint"}
      </button>
    </div>
  );

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ display:"flex", flexDirection:"column", gap:13 }}>
        <div>
          {label(L.name)}
          <input style={inputStyle} placeholder={lang==="mr"?"उदा. रमेश पाटील":"e.g. Ramesh Patil"}
            value={form.name} onChange={e=>setForm(p=>({...p,name:e.target.value}))}
            onFocus={focus} onBlur={blur} />
        </div>
        <div>
          {label(L.type)}
          <select style={{...inputStyle, cursor:"pointer"}}
            value={form.type} onChange={e=>setForm(p=>({...p,type:e.target.value}))}
            onFocus={focus} onBlur={blur}>
            <option value="">{lang==="mr"?"निवडा — ":"Select type"}</option>
            {CATEGORIES.map(c=>(
              <option key={c.id} value={c.id}>{lang==="mr" ? c.mr : c.en}</option>
            ))}
          </select>
        </div>
        <div>
          {label(L.address)}
          <input style={inputStyle} placeholder={lang==="mr"?"उदा. मुख्य रस्ता, वॉर्ड ०५":"e.g. Main Road, Ward 05"}
            value={form.address} onChange={e=>setForm(p=>({...p,address:e.target.value}))}
            onFocus={focus} onBlur={blur} />
        </div>
        <div>
          {label(L.phone)}
          <input style={inputStyle} placeholder="मो. ९८९९९९९९९९" type="tel"
            value={form.phone} onChange={e=>setForm(p=>({...p,phone:e.target.value}))}
            onFocus={focus} onBlur={blur} />
        </div>

        {/* Photo upload strip */}
        <div style={{
          border:`1.5px dashed ${T.borderDark}`, borderRadius:6,
          padding:"12px 14px", background:T.bg,
          display:"flex", alignItems:"center", gap:10, cursor:"pointer",
        }}>
          <Camera size={18} color={T.textMuted}/>
          <span style={{ fontSize:"0.78rem", color:T.textSub, fontFamily:T.font }}>
            {L.photo}
          </span>
        </div>

        {/* WhatsApp hint */}
        <div style={{
          display:"flex", alignItems:"flex-start", gap:9,
          background:"#e7fbe6", border:"1px solid #a7f3a0",
          borderRadius:6, padding:"9px 12px",
        }}>
          <div style={{
            width:22, height:22, borderRadius:"50%",
            background:"#25D366", display:"flex", alignItems:"center",
            justifyContent:"center", flexShrink:0, marginTop:1,
          }}>
            <Phone size={12} color="white"/>
          </div>
          <span style={{ fontSize:"0.74rem", color:"#166534", lineHeight:1.5, fontFamily:T.font }}>
            {L.whatsapp}
          </span>
        </div>

        <button type="submit" disabled={loading || !form.name || !form.phone}
          style={{
            background: (!form.name || !form.phone) ? T.border : T.govBlue,
            color: (!form.name || !form.phone) ? T.textMuted : "white",
            border:"none", borderRadius:6, padding:"12px",
            fontSize:"0.88rem", fontWeight:700,
            cursor: (!form.name || !form.phone) ? "not-allowed" : "pointer",
            display:"flex", alignItems:"center", justifyContent:"center", gap:7,
            fontFamily:T.font, transition:"background 0.18s, transform 0.15s",
            boxShadow: (!form.name || !form.phone) ? "none" : `0 3px 12px ${T.govBlue}44`,
          }}
          onMouseEnter={e => { if(form.name && form.phone && !loading) e.currentTarget.style.background=T.govBlueHov; }}
          onMouseLeave={e => { if(form.name && form.phone) e.currentTarget.style.background=T.govBlue; }}
        >
          {loading
            ? <><RefreshCw size={15} style={{animation:"spin 0.8s linear infinite"}}/> {lang==="mr"?"नोंदवत आहे…":"Submitting…"}</>
            : <><Send size={15}/> {L.submit}</>
          }
        </button>
      </div>
    </form>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function ComplaintPortal() {
  const [lang, setLang]           = useState("mr");
  const [langOpen, setLangOpen]   = useState(false);
  const [isMobile, setIsMobile]   = useState(false);
  const [activeCat, setActiveCat] = useState(null);
  const [formOpen, setFormOpen]   = useState(false);
  const [headerVis, setHeaderVis] = useState(false);
  const [search, setSearch]       = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

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

  const L = {
    title:      lang==="mr" ? "नगरपालिका तक्रार"            : "Municipal Complaint",
    subtitle:   lang==="mr" ? "तक्रारीची माहिती भरा."       : "Register your complaint",
    cta:        lang==="mr" ? "नवीन तक्रार नोंदवा"          : "File a Complaint",
    complaints: lang==="mr" ? "नागरिकांच्या तक्रारी"        : "Citizen Complaints",
    allCats:    lang==="mr" ? "सर्व विभाग"                  : "All departments",
    allStatus:  lang==="mr" ? "सर्व स्थिती"                 : "All status",
    searchPh:   lang==="mr" ? "तक्रार शोधा…"                : "Search complaints…",
    found:      lang==="mr" ? "तक्रारी सापडल्या"            : "complaints found",
    formTitle:  lang==="mr" ? "तक्रारीची माहिती भरा."       : "File a Complaint",
    track:      lang==="mr" ? "तक्रार स्थिती तपासा"         : "Track Complaint",
  };

  const filtered = BASE_COMPLAINTS.filter(c => {
    const matchCat    = !activeCat || c.cat === activeCat;
    const matchStatus = statusFilter === "all" || c.status === statusFilter;
    const matchSearch = !search || c.title.toLowerCase().includes(search.toLowerCase())
      || c.citizen.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchStatus && matchSearch;
  });

  const stats = {
    total:    BASE_COMPLAINTS.length,
    pending:  BASE_COMPLAINTS.filter(c=>c.status==="pending").length,
    progress: BASE_COMPLAINTS.filter(c=>c.status==="inprogress").length,
    resolved: BASE_COMPLAINTS.filter(c=>c.status==="resolved").length,
  };

  return (
    <div style={{ minHeight:"100vh", background:T.pageBg, fontFamily:T.font, color:T.text }}>
      <Navbar/>

      {/* ── Govt header bar ── */}
      <div style={{
        background:`linear-gradient(90deg, ${T.govBlue} 0%, #00428a 50%, ${T.govBlueMid} 100%)`,
        borderBottom:`3px solid ${T.accent}`,
        opacity: headerVis ? 1 : 0,
        transform: headerVis ? "none" : "translateY(-10px)",
        transition:"opacity 0.45s ease, transform 0.45s ease",
      }}>
        <div style={{ maxWidth:1100, margin:"0 auto", padding: isMobile ? "18px 14px" : "24px 24px" }}>
          <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:12 }}>

            {/* Title block */}
            <div>
              {/* Govt stripe */}
              <div style={{ display:"flex", gap:4, marginBottom:8 }}>
                {["#ff9933","#ffffff","#138808"].map((c,i) => (
                  <div key={i} style={{ width:28, height:5, background:c, borderRadius:2 }}/>
                ))}
              </div>
              <h1 style={{
                margin:0, color:"white", fontWeight:900,
                fontSize:"clamp(1.15rem,4vw,1.8rem)", lineHeight:1.2,
                fontFamily:T.font, letterSpacing:"-0.3px",
              }}>
                {L.title}
              </h1>
              <p style={{ margin:"5px 0 0", color:"rgba(255,255,255,0.65)", fontSize:"0.82rem" }}>
                {lang==="mr" ? "कराड नगरपालिका · नागरिक सेवा केंद्र" : "Karad Municipal Council · Citizen Service Centre"}
              </p>
            </div>

            {/* Actions */}
            <div style={{ display:"flex", gap:8, flexShrink:0, alignItems:"flex-start" }}>
              <button
                onClick={() => setFormOpen(o=>!o)}
                style={{
                  background:T.accent, color:"white",
                  border:"none", borderRadius:6,
                  padding: isMobile ? "9px 12px" : "10px 18px",
                  fontSize:"0.8rem", fontWeight:700, cursor:"pointer",
                  display:"flex", alignItems:"center", gap:6,
                  fontFamily:T.font, whiteSpace:"nowrap",
                  boxShadow:`0 2px 12px rgba(0,0,0,0.2)`,
                  transition:"background 0.15s, transform 0.15s",
                }}
                onMouseEnter={e => { e.currentTarget.style.background=T.accentDark; e.currentTarget.style.transform="scale(1.02)"; }}
                onMouseLeave={e => { e.currentTarget.style.background=T.accent; e.currentTarget.style.transform="scale(1)"; }}
              >
                <FileText size={14}/>
                {isMobile ? (lang==="mr"?"तक्रार":"File") : L.cta}
              </button>
            </div>
          </div>

          {/* Stats row */}
          <div style={{
            display:"grid",
            gridTemplateColumns:"repeat(4,1fr)",
            gap:8, marginTop:18,
          }}>
            {[
              { label: lang==="mr"?"एकूण तक्रारी":"Total",     value:stats.total,    color:"rgba(255,255,255,0.9)" },
              { label: lang==="mr"?"प्रलंबित":"Pending",        value:stats.pending,  color:"#fde68a" },
              { label: lang==="mr"?"प्रगतीपथावर":"In Progress", value:stats.progress, color:"#93c5fd" },
              { label: lang==="mr"?"निराकरण":"Resolved",        value:stats.resolved, color:"#86efac" },
            ].map((s,i) => (
              <div key={i} style={{
                background:"rgba(255,255,255,0.08)", borderRadius:6,
                padding: isMobile ? "8px 10px" : "10px 14px",
                border:"1px solid rgba(255,255,255,0.12)",
                textAlign:"center",
              }}>
                <div style={{ fontSize:"clamp(1.1rem,3vw,1.6rem)", fontWeight:900, color:s.color, lineHeight:1 }}>
                  {s.value}
                </div>
                <div style={{ fontSize:"0.68rem", color:"rgba(255,255,255,0.55)", marginTop:3 }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main body ── */}
      <div style={{ maxWidth:1100, margin:"0 auto", padding: isMobile ? "14px 12px 80px" : "22px 24px 80px" }}>
        <div style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 340px", gap:18, alignItems:"start" }}>

          {/* LEFT — complaints list */}
          <div>
            {/* Category grid */}
            <div style={{
              background:T.card, borderRadius:T.radius,
              border:`1px solid ${T.border}`, padding:"14px",
              marginBottom:14, boxShadow:T.shadow,
            }}>
              <div style={{
                display:"flex", alignItems:"center", justifyContent:"space-between",
                marginBottom:10,
              }}>
                <span style={{ fontSize:"0.78rem", fontWeight:700, color:T.govBlue }}>
                  {lang==="mr" ? "विभाग निवडा" : "Select Department"}
                </span>
                {activeCat && (
                  <button onClick={() => setActiveCat(null)}
                    style={{
                      fontSize:"0.72rem", color:T.red, background:"none",
                      border:"none", cursor:"pointer", display:"flex",
                      alignItems:"center", gap:4, fontFamily:T.font, fontWeight:600,
                    }}>
                    <X size={12}/> {lang==="mr" ? "साफ करा" : "Clear"}
                  </button>
                )}
              </div>
              <div style={{
                display:"grid",
                gridTemplateColumns: isMobile ? "repeat(4,1fr)" : "repeat(6,1fr)",
                gap:6,
              }}>
                {CATEGORIES.map(cat => (
                  <CatButton
                    key={cat.id} cat={cat}
                    selected={activeCat === cat.id}
                    onClick={() => setActiveCat(p => p===cat.id ? null : cat.id)}
                    lang={lang}
                  />
                ))}
              </div>
            </div>

            {/* Search + status filter */}
            <div style={{ display:"flex", gap:8, marginBottom:12, flexWrap:"wrap" }}>
              <div style={{ position:"relative", flex:1, minWidth:160 }}>
                <Search size={14} style={{ position:"absolute", left:11, top:"50%", transform:"translateY(-50%)", color:T.textMuted }}/>
                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder={L.searchPh}
                  style={{
                    width:"100%", padding:"9px 11px 9px 34px",
                    border:`1.5px solid ${T.border}`, borderRadius:6,
                    fontSize:"0.83rem", color:T.text, background:"white",
                    outline:"none", fontFamily:T.font, boxSizing:"border-box",
                    transition:"border-color 0.18s",
                  }}
                  onFocus={e => { e.target.style.borderColor=T.govBlueMid; }}
                  onBlur={e  => { e.target.style.borderColor=T.border; }}
                />
                {search && (
                  <button onClick={() => setSearch("")}
                    style={{ position:"absolute", right:8, top:"50%", transform:"translateY(-50%)", background:"none", border:"none", cursor:"pointer", color:T.textMuted, display:"flex" }}>
                    <X size={13}/>
                  </button>
                )}
              </div>
              <select
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
                style={{
                  padding:"9px 12px", border:`1.5px solid ${T.border}`,
                  borderRadius:6, fontSize:"0.82rem", color:T.text,
                  background:"white", cursor:"pointer", outline:"none",
                  fontFamily:T.font,
                }}
              >
                <option value="all">{L.allStatus}</option>
                <option value="pending">{lang==="mr"?"प्रलंबित":"Pending"}</option>
                <option value="inprogress">{lang==="mr"?"प्रगतीपथावर":"In Progress"}</option>
                <option value="resolved">{lang==="mr"?"निराकरण झाले":"Resolved"}</option>
              </select>
            </div>

            {/* Result count */}
            <p style={{ margin:"0 0 10px", fontSize:"0.78rem", color:T.textSub }}>
              <strong style={{ color:T.text }}>{filtered.length}</strong> {L.found}
            </p>

            {/* Cards grid */}
            {filtered.length === 0 ? (
              <div style={{
                background:T.card, borderRadius:T.radius, border:`1px solid ${T.border}`,
                padding:"50px 20px", textAlign:"center", color:T.textMuted, boxShadow:T.shadow,
              }}>
                <AlertTriangle size={28} style={{ margin:"0 auto 10px", display:"block", opacity:0.4 }}/>
                <div style={{ fontWeight:600, marginBottom:5, color:T.textSub }}>
                  {lang==="mr" ? "तक्रार सापडली नाही" : "No complaints found"}
                </div>
                <button onClick={() => { setSearch(""); setActiveCat(null); setStatusFilter("all"); }}
                  style={{ marginTop:10, background:T.govBlue, color:"white", border:"none", borderRadius:6, padding:"8px 16px", fontSize:"0.78rem", fontWeight:600, cursor:"pointer", fontFamily:T.font }}>
                  {lang==="mr" ? "सर्व तक्रारी" : "Show all"}
                </button>
              </div>
            ) : (
              <div style={{
                display:"grid",
                gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fill, minmax(270px, 1fr))",
                gap:12,
              }}>
                {filtered.map((c,i) => (
                  <ComplaintCard key={c.id} c={c} index={i} lang={lang}/>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT — form panel */}
          <div style={{
            background:T.card, borderRadius:T.radius,
            border:`1px solid ${T.border}`, overflow:"hidden",
            boxShadow:T.shadow,
            position: isMobile ? "static" : "sticky",
            top:80,
          }}>
            {/* Panel header */}
            <div
              onClick={() => isMobile && setFormOpen(o=>!o)}
              style={{
                background:`linear-gradient(90deg,${T.govBlue},${T.govBlueMid})`,
                borderBottom:`3px solid ${T.accent}`,
                padding:"14px 18px",
                display:"flex", alignItems:"center", justifyContent:"space-between",
                cursor: isMobile ? "pointer" : "default",
                userSelect:"none",
              }}
            >
              <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                <FileText size={16} color={T.accent}/>
                <span style={{
                  color:"white", fontWeight:800,
                  fontSize:"0.92rem", fontFamily:T.font,
                }}>{L.formTitle}</span>
              </div>
              {isMobile && (
                <ChevronDown size={16} color="white" style={{
                  transform: formOpen ? "rotate(180deg)" : "rotate(0deg)",
                  transition:"transform 0.28s ease",
                }}/>
              )}
            </div>

            {/* Collapsible form */}
            <div style={{
              maxHeight: isMobile && !formOpen ? 0 : "1000px",
              overflow:"hidden",
              transition:"max-height 0.4s ease",
            }}>
              <div style={{ padding:"18px" }}>
                <ComplaintForm lang={lang}/>
              </div>
            </div>

            {/* Track complaint link */}
            {!isMobile && (
              <div style={{
                padding:"14px 18px",
                borderTop:`1px solid ${T.border}`,
                background:T.bg,
              }}>
                <button style={{
                  width:"100%", background:"none", border:`1.5px solid ${T.govBlueMid}`,
                  borderRadius:6, padding:"9px",
                  color:T.govBlueMid, fontSize:"0.8rem", fontWeight:700,
                  cursor:"pointer", fontFamily:T.font,
                  display:"flex", alignItems:"center", justifyContent:"center", gap:6,
                  transition:"background 0.15s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.background=T.accentSoft; }}
                  onMouseLeave={e => { e.currentTarget.style.background="none"; }}
                >
                  <Search size={13}/> {L.track}
                </button>
              </div>
            )}
          </div>
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
            {[{code:"mr",label:"🇮🇳  मराठी"},{code:"en",label:"🇬🇧  English"}].map(o => (
              <button key={o.code}
                onClick={() => { setLang(o.code); setLangOpen(false); }}
                style={{
                  display:"flex", alignItems:"center", width:"100%",
                  padding:"10px 16px", border:"none", cursor:"pointer",
                  fontSize:"0.84rem", fontWeight:lang===o.code?700:500,
                  background: lang===o.code ? T.accentSoft : "white",
                  color:      lang===o.code ? T.govBlue   : T.textSub,
                  borderLeft: lang===o.code ? `3px solid ${T.govBlue}` : "3px solid transparent",
                  fontFamily:T.font, transition:"background 0.12s",
                }}>
                {o.label}
              </button>
            ))}
          </div>
        )}
        <button
          onClick={() => setLangOpen(o=>!o)}
          style={{
            width:50, height:50, borderRadius:"50%",
            background:`linear-gradient(135deg,${T.govBlue},${T.govBlueMid})`,
            border:`2px solid ${T.accent}`,
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
        @keyframes slideUp { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        @keyframes spin    { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        * { box-sizing:border-box; }
        ::-webkit-scrollbar{width:6px}
        ::-webkit-scrollbar-track{background:#f0f3fa}
        ::-webkit-scrollbar-thumb{background:#b0bdda;border-radius:6px}
        select option { background:white; color:#0d1b2e; }
      `}</style>
    </div>
  );
}