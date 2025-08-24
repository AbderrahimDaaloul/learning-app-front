import React from "react";
import { FaFilePdf, FaVideo, FaRobot, FaClipboardCheck, FaArchive, FaBookOpen, FaChalkboardTeacher } from "react-icons/fa";

const features = [
  {
    title: "PDF Courses",
    description: "Access detailed, structured PDF courses for every topic.",
    icon: <FaFilePdf className="h-8 w-8 text-indigo-600" />,
    link: "/pdf-courses"
  },
  {
    title: "Video Courses",
    description: "Watch high-quality video lessons and explanations.",
    icon: <FaVideo className="h-8 w-8 text-purple-600" />,
    link: "/video-courses"
  },
  {
    title: "PDF Exercises",
    description: "Practice with exercises and corrections in PDF format.",
    icon: <FaClipboardCheck className="h-8 w-8 text-green-600" />,
    link: "/pdf-exercises"
  },
  {
    title: "Video Exercise Corrections",
    description: "Get step-by-step video corrections for exercises.",
    icon: <FaChalkboardTeacher className="h-8 w-8 text-pink-600" />,
    link: "/video-exercises"
  },
  {
    title: "Corrected Past Baccalaureates",
    description: "Browse an archive of corrected past baccalaureate exams.",
    icon: <FaArchive className="h-8 w-8 text-yellow-600" />,
    link: "/archive"
  },
  {
    title: "AI Chatbot",
    description: "Ask questions, upload documents, and get instant explanations in multiple languages.",
    icon: <FaRobot className="h-8 w-8 text-blue-500" />,
    link: "/chatbot"
  },
  {
    title: "Self Assessment Quizzes",
    description: "Test your knowledge and get instant feedback.",
    icon: <FaBookOpen className="h-8 w-8 text-indigo-400" />,
    link: "/quizzes"
  }
];

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-indigo-800 mb-10">Welcome to Your Dashboard</h1>
        <p className="text-center text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
          Access all your learning resources, tools, and features in one place. Choose a section below to get started!
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <a
              key={feature.title}
              href={feature.link}
              className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center hover:shadow-2xl hover:scale-105 transition-all border border-indigo-100 group"
            >
              <div className="mb-4 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h2 className="text-xl font-bold text-indigo-800 mb-2 text-center">{feature.title}</h2>
              <p className="text-gray-600 text-center mb-4">{feature.description}</p>
              <span className="mt-auto text-indigo-500 font-semibold group-hover:underline">Go to {feature.title}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
