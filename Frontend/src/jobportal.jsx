import { useState, useEffect, useRef } from "react";
import {
  Search, MapPin, Briefcase, Phone, ChevronDown, ChevronRight,
  Building2, Users, Clock, Globe, Plus, CheckCircle, X, Filter,
  BookmarkPlus, Share2, UserCheck, ArrowRight, Zap, Star
} from "lucide-react";
import Navbar from "./navbar";
import Footer from "./footer";
import { useLang } from "./useLang";

// ─── Design tokens ────────────────────────────────────────────────────────────
const T = {
  brand:     "#1a56db",   // deep blue – primary action
  brandHov:  "#1648c0",
  brandSoft: "#eff4ff",   // very light tint for chips/hover
  brandBord: "#c7d7fd",
  green:     "#057a55",
  greenSoft: "#f0fdf4",
  amber:     "#92400e",
  amberSoft: "#fffbeb",
  amberBord: "#fde68a",
  red:       "#be123c",
  redSoft:   "#fff1f2",
  bg:        "#f4f6fb",   // page background
  card:      "#ffffff",
  border:    "#e5e9f0",
  borderDark:"#c8cfe0",
  text:      "#111827",
  textSub:   "#4b5563",
  textMuted: "#9ca3af",
  shadow:    "0 1px 4px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)",
  shadowHov: "0 4px 20px rgba(26,86,219,0.12), 0 1px 4px rgba(0,0,0,0.06)",
  radius:    10,
  font:      "'Noto Sans Devanagari','Inter','Segoe UI',system-ui,sans-serif",
};

// ─── Data ─────────────────────────────────────────────────────────────────────
const JOBS = [
  {
    id:1,
    shopName_mr:"सिद्धा नर्सरी",         shopName_en:"Siddha Nursery",
    jobType_mr:"नर्सरी कामासाठी कामगार",  jobType_en:"Nursery Worker",
    gender_mr:"लेडीज / जेन्टस्",          gender_en:"Ladies / Gents",
    phone:"8899665933",
    address_mr:"कराड, सातारा",            address_en:"Karad, Satara",
    salary_mr:"₹८,०००–१२,०००/महिना",     salary_en:"₹8,000–12,000/month",
    posted_mr:"२ दिवसांपूर्वी",           posted_en:"2 days ago",
    type_mr:"पूर्णवेळ",                   type_en:"Full-time",
    openings:3, verified:true, tag:"urgent",
  },
  {
    id:2,
    shopName_mr:"अरब ट्रेडर्स",           shopName_en:"Arab Traders",
    jobType_mr:"दुकान सहाय्यक",           jobType_en:"Shop Assistant",
    gender_mr:"जेन्टस्",                  gender_en:"Gents",
    phone:"9029256633",
    address_mr:"स्टँड परिसर, कराड",       address_en:"Stand Area, Karad",
    salary_mr:"₹७,०००–१०,०००/महिना",     salary_en:"₹7,000–10,000/month",
    posted_mr:"५ दिवसांपूर्वी",           posted_en:"5 days ago",
    type_mr:"पूर्णवेळ",                   type_en:"Full-time",
    openings:1, verified:true, tag:"",
  },
  {
    id:3,
    shopName_mr:"निमिशा हॉस्पिटल",        shopName_en:"Nimisha Hospital",
    jobType_mr:"रिसेप्शनिस्ट / ऑफिस लेडी", jobType_en:"Receptionist / Office Lady",
    gender_mr:"लेडीज",                    gender_en:"Ladies",
    phone:"9023147086",
    address_mr:"दत्त चौक, कराड",          address_en:"Datta Chowk, Karad",
    salary_mr:"₹१०,०००–१५,०००/महिना",    salary_en:"₹10,000–15,000/month",
    posted_mr:"१ दिवसापूर्वी",            posted_en:"1 day ago",
    type_mr:"पूर्णवेळ",                   type_en:"Full-time",
    openings:2, verified:true, tag:"new",
  },
  {
    id:4,
    shopName_mr:"कराड मेडिकल",            shopName_en:"Karad Medical",
    jobType_mr:"डिलिव्हरी बॉय",           jobType_en:"Delivery Boy",
    gender_mr:"जेन्टस्",                  gender_en:"Gents",
    phone:"9823456789",
    address_mr:"मुख्य बाजारपेठ, कराड",   address_en:"Main Market, Karad",
    salary_mr:"₹६,०००–८,०००/महिना",      salary_en:"₹6,000–8,000/month",
    posted_mr:"३ दिवसांपूर्वी",           posted_en:"3 days ago",
    type_mr:"अर्धवेळ",                    type_en:"Part-time",
    openings:2, verified:false, tag:"",
  },
  {
    id:5,
    shopName_mr:"श्री साई हॉटेल",         shopName_en:"Shri Sai Hotel",
    jobType_mr:"हॉटेल कामगार / वेटर",     jobType_en:"Hotel Worker / Waiter",
    gender_mr:"लेडीज / जेन्टस्",          gender_en:"Ladies / Gents",
    phone:"9712345678",
    address_mr:"एसटी स्टँड जवळ, कराड",   address_en:"Near ST Stand, Karad",
    salary_mr:"₹७,५००–११,०००/महिना",     salary_en:"₹7,500–11,000/month",
    posted_mr:"आज",                       posted_en:"Today",
    type_mr:"पूर्णवेळ",                   type_en:"Full-time",
    openings:4, verified:true, tag:"urgent",
  },
  {
    id:6,
    shopName_mr:"कराड ऑटो वर्क्स",        shopName_en:"Karad Auto Works",
    jobType_mr:"मेकॅनिक / हेल्पर",        jobType_en:"Mechanic / Helper",
    gender_mr:"जेन्टस्",                  gender_en:"Gents",
    phone:"9011234567",
    address_mr:"इंडस्ट्रियल एरिया, कराड", address_en:"Industrial Area, Karad",
    salary_mr:"₹९,०००–१४,०००/महिना",     salary_en:"₹9,000–14,000/month",
    posted_mr:"७ दिवसांपूर्वी",           posted_en:"7 days ago",
    type_mr:"पूर्णवेळ",                   type_en:"Full-time",
    openings:1, verified:false, tag:"",
  },
  {
    id:7,
    shopName_mr:"स्वराज क्लोदिंग",         shopName_en:"Swaraj Clothing",
    jobType_mr:"शोरूम सेल्स एक्झिक्युटिव्ह", jobType_en:"Showroom Sales Executive",
    gender_mr:"लेडीज",                    gender_en:"Ladies",
    phone:"9456789012",
    address_mr:"गांधी चौक, कराड",         address_en:"Gandhi Chowk, Karad",
    salary_mr:"₹१०,०००–१६,०००/महिना",    salary_en:"₹10,000–16,000/month",
    posted_mr:"आज",                       posted_en:"Today",
    type_mr:"पूर्णवेळ",                   type_en:"Full-time",
    openings:3, verified:true, tag:"new",
  },
  {
    id:8,
    shopName_mr:"कराड डेअरी",             shopName_en:"Karad Dairy",
    jobType_mr:"डेअरी कामगार / पॅकेजिंग", jobType_en:"Dairy Worker / Packaging",
    gender_mr:"लेडीज / जेन्टस्",          gender_en:"Ladies / Gents",
    phone:"9876543210",
    address_mr:"को-ऑप सोसायटी, कराड",    address_en:"Co-op Society, Karad",
    salary_mr:"₹५,५००–८,०००/महिना",      salary_en:"₹5,500–8,000/month",
    posted_mr:"४ दिवसांपूर्वी",           posted_en:"4 days ago",
    type_mr:"पूर्णवेळ",                   type_en:"Full-time",
    openings:5, verified:true, tag:"",
  },
  {
    id:9,
    shopName_mr:"विद्यापीठ कोचिंग",       shopName_en:"Vidyapeeth Coaching",
    jobType_mr:"शिक्षक / ट्युटर",         jobType_en:"Teacher / Tutor",
    gender_mr:"लेडीज / जेन्टस्",          gender_en:"Ladies / Gents",
    phone:"9123456789",
    address_mr:"कॉलेज रोड, कराड",         address_en:"College Road, Karad",
    salary_mr:"₹१२,०००–२०,०००/महिना",    salary_en:"₹12,000–20,000/month",
    posted_mr:"२ दिवसांपूर्वी",           posted_en:"2 days ago",
    type_mr:"अर्धवेळ",                    type_en:"Part-time",
    openings:2, verified:true, tag:"new",
  },
];

const JOB_TYPES_MR = ["पूर्णवेळ","अर्धवेळ","कंत्राटी","घरून काम"];
const JOB_TYPES_EN = ["Full-time","Part-time","Contract","Remote"];
const GENDER_MR    = ["सर्व","लेडीज","जेन्टस्"];
const GENDER_EN    = ["All","Ladies","Gents"];

// ─── Tag chip ─────────────────────────────────────────────────────────────────
function Tag({ tag }) {
  if (!tag) return null;
  const isUrgent = tag === "urgent";
  return (
    <span style={{
      display:"inline-flex", alignItems:"center", gap:3,
      fontSize:"0.67rem", fontWeight:700, letterSpacing:"0.5px",
      padding:"2px 8px", borderRadius:20,
      background: isUrgent ? T.redSoft   : T.greenSoft,
      color:      isUrgent ? T.red       : T.green,
      border:     `1px solid ${isUrgent ? "#fecdd3" : "#bbf7d0"}`,
      textTransform:"uppercase",
    }}>
      {isUrgent ? <Zap size={9}/> : <Star size={9}/>}
      {isUrgent ? "Urgent" : "New"}
    </span>
  );
}

// ─── Single Job Card ──────────────────────────────────────────────────────────
function JobCard({ job, index, lang, saved, onSave }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  const [hov, setHov] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVis(true); },
      { threshold:0.05 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const L = {
    apply:    lang==="mr" ? "अर्ज करा"     : "Apply Now",
    call:     lang==="mr" ? "कॉल करा"      : "Call",
    openings: lang==="mr" ? "रिक्त जागा"   : "Openings",
    verified: lang==="mr" ? "सत्यापित"     : "Verified",
    save:     lang==="mr" ? "जतन करा"      : "Save",
    saved:    lang==="mr" ? "जतन झाले"     : "Saved",
  };

  const shopName = job[`shopName_${lang}`];
  const jobType  = job[`jobType_${lang}`];
  const gender   = job[`gender_${lang}`];
  const address  = job[`address_${lang}`];
  const salary   = job[`salary_${lang}`];
  const posted   = job[`posted_${lang}`];
  const type     = job[`type_${lang}`];

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: T.card,
        border: `1px solid ${hov ? T.brandBord : T.border}`,
        borderRadius: T.radius,
        padding:"20px",
        boxShadow: hov ? T.shadowHov : T.shadow,
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(14px)",
        transition: `opacity 0.35s ease ${index*0.055}s, transform 0.35s ease ${index*0.055}s, box-shadow 0.2s, border-color 0.2s`,
        display:"flex", flexDirection:"column", gap:12,
        cursor:"default",
        position:"relative",
      }}
    >
      {/* Top row */}
      <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:8 }}>
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ display:"flex", alignItems:"center", gap:7, flexWrap:"wrap", marginBottom:4 }}>
            <Tag tag={job.tag} />
            {job.verified && (
              <span style={{
                display:"inline-flex", alignItems:"center", gap:3,
                fontSize:"0.66rem", color:T.green, fontWeight:600,
              }}>
                <CheckCircle size={11}/> {L.verified}
              </span>
            )}
          </div>
          <h3 style={{
            margin:0, fontSize:"clamp(0.88rem,2vw,1rem)",
            fontWeight:700, color:T.text, lineHeight:1.3,
            fontFamily:T.font,
          }}>{jobType}</h3>
          <div style={{
            display:"flex", alignItems:"center", gap:5,
            marginTop:4, fontSize:"0.8rem", color:T.textSub, fontWeight:500,
          }}>
            <Building2 size={13} color={T.brand}/>
            <span>{shopName}</span>
          </div>
        </div>
        {/* Bookmark */}
        <button
          onClick={() => onSave(job.id)}
          title={saved ? L.saved : L.save}
          style={{
            width:32, height:32, borderRadius:8, border:"none",
            background: saved ? T.brandSoft : "transparent",
            color: saved ? T.brand : T.textMuted,
            cursor:"pointer", display:"flex", alignItems:"center",
            justifyContent:"center", flexShrink:0,
            transition:"background 0.15s, color 0.15s",
          }}
        >
          <BookmarkPlus size={16} fill={saved ? T.brand : "none"} />
        </button>
      </div>

      {/* Meta chips */}
      <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
        {[
          { icon:<MapPin size={11}/>,    text:address },
          { icon:<Briefcase size={11}/>, text:type },
          { icon:<Users size={11}/>,     text:`${job.openings} ${L.openings}` },
          { icon:<Clock size={11}/>,     text:posted },
        ].map((m,i) => (
          <span key={i} style={{
            display:"inline-flex", alignItems:"center", gap:4,
            fontSize:"0.72rem", color:T.textSub,
            background:T.bg, border:`1px solid ${T.border}`,
            borderRadius:20, padding:"3px 9px",
          }}>
            <span style={{ color:T.textMuted }}>{m.icon}</span>
            {m.text}
          </span>
        ))}
      </div>

      {/* Gender + Salary */}
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", gap:8 }}>
        <div style={{ display:"flex", alignItems:"center", gap:4 }}>
          <UserCheck size={13} color={T.textMuted}/>
          <span style={{ fontSize:"0.76rem", color:T.textSub }}>{gender}</span>
        </div>
        <span style={{
          fontSize:"0.8rem", fontWeight:700, color:T.green,
          background:T.greenSoft, padding:"2px 10px", borderRadius:20,
          border:"1px solid #bbf7d0",
        }}>{salary}</span>
      </div>

      {/* Divider */}
      <div style={{ height:1, background:T.border }} />

      {/* Actions */}
      <div style={{ display:"flex", gap:8 }}>
        <a
          href={`tel:${job.phone}`}
          style={{
            flex:1, display:"flex", alignItems:"center",
            justifyContent:"center", gap:6,
            background: T.brand, color:"white",
            border:"none", borderRadius:8,
            padding:"9px 0", fontSize:"0.8rem", fontWeight:700,
            textDecoration:"none", cursor:"pointer",
            boxShadow:`0 2px 8px ${T.brand}44`,
            transition:"background 0.15s, transform 0.15s",
            fontFamily:T.font,
          }}
          onMouseEnter={e => { e.currentTarget.style.background=T.brandHov; e.currentTarget.style.transform="scale(1.02)"; }}
          onMouseLeave={e => { e.currentTarget.style.background=T.brand; e.currentTarget.style.transform="scale(1)"; }}
        >
          <Phone size={13}/> {L.call}
        </a>
        <button style={{
          flex:2, display:"flex", alignItems:"center",
          justifyContent:"center", gap:5,
          background:"white", color:T.brand,
          border:`1.5px solid ${T.brandBord}`,
          borderRadius:8, padding:"9px 0",
          fontSize:"0.8rem", fontWeight:700,
          cursor:"pointer", transition:"background 0.15s",
          fontFamily:T.font,
        }}
          onMouseEnter={e => { e.currentTarget.style.background=T.brandSoft; }}
          onMouseLeave={e => { e.currentTarget.style.background="white"; }}
        >
          {L.apply} <ArrowRight size={13}/>
        </button>
      </div>
    </div>
  );
}

// ─── Post Job Form Modal ──────────────────────────────────────────────────────
function PostJobModal({ lang, onClose }) {
  const [form, setForm] = useState({ shopName:"", jobType:"", count:"", gender:"", phone:"", salary:"", address:"" });
  const [step, setStep] = useState(1);

  const L = {
    title:   lang==="mr" ? "नोकरी जाहिरात द्या"  : "Post a Job",
    sub:     lang==="mr" ? "मोफत · ३० दिवस"      : "Free · 30 days",
    shop:    lang==="mr" ? "कंपनी / दुकानाचे नांव" : "Company / Shop Name",
    type:    lang==="mr" ? "कामाचे स्वरूप"        : "Job Title",
    count:   lang==="mr" ? "रिक्त जागा"           : "Openings",
    gender:  lang==="mr" ? "उमेदवार"              : "Candidates Needed",
    phone:   lang==="mr" ? "संपर्क क्रमांक"       : "Contact Number",
    salary:  lang==="mr" ? "पगार (ऐच्छिक)"        : "Salary (optional)",
    address: lang==="mr" ? "कामाचे ठिकाण"         : "Work Location",
    next:    lang==="mr" ? "पुढे"                  : "Next",
    submit:  lang==="mr" ? "जाहिरात प्रकाशित करा" : "Publish Job",
    back:    lang==="mr" ? "मागे"                  : "Back",
  };

  const inputStyle = {
    width:"100%", padding:"10px 14px",
    border:`1.5px solid ${T.border}`, borderRadius:8,
    fontSize:"0.85rem", color:T.text, background:T.card,
    outline:"none", fontFamily:T.font,
    transition:"border-color 0.2s, box-shadow 0.2s",
    boxSizing:"border-box",
  };
  const labelStyle = {
    display:"block", fontSize:"0.76rem", fontWeight:600,
    color:T.textSub, marginBottom:5, fontFamily:T.font,
  };
  const focus = e => { e.target.style.borderColor=T.brand; e.target.style.boxShadow=`0 0 0 3px ${T.brand}1a`; };
  const blur  = e => { e.target.style.borderColor=T.border; e.target.style.boxShadow="none"; };

  return (
    <div style={{
      position:"fixed", inset:0, zIndex:1000,
      background:"rgba(10,15,30,0.55)", backdropFilter:"blur(4px)",
      display:"flex", alignItems:"center", justifyContent:"center",
      padding:16,
    }}
      onClick={e => { if(e.target===e.currentTarget) onClose(); }}
    >
      <div style={{
        background:T.card, borderRadius:14, width:"100%", maxWidth:480,
        boxShadow:"0 20px 60px rgba(0,0,0,0.2)",
        animation:"modalIn 0.22s ease both",
        overflow:"hidden",
      }}>
        {/* Header */}
        <div style={{
          background:`linear-gradient(135deg,${T.brand},#3b82f6)`,
          padding:"20px 24px 18px",
          display:"flex", alignItems:"flex-start", justifyContent:"space-between",
        }}>
          <div>
            <h2 style={{ margin:0, color:"white", fontSize:"1.05rem", fontWeight:800, fontFamily:T.font }}>{L.title}</h2>
            <p style={{ margin:"4px 0 0", color:"rgba(255,255,255,0.75)", fontSize:"0.78rem" }}>{L.sub}</p>
          </div>
          <button onClick={onClose} style={{
            background:"rgba(255,255,255,0.15)", border:"none", borderRadius:8,
            width:32, height:32, display:"flex", alignItems:"center",
            justifyContent:"center", cursor:"pointer", color:"white",
            transition:"background 0.15s",
          }}><X size={16}/></button>
        </div>

        {/* Steps */}
        <div style={{ display:"flex", borderBottom:`1px solid ${T.border}` }}>
          {[1,2].map(s => (
            <div key={s} style={{
              flex:1, padding:"10px", textAlign:"center",
              fontSize:"0.75rem", fontWeight:step===s ? 700 : 500,
              color: step===s ? T.brand : T.textMuted,
              borderBottom: step===s ? `2px solid ${T.brand}` : "2px solid transparent",
              transition:"all 0.2s",
            }}>
              {s===1 ? (lang==="mr"?"१. मूलभूत माहिती":"1. Basic Info") : (lang==="mr"?"२. संपर्क":"2. Contact")}
            </div>
          ))}
        </div>

        {/* Body */}
        <div style={{ padding:"22px 24px" }}>
          {step === 1 ? (
            <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
              <div>
                <label style={labelStyle}>{L.shop}</label>
                <input style={inputStyle} placeholder={lang==="mr"?"उदा. सिद्धा नर्सरी":"e.g. Siddha Nursery"}
                  value={form.shopName} onChange={e=>setForm(p=>({...p,shopName:e.target.value}))}
                  onFocus={focus} onBlur={blur} />
              </div>
              <div>
                <label style={labelStyle}>{L.type}</label>
                <input style={inputStyle} placeholder={lang==="mr"?"उदा. नर्सरी कामगार":"e.g. Nursery Worker"}
                  value={form.jobType} onChange={e=>setForm(p=>({...p,jobType:e.target.value}))}
                  onFocus={focus} onBlur={blur} />
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
                <div>
                  <label style={labelStyle}>{L.count}</label>
                  <input style={inputStyle} placeholder="1" type="number" min="1"
                    value={form.count} onChange={e=>setForm(p=>({...p,count:e.target.value}))}
                    onFocus={focus} onBlur={blur} />
                </div>
                <div>
                  <label style={labelStyle}>{L.gender}</label>
                  <select style={{...inputStyle, cursor:"pointer"}}
                    value={form.gender} onChange={e=>setForm(p=>({...p,gender:e.target.value}))}
                    onFocus={focus} onBlur={blur}>
                    <option value="">{lang==="mr" ? "निवडा" : "Select"}</option>
                    {(lang==="mr"?GENDER_MR:GENDER_EN).map(g=><option key={g} value={g}>{g}</option>)}
                  </select>
                </div>
              </div>
              <button
                disabled={!form.shopName || !form.jobType}
                onClick={() => setStep(2)}
                style={{
                  background: form.shopName && form.jobType ? T.brand : T.border,
                  color: form.shopName && form.jobType ? "white" : T.textMuted,
                  border:"none", borderRadius:8, padding:"11px",
                  fontSize:"0.88rem", fontWeight:700, cursor: form.shopName ? "pointer" : "not-allowed",
                  width:"100%", fontFamily:T.font, transition:"background 0.2s",
                  display:"flex", alignItems:"center", justifyContent:"center", gap:6,
                }}
              >{L.next} <ArrowRight size={15}/></button>
            </div>
          ) : (
            <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
              <div>
                <label style={labelStyle}>{L.phone}</label>
                <input style={inputStyle} placeholder={lang==="mr" ? "मो. ९८९९९९९९९९" : "e.g. 9899999999"} type="tel"
                  value={form.phone} onChange={e=>setForm(p=>({...p,phone:e.target.value}))}
                  onFocus={focus} onBlur={blur} />
              </div>
              <div>
                <label style={labelStyle}>{L.address}</label>
                <input style={inputStyle} placeholder={lang==="mr"?"उदा. कराड, सातारा":"e.g. Karad, Satara"}
                  value={form.address} onChange={e=>setForm(p=>({...p,address:e.target.value}))}
                  onFocus={focus} onBlur={blur} />
              </div>
              <div>
                <label style={labelStyle}>{L.salary}</label>
                <input style={inputStyle} placeholder={lang==="mr"?"उदा. ₹८,०००–१२,०००/महिना":"e.g. ₹8,000–12,000/month"}
                  value={form.salary} onChange={e=>setForm(p=>({...p,salary:e.target.value}))}
                  onFocus={focus} onBlur={blur} />
              </div>
              <div style={{ display:"flex", gap:8 }}>
                <button onClick={() => setStep(1)} style={{
                  background:"white", color:T.textSub,
                  border:`1.5px solid ${T.border}`, borderRadius:8, padding:"11px",
                  fontSize:"0.85rem", fontWeight:600, cursor:"pointer",
                  flex:1, fontFamily:T.font, transition:"background 0.15s",
                }}>← {L.back}</button>
                <button
                  disabled={!form.phone}
                  onClick={onClose}
                  style={{
                    flex:2, background: form.phone ? T.brand : T.border,
                    color: form.phone ? "white" : T.textMuted,
                    border:"none", borderRadius:8, padding:"11px",
                    fontSize:"0.85rem", fontWeight:700,
                    cursor: form.phone ? "pointer" : "not-allowed",
                    fontFamily:T.font, transition:"background 0.2s",
                  }}
                >{L.submit}</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function JobPortal() {
  const { lang, setLang } = useLang();
  const [langOpen, setLangOpen]   = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [saved, setSaved]         = useState(new Set());
  const [isMobile, setIsMobile]   = useState(false);
  const [headerVis, setHeaderVis] = useState(false);
  const [search, setSearch]       = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterGender, setFilterGender] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 700);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setHeaderVis(true), 60);
    return () => clearTimeout(t);
  }, []);

  const toggleSave = id => setSaved(s => {
    const n = new Set(s);
    n.has(id) ? n.delete(id) : n.add(id);
    return n;
  });

  const L = {
    title:      lang==="mr" ? "नोकरी" : "Jobs",
    subtitle:   lang==="mr" ? "कराड आणि परिसरातील रोजगार संधी" : "Employment opportunities in Karad & nearby",
    searchPh:   lang==="mr" ? "नोकरी / कंपनी शोधा…"           : "Search job or company…",
    postJob:    lang==="mr" ? "नोकरी जाहिरात द्या"             : "Post a Job",
    results:    lang==="mr" ? "जाहिराती सापडल्या"              : "listings found",
    allType:    lang==="mr" ? "सर्व प्रकार"                    : "All types",
    allGender:  lang==="mr" ? "सर्व उमेदवार"                   : "All candidates",
    clearFilter:lang==="mr" ? "फिल्टर साफ करा"                 : "Clear filters",
    filterLabel:lang==="mr" ? "फिल्टर"                         : "Filters",
    noResults:  lang==="mr" ? "जाहिरात सापडली नाही"             : "No jobs found",
    noResultsSub:lang==="mr"? "शोध बदलून पहा"                  : "Try a different search",
  };

  const filtered = JOBS.filter(j => {
    const q = search.toLowerCase();
    const matchSearch = !q
      || j.jobType_en.toLowerCase().includes(q)
      || j.jobType_mr.includes(q)
      || j.shopName_en.toLowerCase().includes(q)
      || j.shopName_mr.includes(q)
      || j.address_en.toLowerCase().includes(q)
      || j.address_mr.includes(q);
    const matchType   = !filterType || j.type_en === filterType || j.type_mr === filterType;
    const matchGender = !filterGender
      || filterGender === "All" || filterGender === "सर्व"
      || j.gender_en.includes(filterGender) || j.gender_mr.includes(filterGender);
    return matchSearch && matchType && matchGender;
  });

  const activeFilters = (filterType ? 1:0) + (filterGender && filterGender !== (lang==="mr"?"सर्व":"All") ? 1:0);

  return (
    <div style={{
      minHeight:"100vh", background:T.bg,
      fontFamily:T.font, color:T.text,
    }}>
      <Navbar/>

      {/* ── Hero bar ── */}
      <div style={{
        background:`linear-gradient(135deg,#0f1c3f 0%,${T.brand} 60%,#3b82f6 100%)`,
        padding: isMobile ? "28px 16px 24px" : "36px 24px 32px",
        opacity: headerVis ? 1 : 0,
        transform: headerVis ? "none" : "translateY(-12px)",
        transition:"opacity 0.5s ease, transform 0.5s ease",
      }}>
        <div style={{ maxWidth:1080, margin:"0 auto" }}>
          <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:12, marginBottom:18 }}>
            <div>
              <h1 style={{
                margin:0, fontSize:"clamp(1.5rem,5vw,2.1rem)",
                fontWeight:900, color:"white", letterSpacing:"-0.5px",
                lineHeight:1.15, fontFamily:T.font,
              }}>{L.title}</h1>
              <p style={{ margin:"6px 0 0", color:"rgba(255,255,255,0.7)", fontSize:"0.85rem" }}>
                {L.subtitle}
              </p>
            </div>
            <button
              onClick={() => setShowModal(true)}
              style={{
                flexShrink:0,
                background:"white", color:T.brand,
                border:"none", borderRadius:8,
                padding: isMobile ? "9px 14px" : "10px 20px",
                fontSize:"0.82rem", fontWeight:700, cursor:"pointer",
                display:"flex", alignItems:"center", gap:6,
                boxShadow:"0 2px 12px rgba(0,0,0,0.15)",
                fontFamily:T.font, transition:"transform 0.18s, box-shadow 0.18s",
                whiteSpace:"nowrap",
              }}
              onMouseEnter={e => { e.currentTarget.style.transform="scale(1.03)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform="scale(1)"; }}
            >
              <Plus size={15}/> {L.postJob}
            </button>
          </div>

          {/* Search bar */}
          <div style={{
            display:"flex", gap:8,
            flexDirection: isMobile ? "column" : "row",
          }}>
            <div style={{ position:"relative", flex:1 }}>
              <Search size={16} style={{
                position:"absolute", left:14, top:"50%",
                transform:"translateY(-50%)", color:T.textMuted,
              }}/>
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder={L.searchPh}
                style={{
                  width:"100%", padding:"12px 14px 12px 40px",
                  border:"none", borderRadius:8,
                  fontSize:"0.88rem", color:T.text, background:"white",
                  outline:"none", boxSizing:"border-box",
                  boxShadow:"0 2px 8px rgba(0,0,0,0.1)",
                  fontFamily:T.font,
                }}
              />
              {search && (
                <button onClick={() => setSearch("")}
                  style={{
                    position:"absolute", right:10, top:"50%",
                    transform:"translateY(-50%)",
                    background:"none", border:"none", cursor:"pointer",
                    color:T.textMuted, display:"flex", padding:2,
                  }}>
                  <X size={15}/>
                </button>
              )}
            </div>
            <button
              onClick={() => setFilterOpen(o => !o)}
              style={{
                background: activeFilters > 0 ? "white" : "rgba(255,255,255,0.15)",
                color: activeFilters > 0 ? T.brand : "white",
                border: "none", borderRadius:8,
                padding:"12px 16px", fontSize:"0.85rem", fontWeight:600,
                cursor:"pointer", display:"flex", alignItems:"center", gap:6,
                fontFamily:T.font, whiteSpace:"nowrap",
                transition:"background 0.15s",
                boxShadow: activeFilters > 0 ? "0 2px 8px rgba(0,0,0,0.1)" : "none",
              }}
            >
              <Filter size={15}/>
              {L.filterLabel}
              {activeFilters > 0 && (
                <span style={{
                  background:T.brand, color:"white",
                  borderRadius:20, fontSize:"0.68rem", fontWeight:700,
                  padding:"1px 7px",
                }}>{activeFilters}</span>
              )}
            </button>
          </div>

          {/* Filter row */}
          {filterOpen && (
            <div style={{
              marginTop:10, display:"flex", gap:8, flexWrap:"wrap",
              animation:"slideDown 0.2s ease both",
            }}>
              <select
                value={filterType}
                onChange={e => setFilterType(e.target.value)}
                style={{
                  padding:"8px 14px", borderRadius:8, border:"none",
                  fontSize:"0.82rem", background:"rgba(255,255,255,0.15)",
                  color:"white", cursor:"pointer", outline:"none", fontFamily:T.font,
                }}
              >
                <option value="" style={{color:T.text}}>{L.allType}</option>
                {(lang==="mr"?JOB_TYPES_MR:JOB_TYPES_EN).map(t=>(
                  <option key={t} value={t} style={{color:T.text}}>{t}</option>
                ))}
              </select>
              <select
                value={filterGender}
                onChange={e => setFilterGender(e.target.value)}
                style={{
                  padding:"8px 14px", borderRadius:8, border:"none",
                  fontSize:"0.82rem", background:"rgba(255,255,255,0.15)",
                  color:"white", cursor:"pointer", outline:"none", fontFamily:T.font,
                }}
              >
                <option value="" style={{color:T.text}}>{L.allGender}</option>
                {(lang==="mr"?GENDER_MR:GENDER_EN).map(g=>(
                  <option key={g} value={g} style={{color:T.text}}>{g}</option>
                ))}
              </select>
              {activeFilters > 0 && (
                <button onClick={() => { setFilterType(""); setFilterGender(""); }}
                  style={{
                    background:"rgba(255,255,255,0.15)", color:"rgba(255,255,255,0.85)",
                    border:"none", borderRadius:8, padding:"8px 14px",
                    fontSize:"0.78rem", cursor:"pointer", fontFamily:T.font,
                    display:"flex", alignItems:"center", gap:5,
                  }}>
                  <X size={12}/> {L.clearFilter}
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ── Body ── */}
      <div style={{ maxWidth:1080, margin:"0 auto", padding: isMobile ? "16px 12px 80px" : "24px 24px 80px" }}>

        {/* Result count */}
        <div style={{
          display:"flex", alignItems:"center", justifyContent:"space-between",
          marginBottom:16,
        }}>
          <p style={{ margin:0, fontSize:"0.82rem", color:T.textSub, fontWeight:500 }}>
            <strong style={{ color:T.text }}>{filtered.length}</strong> {L.results}
          </p>
          {saved.size > 0 && (
            <span style={{
              fontSize:"0.78rem", color:T.brand, fontWeight:600,
              display:"flex", alignItems:"center", gap:4,
            }}>
              <BookmarkPlus size={13} fill={T.brand}/> {saved.size} {lang==="mr" ? "जतन" : "saved"}
            </span>
          )}
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div style={{
            textAlign:"center", padding:"60px 20px",
            background:T.card, borderRadius:T.radius,
            border:`1px solid ${T.border}`,
          }}>
            <div style={{ fontSize:"2.5rem", marginBottom:10 }}>🔍</div>
            <div style={{ fontSize:"1rem", fontWeight:700, color:T.text, marginBottom:6 }}>
              {L.noResults}
            </div>
            <div style={{ fontSize:"0.82rem", color:T.textMuted }}>
              {L.noResultsSub}
            </div>
            <button onClick={() => { setSearch(""); setFilterType(""); setFilterGender(""); }}
              style={{
                marginTop:16, background:T.brand, color:"white",
                border:"none", borderRadius:8, padding:"9px 18px",
                fontSize:"0.82rem", fontWeight:600, cursor:"pointer",
                fontFamily:T.font,
              }}
            >{lang==="mr" ? "सर्व जाहिराती" : "Show all jobs"}</button>
          </div>
        ) : (
          <div style={{
            display:"grid",
            gridTemplateColumns: isMobile
              ? "1fr"
              : "repeat(auto-fill, minmax(300px, 1fr))",
            gap:14,
          }}>
            {filtered.map((job, i) => (
              <JobCard
                key={job.id} job={job} index={i} lang={lang}
                saved={saved.has(job.id)} onSave={toggleSave}
              />
            ))}
          </div>
        )}
      </div>

      <Footer/>

      {/* ── Language FAB ── */}
      <div className="legacy-language-switcher" style={{ position:"fixed", bottom:24, right:24, zIndex:300 }}>
        {langOpen && (
          <div style={{
            position:"absolute", bottom:62, right:0,
            background:"white", borderRadius:12,
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
                  background: lang===o.code ? T.brandSoft : "white",
                  color:      lang===o.code ? T.brand    : T.textSub,
                  borderLeft: lang===o.code ? `3px solid ${T.brand}` : "3px solid transparent",
                  fontFamily:T.font, transition:"background 0.12s",
                }}
              >{o.label}</button>
            ))}
          </div>
        )}
        <button
          onClick={() => setLangOpen(o => !o)}
          style={{
            width:52, height:52, borderRadius:"50%",
            background:`linear-gradient(135deg,${T.brand},#3b82f6)`,
            border:"none", cursor:"pointer",
            display:"flex", alignItems:"center", justifyContent:"center",
            boxShadow:`0 4px 20px ${T.brand}55`,
            transition:"transform 0.2s ease, box-shadow 0.2s ease",
          }}
          onMouseEnter={e => { e.currentTarget.style.transform="scale(1.1) rotate(15deg)"; }}
          onMouseLeave={e => { e.currentTarget.style.transform="scale(1) rotate(0deg)"; }}
        >
          <Globe size={22} color="white"/>
        </button>
      </div>

      {showModal && <PostJobModal lang={lang} onClose={() => setShowModal(false)}/>}

      <style>{`
        @keyframes slideUp { from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)} }
        @keyframes slideDown { from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:translateY(0)} }
        @keyframes modalIn { from{opacity:0;transform:scale(0.96)}to{opacity:1;transform:scale(1)} }
        * { box-sizing:border-box; }
        ::-webkit-scrollbar{width:6px} ::-webkit-scrollbar-track{background:#f0f0f5}
        ::-webkit-scrollbar-thumb{background:#cbd5e1;border-radius:6px}
      `}</style>
    </div>
  );
}