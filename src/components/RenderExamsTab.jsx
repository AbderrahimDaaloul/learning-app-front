import React, { useState } from "react";
import {
  Award,
  Plus,
  Search,
  Edit2,
  Trash2,
  Calendar,
  Clock,
  CheckCircle
} from "lucide-react";
import ExamModal from "./ExamsModal";

const RenderExamsTab = ({ pastExams, setPastExams, showExamModal, setShowExamModal, editingExam, setEditingExam }) => {
  const [examSearchTerm, setExamSearchTerm] = useState("");

  const filteredExams = pastExams.filter(exam => {
    const matchesSearch = exam.title.toLowerCase().includes(examSearchTerm.toLowerCase()) ||
                         exam.description.toLowerCase().includes(examSearchTerm.toLowerCase());
    return matchesSearch;
  });

  const handleDeleteExam = (examId) => {
    if (window.confirm("Are you sure you want to delete this exam?")) {
      setPastExams(pastExams.filter(exam => exam.id !== examId));
    }
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl shadow-lg">
              <Award className="h-7 w-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-700 to-pink-700 bg-clip-text text-transparent">
                Past Exams Management
              </h1>
              <p className="text-gray-600">Manage all past exams independently</p>
            </div>
          </div>
          
          <button
            onClick={() => {
              setEditingExam(null);
              setShowExamModal(true);
            }}
            className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-5 py-2.5 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
          >
            <Plus className="h-5 w-5" />
            <span className="font-semibold">New Exam</span>
          </button>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap gap-6 mb-8">
          <div className="flex-1 min-w-[200px] bg-white rounded-2xl p-6 shadow-lg border border-purple-100">
            <div className="flex items-center">
              <div className="p-3 bg-purple-50 rounded-xl mr-4">
                <Award className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm font-medium">Total Exams</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">{pastExams.length}</p>
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
                  placeholder="Search exams..."
                  value={examSearchTerm}
                  onChange={(e) => setExamSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent focus:outline-none transition-all"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Exams List */}
        <div className="space-y-6">
          {filteredExams.length > 0 ? (
            filteredExams.map((exam) => (
              <div key={exam.id} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-3">
                      <h3 className="text-xl font-bold text-gray-800">{exam.title}</h3>
                     
                    </div>
                    
                    <p className="text-gray-600 mb-4">{exam.description}</p>
                    
                    <div className="flex flex-wrap items-center gap-6">
                     
                      <div className="flex items-center gap-2 text-gray-500">
                        <Clock className="h-4 w-4" />
                        <span className="text-sm">{exam.duration}</span>
                      </div>
                     
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 ml-4">
                    <button 
                      onClick={() => {
                        setEditingExam(exam);
                        setShowExamModal(true);
                      }}
                      className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors"
                      title="Edit exam"
                    >
                      <Edit2 className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteExam(exam.id)}
                      className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors"
                      title="Delete exam"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
              <div className="mx-auto w-24 h-24 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full flex items-center justify-center mb-6">
                <Award className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-700 mb-2">No exams found</h3>
              <p className="text-gray-500 mb-6 max-w-md mx-auto">
                Create your first exam to get started
              </p>
              <button
                onClick={() => {
                  setExamSearchTerm("");
                }}
                className="text-purple-600 hover:text-purple-700 font-medium text-lg"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>

        {/* Exam Modal */}
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
};

export default RenderExamsTab;