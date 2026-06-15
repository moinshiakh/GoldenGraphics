export default function CTA() {
  return (
    <section
      className="w-full py-6"
      style={{ fontFamily: "Noto Sans Devanagari, sans-serif" }}
    >
      <div className="relative overflow-hidden rounded-[28px] shadow-xl min-h-[205px] border border-white/10">

        {/* LEFT BACKGROUND */}
        <div
          className="absolute inset-y-0 left-0 w-[55%]"
          style={{
            background:
              "linear-gradient(90deg, #ff006e 0%, #ff3d4d 55%, #ff623d 100%)",
          }}
        />

        {/* RIGHT BACKGROUND */}
        <div
          className="absolute inset-y-0 right-0 w-[50%]"
          style={{
            background:
              "linear-gradient(90deg, #1f4dbb 0%, #1f87d7 60%, #25c5cf 100%)",
          }}
        />

        {/* CENTER CURVE */}
        <div
          className="absolute top-0 left-[49%] h-full w-[120px] bg-[#1f4dbb]"
          style={{
            borderTopLeftRadius: "120px",
            borderBottomLeftRadius: "120px",
          }}
        />

        {/* CONTENT */}
        <div className="relative z-10 flex flex-col lg:flex-row h-full">

          {/* LEFT SECTION */}
          <div className="lg:w-1/2 flex items-center px-10 py-8">

            {/* Telegram Icon */}
            <div className="mr-6 flex-shrink-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                fill="white"
                className="w-14 h-14"
              >
                <path d="M5.83 23.616L42.128 9.232c1.112-.432 2.088.268 1.8 1.756l-5.656 26.636c-.412 1.828-1.492 2.28-3.024 1.42l-8.232-6.072-3.972 3.828c-.448.444-.824.816-1.672.816l.584-8.452 15.404-13.916c.672-.596-.144-.928-1.04-.332L14.284 28.104l-8.032-2.512c-1.748-.548-1.788-1.748.36-2.576z" />
              </svg>
            </div>

            <div>
              <h2 className="text-white text-[30px] font-extrabold leading-tight">
                आजच आपणही या परिवर्तनाचा भाग व्हा!
              </h2>

              <p className="text-white mt-3 text-[18px]">
                आपले एक पाऊल, अनेकांचे जीवन उजळेल.
              </p>

              <button className="mt-5 bg-[#f4c43d] hover:bg-[#ffd34d] text-black font-bold text-[18px] px-10 py-3 rounded-full transition-all">
                दान करा आणि मदत करा ❤️
              </button>
            </div>
          </div>

          {/* RIGHT SECTION */}
          <div className="lg:w-1/2 flex items-center px-10 py-8">

            {/* Mail Icon */}
            <div className="mr-6 flex-shrink-0">
              <div className="w-16 h-16 rounded-full border-2 border-white flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="white"
                  strokeWidth={1.8}
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0L12 13.5 2.25 6.75"
                  />
                </svg>
              </div>
            </div>

            <div className="flex-1">
              <h2 className="text-white text-[30px] font-extrabold leading-tight">
                नवीन अपडेट्स मिळवा
              </h2>

              <p className="text-white mt-3 text-[18px] mb-5">
                आमच्या उपक्रमांची माहिती तुमच्या ईमेलवर मिळवा.
              </p>

              <div className="flex w-full max-w-[520px] overflow-hidden rounded-md">
                <input
                  type="email"
                  placeholder="आपला ईमेल प्रविष्ट करा"
                  className="flex-1 h-[58px] px-5 text-lg text-gray-700 outline-none"
                />

                <button className="h-[58px] px-8 bg-[#061c74] hover:bg-[#041454] text-white font-bold whitespace-nowrap flex items-center gap-2">
                  सबस्क्राईब करा

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 48 48"
                    fill="white"
                    className="w-4 h-4"
                  >
                    <path d="M5.83 23.616L42.128 9.232c1.112-.432 2.088.268 1.8 1.756l-5.656 26.636c-.412 1.828-1.492 2.28-3.024 1.42l-8.232-6.072-3.972 3.828c-.448.444-.824.816-1.672.816l.584-8.452 15.404-13.916c.672-.596-.144-.928-1.04-.332L14.284 28.104l-8.032-2.512c-1.748-.548-1.788-1.748.36-2.576z" />
                  </svg>
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}