import { useEffect, useRef, useState } from "react";

const values = [
  {
    icon: (
      <svg viewBox="0 0 40 40" className="w-10 h-10" fill="none">
        <circle cx="20" cy="20" r="20" fill="#16a34a" />
        <path d="M12 20l6 6 10-12" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    color: "text-green-400",
    borderColor: "border-green-400/30",
    title: "पारदर्शकता",
    desc: "पूर्ण पारदर्शक आणि विश्वासाहं कार्यप्रणाली",
  },
  {
    icon: (
      <svg viewBox="0 0 40 40" className="w-10 h-10" fill="none">
        <circle cx="20" cy="20" r="20" fill="#2563eb" />
        <path d="M14 22c0-3 2.5-5 6-5s6 2 6 5" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
        <circle cx="17" cy="16" r="2" fill="#fff" />
        <circle cx="23" cy="16" r="2" fill="#fff" />
      </svg>
    ),
    color: "text-blue-400",
    borderColor: "border-blue-400/30",
    title: "समर्पण",
    desc: "समाजासाठी समर्पित आणि निरंतर सेवा",
  },
  {
    icon: (
      <svg viewBox="0 0 40 40" className="w-10 h-10" fill="none">
        <circle cx="20" cy="20" r="20" fill="#db2777" />
        <path d="M20 12l2.4 5h5.3l-4.3 3.2 1.6 5-5-3.5-5 3.5 1.6-5L12.3 17h5.3z" fill="#fff" />
      </svg>
    ),
    color: "text-pink-400",
    borderColor: "border-pink-400/30",
    title: "विश्वास",
    desc: "आपला विश्वास, आमची सर्वात मोठी ताकद",
  },
];

export default function About() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #0f0c29 0%, #302b63 35%, #5b21b6 65%, #9d174d 100%)",
        fontFamily: "'Noto Sans Devanagari', 'Noto Sans', sans-serif",
      }}
    >
      {/* Animated background blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-24 -left-24 w-80 h-80 rounded-full opacity-20 animate-pulse"
          style={{ background: "radial-gradient(circle, #7c3aed, transparent 70%)" }}
        />
        <div
          className="absolute bottom-0 right-0 w-96 h-96 rounded-full opacity-15 animate-pulse"
          style={{
            background: "radial-gradient(circle, #db2777, transparent 70%)",
            animationDelay: "1s",
          }}
        />
        {/* Dotted pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="#ffffff" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* ── LEFT COLUMN ── */}
          <div
            className="text-white space-y-5"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(-40px)",
              transition: "opacity 0.7s ease, transform 0.7s ease",
            }}
          >
            {/* Eyebrow */}
            <div className="flex items-center gap-2">
              <span className="block w-8 h-0.5 bg-yellow-400 rounded-full" />
              <span
                className="text-xs font-semibold tracking-widest uppercase text-yellow-300"
              >
                आमच्याबद्दल
              </span>
            </div>

            {/* Headline */}
            <h2
              className="text-4xl sm:text-5xl font-black leading-tight"
              style={{ lineHeight: 1.25 }}
            >
              <span className="block">सेवेचा वसा,</span>
              <span
                className="block"
                style={{
                  background: "linear-gradient(90deg, #f0abfc, #818cf8)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                माणुसकीचा श्वास.
              </span>
            </h2>

            {/* Body */}
            <p className="text-purple-100/80 text-sm sm:text-base leading-relaxed max-w-md">
              खुशहाल मुशायरा सोशल वेलफेअर &amp; चॅरिटेबल ट्रस्ट, महाराष्ट्र हा
              समाजातील गरजू घटकांसाठी सेवा पोहोचवण्यासाठी समर्पित आहे. आम्ही
              विश्वास ठेवतो की, एक छोटी मदत कोणाचे तरी जीवन बदलू शकते.
            </p>

            {/* CTA */}
            <button
              className="group relative inline-flex items-center gap-2 px-7 py-3 rounded-full text-sm font-semibold overflow-hidden"
              style={{
                border: "1.5px solid #4ade80",
                color: "#4ade80",
                background: "transparent",
                transition: "color 0.3s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#fff";
                e.currentTarget.querySelector(".btn-bg").style.transform = "scaleX(1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#4ade80";
                e.currentTarget.querySelector(".btn-bg").style.transform = "scaleX(0)";
              }}
            >
              <span
                className="btn-bg absolute inset-0 bg-green-500 origin-left rounded-full"
                style={{ transform: "scaleX(0)", transition: "transform 0.3s ease" }}
              />
              <span className="relative">आमच्याबद्दल अधिक जाणून घ्या</span>
              <span className="relative">→</span>
            </button>
          </div>

          {/* ── RIGHT COLUMN ── */}
          <div
            className="space-y-5"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(40px)",
              transition: "opacity 0.7s ease 0.15s, transform 0.7s ease 0.15s",
            }}
          >
            {/* Video thumbnail card */}
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{
                background:
                  "linear-gradient(135deg, #4c1d95 0%, #7c3aed 50%, #db2777 100%)",
              }}
            >
              {/* Wavy top edge decoration */}
              <div className="absolute top-0 left-0 right-0 h-1 opacity-60"
                style={{ background: "linear-gradient(90deg, #f0abfc, #818cf8, #f0abfc)" }} />

              {/* YouTube Video */}
              <div className="relative h-52 sm:h-60 flex items-center justify-center overflow-hidden">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/5Lgg3-K0uTw"
                  title="आमचा परिचय"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{ position: "absolute", top: 0, left: 0 }}
                />

                {/* Corner badge */}
                <div className="absolute top-3 right-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-3 py-1.5 z-20">
                  <span className="text-white text-xs font-semibold">🎬 आमचा परिचय</span>
                </div>
              </div>
            </div>

            {/* Values list */}
            <div className="space-y-3">
              {values.map((v, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-4 rounded-2xl p-3.5 border backdrop-blur-sm ${v.borderColor}`}
                  style={{
                    background: "rgba(255,255,255,0.07)",
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateY(0)" : "translateY(20px)",
                    transition: `opacity 0.5s ease ${0.3 + i * 0.12}s, transform 0.5s ease ${0.3 + i * 0.12}s`,
                  }}
                >
                  <div className="flex-shrink-0">{v.icon}</div>
                  <div>
                    <div className={`font-bold text-sm ${v.color}`}>{v.title}</div>
                    <div className="text-purple-200/70 text-xs mt-0.5">{v.desc}</div>
                  </div>
                  {/* Right chevron */}
                  <div className="ml-auto text-white/20 text-lg">›</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden" style={{ height: "30px" }}>
        <svg viewBox="0 0 1440 30" preserveAspectRatio="none" className="w-full h-full">
          <path
            d="M0,30 C360,0 1080,0 1440,30 L1440,30 L0,30 Z"
            fill="rgba(255,255,255,0.04)"
          />
        </svg>
      </div>
    </section>
  );
}