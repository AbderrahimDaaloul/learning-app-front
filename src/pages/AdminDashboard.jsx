import React, { useState } from "react";
import Students from "../components/Students ";
import Courses from "../components/Courses";
import Admins from "../components/Admins";
import DataVisualization from "../components/DataVisualization";

function AdminDashboard() {
  const [tab, setTab] = useState("admins");

  // ...CRUD logic for admins, students, courses, chapters, exercises, and course materials...
  // For brevity, only the UI skeleton and state structure are shown here.

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-pink-50 to-white p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-indigo-700 mb-8 text-center drop-shadow">
          Admin Dashboard
        </h1>
        <div className="flex gap-4 mb-8 justify-center">
          <button
            onClick={() => setTab("admins")}
            className={`px-6 py-2 rounded-xl font-semibold shadow ${
              tab === "admins"
                ? "bg-indigo-600 text-white"
                : "bg-white text-indigo-600 border border-indigo-200 hover:bg-indigo-50"
            }`}
          >
            Admins
          </button>
          <button
            onClick={() => setTab("students")}
            className={`px-6 py-2 rounded-xl font-semibold shadow ${
              tab === "students"
                ? "bg-indigo-600 text-white"
                : "bg-white text-indigo-600 border border-indigo-200 hover:bg-indigo-50"
            }`}
          >
            Students
          </button>
          <button
            onClick={() => setTab("courses")}
            className={`px-6 py-2 rounded-xl font-semibold shadow ${
              tab === "courses"
                ? "bg-indigo-600 text-white"
                : "bg-white text-indigo-600 border border-indigo-200 hover:bg-indigo-50"
            }`}
          >
            Courses
          </button>

          <button
            onClick={() => setTab("visualization")}
            className={`px-6 py-2 rounded-xl font-semibold shadow ${
              tab === "visualization"
                ? "bg-indigo-600 text-white"
                : "bg-white text-indigo-600 border border-indigo-200 hover:bg-indigo-50"
            }`}
          >
            visualization
          </button>
        </div>
        {/* Admins CRUD */}
        {tab === "admins" && <Admins />}
        {/* Students CRUD */}
        {tab === "students" && <Students />}
        {/* Courses CRUD */}
        {tab === "courses" && <Courses />}
        {tab === "visualization" && <DataVisualization />}
      </div>
    </div>
  );
}

export default AdminDashboard;
