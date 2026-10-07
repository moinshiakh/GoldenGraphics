// BloodDonationPortal.jsx
import { useState, useEffect, useRef } from "react";
import { Search, MapPin, Phone, Droplets, Globe, Filter } from "lucide-react";
import Navbar from "./navbar";
import Footer from "./footer";

const T = {
  en: {
    registerTitle: "Register as a Donor",
    nameLbl: "NAME *",
    namePh: "e.g. Anand Deshpande",
    bloodLbl: "BLOOD GROUP",
    locationLbl: "LOCATION *",
    locationPh: "e.g. Satara, MH",
    phoneLbl: "CONTACT NO. *",
    phonePh: "+91 XXXXXXXXXX",
    submit: "Submit Registration",
    submitting: "Submitting…",
    successTitle: "Registration Successful!",
    successMsg: "Thank you,",
    successSub: "You're now on the donor list.",
    registerAnother: "Register Another",
    bannerTitle: "BE A LIFESAVER TODAY",
    bannerDesc: "Search for active blood donors in your locality or register yourself to contribute to emergency requests.",
    searchPh: "Search by name, location or blood group…",
    availableDonors: "Available Donors",
    active: "Active",
    allDonors: "All Donors",
    noFound: "No donors found",
    noFoundSub: "Try a different name, location, or blood group",
    away: "Away",
    activeTag: "✓ Active",
    results: "results",
    result: "result",
    langLabel: "EN",
  },
  mr: {
    registerTitle: "रक्तदाता म्हणून नोंदणी करा",
    nameLbl: "नाव *",
    namePh: "उदा. आनंद देशपांडे",
    bloodLbl: "रक्तगट",
    locationLbl: "स्थान *",
    locationPh: "उदा. सातारा, MH",
    phoneLbl: "संपर्क क्र. *",
    phonePh: "+91 XXXXXXXXXX",
    submit: "नोंदणी सादर करा",
    submitting: "सादर होत आहे…",
    successTitle: "नोंदणी यशस्वी!",
    successMsg: "धन्यवाद,",
    successSub: "आपण आता दात्यांच्या यादीत आहात.",
    registerAnother: "आणखी नोंदणी करा",
    bannerTitle: "आज जीव वाचवणारे व्हा",
    bannerDesc: "आपल्या परिसरातील सक्रिय रक्तदाते शोधा किंवा आपत्कालीन विनंत्यांसाठी स्वतःची नोंदणी करा.",
    searchPh: "नाव, स्थान किंवा रक्तगटाने शोधा…",
    availableDonors: "उपलब्ध दाते",
    active: "सक्रिय",
    allDonors: "सर्व दाते",
    noFound: "कोणतेही दाते सापडले नाहीत",
    noFoundSub: "वेगळे नाव, स्थान किंवा रक्तगट वापरून पहा",
    away: "अनुपस्थित",
    activeTag: "✓ सक्रिय",
    results: "निकाल",
    result: "निकाल",
    langLabel: "MR",
  },
};

const DONORS = [
  { id: 1,  name: "Rahul Sharma",    bloodGroup: "O+",  location: "Pune, MH",        phone: "+91 9876543210", available: true  },
  { id: 2,  name: "Priya Patel",     bloodGroup: "A+",  location: "Nagpur, MH",      phone: "+91 9123456789", available: true  },
  { id: 3,  name: "Amit Deshmukh",   bloodGroup: "B+",  location: "Satara, MH",      phone: "+91 9234567890", available: true  },
  { id: 4,  name: "Sneha Kulkarni",  bloodGroup: "AB+", location: "Kolhapur, MH",    phone: "+91 9345678901", available: true  },
  { id: 5,  name: "Vikram Singh",    bloodGroup: "A-",  location: "Nashik, MH",      phone: "+91 9456789012", available: false },
  { id: 6,  name: "Meera Joshi",     bloodGroup: "B-",  location: "Aurangabad, MH",  phone: "+91 9567890123", available: true  },
  { id: 7,  name: "Suresh Rao",      bloodGroup: "O-",  location: "Solapur, MH",     phone: "+91 9678901234", available: true  },
  { id: 8,  name: "Anita Gaikwad",   bloodGroup: "AB-", location: "Nagpur, MH",      phone: "+91 9789012345", available: false },
  { id: 9,  name: "Deepak Patil",    bloodGroup: "O+",  location: "Mumbai, MH",      phone: "+91 9890123456", available: true  },
  { id: 10, name: "Kavita Shinde",   bloodGroup: "A+",  location: "Thane, MH",       phone: "+91 9901234567", available: true  },
  { id: 11, name: "Rohit Chavan",    bloodGroup: "B+",  location: "Pune, MH",        phone: "+91 9012345678", available: true  },
  { id: 12, name: "Neha Bhosale",    bloodGroup: "O+",  location: "Nashik, MH",      phone: "+91 9112345678", available: false },
  { id: 13, name: "Ganesh Mane",     bloodGroup: "A-",  location: "Satara, MH",      phone: "+91 9212345678", available: true  },
  { id: 14, name: "Pooja Jadhav",    bloodGroup: "AB+", location: "Pune, MH",        phone: "+91 9312345678", available: true  },
  { id: 15, name: "Sanjay Pawar",    bloodGroup: "B-",  location: "Kolhapur, MH",    phone: "+91 9412345678", available: true  },
  { id: 16, name: "Riya Desai",      bloodGroup: "O+",  location: "Satara, MH",      phone: "+91 9512345678", available: true  },
  { id: 17, name: "Akash Tawde",     bloodGroup: "B+",  location: "Pune, MH",        phone: "+91 9612345678", available: true  },
  { id: 18, name: "Swati More",      bloodGroup: "A+",  location: "Mumbai, MH",      phone: "+91 9712345678", available: false },
];

const BLOOD_GROUPS = ["All", "A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

const BG_COLORS = {
  "A+":  { bg: "#fde8e8", text: "#c0392b", accent: "#e53e3e" },
  "A-":  { bg: "#fde8e8", text: "#c0392b", accent: "#e53e3e" },
  "B+":  { bg: "#e8f0fe", text: "#1a56db", accent: "#3b82f6" },
  "B-":  { bg: "#e8f0fe", text: "#1a56db", accent: "#3b82f6" },
  "O+":  { bg: "#fef3c7", text: "#b45309", accent: "#f59e0b" },
  "O-":  { bg: "#fef3c7", text: "#b45309", accent: "#f59e0b" },
  "AB+": { bg: "#f3e8ff", text: "#7c3aed", accent: "#8b5cf6" },
  "AB-": { bg: "#f3e8ff", text: "#7c3aed", accent: "#8b5cf6" },
};

function DonorCard({ donor, index, t }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const colors = BG_COLORS[donor.bloodGroup];

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible
          ? hovered ? "translateY(-4px) scale(1.02)" : "translateY(0) scale(1)"
          : "translateY(24px) scale(0.97)",
        transition: `opacity 0.45s ease ${index * 0.05}s, transform 0.35s ease`,
        background: "white", borderRadius: 16, padding: "16px 18px",
        boxShadow: hovered
          ? `0 12px 28px rgba(0,0,0,0.12), 0 0 0 2px ${colors.accent}30`
          : "0 2px 12px rgba(0,0,0,0.07)",
        border: `1px solid ${hovered ? colors.accent + "40" : "#f0f0f0"}`,
        cursor: "pointer", display: "flex", flexDirection: "column", gap: 10,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{
          width: 48, height: 48, borderRadius: "50%",
          background: colors.bg, color: colors.text,
          fontWeight: 900, fontSize: "0.9rem",
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0, letterSpacing: "-0.5px",
          border: `2px solid ${colors.text}22`,
          transition: "transform 0.3s ease",
          transform: hovered ? "rotate(-10deg) scale(1.08)" : "rotate(0deg) scale(1)",
        }}>
          {donor.bloodGroup}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 700, fontSize: "0.88rem", color: "#1a1a2e", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {donor.name}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 3, marginTop: 2 }}>
            <MapPin size={10} color="#aaa" />
            <span style={{ color: "#888", fontSize: "0.72rem" }}>{donor.location}</span>
          </div>
        </div>
        <span style={{
          background: donor.available ? "#e6f9f0" : "#f5f5f5",
          color: donor.available ? "#16a34a" : "#999",
          fontSize: "0.6rem", fontWeight: 700,
          padding: "2px 7px", borderRadius: 6,
          letterSpacing: "0.4px", textTransform: "uppercase", flexShrink: 0,
        }}>
          {donor.available ? t.activeTag : t.away}
        </span>
      </div>
      <a
        href={`tel:${donor.phone}`}
        onClick={e => e.stopPropagation()}
        style={{
          display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
          background: hovered
            ? `linear-gradient(135deg, ${colors.accent}, ${colors.text})`
            : `linear-gradient(135deg, #e53e3e, #c53030)`,
          color: "white", borderRadius: 20,
          padding: "7px 12px", fontSize: "0.75rem", fontWeight: 600,
          textDecoration: "none",
          transition: "background 0.3s ease, box-shadow 0.3s ease",
          boxShadow: hovered ? `0 4px 14px ${colors.accent}50` : "0 2px 8px rgba(229,62,62,0.3)",
        }}
      >
        <Phone size={11} />
        {donor.phone}
      </a>
    </div>
  );
}

function MiniDonorCard({ donor }) {
  const colors = BG_COLORS[donor.bloodGroup];
  return (
    <div style={{
      background: "white", borderRadius: 10, padding: "8px 10px",
      display: "flex", alignItems: "center", gap: 8,
      boxShadow: "0 1px 6px rgba(0,0,0,0.06)", border: "1px solid #f0f0f0",
      transition: "transform 0.2s, box-shadow 0.2s", cursor: "pointer",
    }}
      onMouseEnter={e => { e.currentTarget.style.transform = "translateX(3px)"; e.currentTarget.style.boxShadow = "0 3px 12px rgba(0,0,0,0.1)"; }}
      onMouseLeave={e => { e.currentTarget.style.transform = "translateX(0)"; e.currentTarget.style.boxShadow = "0 1px 6px rgba(0,0,0,0.06)"; }}
    >
      <div style={{
        width: 30, height: 30, borderRadius: "50%",
        background: colors.bg, color: colors.text,
        fontWeight: 900, fontSize: "0.65rem",
        display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
      }}>
        {donor.bloodGroup}
      </div>
      <div style={{ minWidth: 0 }}>
        <div style={{ fontWeight: 600, fontSize: "0.72rem", color: "#1a1a2e", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          {donor.name.split(" ")[0]}
        </div>
        <div style={{ fontSize: "0.62rem", color: "#aaa" }}>{donor.location.split(",")[0]}</div>
      </div>
    </div>
  );
}

function RegisterForm({ t }) {
  const [form, setForm] = useState({ name: "", bloodGroup: "O+", location: "", phone: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.location || !form.phone) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 1200);
  };

  const inputStyle = {
    width: "100%", border: "1.5px solid #e5e7eb", borderRadius: 10,
    padding: "10px 14px", fontSize: "0.85rem", outline: "none",
    fontFamily: "Inter, 'Noto Sans', sans-serif", color: "#1a1a2e",
    transition: "border-color 0.2s, box-shadow 0.2s",
    boxSizing: "border-box", background: "#fafafa",
  };

  if (submitted) return (
    <div style={{
      background: "linear-gradient(135deg, #e6f9f0, #d1fae5)",
      border: "1.5px solid #16a34a", borderRadius: 14,
      padding: "28px 20px", textAlign: "center",
    }}>
      <div style={{ fontSize: "2.5rem", marginBottom: 8 }}>🎉</div>
      <div style={{ fontWeight: 800, color: "#166534", fontSize: "1rem", marginBottom: 6 }}>{t.successTitle}</div>
      <div style={{ color: "#15803d", fontSize: "0.82rem" }}>
        {t.successMsg} <strong>{form.name}</strong>. {t.successSub}
      </div>
      <button
        onClick={() => { setSubmitted(false); setForm({ name: "", bloodGroup: "O+", location: "", phone: "" }); }}
        style={{ marginTop: 14, background: "#16a34a", color: "white", border: "none", borderRadius: 8, padding: "7px 18px", fontWeight: 600, cursor: "pointer", fontSize: "0.82rem" }}
      >
        {t.registerAnother}
      </button>
    </div>
  );

  return (
    <div style={{ background: "white", borderRadius: 16, padding: "20px", boxShadow: "0 2px 20px rgba(0,0,0,0.08)" }}>
      <h2 style={{ fontWeight: 800, fontSize: "1rem", color: "#1a1a2e", marginBottom: 16, letterSpacing: "0.3px", display: "flex", alignItems: "center", gap: 8 }}>
        <Droplets size={18} color="#e53e3e" />
        {t.registerTitle}
      </h2>
      <div className="reg-grid" style={{ display: "grid", gap: 10, marginBottom: 14 }}>
        <div>
          <label style={{ fontSize: "0.68rem", fontWeight: 700, color: "#666", letterSpacing: "0.5px", display: "block", marginBottom: 4 }}>{t.nameLbl}</label>
          <input style={inputStyle} placeholder={t.namePh} value={form.name}
            onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
            onFocus={e => { e.target.style.borderColor = "#e53e3e"; e.target.style.boxShadow = "0 0 0 3px #e53e3e18"; }}
            onBlur={e => { e.target.style.borderColor = "#e5e7eb"; e.target.style.boxShadow = "none"; }} />
        </div>
        <div>
          <label style={{ fontSize: "0.68rem", fontWeight: 700, color: "#666", letterSpacing: "0.5px", display: "block", marginBottom: 4 }}>{t.bloodLbl}</label>
          <div style={{ position: "relative" }}>
            <select style={{ ...inputStyle, appearance: "none", paddingRight: 32, cursor: "pointer" }}
              value={form.bloodGroup} onChange={e => setForm(p => ({ ...p, bloodGroup: e.target.value }))}
              onFocus={e => { e.target.style.borderColor = "#e53e3e"; e.target.style.boxShadow = "0 0 0 3px #e53e3e18"; }}
              onBlur={e => { e.target.style.borderColor = "#e5e7eb"; e.target.style.boxShadow = "none"; }}>
              {BLOOD_GROUPS.filter(g => g !== "All").map(g => <option key={g} value={g}>{g}</option>)}
            </select>
            <span style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "#888", fontSize: "0.8rem" }}>▾</span>
          </div>
        </div>
        <div>
          <label style={{ fontSize: "0.68rem", fontWeight: 700, color: "#666", letterSpacing: "0.5px", display: "block", marginBottom: 4 }}>{t.locationLbl}</label>
          <input style={inputStyle} placeholder={t.locationPh} value={form.location}
            onChange={e => setForm(p => ({ ...p, location: e.target.value }))}
            onFocus={e => { e.target.style.borderColor = "#e53e3e"; e.target.style.boxShadow = "0 0 0 3px #e53e3e18"; }}
            onBlur={e => { e.target.style.borderColor = "#e5e7eb"; e.target.style.boxShadow = "none"; }} />
        </div>
        <div>
          <label style={{ fontSize: "0.68rem", fontWeight: 700, color: "#666", letterSpacing: "0.5px", display: "block", marginBottom: 4 }}>{t.phoneLbl}</label>
          <input style={inputStyle} placeholder={t.phonePh} value={form.phone}
            onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
            onFocus={e => { e.target.style.borderColor = "#e53e3e"; e.target.style.boxShadow = "0 0 0 3px #e53e3e18"; }}
            onBlur={e => { e.target.style.borderColor = "#e5e7eb"; e.target.style.boxShadow = "none"; }} />
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button onClick={handleSubmit} disabled={loading}
          style={{
            background: loading ? "#ccc" : "linear-gradient(135deg, #e53e3e 0%, #e53e3e 40%, #c53030 100%)",
            color: "white", border: "none", borderRadius: 30,
            padding: "11px 36px", fontWeight: 800, fontSize: "0.85rem",
            letterSpacing: "0.8px", cursor: loading ? "not-allowed" : "pointer",
            transition: "transform 0.2s, box-shadow 0.2s",
            boxShadow: loading ? "none" : "0 4px 16px rgba(229,62,62,0.4)",
            fontFamily: "Inter, sans-serif", whiteSpace: "nowrap",
          }}
          onMouseEnter={e => { if (!loading) e.currentTarget.style.transform = "scale(1.04)"; }}
          onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; }}
        >
          {loading ? t.submitting : t.submit}
        </button>
      </div>
    </div>
  );
}

export default function BloodDonationPortal() {
  const [search, setSearch] = useState("");
  const [activeGroup, setActiveGroup] = useState("All");
  const [lang, setLang] = useState("en");
  const [langOpen, setLangOpen] = useState(false);
  const t = T[lang];

  const filtered = DONORS.filter(d => {
    const matchGroup = activeGroup === "All" || d.bloodGroup === activeGroup;
    const q = search.toLowerCase();
    const matchSearch = !q ||
      d.name.toLowerCase().includes(q) ||
      d.location.toLowerCase().includes(q) ||
      d.bloodGroup.toLowerCase().includes(q);
    return matchGroup && matchSearch;
  });

  const availableDonors = DONORS.filter(d => d.available).slice(0, 9);

  return (
    <div style={{ minHeight: "100vh", background: "#f2f3f7", fontFamily: "Inter, 'Noto Sans', sans-serif" }}>
      <Navbar />

      <main style={{ maxWidth: 1200, margin: "0 auto", padding: "24px 16px 40px" }}>
        <RegisterForm t={t} />

        <div className="mid-grid" style={{ display: "grid", gap: 16, marginTop: 16, alignItems: "start" }}>
          <div style={{ background: "white", borderRadius: 16, padding: "20px", boxShadow: "0 2px 16px rgba(0,0,0,0.07)" }}>
            <div style={{
              background: "linear-gradient(135deg, #fff5f5, #ffe4e4)",
              border: "1.5px solid #fca5a5", borderLeft: "5px solid #e53e3e",
              borderRadius: 12, padding: "14px 16px", marginBottom: 16,
              display: "flex", alignItems: "flex-start", gap: 12,
              animation: "slideDown 0.5s ease",
            }}>
              <Droplets size={24} color="#e53e3e" style={{ flexShrink: 0, marginTop: 2 }} />
              <div>
                <div style={{ fontWeight: 800, color: "#c53030", fontSize: "0.88rem", marginBottom: 3 }}>{t.bannerTitle}</div>
                <div style={{ color: "#666", fontSize: "0.8rem", lineHeight: 1.5 }}>{t.bannerDesc}</div>
              </div>
            </div>

            <div style={{ position: "relative", marginBottom: 14 }}>
              <Search size={15} color="#aaa" style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)" }} />
              <input
                style={{
                  width: "100%", border: "1.5px solid #e5e7eb", borderRadius: 30,
                  padding: "10px 16px 10px 40px", fontSize: "0.85rem", outline: "none",
                  fontFamily: "Inter, sans-serif", color: "#333", boxSizing: "border-box",
                  transition: "border-color 0.2s, box-shadow 0.2s", background: "#fafafa",
                }}
                placeholder={t.searchPh}
                value={search}
                onChange={e => setSearch(e.target.value)}
                onFocus={e => { e.target.style.borderColor = "#e53e3e"; e.target.style.boxShadow = "0 0 0 3px #e53e3e15"; }}
                onBlur={e => { e.target.style.borderColor = "#e5e7eb"; e.target.style.boxShadow = "none"; }}
              />
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
              <Filter size={13} color="#aaa" />
              {BLOOD_GROUPS.map(g => (
                <button key={g} onClick={() => setActiveGroup(g)} style={{
                  padding: "5px 13px", borderRadius: 20, fontSize: "0.78rem", fontWeight: 600,
                  border: activeGroup === g ? "none" : "1.5px solid #ddd",
                  background: activeGroup === g ? "linear-gradient(135deg, #e53e3e, #c53030)" : "white",
                  color: activeGroup === g ? "white" : "#555",
                  cursor: "pointer", transition: "all 0.25s",
                  boxShadow: activeGroup === g ? "0 3px 10px rgba(229,62,62,0.35)" : "none",
                  transform: activeGroup === g ? "scale(1.05)" : "scale(1)",
                }}>
                  {g}
                </button>
              ))}
              {filtered.length !== DONORS.length && (
                <span style={{ marginLeft: "auto", color: "#888", fontSize: "0.78rem", fontWeight: 600 }}>
                  {filtered.length} {filtered.length !== 1 ? t.results : t.result}
                </span>
              )}
            </div>
          </div>

          <div style={{ background: "white", borderRadius: 16, padding: "16px 18px", boxShadow: "0 2px 16px rgba(0,0,0,0.07)" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
              <h3 style={{ fontWeight: 800, fontSize: "0.88rem", color: "#1a1a2e", margin: 0, display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{
                  width: 8, height: 8, borderRadius: "50%", background: "#16a34a",
                  display: "inline-block", boxShadow: "0 0 0 3px #16a34a30",
                  animation: "pulse 2s infinite",
                }} />
                {t.availableDonors}
              </h3>
              <span style={{ background: "#e6f9f0", color: "#16a34a", fontSize: "0.7rem", fontWeight: 700, padding: "2px 8px", borderRadius: 6 }}>
                {availableDonors.length} {t.active}
              </span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
              {availableDonors.map(donor => <MiniDonorCard key={donor.id} donor={donor} />)}
            </div>
          </div>
        </div>

        <div style={{ marginTop: 20 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
            <h2 style={{ fontWeight: 800, fontSize: "1rem", color: "#1a1a2e", margin: 0 }}>
              {t.allDonors}
              <span style={{ color: "#aaa", fontWeight: 500, fontSize: "0.82rem", marginLeft: 8 }}>({filtered.length})</span>
            </h2>
          </div>

          {filtered.length === 0 ? (
            <div style={{ background: "white", borderRadius: 16, padding: "48px 24px", textAlign: "center", color: "#aaa", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
              <div style={{ fontSize: "2.5rem", marginBottom: 10 }}>🔍</div>
              <div style={{ fontWeight: 700, fontSize: "1rem", color: "#555", marginBottom: 6 }}>{t.noFound}</div>
              <div style={{ fontSize: "0.85rem" }}>{t.noFoundSub}</div>
            </div>
          ) : (
            <div className="donor-grid">
              {filtered.map((donor, i) => <DonorCard key={donor.id} donor={donor} index={i} t={t} />)}
            </div>
          )}
        </div>
      </main>

      <Footer />

      {/* Language Switcher FAB */}
      <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 100 }}>
        {langOpen && (
          <div style={{
            position: "absolute", bottom: 58, right: 0,
            background: "white", borderRadius: 12,
            boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
            overflow: "hidden", minWidth: 130,
            animation: "slideDown 0.2s ease",
          }}>
            {[{ code: "en", label: "🇬🇧 English" }, { code: "mr", label: "🇮🇳 मराठी" }].map(opt => (
              <button key={opt.code} onClick={() => { setLang(opt.code); setLangOpen(false); }}
                style={{
                  display: "block", width: "100%", textAlign: "left",
                  padding: "10px 16px", border: "none", cursor: "pointer",
                  fontSize: "0.82rem", fontWeight: lang === opt.code ? 700 : 500,
                  background: lang === opt.code ? "#fff5f5" : "white",
                  color: lang === opt.code ? "#e53e3e" : "#333",
                  borderLeft: lang === opt.code ? "3px solid #e53e3e" : "3px solid transparent",
                  transition: "background 0.15s",
                }}
                onMouseEnter={e => { if (lang !== opt.code) e.currentTarget.style.background = "#f9f9f9"; }}
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
            width: 48, height: 48, borderRadius: "50%",
            background: "linear-gradient(135deg, #e53e3e, #9b1c1c)",
            border: "none", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 4px 16px rgba(229,62,62,0.4)",
            transition: "transform 0.2s",
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.12) rotate(15deg)"; }}
          onMouseLeave={e => { e.currentTarget.style.transform = "scale(1) rotate(0deg)"; }}
        >
          <Globe size={20} color="white" />
        </button>
      </div>

      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 0 3px #16a34a30; }
          50%       { box-shadow: 0 0 0 6px #16a34a15; }
        }
        * { box-sizing: border-box; }
        .reg-grid { grid-template-columns: repeat(4, 1fr); }
        @media (max-width: 900px) { .reg-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 480px) { .reg-grid { grid-template-columns: 1fr; } }
        .mid-grid { grid-template-columns: 1fr 340px; }
        @media (max-width: 900px) { .mid-grid { grid-template-columns: 1fr; } }
        .donor-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }
        @media (max-width: 900px) { .donor-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 540px) { .donor-grid { grid-template-columns: 1fr; } }
      `}</style>
    </div>
  );
}
