import React from 'react';

function ProgressTracker() {
  // Sample data - replace with real data from your backend
  const progressData = {
    completedCourses: 8,
    totalCourses: 12,
    lastActive: "Algorithm Analysis",
    quizScores: [
      { name: "Algorithms Quiz", score: 85, date: "2023-05-15" },
      { name: "Database Quiz", score: 72, date: "2023-06-02" },
      { name: "Networking Quiz", score: 91, date: "2023-06-10" },
    ],
    subjects: {
      "Computer Science": 78,
      "Mathematics": 65,
      "Physics": 82,
    },
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">My Learning Progress</h2>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Course Completion */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-medium text-gray-500">Course Completion</h3>
          <div className="flex items-center mt-2">
            <div className="relative w-16 h-16 mr-4">
              <svg className="w-full h-full" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#E5E7EB"
                  strokeWidth="3"
                />
                <path
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#4F46E5" // Indigo-600
                  strokeWidth="3"
                  strokeDasharray={`${(progressData.completedCourses / progressData.totalCourses) * 100}, 100`}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-sm font-bold">
                {Math.round((progressData.completedCourses / progressData.totalCourses) * 100)}%
              </div>
            </div>
            <div>
              <p className="text-lg font-semibold">
                {progressData.completedCourses}/{progressData.totalCourses} courses
              </p>
              <p className="text-sm text-gray-500">Last active: {progressData.lastActive}</p>
            </div>
          </div>
        </div>

        {/* Subject Mastery */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-medium text-gray-500">Subject Mastery</h3>
          <div className="mt-3 space-y-2">
            {Object.entries(progressData.subjects).map(([subject, score]) => (
              <div key={subject}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{subject}</span>
                  <span>{score}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-indigo-600 h-2 rounded-full"
                    style={{ width: `${score}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-medium text-gray-500">Recent Activity</h3>
          <ul className="mt-3 space-y-3">
            <li className="flex items-center">
              <div className="bg-indigo-100 p-2 rounded-full mr-3">
                <span className="text-indigo-600">📚</span>
              </div>
              <div>
                <p className="font-medium">Completed Chapter 3</p>
                <p className="text-sm text-gray-500">Algorithm Analysis • 2 days ago</p>
              </div>
            </li>
            <li className="flex items-center">
              <div className="bg-green-100 p-2 rounded-full mr-3">
                <span className="text-green-600">✓</span>
              </div>
              <div>
                <p className="font-medium">Quiz Submitted</p>
                <p className="text-sm text-gray-500">Database Systems • 1 week ago</p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Quiz Performance */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="font-medium text-lg mb-4">Quiz Performance</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quiz
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Score
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {progressData.quizScores.map((quiz, index) => (
                <tr key={index}>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                    {quiz.name}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      <span className="mr-2">{quiz.score}%</span>
                      <div className="w-16 bg-gray-200 rounded-full h-1.5">
                        <div
                          className={`h-1.5 rounded-full ${
                            quiz.score >= 80
                              ? "bg-green-500"
                              : quiz.score >= 60
                              ? "bg-yellow-500"
                              : "bg-red-500"
                          }`}
                          style={{ width: `${quiz.score}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                    {quiz.date}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        quiz.score >= 80
                          ? "bg-green-100 text-green-800"
                          : quiz.score >= 60
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {quiz.score >= 80 ? "Excellent" : quiz.score >= 60 ? "Good" : "Needs Work"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Study Recommendations */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="font-medium text-lg mb-4">Recommended For You</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border border-gray-200 rounded-lg p-4 hover:border-indigo-300 transition-colors">
            <div className="bg-indigo-50 w-10 h-10 rounded-full flex items-center justify-center mb-3">
              <span className="text-indigo-600">📊</span>
            </div>
            <h4 className="font-medium mb-1">Weakest Area: Database Normalization</h4>
            <p className="text-sm text-gray-500">
              Based on your quiz performance, we recommend reviewing Chapter 5.
            </p>
          </div>
          <div className="border border-gray-200 rounded-lg p-4 hover:border-indigo-300 transition-colors">
            <div className="bg-blue-50 w-10 h-10 rounded-full flex items-center justify-center mb-3">
              <span className="text-blue-600">🏛</span>
            </div>
            <h4 className="font-medium mb-1">2019 Bac Exam - Computer Science</h4>
            <p className="text-sm text-gray-500">
              Try this exam similar to your current study path.
            </p>
          </div>
          <div className="border border-gray-200 rounded-lg p-4 hover:border-indigo-300 transition-colors">
            <div className="bg-purple-50 w-10 h-10 rounded-full flex items-center justify-center mb-3">
              <span className="text-purple-600">🎥</span>
            </div>
            <h4 className="font-medium mb-1">Video: Algorithm Optimization</h4>
            <p className="text-sm text-gray-500">
              Watch this 12-minute tutorial to boost your skills.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ProgressTracker;