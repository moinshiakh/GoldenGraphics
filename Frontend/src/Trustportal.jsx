import { useState, useEffect, useRef } from "react";
import {
  Globe, ChevronDown, Mail, MapPin, Phone, MessageSquare,
  Play, ChevronRight, Star, Quote, X, ExternalLink,
  CheckCircle2, Clock3, Calendar, Users, Award, Heart,
  Camera, ArrowRight, Lightbulb,
  Megaphone, FileText
} from "lucide-react";
import Navbar from "./navbar";
import Footer from "./footer";
import { useLang } from "./useLang";

// ── Design tokens ─────────────────────────────────────────────────────────────
const T = {
  // Brand — trust/NGO green + saffron Maharashtra palette
  green:      "#1a7a3c",
  greenMid:   "#1e8f46",
  greenLight: "#d4edda",
  saffron:    "#e87722",
  saffSoft:   "#fff4ec",
  gold:       "#f5a623",
  goldSoft:   "#fffbec",
  navy:       "#0d2236",
  navyMid:    "#14324f",
  navySoft:   "#e8eef5",
  red:        "#c0392b",
  redSoft:    "#fdf3f2",
  bg:         "#f5f7f2",
  bgWarm:     "#fafaf7",
  card:       "#ffffff",
  border:     "#dde5d4",
  borderMd:   "#bfccb0",
  text:       "#0d1f0e",
  textSub:    "#3d5a40",
  textMuted:  "#7a9480",
  shadow:     "0 1px 4px rgba(13,31,14,0.06), 0 4px 14px rgba(13,31,14,0.04)",
  shadowHov:  "0 6px 28px rgba(13,31,14,0.12)",
  radius:     10,
  font:       "'Noto Sans Devanagari','Noto Sans','Segoe UI',system-ui,sans-serif",
};

// ── Nav tabs ──────────────────────────────────────────────────────────────────
const NAV_TABS = [
  { id:"upkram",     mr:"उपक्रम",        en:"Initiatives",   icon:<Lightbulb size={14}/> },
  { id:"abhipray",   mr:"अभिप्राय",       en:"Testimonials",  icon:<Quote size={14}/> },
  { id:"video",      mr:"व्हिडिओ",        en:"Videos",        icon:<Play size={14}/> },
  { id:"takrar",     mr:"तक्रार द्या",    en:"Complaint",     icon:<Megaphone size={14}/> },
];

// ── Data ──────────────────────────────────────────────────────────────────────
const INITIATIVES = [
  {
    id:1, status:"completed",
    mr:"वृक्षारोपण मोहीम", en:"Tree Plantation Drive",
    desc_mr:"१०,००० झाडे लावण्याचे उद्दिष्ट पूर्ण केले.",
    desc_en:"Planted 10,000 trees across 15 villages.",
    date:"जून २०२४", dateEn:"Jun 2024",
    count:"१०,०००", countEn:"10,000",
    unit_mr:"झाडे", unit_en:"Trees",
    color:"#1a7a3c", colorSoft:"#d4edda",
    img:"🌳",
  },
  {
    id:2, status:"completed",
    mr:"आरोग्य शिबीर", en:"Health Camp",
    desc_mr:"५ गावांत विनामूल्य आरोग्य तपासणी शिबीर.",
    desc_en:"Free health checkup camp in 5 villages.",
    date:"मार्च २०२४", dateEn:"Mar 2024",
    count:"२,५००", countEn:"2,500",
    unit_mr:"लाभार्थी", unit_en:"Beneficiaries",
    color:"#1565c0", colorSoft:"#e8f0fe",
    img:"🏥",
  },
  {
    id:3, status:"completed",
    mr:"महिला सशक्तीकरण", en:"Women Empowerment",
    desc_mr:"महिलांना स्वयंरोजगाराचे प्रशिक्षण दिले.",
    desc_en:"Self-employment training for women.",
    date:"जानेवारी २०२४", dateEn:"Jan 2024",
    count:"३५०", countEn:"350",
    unit_mr:"महिला", unit_en:"Women",
    color:"#7b1fa2", colorSoft:"#f3e5f5",
    img:"👩",
  },
  {
    id:4, status:"upcoming",
    mr:"शिक्षण सहाय्य योजना", en:"Education Support Scheme",
    desc_mr:"गरजू विद्यार्थ्यांना शिष्यवृत्ती व साहित्य.",
    desc_en:"Scholarships and materials for needy students.",
    date:"नोव्हें. २०२४", dateEn:"Nov 2024",
    count:"५००+", countEn:"500+",
    unit_mr:"विद्यार्थी", unit_en:"Students",
    color:"#e87722", colorSoft:"#fff4ec",
    img:"📚",
  },
  {
    id:5, status:"upcoming",
    mr:"स्वच्छता अभियान", en:"Cleanliness Drive",
    desc_mr:"ग्रामीण स्वच्छता व शौचालय बांधणी योजना.",
    desc_en:"Rural sanitation and toilet construction scheme.",
    date:"डिसें. २०२४", dateEn:"Dec 2024",
    count:"२०", countEn:"20",
    unit_mr:"गावे", unit_en:"Villages",
    color:"#00796b", colorSoft:"#e0f2f1",
    img:"✨",
  },
  {
    id:6, status:"upcoming",
    mr:"डिजिटल साक्षरता", en:"Digital Literacy",
    desc_mr:"ग्रामीण तरुणांसाठी संगणक प्रशिक्षण केंद्र.",
    desc_en:"Computer training centers for rural youth.",
    date:"जाने. २०२५", dateEn:"Jan 2025",
    count:"१,०००", countEn:"1,000",
    unit_mr:"युवक", unit_en:"Youth",
    color:"#0277bd", colorSoft:"#e1f5fe",
    img:"💻",
  },
];

const TESTIMONIALS = [
  {
    id:1,
    name_mr:"सुनीता देशमुख", name_en:"Sunita Deshmukh",
    role_mr:"शेतकरी, कराड", role_en:"Farmer, Karad",
    text_mr:"ट्रस्टमुळे आमच्या गावात मोठा बदल झाला. वृक्षारोपण मोहिमेमुळे पर्यावरण सुधारले.",
    text_en:"The trust has brought a great change to our village. The plantation drive improved the environment.",
    stars:5, avatar:"👩‍🌾",
  },
  {
    id:2,
    name_mr:"रमेश जाधव", name_en:"Ramesh Jadhav",
    role_mr:"व्यापारी, सातारा", role_en:"Merchant, Satara",
    text_mr:"आरोग्य शिबिराने गावातील अनेक जणांना लाभ झाला. ट्रस्टचे कार्य अत्यंत स्तुत्य आहे.",
    text_en:"The health camp benefited many in the village. The trust's work is commendable.",
    stars:5, avatar:"👨‍💼",
  },
  {
    id:3,
    name_mr:"मीरा पाटील", name_en:"Meera Patil",
    role_mr:"शिक्षिका, वाई", role_en:"Teacher, Wai",
    text_mr:"महिला सशक्तीकरण कार्यक्रमाने आमच्या भागातील महिलांना स्वावलंबी बनवले.",
    text_en:"The women empowerment program made women in our area self-reliant.",
    stars:5, avatar:"👩‍🏫",
  },
  {
    id:4,
    name_mr:"अनिल शिंदे", name_en:"Anil Shinde",
    role_mr:"शेतकरी, फलटण", role_en:"Farmer, Phaltan",
    text_mr:"ट्रस्टने दिलेल्या मदतीमुळे माझ्या मुलाला शाळेत शिक्षण मिळाले.",
    text_en:"With the trust's support, my child was able to get education.",
    stars:5, avatar:"👨‍🌾",
  },
  {
    id:5,
    name_mr:"कविता मोरे", name_en:"Kavita More",
    role_mr:"गृहिणी, कोरेगाव", role_en:"Homemaker, Koregaon",
    text_mr:"स्वयंसेवकांचे कार्य पाहून मनाला खूप आनंद होतो. खरोखर समाजसेवा आहे.",
    text_en:"Seeing the volunteers' work fills the heart with joy. True social service.",
    stars:5, avatar:"👩",
  },
  {
    id:6,
    name_mr:"संजय कांबळे", name_en:"Sanjay Kamble",
    role_mr:"युवक, माण", role_en:"Youth, Man Taluka",
    text_mr:"डिजिटल साक्षरता उपक्रमाने मला नोकरी मिळवण्यात मदत केली.",
    text_en:"The digital literacy initiative helped me get a job.",
    stars:5, avatar:"👨‍💻",
  },
];

const VIDEOS = [
  { id:1, mr:"वृक्षारोपण मोहीम २०२४",  en:"Plantation Drive 2024",  duration:"४:३२", views_mr:"१२,५०० दृश्ये", views_en:"12.5K views",  thumb:"🌳", color:"#1a7a3c" },
  { id:2, mr:"आरोग्य शिबीर हायलाइट्स", en:"Health Camp Highlights",  duration:"७:१५", views_mr:"८,२०० दृश्ये",  views_en:"8.2K views",  thumb:"🏥", color:"#1565c0" },
  { id:3, mr:"महिला शक्ती कार्यक्रम",  en:"Women Power Program",    duration:"५:४८", views_mr:"१५,१०० दृश्ये", views_en:"15.1K views", thumb:"👩", color:"#7b1fa2" },
  { id:4, mr:"ट्रस्ट वार्षिक अहवाल",  en:"Trust Annual Report",     duration:"१२:०५",views_mr:"६,७०० दृश्ये",  views_en:"6.7K views",  thumb:"📋", color:"#e87722" },
  { id:5, mr:"ग्राम विकास योजना",      en:"Village Development Plan", duration:"९:२०", views_mr:"९,३०० दृश्ये",  views_en:"9.3K views",  thumb:"🏘️", color:"#00796b" },
  { id:6, mr:"स्वयंसेवक प्रशिक्षण",   en:"Volunteer Training",       duration:"३:५५", views_mr:"५,१०० दृश्ये",  views_en:"5.1K views",  thumb:"🤝", color:"#c62828" },
];

// ── Animated entrance wrapper ─────────────────────────────────────────────────
function FadeIn({ children, delay = 0, style = {} }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.05 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{
      opacity: vis ? 1 : 0,
      transform: vis ? "translateY(0)" : "translateY(16px)",
      transition: `opacity 0.4s ease ${delay}s, transform 0.4s ease ${delay}s`,
      ...style,
    }}>
      {children}
    </div>
  );
}

// ── Section heading ───────────────────────────────────────────────────────────
function SectionHead({ mr, en, lang, sub_mr, sub_en, accent = T.green }) {
  return (
    <FadeIn>
      <div style={{ textAlign:"center", marginBottom: 22 }}>
        <div style={{ display:"inline-flex", alignItems:"center", gap:8, marginBottom:8 }}>
          <div style={{ width:28, height:3, background:accent, borderRadius:2 }}/>
          <h2 style={{ margin:0, fontFamily:T.font, fontSize:"clamp(1.1rem,3.5vw,1.5rem)", fontWeight:900, color:T.text, letterSpacing:"-0.2px" }}>
            {lang==="mr" ? mr : en}
          </h2>
          <div style={{ width:28, height:3, background:accent, borderRadius:2 }}/>
        </div>
        {(sub_mr || sub_en) && (
          <p style={{ margin:0, fontFamily:T.font, fontSize:"0.82rem", color:T.textMuted }}>
            {lang==="mr" ? sub_mr : sub_en}
          </p>
        )}
      </div>
    </FadeIn>
  );
}

// ── Initiative Card ───────────────────────────────────────────────────────────
function InitiativeCard({ item, index, lang }) {
  const [hov, setHov] = useState(false);
  const isCompleted = item.status === "completed";
  return (
    <FadeIn delay={index * 0.07}>
      <div
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          background: T.card,
          border: `1.5px solid ${hov ? item.color+"55" : T.border}`,
          borderTop: `4px solid ${item.color}`,
          borderRadius: T.radius,
          padding: "16px",
          boxShadow: hov ? T.shadowHov : T.shadow,
          transform: hov ? "translateY(-3px)" : "none",
          transition: "all 0.2s ease",
          display: "flex", flexDirection: "column", gap: 10,
        }}
      >
        {/* Emoji + status */}
        <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between" }}>
          <div style={{ fontSize:"2.2rem", lineHeight:1 }}>{item.img}</div>
          <span style={{
            display:"inline-flex", alignItems:"center", gap:4,
            fontSize:"0.65rem", fontWeight:700, fontFamily:T.font,
            color: isCompleted ? T.green : T.saffron,
            background: isCompleted ? T.greenLight : T.saffSoft,
            border: `1px solid ${isCompleted ? "#a3d9b1" : "#f5c99a"}`,
            borderRadius:20, padding:"3px 9px",
          }}>
            {isCompleted ? <CheckCircle2 size={10}/> : <Clock3 size={10}/>}
            {lang==="mr" ? (isCompleted?"पूर्ण":"आगामी") : (isCompleted?"Completed":"Upcoming")}
          </span>
        </div>

        {/* Title */}
        <div>
          <h3 style={{ margin:"0 0 4px", fontFamily:T.font, fontSize:"0.93rem", fontWeight:800, color:T.text, lineHeight:1.3 }}>
            {lang==="mr" ? item.mr : item.en}
          </h3>
          <p style={{ margin:0, fontFamily:T.font, fontSize:"0.76rem", color:T.textSub, lineHeight:1.5 }}>
            {lang==="mr" ? item.desc_mr : item.desc_en}
          </p>
        </div>

        {/* Stats row */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", paddingTop:8, borderTop:`1px solid ${T.border}` }}>
          <div>
            <div style={{ fontFamily:"monospace", fontSize:"1.1rem", fontWeight:900, color:item.color, lineHeight:1 }}>
              {lang==="mr" ? item.count : item.countEn}
            </div>
            <div style={{ fontSize:"0.67rem", color:T.textMuted, fontFamily:T.font }}>
              {lang==="mr" ? item.unit_mr : item.unit_en}
            </div>
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:4, fontSize:"0.7rem", color:T.textMuted, fontFamily:T.font }}>
            <Calendar size={11}/>
            {lang==="mr" ? item.date : item.dateEn}
          </div>
        </div>
      </div>
    </FadeIn>
  );
}

// ── Testimonial Card ──────────────────────────────────────────────────────────
function TestimonialCard({ item, index, lang }) {
  const [hov, setHov] = useState(false);
  return (
    <FadeIn delay={index * 0.07}>
      <div
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          background: hov ? T.gold : T.gold,
          border: `1.5px solid ${hov ? "#d4910f" : "#e8c060"}`,
          borderRadius: T.radius,
          padding: "16px",
          boxShadow: hov ? T.shadowHov : T.shadow,
          transform: hov ? "translateY(-3px) scale(1.01)" : "none",
          transition: "all 0.2s ease",
          display: "flex", flexDirection: "column", gap: 10,
          position: "relative", overflow: "hidden",
        }}
      >
        {/* Decorative quote mark */}
        <div style={{ position:"absolute", top:-8, right:10, fontSize:"5rem", color:"rgba(0,0,0,0.06)", lineHeight:1, fontFamily:"serif", pointerEvents:"none" }}>"</div>

        {/* Stars */}
        <div style={{ display:"flex", gap:2 }}>
          {[...Array(item.stars)].map((_,i) => (
            <Star key={i} size={13} color="#7a4b00" fill="#7a4b00"/>
          ))}
        </div>

        {/* Text */}
        <p style={{ margin:0, fontFamily:T.font, fontSize:"0.8rem", color:"#3d2400", lineHeight:1.65, position:"relative", zIndex:1 }}>
          {lang==="mr" ? item.text_mr : item.text_en}
        </p>

        {/* Author */}
        <div style={{ display:"flex", alignItems:"center", gap:9, paddingTop:8, borderTop:"1px solid rgba(0,0,0,0.1)" }}>
          <div style={{ width:34, height:34, borderRadius:"50%", background:"rgba(0,0,0,0.08)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1.2rem", flexShrink:0 }}>
            {item.avatar}
          </div>
          <div>
            <div style={{ fontFamily:T.font, fontSize:"0.8rem", fontWeight:800, color:"#3d2400" }}>
              {lang==="mr" ? item.name_mr : item.name_en}
            </div>
            <div style={{ fontFamily:T.font, fontSize:"0.67rem", color:"#7a4b00" }}>
              {lang==="mr" ? item.role_mr : item.role_en}
            </div>
          </div>
        </div>
      </div>
    </FadeIn>
  );
}

// ── Video Card ────────────────────────────────────────────────────────────────
function VideoCard({ item, index, lang }) {
  const [hov, setHov] = useState(false);
  return (
    <FadeIn delay={index * 0.07}>
      <div
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          background: T.card,
          border: `1.5px solid ${hov ? item.color+"55" : T.border}`,
          borderRadius: T.radius,
          overflow: "hidden",
          boxShadow: hov ? T.shadowHov : T.shadow,
          transform: hov ? "translateY(-3px)" : "none",
          transition: "all 0.2s ease",
          cursor: "pointer",
        }}
      >
        {/* Thumbnail area */}
        <div style={{
          height:130, background:`linear-gradient(135deg, ${item.color}22, ${item.color}55)`,
          display:"flex", alignItems:"center", justifyContent:"center",
          position:"relative",
        }}>
          <div style={{ fontSize:"3rem" }}>{item.thumb}</div>
          {/* Play button */}
          <div style={{
            position:"absolute", width:44, height:44, borderRadius:"50%",
            background: hov ? item.color : "rgba(255,255,255,0.85)",
            display:"flex", alignItems:"center", justifyContent:"center",
            boxShadow:"0 3px 12px rgba(0,0,0,0.18)",
            transition:"all 0.18s ease",
            transform: hov ? "scale(1.1)" : "scale(1)",
          }}>
            <Play size={18} color={hov ? "white" : item.color} fill={hov ? "white" : item.color} style={{ marginLeft:2 }}/>
          </div>
          {/* Duration */}
          <div style={{ position:"absolute", bottom:8, right:8, background:"rgba(0,0,0,0.65)", color:"white", fontSize:"0.65rem", fontWeight:700, padding:"2px 7px", borderRadius:4, fontFamily:"monospace" }}>
            {item.duration}
          </div>
        </div>

        {/* Info */}
        <div style={{ padding:"11px 13px" }}>
          <h4 style={{ margin:"0 0 4px", fontFamily:T.font, fontSize:"0.82rem", fontWeight:700, color:T.text, lineHeight:1.35 }}>
            {lang==="mr" ? item.mr : item.en}
          </h4>
          <div style={{ display:"flex", alignItems:"center", gap:5, fontSize:"0.67rem", color:T.textMuted, fontFamily:T.font }}>
            <Play size={10} color={T.red}/>
            {lang==="mr" ? item.views_mr : item.views_en}
          </div>
        </div>
      </div>
    </FadeIn>
  );
}

// ── Complaint Form ────────────────────────────────────────────────────────────
function TakrarForm({ lang }) {
  const [form, setForm]       = useState({ name:"", phone:"", address:"", issue:"", desc:"" });
  const [submitted, setSubmit] = useState(false);
  const [loading, setLoading]  = useState(false);
  const [trackId, setTrackId]  = useState("");

  const ISSUES = [
    { mr:"प्रकाश व्यवस्था",    en:"Street Light" },
    { mr:"पाण्याची समस्या",   en:"Water Problem" },
    { mr:"रस्त्याची दुरुस्ती", en:"Road Repair" },
    { mr:"कचरा समस्या",       en:"Garbage Issue" },
    { mr:"अन्य समस्या",       en:"Other Issue" },
  ];

  const lbl = txt => <label style={{ display:"block", fontSize:"0.73rem", fontWeight:700, color:T.textSub, marginBottom:4, fontFamily:T.font }}>{txt}</label>;
  const inp = { width:"100%", padding:"10px 12px", border:`1.5px solid ${T.border}`, borderRadius:7, fontSize:"0.84rem", color:T.text, background:"white", outline:"none", fontFamily:T.font, boxSizing:"border-box", transition:"border-color 0.15s, box-shadow 0.15s" };
  const fi = e => { e.target.style.borderColor=T.green; e.target.style.boxShadow=`0 0 0 3px rgba(26,122,60,0.1)`; };
  const fo = e => { e.target.style.borderColor=T.border; e.target.style.boxShadow="none"; };

  const handleSubmit = e => {
    e.preventDefault();
    if (!form.name || !form.phone) return;
    setLoading(true);
    const id = "MVT-2024-" + Math.floor(500 + Math.random()*500);
    setTimeout(() => { setLoading(false); setTrackId(id); setSubmit(true); }, 1100);
  };

  if (submitted) return (
    <div style={{ textAlign:"center", padding:"28px 16px" }}>
      <div style={{ width:52, height:52, borderRadius:"50%", background:T.greenLight, border:"2px solid #a3d9b1", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 12px" }}>
        <CheckCircle2 size={24} color={T.green}/>
      </div>
      <h3 style={{ margin:"0 0 5px", fontFamily:T.font, fontWeight:800, color:T.text }}>
        {lang==="mr" ? "तक्रार नोंदवली!" : "Complaint Registered!"}
      </h3>
      <p style={{ margin:"0 0 10px", fontSize:"0.77rem", color:T.textSub, fontFamily:T.font }}>
        {lang==="mr" ? "तुमचा तक्रार क्रमांक:" : "Your complaint ID:"}
      </p>
      <div style={{ display:"inline-block", background:T.goldSoft, border:`1.5px solid ${T.gold}`, borderRadius:7, padding:"8px 18px", fontFamily:"monospace", fontSize:"0.95rem", fontWeight:800, color:T.navyMid, letterSpacing:"1px" }}>
        {trackId}
      </div>
      <p style={{ margin:"10px 0 0", fontSize:"0.71rem", color:T.textMuted, fontFamily:T.font }}>
        {lang==="mr" ? "७२ तासांत कार्यवाही केली जाईल." : "Action will be taken within 72 hours."}
      </p>
      <button onClick={() => { setSubmit(false); setForm({name:"",phone:"",address:"",issue:"",desc:""}); }}
        style={{ marginTop:14, background:T.green, color:"white", border:"none", borderRadius:7, padding:"9px 20px", fontWeight:700, fontSize:"0.8rem", cursor:"pointer", fontFamily:T.font }}>
        {lang==="mr" ? "नवीन तक्रार" : "New Complaint"}
      </button>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} style={{ display:"flex", flexDirection:"column", gap:13, padding:"18px" }}>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
        <div>
          {lbl(lang==="mr"?"नाव":"Name")}
          <input style={inp} value={form.name} onChange={e=>setForm(p=>({...p,name:e.target.value}))} onFocus={fi} onBlur={fo} placeholder={lang==="mr"?"तुमचे नाव":"Your name"}/>
        </div>
        <div>
          {lbl(lang==="mr"?"मो.":"Mobile")}
          <input style={inp} type="tel" value={form.phone} onChange={e=>setForm(p=>({...p,phone:e.target.value}))} onFocus={fi} onBlur={fo} placeholder="9XXXXXXXXX"/>
        </div>
      </div>
      <div>
        {lbl(lang==="mr"?"समस्येचा प्रकार":"Issue Type")}
        <select style={inp} value={form.issue} onChange={e=>setForm(p=>({...p,issue:e.target.value}))} onFocus={fi} onBlur={fo}>
          <option value="">{lang==="mr"?"निवडा":"Select"}</option>
          {ISSUES.map((is,i) => <option key={i} value={is.en}>{lang==="mr"?is.mr:is.en}</option>)}
        </select>
      </div>
      <div>
        {lbl(lang==="mr"?"पत्ता":"Address")}
        <input style={inp} value={form.address} onChange={e=>setForm(p=>({...p,address:e.target.value}))} onFocus={fi} onBlur={fo} placeholder={lang==="mr"?"गाव, तालुका, जिल्हा":"Village, Taluka, District"}/>
      </div>
      <div>
        {lbl(lang==="mr"?"तक्रारीचा तपशील":"Complaint Details")}
        <textarea style={{ ...inp, minHeight:80, resize:"vertical" }} value={form.desc} onChange={e=>setForm(p=>({...p,desc:e.target.value}))} onFocus={fi} onBlur={fo} placeholder={lang==="mr"?"तुमची समस्या सांगा…":"Describe your issue…"}/>
      </div>
      <button type="submit" disabled={loading || !form.name || !form.phone}
        style={{
          background: (!form.name||!form.phone) ? T.border : `linear-gradient(135deg,${T.green},${T.greenMid})`,
          color: (!form.name||!form.phone) ? T.textMuted : "white",
          border:"none", borderRadius:7, padding:"12px",
          fontFamily:T.font, fontSize:"0.88rem", fontWeight:800,
          cursor: (!form.name||!form.phone) ? "not-allowed" : "pointer",
          display:"flex", alignItems:"center", justifyContent:"center", gap:7,
          boxShadow: (!form.name||!form.phone) ? "none" : `0 4px 14px rgba(26,122,60,0.35)`,
          transition:"opacity 0.15s",
        }}
        onMouseEnter={e=>{ if(form.name&&form.phone&&!loading) e.currentTarget.style.opacity="0.88"; }}
        onMouseLeave={e=>{ e.currentTarget.style.opacity="1"; }}
      >
        {loading
          ? <><span style={{display:"inline-block",animation:"spin 0.8s linear infinite"}}><ArrowRight size={14}/></span>{lang==="mr"?"नोंदवत आहे…":"Submitting…"}</>
          : <><FileText size={14}/>{lang==="mr"?"तक्रार नोंदवा":"Submit Complaint"}</>
        }
      </button>
    </form>
  );
}

// ── Social link ───────────────────────────────────────────────────────────────
function SocialBtn({ icon, label, href, color }) {
  const [hov, setHov] = useState(false);
  return (
    <a href={href} target="_blank" rel="noreferrer" aria-label={label}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display:"flex", alignItems:"center", justifyContent:"center",
        width:44, height:44, borderRadius:"50%",
        background: hov ? color : "white",
        border: `1.5px solid ${hov ? color : T.border}`,
        boxShadow: hov ? `0 3px 12px ${color}44` : T.shadow,
        color: hov ? "white" : color,
        transition:"all 0.18s ease",
        textDecoration:"none",
        transform: hov ? "translateY(-2px)" : "none",
      }}>
      {icon}
    </a>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function MuktVyaspeeth() {
  const { lang, setLang } = useLang();
  const [langOpen, setLangOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeTab, setActiveTab] = useState(null); // null = all visible on desktop
  const [headerVis, setHeaderVis] = useState(false);

  // Section open states for mobile
  const [upkramOpen,   setUpkramOpen]   = useState(false);
  const [abhiprayOpen, setAbhiprayOpen] = useState(false);
  const [videoOpen,    setVideoOpen]    = useState(false);
  const [takrarOpen,   setTakrarOpen]   = useState(false);

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

  // On mobile, tapping a nav tab toggles its section
  const handleTab = (tabId) => {
    if (!isMobile) { setActiveTab(t => t === tabId ? null : tabId); return; }
    switch (tabId) {
      case "upkram":   setUpkramOpen(o=>!o);   setAbhiprayOpen(false); setVideoOpen(false); setTakrarOpen(false); break;
      case "abhipray": setAbhiprayOpen(o=>!o); setUpkramOpen(false);   setVideoOpen(false); setTakrarOpen(false); break;
      case "video":    setVideoOpen(o=>!o);    setUpkramOpen(false);   setAbhiprayOpen(false); setTakrarOpen(false); break;
      case "takrar":   setTakrarOpen(o=>!o);   setUpkramOpen(false);   setAbhiprayOpen(false); setVideoOpen(false); break;
    }
  };

  // Section visibility: on desktop always show; on mobile show only if toggled
  const showUpkram   = !isMobile || upkramOpen;
  const showAbhipray = !isMobile || abhiprayOpen;
  const showVideo    = !isMobile || videoOpen;
  const showTakrar   = !isMobile || takrarOpen;

  // Which mobile tab is active
  const mobileActive = (id) => {
    if (id==="upkram")   return upkramOpen;
    if (id==="abhipray") return abhiprayOpen;
    if (id==="video")    return videoOpen;
    if (id==="takrar")   return takrarOpen;
    return false;
  };

  const L = {
    trust:  lang==="mr" ? "मुक्त व्यासपीठ" : "Mukta Vyaspeeth",
    tagline:lang==="mr" ? "समाज विकासाचे व्यासपीठ" : "Platform for Social Development",
    notice: lang==="mr"
      ? "लाईट बील वाढल्याबद्दल एमएसईडीसीला विचारणा करावी. | वाढत्या भ्रष्टाचाराबद्दल काही सुचवायचे आहे का?"
      : "Enquire MSEDCL about increasing electricity bills. | Any suggestions about rising corruption?",
    stats_total: lang==="mr" ? "उपक्रम" : "Initiatives",
    stats_ben:   lang==="mr" ? "लाभार्थी" : "Beneficiaries",
    stats_vil:   lang==="mr" ? "गावे" : "Villages",
    stats_vol:   lang==="mr" ? "स्वयंसेवक" : "Volunteers",
  };

  const STATS = [
    { val:"२०+",    valEn:"20+",   label:L.stats_total, icon:<Award size={16}/>,   color:T.green },
    { val:"१५,०००", valEn:"15K+",  label:L.stats_ben,   icon:<Users size={16}/>,   color:"#1565c0" },
    { val:"४५",     valEn:"45",    label:L.stats_vil,   icon:<MapPin size={16}/>,  color:T.saffron },
    { val:"२००+",   valEn:"200+",  label:L.stats_vol,   icon:<Heart size={16}/>,   color:T.red },
  ];

  return (
    <div style={{ minHeight:"100vh", background:T.bg, fontFamily:T.font, color:T.text }}>
      <Navbar/>

      {/* ── Hero Header ── */}
      <div style={{
        background:`linear-gradient(135deg, ${T.navy} 0%, ${T.navyMid} 60%, ${T.green} 100%)`,
        borderBottom:`3px solid ${T.saffron}`,
        opacity: headerVis ? 1 : 0, transform: headerVis ? "none" : "translateY(-12px)",
        transition:"opacity 0.45s ease, transform 0.45s ease",
      }}>
        <div style={{ maxWidth:1100, margin:"0 auto", padding: isMobile?"14px 14px 0":"22px 24px 0" }}>
          {/* Tricolor stripe */}
          <div style={{ display:"flex", gap:0, marginBottom:14 }}>
            {["#ff9933","#ffffff","#138808"].map((c,i)=>
              <div key={i} style={{ flex:1, height:5, background:c, borderRadius:i===0?"3px 0 0 3px":i===2?"0 3px 3px 0":0 }}/>
            )}
          </div>

          <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:14, flexWrap:"wrap" }}>
            {/* Brand */}
            <div style={{ display:"flex", gap:14, alignItems:"center" }}>
              <div style={{ width:52, height:52, borderRadius:"50%", background:"rgba(255,255,255,0.1)", border:"2px solid rgba(255,255,255,0.2)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, fontSize:"1.6rem" }}>
                🏛️
              </div>
              <div>
                <h1 style={{ margin:0, color:"white", fontWeight:900, fontSize:"clamp(1.3rem,4.5vw,2rem)", lineHeight:1.1, fontFamily:T.font }}>
                  {L.trust}
                </h1>
                <p style={{ margin:"3px 0 0", color:"rgba(255,255,255,0.55)", fontSize:"0.78rem", fontFamily:T.font }}>
                  {L.tagline}
                </p>
              </div>
            </div>

            {/* Stats */}
            <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:8 }}>
              {STATS.map((s,i) => (
                <div key={i} style={{ background:"rgba(255,255,255,0.08)", borderRadius:8, padding: isMobile?"7px 8px":"10px 14px", border:"1px solid rgba(255,255,255,0.1)", textAlign:"center", minWidth:0 }}>
                  <div style={{ display:"flex", justifyContent:"center", marginBottom:3 }}>
                    <span style={{ color:s.color === T.green ? "#86efac" : s.color === "#1565c0" ? "#93c5fd" : s.color === T.saffron ? "#fcd34d" : "#fca5a5" }}>{s.icon}</span>
                  </div>
                  <div style={{ fontFamily:"monospace", fontSize:"clamp(0.85rem,2.5vw,1.15rem)", fontWeight:900, color:"white", lineHeight:1 }}>
                    {lang==="mr" ? s.val : s.valEn}
                  </div>
                  <div style={{ fontSize:"0.6rem", color:"rgba(255,255,255,0.45)", fontFamily:T.font, marginTop:2 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Notice ticker */}
          <div style={{ margin:"14px 0 0", background:"rgba(255,255,255,0.07)", border:"1px solid rgba(255,255,255,0.12)", borderRadius:"7px 7px 0 0", padding:"9px 14px", display:"flex", alignItems:"center", gap:10, overflow:"hidden" }}>
            <div style={{ background:T.saffron, borderRadius:4, padding:"2px 9px", fontSize:"0.67rem", fontWeight:900, color:"white", flexShrink:0, fontFamily:T.font, letterSpacing:"0.5px" }}>
              {lang==="mr"?"नोटीस":"NOTICE"}
            </div>
            <div style={{ flex:1, overflow:"hidden" }}>
              <p style={{ margin:0, color:"rgba(255,255,255,0.75)", fontSize:"0.75rem", fontFamily:T.font, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>
                {L.notice}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Nav tabs ── */}
      <div style={{ background:T.card, borderBottom:`1px solid ${T.border}`, boxShadow:"0 2px 8px rgba(13,31,14,0.06)", position:"sticky", top:0, zIndex:20 }}>
        <div style={{ maxWidth:1100, margin:"0 auto", padding:"0 14px" }}>
          <div style={{ display:"flex", gap:2, overflowX:"auto", WebkitOverflowScrolling:"touch" }}>
            {NAV_TABS.map(tab => {
              const isActive = isMobile ? mobileActive(tab.id) : activeTab === tab.id;
              return (
                <button key={tab.id} onClick={() => handleTab(tab.id)}
                  style={{
                    display:"flex", alignItems:"center", gap:6,
                    padding:"12px 16px",
                    background:"none", border:"none",
                    borderBottom:`2.5px solid ${isActive ? T.green : "transparent"}`,
                    color: isActive ? T.green : T.textSub,
                    fontFamily:T.font, fontSize:"0.8rem", fontWeight: isActive ? 800 : 500,
                    cursor:"pointer", whiteSpace:"nowrap",
                    transition:"all 0.18s ease",
                  }}
                  onMouseEnter={e => { if(!isActive) e.currentTarget.style.color=T.green; }}
                  onMouseLeave={e => { if(!isActive) e.currentTarget.style.color=T.textSub; }}
                >
                  {tab.icon}
                  {lang==="mr" ? tab.mr : tab.en}
                  {isMobile && <ChevronDown size={12} style={{ transform:isActive?"rotate(180deg)":"none", transition:"transform 0.2s" }}/>}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Main content ── */}
      <div style={{ maxWidth:1100, margin:"0 auto", padding: isMobile?"14px 12px 80px":"24px 24px 80px", display:"flex", flexDirection:"column", gap:32 }}>

        {/* Section 1 — Initiatives */}
        <section>
          {isMobile ? (
            // Mobile: collapsible panel
            <div style={{ background:T.card, borderRadius:T.radius, border:`1px solid ${T.border}`, overflow:"hidden", boxShadow:T.shadow }}>
              <button onClick={()=>handleTab("upkram")} style={{ width:"100%", display:"flex", alignItems:"center", justifyContent:"space-between", padding:"13px 16px", background:upkramOpen?`linear-gradient(90deg,${T.green},${T.greenMid})`:"white", border:"none", cursor:"pointer" }}>
                <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                  <Lightbulb size={15} color={upkramOpen?"white":T.green}/>
                  <span style={{ fontFamily:T.font, fontWeight:800, fontSize:"0.9rem", color:upkramOpen?"white":T.text }}>
                    {lang==="mr"?"पूर्ण झालेले आणि पुढे असणारे उपक्रम":"Completed & Upcoming Initiatives"}
                  </span>
                </div>
                <ChevronDown size={16} color={upkramOpen?"white":T.textSub} style={{ transform:upkramOpen?"rotate(180deg)":"none", transition:"transform 0.25s" }}/>
              </button>
              <div style={{ maxHeight:upkramOpen?"2000px":0, overflow:"hidden", transition:"max-height 0.4s ease" }}>
                <div style={{ padding:"12px", display:"grid", gridTemplateColumns:"1fr", gap:10 }}>
                  {INITIATIVES.map((item,i) => <InitiativeCard key={item.id} item={item} index={i} lang={lang}/>)}
                </div>
              </div>
            </div>
          ) : (
            <>
              <SectionHead mr="पूर्ण झालेले आणि पुढे असणारे उपक्रम" en="Completed & Upcoming Initiatives" lang={lang} sub_mr="आमच्या सामाजिक उपक्रमांची माहिती" sub_en="Our social initiatives at a glance" accent={T.green}/>
              {/* Completed header */}
              <FadeIn>
                <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:10 }}>
                  <CheckCircle2 size={15} color={T.green}/>
                  <span style={{ fontFamily:T.font, fontWeight:700, fontSize:"0.8rem", color:T.green }}>{lang==="mr"?"पूर्ण उपक्रम":"Completed Initiatives"}</span>
                </div>
              </FadeIn>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12, marginBottom:16 }}>
                {INITIATIVES.filter(i=>i.status==="completed").map((item,i) => <InitiativeCard key={item.id} item={item} index={i} lang={lang}/>)}
              </div>
              {/* Upcoming header */}
              <FadeIn>
                <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:10 }}>
                  <Clock3 size={15} color={T.saffron}/>
                  <span style={{ fontFamily:T.font, fontWeight:700, fontSize:"0.8rem", color:T.saffron }}>{lang==="mr"?"आगामी उपक्रम":"Upcoming Initiatives"}</span>
                </div>
              </FadeIn>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12 }}>
                {INITIATIVES.filter(i=>i.status==="upcoming").map((item,i) => <InitiativeCard key={item.id} item={item} index={i+3} lang={lang}/>)}
              </div>
            </>
          )}
        </section>

        {/* Section 2 — Testimonials */}
        <section>
          {isMobile ? (
            <div style={{ background:T.card, borderRadius:T.radius, border:`1px solid ${T.border}`, overflow:"hidden", boxShadow:T.shadow }}>
              <button onClick={()=>handleTab("abhipray")} style={{ width:"100%", display:"flex", alignItems:"center", justifyContent:"space-between", padding:"13px 16px", background:abhiprayOpen?`linear-gradient(90deg,#b8860b,${T.gold})`:"white", border:"none", cursor:"pointer" }}>
                <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                  <Quote size={15} color={abhiprayOpen?"white":"#b8860b"}/>
                  <span style={{ fontFamily:T.font, fontWeight:800, fontSize:"0.9rem", color:abhiprayOpen?"white":T.text }}>
                    {lang==="mr"?"ट्रस्टच्या कामावदल लोकांचा अभिप्राय":"Public Opinion on Trust's Work"}
                  </span>
                </div>
                <ChevronDown size={16} color={abhiprayOpen?"white":T.textSub} style={{ transform:abhiprayOpen?"rotate(180deg)":"none", transition:"transform 0.25s" }}/>
              </button>
              <div style={{ maxHeight:abhiprayOpen?"3000px":0, overflow:"hidden", transition:"max-height 0.4s ease" }}>
                <div style={{ padding:"12px", display:"grid", gridTemplateColumns:"1fr", gap:10 }}>
                  {TESTIMONIALS.map((item,i) => <TestimonialCard key={item.id} item={item} index={i} lang={lang}/>)}
                </div>
              </div>
            </div>
          ) : (
            <>
              <SectionHead mr="ट्रस्टच्या कामावदल लोकांचा अभिप्राय" en="Public Opinion on Trust's Work" lang={lang} sub_mr="समाजातील लोकांचे मत" sub_en="What people in society say" accent={T.gold}/>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12 }}>
                {TESTIMONIALS.map((item,i) => <TestimonialCard key={item.id} item={item} index={i} lang={lang}/>)}
              </div>
            </>
          )}
        </section>

        {/* Section 3 — Videos */}
        <section>
          {isMobile ? (
            <div style={{ background:T.card, borderRadius:T.radius, border:`1px solid ${T.border}`, overflow:"hidden", boxShadow:T.shadow }}>
              <button onClick={()=>handleTab("video")} style={{ width:"100%", display:"flex", alignItems:"center", justifyContent:"space-between", padding:"13px 16px", background:videoOpen?`linear-gradient(90deg,${T.red},#e53935)`:"white", border:"none", cursor:"pointer" }}>
                <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                  <Play size={15} color={videoOpen?"white":T.red}/>
                  <span style={{ fontFamily:T.font, fontWeight:800, fontSize:"0.9rem", color:videoOpen?"white":T.text }}>
                    {lang==="mr"?"ट्रस्टचे व्हिडिओ":"Trust's Videos"}
                  </span>
                </div>
                <ChevronDown size={16} color={videoOpen?"white":T.textSub} style={{ transform:videoOpen?"rotate(180deg)":"none", transition:"transform 0.25s" }}/>
              </button>
              <div style={{ maxHeight:videoOpen?"3000px":0, overflow:"hidden", transition:"max-height 0.4s ease" }}>
                <div style={{ padding:"12px", display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:10 }}>
                  {VIDEOS.map((item,i) => <VideoCard key={item.id} item={item} index={i} lang={lang}/>)}
                </div>
              </div>
            </div>
          ) : (
            <>
              <SectionHead mr="ट्रस्टचे व्हिडिओ" en="Trust's Videos" lang={lang} sub_mr="आमच्या उपक्रमांचे व्हिडिओ पाहा" sub_en="Watch videos of our initiatives" accent={T.red}/>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12 }}>
                {VIDEOS.map((item,i) => <VideoCard key={item.id} item={item} index={i} lang={lang}/>)}
              </div>
            </>
          )}
        </section>

        {/* Section 4 — Complaint Form */}
        <section>
          {isMobile ? (
            <div style={{ background:T.card, borderRadius:T.radius, border:`1px solid ${T.border}`, overflow:"hidden", boxShadow:T.shadow }}>
              <button onClick={()=>handleTab("takrar")} style={{ width:"100%", display:"flex", alignItems:"center", justifyContent:"space-between", padding:"13px 16px", background:takrarOpen?`linear-gradient(90deg,${T.navy},${T.navyMid})`:"white", border:"none", cursor:"pointer" }}>
                <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                  <Megaphone size={15} color={takrarOpen?"white":T.navy}/>
                  <span style={{ fontFamily:T.font, fontWeight:800, fontSize:"0.9rem", color:takrarOpen?"white":T.text }}>
                    {lang==="mr"?"तक्रार द्या":"File a Complaint"}
                  </span>
                </div>
                <ChevronDown size={16} color={takrarOpen?"white":T.textSub} style={{ transform:takrarOpen?"rotate(180deg)":"none", transition:"transform 0.25s" }}/>
              </button>
              <div style={{ maxHeight:takrarOpen?"1500px":0, overflow:"hidden", transition:"max-height 0.4s ease" }}>
                <TakrarForm lang={lang}/>
              </div>
            </div>
          ) : (
            <FadeIn>
              <div style={{ background:T.card, borderRadius:T.radius, border:`1px solid ${T.border}`, overflow:"hidden", boxShadow:T.shadow }}>
                <div style={{ background:`linear-gradient(90deg,${T.navy},${T.navyMid})`, borderBottom:`3px solid ${T.saffron}`, padding:"13px 20px", display:"flex", alignItems:"center", gap:8 }}>
                  <Megaphone size={16} color={T.saffron}/>
                  <span style={{ color:"white", fontWeight:800, fontSize:"0.92rem", fontFamily:T.font }}>
                    {lang==="mr"?"तक्रार / सूचना द्या":"File a Complaint / Suggestion"}
                  </span>
                </div>
                <TakrarForm lang={lang}/>
              </div>
            </FadeIn>
          )}
        </section>
      </div>

      {/* ── Social footer strip ── */}
      <div style={{ background:`linear-gradient(135deg,${T.navy},${T.navyMid})`, padding:"22px 24px", borderTop:`3px solid ${T.saffron}` }}>
        <div style={{ maxWidth:1100, margin:"0 auto", display:"flex", flexDirection:"column", alignItems:"center", gap:14 }}>
          <p style={{ margin:0, color:"rgba(255,255,255,0.55)", fontSize:"0.78rem", fontFamily:T.font, textAlign:"center" }}>
            {lang==="mr" ? "आमच्याशी जोडला जा" : "Connect with us"}
          </p>
          <div style={{ display:"flex", gap:10, flexWrap:"wrap", justifyContent:"center" }}>
            <SocialBtn icon={<Mail size={18}/>}      label="Email"     href="mailto:info@muktavyaspeeth.org" color="#ea4335"/>
            <SocialBtn icon={<MapPin size={18}/>}    label="Location"  href="https://maps.google.com"         color={T.green}/>
            <SocialBtn icon={<Users size={18}/>}     label="Facebook"  href="https://facebook.com"            color="#1877f2"/>
            <SocialBtn icon={<Camera size={18}/>}    label="Instagram" href="https://instagram.com"           color="#e1306c"/>
            <SocialBtn icon={<Phone size={18}/>}     label="Phone"     href="tel:+912164222000"               color={T.green}/>
            <SocialBtn icon={<Play size={18}/>}      label="YouTube"   href="https://youtube.com"             color="#ff0000"/>
          </div>
          <p style={{ margin:0, color:"rgba(255,255,255,0.3)", fontSize:"0.68rem", fontFamily:T.font }}>
            © 2024 मुक्त व्यासपीठ ट्रस्ट · सातारा, महाराष्ट्र
          </p>
        </div>
      </div>

      <Footer/>

      {/* ── Language FAB ── */}
      <div className="legacy-language-switcher" style={{ position:"fixed", bottom:24, right:24, zIndex:300 }}>
        {langOpen && (
          <div style={{ position:"absolute", bottom:60, right:0, background:"white", borderRadius:T.radius, boxShadow:T.shadowHov, overflow:"hidden", minWidth:148, animation:"slideUp 0.17s ease both", border:`1px solid ${T.border}` }}>
            {[{code:"mr",label:"🇮🇳  मराठी"},{code:"en",label:"🇬🇧  English"}].map(o=>(
              <button key={o.code} onClick={()=>{setLang(o.code);setLangOpen(false);}}
                style={{ display:"flex", alignItems:"center", width:"100%", padding:"10px 16px", border:"none", cursor:"pointer", fontSize:"0.83rem", fontWeight:lang===o.code?700:500, background:lang===o.code?"#eef5ee":"white", color:lang===o.code?T.green:T.textSub, borderLeft:lang===o.code?`3px solid ${T.green}`:"3px solid transparent", fontFamily:T.font, transition:"background 0.12s" }}>
                {o.label}
              </button>
            ))}
          </div>
        )}
        <button onClick={()=>setLangOpen(o=>!o)}
          style={{
            width:50, height:50, borderRadius:"50%",
            background:`linear-gradient(135deg,${T.green},${T.greenMid})`,
            border:`2px solid ${T.saffron}`,
            cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center",
            boxShadow:`0 4px 18px rgba(26,122,60,0.4)`,
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
        * { box-sizing:border-box; }
        ::-webkit-scrollbar{height:4px;width:4px}
        ::-webkit-scrollbar-track{background:#f5f7f2}
        ::-webkit-scrollbar-thumb{background:#bfccb0;border-radius:4px}
        select option{background:white;color:#0d1f0e}
        a{text-decoration:none}
      `}</style>
    </div>
  );
}