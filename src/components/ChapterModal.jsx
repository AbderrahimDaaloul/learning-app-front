import React, { useState } from "react";
import { X, FileText, Video, Upload, CheckCircle, Eye } from "lucide-react";

const ChapterModal = ({ isOpen, onClose, editingChapter, onSubmit, courseId }) => {
  const [formData, setFormData] = useState(editingChapter || {
    title: "",
    description: "",
    order: 1,
    duration: "",
    pdfUrl: null,
    videoUrl: null
  });

  const [uploadingPdf, setUploadingPdf] = useState(false);
  const [uploadingVideo, setUploadingVideo] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newChapter = {
      id: editingChapter?.id || Date.now(),
      title: formData.title,
      description: formData.description,
      order: formData.order,
      duration: formData.duration,
      pdfUrl: formData.pdfUrl,
      videoUrl: formData.videoUrl,
      completed: editingChapter?.completed || false
    };

    onSubmit(newChapter, courseId);
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
            {editingChapter ? 'Edit Chapter' : 'Add New Chapter'}
          </h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <X className="h-6 w-6 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Chapter Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:outline-none"
                placeholder="Enter chapter title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Chapter Order *
              </label>
              <input
                type="number"
                required
                min="1"
                value={formData.order}
                onChange={(e) => setFormData({...formData, order: parseInt(e.target.value)})}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:outline-none"
                placeholder="Chapter number"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:outline-none"
                rows="2"
                placeholder="Chapter description"
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
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Chapter Materials
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* PDF Upload */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <FileText className="h-4 w-4 text-red-500" />
                      Chapter PDF
                    </label>
                    {formData.pdfUrl && (
                      <button
                        type="button"
                        onClick={() => handleDeleteFile('pdfUrl')}
                        className="text-sm text-red-600 hover:text-red-700"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  <label className={`block cursor-pointer ${uploadingPdf ? 'opacity-50 cursor-not-allowed' : ''}`}>
                    <div className={`px-4 py-3 border-2 border-dashed ${formData.pdfUrl ? 'border-green-200 bg-green-50' : 'border-gray-300 bg-gray-50'} rounded-xl hover:border-indigo-400 transition-colors text-center`}>
                      {uploadingPdf ? (
                        <div className="flex items-center justify-center gap-2">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-indigo-600"></div>
                          <span className="text-sm text-gray-600">Uploading...</span>
                        </div>
                      ) : formData.pdfUrl ? (
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <FileText className="h-5 w-5 text-green-600" />
                            <div className="text-left">
                              <span className="text-sm font-medium text-gray-700 truncate block">{formData.pdfUrl}</span>
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
                            <p className="text-sm font-medium text-gray-700">Upload PDF</p>
                            <p className="text-xs text-gray-500">Click to browse files</p>
                          </div>
                        </div>
                      )}
                    </div>
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={(e) => handleFileUpload(e, 'pdfUrl', setUploadingPdf)}
                      className="hidden"
                      disabled={uploadingPdf}
                    />
                  </label>
                </div>

                {/* Video Upload */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <Video className="h-4 w-4 text-blue-500" />
                      Chapter Video
                    </label>
                    {formData.videoUrl && (
                      <button
                        type="button"
                        onClick={() => handleDeleteFile('videoUrl')}
                        className="text-sm text-red-600 hover:text-red-700"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  <label className={`block cursor-pointer ${uploadingVideo ? 'opacity-50 cursor-not-allowed' : ''}`}>
                    <div className={`px-4 py-3 border-2 border-dashed ${formData.videoUrl ? 'border-blue-200 bg-blue-50' : 'border-gray-300 bg-gray-50'} rounded-xl hover:border-indigo-400 transition-colors text-center`}>
                      {uploadingVideo ? (
                        <div className="flex items-center justify-center gap-2">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-indigo-600"></div>
                          <span className="text-sm text-gray-600">Uploading...</span>
                        </div>
                      ) : formData.videoUrl ? (
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Video className="h-5 w-5 text-blue-600" />
                            <div className="text-left">
                              <span className="text-sm font-medium text-gray-700 truncate block">{formData.videoUrl}</span>
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
                            <p className="text-sm font-medium text-gray-700">Upload Video</p>
                            <p className="text-xs text-gray-500">Click to browse files</p>
                          </div>
                        </div>
                      )}
                    </div>
                    <input
                      type="file"
                      accept="video/*"
                      onChange={(e) => handleFileUpload(e, 'videoUrl', setUploadingVideo)}
                      className="hidden"
                      disabled={uploadingVideo}
                    />
                  </label>
                </div>
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
              disabled={!formData.title || !formData.duration}
              className={`flex-1 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all font-medium ${(!formData.title || !formData.duration) ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {editingChapter ? 'Update Chapter' : 'Add Chapter'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChapterModal;