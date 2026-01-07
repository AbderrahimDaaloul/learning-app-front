import React from 'react';
import { 
  Users, 
  BookOpen, 
  Video, 
  Trophy, 
  ArrowUpRight 
} from 'lucide-react';

const StatsSection = () => {
  const stats = [
    { number: '10,000+', label: 'Active Students', icon: Users, sub: 'Learning daily' },
    { number: '500+', label: 'Study Modules', icon: BookOpen, sub: 'Curated by experts' },
    { number: '1,000+', label: 'Video Hours', icon: Video, sub: 'High-definition' },
    { number: '98%', label: 'Success Rate', icon: Trophy, sub: 'Baccalaureate 2024' }
  ];

  return (
    <section className="relative py-24 bg-[#030014] overflow-hidden">
      {/* Decorative Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-indigo-600/10 blur-[120px] rounded-full"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl lg:text-5xl font-black text-white mb-6">
              Proven Results for <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
                Ambitious Minds
              </span>
            </h2>
            <p className="text-lg text-slate-400">
              We don't just provide content; we provide a proven pathway to success. 
              Our data speaks for the dedication of our community.
            </p>
          </div>
          <div className="hidden lg:block">
            <button className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-full text-white hover:bg-white/10 transition-all">
              <span>View Success Stories</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="group relative p-8 rounded-[2rem] bg-white/5 border border-white/10 overflow-hidden transition-all duration-500 hover:bg-white/[0.08] hover:border-white/20"
            >
              {/* Animated Corner Accent */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="relative z-10">
                <div className="mb-6 inline-flex p-3 rounded-xl bg-white/5 border border-white/10 group-hover:scale-110 group-hover:bg-blue-500 transition-all duration-500">
                  <stat.icon className="h-6 w-6 text-blue-400 group-hover:text-white" />
                </div>
                
                <div className="flex flex-col">
                  <span className="text-5xl font-extrabold text-white tracking-tighter mb-1">
                    {stat.number}
                  </span>
                  <span className="text-lg font-bold text-slate-200 mb-1">
                    {stat.label}
                  </span>
                  <span className="text-sm text-slate-500 font-medium">
                    {stat.sub}
                  </span>
                </div>
              </div>

              {/* Progress-style Bar Decoration */}
              <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-blue-500 to-indigo-500 group-hover:w-full transition-all duration-700"></div>
            </div>
          ))}
        </div>
        
        {/* Mobile-only button */}
        <div className="mt-10 lg:hidden text-center">
           <button className="w-full flex justify-center items-center gap-2 px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white">
              <span>View Success Stories</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;