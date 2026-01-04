import React, { useState, useRef, useEffect } from "react";
import { 
  Send, 
  X, 
  Bot, 
  User, 
  Loader2, 
  Sparkles,
  ThumbsUp,
  ThumbsDown,
  Copy,
  Volume2
} from "lucide-react";

const AIChatModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I'm your AI assistant. How can I help you today?", sender: "ai", timestamp: new Date() }
  ]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Mock AI responses for demonstration
  const aiResponses = [
    "I understand your question. Let me provide you with detailed information about that.",
    "Based on your query, here are my recommendations...",
    "That's an interesting point! Here's what I think about it.",
    "I can help you with that. Let me explain step by step.",
    "Great question! Here's a comprehensive answer to help you understand better."
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputText.trim() || isLoading) return;

    const userMessage = {
      id: messages.length + 1,
      text: inputText,
      sender: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText("");
    setIsLoading(true);

    // Simulate AI response delay
    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2,
        text: aiResponses[Math.floor(Math.random() * aiResponses.length)],
        sender: "ai",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  const handleCopyText = (text) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };



  const clearChat = () => {
    setMessages([
      { id: 1, text: "Hello! I'm your AI assistant. How can I help you today?", sender: "ai", timestamp: new Date() }
    ]);
  };

 
  return (
    <>
      {/* Floating Chat Button - Fixed at bottom right */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-20 h-20 rounded-full bg-gradient-to-br
         from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-2xl 
         shadow-purple-500/50 hover:shadow-purple-600/60 transform hover:scale-105 transition-all duration-300 flex 
         flex-col items-center justify-center z-40 group"
        aria-label="Open AI Assistant"
      >
        <div className="relative">
          <Bot size={32} className="animate-pulse" />
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
        </div>
        
        {/* Pulsing ring effect */}
        <div className="absolute inset-0 rounded-full border-2 border-indigo-300 animate-ping opacity-20"></div>
      </button>

      {/* Modal Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn"
          onClick={() => setIsOpen(false)}
        >
          {/* Modal Content */}
          <div 
            className="relative w-full max-w-6xl h-[80vh]  bg-gradient-to-b from-gray-900 to-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-700 animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 bg-gradient-to-r from-indigo-900/50 to-purple-900/50 border-b border-gray-700">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                    <Bot size={24} className="text-white" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-900"></div>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    AI Assistant <Sparkles size={16} className="text-yellow-400 animate-pulse" />
                  </h2>
                  <p className="text-sm text-gray-300">Powered by Advanced AI</p>
                </div>
              </div>
              
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full hover:bg-gray-700/50 transition-colors text-gray-300 hover:text-white"
                aria-label="Close chat"
              >
                <X size={24} />
              </button>
            </div>

            {/* Messages Container */}
            <div className="h-[calc(100%-200px)] overflow-y-auto p-4 space-y-4 custom-scrollbar">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"} animate-fadeInUp`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl p-4 ${
                      message.sender === "user"
                        ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-br-none"
                        : "bg-gray-800/70 text-gray-100 rounded-bl-none border border-gray-700"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`p-1 rounded-full ${message.sender === "user" ? "bg-indigo-400" : "bg-purple-500"}`}>
                        {message.sender === "user" ? <User size={12} /> : <Bot size={12} />}
                      </div>
                      <span className="text-sm font-medium">
                        {message.sender === "user" ? "You" : "AI Assistant"}
                      </span>
                      <span className="text-xs text-gray-400 ml-auto">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <p className="whitespace-pre-wrap">{message.text}</p>
                    
                    {/* Message Actions */}
                    {message.sender === "ai" && (
                      <div className="flex items-center gap-2 mt-3 pt-2 border-t border-gray-700/50">
                        <button
                          onClick={() => handleCopyText(message.text)}
                          className="p-1.5 rounded-lg hover:bg-gray-700/50 transition-colors text-gray-400 hover:text-white"
                          title="Copy text"
                        >
                          <Copy size={14} />
                        </button>
                      
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              {/* Loading Indicator */}
              {isLoading && (
                <div className="flex justify-start animate-fadeInUp">
                  <div className="max-w-[80%] rounded-2xl p-4 bg-gray-800/70 text-gray-100 rounded-bl-none border border-gray-700">
                    <div className="flex items-center gap-3">
                      <Loader2 size={20} className="animate-spin text-purple-400" />
                      <span className="text-sm">AI is thinking...</span>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

           
            {/* Input Area */}
            <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-700 bg-gray-900/50">
              <div className="flex gap-3">
                <div className="flex-1 relative flex items-center">
                  <textarea
                    ref={inputRef}
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Ask me anything..."
                    className="w-full bg-gray-800/70 text-white placeholder-gray-400 rounded-xl pl-4 pr-12 py-3 border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none resize-none custom-scrollbar"
                    rows="1"
                    disabled={isLoading}
                    style={{ minHeight: "50px", maxHeight: "120px" }}
                  />
                  <button
                    type="submit"
                    disabled={!inputText.trim() || isLoading}
                    className={`absolute right-3 p-2 rounded-full transition-all ${
                      inputText.trim() && !isLoading
                        ? "bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white transform hover:scale-105"
                        : "bg-gray-700 text-gray-500 cursor-not-allowed"
                    }`}
                    aria-label="Send message"
                  >
                    {isLoading ? (
                      <Loader2 size={20} className="animate-spin" />
                    ) : (
                      <Send size={20} />
                    )}
                  </button>
                </div>
                <button
                  type="button"
                  onClick={clearChat}
                  className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-xl border border-gray-700 transition-colors whitespace-nowrap h-[50px] flex items-center"
                >
                  Clear Chat
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center">
                AI can make mistakes. Consider verifying important information.
              </p>
            </form>
          </div>
        </div>
      )}

      {/* Add these styles to your global CSS or a style tag */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes scaleIn {
          from { 
            opacity: 0;
            transform: scale(0.95) translateY(20px);
          }
          to { 
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.3s ease-out;
        }
        
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #4f46e5 #1f2937;
        }
        
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #1f2937;
          border-radius: 3px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #4f46e5;
          border-radius: 3px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #6366f1;
        }
      `}</style>
    </>
  );
};

export default AIChatModal;