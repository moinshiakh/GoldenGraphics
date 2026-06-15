const newsItems = [
  {
    date: '10', month: 'एप्रिल', year: '2024',
    img: '🧹',
    title: 'स्वच्छता शिबिराचे आयोजन संपन्न',
    desc: 'या शिबिरात 200+ स्वयंसेवकांनी सहभाग घेतला.',
    color: 'bg-blue-500',
  },
  {
    date: '28', month: 'एप्रिल', year: '2024',
    img: '🎓',
    title: 'युवांसाठी करिअर विकास प्रशिक्षण',
    desc: 'रोजगारासाठी उपयुक्त प्रशिक्षण आणि करिअर मार्गदर्शन शिबिर.',
    color: 'bg-orange-500',
  },
  {
    date: '15', month: 'एप्रिल', year: '2024',
    img: '💰',
    title: 'महिला बचत गट कार्यशाळा',
    desc: 'महिलांच्या आर्थिक स्वावलंबनासाठी उपयुक्त कार्यक्रम.',
    color: 'bg-pink-500',
  },
  {
    date: '05', month: 'एप्रिल', year: '2024',
    img: '🌳',
    title: 'वृक्षारोपण मोहिमे यशस्वी',
    desc: '2500 झाडे लावून पर्यावरण संवर्धनाचा संदेश दिला.',
    color: 'bg-green-500',
  },
]

export default function News() {
  return (
    <section className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Title */}
        <div className="flex items-center gap-4 justify-center mb-8">
          <div className="flex-1 max-w-24 h-px bg-gradient-to-r from-transparent to-red-400"></div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500"></span>
            <h2 className="text-2xl font-bold text-gray-800" style={{fontFamily:'Noto Sans Devanagari, sans-serif'}}>बातम्या आणि उपक्रम</h2>
            <span className="w-2 h-2 rounded-full bg-red-500"></span>
          </div>
          <div className="flex-1 max-w-24 h-px bg-gradient-to-l from-transparent to-red-400"></div>
        </div>

        <div className="relative">
          {/* Prev/Next */}
          <button className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-50 border border-gray-200">◀</button>
          <button className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-50 border border-gray-200">▶</button>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {newsItems.map((item, i) => (
              <div key={i} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                {/* Image area */}
                <div className={`${item.color} h-40 flex items-center justify-center relative`}>
                  <span className="text-6xl">{item.img}</span>
                  {/* Date badge */}
                  <div className="absolute bottom-3 left-3 bg-white text-gray-800 rounded-lg px-2 py-1 text-center shadow">
                    <div className="text-lg font-black leading-none">{item.date}</div>
                    <div className="text-xs text-gray-500" style={{fontFamily:'Noto Sans Devanagari, sans-serif'}}>{item.month}</div>
                    <div className="text-xs text-gray-400">{item.year}</div>
                  </div>
                </div>
                <div className="p-4 space-y-2">
                  <h3 className="font-bold text-sm text-gray-800" style={{fontFamily:'Noto Sans Devanagari, sans-serif'}}>{item.title}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed" style={{fontFamily:'Noto Sans Devanagari, sans-serif'}}>{item.desc}</p>
                  <a href="#" className="text-orange-500 hover:text-orange-600 text-xs font-semibold" style={{fontFamily:'Noto Sans Devanagari, sans-serif'}}>वाचा अधिक →</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}