import React, { useState } from 'react';
import Books from '../assets/Books.jpg';
import ChatBot from './ChatBot';

import { 
  FileText, 
  Video, 
  Zap, 
  CheckCircle, 
  Clock, 
  Play, 
  ArrowRight, 
  Eye, 
  X, 
  PlayCircle 
} from "lucide-react";

// Sample data for courses with exercises
const exerciseCourses = [
  {
    id: 'cs-101',
    title: "Computer Science Fundamentals",
    description: "Practice exercises for algorithms, data structures, and programming.",
    thumbnail: Books,
    details: "Sharpen your computer science skills with these targeted exercises, including algorithm analysis and coding challenges.",
    exercises: [
      {
        title: "Algorithm Analysis - Exercise 1",
        problem: "/exercises/alg-1/problem.pdf",
        pdfSolution: "/exercises/alg-1/solution.pdf",
        videoSolution: "https://example.com/videos/alg-1-solution"
      },
      // More exercises...
    ]
  },
  {
    id: 'math-101',
    title: "Mathematics Essentials",
    description: "Exercises in algebra, calculus, and geometry for baccalaureate students.",
    thumbnail: Books,
    details: "Test your math knowledge with exercises covering algebra, calculus, and geometry.",
    exercises: [
      {
        title: "Algebra - Exercise 1",
        problem: "/exercises/math-1/problem.pdf",
        pdfSolution: "/exercises/math-1/solution.pdf",
        videoSolution: "https://example.com/videos/math-1-solution"
      },
      // More exercises...
    ],

    
    
  },

  {
    id: 'cs-101',
    title: "Computer Science Fundamentals",
    description: "Practice exercises for algorithms, data structures, and programming.",
    thumbnail: Books,
    details: "Sharpen your computer science skills with these targeted exercises, including algorithm analysis and coding challenges.",
    exercises: [
      {
        title: "Algorithm Analysis - Exercise 1",
        problem: "/exercises/alg-1/problem.pdf",
        pdfSolution: "/exercises/alg-1/solution.pdf",
        videoSolution: "https://example.com/videos/alg-1-solution"
      },
      // More exercises...
    ]
  },

  
  // Add more courses as needed
];

function ExerciseViewer() {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedExercise, setSelectedExercise] = useState(0);
  const [showSolution, setShowSolution] = useState(false);
  const [solutionFormat, setSolutionFormat] = useState('pdf');
  const [showDetails, setShowDetails] = useState(null); // course id for popup

  // Helper to produce a safe filename
  const getPdfFilename = (course, exercise, type) => {
    const safe = (s) =>
      s
        .replace(/\s+/g, "-")
        .replace(/[^a-zA-Z0-9\-_\.]/g, "")
        .toLowerCase();
    const base = `${safe(course.title || "course")}-${safe(
      exercise.title || "exercise"
    )}-${type}.pdf`;
    return base;
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
    setSelectedExercise(0);
    setShowSolution(false);
    setSolutionFormat('pdf');
  };

  // Handler for closing the details popup
  const handleCloseDetails = () => setShowDetails(null);

  // If no course is selected, show all courses as cards
  if (!selectedCourse) {
    return (
  <div className="p-6">
    {/* Header Section */}
    <div className="mb-10 text-center">
      <div className="inline-flex items-center gap-3 mb-4">
        <div className="p-3 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl shadow-lg">
          <FileText className="h-8 w-8 text-white" />
        </div>
        <h2 className="text-4xl font-bold bg-gradient-to-r from-green-700 to-emerald-700 bg-clip-text text-transparent">
          Practice Exercises
        </h2>
      </div>
      <p className="text-gray-600 max-w-2xl mx-auto">
        Sharpen your skills with hands-on exercises, complete with solutions and video explanations.
      </p>
    </div>

    {/* Stats Overview */}
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100 shadow-lg">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl shadow">
            <FileText className="h-6 w-6 text-white" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Total Exercises</p>
            <p className="text-2xl font-bold text-gray-800">
              {exerciseCourses.reduce((total, course) => total + course.exercises.length, 0)}
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
            <p className="text-sm text-gray-600">Video Solutions</p>
            <p className="text-2xl font-bold text-gray-800">
              {exerciseCourses.reduce((total, course) => 
                total + course.exercises.filter(e => e.solutions?.video).length, 0
              )}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-100 shadow-lg">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl shadow">
            <Zap className="h-6 w-6 text-white" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Difficulty Levels</p>
            <p className="text-2xl font-bold text-gray-800">3</p>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100 shadow-lg">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl shadow">
            <CheckCircle className="h-6 w-6 text-white" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Completed</p>
            <p className="text-2xl font-bold text-gray-800">
              {exerciseCourses.reduce((total, course) => 
                total + course.exercises.filter(e => e.completed).length, 0
              )}
            </p>
          </div>
        </div>
      </div>
    </div>

    {/* Exercises Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {exerciseCourses.map((course) => (
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
            <div className="absolute inset-0 bg-gradient-to-t from-green-900/60 via-emerald-900/30 to-transparent" />
            
            {/* Difficulty Badge */}
            <div className="absolute top-4 left-4">
              <span className={`px-3 py-1.5 text-white text-xs font-semibold rounded-full shadow-lg ${
                course.averageDifficulty === 'Easy' ? 'bg-gradient-to-r from-green-500 to-emerald-500' :
                course.averageDifficulty === 'Medium' ? 'bg-gradient-to-r from-amber-500 to-orange-500' :
                'bg-gradient-to-r from-red-500 to-pink-500'
              }`}>
                {course.averageDifficulty || 'Mixed'}
              </span>
            </div>
            
            {/* Progress Badge */}
            {course.completionRate > 0 && (
              <div className="absolute top-4 right-4">
                <div className="relative w-12 h-12">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="24"
                      cy="24"
                      r="20"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="transparent"
                      className="text-green-100"
                    />
                    <circle
                      cx="24"
                      cy="24"
                      r="20"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="transparent"
                      strokeDasharray={`${course.completionRate * 1.26} 126`}
                      className="text-green-500"
                    />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-green-700">
                    {Math.round(course.completionRate)}%
                  </span>
                </div>
              </div>
            )}
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

            {/* Exercise Stats */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-green-50 rounded-lg">
                    <FileText className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-sm text-gray-600">Exercises</span>
                </div>
                <span className="font-semibold text-gray-800">
                  {course.exercises.length}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-blue-50 rounded-lg">
                    <Video className="h-4 w-4 text-blue-600" />
                  </div>
                  <span className="text-sm text-gray-600">Video Solutions</span>
                </div>
                <span className="font-semibold text-gray-800">
                  {course.exercises.filter(e => e.solutions?.video).length}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-purple-50 rounded-lg">
                    <Clock className="h-4 w-4 text-purple-600" />
                  </div>
                  <span className="text-sm text-gray-600">Avg. Time</span>
                </div>
                <span className="font-semibold text-gray-800">
                  {course.averageTime || '30 min'}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => handleSelectCourse(course)}
                className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-4 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group"
              >
                <Play className="h-5 w-5" />
                Start Practice
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
    {showDetails && exerciseCourses.find(c => c.id === showDetails) && (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gradient-to-br from-green-900/30 via-emerald-900/20 to-cyan-900/20 backdrop-blur-lg animate-fadeIn">
        <div className="relative max-w-2xl w-full bg-gradient-to-br from-white via-white to-green-50 rounded-3xl shadow-2xl overflow-hidden border border-white/50">
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
              src={exerciseCourses.find(c => c.id === showDetails)?.thumbnail}
              alt={exerciseCourses.find(c => c.id === showDetails)?.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-green-900/70 via-emerald-900/40 to-transparent" />
            <div className="absolute bottom-6 left-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-sm rounded-xl">
                  <FileText className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-white">
                  {exerciseCourses.find(c => c.id === showDetails)?.title}
                </h3>
              </div>
              <p className="text-white/90 text-lg">
                {exerciseCourses.find(c => c.id === showDetails)?.description}
              </p>
            </div>
          </div>

          {/* Modal Content */}
          <div className="p-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-4 rounded-2xl text-center">
                <FileText className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-800">
                  {exerciseCourses.find(c => c.id === showDetails)?.exercises.length}
                </p>
                <p className="text-sm text-gray-600">Exercises</p>
              </div>
              
              <div className="bg-gradient-to-br from-blue-50 to-cyan-100 p-4 rounded-2xl text-center">
                <Video className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-800">
                  {exerciseCourses.find(c => c.id === showDetails)?.exercises.filter(e => e.solutions?.video).length}
                </p>
                <p className="text-sm text-gray-600">Video Solutions</p>
              </div>
              
              <div className="bg-gradient-to-br from-purple-50 to-pink-100 p-4 rounded-2xl text-center">
                <CheckCircle className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-800">
                  {exerciseCourses.find(c => c.id === showDetails)?.exercises.filter(e => e.completed).length}
                </p>
                <p className="text-sm text-gray-600">Completed</p>
              </div>
              
              <div className="bg-gradient-to-br from-amber-50 to-orange-100 p-4 rounded-2xl text-center">
                <Clock className="h-8 w-8 text-amber-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-800">
                  {exerciseCourses.find(c => c.id === showDetails)?.averageTime || '30 min'}
                </p>
                <p className="text-sm text-gray-600">Avg. Time</p>
              </div>
            </div>

            {/* Difficulty Distribution */}
            <div className="mb-8">
              <h4 className="text-xl font-semibold text-gray-800 mb-4">Difficulty Distribution</h4>
              <div className="space-y-3">
                {['Easy', 'Medium', 'Hard'].map(difficulty => {
                  const count = exerciseCourses.find(c => c.id === showDetails)?.exercises.filter(e => e.difficulty === difficulty).length || 0;
                  const total = exerciseCourses.find(c => c.id === showDetails)?.exercises.length || 1;
                  const percentage = Math.round((count / total) * 100);
                  
                  return (
                    <div key={difficulty} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${
                          difficulty === 'Easy' ? 'bg-green-500' :
                          difficulty === 'Medium' ? 'bg-amber-500' :
                          'bg-red-500'
                        }`} />
                        <span className="text-sm font-medium text-gray-700">{difficulty}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              difficulty === 'Easy' ? 'bg-green-500' :
                              difficulty === 'Medium' ? 'bg-amber-500' :
                              'bg-red-500'
                            }`}
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <span className="text-sm font-semibold text-gray-800 w-10 text-right">
                          {count} ({percentage}%)
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Course Details */}
            <div className="mb-8">
              <h4 className="text-xl font-semibold text-gray-800 mb-4">What You'll Practice</h4>
              <p className="text-gray-600 leading-relaxed">
                {exerciseCourses.find(c => c.id === showDetails)?.details || 
                  "This course contains carefully crafted exercises to help you master key concepts through hands-on practice."}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={() => {
                  handleSelectCourse(exerciseCourses.find(c => c.id === showDetails));
                  handleCloseDetails();
                }}
                className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-3 group"
              >
                <Play className="h-6 w-6" />
                Start Practice Session
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
    {exerciseCourses.length === 0 && (
      <div className="text-center py-20">
        <div className="mx-auto w-32 h-32 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full flex items-center justify-center mb-6">
          <FileText className="h-16 w-16 text-gray-400" />
        </div>
        <h3 className="text-2xl font-semibold text-gray-700 mb-2">No exercises available</h3>
        <p className="text-gray-500 max-w-md mx-auto">
          Practice exercises are coming soon. Check back later for hands-on learning materials.
        </p>
      </div>
    )}
  </div>
);
  }

  // If a course is selected, show the exercise viewer for that course
  const exercises = selectedCourse.exercises;
  const currentExercise = exercises[selectedExercise];

  return (
    <div>

     {/* ChatBot - Floating at bottom right */}
      <div className="fixed bottom-6 right-6 z-40">
        <ChatBot className="flex justify-end items-end" />
      </div>

      <button
        className="mb-4 text-indigo-600 hover:underline font-medium"
        onClick={() => setSelectedCourse(null)}
      >← Back to Exercise Courses</button>
      <h2 className="text-2xl font-bold mb-6">Practice Exercises - {selectedCourse.title}</h2>
      <div className="flex gap-6">
        {/* Exercise List */}
        <div className="w-1/3 bg-white p-4 rounded-lg shadow">
          <h3 className="font-medium mb-3">Available Exercises</h3>
          <ul className="space-y-2">
            {exercises.map((ex, index) => (
              <li key={index}>
                <button
                  onClick={() => {
                    setSelectedExercise(index);
                    setShowSolution(false);
                  }}
                  className={`w-full text-left p-3 rounded-md ${selectedExercise === index 
                    ? 'bg-indigo-50 border border-indigo-200' 
                    : 'hover:bg-gray-50 border border-transparent'}`}
                >
                  <span className="font-medium">{ex.title}</span>
                  <span className="block text-xs text-gray-500 mt-1">Difficulty: Medium</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Exercise Content */}
        <div className="flex-1 space-y-4">
          {/* Problem Section */}
          <div className="bg-white p-6 rounded-lg shadow relative">
            <div className="absolute top-4 right-4 z-20 flex items-center gap-3">
              <a
                href={currentExercise.problem}
                download={getPdfFilename(selectedCourse, currentExercise, 'problem')}
                title="Download Problem PDF"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-pink-500 hover:from-indigo-700 hover:to-pink-600 text-white px-4 py-2 rounded-xl shadow-lg transition-transform transform hover:-translate-y-0.5"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v12m0 0l4-4m-4 4-4-4M4 21h16" />
                </svg>
                Download
              </a>
              <a
                href={currentExercise.problem}
                target="_blank"
                rel="noopener noreferrer"
                title="Open Problem in new tab"
                className="inline-flex items-center gap-2 bg-white border border-gray-200 hover:shadow-md text-gray-700 px-3 py-2 rounded-lg transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 3h7v7m0-7L10 14" />
                </svg>
              Open File 

              </a>
            </div>

            <h3 className="text-xl font-medium mb-4">
              {currentExercise.title}
            </h3>
            <div className="h-[400px] mb-4">
              <iframe 
                src={currentExercise.problem}
                className="w-full h-full border rounded-lg"
                title="Exercise Problem"
              />
            </div>
            <button
              onClick={() => setShowSolution(!showSolution)}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 font-medium transition-colors"
            >
              {showSolution ? 'Hide Solution' : 'Show Solution'}
            </button>
          </div>

          {/* Solution Section */}
          {showSolution && (
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex mb-4 border-b border-gray-200">
                <button
                  onClick={() => setSolutionFormat('pdf')}
                  className={`pb-2 px-4 font-medium transition-colors ${solutionFormat === 'pdf' 
                    ? 'border-b-2 border-indigo-500 text-indigo-600' 
                    : 'text-gray-500 hover:text-gray-700'}`}
                >
                  PDF Correction
                </button>
                <button
                  onClick={() => setSolutionFormat('video')}
                  className={`pb-2 px-4 font-medium transition-colors ${solutionFormat === 'video' 
                    ? 'border-b-2 border-indigo-500 text-indigo-600' 
                    : 'text-gray-500 hover:text-gray-700'}`}
                >
                  Video Explanation
                </button>
              </div>
              
              {solutionFormat === 'pdf' ? (
                <div className="relative">
                  <div className="absolute top-0 right-0 z-20 flex items-center gap-3">
                    <a
                      href={currentExercise.pdfSolution}
                      download={getPdfFilename(selectedCourse, currentExercise, 'solution')}
                      title="Download Solution PDF"
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-pink-500 hover:from-indigo-700 hover:to-pink-600 text-white px-4 py-2 rounded-xl shadow-lg transition-transform transform hover:-translate-y-0.5"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v12m0 0l4-4m-4 4-4-4M4 21h16" />
                      </svg>
                      Download
                    </a>
                    <a
                      href={currentExercise.pdfSolution}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Open Solution in new tab"
                      className="inline-flex items-center gap-2 bg-white border border-gray-200 hover:shadow-md text-gray-700 px-3 py-2 rounded-lg transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 3h7v7m0-7L10 14" />
                      </svg>
                      Open File 
                    </a>
                  </div>
                  <div className="h-[400px] pt-12">
                    <iframe 
                      src={currentExercise.pdfSolution}
                      className="w-full h-full border rounded-lg"
                      title="PDF Solution"
                    />
                  </div>
                </div>
              ) : (
                <div className="aspect-w-16 aspect-h-9 bg-black rounded-lg overflow-hidden">
                  <video 
                    src={currentExercise.videoSolution}
                    controls
                    className="w-full h-full"
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ExerciseViewer;
