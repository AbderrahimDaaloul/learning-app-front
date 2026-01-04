import React, { useState } from "react";
import { 
  BookOpen, 
  FileText, 
  Video, 
  Download,
  Edit2, 
  Trash2, 
  Eye,
  Plus,
  Search,
  Filter,
  Upload,
  Clock,
  Users,
  Star,
  ChevronDown,
  ChevronRight,
  Layers,
  Award,
  LayoutDashboard,
  Shield,
  Menu,
  X,
  Bell,
  ChevronRight as ChevronRightIcon,
  LogOut,
  TrendingUp,
  BarChart3,
  Calendar,
  CheckCircle,
  PlayCircle
} from "lucide-react";
import CourseModal from "../components/CourseModal";
import ExerciseModal from "../components/ExercicesModal";
import ExamModal from "../components/ExamsModal";
import ChapterModal from "../components/ChapterModal";
import Admins from "../components/Admins";
import DataVisualization from "../components/DataVisualization";
import RenderExamsTab from "../components/RenderExamsTab";


const AdminDashboard = () => {
  const [courses, setCourses] = useState([
    {
      id: 1,
      title: "Computer Science Fundamentals",
      description: "Master algorithms, data structures, and programming concepts from beginner to advanced level.",
      duration: "12 weeks",
      chapters: [
        {
          id: 1,
          title: "Introduction to Algorithms",
          description: "Learn basic algorithmic thinking and problem-solving approaches",
          order: 1,
          duration: "2 hours",
          pdfUrl: "algorithms-intro.pdf",
          videoUrl: "algorithms-intro.mp4",
          exercises: [
            {
              id: 1,
              title: "Algorithm Analysis Exercise",
              description: "Practice analyzing algorithm complexity",
              exercisePdf: "algo-analysis-exercise.pdf",
              solutionPdf: "algo-analysis-solution.pdf",
              exerciseVideo: "algo-analysis-video.mp4",
              difficulty: "Medium",
              order: 1
            }
          ]
        },
        {
          id: 2,
          title: "Data Structures",
          description: "Understanding arrays, linked lists, stacks, and queues",
          order: 2,
          duration: "3 hours",
          pdfUrl: "data-structures.pdf",
          videoUrl: "linked-lists.mp4",
          exercises: []
        }
      ]
    }
  ]);

  // Separate state for past exams (no longer part of courses)
  const [pastExams, setPastExams] = useState([]);

  const [activeTab, setActiveTab] = useState("courses");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showCourseModal, setShowCourseModal] = useState(false);
  const [showChapterModal, setShowChapterModal] = useState(false);
  const [showExerciseModal, setShowExerciseModal] = useState(false);
  const [showExamModal, setShowExamModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [editingChapter, setEditingChapter] = useState(null);
  const [editingExercise, setEditingExercise] = useState(null);
  const [editingExam, setEditingExam] = useState(null);
  const [currentCourseId, setCurrentCourseId] = useState(null);
  const [currentChapterId, setCurrentChapterId] = useState(null);
  const [expandedCourse, setExpandedCourse] = useState(null);
  const [expandedChapter, setExpandedChapter] = useState({});

  // Exercises Tab States
  const [exercisesSearchTerm, setExercisesSearchTerm] = useState("");

  const tabs = [
    { id: "courses", label: "Courses", icon: BookOpen, color: "from-amber-500 to-orange-500" },
    { id: "admins", label: "Admins", icon: Shield, color: "from-indigo-500 to-purple-500" },
    { id: "exams", label: "Past Exams", icon: Award, color: "from-purple-500 to-pink-500" },
    { id: "visualization", label: "Analytics", icon: BarChart3, color: "from-blue-500 to-cyan-500" },
  ];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const stats = {
    totalCourses: courses.length,
    totalChapters: courses.reduce((acc, course) => acc + course.chapters.length, 0),
    totalVideos: courses.reduce((acc, course) => acc + course.chapters.filter(ch => ch.videoUrl).length, 0),
    totalPDFs: courses.reduce((acc, course) => acc + course.chapters.filter(ch => ch.pdfUrl).length, 0),
/*  */
    totalExams: pastExams.length,
  };

  // ============ HANDLERS ============
  const handleDeleteCourse = (courseId) => {
    if (window.confirm("Are you sure you want to delete this course and all its chapters?")) {
      setCourses(courses.filter(course => course.id !== courseId));
    }
  };

  const handleDeleteChapter = (courseId, chapterId) => {
    if (window.confirm("Are you sure you want to delete this chapter and all its exercises?")) {
      setCourses(courses.map(course => {
        if (course.id === courseId) {
          return {
            ...course,
            chapters: course.chapters.filter(chapter => chapter.id !== chapterId)
          };
        }
        return course;
      }));
    }
  };

  const handleDeleteExercise = (courseId, chapterId, exerciseId) => {
    if (window.confirm("Are you sure you want to delete this exercise?")) {
      setCourses(courses.map(course => {
        if (course.id === courseId) {
          return {
            ...course,
            chapters: course.chapters.map(chapter => {
              if (chapter.id === chapterId) {
                return {
                  ...chapter,
                  exercises: chapter.exercises.filter(exercise => exercise.id !== exerciseId)
                };
              }
              return chapter;
            })
          };
        }
        return course;
      }));
    }
  };

  const handleDeleteExam = (examId) => {
    if (window.confirm("Are you sure you want to delete this exam?")) {
      setPastExams(pastExams.filter(exam => exam.id !== examId));
    }
  };

  const handleUpdateChapterFile = (courseId, chapterId, field, fileName) => {
    setCourses(courses.map(course => {
      if (course.id === courseId) {
        return {
          ...course,
          chapters: course.chapters.map(chapter => 
            chapter.id === chapterId ? { ...chapter, [field]: fileName } : chapter
          )
        };
      }
      return course;
    }));
  };

  const handleCourseSubmit = (newCourse) => {
    if (editingCourse) {
      setCourses(courses.map(c => c.id === editingCourse.id ? { ...newCourse, id: editingCourse.id } : c));
    } else {
      setCourses([...courses, { ...newCourse, id: Date.now(), chapters: [] }]);
    }
    setShowCourseModal(false);
    setEditingCourse(null);
  };

  const handleChapterSubmit = (newChapter, courseId) => {
    setCourses(courses.map(course => {
      if (course.id === courseId) {
        const updatedChapters = editingChapter 
          ? course.chapters.map(ch => ch.id === editingChapter.id ? { ...newChapter, id: editingChapter.id } : ch)
          : [...course.chapters, { ...newChapter, id: Date.now(), exercises: [] }];
        return { ...course, chapters: updatedChapters };
      }
      return course;
    }));
    setShowChapterModal(false);
    setEditingChapter(null);
    setCurrentCourseId(null);
  };

const handleExerciseSubmit = (newExercise, courseId, chapterId) => {
  if (!courseId || !chapterId) {
    console.error("Missing courseId or chapterId");
    return;
  }

  setCourses(courses.map(course => {
    if (course.id === courseId) {
      return {
        ...course,
        chapters: course.chapters.map(chapter => {
          if (chapter.id === chapterId) {
            const updatedExercises = editingExercise 
              ? chapter.exercises.map(ex => ex.id === editingExercise.id ? { ...newExercise, id: editingExercise.id } : ex)
              : [...chapter.exercises, { ...newExercise, id: Date.now() }];
            return { ...chapter, exercises: updatedExercises };
          }
          return chapter;
        })
      };
    }
    return course;
  }));
  
  setShowExerciseModal(false);
  setEditingExercise(null);
  setCurrentCourseId(null);
  setCurrentChapterId(null);
};
  const handleExamSubmit = (newExam) => {
    if (editingExam) {
      setPastExams(pastExams.map(ex => ex.id === editingExam.id ? { ...newExam, id: editingExam.id } : ex));
    } else {
      setPastExams([...pastExams, { ...newExam, id: Date.now() }]);
    }
    setShowExamModal(false);
    setEditingExam(null);
  };

  // ============ CHAPTER FILE UPLOAD COMPONENT ============
  const ChapterFileUpload = ({ courseId, chapterId, currentFile, field, type }) => {
    const [isUploading, setIsUploading] = useState(false);

    const handleFileUpload = async (e) => {
      const file = e.target.files[0];
      if (!file) return;

      setIsUploading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1500));
        const uploadedName = `${file.name.split('.')[0]}-${Date.now()}.${file.name.split('.')[1]}`;
        handleUpdateChapterFile(courseId, chapterId, field, uploadedName);
      } finally {
        setIsUploading(false);
      }
    };

    const handleDeleteFile = () => {
      if (window.confirm(`Are you sure you want to delete this ${type}?`)) {
        handleUpdateChapterFile(courseId, chapterId, field, null);
      }
    };

    return (
      <div className="flex items-center gap-3 px-3 py-2 bg-gray-50 rounded-lg border border-gray-200">
        {currentFile ? (
          <>
            <div className="flex items-center gap-2 flex-1">
              {type === 'PDF' ? (
                <FileText className="h-4 w-4 text-red-500" />
              ) : (
                <Video className="h-4 w-4 text-blue-500" />
              )}
              <span className="text-sm text-gray-700 truncate">{currentFile}</span>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => window.open(`/uploads/${currentFile}`, '_blank')}
                className="p-1 hover:bg-gray-200 rounded"
                title="View"
              >
                <Eye className="h-3 w-3 text-gray-500" />
              </button>
              <button
                onClick={handleDeleteFile}
                className="p-1 hover:bg-red-100 rounded"
                title="Delete"
              >
                <Trash2 className="h-3 w-3 text-red-500" />
              </button>
            </div>
          </>
        ) : (
          <label className={`flex items-center gap-2 cursor-pointer ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}>
            {isUploading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-indigo-600"></div>
                <span className="text-sm text-gray-600">Uploading...</span>
              </>
            ) : (
              <>
                <Upload className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-600">Upload {type}</span>
              </>
            )}
            <input
              type="file"
              accept={type === 'PDF' ? '.pdf' : 'video/*'}
              onChange={handleFileUpload}
              className="hidden"
              disabled={isUploading}
            />
          </label>
        )}
      </div>
    );
  };

  // ============ RENDER COURSES TAB ============
  const renderCoursesTab = () => (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-lg">
              <BookOpen className="h-7 w-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-700 to-purple-700 bg-clip-text text-transparent">
                Course Management
              </h1>
              <p className="text-gray-600">Manage courses and their chapters with materials</p>
            </div>
          </div>
          
          <button
            onClick={() => {
              setEditingCourse(null);
              setShowCourseModal(true);
            }}
            className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-5 py-2.5 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
          >
            <Plus className="h-5 w-5" />
            <span className="font-semibold">New Course</span>
          </button>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap gap-6 mb-8">
          <div className="flex-1 min-w-[200px] bg-white rounded-2xl p-6 shadow-lg border border-indigo-100">
            <div className="flex items-center">
              <div className="p-3 bg-indigo-50 rounded-xl mr-4">
                <BookOpen className="h-6 w-6 text-indigo-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm font-medium">Total Courses</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">{stats.totalCourses}</p>
              </div>
            </div>
          </div>

          <div className="flex-1 min-w-[200px] bg-white rounded-2xl p-6 shadow-lg border border-green-100">
            <div className="flex items-center">
              <div className="p-3 bg-green-50 rounded-xl mr-4">
                <Layers className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm font-medium">Total Chapters</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">{stats.totalChapters}</p>
              </div>
            </div>
          </div>

          <div className="flex-1 min-w-[200px] bg-white rounded-2xl p-6 shadow-lg border border-blue-100">
            <div className="flex items-center">
              <div className="p-3 bg-blue-50 rounded-xl mr-4">
                <Video className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm font-medium">Total Videos</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">{stats.totalVideos}</p>
              </div>
            </div>
          </div>

          <div className="flex-1 min-w-[200px] bg-white rounded-2xl p-6 shadow-lg border border-red-100">
            <div className="flex items-center">
              <div className="p-3 bg-red-50 rounded-xl mr-4">
                <FileText className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm font-medium">Total PDFs</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">{stats.totalPDFs}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-100">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:outline-none transition-all"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Courses List */}
        <div className="space-y-6">
          {filteredCourses.map((course) => (
            <div key={course.id} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
              {/* Course Header */}
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-3 py-1 text-sm font-medium bg-gray-100 text-gray-700 rounded-full">
                        {course.duration}
                      </span>
                    </div>
                    
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">{course.title}</h3>
                        <p className="text-gray-600 mb-4">{course.description}</p>
                        
                        <div className="flex items-center gap-6">
                          <div className="flex items-center gap-2 text-gray-500">
                            <Layers className="h-4 w-4" />
                            <span className="text-sm">{course.chapters.length} chapters</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-500">
                            <FileText className="h-4 w-4" />
                            <span className="text-sm">
                              {course.chapters.reduce((acc, chapter) => acc + chapter.exercises.length, 0)} exercises
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 ml-4">
                        <button
                          onClick={() => setExpandedCourse(expandedCourse === course.id ? null : course.id)}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          {expandedCourse === course.id ? (
                            <ChevronDown className="h-5 w-5 text-gray-600" />
                          ) : (
                            <ChevronRight className="h-5 w-5 text-gray-600" />
                          )}
                        </button>
                        <button 
                          onClick={() => {
                            setEditingCourse(course);
                            setShowCourseModal(true);
                          }}
                          className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors"
                        >
                          <Edit2 className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteCourse(course.id)}
                          className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Expanded Content - Chapters */}
              {expandedCourse === course.id && (
                <div className="border-t border-gray-100 p-6 bg-gray-50">
                  <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-semibold text-gray-800">
                        Chapters ({course.chapters.length})
                      </h4>
                      <button
                        onClick={() => {
                          setCurrentCourseId(course.id);
                          setEditingChapter(null);
                          setShowChapterModal(true);
                        }}
                        className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                      >
                        <Plus className="h-4 w-4" />
                        <span>Add Chapter</span>
                      </button>
                    </div>
                    
                    <div className="space-y-6">
                      {course.chapters.sort((a, b) => a.order - b.order).map((chapter) => (
                        <div key={chapter.id} className="bg-white rounded-xl p-4 border border-gray-200">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-3">
                                  <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded">
                                    Chapter {chapter.order}
                                  </span>
                                  <h5 className="font-semibold text-gray-800 text-lg">{chapter.title}</h5>
                                </div>
                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={() => setExpandedChapter(prev => ({
                                      ...prev,
                                      [chapter.id]: !prev[chapter.id]
                                    }))}
                                    className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                                  >
                                    {expandedChapter[chapter.id] ? (
                                      <ChevronDown className="h-4 w-4 text-gray-600" />
                                    ) : (
                                      <ChevronRight className="h-4 w-4 text-gray-600" />
                                    )}
                                  </button>
                                  <button 
                                    onClick={() => {
                                      setCurrentCourseId(course.id);
                                      setEditingChapter(chapter);
                                      setShowChapterModal(true);
                                    }}
                                    className="p-1 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors"
                                  >
                                    <Edit2 className="h-4 w-4" />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteChapter(course.id, chapter.id)}
                                    className="p-1 hover:bg-red-50 text-red-600 rounded-lg transition-colors"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </button>
                                </div>
                              </div>
                              <p className="text-gray-600 text-sm mb-3">{chapter.description}</p>
                              
                              <div className="flex items-center gap-4 mb-4">
                                <div className="flex items-center gap-2 text-gray-500">
                                  <Clock className="h-4 w-4" />
                                  <span className="text-sm">{chapter.duration}</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-500">
                                  <FileText className="h-4 w-4" />
                                  <span className="text-sm">{chapter.exercises.length} exercises</span>
                                </div>
                              </div>

                              {/* Chapter Files Section */}
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Chapter PDF
                                  </label>
                                  <ChapterFileUpload
                                    courseId={course.id}
                                    chapterId={chapter.id}
                                    currentFile={chapter.pdfUrl}
                                    field="pdfUrl"
                                    type="PDF"
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Chapter Video
                                  </label>
                                  <ChapterFileUpload
                                    courseId={course.id}
                                    chapterId={chapter.id}
                                    currentFile={chapter.videoUrl}
                                    field="videoUrl"
                                    type="Video"
                                  />
                                </div>
                              </div>

                              {/* Exercises Section - Expanded */}
                              {expandedChapter[chapter.id] && (
                                <div className="mt-6 pt-6 border-t border-gray-200">
                                  <div className="flex items-center justify-between mb-4">
                                    <h6 className="font-medium text-gray-700">
                                      Exercises ({chapter.exercises.length})
                                    </h6>
                                    <button
                                      onClick={() => {
                                        setCurrentCourseId(course.id);
                                        setCurrentChapterId(chapter.id);
                                        setEditingExercise(null);
                                        setShowExerciseModal(true);
                                      }}
                                      className="flex items-center gap-1 text-sm bg-green-600 text-white px-3 py-1.5 rounded-lg hover:bg-green-700 transition-colors"
                                    >
                                      <Plus className="h-3 w-3" />
                                      <span>Add Exercise</span>
                                    </button>
                                  </div>

                                  <div className="space-y-3">
                                    {chapter.exercises.length > 0 ? (
                                      chapter.exercises.sort((a, b) => a.order - b.order).map((exercise) => (
                                        <div key={exercise.id} className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                                          <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                              <div className="flex items-center gap-2 mb-1">
                                                <span className="text-sm font-medium text-gray-700">
                                                  {exercise.title}
                                                </span>
                                                <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                                                  exercise.difficulty === 'Easy' 
                                                    ? 'bg-green-100 text-green-700'
                                                    : exercise.difficulty === 'Medium'
                                                    ? 'bg-yellow-100 text-yellow-700'
                                                    : 'bg-red-100 text-red-700'
                                                }`}>
                                                  {exercise.difficulty}
                                                </span>
                                              </div>
                                              <p className="text-xs text-gray-600 mb-2">{exercise.description}</p>
                                              
                                              {/* Exercise Files */}
                                              <div className="flex flex-wrap gap-2">
                                                {exercise.exercisePdf && (
                                                  <div className="flex items-center gap-1 px-2 py-1 bg-white rounded border border-gray-200">
                                                    <FileText className="h-3 w-3 text-red-500" />
                                                    <span className="text-xs text-gray-700">Exercise PDF</span>
                                                    <button
                                                      onClick={() => window.open(`/uploads/${exercise.exercisePdf}`, '_blank')}
                                                      className="p-0.5 hover:bg-gray-100 rounded"
                                                    >
                                                      <Eye className="h-2.5 w-2.5 text-gray-500" />
                                                    </button>
                                                  </div>
                                                )}
                                                {exercise.solutionPdf && (
                                                  <div className="flex items-center gap-1 px-2 py-1 bg-white rounded border border-gray-200">
                                                    <FileText className="h-3 w-3 text-green-500" />
                                                    <span className="text-xs text-gray-700">Solution PDF</span>
                                                    <button
                                                      onClick={() => window.open(`/uploads/${exercise.solutionPdf}`, '_blank')}
                                                      className="p-0.5 hover:bg-gray-100 rounded"
                                                    >
                                                      <Eye className="h-2.5 w-2.5 text-gray-500" />
                                                    </button>
                                                  </div>
                                                )}
                                                {exercise.exerciseVideo && (
                                                  <div className="flex items-center gap-1 px-2 py-1 bg-white rounded border border-gray-200">
                                                    <Video className="h-3 w-3 text-blue-500" />
                                                    <span className="text-xs text-gray-700">Video</span>
                                                    <button
                                                      onClick={() => window.open(`/uploads/${exercise.exerciseVideo}`, '_blank')}
                                                      className="p-0.5 hover:bg-gray-100 rounded"
                                                    >
                                                      <Eye className="h-2.5 w-2.5 text-gray-500" />
                                                    </button>
                                                  </div>
                                                )}
                                              </div>
                                            </div>
                                            <div className="flex items-center gap-1 ml-2">
                                              <button 
                                                onClick={() => {
                                                  setCurrentCourseId(course.id);
                                                  setCurrentChapterId(chapter.id);
                                                  setEditingExercise(exercise);
                                                  setShowExerciseModal(true);
                                                }}
                                                className="p-1 hover:bg-blue-50 text-blue-600 rounded"
                                              >
                                                <Edit2 className="h-3 w-3" />
                                              </button>
                                              <button
                                                onClick={() => handleDeleteExercise(course.id, chapter.id, exercise.id)}
                                                className="p-1 hover:bg-red-50 text-red-600 rounded"
                                              >
                                                <Trash2 className="h-3 w-3" />
                                              </button>
                                            </div>
                                          </div>
                                        </div>
                                      ))
                                    ) : (
                                      <div className="text-center py-4 text-gray-500">
                                        <FileText className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                                        <p className="text-sm">No exercises added yet</p>
                                        <button
                                          onClick={() => {
                                            setCurrentCourseId(course.id);
                                            setCurrentChapterId(chapter.id);
                                            setEditingExercise(null);
                                            setShowExerciseModal(true);
                                          }}
                                          className="text-green-600 hover:text-green-700 text-sm mt-1"
                                        >
                                          Add first exercise
                                        </button>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Empty State */}
          {filteredCourses.length === 0 && (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
              <div className="mx-auto w-24 h-24 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full flex items-center justify-center mb-6">
                <BookOpen className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-700 mb-2">No courses found</h3>
              <p className="text-gray-500 mb-6 max-w-md mx-auto">
                Try adjusting your search criteria or create a new course to get started
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                }}
                className="text-indigo-600 hover:text-indigo-700 font-medium text-lg"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>

        {/* Modals */}
        <CourseModal 
          isOpen={showCourseModal} 
          onClose={() => {
            setShowCourseModal(false);
            setEditingCourse(null);
          }}
          editingCourse={editingCourse}
          onSubmit={handleCourseSubmit}
        />

        <ChapterModal 
          isOpen={showChapterModal}
          onClose={() => {
            setShowChapterModal(false);
            setEditingChapter(null);
            setCurrentCourseId(null);
          }}
          editingChapter={editingChapter}
          courseId={currentCourseId}
          onSubmit={handleChapterSubmit}
        />

    <ExerciseModal 
  isOpen={showExerciseModal}
  onClose={() => {
    setShowExerciseModal(false);
    setEditingExercise(null);
    setCurrentCourseId(null);
    setCurrentChapterId(null);
  }}
  editingExercise={editingExercise}
  courseId={currentCourseId}
  chapterId={currentChapterId}
  onSubmit={handleExerciseSubmit}
/>

        <ExamModal 
          isOpen={showExamModal}
          onClose={() => {
            setShowExamModal(false);
            setEditingExam(null);
          }}
          editingExam={editingExam}
          onSubmit={handleExamSubmit}
        />
      </div>
    </div>
  );

  
 


return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50/30">
  

      <div className="flex">
        {/* Sidebar */}
        <div className={`fixed md:relative z-30 h-screen md:h-auto w-64 bg-gradient-to-b from-white via-white to-gray-50/50 border-r border-gray-200/50 backdrop-blur-sm transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
          <div className="p-6">
            

            <nav className="space-y-2">
              {tabs.map((tabItem) => (
                <button
                  key={tabItem.id}
                  onClick={() => {
                    setActiveTab(tabItem.id);
                    setSidebarOpen(false);
                  }}
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
                  <span className="font-medium">{tabItem.label}</span>
                  {activeTab === tabItem.id && (
                    <div className="ml-auto">
                      <ChevronRightIcon className="h-4 w-4" />
                    </div>
                  )}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 md:p-6 lg:p-8">
          <div className="animate-slideUp">
            {activeTab === "courses" && renderCoursesTab()}
            {activeTab === "admins" && <Admins />}
            {activeTab === "exams" && (
              <RenderExamsTab 
                pastExams={pastExams}
                setPastExams={setPastExams}
                showExamModal={showExamModal}
                setShowExamModal={setShowExamModal}
                editingExam={editingExam}
                setEditingExam={setEditingExam}
              />
            )}
            {activeTab === "visualization" && <DataVisualization />}
          </div>
        </div>
      </div>

     
    </div>
  );
};

export default AdminDashboard;
