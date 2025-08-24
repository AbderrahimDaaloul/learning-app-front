import React from "react";
import { useState, useRef } from "react";

const Chatbot = () => {
  const [chatMessages, setChatMessages] = useState([]);
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [aiChatInput, setAiChatInput] = useState("");
  const [aiChatHistory, setAiChatHistory] = useState([]);
  const [aiChatFile, setAiChatFile] = useState(null);
  const [aiReport, setAiReport] = useState(null);
  const [isAiAnalyzing, setIsAiAnalyzing] = useState(false);
  const fileInputRef = useRef(null);
  const aiFileInputRef = useRef(null);

  return (
    <div className="flex flex-col w-full h-full p-6 overflow-auto ">
      <h2 className="text-2xl font-bold mb-4 text-indigo-700">
        AI Chatbot Assistant
      </h2>
      <div className="flex flex-col h-[85%] bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-2xl shadow-2xl p-8 border border-indigo-100 max-w-5xl mx-auto w-[80%]">
        <div className="flex-1 overflow-y-auto mb-4 space-y-4 px-2">
          {aiChatHistory.length === 0 && (
            <div className="text-gray-400 text-center my-8">
              Start a conversation or upload an exam to analyze.
            </div>
          )}
          {aiChatHistory.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`rounded-2xl px-6 py-3 max-w-2xl shadow-md ${
                  msg.sender === "user"
                    ? "bg-indigo-100 text-indigo-900 border border-indigo-200"
                    : msg.sender === "ai"
                    ? "bg-white text-indigo-800 border border-indigo-100"
                    : "bg-blue-50 text-blue-900 border border-blue-100"
                }`}
              >
                {msg.text}
                {msg.file && (
                  <div className="mt-2 text-xs text-indigo-900 bg-indigo-50 rounded p-2 border border-indigo-200">
                    📄 {msg.file.name}
                  </div>
                )}
                {msg.report && (
                  <div className="mt-2 bg-indigo-50 text-indigo-900 rounded p-2 border border-indigo-200">
                    <div className="font-bold mb-1">{msg.report.title}</div>
                    <div>
                      <span className="font-semibold">Summary:</span>{" "}
                      {msg.report.summary}
                    </div>
                    <div className="mt-1">
                      <span className="font-semibold">Weaknesses:</span>{" "}
                      {msg.report.weaknesses.join(", ")}
                    </div>
                    <div className="mt-1">
                      <span className="font-semibold">Recommendations:</span>{" "}
                      {msg.report.recommendations.join(", ")}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        {/* File Upload and Input */}
        <div className="flex flex-wrap items-center gap-2 mt-2">
          <button
            onClick={() => aiFileInputRef.current.click()}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow flex items-center"
            disabled={isAiAnalyzing}
          >
            <span className="mr-2">📄</span> Upload Exam
          </button>
          <input
            type="file"
            ref={aiFileInputRef}
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                setAiChatFile(file);
                setAiChatHistory((prev) => [
                  ...prev,
                  { sender: "user", text: `Uploaded: ${file.name}`, file },
                ]);
              }
            }}
            accept=".pdf,.docx,.txt"
            className="hidden"
          />
          <button
            onClick={async () => {
              if (!aiChatFile) return;
              setIsAiAnalyzing(true);
              setAiChatHistory((prev) => [
                ...prev,
                { sender: "system", text: "Analyzing your document..." },
              ]);
              setTimeout(() => {
                setIsAiAnalyzing(false);
                setAiChatHistory((prev) => [
                  ...prev,
                  {
                    sender: "system",
                    text: "Here's your analysis report:",
                    report: {
                      title: "Document Analysis Report",
                      summary:
                        "The document covers advanced algorithm concepts...",
                      weaknesses: [
                        "Time complexity analysis",
                        "Recursive functions",
                      ],
                      recommendations: [
                        "Review Chapter 5",
                        "Practice exercises 3.2-3.5",
                      ],
                    },
                  },
                ]);
              }, 2000);
            }}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow disabled:opacity-50"
            disabled={!aiChatFile || isAiAnalyzing}
          >
            {isAiAnalyzing ? "Analyzing..." : "Analyze & Generate Report"}
          </button>
        </div>
        {/* Chat Input */}
        <form
          className="flex gap-2 mt-4"
          onSubmit={(e) => {
            e.preventDefault();
            if (!aiChatInput.trim()) return;
            setAiChatHistory((prev) => [
              ...prev,
              { sender: "user", text: aiChatInput },
            ]);
            setAiChatInput("");
            setTimeout(() => {
              setAiChatHistory((prev) => [
                ...prev,
                {
                  sender: "ai",
                  text: "This is an AI response to your question.",
                },
              ]);
            }, 1000);
          }}
        >
          <input
            type="text"
            value={aiChatInput}
            onChange={(e) => setAiChatInput(e.target.value)}
            className="flex-1 px-4 py-3 rounded-xl border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white shadow"
            placeholder="Ask the AI anything..."
            disabled={isAiAnalyzing}
          />
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl shadow font-semibold"
            disabled={isAiAnalyzing}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chatbot;
