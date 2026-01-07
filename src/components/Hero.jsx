import React from 'react';
import { 
  BookOpen, 
  Video, 
  FileText, 
  MessageSquare, 
  Play, 
  Download, 
  Zap, 
  Sparkles 
} from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen bg-[#030014] overflow-hidden flex items-center">
      {/* 1. Ambient Background Elements */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob animation-delay-4000"></div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Content Column */}
          <div className="space-y-8 animate-fade-in-up">
            <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 backdrop-blur-xl rounded-full px-4 py-1.5 text-sm font-medium text-blue-300 ring-1 ring-inset ring-blue-500/20">
              <Sparkles className="h-4 w-4 text-blue-400" />
              <span>Next-Gen Education</span>
            </div>
            
            <h1 className="text-6xl lg:text-8xl font-extrabold tracking-tight text-white">
              Master  <br />
              <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent">
                Computer Science
              </span>
            </h1>
            
            <p className="text-lg text-slate-400 max-w-lg leading-relaxed">
              Experience a personalized learning journey powered by AI. Access premium 
              archives, interactive labs, and expert-led video courses tailored for success.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5">
              <button className="group relative bg-white text-black px-8 py-4 rounded-2xl font-bold text-lg transition-all hover:bg-blue-50 flex items-center justify-center space-x-2 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-500 opacity-0 group-hover:opacity-10 transition-opacity"></div>
                <Play className="h-5 w-5 fill-current" />
                <span>Get Started Free</span>
              </button>
              
              <button className="group border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all flex items-center justify-center space-x-2">
                <Download className="h-5 w-5 text-slate-400 group-hover:text-white transition-colors" />
                <span>Offline Prep</span>
              </button>
            </div>

            {/* Social Proof/Trust Marks */}
            <div className="pt-8 border-t border-white/5 flex items-center gap-6">
              <div className="flex -space-x-3">
                {[1,2,3,4].map(i => (
                  <div key={i} className="h-10 w-10 rounded-full border-2 border-[#030014] bg-slate-800" />
                ))}
              </div>
              <p className="text-sm text-slate-500">
                <span className="text-white font-semibold">10k+</span> students preparing today
              </p>
            </div>
          </div>
          
          {/* Right Cards Column - Staggered Layout */}
          <div className="relative lg:h-[600px] flex items-center">
            <div className="grid grid-cols-2 gap-4 w-full relative z-10">
              {[
                { icon: BookOpen, title: 'Courses', color: 'from-blue-500/20', border: 'border-blue-500/30', delay: '0', translate: 'lg:translate-y-8' },
                { icon: Video, title: 'Videos', color: 'from-purple-500/20', border: 'border-purple-500/30', delay: '100', translate: 'lg:-translate-y-4' },
                { icon: FileText, title: 'Exams', color: 'from-emerald-500/20', border: 'border-emerald-500/30', delay: '200', translate: 'lg:translate-y-12' },
                { icon: MessageSquare, title: 'AI Tutor', color: 'from-pink-500/20', border: 'border-pink-500/30', delay: '300', translate: 'lg:translate-y-0' }
              ].map((card, index) => (
                <div 
                  key={index} 
                  className={`group p-8 rounded-[2rem] bg-gradient-to-b ${card.color} to-transparent border ${card.border} backdrop-blur-2xl transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(79,70,229,0.15)] ${card.translate}`}
                >
                  <div className="mb-4 inline-block p-3 rounded-xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform">
                    <card.icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{card.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">Curated high-quality resources for top grades.</p>
                </div>
              ))}
            </div>
            
            {/* Background Glow for Cards */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-blue-600/10 blur-[120px] rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;