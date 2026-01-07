import React from 'react';
import { 
  Play, 
  Clock, 
  CheckCircle, 
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap
} from 'lucide-react';

const CTASection = () => {
  return (
    <section className="relative py-24 bg-white overflow-hidden">
      {/* Subtle Background Pattern (Optional) */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
      
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* The Card - Now with a White/Slate theme */}
        <div className="relative bg-white  rounded-[3rem] p-8 md:p-16 lg:p-20 ]">
          
          {/* Subtle Accent Glows for White Theme */}
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-blue-50 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-96 h-96 bg-indigo-50 rounded-full blur-[100px]"></div>

          <div className="relative z-10 flex flex-col items-center text-center">
            {/* Top Badge */}
           

            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-slate-900 mb-8 tracking-tighter leading-[1.1]">
              Ready to <span className="text-blue-600">Transform</span> <br />
              Your Learning?
            </h2>

            <p className="text-lg md:text-xl text-slate-500 mb-12 max-w-2xl leading-relaxed font-medium">
              Join <span className="text-slate-900 font-bold">10,000+ successful students</span> who are already mastering the Baccalaureate with our AI-driven tools.
            </p>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              {/* Primary Action - Dark to stand out on White */}
              <button className="group relative bg-slate-900 text-white px-10 py-5 rounded-2xl font-bold text-lg transition-all hover:bg-slate-800 hover:scale-[1.02] active:scale-95 flex items-center justify-center space-x-3 shadow-xl shadow-slate-200">
                <Play className="h-5 w-5 fill-current" />
                <span>Start learning now</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

             
            </div>
            
            {/* Trust Footer */}
           
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;