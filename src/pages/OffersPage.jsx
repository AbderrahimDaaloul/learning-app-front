import React from "react";

const offers = [
  {
    type: "Monthly Subscription",
    duration: "1 Month",
    options: [
      {
        title: "Full Access",
        price: "30 TND/mo",
        features: [
          "All PDF Courses",
          "All Corrected Exams",
          "All Video Lessons",
          "AI Chatbot & Exercises"
        ],
        highlight: true
      },
      {
        title: "PDF & Exams Only",
        price: "15 TND/mo",
        features: [
          "All PDF Courses",
          "All Corrected Exams"
        ],
        highlight: false
      }
    ]
  },
  {
    type: "Yearly Subscription",
    duration: "12 Months",
    options: [
      {
        title: "Full Access",
        price: "250 TND/year",
        features: [
          "All PDF Courses",
          "All Corrected Exams",
          "All Video Lessons",
          "AI Chatbot & Exercises"
        ],
        highlight: true
      },
      {
        title: "PDF & Exams Only",
        price: "120 TND/year",
        features: [
          "All PDF Courses",
          "All Corrected Exams"
        ],
        highlight: false
      }
    ]
  }
];


const OffersPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 py-16 px-4 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-10 text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
        Choose Your Offer
      </h1>
      <div className="flex flex-col md:flex-row gap-12 w-full max-w-5xl justify-center">
        {offers.map((offer, idx) => (
          <div key={offer.type} className="flex-1 flex flex-col items-center ">
            <div className="relative w-full max-w-md bg-white/10 rounded-3xl shadow-2xl border border-white/20 p-8 flex flex-col items-center mb-8">
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full px-8 py-2 text-white font-bold shadow-lg text-lg text-center">
                {offer.type}
              </div>
              <p className="mt-8 text-purple-200 text-center text-lg font-semibold tracking-wide">{offer.duration}</p>
              <div className="flex flex-col gap-8 w-full mt-8">
                {offer.options.map((opt, i) => (
                  <div
                    key={opt.title}
                    className={`relative bg-white/20 rounded-2xl p-6 border border-white/20 shadow-lg flex flex-col items-center transition-transform duration-300 hover:scale-105 ${opt.highlight ? 'ring-2 ring-blue-400' : ''}`}
                  >
                    {opt.highlight && (
                      <span className="absolute -top-4 right-4 bg-blue-500 text-white text-xs px-3 py-1 rounded-full font-semibold shadow">Most Popular</span>
                    )}
                    <h3 className="text-xl font-semibold text-white mb-2 text-center">{opt.title}</h3>
                    <div className="text-3xl font-bold text-blue-300 mb-4">{opt.price}</div>
                    <ul className="mb-6 space-y-2 w-full">
                      {opt.features.map((f) => (
                        <li key={f} className="text-white flex items-center gap-2">
                          <span className="inline-block w-2 h-2 bg-blue-400 rounded-full"></span>
                          {f}
                        </li>
                      ))}
                    </ul>
                    <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-2 rounded-full font-semibold text-lg transition-all transform hover:scale-105 shadow-lg">
                      Choose
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OffersPage;
