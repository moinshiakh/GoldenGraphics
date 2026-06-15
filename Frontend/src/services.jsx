/**
 * Services.jsx
 *
 * IMPORTS NEEDED in your project:
 <Services />
 */

import { useEffect, useRef } from 'react'

// ── Service data ────────────────────────────────────────────────
const services = [
  {
    emoji: '👷',
    gradient: 'from-blue-500 to-blue-700',
    glow: 'rgba(59,130,246,0.45)',
    titleColor: '#2563EB',
    title: 'LABOUR SERVICE',
    desc: 'मजूर आणि कामगार सेवा व मदत',
  },
  {
    emoji: '🛒',
    gradient: 'from-green-400 to-green-600',
    glow: 'rgba(22,163,74,0.45)',
    titleColor: '#16A34A',
    title: 'SELL/BUY',
    desc: 'वस्तू खरेदी-विक्री साठी प्लॅटफॉर्म',
  },
  {
    emoji: '💑',
    gradient: 'from-pink-500 to-rose-600',
    glow: 'rgba(236,72,153,0.45)',
    titleColor: '#DB2777',
    title: 'MARRIAGE TOPIC',
    desc: 'रिश्ते शोध, माहिती आणि संपर्क सुविधा',
  },
  {
    emoji: '🏛️',
    gradient: 'from-orange-400 to-orange-600',
    glow: 'rgba(234,88,12,0.45)',
    titleColor: '#EA580C',
    title: 'NAGARPALIKA COMPLAINT',
    desc: 'तक्रार नोंदवा आणि निराकरण मिळवा',
  },
  {
    emoji: '💼',
    gradient: 'from-purple-500 to-violet-700',
    glow: 'rgba(124,58,237,0.45)',
    titleColor: '#7C3AED',
    title: 'रोजगार उपक्रम',
    desc: 'रोजगाराच्या संधी उपलब्ध करून देणे',
  },
  {
    emoji: '🚔',
    gradient: 'from-teal-400 to-teal-600',
    glow: 'rgba(13,148,136,0.45)',
    titleColor: '#0D9488',
    title: 'HELP POLICE',
    desc: 'पोलिसांना सहकार्य आणि जनजागृती उपक्रम',
  },
  {
    emoji: '👥',
    gradient: 'from-cyan-500 to-blue-600',
    glow: 'rgba(6,182,212,0.45)',
    titleColor: '#0891B2',
    title: 'समाज जागरूकता',
    desc: 'समाजात एकता आणि स्वच्छता वाढवणे',
  },
  {
    emoji: '🆘',
    gradient: 'from-red-500 to-rose-700',
    glow: 'rgba(220,38,38,0.45)',
    titleColor: '#DC2626',
    title: 'आपती मदत',
    desc: 'आपदीमध्ये त्वरित मदत आणि सहकार्य',
  },
]

// ── Keyframe styles (injected once) ─────────────────────────────
const STYLES = `
  @keyframes fadeSlideUp {
    from { opacity: 0; transform: translateY(28px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes iconPop {
    0%   { transform: scale(0.6) rotate(-10deg); opacity: 0; }
    70%  { transform: scale(1.15) rotate(4deg); }
    100% { transform: scale(1) rotate(0deg); opacity: 1; }
  }
  @keyframes shimmer {
    0%   { background-position: -200% center; }
    100% { background-position:  200% center; }
  }
  @keyframes pulse-ring {
    0%   { box-shadow: 0 0 0 0px var(--glow); }
    70%  { box-shadow: 0 0 0 8px transparent; }
    100% { box-shadow: 0 0 0 0px transparent; }
  }
  .service-card {
    animation: fadeSlideUp 0.55s cubic-bezier(.22,.68,0,1.2) both;
  }
  .service-card:hover .icon-bubble {
    animation: pulse-ring 1s ease infinite;
    transform: scale(1.08) translateY(-3px);
    transition: transform 0.25s ease;
  }
  .service-card .icon-bubble {
    transition: transform 0.25s ease;
  }
  .icon-enter {
    animation: iconPop 0.5s cubic-bezier(.22,.68,0,1.2) both;
  }
  .shimmer-title {
    background-size: 200% auto;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`

// ── Component ────────────────────────────────────────────────────
export default function Services() {
  const sectionRef = useRef(null)

  // Inject keyframes once
  useEffect(() => {
    if (document.getElementById('svc-styles')) return
    const tag = document.createElement('style')
    tag.id = 'svc-styles'
    tag.textContent = STYLES
    document.head.appendChild(tag)
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative py-14 px-4 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg,#f0f4ff 0%,#fafafa 50%,#fff5f0 100%)',
      }}
    >
      {/* Decorative background blobs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -left-24 w-72 h-72 rounded-full opacity-20 blur-3xl"
        style={{ background: 'radial-gradient(circle,#6366f1,transparent 70%)' }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -right-24 w-72 h-72 rounded-full opacity-20 blur-3xl"
        style={{ background: 'radial-gradient(circle,#f97316,transparent 70%)' }}
      />

      {/* ── Section heading ── */}
      <div className="flex items-center gap-3 justify-center mb-10">
        <span className="flex-1 max-w-20 h-px bg-gradient-to-r from-transparent via-red-400 to-red-500" />
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-red-500 shadow-sm shadow-red-300" />
          <h2
            className="text-2xl font-bold tracking-tight text-gray-800"
            style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
          >
            आमचे प्रमुख कार्यक्षेत्र
          </h2>
          <span className="w-2 h-2 rounded-full bg-red-500 shadow-sm shadow-red-300" />
        </div>
        <span className="flex-1 max-w-20 h-px bg-gradient-to-l from-transparent via-red-400 to-red-500" />
      </div>

      {/* ── Grid ── */}
      <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
        {services.map((svc, i) => (
          <ServiceCard key={i} svc={svc} delay={i * 70} />
        ))}
      </div>
    </section>
  )
}

// ── Individual card ──────────────────────────────────────────────
function ServiceCard({ svc, delay }) {
  return (
    <div
      className="service-card group relative bg-white rounded-2xl p-4 flex flex-col items-center text-center
                 border border-gray-100 cursor-pointer
                 hover:border-transparent hover:-translate-y-1
                 transition-all duration-300 ease-out"
      style={{
        animationDelay: `${delay}ms`,
        // ── hover shadow via CSS var trick (Tailwind can't do dynamic glow) ──
        '--glow': svc.glow,
        boxShadow: '0 2px 8px 0 rgba(0,0,0,0.07)',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.boxShadow = `0 12px 32px 0 ${svc.glow}`
      }}
      onMouseLeave={e => {
        e.currentTarget.style.boxShadow = '0 2px 8px 0 rgba(0,0,0,0.07)'
      }}
    >
      {/* Gradient top-border accent */}
      <div
        className={`absolute top-0 left-4 right-4 h-0.5 rounded-b-full bg-gradient-to-r ${svc.gradient}
                    opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
      />

      {/* Icon bubble */}
      <div
        className={`icon-bubble icon-enter mb-3 w-14 h-14 rounded-full bg-gradient-to-br ${svc.gradient}
                    flex items-center justify-center shadow-lg`}
        style={{ animationDelay: `${delay + 120}ms` }}
      >
        <span className="text-2xl select-none" role="img" aria-hidden="true">
          {svc.emoji}
        </span>
      </div>

      {/* Title */}
      <p
        className="font-extrabold text-[10px] leading-tight mb-1.5 uppercase tracking-wide"
        style={{ color: svc.titleColor, fontFamily: "'Noto Sans Devanagari', sans-serif" }}
      >
        {svc.title}
      </p>

      {/* Description */}
      <p
        className="text-gray-500 text-[10px] leading-snug"
        style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
      >
        {svc.desc}
      </p>
    </div>
  )
}