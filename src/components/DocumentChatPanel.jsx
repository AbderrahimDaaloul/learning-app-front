import React, { useState } from 'react';

function DocumentChatPanel({ file, messages, onSend, onClose, onGenerateReport, isGeneratingReport }) {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      onSend(input);
      setInput('');
    }
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 p-4 flex justify-between items-center">
        <div>
          <h3 className="font-medium">Document Assistant</h3>
          <p className="text-sm text-gray-500 truncate max-w-xs">{file.name}</p>
        </div>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
          ✕
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-3 rounded-lg ${
              msg.sender === 'user' ? 'bg-indigo-100 text-indigo-900' :
              msg.sender === 'system' ? 'bg-gray-100 text-gray-800' :
              'bg-blue-50 text-blue-900'
            }`}>
              {msg.text}
              
              {msg.report && (
                <div className="mt-3 border-t pt-3">
                  <h4 className="font-medium">{msg.report.title}</h4>
                  <div className="mt-2 space-y-2">
                    <div>
                      <h5 className="text-sm font-medium">Summary</h5>
                      <p className="text-sm">{msg.report.summary}</p>
                    </div>
                    <div>
                      <h5 className="text-sm font-medium">Weaknesses Identified</h5>
                      <ul className="list-disc pl-5 text-sm">
                        {msg.report.weaknesses.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-sm font-medium">Recommendations</h5>
                      <ul className="list-disc pl-5 text-sm">
                        {msg.report.recommendations.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Action Bar */}
      <div className="border-t border-gray-200 p-3">
        <button
          onClick={onGenerateReport}
          disabled={isGeneratingReport}
          className={`w-full mb-3 flex items-center justify-center py-2 px-4 rounded-md ${
            isGeneratingReport ? 'bg-gray-200' : 'bg-indigo-600 hover:bg-indigo-700 text-white'
          }`}
        >
          {isGeneratingReport ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating...
            </>
          ) : (
            'Generate Full Analysis Report'
          )}
        </button>

        <div className="flex">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about this document..."
            className="flex-1 border border-gray-300 rounded-l-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
          <button
            onClick={handleSend}
            className="bg-indigo-600 text-white px-4 py-2 rounded-r-lg hover:bg-indigo-700"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default DocumentChatPanel;