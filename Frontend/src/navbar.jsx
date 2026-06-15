import { useState } from "react";

const navLinks = [
  "होम",
  "आमच्याबद्दल",
  "सेवा",
  "उपक्रम",
  "गॅलरी",
  "बातम्या",
  "संपर्क",
];

/* ── SVG Icons ── */
const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);
const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" stroke="none" />
  </svg>
);
const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);
const YoutubeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.96-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
    <polygon fill="white" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
  </svg>
);
const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 shrink-0">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);
const MailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 shrink-0">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);
const HeartIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 shrink-0">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);
const MenuIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
    <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);
const CloseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const socials = [
  { icon: <FacebookIcon />, bg: "bg-blue-600 hover:bg-blue-700", label: "Facebook" },
  { icon: <InstagramIcon />, bg: "bg-pink-500 hover:bg-pink-600", label: "Instagram" },
  { icon: <TwitterIcon />, bg: "bg-sky-500 hover:bg-sky-600", label: "Twitter" },
  { icon: <YoutubeIcon />, bg: "bg-red-600 hover:bg-red-700", label: "YouTube" },
];

export default function Navbar() {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);

  return (
    <header
      className="w-full bg-white shadow-sm sticky top-0 z-50"
      style={{ fontFamily: "'Noto Sans Devanagari', 'Mukta', sans-serif" }}
    >
      {/* ═══════════════════════════════════════
          TOP BAR  —  3-column grid
          [Logo] | [Contact] | [Socials + Donate]
      ═══════════════════════════════════════ */}
      <div className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 grid grid-cols-[auto_1fr_auto] items-center gap-4">

          {/* Col 1 — Logo */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-12 h-12 rounded-full border-2 border-yellow-500 bg-green-800 flex items-center justify-center shrink-0">
              <svg viewBox="0 0 48 48" className="w-11 h-11" fill="none">
                <circle cx="24" cy="24" r="23" fill="#166534" />
                <polygon points="24,8 27,18 38,18 29,25 32,36 24,29 16,36 19,25 10,18 21,18" fill="#eab308" opacity="0.85" />
                <circle cx="24" cy="24" r="5" fill="#166534" />
                <line x1="18" y1="18" x2="30" y2="30" stroke="white" strokeWidth="1.5" />
                <line x1="30" y1="18" x2="18" y2="30" stroke="white" strokeWidth="1.5" />
              </svg>
            </div>
            <div>
              <div className="text-green-800 font-bold text-xl leading-tight">खुशहाल मुशायरा</div>
              <div className="text-gray-400 text-xs leading-snug">सोशल वेलफेअर &amp; चॅरिटेबल ट्रस्ट, महाराष्ट्र</div>
            </div>
          </div>

          {/* Col 2 — Contact (centered) */}
          <div className="hidden md:flex items-center justify-center gap-6 text-sm text-gray-700">
            <a href="tel:+918800123456" className="flex items-center gap-1.5 hover:text-pink-600 transition-colors">
              <span className="text-pink-500"><PhoneIcon /></span>
              +91 8800 123 456
            </a>
            <a href="mailto:info@khnubook.org" className="flex items-center gap-1.5 hover:text-pink-600 transition-colors">
              <span className="text-gray-400"><MailIcon /></span>
              info@khnubook.org
            </a>
          </div>

          {/* Col 3 — Socials + Donate */}
          <div className="hidden md:flex items-center gap-2 shrink-0">
            {socials.map((s) => (
              <a
                key={s.label}
                href="#"
                aria-label={s.label}
                className={`w-8 h-8 rounded-full ${s.bg} flex items-center justify-center text-white transition-colors`}
              >
                {s.icon}
              </a>
            ))}
            <button className="ml-2 flex items-center gap-1.5 bg-pink-600 hover:bg-pink-700 active:scale-95 text-white text-sm font-semibold px-5 py-2 rounded-full transition-all shadow-sm">
              दान करा <HeartIcon />
            </button>
          </div>

          {/* Hamburger (mobile only) */}
          <button
            className="md:hidden p-1.5 rounded-md text-gray-600 hover:bg-gray-100 transition-colors"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* ═══════════════════════════════════════
          NAV BAR — links centered
      ═══════════════════════════════════════ */}
      <nav className="hidden md:block bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <ul className="flex items-center justify-center gap-1 text-sm font-semibold text-gray-800">
            {navLinks.map((link, i) => (
              <li key={i}>
                <button
                  onClick={() => setActive(i)}
                  className={`relative px-4 py-3 transition-colors ${
                    active === i ? "text-red-600" : "hover:text-red-500"
                  }`}
                >
                  {link}
                  <span
                    className={`absolute bottom-0 left-3 right-3 h-0.5 rounded-full transition-all duration-200 ${
                      active === i ? "bg-red-500" : "bg-transparent"
                    }`}
                  />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* ═══════════════════════════════════════
          MOBILE DRAWER
      ═══════════════════════════════════════ */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          open ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        } bg-white border-t border-gray-100`}
      >
        {/* Mobile contact */}
        <div className="px-4 pt-3 pb-2 border-b border-gray-100 flex flex-col gap-2 text-sm text-gray-700">
          <a href="tel:+918800123456" className="flex items-center gap-2 hover:text-pink-600 transition-colors">
            <span className="text-pink-500"><PhoneIcon /></span>+91 8800 123 456
          </a>
          <a href="mailto:info@khnubook.org" className="flex items-center gap-2 hover:text-pink-600 transition-colors">
            <span className="text-gray-400"><MailIcon /></span>info@khnubook.org
          </a>
          <div className="flex items-center gap-2 mt-1">
            {socials.map((s) => (
              <a key={s.label} href="#" aria-label={s.label}
                className={`w-8 h-8 rounded-full ${s.bg} flex items-center justify-center text-white transition-colors`}>
                {s.icon}
              </a>
            ))}
          </div>
          <button className="mt-1 flex items-center justify-center gap-1.5 bg-pink-600 hover:bg-pink-700 text-white text-sm font-semibold px-5 py-2 rounded-full transition-all w-full">
            दान करा <HeartIcon />
          </button>
        </div>

        {/* Mobile nav links */}
        <ul className="flex flex-col px-2 py-1">
          {navLinks.map((link, i) => (
            <li key={i}>
              <button
                onClick={() => { setActive(i); setOpen(false); }}
                className={`w-full text-left px-4 py-3 rounded-lg text-sm font-semibold transition-colors ${
                  active === i ? "text-red-600 bg-red-50" : "text-gray-700 hover:text-red-500 hover:bg-gray-50"
                }`}
              >
                {link}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}