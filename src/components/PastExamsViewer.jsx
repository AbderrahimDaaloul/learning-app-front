import React, { useState,useRef } from 'react';
import ChatBot from './ChatBot';

function PastExamsViewer() {
  const [selectedYear, setSelectedYear] = useState("2023");
  const [selectedSubject, setSelectedSubject] = useState("computer_science");
  const [showVideoCorrection, setShowVideoCorrection] = useState(false);

  const exams = {
    "2023": {
      computer_science: {
        normal: "/exams/2023/cs/main.pdf",
        correction: "/exams/2023/cs/correction.pdf",
        video_correction: "https://example.com/corrections/2023-cs"
      },
      mathematics: {
        normal: "/exams/2023/math/main.pdf",
        correction: "/exams/2023/math/correction.pdf",
        video_correction: "https://example.com/corrections/2023-math"
      },
      physics: {
        normal: "/exams/2023/physics/main.pdf",
        correction: "/exams/2023/physics/correction.pdf",
        video_correction: "https://example.com/corrections/2023-physics"
      }
    },
    "2022": {
      computer_science: {
        normal: "/exams/2022/cs/main.pdf",
        correction: "/exams/2022/cs/correction.pdf",
        video_correction: "https://example.com/corrections/2022-cs"
      },
      mathematics: {
        normal: "/exams/2022/math/main.pdf",
        correction: "/exams/2022/math/correction.pdf",
        video_correction: "https://example.com/corrections/2022-math"
      },
      physics: {
        normal: "/exams/2022/physics/main.pdf",
        correction: "/exams/2022/physics/correction.pdf",
        video_correction: "https://example.com/corrections/2022-physics"
      }
    },
    "2021": {
      computer_science: {
        normal: "/exams/2021/cs/main.pdf",
        correction: "/exams/2021/cs/correction.pdf",
        video_correction: "https://example.com/corrections/2021-cs"
      },
      mathematics: {
        normal: "/exams/2021/math/main.pdf",
        correction: "/exams/2021/math/correction.pdf",
        video_correction: "https://example.com/corrections/2021-math"
      },
      physics: {
        normal: "/exams/2021/physics/main.pdf",
        correction: "/exams/2021/physics/correction.pdf",
        video_correction: "https://example.com/corrections/2021-physics"
      }
    }
  };

  const currentExam = exams[selectedYear][selectedSubject];
  const correctionRef = useRef(null);

  // Helper to produce a safe filename
  const getPdfFilename = (type) => {
    const subjectName = selectedSubject.replace('_', ' ').toUpperCase();
    return `${selectedYear}-${subjectName}-${type}.pdf`;
  };

  // Force-download helper for PDFs
  const downloadPdf = async (url, filename) => {
    try {
      const res = await fetch(url, { mode: "cors" });
      if (!res.ok) throw new Error("Network response was not ok");
      const blob = await res.blob();
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = filename || url.split("/").pop();
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(blobUrl);
    } catch (err) {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  const handleWatchVideo = () => {
    setShowVideoCorrection(true);
    // Small delay to ensure DOM has rendered the video section
    setTimeout(() => {
      correctionRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div>

     {/* ChatBot - Floating at bottom right */}
      <div className="fixed bottom-6 right-6 z-40">
        <ChatBot className="flex justify-end items-end" />
      </div>

      <h2 className="text-2xl font-bold mb-6">Past Baccalaureate Exams</h2>
      
      {/* Filters */}
      <div className="flex gap-4 mb-8">
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-2">Select Year</label>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="2023">2023</option>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
          </select>
        </div>
        
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-2">Select Subject</label>
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="computer_science">Computer Science</option>
            <option value="mathematics">Mathematics</option>
            <option value="physics">Physics</option>
          </select>
        </div>
      </div>

      {/* Exam Display */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Exam Paper */}
        <div className="bg-white p-6 rounded-lg shadow relative">
          <div className="absolute top-4 right-4 z-20 flex items-center gap-3">
            <a
              href={currentExam.normal}
              download={getPdfFilename('exam')}
              title="Download Exam Paper"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-pink-500 hover:from-indigo-700 hover:to-pink-600 text-white px-4 py-2 rounded-xl shadow-lg transition-transform transform hover:-translate-y-0.5"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v12m0 0l4-4m-4 4-4-4M4 21h16" />
              </svg>
              Download
            </a>
            <a
              href={currentExam.normal}
              target="_blank"
              rel="noopener noreferrer"
              title="Open Exam Paper in new tab"
              className="inline-flex items-center gap-2 bg-white border border-gray-200 hover:shadow-md text-gray-700 px-3 py-2 rounded-lg transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 3h7v7m0-7L10 14" />
              </svg>
              Open File 
            </a>
          </div>
          
          <h3 className="text-lg font-semibold mb-4 text-indigo-700">Exam Paper - {selectedYear}</h3>
          <div className="h-[500px]">
            <iframe 
              src={currentExam.normal}
              className="w-full h-full border border-gray-200 rounded-lg"
              title="Exam Paper"
            />
          </div>
        </div>

        {/* Official Correction */}
        <div className="bg-white p-6 rounded-lg shadow relative">
          <div className="absolute top-4 right-4 z-20 flex items-center gap-3">
            <a
              href={currentExam.correction}
              download={getPdfFilename('correction')}
              title="Download Correction"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-pink-500 hover:from-indigo-700 hover:to-pink-600 text-white px-4 py-2 rounded-xl shadow-lg transition-transform transform hover:-translate-y-0.5"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v12m0 0l4-4m-4 4-4-4M4 21h16" />
              </svg>
              Download
            </a>
            <a
              href={currentExam.correction}
              target="_blank"
              rel="noopener noreferrer"
              title="Open Correction in new tab"
              className="inline-flex items-center gap-2 bg-white border border-gray-200 hover:shadow-md text-gray-700 px-3 py-2 rounded-lg transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 3h7v7m0-7L10 14" />
              </svg>
              Open File 
            </a>

            <button
              onClick={handleWatchVideo}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-pink-500 hover:from-indigo-700 hover:to-pink-600 text-white px-4 py-2 rounded-xl shadow-lg transition-transform transform hover:-translate-y-0.5"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path d="M8 5v14l11-7z" />
              </svg>
              {showVideoCorrection ? 'Hide Video' : 'Watch Video'}
            </button>
          </div>
          
          <h3 className="text-lg font-semibold mb-4 text-indigo-700">Official Correction</h3>
          <div className="h-[500px]">
            <iframe 
              src={currentExam.correction}
              className="w-full h-full border border-gray-200 rounded-lg"
              title="Exam Correction"
            />
          </div>
        </div>
      </div>

      {/* Video Correction Section */}
      {showVideoCorrection && (
        <div className="mt-8 bg-white p-6 rounded-lg shadow" ref={correctionRef}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-indigo-700">Video Explanation - {selectedYear} {selectedSubject.replace('_', ' ')}</h3>
            <button
              onClick={() => setShowVideoCorrection(false)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="bg-black rounded-lg overflow-hidden">
            <iframe
              width="100%"
              height="500"
              src={currentExam.video_correction.replace('https://example.com/corrections/', 'https://www.youtube.com/embed/')}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Video Correction"
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
}

export default PastExamsViewer;
// This component allows users to view past baccalaureate exams, including the exam paper and