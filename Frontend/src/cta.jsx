import { useState, useEffect, useRef } from "react";

const TelegramIcon = ({ className = "w-12 h-12" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="white" className={className}>
    <path d="M5.83 23.616L42.128 9.232c1.112-.432 2.088.268 1.8 1.756l-5.656 26.636c-.412 1.828-1.492 2.28-3.024 1.42l-8.232-6.072-3.972 3.828c-.448.444-.824.816-1.672.816l.584-8.452 15.404-13.916c.672-.596-.144-.928-1.04-.332L14.284 28.104l-8.032-2.512c-1.748-.548-1.788-1.748.36-2.576z" />
  </svg>
);

const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={1.8} className="w-7 h-7">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0L12 13.5 2.25 6.75" />
  </svg>
);

export default function CTA() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [visible, setVisible] = useState(false);
  const [btnPulse, setBtnPulse] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setBtnPulse(true);
      setTimeout(() => setBtnPulse(false), 700);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  const handleSubscribe = () => {
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 3000);
      setEmail("");
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;600;700;800;900&display=swap');

        .cta-root { font-family: 'Noto Sans Devanagari', sans-serif; }

        /* ── Entrance ── */
        .cta-card {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.65s cubic-bezier(.4,0,.2,1), transform 0.65s cubic-bezier(.4,0,.2,1);
        }
        .cta-card.in { opacity: 1; transform: translateY(0); }

        .fade-left {
          opacity: 0; transform: translateX(-30px);
          transition: opacity 0.7s 0.2s ease, transform 0.7s 0.2s ease;
        }
        .fade-left.in { opacity: 1; transform: translateX(0); }

        .fade-right {
          opacity: 0; transform: translateX(30px);
          transition: opacity 0.7s 0.35s ease, transform 0.7s 0.35s ease;
        }
        .fade-right.in { opacity: 1; transform: translateX(0); }

        /* ── Float icon ── */
        @keyframes float {
          0%,100% { transform: translateY(0); }
          50%      { transform: translateY(-7px); }
        }
        .float { animation: float 3s ease-in-out infinite; }

        /* ── Donate pulse ── */
        @keyframes donateGlow {
          0%   { box-shadow: 0 0 0 0 rgba(244,196,61,0.75); }
          70%  { box-shadow: 0 0 0 12px rgba(244,196,61,0); }
          100% { box-shadow: 0 0 0 0 rgba(244,196,61,0); }
        }
        .donate-pulse { animation: donateGlow 0.7s ease; }

        /* ── Mail ring ── */
        @keyframes ringGlow {
          0%,100% { box-shadow: 0 0 0 0 rgba(255,255,255,0.35); }
          50%      { box-shadow: 0 0 0 8px rgba(255,255,255,0); }
        }
        .mail-ring { animation: ringGlow 2.6s ease-in-out infinite; }

        /* ── Success pop ── */
        @keyframes successPop {
          0%   { transform: scale(0.85); opacity: 0; }
          60%  { transform: scale(1.04); }
          100% { transform: scale(1); opacity: 1; }
        }
        .success-pop { animation: successPop 0.38s ease forwards; }

        /* ── Buttons ── */
        .donate-btn {
          transition: background 0.2s, transform 0.15s;
        }
        .donate-btn:hover { background: #ffd94d; transform: scale(1.04); }
        .donate-btn:active { transform: scale(0.97); }

        .sub-btn { transition: background 0.2s, transform 0.15s; }
        .sub-btn:hover { background: #041454; transform: scale(1.02); }
        .sub-btn:active { transform: scale(0.97); }

        .email-input:focus { outline: none; }
      `}</style>

      <section ref={sectionRef} className="cta-root w-full py-6 px-4 sm:px-6">
        <div className={`cta-card relative rounded-[24px] overflow-hidden shadow-2xl min-h-[205px] ${visible ? "in" : ""}`}>

          {/* ══════════════════════════════════════════
              DESKTOP LAYOUT — side by side with SVG diagonal divider
              MOBILE LAYOUT  — stacked, no diagonal
          ══════════════════════════════════════════ */}

          {/* ── Desktop: single SVG background that draws BOTH halves + diagonal ── */}
          <div className="hidden md:block absolute inset-0 w-full h-full">
            <svg
              className="w-full h-full"
              viewBox="0 0 1000 205"
              preserveAspectRatio="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="leftGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%"   stopColor="#ff006e" />
                  <stop offset="55%"  stopColor="#ff3d4d" />
                  <stop offset="100%" stopColor="#ff623d" />
                </linearGradient>
                <linearGradient id="rightGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%"   stopColor="#1a45b0" />
                  <stop offset="60%"  stopColor="#1f87d7" />
                  <stop offset="100%" stopColor="#25c5cf" />
                </linearGradient>
              </defs>
              {/* Left pink-red panel */}
              <polygon points="0,0 560,0 510,205 0,205" fill="url(#leftGrad)" />
              {/* Right blue-teal panel — covers the rest including behind the slant */}
              <polygon points="510,0 1000,0 1000,205 460,205" fill="url(#rightGrad)" />
              {/* Dark blue overlap strip that sits on the seam */}
              <polygon points="500,0 560,0 510,205 450,205" fill="#1f4dbb" />
            </svg>
          </div>

          {/* ── Mobile: two stacked colour blocks ── */}
          <div className="md:hidden absolute inset-0 flex flex-col">
            <div className="flex-1" style={{ background: "linear-gradient(135deg,#ff006e 0%,#ff3d4d 60%,#ff623d 100%)" }} />
            <div className="flex-1" style={{ background: "linear-gradient(135deg,#1a45b0 0%,#1f87d7 60%,#25c5cf 100%)" }} />
          </div>

          {/* ── Content ── */}
          <div className="relative z-10 flex flex-col md:flex-row h-full">

            {/* LEFT — Donate */}
            <div className={`fade-left md:w-[50%] flex items-center px-6 sm:px-10 py-8 ${visible ? "in" : ""}`}>
              <div className="mr-5 sm:mr-6 flex-shrink-0 float">
                <TelegramIcon className="w-12 h-12 sm:w-14 sm:h-14" />
              </div>
              <div>
                <h2 className="text-white text-[20px] sm:text-[26px] lg:text-[29px] font-extrabold leading-snug">
                  आजच आपणही या परिवर्तनाचा भाग व्हा!
                </h2>
                <p className="text-white/90 mt-2 text-[14px] sm:text-[16px] lg:text-[17px]">
                  आपले एक पाऊल, अनेकांचे जीवन उजळेल.
                </p>
                <button
                  className={`donate-btn mt-4 sm:mt-5 bg-[#f4c43d] text-black font-bold text-[14px] sm:text-[17px] px-7 sm:px-9 py-[10px] sm:py-3 rounded-full ${btnPulse ? "donate-pulse" : ""}`}
                >
                  दान करा आणि मदत करा ❤️
                </button>
              </div>
            </div>

            {/* RIGHT — Subscribe */}
            <div className={`fade-right md:w-[50%] flex items-center px-6 sm:px-10 py-8 ${visible ? "in" : ""}`}>
              <div className="mr-5 sm:mr-6 flex-shrink-0">
                <div className="mail-ring w-14 h-14 sm:w-[62px] sm:h-[62px] rounded-full border-2 border-white flex items-center justify-center">
                  <MailIcon />
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <h2 className="text-white text-[20px] sm:text-[26px] lg:text-[29px] font-extrabold leading-snug">
                  नवीन अपडेट्स मिळवा
                </h2>
                <p className="text-white/90 mt-2 mb-4 sm:mb-5 text-[14px] sm:text-[16px] lg:text-[17px]">
                  आमच्या उपक्रमांची माहिती तुमच्या ईमेलवर मिळवा.
                </p>

                {subscribed ? (
                  <div className="success-pop bg-white/20 backdrop-blur-sm text-white font-semibold text-[15px] px-5 py-4 rounded-md">
                    ✅ सबस्क्रिप्शन यशस्वी! धन्यवाद 🙏
                  </div>
                ) : (
                  <div className="flex w-full max-w-[500px] overflow-hidden rounded-[6px] shadow-lg">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
                      placeholder="आपला ईमेल प्रविष्ट करा"
                      className="email-input flex-1 h-[50px] sm:h-[56px] px-4 sm:px-5 text-[14px] sm:text-[16px] text-gray-600 bg-white"
                    />
                    <button
                      onClick={handleSubscribe}
                      className="sub-btn h-[50px] sm:h-[56px] px-4 sm:px-7 bg-[#061c74] text-white font-bold text-[13px] sm:text-[15px] whitespace-nowrap flex items-center gap-2"
                    >
                      सबस्क्राईब करा
                      <TelegramIcon className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}