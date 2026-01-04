import React, { useState } from "react";
import { 
  Users, 
  UserPlus, 
  Search, 
  Filter,
  GraduationCap,
  BookOpen,
  Calendar,
  Mail,
  Phone,
  MapPin,
  Edit2,
  Trash2,
  Eye,
  MoreVertical,
  ChevronRight,
  CheckCircle,
  XCircle,
  Download,
  Upload,
  Shield
} from "lucide-react";

const Students = () => {
  const initialStudents = [
    { 
      id: 1, 
      name: "Alex Johnson", 
      email: "alex.j@email.com", 
      phone: "+1 (555) 123-4567",
      course: "Computer Science",
      enrollmentDate: "2024-01-15",
      status: "active",
      progress: 85,
      avatarColor: "bg-gradient-to-r from-blue-500 to-cyan-500"
    },
    { 
      id: 2, 
      name: "Sarah Williams", 
      email: "sarah.w@email.com", 
      phone: "+1 (555) 987-6543",
      course: "Data Science",
      enrollmentDate: "2024-02-20",
      status: "active",
      progress: 72,
      avatarColor: "bg-gradient-to-r from-purple-500 to-pink-500"
    },
    { 
      id: 3, 
      name: "Michael Chen", 
      email: "michael.c@email.com", 
      phone: "+1 (555) 456-7890",
      course: "Web Development",
      enrollmentDate: "2023-11-05",
      status: "inactive",
      progress: 45,
      avatarColor: "bg-gradient-to-r from-green-500 to-emerald-500"
    },
    { 
      id: 4, 
      name: "Emma Davis", 
      email: "emma.d@email.com", 
      phone: "+1 (555) 321-6549",
      course: "UI/UX Design",
      enrollmentDate: "2024-03-10",
      status: "active",
      progress: 93,
      avatarColor: "bg-gradient-to-r from-orange-500 to-red-500"
    },
  ];

  const [students, setStudents] = useState(initialStudents);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'

  const courses = ["all", "Computer Science", "Data Science", "Web Development", "UI/UX Design"];

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.course.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCourse = selectedCourse === "all" || student.course === selectedCourse;
    return matchesSearch && matchesCourse ;
  });

  const stats = {
    total: students.length,
    averageProgress: Math.round(students.reduce((acc, s) => acc + s.progress, 0) / students.length),
    recent: students.filter(s => new Date(s.enrollmentDate) > new Date('2024-01-01')).length,
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      setStudents(students.filter(student => student.id !== id));
    }
  };

  

  const exportStudents = () => {
    const data = JSON.stringify(students, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'students-data.json';
    a.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl shadow-lg">
                <GraduationCap className="h-7 w-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-700 to-cyan-700 bg-clip-text text-transparent">
                  Student Management
                </h1>
                <p className="text-gray-600">Manage student records, progress, and enrollment</p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3">
           
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-5 py-2.5 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
            >
              <UserPlus className="h-5 w-5" />
              <span className="font-semibold">Add Student</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="flex justify-around gap-6  mb-6">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-blue-100 w-[25%]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Total Students</p>
                <p className="text-3xl font-bold text-gray-800 mt-2">{stats.total}</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-xl">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4 text-sm text-gray-600">
              <span className="text-green-600 font-medium">+12%</span> from last month
            </div>
          </div>

        

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-purple-100 w-[25%]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Avg. Progress</p>
                <p className="text-3xl font-bold text-gray-800 mt-2">{stats.averageProgress}%</p>
              </div>
              <div className="p-3 bg-purple-50 rounded-xl">
                <BookOpen className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" 
                     style={{ width: `${stats.averageProgress}%` }}></div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-orange-100 w-[25%]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">New This Year</p>
                <p className="text-3xl font-bold text-gray-800 mt-2">{stats.recent}</p>
              </div>
              <div className="p-3 bg-orange-50 rounded-xl">
                <Calendar className="h-6 w-6 text-orange-600" />
              </div>
            </div>
            <div className="mt-4 text-sm text-gray-600">
              Enrolled after Jan 2024
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-100">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search */}
            <div className="flex-1 w-full lg:w-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search students by name, email, or course..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none transition-all"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3 w-full lg:w-auto">
              <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl">
                <Filter className="h-5 w-5 text-gray-400" />
                <select
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                  className="bg-transparent focus:outline-none text-gray-700 min-w-[140px]"
                >
                  {courses.map(course => (
                    <option key={course} value={course}>
                      {course === "all" ? "All Courses" : course}
                    </option>
                  ))}
                </select>
              </div>

              {/* View Toggle */}
              <div className="flex bg-gray-100 p-1 rounded-xl">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`px-4 py-2 rounded-lg transition-all ${viewMode === "grid" ? "bg-white shadow-sm" : "text-gray-600"}`}
                >
                  Grid
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`px-4 py-2 rounded-lg transition-all ${viewMode === "list" ? "bg-white shadow-sm" : "text-gray-600"}`}
                >
                  List
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Students Grid/List */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStudents.map((student) => (
              <div key={student.id} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                {/* Student Header */}
                <div className="relative">
                  <div className="h-32 bg-gradient-to-r from-blue-500/20 to-cyan-500/20"></div>
                  <div className="absolute -bottom-8 left-6">
                    <div className={`${student.avatarColor} h-16 w-16 rounded-xl flex items-center justify-center text-white text-xl font-bold shadow-lg border-4 border-white`}>
                      {student.name.split(' ').map(n => n[0]).join('')}
                    </div>
                  </div>
                 
                </div>

                {/* Student Info */}
                <div className="pt-10 px-6 pb-6">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-gray-800">{student.name}</h3>
                    <p className="text-gray-500 text-sm flex items-center gap-1 mt-1">
                      <Mail className="h-4 w-4" />
                      {student.email}
                    </p>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2 text-gray-600">
                      <BookOpen className="h-4 w-4" />
                      <span className="text-sm">{student.course}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Phone className="h-4 w-4" />
                      <span className="text-sm">{student.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="h-4 w-4" />
                      <span className="text-sm">Enrolled: {student.enrollmentDate}</span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-6">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Course Progress</span>
                      <span className="font-semibold text-blue-600">{student.progress}%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full transition-all duration-500"
                        style={{ width: `${student.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-4 border-t border-gray-100">
                    <button className="flex-1 flex items-center justify-center gap-2 bg-blue-50 text-blue-600 hover:bg-blue-100 px-4 py-2.5 rounded-lg transition-colors">
                      <Eye className="h-4 w-4" />
                      View
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-2 bg-gray-50 text-gray-600 hover:bg-gray-100 px-4 py-2.5 rounded-lg transition-colors">
                      <Edit2 className="h-4 w-4" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(student.id)}
                      className="flex-1 flex items-center justify-center gap-2 bg-red-50 text-red-600 hover:bg-red-100 px-4 py-2.5 rounded-lg transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* List View */
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 p-6 bg-gradient-to-r from-blue-50 to-cyan-50 border-b border-gray-200 sticky top-0">
              <div className="col-span-4 font-semibold text-gray-700">Student</div>
              <div className="col-span-2 font-semibold text-gray-700">Course</div>
              <div className="col-span-2 font-semibold text-gray-700">Progress</div>
              <div className="col-span-4 font-semibold text-gray-700 text-right pr-4">Actions</div>
            </div>

            {/* Student Rows */}
            <div className="divide-y divide-gray-100">
              {filteredStudents.map((student) => (
                <div key={student.id} className="grid grid-cols-12 gap-4 p-6 hover:bg-gray-50 transition-colors items-center">
                  {/* Student Info */}
                  <div className="col-span-4 flex items-center gap-4">
                    <div className={`${student.avatarColor} h-12 w-12 rounded-xl flex items-center justify-center text-white font-bold flex-shrink-0`}>
                      {student.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-gray-800 truncate">{student.name}</h3>
                      <p className="text-gray-500 text-sm truncate">{student.email}</p>
                      <p className="text-gray-400 text-xs mt-1 flex items-center gap-1">
                        <Phone className="h-3 w-3 flex-shrink-0" />
                        <span className="truncate">{student.phone}</span>
                      </p>
                    </div>
                  </div>

                  {/* Course */}
                  <div className="col-span-2 flex items-center">
                    <span className="px-3 py-1.5 text-sm font-medium bg-blue-50 text-blue-700 rounded-lg whitespace-nowrap">
                      {student.course}
                    </span>
                  </div>

                  {/* Progress */}
                  <div className="col-span-2 flex items-center">
                    <div className="w-full space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-semibold text-gray-700">{student.progress}%</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full transition-all duration-300"
                          style={{ width: `${student.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="col-span-4 flex items-center justify-end gap-2">
                    <button 
                      className="p-2.5 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors hover:shadow-md"
                      title="View student"
                    >
                      <Eye className="h-5 w-5" />
                    </button>
                    <button 
                      className="p-2.5 hover:bg-gray-100 text-gray-600 rounded-lg transition-colors hover:shadow-md"
                      title="Edit student"
                    >
                      <Edit2 className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(student.id)}
                      className="p-2.5 hover:bg-red-50 text-red-600 rounded-lg transition-colors hover:shadow-md"
                      title="Delete student"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {filteredStudents.length === 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="mx-auto w-24 h-24 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full flex items-center justify-center mb-6">
              <GraduationCap className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">No students found</h3>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
              Try adjusting your search criteria or add new students to get started
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCourse("all");
                setSelectedStatus("all");
              }}
              className="text-blue-600 hover:text-blue-700 font-medium text-lg"
            >
              Clear all filters
            </button>
          </div>
        )}

      {/* {/*   {/* Footer Stats */}
        <div className="mt-8 flex flex-col md:flex-row justify-between items-center text-gray-600 text-sm">
          <p>Showing {filteredStudents.length} of {students.length} students</p>
        
        </div> 

        {/* Add Student Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
            <div className="bg-white rounded-2xl p-8 max-w-2xl w-full shadow-2xl animate-scaleIn">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg">
                    <UserPlus className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">Add New Student</h3>
                </div>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <XCircle className="h-6 w-6 text-gray-400" />
                </button>
              </div>

              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none transition-all"
                      placeholder="Enter student name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none transition-all"
                      placeholder="student@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none transition-all"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Course
                    </label>
                    <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none transition-all">
                      <option value="">Select a course</option>
                      <option value="Computer Science">Computer Science</option>
                      <option value="Data Science">Data Science</option>
                      <option value="Web Development">Web Development</option>
                      <option value="UI/UX Design">UI/UX Design</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Enrollment Date
                    </label>
                    <input
                      type="date"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Initial Progress
                    </label>
                    <div className="relative">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        defaultValue="0"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-2">
                        <span>0%</span>
                        <span>50%</span>
                        <span>100%</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl hover:from-blue-700 hover:to-cyan-700 transition-all font-medium"
                  >
                    Add Student
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes scaleIn {
          from { 
            opacity: 0;
            transform: scale(0.95) translateY(10px);
          }
          to { 
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Students;