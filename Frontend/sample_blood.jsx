// BloodDonationPortal.jsx
// React + Vite + Tailwind CSS
// npm install lucide-react

import { useState, useEffect, useRef } from "react";
import { Search, MapPin, Phone, Droplets, UserPlus, CheckCircle2, XCircle } from "lucide-react";

// ── Sample donor data ────────────────────────────────────────────────────────
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
];

const BLOOD_GROUPS = ["All", "A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

const BG_PALETTE = {
  "A+":  ["#fff0f0", "#e53e3e"],
  "A-":  ["#fff0f0", "#c53030"],
  "B+":  ["#fff4e6", "#dd6b20"],
  "B-":  ["#fff4e6", "#c05621"],
  "O+":  ["#f0fff4", "#276749"],
  "O-":  ["#f0fff4", "#22543d"],
  "AB+": ["#ebf4ff", "#2b6cb0"],
  "AB-": ["#ebf4ff", "#2c5282"],
};

// ── Animated counter ──────────────────────────────────────────────────────────
function Counter({ target }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = Math.ceil(target / 40);
    const t = setInterval(() => {
      start += step;
      if (start >= target) { setVal(target); clearInterval(t); }
      else setVal(start);
    }, 30);
    return () => clearInterval(t);
  }, [target]);
  return <>{val}</>;
}

// ── DonorCard ─────────────────────────────────────────────────────────────────
function DonorCard({ donor, index }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [bgColor, textColor] = BG_PALETTE[donor.bloodGroup] || ["#f5f5f5", "#333"];

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
          ? hovered ? "translateY(-4px)" : "translateY(0)"
          : "translateY(24px)",
        transition: `opacity 0.45s ease ${index * 0.05}s, transform 0.3s ease`,
        background: "white",
        borderRadius: 16,
        padding: "18px 16px",
        boxShadow: hovered
          ? "0 8px 28px rgba(229,62,62,0.18)"
          : "0 2px 12px rgba(0,0,0,0.07)",
        border: `1.5px solid ${hovered ? "#fca5a5" : "#f0f0f0"}`,
        display: "flex",
        flexDirection: "column",
        gap: 12,
        cursor: "default",
      }}
    >
      {/* Top: avatar + name + status */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {/* Blood group circle */}
        <div style={{
          width: 52, height: 52, borderRadius: "50%",
          background: bgColor, color: textColor,
          fontWeight: 900, fontSize: "0.95rem",
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0, letterSpacing: "-0.5px",
          boxShadow: `0 0 0 3px ${bgColor}, 0 0 0 4px ${textColor}22`,
        }}>
          {donor.bloodGroup}
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontWeight: 700, fontSize: "0.95rem", color: "#1a1a2e",
            whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
          }}>
            {donor.name}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 3 }}>
            {donor.available
              ? <CheckCircle2 size={12} color="#16a34a" />
              : <XCircle size={12} color="#9ca3af" />}
            <span style={{
              fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.4px",
              color: donor.available ? "#16a34a" : "#9ca3af",
              textTransform: "uppercase",
            }}>
              {donor.available ? "Available" : "Unavailable"}
            </span>
          </div>
        </div>
      </div>

      {/* Location */}
      <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#64748b", fontSize: "0.8rem" }}>
        <MapPin size={12} color="#e53e3e" style={{ flexShrink: 0 }} />
        {donor.location}
      </div>

      {/* Call button */}
      <a
        href={`tel:${donor.phone}`}
        style={{
          display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
          background: donor.available
            ? "linear-gradient(135deg, #e53e3e, #9b1c1c)"
            : "#e5e7eb",
          color: donor.available ? "white" : "#9ca3af",
          borderRadius: 30, padding: "7px 12px",
          fontSize: "0.78rem", fontWeight: 600, textDecoration: "none",
          pointerEvents: donor.available ? "auto" : "none",
          transition: "opacity 0.2s",
          boxShadow: donor.available ? "0 2px 8px rgba(229,62,62,0.3)" : "none",
        }}
      >
        <Phone size={12} />
        {donor.phone}
      </a>
    </div>
  );
}

// ── Stats bar ─────────────────────────────────────────────────────────────────
function StatsBar({ donors }) {
  const total = donors.length;
  const avail = donors.filter(d => d.available).length;
  const groups = [...new Set(donors.map(d => d.bloodGroup))].length;

  return (
    <div style={{
      display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
      gap: 12, marginBottom: 24,
    }}>
      {[
        { label: "Total Donors",     value: total, color: "#e53e3e", bg: "#fff5f5" },
        { label: "Available Now",    value: avail, color: "#16a34a", bg: "#f0fdf4" },
        { label: "Blood Groups",     value: groups, color: "#2563eb", bg: "#eff6ff" },
      ].map(({ label, value, color, bg }) => (
        <div key={label} style={{
          background: bg, borderRadius: 12, padding: "14px 16px",
          border: `1px solid ${color}22`, textAlign: "center",
        }}>
          <div style={{ fontSize: "1.8rem", fontWeight: 900, color, lineHeight: 1 }}>
            <Counter target={value} />
          </div>
          <div style={{ fontSize: "0.72rem", fontWeight: 600, color: "#64748b", marginTop: 4, letterSpacing: "0.4px", textTransform: "uppercase" }}>
            {label}
          </div>
        </div>
      ))}
    </div>
  );
}

// ── RegisterForm ──────────────────────────────────────────────────────────────
function RegisterForm({ onRegister }) {
  const [form, setForm] = useState({ name: "", bloodGroup: "O+", location: "", phone: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim())     e.name = "Required";
    if (!form.location.trim()) e.location = "Required";
    if (!form.phone.trim())    e.phone = "Required";
    return e;
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      onRegister && onRegister({ ...form, id: Date.now(), available: true });
    }, 1000);
  };

  const inp = (field) => ({
    style: {
      width: "100%", border: `1.5px solid ${errors[field] ? "#fca5a5" : "#e5e7eb"}`,
      borderRadius: 8, padding: "9px 12px", fontSize: "0.85rem",
      outline: "none", background: "white", color: "#1a1a2e",
      boxSizing: "border-box", fontFamily: "inherit",
      transition: "border-color 0.2s",
    },
    onFocus: (e) => { e.target.style.borderColor = "#e53e3e"; },
    onBlur:  (e) => { e.target.style.borderColor = errors[field] ? "#fca5a5" : "#e5e7eb"; },
  });

  if (submitted) return (
    <div style={{
      background: "linear-gradient(135deg, #f0fdf4, #dcfce7)",
      border: "1.5px solid #86efac", borderRadius: 12,
      padding: "24px 20px", textAlign: "center",
    }}>
      <div style={{ fontSize: "2.2rem", marginBottom: 8 }}>🎉</div>
      <div style={{ fontWeight: 800, color: "#166534", fontSize: "1rem", marginBottom: 6 }}>
        Registered Successfully!
      </div>
      <div style={{ color: "#15803d", fontSize: "0.82rem", marginBottom: 16 }}>
        Thank you, {form.name}. You have been added to the donor list.
      </div>
      <button
        onClick={() => { setSubmitted(false); setForm({ name: "", bloodGroup: "O+", location: "", phone: "" }); setErrors({}); }}
        style={{
          background: "#16a34a", color: "white", border: "none",
          borderRadius: 8, padding: "8px 18px", fontWeight: 700,
          cursor: "pointer", fontSize: "0.82rem", fontFamily: "inherit",
        }}
      >
        Register Another
      </button>
    </div>
  );

  const label = (text, required) => (
    <label style={{ fontSize: "0.72rem", fontWeight: 700, color: "#374151", letterSpacing: "0.5px", display: "block", marginBottom: 5 }}>
      {text} {required && <span style={{ color: "#e53e3e" }}>*</span>}
    </label>
  );

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {/* Row 1: Name */}
      <div>
        {label("FULL NAME", true)}
        <input {...inp("name")} placeholder="e.g. Anand Deshpande" value={form.name}
          onChange={e => { setForm(p => ({ ...p, name: e.target.value })); setErrors(p => ({ ...p, name: "" })); }} />
        {errors.name && <span style={{ fontSize: "0.7rem", color: "#e53e3e" }}>{errors.name}</span>}
      </div>

      {/* Row 2: Blood Group + Location side by side */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <div>
          {label("BLOOD GROUP")}
          <div style={{ position: "relative" }}>
            <select
              value={form.bloodGroup}
              onChange={e => setForm(p => ({ ...p, bloodGroup: e.target.value }))}
              style={{ ...inp("bloodGroup").style, paddingRight: 28, appearance: "none", cursor: "pointer" }}
              onFocus={e => { e.target.style.borderColor = "#e53e3e"; }}
              onBlur={e => { e.target.style.borderColor = "#e5e7eb"; }}
            >
              {BLOOD_GROUPS.filter(g => g !== "All").map(g => <option key={g}>{g}</option>)}
            </select>
            <span style={{ position: "absolute", right: 9, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "#888", fontSize: "0.7rem" }}>▾</span>
          </div>
        </div>
        <div>
          {label("LOCATION", true)}
          <input {...inp("location")} placeholder="e.g. Satara, MH" value={form.location}
            onChange={e => { setForm(p => ({ ...p, location: e.target.value })); setErrors(p => ({ ...p, location: "" })); }} />
          {errors.location && <span style={{ fontSize: "0.7rem", color: "#e53e3e" }}>{errors.location}</span>}
        </div>
      </div>

      {/* Row 3: Phone */}
      <div>
        {label("CONTACT NO.", true)}
        <input {...inp("phone")} placeholder="+91 Phone number" value={form.phone}
          onChange={e => { setForm(p => ({ ...p, phone: e.target.value })); setErrors(p => ({ ...p, phone: "" })); }} />
        {errors.phone && <span style={{ fontSize: "0.7rem", color: "#e53e3e" }}>{errors.phone}</span>}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        style={{
          background: loading ? "#d1d5db" : "linear-gradient(135deg, #e53e3e, #9b1c1c)",
          color: loading ? "#9ca3af" : "white",
          border: "none", borderRadius: 30, padding: "11px 0",
          fontWeight: 800, fontSize: "0.85rem", letterSpacing: "0.8px",
          cursor: loading ? "not-allowed" : "pointer",
          width: "100%", fontFamily: "inherit",
          boxShadow: loading ? "none" : "0 4px 16px rgba(229,62,62,0.35)",
          transition: "transform 0.2s, box-shadow 0.2s",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
        }}
        onMouseEnter={e => { if (!loading) e.currentTarget.style.transform = "scale(1.02)"; }}
        onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; }}
      >
        {loading ? (
          <>
            <span style={{ display: "inline-block", animation: "spin 1s linear infinite" }}>⟳</span> Submitting…
          </>
        ) : (
          <><UserPlus size={15} /> SUBMIT REGISTRATION</>
        )}
      </button>
    </form>
  );
}

// ── Available Donor mini-table ─────────────────────────────────────────────────
function MiniDonorTable({ donors }) {
  const recent = donors.filter(d => d.available).slice(0, 6);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      {recent.map(d => {
        const [bg, text] = BG_PALETTE[d.bloodGroup] || ["#f5f5f5","#333"];
        return (
          <div key={d.id} style={{
            display: "flex", alignItems: "center", gap: 8,
            background: "rgba(255,255,255,0.12)", borderRadius: 8,
            padding: "6px 10px",
          }}>
            <span style={{
              background: bg, color: text, borderRadius: 6,
              padding: "2px 6px", fontSize: "0.7rem", fontWeight: 900, flexShrink: 0,
            }}>{d.bloodGroup}</span>
            <span style={{ color: "white", fontSize: "0.78rem", fontWeight: 600, flex: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {d.name}
            </span>
            <span style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.7rem", flexShrink: 0 }}>
              {d.location.split(",")[0]}
            </span>
          </div>
        );
      })}
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function BloodDonationPortal() {
  const [search, setSearch] = useState("");
  const [activeGroup, setActiveGroup] = useState("All");
  const [donors, setDonors] = useState(DONORS);

  const filtered = donors.filter(d => {
    const matchGroup = activeGroup === "All" || d.bloodGroup === activeGroup;
    const q = search.toLowerCase();
    const matchSearch = !q ||
      d.name.toLowerCase().includes(q) ||
      d.location.toLowerCase().includes(q) ||
      d.bloodGroup.toLowerCase().includes(q);
    return matchGroup && matchSearch;
  });

  const handleRegister = (newDonor) => {
    setDonors(prev => [{ ...newDonor, id: prev.length + 1 }, ...prev]);
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#f4f5f9",
      fontFamily: "'Inter', 'Segoe UI', sans-serif",
    }}>
      {/* ── Page Header ──────────────────────────────────────────────────────── */}
      <div style={{
        background: "linear-gradient(135deg, #e53e3e 0%, #9b1c1c 100%)",
        padding: "20px 24px 60px",
        position: "relative", overflow: "hidden",
      }}>
        {/* decorative circles */}
        <div style={{ position:"absolute", top:-40, right:-40, width:180, height:180, borderRadius:"50%", background:"rgba(255,255,255,0.06)" }} />
        <div style={{ position:"absolute", bottom:-30, left:"30%", width:120, height:120, borderRadius:"50%", background:"rgba(255,255,255,0.05)" }} />

        <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
            <Droplets size={26} color="white" />
            <h1 style={{ color: "white", fontWeight: 900, fontSize: "clamp(1.3rem,3vw,1.8rem)", margin: 0, letterSpacing: "0.5px" }}>
              Blood Donation Portal
            </h1>
          </div>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.88rem", margin: 0, maxWidth: 480 }}>
            Connect blood donors with those in need — register today or search for a donor near you.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: "-36px auto 0", padding: "0 20px 40px", position: "relative", zIndex: 2 }}>

        {/* ── TOP CARD: Register + Available Donors side-by-side ────────────── */}
        <div style={{
          background: "white", borderRadius: 20,
          boxShadow: "0 4px 32px rgba(0,0,0,0.1)",
          marginBottom: 24, overflow: "hidden",
        }}>
          {/* Card header */}
          <div style={{
            background: "linear-gradient(90deg, #fff5f5, #fff)",
            borderBottom: "1px solid #fee2e2",
            padding: "16px 24px",
            display: "flex", alignItems: "center", gap: 10,
          }}>
            <UserPlus size={18} color="#e53e3e" />
            <h2 style={{ fontWeight: 800, fontSize: "1rem", color: "#1a1a2e", margin: 0, letterSpacing: "0.3px" }}>
              Register as a Donor
            </h2>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 320px",
            gap: 0,
          }}
            className="register-grid"
          >
            {/* Left: form */}
            <div style={{ padding: "24px 24px" }}>
              <RegisterForm onRegister={handleRegister} />
            </div>

            {/* Right: available donors panel */}
            <div style={{
              background: "linear-gradient(160deg, #9b1c1c 0%, #e53e3e 100%)",
              padding: "24px 20px",
              display: "flex", flexDirection: "column", gap: 14,
            }}>
              <div>
                <div style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", marginBottom: 4 }}>
                  Currently Active
                </div>
                <div style={{ color: "white", fontWeight: 800, fontSize: "1rem" }}>
                  Available Donors
                </div>
              </div>

              <div style={{
                background: "rgba(255,255,255,0.15)", borderRadius: 10,
                padding: "10px 12px", display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ color: "white", fontWeight: 900, fontSize: "2.8rem", lineHeight: 1 }}>
                    {donors.filter(d => d.available).length}
                  </div>
                  <div style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.75rem", marginTop: 4 }}>
                    Ready to donate
                  </div>
                </div>
              </div>

              <MiniDonorTable donors={donors} />
            </div>
          </div>
        </div>

        {/* ── Stats bar ─────────────────────────────────────────────────────── */}
        <StatsBar donors={donors} />

        {/* ── Search & Filter ───────────────────────────────────────────────── */}
        <div style={{
          background: "white", borderRadius: 16,
          boxShadow: "0 2px 16px rgba(0,0,0,0.07)",
          padding: "20px 22px", marginBottom: 20,
        }}>
          <div style={{
            display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center",
            marginBottom: 16,
          }}>
            {/* Search box */}
            <div style={{ position: "relative", flex: "1 1 240px", minWidth: 200 }}>
              <Search size={15} color="#aaa" style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)" }} />
              <input
                style={{
                  width: "100%", border: "1.5px solid #e5e7eb", borderRadius: 30,
                  padding: "9px 16px 9px 38px", fontSize: "0.85rem",
                  outline: "none", fontFamily: "inherit", color: "#333",
                  boxSizing: "border-box", transition: "border-color 0.2s",
                }}
                placeholder="Search by name, location or blood group…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                onFocus={e => { e.target.style.borderColor = "#e53e3e"; }}
                onBlur={e => { e.target.style.borderColor = "#e5e7eb"; }}
              />
            </div>

            <span style={{ color: "#94a3b8", fontSize: "0.82rem", fontWeight: 600, whiteSpace: "nowrap" }}>
              {filtered.length} result{filtered.length !== 1 ? "s" : ""}
            </span>
          </div>

          {/* Blood group filter pills */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
            {BLOOD_GROUPS.map(g => {
              const active = activeGroup === g;
              return (
                <button
                  key={g}
                  onClick={() => setActiveGroup(g)}
                  style={{
                    padding: "5px 14px", borderRadius: 20,
                    fontSize: "0.8rem", fontWeight: 700,
                    border: active ? "none" : "1.5px solid #e5e7eb",
                    background: active ? "linear-gradient(135deg, #e53e3e, #9b1c1c)" : "white",
                    color: active ? "white" : "#555",
                    cursor: "pointer", transition: "all 0.2s",
                    boxShadow: active ? "0 2px 8px rgba(229,62,62,0.35)" : "none",
                    fontFamily: "inherit",
                  }}
                >
                  {g}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Donor Cards Grid (3-column, matches screenshot) ──────────────── */}
        {filtered.length === 0 ? (
          <div style={{
            background: "white", borderRadius: 16, padding: "48px 24px",
            textAlign: "center", boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
          }}>
            <div style={{ fontSize: "2.5rem", marginBottom: 8 }}>🔍</div>
            <div style={{ fontWeight: 700, color: "#374151", marginBottom: 4 }}>No donors found</div>
            <div style={{ color: "#9ca3af", fontSize: "0.85rem" }}>Try a different name, location, or blood group</div>
          </div>
        ) : (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 16,
          }}
            className="donor-grid"
          >
            {filtered.map((donor, i) => (
              <DonorCard key={donor.id} donor={donor} index={i} />
            ))}
          </div>
        )}
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

        * { box-sizing: border-box; }

        @keyframes spin { to { transform: rotate(360deg); } }

        /* Responsive: register grid */
        @media (max-width: 860px) {
          .register-grid {
            grid-template-columns: 1fr !important;
          }
        }

        /* Responsive: 3-col → 2-col → 1-col donor grid */
        @media (max-width: 900px) {
          .donor-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 560px) {
          .donor-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}