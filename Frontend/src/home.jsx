import React from "react";
import { Link } from "react-router-dom";
import businessImg from "./assets/business.png";
import quranImg from "./assets/quran.webp";

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
    subtitle: "गरीब आणि गरजू लोकांना मदत करा",
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
    link: "/education-update",
  },
];

export default function Home() {
  return (
    <section
      className="w-full bg-white overflow-hidden"
      style={{ fontFamily: "'Noto Sans Devanagari', 'Mukta', 'Segoe UI', sans-serif" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* ============ LEFT — Text Content ============ */}
          <div className="flex flex-col gap-5 justify-center order-1">
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 leading-tight">
                एकत्र येऊया,
              </h1>
              <h1
                className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight"
                style={{ color: "#e91e8c" }}
              >
                समाज घडवूया!
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
              शिक्षण, आरोग्य, रोजगार, महिला सशक्तीकरण आणि सामाजिक एकतेसाठी आम्ही
              कटिबद्ध आहोत. चला, एकत्र येऊन उज्ज्वल भविष्य घडवूया.
            </p>

            <div className="flex flex-wrap gap-3 pt-1">
              {/* Primary CTA — animated gradient shift on hover */}
              <button
                className="cta-gradient flex items-center gap-2 text-white font-bold px-6 py-3 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-transform duration-300 text-md"
              >
                <CallIcon />
                हेल्पलाईनशी संपर्क करा
              </button>

              {/* Secondary CTA — fill slides in from left on hover */}
              <button className="cta-outline relative overflow-hidden font-bold px-6 py-3 rounded-full text-md transition-colors duration-300">
                <span className="relative z-10 flex items-center gap-2">
                  सेवा एक्सप्लोर करा <ArrowRight />
                </span>
              </button>
            </div>
          </div>

          {/* ============ RIGHT — Two promo cards ============ */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 order-2 h-full">
            {/* ---- Card 1: Professional Business Ad ---- */}
            <div
              className="promo-card relative overflow-hidden rounded-3xl shadow-xl flex-1"
              style={{
                background: "linear-gradient(160deg, #1e1b4b 0%, #1e2a6b 55%, #2d3a8c 100%)",
                minHeight: "260px",
              }}
            >
              {/* Background building image, faded into the gradient */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${businessImg})`,

                  opacity: 0.35,
                  mixBlendMode: "luminosity",
                }}
              />
              {/* Gradient wash so text stays readable */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(100deg, rgba(20,18,60,0.95) 25%, rgba(30,40,110,0.55) 60%, rgba(30,40,110,0.15) 100%)",
                }}
              />

              <div className="relative z-10 h-full flex flex-col p-5">
                <span
                  className="self-start text-[11px] font-extrabold tracking-wide px-3 py-1 rounded-full mb-2"
                  style={{ background: "#facc15", color: "#1e1b4b" }}
                >
                  प्रोफेशनल
                </span>
                <h3 className="text-white text-2xl font-black leading-tight mb-2">
                  बिझनेस जाहिरात
                </h3>
                <p className="text-white/85 text-sm leading-snug mb-3 max-w-[220px]">
                  तुमच्या व्यवसायाची जाहिरात हजारो लोकांपर्यंत पोहोचवा!
                </p>

                <ul className="flex flex-col gap-1.5 mb-4">
                  {[
                    "विश्वासाई प्लॅटफॉर्म",
                    "स्वस्त दरात प्रभावी जाहिरात",
                    "व्यवसायाला नवी ओळख",
                    "प्राहकपर्यंत थेट पोहोच",
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-white/90 text-xs font-medium">
                      <span className="flex items-center justify-center w-4 h-4 rounded-full bg-green-400 text-[#1e1b4b] shrink-0">
                        <CheckIcon />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto flex items-end justify-between gap-3">
                  <div className="flex flex-col gap-1.5">
                    <a href="tel:8888123456" className="flex items-center gap-2 text-white font-bold text-base hover:text-yellow-300 transition-colors">
                      <CallIcon /> 8888 123 456
                    </a>
                    <span className="flex items-center gap-2 text-white/75 text-xs">
                      <PinIcon /> कऱाड, सातारा, महाराष्ट्र
                    </span>
                  </div>

                  {/* Circular CTA badge */}
                  <button className="badge-cta shrink-0 w-20 h-20 rounded-full flex flex-col items-center justify-center text-center text-[11px] font-extrabold leading-tight">
                    <span>आजच</span>
                    <span>जाहिरात</span>
                    <span>बुक करा</span>
                  </button>
                </div>
              </div>
            </div>

            {/* ---- Card 2: Daily Hadees ---- */}
            <div
              className="promo-card relative overflow-hidden rounded-3xl shadow-xl flex-1"
              style={{
                background: "linear-gradient(160deg, #062019 0%, #0a3b2c 60%, #0f1f1a 100%)",
                minHeight: "260px",
              }}
            >
              {/* Background quran image, faded into the gradient */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${quranImg})`,

                  opacity: 0.3,
                  mixBlendMode: "luminosity",
                }}
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(6,32,25,0.55) 0%, rgba(6,32,25,0.75) 55%, rgba(6,20,16,0.95) 100%)",
                }}
              />

              <div className="relative z-10 h-full flex flex-col p-5 text-center items-center">
                <h3 className="text-amber-300 text-xl font-black leading-tight mb-3">
                  दैनिक हदीस <span className="text-white/90 text-base font-bold">(तबियत)</span>
                </h3>

                <span
                  className="text-[11px] font-extrabold tracking-wide px-3 py-1 rounded-full mb-5"
                  style={{ background: "#facc15", color: "#062019" }}
                >
                  हदीस शिक्षण, जीवन घडला
                </span>

                <p className="text-white/90 text-sm leading-relaxed italic mb-2 max-w-[230px]">
                  "खरेच, अल्लाहाने तुमच्यासाठी आहामते दीन सोपा केला आहे, कठोण केला नाही."
                </p>
                <span className="text-amber-200/80 text-xs font-semibold mb-5">
                  (सहीह बुखारी: 39)
                </span>

                {/* Quran illustration */}
                <div className="mt-auto mb-4 opacity-90">
                  <svg viewBox="0 0 100 70" className="w-24 h-16" fill="none">
                    <path d="M50 8 L50 58" stroke="#d4af37" strokeWidth="1.5" />
                    <path d="M50 12 C30 6 12 12 8 20 L8 52 C12 46 30 42 50 48 Z" fill="#0a3b2c" stroke="#d4af37" strokeWidth="1.5" />
                    <path d="M50 12 C70 6 88 12 92 20 L92 52 C88 46 70 42 50 48 Z" fill="#0a3b2c" stroke="#d4af37" strokeWidth="1.5" />
                    <rect x="20" y="58" width="60" height="6" rx="2" fill="#d4af37" opacity="0.5" />
                  </svg>
                </div>

                <button className="hadees-cta w-full max-w-[220px] py-2.5 rounded-full font-bold text-sm text-white flex items-center justify-center gap-2">
                  आजची हदीस वाचा <ArrowRight />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ============ RIGHT — Quick Link Cards (full width row below) ============ */}
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-8">
          {quickLinks.map((item, i) => (
            <Link
              key={i}
              to={item.link || "#"}
              className="quick-link-card relative overflow-hidden flex items-center gap-4 rounded-2xl px-5 py-4 text-white group cursor-pointer"
              style={{
                "--grad": item.gradient,
                "--grad-hover": item.hoverGradient,
                background: item.gradient,
                boxShadow: `0 6px 20px ${item.shadow}`,
              }}
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
        /* Primary helpline CTA — gradient position animates on hover (right-left feel) */
        .cta-gradient {
          background-image: linear-gradient(135deg, #f97316, #e91e8c, #f97316);
          background-size: 200% 100%;
          background-position: 0% 0%;
          transition: background-position 0.5s ease;
        }
        .cta-gradient:hover {
          background-position: 100% 0%;
        }

        /* Secondary outline CTA — fill slides in from left */
        .cta-outline {
          border: 2px solid #e91e8c;
          color: #e91e8c;
          background: transparent;
        }
        .cta-outline::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #e91e8c, #f97316);
          transform: translateX(-101%);
          transition: transform 0.4s ease;
          z-index: 0;
        }
        .cta-outline:hover::before {
          transform: translateX(0);
        }
        .cta-outline:hover {
          color: #fff;
        }

        /* Promo cards: subtle lift + image pan on hover */
        .promo-card {
          transition: transform 0.35s ease, box-shadow 0.35s ease;
        }
        .promo-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 36px rgba(0,0,0,0.25);
        }
        .promo-card > div[style*="bg-cover"],
        .promo-card .bg-cover {
          transition: transform 0.6s ease;
        }
        .promo-card:hover .bg-cover {
          transform: scale(1.08);
        }

        /* Circular booking badge — gradient sweeps on hover */
        .badge-cta {
          background-image: linear-gradient(135deg, #facc15, #f97316, #facc15);
          background-size: 200% 200%;
          background-position: 0% 0%;
          color: #1e1b4b;
          box-shadow: 0 6px 18px rgba(250,204,21,0.4);
          transition: background-position 0.5s ease, transform 0.3s ease;
        }
        .badge-cta:hover {
          background-position: 100% 100%;
          transform: scale(1.06);
        }

        /* Hadees CTA — gradient slides left-right */
        .hadees-cta {
          background-image: linear-gradient(90deg, #16a34a, #0a3b2c, #16a34a);
          background-size: 200% 100%;
          background-position: 0% 0%;
          transition: background-position 0.5s ease, transform 0.3s ease;
        }
        .hadees-cta:hover {
          background-position: 100% 0%;
          transform: translateY(-1px);
        }

        /* Quick link cards — gradient direction flips + arrow nudge on hover */
        .quick-link-card {
          background-image: var(--grad);
          transition: transform 0.3s ease, box-shadow 0.3s ease, background-image 0.4s ease;
        }
        .quick-link-card:hover {
          background-image: var(--grad-hover);
          transform: translateY(-3px) scale(1.03);
        }

        @media (prefers-reduced-motion: reduce) {
          .cta-gradient, .cta-outline::before, .promo-card, .promo-card .bg-cover,
          .badge-cta, .hadees-cta, .quick-link-card {
            transition: none !important;
          }
        }
      `}</style>
    </section>
  );
}