import React, { useState } from "react";
import Books from "../assets/Books.jpg";



// Sample data for multiple courses
const coursesData = [
  {
    id: "cs-101",
    title: "Algorithims Fundamentals",
    description:
      "Covers basic algorithms, data structures, and programming concepts.",
    thumbnail: Books,
    details:
      "This course introduces the foundational concepts of computer science, including algorithms, data structures, and programming basics. Ideal for beginners.",
    chapters: [
      {
        title: "Chapter 1: Algorithms",
        videoUrl: "https://youtu.be/YMdeOS-taQQ?list=RDMMbyfiQA8HRaE",
        pdfUrl: "/pdfs/algorithms.pdf",
        duration: "15 min",
      },
      // More chapters...
    ],
  },
  {
    id: "math-101",
    title: "Python Essentials",
    description:
      "Key concepts in algebra, calculus, and geometry for baccalaureate students.",
    thumbnail: Books,
    details:
      "A comprehensive course covering algebra, calculus, and geometry, tailored for baccalaureate exam preparation.",
    chapters: [
      {
        title: "Chapter 1: Algebra Basics",
        videoUrl: "https://www.youtube.com/embed/5v5AqF0zP5w",
        pdfUrl: "/pdfs/algebra.pdf",
        duration: "20 min",
      },
      // More chapters...
    ],
  },

  {
    id: "math-101",
    title: "Quetie design",
    description:
      "Key concepts in algebra, calculus, and geometry for baccalaureate students.",
    thumbnail: Books,
    details:
      "A comprehensive course covering algebra, calculus, and geometry, tailored for baccalaureate exam preparation.",
    chapters: [
      {
        title: "Chapter 1: Algebra Basics",
        videoUrl: "https://www.youtube.com/embed/5v5AqF0zP5w",
        pdfUrl: "/pdfs/algebra.pdf",
        duration: "20 min",
      },
      // More chapters...
    ],
  },

  // Add more courses as needed
];

function CourseViewer() {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [activeContentType, setActiveContentType] = useState("video");
  const [currentChapter, setCurrentChapter] = useState(0);
  const [showDetails, setShowDetails] = useState(null); // course id for popup

  // Handler for selecting a course
  const handleSelectCourse = (course) => {
    setSelectedCourse(course);
    setCurrentChapter(0);
    setActiveContentType("video");
  };

  // Handler for closing the details popup
  const handleCloseDetails = () => setShowDetails(null);

  // If no course is selected, show all courses as cards
  if (!selectedCourse) {
    return (
      <div>
        <h2 className="text-2xl font-bold mb-8">Available Courses</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {coursesData.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center relative"
            >
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-32 h-32 object-cover rounded-full mb-4 border-4 border-indigo-100 shadow"
              />
              <h3 className="text-lg font-semibold mb-2 text-indigo-700">
                {course.title}
              </h3>
              <p className="text-gray-500 mb-4 text-center">
                {course.description}
              </p>
              <div className="flex gap-2 mt-auto">
                <button
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow"
                  onClick={() => handleSelectCourse(course)}
                >
                  View Course
                </button>
                <button
                  className="bg-gray-200 hover:bg-gray-300 text-indigo-700 px-4 py-2 rounded-lg shadow"
                  onClick={() => setShowDetails(course.id)}
                >
                  More Details
                </button>
              </div>
              {/* Popup for more details */}
              {showDetails === course.id && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-indigo-200/60 via-pink-100/40 to-white/60 backdrop-blur-[2px]">
                  <div className="relative bg-white/90 rounded-3xl shadow-2xl p-10 max-w-lg w-full border border-indigo-100 animate-fadeIn">
                    <button
                      className="absolute top-4 right-4 text-indigo-300 hover:text-indigo-700 text-3xl font-bold transition-colors duration-200"
                      onClick={handleCloseDetails}
                      aria-label="Close"
                    >
                      &times;
                    </button>
                    <div className="flex flex-col items-center">
                      <div className="bg-gradient-to-br from-indigo-400 via-pink-300 to-indigo-200 rounded-full p-1 mb-4 shadow-lg">
                        <img
                          src={course.thumbnail}
                          alt={course.title}
                          className="w-28 h-28 object-cover rounded-full border-4 border-white shadow"
                        />
                      </div>
                      <h3 className="text-2xl font-extrabold text-indigo-700 mb-1 text-center drop-shadow">
                        {course.title}
                      </h3>
                      <p className="text-pink-600 text-sm mb-2 text-center font-medium">
                        {course.description}
                      </p>
                      <div className="w-12 h-1 bg-gradient-to-r from-indigo-400 via-pink-400 to-indigo-200 rounded-full mb-4" />
                      <p className="text-gray-700 mb-4 text-center leading-relaxed">
                        {course.details}
                      </p>
                      <ul className="flex gap-4 justify-center mb-4">
                        <li className="flex flex-col items-center">
                          <span className="text-indigo-600 font-bold text-lg">
                            {course.chapters.length}
                          </span>
                          <span className="text-xs text-gray-500">
                            Chapters
                          </span>
                        </li>
                        {/* Add more stats if needed */}
                      </ul>
                      <button
                        className="bg-gradient-to-r from-indigo-500 to-pink-500 hover:from-indigo-600 hover:to-pink-600 text-white px-6 py-3 rounded-xl shadow-lg font-semibold text-lg w-full mt-2 transition-all duration-200"
                        onClick={() => {
                          handleSelectCourse(course);
                          handleCloseDetails();
                        }}
                      >
                        Start Course
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // If a course is selected, show the chapter navigation and content
  return (
    <div>
      <button
        className="mb-4 text-indigo-600 hover:underline font-medium"
        onClick={() => setSelectedCourse(null)}
      >
        ← Back to Courses
      </button>
      <h2 className="text-2xl font-bold mb-4">{selectedCourse.title}</h2>

      {/* Content Type Toggle */}
      <div className="flex mb-6 border-b border-gray-200">
        <button
          onClick={() => setActiveContentType("video")}
          className={`pb-2 px-4 ${
            activeContentType === "video"
              ? "border-b-2 border-indigo-500 text-indigo-600"
              : "text-gray-500"
          }`}
        >
          Video Course
        </button>
        <button
          onClick={() => setActiveContentType("pdf")}
          className={`pb-2 px-4 ${
            activeContentType === "pdf"
              ? "border-b-2 border-indigo-500 text-indigo-600"
              : "text-gray-500"
          }`}
        >
          PDF Materials
        </button>
      </div>

      {/* Chapter Navigation */}
      <div className="flex gap-4">
        <div className="w-1/4 bg-white p-4 rounded-lg shadow">
          <h3 className="font-medium mb-3">Chapters</h3>
          <ul className="space-y-2">
            {selectedCourse.chapters.map((chapter, index) => (
              <li key={index}>
                <button
                  onClick={() => setCurrentChapter(index)}
                  className={`w-full text-left p-2 rounded ${
                    currentChapter === index
                      ? "bg-indigo-50 text-indigo-700"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {chapter.title}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Content Display */}
        <div className="flex-1 bg-white p-6 rounded-lg shadow">
          {activeContentType === "video" ? (
            <div>
              <div className="aspect-w-16 aspect-h-9 bg-black rounded-lg overflow-hidden">
                <video
                  src={selectedCourse.chapters[currentChapter].videoUrl}
                  controls
                  className="w-full h-full"
                />
              </div>
              <div className="mt-4">
                <h3 className="text-xl font-medium">
                  {selectedCourse.chapters[currentChapter].title}
                </h3>
                <p className="text-gray-500">
                  {selectedCourse.chapters[currentChapter].duration}
                </p>
              </div>
            </div>
          ) : (
            <div className="h-[70vh]">
              {/* <iframe
                src={selectedCourse.chapters[currentChapter].pdfUrl}
                className="w-full h-full border rounded-lg"
                title="PDF Viewer"
              /> */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CourseViewer;
