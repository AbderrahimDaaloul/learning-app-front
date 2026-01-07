import React, { useState, useRef } from 'react';
import Books from '../assets/Books.jpg';
import ChatBot from './ChatBot';
import {
  FileText,
  Video,
  Calendar,
  CheckCircle,
  Clock,
  Play,
  ArrowRight,
  Eye,
  X,
  ArrowLeft,
  Menu,
  Layers,
  BookOpen,
  Download,
  Award
} from "lucide-react";

// Reorganized exam data as courses
const examCourses = [
  {
    id: 'cs-exams',
    title: "Computer Science Exams",
    description: "Past baccalaureate exams for Computer Science with corrections and video explanations.",
    thumbnail: Books,
    subject: "computer_science",
    exams: [
      {
        year: "2023",
        title: "Baccalaureate 2023",
        normal: "/exams/2023/cs/main.pdf",
        correction: "/exams/2023/cs/correction.pdf",
        video_correction: "https://example.com/corrections/2023-cs",
        difficulty: "Hard"
      },
      {
        year: "2022",
        title: "Baccalaureate 2022",
        normal: "/exams/2022/cs/main.pdf",
        correction: "/exams/2022/cs/correction.pdf",
        video_correction: "https://example.com/corrections/2022-cs",
        difficulty: "Medium"
      },
      {
        year: "2021",
        title: "Baccalaureate 2021",
        normal: "/exams/2021/cs/main.pdf",
        correction: "/exams/2021/cs/correction.pdf",
        video_correction: "https://example.com/corrections/2021-cs",
        difficulty: "Medium"
      }
    ]
  },
  {
    id: 'math-exams',
    title: "Mathematics Exams",
    description: "Past baccalaureate exams for Mathematics with step-by-step solutions.",
    thumbnail: Books,
    subject: "mathematics",
    exams: [
      {
        year: "2023",
        title: "Baccalaureate 2023",
        normal: "/exams/2023/math/main.pdf",
        correction: "/exams/2023/math/correction.pdf",
        video_correction: "https://example.com/corrections/2023-math",
        difficulty: "Hard"
      },
      {
        year: "2022",
        title: "Baccalaureate 2022",
        normal: "/exams/2022/math/main.pdf",
        correction: "/exams/2022/math/correction.pdf",
        video_correction: "https://example.com/corrections/2022-math",
        difficulty: "Medium"
      },
      {
        year: "2021",
        title: "Baccalaureate 2021",
        normal: "/exams/2021/math/main.pdf",
        correction: "/exams/2021/math/correction.pdf",
        video_correction: "https://example.com/corrections/2021-math",
        difficulty: "Easy"
      }
    ]
  },
  {
    id: 'physics-exams',
    title: "Physics Exams",
    description: "Past baccalaureate exams for Physics with detailed corrections.",
    thumbnail: Books,
    subject: "physics",
    exams: [
      {
        year: "2023",
        title: "Baccalaureate 2023",
        normal: "/exams/2023/physics/main.pdf",
        correction: "/exams/2023/physics/correction.pdf",
        video_correction: "https://example.com/corrections/2023-physics",
        difficulty: "Hard"
      },
      {
        year: "2022",
        title: "Baccalaureate 2022",
        normal: "/exams/2022/physics/main.pdf",
        correction: "/exams/2022/physics/correction.pdf",
        video_correction: "https://example.com/corrections/2022-physics",
        difficulty: "Medium"
      },
      {
        year: "2021",
        title: "Baccalaureate 2021",
        normal: "/exams/2021/physics/main.pdf",
        correction: "/exams/2021/physics/correction.pdf",
        video_correction: "https://example.com/corrections/2021-physics",
        difficulty: "Easy"
      }
    ]
  }
];

function PastExamsViewer() {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedExam, setSelectedExam] = useState(0);
  const [showCorrection, setShowCorrection] = useState(false);
  const [correctionFormat, setCorrectionFormat] = useState('pdf');
  const [showDetails, setShowDetails] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const correctionRef = useRef(null);

  // Helper to produce a safe filename
  const getPdfFilename = (course, exam, type) => {
    const safe = (s) =>
      s
        .replace(/\s+/g, "-")
        .replace(/[^a-zA-Z0-9\-_\.]/g, "")
        .toLowerCase();
    return `${safe(course.subject)}-${exam.year}-${type}.pdf`;
  };

  // Force-download helper for PDFs
  const downloadPdf = async (url, filename) => {
    try {
      const res = await fetch(url, { mode: "cors" });
      if (!res.ok) throw new Error("Network response was not ok");
      const blob = await res.blob();
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = filename || url.split("/").pop();
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(blobUrl);
    } catch (err) {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  // Handler for selecting a course
  const handleSelectCourse = (course) => {
    setSelectedCourse(course);
    setSelectedExam(0);
    setShowCorrection(false);
    setCorrectionFormat('pdf');
  };

  // Handler for closing the details popup
  const handleCloseDetails = () => setShowDetails(null);

  // If no course is selected, show all exam courses as cards
  if (!selectedCourse) {
    return (
      <div className="p-6">
        {/* Header Section */}
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-amber-600 to-orange-600 rounded-2xl shadow-lg">
              <Award className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-amber-700 to-orange-700 bg-clip-text text-transparent">
              Past Baccalaureate Exams
            </h2>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Prepare for your exams with real past papers, official corrections, and video explanations.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-100 shadow-lg">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl shadow">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Exams</p>
                <p className="text-2xl font-bold text-gray-800">
                  {examCourses.reduce((total, course) => total + course.exams.length, 0)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-100 shadow-lg">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl shadow">
                <Video className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Video Corrections</p>
                <p className="text-2xl font-bold text-gray-800">
                  {examCourses.reduce((total, course) => 
                    total + course.exams.filter(e => e.video_correction).length, 0
                  )}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100 shadow-lg">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl shadow">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Subjects</p>
                <p className="text-2xl font-bold text-gray-800">{examCourses.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100 shadow-lg">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl shadow">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Years Covered</p>
                <p className="text-2xl font-bold text-gray-800">2021-2023</p>
              </div>
            </div>
          </div>
        </div>

        {/* Exam Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {examCourses.map((course) => (
            <div
              key={course.id}
              className="group relative bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 overflow-hidden"
            >
              {/* Course Image with Gradient Overlay */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-amber-900/60 via-orange-900/30 to-transparent" />
                
                {/* Subject Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-semibold rounded-full shadow-lg">
                    {course.subject.replace('_', ' ').toUpperCase()}
                  </span>
                </div>
                
                {/* Years Badge */}
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1.5 bg-white/90 backdrop-blur-sm text-amber-700 text-xs font-semibold rounded-full shadow-lg">
                    {course.exams.length} Years
                  </span>
                </div>
              </div>

              {/* Course Content */}
              <div className="p-6">
                {/* Course Title & Description */}
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1">
                    {course.title}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-2">
                    {course.description}
                  </p>
                </div>

                {/* Exam Stats */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 bg-amber-50 rounded-lg">
                        <FileText className="h-4 w-4 text-amber-600" />
                      </div>
                      <span className="text-sm text-gray-600">Exams</span>
                    </div>
                    <span className="font-semibold text-gray-800">
                      {course.exams.length}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 bg-blue-50 rounded-lg">
                        <Video className="h-4 w-4 text-blue-600" />
                      </div>
                      <span className="text-sm text-gray-600">Video Corrections</span>
                    </div>
                    <span className="font-semibold text-gray-800">
                      {course.exams.filter(e => e.video_correction).length}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => handleSelectCourse(course)}
                    className="flex-1 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white px-4 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group"
                  >
                    <Play className="h-5 w-5" />
                    View Exams
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                  
                  <button
                    onClick={() => setShowDetails(course.id)}
                    className="px-4 py-3 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-700 rounded-xl font-medium shadow hover:shadow-md transition-all duration-300"
                  >
                    <Eye className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Details Modal */}
        {showDetails && examCourses.find(c => c.id === showDetails) && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gradient-to-br from-amber-900/30 via-orange-900/20 to-red-900/20 backdrop-blur-lg animate-fadeIn">
            <div className="relative max-w-2xl w-full bg-gradient-to-br from-white via-white to-amber-50 rounded-3xl shadow-2xl overflow-hidden border border-white/50">
              {/* Close Button */}
              <button
                onClick={handleCloseDetails}
                className="absolute top-6 right-6 z-10 p-2 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                aria-label="Close"
              >
                <X className="h-6 w-6 text-gray-600" />
              </button>

              {/* Modal Header with Gradient */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={examCourses.find(c => c.id === showDetails)?.thumbnail}
                  alt={examCourses.find(c => c.id === showDetails)?.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-amber-900/70 via-orange-900/40 to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-sm rounded-xl">
                      <Award className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-3xl font-bold text-white">
                      {examCourses.find(c => c.id === showDetails)?.title}
                    </h3>
                  </div>
                  <p className="text-white/90 text-lg">
                    {examCourses.find(c => c.id === showDetails)?.description}
                  </p>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-8">
                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                  <div className="bg-gradient-to-br from-amber-50 to-orange-100 p-4 rounded-2xl text-center">
                    <FileText className="h-8 w-8 text-amber-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-gray-800">
                      {examCourses.find(c => c.id === showDetails)?.exams.length}
                    </p>
                    <p className="text-sm text-gray-600">Exams</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-100 p-4 rounded-2xl text-center">
                    <Video className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-gray-800">
                      {examCourses.find(c => c.id === showDetails)?.exams.filter(e => e.video_correction).length}
                    </p>
                    <p className="text-sm text-gray-600">Video Corrections</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-4 rounded-2xl text-center">
                    <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-gray-800">
                      {examCourses.find(c => c.id === showDetails)?.exams.length}
                    </p>
                    <p className="text-sm text-gray-600">Corrections</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-purple-50 to-pink-100 p-4 rounded-2xl text-center">
                    <Calendar className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-gray-800">3</p>
                    <p className="text-sm text-gray-600">Years</p>
                  </div>
                </div>

                {/* Exams Preview */}
                <div className="mb-8">
                  <h4 className="text-xl font-semibold text-gray-800 mb-4">Available Exams</h4>
                  <div className="space-y-3">
                    {examCourses.find(c => c.id === showDetails)?.exams.map((exam, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-xl"
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-amber-50 rounded-lg">
                            <Award className="h-4 w-4 text-amber-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-800">{exam.title}</p>
                            <p className="text-sm text-gray-500">
                              Year {exam.year} • {exam.difficulty}
                            </p>
                          </div>
                        </div>
                        {exam.video_correction && (
                          <Video className="h-5 w-5 text-blue-500" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <button
                    onClick={() => {
                      handleSelectCourse(examCourses.find(c => c.id === showDetails));
                      handleCloseDetails();
                    }}
                    className="flex-1 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white px-6 py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-3 group"
                  >
                    <Play className="h-6 w-6" />
                    Start Reviewing
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                  
                  <button
                    onClick={handleCloseDetails}
                    className="px-6 py-4 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-700 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Browse More
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {examCourses.length === 0 && (
          <div className="text-center py-20">
            <div className="mx-auto w-32 h-32 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full flex items-center justify-center mb-6">
              <Award className="h-16 w-16 text-gray-400" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">No exams available</h3>
            <p className="text-gray-500 max-w-md mx-auto">
              Past exams are coming soon. Check back later for practice materials.
            </p>
          </div>
        )}
      </div>
    );
  }

  // If a course is selected, show the exam viewer for that course
  const exams = selectedCourse.exams;
  const currentExam = exams[selectedExam];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-amber-50/30 p-6">
      {/* Back Button */}
      <button
        onClick={() => setSelectedCourse(null)}
        className="flex items-center gap-2 text-amber-600 hover:text-amber-700 font-semibold mb-6 group transition-all duration-300"
      >
        <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
        Back to Exam Subjects
      </button>

      {/* Exam Course Header */}
      <div className="bg-gradient-to-r from-amber-600 to-orange-600 rounded-2xl p-8 mb-8 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1">
            <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
              <Award className="h-8 w-8 text-white" />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-white mb-2">{selectedCourse.title}</h1>
              <div className="flex items-center gap-4 text-white/90 flex-wrap">
                <div className="flex items-center gap-1">
                  <Layers className="h-4 w-4" />
                  <span>{exams.length} exams</span>
                </div>
                <div className="flex items-center gap-1">
                  <Video className="h-4 w-4" />
                  <span>{exams.filter(e => e.video_correction).length} video corrections</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>2021-2023</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4 flex-1">
            {/* Progress */}
            <div className="p-4 bg-white/15 backdrop-blur-sm rounded-xl text-white flex-1">
              <div className="flex items-center gap-3">
                <div className="flex items-end min-w-fit gap-2">
                  <span className="text-sm font-medium text-white/90">Exam Progress</span>
                  <span className="text-sm font-bold text-white">{Math.round(((selectedExam + 1) / exams.length) * 100)}%</span>
                </div>
                <div className="flex-1 h-2 bg-white/30 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-white rounded-full transition-all duration-500"
                    style={{ width: `${((selectedExam + 1) / exams.length) * 100}%` }}
                  />
                </div>
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 bg-white/20 backdrop-blur-sm rounded-xl text-white hover:bg-white/30 transition-colors"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex gap-8">
        {/* Sidebar Navigation */}
        {sidebarOpen && (
          <div className="w-80 bg-gradient-to-br from-white via-gray-50 to-white rounded-2xl shadow-2xl border border-gray-200/50 p-6 backdrop-blur-md">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-1">Past Exams</h3>
              <div className="h-1 w-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"></div>
            </div>
            <div className="space-y-2">
              {exams.map((exam, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSelectedExam(index);
                    setShowCorrection(false);
                  }}
                  className={`w-full text-left p-4 rounded-xl transition-all duration-300 group relative overflow-hidden ${
                    selectedExam === index
                      ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/30"
                      : "bg-gray-100/60 hover:bg-gray-200/60 text-gray-800"
                  }`}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-500/0 to-orange-500/0 group-hover:from-white/10 group-hover:to-white/5 transition-all duration-300"></div>
                  <div className="relative flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1">
                      <div className={`p-2.5 rounded-lg transition-all duration-300 ${
                        selectedExam === index
                          ? "bg-white/20 shadow-lg"
                          : "bg-gray-200/60 group-hover:bg-gray-300/60"
                      }`}>
                        <Award className={`h-4 w-4 ${
                          selectedExam === index ? "text-white" : "text-gray-600"
                        }`} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className={`font-semibold text-sm truncate ${
                          selectedExam === index ? "text-white" : "text-gray-800"
                        }`}>{exam.title}</p>
                        <p className={`text-xs mt-1 ${
                          selectedExam === index ? "text-white/70" : "text-gray-500"
                        }`}>Year: {exam.year} • {exam.difficulty}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-2">
                      {exam.video_correction && (
                        <span className={`text-xs font-semibold px-2 py-1 rounded-lg transition-all ${
                          selectedExam === index 
                            ? "bg-white/20 text-white" 
                            : "bg-gray-200/70 text-gray-700"
                        }`}>
                          <Video className="h-3 w-3" />
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <div className="flex-1">
          {/* Content Type Toggle */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setShowCorrection(false)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
                !showCorrection
                  ? "bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-lg"
                  : "bg-white text-gray-700 border border-gray-200 hover:border-amber-300"
              }`}
            >
              <FileText className="h-5 w-5" />
              Exam Paper
            </button>
            <button
              onClick={() => setShowCorrection(true)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
                showCorrection
                  ? "bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-lg"
                  : "bg-white text-gray-700 border border-gray-200 hover:border-amber-300"
              }`}
            >
              <CheckCircle className="h-5 w-5" />
              Correction
            </button>
          </div>

          {/* Content Display */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            {/* Content Header */}
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">
                    {currentExam.title} - {selectedCourse.subject.replace('_', ' ').toUpperCase()}
                  </h3>
                  <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="h-4 w-4" />
                      <span>Year: {currentExam.year}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Award className="h-4 w-4" />
                      <span>Difficulty: {currentExam.difficulty}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <a
                    href={showCorrection ? currentExam.correction : currentExam.normal}
                    download={getPdfFilename(selectedCourse, currentExam, showCorrection ? 'correction' : 'exam')}
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white px-4 py-2 rounded-xl shadow-lg transition-transform transform hover:-translate-y-0.5"
                  >
                    <Download className="h-4 w-4" />
                    Download
                  </a>
                  <a
                    href={showCorrection ? currentExam.correction : currentExam.normal}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-white border border-gray-200 hover:shadow-md text-gray-700 px-4 py-2 rounded-xl transition-colors"
                  >
                    <Eye className="h-4 w-4" />
                    Open
                  </a>
                </div>
              </div>
            </div>

            {/* PDF/Video Content */}
            <div className="p-6">
              {!showCorrection ? (
                /* Exam Paper PDF */
                <div className="h-[500px] bg-gray-50 rounded-xl overflow-hidden">
                  <iframe 
                    src={currentExam.normal}
                    className="w-full h-full border-0"
                    title="Exam Paper"
                  />
                </div>
              ) : (
                /* Correction Content */
                <div>
                  {/* Correction Format Toggle */}
                  <div className="flex gap-2 mb-4">
                    <button
                      onClick={() => setCorrectionFormat('pdf')}
                      className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                        correctionFormat === 'pdf'
                          ? 'bg-amber-100 text-amber-700 border border-amber-200'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      PDF Correction
                    </button>
                    <button
                      onClick={() => setCorrectionFormat('video')}
                      className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                        correctionFormat === 'video'
                          ? 'bg-amber-100 text-amber-700 border border-amber-200'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      Video Explanation
                    </button>
                  </div>

                  {correctionFormat === 'pdf' ? (
                    <div className="h-[500px] bg-gray-50 rounded-xl overflow-hidden">
                      <iframe 
                        src={currentExam.correction}
                        className="w-full h-full border-0"
                        title="PDF Correction"
                      />
                    </div>
                  ) : (
                    <div className="h-[500px] bg-black rounded-xl overflow-hidden">
                      <iframe
                        width="100%"
                        height="100%"
                        src={currentExam.video_correction.replace('https://example.com/corrections/', 'https://www.youtube.com/embed/')}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title="Video Correction"
                      />
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Navigation Footer */}
            <div className="p-6 border-t border-gray-100 bg-gray-50">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => {
                    if (selectedExam > 0) {
                      setSelectedExam(selectedExam - 1);
                      setShowCorrection(false);
                    }
                  }}
                  disabled={selectedExam === 0}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
                    selectedExam === 0
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-white text-gray-700 border border-gray-200 hover:border-amber-300 hover:text-amber-600'
                  }`}
                >
                  <ArrowLeft className="h-5 w-5" />
                  Previous
                </button>
                <span className="text-gray-600 font-medium">
                  Exam {selectedExam + 1} of {exams.length}
                </span>
                <button
                  onClick={() => {
                    if (selectedExam < exams.length - 1) {
                      setSelectedExam(selectedExam + 1);
                      setShowCorrection(false);
                    }
                  }}
                  disabled={selectedExam === exams.length - 1}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
                    selectedExam === exams.length - 1
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-amber-600 to-orange-600 text-white hover:from-amber-700 hover:to-orange-700 shadow-lg'
                  }`}
                >
                  Next
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ChatBot - Only shows when viewing an exam */}
      <ChatBot theme="past-exams" />
    </div>
  );
}

export default PastExamsViewer;