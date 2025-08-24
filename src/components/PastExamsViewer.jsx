import React, { useState } from 'react';

function PastExamsViewer() {
  const [selectedYear, setSelectedYear] = useState("2023");
  const [selectedSubject, setSelectedSubject] = useState("computer_science");

  const exams = {
    "2023": {
      computer_science: {
        normal: "/exams/2023/cs/main.pdf",
        correction: "/exams/2023/cs/correction.pdf",
        video_correction: "https://example.com/corrections/2023-cs"
      },
      // Other subjects...
    },
    // Other years...
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Past Baccalaureate Exams</h2>
      
      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2"
        >
          <option value="2023">2023</option>
          <option value="2022">2022</option>
          <option value="2021">2021</option>
        </select>
        
        <select
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2"
        >
          <option value="computer_science">Computer Science</option>
          <option value="mathematics">Mathematics</option>
          <option value="physics">Physics</option>
        </select>
      </div>

      {/* Exam Display */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-4">Exam Paper - {selectedYear}</h3>
          <div className="h-[500px]">
            {/* <iframe 
              src={exams[selectedYear][selectedSubject].normal}
              className="w-full h-full border rounded"
              title="Exam Paper"
            /> */}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-4">Official Correction</h3>
          <div className="h-[500px]">
            {/* <iframe 
              src={exams[selectedYear][selectedSubject].correction}
              className="w-full h-full border rounded"
              title="Exam Correction"
            /> */}
          </div>
          <div className="mt-4">
            <a 
              href={exams[selectedYear][selectedSubject].video_correction}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:underline flex items-center"
            >
              <span className="mr-2">🎥</span> Watch Video Explanation
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PastExamsViewer;
// This component allows users to view past baccalaureate exams, including the exam paper and