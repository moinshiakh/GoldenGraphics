import { useEffect, useState } from "react";
import { LanguageContext } from "./languageContext";

const TRANSLATIONS = {
  en: {
    // Navbar
    brandName: "Khushhal Mushayra",
    brandSub: "Social Welfare & Charitable Trust, Maharashtra",
    donate: "Donate",
    nav: {
      home: "Home",
      about: "About Us",
      services: "Services",
      initiatives: "Initiatives",
      gallery: "Gallery",
      news: "News",
      contact: "Contact",
    },
    // Footer
    footerDesc:
      "Our goal is to provide holistic support to the needy sections of society, build unity through service, and create a bright future.",
    usefulLinks: "Useful Links",
    servicesLabel: "Services",
    contactInfo: "Contact Info",
    quickContact: "Quick Contact",
    quickContactBtn: "Get Quick Help 📱",
    footerCopy:
      "© 2024 Khushhal Mushayra Social Welfare & Charitable Trust. All rights reserved.",
    footerTagline: "Designed with ❤️ for a better tomorrow",
    // Services (footer list)
    serviceItems: [
      "Blood Group",
      "Donate Poor",
      "VIP Numbers",
      "Education Update",
      "Labour Service",
      "Sell/Buy",
      "Marriage Topic",
      "Nagarpalika Complaint",
    ],
    // Useful links (footer list)
    usefulLinkItems: [
      "Home",
      "About Us",
      "Services",
      "Initiatives",
      "Gallery",
      "News",
      "Contact",
    ],
  },
  mr: {
    // Navbar
    brandName: "खुशहाल मुशायरा",
    brandSub: "सोशल वेलफेअर & चॅरिटेबल ट्रस्ट, महाराष्ट्र",
    donate: "दान करा",
    nav: {
      home: "होम",
      about: "आमच्याबद्दल",
      services: "सेवा",
      initiatives: "उपक्रम",
      gallery: "गॅलरी",
      news: "बातम्या",
      contact: "संपर्क",
    },
    // Footer
    footerDesc:
      "आमचा उद्देश समाजातील गरजू घटकांना एकांगी सहाय्य करणे, सेवा, एकता येऊन उज्ज्वल भविष्य घडवणे.",
    usefulLinks: "उपयुक्त दुवे",
    servicesLabel: "सेवा",
    contactInfo: "संपर्क माहिती",
    quickContact: "त्वरित संपर्क",
    quickContactBtn: "त्वरित मदत करा 📱",
    footerCopy:
      "© 2024 Khushhal Mushayra Social Welfare & Charitable Trust. सर्व हक्क राखीव.",
    footerTagline: "Designed with ❤️ for a better tomorrow",
    // Services (footer list)
    serviceItems: [
      "रक्तगट",
      "गरीबांना दान",
      "व्हीआयपी नंबर",
      "शिक्षण अपडेट",
      "मजूर सेवा",
      "खरेदी/विक्री",
      "विवाह विषय",
      "नगरपालिका तक्रार",
    ],
    // Useful links (footer list)
    usefulLinkItems: [
      "होम",
      "आमच्याबद्दल",
      "सेवा",
      "उपक्रम",
      "गॅलरी",
      "बातम्या",
      "संपर्क",
    ],
  },
  ur: {
    // Navbar
    brandName: "خوشحال مشاعرہ",
    brandSub: "سوشل ویلفیئر اینڈ چیریٹیبل ٹرسٹ، مہاراشٹر",
    donate: "عطیہ دیں",
    nav: {
      home: "ہوم",
      about: "ہمارے بارے میں",
      services: "خدمات",
      initiatives: "اقدامات",
      gallery: "گیلری",
      news: "خبریں",
      contact: "رابطہ",
    },
    // Footer
    footerDesc:
      "ہمارا مقصد معاشرے کے ضرورت مند طبقوں کی مدد کرنا، خدمت کے ذریعے اتحاد پیدا کرنا اور روشن مستقبل بنانا ہے۔",
    usefulLinks: "مفید روابط",
    servicesLabel: "خدمات",
    contactInfo: "رابطہ معلومات",
    quickContact: "فوری رابطہ",
    quickContactBtn: "فوری مدد حاصل کریں 📱",
    footerCopy:
      "© 2024 Khushhal Mushayra Social Welfare & Charitable Trust. تمام حقوق محفوظ ہیں۔",
    footerTagline: "Designed with ❤️ for a better tomorrow",
    serviceItems: [
      "بلڈ گروپ",
      "غریبوں کو عطیہ",
      "وی آئی پی نمبر",
      "تعلیمی اپڈیٹ",
      "مزدور سروس",
      "خرید/فروخت",
      "شادی کا موضوع",
      "میونسپل شکایت",
    ],
    usefulLinkItems: [
      "ہوم",
      "ہمارے بارے میں",
      "خدمات",
      "اقدامات",
      "گیلری",
      "خبریں",
      "رابطہ",
    ],
  },
  hi: {
    // Navbar
    brandName: "खुशहाल मुशायरा",
    brandSub: "सोशल वेलफेयर एंड चैरिटेबल ट्रस्ट, महाराष्ट्र",
    donate: "दान करें",
    nav: {
      home: "होम",
      about: "हमारे बारे में",
      services: "सेवाएं",
      initiatives: "पहल",
      gallery: "गैलरी",
      news: "समाचार",
      contact: "संपर्क",
    },
    // Footer
    footerDesc:
      "हमारा उद्देश्य समाज के जरूरतमंद वर्गों की मदद करना, सेवा के माध्यम से एकता लाना और उज्ज्वल भविष्य बनाना है।",
    usefulLinks: "उपयोगी लिंक",
    servicesLabel: "सेवाएं",
    contactInfo: "संपर्क जानकारी",
    quickContact: "त्वरित संपर्क",
    quickContactBtn: "त्वरित सहायता पाएं 📱",
    footerCopy:
      "© 2024 Khushhal Mushayra Social Welfare & Charitable Trust. सर्वाधिकार सुरक्षित।",
    footerTagline: "Designed with ❤️ for a better tomorrow",
    serviceItems: [
      "ब्लड ग्रुप",
      "गरीबों को दान",
      "वीआईपी नंबर",
      "शिक्षा अपडेट",
      "मजदूर सेवा",
      "खरीद/बिक्री",
      "विवाह विषय",
      "नगरपालिका शिकायत",
    ],
    usefulLinkItems: [
      "होम",
      "हमारे बारे में",
      "सेवाएं",
      "पहल",
      "गैलरी",
      "समाचार",
      "संपर्क",
    ],
  },
};

const LANG_OPTIONS = [
  { code: "mr", label: "मराठी", flag: "🇮🇳" },
  { code: "en", label: "English", flag: "🇬🇧" },
];

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("mr");
  const t = TRANSLATIONS[lang];

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, LANG_OPTIONS, TRANSLATIONS }}>
      {children}
    </LanguageContext.Provider>
  );
}
