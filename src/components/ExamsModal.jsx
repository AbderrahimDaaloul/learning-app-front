import React, { useState } from "react";
import { X, FileText, Video, Upload, CheckCircle, Eye } from "lucide-react";

const ExamModal = ({ isOpen, onClose, editingExam, onSubmit, courseId }) => {
  const [formData, setFormData] = useState(editingExam || {
    title: "",
    date: "",
    duration: "",
    examPdf: null,
    correctionPdf: null,
    examVideo: null,
    score: null
  });

  const [uploadingExamPdf, setUploadingExamPdf] = useState(false);
  const [uploadingCorrectionPdf, setUploadingCorrectionPdf] = useState(false);
  const [uploadingVideo, setUploadingVideo] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newExam = {
      id: editingExam?.id || Date.now(),
      ...formData
    };

    onSubmit(newExam, courseId);
    onClose();
  };

  const handleFileUpload = async (e, field, setUploading) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      const uploadedName = `${file.name.split('.')[0]}-${Date.now()}.${file.name.split('.')[1]}`;
      setFormData({...formData, [field]: uploadedName});
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteFile = (field) => {
    setFormData({...formData, [field]: null});
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl p-8 max-w-2xl w-full shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-gray-800">
            {editingExam ? 'Edit Past Exam' : 'Add Past Exam'}
          </h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <X className="h-6 w-6 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Exam Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:outline-none"
                placeholder="e.g., Final Exam 2023"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date *
              </label>
              <input
                type="date"
                required
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Duration *
              </label>
              <input
                type="text"
                required
                value={formData.duration}
                onChange={(e) => setFormData({...formData, duration: e.target.value})}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:outline-none"
                placeholder="e.g., 2 hours"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Average Score (Optional)
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={formData.score || ""}
                onChange={(e) => setFormData({...formData, score: e.target.value ? parseInt(e.target.value) : null})}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:outline-none"
                placeholder="e.g., 85"
              />
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Exam Materials
              </label>
              
              {/* Exam PDF */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <FileText className="h-4 w-4 text-red-500" />
                    Exam PDF (Questions)
                  </label>
                  {formData.examPdf && (
                    <button
                      type="button"
                      onClick={() => handleDeleteFile('examPdf')}
                      className="text-sm text-red-600 hover:text-red-700"
                    >
                      Remove
                    </button>
                  )}
                </div>
                <label className={`block cursor-pointer ${uploadingExamPdf ? 'opacity-50 cursor-not-allowed' : ''}`}>
                  <div className={`px-4 py-3 border-2 border-dashed ${formData.examPdf ? 'border-green-200 bg-green-50' : 'border-gray-300 bg-gray-50'} rounded-xl hover:border-indigo-400 transition-colors text-center`}>
                    {uploadingExamPdf ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-indigo-600"></div>
                        <span className="text-sm text-gray-600">Uploading...</span>
                      </div>
                    ) : formData.examPdf ? (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-green-600" />
                          <div className="text-left">
                            <span className="text-sm font-medium text-gray-700 truncate block">{formData.examPdf}</span>
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
                          <p className="text-sm font-medium text-gray-700">Upload Exam PDF</p>
                          <p className="text-xs text-gray-500">Contains exam questions</p>
                        </div>
                      </div>
                    )}
                  </div>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => handleFileUpload(e, 'examPdf', setUploadingExamPdf)}
                    className="hidden"
                    disabled={uploadingExamPdf}
                  />
                </label>
              </div>

              {/* Correction PDF */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <FileText className="h-4 w-4 text-green-500" />
                    Correction PDF
                  </label>
                  {formData.correctionPdf && (
                    <button
                      type="button"
                      onClick={() => handleDeleteFile('correctionPdf')}
                      className="text-sm text-red-600 hover:text-red-700"
                    >
                      Remove
                    </button>
                  )}
                </div>
                <label className={`block cursor-pointer ${uploadingCorrectionPdf ? 'opacity-50 cursor-not-allowed' : ''}`}>
                  <div className={`px-4 py-3 border-2 border-dashed ${formData.correctionPdf ? 'border-green-200 bg-green-50' : 'border-gray-300 bg-gray-50'} rounded-xl hover:border-indigo-400 transition-colors text-center`}>
                    {uploadingCorrectionPdf ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-indigo-600"></div>
                        <span className="text-sm text-gray-600">Uploading...</span>
                      </div>
                    ) : formData.correctionPdf ? (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-green-600" />
                          <div className="text-left">
                            <span className="text-sm font-medium text-gray-700 truncate block">{formData.correctionPdf}</span>
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
                          <p className="text-sm font-medium text-gray-700">Upload Correction PDF</p>
                          <p className="text-xs text-gray-500">Contains answers and solutions</p>
                        </div>
                      </div>
                    )}
                  </div>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => handleFileUpload(e, 'correctionPdf', setUploadingCorrectionPdf)}
                    className="hidden"
                    disabled={uploadingCorrectionPdf}
                  />
                </label>
              </div>

              {/* Review Video */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Video className="h-4 w-4 text-blue-500" />
                    Review Video (Optional)
                  </label>
                  {formData.examVideo && (
                    <button
                      type="button"
                      onClick={() => handleDeleteFile('examVideo')}
                      className="text-sm text-red-600 hover:text-red-700"
                    >
                      Remove
                    </button>
                  )}
                </div>
                <label className={`block cursor-pointer ${uploadingVideo ? 'opacity-50 cursor-not-allowed' : ''}`}>
                  <div className={`px-4 py-3 border-2 border-dashed ${formData.examVideo ? 'border-blue-200 bg-blue-50' : 'border-gray-300 bg-gray-50'} rounded-xl hover:border-indigo-400 transition-colors text-center`}>
                    {uploadingVideo ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-indigo-600"></div>
                        <span className="text-sm text-gray-600">Uploading...</span>
                      </div>
                    ) : formData.examVideo ? (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Video className="h-5 w-5 text-blue-600" />
                          <div className="text-left">
                            <span className="text-sm font-medium text-gray-700 truncate block">{formData.examVideo}</span>
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
                          <p className="text-sm font-medium text-gray-700">Upload Review Video</p>
                          <p className="text-xs text-gray-500">Exam walkthrough or solution explanation</p>
                        </div>
                      </div>
                    )}
                  </div>
                  <input
                    type="file"
                    accept="video/*"
                    onChange={(e) => handleFileUpload(e, 'examVideo', setUploadingVideo)}
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
              disabled={!formData.title || !formData.date || !formData.duration || !formData.examPdf}
              className={`flex-1 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all font-medium ${(!formData.title || !formData.date || !formData.duration || !formData.examPdf) ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {editingExam ? 'Update Exam' : 'Add Exam'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExamModal;