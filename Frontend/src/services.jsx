/**
 * Services.jsx
 *
 * IMPORTS NEEDED in your project:
 <Services />
 */

import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

// ── SVG Icons (for new cards) ───────────────────────────────────
const BloodIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7" style={{ color: '#E91E8C' }}>
    <path d="M12 2C12 2 5 10.5 5 15a7 7 0 0 0 14 0C19 10.5 12 2 12 2z" />
  </svg>
)

const HeartHandIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7" style={{ color: '#16A34A' }}>
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
)

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7" style={{ color: '#2563EB' }}>
    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
  </svg>
)

const GraduationIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7" style={{ color: '#EA580C' }}>
    <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zm0 12.08L4.95 11 12 7.08 19.05 11 12 15.08z" />
    <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z" />
  </svg>
)

// ── Service data ────────────────────────────────────────────────
const services = [
  {
    icon: <BloodIcon />,
    gradient: 'from-pink-500 to-fuchsia-700',
    glow: 'rgba(233,30,140,0.45)',
    titleColor: '#E91E8C',
    title: 'ब्लड डोनेशन',
    desc: 'रक्तदान करा आणि जीव वाचवा',
    link: '/blood-donation',
  },
  {
    icon: <HeartHandIcon />,
    gradient: 'from-green-400 to-green-600',
    glow: 'rgba(22,163,74,0.45)',
    titleColor: '#16A34A',
    title: 'मदत आणि सेवा',
    desc: 'गरजूंना मदत आणि सहकार्य',
    link: '/donate-poor',
  },
  {
    icon: <PhoneIcon />,
    gradient: 'from-blue-500 to-blue-700',
    glow: 'rgba(37,99,235,0.45)',
    titleColor: '#2563EB',
    title: 'हेल्पलाईन',
    desc: 'त्वरित संपर्क आणि सहाय्य',
  },
  {
    icon: <GraduationIcon />,
    gradient: 'from-orange-400 to-orange-600',
    glow: 'rgba(234,88,12,0.45)',
    titleColor: '#EA580C',
    title: 'शिक्षण सहाय्य',
    desc: 'शिक्षणासाठी मार्गदर्शन व मदत',
  },
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
  // ── New cards (icon-based, same card/animation system) ──
  
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

      {/* ── Grid: 6 cards per row → 2 rows of 6 (12 total) ── */}
      <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {services.map((svc, i) => (
          <ServiceCard key={i} svc={svc} delay={i * 70} />
        ))}
      </div>
    </section>
  )
}

// ── Individual card ──────────────────────────────────────────────
function ServiceCard({ svc, delay }) {
  const navigate = useNavigate()
  return (
    <div
      onClick={() => svc.link && navigate(svc.link)}
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

      {/* Icon bubble — supports emoji OR svg icon component, same animation either way */}
      <div
        className={`icon-bubble icon-enter mb-3 w-14 h-14 rounded-full bg-gradient-to-br ${svc.gradient}
                    flex items-center justify-center shadow-lg`}
        style={{ animationDelay: `${delay + 120}ms` }}
      >
        {svc.icon ? (
          <span className="text-white [&>svg]:fill-white">{svc.icon}</span>
        ) : (
          <span className="text-2xl select-none" role="img" aria-hidden="true">
            {svc.emoji}
          </span>
        )}
      </div>

      {/* Title */}
      <p
        className="font-extrabold text-[15px] leading-tight mb-1.5 uppercase tracking-wide"
        style={{ color: svc.titleColor, fontFamily: "'Noto Sans Devanagari', sans-serif" }}
      >
        {svc.title}
      </p>

      {/* Description */}
      <p
        className="text-gray-500 text-[13px] leading-snug"
        style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
      >
        {svc.desc}
      </p>
    </div>
  )
}