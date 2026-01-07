import React, { useState } from "react";

// --- Simple Icon Components (No external libraries needed) ---
const IconDownload = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>;
const IconUsers = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>;
const IconActivity = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>;
const IconAward = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>; // Using clock for time, award for score
const IconTrending = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>;
const IconChart = () => <svg className="w-12 h-12 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>;

const courseOptions = [
  { value: null, label: "All Courses" },
  { value: "cs-101", label: "Computer Science" },
  { value: "math-101", label: "Mathematics" },
];

const DataVisualization = () => {
  const [filters, setFilters] = useState({
    course: null,
    dateRange: "all_time",
    onlyActive: false,
  });

  // Dummy Data
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
    students: [
      { name: "Aymen D.", course: "CS", progress: "100%", score: 18.5, lastActive: "Today", status: "Active" },
      { name: "Sara M.", course: "Math", progress: "85%", score: 16.2, lastActive: "Yesterday", status: "Active" },
      { name: "Ali B.", course: "Physics", progress: "60%", score: 12.7, lastActive: "3 days ago", status: "Inactive" },
      { name: "John D.", course: "CS", progress: "40%", score: 10.5, lastActive: "1 week ago", status: "Inactive" },
    ],
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans p-6 md:p-10">
      
      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-10">
        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 mb-8">
          <div>
            <h2 className="text-sm font-semibold text-indigo-600 uppercase tracking-wider mb-1">Instructor Dashboard</h2>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">Student Progress</h1>
          </div>
          <button className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-lg font-medium shadow-md shadow-indigo-200 hover:bg-indigo-700 hover:shadow-lg transition-all active:scale-95">
            <IconDownload /> <span>Export Report</span>
          </button>
        </div>

        {/* Filters Bar */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex flex-wrap gap-4 items-center mb-10">
          <div className="relative">
             <select
              className="appearance-none bg-slate-50 border border-slate-200 text-slate-700 py-2.5 px-4 pr-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent cursor-pointer font-medium text-sm"
              value={filters.course || ""}
              onChange={e => setFilters({ ...filters, course: e.target.value })}
            >
              {courseOptions.map(opt => (
                <option key={opt.value || "all"} value={opt.value || ""}>{opt.label}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
              <svg className="fill-current h-4 w-4" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>
          
          <div className="relative">
            <select
              className="appearance-none bg-slate-50 border border-slate-200 text-slate-700 py-2.5 px-4 pr-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent cursor-pointer font-medium text-sm"
              value={filters.dateRange}
              onChange={e => setFilters({ ...filters, dateRange: e.target.value })}
            >
              <option value="all_time">All Time</option>
              <option value="this_month">This Month</option>
              <option value="this_week">This Week</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
              <svg className="fill-current h-4 w-4" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>

         
        </div>

        {/* Top Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {[
            { label: "Total Students", value: data.overview.totalStudents, icon: <IconUsers />, color: "text-indigo-600", bg: "bg-indigo-50" },
            { label: "Active Learners", value: data.overview.activeStudents, icon: <IconActivity />, color: "text-emerald-600", bg: "bg-emerald-50" },
            { label: "Avg. Completion", value: `${data.overview.avgCompletion}%`, icon: <IconTrending />, color: "text-pink-600", bg: "bg-pink-50" },
            { label: "Avg. Score", value: data.overview.avgScore, icon: <IconAward />, color: "text-amber-600", bg: "bg-amber-50" },
          ].map((stat, idx) => (
            <div key={idx} className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${stat.bg} ${stat.color}`}>
                  {stat.icon}
                </div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Update: Today</span>
              </div>
              <div>
                <div className="text-3xl font-bold text-slate-800">{stat.value}</div>
                <div className="text-sm font-medium text-slate-500 mt-1">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
          
          {/* Left Column: Charts */}
          <div className="lg:col-span-2 space-y-8">
            {/* Enrollment Chart */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <div className="flex justify-between items-center mb-6">
                 <h3 className="font-bold text-lg text-slate-800">Enrollment Trends</h3>
                 <button className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">View Details</button>
              </div>
              <div className="h-64 bg-slate-50 rounded-xl border border-dashed border-slate-300 flex flex-col items-center justify-center text-slate-400 gap-2">
                <IconChart />
                <span className="text-sm font-medium">Line Chart Component</span>
              </div>
            </div>

            {/* Completion Rates */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <h3 className="font-bold text-lg text-slate-800 mb-6">Course Completion Heatmap</h3>
              <div className="h-64 bg-slate-50 rounded-xl border border-dashed border-slate-300 flex flex-col items-center justify-center text-slate-400 gap-2">
                <IconChart />
                <span className="text-sm font-medium">Heatmap Component</span>
              </div>
            </div>
            
             {/* Student Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="p-6 border-b border-slate-100">
                <h3 className="font-bold text-lg text-slate-800">Recent Student Activity</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-semibold">
                    <tr>
                      <th className="py-4 px-6">Student</th>
                      <th className="py-4 px-6">Course</th>
                      <th className="py-4 px-6">Progress</th>
                      <th className="py-4 px-6">Avg Score</th>
                      <th className="py-4 px-6">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {data.students.map((s, i) => (
                      <tr key={i} className="hover:bg-indigo-50/30 transition-colors">
                        <td className="py-4 px-6">
                          <div className="font-semibold text-slate-800">{s.name}</div>
                          <div className="text-xs text-slate-500">{s.lastActive}</div>
                        </td>
                        <td className="py-4 px-6 text-sm text-slate-600">{s.course}</td>
                        <td className="py-4 px-6">
                          <div className="w-full bg-slate-200 rounded-full h-2 max-w-[100px]">
                            <div className="bg-indigo-600 h-2 rounded-full" style={{ width: s.progress }}></div>
                          </div>
                          <span className="text-xs font-medium text-slate-500 mt-1 inline-block">{s.progress}</span>
                        </td>
                        <td className="py-4 px-6 font-medium text-slate-700">{s.score}</td>
                        <td className="py-4 px-6">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            s.status === "Active" 
                              ? "bg-emerald-100 text-emerald-800" 
                              : "bg-slate-100 text-slate-500"
                          }`}>
                            <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${s.status === "Active" ? "bg-emerald-500" : "bg-slate-400"}`}></span>
                            {s.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Column: Insights */}
          <div className="space-y-8">
            
            {/* Top Performer Card */}
            <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-2xl shadow-lg p-6 text-white relative overflow-hidden">
              <div className="relative z-10">
                <div className="text-indigo-200 text-sm font-semibold uppercase tracking-wider mb-2">Top Performer</div>
                <div className="text-3xl font-bold mb-1">{data.overview.topPerformer}</div>
                <div className="text-indigo-200 text-sm mb-6">Score: 19.8/20</div>
                
                <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm border border-white/10">
                  <div className="text-xs text-indigo-100">Favorite Course</div>
                  <div className="font-semibold">{data.overview.mostPopularCourse}</div>
                </div>
              </div>
              {/* Decorative Circle */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
            </div>

            {/* Leaderboard */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
               <h3 className="font-bold text-lg text-slate-800 mb-4">Class Leaderboard</h3>
               <ul className="space-y-4">
                {data.leaderboard.map((s, i) => (
                  <li key={i} className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        i === 0 ? 'bg-amber-100 text-amber-700' : 
                        i === 1 ? 'bg-slate-200 text-slate-600' : 
                        'bg-orange-100 text-orange-700'
                      }`}>
                        {i + 1}
                      </div>
                      <span className="font-medium text-slate-700">{s.name}</span>
                    </div>
                    <span className="font-bold text-indigo-600">{s.score}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Engagement */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <h3 className="font-bold text-lg text-slate-800 mb-4">Avg. Time per Course</h3>
              <div className="space-y-4">
                {data.engagement.map((e, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-slate-600">{e.course}</span>
                      <span className="font-bold text-indigo-600">{e.avgTime}</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2">
                      <div 
                        className="bg-indigo-400 h-2 rounded-full" 
                        style={{ width: i === 0 ? '60%' : i === 1 ? '85%' : '40%' }} // Dummy widths for visual
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default DataVisualization;