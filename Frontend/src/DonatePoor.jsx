// DonatePoor.jsx — Single-file React + Vite + Tailwind CSS page
// Add to index.html <head> or index.css:
//   @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;500;600;700;900&family=Poppins:wght@400;500;600;700;800&display=swap');
// Tailwind v3 project. No extra config needed beyond default tailwind.config.js content paths.

import { useState } from "react";

const dn = { fontFamily: "'Noto Sans Devanagari', sans-serif" };
const en = { fontFamily: "'Poppins', sans-serif" };

const amounts = [251, 501, 1101, 2501];

const impactStats = [
  { icon: "🍲", value: "12,400+", label: "जेवण वितरित", labelEn: "Meals served" },
  { icon: "🏠", value: "860+", label: "कुटुंबांना मदत", labelEn: "Families supported" },
  { icon: "📚", value: "340+", label: "मुलांचे शिक्षण", labelEn: "Children educated" },
  { icon: "🩺", value: "95+", label: "वैद्यकीय शिबिरे", labelEn: "Medical camps" },
];

const causes = [
  {
    icon: "🍛",
    color: "from-amber-500 to-orange-600",
    title: "अन्नदान",
    desc: "गरजू कुटुंबांना दैनंदिन पोषक आहार पुरवणे.",
  },
  {
    icon: "🎓",
    color: "from-blue-500 to-indigo-600",
    title: "शिक्षण साहाय्य",
    desc: "गरीब मुलांना पुस्तके, फी व शालेय साहित्य.",
  },
  {
    icon: "🏡",
    color: "from-pink-500 to-rose-600",
    title: "निवारा व कपडे",
    desc: "बेघर व गरजूंना सुरक्षित निवारा आणि कपडे.",
  },
  {
    icon: "💊",
    color: "from-emerald-500 to-teal-600",
    title: "आरोग्य सेवा",
    desc: "मोफत वैद्यकीय शिबिरे आणि औषधोपचार.",
  },
];

export default function DonatePoor() {
  const [selectedAmount, setSelectedAmount] = useState(501);
  const [customAmount, setCustomAmount] = useState("");

  const finalAmount = customAmount ? customAmount : selectedAmount;

  return (
    <div className="min-h-screen bg-[#0b0a1f] text-white" style={en}>

      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden px-4 pb-16 pt-14 sm:pb-24 sm:pt-20">
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "linear-gradient(135deg,#1a1040 0%,#3b1378 30%,#6d28d9 58%,#c026d3 80%,#e11d7a 100%)",
          }}
        />
        <div
          className="absolute inset-0 -z-10 opacity-60"
          style={{
            backgroundImage:
              "radial-gradient(circle,rgba(255,255,255,0.06) 1px,transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        {/* ambient blobs */}
        <div className="pointer-events-none absolute -left-20 top-10 -z-10 h-72 w-72 animate-blob rounded-full bg-fuchsia-600/30 blur-3xl" />
        <div className="pointer-events-none absolute -right-10 bottom-0 -z-10 h-80 w-80 animate-blob-delay rounded-full bg-purple-600/30 blur-3xl" />

        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">

            {/* Left: copy + CTA */}
            <div className="animate-fade-up">
              <span
                className="mb-4 inline-block rounded-full border border-pink-400/40 bg-pink-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-pink-300"
                style={dn}
              >
                गरिबांसाठी दान करा
              </span>
              <h1 className="mb-5 text-4xl font-extrabold leading-tight sm:text-5xl" style={dn}>
                एक हात मदतीचा,<br />
                <span className="bg-gradient-to-r from-amber-300 via-pink-300 to-fuchsia-300 bg-clip-text text-transparent">
                  उमेदीचा सूर्योदय.
                </span>
              </h1>
              <p className="mb-8 max-w-md text-sm leading-relaxed text-purple-100 sm:text-base" style={dn}>
                खुशहाल मुशायरा सोशल वेलफेअर &amp; चॅरिटेबल ट्रस्ट सोबत आज दान करा.
                तुमची छोटी मदत एका गरजू कुटुंबाच्या जीवनात मोठा बदल घडवू शकते —
                अन्न, शिक्षण, निवारा आणि आरोग्य सेवांच्या रूपात.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="#donate-form"
                  className="rounded-full bg-gradient-to-r from-amber-400 to-pink-500 px-8 py-3 text-sm font-bold text-purple-950 shadow-lg shadow-pink-500/30 transition-transform duration-200 hover:scale-105 hover:shadow-pink-500/50"
                  style={dn}
                >
                  आता दान करा →
                </a>
                <a
                  href="#video"
                  className="rounded-full border border-white/30 px-8 py-3 text-sm font-bold text-white/90 backdrop-blur-sm transition-colors duration-200 hover:bg-white/10"
                  style={dn}
                >
                  आमची गोष्ट पहा
                </a>
              </div>
            </div>

            {/* Right: rectangular video frame */}
            <div id="video" className="animate-fade-up-delay flex justify-center">
              <div className="relative w-full max-w-md">
                <div
                  className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-amber-400 via-pink-500 to-purple-600 opacity-70 blur-md animate-pulse-slow"
                  aria-hidden="true"
                />
                <div className="relative aspect-video w-full overflow-hidden rounded-3xl border border-white/10 bg-black shadow-2xl">
                  <iframe
                    className="h-full w-full"
                    src="https://www.youtube.com/embed/5Lgg3-K0uTw?controls=1&rel=0&modestbranding=1"
                    title="Trust Video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ===== IMPACT STATS ===== */}
      <section className="bg-[#120c30] px-4 py-12">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 sm:grid-cols-4">
          {impactStats.map((s, i) => (
            <div
              key={i}
              className="animate-fade-up rounded-2xl border border-white/10 bg-white/5 p-5 text-center transition-transform duration-200 hover:-translate-y-1 hover:bg-white/10"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="mb-2 text-3xl">{s.icon}</div>
              <div className="text-2xl font-extrabold text-amber-300">{s.value}</div>
              <div className="mt-1 text-xs text-purple-200" style={dn}>{s.label}</div>
              <div className="text-[11px] text-purple-400">{s.labelEn}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== CAUSES ===== */}
      <section className="bg-[#0b0a1f] px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-pink-400">
              तुमचे दान कुठे जाते
            </span>
            <h2 className="mt-2 text-3xl font-extrabold sm:text-4xl" style={dn}>
              आम्ही कशासाठी काम करतो
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {causes.map((c, i) => (
              <div
                key={i}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition-all duration-300 hover:-translate-y-2 hover:border-white/20 hover:shadow-xl"
              >
                <div
                  className={`mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${c.color} text-2xl shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}
                >
                  {c.icon}
                </div>
                <h3 className="mb-2 text-lg font-bold" style={dn}>{c.title}</h3>
                <p className="text-sm leading-relaxed text-purple-200" style={dn}>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== DONATE FORM ===== */}
      <section id="donate-form" className="relative overflow-hidden px-4 py-20">
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "linear-gradient(160deg,#1a1040 0%,#3b1378 40%,#6d28d9 75%,#c026d3 100%)",
          }}
        />
        <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-96 w-96 -translate-x-1/2 animate-pulse-slow rounded-full bg-pink-500/20 blur-3xl" />

        <div className="relative mx-auto max-w-2xl">
          <div className="rounded-3xl border border-white/15 bg-white/[0.07] p-6 backdrop-blur-md sm:p-10">
            <div className="mb-6 text-center">
              <h2 className="text-2xl font-extrabold sm:text-3xl" style={dn}>
                आज तुमची देणगी द्या
              </h2>
              <p className="mt-2 text-sm text-purple-200" style={dn}>
                १००% रक्कम थेट गरजूंपर्यंत पोहोचते
              </p>
            </div>

            {/* amount selection */}
            <div className="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {amounts.map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => { setSelectedAmount(amt); setCustomAmount(""); }}
                  className={`rounded-xl border px-3 py-3 text-sm font-bold transition-all duration-200 ${
                    selectedAmount === amt && !customAmount
                      ? "border-amber-400 bg-gradient-to-r from-amber-400 to-pink-500 text-purple-950 shadow-lg shadow-pink-500/30"
                      : "border-white/20 bg-white/5 text-white hover:border-white/40 hover:bg-white/10"
                  }`}
                >
                  ₹{amt.toLocaleString("en-IN")}
                </button>
              ))}
            </div>

            {/* custom amount */}
            <div className="mb-6">
              <label className="mb-1.5 block text-xs font-semibold text-purple-300" style={dn}>
                किंवा रक्कम स्वतः लिहा
              </label>
              <div className="flex items-center overflow-hidden rounded-xl border border-white/20 bg-white/5 focus-within:border-amber-400 transition-colors">
                <span className="px-3 text-purple-300">₹</span>
                <input
                  type="number"
                  min="1"
                  placeholder="उदा. ७५१"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  className="w-full bg-transparent py-3 pr-4 text-sm text-white placeholder-purple-400 outline-none"
                />
              </div>
            </div>

            <button
              type="button"
              className="w-full rounded-full bg-gradient-to-r from-amber-400 via-pink-500 to-fuchsia-500 py-3.5 text-base font-extrabold text-purple-950 shadow-lg shadow-pink-500/30 transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
              style={dn}
            >
              ₹{Number(finalAmount || 0).toLocaleString("en-IN")} दान करा →
            </button>

            <p className="mt-4 text-center text-xs text-purple-300" style={dn}>
              सर्व देणग्या कलम ८०जी अंतर्गत करमुक्त आहेत 🔒 सुरक्षित पेमेंट
            </p>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes fadeUp { from { opacity:0; transform:translateY(24px);} to { opacity:1; transform:translateY(0);} }
        .animate-fade-up { animation: fadeUp 0.7s ease-out both; }
        .animate-fade-up-delay { animation: fadeUp 0.8s ease-out 0.15s both; }

        @keyframes blob { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(30px,-20px) scale(1.1); } }
        .animate-blob { animation: blob 9s ease-in-out infinite; }
        .animate-blob-delay { animation: blob 11s ease-in-out infinite reverse; }

        @keyframes pulseSlow { 0%,100% { opacity:0.5; } 50% { opacity:0.85; } }
        .animate-pulse-slow { animation: pulseSlow 4s ease-in-out infinite; }
      `}</style>
    </div>
  );
}