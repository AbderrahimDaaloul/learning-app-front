import React from "react";
import { useState } from "react";
const Courses = () => {
  const initialCourses = [
    {
      id: 1,
      name: "Computer Science Fundamentals",
      description:
        "Learn the basics of algorithms, data structures, and programming.",
      chapters: [
        {
          name: "Algorithms",
          course: { pdfs: ["algorithms.pdf"], videos: ["algorithms.mp4"] },
          exercises: { pdfs: ["alg-ex1.pdf"], videos: ["alg-ex1.mp4"] },
        },
      ],
    },

    {
      id: 1,
      name: "Computer Science Fundamentals",
      description:
        "Learn the basics of algorithms, data structures, and programming.",
      chapters: [
        {
          name: "Algorithms",
          course: { pdfs: ["algorithms.pdf"], videos: ["algorithms.mp4"] },
          exercises: { pdfs: ["alg-ex1.pdf"], videos: ["alg-ex1.mp4"] },
        },
      ],
    },
  ];

  const [courses, setCourses] = useState(initialCourses);

  return (
    <div className="bg-gradient-to-br from-indigo-50 via-pink-50 to-white rounded-3xl shadow-2xl p-10 max-w-5xl mx-auto mt-8 border border-indigo-100">
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-3xl font-extrabold text-indigo-700 drop-shadow">Manage Courses</h2>
        <button className="bg-gradient-to-r from-indigo-500 to-pink-500 text-white px-8 py-3 rounded-2xl shadow-xl hover:from-indigo-600 hover:to-pink-600 font-bold text-lg transition-all duration-200">
          Add Course
        </button>
      </div>
      {/* CRUD UI for courses, chapters, exercises, and course materials */}
      <ul className="divide-y divide-indigo-100">
        {courses.map((course) => (
          <li key={course.id} className="py-8">
            <div className="flex justify-between items-center mb-4">
              <div>
                <div className="font-bold text-indigo-800 text-2xl flex items-center gap-2">
                  <span className="inline-block w-3 h-3 bg-gradient-to-br from-indigo-400 to-pink-400 rounded-full"></span>
                  {course.name}
                </div>
                <div className="text-gray-500 text-base mb-1 font-medium">
                  {course.description}
                </div>
                <div className="text-xs text-gray-400">
                  Chapters: {course.chapters.length}
                </div>
              </div>
              <div className="flex gap-2">
                <button className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-lg hover:bg-yellow-200 font-semibold shadow">
                  Edit
                </button>
                <button className="bg-red-100 text-red-700 px-4 py-2 rounded-lg hover:bg-red-200 font-semibold shadow">
                  Delete
                </button>
              </div>
            </div>
            {/* Chapters CRUD */}
            <div className="ml-8 mt-4">
              <h4 className="font-semibold text-indigo-600 mb-4 text-lg">Chapters</h4>
              <ul className="space-y-4">
                {course.chapters.map((chapter, idx) => (
                  <li key={idx} className="bg-white rounded-2xl p-6 shadow flex flex-col gap-2 border border-indigo-100">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-indigo-700 text-lg flex items-center gap-2">
                        <span className="inline-block w-2 h-2 bg-gradient-to-br from-indigo-400 to-pink-400 rounded-full"></span>
                        {chapter.name}
                      </span>
                      <div className="flex gap-2">
                        <button className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded hover:bg-yellow-200 text-xs font-semibold shadow">
                          Edit
                        </button>
                        <button className="bg-red-100 text-red-700 px-3 py-1 rounded hover:bg-red-200 text-xs font-semibold shadow">
                          Delete
                        </button>
                      </div>
                    </div>
                    {/* Course Materials CRUD */}
                    <div className="ml-4">
                      <div className="mb-1 text-sm text-indigo-500 font-semibold flex items-center gap-2">
                        <span className="inline-block w-2 h-2 bg-indigo-400 rounded-full"></span> Course Materials
                      </div>
                      <div className="flex gap-2 mb-2">
                        <span className="text-xs text-gray-500">
                          PDFs: {chapter.course.pdfs.join(", ")}
                        </span>
                        <span className="text-xs text-gray-500">
                          Videos: {chapter.course.videos.join(", ")}
                        </span>
                      </div>
                      <div className="flex gap-2 mb-4">
                        <button className="bg-green-100 text-green-700 px-2 py-1 rounded hover:bg-green-200 text-xs font-semibold shadow">
                          Add PDF
                        </button>
                        <button className="bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200 text-xs font-semibold shadow">
                          Add Video
                        </button>
                      </div>
                      <div className="mb-1 text-sm text-pink-500 font-semibold flex items-center gap-2">
                        <span className="inline-block w-2 h-2 bg-pink-400 rounded-full"></span> Exercises
                      </div>
                      <div className="flex gap-2 mb-2">
                        <span className="text-xs text-gray-500">
                          PDFs: {chapter.exercises.pdfs.join(", ")}
                        </span>
                        <span className="text-xs text-gray-500">
                          Videos: {chapter.exercises.videos.join(", ")}
                        </span>
                      </div>
                      <div className="flex gap-2 mt-2">
                        <button className="bg-green-100 text-green-700 px-2 py-1 rounded hover:bg-green-200 text-xs font-semibold shadow">
                          Add PDF
                        </button>
                        <button className="bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200 text-xs font-semibold shadow">
                          Add Video
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <button className="mt-5 bg-indigo-200 text-indigo-700 px-6 py-2 rounded-lg shadow hover:bg-indigo-300 text-base font-semibold">
                Add Chapter
              </button>
            </div>
          </li>
        ))}
      </ul>
      {/* Add Course button moved to the top */}
    </div>
  );
};

export default Courses;
