import React, { useState, useEffect, useRef } from "react";
import Navbar from "./navbar";
import Footer from "./footer";
import { useLang } from "./useLang";

// ─── Design Tokens ────────────────────────────────────────────────────────────
const T = {
  bg:           "#f8faf5",
  card:         "#ffffff",
  border:       "#e2e8d8",
  navy:         "#0d2236",
  green:        "#1a6b35",
  greenDark:    "#0f4a22",
  greenMid:     "#22863a",
  greenLight:   "#e8f5ee",
  greenPale:    "#f0faf4",
  saffron:      "#e87722",
  saffronLight: "#fff3e0",
  amber:        "#d97706",
  gold:         "#f59e0b",
  red:          "#dc2626",
  pink:         "#db2777",
  purple:       "#7c3aed",
  teal:         "#0891b2",
  font:         "'Noto Sans Devanagari','Inter','Segoe UI',system-ui,sans-serif",
  shadow:       "0 2px 12px rgba(13,34,54,0.08)",
  shadowMd:     "0 4px 20px rgba(13,34,54,0.12)",
  shadowLg:     "0 8px 40px rgba(13,34,54,0.16)",
  radius:       "12px",
  radiusSm:     "8px",
  radiusLg:     "18px",
  radiusXl:     "24px",
};

// ─── Global Styles ────────────────────────────────────────────────────────────
const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700;800;900&display=swap');
*,*::before,*::after{box-sizing:border-box;}
body{font-family:${T.font};background:${T.bg};margin:0;}

@keyframes fadeUp    {from{opacity:0;transform:translateY(24px);}to{opacity:1;transform:translateY(0);}}
@keyframes fadeLeft  {from{opacity:0;transform:translateX(20px);}to{opacity:1;transform:translateX(0);}}
@keyframes fadeRight {from{opacity:0;transform:translateX(-20px);}to{opacity:1;transform:translateX(0);}}
@keyframes scaleIn   {from{opacity:0;transform:scale(.88);}to{opacity:1;transform:scale(1);}}
@keyframes float     {0%,100%{transform:translateY(0);}50%{transform:translateY(-10px);}}
@keyframes pulse     {0%,100%{box-shadow:0 0 0 0 rgba(26,107,53,.45);}50%{box-shadow:0 0 0 14px rgba(26,107,53,0);}}
@keyframes pulseSaffron{0%,100%{box-shadow:0 0 0 0 rgba(232,119,34,.45);}50%{box-shadow:0 0 0 14px rgba(232,119,34,0);}}
@keyframes shimmer   {0%{background-position:-600px 0;}100%{background-position:600px 0;}}
@keyframes globeBounce{0%,100%{transform:translateY(0) scale(1);}50%{transform:translateY(-5px) scale(1.07);}}
@keyframes spin      {from{transform:rotate(0deg);}to{transform:rotate(360deg);}}
@keyframes leafSway  {0%,100%{transform:rotate(-6deg);}50%{transform:rotate(6deg);}}
@keyframes cartBounce{0%{transform:scale(1);}40%{transform:scale(1.25);}70%{transform:scale(.9);}100%{transform:scale(1);}}
@keyframes marqueeL  {from{transform:translateX(0);}to{transform:translateX(-50%);}}
@keyframes badgePop  {0%{transform:scale(.7);opacity:0;}60%{transform:scale(1.15);}100%{transform:scale(1);opacity:1;}}

/* buttons */
.btn-green{background:linear-gradient(135deg,${T.green} 0%,${T.greenDark} 100%);color:#fff;border:none;border-radius:${T.radius};padding:13px 26px;font-family:${T.font};font-weight:700;font-size:.9rem;cursor:pointer;display:inline-flex;align-items:center;gap:8px;transition:all .22s ease;box-shadow:0 4px 16px rgba(26,107,53,.3);}
.btn-green:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgba(26,107,53,.45);}
.btn-saffron{background:linear-gradient(135deg,${T.saffron},${T.amber});color:#fff;border:none;border-radius:${T.radius};padding:11px 22px;font-family:${T.font};font-weight:700;font-size:.88rem;cursor:pointer;display:inline-flex;align-items:center;gap:7px;transition:all .2s ease;box-shadow:0 4px 16px rgba(232,119,34,.3);}
.btn-saffron:hover{transform:translateY(-2px);box-shadow:0 8px 22px rgba(232,119,34,.45);}
.btn-outline-green{background:transparent;color:${T.green};border:2px solid ${T.green};border-radius:${T.radius};padding:10px 20px;font-family:${T.font};font-weight:600;font-size:.85rem;cursor:pointer;display:inline-flex;align-items:center;gap:6px;transition:all .2s ease;}
.btn-outline-green:hover{background:${T.green};color:#fff;}
.btn-cart{background:${T.green};color:#fff;border:none;border-radius:${T.radiusSm};padding:8px 14px;font-family:${T.font};font-weight:700;font-size:.8rem;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:6px;width:100%;transition:all .2s ease;}
.btn-cart:hover{background:${T.greenDark};transform:scale(1.02);}
.btn-cart:active .cart-icon{animation:cartBounce .35s ease;}

/* cards */
.product-card{transition:transform .22s ease,box-shadow .22s ease;cursor:pointer;}
.product-card:hover{transform:translateY(-5px);box-shadow:${T.shadowLg};}
.cat-circle{transition:transform .2s cubic-bezier(.34,1.56,.64,1),box-shadow .2s ease;cursor:pointer;}
.cat-circle:hover{transform:scale(1.09);box-shadow:${T.shadowMd};}
.benefit-card{transition:transform .18s ease,box-shadow .18s ease;}
.benefit-card:hover{transform:translateY(-3px);box-shadow:${T.shadowMd};}
.testimonial-card{transition:transform .2s ease,box-shadow .2s ease;}
.testimonial-card:hover{transform:translateY(-4px);box-shadow:${T.shadowLg};}

/* ticker */
.ticker-wrap{overflow:hidden;background:${T.green};border-bottom:3px solid ${T.saffron};}
.ticker-track{display:flex;gap:48px;white-space:nowrap;animation:marqueeL 20s linear infinite;}
.ticker-track:hover{animation-play-state:paused;}

/* check items */
.chk{display:flex;align-items:flex-start;gap:8px;margin-bottom:7px;font-size:.84rem;color:#374151;}
.chk-dot{width:18px;height:18px;border-radius:50%;background:${T.green};color:#fff;display:flex;align-items:center;justify-content:center;font-size:10px;flex-shrink:0;margin-top:1px;}

/* section title flourish */
.section-title{text-align:center;margin-bottom:20px;}
.section-title h2{font-size:clamp(1.2rem,3vw,1.6rem);color:${T.navy};fontWeight:800;margin:0 0 4px;display:inline-flex;align-items:center;gap:10px;}
.section-title .leaf{font-size:1.1rem;animation:leafSway 2.5s ease-in-out infinite;display:inline-block;}

/* globefab */
.globe-fab{animation:globeBounce 3s ease-in-out infinite;transition:box-shadow .15s ease;}
.globe-fab:hover{animation:none;transform:scale(1.12);box-shadow:0 6px 24px rgba(232,119,34,.55)!important;}

/* badge */
.bestseller-badge{animation:badgePop .4s cubic-bezier(.34,1.56,.64,1) both;}

@media(max-width:720px){
  .desktop-only{display:none!important;}
  .hero-grid{grid-template-columns:1fr!important;}
  .cats-grid{grid-template-columns:repeat(5,1fr)!important;}
  .products-grid{grid-template-columns:repeat(2,1fr)!important;}
  .benefits-grid{grid-template-columns:repeat(2,1fr)!important;}
  .two-col{grid-template-columns:1fr!important;}
  .stats-grid{grid-template-columns:repeat(2,1fr)!important;}
  .footer-cta-grid{grid-template-columns:1fr!important;}
  .testimonials-grid{grid-template-columns:1fr!important;}
}
@media(min-width:721px){.mobile-only{display:none!important;}}
`;

// ─── Data ─────────────────────────────────────────────────────────────────────
const CATEGORIES = [
  { id:1,  icon:"🌶️", img:"https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=200&q=70", name_mr:"मसाला और पाउडर",          name_en:"Spices & Powder",        color:"#dc2626" },
  { id:2,  icon:"🥭", img:"https://images.unsplash.com/photo-1571680322279-a226e6a4cc2a?w=200&q=70", name_mr:"आचार, चटनी और सॉस",        name_en:"Pickles, Chutney & Sauce",color:"#d97706" },
  { id:3,  icon:"🌾", img:"https://images.unsplash.com/photo-1586201375761-83865001e31c?w=200&q=70", name_mr:"अनाज और दालें",            name_en:"Grains & Pulses",         color:"#ca8a04" },
  { id:4,  icon:"🍃", img:"https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200&q=70", name_mr:"हेल्दी स्नैक्स और मिलेट",    name_en:"Healthy Snacks & Millets", color:"#16a34a" },
  { id:5,  icon:"🍵", img:"https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=200&q=70", name_mr:"हर्बल टी और हेल्थ ड्रिंक",  name_en:"Herbal Tea & Health Drink",color:"#0891b2" },
  { id:6,  icon:"🛢️", img:"https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=200&q=70", name_mr:"तेल और घरेलू उत्पाद",       name_en:"Oil & Household Products", color:"#ea580c" },
  { id:7,  icon:"🧴", img:"https://images.unsplash.com/photo-1556228720-195a672e8a03?w=200&q=70", name_mr:"पर्सनल केयर उत्पाद",         name_en:"Personal Care Products",  color:"#db2777" },
  { id:8,  icon:"🧹", img:"https://images.unsplash.com/photo-1563453392212-326f5e854473?w=200&q=70", name_mr:"हाउसहोल्ड क्लीनिंग",        name_en:"Household Cleaning",      color:"#7c3aed" },
  { id:9,  icon:"🤲", img:"https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=200&q=70", name_mr:"हस्तनिर्मित उत्पाद",         name_en:"Handmade Products",       color:"#b45309" },
  { id:10, icon:"🎁", img:"https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=200&q=70", name_mr:"गिफ्ट पैक और कॉम्बो",       name_en:"Gift Packs & Combos",     color:"#e11d48" },
];

const PRODUCTS = [
  { id:1, name_mr:"घरगुती मसाला सेट (5 प्रकार)",    name_en:"Home Masala Set (5 Types)",      price:299, mrp:349, img:"https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300&q=75", badge_mr:"बेस्टसेलर", badge_en:"Bestseller", badgeColor:T.saffron, unit_mr:"1 सेट",    unit_en:"1 Set" },
  { id:2, name_mr:"होममेड मिक्स आचार (500 gm)",     name_en:"Homemade Mix Pickle (500 gm)",   price:199, mrp:249, img:"https://images.unsplash.com/photo-1571680322279-a226e6a4cc2a?w=300&q=75", badge_mr:"नई",       badge_en:"New",       badgeColor:T.green,   unit_mr:"500 gm",  unit_en:"500 gm" },
  { id:3, name_mr:"मिलेट कुकीज़ (250 gm)",           name_en:"Millet Cookies (250 gm)",        price:149, mrp:199, img:"https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=300&q=75", badge_mr:"हेल्दी",   badge_en:"Healthy",   badgeColor:T.teal,    unit_mr:"250 gm",  unit_en:"250 gm" },
  { id:4, name_mr:"हर्बल टी (100 gm)",               name_en:"Herbal Tea (100 gm)",            price:129, mrp:169, img:"https://images.unsplash.com/photo-1534353436294-0dbd4bdac845?w=300&q=75", badge_mr:"नेचुरल",   badge_en:"Natural",   badgeColor:"#16a34a", unit_mr:"100 gm",  unit_en:"100 gm" },
  { id:5, name_mr:"कोल्ड प्रेस्ड तेल (1 Ltr)",       name_en:"Cold Pressed Oil (1 Ltr)",       price:299, mrp:349, img:"https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300&q=75", badge_mr:"ऑर्गेनिक", badge_en:"Organic",   badgeColor:T.green,   unit_mr:"1 Ltr",   unit_en:"1 Ltr" },
  { id:6, name_mr:"नेचुरल हर्बल साबुन (Pack of 4)",  name_en:"Natural Herbal Soap (Pack of 4)", price:199, mrp:249, img:"https://images.unsplash.com/photo-1602928321679-560bb453f190?w=300&q=75", badge_mr:"हस्तनिर्मित",badge_en:"Handmade",  badgeColor:T.purple,  unit_mr:"Pack of 4",unit_en:"Pack of 4" },
];

const BENEFITS = [
  { icon:"👩",  color:T.pink,    bg:"#fdf2f8", title_mr:"महिलाओं के लिए विशेष अवसर",   title_en:"Special Opportunities for Women"  },
  { icon:"📈",  color:T.green,   bg:T.greenPale, title_mr:"घरेलू व्यवसाय की ट्रेनिंग", title_en:"Home Business Training"           },
  { icon:"💰",  color:T.saffron, bg:T.saffronLight, title_mr:"कम निवेश अधिक आय",       title_en:"Low Investment High Income"       },
  { icon:"🏠",  color:T.blue,    bg:"#eff6ff", title_mr:"घर बैठे काम की सुविधा",       title_en:"Work from Home Convenience"       },
  { icon:"🌿",  color:T.teal,    bg:"#f0fdfa", title_mr:"गुणवत्तापूर्ण FMCG उत्पाद",   title_en:"Quality FMCG Products"            },
  { icon:"❤️",  color:T.red,     bg:"#fef2f2", title_mr:"सामाजिक उद्देश्य से जुड़ाव",  title_en:"Connection to Social Purpose"     },
];

const TESTIMONIALS = [
  { name_mr:"सना शेख",    name_en:"Sana Shaikh",   city_mr:"कराड, महाराष्ट्र", city_en:"Karad, Maharashtra", stars:5, img:"https://i.pravatar.cc/80?img=47", color:T.pink,
    text_mr:"ट्रस्ट की ट्रेनिंग से मैंने घर से मसाला बनाकर ऑनलाइन बेचना शुरू किया। अब मैं आत्मनिर्भर हूँ।",
    text_en:"With the Trust's training I started making spices at home and selling online. Now I'm self-reliant." },
  { name_mr:"फरहीन खान",  name_en:"Farheen Khan",  city_mr:"कराड, महाराष्ट्र", city_en:"Karad, Maharashtra", stars:5, img:"https://i.pravatar.cc/80?img=44", color:T.purple,
    text_mr:"कम निवेश में अच्छा व्यवसाय शुरू हुआ। ट्रस्ट का समर्थन और मार्गदर्शन बहुत उपयोगी रहा।",
    text_en:"Started a good business with low investment. The Trust's support and guidance was very useful." },
];

const TRAINING_POINTS = [
  { mr:"उत्पाद बनाने की ट्रेनिंग",      en:"Product manufacturing training" },
  { mr:"पैकेजिंग और ब्रांडिंग",          en:"Packaging and branding" },
  { mr:"ऑनलाइन और ऑफलाइन बिक्री",       en:"Online and offline selling" },
  { mr:"मार्केटिंग और ग्राहक प्रबंधन",  en:"Marketing and customer management" },
  { mr:"ट्रस्ट का पूर्ण सहयोग",         en:"Full support from the Trust" },
];

// ─── FadeIn helper ────────────────────────────────────────────────────────────
function FadeIn({ children, delay = 0, dir = "up", style = {} }) {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const ob = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); ob.disconnect(); }}, { threshold: 0.1 });
    if (ref.current) ob.observe(ref.current);
    return () => ob.disconnect();
  }, []);
  const anim = dir === "right" ? "fadeRight" : dir === "left" ? "fadeLeft" : dir === "scale" ? "scaleIn" : "fadeUp";
  return (
    <div ref={ref} style={{ animation: v ? `${anim} .55s cubic-bezier(.34,1.56,.64,1) ${delay}s both` : "none", opacity: v ? 1 : 0, ...style }}>
      {children}
    </div>
  );
}

// ─── Tricolor helper ──────────────────────────────────────────────────────────
const Tricolor = ({ h = 4 }) => (
  <div style={{ display:"flex", height:h }}>
    {["#e87722","#ffffff","#1a7a3c"].map((c,i) => <div key={i} style={{ flex:1, background:c }}/>)}
  </div>
);

// ─── Section header ───────────────────────────────────────────────────────────
function SectionTitle({ mr, en, lang, sub_mr, sub_en }) {
  return (
    <div className="section-title">
      <h2>
        <span className="leaf">🌿</span>
        {lang === "mr" ? mr : en}
        <span className="leaf" style={{ animationDelay:".4s" }}>🌿</span>
      </h2>
      {(sub_mr || sub_en) && (
        <p style={{ color:"#64748b", fontSize:".85rem", margin:"4px 0 0" }}>
          {lang === "mr" ? sub_mr : sub_en}
        </p>
      )}
    </div>
  );
}

// ─── View-all button ──────────────────────────────────────────────────────────
const ViewAll = ({ lang, color = T.green }) => (
  <button className="btn-outline-green" style={{ color, borderColor:color }}>
    {lang==="mr" ? "सभी देखें →" : "View All →"}
  </button>
);

// ─── Product Card ─────────────────────────────────────────────────────────────
function ProductCard({ item, lang, index }) {
  const [added, setAdded] = useState(false);
  const [imgErr, setImgErr] = useState(false);
  const disc = Math.round(((item.mrp - item.price) / item.mrp) * 100);

  const handleCart = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  return (
    <FadeIn delay={index * 0.06}>
      <div className="product-card" style={{ background:T.card, borderRadius:T.radiusLg, overflow:"hidden", boxShadow:T.shadow, border:`1px solid ${T.border}`, display:"flex", flexDirection:"column" }}>
        {/* image */}
        <div style={{ position:"relative", height:160, background:"#f9fafb", overflow:"hidden" }}>
          {imgErr ? (
            <div style={{ height:"100%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:48 }}>{item.icon||"📦"}</div>
          ) : (
            <img src={item.img} alt="" onError={()=>setImgErr(true)}
              style={{ width:"100%", height:"100%", objectFit:"cover", display:"block", transition:"transform .35s ease" }}
              onMouseEnter={e=>e.currentTarget.style.transform="scale(1.07)"}
              onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}
            />
          )}
          {/* badge */}
          <div className="bestseller-badge" style={{
            position:"absolute", top:10, left:10,
            background:item.badgeColor, color:"#fff",
            fontSize:".68rem", fontWeight:700,
            padding:"3px 10px", borderRadius:"20px",
            boxShadow:`0 2px 8px ${item.badgeColor}44`,
          }}>
            {lang==="mr" ? item.badge_mr : item.badge_en}
          </div>
          {/* discount badge */}
          <div style={{
            position:"absolute", top:10, right:10,
            background:"#dc2626", color:"#fff",
            fontSize:".68rem", fontWeight:700,
            padding:"3px 8px", borderRadius:"20px",
          }}>
            {disc}% OFF
          </div>
        </div>

        {/* content */}
        <div style={{ padding:"12px 12px 14px", flex:1, display:"flex", flexDirection:"column" }}>
          <div style={{ fontWeight:700, color:T.navy, fontSize:".88rem", lineHeight:1.4, marginBottom:4, flex:1 }}>
            {lang==="mr" ? item.name_mr : item.name_en}
          </div>
          <div style={{ fontSize:".72rem", color:"#94a3b8", marginBottom:8 }}>
            {lang==="mr" ? item.unit_mr : item.unit_en}
          </div>
          {/* price row */}
          <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:10 }}>
            <span style={{ fontWeight:900, color:T.green, fontSize:"1.15rem" }}>₹{item.price}</span>
            <span style={{ fontWeight:500, color:"#94a3b8", fontSize:".82rem", textDecoration:"line-through" }}>₹{item.mrp}</span>
          </div>
          <button
            className="btn-cart"
            onClick={handleCart}
            style={{ background: added ? T.saffron : T.green }}
          >
            <span className="cart-icon">{added ? "✓" : "🛒"}</span>
            {added
              ? (lang==="mr" ? "जोड़ा गया!" : "Added!")
              : (lang==="mr" ? "कार्ट में जोड़ें" : "Add to Cart")}
          </button>
        </div>
      </div>
    </FadeIn>
  );
}

// ─── Category Circle ──────────────────────────────────────────────────────────
function CategoryCircle({ item, lang, index }) {
  const [imgErr, setImgErr] = useState(false);
  return (
    <FadeIn delay={index * 0.045}>
      <div className="cat-circle" style={{ textAlign:"center", cursor:"pointer" }}>
        <div style={{
          width:"clamp(68px,10vw,86px)", height:"clamp(68px,10vw,86px)",
          borderRadius:"50%",
          overflow:"hidden",
          border:`3px solid ${item.color}44`,
          boxShadow:`0 4px 14px ${item.color}25`,
          margin:"0 auto 7px",
          background:`${item.color}12`,
        }}>
          {imgErr ? (
            <div style={{ width:"100%", height:"100%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:28, background:`${item.color}18` }}>{item.icon}</div>
          ) : (
            <img src={item.img} alt="" onError={()=>setImgErr(true)} style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }} />
          )}
        </div>
        <div style={{ fontSize:".72rem", color:T.navy, fontWeight:600, lineHeight:1.35, maxWidth:80, margin:"0 auto" }}>
          {lang==="mr" ? item.name_mr : item.name_en}
        </div>
      </div>
    </FadeIn>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function WomenEntrepreneur() {
  const { lang, setLang } = useLang();
  const [cartCount, setCartCount] = useState(0);

  return (
    <>
      <style>{STYLES}</style>
      <Navbar />
      <Tricolor h={5} />

      {/* ── Ticker ─────────────────────────────────────────────────────── */}
      <div className="ticker-wrap" style={{ padding:"7px 0" }}>
        <div className="ticker-track">
          {[...Array(2)].map((_,ri)=>(
            [
              "🌿 गुणवत्तापूर्ण FMCG उत्पाद",
              "👩 महिला उद्यमी प्रशिक्षण",
              "🏠 घर से शुरू करें व्यवसाय",
              "💰 कम निवेश अधिक आय",
              "🚀 तेज़ डिलीवरी",
              "✅ विश्वसनीय संगठन",
              "🎁 500+ उत्पाद",
            ].map((t,i)=>(
              <span key={`${ri}-${i}`} style={{ color:"#fff", fontWeight:600, fontSize:".8rem", flexShrink:0 }}>
                {t}<span style={{ color:"rgba(255,255,255,.35)", marginLeft:24 }}>|</span>
              </span>
            ))
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════════════════ */}
      <section style={{
        background:`linear-gradient(160deg,#f0faf4 0%,#fefdf5 50%,#fdf2e8 100%)`,
        position:"relative", overflow:"hidden",
      }}>
        {/* leaf decorations */}
        <div style={{ position:"absolute", top:20, left:-30, fontSize:60, opacity:.08, animation:"leafSway 3s ease-in-out infinite", pointerEvents:"none" }}>🌿</div>
        <div style={{ position:"absolute", bottom:30, right:20, fontSize:80, opacity:.06, animation:"leafSway 3s ease-in-out infinite .8s", pointerEvents:"none" }}>🌿</div>

        <div style={{
          maxWidth:1180, margin:"0 auto",
          paddingLeft:"max(20px,env(safe-area-inset-left,0px))",
          paddingRight:"max(20px,env(safe-area-inset-right,0px))",
          paddingBlock:"48px 0",
          position:"relative", zIndex:1,
        }}>
          <div className="hero-grid" style={{ display:"grid", gridTemplateColumns:"55% 45%", gap:28, alignItems:"center" }}>

            {/* LEFT TEXT */}
            <div>
              <FadeIn delay={0}>
                <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"rgba(26,107,53,.12)", border:`1.5px solid ${T.green}30`, borderRadius:"20px", padding:"6px 16px", marginBottom:16 }}>
                  <span style={{ fontSize:16 }}>🌟</span>
                  <span style={{ fontWeight:700, color:T.green, fontSize:".78rem", letterSpacing:".04em" }}>
                    {lang==="mr" ? "खुशहाल मुआशरा ट्रस्ट, कराड" : "Khush-hal Muashra Trust, Karad"}
                  </span>
                </div>
              </FadeIn>

              <FadeIn delay={0.07}>
                <h1 style={{ margin:"0 0 4px", lineHeight:1.1 }}>
                  <span style={{ display:"block", fontWeight:900, fontSize:"clamp(1.9rem,5vw,3.2rem)", color:T.navy }}>
                    {lang==="mr" ? "घर से शुरू करें" : "Start From Home"}
                  </span>
                  <span style={{ display:"block", fontWeight:900, fontSize:"clamp(1.9rem,5vw,3.2rem)", color:T.saffron }}>
                    {lang==="mr" ? "अपना व्यवसाय" : "Your Own Business"}
                  </span>
                </h1>
              </FadeIn>

              <FadeIn delay={0.13}>
                <p style={{ color:"#4b5563", fontSize:".95rem", lineHeight:1.75, margin:"14px 0 22px", maxWidth:420 }}>
                  {lang==="mr"
                    ? "ट्रस्ट के सहयोग से महिलाओं के लिए घरेलू व्यवसाय और गुणवत्तापूर्ण FMCG उत्पाद अब आपके घर तक।"
                    : "With the Trust's support, home business for women and quality FMCG products delivered to your doorstep."}
                </p>
              </FadeIn>

              {/* mini feature pills */}
              <FadeIn delay={0.17}>
                <div style={{ display:"flex", flexWrap:"wrap", gap:10, marginBottom:26 }}>
                  {[
                    { icon:"📚", color:T.green,   label_mr:"प्रशिक्षण और मार्गदर्शन",   label_en:"Training & Guidance" },
                    { icon:"💰", color:T.saffron,  label_mr:"कम निवेश अधिक आय",         label_en:"Low Investment, High Income" },
                    { icon:"👩", color:T.pink,     label_mr:"महिलाओं का आर्थिक सशक्तिकरण", label_en:"Women's Economic Empowerment" },
                  ].map((f,i)=>(
                    <div key={i} style={{ display:"flex", alignItems:"center", gap:7, background:"#fff", border:`1.5px solid ${f.color}28`, borderRadius:"20px", padding:"7px 14px", boxShadow:`0 2px 8px ${f.color}15` }}>
                      <div style={{ width:28, height:28, borderRadius:"50%", background:`${f.color}15`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:14 }}>{f.icon}</div>
                      <span style={{ fontWeight:600, color:T.navy, fontSize:".78rem" }}>{lang==="mr"?f.label_mr:f.label_en}</span>
                    </div>
                  ))}
                </div>
              </FadeIn>

              <FadeIn delay={0.22}>
                <div style={{ display:"flex", flexWrap:"wrap", gap:12 }}>
                  <button className="btn-saffron" style={{ animation:"pulseSaffron 2.8s infinite" }}>
                    <span>🚀</span>
                    {lang==="mr" ? "अभी जुड़ें →" : "Join Now →"}
                  </button>
                </div>
              </FadeIn>
            </div>

            {/* RIGHT — woman hero image */}
            <FadeIn delay={0.1} dir="left" style={{ position:"relative" }}>
              <div style={{ position:"relative" }}>
                {/* main image */}
                <div style={{ borderRadius:`${T.radiusXl} ${T.radiusXl} 0 0`, overflow:"hidden", boxShadow:T.shadowLg, position:"relative" }}>
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80"
                    alt="Women Entrepreneur"
                    style={{ width:"100%", height:380, objectFit:"cover", objectPosition:"top", display:"block" }}
                  />
                  <div style={{ position:"absolute", inset:0, background:"linear-gradient(to bottom,transparent 55%,rgba(26,107,53,.15) 100%)" }}/>
                </div>

                {/* floating text card top-right */}
                <div style={{
                  position:"absolute", top:20, right:-12,
                  background:"rgba(255,255,255,.95)", backdropFilter:"blur(8px)",
                  borderRadius:T.radiusLg, padding:"12px 14px",
                  boxShadow:T.shadowLg, border:`1px solid ${T.border}`,
                  animation:"float 3.5s ease-in-out infinite",
                  minWidth:140, zIndex:2,
                }}>
                  <div style={{ fontWeight:800, color:T.green, fontSize:".82rem", marginBottom:4 }}>
                    {lang==="mr"?"घर की मेहनत से बने":"Hard work from home"}
                  </div>
                  <div style={{ fontWeight:900, color:T.saffron, fontSize:"1rem" }}>
                    {lang==="mr"?"खुशहाल कल ✨":"Bright Tomorrow ✨"}
                  </div>
                </div>

                {/* 4 check items card bottom-left */}
                <div style={{
                  position:"absolute", bottom:20, left:12,
                  background:"rgba(255,255,255,.92)", backdropFilter:"blur(8px)",
                  borderRadius:T.radius, padding:"12px 14px",
                  boxShadow:T.shadowMd, border:`1px solid ${T.border}`,
                  zIndex:2, minWidth:160,
                }}>
                  {[
                    { mr:"गुणवत्तापूर्ण उत्पाद", en:"Quality products" },
                    { mr:"विश्वास और भरोसा",    en:"Trust & reliability" },
                    { mr:"महिलाओं के लिए विशेष",en:"Special for women" },
                    { mr:"घरेलू व्यवसाय के अवसर",en:"Home biz opportunities" },
                  ].map((p,i)=>(
                    <div key={i} className="chk">
                      <div className="chk-dot">✓</div>
                      <span style={{ fontSize:".73rem" }}>{lang==="mr"?p.mr:p.en}</span>
                    </div>
                  ))}
                </div>

                {/* brand circle */}
                <div style={{
                  position:"absolute", bottom:14, right:14,
                  width:72, height:72, borderRadius:"50%",
                  background:T.green, color:"#fff",
                  display:"flex", flexDirection:"column",
                  alignItems:"center", justifyContent:"center",
                  fontSize:".62rem", fontWeight:700, textAlign:"center",
                  boxShadow:T.shadowMd, zIndex:2, lineHeight:1.3,
                  animation:"float 4s ease-in-out infinite .5s",
                }}>
                  <span style={{ fontSize:22 }}>🌙</span>
                  <span style={{ fontSize:".58rem" }}>खुशहाल</span>
                  <span style={{ fontSize:".58rem" }}>मुआशरा</span>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          PRODUCT CATEGORIES
      ══════════════════════════════════════════════════════════════════ */}
      <section style={{ background:"#fff", paddingBlock:"36px 32px", borderBottom:`1px solid ${T.border}` }}>
        <div style={{
          maxWidth:1180, margin:"0 auto",
          paddingLeft:"max(16px,env(safe-area-inset-left,0px))",
          paddingRight:"max(16px,env(safe-area-inset-right,0px))",
        }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:10, marginBottom:20 }}>
            <SectionTitle mr="हमारे उत्पाद श्रेणी" en="Our Product Categories" lang={lang} />
            <ViewAll lang={lang} />
          </div>
          <div className="cats-grid" style={{ display:"grid", gridTemplateColumns:"repeat(10,1fr)", gap:10 }}>
            {CATEGORIES.map((cat,i)=>(
              <CategoryCircle key={cat.id} item={cat} lang={lang} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          POPULAR PRODUCTS
      ══════════════════════════════════════════════════════════════════ */}
      <section style={{ paddingBlock:"36px" }}>
        <div style={{
          maxWidth:1180, margin:"0 auto",
          paddingLeft:"max(16px,env(safe-area-inset-left,0px))",
          paddingRight:"max(16px,env(safe-area-inset-right,0px))",
        }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:10, marginBottom:20 }}>
            <SectionTitle mr="लोकप्रिय उत्पाद" en="Popular Products" lang={lang} sub_mr="सीधे महिला उद्यमियों द्वारा बनाए गए" sub_en="Made directly by women entrepreneurs" />
            <ViewAll lang={lang} />
          </div>
          <div className="products-grid" style={{ display:"grid", gridTemplateColumns:"repeat(6,1fr)", gap:16 }}>
            {PRODUCTS.map((p,i)=>(
              <ProductCard key={p.id} item={p} lang={lang} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          BENEFITS ROW
      ══════════════════════════════════════════════════════════════════ */}
      <section style={{ background:"#fff", paddingBlock:"36px", borderTop:`1px solid ${T.border}`, borderBottom:`1px solid ${T.border}` }}>
        <div style={{
          maxWidth:1180, margin:"0 auto",
          paddingLeft:"max(16px,env(safe-area-inset-left,0px))",
          paddingRight:"max(16px,env(safe-area-inset-right,0px))",
        }}>
          <SectionTitle mr="हमारे साथ जुड़ने के फायदे" en="Benefits of Joining Us" lang={lang} />
          <div className="benefits-grid" style={{ display:"grid", gridTemplateColumns:"repeat(6,1fr)", gap:14 }}>
            {BENEFITS.map((b,i)=>(
              <FadeIn key={i} delay={i*0.06}>
                <div className="benefit-card" style={{ background:b.bg, borderRadius:T.radiusLg, padding:"18px 12px", textAlign:"center", border:`1.5px solid ${b.color}20`, boxShadow:T.shadow }}>
                  <div style={{ width:48, height:48, borderRadius:"50%", background:`${b.color}20`, border:`2px solid ${b.color}30`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, margin:"0 auto 10px" }}>{b.icon}</div>
                  <div style={{ fontWeight:700, color:T.navy, fontSize:".8rem", lineHeight:1.4 }}>
                    {lang==="mr"?b.title_mr:b.title_en}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          TRAINING + TESTIMONIALS
      ══════════════════════════════════════════════════════════════════ */}
      <section style={{ paddingBlock:"40px" }}>
        <div style={{
          maxWidth:1180, margin:"0 auto",
          paddingLeft:"max(16px,env(safe-area-inset-left,0px))",
          paddingRight:"max(16px,env(safe-area-inset-right,0px))",
        }}>
          <div className="two-col" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:22 }}>

            {/* TRAINING */}
            <FadeIn dir="right">
              <div style={{ background:"#fff", borderRadius:T.radiusXl, overflow:"hidden", boxShadow:T.shadowMd, border:`1px solid ${T.border}` }}>
                <Tricolor h={4} />
                {/* header */}
                <div style={{ background:`linear-gradient(135deg,${T.green},${T.greenDark})`, padding:"16px 20px", display:"flex", alignItems:"center", gap:10 }}>
                  <span style={{ fontSize:24 }}>📚</span>
                  <div>
                    <div style={{ color:"#fff", fontWeight:800, fontSize:"1.05rem" }}>
                      {lang==="mr"?"घरेलू व्यवसाय प्रशिक्षण कार्यक्रम":"Home Business Training Programme"}
                    </div>
                    <div style={{ color:"rgba(255,255,255,.8)", fontSize:".75rem" }}>
                      {lang==="mr"?"सीखें • बनाएं • बेचें • कमाएं":"Learn • Make • Sell • Earn"}
                    </div>
                  </div>
                </div>

                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:0 }}>
                  {/* left checklist */}
                  <div style={{ padding:"18px 18px 18px" }}>
                    {TRAINING_POINTS.map((p,i)=>(
                      <div key={i} className="chk">
                        <div className="chk-dot">✓</div>
                        <span>{lang==="mr"?p.mr:p.en}</span>
                      </div>
                    ))}
                    <button className="btn-saffron" style={{ marginTop:16, whiteSpace:"nowrap" }}>
                      {lang==="mr"?"अधिक जानकारी →":"Learn More →"}
                    </button>
                  </div>
                  {/* right image */}
                  <div style={{ position:"relative", overflow:"hidden", minHeight:240 }}>
                    <img
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=70"
                      alt="Training"
                      style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }}
                    />
                    <div style={{ position:"absolute", inset:0, background:"linear-gradient(to right,rgba(26,107,53,.2) 0%,transparent 60%)" }}/>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* TESTIMONIALS + JOIN CARD */}
            <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
              {/* Join CTA card */}
              <FadeIn delay={0.07}>
                <div style={{
                  background:`linear-gradient(135deg,${T.green},${T.greenDark})`,
                  borderRadius:T.radiusXl, padding:"0", overflow:"hidden",
                  boxShadow:T.shadowMd, display:"grid", gridTemplateColumns:"1fr auto",
                }}>
                  <div style={{ padding:"20px 20px 20px" }}>
                    <div style={{ color:"#fff", fontWeight:800, fontSize:"1.05rem", marginBottom:10, lineHeight:1.35 }}>
                      {lang==="mr"?"आजा ही जुड़ें स्वावलंबी महिला अभियान से":"Join the Self-Reliant Women Mission Today"}
                    </div>
                    <button className="btn-saffron" style={{ animation:"pulseSaffron 2.5s infinite" }}>
                      {lang==="mr"?"रजिस्टर करें →":"Register →"}
                    </button>
                  </div>
                  <div style={{ width:110, overflow:"hidden", position:"relative" }}>
                    <img
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=70"
                      alt=""
                      style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }}
                    />
                    <div style={{ position:"absolute", inset:0, background:"linear-gradient(to right,rgba(26,107,53,.6) 0%,transparent 40%)" }}/>
                  </div>
                </div>
              </FadeIn>

              {/* testimonials header */}
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginTop:4 }}>
                <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                  <span style={{ fontSize:20 }}>💬</span>
                  <span style={{ fontWeight:700, color:T.navy, fontSize:"1rem" }}>
                    {lang==="mr"?"हमारी उद्यमी महिलाओं की कहानी":"Our Women Entrepreneurs' Stories"}
                  </span>
                </div>
                <ViewAll lang={lang} />
              </div>

              {/* testimonial cards */}
              <div className="testimonials-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
                {TESTIMONIALS.map((t,i)=>(
                  <FadeIn key={i} delay={i*0.1+0.1}>
                    <div className="testimonial-card" style={{ background:"#fff", borderRadius:T.radiusLg, padding:"16px", border:`1px solid ${T.border}`, boxShadow:T.shadow }}>
                      {/* stars */}
                      <div style={{ display:"flex", gap:2, marginBottom:8 }}>
                        {Array.from({length:t.stars}).map((_,j)=>(
                          <span key={j} style={{ color:T.gold, fontSize:14 }}>★</span>
                        ))}
                      </div>
                      {/* quote */}
                      <div style={{ fontSize:".8rem", color:"#374151", lineHeight:1.6, marginBottom:12, fontStyle:"italic" }}>
                        <span style={{ color:`${t.color}`, fontSize:"1.2rem", lineHeight:0, verticalAlign:"middle" }}>"</span>
                        {lang==="mr"?t.text_mr:t.text_en}
                        <span style={{ color:`${t.color}`, fontSize:"1.2rem", lineHeight:0, verticalAlign:"middle" }}>"</span>
                      </div>
                      {/* author */}
                      <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                        <img src={t.img} alt="" onError={e=>e.currentTarget.style.display="none"} style={{ width:36, height:36, borderRadius:"50%", objectFit:"cover", border:`2px solid ${t.color}44` }} />
                        <div>
                          <div style={{ fontWeight:700, color:T.navy, fontSize:".8rem" }}>{lang==="mr"?t.name_mr:t.name_en}</div>
                          <div style={{ fontSize:".68rem", color:"#94a3b8" }}>{lang==="mr"?t.city_mr:t.city_en}</div>
                        </div>
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          STATS BAR
      ══════════════════════════════════════════════════════════════════ */}
      <section style={{ background:`linear-gradient(135deg,${T.green},${T.greenDark})`, paddingBlock:"24px" }}>
        <Tricolor h={4} />
        <div style={{
          maxWidth:1180, margin:"0 auto",
          paddingLeft:"max(16px,env(safe-area-inset-left,0px))",
          paddingRight:"max(16px,env(safe-area-inset-right,0px))",
          paddingTop:20,
        }}>
          <div className="stats-grid" style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:14 }}>
            {[
              { icon:"👩", val:"500+", label_mr:"प्रशिक्षित महिलाएं",  label_en:"Trained Women",      color:T.pink },
              { icon:"📦", val:"50+",  label_mr:"घरेलू उत्पाद",        label_en:"Home Products",       color:T.gold },
              { icon:"😊", val:"1000+",label_mr:"खुश ग्राहक",          label_en:"Happy Customers",     color:T.teal },
              { icon:"👥", val:"10+",  label_mr:"व्यवसाय समूह",        label_en:"Business Groups",     color:"#a78bfa" },
              { icon:"🚀", val:"",     label_mr:"आप भी जुड़ें हमारे साथ",label_en:"Join Us Today",     color:T.saffron, cta:true },
            ].map((s,i)=>(
              <FadeIn key={i} delay={i*0.07}>
                {s.cta ? (
                  <div style={{
                    background:T.saffron, borderRadius:T.radiusLg,
                    padding:"16px 14px", textAlign:"center",
                    boxShadow:"0 4px 18px rgba(232,119,34,.45)",
                    display:"flex", flexDirection:"column", alignItems:"center", gap:6,
                    cursor:"pointer",
                  }}>
                    <div style={{ fontSize:28 }}>{s.icon}</div>
                    <div style={{ color:"#fff", fontWeight:800, fontSize:".88rem", lineHeight:1.35 }}>
                      {lang==="mr"?s.label_mr:s.label_en}
                    </div>
                    <button className="btn-outline-green" style={{ color:"#fff", borderColor:"rgba(255,255,255,.8)", fontSize:".75rem", padding:"5px 14px" }}>
                      {lang==="mr"?"जुड़ें →":"Join →"}
                    </button>
                  </div>
                ) : (
                  <div style={{
                    background:"rgba(255,255,255,.12)", backdropFilter:"blur(8px)",
                    border:"1px solid rgba(255,255,255,.2)", borderRadius:T.radiusLg,
                    padding:"16px 14px", textAlign:"center",
                  }}>
                    <div style={{ fontSize:28, marginBottom:4 }}>{s.icon}</div>
                    <div style={{ fontWeight:900, color:s.color, fontSize:"1.6rem", lineHeight:1 }}>{s.val}</div>
                    <div style={{ color:"rgba(255,255,255,.82)", fontSize:".75rem", marginTop:4, fontWeight:500 }}>
                      {lang==="mr"?s.label_mr:s.label_en}
                    </div>
                  </div>
                )}
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Globe FAB ─────────────────────────────────────────────────── */}
      <button
        className="globe-fab legacy-language-switcher"
        onClick={()=>setLang(l=>l==="mr"?"en":"mr")}
        style={{
          position:"fixed",
          bottom:`calc(24px + env(safe-area-inset-bottom,0px))`,
          right:`calc(24px + env(safe-area-inset-right,0px))`,
          zIndex:1000, width:56, height:56, borderRadius:"50%",
          background:`linear-gradient(135deg,${T.saffron},${T.amber})`,
          color:"#fff", border:"3px solid #fff",
          boxShadow:"0 4px 20px rgba(232,119,34,.45)",
          cursor:"pointer", display:"flex", alignItems:"center",
          justifyContent:"center", flexDirection:"column",
          gap:0, padding:0, fontFamily:T.font,
        }}
        title={lang==="mr"?"Switch to English":"मराठीत बदला"}
      >
        <span style={{ fontSize:22, lineHeight:1 }}>🌐</span>
        <span style={{ fontSize:".6rem", fontWeight:700 }}>{lang==="mr"?"EN":"मर"}</span>
      </button>

      <Footer />
    </>
  );
}