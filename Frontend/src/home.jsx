import React from "react";
import { Link } from "react-router-dom";
import { useLang } from "./useLang";
import businessImg from "./assets/business.png";

// ---------- SVG Icons ----------
const BloodIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7" style={{ color: "#e91e8c" }}>
    <path d="M12 2C12 2 5 10.5 5 15a7 7 0 0 0 14 0C19 10.5 12 2 12 2z" />
  </svg>
);

const HeartHandIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7" style={{ color: "#16a34a" }}>
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7" style={{ color: "#2563eb" }}>
    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
  </svg>
);

const GraduationIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7" style={{ color: "#ea580c" }}>
    <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zm0 12.08L4.95 11 12 7.08 19.05 11 12 15.08z" />
    <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z" />
  </svg>
);

const ArrowRight = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
    <path d="M9 18l6-6-6-6" />
  </svg>
);

const CallIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 shrink-0">
    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
  </svg>
);

const PinIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 shrink-0">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" />
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-4 h-4 shrink-0">
    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const BookOpenIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 shrink-0">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </svg>
);

const StarIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

// ---------- Data ----------
const HADEES = [
  {
    mr: "\"खरेच, अल्लाहाने तुमच्यासाठी दीन सोपा केला आहे, कठीण केला नाही.\"",
    en: "\"Indeed, Allah has made religion easy for you, not difficult.\"",
    ref: "सहीह बुखारी: 39",
  },
  {
    mr: "\"तुमच्यापैकी सर्वोत्तम तो आहे जो आपल्या कुटुंबासाठी सर्वोत्तम आहे.\"",
    en: "\"The best of you is he who is best to his family.\"",
    ref: "तिर्मिजी: 3895",
  },
  {
    mr: "\"स्मित हास्य हे सदकाचा एक प्रकार आहे.\"",
    en: "\"A smile in the face of your brother is charity.\"",
    ref: "तिर्मिजी: 1956",
  },
  {
    mr: "\"जो माणूस दयाळू नाही त्याला दयाळूपणा दिला जात नाही.\"",
    en: "\"He who is not merciful to others will not be treated mercifully.\"",
    ref: "बुखारी: 6013",
  },
  {
    mr: "\"चांगले बोलावे किंवा गप्प राहावे — हीच खरी अक्कल.\"",
    en: "\"Speak good or remain silent — this is true wisdom.\"",
    ref: "बुखारी: 6018",
  },
];

const quickLinks = [
  {
    icon: <BloodIcon />,
    title: "BLOOD GROUP",
    subtitle: "रक्तदात्यांची यादी आणि माहिती",
    gradient: "linear-gradient(135deg, #7c3aed, #a855f7)",
    hoverGradient: "linear-gradient(135deg, #a855f7, #7c3aed)",
    shadow: "rgba(124,58,237,0.35)",
    link: "/blood-donation",
  },
  {
    icon: <HeartHandIcon />,
    title: "DONATE POOR",
    subtitle: "गरीब आणि गरजू लोकांना मदद करा",
    gradient: "linear-gradient(135deg, #16a34a, #4ade80)",
    hoverGradient: "linear-gradient(135deg, #4ade80, #16a34a)",
    shadow: "rgba(22,163,74,0.35)",
    link: "/donate-poor",
  },
  {
    icon: <PhoneIcon />,
    title: "VIP NUMBERS",
    subtitle: "महत्त्वाचे हेल्पलाईन क्रमांक एका क्लिकवर",
    gradient: "linear-gradient(135deg, #2563eb, #60a5fa)",
    hoverGradient: "linear-gradient(135deg, #60a5fa, #2563eb)",
    shadow: "rgba(37,99,235,0.35)",
    link: "/vip-numbers",
  },
  {
    icon: <GraduationIcon />,
    title: "EDUCATION UPDATE",
    subtitle: "शैक्षणिक अपडेट्स, शिष्यवृत्ती आणि नवीन माहिती",
    gradient: "linear-gradient(135deg, #ea580c, #fb923c)",
    hoverGradient: "linear-gradient(135deg, #fb923c, #ea580c)",
    shadow: "rgba(234,88,12,0.35)",
    link: "/education-portal",
  },
];

// ---------- Hadees Ticker ----------
function HadeesTicker({ isEnglish }) {
  const items = [...HADEES, ...HADEES]; // duplicate for seamless infinite loop
  return (
    <div className="hadees-ticker-wrap w-full overflow-hidden"
      style={{
        background: "linear-gradient(90deg, #041f14 0%, #0a3b2c 40%, #072b1e 100%)",
        borderBottom: "2px solid rgba(212,175,55,0.3)",
      }}
    >
      <div className="flex items-stretch" style={{ minHeight: 44 }}>

        {/* Left label badge */}
        <div
          className="flex items-center gap-2 shrink-0 px-4"
          style={{
            background: "linear-gradient(135deg, #d4af37 0%, #f5e17a 100%)",
            clipPath: "polygon(0 0, calc(100% - 10px) 0, 100% 50%, calc(100% - 10px) 100%, 0 100%)",
            paddingRight: 22,
          }}
        >
          <span style={{ fontSize: 13 }}>📖</span>
          <span
            className="font-extrabold tracking-wider whitespace-nowrap"
            style={{ color: "#062019", fontSize: "0.7rem", fontFamily: "'Noto Sans Devanagari','Inter',sans-serif" }}
          >
            {isEnglish ? "DAILY HADITH" : "दैनिक हदीस"}
          </span>
        </div>

        {/* Scrolling strip */}
        <div className="flex-1 overflow-hidden relative">
          <div className="hadees-ticker-inner flex items-center h-full">
            {items.map((h, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-3 whitespace-nowrap italic"
                style={{
                  padding: "0 32px",
                  color: "rgba(255,255,255,0.88)",
                  fontSize: "0.82rem",
                  fontFamily: "'Noto Sans Devanagari','Inter',sans-serif",
                }}
              >
                <span style={{ color: "#d4af37", fontSize: 10, fontStyle: "normal" }}>✦</span>
                {isEnglish ? h.en : h.mr}
                <span
                  className="font-bold not-italic"
                  style={{
                    color: "#d4af37", fontSize: "0.7rem",
                    background: "rgba(212,175,55,0.14)",
                    border: "1px solid rgba(212,175,55,0.28)",
                    borderRadius: 20, padding: "1px 9px",
                  }}
                >
                  {h.ref}
                </span>
                <span style={{ color: "rgba(212,175,55,0.3)", fontStyle: "normal" }}>◆</span>
              </span>
            ))}
          </div>
        </div>

        {/* Right: more link */}
        <div
          className="flex items-center px-4 shrink-0"
          style={{ borderLeft: "1px solid rgba(212,175,55,0.18)" }}
        >
          <Link
            to="/hadees"
            className="hadees-more-btn font-bold whitespace-nowrap"
            style={{
              color: "#d4af37",
              background: "rgba(212,175,55,0.1)",
              border: "1px solid rgba(212,175,55,0.28)",
              borderRadius: 20, padding: "4px 14px",
              fontSize: "0.72rem",
              textDecoration: "none",
              fontFamily: "'Noto Sans Devanagari','Inter',sans-serif",
              transition: "all 0.18s ease",
              display: "inline-flex", alignItems: "center", gap: 5,
            }}
          >
            {isEnglish ? "More" : "अधिक"} <BookOpenIcon />
          </Link>
        </div>

      </div>
    </div>
  );
}

// ---------- Business Card (full width) ----------
function BusinessCard({ isEnglish }) {
  const checks = isEnglish
    ? [
        "Trusted platform",
        "Effective & affordable advertising",
        "Give your business a new identity",
        "Reach customers directly",
        "10,000+ audience reach",
        "24/7 support available",
      ]
    : [
        "विश्वासार्ह प्लॅटफॉर्म",
        "स्वस्त दरात प्रभावी जाहिरात",
        "व्यवसायाला नवी ओळख",
        "ग्राहकांपर्यंत थेट पोहोच",
        "१०,०००+ प्रेक्षक",
        "२४/७ सहाय्य उपलब्ध",
      ];

  return (
    <div
      className="promo-card relative overflow-hidden rounded-3xl shadow-2xl w-full"
      style={{
        background: "linear-gradient(135deg, #1e1b4b 0%, #1e2a6b 55%, #2d3a8c 100%)",
        minHeight: 260,
      }}
    >
      {/* Background image overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${businessImg})`,
          opacity: 0.22,
          mixBlendMode: "luminosity",
        }}
      />
      {/* Gradient wash */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(105deg, rgba(20,18,60,0.97) 20%, rgba(30,40,110,0.6) 60%, rgba(30,40,110,0.18) 100%)",
        }}
      />
      {/* Shimmer sweep */}
      <div
        className="absolute inset-0 pointer-events-none biz-shimmer"
        style={{
          background:
            "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.04) 50%, transparent 70%)",
          backgroundSize: "600px 100%",
        }}
      />
      {/* Decorative glow circles */}
      <div
        className="absolute pointer-events-none rounded-full"
        style={{
          top: -60, right: -60, width: 220, height: 220,
          background: "radial-gradient(circle, rgba(250,204,21,0.1) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute pointer-events-none rounded-full"
        style={{
          bottom: -50, left: -50, width: 180, height: 180,
          background: "radial-gradient(circle, rgba(233,30,140,0.1) 0%, transparent 70%)",
        }}
      />

      {/* Content grid */}
      <div
        className="relative z-10 flex flex-col sm:flex-row gap-6 p-6 sm:p-8 h-full"
        style={{ alignItems: "stretch" }}
      >
        {/* LEFT text */}
        <div className="flex flex-col gap-4 flex-1">
          {/* Tag + stars */}
          <div className="flex items-center gap-3 flex-wrap">
            <span
              className="text-xs font-extrabold tracking-wider px-3 py-1 rounded-full uppercase"
              style={{ background: "#facc15", color: "#1e1b4b" }}
            >
              {isEnglish ? "Professional" : "प्रोफेशनल"}
            </span>
            <div className="flex gap-0.5" style={{ color: "#facc15" }}>
              {[...Array(5)].map((_, i) => <StarIcon key={i} />)}
            </div>
          </div>

          {/* Headline */}
          <div>
            <h3
              className="text-white font-black leading-tight"
              style={{ fontSize: "clamp(1.35rem, 3vw, 1.9rem)" }}
            >
              {isEnglish ? "Business Advertising" : "बिझनेस जाहिरात"}
            </h3>
            <p
              className="mt-2 leading-relaxed"
              style={{
                color: "rgba(255,255,255,0.75)",
                fontSize: "0.88rem",
                maxWidth: 440,
              }}
            >
              {isEnglish
                ? "Reach thousands of people with your business advertisement and grow your customer base rapidly!"
                : "तुमच्या व्यवसायाची जाहिरात हजारो लोकांपर्यंत पोहोचवा आणि ग्राहकांचा आधार झपाट्याने वाढवा!"}
            </p>
          </div>

          {/* 2-column checklist */}
          <ul
            className="grid gap-y-2 gap-x-5"
            style={{ gridTemplateColumns: "repeat(auto-fill, minmax(175px, 1fr))" }}
          >
            {checks.map((item, idx) => (
              <li key={idx} className="check-item flex items-center gap-2 text-white/90 text-sm font-medium">
                <span
                  className="flex items-center justify-center rounded-full shrink-0 check-dot"
                  style={{ width: 18, height: 18, background: "#4ade80", color: "#1e1b4b" }}
                >
                  <CheckIcon />
                </span>
                {item}
              </li>
            ))}
          </ul>

          {/* Phone + location */}
          <div className="flex flex-wrap items-center gap-5 mt-auto pt-2">
            <a
              href="tel:8888123456"
              className="biz-phone flex items-center gap-2 text-white font-bold text-base"
              style={{ textDecoration: "none" }}
            >
              <span
                className="flex items-center justify-center rounded-full"
                style={{
                  width: 30, height: 30,
                  background: "rgba(74,222,128,0.18)",
                  border: "1.5px solid rgba(74,222,128,0.4)",
                  color: "#4ade80",
                }}
              >
                <CallIcon />
              </span>
              8888 123 456
            </a>

            <span
              className="flex items-center gap-2 text-xs"
              style={{ color: "rgba(255,255,255,0.6)" }}
            >
              <span style={{ color: "#f87171" }}><PinIcon /></span>
              {isEnglish ? "Karad, Satara, Maharashtra" : "कऱाड, सातारा, महाराष्ट्र"}
            </span>
          </div>
        </div>

        {/* RIGHT: circular badge + live pill */}
        <div className="flex flex-col items-center justify-center gap-3 shrink-0 sm:pl-4">
          <button className="badge-cta shrink-0 rounded-full flex flex-col items-center justify-center text-center font-extrabold leading-tight"
            style={{ width: 108, height: 108, fontSize: "0.72rem" }}
          >
            <span>{isEnglish ? "Book" : "आजच"}</span>
            <span>{isEnglish ? "Your Ad" : "जाहिरात"}</span>
            <span style={{ fontSize: "0.65rem" }}>{isEnglish ? "Today!" : "बुक करा!"}</span>
          </button>

          <div
            className="flex items-center gap-2 rounded-full px-3 py-1 whitespace-nowrap"
            style={{
              background: "rgba(255,255,255,0.07)",
              border: "1px solid rgba(255,255,255,0.12)",
              color: "rgba(255,255,255,0.7)",
              fontSize: "0.68rem", fontWeight: 600,
            }}
          >
            <span
              className="live-dot rounded-full shrink-0"
              style={{ width: 7, height: 7, background: "#4ade80", display: "inline-block" }}
            />
            {isEnglish ? "Limited slots" : "मर्यादित जागा"}
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------- Main Home ----------
export default function Home() {
  const { lang } = useLang();
  const isEnglish = lang === "en";

  return (
    <section
      className="w-full bg-white overflow-hidden"
      style={{ fontFamily: "'Noto Sans Devanagari', 'Mukta', 'Segoe UI', sans-serif" }}
    >

      {/* ═══════════════════════════════════════
          HADEES MARQUEE TICKER — sits at top
      ═══════════════════════════════════════ */}
      <HadeesTicker isEnglish={isEnglish} />

      {/* ═══════════════════════════════════════
          HERO
      ═══════════════════════════════════════ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">

          {/* ── LEFT: Text ── */}
          <div className="flex flex-col gap-5 justify-center order-1">
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 leading-tight">
                {isEnglish ? "Come together," : "एकत्र येऊया,"}
              </h1>
              <h1
                className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight"
                style={{ color: "#e91e8c" }}
              >
                {isEnglish ? "Let's build a stronger society!" : "समाज घडवूया!"}
              </h1>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-2 w-36">
              <div
                className="h-0.5 flex-1 rounded-full"
                style={{ background: "linear-gradient(to right, #e91e8c, #f97316)" }}
              />
              <div className="w-2 h-2 rounded-full bg-pink-500" />
              <div
                className="h-0.5 flex-1 rounded-full"
                style={{ background: "linear-gradient(to left, #e91e8c, #f97316)" }}
              />
            </div>

            <p className="text-gray-700 leading-relaxed text-lg lg:text-xl max-w-md font-semibold">
              {isEnglish
                ? "We are committed to education, healthcare, employment, women's empowerment, and social unity. Together, let's create a brighter future."
                : "शिक्षण, आरोग्य, रोजगार, महिला सशक्तीकरण आणि सामाजिक एकतेसाठी आम्ही कटिबद्ध आहोत. चला, एकत्र येऊन उज्ज्वल भविष्य घडवूया."}
            </p>

            <div className="flex flex-wrap gap-3 pt-1">
              <button className="cta-gradient flex items-center gap-2 text-white font-bold px-6 py-3 rounded-full shadow-lg text-md">
                <CallIcon />
                {isEnglish ? "Contact the helpline" : "हेल्पलाईनशी संपर्क करा"}
              </button>

              <button className="cta-outline relative overflow-hidden font-bold px-6 py-3 rounded-full text-md">
                <span className="relative z-10 flex items-center gap-2">
                  {isEnglish ? "Explore services" : "सेवा एक्सप्लोर करा"} <ArrowRight />
                </span>
              </button>
            </div>
          </div>

          {/* ── RIGHT: Business card full width ── */}
          <div className="order-2 w-full">
            <BusinessCard isEnglish={isEnglish} />
          </div>

        </div>

        {/* ── Quick link cards (commented-out section — kept as-is) ── */}
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-8">
          {quickLinks.map((item, i) => (
            <Link key={i} to={item.link || "#"} className="quick-link-card relative overflow-hidden flex items-center gap-4 rounded-2xl px-5 py-4 text-white group cursor-pointer"
              style={{ "--grad": item.gradient, "--grad-hover": item.hoverGradient, background: item.gradient, boxShadow: `0 6px 20px ${item.shadow}` }}
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 bg-white bg-opacity-20 group-hover:bg-opacity-30 transition-all relative z-10">
                {item.icon}
              </div>
              <div className="flex-1 relative z-10">
                <div className="font-black text-sm tracking-wide leading-tight">{item.title}</div>
                <div className="text-xs opacity-90 leading-snug mt-0.5">{item.subtitle}</div>
              </div>
              <div className="opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all relative z-10">
                <ArrowRight />
              </div>
            </Link>
          ))}
        </div> */}
      </div>

      <style>{`
        /* Hadees ticker animation */
        @keyframes marqueeFlow {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .hadees-ticker-inner {
          display: inline-flex;
          white-space: nowrap;
          animation: marqueeFlow 42s linear infinite;
        }
        .hadees-ticker-wrap:hover .hadees-ticker-inner {
          animation-play-state: paused;
        }
        .hadees-more-btn:hover {
          background: rgba(212,175,55,0.22) !important;
          color: #f5e17a !important;
          transform: translateY(-1px);
        }

        /* Business card shimmer */
        @keyframes shimmer {
          0%   { background-position: -600px 0; }
          100% { background-position:  600px 0; }
        }
        .biz-shimmer { animation: shimmer 3.5s linear infinite; }

        /* Live dot pulse */
        @keyframes livePulse {
          0%,100% { opacity: 1; transform: scale(1); }
          50%      { opacity: 0.5; transform: scale(1.4); }
        }
        .live-dot { animation: livePulse 1.8s ease-in-out infinite; }

        /* Check item hover */
        .check-item { transition: transform 0.18s ease, color 0.18s ease; }
        .check-item:hover { transform: translateX(4px); }
        .check-item:hover .check-dot { background: #facc15 !important; }

        /* Phone hover */
        .biz-phone { transition: color 0.18s ease; }
        .biz-phone:hover { color: #facc15 !important; }

        /* Primary helpline CTA */
        .cta-gradient {
          background-image: linear-gradient(135deg, #f97316, #e91e8c, #f97316);
          background-size: 200% 100%;
          background-position: 0% 0%;
          border: none;
          cursor: pointer;
          transition: background-position 0.5s ease, transform 0.22s ease, box-shadow 0.22s ease;
        }
        .cta-gradient:hover {
          background-position: 100% 0%;
          transform: translateY(-2px) scale(1.03);
          box-shadow: 0 8px 28px rgba(233,30,140,0.4);
        }

        /* Secondary outline CTA */
        .cta-outline {
          border: 2px solid #e91e8c;
          color: #e91e8c;
          background: transparent;
          cursor: pointer;
          transition: color 0.25s ease, transform 0.22s ease;
        }
        .cta-outline::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #e91e8c, #f97316);
          transform: translateX(-101%);
          transition: transform 0.35s cubic-bezier(0.4,0,0.2,1);
          z-index: 0;
          border-radius: inherit;
        }
        .cta-outline:hover::before { transform: translateX(0); }
        .cta-outline:hover { color: #fff; transform: translateY(-2px); }

        /* Promo card lift */
        .promo-card { transition: transform 0.32s ease, box-shadow 0.32s ease; }
        .promo-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 54px rgba(0,0,0,0.28) !important;
        }
        .promo-card .bg-cover { transition: transform 0.6s ease; }
        .promo-card:hover .bg-cover { transform: scale(1.07); }

        /* Circular booking badge */
        .badge-cta {
          background-image: linear-gradient(135deg, #facc15, #f97316, #facc15);
          background-size: 200% 200%;
          background-position: 0% 0%;
          color: #1e1b4b;
          border: none;
          cursor: pointer;
          box-shadow: 0 6px 20px rgba(250,204,21,0.4);
          transition: background-position 0.5s ease, transform 0.28s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.28s ease;
        }
        .badge-cta:hover {
          background-position: 100% 100%;
          transform: scale(1.08) rotate(4deg);
          box-shadow: 0 10px 30px rgba(250,204,21,0.55);
        }

        /* Quick link cards */
        .quick-link-card {
          background-image: var(--grad);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .quick-link-card:hover {
          background-image: var(--grad-hover);
          transform: translateY(-3px) scale(1.03);
        }

        @media (prefers-reduced-motion: reduce) {
          .hadees-ticker-inner,
          .biz-shimmer,
          .live-dot,
          .cta-gradient,
          .cta-outline::before,
          .promo-card,
          .badge-cta,
          .quick-link-card { transition: none !important; animation: none !important; }
        }
      `}</style>
    </section>
  );
}