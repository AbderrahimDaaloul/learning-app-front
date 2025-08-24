import { useState } from 'react';
import React from 'react';

const InfoBac = () => {
  const [activeSection, setActiveSection] = useState('courses');
  
  const navItems = [
    { id: 'courses', icon: '📚', label: 'Courses' },
    { id: 'videos', icon: '🎥', label: 'Videos' },
    { id: 'pdfs', icon: '📄', label: 'PDF Materials' },
    { id: 'exercises', icon: '📝', label: 'Exercises' },
    { id: 'exams', icon: '📅', label: 'Past Exams' },
    { id: 'quiz', icon: '❓', label: 'Self Assessment' },
    { id: 'progress', icon: '📊', label: 'Progress' }
  ];

  const courses = [
    { 
      title: "Algorithms Fundamentals", 
      description: "Learn the core concepts of algorithmic thinking and problem-solving techniques.",
      lessons: "12 Lessons",
      duration: "6h 30m",
      progress: 75,
      emoji: "🧮"
    },
    { 
      title: "Data Structures", 
      description: "Master arrays, linked lists, trees, and graphs for efficient data organization.",
      lessons: "15 Lessons",
      duration: "8h 45m",
      progress: 45,
      emoji: "📊"
    },
    { 
      title: "Programming in Python", 
      description: "Complete guide to Python programming for informatics applications.",
      lessons: "20 Lessons",
      duration: "12h 15m",
      progress: 20,
      emoji: "💻"
    },
    { 
      title: "Database Systems", 
      description: "Learn SQL, database design, and relational database management.",
      lessons: "18 Lessons",
      duration: "9h 20m",
      progress: 0,
      emoji: "🗄️"
    }
  ];

  const videos = [
    { 
      title: "Introduction to Algorithms", 
      description: "Basic concepts and complexity analysis",
      duration: "45 minutes",
      quality: "HD Quality",
      emoji: "🎥"
    },
    { 
      title: "Sorting Algorithms", 
      description: "Bubble sort, merge sort, and quick sort explained",
      duration: "1h 20m",
      quality: "HD Quality",
      emoji: "🎬"
    },
    { 
      title: "Python Basics", 
      description: "Variables, functions, and control structures",
      duration: "2h 10m",
      quality: "HD Quality",
      emoji: "📹"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 to-purple-700 text-gray-800">
      <div className="max-w-7xl mx-auto p-5">
        {/* Header */}
        <header className="bg-white bg-opacity-95 backdrop-blur-lg rounded-xl p-5 mb-6 shadow-xl flex justify-between items-center">
          <div className="text-2xl font-bold text-indigo-600">📚 InfoBac</div>
          <div className="flex items-center gap-4">
            <span>Welcome, Ahmed</span>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-600 to-purple-700 flex items-center justify-center text-white font-semibold">
              AH
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr_300px] gap-6 h-[calc(100vh-120px)]">
          {/* Sidebar */}
          <nav className="bg-white bg-opacity-95 backdrop-blur-lg rounded-xl p-6 shadow-xl overflow-y-auto">
            {navItems.map((item) => (
              <div
                key={item.id}
                className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all mb-1 font-medium ${
                  activeSection === item.id
                    ? 'bg-gradient-to-br from-indigo-600 to-purple-700 text-white'
                    : 'hover:bg-indigo-100 hover:translate-x-1'
                }`}
                onClick={() => setActiveSection(item.id)}
              >
                <span className="text-xl">{item.icon}</span>
                {item.label}
              </div>
            ))}
          </nav>

          {/* Content Area */}
          <main className="bg-white bg-opacity-95 backdrop-blur-lg rounded-xl shadow-xl overflow-hidden flex flex-col">
            <div className="p-6 border-b border-opacity-10 bg-indigo-50 bg-opacity-50">
              <h1 className="text-2xl font-semibold">
                {activeSection === 'courses' && 'Course Overview'}
                {activeSection === 'videos' && 'Video Lessons'}
                {activeSection === 'pdfs' && 'PDF Materials'}
                {activeSection === 'exercises' && 'Exercises'}
                {activeSection === 'exams' && 'Past Exams'}
                {activeSection === 'quiz' && 'Self Assessment'}
                {activeSection === 'progress' && 'Progress Tracking'}
              </h1>
              <p className="text-gray-600 text-sm">
                {activeSection === 'courses' && 'Explore comprehensive informatics courses for your baccalaureate preparation'}
                {activeSection === 'videos' && 'Watch instructional videos to enhance your learning'}
                {activeSection === 'pdfs' && 'Download and study PDF materials'}
                {activeSection === 'exercises' && 'Practice with interactive exercises'}
                {activeSection === 'exams' && 'Prepare with past exam papers'}
                {activeSection === 'quiz' && 'Test your knowledge with quizzes'}
                {activeSection === 'progress' && 'Track your learning progress'}
              </p>
            </div>

            <div className="p-6 overflow-y-auto flex-1">
              {/* Courses Section */}
              {activeSection === 'courses' && (
                <>
                  <div className="mb-6">
                    <input
                      type="text"
                      className="w-full p-3 border border-gray-300 rounded-full text-sm focus:border-indigo-600 focus:outline-none"
                      placeholder="Search courses..."
                    />
                  </div>

                  <div className="flex gap-2 mb-6 flex-wrap">
                    <button className="px-4 py-2 bg-gradient-to-br from-indigo-600 to-purple-700 text-white rounded-full text-sm font-medium">
                      All Courses
                    </button>
                    <button className="px-4 py-2 bg-white border border-gray-300 rounded-full text-sm hover:bg-gray-100">
                      Algorithms
                    </button>
                    <button className="px-4 py-2 bg-white border border-gray-300 rounded-full text-sm hover:bg-gray-100">
                      Data Structures
                    </button>
                    <button className="px-4 py-2 bg-white border border-gray-300 rounded-full text-sm hover:bg-gray-100">
                      Programming
                    </button>
                    <button className="px-4 py-2 bg-white border border-gray-300 rounded-full text-sm hover:bg-gray-100">
                      Database
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {courses.map((course, index) => (
                      <div
                        key={index}
                        className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer hover:-translate-y-1"
                      >
                        <div className="h-40 bg-gradient-to-br from-indigo-600 to-purple-700 flex items-center justify-center text-5xl">
                          {course.emoji}
                        </div>
                        <div className="p-5">
                          <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
                          <p className="text-gray-600 text-sm mb-4">{course.description}</p>
                          <div className="flex justify-between text-xs text-gray-500 mb-3">
                            <span>{course.lessons}</span>
                            <span>{course.duration}</span>
                          </div>
                          <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-indigo-600 to-purple-700"
                              style={{ width: `${course.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {/* Videos Section */}
              {activeSection === 'videos' && (
                <>
                  <div className="mb-6">
                    <input
                      type="text"
                      className="w-full p-3 border border-gray-300 rounded-full text-sm focus:border-indigo-600 focus:outline-none"
                      placeholder="Search videos..."
                    />
                  </div>

                  <div className="bg-black rounded-xl aspect-video mb-6 flex items-center justify-center text-white">
                    <div className="text-center">
                      <div className="text-5xl mb-5">▶️</div>
                      <div className="text-lg">Video Player</div>
                      <div className="text-sm opacity-70 mt-2">
                        Select a video to start learning
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {videos.map((video, index) => (
                      <div
                        key={index}
                        className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer hover:-translate-y-1"
                      >
                        <div className="h-40 bg-gradient-to-br from-indigo-600 to-purple-700 flex items-center justify-center text-5xl">
                          {video.emoji}
                        </div>
                        <div className="p-5">
                          <h3 className="text-lg font-semibold mb-2">{video.title}</h3>
                          <p className="text-gray-600 text-sm mb-4">{video.description}</p>
                          <div className="flex justify-between text-xs text-gray-500">
                            <span>{video.duration}</span>
                            <span>{video.quality}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {/* PDFs Section */}
              {activeSection === 'pdfs' && (
                <>
                  <div className="mb-6">
                    <input
                      type="text"
                      className="w-full p-3 border border-gray-300 rounded-full text-sm focus:border-indigo-600 focus:outline-none"
                      placeholder="Search PDF materials..."
                    />
                  </div>

                  <div className="bg-gray-100 border-2 border-dashed border-indigo-600 rounded-xl p-10 text-center mb-6">
                    <div className="text-5xl mb-5">📄</div>
                    <div className="text-lg">PDF Viewer</div>
                    <div className="text-sm text-gray-500 mt-2">
                      Select a PDF to view
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[1, 2, 3].map((item) => (
                      <div
                        key={item}
                        className="border rounded-lg p-4 flex items-center hover:shadow-md transition-shadow"
                      >
                        <div className="bg-indigo-100 p-3 rounded-lg mr-4">
                          <svg
                            className="w-6 h-6 text-indigo-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                            />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold">Document {item}</h3>
                          <p className="text-sm text-gray-500">PDF • {item}.2 MB</p>
                        </div>
                        <button className="text-indigo-600 hover:text-indigo-800">
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                            />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {/* Other sections would go here */}
            </div>
          </main>

          {/* Chatbot Panel */}
          <div className="bg-white bg-opacity-95 backdrop-blur-lg rounded-xl shadow-xl flex flex-col">
            <div className="p-5 border-b border-opacity-10 bg-indigo-50 bg-opacity-50">
              <h2 className="text-lg font-semibold">Study Assistant</h2>
              <div className="flex items-center gap-1 text-xs text-green-600">
                <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></div>
                Online
              </div>
            </div>

            <div className="p-5 overflow-y-auto flex-1 max-h-[400px]">
              <div className="flex items-start gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-teal-400 flex items-center justify-center text-white text-xs font-semibold">
                  AI
                </div>
                <div className="bg-white rounded-xl p-3 shadow-sm max-w-[220px] text-sm">
                  Hello! How can I help you with your studies today?
                </div>
              </div>

              <div className="flex items-start gap-2 mb-4 justify-end">
                <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-xl p-3 shadow-sm max-w-[220px] text-sm text-white">
                  Can you explain algorithms?
                </div>
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-600 to-purple-700 flex items-center justify-center text-white text-xs font-semibold">
                  ME
                </div>
              </div>
            </div>

            <div className="p-5 border-t border-opacity-10">
              <div className="bg-indigo-100 border-2 border-dashed border-indigo-600 rounded-xl p-4 text-center mb-3 cursor-pointer hover:bg-indigo-200 transition-colors">
                Upload file for assistance
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  className="flex-1 p-2 border border-gray-300 rounded-full text-sm focus:border-indigo-600 focus:outline-none"
                  placeholder="Type your question..."
                />
                <button className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-600 to-purple-700 text-white flex items-center justify-center hover:scale-110 transition-transform">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoBac;