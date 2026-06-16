import { useEffect, useRef, useState } from "react";

const stats = [
  {
    icon: (
      // People / community icon
      <svg viewBox="0 0 40 40" fill="white" xmlns="http://www.w3.org/2000/svg" className="w-9 h-9 drop-shadow">
        <circle cx="14" cy="13" r="5.5" />
        <circle cx="26" cy="13" r="5.5" />
        <ellipse cx="14" cy="28" rx="9" ry="6" />
        <ellipse cx="26" cy="28" rx="9" ry="6" />
      </svg>
    ),
    value: "5000+",
    label: "समुदायाचे सदस्य",
  },
  {
    icon: (
      // Heart with hands icon
      <svg viewBox="0 0 40 40" fill="white" xmlns="http://www.w3.org/2000/svg" className="w-9 h-9 drop-shadow">
        <path d="M20 14c-1-3-4-5-7-3.5C9 12 9 17 13 20l7 7 7-7c4-3 4-8 0-9.5-3-1.5-6 .5-7 3.5z" />
        <path d="M10 28c-2 1-4 2-5 4h30c-1-2-3-3-5-4" />
      </svg>
    ),
    value: "1000+",
    label: "उपक्रम",
  },
  {
    icon: (
      // Building / village icon
      <svg viewBox="0 0 40 40" fill="white" xmlns="http://www.w3.org/2000/svg" className="w-9 h-9 drop-shadow">
        <rect x="4" y="18" width="10" height="16" rx="1" />
        <rect x="15" y="10" width="10" height="24" rx="1" />
        <rect x="26" y="15" width="10" height="19" rx="1" />
        <rect x="18" y="14" width="4" height="4" rx="0.5" fill="rgba(255,255,255,0.5)" />
        <rect x="7" y="22" width="4" height="4" rx="0.5" fill="rgba(255,255,255,0.5)" />
        <rect x="28" y="20" width="4" height="4" rx="0.5" fill="rgba(255,255,255,0.5)" />
      </svg>
    ),
    value: "250+",
    label: "गावांमध्ये सेवा",
  },
  {
    icon: (
      // Single person / volunteer icon
      <svg viewBox="0 0 40 40" fill="white" xmlns="http://www.w3.org/2000/svg" className="w-9 h-9 drop-shadow">
        <circle cx="20" cy="12" r="7" />
        <ellipse cx="20" cy="30" rx="12" ry="8" />
      </svg>
    ),
    value: "50+",
    label: "अनुभवी कार्यकर्ते",
  },
  {
    icon: (
      // Headphone / support icon
      <svg viewBox="0 0 40 40" fill="white" xmlns="http://www.w3.org/2000/svg" className="w-9 h-9 drop-shadow">
        <path d="M8 22v-4a12 12 0 0 1 24 0v4" strokeWidth="2.5" stroke="white" fill="none" />
        <rect x="5" y="21" width="7" height="10" rx="3" />
        <rect x="28" y="21" width="7" height="10" rx="3" />
      </svg>
    ),
    value: "24/7",
    label: "आपली सेवा",
  },
];

// Animated counter hook
function useCountUp(target, duration = 1800, start = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    const isNumeric = /^\d+/.test(target);
    if (!isNumeric) return;

    const end = parseInt(target);
    const increment = end / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [start, target, duration]);

  const suffix = target.replace(/^\d+/, "");
  const isNumeric = /^\d+/.test(target);
  return isNumeric ? `${count}${suffix}` : target;
}

function StatItem({ icon, value, label, index, animate }) {
  const display = useCountUp(value, 1600, animate);

  return (
    <div
      className="flex items-center gap-3 px-5 py-0 group"
      style={{
        animation: animate ? `fadeSlideIn 0.5s ease forwards ${index * 0.1}s` : "none",
        opacity: animate ? 0 : 1,
      }}
    >
      {/* Icon */}
      <div
        className="flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
        style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))" }}
      >
        {icon}
      </div>

      {/* Text */}
      <div className="flex flex-col leading-tight">
        <span
          className="text-white font-black text-2xl md:text-3xl tracking-tight"
          style={{
            fontFamily: "'Noto Sans Devanagari', sans-serif",
            textShadow: "0 1px 4px rgba(0,0,0,0.2)",
          }}
        >
          {display}
        </span>
        <span
          className="text-white/90 text-xs md:text-sm font-semibold whitespace-nowrap"
          style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
        >
          {label}
        </span>
      </div>
    </div>
  );
}

// Vertical divider between items
function Divider() {
  return (
    <div className="h-12 w-px flex-shrink-0" style={{ background: "rgba(255,255,255,0.35)" }} />
  );
}

export default function StatsBar() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
      `}</style>

      <section ref={ref} className="w-full py-4 px-4">
        <div
          className="max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-2xl"
          style={{
            /* Rainbow gradient matching the screenshot: pink → yellow → orange → green → blue */
            background:
              "linear-gradient(to right, #e91e8c, #f5a623, #f5a623, #4caf50, #1565c0)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
          }}
        >
          <div className="flex flex-wrap md:flex-nowrap items-center justify-center md:justify-between py-4 px-2 md:px-4 gap-y-4">
            {stats.map((s, i) => (
              <div key={i} className="flex items-center">
                <StatItem {...s} index={i} animate={visible} />
                {i < stats.length - 1 && <Divider />}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}