// BloodDonationPortal.jsx
// ─────────────────────────────────────────────────────────────────────────────
// SETUP INSTRUCTIONS (React + Vite + Tailwind CSS)
//
// 1. Install dependencies (if not already):
//    npm install lucide-react
//
// 2. Add Google Font to index.html <head>:
//    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
//
// 3. Make sure tailwind.config.js scans this file:
//    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}']
//
// 4. Use in App.jsx:
//    import BloodDonationPortal from './BloodDonationPortal';
//    export default function App() { return <BloodDonationPortal />; }
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useEffect, useRef } from "react";
import { Search, MapPin, Phone, Droplets, Globe } from "lucide-react";
import Navbar from "./src/navbar";
import Footer from "./src/footer";

// ── Sample donor data ────────────────────────────────────────────────────────
const DONORS = [
  { id: 1,  name: "Rahul Sharma",    bloodGroup: "O+",  location: "Pune, MH",     phone: "+91 9876543210", available: true  },
  { id: 2,  name: "Priya Patel",     bloodGroup: "A+",  location: "Nagpur, MH",   phone: "+91 9123456789", available: true  },
  { id: 3,  name: "Amit Deshmukh",   bloodGroup: "B+",  location: "Satara, MH",   phone: "+91 9234567890", available: true  },
  { id: 4,  name: "Sneha Kulkarni",  bloodGroup: "AB+", location: "Kolhapur, MH", phone: "+91 9345678901", available: true  },
  { id: 5,  name: "Vikram Singh",    bloodGroup: "A-",  location: "Nashik, MH",   phone: "+91 9456789012", available: false },
  { id: 6,  name: "Meera Joshi",     bloodGroup: "B-",  location: "Aurangabad, MH",phone: "+91 9567890123",available: true  },
  { id: 7,  name: "Suresh Rao",      bloodGroup: "O-",  location: "Solapur, MH",  phone: "+91 9678901234", available: true  },
  { id: 8,  name: "Anita Gaikwad",   bloodGroup: "AB-", location: "Nagpur, MH",   phone: "+91 9789012345", available: false },
  { id: 9,  name: "Deepak Patil",    bloodGroup: "O+",  location: "Mumbai, MH",   phone: "+91 9890123456", available: true  },
  { id: 10, name: "Kavita Shinde",   bloodGroup: "A+",  location: "Thane, MH",    phone: "+91 9901234567", available: true  },
  { id: 11, name: "Rohit Chavan",    bloodGroup: "B+",  location: "Pune, MH",     phone: "+91 9012345678", available: true  },
  { id: 12, name: "Neha Bhosale",    bloodGroup: "O+",  location: "Nashik, MH",   phone: "+91 9112345678", available: false },
  { id: 13, name: "Ganesh Mane",     bloodGroup: "A-",  location: "Satara, MH",   phone: "+91 9212345678", available: true  },
  { id: 14, name: "Pooja Jadhav",    bloodGroup: "AB+", location: "Pune, MH",     phone: "+91 9312345678", available: true  },
  { id: 15, name: "Sanjay Pawar",    bloodGroup: "B-",  location: "Kolhapur, MH", phone: "+91 9412345678", available: true  },
];

const BLOOD_GROUPS = ["All", "A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

// Blood group badge colors
const BG_COLORS = {
  "A+":  { bg: "#fde8e8", text: "#c0392b" },
  "A-":  { bg: "#fde8e8", text: "#c0392b" },
  "B+":  { bg: "#fde8e8", text: "#c0392b" },
  "B-":  { bg: "#fde8e8", text: "#c0392b" },
  "O+":  { bg: "#fde8e8", text: "#c0392b" },
  "O-":  { bg: "#fde8e8", text: "#c0392b" },
  "AB+": { bg: "#fde8e8", text: "#c0392b" },
  "AB-": { bg: "#fde8e8", text: "#c0392b" },
};

// ── DonorCard ────────────────────────────────────────────────────────────────
function DonorCard({ donor, index }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const colors = BG_COLORS[donor.bloodGroup];

  return (
    
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.4s ease ${index * 0.06}s, transform 0.4s ease ${index * 0.06}s`,
        background: "white",
        borderRadius: 14,
        padding: "18px 20px",
        boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
        border: "1px solid #f0f0f0",
        display: "flex",
        alignItems: "center",
        gap: 16,
      }}
    >
      {/* Blood group avatar */}
      <div style={{
        width: 56, height: 56, borderRadius: "50%",
        background: colors.bg, color: colors.text,
        fontWeight: 900, fontSize: "1.05rem",
        display: "flex", alignItems: "center", justifyContent: "center",
        flexShrink: 0, letterSpacing: "-0.5px",
      }}>
        {donor.bloodGroup}
      </div>

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
          <span style={{ fontWeight: 700, fontSize: "1rem", color: "#1a1a2e" }}>{donor.name}</span>
          <span style={{
            background: donor.available ? "#e6f9f0" : "#f5f5f5",
            color: donor.available ? "#16a34a" : "#888",
            fontSize: "0.68rem", fontWeight: 700,
            padding: "3px 8px", borderRadius: 6, letterSpacing: "0.5px",
            textTransform: "uppercase",
          }}>
            {donor.available ? "Available" : "Unavailable"}
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 4, color: "#e53e3e", fontSize: "0.8rem", marginBottom: 8 }}>
          <MapPin size={12} />
          <span style={{ color: "#666" }}>{donor.location}</span>
        </div>
        <a
          href={`tel:${donor.phone}`}
          style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            background: "linear-gradient(135deg, #e53e3e, #c53030)",
            color: "white", borderRadius: 20,
            padding: "5px 14px", fontSize: "0.78rem", fontWeight: 600,
            textDecoration: "none",
            transition: "transform 0.2s, box-shadow 0.2s",
            boxShadow: "0 2px 8px rgba(229,62,62,0.35)",
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.04)"; }}
          onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; }}
        >
          <Phone size={12} />
          {donor.phone}
        </a>
      </div>
    </div>
  );
}

// ── RegisterForm ─────────────────────────────────────────────────────────────
function RegisterForm() {
  const [form, setForm] = useState({ name: "", bloodGroup: "O+", location: "", phone: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.location || !form.phone) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 1200);
  };

  if (submitted) return (
    <div style={{
      background: "linear-gradient(135deg, #e6f9f0, #d1fae5)",
      border: "1.5px solid #16a34a", borderRadius: 14,
      padding: "32px 24px", textAlign: "center",
    }}>
      <div style={{ fontSize: "2.5rem", marginBottom: 8 }}>🎉</div>
      <div style={{ fontWeight: 800, color: "#166534", fontSize: "1.1rem", marginBottom: 6 }}>Registration Successful!</div>
      <div style={{ color: "#15803d", fontSize: "0.88rem" }}>Thank you, {form.name}. Your details have been added to the donor list.</div>
      <button
        onClick={() => { setSubmitted(false); setForm({ name: "", bloodGroup: "O+", location: "", phone: "" }); }}
        style={{
          marginTop: 16, background: "#16a34a", color: "white",
          border: "none", borderRadius: 8, padding: "8px 20px",
          fontWeight: 600, cursor: "pointer", fontSize: "0.85rem",
        }}
      >
        Register Another
      </button>
    </div>
  );

  const inputStyle = {
    width: "100%", border: "1.5px solid #e5e7eb", borderRadius: 10,
    padding: "10px 14px", fontSize: "0.88rem", outline: "none",
    fontFamily: "Inter, sans-serif", color: "#1a1a2e",
    transition: "border-color 0.2s",
    boxSizing: "border-box",
  };
  const labelStyle = {
    fontSize: "0.75rem", fontWeight: 700, color: "#1a1a2e",
    letterSpacing: "0.5px", marginBottom: 6, display: "block",
  };

  return (
    <div style={{ background: "white", borderRadius: 16, padding: "28px 24px", boxShadow: "0 2px 20px rgba(0,0,0,0.08)" }}>
      <h2 style={{ fontWeight: 800, fontSize: "1.15rem", color: "#1a1a2e", marginBottom: 24, letterSpacing: "0.3px" }}>
        REGISTER AS A DONOR
      </h2>

      <div style={{ marginBottom: 16 }}>
        <label style={labelStyle}>FULL NAME *</label>
        <input
          style={inputStyle}
          placeholder="e.g. Anand Deshpande"
          value={form.name}
          onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
          onFocus={e => { e.target.style.borderColor = "#e53e3e"; }}
          onBlur={e => { e.target.style.borderColor = "#e5e7eb"; }}
        />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
        <div>
          <label style={labelStyle}>BLOOD GROUP</label>
          <div style={{ position: "relative" }}>
            <select
              style={{ ...inputStyle, appearance: "none", paddingRight: 32, background: "white", cursor: "pointer" }}
              value={form.bloodGroup}
              onChange={e => setForm(p => ({ ...p, bloodGroup: e.target.value }))}
              onFocus={e => { e.target.style.borderColor = "#e53e3e"; }}
              onBlur={e => { e.target.style.borderColor = "#e5e7eb"; }}
            >
              {BLOOD_GROUPS.filter(g => g !== "All").map(g => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
            <span style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "#666" }}>▾</span>
          </div>
        </div>
        <div>
          <label style={labelStyle}>LOCATION *</label>
          <input
            style={inputStyle}
            placeholder="e.g. Satara, MH"
            value={form.location}
            onChange={e => setForm(p => ({ ...p, location: e.target.value }))}
            onFocus={e => { e.target.style.borderColor = "#e53e3e"; }}
            onBlur={e => { e.target.style.borderColor = "#e5e7eb"; }}
          />
        </div>
      </div>

      <div style={{ marginBottom: 24 }}>
        <label style={labelStyle}>CONTACT PHONE *</label>
        <input
          style={inputStyle}
          placeholder="+91 Phone number"
          value={form.phone}
          onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
          onFocus={e => { e.target.style.borderColor = "#e53e3e"; }}
          onBlur={e => { e.target.style.borderColor = "#e5e7eb"; }}
        />
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        style={{
          width: "100%",
          background: loading ? "#ccc" : "linear-gradient(135deg, #e53e3e, #9b1c1c)",
          color: "white", border: "none", borderRadius: 30,
          padding: "13px 0", fontWeight: 800, fontSize: "0.88rem",
          letterSpacing: "1px", cursor: loading ? "not-allowed" : "pointer",
          transition: "transform 0.2s, box-shadow 0.2s",
          boxShadow: loading ? "none" : "0 4px 16px rgba(229,62,62,0.4)",
          fontFamily: "Inter, sans-serif",
        }}
        onMouseEnter={e => { if (!loading) e.currentTarget.style.transform = "scale(1.02)"; }}
        onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; }}
      >
        {loading ? "Submitting…" : "SUBMIT REGISTRATION"}
      </button>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function BloodDonationPortal() {
  const [search, setSearch] = useState("");
  const [activeGroup, setActiveGroup] = useState("All");

  const filtered = DONORS.filter(d => {
    const matchGroup = activeGroup === "All" || d.bloodGroup === activeGroup;
    const q = search.toLowerCase();
    const matchSearch = !q ||
      d.name.toLowerCase().includes(q) ||
      d.location.toLowerCase().includes(q) ||
      d.bloodGroup.toLowerCase().includes(q);
    return matchGroup && matchSearch;
  });

  return (
    <div style={{
      minHeight: "100vh",
      background: "#f2f3f7",
      fontFamily: "Inter, sans-serif",
    }}>
      <Navbar />

      <main style={{ maxWidth: 1200, margin: "0 auto", padding: "28px 20px" }}>

        {/* Banner */}
        <div style={{
          background: "linear-gradient(135deg, #fff5f5, #ffe4e4)",
          border: "1.5px solid #fca5a5",
          borderLeft: "5px solid #e53e3e",
          borderRadius: 14,
          padding: "18px 22px",
          marginBottom: 28,
          display: "flex", alignItems: "flex-start", gap: 14,
          animation: "slideDown 0.5s ease",
        }}>
          <Droplets size={28} color="#e53e3e" style={{ flexShrink: 0, marginTop: 2 }} />
          <div>
            <div style={{ fontWeight: 800, color: "#c53030", fontSize: "0.95rem", marginBottom: 4, letterSpacing: "0.3px" }}>
              BE A LIFESAVER TODAY
            </div>
            <div style={{ color: "#555", fontSize: "0.88rem", lineHeight: 1.6 }}>
              Search for active blood donors in your locality or register yourself to contribute to emergency requests.
              Your small act of kindness can save lives.
            </div>
          </div>
        </div>

        {/* Two-column layout */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: 24, alignItems: "start" }}>

          {/* LEFT — Donor List */}
          <div style={{ background: "white", borderRadius: 16, padding: "22px 22px", boxShadow: "0 2px 16px rgba(0,0,0,0.07)" }}>
            {/* Header row */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
              <h2 style={{ fontWeight: 800, fontSize: "1.15rem", color: "#1a1a2e", margin: 0 }}>Available Donors</h2>
              <span style={{ color: "#888", fontSize: "0.88rem", fontWeight: 600 }}>Total: {filtered.length}</span>
            </div>

            {/* Search */}
            <div style={{ position: "relative", marginBottom: 16 }}>
              <Search size={16} color="#aaa" style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)" }} />
              <input
                style={{
                  width: "100%", border: "1.5px solid #e5e7eb", borderRadius: 30,
                  padding: "10px 16px 10px 40px", fontSize: "0.88rem", outline: "none",
                  fontFamily: "Inter, sans-serif", color: "#333", boxSizing: "border-box",
                  transition: "border-color 0.2s",
                }}
                placeholder="Search by name, location or blood group…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                onFocus={e => { e.target.style.borderColor = "#e53e3e"; }}
                onBlur={e => { e.target.style.borderColor = "#e5e7eb"; }}
              />
            </div>

            {/* Blood group filter pills */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
              {BLOOD_GROUPS.map(g => (
                <button
                  key={g}
                  onClick={() => setActiveGroup(g)}
                  style={{
                    padding: "5px 14px", borderRadius: 20, fontSize: "0.82rem", fontWeight: 600,
                    border: activeGroup === g ? "none" : "1.5px solid #ddd",
                    background: activeGroup === g
                      ? "linear-gradient(135deg, #e53e3e, #c53030)"
                      : "white",
                    color: activeGroup === g ? "white" : "#444",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    boxShadow: activeGroup === g ? "0 2px 8px rgba(229,62,62,0.35)" : "none",
                  }}
                >
                  {g}
                </button>
              ))}
            </div>

            {/* Donor cards grid */}
            {filtered.length === 0 ? (
              <div style={{ textAlign: "center", padding: "40px 0", color: "#aaa" }}>
                <div style={{ fontSize: "2rem", marginBottom: 8 }}>🔍</div>
                <div style={{ fontWeight: 600 }}>No donors found</div>
                <div style={{ fontSize: "0.85rem", marginTop: 4 }}>Try a different search or blood group</div>
              </div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                {filtered.map((donor, i) => (
                  <DonorCard key={donor.id} donor={donor} index={i} />
                ))}
              </div>
            )}
          </div>

          {/* RIGHT — Registration form */}
          <div style={{ position: "sticky", top: 80 }}>
            <RegisterForm />
          </div>
        </div>
      </main>

      <Footer />

      {/* Globe FAB */}
      <button style={{
        position: "fixed", bottom: 24, right: 24,
        width: 48, height: 48, borderRadius: "50%",
        background: "linear-gradient(135deg, #e53e3e, #9b1c1c)",
        border: "none", cursor: "pointer",
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: "0 4px 16px rgba(229,62,62,0.4)",
        transition: "transform 0.2s",
        zIndex: 100,
      }}
        onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.1)"; }}
        onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; }}
      >
        <Globe size={20} color="white" />
      </button>

      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        * { box-sizing: border-box; }
        @media (max-width: 768px) {
          .two-col { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}