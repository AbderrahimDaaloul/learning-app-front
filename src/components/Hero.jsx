import React from 'react';

import { 
  BookOpen, 
  Video, 
  FileText, 
  MessageSquare, 
  Trophy, 
  Users, 
  Star,
  Menu,
  X,
  ChevronRight,
  Play,
  Download,
  Brain,
  Globe,
  CheckCircle,
  ArrowRight,
  Zap,
  Shield,
  Clock
} from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-lg rounded-full px-4 py-2 text-sm text-white">
              <Zap className="h-4 w-4 text-yellow-400" />
              <span>AI-Powered Learning Platform</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight">
              Master Your
              <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Baccalaureate
              </span>
              Journey
            </h1>
            
            <p className="text-xl text-gray-300 max-w-lg">
              Comprehensive courses, interactive exercises, past exam archives, and AI-powered assistance 
              to help you excel in your studies.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all transform hover:scale-105 flex items-center space-x-2">
                <Play className="h-5 w-5" />
                <span>Start Learning</span>
              </button>
              <button className="border-2 border-white/30 hover:border-white/50 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all hover:bg-white/10 flex items-center space-x-2">
                <Download className="h-5 w-5" />
                <span>Download Materials</span>
              </button>
            </div>
          </div>
          
          {/* Interactive Cards */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-6">
              {[
                { icon: BookOpen, title: 'PDF Courses', desc: 'Detailed study materials' },
                { icon: Video, title: 'Video Content', desc: 'Interactive lessons' },
                { icon: FileText, title: 'Exercise Bank', desc: 'Practice with corrections' },
                { icon: MessageSquare, title: 'AI Assistant', desc: 'Multilingual support' }
              ].map((card, index) => (
                <div 
                  key={index} 
                  className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 hover:bg-white/20 transition-all transform hover:scale-105 border border-white/20"
                >
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-3 w-fit mb-4">
                    <card.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-white font-semibold mb-2">{card.title}</h3>
                  <p className="text-gray-300 text-sm">{card.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default HeroSection;