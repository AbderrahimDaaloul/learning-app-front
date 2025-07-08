import React from "react";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { name: "Nos offres", path: "/offres", icon: BookOpen },
    // { name: "Contenu", path: "/Contenu", icon: FileText },
    { name: "A propos ", path: "/propos", icon: Trophy },
    { name: "Contacter Nous", path: "/Contacter", icon: MessageSquare },
  ];

  return (
    <nav className="bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 backdrop-blur-lg border-b border-white/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg group-hover:scale-110 transition-transform">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              EduPlatform
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="flex items-center space-x-1 text-gray-300 hover:text-white transition-colors group"
              >
                <item.icon className="h-4 w-4 group-hover:scale-110 transition-transform" />
                <span>{item.name}</span>
              </Link>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-4 ">
            <Link to={"/login"}>
              {" "}
              <button className="text-gray-300 hover:text-white transition-colors cursor-pointer">
                Login
              </button>
            </Link>
            <Link to={"/register"}>
              {" "}
              <button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-2 rounded-full font-semibold transition-all transform hover:scale-105 cursor-pointer">
                Get Started
              </button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-300 hover:text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-black/20 backdrop-blur-xl border-t border-white/10">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="flex items-center space-x-2 text-gray-300 hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg transition-all"
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              ))}
              <div className="pt-4 space-y-2">
                <button className="w-full text-left text-gray-300 hover:text-white px-3 py-2 rounded-lg transition-colors">
                  Login
                </button>
                <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-2 rounded-lg font-semibold">
                  Get Started
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
export default Navbar;
