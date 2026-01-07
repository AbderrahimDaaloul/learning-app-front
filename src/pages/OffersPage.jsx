import React, { useState } from "react";
import { Check, Zap, Users, Clock, BookOpen, Play } from "lucide-react";

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
        highlight: true,
        saving: "Save 17%"
      },
      {
        title: "PDF & Exams Only",
        price: "120 TND/year",
        features: [
          "All PDF Courses",
          "All Corrected Exams"
        ],
        highlight: false,
        saving: "Save 17%"
      }
    ]
  }
];

const OffersPage = () => {
  const [isAnnual, setIsAnnual] = useState(true);

 

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-blue-50/30 to-slate-50 py-20 px-4 sm:px-6 lg:px-8 mt-16">
      {/* Hero Section */}
      <div className="max-w-5xl mx-auto text-center mb-20">
       
        
        <h1 className="text-6xl md:text-7xl font-black text-gray-900 mb-6 leading-tight">
          Invest in Your <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Future</span>
        </h1>
        
        <p className="text-xl text-gray-600 mb-12 leading-relaxed">
          Unlock unlimited access to our comprehensive learning platform. Choose a plan that works for you and start mastering today.
        </p>

        {/* Toggle Switch */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex items-center gap-4 p-1 bg-gray-200/50 rounded-full backdrop-blur-sm">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                !isAnnual
                  ? 'bg-white text-blue-600 shadow-lg'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                isAnnual
                  ? 'bg-white text-blue-600 shadow-lg'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Yearly
              <span className="ml-2 text-xs bg-green-500 text-white px-2 py-1 rounded-full">Save 17%</span>
            </button>
          </div>
        </div>
      </div>



      {/* Pricing Cards */}
      <div className="max-w-6xl mx-auto mb-20">
        <div className="grid lg:grid-cols-2 gap-8">
          {(isAnnual ? offers[1] : offers[0]).options.map((plan, idx) => (
            <div
              key={idx}
              className={`group relative rounded-3xl overflow-hidden transition-all duration-300 ${
                plan.highlight
                  ? 'lg:scale-105 order-first lg:order-last'
                  : ''
              }`}
            >
              {/* Background Gradient */}
              {plan.highlight && (
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-600 to-purple-600"></div>
              )}
              {!plan.highlight && (
                <div className="absolute inset-0 bg-white"></div>
              )}

              {/* Blur Effect */}
              <div className={`absolute -top-40 -right-40 w-80 h-80 rounded-full blur-3xl ${
                plan.highlight
                  ? 'bg-white/20'
                  : 'bg-blue-100'
              }`}></div>

              {/* Content */}
              <div className="relative p-10 flex flex-col h-full">
                {/* Badge */}
                {plan.highlight && (
                  <div className="flex items-center gap-2 mb-6">
                    <span className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-md text-white text-xs font-bold rounded-full border border-white/30">
                      Most Popular
                    </span>
                    {plan.saving && (
                      <span className="inline-block px-4 py-1.5 bg-green-400/20 backdrop-blur-md text-green-100 text-xs font-bold rounded-full border border-green-400/30">
                        {plan.saving}
                      </span>
                    )}
                  </div>
                )}

                {/* Title */}
                <h3 className={`text-3xl font-black mb-4 ${plan.highlight ? 'text-white' : 'text-gray-900'}`}>
                  {plan.title}
                </h3>

                {/* Price */}
                <div className="mb-8">
                  <div className={`flex items-baseline gap-2 ${plan.highlight ? 'text-white' : 'text-gray-900'}`}>
                    <span className="text-5xl font-black">{plan.price.split('/')[0]}</span>
                    <span className={plan.highlight ? 'text-white/70' : 'text-gray-500'}>
                      /{plan.price.split('/')[1]}
                    </span>
                  </div>
                  <p className={`text-sm mt-2 ${plan.highlight ? 'text-white/80' : 'text-gray-600'}`}>
                    Billed {isAnnual ? 'annually' : 'monthly'}
                  </p>
                </div>

                {/* CTA Button */}
                <button className={`w-full py-4 px-6 rounded-xl font-bold text-lg mb-8 transition-all duration-300 transform hover:scale-105 ${
                  plan.highlight
                    ? 'bg-white text-blue-600 hover:bg-blue-50 shadow-2xl'
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-xl'
                }`}>
                  Get Started Now
                </button>

                {/* Features */}
                <div className="space-y-4 flex-1">
                  <p className={`font-bold text-sm uppercase tracking-wide ${
                    plan.highlight ? 'text-white/80' : 'text-gray-500'
                  }`}>
                    What's Included
                  </p>
                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className={`flex items-center gap-3 ${
                        plan.highlight ? 'text-white/90' : 'text-gray-700'
                      }`}>
                        <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${
                          plan.highlight ? 'bg-white/20' : 'bg-blue-100'
                        }`}>
                          <Check className={`w-4 h-4 ${plan.highlight ? 'text-white' : 'text-blue-600'}`} />
                        </div>
                        <span className="font-medium">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

     
      
    </div>
  );
};

export default OffersPage;
