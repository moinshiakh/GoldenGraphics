import { Link } from 'react-router-dom'
import { useLang } from './useLang'

const T = {
  font: "'Noto Sans Devanagari','Noto Sans','Segoe UI',system-ui,sans-serif",
};

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

export default function Footer() {
  const { t } = useLang();
  const serviceLinks = {
    [t.serviceItems[0]]: '/blood-donation',
    [t.serviceItems[1]]: '/donate-poor',
    [t.serviceItems[4]]: '/labour-service',
  };

  return (
    <footer style={{ background: "#1a4731", color: "rgba(255,255,255,0.75)", fontFamily: T.font }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 32, padding: "40px 0 32px" }}>

          {/* Brand — same logo as header */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
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
              <div>
                <div style={{ color: "white", fontWeight: 900, fontSize: "clamp(1.15rem,3vw,1.55rem)", lineHeight: 1.2, letterSpacing: "0.1px", fontFamily: T.font }}>
                  {t.brandName}
                </div>
                <div style={{ color: "rgba(255,255,255,0.75)", fontSize: "clamp(0.7rem,1.5vw,0.82rem)", lineHeight: 1.4, letterSpacing: "0.4px", fontFamily: T.font }}>
                  {t.brandSub}
                </div>
              </div>
            </div>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.82rem", lineHeight: 1.7, margin: "0 0 16px", fontFamily: T.font }}>
              {t.footerDesc}
            </p>
            <div style={{ display: "flex", gap: 8 }}>
              {[
                { icon: <FacebookSVG/>, color: "#1877f2" },
                { icon: <InstagramSVG/>, color: "#e1306c" },
                { icon: <TwitterSVG/>, color: "#1da1f2" },
                { icon: <YoutubeSVG/>, color: "#ff0000" },
              ].map((s, i) => (
                <a key={i} href="#" style={{
                  width: 30, height: 30, borderRadius: "50%",
                  background: "rgba(255,255,255,0.08)",
                  border: "1.5px solid rgba(255,255,255,0.18)",
                  color: "rgba(255,255,255,0.65)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  textDecoration: "none", transition: "all 0.2s ease",
                }}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Useful Links */}
          <div>
            <h4 style={{ color: "white", fontWeight: 700, fontSize: "0.93rem", margin: "0 0 16px", fontFamily: T.font }}>{t.usefulLinks}</h4>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 8 }}>
              {t.usefulLinkItems.map((l, i) => (
                <li key={i}>
                  <a href="#" style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.82rem", textDecoration: "none", display: "flex", alignItems: "center", gap: 8, fontFamily: T.font, transition: "color 0.18s" }}>
                    <span style={{ color: "#e87722" }}>›</span> {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 style={{ color: "white", fontWeight: 700, fontSize: "0.93rem", margin: "0 0 16px", fontFamily: T.font }}>{t.servicesLabel}</h4>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 8 }}>
              {t.serviceItems.map((s, i) => (
                <li key={i}>
                  <Link to={serviceLinks[s] || '#'} style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.82rem", textDecoration: "none", fontFamily: T.font, transition: "color 0.18s" }}>{s}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ color: "white", fontWeight: 700, fontSize: "0.93rem", margin: "0 0 16px", fontFamily: T.font }}>{t.contactInfo}</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: "0.82rem", color: "rgba(255,255,255,0.6)" }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                <span>📞</span><span>+91 8800 123 456</span>
              </div>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                <span>✉️</span><span>info@khushhaltrust.org</span>
              </div>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                <span>📍</span><span style={{ fontFamily: T.font }}>पुणे, महाराष्ट्र, भारत - 411001</span>
              </div>
            </div>
            <h4 style={{ color: "white", fontWeight: 700, fontSize: "0.93rem", margin: "24px 0 12px", fontFamily: T.font }}>{t.quickContact}</h4>
            <button style={{
              background: "linear-gradient(135deg, #1e8f46, #0d4d20)",
              color: "white", fontWeight: 700, fontSize: "0.82rem",
              padding: "9px 18px", borderRadius: 24, border: "none",
              cursor: "pointer", width: "100%", fontFamily: T.font,
              boxShadow: "0 2px 8px rgba(0,0,0,0.25)",
            }}>
              {t.quickContactBtn}
            </button>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "14px 20px", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 8, fontSize: "0.76rem", color: "rgba(255,255,255,0.45)", fontFamily: T.font }}>
          <span>{t.footerCopy}</span>
          <span>{t.footerTagline}</span>
        </div>
      </div>
    </footer>
  )
}
