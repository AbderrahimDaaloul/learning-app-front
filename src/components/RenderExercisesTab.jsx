
/*
// ============ RENDER EXERCISES TAB ============
  const renderExercisesTab = () => {
    // Get all exercises from all chapters
    const allExercises = courses.flatMap(course => 
      course.chapters.flatMap(chapter => 
        chapter.exercises.map(exercise => ({
          ...exercise,
          courseTitle: course.title,
          courseId: course.id,
          chapterTitle: chapter.title,
          chapterId: chapter.id
        }))
      )
    );

    const filteredExercises = allExercises.filter(exercise => {
      return exercise.title.toLowerCase().includes(exercisesSearchTerm.toLowerCase()) ||
             exercise.description.toLowerCase().includes(exercisesSearchTerm.toLowerCase());
    });

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50 p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl shadow-lg">
                <FileText className="h-7 w-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-green-700 to-emerald-700 bg-clip-text text-transparent">
                  Exercise Management
                </h1>
                <p className="text-gray-600">Manage exercises across all courses and chapters</p>
              </div>
            </div>
          </div>

          {/* Stats *///}
         /* <div className="flex flex-wrap gap-6 mb-8">
            <div className="flex-1 min-w-[200px] bg-white rounded-2xl p-6 shadow-lg border border-green-100">
              <div className="flex items-center">
                <div className="p-3 bg-green-50 rounded-xl mr-4">
                  <FileText className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm font-medium">Total Exercises</p>
                  <p className="text-2xl font-bold text-gray-800 mt-1">{stats.totalExercises}</p>
                </div>
              </div>
            </div>

            <div className="flex-1 min-w-[200px] bg-white rounded-2xl p-6 shadow-lg border border-blue-100">
              <div className="flex items-center">
                <div className="p-3 bg-blue-50 rounded-xl mr-4">
                  <Video className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm font-medium">Exercise Videos</p>
                  <p className="text-2xl font-bold text-gray-800 mt-1">
                    {allExercises.filter(ex => ex.exerciseVideo).length}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex-1 min-w-[200px] bg-white rounded-2xl p-6 shadow-lg border border-red-100">
              <div className="flex items-center">
                <div className="p-3 bg-red-50 rounded-xl mr-4">
                  <FileText className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm font-medium">Solution PDFs</p>
                  <p className="text-2xl font-bold text-gray-800 mt-1">
                    {allExercises.filter(ex => ex.solutionPdf).length}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Controls *///}
          /*<div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-100">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search exercises..."
                    value={exercisesSearchTerm}
                    onChange={(e) => setExercisesSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent focus:outline-none transition-all"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Exercises List *///}
         /* <div className="space-y-6">
            {filteredExercises.length > 0 ? (
              filteredExercises.map((exercise) => (
                <div key={exercise.id} className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-semibold text-gray-800">{exercise.title}</h4>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          exercise.difficulty === 'Easy' 
                            ? 'bg-green-100 text-green-700'
                            : exercise.difficulty === 'Medium'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-red-100 text-red-700'
                        }`}>
                          {exercise.difficulty}
                        </span>
                      </div>
                      
                      <div className="mb-3">
                        <p className="text-sm text-gray-600 mb-2">{exercise.description}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span className="font-medium">{exercise.courseTitle}</span>
                          <span>•</span>
                          <span>{exercise.chapterTitle}</span>
                        </div>
                      </div>

                      {/* Exercise Files *///}
                      /*<div className="flex flex-wrap gap-3">
                        {/* Exercise PDF *///}
                        /*{exercise.exercisePdf && (
                          <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg border border-gray-200">
                            <FileText className="h-4 w-4 text-red-500" />
                            <div className="flex-1">
                              <p className="text-xs text-gray-500">Exercise PDF</p>
                              <p className="text-sm font-medium text-gray-700 truncate max-w-[150px]">
                                {exercise.exercisePdf}
                              </p>
                            </div>
                            <button
                              onClick={() => window.open(`/uploads/${exercise.exercisePdf}`, '_blank')}
                              className="p-1 hover:bg-gray-200 rounded"
                              title="View"
                            >
                              <Eye className="h-3 w-3 text-gray-500" />
                            </button>
                          </div>
                        )}

                        {/* Solution PDF *///}
                      /*  {exercise.solutionPdf && (
                          <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg border border-gray-200">
                            <FileText className="h-4 w-4 text-green-500" />
                            <div className="flex-1">
                              <p className="text-xs text-gray-500">Solution PDF</p>
                              <p className="text-sm font-medium text-gray-700 truncate max-w-[150px]">
                                {exercise.solutionPdf}
                              </p>
                            </div>
                            <button
                              onClick={() => window.open(`/uploads/${exercise.solutionPdf}`, '_blank')}
                              className="p-1 hover:bg-gray-200 rounded"
                              title="View"
                            >
                              <Eye className="h-3 w-3 text-gray-500" />
                            </button>
                          </div>
                        )}

                        {/* Explanation Video *///}
                       /* {exercise.exerciseVideo && (
                          <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg border border-gray-200">
                            <Video className="h-4 w-4 text-blue-500" />
                            <div className="flex-1">
                              <p className="text-xs text-gray-500">Explanation Video</p>
                              <p className="text-sm font-medium text-gray-700 truncate max-w-[150px]">
                                {exercise.exerciseVideo}
                              </p>
                            </div>
                            <button
                              onClick={() => window.open(`/uploads/${exercise.exerciseVideo}`, '_blank')}
                              className="p-1 hover:bg-gray-200 rounded"
                              title="View"
                            >
                              <Eye className="h-3 w-3 text-gray-500" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 ml-4">
                      <button 
                        onClick={() => {
                          setCurrentCourseId(exercise.courseId);
                          setCurrentChapterId(exercise.chapterId);
                          setEditingExercise(exercise);
                          setShowExerciseModal(true);
                        }}
                        className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteExercise(exercise.courseId, exercise.chapterId, exercise.id)}
                        className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                <div className="mx-auto w-24 h-24 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full flex items-center justify-center mb-6">
                  <FileText className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-700 mb-2">No exercises found</h3>
                <p className="text-gray-500 mb-6 max-w-md mx-auto">
                  Create your first exercise to get started
                </p>
                <button
                  onClick={() => {
                    setExercisesSearchTerm("");
                  }}
                  className="text-green-600 hover:text-green-700 font-medium text-lg"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };
