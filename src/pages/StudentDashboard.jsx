import { useState } from "react";
import React from "react";
import CourseViewer from "../components/CourseViewer";
import ExerciseViewer from "../components/ExerciseViewer";
import PastExamsViewer from "../components/PastExamsViewer";
import ProgressTracker from "../components/ProgressTracker";
import { 
  BookOpen, 
  FileText, 
  Award, 
  BarChart3,
  ChevronRight,
  Book,
  PenTool,
  TrendingUp,
  CheckCircle,
  Clock,
  User,
  Settings
} from "lucide-react";

export default function StudentDashboard() {
  const [activeTab, setActiveTab] = useState("courses");

  const tabs = [
    { 
      id: "courses", 
      label: "My Courses", 
      icon: BookOpen, 
      color: " from-indigo-700 to-purple-700 ",
      description: "Access your courses"
    },
    { 
      id: "exercises", 
      label: "Exercises", 
      icon: FileText, 
      color: "from-green-500 to-emerald-500",
      description: "Practice exercises"
    },
    { 
      id: "past-exams", 
      label: "Past Exams", 
      icon: Award, 
      color: "from-amber-500 to-orange-500",
      description: "Previous exam papers"
    },
    { 
      id: "progress", 
      label: "My Progress", 
      icon: BarChart3, 
      color: "from-blue-500 to-cyan-500",
      description: "Track your learning"
    },
  ];

 

  // Sample courses data
  const data = [
    {
      courses: [
        {
          id: "cs-101",
          title: "Computer Science Fundamentals",
          subject: "Computer Science",
          description:
            "Covers basic algorithms, data structures, and programming concepts",
          thumbnail: "/thumbnails/cs-fundamentals.jpg",
          level: "Beginner",
          duration: "15 hours",
          chapters: [
            {
              id: "cs-101-ch1",
              title: "Introduction to Algorithms",
              order: 1,
              duration: "2 hours",
              resources: {
                pdf: {
                  url: "/courses/cs-101/ch1-course.pdf",
                  pages: 24,
                  download: true,
                },
                video: {
                  url: "https://youtu.be/YMdeOS-taQQ?list=RDMMbyfiQA8HRaE",
                  duration: "45:22",
                  thumbnail: "/thumbnails/cs-101-ch1-video.jpg",
                },
              },
              exercises: [
                {
                  id: "cs-101-ch1-ex1",
                  title: "Algorithm Complexity",
                  problemPdf: "/exercises/cs-101/ch1-ex1.pdf",
                  solutions: {
                    pdf: "/solutions/cs-101/ch1-ex1-solution.pdf",
                    video: {
                      url: "https://vimeo.com/cs-101-ch1-ex1-sol",
                      duration: "12:30",
                    },
                  },
                  difficulty: "Medium",
                  estimatedTime: "30 min",
                  skillsTested: ["Big-O notation", "Time complexity analysis"],
                },
              ],
              quiz: {
                id: "cs-101-ch1-quiz",
                questions: 10,
                passingScore: 70,
                retakeable: true,
              },
            },
          ],
          
          
        },
      ],
      pastExams: [
        {
          id: "cs-2023-normal",
          subject: "Computer Science",
          year: 2023,
          session: "Normal",
          duration: "4 hours",
          pdfUrl: "/past-exams/cs-2023-normal.pdf",
          corrections: {
            pdf: "/past-exams/corrections/cs-2023-normal-sol.pdf",
            videoPlaylist: "https://youtube.com/playlist?list=cs2023normal",
          },
          topicsCovered: ["Algorithms", "Database Systems", "Networking"],
          difficultyRating: 4.2, // 1-5 scale
        },
      ],
    },
  ]; 

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 to-indigo-50/30">
      {/* Enhanced Sidebar */}
      <div className={`flex flex-col transition-all duration-300  w-64 bg-gradient-to-b from-white via-white to-gray-50/50 border-r border-gray-200/50 backdrop-blur-sm`}>
       
       

        {/* Navigation Tabs */}
        <div className={`flex-1 p-4 `}>
          <nav className="space-y-2">
            {tabs.map((tabItem) => (
              <button
                key={tabItem.id}
                onClick={() => setActiveTab(tabItem.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
                  activeTab === tabItem.id
                    ? `bg-gradient-to-r ${tabItem.color} text-white shadow-lg transform scale-[1.02]`
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <div className={`p-2 rounded-lg ${
                  activeTab === tabItem.id
                    ? "bg-white/20"
                    : "bg-gray-100 group-hover:bg-gray-200"
                }`}>
                  <tabItem.icon className="h-5 w-5" />
                </div>
               
                  <>
                    <div className="flex-1 text-left">
                      <span className="font-medium">{tabItem.label}</span>
                      <p className="text-xs opacity-75 mt-0.5">{tabItem.description}</p>
                    </div>
                    {activeTab === tabItem.id && (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </>
                
              </button>
            ))}
          </nav>
        </div>

     
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        <div className="w-full p-6 overflow-auto">
          <div className="animate-slideUp">
            {activeTab === "courses" && <CourseViewer courses={data} />}
            {activeTab === "exercises" && <ExerciseViewer />}
            {activeTab === "past-exams" && <PastExamsViewer />}
            {activeTab === "progress" && <ProgressTracker />}
          </div>
        </div>
      </div>
    </div>
  );
}