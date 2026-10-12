import { useState, useEffect, useRef } from "react";

/* ── Design tokens — matches all portal pages ─────────────────────────────── */
const T = {
  navy:      "#0d2236",
  navyMid:   "#14324f",
  navyLight: "#1a3a6b",
  green:     "#1a7a3c",
  greenMid:  "#1e8f46",
  saffron:   "#e87722",
  saffSoft:  "#fff4ec",
  gold:      "#f5a623",
  red:       "#c0392b",
  white:     "#ffffff",
  offWhite:  "#f8faf8",
  border:    "#dde5d4",
  borderDk:  "#bfccb0",
  text:      "#0d1f0e",
  textSub:   "#3d5a40",
  textMuted: "#7a9480",
  shadow:    "0 2px 12px rgba(13,31,14,0.08), 0 1px 3px rgba(13,31,14,0.06)",
  font:      "'Noto Sans Devanagari','Noto Sans','Segoe UI',system-ui,sans-serif",
};

const NAV_LINKS = [
  { mr:"होम",        en:"Home" },
  { mr:"आमच्याबद्दल", en:"About Us" },
  { mr:"सेवा",        en:"Services" },
  { mr:"उपक्रम",      en:"Initiatives" },
  { mr:"गॅलरी",       en:"Gallery" },
  { mr:"बातम्या",     en:"News" },
  { mr:"संपर्क",      en:"Contact" },
];

/* ── SVG Social Icons (inline — no external deps) ───────────────────────────── */
const FacebookSVG = () => (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);
const InstagramSVG = () => (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="2" width="20" height="20" rx="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="0.7" fill="currentColor" stroke="none"/>
  </svg>
);
const YoutubeSVG = () => (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.96-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
    <polygon fill="white" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
  </svg>
);
const TwitterSVG = () => (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
  </svg>
);
const PhoneSVG = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);
const MailSVG = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);
const HeartSVG = () => (
  <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
);
const MenuSVG = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="3" y1="6" x2="21" y2="6"/>
    <line x1="3" y1="12" x2="21" y2="12"/>
    <line x1="3" y1="18" x2="21" y2="18"/>
  </svg>
);
const CloseSVG = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);


/* ── Social Icon Button ──────────────────────────────────────────────────────── */
function SocialPill({ icon, label, color }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      aria-label={label}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        width: 30, height: 30, borderRadius: "50%",
        background: hov ? color : "rgba(255,255,255,0.08)",
        border: `1.5px solid ${hov ? color : "rgba(255,255,255,0.18)"}`,
        color: hov ? "white" : "rgba(255,255,255,0.65)",
        display: "flex", alignItems: "center", justifyContent: "center",
        cursor: "pointer",
        transform: hov ? "translateY(-2px) scale(1.08)" : "none",
        boxShadow: hov ? `0 4px 12px ${color}55` : "none",
        transition: "all 0.2s cubic-bezier(0.34,1.56,0.64,1)",
      }}
    >
      {icon}
    </button>
  );
}

/* ── Nav Link (desktop) ─────────────────────────────────────────────────────── */
function NavLink({ label, active, onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        position: "relative",
        padding: "14px 14px",
        background: "none",
        border: "none",
        cursor: "pointer",
        fontFamily: T.font,
        fontSize: "1rem",
        fontWeight: active ? 800 : 600,
        color: active ? T.green : hov ? T.saffron : T.text,
        letterSpacing: "0.1px",
        transition: "color 0.18s ease",
        whiteSpace: "nowrap",
      }}
    >
      {label}
      {/* Animated underline */}
      <span style={{
        position: "absolute",
        bottom: 8,
        left: active ? "10%" : hov ? "10%" : "50%",
        right: active ? "10%" : hov ? "10%" : "50%",
        height: 2,
        background: T.saffron,
        borderRadius: 2,
        transition: "left 0.22s cubic-bezier(0.4,0,0.2,1), right 0.22s cubic-bezier(0.4,0,0.2,1), opacity 0.18s",
        opacity: active || hov ? 1 : 0,
      }}/>
    </button>
  );
}

/* ── Mobile Drawer Link ─────────────────────────────────────────────────────── */
function DrawerLink({ label, active, onClick, index }) {
  const [hov, setHov] = useState(false);
  const on  = () => setHov(true);
  const off = () => setHov(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={on} onMouseLeave={off}
      onTouchStart={on} onTouchEnd={off}
      style={{
        width: "100%",
        textAlign: "left",
        padding: "16px 18px",
        background: active
          ? `linear-gradient(90deg, ${T.green}22, transparent)`
          : hov ? `linear-gradient(90deg, ${T.saffron}18, transparent)` : "transparent",
        border: "none",
        borderLeft: active ? `3px solid ${T.saffron}` : hov ? `3px solid ${T.saffron}88` : "3px solid transparent",
        cursor: "pointer",
        fontFamily: T.font,
        fontSize: "1rem",
        fontWeight: active ? 700 : 500,
        color: active ? T.saffron : hov ? T.green : T.textSub,
        transition: "all 0.18s ease",
        animation: `drawerIn 0.2s ease ${index * 0.035}s both`,
        transform: hov && !active ? "translateX(4px)" : "none",
      }}
    >
      {label}
    </button>
  );
}

/* ── Contact chip ───────────────────────────────────────────────────────────── */
function ContactChip({ icon, text, href }) {
  const [hov, setHov] = useState(false);
  return (
    <a
      href={href}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "flex", alignItems: "center", gap: 6,
        padding: "4px 10px",
        borderRadius: 20,
        background: hov ? "rgba(255,255,255,0.12)" : "transparent",
        color: hov ? "white" : "rgba(255,255,255,0.65)",
        fontSize: "0.76rem",
        textDecoration: "none",
        fontFamily: T.font,
        border: `1px solid ${hov ? "rgba(255,255,255,0.22)" : "transparent"}`,
        transition: "all 0.18s ease",
        letterSpacing: "0.1px",
        transform: hov ? "translateY(-1px)" : "none",
      }}
    >
      {icon}
      {text}
    </a>
  );
}

/* ── Donate Button ──────────────────────────────────────────────────────────── */
function DonateBtn({ isMobile }) {
  const [hov, setHov] = useState(false);
  const [pressed, setPressed] = useState(false);
  return (
    <button
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => { setHov(false); setPressed(false); }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      style={{
        display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
        padding: isMobile ? "10px 0" : "7px 18px",
        width: isMobile ? "100%" : "auto",
        background: hov
          ? `linear-gradient(135deg, #d4301a, ${T.red})`
          : `linear-gradient(135deg, ${T.red}, #a93226)`,
        border: "none",
        borderRadius: 24,
        cursor: "pointer",
        fontFamily: T.font,
        fontSize: "0.82rem",
        fontWeight: 800,
        color: "white",
        letterSpacing: "0.3px",
        transform: pressed ? "scale(0.96)" : hov ? "translateY(-1px) scale(1.02)" : "none",
        boxShadow: hov
          ? `0 5px 18px rgba(192,57,43,0.55)`
          : `0 2px 8px rgba(192,57,43,0.35)`,
        transition: "all 0.18s cubic-bezier(0.34,1.56,0.64,1)",
        animation: hov ? "heartbeat 0.6s ease" : "none",
      }}
    >
      <HeartSVG/>
      दान करा
    </button>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
   MAIN NAVBAR
════════════════════════════════════════════════════════════════════════════ */
export default function Navbar() {
  const [active,   setActive]   = useState(0);
  const [open,     setOpen]     = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close drawer on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);



  return (
    <>
      <header
        ref={headerRef}
        style={{
          width: "100%",
          position: "sticky",
          top: 0,
          zIndex: 100,
          fontFamily: T.font,
          boxShadow: scrolled ? "0 4px 24px rgba(13,31,14,0.18)" : T.shadow,
          transition: "box-shadow 0.3s ease",
        }}
      >
        {/* ── Maharashtra tricolor stripe ── */}
        <div style={{ display:"flex", height: 4 }}>
          {["#ff9933","#ffffff","#138808"].map((c,i)=>
            <div key={i} style={{ flex:1, background:c }}/>
          )}
        </div>

        {/* ── TOP BAR ── */}
        <div style={{ background: "#1a4731" }}>
          <div id="navbar-top-grid" style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "0 20px",
            display: "grid",
            gridTemplateColumns: "auto 1fr auto",
            alignItems: "center",
            gap: 16,
            minHeight: 80,
          }}>

            {/* ── Logo ── */}
            <div id="navbar-brand" style={{ display:"flex", alignItems:"center", gap:12, minWidth:0 }}>
              {/* Badge */}
              <div style={{
                width: 46, height: 46, borderRadius: "50%",
                background: "radial-gradient(circle at 35% 35%, #1e8f46, #0d4d20)",
                border: "2px solid rgba(245,166,35,0.7)",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
                boxShadow: "0 2px 10px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.15)",
              }}>
                <svg viewBox="0 0 40 40" width="34" height="34" fill="none">
                  <circle cx="20" cy="20" r="19" fill="#166534"/>
                  <polygon points="20,6 23,15 33,15 25,21 28,31 20,25 12,31 15,21 7,15 17,15" fill="#f5a623" opacity="0.9"/>
                  <circle cx="20" cy="20" r="4" fill="#0d4d20"/>
                </svg>
              </div>
              {/* Name */}
              <div id="navbar-brand-copy" style={{ minWidth:0 }}>
                <div id="navbar-brand-title" style={{ color:"white", fontWeight:900, fontSize:"clamp(1.15rem,3vw,1.55rem)", lineHeight:1.2, letterSpacing:"0.1px", whiteSpace:"nowrap", marginBottom:4 }}>
                  खुशहाल मुशायरा
                </div>
                <div id="navbar-brand-subtitle" style={{ color:"rgba(255,255,255,0.75)", fontSize:"clamp(0.7rem,1.5vw,0.82rem)", lineHeight:1.4, letterSpacing:"0.4px" }}>
                  सोशल वेलफेअर &amp; चॅरिटेबल ट्रस्ट, महाराष्ट्र
                </div>
              </div>
            </div>

            {/* ── Center: contact chips ── */}
            <div id="navbar-contact-center" style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:6, flexWrap:"wrap" }}>
              <ContactChip icon={<PhoneSVG/>} text="+91 88001 23456" href="tel:+918800123456"/>
              <div style={{ width:1, height:14, background:"rgba(255,255,255,0.15)" }}/>
              <ContactChip icon={<MailSVG/>}  text="info@trust.org"  href="mailto:info@trust.org"/>
            </div>

            {/* ── Right: socials + lang + donate ── */}
            <div style={{ display:"flex", alignItems:"center", gap:6 }}>
              {/* Socials */}
              <div id="navbar-socials" style={{ display:"flex", gap:5, alignItems:"center" }}>
                <SocialPill icon={<FacebookSVG/>}  label="Facebook"  color="#1877f2"/>
                <SocialPill icon={<InstagramSVG/>} label="Instagram" color="#e1306c"/>
                <SocialPill icon={<TwitterSVG/>}   label="Twitter"   color="#1da1f2"/>
                <SocialPill icon={<YoutubeSVG/>}   label="YouTube"   color="#ff0000"/>
              </div>

              {/* Divider */}
              <div style={{ width:1, height:20, background:"rgba(255,255,255,0.15)", margin:"0 2px" }}/>

              <div id="navbar-donate"><DonateBtn/></div>

              {/* Hamburger — mobile only */}
              <button
                onClick={() => setOpen(o=>!o)}
                style={{
                  display: "none",
                  padding: 6, borderRadius: 7,
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  color: "rgba(255,255,255,0.8)",
                  cursor: "pointer",
                  transition: "background 0.18s",
                }}
                id="hamburger-btn"
                aria-label="Toggle menu"
                aria-expanded={open}
                aria-controls="mobile-drawer"
              >
                {open ? <CloseSVG/> : <MenuSVG/>}
              </button>
            </div>
          </div>
        </div>

        {/* ── NAV BAR ── */}
        <nav style={{ background: "#ffffff", borderTop:`1px solid ${T.border}`, borderBottom:`1px solid ${T.border}` }}
          id="desktop-nav">
          <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 20px", display:"flex", justifyContent:"center", gap:4, overflowX:"auto", WebkitOverflowScrolling:"touch" }}>
            {NAV_LINKS.map((link, i) => (
              <NavLink
                key={i}
                label={link.mr}
                active={active === i}
                onClick={() => setActive(i)}
              />
            ))}
          </div>
        </nav>

        {/* ── MOBILE DRAWER ── */}
        <div
          id="mobile-drawer"
          style={{
            background: T.white,
            borderTop: `1px solid ${T.border}`,
            overflow: "hidden",
            maxHeight: open ? "600px" : 0,
            opacity: open ? 1 : 0,
            transition: "max-height 0.35s cubic-bezier(0.4,0,0.2,1), opacity 0.25s ease",
            boxShadow: open ? "0 8px 24px rgba(13,31,14,0.1)" : "none",
          }}
        >
          {/* Mobile contact — professional panel */}
          <div style={{ background: "#1a4731", padding: "16px 18px 14px" }}>
            {/* Contact row */}
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:12 }}>
              <a href="tel:+918800123456" style={{
                display:"flex", alignItems:"center", gap:8,
                padding:"9px 12px", borderRadius:8,
                background:"rgba(255,255,255,0.08)",
                border:"1px solid rgba(255,255,255,0.12)",
                color:"white", textDecoration:"none", fontFamily:T.font, fontSize:"0.78rem",
              }}>
                <span style={{ color:"#4ade80", flexShrink:0 }}><PhoneSVG/></span>
                <span>+91 88001 23456</span>
              </a>
              <a href="mailto:info@trust.org" style={{
                display:"flex", alignItems:"center", gap:8,
                padding:"9px 12px", borderRadius:8,
                background:"rgba(255,255,255,0.08)",
                border:"1px solid rgba(255,255,255,0.12)",
                color:"white", textDecoration:"none", fontFamily:T.font, fontSize:"0.78rem",
              }}>
                <span style={{ color:"#93c5fd", flexShrink:0 }}><MailSVG/></span>
                <span>info@trust.org</span>
              </a>
            </div>

            {/* Social row */}
            <div id="mobile-socials" style={{ display:"flex", gap:8, marginBottom:12 }}>
              {[
                { icon:<FacebookSVG/>,  color:"#1877f2", label:"fb" },
                { icon:<InstagramSVG/>, color:"#e1306c", label:"ig" },
                { icon:<TwitterSVG/>,   color:"#1da1f2", label:"tw" },
                { icon:<YoutubeSVG/>,   color:"#ff0000", label:"yt" },
              ].map((s,i) => (
                <button key={i} aria-label={s.label} style={{
                  flex:1, height:34, borderRadius:6,
                  background: s.color,
                  color:"white", border:"none",
                  display:"flex", alignItems:"center", justifyContent:"center",
                  cursor:"pointer", boxShadow:`0 2px 8px ${s.color}55`,
                }}>
                  {s.icon}
                </button>
              ))}
            </div>

            {/* Donate button */}
            <DonateBtn isMobile/>
          </div>

          {/* Mobile nav links */}
          <div style={{ display:"flex", flexDirection:"column", padding:"6px 0 8px" }}>
            {NAV_LINKS.map((link, i) => (
              <DrawerLink
                key={i}
                label={link.mr}
                active={active === i}
                index={i}
                onClick={() => { setActive(i); setOpen(false); }}
              />
            ))}
          </div>
        </div>
      </header>

      {/* ── Responsive: show hamburger, hide desktop contact/socials on small screens ── */}
      <style>{`
        @media (max-width: 767px) {
          #hamburger-btn { display: flex !important; }
          #desktop-nav   { display: none !important; }
          #navbar-top-grid {
            grid-template-columns: minmax(0, 1fr) auto !important;
            gap: 8px !important;
            padding: 0 12px !important;
          }
          #navbar-brand { gap: 8px !important; }
          #navbar-socials, #navbar-donate { display: none !important; }
          #mobile-socials { display: flex !important; }
          #desktop-nav button { font-size: 1rem; }
        }
        @media (min-width: 768px) {
          #mobile-socials { display: none !important; }
        }
        @media (min-width: 768px) and (max-width: 960px) {
          #navbar-top-grid { gap: 8px !important; padding: 0 12px !important; }
          #navbar-contact-center { display: none !important; }
          #navbar-top-grid { grid-template-columns: minmax(0, 1fr) auto !important; }
          #desktop-nav button { padding-left: 10px !important; padding-right: 10px !important; }
        }
        @keyframes drawerIn {
          from { opacity:0; transform:translateX(-8px); }
          to   { opacity:1; transform:translateX(0); }
        }
        @keyframes heartbeat {
          0%,100% { transform: translateY(-1px) scale(1.02); }
          40%      { transform: translateY(-1px) scale(1.07); }
          60%      { transform: translateY(-1px) scale(1.02); }
        }
        header * { box-sizing: border-box; }
        header a  { text-decoration: none; }
        @media (max-width: 767px) {
          #navbar-contact-center { display: none !important; }
        }
        @media (max-width: 380px) {
          #navbar-brand-subtitle { display: block !important; color: rgba(255,255,255,0.75) !important; font-size: 0.68rem !important; }
          #navbar-brand-title { font-size: 1.05rem !important; margin-bottom: 4px !important; }
          #navbar-brand > div:first-child { width: 38px !important; height: 38px !important; }
          #navbar-top-grid { padding: 0 8px !important; min-height: 76px !important; }
        }
        @media (max-width: 767px) {
          #navbar-top-grid { min-height: 76px !important; }
          #navbar-brand-subtitle { color: rgba(255,255,255,0.75) !important; font-size: 0.75rem !important; }
          #navbar-brand-title { font-size: 1.15rem !important; margin-bottom: 4px !important; }
        }
      `}</style>
    </>
  );
}