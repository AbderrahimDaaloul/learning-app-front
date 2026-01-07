import React, { useState } from "react";
import Books from "../assets/Books.jpg";
import ChatBot from "./ChatBot";
import {
  BookOpen,
  Clock,
  ChevronRight,
  PlayCircle,
  Layers,
  FileText,
  Star,
  Eye,
  Video,
  X,
  Download,
  ArrowLeft,
  Menu,
  CheckCircle,
  Users,
  Zap,
  Award,
  BarChart3,
  Calendar,
  Play,
  ArrowRight,
  Info,
} from "lucide-react";

// Sample data for multiple courses
const coursesData = [
  {
    id: "cs-101",
    title: "Algorithms Fundamentals",
    description:
      "Master basic algorithms, data structures, and programming concepts from scratch.",
    thumbnail: Books,
    level: "Beginner",
    rating: 4.8,
    averageScore: 85,
    enrolled: 245,
    chapters: [
      {
        title: "Introduction to Algorithms",
        videoUrl: "https://youtu.be/YMdeOS-taQQ?list=RDMMbyfiQA8HRaE",
        pdfUrl: "/pdfs/algorithms.pdf",
        duration: "45 min",
        exercises: 5,
        completed: true,
      },
      {
        title: "Data Structures Basics",
        videoUrl: "https://www.youtube.com/embed/5v5AqF0zP5w",
        pdfUrl: "/pdfs/data-structures.pdf",
        duration: "60 min",
        exercises: 8,
        completed: false,
      },
      {
        title: "Time Complexity Analysis",
        videoUrl: "https://www.youtube.com/embed/sample",
        pdfUrl: "/pdfs/complexity.pdf",
        duration: "50 min",
        exercises: 6,
        completed: false,
      },
    ],
    details:
      "This comprehensive course introduces the foundational concepts of computer science, including algorithms, data structures, and programming basics. Perfect for beginners looking to build a strong foundation in computer science.",
    isPremium: false,
    completionRate: 65,
    averageDifficulty: "Medium",
  },
  {
    id: "math-101",
    title: "Python Essentials",
    description:
      "Learn Python programming from basics to advanced concepts with practical examples.",
    thumbnail: Books,
    level: "Beginner",
    duration: "15 hours",
    rating: 4.9,
    averageScore: 88,
    enrolled: 189,
    chapters: [
      {
        title: "Python Basics & Syntax",
        videoUrl: "https://www.youtube.com/embed/python-basics",
        pdfUrl: "/pdfs/python-basics.pdf",
        duration: "55 min",
        exercises: 7,
        completed: true,
      },
      {
        title: "Functions and Modules",
        videoUrl: "https://www.youtube.com/embed/python-functions",
        pdfUrl: "/pdfs/functions.pdf",
        duration: "65 min",
        exercises: 9,
        completed: false,
      },
    ],
    details:
      "A complete Python programming course covering everything from basic syntax to advanced concepts like object-oriented programming and web development.",
    isPremium: true,
    completionRate: 42,
    averageDifficulty: "Easy",
  },
  {
    id: "design-101",
    title: "UI/UX Design Principles",
    description:
      "Master modern design principles and create stunning user interfaces.",
    thumbnail: Books,
    level: "Intermediate",
    duration: "18 hours",
    rating: 4.7,
    averageScore: 82,
    enrolled: 134,
    chapters: [
      {
        title: "Design Fundamentals",
        videoUrl: "https://www.youtube.com/embed/design-basics",
        pdfUrl: "/pdfs/design-fundamentals.pdf",
        duration: "70 min",
        exercises: 6,
        completed: false,
      },
    ],
    details:
      "Learn the principles of modern UI/UX design, including color theory, typography, layout, and user psychology.",
    isPremium: false,
    completionRate: 28,
    averageDifficulty: "Medium",
  },
];

function CourseViewer() {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [activeContentType, setActiveContentType] = useState("video");
  const [currentChapter, setCurrentChapter] = useState(0);
  const [showDetails, setShowDetails] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Calculate stats
  const stats = {
    totalCourses: coursesData.length,
    totalChapters: coursesData.reduce(
      (acc, course) => acc + course.chapters.length,
      0
    ),
    totalVideos: coursesData.reduce(
      (acc, course) => acc + course.chapters.length,
      0
    ),
    totalPDFs: coursesData.reduce(
      (acc, course) => acc + course.chapters.length,
      0
    ),
    totalExercises: coursesData.reduce(
      (acc, course) =>
        acc +
        course.chapters.reduce(
          (chapAcc, chapter) => chapAcc + (chapter.exercises || 0),
          0
        ),
      0
    ),
    enrolledStudents: coursesData.reduce(
      (acc, course) => acc + course.enrolled,
      0
    ),
  };

  // Helper functions
  const getPdfFilename = (course, chapter) => {
    const safe = (s) =>
      s
        .replace(/\s+/g, "-")
        .replace(/[^a-zA-Z0-9\-_\.]/g, "")
        .toLowerCase();
    return `${safe(course.title)}-${safe(chapter.title)}.pdf`;
  };

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

  const handleSelectCourse = (course) => {
    setSelectedCourse(course);
    setCurrentChapter(0);
    setActiveContentType("video");
  };

  const handleCloseDetails = () => setShowDetails(null);

  // If no course is selected, show all courses as cards
  if (!selectedCourse) {
    return (
      <div className="p-6">
        {/* Header Section */}
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-lg">
              <BookOpen className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-indigo-700 to-purple-700 bg-clip-text text-transparent">
              Available Courses
            </h2>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our curated collection of courses designed to help you
            master new skills.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-100 shadow-lg">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl shadow">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Courses</p>
                <p className="text-2xl font-bold text-gray-800">
                  {stats.totalCourses}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100 shadow-lg">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl shadow">
                <Layers className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Chapters</p>
                <p className="text-2xl font-bold text-gray-800">
                  {stats.totalChapters}
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
                <p className="text-sm text-gray-600">Video Lessons</p>
                <p className="text-2xl font-bold text-gray-800">
                  {stats.totalVideos}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-100 shadow-lg">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl shadow">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Enrolled Students</p>
                <p className="text-2xl font-bold text-gray-800">
                  {stats.enrolledStudents}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {coursesData.map((course) => (
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />

                {/* Course Level Badge */}
                <div className="absolute top-4 left-4">
                  <span
                    className={`px-3 py-1.5 text-white text-xs font-semibold rounded-full shadow-lg ${
                      course.level === "Beginner"
                        ? "bg-gradient-to-r from-green-500 to-emerald-500"
                        : course.level === "Intermediate"
                        ? "bg-gradient-to-r from-amber-500 to-orange-500"
                        : "bg-gradient-to-r from-red-500 to-pink-500"
                    }`}
                  >
                    {course.level}
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

                {/* Course Stats */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 bg-indigo-50 rounded-lg">
                        <Layers className="h-4 w-4 text-indigo-600" />
                      </div>
                      <span className="text-sm text-gray-600">Chapters</span>
                    </div>
                    <span className="font-semibold text-gray-800">
                      {course.chapters.length}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 bg-blue-50 rounded-lg">
                        <Video className="h-4 w-4 text-blue-600" />
                      </div>
                      <span className="text-sm text-gray-600">Videos</span>
                    </div>
                    <span className="font-semibold text-gray-800">
                      {course.chapters.length}
                    </span>
                  </div>

                
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => handleSelectCourse(course)}
                    className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-4 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group"
                  >
                    <PlayCircle className="h-5 w-5" />
                    Start Learning
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

              {/* Premium Badge */}
            </div>
          ))}
        </div>

        {/* Enhanced Details Modal */}
        {showDetails && coursesData.find((c) => c.id === showDetails) && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gradient-to-br from-indigo-900/30 via-purple-900/20 to-pink-900/20 backdrop-blur-lg animate-fadeIn">
            <div className="relative max-w-2xl w-full bg-gradient-to-br from-white via-white to-indigo-50 rounded-3xl shadow-2xl overflow-hidden border border-white/50">
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
                  src={coursesData.find((c) => c.id === showDetails)?.thumbnail}
                  alt={coursesData.find((c) => c.id === showDetails)?.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-sm rounded-xl">
                      <BookOpen className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-3xl font-bold text-white">
                      {coursesData.find((c) => c.id === showDetails)?.title}
                    </h3>
                  </div>
                  <p className="text-white/90 text-lg">
                    {coursesData.find((c) => c.id === showDetails)?.description}
                  </p>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-8">
                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                  <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-4 rounded-2xl text-center">
                    <Layers className="h-8 w-8 text-indigo-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-gray-800">
                      {
                        coursesData.find((c) => c.id === showDetails)?.chapters
                          .length
                      }
                    </p>
                    <p className="text-sm text-gray-600">Chapters</p>
                  </div>

                  <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-2xl text-center">
                    <FileText className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-gray-800">
                      {coursesData
                        .find((c) => c.id === showDetails)
                        ?.chapters.reduce(
                          (acc, chapter) => acc + (chapter.exercises || 0),
                          0
                        )}
                    </p>
                    <p className="text-sm text-gray-600">Exercises</p>
                  </div>

                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-2xl text-center">
                    <Video className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-gray-800">
                      {
                        coursesData.find((c) => c.id === showDetails)?.chapters
                          .length
                      }
                    </p>
                    <p className="text-sm text-gray-600">Videos</p>
                  </div>

                  <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-4 rounded-2xl text-center">
                    <Clock className="h-8 w-8 text-amber-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-gray-800">
                      {coursesData.find((c) => c.id === showDetails)?.duration}
                    </p>
                    <p className="text-sm text-gray-600">Duration</p>
                  </div>
                </div>

                {/* Course Details */}
                <div className="mb-8">
                  <h4 className="text-xl font-semibold text-gray-800 mb-4">
                    Course Overview
                  </h4>
                  <p className="text-gray-600 leading-relaxed">
                    {coursesData.find((c) => c.id === showDetails)?.details ||
                      "No additional details available."}
                  </p>
                </div>

                {/* Chapters Preview */}
                <div className="mb-8">
                  <h4 className="text-xl font-semibold text-gray-800 mb-4">
                    Course Chapters
                  </h4>
                  <div className="space-y-3">
                    {coursesData
                      .find((c) => c.id === showDetails)
                      ?.chapters.slice(0, 3)
                      .map((chapter, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-xl"
                        >
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-indigo-50 rounded-lg">
                              <PlayCircle className="h-4 w-4 text-indigo-600" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-800">
                                {chapter.title}
                              </p>
                              <p className="text-sm text-gray-500">
                                {chapter.duration} • {chapter.exercises}{" "}
                                exercises
                              </p>
                            </div>
                          </div>
                          {chapter.completed && (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          )}
                        </div>
                      ))}
                    {coursesData.find((c) => c.id === showDetails)?.chapters
                      .length > 3 && (
                      <p className="text-center text-indigo-600 font-medium">
                        +
                        {coursesData.find((c) => c.id === showDetails)?.chapters
                          .length - 3}{" "}
                        more chapters
                      </p>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <button
                    onClick={() => {
                      handleSelectCourse(
                        coursesData.find((c) => c.id === showDetails)
                      );
                      handleCloseDetails();
                    }}
                    className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-3 group"
                  >
                    <PlayCircle className="h-6 w-6" />
                    Enroll & Start Learning
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <button
                    onClick={handleCloseDetails}
                    className="px-6 py-4 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-700 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Explore More
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {coursesData.length === 0 && (
          <div className="text-center py-20">
            <div className="mx-auto w-32 h-32 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full flex items-center justify-center mb-6">
              <BookOpen className="h-16 w-16 text-gray-400" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">
              No courses available
            </h3>
            <p className="text-gray-500 max-w-md mx-auto">
              Check back soon for new course offerings or explore other learning
              paths.
            </p>
          </div>
        )}

        {/* ChatBot */}
      </div>
    );
  }

  // If a course is selected, show the chapter navigation and content
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50/30 p-6">
      {/* Back Button */}
      <button
        onClick={() => setSelectedCourse(null)}
        className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-semibold mb-6 group transition-all duration-300"
      >
        <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
        Back to Courses
      </button>

      {/* Course Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 mb-8 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1">
            <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
              <BookOpen className="h-8 w-8 text-white" />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-white mb-2">
                {selectedCourse.title}
              </h1>
              <div className="flex items-center gap-4 text-white/90 flex-wrap">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{selectedCourse.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Layers className="h-4 w-4" />
                  <span>{selectedCourse.chapters.length} chapters</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4" />
                  <span>{selectedCourse.rating}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4 flex-1">
            {/* Course Progress */}
            <div className="p-4 bg-white/15 backdrop-blur-sm rounded-xl text-white flex-1">
              <div className="flex items-center gap-3">
                <div className="flex  items-end min-w-fit gap-2">
                  <span className="text-sm font-medium text-white/90 ">
                    Course Progress{" "}
                  </span>
                  <span className="text-sm font-bold text-white">
                    {selectedCourse.completionRate}%
                  </span>
                </div>
                <div className="flex-1 h-2 bg-white/30 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-white rounded-full transition-all duration-500"
                    style={{ width: `${selectedCourse.completionRate}%` }}
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
              <h3 className="text-xl font-bold text-gray-800 mb-1">
                Course Chapters
              </h3>
              <div className="h-1 w-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
            </div>
            <div className="space-y-2">
              {selectedCourse.chapters.map((chapter, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentChapter(index)}
                  className={`w-full text-left p-4 rounded-xl transition-all duration-300 group relative overflow-hidden ${
                    currentChapter === index
                      ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-500/30"
                      : "bg-gray-100/60 hover:bg-gray-200/60 text-gray-800"
                  }`}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 to-purple-500/0 group-hover:from-white/10 group-hover:to-white/5 transition-all duration-300"></div>
                  <div className="relative flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1">
                      <div
                        className={`p-2.5 rounded-lg transition-all duration-300 ${
                          currentChapter === index
                            ? "bg-white/20 shadow-lg"
                            : "bg-gray-200/60 group-hover:bg-gray-300/60"
                        }`}
                      >
                        <PlayCircle
                          className={`h-4 w-4 ${
                            currentChapter === index
                              ? "text-white"
                              : "text-gray-600"
                          }`}
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p
                          className={`font-semibold text-sm truncate ${
                            currentChapter === index
                              ? "text-white"
                              : "text-gray-800"
                          }`}
                        >
                          {chapter.title}
                        </p>
                        <p
                          className={`text-xs mt-1 ${
                            currentChapter === index
                              ? "text-white/70"
                              : "text-gray-500"
                          }`}
                        >
                          {chapter.duration}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-2">
                      {chapter.completed && (
                        <CheckCircle
                          className={`h-4 w-4 transition-all ${
                            currentChapter === index
                              ? "text-white"
                              : "text-green-500"
                          }`}
                        />
                      )}
                      <span
                        className={`text-xs font-semibold px-2 py-1 rounded-lg transition-all ${
                          currentChapter === index
                            ? "bg-white/20 text-white"
                            : "bg-gray-200/70 text-gray-700"
                        }`}
                      >
                        {chapter.exercises}
                      </span>
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
              onClick={() => setActiveContentType("video")}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
                activeContentType === "video"
                  ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
                  : "bg-white text-gray-700 border border-gray-200 hover:border-indigo-300"
              }`}
            >
              <Video className="h-5 w-5" />
              Video Lesson
            </button>
            <button
              onClick={() => setActiveContentType("pdf")}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
                activeContentType === "pdf"
                  ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
                  : "bg-white text-gray-700 border border-gray-200 hover:border-indigo-300"
              }`}
            >
              <FileText className="h-5 w-5" />
              PDF Materials
            </button>
          </div>

          {/* Content Display */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            {/* Content Header */}
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">
                    {selectedCourse.chapters[currentChapter].title}
                  </h3>
                  <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock className="h-4 w-4" />
                      <span>
                        {selectedCourse.chapters[currentChapter].duration}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <FileText className="h-4 w-4" />
                      <span>
                        {selectedCourse.chapters[currentChapter].exercises}{" "}
                        exercises
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-3">
                  {activeContentType === "pdf" && (
                    <>
                      <button
                        onClick={() =>
                          downloadPdf(
                            selectedCourse.chapters[currentChapter].pdfUrl,
                            getPdfFilename(
                              selectedCourse,
                              selectedCourse.chapters[currentChapter]
                            )
                          )
                        }
                        className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-5 py-2.5 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        <Download className="h-5 w-5" />
                        Download PDF
                      </button>
                      <a
                        href={selectedCourse.chapters[currentChapter].pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-white border border-gray-200 hover:border-indigo-300 hover:bg-gray-50 text-gray-700 px-5 py-2.5 rounded-xl font-semibold shadow hover:shadow-md transition-all duration-300"
                      >
                        <Eye className="h-5 w-5" />
                        Open File
                      </a>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-6">
              {activeContentType === "video" ? (
                <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-2xl">
                  <iframe
                    src={selectedCourse.chapters[currentChapter].videoUrl}
                    className="w-full h-full"
                    title={selectedCourse.chapters[currentChapter].title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : (
                <div className="h-[70vh]">
                  <iframe
                    src={selectedCourse.chapters[currentChapter].pdfUrl}
                    className="w-full h-full border rounded-xl shadow-lg"
                    title="PDF Viewer"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <button
              onClick={() => setCurrentChapter(Math.max(0, currentChapter - 1))}
              disabled={currentChapter === 0}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                currentChapter === 0
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white text-gray-700 border border-gray-200 hover:border-indigo-300 hover:shadow-md"
              }`}
            >
              <ArrowLeft className="h-5 w-5" />
              Previous Chapter
            </button>
            <button
              onClick={() =>
                setCurrentChapter(
                  Math.min(
                    selectedCourse.chapters.length - 1,
                    currentChapter + 1
                  )
                )
              }
              disabled={currentChapter === selectedCourse.chapters.length - 1}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                currentChapter === selectedCourse.chapters.length - 1
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl"
              }`}
            >
              Next Chapter
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* ChatBot - Only shows when viewing a course */}
      <ChatBot theme="courses" />
    </div>
  );
}

export default CourseViewer;
