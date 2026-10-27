// MarriageProfiles.jsx — Matrimony / Bio-Data Portal
// React + Vite (inline styles, no Tailwind) · Backend: Node + Express + MongoDB
// Font → index.html:
// <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;600;700;900&family=Inter:wght@400;500;600;700;800&family=Playfair+Display:wght@600;700&display=swap" rel="stylesheet">
//
// .env (Vite):  VITE_API_URL=http://localhost:5000
// API contract (Express):
//   GET  /api/profiles?gender=bride|groom&page=1&limit=8&q=&city=&minAge=&maxAge=  → { data:[Profile], total:Number }
//   POST /api/profiles/:id/interest   (auth)                                         → { ok:true }
//   POST /api/profiles/:id/shortlist  (auth)                                         → { ok:true }
// If the API is unreachable, the page falls back to the SAMPLE data below.

import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import Navbar from "./navbar";
import Footer from "./footer";
import { useLang } from "./useLang";

const API = import.meta.env?.VITE_API_URL || "http://localhost:5000";
const PAGE_SIZE = 8; // 4 columns × 2 rows on desktop — same as the reference layout

// ── Design tokens (same family as DonatePoor) ────────────────────────────────
const T = {
  bg: "#f4f6fb", card: "#ffffff", border: "#e4e8f0", borderDk: "#c8cfdf",
  navy: "#0d2236", navyMid: "#14324f",
  green: "#16a34a", greenSoft: "#dcfce7",
  amber: "#d97706", amberSoft: "#fef3c7",
  rose: "#be185d", roseSoft: "#fce7f3", roseBorder: "#f9a8d4",
  blue: "#1d4ed8", blueSoft: "#dbeafe", blueBorder: "#93c5fd",
  gold: "#b7791f", peach: "#fde6d6", paper: "#fffdf8",
  text: "#111827", textSub: "#4b5563", textMuted: "#9ca3af",
  shadow: "0 1px 4px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)",
  shadowHov: "0 10px 34px rgba(0,0,0,0.14)",
  radius: 12,
  font: "'Noto Sans Devanagari','Inter','Segoe UI',system-ui,sans-serif",
  serif: "'Playfair Display','Noto Serif Devanagari',Georgia,serif",
};
const ACCENT = { bride: { c: T.rose, soft: T.roseSoft, b: T.roseBorder }, groom: { c: T.blue, soft: T.blueSoft, b: T.blueBorder } };

// ── Bilingual UI labels ──────────────────────────────────────────────────────
const L = {
  mr: {
    title: "विवाह जुळवणी", sub: "वर-वधू सूचक · विश्वासार्ह, पडताळणी केलेली बायोडेटा",
    brides: "वधू", grooms: "वर", search: "नाव / शहर शोधा", allAge: "सर्व वय", reset: "साफ करा",
    personal: "वैयक्तिक माहिती", edu: "शिक्षण व नोकरी", family: "कौटुंबिक माहिती", contact: "संपर्क",
    age: "वय", height: "उंची", marital: "वैवाहिक स्थिती", complexion: "वर्ण", edul: "शिक्षण", job: "व्यवसाय",
    income: "उत्पन्न", father: "वडील", mother: "आई", sib: "भावंडे", city: "शहर", phone: "मोबाईल",
    religion: "धर्म / जात", rashi: "रास / गण", diet: "आहार", about: "माझ्याबद्दल", expect: "अपेक्षा",
    view: "संपूर्ण बायोडेटा", interest: "रस दाखवा", sent: "पाठवले ✓", save: "जतन करा", saved: "जतन केले",
    verified: "पडताळणी केली", print: "प्रिंट", close: "बंद करा", empty: "कोणतेही प्रोफाइल सापडले नाही",
    emptyHint: "फिल्टर बदला किंवा साफ करा.", shown: "प्रोफाइल्स", prev: "मागील", next: "पुढील",
    open: "उघडा", hide: "लपवा",
  },
  en: {
    title: "Marriage Bio-Data", sub: "Trusted matchmaking · Verified bio-data profiles",
    brides: "Brides", grooms: "Grooms", search: "Search name / city", allAge: "All ages", reset: "Clear",
    personal: "Personal Details", edu: "Education & Career", family: "Family Details", contact: "Contact",
    age: "Age", height: "Height", marital: "Marital Status", complexion: "Complexion", edul: "Education", job: "Occupation",
    income: "Income", father: "Father", mother: "Mother", sib: "Siblings", city: "City", phone: "Mobile",
    religion: "Religion / Caste", rashi: "Rashi / Gan", diet: "Diet", about: "About me", expect: "Expectations",
    view: "View full bio-data", interest: "Send interest", sent: "Sent ✓", save: "Shortlist", saved: "Shortlisted",
    verified: "Verified", print: "Print", close: "Close", empty: "No profiles found",
    emptyHint: "Change or clear the filters.", shown: "profiles", prev: "Previous", next: "Next",
    open: "Show", hide: "Hide",
  },
};

// ── Sample data (replace by MongoDB response) ────────────────────────────────
const mk = (id, gender, o) => ({ id, gender, verified: id % 3 !== 0, marital: "Never married", diet: "Vegetarian", religion: "Hindu – Maratha", ...o });
const SAMPLE = [
  mk(1, "groom", { name_mr: "अमित पाटील", name_en: "Amit Patil", age: 29, height: "5'10\"", city_mr: "पुणे", city_en: "Pune", edu_mr: "बी.ई. (संगणक)", edu_en: "B.E. Computer", job_mr: "सॉफ्टवेअर इंजिनिअर", job_en: "Software Engineer", income: "₹14 LPA", father: "Retd. Teacher", mother: "Homemaker", sib: "1 sister", complexion: "Wheatish", rashi: "Mesh / Dev", phone: "98•••••210", avatar: "https://randomuser.me/api/portraits/men/32.jpg", about: "Grounded, family-oriented and fond of trekking.", expect: "Educated, caring and well-settled family background." }),
  mk(2, "groom", { name_mr: "रोहित देशमुख", name_en: "Rohit Deshmukh", age: 31, height: "5'8\"", city_mr: "सातारा", city_en: "Satara", edu_mr: "एम.बी.ए.", edu_en: "MBA", job_mr: "बँक मॅनेजर", job_en: "Bank Manager", income: "₹11 LPA", father: "Farmer", mother: "Homemaker", sib: "1 brother", complexion: "Fair", rashi: "Tula / Manushya", phone: "97•••••884", avatar: "https://randomuser.me/api/portraits/men/45.jpg", about: "Simple, disciplined and values-driven.", expect: "Working or homemaker, open-minded." }),
  mk(3, "groom", { name_mr: "डॉ. सागर जोशी", name_en: "Dr. Sagar Joshi", age: 32, height: "5'11\"", city_mr: "कोल्हापूर", city_en: "Kolhapur", edu_mr: "एम.डी.", edu_en: "MD Medicine", job_mr: "डॉक्टर", job_en: "Physician", income: "₹24 LPA", father: "Businessman", mother: "Homemaker", sib: "2 sisters", complexion: "Fair", rashi: "Dhanu / Dev", phone: "99•••••532", avatar: "https://randomuser.me/api/portraits/men/67.jpg", religion: "Hindu – Brahmin", about: "Calm, caring and passionate about public health.", expect: "Medical or well-educated professional." }),
  mk(4, "groom", { name_mr: "विशाल मोरे", name_en: "Vishal More", age: 27, height: "5'9\"", city_mr: "नाशिक", city_en: "Nashik", edu_mr: "बी.कॉम.", edu_en: "B.Com", job_mr: "व्यवसाय", job_en: "Own Business", income: "₹9 LPA", father: "Businessman", mother: "Homemaker", sib: "1 brother", complexion: "Wheatish", rashi: "Kanya / Manushya", phone: "90•••••761", avatar: "https://randomuser.me/api/portraits/men/22.jpg", about: "Entrepreneurial and cheerful.", expect: "Supportive and family-minded." }),
  mk(5, "groom", { name_mr: "निखिल शिंदे", name_en: "Nikhil Shinde", age: 30, height: "5'7\"", city_mr: "मुंबई", city_en: "Mumbai", edu_mr: "एम.एस. (यूएसए)", edu_en: "MS (USA)", job_mr: "डेटा सायंटिस्ट", job_en: "Data Scientist", income: "₹22 LPA", father: "Govt. Officer", mother: "Teacher", sib: "None", complexion: "Fair", rashi: "Meen / Dev", phone: "88•••••093", avatar: "https://randomuser.me/api/portraits/men/75.jpg", about: "Curious mind, loves music and travel.", expect: "Educated, independent and kind." }),
  mk(6, "groom", { name_mr: "प्रथमेश कदम", name_en: "Prathamesh Kadam", age: 28, height: "5'10\"", city_mr: "सांगली", city_en: "Sangli", edu_mr: "बी.टेक.", edu_en: "B.Tech Civil", job_mr: "सिव्हिल इंजिनिअर", job_en: "Civil Engineer", income: "₹8 LPA", father: "Retd. Clerk", mother: "Homemaker", sib: "1 sister", complexion: "Wheatish", rashi: "Simha / Rakshas", phone: "95•••••447", avatar: "https://randomuser.me/api/portraits/men/54.jpg", about: "Hard-working and respectful of tradition.", expect: "Traditional values with modern outlook." }),
  mk(7, "groom", { name_mr: "ओंकार गायकवाड", name_en: "Omkar Gaikwad", age: 33, height: "6'0\"", city_mr: "कराड", city_en: "Karad", edu_mr: "एम.ए.", edu_en: "M.A.", job_mr: "प्राध्यापक", job_en: "Professor", income: "₹10 LPA", father: "Farmer", mother: "Homemaker", sib: "1 brother, 1 sister", complexion: "Fair", rashi: "Vrushabh / Manushya", phone: "93•••••318", avatar: "https://randomuser.me/api/portraits/men/81.jpg", about: "Soft-spoken and book-loving.", expect: "Educated and understanding." }),
  mk(8, "groom", { name_mr: "योगेश चव्हाण", name_en: "Yogesh Chavan", age: 26, height: "5'8\"", city_mr: "सोलापूर", city_en: "Solapur", edu_mr: "बी.एस्सी. (कृषी)", edu_en: "B.Sc. Agriculture", job_mr: "कृषी अधिकारी", job_en: "Agri Officer", income: "₹7 LPA", father: "Farmer", mother: "Homemaker", sib: "1 sister", complexion: "Wheatish", rashi: "Karka / Dev", phone: "94•••••905", avatar: "https://randomuser.me/api/portraits/men/12.jpg", about: "Down-to-earth with a love for farming tech.", expect: "Simple and family-oriented." }),
  mk(9, "bride", { name_mr: "सुप्रिया कुलकर्णी", name_en: "Supriya Kulkarni", age: 26, height: "5'4\"", city_mr: "पुणे", city_en: "Pune", edu_mr: "एम.एस्सी.", edu_en: "M.Sc. Chemistry", job_mr: "संशोधक", job_en: "Research Associate", income: "₹8 LPA", father: "Engineer", mother: "Homemaker", sib: "1 brother", complexion: "Fair", rashi: "Kanya / Dev", phone: "98•••••117", avatar: "https://randomuser.me/api/portraits/women/44.jpg", religion: "Hindu – Brahmin", about: "Warm, creative and loves classical music.", expect: "Well-educated, respectful partner." }),
  mk(10, "bride", { name_mr: "प्रियंका सावंत", name_en: "Priyanka Sawant", age: 25, height: "5'3\"", city_mr: "सातारा", city_en: "Satara", edu_mr: "बी.एड.", edu_en: "B.Ed.", job_mr: "शिक्षिका", job_en: "Teacher", income: "₹4 LPA", father: "Farmer", mother: "Homemaker", sib: "1 sister", complexion: "Wheatish", rashi: "Meen / Manushya", phone: "97•••••620", avatar: "https://randomuser.me/api/portraits/women/68.jpg", about: "Gentle, patient and fond of cooking.", expect: "Caring and settled." }),
  mk(11, "bride", { name_mr: "डॉ. नेहा गोखले", name_en: "Dr. Neha Gokhale", age: 28, height: "5'5\"", city_mr: "मुंबई", city_en: "Mumbai", edu_mr: "बी.डी.एस.", edu_en: "BDS", job_mr: "दंतचिकित्सक", job_en: "Dentist", income: "₹12 LPA", father: "CA", mother: "Professor", sib: "None", complexion: "Fair", rashi: "Tula / Dev", phone: "99•••••404", avatar: "https://randomuser.me/api/portraits/women/65.jpg", religion: "Hindu – Brahmin", about: "Outgoing, empathetic and career-minded.", expect: "Professionally settled partner." }),
  mk(12, "bride", { name_mr: "स्नेहल पवार", name_en: "Snehal Pawar", age: 24, height: "5'2\"", city_mr: "कोल्हापूर", city_en: "Kolhapur", edu_mr: "बी.कॉम.", edu_en: "B.Com", job_mr: "लेखापाल", job_en: "Accountant", income: "₹3.6 LPA", father: "Businessman", mother: "Homemaker", sib: "1 brother", complexion: "Wheatish", rashi: "Mithun / Dev", phone: "90•••••275", avatar: "https://randomuser.me/api/portraits/women/33.jpg", about: "Cheerful and family-first.", expect: "Understanding and well-mannered." }),
];

// ── Hooks ────────────────────────────────────────────────────────────────────
function useWidth() {
  const [w, setW] = useState(typeof window === "undefined" ? 1200 : window.innerWidth);
  useEffect(() => {
    const fn = () => setW(window.innerWidth);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  return w;
}
function useReducedMotion() {
  const [r, setR] = useState(false);
  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    setR(m.matches);
    const fn = e => setR(e.matches);
    m.addEventListener?.("change", fn);
    return () => m.removeEventListener?.("change", fn);
  }, []);
  return r;
}
function useProfiles({ gender, page, q, minAge, maxAge }) {
  const [state, setState] = useState({ data: [], total: 0, loading: true });
  useEffect(() => {
    const ctrl = new AbortController();
    setState(s => ({ ...s, loading: true }));
    const qs = new URLSearchParams({ gender, page, limit: PAGE_SIZE, q, minAge, maxAge });
    fetch(`${API}/api/profiles?${qs}`, { signal: ctrl.signal })
      .then(r => { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then(j => setState({ data: j.data || [], total: j.total || 0, loading: false }))
      .catch(err => {
        if (err.name === "AbortError") return;
        // Offline / API down → local fallback with the same filters
        const needle = q.trim().toLowerCase();
        const all = SAMPLE.filter(p => p.gender === gender
          && p.age >= minAge && p.age <= maxAge
          && (!needle || [p.name_en, p.name_mr, p.city_en, p.city_mr].some(v => v.toLowerCase().includes(needle))));
        setState({ data: all.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE), total: all.length, loading: false });
      });
    return () => ctrl.abort();
  }, [gender, page, q, minAge, maxAge]);
  return state;
}
function useShortlist() {
  const [ids, setIds] = useState(() => {
    try { return JSON.parse(localStorage.getItem("shortlist") || "[]"); } catch { return []; }
  });
  const toggle = useCallback(id => {
    setIds(prev => {
      const next = prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id];
      try { localStorage.setItem("shortlist", JSON.stringify(next)); } catch {}
      fetch(`${API}/api/profiles/${id}/shortlist`, { method: "POST" }).catch(() => {});
      return next;
    });
  }, []);
  return [ids, toggle];
}

// ── Small pieces ─────────────────────────────────────────────────────────────
const Icon = ({ d, size = 14, color = "currentColor", sw = 2, fill = "none" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} stroke={color} strokeWidth={sw} fill={fill} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{d}</svg>
);
const I = {
  heart: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z" />,
  star: <polygon points="12 2 15.1 8.3 22 9.3 17 14.1 18.2 21 12 17.8 5.8 21 7 14.1 2 9.3 8.9 8.3 12 2" />,
  check: <polyline points="20 6 9 17 4 12" />,
  x: <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>,
  chev: <polyline points="6 9 12 15 18 9" />,
  left: <polyline points="15 18 9 12 15 6" />,
  right: <polyline points="9 18 15 12 9 6" />,
  search: <><circle cx="11" cy="11" r="7" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></>,
  print: <><polyline points="6 9 6 2 18 2 18 9" /><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" /><rect x="6" y="14" width="12" height="8" /></>,
};

// Corner flourish for the bio-data frame (echoes the floral border in the reference)
const Corner = ({ pos, color }) => {
  const rot = { tl: 0, tr: 90, br: 180, bl: 270 }[pos];
  const place = { tl: { top: 2, left: 2 }, tr: { top: 2, right: 2 }, br: { bottom: 2, right: 2 }, bl: { bottom: 2, left: 2 } }[pos];
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" style={{ position: "absolute", ...place, transform: `rotate(${rot}deg)`, pointerEvents: "none" }} aria-hidden="true">
      <path d="M2 22V10C2 5 5 2 10 2h12" fill="none" stroke={color} strokeWidth="1.4" />
      <path d="M6 18V11c0-3 2-5 5-5h7" fill="none" stroke={color} strokeWidth="0.8" opacity="0.7" />
      <circle cx="4.5" cy="4.5" r="1.8" fill={color} />
    </svg>
  );
};

function Avatar({ p, size, ring }) {
  const [err, setErr] = useState(false);
  const initials = p.name_en.replace(/^(Dr\.|Shri\.|Sau\.)\s*/, "").split(" ").map(s => s[0]).join("").slice(0, 2);
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%", overflow: "hidden", flexShrink: 0,
      border: `3px solid ${ring}`, background: "#fff",
      boxShadow: `0 0 0 4px ${ACCENT[p.gender].soft}, 0 6px 18px ${ring}55`,
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      {!err
        ? <img src={p.avatar} alt={p.name_en} loading="lazy" onError={() => setErr(true)} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        : <span style={{ fontFamily: T.font, fontWeight: 900, fontSize: size / 3, color: ring }}>{initials}</span>}
    </div>
  );
}

// ── Bio-data sheet (used in card + modal) ────────────────────────────────────
function BioSheet({ p, lang, full }) {
  const t = L[lang];
  const ac = ACCENT[p.gender];
  const v = k => p[`${k}_${lang}`] ?? p[`${k}_en`];
  const Sec = ({ title, rows }) => (
    <div style={{ marginBottom: 7 }}>
      <div style={{ background: T.peach, color: "#7c3a12", fontWeight: 800, fontSize: full ? "0.74rem" : "0.64rem", padding: "2px 7px", borderRadius: 3, fontFamily: T.font, marginBottom: 3 }}>{title}</div>
      {rows.filter(r => r[1]).map(([k, val]) => (
        <div key={k} style={{ display: "grid", gridTemplateColumns: "42% 1fr", gap: 4, fontSize: full ? "0.78rem" : "0.66rem", lineHeight: 1.55, fontFamily: T.font, padding: "0 4px" }}>
          <span style={{ color: T.textSub }}>{k}</span>
          <span style={{ color: T.text, fontWeight: 600, overflowWrap: "anywhere" }}>{val}</span>
        </div>
      ))}
    </div>
  );
  return (
    <div style={{ position: "relative", background: T.paper, border: `1.5px solid ${ac.c}`, borderRadius: 6, padding: full ? 5 : 4, boxShadow: "inset 0 0 0 3px #fff" }}>
      <div style={{ position: "relative", border: `1px solid ${ac.b}`, borderRadius: 4, padding: full ? "16px 16px 10px" : "14px 10px 8px" }}>
        {["tl", "tr", "br", "bl"].map(c => <Corner key={c} pos={c} color={ac.c} />)}
        <div style={{ textAlign: "center", fontFamily: T.serif, fontWeight: 700, color: ac.c, fontSize: full ? "1.05rem" : "0.78rem", letterSpacing: "0.5px", marginBottom: 8 }}>
          {lang === "mr" ? "॥ बायोडेटा ॥" : "BIO-DATA"}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: full ? "1fr 1fr" : "1fr", columnGap: 16 }}>
          <div>
            <Sec title={t.personal} rows={[
              [t.age, `${p.age} yrs`], [t.height, p.height], [t.marital, p.marital], [t.complexion, p.complexion],
              ...(full ? [[t.religion, p.religion], [t.rashi, p.rashi], [t.diet, p.diet]] : []),
            ]} />
            <Sec title={t.edu} rows={[[t.edul, v("edu")], [t.job, v("job")], [t.income, p.income]]} />
          </div>
          <div>
            <Sec title={t.family} rows={[[t.father, p.father], [t.mother, p.mother], [t.sib, p.sib]]} />
            <Sec title={t.contact} rows={[[t.city, v("city")], [t.phone, p.phone]]} />
            {full && <Sec title={t.about} rows={[["", p.about]]} />}
            {full && <Sec title={t.expect} rows={[["", p.expect]]} />}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Modal ────────────────────────────────────────────────────────────────────
function BioModal({ p, lang, onClose }) {
  const t = L[lang];
  const ac = ACCENT[p.gender];
  const closeRef = useRef(null);
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const fn = e => e.key === "Escape" && onClose();
    window.addEventListener("keydown", fn);
    return () => { document.body.style.overflow = prevOverflow; window.removeEventListener("keydown", fn); };
  }, [onClose]);
  return (
    <div onClick={onClose} role="dialog" aria-modal="true" aria-label={p.name_en}
      style={{ position: "fixed", inset: 0, zIndex: 9999, background: "rgba(8,12,24,0.78)", display: "flex", alignItems: "center", justifyContent: "center", padding: 12, animation: "mpFade .18s ease" }}>
      <div onClick={e => e.stopPropagation()} className="bio-print"
        style={{ background: "#fff", borderRadius: 16, width: "min(720px,100%)", maxHeight: "92vh", overflowY: "auto", padding: "18px 18px 16px", animation: "mpPop .22s cubic-bezier(.2,.9,.3,1)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}>
          <Avatar p={p} size={76} ring={ac.c} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <h3 style={{ margin: 0, fontFamily: T.font, fontWeight: 900, fontSize: "1.1rem", color: T.text }}>{lang === "mr" ? p.name_mr : p.name_en}</h3>
            <div style={{ fontSize: "0.78rem", color: T.textSub, fontFamily: T.font }}>{p.age} · {p.height} · {lang === "mr" ? p.city_mr : p.city_en}</div>
          </div>
          <button className="no-print" onClick={() => window.print()} aria-label={t.print} style={iconBtn}><Icon d={I.print} size={15} color={T.textSub} /></button>
          <button className="no-print" ref={closeRef} onClick={onClose} aria-label={t.close} style={iconBtn}><Icon d={I.x} size={16} color={T.textSub} /></button>
        </div>
        <BioSheet p={p} lang={lang} full />
      </div>
    </div>
  );
}
const iconBtn = { width: 34, height: 34, borderRadius: "50%", background: T.bg, border: `1px solid ${T.border}`, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 };

// ── Profile card: circle photo on top, bio-data below (layout from screenshot) ─
function ProfileCard({ p, index, lang, onOpen, shortlisted, onShortlist, animate }) {
  const t = L[lang];
  const ac = ACCENT[p.gender];
  const [sent, setSent] = useState(false);
  const [hov, setHov] = useState(false);
  const ref = useRef(null);
  const [vis, setVis] = useState(!animate);

  useEffect(() => {
    if (!animate) return;
    const obs = new IntersectionObserver(([e]) => e.isIntersecting && setVis(true), { threshold: 0.05 });
    ref.current && obs.observe(ref.current);
    return () => obs.disconnect();
  }, [animate]);

  const sendInterest = async () => {
    setSent(true);
    try { await fetch(`${API}/api/profiles/${p.id}/interest`, { method: "POST" }); } catch {}
  };

  return (
    <article ref={ref} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        display: "flex", flexDirection: "column", alignItems: "stretch",
        opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(14px)",
        transition: `opacity .4s ease ${(index % 4) * 0.07}s, transform .4s ease ${(index % 4) * 0.07}s`,
      }}>
      {/* Circle photo */}
      <div style={{ display: "flex", justifyContent: "center", position: "relative", zIndex: 2, marginBottom: -34 }}>
        <div style={{ position: "relative", transition: "transform .25s ease", transform: hov ? "translateY(-4px) scale(1.03)" : "none" }}>
          <Avatar p={p} size={118} ring={ac.c} />
          {p.verified && (
            <span title={t.verified} style={{ position: "absolute", right: 2, bottom: 6, width: 26, height: 26, borderRadius: "50%", background: T.green, border: "2.5px solid #fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon d={I.check} size={13} color="#fff" sw={3.2} />
            </span>
          )}
        </div>
      </div>

      {/* Card body */}
      <div style={{
        background: T.card, borderRadius: T.radius, border: `1.5px solid ${hov ? ac.b : T.border}`,
        borderTop: `4px solid ${ac.c}`, padding: "42px 10px 10px", boxShadow: hov ? T.shadowHov : T.shadow,
        transition: "box-shadow .2s ease, border-color .2s ease", display: "flex", flexDirection: "column", gap: 9, flex: 1,
      }}>
        <div style={{ textAlign: "center" }}>
          <h3 style={{ margin: 0, fontFamily: T.font, fontWeight: 800, fontSize: "0.92rem", color: T.text }}>{lang === "mr" ? p.name_mr : p.name_en}</h3>
          <div style={{ fontSize: "0.7rem", color: T.textSub, fontFamily: T.font, marginTop: 2 }}>
            {p.age} {lang === "mr" ? "वर्षे" : "yrs"} · {lang === "mr" ? p.city_mr : p.city_en}
          </div>
        </div>

        <BioSheet p={p} lang={lang} />

        <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 6, marginTop: "auto" }}>
          <button onClick={sendInterest} disabled={sent} style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: 6, padding: "9px 8px", borderRadius: 8, border: "none",
            background: sent ? T.greenSoft : ac.c, color: sent ? T.green : "#fff", fontFamily: T.font, fontWeight: 700, fontSize: "0.74rem",
            cursor: sent ? "default" : "pointer", transition: "background .2s, transform .15s",
          }}>
            <Icon d={I.heart} size={13} fill={sent ? T.green : "none"} />{sent ? t.sent : t.interest}
          </button>
          <button onClick={() => onShortlist(p.id)} aria-pressed={shortlisted} aria-label={shortlisted ? t.saved : t.save} title={shortlisted ? t.saved : t.save}
            style={{ ...iconBtn, width: 38, height: 36, borderRadius: 8, background: shortlisted ? T.amberSoft : T.bg, borderColor: shortlisted ? "#fcd34d" : T.border }}>
            <Icon d={I.star} size={15} color={shortlisted ? T.amber : T.textMuted} fill={shortlisted ? T.amber : "none"} />
          </button>
        </div>
        <button onClick={() => onOpen(p)} style={{ background: "none", border: `1px solid ${ac.b}`, color: ac.c, borderRadius: 8, padding: "7px", fontFamily: T.font, fontWeight: 700, fontSize: "0.72rem", cursor: "pointer", transition: "background .15s" }}
          onMouseEnter={e => e.currentTarget.style.background = ac.soft} onMouseLeave={e => e.currentTarget.style.background = "none"}>
          {t.view}
        </button>
      </div>
    </article>
  );
}

// ── Category switch: on mobile the selected button opens / closes its grid ───
function CategoryTabs({ gender, setGender, open, setOpen, counts, lang, isMobile }) {
  const t = L[lang];
  const items = [{ key: "bride", label: t.brides, emoji: "👰" }, { key: "groom", label: t.grooms, emoji: "🤵" }];
  return (
    <div role="tablist" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
      {items.map(it => {
        const sel = gender === it.key;
        const ac = ACCENT[it.key];
        return (
          <button key={it.key} role="tab" aria-selected={sel} aria-expanded={isMobile ? sel && open : undefined}
            onClick={() => { if (sel && isMobile) setOpen(o => !o); else { setGender(it.key); setOpen(true); } }}
            style={{
              display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, padding: "12px 14px", cursor: "pointer",
              borderRadius: T.radius, border: `1.5px solid ${sel ? ac.c : T.border}`, background: sel ? ac.c : "#fff",
              color: sel ? "#fff" : T.text, fontFamily: T.font, fontWeight: 800, fontSize: "0.9rem",
              boxShadow: sel ? `0 6px 18px ${ac.c}44` : T.shadow, transition: "all .2s ease",
            }}>
            <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: "1.15rem" }}>{it.emoji}</span>{it.label}
              <span style={{ fontSize: "0.68rem", fontWeight: 700, padding: "1px 8px", borderRadius: 20, background: sel ? "rgba(255,255,255,.22)" : ac.soft, color: sel ? "#fff" : ac.c }}>{counts[it.key]}</span>
            </span>
            {isMobile && (
              <span style={{ display: "flex", transition: "transform .3s ease", transform: sel && open ? "rotate(180deg)" : "none", opacity: sel ? 1 : 0.35 }}>
                <Icon d={I.chev} size={18} color={sel ? "#fff" : T.textMuted} sw={2.6} />
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

// ── Filters ──────────────────────────────────────────────────────────────────
function Filters({ q, setQ, ageBand, setAgeBand, lang }) {
  const t = L[lang];
  const bands = [[18, 60, t.allAge], [21, 25, "21–25"], [26, 30, "26–30"], [31, 40, "31–40"]];
  const dirty = q || ageBand !== 0;
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
      <label style={{ position: "relative", flex: "1 1 220px", minWidth: 0 }}>
        <span style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)", display: "flex" }}><Icon d={I.search} size={15} color={T.textMuted} /></span>
        <input value={q} onChange={e => setQ(e.target.value)} placeholder={t.search} aria-label={t.search}
          style={{ width: "100%", padding: "10px 12px 10px 34px", borderRadius: 10, border: `1px solid ${T.border}`, background: "#fff", fontFamily: T.font, fontSize: "0.82rem", outline: "none", color: T.text }} />
      </label>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        {bands.map(([a, b, label], i) => (
          <button key={label} onClick={() => setAgeBand(i)} aria-pressed={ageBand === i}
            style={{ padding: "8px 13px", borderRadius: 20, cursor: "pointer", fontFamily: T.font, fontSize: "0.74rem", fontWeight: 700, border: `1px solid ${ageBand === i ? T.navy : T.border}`, background: ageBand === i ? T.navy : "#fff", color: ageBand === i ? "#fff" : T.textSub, transition: "all .15s" }}>
            {label}
          </button>
        ))}
        {dirty && <button onClick={() => { setQ(""); setAgeBand(0); }} style={{ padding: "8px 10px", background: "none", border: "none", color: T.rose, fontWeight: 700, fontSize: "0.74rem", cursor: "pointer", fontFamily: T.font }}>{t.reset}</button>}
      </div>
    </div>
  );
}
const AGE_BANDS = [[18, 60], [21, 25], [26, 30], [31, 40]];

// ── Skeleton while loading ───────────────────────────────────────────────────
const Skeleton = () => (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
    <div className="mp-shimmer" style={{ width: 118, height: 118, borderRadius: "50%", marginBottom: -34, zIndex: 2 }} />
    <div className="mp-shimmer" style={{ width: "100%", height: 420, borderRadius: T.radius }} />
  </div>
);

// ── Pagination ───────────────────────────────────────────────────────────────
function Pager({ page, pages, setPage, lang }) {
  const t = L[lang];
  if (pages <= 1) return null;
  const btn = dis => ({ display: "flex", alignItems: "center", gap: 4, padding: "8px 14px", borderRadius: 20, border: `1px solid ${T.border}`, background: "#fff", cursor: dis ? "not-allowed" : "pointer", opacity: dis ? 0.45 : 1, fontFamily: T.font, fontWeight: 700, fontSize: "0.76rem", color: T.textSub });
  return (
    <nav aria-label="Pagination" style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 6, marginTop: 22, flexWrap: "wrap" }}>
      <button disabled={page === 1} onClick={() => setPage(page - 1)} style={btn(page === 1)}><Icon d={I.left} size={13} />{t.prev}</button>
      {Array.from({ length: pages }, (_, i) => i + 1).map(n => (
        <button key={n} onClick={() => setPage(n)} aria-current={n === page ? "page" : undefined}
          style={{ width: 34, height: 34, borderRadius: "50%", border: `1px solid ${n === page ? T.navy : T.border}`, background: n === page ? T.navy : "#fff", color: n === page ? "#fff" : T.textSub, fontWeight: 700, fontSize: "0.78rem", cursor: "pointer", fontFamily: T.font }}>{n}</button>
      ))}
      <button disabled={page === pages} onClick={() => setPage(page + 1)} style={btn(page === pages)}>{t.next}<Icon d={I.right} size={13} /></button>
    </nav>
  );
}

// ── Main page ────────────────────────────────────────────────────────────────
export default function MarriageProfiles() {
  const width = useWidth();
  const reduced = useReducedMotion();
  const isMobile = width < 720;
  const cols = width < 520 ? 1 : width < 860 ? 2 : width < 1120 ? 3 : 4;

  const { lang, setLang } = useLang();
  const [langOpen, setLangOpen] = useState(false);
  const [gender, setGender] = useState("bride");
  const [open, setOpen] = useState(true);
  const [page, setPage] = useState(1);
  const [q, setQ] = useState("");
  const [dq, setDq] = useState("");
  const [ageBand, setAgeBand] = useState(0);
  const [modal, setModal] = useState(null);
  const [headerVis, setHeaderVis] = useState(false);
  const [shortlist, toggleShortlist] = useShortlist();
  const t = L[lang];

  // Mobile starts collapsed → the selected button opens the grid
  useEffect(() => { setOpen(!isMobile); }, [isMobile]);
  useEffect(() => { const x = setTimeout(() => setHeaderVis(true), 60); return () => clearTimeout(x); }, []);
  useEffect(() => { const x = setTimeout(() => setDq(q), 300); return () => clearTimeout(x); }, [q]);
  useEffect(() => { setPage(1); }, [gender, dq, ageBand]);

  const [minAge, maxAge] = AGE_BANDS[ageBand];
  const { data, total, loading } = useProfiles({ gender, page, q: dq, minAge, maxAge });
  const pages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const counts = useMemo(() => ({
    bride: SAMPLE.filter(p => p.gender === "bride").length,
    groom: SAMPLE.filter(p => p.gender === "groom").length,
  }), []);

  const gridRef = useRef(null);
  const selectTab = g => { setGender(g); };

  return (
    <div style={{ minHeight: "100vh", background: T.bg, fontFamily: T.font, color: T.text }}>
      <Navbar />

      {/* Hero */}
      <header style={{
        background: "linear-gradient(135deg,#0f1c3a 0%,#1a2d55 60%,#7a1f4d 100%)", borderBottom: `3px solid ${T.amber}`,
        padding: isMobile ? "22px 14px 20px" : "30px 24px 26px",
        opacity: headerVis ? 1 : 0, transform: headerVis ? "none" : "translateY(-10px)", transition: "opacity .45s ease, transform .45s ease",
      }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <div style={{ display: "flex", marginBottom: 14 }}>
            {["#ff9933", "#ffffff", "#138808"].map(c => <div key={c} style={{ flex: 1, height: 4, background: c }} />)}
          </div>
          <h1 style={{ margin: "0 0 8px", color: "#fff", fontFamily: T.serif, fontWeight: 700, fontSize: "clamp(1.5rem,4.6vw,2.3rem)", lineHeight: 1.2 }}>{t.title}</h1>
          <p style={{ margin: 0, color: "rgba(255,255,255,.7)", fontSize: "0.86rem", maxWidth: 520, lineHeight: 1.6 }}>{t.sub}</p>
        </div>
      </header>

      <main style={{ maxWidth: 1180, margin: "0 auto", padding: isMobile ? "14px 12px 90px" : "24px 24px 90px", display: "flex", flexDirection: "column", gap: 16 }}>
        <CategoryTabs gender={gender} setGender={selectTab} open={open} setOpen={setOpen} counts={counts} lang={lang} isMobile={isMobile} />

        {/* Collapsible region (animated with grid-rows so height is auto) */}
        <section aria-label={gender === "bride" ? t.brides : t.grooms}
          style={{ display: "grid", gridTemplateRows: open ? "1fr" : "0fr", transition: reduced ? "none" : "grid-template-rows .45s cubic-bezier(.4,0,.2,1)" }}>
          <div style={{ overflow: open ? "visible" : "hidden", minHeight: 0 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 16, paddingTop: 2, opacity: open ? 1 : 0, transition: reduced ? "none" : "opacity .3s ease" }}>
              <Filters q={q} setQ={setQ} ageBand={ageBand} setAgeBand={setAgeBand} lang={lang} />

              <div style={{ fontSize: "0.76rem", color: T.textMuted, fontWeight: 600 }}>
                {total} {t.shown}
              </div>

              <div ref={gridRef} style={{ display: "grid", gridTemplateColumns: `repeat(${cols},minmax(0,1fr))`, gap: "26px 18px", paddingTop: 8 }}>
                {loading
                  ? Array.from({ length: cols === 4 ? 8 : 4 }).map((_, i) => <Skeleton key={i} />)
                  : data.map((p, i) => (
                    <ProfileCard key={p.id} p={p} index={i} lang={lang} animate={!reduced}
                      onOpen={setModal} shortlisted={shortlist.includes(p.id)} onShortlist={toggleShortlist} />
                  ))}
              </div>

              {!loading && data.length === 0 && (
                <div style={{ textAlign: "center", padding: "46px 12px", background: "#fff", borderRadius: T.radius, border: `1px dashed ${T.borderDk}` }}>
                  <div style={{ fontWeight: 800, fontSize: "0.98rem" }}>{t.empty}</div>
                  <div style={{ fontSize: "0.8rem", color: T.textSub, marginTop: 4 }}>{t.emptyHint}</div>
                </div>
              )}

              <Pager page={page} pages={pages} setPage={p => { setPage(p); gridRef.current?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" }); }} lang={lang} />
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {modal && <BioModal p={modal} lang={lang} onClose={() => setModal(null)} />}

      {/* Language FAB */}
      <div className="no-print legacy-language-switcher" style={{ position: "fixed", bottom: 24, right: 24, zIndex: 300 }}>
        {langOpen && (
          <div style={{ position: "absolute", bottom: 60, right: 0, background: "#fff", borderRadius: T.radius, boxShadow: T.shadowHov, overflow: "hidden", minWidth: 148, border: `1px solid ${T.border}`, animation: "mpUp .17s ease both" }}>
            {[{ code: "mr", label: "🇮🇳  मराठी" }, { code: "en", label: "🇬🇧  English" }].map(o => (
              <button key={o.code} onClick={() => { setLang(o.code); setLangOpen(false); }}
                style={{ display: "flex", width: "100%", padding: "10px 16px", border: "none", cursor: "pointer", fontSize: "0.83rem", fontWeight: lang === o.code ? 700 : 500, background: lang === o.code ? "#fef9e7" : "#fff", color: lang === o.code ? T.amber : T.textSub, borderLeft: `3px solid ${lang === o.code ? T.amber : "transparent"}`, fontFamily: T.font }}>
                {o.label}
              </button>
            ))}
          </div>
        )}
        <button onClick={() => setLangOpen(o => !o)} aria-label="Language"
          style={{ width: 50, height: 50, borderRadius: "50%", background: "linear-gradient(135deg,#d97706,#f59e0b)", border: "2px solid #fcd34d", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 18px rgba(217,119,6,.45)", transition: "transform .2s ease" }}
          onMouseEnter={e => e.currentTarget.style.transform = "scale(1.1)"} onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}>
          <Icon d={<><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></>} size={20} color="#fff" />
        </button>
      </div>

      <style>{`
        @keyframes mpFade { from{opacity:0} to{opacity:1} }
        @keyframes mpPop  { from{opacity:0;transform:translateY(14px) scale(.97)} to{opacity:1;transform:none} }
        @keyframes mpUp   { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:none} }
        @keyframes mpShim { 0%{background-position:-400px 0} 100%{background-position:400px 0} }
        .mp-shimmer { background:linear-gradient(90deg,#eceff5 25%,#f8f9fc 50%,#eceff5 75%); background-size:800px 100%; animation:mpShim 1.3s linear infinite; }
        * { box-sizing:border-box; }
        button:focus-visible, input:focus-visible, a:focus-visible { outline:2px solid #1d4ed8; outline-offset:2px; }
        input:focus { border-color:#93c5fd !important; box-shadow:0 0 0 3px #dbeafe; }
        button:not(:disabled):active { transform:scale(.97); }
        ::-webkit-scrollbar{width:5px;height:5px} ::-webkit-scrollbar-thumb{background:#c8cfdf;border-radius:5px}
        @media (prefers-reduced-motion: reduce){ *{animation-duration:.01ms !important; transition-duration:.01ms !important;} }
        @media print {
          body * { visibility:hidden; }
          .bio-print, .bio-print * { visibility:visible; }
          .bio-print { position:absolute; inset:0; max-height:none !important; box-shadow:none; }
          .no-print { display:none !important; }
        }
      `}</style>
    </div>
  );
}