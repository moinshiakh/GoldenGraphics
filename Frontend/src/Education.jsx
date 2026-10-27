import { useState, useEffect, useRef } from "react";
import Navbar from "./navbar";
import Footer from "./footer";
import { useLang } from "./useLang";

/* ── Design Tokens ── */
const T = {
  bg: "#f0f4f8",
  card: "#ffffff",
  border: "#dde3ed",
  navy: "#0d2236",
  navyDark: "#07151f",
  green: "#1a7a3c",
  amber: "#e87722",
  saffron: "#f59e0b",
  red: "#dc2626",
  purple: "#6d28d9",
  cyan: "#0891b2",
  gold: "#b7791f",
  softNavy: "#e8edf5",
  softGreen: "#e6f4ec",
  softAmber: "#fef3e2",
  softPurple: "#ede9fe",
  softCyan: "#e0f2fe",
  font: "'Noto Sans Devanagari','Inter','Segoe UI',system-ui,sans-serif",
  shadow: "0 2px 12px rgba(13,34,54,0.10)",
  shadowMd: "0 4px 24px rgba(13,34,54,0.14)",
  shadowLg: "0 8px 40px rgba(13,34,54,0.18)",
  radius: "12px",
  radiusSm: "8px",
};

/* ── Translations ── */
const LANG = {
  en: {
    title: "Education Department",
    subtitle: "खुशहाल मुशायरा Social Welfare & Charitable Trust, Maharashtra",
    tagline: "Empowering communities through quality education & skill development",
    educators: "Our Educators",
    upcomingPrograms: "Upcoming Programs & Notices",
    achievements: "Student Achievements",
    eduTips: "Education Tips & Information",
    stats: ["Active Students", "Educators", "Programs", "Success Rate"],
    statVals: ["2,450", "38", "126", "94%"],
    prev: "← Prev",
    next: "Next →",
  },
  mr: {
    title: "शिक्षण विभाग",
    subtitle: "खुशहाल मुशायरा सामाजिक कल्याण व धर्मादाय ट्रस्ट, महाराष्ट्र",
    tagline: "दर्जेदार शिक्षण व कौशल्य विकासाद्वारे समाजाचे सशक्तीकरण",
    educators: "आमचे शिक्षक",
    upcomingPrograms: "आगामी कार्यक्रम व नोटिसा",
    achievements: "विद्यार्थ्यांच्या उपलब्धी",
    eduTips: "शिक्षण टिप्स व माहिती",
    stats: ["सक्रिय विद्यार्थी", "शिक्षक", "कार्यक्रम", "यश दर"],
    statVals: ["२,४५०", "३८", "१२६", "९४%"],
    prev: "← मागे",
    next: "पुढे →",
  },
};

/* ── Educators Data ── */
const EDUCATORS = [
  {
    id: 1,
    name_en: "Mr. Irfan Sayad",
    name_mr: "श्री. इरफान सय्यद",
    role_en: "Senior Education Coordinator",
    role_mr: "वरिष्ठ शिक्षण समन्वयक",
    subject_en: "Career Guidance & Counselling",
    subject_mr: "करिअर मार्गदर्शन व समुपदेशन",
    qual_en: "M.Ed, B.Ed, Certified Counselor",
    qual_mr: "M.Ed, B.Ed, प्रमाणित समुपदेशक",
    exp_en: "12 years experience",
    exp_mr: "१२ वर्षांचा अनुभव",
    email: "irfan.sayad@trust.org",
    phone: "+91 98765 43210",
    avatar: "https://i.pravatar.cc/150?img=11",
    accentColor: T.amber,
    softColor: T.softAmber,
    students: 320,
    lectures: 14,
    rating: 4.8,
    badge_en: "Guidance Expert",
    badge_mr: "मार्गदर्शन तज्ञ",
    bio_en: "Dedicated education coordinator with 12+ years of experience helping students navigate career choices. Specializes in aptitude assessment and personalized counseling for 10th and 12th grade students preparing for competitive exams.",
    bio_mr: "१२+ वर्षांच्या अनुभवासह विद्यार्थ्यांना करिअर निवडीत मार्गदर्शन करणारे समर्पित समन्वयक. दहावी व बारावीच्या विद्यार्थ्यांसाठी अभिरुची मूल्यांकन व वैयक्तिक समुपदेशनात तज्ज्ञ.",
    tags_en: ["Career Guidance", "MPSC", "UPSC", "Aptitude"],
    tags_mr: ["करिअर मार्गदर्शन", "MPSC", "UPSC", "अभिरुची"],
  },
  {
    id: 2,
    name_en: "Ms. Priya Kulkarni",
    name_mr: "सौ. प्रिया कुलकर्णी",
    role_en: "Primary Education Specialist",
    role_mr: "प्राथमिक शिक्षण तज्ज्ञ",
    subject_en: "Mathematics & Science",
    subject_mr: "गणित व विज्ञान",
    qual_en: "M.Sc Mathematics, B.Ed",
    qual_mr: "M.Sc गणित, B.Ed",
    exp_en: "9 years experience",
    exp_mr: "९ वर्षांचा अनुभव",
    email: "priya.kulkarni@trust.org",
    phone: "+91 98765 43211",
    avatar: "https://i.pravatar.cc/150?img=47",
    accentColor: T.green,
    softColor: T.softGreen,
    students: 410,
    lectures: 22,
    rating: 4.9,
    badge_en: "Top Educator",
    badge_mr: "अव्वल शिक्षिका",
    bio_en: "Passionate mathematics and science educator known for making complex concepts accessible. Uses innovative teaching methods including visual aids, problem-based learning, and interactive sessions to boost student comprehension and exam scores.",
    bio_mr: "गुंतागुंतीच्या संकल्पना सोप्या करण्यासाठी प्रसिद्ध गणित व विज्ञान शिक्षिका. दृश्य साधने, समस्या-आधारित शिक्षण आणि संवादात्मक सत्रांद्वारे विद्यार्थ्यांचे आकलन व परीक्षा गुण वाढवतात.",
    tags_en: ["Mathematics", "Science", "Board Exam", "Olympiad"],
    tags_mr: ["गणित", "विज्ञान", "बोर्ड परीक्षा", "ऑलिम्पियाड"],
  },
  {
    id: 3,
    name_en: "Dr. Suresh Pawar",
    name_mr: "डॉ. सुरेश पवार",
    role_en: "Secondary Education Head",
    role_mr: "माध्यमिक शिक्षण प्रमुख",
    subject_en: "Marathi Literature & History",
    subject_mr: "मराठी साहित्य व इतिहास",
    qual_en: "Ph.D Marathi, M.A History",
    qual_mr: "Ph.D मराठी, M.A इतिहास",
    exp_en: "18 years experience",
    exp_mr: "१८ वर्षांचा अनुभव",
    email: "suresh.pawar@trust.org",
    phone: "+91 98765 43212",
    avatar: "https://i.pravatar.cc/150?img=57",
    accentColor: T.purple,
    softColor: T.softPurple,
    students: 280,
    lectures: 18,
    rating: 4.7,
    badge_en: "Scholar",
    badge_mr: "विद्वान",
    bio_en: "Esteemed scholar with doctoral research in Marathi literature and extensive knowledge of Maharashtra history. Has published 3 books and 15+ research papers. Brings deep cultural insight into every classroom session.",
    bio_mr: "मराठी साहित्यात डॉक्टरेट संशोधन आणि महाराष्ट्राच्या इतिहासाचे व्यापक ज्ञान असलेले आदरणीय विद्वान. ३ पुस्तके व १५+ शोधनिबंध प्रकाशित. प्रत्येक वर्गसत्रात सखोल सांस्कृतिक अंतर्दृष्टी आणतात.",
    tags_en: ["Marathi Literature", "History", "Research", "Culture"],
    tags_mr: ["मराठी साहित्य", "इतिहास", "संशोधन", "संस्कृती"],
  },
];

/* ── Upcoming Programs Data ── */
const PROGRAMS = [
  {
    sr: 1,
    lecturer_en: "Moin Shaikh",
    lecturer_mr: "मोईन शेख",
    topic_en: "Full Stack Web Development",
    topic_mr: "फुल स्टॅक वेब डेव्हलपमेंट",
    desc_en: "Comprehensive session covering modern tech stack including React, Node.js, Express & MongoDB. Covers both front-end UI/UX design principles and back-end REST API development with hands-on project demonstrations.",
    desc_mr: "React, Node.js, Express व MongoDB सह आधुनिक टेक स्टॅक समाविष्ट करणारे सर्वसमावेशक सत्र. व्यावहारिक प्रकल्प प्रात्यक्षिकांसह फ्रंट-एंड UI/UX डिझाइन तत्त्वे आणि बॅक-एंड REST API विकास दोन्ही समाविष्ट.",
    date_en: "Nov 5, 2026 · 4:00 PM",
    date_mr: "नोव्हे. ५, २०२६ · सायं. ४:०० वा.",
    color: T.cyan,
    soft: T.softCyan,
    icon: "💻",
    type_en: "Technical Lecture",
    type_mr: "तांत्रिक व्याख्यान",
  },
  {
    sr: 2,
    lecturer_en: "Dr. Amina Shaikh",
    lecturer_mr: "डॉ. अमिना शेख",
    topic_en: "MPSC / UPSC Preparation Strategy",
    topic_mr: "MPSC / UPSC तयारी धोरण",
    desc_en: "Strategic roadmap for civil services preparation. Topics include syllabus breakdown, time management, answer writing techniques, current affairs integration, and mock test analysis for Maharashtra State Services.",
    desc_mr: "नागरी सेवा तयारीसाठी धोरणात्मक मार्गदर्शन. अभ्यासक्रम विश्लेषण, वेळ व्यवस्थापन, उत्तरलेखन तंत्र, चालू घडामोडी एकत्रीकरण आणि महाराष्ट्र राज्य सेवांसाठी सराव चाचणी विश्लेषण.",
    date_en: "Nov 12, 2026 · 10:00 AM",
    date_mr: "नोव्हे. १२, २०२६ · सकाळी १०:०० वा.",
    color: T.navy,
    soft: T.softNavy,
    icon: "🏛️",
    type_en: "Competitive Exam",
    type_mr: "स्पर्धा परीक्षा",
  },
  {
    sr: 3,
    lecturer_en: "Prof. Rahul Desai",
    lecturer_mr: "प्रा. राहुल देसाई",
    topic_en: "Digital Marketing & Social Media",
    topic_mr: "डिजिटल मार्केटिंग व सोशल मीडिया",
    desc_en: "Modern digital marketing landscape covering SEO, SEM, social media strategy, content marketing, email campaigns, Google Analytics, and building a personal brand online for career growth opportunities.",
    desc_mr: "SEO, SEM, सोशल मीडिया धोरण, कंटेंट मार्केटिंग, ईमेल मोहिम, Google Analytics आणि करिअर वाढीसाठी ऑनलाइन वैयक्तिक ब्रँड तयार करणे यांचा समावेश असलेले आधुनिक डिजिटल मार्केटिंग.",
    date_en: "Nov 18, 2026 · 3:00 PM",
    date_mr: "नोव्हे. १८, २०२६ · दु. ३:०० वा.",
    color: T.amber,
    soft: T.softAmber,
    icon: "📱",
    type_en: "Career Workshop",
    type_mr: "करिअर कार्यशाळा",
  },
  {
    sr: 4,
    lecturer_en: "Ms. Fatima Inamdar",
    lecturer_mr: "सौ. फातिमा इनामदार",
    topic_en: "Personality Development & Communication",
    topic_mr: "व्यक्तिमत्त्व विकास व संवाद",
    desc_en: "Build confidence and communication skills essential for professional success. Covers public speaking, interview preparation, body language, emotional intelligence, leadership traits, and effective presentation skills.",
    desc_mr: "व्यावसायिक यशासाठी आवश्यक आत्मविश्वास आणि संवाद कौशल्ये विकसित करा. सार्वजनिक भाषण, मुलाखत तयारी, देहबोली, भावनिक बुद्धिमत्ता, नेतृत्व गुण आणि सादरीकरण कौशल्ये समाविष्ट.",
    date_en: "Nov 25, 2026 · 11:00 AM",
    date_mr: "नोव्हे. २५, २०२६ · सकाळी ११:०० वा.",
    color: T.green,
    soft: T.softGreen,
    icon: "🎤",
    type_en: "Soft Skills",
    type_mr: "सॉफ्ट स्किल्स",
  },
  {
    sr: 5,
    lecturer_en: "Mr. Yusuf Shaikh",
    lecturer_mr: "श्री. युसूफ शेख",
    topic_en: "Financial Literacy for Students",
    topic_mr: "विद्यार्थ्यांसाठी आर्थिक साक्षरता",
    desc_en: "Essential financial education covering personal budgeting, saving habits, banking basics, investment fundamentals, scholarships and education loans, understanding taxes, and building financial independence from an early age.",
    desc_mr: "वैयक्तिक बजेट, बचत सवयी, बँकिंग मूलतत्त्वे, गुंतवणूक मूलभूत, शिष्यवृत्ती व शैक्षणिक कर्जे, कर समजून घेणे आणि लहान वयातच आर्थिक स्वातंत्र्य निर्माण करण्याचे आवश्यक आर्थिक शिक्षण.",
    date_en: "Dec 2, 2026 · 2:00 PM",
    date_mr: "डिसे. २, २०२६ · दु. २:०० वा.",
    color: T.purple,
    soft: T.softPurple,
    icon: "💰",
    type_en: "Finance Workshop",
    type_mr: "वित्त कार्यशाळा",
  },
];

/* ── Education Tips ── */
const EDU_TIPS = [
  {
    icon: "🎯",
    tip_en: "Set SMART Goals",
    tip_mr: "SMART उद्दिष्टे ठेवा",
    desc_en: "Specific, Measurable, Achievable, Relevant, Time-bound goals improve academic performance by up to 42%. Break large goals into weekly milestones.",
    desc_mr: "विशिष्ट, मोजता येण्याजोगे, साध्य करण्याजोगे, संबंधित, वेळ-बद्ध उद्दिष्टे शैक्षणिक कामगिरी ४२% पर्यंत सुधारतात. मोठी उद्दिष्टे साप्ताहिक टप्प्यांत विभाजित करा.",
    color: T.amber,
  },
  {
    icon: "🧠",
    tip_en: "Active Recall Technique",
    tip_mr: "सक्रिय स्मरण तंत्र",
    desc_en: "Testing yourself on material is 2-3x more effective than re-reading. Use flashcards, practice questions, and teach concepts to others to boost long-term retention.",
    desc_mr: "सामग्रीवर स्वतःची चाचणी घेणे पुन्हा वाचनापेक्षा २-३ पट अधिक प्रभावी आहे. दीर्घकालीन स्मरणशक्ती वाढवण्यासाठी फ्लॅशकार्ड, सराव प्रश्न आणि इतरांना संकल्पना शिकवा.",
    color: T.purple,
  },
  {
    icon: "⏱️",
    tip_en: "Pomodoro Study Method",
    tip_mr: "पोमोडोरो अभ्यास पद्धत",
    desc_en: "Study for 25 minutes, rest for 5 minutes. After 4 cycles, take a 15–30 minute break. This technique prevents mental fatigue and maintains peak concentration throughout study sessions.",
    desc_mr: "२५ मिनिटे अभ्यास करा, ५ मिनिटे विश्रांती घ्या. ४ चक्रांनंतर १५-३० मिनिटे विश्रांती घ्या. हे तंत्र मानसिक थकवा टाळते आणि अभ्यास सत्रात शिखर एकाग्रता राखते.",
    color: T.cyan,
  },
  {
    icon: "📖",
    tip_en: "Spaced Repetition",
    tip_mr: "विरामयुक्त पुनरावृत्ती",
    desc_en: "Review information at increasing intervals: 1 day, 3 days, 1 week, 2 weeks. This scientifically proven method maximizes memory retention and is ideal for exam preparation.",
    desc_mr: "वाढत्या अंतराने माहितीचे पुनरावलोकन करा: १ दिवस, ३ दिवस, १ आठवडा, २ आठवडे. ही शास्त्रीयदृष्ट्या सिद्ध पद्धत स्मृती धारणा जास्तीत जास्त करते आणि परीक्षा तयारीसाठी आदर्श आहे.",
    color: T.green,
  },
  {
    icon: "💡",
    tip_en: "Mind Mapping",
    tip_mr: "माइंड मॅपिंग",
    desc_en: "Create visual diagrams linking concepts to improve understanding and creativity. Research shows mind maps increase information retention by 10-15% compared to linear notes.",
    desc_mr: "आकलन आणि सर्जनशीलता सुधारण्यासाठी संकल्पना जोडणारे दृश्य आकृत्या तयार करा. संशोधन दर्शवते की रेषीय नोट्सच्या तुलनेत माइंड मॅप माहिती धारणा १०-१५% वाढवतात.",
    color: T.navy,
  },
  {
    icon: "🌙",
    tip_en: "Sleep & Memory Consolidation",
    tip_mr: "झोप आणि स्मृती एकत्रीकरण",
    desc_en: "7–9 hours of sleep is essential for academic performance. During sleep, the brain consolidates memories and processes information from the day's learning — never compromise on rest.",
    desc_mr: "शैक्षणिक कामगिरीसाठी ७-९ तासांची झोप आवश्यक आहे. झोपेदरम्यान मेंदू स्मृती एकत्रित करतो आणि दिवसाच्या शिक्षणातील माहितीवर प्रक्रिया करतो — विश्रांतीशी तडजोड करू नका.",
    color: T.gold,
  },
];

/* ── Achievements ── */
const ACHIEVEMENTS = [
  {
    id: 1,
    name_en: "Rahul Sharma",
    name_mr: "राहुल शर्मा",
    achievement_en: "State Topper in HSC (Class 12) – 98.4%",
    achievement_mr: "बारावीत राज्यातून अव्वल – ९८.४%",
    quote_en: "Hard work always pays off!",
    quote_mr: "मेहनत कधीही फळ देतेच!",
    avatar: "https://i.pravatar.cc/150?img=33",
    accentColor: T.green,
    badge_en: "State Topper",
    badge_mr: "राज्य अव्वल",
    year: "2026",
  },
  {
    id: 2,
    name_en: "Aisha Khan",
    name_mr: "आयेशा खान",
    achievement_en: "National Science Olympiad – Gold Medal",
    achievement_mr: "राष्ट्रीय विज्ञान ऑलिम्पियाड – सुवर्णपदक",
    quote_en: "Science is the language of the universe!",
    quote_mr: "विज्ञान हे विश्वाची भाषा आहे!",
    avatar: "https://i.pravatar.cc/150?img=49",
    accentColor: T.cyan,
    badge_en: "Gold Medalist",
    badge_mr: "सुवर्णपदक विजेती",
    year: "2026",
  },
  {
    id: 3,
    name_en: "Zaid Patel",
    name_mr: "झैद पटेल",
    achievement_en: "Selected for IIT-JEE Advanced – AIR 342",
    achievement_mr: "IIT-JEE Advanced साठी निवड – AIR ३४२",
    quote_en: "Dream big, work hard!",
    quote_mr: "मोठी स्वप्ने पहा, कठोर परिश्रम करा!",
    avatar: "https://i.pravatar.cc/150?img=60",
    accentColor: T.amber,
    badge_en: "IIT Qualifier",
    badge_mr: "IIT पात्र",
    year: "2026",
  },
];

/* ── Keyframes ── */
const KEYFRAMES = `
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;600;700;800&family=Inter:wght@400;500;600;700;800&display=swap');
@keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
@keyframes slideIn { from{opacity:0;transform:translateX(-16px)} to{opacity:1;transform:translateX(0)} }
@keyframes pulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.04)} }
@keyframes shimmer { 0%{background-position:200% center} 100%{background-position:-200% center} }
@keyframes congratsBounce { 0%{transform:scale(0.8) rotate(-4deg)} 60%{transform:scale(1.08) rotate(2deg)} 100%{transform:scale(1) rotate(0deg)} }
@keyframes slideCard { from{opacity:0;transform:translateX(32px)} to{opacity:1;transform:translateX(0)} }
@keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
`;

/* ── FadeIn Wrapper ── */
function FadeIn({ children, delay = 0, style = {} }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVis(true); obs.disconnect(); }
    }, { threshold: 0.06 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{
      animation: vis ? `fadeUp 0.55s cubic-bezier(0.34,1.2,0.64,1) ${delay}s both` : "none",
      opacity: vis ? 1 : 0, ...style
    }}>
      {children}
    </div>
  );
}

/* ── Stars ── */
function Stars({ rating }) {
  return (
    <span style={{ color: T.saffron, fontSize: 13, letterSpacing: 1 }}>
      {"★".repeat(Math.floor(rating))}
      {rating % 1 >= 0.5 ? "½" : ""}
      <span style={{ color: "#ccc" }}>{"★".repeat(5 - Math.ceil(rating))}</span>
      <span style={{ color: "#888", fontSize: 11, marginLeft: 4 }}>{rating}</span>
    </span>
  );
}

/* ── Section Header ── */
function SectionHeader({ icon, title, accentColor = T.amber }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24, paddingBottom: 14, borderBottom: `2px solid ${T.navy}18` }}>
      <div style={{ width: 4, height: 32, background: `linear-gradient(180deg, ${accentColor}, ${T.navy})`, borderRadius: 2 }} />
      <span style={{ fontSize: 22 }}>{icon}</span>
      <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: T.navy, fontFamily: T.font }}>{title}</h2>
    </div>
  );
}

/* ── Educator Slider ── */
function EducatorSlider({ lang, isMobile }) {
  const [current, setCurrent] = useState(0);
  const L = LANG[lang];
  const edu = EDUCATORS[current];

  const prev = () => setCurrent(c => (c - 1 + EDUCATORS.length) % EDUCATORS.length);
  const next = () => setCurrent(c => (c + 1) % EDUCATORS.length);

  return (
    <div style={{ position: "relative" }}>
      <div
        key={current}
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 2fr",
          gap: 0,
          background: T.card,
          borderRadius: T.radius,
          boxShadow: T.shadowMd,
          border: `1.5px solid ${edu.accentColor}44`,
          overflow: "hidden",
          animation: "slideCard 0.38s cubic-bezier(0.34,1.2,0.64,1) both",
          minHeight: 340,
        }}
      >
        {/* ── Left col (grid 4 equiv) — Trainer Info ── */}
        <div style={{
          background: `linear-gradient(160deg, ${edu.accentColor}18 0%, ${edu.softColor} 100%)`,
          borderRight: isMobile ? "none" : `1.5px solid ${edu.accentColor}22`,
          borderBottom: isMobile ? `1.5px solid ${edu.accentColor}22` : "none",
          padding: isMobile ? "24px 20px" : "28px 24px",
          display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center",
          gap: 12,
        }}>
          {/* Avatar */}
          <div style={{
            width: 88, height: 88, borderRadius: "50%", overflow: "hidden",
            border: `3px solid ${edu.accentColor}`, boxShadow: `0 0 0 4px ${edu.softColor}, 0 4px 16px ${edu.accentColor}44`,
            flexShrink: 0,
          }}>
            <img src={edu.avatar} alt={edu[`name_${lang}`]}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              onError={e => { e.target.style.display = "none"; e.target.parentNode.style.background = edu.softColor; }} />
          </div>
          {/* Name & role */}
          <div>
            <div style={{ fontWeight: 800, fontSize: 16, color: T.navy, lineHeight: 1.25, fontFamily: T.font }}>
              {edu[`name_${lang}`]}
            </div>
            <div style={{ fontSize: 12, color: "#666", marginTop: 4, fontFamily: T.font }}>
              {edu[`role_${lang}`]}
            </div>
          </div>
          {/* Stars */}
          <div><Stars rating={edu.rating} /></div>
          {/* Badge */}
          <div style={{
            background: `linear-gradient(135deg, ${edu.accentColor}, ${T.navy})`,
            color: "#fff", fontSize: 11, fontWeight: 700, padding: "4px 14px", borderRadius: 20,
          }}>
            🏅 {edu[`badge_${lang}`]}
          </div>
          {/* Stats */}
          <div style={{ display: "flex", gap: 8, width: "100%" }}>
            {[
              { label: lang === "mr" ? "विद्यार्थी" : "Students", val: edu.students, icon: "👥" },
              { label: lang === "mr" ? "व्याख्याने" : "Lectures", val: edu.lectures, icon: "🎓" },
            ].map((s, i) => (
              <div key={i} style={{
                flex: 1, background: "rgba(255,255,255,0.7)", borderRadius: 8, padding: "8px 4px",
                textAlign: "center", border: `1px solid ${edu.accentColor}22`,
              }}>
                <div style={{ fontSize: 14 }}>{s.icon}</div>
                <div style={{ fontSize: 14, fontWeight: 800, color: edu.accentColor }}>{s.val}</div>
                <div style={{ fontSize: 10, color: "#888" }}>{s.label}</div>
              </div>
            ))}
          </div>
          {/* Contact */}
          <div style={{ width: "100%", fontSize: 11, color: "#666", lineHeight: 2 }}>
            <div>📧 {edu.email}</div>
            <div>📞 {edu.phone}</div>
          </div>
          {/* Contact button */}
          <button style={{
            width: "100%", background: edu.accentColor, color: "#fff", border: "none",
            borderRadius: 8, padding: "9px 0", fontSize: 13, fontWeight: 700, cursor: "pointer",
            fontFamily: T.font, marginTop: 4,
            transition: "opacity 0.2s",
          }}
            onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
            onMouseLeave={e => e.currentTarget.style.opacity = "1"}
          >
            {lang === "mr" ? "📨 संपर्क करा" : "📨 Contact"}
          </button>
        </div>

        {/* ── Right col (grid 8 equiv) — Paragraph Details ── */}
        <div style={{ padding: isMobile ? "24px 20px" : "28px 32px", display: "flex", flexDirection: "column", gap: 18 }}>
          {/* Subject chip */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: edu.softColor, color: edu.accentColor,
            borderRadius: 8, padding: "6px 14px", fontSize: 13, fontWeight: 600,
            border: `1px solid ${edu.accentColor}33`, alignSelf: "flex-start",
          }}>
            📚 {edu[`subject_${lang}`]}
          </div>

          {/* Qualifications & Experience row */}
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <div style={{
              background: T.softNavy, borderRadius: 8, padding: "8px 14px",
              fontSize: 12, color: T.navy, fontWeight: 600, border: `1px solid ${T.navy}18`,
            }}>
              🎓 {edu[`qual_${lang}`]}
            </div>
            <div style={{
              background: T.softGreen, borderRadius: 8, padding: "8px 14px",
              fontSize: 12, color: T.green, fontWeight: 600, border: `1px solid ${T.green}22`,
            }}>
              ⏳ {edu[`exp_${lang}`]}
            </div>
          </div>

          {/* Bio paragraph */}
          <div>
            <div style={{ fontWeight: 700, fontSize: 13, color: T.navy, marginBottom: 8 }}>
              {lang === "mr" ? "परिचय" : "About"}
            </div>
            <p style={{
              color: "#4a5568", fontSize: 14, lineHeight: 1.8, margin: 0,
              fontFamily: T.font,
            }}>
              {edu[`bio_${lang}`]}
            </p>
          </div>

          {/* Tags */}
          <div>
            <div style={{ fontWeight: 700, fontSize: 12, color: "#888", marginBottom: 8, textTransform: "uppercase", letterSpacing: 0.6 }}>
              {lang === "mr" ? "विशेषज्ञता" : "Specializations"}
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {edu[`tags_${lang}`].map((tag, i) => (
                <span key={i} style={{
                  background: edu.softColor, color: edu.accentColor,
                  borderRadius: 20, padding: "4px 12px", fontSize: 12, fontWeight: 600,
                  border: `1px solid ${edu.accentColor}33`,
                }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Slide counter */}
          <div style={{ marginTop: "auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", gap: 6 }}>
              {EDUCATORS.map((_, i) => (
                <button key={i} onClick={() => setCurrent(i)} style={{
                  width: i === current ? 24 : 8, height: 8, borderRadius: 4, padding: 0, border: "none",
                  background: i === current ? edu.accentColor : "#ddd",
                  cursor: "pointer", transition: "all 0.22s ease",
                }} />
              ))}
            </div>
            <div style={{ color: "#aaa", fontSize: 12 }}>
              {current + 1} / {EDUCATORS.length}
            </div>
          </div>
        </div>
      </div>

      {/* ── Prev / Next Buttons ── */}
      <div style={{ display: "flex", gap: 10, marginTop: 16, justifyContent: "flex-end" }}>
        <button onClick={prev} style={{
          background: T.card, color: T.navy, border: `1.5px solid ${T.border}`,
          borderRadius: 8, padding: "8px 20px", fontSize: 13, fontWeight: 700,
          cursor: "pointer", fontFamily: T.font, transition: "all 0.18s ease",
          boxShadow: T.shadow,
        }}
          onMouseEnter={e => { e.currentTarget.style.background = T.navy; e.currentTarget.style.color = "#fff"; }}
          onMouseLeave={e => { e.currentTarget.style.background = T.card; e.currentTarget.style.color = T.navy; }}
        >
          {L.prev}
        </button>
        <button onClick={next} style={{
          background: edu.accentColor, color: "#fff", border: "none",
          borderRadius: 8, padding: "8px 20px", fontSize: 13, fontWeight: 700,
          cursor: "pointer", fontFamily: T.font, transition: "opacity 0.18s ease",
          boxShadow: `0 3px 12px ${edu.accentColor}55`,
        }}
          onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
          onMouseLeave={e => e.currentTarget.style.opacity = "1"}
        >
          {L.next}
        </button>
      </div>
    </div>
  );
}

/* ── Programs Slider ── */
function ProgramsSlider({ lang, isMobile }) {
  const [current, setCurrent] = useState(0);
  const L = LANG[lang];
  const prog = PROGRAMS[current];

  const prev = () => setCurrent(c => (c - 1 + PROGRAMS.length) % PROGRAMS.length);
  const next = () => setCurrent(c => (c + 1) % PROGRAMS.length);

  return (
    <div style={{ position: "relative" }}>
      <div
        key={current}
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 2fr",
          gap: 0,
          background: T.card,
          borderRadius: T.radius,
          boxShadow: T.shadowMd,
          border: `1.5px solid ${prog.color}44`,
          overflow: "hidden",
          animation: "slideCard 0.38s cubic-bezier(0.34,1.2,0.64,1) both",
          minHeight: 260,
        }}
      >
        {/* ── Left col (4) — Program Meta ── */}
        <div style={{
          background: `linear-gradient(160deg, ${prog.color}14 0%, ${prog.soft} 100%)`,
          borderRight: isMobile ? "none" : `1.5px solid ${prog.color}22`,
          borderBottom: isMobile ? `1.5px solid ${prog.color}22` : "none",
          padding: isMobile ? "20px" : "28px 22px",
          display: "flex", flexDirection: "column", gap: 14,
        }}>
          {/* SR + Type */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 40, height: 40, borderRadius: "50%",
              background: prog.color, color: "#fff",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 16, fontWeight: 800, flexShrink: 0,
            }}>
              {prog.sr}
            </div>
            <div style={{
              background: prog.soft, color: prog.color,
              borderRadius: 6, padding: "4px 10px", fontSize: 11, fontWeight: 700,
              border: `1px solid ${prog.color}33`,
            }}>
              {prog[`type_${lang}`]}
            </div>
          </div>

          {/* Icon + Topic */}
          <div>
            <div style={{ fontSize: 32, marginBottom: 6, animation: "float 3s ease-in-out infinite" }}>
              {prog.icon}
            </div>
            <div style={{ fontWeight: 800, fontSize: 16, color: T.navy, fontFamily: T.font, lineHeight: 1.3 }}>
              {prog[`topic_${lang}`]}
            </div>
          </div>

          {/* Lecturer */}
          <div style={{
            background: "rgba(255,255,255,0.7)", borderRadius: 8, padding: "10px 12px",
            border: `1px solid ${prog.color}22`,
          }}>
            <div style={{ fontSize: 10, color: "#888", fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 3 }}>
              {lang === "mr" ? "व्याख्याता" : "Lecturer"}
            </div>
            <div style={{ fontWeight: 700, fontSize: 14, color: prog.color, fontFamily: T.font }}>
              👤 {prog[`lecturer_${lang}`]}
            </div>
          </div>

          {/* Date */}
          <div style={{
            background: prog.color, color: "#fff", borderRadius: 8, padding: "8px 12px",
            fontSize: 12, fontWeight: 600, display: "flex", alignItems: "center", gap: 6,
          }}>
            📅 {prog[`date_${lang}`]}
          </div>
        </div>

        {/* ── Right col (8) — Description ── */}
        <div style={{ padding: isMobile ? "20px" : "28px 32px", display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Topic heading */}
          <div>
            <div style={{
              fontSize: 11, fontWeight: 700, color: prog.color, textTransform: "uppercase",
              letterSpacing: 0.7, marginBottom: 6,
            }}>
              {lang === "mr" ? "विषय विवरण" : "Topic Description"}
            </div>
            <h3 style={{
              margin: "0 0 12px", fontSize: 18, fontWeight: 800, color: T.navy,
              fontFamily: T.font, lineHeight: 1.3,
            }}>
              {prog[`topic_${lang}`]}
            </h3>
            <p style={{
              color: "#4a5568", fontSize: 14, lineHeight: 1.85, margin: 0,
              fontFamily: T.font,
            }}>
              {prog[`desc_${lang}`]}
            </p>
          </div>

          {/* Info strip */}
          <div style={{
            display: "flex", gap: 12, flexWrap: "wrap",
            padding: "12px 0", borderTop: `1px solid ${T.border}`,
            marginTop: "auto",
          }}>
            <div style={{
              display: "flex", alignItems: "center", gap: 6,
              background: prog.soft, borderRadius: 8, padding: "6px 12px",
              fontSize: 12, color: prog.color, fontWeight: 600,
              border: `1px solid ${prog.color}22`,
            }}>
              👤 {prog[`lecturer_${lang}`]}
            </div>
            <div style={{
              display: "flex", alignItems: "center", gap: 6,
              background: T.softNavy, borderRadius: 8, padding: "6px 12px",
              fontSize: 12, color: T.navy, fontWeight: 600,
              border: `1px solid ${T.navy}18`,
            }}>
              📅 {prog[`date_${lang}`]}
            </div>
            <div style={{
              display: "flex", alignItems: "center", gap: 6,
              background: prog.soft, borderRadius: 8, padding: "6px 12px",
              fontSize: 12, color: prog.color, fontWeight: 600,
              border: `1px solid ${prog.color}22`,
            }}>
              {prog.icon} {prog[`type_${lang}`]}
            </div>
          </div>

          {/* Slide counter */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 4 }}>
            <div style={{ display: "flex", gap: 6 }}>
              {PROGRAMS.map((_, i) => (
                <button key={i} onClick={() => setCurrent(i)} style={{
                  width: i === current ? 24 : 8, height: 8, borderRadius: 4, padding: 0, border: "none",
                  background: i === current ? prog.color : "#ddd",
                  cursor: "pointer", transition: "all 0.22s ease",
                }} />
              ))}
            </div>
            <div style={{ color: "#aaa", fontSize: 12 }}>
              {current + 1} / {PROGRAMS.length}
            </div>
          </div>
        </div>
      </div>

      {/* ── Prev / Next Buttons ── */}
      <div style={{ display: "flex", gap: 10, marginTop: 16, justifyContent: "flex-end" }}>
        <button onClick={prev} style={{
          background: T.card, color: T.navy, border: `1.5px solid ${T.border}`,
          borderRadius: 8, padding: "8px 20px", fontSize: 13, fontWeight: 700,
          cursor: "pointer", fontFamily: T.font, transition: "all 0.18s ease",
          boxShadow: T.shadow,
        }}
          onMouseEnter={e => { e.currentTarget.style.background = T.navy; e.currentTarget.style.color = "#fff"; }}
          onMouseLeave={e => { e.currentTarget.style.background = T.card; e.currentTarget.style.color = T.navy; }}
        >
          {L.prev}
        </button>
        <button onClick={next} style={{
          background: prog.color, color: "#fff", border: "none",
          borderRadius: 8, padding: "8px 20px", fontSize: 13, fontWeight: 700,
          cursor: "pointer", fontFamily: T.font, transition: "opacity 0.18s ease",
          boxShadow: `0 3px 12px ${prog.color}55`,
        }}
          onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
          onMouseLeave={e => e.currentTarget.style.opacity = "1"}
        >
          {L.next}
        </button>
      </div>
    </div>
  );
}

/* ── Education Tips Grid ── */
function EduTipsSection({ lang }) {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
      gap: 18,
    }}>
      {EDU_TIPS.map((tip, i) => (
        <FadeIn key={i} delay={i * 0.07}>
          <TipCard tip={tip} lang={lang} />
        </FadeIn>
      ))}
    </div>
  );
}

function TipCard({ tip, lang }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: T.card, borderRadius: T.radius,
        boxShadow: hover ? T.shadowMd : T.shadow,
        border: `1.5px solid ${hover ? tip.color : T.border}`,
        transform: hover ? "translateY(-4px)" : "none",
        transition: "all 0.28s cubic-bezier(0.34,1.2,0.64,1)",
        overflow: "hidden", cursor: "default",
      }}
    >
      <div style={{ height: 4, background: `linear-gradient(90deg, ${tip.color}, ${T.navy})` }} />
      <div style={{ padding: "18px 18px 16px" }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 10 }}>
          <div style={{
            width: 42, height: 42, borderRadius: 10, flexShrink: 0,
            background: tip.color + "18", display: "flex", alignItems: "center",
            justifyContent: "center", fontSize: 20,
            border: `1px solid ${tip.color}22`,
            animation: hover ? "float 2s ease-in-out infinite" : "none",
          }}>
            {tip.icon}
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: 14, color: T.navy, fontFamily: T.font }}>
              {tip[`tip_${lang}`]}
            </div>
          </div>
        </div>
        <p style={{ color: "#555", fontSize: 13, lineHeight: 1.75, margin: 0, fontFamily: T.font }}>
          {tip[`desc_${lang}`]}
        </p>
      </div>
    </div>
  );
}

/* ── Achievement Card ── */
function AchievCard({ ach, lang, idx }) {
  const [hover, setHover] = useState(false);
  return (
    <FadeIn delay={idx * 0.08}>
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          background: T.card, borderRadius: T.radius, overflow: "hidden",
          boxShadow: hover ? T.shadowLg : T.shadow,
          border: `1.5px solid ${hover ? ach.accentColor : T.border}`,
          transform: hover ? "translateY(-5px) scale(1.01)" : "none",
          transition: "all 0.3s cubic-bezier(0.34,1.2,0.64,1)",
        }}
      >
        <div style={{
          background: `linear-gradient(135deg, ${T.navyDark}, ${ach.accentColor}cc)`,
          padding: "18px 20px", position: "relative", overflow: "hidden",
        }}>
          {[...Array(6)].map((_, i) => (
            <div key={i} style={{
              position: "absolute", width: 6, height: 6, borderRadius: "50%",
              background: ["#ffd700", "#ff6b6b", "#4ecdc4", "#f9c74f", "#90be6d", "#f8961e"][i],
              top: `${12 + i * 12}%`, left: `${6 + i * 14}%`, opacity: 0.7,
            }} />
          ))}
          <div style={{ display: "flex", alignItems: "center", gap: 14, position: "relative", zIndex: 1 }}>
            <div style={{
              width: 60, height: 60, borderRadius: "50%", overflow: "hidden", flexShrink: 0,
              border: `3px solid ${ach.accentColor}`, boxShadow: `0 0 0 3px rgba(255,255,255,0.2)`,
            }}>
              <img src={ach.avatar} alt={ach[`name_${lang}`]}
                style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div>
              <div style={{ color: "#ffd700", fontSize: 14, fontWeight: 800, animation: hover ? "pulse 2s infinite" : "none" }}>
                🎉 {lang === "mr" ? "अभिनंदन!" : "Congratulations!"}
              </div>
              <div style={{ color: "#fff", fontWeight: 700, fontSize: 13 }}>{ach[`name_${lang}`]}</div>
              <div style={{ color: "rgba(255,255,255,0.75)", fontSize: 11, marginTop: 2 }}>{ach[`badge_${lang}`]} · {ach.year}</div>
            </div>
          </div>
        </div>
        <div style={{ padding: "14px 18px" }}>
          <p style={{ color: "#444", fontSize: 13, lineHeight: 1.6, margin: "0 0 10px", fontFamily: T.font }}>{ach[`achievement_${lang}`]}</p>
          <div style={{
            background: ach.accentColor + "15", borderLeft: `3px solid ${ach.accentColor}`,
            borderRadius: "0 8px 8px 0", padding: "8px 12px", fontStyle: "italic",
            color: "#555", fontSize: 12, fontFamily: T.font,
          }}>
            "{ach[`quote_${lang}`]}"
          </div>
        </div>
      </div>
    </FadeIn>
  );
}

/* ── Main Component ── */
export default function Education() {
  const { lang } = useLang();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 720);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const L = LANG[lang];

  return (
    <div style={{ fontFamily: T.font, background: T.bg, minHeight: "100vh" }}>
      <style>{KEYFRAMES}{`
        * { box-sizing: border-box; }
        body { margin: 0; }
        @media (max-width: 720px) {
          .edu-stats-row { grid-template-columns: repeat(2,1fr) !important; }
          .edu-hero-inner { flex-direction: column !important; text-align: center !important; }
          .edu-hero-right { width: 100% !important; }
          .edu-achiev-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
      <Navbar />

      {/* ── Hero ── */}
      <div style={{
        background: `linear-gradient(135deg, ${T.navyDark} 0%, ${T.navy} 50%, #163a5a 100%)`,
        padding: isMobile ? "28px 16px 32px" : "40px 40px 48px",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", top: -40, right: -40, width: 200, height: 200, borderRadius: "50%", background: "rgba(232,119,34,0.08)" }} />
        <div style={{ position: "absolute", bottom: -30, left: -30, width: 150, height: 150, borderRadius: "50%", background: "rgba(26,122,60,0.08)" }} />

        <div className="edu-hero-inner" style={{ display: "flex", alignItems: "center", gap: 32, maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{ flex: 1 }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "rgba(255,255,255,0.1)", borderRadius: 20, padding: "5px 14px",
              border: "1px solid rgba(255,255,255,0.2)", marginBottom: 16,
            }}>
              <span style={{ fontSize: 16 }}>🏛️</span>
              <span style={{ color: "rgba(255,255,255,0.85)", fontSize: 12, fontWeight: 600 }}>
                {lang === "mr" ? "महाराष्ट्र शिक्षण मंत्रालय" : "Ministry of Education, Maharashtra"}
              </span>
            </div>
            <h1 style={{
              margin: "0 0 10px", fontSize: isMobile ? 26 : 34, fontWeight: 800,
              color: "#fff", lineHeight: 1.25,
              background: `linear-gradient(90deg, #fff, ${T.saffron})`,
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              backgroundSize: "200% auto", animation: "shimmer 4s linear infinite",
            }}>
              {L.title}
            </h1>
            <div style={{ color: T.saffron, fontSize: isMobile ? 13 : 15, fontWeight: 600, marginBottom: 8 }}>
              {L.subtitle}
            </div>
            <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 13, margin: "0 0 22px", maxWidth: 520 }}>
              {L.tagline}
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <button style={{
                background: `linear-gradient(135deg, ${T.amber}, ${T.saffron})`,
                color: "#fff", border: `2px solid rgba(255,255,255,0.3)`, borderRadius: 10, padding: "12px 28px",
                fontWeight: 800, fontSize: 15, cursor: "pointer", fontFamily: T.font,
                boxShadow: `0 6px 24px ${T.amber}77`, animation: "pulse 2.5s infinite",
              }}>
                {lang === "mr" ? "🎓 प्रवेश घ्या" : "🎓 Apply for Admission"}
              </button>
              <button style={{
                background: "rgba(255,255,255,0.12)", color: "#fff",
                border: "1.5px solid rgba(255,255,255,0.3)", borderRadius: 10, padding: "12px 24px",
                fontWeight: 600, fontSize: 14, cursor: "pointer", fontFamily: T.font,
              }}>
                {lang === "mr" ? "📋 अधिक जाणून घ्या" : "📋 Learn More"}
              </button>
            </div>
          </div>
          <div className="edu-hero-right" style={{ width: 320 }}>
            <div className="edu-stats-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {L.stats.map((s, i) => (
                <FadeIn key={i} delay={0.1 + i * 0.06}>
                  <div style={{
                    background: "rgba(255,255,255,0.1)", borderRadius: 12,
                    border: "1px solid rgba(255,255,255,0.15)", padding: "14px 16px",
                    textAlign: "center", backdropFilter: "blur(4px)",
                  }}>
                    <div style={{ fontSize: 22, fontWeight: 800, color: [T.saffron, T.green, "#6ee7f7", "#f9f871"][i] }}>
                      {L.statVals[i]}
                    </div>
                    <div style={{ color: "rgba(255,255,255,0.65)", fontSize: 11, marginTop: 2 }}>{s}</div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Content ── */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: isMobile ? "28px 14px" : "40px 24px", display: "flex", flexDirection: "column", gap: 48 }}>

        {/* ── Educators Section ── */}
        <FadeIn>
          <SectionHeader icon="👨‍🏫" title={L.educators} accentColor={T.amber} />
          <EducatorSlider lang={lang} isMobile={isMobile} />
        </FadeIn>

        {/* ── Upcoming Programs ── */}
        <FadeIn delay={0.05}>
          <SectionHeader icon="📋" title={L.upcomingPrograms} accentColor={T.navy} />
          <ProgramsSlider lang={lang} isMobile={isMobile} />
        </FadeIn>

        {/* ── Student Achievements ── */}
        <FadeIn delay={0.05}>
          <SectionHeader icon="🏆" title={L.achievements} accentColor={T.gold} />
          <div className="edu-achiev-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
            {ACHIEVEMENTS.map((a, i) => <AchievCard key={a.id} ach={a} lang={lang} idx={i} />)}
          </div>
        </FadeIn>

        {/* ── Education Tips ── */}
        <FadeIn delay={0.05}>
          <SectionHeader icon="💡" title={L.eduTips} accentColor={T.purple} />
          <EduTipsSection lang={lang} />
        </FadeIn>

      </div>

      <Footer />
    </div>
  );
}