import React, { useState } from "react";
// Import your chart and table components and icons here
// import { FiDownload, FiUsers, FiActivity, FiBarChart2, FiAward, FiTrendingUp, FiPieChart, FiBookOpen, FiClock, FiUserCheck } from "react-icons/fi";
// import Select from "./Select";
// import StatCard from "./StatCard";
// import LineChart from "./LineChart";
// import HeatmapChart from "./HeatmapChart";
// import DataTable from "./DataTable";

const courseOptions = [
  { value: null, label: "All Courses" },
  { value: "cs-101", label: "Computer Science" },
  { value: "math-101", label: "Mathematics" },
  // ...
];

const DataVisualization = () => {
  const [filters, setFilters] = useState({
    course: null,
    dateRange: "all_time",
    onlyActive: false,
  });

  // Dummy data for demonstration
  const data = {
    overview: {
      totalStudents: 1200,
      activeStudents: 850,
      avgCompletion: 76,
      avgScore: 14.2,
      topPerformer: "Aymen D.",
      mostPopularCourse: "Mathematics Essentials",
      avgTimeSpent: "2h 15m",
    },
    trends: [
      { month: "Jan", enrollments: 100 },
      { month: "Feb", enrollments: 150 },
      { month: "Mar", enrollments: 200 },
      { month: "Apr", enrollments: 180 },
      { month: "May", enrollments: 220 },
      { month: "Jun", enrollments: 250 },
    ],
    courses: ["CS", "Math", "Physics", "English"],
    studentGroups: ["A", "B", "C", "D"],
    completionRates: [
      [80, 70, 60, 90],
      [75, 85, 65, 80],
      [60, 55, 70, 75],
      [90, 88, 92, 85],
    ],
    students: [
      { name: "Aymen D.", course: "CS", progress: "100%", score: 18.5, lastActive: "Today", status: "Active" },
      { name: "Sara M.", course: "Math", progress: "85%", score: 16.2, lastActive: "Yesterday", status: "Active" },
      { name: "Ali B.", course: "Physics", progress: "60%", score: 12.7, lastActive: "3 days ago", status: "Inactive" },
      // ...
    ],
    activity: [
      { date: "2025-07-01", logins: 120, submissions: 80 },
      { date: "2025-07-02", logins: 140, submissions: 90 },
      { date: "2025-07-03", logins: 110, submissions: 70 },
      // ...
    ],
    leaderboard: [
      { name: "Aymen D.", score: 18.5 },
      { name: "Sara M.", score: 17.9 },
      { name: "Yasmine K.", score: 17.5 },
    ],
    engagement: [
      { course: "CS", avgTime: "2h" },
      { course: "Math", avgTime: "2h 30m" },
      { course: "Physics", avgTime: "1h 45m" },
    ],
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
        <h1 className="text-3xl font-extrabold text-indigo-700 drop-shadow">Student Progress Monitoring</h1>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold shadow hover:bg-indigo-700 transition-all">
            {/* <FiDownload /> */} Export Report
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-8">
        {/* <Select ... /> */}
        <select
          className="px-4 py-2 rounded-lg border border-indigo-200 focus:ring-2 focus:ring-indigo-400"
          value={filters.course || ""}
          onChange={e => setFilters({ ...filters, course: e.target.value })}
        >
          {courseOptions.map(opt => (
            <option key={opt.value || "all"} value={opt.value || ""}>{opt.label}</option>
          ))}
        </select>
        <select
          className="px-4 py-2 rounded-lg border border-indigo-200 focus:ring-2 focus:ring-indigo-400"
          value={filters.dateRange}
          onChange={e => setFilters({ ...filters, dateRange: e.target.value })}
        >
          <option value="all_time">All Time</option>
          <option value="this_month">This Month</option>
          <option value="this_week">This Week</option>
        </select>
        <label className="flex items-center gap-2 text-indigo-700 font-medium">
          <input
            type="checkbox"
            checked={filters.onlyActive}
            onChange={e => setFilters({ ...filters, onlyActive: e.target.checked })}
            className="accent-indigo-600"
          />
          Only Active Students
        </label>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {/* StatCard components or custom cards */}
        <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-center">
          <div className="text-3xl text-indigo-600 mb-2 font-bold">{data.overview.totalStudents}</div>
          <div className="text-gray-500 font-medium">Total Students</div>
        </div>
        <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-center">
          <div className="text-3xl text-green-600 mb-2 font-bold">{data.overview.activeStudents}</div>
          <div className="text-gray-500 font-medium">Active Learners</div>
        </div>
        <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-center">
          <div className="text-3xl text-pink-600 mb-2 font-bold">{data.overview.avgCompletion}%</div>
          <div className="text-gray-500 font-medium">Avg. Completion</div>
        </div>
        <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-center">
          <div className="text-3xl text-yellow-600 mb-2 font-bold">{data.overview.avgScore}</div>
          <div className="text-gray-500 font-medium">Avg. Score</div>
        </div>
      </div>

      {/* Extra Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-indigo-100 via-pink-100 to-white rounded-2xl shadow p-6 flex flex-col items-center">
          <div className="text-lg font-bold text-indigo-700 mb-1">Top Performer</div>
          <div className="text-2xl font-extrabold text-indigo-900 mb-2">{data.overview.topPerformer}</div>
          <div className="text-gray-500">Most Popular Course: <span className="font-semibold text-pink-600">{data.overview.mostPopularCourse}</span></div>
        </div>
        <div className="bg-gradient-to-br from-pink-100 via-indigo-100 to-white rounded-2xl shadow p-6 flex flex-col items-center">
          <div className="text-lg font-bold text-pink-700 mb-1">Avg. Time Spent</div>
          <div className="text-2xl font-extrabold text-pink-900 mb-2">{data.overview.avgTimeSpent}</div>
          <div className="text-gray-500">Across all students</div>
        </div>
        <div className="bg-gradient-to-br from-indigo-100 via-pink-100 to-white rounded-2xl shadow p-6 flex flex-col items-center">
          <div className="text-lg font-bold text-indigo-700 mb-1">Leaderboard</div>
          <ul className="w-full">
            {data.leaderboard.map((s, i) => (
              <li key={i} className="flex justify-between text-gray-700 font-medium py-1">
                <span>{i + 1}. {s.name}</span>
                <span className="font-bold text-indigo-600">{s.score}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow flex flex-col">
          <div className="font-bold text-indigo-700 mb-2">Enrollment Trends</div>
          {/* <LineChart ... /> */}
          <div className="h-64 flex items-center justify-center text-gray-400">[Line Chart Placeholder]</div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow flex flex-col">
          <div className="font-bold text-indigo-700 mb-2">Course Completion Rates</div>
          {/* <HeatmapChart ... /> */}
          <div className="h-64 flex items-center justify-center text-gray-400">[Heatmap Chart Placeholder]</div>
        </div>
      </div>

      {/* Activity Chart */}
      <div className="bg-white p-6 rounded-2xl shadow mb-8">
        <div className="font-bold text-indigo-700 mb-2">Daily Activity (Logins & Submissions)</div>
        {/* <BarChart ... /> */}
        <div className="h-64 flex items-center justify-center text-gray-400">[Bar Chart Placeholder]</div>
      </div>

      {/* Engagement by Course */}
      <div className="bg-white p-6 rounded-2xl shadow mb-8">
        <div className="font-bold text-indigo-700 mb-2">Average Time Spent per Course</div>
        {/* <PieChart ... /> */}
        <ul className="flex flex-wrap gap-8 mt-4">
          {data.engagement.map((e, i) => (
            <li key={i} className="flex flex-col items-center">
              <span className="text-lg font-bold text-indigo-700">{e.course}</span>
              <span className="text-pink-600 font-semibold">{e.avgTime}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Performance Table */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <div className="font-bold text-indigo-700 mb-2">Student Performance</div>
        {/* <DataTable ... /> */}
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="py-2 px-4">Student</th>
              <th className="py-2 px-4">Course</th>
              <th className="py-2 px-4">Progress</th>
              <th className="py-2 px-4">Avg Score</th>
              <th className="py-2 px-4">Last Active</th>
              <th className="py-2 px-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {data.students.map((s, i) => (
              <tr key={i} className="border-b hover:bg-indigo-50">
                <td className="py-2 px-4 font-semibold text-indigo-700">{s.name}</td>
                <td className="py-2 px-4">{s.course}</td>
                <td className="py-2 px-4">{s.progress}</td>
                <td className="py-2 px-4">{s.score}</td>
                <td className="py-2 px-4">{s.lastActive}</td>
                <td className="py-2 px-4">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${s.status === "Active" ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-500"}`}>{s.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataVisualization;
