import React from 'react';


// Features Section Component
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


const FeaturesSection = () => {
  const features = [
    {
      icon: BookOpen,
      title: 'Comprehensive PDF Courses',
      description: 'Access detailed study materials and comprehensive course content in PDF format, designed by experts.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Video,
      title: 'Interactive Video Content',
      description: 'Engaging video lessons with explanations and demonstrations to enhance your understanding.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: FileText,
      title: 'Exercise Materials & Corrections',
      description: 'Practice with extensive exercise banks and get instant corrections with detailed explanations.',
      color: 'from-green-500 to-teal-500'
    },
    {
      icon: Trophy,
      title: 'Past Exam Archives',
      description: 'Access corrected past baccalaureate exams to familiarize yourself with exam patterns.',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: MessageSquare,
      title: 'AI Chatbot Assistant',
      description: 'Get multilingual Q&A support and document explanations powered by advanced AI technology.',
      color: 'from-indigo-500 to-purple-500'
    },
    {
      icon: CheckCircle,
      title: 'Self Assessment Quizzes',
      description: 'Test your knowledge with interactive quizzes and receive instant feedback on your progress.',
      color: 'from-pink-500 to-red-500'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Everything You Need to
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Excel in Your Studies
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our comprehensive platform combines traditional learning materials with cutting-edge AI technology 
            to provide you with the best educational experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-gray-100"
            >
              <div className={`bg-gradient-to-r ${feature.color} rounded-xl p-4 w-fit mb-6 group-hover:scale-110 transition-transform`}>
                <feature.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              <div className="mt-4 flex items-center text-blue-600 font-medium group-hover:text-purple-600 transition-colors">
                <span>Learn more</span>
                <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;