import React, { useState } from 'react';
import Books from '../assets/Books.jpg';

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
      <div>
        <h2 className="text-2xl font-bold mb-8">Exercise Courses</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {exerciseCourses.map(course => (
            <div key={course.id} className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center relative">
              <img src={course.thumbnail} alt={course.title} className="w-32 h-32 object-cover rounded-full mb-4 border-4 border-indigo-100 shadow" />
              <h3 className="text-lg font-semibold mb-2 text-indigo-700">{course.title}</h3>
              <p className="text-gray-500 mb-4 text-center">{course.description}</p>
              <div className="flex gap-2 mt-auto">
                <button
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow"
                  onClick={() => handleSelectCourse(course)}
                >View Exercises</button>
                <button
                  className="bg-gray-200 hover:bg-gray-300 text-indigo-700 px-4 py-2 rounded-lg shadow"
                  onClick={() => setShowDetails(course.id)}
                >More Details</button>
              </div>
              {/* Popup for more details */}
              {showDetails === course.id && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-indigo-200/60 via-pink-100/40 to-white/60 backdrop-blur-[2px]">
                  <div className="relative bg-white/90 rounded-3xl shadow-2xl p-10 max-w-lg w-full border border-indigo-100 animate-fadeIn">
                    <button
                      className="absolute top-4 right-4 text-indigo-300 hover:text-indigo-700 text-3xl font-bold transition-colors duration-200"
                      onClick={handleCloseDetails}
                      aria-label="Close"
                    >&times;</button>
                    <div className="flex flex-col items-center">
                      <div className="bg-gradient-to-br from-indigo-400 via-pink-300 to-indigo-200 rounded-full p-1 mb-4 shadow-lg">
                        <img src={course.thumbnail} alt={course.title} className="w-28 h-28 object-cover rounded-full border-4 border-white shadow" />
                      </div>
                      <h3 className="text-2xl font-extrabold text-indigo-700 mb-1 text-center drop-shadow">{course.title}</h3>
                      <p className="text-pink-600 text-sm mb-2 text-center font-medium">{course.description}</p>
                      <div className="w-12 h-1 bg-gradient-to-r from-indigo-400 via-pink-400 to-indigo-200 rounded-full mb-4" />
                      <p className="text-gray-700 mb-4 text-center leading-relaxed">{course.details}</p>
                      <ul className="flex gap-4 justify-center mb-4">
                        <li className="flex flex-col items-center">
                          <span className="text-indigo-600 font-bold text-lg">{course.exercises.length}</span>
                          <span className="text-xs text-gray-500">Exercises</span>
                        </li>
                        {/* Add more stats if needed */}
                      </ul>
                      <button
                        className="bg-gradient-to-r from-indigo-500 to-pink-500 hover:from-indigo-600 hover:to-pink-600 text-white px-6 py-3 rounded-xl shadow-lg font-semibold text-lg w-full mt-2 transition-all duration-200"
                        onClick={() => { handleSelectCourse(course); handleCloseDetails(); }}
                      >Start Exercises</button>
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

  // If a course is selected, show the exercise viewer for that course
  const exercises = selectedCourse.exercises;

  return (
    <div>
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
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-medium mb-4">
              {exercises[selectedExercise].title}
            </h3>
            <div className="h-[400px] mb-4">
              {/* <iframe 
                src={exercises[selectedExercise].problem}
                className="w-full h-full border rounded"
                title="Exercise Problem"
              /> */}
            </div>
            <button
              onClick={() => setShowSolution(!showSolution)}
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
            >
              {showSolution ? 'Hide Solution' : 'Show Solution'}
            </button>
          </div>
          {showSolution && (
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex mb-4 border-b border-gray-200">
                <button
                  onClick={() => setSolutionFormat('pdf')}
                  className={`pb-2 px-4 ${solutionFormat === 'pdf' 
                    ? 'border-b-2 border-indigo-500 text-indigo-600' 
                    : 'text-gray-500'}`}
                >
                  PDF Correction
                </button>
                <button
                  onClick={() => setSolutionFormat('video')}
                  className={`pb-2 px-4 ${solutionFormat === 'video' 
                    ? 'border-b-2 border-indigo-500 text-indigo-600' 
                    : 'text-gray-500'}`}
                >
                  Video Explanation
                </button>
              </div>
              {solutionFormat === 'pdf' ? (
                <div className="h-[400px]">
                  {/* <iframe 
                    src={exercises[selectedExercise].pdfSolution}
                    className="w-full h-full border rounded"
                    title="PDF Solution"
                  /> */}
                </div>
              ) : (
                <div className="aspect-w-16 aspect-h-9 bg-black rounded-lg overflow-hidden">
                  <video 
                    src={exercises[selectedExercise].videoSolution}
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
// This component allows users to view and interact with exercises, including viewing problems and solutions in both