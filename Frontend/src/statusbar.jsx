const stats = [
  { icon: '👥', value: '5000+', label: 'समुदायाचे सदस्य', gradient: 'from-pink-500 to-pink-600' },
  { icon: '❤️', value: '1000+', label: 'उपक्रम', gradient: 'from-yellow-400 to-yellow-500' },
  { icon: '🏘️', value: '250+', label: 'गावांमध्ये सेवा', gradient: 'from-orange-400 to-orange-500' },
  { icon: '🧑', value: '50+', label: 'अनुभवी कार्यकर्ते', gradient: 'from-green-500 to-green-600' },
  { icon: '🎧', value: '24/7', label: 'आपली सेवा', gradient: 'from-blue-600 to-blue-700' },
]

export default function StatsBar() {
  return (
    <section className="w-full py-6 md:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-center gap-3 md:gap-4">
          {stats.map((s, i) => (
            <div key={i} className={`bg-gradient-to-r ${s.gradient} rounded-lg px-6 md:px-8 py-4 md:py-5 flex items-center gap-3 md:gap-4 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex-shrink-0`}>
              <span className="text-3xl md:text-4xl drop-shadow-lg">{s.icon}</span>
              <div className="flex flex-col">
                <div className="text-2xl md:text-3xl font-black drop-shadow-md">{s.value}</div>
                <div className="text-xs md:text-sm opacity-90 font-semibold" style={{fontFamily:'Noto Sans Devanagari, sans-serif'}}>{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}