import React from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Trophy, 
  Target, 
  BookOpen, 
  CheckCircle, 
  Clock, 
  Zap,
  Award,
  Play,
  FileText,
  ArrowRight,
  Star,
  Flame,
  Calendar
} from 'lucide-react';

function ProgressTracker() {
  // Sample data - replace with real data from your backend
  const progressData = {
    completedCourses: 8,
    totalCourses: 12,
    completedExercises: 45,
    totalExercises: 60,
    completedExams: 6,
    totalExams: 9,
    streak: 7,
    totalHours: 42,
    lastActive: "Algorithm Analysis",
    quizScores: [
      { name: "Algorithms Quiz", score: 85, date: "2023-05-15", subject: "Computer Science" },
      { name: "Database Quiz", score: 72, date: "2023-06-02", subject: "Computer Science" },
      { name: "Networking Quiz", score: 91, date: "2023-06-10", subject: "Computer Science" },
      { name: "Calculus Quiz", score: 78, date: "2023-06-15", subject: "Mathematics" },
      { name: "Physics Quiz", score: 88, date: "2023-06-20", subject: "Physics" },
    ],
    subjects: {
      "Computer Science": { progress: 78, color: "from-indigo-500 to-purple-500" },
      "Mathematics": { progress: 65, color: "from-green-500 to-emerald-500" },
      "Physics": { progress: 82, color: "from-amber-500 to-orange-500" },
    },
    recentActivity: [
      { type: "course", title: "Completed Chapter 3", subtitle: "Algorithm Analysis", time: "2 days ago", icon: BookOpen },
      { type: "quiz", title: "Quiz Submitted", subtitle: "Database Systems • Score: 85%", time: "3 days ago", icon: CheckCircle },
      { type: "exercise", title: "Exercise Completed", subtitle: "Data Structures Practice", time: "5 days ago", icon: FileText },
      { type: "exam", title: "Past Exam Reviewed", subtitle: "Bac 2023 - Computer Science", time: "1 week ago", icon: Award },
    ],
    achievements: [
      { title: "First Steps", description: "Complete your first course", unlocked: true, icon: Star },
      { title: "Quiz Master", description: "Score 90%+ on 5 quizzes", unlocked: true, icon: Trophy },
      { title: "Streak Keeper", description: "7 day learning streak", unlocked: true, icon: Flame },
      { title: "Exam Ready", description: "Complete all past exams", unlocked: false, icon: Award },
    ],
  };

  const averageScore = Math.round(
    progressData.quizScores.reduce((acc, q) => acc + q.score, 0) / progressData.quizScores.length
  );

  return (
    <div className="p-6 space-y-8">
      {/* Header Section */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-3 mb-4">
          <div className="p-3 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl shadow-lg">
            <BarChart3 className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-700 to-cyan-700 bg-clip-text text-transparent">
            My Learning Progress
          </h2>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Track your learning journey, monitor your progress, and discover areas for improvement.
        </p>
      </div>

      {/* Main Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Courses Progress */}
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-100 shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl shadow">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <span className="text-3xl font-bold text-gray-800">
              {Math.round((progressData.completedCourses / progressData.totalCourses) * 100)}%
            </span>
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Courses</h3>
          <div className="w-full h-2 bg-indigo-100 rounded-full overflow-hidden mb-2">
            <div 
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-500"
              style={{ width: `${(progressData.completedCourses / progressData.totalCourses) * 100}%` }}
            />
          </div>
          <p className="text-sm text-gray-600">{progressData.completedCourses} of {progressData.totalCourses} completed</p>
        </div>

        {/* Exercises Progress */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100 shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl shadow">
              <FileText className="h-6 w-6 text-white" />
            </div>
            <span className="text-3xl font-bold text-gray-800">
              {Math.round((progressData.completedExercises / progressData.totalExercises) * 100)}%
            </span>
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Exercises</h3>
          <div className="w-full h-2 bg-green-100 rounded-full overflow-hidden mb-2">
            <div 
              className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full transition-all duration-500"
              style={{ width: `${(progressData.completedExercises / progressData.totalExercises) * 100}%` }}
            />
          </div>
          <p className="text-sm text-gray-600">{progressData.completedExercises} of {progressData.totalExercises} completed</p>
        </div>

        {/* Exams Progress */}
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-100 shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl shadow">
              <Award className="h-6 w-6 text-white" />
            </div>
            <span className="text-3xl font-bold text-gray-800">
              {Math.round((progressData.completedExams / progressData.totalExams) * 100)}%
            </span>
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Past Exams</h3>
          <div className="w-full h-2 bg-amber-100 rounded-full overflow-hidden mb-2">
            <div 
              className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full transition-all duration-500"
              style={{ width: `${(progressData.completedExams / progressData.totalExams) * 100}%` }}
            />
          </div>
          <p className="text-sm text-gray-600">{progressData.completedExams} of {progressData.totalExams} reviewed</p>
        </div>

        {/* Average Score */}
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-100 shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl shadow">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <span className="text-3xl font-bold text-gray-800">{averageScore}%</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Average Score</h3>
          <div className="w-full h-2 bg-blue-100 rounded-full overflow-hidden mb-2">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full transition-all duration-500"
              style={{ width: `${averageScore}%` }}
            />
          </div>
          <p className="text-sm text-gray-600">Across all quizzes</p>
        </div>
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Learning Streak */}
        <div className="bg-gradient-to-br from-white to-orange-50 rounded-2xl p-6 border border-orange-100 shadow-lg">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl shadow-lg">
              <Flame className="h-8 w-8 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Current Streak</p>
              <p className="text-3xl font-bold text-gray-800">{progressData.streak} days</p>
              <p className="text-sm text-orange-600 font-medium">🔥 Keep it up!</p>
            </div>
          </div>
        </div>

        {/* Study Time */}
        <div className="bg-gradient-to-br from-white to-purple-50 rounded-2xl p-6 border border-purple-100 shadow-lg">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl shadow-lg">
              <Clock className="h-8 w-8 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Study Time</p>
              <p className="text-3xl font-bold text-gray-800">{progressData.totalHours}h</p>
              <p className="text-sm text-purple-600 font-medium">This month</p>
            </div>
          </div>
        </div>

        {/* Last Active */}
        <div className="bg-gradient-to-br from-white to-cyan-50 rounded-2xl p-6 border border-cyan-100 shadow-lg">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl shadow-lg">
              <Zap className="h-8 w-8 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Last Activity</p>
              <p className="text-xl font-bold text-gray-800 truncate">{progressData.lastActive}</p>
              <p className="text-sm text-cyan-600 font-medium">Continue learning →</p>
            </div>
          </div>
        </div>
      </div>

      {/* Subject Mastery & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Subject Mastery */}
        <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl">
              <Target className="h-5 w-5 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-800">Subject Mastery</h3>
          </div>
          <div className="space-y-5">
            {Object.entries(progressData.subjects).map(([subject, data]) => (
              <div key={subject} className="group">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-700">{subject}</span>
                  <span className="text-sm font-bold text-gray-800">{data.progress}%</span>
                </div>
                <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${data.color} rounded-full transition-all duration-500 group-hover:shadow-lg`}
                    style={{ width: `${data.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl">
              <Clock className="h-5 w-5 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-800">Recent Activity</h3>
          </div>
          <div className="space-y-4">
            {progressData.recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                <div className={`p-3 rounded-xl ${
                  activity.type === 'course' ? 'bg-indigo-100 text-indigo-600' :
                  activity.type === 'quiz' ? 'bg-green-100 text-green-600' :
                  activity.type === 'exercise' ? 'bg-emerald-100 text-emerald-600' :
                  'bg-amber-100 text-amber-600'
                }`}>
                  <activity.icon className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-800">{activity.title}</p>
                  <p className="text-sm text-gray-500 truncate">{activity.subtitle}</p>
                </div>
                <span className="text-xs text-gray-400 whitespace-nowrap">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quiz Performance Table */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
              <Trophy className="h-5 w-5 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-800">Quiz Performance</h3>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-gray-50 to-gray-100">
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Quiz</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Subject</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Score</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {progressData.quizScores.map((quiz, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <span className="font-semibold text-gray-800">{quiz.name}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">{quiz.subject}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-gray-800">{quiz.score}%</span>
                      <div className="w-20 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            quiz.score >= 80
                              ? "bg-gradient-to-r from-green-500 to-emerald-500"
                              : quiz.score >= 60
                              ? "bg-gradient-to-r from-amber-500 to-orange-500"
                              : "bg-gradient-to-r from-red-500 to-pink-500"
                          }`}
                          style={{ width: `${quiz.score}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="h-4 w-4" />
                      {quiz.date}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 text-xs font-bold rounded-full ${
                        quiz.score >= 80
                          ? "bg-green-100 text-green-700"
                          : quiz.score >= 60
                          ? "bg-amber-100 text-amber-700"
                          : "bg-red-100 text-red-700"
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

     

    </div>
  );
}

export default ProgressTracker;