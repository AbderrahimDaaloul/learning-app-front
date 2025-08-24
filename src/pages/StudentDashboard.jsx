import { useState } from "react";
import React from "react";
import CourseViewer from "../components/CourseViewer";
import ExerciseViewer from "../components/ExerciseViewer";
import PastExamsViewer from "../components/PastExamsViewer";
import ProgressTracker from "../components/ProgressTracker";
import Chatbot from "../components/Chatbot";
// import DocumentChatPanel from "../components/DocumentChatPanel";

export default function StudentDashboard() {
  const [activeTab, setActiveTab] = useState("courses");

  // Sample courses data
  const courses = [
    {
      subjects: ["Computer Science", "Mathematics", "Physics"],
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
            // More chapters...
          ],
          finalExam: {
            pdf: "/exams/cs-101-final.pdf",
            solutions: {
              pdf: "/solutions/cs-101-final-solution.pdf",
              videoSeries: [
                {
                  part: 1,
                  title: "Problem 1-5",
                  url: "https://vimeo.com/cs-101-final-part1",
                },
                // More parts...
              ],
            },
          },
          relatedPastExams: [
            {
              year: 2023,
              session: "Normal",
              pdf: "/past-exams/cs-2023-normal.pdf",
              correction: "/past-exams/corrections/cs-2023-normal-sol.pdf",
            },
          ],
        },
        // More courses...
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
        // More past exams...
      ],
    },
  ]; // Your existing courses data

  

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-63 bg-white border-r border-gray-200 p-4">
        <div className="mb-8">
          <h1 className="text-xl font-bold text-indigo-700">BacPrep</h1>
          <p className="text-sm text-gray-500">Welcome back, Student!</p>
        </div>
        <nav>
          <button
            onClick={() => setActiveTab("courses")}
            className={`w-full text-left p-2 rounded-md mb-2 ${
              activeTab === "courses"
                ? "bg-indigo-100 text-indigo-700"
                : "hover:bg-gray-100"
            }`}
          >
            📚 My Courses
          </button>
          <button
            onClick={() => setActiveTab("exercises")}
            className={`w-full text-left p-2 rounded-md mb-2 ${
              activeTab === "exercises"
                ? "bg-indigo-100 text-indigo-700"
                : "hover:bg-gray-100"
            }`}
          >
            ✍️ Exercises
          </button>
          <button
            onClick={() => setActiveTab("past-exams")}
            className={`w-full text-left p-2 rounded-md mb-2 ${
              activeTab === "past-exams"
                ? "bg-indigo-100 text-indigo-700"
                : "hover:bg-gray-100"
            }`}
          >
            🏛 Past Exams
          </button>
          <button
            onClick={() => setActiveTab("progress")}
            className={`w-full text-left p-2 rounded-md mb-2 ${
              activeTab === "progress"
                ? "bg-indigo-100 text-indigo-700"
                : "hover:bg-gray-100"
            }`}
          >
            📊 My Progress
          </button>
          <button
            onClick={() => setActiveTab("ai-chat")}
            className={`w-full text-left p-2 rounded-md mb-2 ${
              activeTab === "ai-chat"
                ? "bg-indigo-100 text-indigo-700"
                : "hover:bg-gray-100"
            }`}
          >
            🤖 AI Chatbot
          </button>
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden ">
        <div className="w-full p-6 overflow-auto">
          {activeTab === "courses" && <CourseViewer courses={courses} />}
          {activeTab === "exercises" && <ExerciseViewer />}
          {activeTab === "past-exams" && <PastExamsViewer />}
          {activeTab === "progress" && <ProgressTracker />}
          {activeTab === "ai-chat" && <Chatbot />}
        </div>
      </div>

     
    </div>
  );
}
