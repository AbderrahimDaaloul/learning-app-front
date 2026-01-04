import React, { useState, useEffect } from "react";
import { X, FileText, Video, Upload, CheckCircle, Eye } from "lucide-react";

const ExerciseModal = ({ isOpen, onClose, editingExercise, onSubmit, courseId, chapterId }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    exercisePdf: null,
    solutionPdf: null,
    exerciseVideo: null,
    difficulty: "Medium",
    order: 1
  });

  const [uploadingPdf, setUploadingPdf] = useState(false);
  const [uploadingSolutionPdf, setUploadingSolutionPdf] = useState(false);
  const [uploadingVideo, setUploadingVideo] = useState(false);

  // Reset form when modal opens/closes or when editing exercise changes
  useEffect(() => {
    if (isOpen) {
      if (editingExercise) {
        setFormData({
          title: editingExercise.title || "",
          description: editingExercise.description || "",
          exercisePdf: editingExercise.exercisePdf || null,
          solutionPdf: editingExercise.solutionPdf || null,
          exerciseVideo: editingExercise.exerciseVideo || null,
          difficulty: editingExercise.difficulty || "Medium",
          order: editingExercise.order || 1
        });
      } else {
        setFormData({
          title: "",
          description: "",
          exercisePdf: null,
          solutionPdf: null,
          exerciseVideo: null,
          difficulty: "Medium",
          order: 1
        });
      }
    }
  }, [isOpen, editingExercise]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!formData.title) {
      alert("Please enter exercise title");
      return;
    }
    if (!formData.exercisePdf) {
      alert("Please upload exercise PDF");
      return;
    }
    if (!courseId) {
      alert("Course ID is missing");
      return;
    }
    if (!chapterId) {
      alert("Chapter ID is missing");
      return;
    }

    const newExercise = {
      id: editingExercise?.id || Date.now(),
      ...formData
    };

    // Pass all three required parameters
    onSubmit(newExercise, courseId, chapterId);
  };

  const handleFileUpload = async (e, field, setUploading) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      const uploadedName = `${file.name.split('.')[0]}-${Date.now()}.${file.name.split('.')[1]}`;
      setFormData(prev => ({ ...prev, [field]: uploadedName }));
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteFile = (field) => {
    setFormData(prev => ({ ...prev, [field]: null }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl p-8 max-w-2xl w-full shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-gray-800">
            {editingExercise ? 'Edit Exercise' : 'Add New Exercise'}
          </h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <X className="h-6 w-6 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Exercise Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:outline-none"
                placeholder="Enter exercise title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Difficulty Level <span className="text-red-500">*</span>
              </label>
              <select
                required
                value={formData.difficulty}
                onChange={(e) => setFormData(prev => ({ ...prev, difficulty: e.target.value }))}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:outline-none"
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:outline-none resize-none"
                rows="3"
                placeholder="Exercise description and instructions"
              />
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Exercise Materials
              </label>
              
              {/* Exercise PDF */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <FileText className="h-4 w-4 text-red-500" />
                    Exercise PDF (Problems) <span className="text-red-500">*</span>
                  </label>
                  {formData.exercisePdf && (
                    <button
                      type="button"
                      onClick={() => handleDeleteFile('exercisePdf')}
                      className="text-sm text-red-600 hover:text-red-700"
                    >
                      Remove
                    </button>
                  )}
                </div>
                <label className={`block cursor-pointer ${uploadingPdf ? 'opacity-50 cursor-not-allowed' : ''}`}>
                  <div className={`px-4 py-3 border-2 border-dashed ${formData.exercisePdf ? 'border-green-200 bg-green-50' : 'border-gray-300 bg-gray-50'} rounded-xl hover:border-indigo-400 transition-colors text-center`}>
                    {uploadingPdf ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-indigo-600"></div>
                        <span className="text-sm text-gray-600">Uploading...</span>
                      </div>
                    ) : formData.exercisePdf ? (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-green-600" />
                          <div className="text-left">
                            <span className="text-sm font-medium text-gray-700 truncate block">{formData.exercisePdf}</span>
                            <div className="flex items-center gap-1 mt-1">
                              <CheckCircle className="h-3 w-3 text-green-500" />
                              <span className="text-xs text-green-600">Uploaded</span>
                            </div>
                          </div>
                        </div>
                        <Eye className="h-5 w-5 text-gray-400" />
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-2">
                        <Upload className="h-6 w-6 text-gray-400" />
                        <div>
                          <p className="text-sm font-medium text-gray-700">Upload Exercise PDF</p>
                          <p className="text-xs text-gray-500">Contains problems/questions</p>
                        </div>
                      </div>
                    )}
                  </div>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => handleFileUpload(e, 'exercisePdf', setUploadingPdf)}
                    className="hidden"
                    disabled={uploadingPdf}
                  />
                </label>
              </div>

              {/* Solution PDF */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <FileText className="h-4 w-4 text-green-500" />
                    Solution PDF
                  </label>
                  {formData.solutionPdf && (
                    <button
                      type="button"
                      onClick={() => handleDeleteFile('solutionPdf')}
                      className="text-sm text-red-600 hover:text-red-700"
                    >
                      Remove
                    </button>
                  )}
                </div>
                <label className={`block cursor-pointer ${uploadingSolutionPdf ? 'opacity-50 cursor-not-allowed' : ''}`}>
                  <div className={`px-4 py-3 border-2 border-dashed ${formData.solutionPdf ? 'border-green-200 bg-green-50' : 'border-gray-300 bg-gray-50'} rounded-xl hover:border-indigo-400 transition-colors text-center`}>
                    {uploadingSolutionPdf ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-indigo-600"></div>
                        <span className="text-sm text-gray-600">Uploading...</span>
                      </div>
                    ) : formData.solutionPdf ? (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-green-600" />
                          <div className="text-left">
                            <span className="text-sm font-medium text-gray-700 truncate block">{formData.solutionPdf}</span>
                            <div className="flex items-center gap-1 mt-1">
                              <CheckCircle className="h-3 w-3 text-green-500" />
                              <span className="text-xs text-green-600">Uploaded</span>
                            </div>
                          </div>
                        </div>
                        <Eye className="h-5 w-5 text-gray-400" />
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-2">
                        <Upload className="h-6 w-6 text-gray-400" />
                        <div>
                          <p className="text-sm font-medium text-gray-700">Upload Solution PDF</p>
                          <p className="text-xs text-gray-500">Contains answers/solutions</p>
                        </div>
                      </div>
                    )}
                  </div>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => handleFileUpload(e, 'solutionPdf', setUploadingSolutionPdf)}
                    className="hidden"
                    disabled={uploadingSolutionPdf}
                  />
                </label>
              </div>

              {/* Exercise Video */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Video className="h-4 w-4 text-blue-500" />
                    Exercise Video (Optional)
                  </label>
                  {formData.exerciseVideo && (
                    <button
                      type="button"
                      onClick={() => handleDeleteFile('exerciseVideo')}
                      className="text-sm text-red-600 hover:text-red-700"
                    >
                      Remove
                    </button>
                  )}
                </div>
                <label className={`block cursor-pointer ${uploadingVideo ? 'opacity-50 cursor-not-allowed' : ''}`}>
                  <div className={`px-4 py-3 border-2 border-dashed ${formData.exerciseVideo ? 'border-blue-200 bg-blue-50' : 'border-gray-300 bg-gray-50'} rounded-xl hover:border-indigo-400 transition-colors text-center`}>
                    {uploadingVideo ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-indigo-600"></div>
                        <span className="text-sm text-gray-600">Uploading...</span>
                      </div>
                    ) : formData.exerciseVideo ? (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Video className="h-5 w-5 text-blue-600" />
                          <div className="text-left">
                            <span className="text-sm font-medium text-gray-700 truncate block">{formData.exerciseVideo}</span>
                            <div className="flex items-center gap-1 mt-1">
                              <CheckCircle className="h-3 w-3 text-green-500" />
                              <span className="text-xs text-green-600">Uploaded</span>
                            </div>
                          </div>
                        </div>
                        <Eye className="h-5 w-5 text-gray-400" />
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-2">
                        <Upload className="h-6 w-6 text-gray-400" />
                        <div>
                          <p className="text-sm font-medium text-gray-700">Upload Exercise Video</p>
                          <p className="text-xs text-gray-500">Walkthrough or explanation video</p>
                        </div>
                      </div>
                    )}
                  </div>
                  <input
                    type="file"
                    accept="video/*"
                    onChange={(e) => handleFileUpload(e, 'exerciseVideo', setUploadingVideo)}
                    className="hidden"
                    disabled={uploadingVideo}
                  />
                </label>
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!formData.title || !formData.exercisePdf}
              className={`flex-1 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all font-medium ${(!formData.title || !formData.exercisePdf) ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {editingExercise ? 'Update Exercise' : 'Add Exercise'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExerciseModal;