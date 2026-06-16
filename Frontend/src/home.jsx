import React from "react";
import { Link } from "react-router-dom";

// SVG Icons
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

const quickLinks = [
  {
    icon: <BloodIcon />,
    title: "BLOOD GROUP",
    subtitle: "रक्तदात्यांची यादी आणि माहिती",
    gradient: "linear-gradient(135deg, #7c3aed, #a855f7)",
    shadow: "rgba(124,58,237,0.35)",
    link: "/blood-donation"
  },
  {
    icon: <HeartHandIcon />,
    title: "DONATE POOR",
    subtitle: "गरीब आणि गरजू लोकांना मदत करा",
    gradient: "linear-gradient(135deg, #16a34a, #4ade80)",
    shadow: "rgba(22,163,74,0.35)",
    link: "/donate-poor",
  },
  {
    icon: <PhoneIcon />,
    title: "VIP NUMBERS",
    subtitle: "महत्त्वाचे हेल्पलाईन क्रमांक एका क्लिकवर",
    gradient: "linear-gradient(135deg, #2563eb, #60a5fa)",
    shadow: "rgba(37,99,235,0.35)",
  },
  {
    icon: <GraduationIcon />,
    title: "EDUCATION UPDATE",
    subtitle: "शैक्षणिक अपडेट्स, शिष्यवृत्ती आणि नवीन माहिती",
    gradient: "linear-gradient(135deg, #ea580c, #fb923c)",
    shadow: "rgba(234,88,12,0.35)",
  },
];

export default function Home() {
  return (
    <section
      className="w-full bg-white overflow-hidden"
      style={{ fontFamily: "'Noto Sans Devanagari', 'Mukta', 'Segoe UI', sans-serif" }}
    >
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-10 items-center">

          {/* LEFT — Text Content */}
          <div className="md:col-span-4 flex flex-col gap-5 justify-center order-1">
            <div>
              <h1 className="text-5xl sm:text-6xl font-black text-gray-900 leading-tight">
                एकत्र येऊया,
              </h1>
              <h1
                className="text-5xl sm:text-6xl font-black leading-tight"
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

            <p className="text-gray-700 leading-relaxed text-xl max-w-md  font-semibold ">
              शिक्षण, आरोग्य, रोजगार, महिला सशक्तीकरण आणि <br /> सामाजिक एकतेसाठी आम्ही
              कटिबद्ध आहोत. <br /> चला, एकत्र येऊन उज्ज्वल भविष्य घडवूया.
            </p>

            <div className="flex flex-wrap gap-3 pt-1">
              {/* Primary CTA */}
              <button
                className="flex items-center gap-2 text-white font-bold px-6 py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 text-md"
                style={{ background: "linear-gradient(135deg, #f97316, #e91e8c)" }}
              >
                <CallIcon />
                हेल्पलाईनशी संपर्क करा
              </button>

              {/* Secondary CTA */}
              <button
                className="flex items-center gap-2 font-bold px-6 py-3 rounded-full transition-all duration-300 hover:bg-pink-50 text-md"
                style={{ border: "2px solid #e91e8c", color: "#e91e8c" }}
              >
                सेवा एक्सप्लोर करा →
              </button>
            </div>
          </div>

          {/* CENTER — Mosque Image with Badge */}
          <div className="md:col-span-4 flex justify-center items-center order-2 relative">
            <div className="relative w-full max-w-sm">

              {/* Image card */}
              <div
                className="relative overflow-hidden shadow-2xl"
                style={{ borderRadius: "28px", aspectRatio: "1 / 1" }}
              >
                <img
                  src="/mosque.png"
                  alt="Illuminated mosque at dusk"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback gradient if image not found
                    e.target.style.display = "none";
                    e.target.parentElement.style.background =
                      "linear-gradient(135deg, #1e0050 0%, #6d28d9 50%, #f97316 100%)";
                  }}
                />

                {/* Bottom fade overlay */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(to bottom, transparent 50%, rgba(10,5,30,0.5) 100%)",
                  }}
                />

                {/* Purple swoosh — bottom right */}
                <div
                  className="absolute bottom-0 right-0 w-32 h-32 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(135deg, transparent 40%, #6d28d9 100%)",
                    borderTopLeftRadius: "100%",
                    opacity: 0.9,
                  }}
                />

                {/* Swirl lines on swoosh */}
                <svg
                  className="absolute bottom-0 right-0 w-32 h-32 pointer-events-none"
                  viewBox="0 0 128 128"
                  fill="none"
                >
                  <path
                    d="M128 128 Q80 80 40 128"
                    stroke="rgba(255,255,255,0.3)"
                    strokeWidth="2"
                  />
                  <path
                    d="M128 100 Q90 70 60 128"
                    stroke="rgba(255,255,255,0.2)"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M128 75 Q100 60 80 128"
                    stroke="rgba(255,255,255,0.13)"
                    strokeWidth="1"
                  />
                </svg>
              </div>

              {/* 5000+ Badge — bottom left */}
              {/* <div
                className="absolute flex flex-col items-start justify-center px-4 py-3 select-none"
                style={{
                  bottom: "-10px",
                  left: "-12px",
                  minWidth: "128px",
                  background:
                    "linear-gradient(135deg, #ff6b35, #f7931e, #e91e8c)",
                  borderRadius: "60% 40% 55% 45% / 45% 55% 40% 60%",
                  boxShadow: "0 8px 28px rgba(255,80,0,0.5)",
                  zIndex: 10,
                }}
              >
                <div className="text-white font-black text-3xl leading-tight drop-shadow">
                  5000+
                </div>
                <div className="text-white font-semibold text-xs leading-snug drop-shadow mt-0.5">
                  समुदायाचे
                  <br />
                  विश्वास
                </div>
              </div> */}
            </div>
          </div>

          {/* RIGHT — Quick Link Cards */}
          <div className="md:col-span-4 flex flex-col gap-3 order-3">
            {quickLinks.map((item, i) => (
              <Link
                key={i}
                to={item.link || "#"}
                className="flex items-center gap-4 rounded-2xl px-5 py-4 text-white transition-all duration-300 hover:scale-105 group cursor-pointer"
                style={{
                  background: item.gradient,
                  boxShadow: `0 6px 20px ${item.shadow}`,
                }}
              >
                {/* Icon box */}
                <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 bg-white bg-opacity-20 group-hover:bg-opacity-30 transition-all">
                  {item.icon}
                </div>

                {/* Text */}
                <div className="flex-1">
                  <div className="font-black text-sm tracking-wide leading-tight">
                    {item.title}
                  </div>
                  <div className="text-xs opacity-90 leading-snug mt-0.5">
                    {item.subtitle}
                  </div>
                </div>

                {/* Arrow */}
                <div className="opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                  <ArrowRight />
                </div>
              </Link>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}