import React from 'react';
import { Link } from "react-router-dom";

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
  Clock,
} from "lucide-react";

// Footer Component
const Footer = () => {
  const footerSections = [
   
    {
      title: "Features",
      links: [
        "PDF Materials",
        "Video Content",
        "Exercise Corrections",
        "Past Exams",
        "Self Assessment",
      ],
    },
    {
      title: "Support",
      links: ["Help Center", "Contact Us", "FAQ", "Community", "Documentation"],
    },
    {
      title: "Company",
      links: [
        "About Us",
        "Careers",
        "Privacy Policy",
        "Terms of Service",
        "Blog",
      ],
    },
  ];

  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                EduPlatform
              </span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Transform your learning journey with our comprehensive platform
              featuring AI-powered assistance, detailed courses, and interactive
              exercises designed for academic excellence.
            </p>
            <div className="flex space-x-4">
              <button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-full font-semibold transition-all transform hover:scale-105">
                Start Learning Now
              </button>
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-white font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link}>
                    <Link
                      to="#"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2025 EduPlatform. All rights reserved.
          </p>
          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            {/* <div className="flex items-center space-x-2 text-gray-400">
              <Globe className="h-4 w-4" />
              <span className="text-sm">Available in multiple languages</span>
            </div> */}
            <div className="flex items-center space-x-2 text-gray-400">
              <Shield className="h-4 w-4" />
              <span className="text-sm">Secure & Private</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;  