import React, { useState, useEffect, useRef } from "react";
import Navbar from "./navbar";
import Footer from "./footer";
import { useLang } from "./useLang";

/* ─── DESIGN TOKENS ─────────────────────────────────────────────── */
const T = {
  navy:       "#0d2236",
  navyDark:   "#081929",
  navyMid:    "#1a3a52",
  saffron:    "#e87722",
  saffronDk:  "#c45f0a",
  amber:      "#d97706",
  green:      "#1a7a3c",
  greenDk:    "#145a2c",
  greenLight: "#e8f5ee",
  white:      "#ffffff",
  offwhite:   "#f8f9fb",
  bg:         "#f0f4f8",
  card:       "#ffffff",
  border:     "#dde3ed",
  text:       "#1a2332",
  textMid:    "#374151",
  textLight:  "#6b7280",
  font:       "'Noto Sans Devanagari','Noto Nastaliq Urdu','Inter','Segoe UI',system-ui,sans-serif",
  shadow:     "0 2px 12px rgba(13,34,54,0.10)",
  shadowMd:   "0 4px 24px rgba(13,34,54,0.14)",
  shadowLg:   "0 8px 40px rgba(13,34,54,0.18)",
  radius:     "14px",
  radiusSm:   "8px",
};

/* ─── KEYFRAMES ─────────────────────────────────────────────────── */
const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&display=swap');

*, *::before, *::after { box-sizing: border-box; }
body { background: ${T.bg}; font-family: ${T.font}; }

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(28px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes fadeIn {
  from { opacity: 0; } to { opacity: 1; }
}
@keyframes scaleIn {
  from { opacity: 0; transform: scale(0.88); }
  to   { opacity: 1; transform: scale(1); }
}
@keyframes slideRight {
  from { opacity: 0; transform: translateX(-32px); }
  to   { opacity: 1; transform: translateX(0); }
}
@keyframes slideLeft {
  from { opacity: 0; transform: translateX(32px); }
  to   { opacity: 1; transform: translateX(0); }
}
@keyframes pulse {
  0%,100% { box-shadow: 0 0 0 0 rgba(232,119,34,0.4); }
  50%      { box-shadow: 0 0 0 10px rgba(232,119,34,0); }
}
@keyframes shimmer {
  0%   { background-position: -400px 0; }
  100% { background-position: 400px 0; }
}
@keyframes marqueeL {
  from { transform: translateX(100%); }
  to   { transform: translateX(-100%); }
}
@keyframes float {
  0%,100% { transform: translateY(0px); }
  50%      { transform: translateY(-8px); }
}
@keyframes borderGlow {
  0%,100% { border-color: ${T.saffron}; }
  50%      { border-color: ${T.amber}; }
}
@keyframes quoteSlide {
  from { opacity: 0; transform: translateX(-20px) scale(0.96); }
  to   { opacity: 1; transform: translateX(0) scale(1); }
}

/* Ticker */
.ticker-wrap { overflow: hidden; white-space: nowrap; }
.ticker-inner { display: inline-flex; gap: 56px; animation: marqueeL 28s linear infinite; }
.ticker-wrap:hover .ticker-inner { animation-play-state: paused; }

/* Collapsible */
.section-body {
  overflow: hidden;
  transition: max-height 0.5s cubic-bezier(0.4,0,0.2,1), opacity 0.4s ease;
}

/* Para card hover */
.para-card {
  transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
  cursor: default;
}
.para-card:hover {
  transform: translateY(-3px);
  box-shadow: ${T.shadowLg};
  border-color: ${T.saffron} !important;
}

/* Quote block */
.quote-block {
  border-left: 4px solid ${T.saffron};
  transition: border-color 0.3s ease;
}
.quote-block:hover { border-left-color: ${T.green}; }

/* Highlight span */
.hl-saffron { color: ${T.saffron}; font-weight: 700; }
.hl-green   { color: ${T.green};   font-weight: 700; }
.hl-navy    { color: ${T.navy};    font-weight: 700; }

/* Responsive */
@media (max-width: 720px) {
  .hero-grid   { grid-template-columns: 1fr !important; }
  .two-col     { grid-template-columns: 1fr !important; }
  .stats-grid  { grid-template-columns: repeat(2,1fr) !important; }
  .points-grid { grid-template-columns: 1fr !important; }
  .desktop-only { display: none !important; }
}
@media (min-width: 721px) {
  .mobile-only { display: none !important; }
}
`;

/* ─── DATA ──────────────────────────────────────────────────────── */
const CONTENT = {
  heading_mr: "ट्रस्ट के लिए पेश लुब्ज",
  heading_en: "Introduction to the Trust",
  salutation_mr: "मोहतरम जनाव अस्सलामु अलैकुम राहमतुल्लाही व बरकातुह.",
  salutation_en: "Dear Respected Readers, Assalamu Alaikum Warahmatullahi Wabarakatuh.",

  paras_mr: [
    `नबी करीम ﷺ को जब नबुवत मिली, उस वक्त जो मक्का मुकर्रमा का हाल था — वो के, बच्चीयोंको जिंदा दफनाया जाता था। औरतोंके साथ जानवरों जैसा बर्ताव किया जाता था। शराब पीना, जरा जरा सी बात पर बेगुनाहोको कत्ल करना, औरतों/गुलामोंपर जुल्म करना, औरतोंको विरासत में हिस्सा न देना, ऊंच-नीच, अमीर-गरीब, काला-गोरा होने का भेदभाव, झुट, फरेब, नाइन्साफी, नाप-तोल में कमी, गरीबोंपर कमजोरोंपर ताकतवरोंका जुल्म, सुदी निजाम से गरीबोंका खुन चुसना, जिना करना, ऐसी ऐसी बुराईमें लोग मुब्तला थे के जिसकी कोई इन्तिहा नही। लोग इन्सान से जानवर बन चुके थे।`,
    `नबुवत मिलने के बाद जिस तरह अकेले नबी करीम ﷺ ने मेहनत करके 'अम्र बिल मआरूफ और नहि अनिल मुनकर' के जरिये समाजी जिंदगीके अंदर जो भी खराबीया पैदा हुयी थी उनको मिटाया और सहाबाओंका एक बेहतरीन मुआशरा (समाज) बनाया था। ता के लोग अमन, चैन, सुकून के साथ अदुल व इन्साफकी एक मिसाल दुनिया के लिए पेश कर सके। ता के दुनिया में अच्छी तरहसे जिंदगी गुजारे और आखिरत की तयारी करे और दुनिया और आखिरत में कामयाब हो सके।`,
    `ऐसा ही हाल आज मुआशरे का हो गया है। पाच पाच सालकी बच्चीयोंके साथ रेप करके उन्हे मार दिया जाता है। औरतोंके हुकुक पामाल कर दिये जाते है। एक दुसरे का हक मारा जाता है। बच्चीयोंको पेट में ही कत्ल कर दिया जाता है। शराब, गुटखा, मावा, मटका जैसी चिजोंसे अपने सेहत, पैसोंको बरबाद करके, घरवालोंका चैन, सुकून खत्म किया जा रहा है। बेकसूर लोंगोको जानसे मारा जा रहा है। सुदी कारोबारी गरीबोंका खुन चुस रहे है। ताकतवर पैसे और औहदोंकी जोरपर गरीब मजलूमोंको डरा धमकाकर उनपर जुल्म कर रहे है। टी.व्ही., मोबाईल, इंटरनेट की वजहसे घर तबाह व बरबाद हो रहे है। बच्चोकी तरबीयतके लिए वक्त नही दिया जा रहा है। तंदुरुस्ती जैसी अजीमोशान नेअमत यू ही बरबाद कि जा रही है। घरोमे भाई भाई, मियाँ-बिवी, सास-बहु, पडोसी पडोसी के साथ लडाई, झुट, फरेब, नाप-तोल में कमी, बेहयायी, जिना, नाइन्साफी, चोरी।`,
    `इनको सबको अगर मिटाना है तो नबी करीम ﷺ की पैरवीके बगैर चारा ए कार नही। इसी तरह की बुराईयोंके मद्देनजर हम 'खुशहाल मुआशरा सोशल वेलफेअर अँड चॅरिटेबल ट्रस्ट, कराड' का आगाज करने जा रहे है। इस ट्रस्ट की जानिवसे हम हर फर्द के लिए तरबीयती (प्रॅक्टिकल) प्रोग्रामात लेकर दीन और दुनियावी तरबीयत, मदद और खिदमत अंजाम देंगे। जिसकी वजहसे हर फर्द (इन्सान) को अपने अपने जिमेदारीका अहसास दिलाया जाये और एक दुसरे के हुकुक अदा करने की कोशिश की जाये। क्यूँ के एक-एक फर्द (इन्सान) मिलकर ही एक मुआशरा (समाज) बनता होता है।`,
    `जब एक दुसरे के हुकुक अदा किये जायेंगे तो आपस झगडा ही खत्म हो जायेगा। ना ही लोगोंको अपना वक्त, पैसा इन कोर्ट कचेरियोमें खर्च करना पडेगा, नाही पोलीस और न्यायपालिका पर बोझ पडेगा और एक ऐसा मुआशरा (समाज) बनेगा, जिसमे हर इन्सान सुख, चैन, अमन के साथ दुनिया बसर करते करते आखिरत की तयारी कर ले। दुनिया वो आखिरत में कामयाब हो सके।`,
  ],

  paras_en: [
    `When the Prophet Muhammad ﷺ received prophethood, the state of Makkah was dire — daughters were buried alive, women were treated like animals. Drinking, killing the innocent over trivial matters, oppressing women and slaves, denying women their inheritance, discrimination based on caste and color, lies, deceit, injustice, short measures, the powerful exploiting the weak, usury draining the poor — people had become worse than beasts.`,
    `After receiving prophethood, the Prophet ﷺ single-handedly, through the principle of 'commanding good and forbidding evil', eliminated the evils in social life and built a model community with the Companions. So that people could live with peace, justice and equality — setting an example for the world — living rightly in this world and preparing for the hereafter.`,
    `Today our society has fallen to the same state. Girls of five years are raped and murdered. Women's rights are trampled. People's due rights are usurped. Addiction to alcohol, gutka, gambling destroys health, wealth and family peace. The innocent are killed. Moneylenders bleed the poor. The powerful oppress the vulnerable. Television, mobile and internet are destroying homes. Children receive no upbringing. Health — a great blessing — is wasted. In homes: sibling fights, marital disputes, neighbor disputes, lies, deceit, injustice and immorality.`,
    `To eliminate all these evils, there is no way except following the Prophet ﷺ. Keeping these social ills in mind, we are launching 'Khushhaal Muashara Social Welfare & Charitable Trust, Karad.' Through this Trust, we will provide practical training programmes for every individual — religious and worldly guidance, help and service — so that every person is made aware of their responsibilities, and efforts are made to fulfil each other's rights. Because it is individuals who together make a society.`,
    `When everyone fulfils each other's rights, disputes will end on their own. No one will need to waste time and money in courts, no burden will fall on police and judiciary, and a society will be built where every person lives in happiness, peace and contentment — preparing for the hereafter while living rightly in this world.`,
  ],

  mission_points_mr: [
    { icon: "📚", title: "तालीम व तरबीयत", desc: "दीनी और दुनियावी तालीम का बंदोबस्त" },
    { icon: "🤝", title: "हुकुक अदायगी", desc: "एक दुसरे के हुकुक की अदायगी" },
    { icon: "💊", title: "सेहत व सलामती", desc: "तंदुरुस्ती और मेडिकल मदद" },
    { icon: "⚖️", title: "इन्साफ व अमन", desc: "अदुल और न्यायपूर्ण समाज" },
    { icon: "🏠", title: "खानदानी मजबूती", desc: "घर और खानदान की बेहतरी" },
    { icon: "🌱", title: "समाजी खिदमत", desc: "गरीब व मजलूमोंकी मदद" },
  ],
  mission_points_en: [
    { icon: "📚", title: "Education & Training", desc: "Religious and worldly education" },
    { icon: "🤝", title: "Rights Fulfilment", desc: "Fulfilling each other's due rights" },
    { icon: "💊", title: "Health & Welfare", desc: "Healthcare and medical assistance" },
    { icon: "⚖️", title: "Justice & Peace", desc: "Fair and equitable society" },
    { icon: "🏠", title: "Family Strengthening", desc: "Improving family and home life" },
    { icon: "🌱", title: "Social Service", desc: "Helping the poor and oppressed" },
  ],

  stats: [
    { icon: "🕌", num_mr: "कराड", num_en: "Karad", label_mr: "मुख्यालय", label_en: "Headquarters" },
    { icon: "🎯", num_mr: "६ स्तम्भ", num_en: "6 Pillars", label_mr: "मिशन के", label_en: "of Mission" },
    { icon: "👥", num_mr: "समाज सेवा", num_en: "Social", label_mr: "का संकल्प", label_en: "Welfare" },
    { icon: "📖", num_mr: "दीन+दुनिया", num_en: "Deen+Duniya", label_mr: "तरबीयत", label_en: "Training" },
  ],

  ticker_mr: ["🕌 खुशहाल मुआशरा सोशल वेलफेअर अँड चॅरिटेबल ट्रस्ट, महाराष्ट्र", "✨ अम्र बिल मआरूफ • नहि अनिल मुनकर", "📚 दीन और दुनियावी तरबीयत", "🤝 हर फर्द के हुकुक की हिफाजत", "🌱 एक बेहतर मुआशरा (समाज) की तामीर"],
  ticker_en: ["🕌 Khushhaal Muashara Social Welfare & Charitable Trust, Maharashtra", "✨ Command Good • Forbid Evil", "📚 Religious & Worldly Education", "🤝 Protecting Every Individual's Rights", "🌱 Building a Better Society Together"],
};

/* ─── HELPERS ───────────────────────────────────────────────────── */
function useMobile() {
  const [m, setM] = useState(window.innerWidth < 720);
  useEffect(() => {
    const h = () => setM(window.innerWidth < 720);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);
  return m;
}

function FadeIn({ children, delay = 0, dir = "up", style = {} }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  const anims = { up: "fadeUp", right: "slideRight", left: "slideLeft", scale: "scaleIn", fade: "fadeIn" };
  return (
    <div ref={ref} style={{
      opacity: vis ? 1 : 0,
      animation: vis ? `${anims[dir] || "fadeUp"} 0.62s ease both` : "none",
      animationDelay: `${delay}s`,
      ...style,
    }}>
      {children}
    </div>
  );
}

function Tricolor() {
  return (
    <div style={{ display: "flex", height: 4, borderRadius: 2, overflow: "hidden", margin: "10px 0 0" }}>
      <div style={{ flex: 1, background: T.saffron }} />
      <div style={{ flex: 1, background: T.white, border: `1px solid ${T.border}` }} />
      <div style={{ flex: 1, background: T.green }} />
    </div>
  );
}

function SectionHeader({ icon, titleMr, titleEn, lang, accentColor = T.saffron, open, onClick, collapsible }) {
  return (
    <div onClick={onClick} style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "18px 24px", cursor: collapsible ? "pointer" : "default",
      background: `linear-gradient(135deg, ${T.navyDark} 0%, ${T.navyMid} 100%)`,
      borderRadius: `${T.radius} ${T.radius} 0 0`,
      userSelect: "none",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <span style={{
          fontSize: 26, background: `rgba(255,255,255,0.1)`,
          borderRadius: 10, padding: "6px 10px",
          border: `1px solid rgba(255,255,255,0.15)`,
        }}>{icon}</span>
        <div>
          <div style={{ color: T.white, fontWeight: 700, fontSize: 18, lineHeight: 1.3 }}>
            {lang === "mr" ? titleMr : titleEn}
          </div>
          <Tricolor />
        </div>
      </div>
      {collapsible && (
        <span style={{
          color: accentColor, fontSize: 22, fontWeight: 700,
          transition: "transform 0.3s ease",
          transform: open ? "rotate(180deg)" : "rotate(0deg)",
          display: "block", lineHeight: 1,
        }}>▾</span>
      )}
    </div>
  );
}

/* ─── TICKER ────────────────────────────────────────────────────── */
function Ticker({ lang }) {
  const items = lang === "mr" ? CONTENT.ticker_mr : CONTENT.ticker_en;
  return (
    <div style={{
      background: `linear-gradient(90deg, ${T.green} 0%, ${T.greenDk} 100%)`,
      borderBottom: `3px solid ${T.saffron}`,
      padding: "10px 0", overflow: "hidden",
    }}>
      <div className="ticker-wrap">
        <div className="ticker-inner">
          {[...items, ...items].map((t, i) => (
            <span key={i} style={{
              color: T.white, fontSize: 14, fontWeight: 500, whiteSpace: "nowrap",
              padding: "0 16px", display: "flex", alignItems: "center", gap: 8,
            }}>
              {t}
              <span style={{ color: T.saffron, margin: "0 8px" }}>◆</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── HERO BANNER ───────────────────────────────────────────────── */
function HeroBanner({ lang }) {
  return (
    <div style={{
      background: `linear-gradient(135deg, ${T.navyDark} 0%, ${T.navyMid} 55%, ${T.navy} 100%)`,
      padding: "52px 24px 44px",
      position: "relative", overflow: "hidden",
      textAlign: "center",
    }}>
      {/* Decorative circles */}
      <div style={{
        position: "absolute", top: -60, right: -60, width: 220, height: 220,
        borderRadius: "50%", border: `2px solid rgba(232,119,34,0.18)`,
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: -40, left: -40, width: 160, height: 160,
        borderRadius: "50%", border: `2px solid rgba(26,122,60,0.22)`,
        pointerEvents: "none",
      }} />

      {/* Trust name badge */}
      <FadeIn dir="fade" delay={0.05}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          background: "rgba(232,119,34,0.15)", border: `1px solid rgba(232,119,34,0.4)`,
          borderRadius: 40, padding: "6px 20px", marginBottom: 20,
        }}>
          <span style={{ fontSize: 18 }}>🕌</span>
          <span style={{ color: T.saffron, fontSize: 13, fontWeight: 600, letterSpacing: "0.5px" }}>
            {lang === "mr" ? "खुशहाल मुआशरा सोशल वेलफेअर अँड चॅरिटेबल ट्रस्ट, महाराष्ट्र"
                           : "Khushhaal Muashara Social Welfare & Charitable Trust, Maharashtra"}
          </span>
        </div>
      </FadeIn>

      {/* Main heading */}
      <FadeIn dir="up" delay={0.12}>
        <h1 style={{
          color: T.white, fontSize: "clamp(26px, 5vw, 42px)",
          fontWeight: 800, lineHeight: 1.25, marginBottom: 12,
          textShadow: "0 2px 16px rgba(0,0,0,0.4)",
        }}>
          {lang === "mr" ? "ट्रस्ट के लिए " : "Introduction "}
          <span style={{ color: T.saffron }}>
            {lang === "mr" ? "पेश लुब्ज" : "to the Trust"}
          </span>
        </h1>
      </FadeIn>

      <FadeIn dir="up" delay={0.2}>
        <p style={{
          color: "rgba(255,255,255,0.72)", fontSize: 15, maxWidth: 560,
          margin: "0 auto 28px", lineHeight: 1.7,
        }}>
          {lang === "mr"
            ? "एक बेहतर मुआशरा (समाज) की तामीर के लिए हमारा संकल्प"
            : "Our commitment to building a better, just and peaceful society"}
        </p>
      </FadeIn>

      {/* Tricolor divider */}
      <FadeIn dir="scale" delay={0.28}>
        <div style={{
          display: "flex", justifyContent: "center", gap: 0,
          height: 5, width: 120, margin: "0 auto 24px", borderRadius: 3, overflow: "hidden",
        }}>
          <div style={{ flex: 1, background: T.saffron }} />
          <div style={{ flex: 1, background: T.white }} />
          <div style={{ flex: 1, background: T.green }} />
        </div>
      </FadeIn>

      {/* 3 pill badges */}
      <FadeIn dir="up" delay={0.34}>
        <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 10 }}>
          {(lang === "mr"
            ? ["📖 दीन व दुनिया", "🤝 हुकुक अदायगी", "🌱 समाजी खिदमत"]
            : ["📖 Religious & Worldly", "🤝 Rights & Justice", "🌱 Social Service"]
          ).map((b, i) => (
            <span key={i} style={{
              background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)",
              color: T.white, borderRadius: 40, padding: "7px 18px", fontSize: 13, fontWeight: 500,
            }}>{b}</span>
          ))}
        </div>
      </FadeIn>
    </div>
  );
}

/* ─── SALUTATION CARD ───────────────────────────────────────────── */
function SalutationCard({ lang }) {
  return (
    <FadeIn dir="up" delay={0.08}>
      <div style={{
        background: `linear-gradient(135deg, ${T.greenLight} 0%, #fff9f0 100%)`,
        border: `2px solid ${T.saffron}30`,
        borderLeft: `5px solid ${T.saffron}`,
        borderRadius: T.radius, padding: "22px 28px",
        display: "flex", alignItems: "flex-start", gap: 16,
        boxShadow: T.shadowMd,
        animation: "borderGlow 4s ease-in-out infinite",
      }}>
        <span style={{ fontSize: 36, lineHeight: 1, flexShrink: 0 }}>🤲</span>
        <div>
          <div style={{
            color: T.navy, fontWeight: 700, fontSize: 16, marginBottom: 4,
            letterSpacing: "0.3px",
          }}>
            {lang === "mr" ? CONTENT.salutation_mr : CONTENT.salutation_en}
          </div>
          <div style={{ color: T.textLight, fontSize: 13 }}>
            {lang === "mr" ? "— ट्रस्ट संस्थापक" : "— Trust Founders"}
          </div>
        </div>
      </div>
    </FadeIn>
  );
}

/* ─── PARA CARD ─────────────────────────────────────────────────── */
const PARA_ACCENTS = [T.saffron, T.green, T.amber, T.navy, T.green];
const PARA_ICONS   = ["📜", "🕌", "⚠️", "🌟", "🕊️"];

function ParaCard({ text, index, lang }) {
  const accent = PARA_ACCENTS[index % PARA_ACCENTS.length];
  const icon   = PARA_ICONS[index % PARA_ICONS.length];

  return (
    <FadeIn dir="up" delay={index * 0.07}>
      <div className="para-card" style={{
        background: T.card, borderRadius: T.radius,
        border: `1.5px solid ${T.border}`,
        borderLeft: `5px solid ${accent}`,
        padding: "24px 24px 24px 20px",
        boxShadow: T.shadow,
        position: "relative",
      }}>
        {/* Para number + icon */}
        <div style={{
          display: "flex", alignItems: "center", gap: 10, marginBottom: 14,
        }}>
          <div style={{
            width: 38, height: 38, borderRadius: "50%",
            background: `${accent}18`, border: `2px solid ${accent}30`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 18, flexShrink: 0,
          }}>{icon}</div>
          <div style={{
            width: 28, height: 28, borderRadius: "50%",
            background: accent, color: T.white,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 13, fontWeight: 700, flexShrink: 0,
          }}>{index + 1}</div>
          <div style={{
            height: 2, flex: 1, borderRadius: 2,
            background: `linear-gradient(90deg, ${accent}40, transparent)`,
          }} />
        </div>

        {/* Text */}
        <p style={{
          color: T.textMid, fontSize: 15, lineHeight: 1.9,
          fontFamily: T.font, textAlign: "justify",
          letterSpacing: "0.01em",
        }}>
          {text}
        </p>
      </div>
    </FadeIn>
  );
}

/* ─── MISSION SECTION ───────────────────────────────────────────── */
function MissionSection({ lang }) {
  const isMobile = useMobile();
  const [open, setOpen] = useState(true);
  const points = lang === "mr" ? CONTENT.mission_points_mr : CONTENT.mission_points_en;

  return (
    <div style={{
      background: T.card, borderRadius: T.radius,
      border: `1.5px solid ${T.border}`,
      boxShadow: T.shadowMd, overflow: "hidden",
    }}>
      <SectionHeader
        icon="🎯"
        titleMr="हमारे मिशन के स्तम्भ"
        titleEn="Pillars of Our Mission"
        lang={lang}
        open={open}
        collapsible={isMobile}
        onClick={() => isMobile && setOpen(o => !o)}
      />

      <div className="section-body" style={{
        maxHeight: (!isMobile || open) ? "9999px" : "0px",
        opacity: (!isMobile || open) ? 1 : 0,
      }}>
        <div style={{ padding: "28px 24px" }}>
          <div className="points-grid" style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 16,
          }}>
            {points.map((p, i) => (
              <FadeIn key={i} dir="scale" delay={i * 0.07}>
                <div style={{
                  background: T.offwhite, borderRadius: T.radiusSm,
                  border: `1.5px solid ${T.border}`,
                  padding: "20px 16px", textAlign: "center",
                  transition: "transform 0.25s, box-shadow 0.25s, border-color 0.25s",
                  cursor: "default",
                }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow = T.shadowMd;
                    e.currentTarget.style.borderColor = T.saffron;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = "";
                    e.currentTarget.style.boxShadow = "";
                    e.currentTarget.style.borderColor = T.border;
                  }}
                >
                  <div style={{ fontSize: 32, marginBottom: 10 }}>{p.icon}</div>
                  <div style={{ color: T.navy, fontWeight: 700, fontSize: 14, marginBottom: 6 }}>{p.title}</div>
                  <div style={{ color: T.textLight, fontSize: 12.5, lineHeight: 1.55 }}>{p.desc}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── QUOTE BLOCK ───────────────────────────────────────────────── */
function QuoteBlock({ lang }) {
  return (
    <FadeIn dir="scale" delay={0.1}>
      <div style={{
        background: `linear-gradient(135deg, ${T.navy}08, ${T.saffron}08)`,
        border: `1px solid ${T.saffron}30`,
        borderRadius: T.radius, padding: "28px 32px",
        position: "relative", overflow: "hidden",
        boxShadow: T.shadow,
      }}>
        {/* Big quote mark */}
        <div style={{
          position: "absolute", top: 10, left: 16,
          fontSize: 80, color: `${T.saffron}18`,
          fontFamily: "Georgia, serif", lineHeight: 1,
          pointerEvents: "none", userSelect: "none",
        }}>"</div>

        <div style={{ position: "relative", zIndex: 1 }}>
          <p style={{
            color: T.navy, fontSize: "clamp(15px, 2.5vw, 18px)",
            fontWeight: 600, lineHeight: 1.8, textAlign: "center",
            fontStyle: "italic",
          }}>
            {lang === "mr"
              ? "क्यूँ के एक-एक फर्द (इन्सान) मिलकर ही एक मुआशरा (समाज) बनता होता है।"
              : "Because it is individuals who together make a society — one person at a time."}
          </p>
          <div style={{
            display: "flex", justifyContent: "center", gap: 0,
            height: 4, width: 80, margin: "16px auto 0", borderRadius: 2, overflow: "hidden",
          }}>
            <div style={{ flex: 1, background: T.saffron }} />
            <div style={{ flex: 1, background: T.white, border: `1px solid ${T.border}` }} />
            <div style={{ flex: 1, background: T.green }} />
          </div>
          <p style={{
            textAlign: "center", color: T.saffron, fontWeight: 700, fontSize: 13, marginTop: 10,
          }}>
            — {lang === "mr" ? "ट्रस्ट का मूल सिद्धांत" : "Core Principle of the Trust"}
          </p>
        </div>
      </div>
    </FadeIn>
  );
}

/* ─── STATS BAR ─────────────────────────────────────────────────── */
function StatsBar({ lang }) {
  return (
    <div style={{
      background: `linear-gradient(135deg, ${T.navyDark} 0%, ${T.navyMid} 100%)`,
      borderRadius: T.radius, padding: "28px 24px",
      boxShadow: T.shadowLg,
    }}>
      <div className="stats-grid" style={{
        display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 2,
      }}>
        {CONTENT.stats.map((s, i) => (
          <FadeIn key={i} dir="up" delay={i * 0.07}>
            <div style={{
              textAlign: "center", padding: "18px 8px",
              borderRight: i < 3 ? `1px solid rgba(255,255,255,0.12)` : "none",
            }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{s.icon}</div>
              <div style={{
                color: T.saffron, fontWeight: 800, fontSize: 16, marginBottom: 2,
              }}>
                {lang === "mr" ? s.num_mr : s.num_en}
              </div>
              <div style={{ color: "rgba(255,255,255,0.65)", fontSize: 12 }}>
                {lang === "mr" ? s.label_mr : s.label_en}
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}

/* ─── CALL TO ACTION ────────────────────────────────────────────── */
function CTABanner({ lang }) {
  return (
    <FadeIn dir="up" delay={0.1}>
      <div style={{
        background: `linear-gradient(135deg, ${T.green} 0%, ${T.greenDk} 100%)`,
        borderRadius: T.radius, padding: "36px 28px",
        textAlign: "center", boxShadow: T.shadowLg,
        position: "relative", overflow: "hidden",
      }}>
        {/* Decorative */}
        <div style={{
          position: "absolute", top: -30, right: -30, width: 100, height: 100,
          borderRadius: "50%", background: "rgba(255,255,255,0.06)",
          pointerEvents: "none",
        }} />

        <div style={{ fontSize: 38, marginBottom: 12 }}>🌟</div>
        <h3 style={{ color: T.white, fontSize: 22, fontWeight: 800, marginBottom: 10 }}>
          {lang === "mr" ? "ट्रस्ट से जुड़ें" : "Join the Trust"}
        </h3>
        <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 15, marginBottom: 24, lineHeight: 1.7 }}>
          {lang === "mr"
            ? "एक बेहतर मुआशरा (समाज) बनाने की इस मुहीम में शामिल हों।"
            : "Join this mission to build a better, more just and peaceful society."}
        </p>
        <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 12 }}>
          <button style={{
            background: T.saffron, color: T.white, border: "none",
            borderRadius: 40, padding: "13px 32px", fontSize: 15,
            fontWeight: 700, cursor: "pointer", fontFamily: T.font,
            boxShadow: `0 4px 16px rgba(232,119,34,0.4)`,
            animation: "pulse 2.5s infinite",
            transition: "transform 0.2s",
          }}
            onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
            onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
          >
            {lang === "mr" ? "📞 संपर्क करें" : "📞 Contact Us"}
          </button>
          <button style={{
            background: "rgba(255,255,255,0.12)", color: T.white,
            border: "2px solid rgba(255,255,255,0.4)",
            borderRadius: 40, padding: "13px 32px", fontSize: 15,
            fontWeight: 600, cursor: "pointer", fontFamily: T.font,
            transition: "all 0.2s",
          }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.2)"; e.currentTarget.style.borderColor = T.white; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.12)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)"; }}
          >
            {lang === "mr" ? "📄 और जानें" : "📄 Learn More"}
          </button>
        </div>
      </div>
    </FadeIn>
  );
}

/* ─── FULL TEXT SECTION ─────────────────────────────────────────── */
function FullTextSection({ lang }) {
  const isMobile = useMobile();
  const [open, setOpen] = useState(true);
  const paras = lang === "mr" ? CONTENT.paras_mr : CONTENT.paras_en;

  return (
    <div style={{
      background: T.card, borderRadius: T.radius,
      border: `1.5px solid ${T.border}`,
      boxShadow: T.shadowMd, overflow: "hidden",
    }}>
      <SectionHeader
        icon="📜"
        titleMr="पूर्ण संदेश — ट्रस्ट का आगाज"
        titleEn="Full Message — Founding of the Trust"
        lang={lang}
        open={open}
        collapsible={isMobile}
        onClick={() => isMobile && setOpen(o => !o)}
      />

      <div className="section-body" style={{
        maxHeight: (!isMobile || open) ? "9999px" : "0px",
        opacity: (!isMobile || open) ? 1 : 0,
      }}>
        <div style={{ padding: "28px 24px", display: "flex", flexDirection: "column", gap: 20 }}>
          <SalutationCard lang={lang} />
          {paras.map((p, i) => (
            <ParaCard key={i} text={p} index={i} lang={lang} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── GLOBE FAB ─────────────────────────────────────────────────── */
function GlobeFAB({ lang, setLang }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="legacy-language-switcher" style={{ position: "fixed", bottom: 24, right: 24, zIndex: 999 }}>
      {open && (
        <div style={{
          position: "absolute", bottom: 62, right: 0,
          background: T.white, borderRadius: T.radiusSm,
          boxShadow: T.shadowLg, overflow: "hidden",
          minWidth: 148, border: `1px solid ${T.border}`,
          animation: "fadeUp 0.17s ease both",
        }}>
          {[{ code: "mr", label: "🇮🇳  मराठी" }, { code: "en", label: "🇬🇧  English" }].map(o => (
            <button key={o.code}
              onClick={() => { setLang(o.code); setOpen(false); }}
              style={{
                display: "flex", alignItems: "center", width: "100%",
                padding: "10px 16px", border: "none", cursor: "pointer",
                fontSize: ".83rem", fontWeight: lang === o.code ? 700 : 500,
                background: lang === o.code ? T.greenLight : T.white,
                color: lang === o.code ? T.green : "#555",
                borderLeft: lang === o.code ? `3px solid ${T.green}` : "3px solid transparent",
                fontFamily: T.font, transition: "background 0.12s",
              }}
            >
              {o.label}
            </button>
          ))}
        </div>
      )}
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: 56, height: 56, borderRadius: "50%",
          background: `linear-gradient(135deg, ${T.navy}, ${T.green})`,
          border: `2px solid ${T.saffron}`,
          color: T.white, fontSize: 22, cursor: "pointer",
          boxShadow: T.shadowLg,
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "transform 0.2s",
        }}
        title={lang === "mr" ? "Switch to English" : "मराठीत बदला"}
        onMouseEnter={e => e.currentTarget.style.transform = "scale(1.12)"}
        onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
      >
        🌐
      </button>
    </div>
  );
}

/* ─── MAIN COMPONENT ────────────────────────────────────────────── */
export default function TrustIntro() {
  const { lang, setLang } = useLang();

  return (
    <>
      <style>{STYLES}</style>

      {/* Navbar */}
      <Navbar />

      {/* Maharashtra Tricolor Stripe */}
      <div style={{ display: "flex", height: 5 }}>
        <div style={{ flex: 1, background: T.saffron }} />
        <div style={{ flex: 1, background: T.white }} />
        <div style={{ flex: 1, background: T.green }} />
      </div>

      {/* Ticker */}
      <Ticker lang={lang} />

      {/* Hero Banner */}
      <HeroBanner lang={lang} />

      {/* Main Content */}
      <div style={{
        maxWidth: 860, margin: "0 auto",
        padding: "32px 16px 100px",
        display: "flex", flexDirection: "column", gap: 28,
      }}>

        {/* Highlighted Quote */}
        <QuoteBlock lang={lang} />

        {/* Full Text with Para Cards */}
        <FullTextSection lang={lang} />

        {/* Mission pillars */}
        <MissionSection lang={lang} />

        {/* Stats */}
        <StatsBar lang={lang} />

        {/* CTA */}
        <CTABanner lang={lang} />
      </div>

      {/* Globe FAB */}
      <GlobeFAB lang={lang} setLang={setLang} />

      {/* Footer */}
      <Footer />
    </>
  );
}