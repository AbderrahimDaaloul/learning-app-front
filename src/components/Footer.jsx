import React from "react";
import { Link } from "react-router-dom";
import {
  Brain,
  Shield,
  Twitter,
  Github,
  Linkedin,
  ArrowUpRight,
} from "lucide-react";

const Footer = () => {
  const footerSections = [
    {
      title: "Platform",
      links: [
        "PDF Materials",
        "Video Content",
        "Exercise Bank",
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
    <footer className="bg-[#030014] border-t border-white/5 relative overflow-hidden">
      {/* Background Accent Glow */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600/5 blur-[120px] -z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 mb-16 justify-items-center place-content-center">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6 flex flex-col items-center">
            <div className="flex items-center space-x-3 justify-center">
              <div className="p-2.5 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg shadow-blue-500/20">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-black text-white tracking-tight">
                EduPlatform
              </span>
            </div>

            <p className="text-slate-400 text-sm leading-relaxed max-w-sm text-center">
              The ultimate AI-powered ecosystem for Baccalaureate students.
              Bridging the gap between traditional learning and future
              technology.
            </p>

            <div className="flex items-center gap-4 justify-center">
              {[Twitter, Github, Linkedin].map((Icon, i) => (
                <Link
                  key={i}
                  to="#"
                  className="p-2 rounded-lg bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-all"
                >
                  <Icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section) => (
            <div key={section.title} className="lg:col-span-1 flex flex-col items-center">
              <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-6">
                {section.title}
              </h3>
              <ul className="space-y-4">
                {section.links.map((link) => (
                  <li key={link}>
                    <Link
                      to="#"
                      className="group flex items-center justify-center text-slate-400 hover:text-white transition-all text-sm"
                    >
                      <span>{link}</span>
                      <ArrowUpRight className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-white/5 flex flex-col items-center justify-center gap-6">
          <div className="flex flex-col items-center gap-4">
            <p className="text-slate-500 text-xs font-medium">
              © 2026 EduPlatform. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <Link to="#" className="text-xs text-slate-500 hover:text-white">
                Privacy
              </Link>
              <Link to="#" className="text-xs text-slate-500 hover:text-white">
                Terms
              </Link>
              
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
