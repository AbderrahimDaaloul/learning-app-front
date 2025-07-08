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


// Stats Section Component
const StatsSection = () => {
  const stats = [
    { number: '10,000+', label: 'Students Learning', icon: Users },
    { number: '500+', label: 'Course Materials', icon: BookOpen },
    { number: '1,000+', label: 'Video Lessons', icon: Video },
    { number: '98%', label: 'Success Rate', icon: Trophy }
  ];

  return (
    <section className="py-20 bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Trusted by Thousands of Students
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Join our growing community of successful learners who have achieved their academic goals with our platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 hover:bg-white/20 transition-all transform hover:scale-105 border border-white/20">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-full p-4 w-fit mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-4xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-gray-300">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;