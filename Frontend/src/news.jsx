import { useState, useRef, useEffect } from "react";

const newsItems = [
  {
    date: "10", month: "मे", year: "2024",
    img: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&q=80",
    title: "स्वच्छता शिबिराचे आयोजन संपन्न",
    desc: "या शिबिरात 200+ स्वयंसेवकांनी सहभाग घेतला आणि परिसर स्वच्छतेचा संदेश दिला.",
  },
  {
    date: "28", month: "एप्रिल", year: "2024",
    img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=80",
    title: "युवांसाठी करिअर विकास प्रशिक्षण",
    desc: "रोजगारासाठी उपयुक्त प्रशिक्षण आणि करिअर मार्गदर्शन शिबिर.",
  },
  {
    date: "15", month: "एप्रिल", year: "2024",
    img: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&q=80",
    title: "महिला बचत गट कार्यशाळा",
    desc: "महिलांच्या आर्थिक स्वावलंबनासाठी विशेष मार्गदर्शन कार्यक्रम.",
  },
  {
    date: "05", month: "एप्रिल", year: "2024",
    img: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=80",
    title: "वृक्षारोपण मोहिम यशस्वी",
    desc: "2500 झाडे लावून पर्यावरण संवर्धनाचा संदेश दिला.",
  },
  {
    date: "22", month: "मार्च", year: "2024",
    img: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&q=80",
    title: "आरोग्य तपासणी शिबिर आयोजित",
    desc: "500 पेक्षा अधिक रुग्णांना मोफत आरोग्य सेवा पुरविण्यात आली.",
  },
  {
    date: "18", month: "मार्च", year: "2024",
    img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80",
    title: "शालेय विद्यार्थ्यांसाठी शिष्यवृत्ती",
    desc: "गरजू विद्यार्थ्यांना शिष्यवृत्ती देऊन शिक्षणास प्रोत्साहन दिले.",
  },
  {
    date: "08", month: "मार्च", year: "2024",
    img: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&q=80",
    title: "डिजिटल साक्षरता कार्यक्रम",
    desc: "ग्रामीण भागातील नागरिकांना डिजिटल तंत्रज्ञानाचे प्रशिक्षण दिले.",
  },
];

export default function News() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [dir, setDir] = useState(null);
  const timeoutRef = useRef(null);

  // Responsive visible count
  const [visibleCount, setVisibleCount] = useState(4);
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setVisibleCount(w < 640 ? 1 : w < 1024 ? 2 : 4);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const total = newsItems.length;
  const maxIndex = Math.max(0, total - visibleCount);

  const go = (direction) => {
    if (animating) return;
    const next =
      direction === "right"
        ? Math.min(current + 1, maxIndex)
        : Math.max(current - 1, 0);
    if (next === current) return;
    setDir(direction);
    setAnimating(true);
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setCurrent(next);
      setAnimating(false);
      setDir(null);
    }, 380);
  };

  const goTo = (i) => {
    if (animating || i === current) return;
    setDir(i > current ? "right" : "left");
    setAnimating(true);
    timeoutRef.current = setTimeout(() => {
      setCurrent(i);
      setAnimating(false);
      setDir(null);
    }, 380);
  };

  useEffect(() => () => clearTimeout(timeoutRef.current), []);

  const visibleItems = newsItems.slice(current, current + visibleCount);

  const gridCols =
    visibleCount === 1 ? "grid-cols-1" :
    visibleCount === 2 ? "grid-cols-2" :
    "grid-cols-4";

  const slideClass =
    animating
      ? dir === "right"
        ? "news-slide-right"
        : "news-slide-left"
      : "";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;600;700;800;900&display=swap');
        .news-root { font-family: 'Noto Sans Devanagari', sans-serif; }

        @keyframes slideFromRight {
          from { opacity: 0; transform: translateX(55px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideFromLeft {
          from { opacity: 0; transform: translateX(-55px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .news-slide-right { animation: slideFromRight 0.38s cubic-bezier(.4,0,.2,1) both; }
        .news-slide-left  { animation: slideFromLeft  0.38s cubic-bezier(.4,0,.2,1) both; }

        .news-card {
          transition: transform 0.22s ease, box-shadow 0.22s ease;
          will-change: transform;
        }
        .news-card:hover { transform: translateY(-6px); box-shadow: 0 14px 36px rgba(0,0,0,0.13); }

        .card-img { transition: transform 0.45s ease; }
        .news-card:hover .card-img { transform: scale(1.08); }

        .nav-btn { transition: transform 0.15s, opacity 0.2s; }
        .nav-btn:hover:not(:disabled) { transform: scale(1.1); }
        .nav-btn:active:not(:disabled) { transform: scale(0.94); }
        .nav-btn:disabled { opacity: 0.28; cursor: not-allowed; }

        .dot { width: 8px; height: 8px; border-radius: 50%; background: #d1d5db; cursor: pointer; transition: all 0.25s; }
        .dot.active { width: 24px; border-radius: 4px; background: #e91e8c; }
        .dot:hover:not(.active) { background: #9ca3af; }

        .read-more { transition: letter-spacing 0.2s; }
        .read-more:hover { letter-spacing: 0.02em; }
      `}</style>

      <section className="news-root bg-white py-14">
        <div className="max-w-7xl mx-auto px-8 sm:px-10">

          {/* Title */}
          <div className="flex items-center justify-center gap-3 mb-10">
            <div className="h-[2px] w-16 sm:w-24" style={{background:"linear-gradient(90deg,transparent,#e91e8c)"}} />
            <span className="w-[9px] h-[9px] rounded-full bg-[#e91e8c] flex-shrink-0" />
            <h2 className="text-[20px] sm:text-[24px] lg:text-[26px] font-extrabold text-gray-800 whitespace-nowrap">
              बातम्या आणि उपक्रम
            </h2>
            <span className="w-[9px] h-[9px] rounded-full bg-[#e91e8c] flex-shrink-0" />
            <div className="h-[2px] w-16 sm:w-24" style={{background:"linear-gradient(90deg,#e91e8c,transparent)"}} />
          </div>

          {/* Slider */}
          <div className="relative">

            {/* PREV */}
            <button
              onClick={() => go("left")}
              disabled={current === 0}
              className="nav-btn absolute -left-6 sm:-left-7 top-[88px] z-20 w-11 h-11 sm:w-[46px] sm:h-[46px] rounded-full shadow-lg flex items-center justify-center"
              style={{background:"linear-gradient(135deg,#e91e8c,#c2185b)"}}
            >
              <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5"><path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6z"/></svg>
            </button>

            {/* NEXT */}
            <button
              onClick={() => go("right")}
              disabled={current >= maxIndex}
              className="nav-btn absolute -right-6 sm:-right-7 top-[88px] z-20 w-11 h-11 sm:w-[46px] sm:h-[46px] rounded-full shadow-lg flex items-center justify-center"
              style={{background:"linear-gradient(135deg,#1565c0,#1976d2)"}}
            >
              <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z"/></svg>
            </button>

            {/* Cards */}
            <div className={`grid ${gridCols} gap-5 overflow-hidden ${slideClass}`}>
              {visibleItems.map((item, i) => (
                <div key={`${current}-${i}`} className="news-card bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col">

                  {/* Image block */}
                  <div className="relative h-[190px] overflow-hidden bg-gray-100 flex-shrink-0">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="card-img w-full h-full object-cover"
                      loading="lazy"
                    />
                    {/* Date badge */}
                    <div className="absolute bottom-3 left-3 bg-white rounded-xl shadow-md px-3 py-[5px] text-center min-w-[54px]">
                      <div className="text-[20px] font-black leading-none text-gray-800">{item.date}</div>
                      <div className="text-[11px] text-gray-500 leading-tight mt-[1px]">{item.month}</div>
                      <div className="text-[10px] text-gray-400 leading-tight">{item.year}</div>
                    </div>
                  </div>

                  {/* Text */}
                  <div className="p-4 flex flex-col gap-2 flex-1">
                    <h3 className="font-extrabold text-[14px] sm:text-[15px] text-gray-800 leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-gray-500 text-[12px] sm:text-[13px] leading-relaxed flex-1">
                      {item.desc}
                    </p>
                    <a href="#" className="read-more text-[#1565c0] font-bold text-[13px] mt-1 inline-block">
                      वाचा अधिक →
                    </a>
                  </div>

                </div>
              ))}
            </div>
          </div>

          {/* Dots */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <div key={i} className={`dot ${current === i ? "active" : ""}`} onClick={() => goTo(i)} />
            ))}
          </div>

        </div>
      </section>
    </>
  );
}