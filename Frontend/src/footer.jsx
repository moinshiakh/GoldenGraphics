export default function Footer() {
  const usefulLinks = ['होम', 'आमच्याबद्दल', 'सेवा', 'उपक्रम', 'गॅलरी', 'बातम्या', 'संपर्क']
  const services = ['Blood Group', 'Donate Poor', 'VIP Numbers', 'Education Update', 'Labour Service', 'Sell/Buy', 'Marriage Topic', 'Nagarpalika Complaint']

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-green-700 flex items-center justify-center text-white font-bold border-2 border-yellow-500 text-sm">ख</div>
              <div>
                <div className="text-white font-bold text-sm" style={{fontFamily:'Noto Sans Devanagari, sans-serif'}}>खुशहाल मुशायरा</div>
                <div className="text-gray-400 text-xs" style={{fontFamily:'Noto Sans Devanagari, sans-serif'}}>सोशल वेलफेअर & चॅरिटेबल ट्रस्ट, महाराष्ट्र</div>
              </div>
            </div>
            <p className="text-gray-400 text-xs leading-relaxed mb-4" style={{fontFamily:'Noto Sans Devanagari, sans-serif'}}>
              आमचा उद्देश समाजातील गरजू घटकांना एकांगी सहाय्य करणे, सेवा, एकता येऊन उज्ज्वल भविष्य घडवणे.
            </p>
            <div className="flex gap-2">
              {['f','in','t','▶','©'].map((s,i) => (
                <a key={i} href="#" className="w-7 h-7 rounded-full bg-gray-700 hover:bg-blue-600 flex items-center justify-center text-white text-xs transition-colors">{s}</a>
              ))}
            </div>
          </div>

          {/* Useful Links */}
          <div>
            <h4 className="text-white font-bold mb-4" style={{fontFamily:'Noto Sans Devanagari, sans-serif'}}>उपयुक्त दुवे</h4>
            <ul className="space-y-2">
              {usefulLinks.map((l,i) => (
                <li key={i}>
                  <a href="#" className="text-gray-400 hover:text-orange-400 text-xs flex items-center gap-2 transition-colors" style={{fontFamily:'Noto Sans Devanagari, sans-serif'}}>
                    <span className="text-orange-500">›</span> {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-bold mb-4">सेवा</h4>
            <ul className="space-y-2">
              {services.map((s,i) => (
                <li key={i}>
                  <a href="#" className="text-gray-400 hover:text-orange-400 text-xs transition-colors">{s}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold mb-4" style={{fontFamily:'Noto Sans Devanagari, sans-serif'}}>संपर्क माहिती</h4>
            <div className="space-y-3 text-xs text-gray-400">
              <div className="flex items-start gap-2">
                <span>📞</span>
                <span>+91 8800 123 456</span>
              </div>
              <div className="flex items-start gap-2">
                <span>✉️</span>
                <span>info@khushhaltrust.org</span>
              </div>
              <div className="flex items-start gap-2">
                <span>📍</span>
                <span style={{fontFamily:'Noto Sans Devanagari, sans-serif'}}>पुणे, महाराष्ट्र, भारत - 411001</span>
              </div>
            </div>
            <h4 className="text-white font-bold mt-6 mb-3" style={{fontFamily:'Noto Sans Devanagari, sans-serif'}}>त्वरित संपर्क</h4>
            <button className="bg-green-600 hover:bg-green-500 text-white font-semibold text-xs px-4 py-2.5 rounded-full transition-colors w-full" style={{fontFamily:'Noto Sans Devanagari, sans-serif'}}>
              त्वरित मदत करा 📱
            </button>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-wrap items-center justify-between gap-2 text-xs text-gray-500">
          <span style={{fontFamily:'Noto Sans Devanagari, sans-serif'}}>© 2024 Khushhal Mushayra Social Welfare & Charitable Trust. सर्व हक्क राखीव.</span>
          <span>Designed with ❤️ for a better tomorrow</span>
        </div>
      </div>
    </footer>
  )
}