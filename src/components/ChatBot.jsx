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

// Theme configurations for different tabs
const themeConfigs = {
  courses: {
    gradient: "from-indigo-500 to-purple-600",
    gradientHover: "from-indigo-600 to-purple-700",
    headerGradient: "from-indigo-900/50 to-purple-900/50",
    shadow: "shadow-purple-500/50",
    shadowHover: "shadow-purple-600/60",
    ring: "border-indigo-300",
    accent: "text-purple-400",
    userBubble: "from-indigo-500 to-purple-600",
    userIcon: "bg-indigo-400",
    aiIcon: "bg-purple-500",
    focusBorder: "focus:border-purple-500",
    focusRing: "focus:ring-purple-500/20",
    scrollThumb: "#4f46e5",
    scrollThumbHover: "#6366f1"
  },
  exercises: {
    gradient: "from-green-500 to-emerald-600",
    gradientHover: "from-green-600 to-emerald-700",
    headerGradient: "from-green-900/50 to-emerald-900/50",
    shadow: "shadow-green-500/50",
    shadowHover: "shadow-green-600/60",
    ring: "border-green-300",
    accent: "text-emerald-400",
    userBubble: "from-green-500 to-emerald-600",
    userIcon: "bg-green-400",
    aiIcon: "bg-emerald-500",
    focusBorder: "focus:border-emerald-500",
    focusRing: "focus:ring-emerald-500/20",
    scrollThumb: "#10b981",
    scrollThumbHover: "#34d399"
  },
  "past-exams": {
    gradient: "from-amber-500 to-orange-600",
    gradientHover: "from-amber-600 to-orange-700",
    headerGradient: "from-amber-900/50 to-orange-900/50",
    shadow: "shadow-amber-500/50",
    shadowHover: "shadow-amber-600/60",
    ring: "border-amber-300",
    accent: "text-orange-400",
    userBubble: "from-amber-500 to-orange-600",
    userIcon: "bg-amber-400",
    aiIcon: "bg-orange-500",
    focusBorder: "focus:border-orange-500",
    focusRing: "focus:ring-orange-500/20",
    scrollThumb: "#f59e0b",
    scrollThumbHover: "#fbbf24"
  },
  progress: {
    gradient: "from-blue-500 to-cyan-600",
    gradientHover: "from-blue-600 to-cyan-700",
    headerGradient: "from-blue-900/50 to-cyan-900/50",
    shadow: "shadow-blue-500/50",
    shadowHover: "shadow-blue-600/60",
    ring: "border-blue-300",
    accent: "text-cyan-400",
    userBubble: "from-blue-500 to-cyan-600",
    userIcon: "bg-blue-400",
    aiIcon: "bg-cyan-500",
    focusBorder: "focus:border-cyan-500",
    focusRing: "focus:ring-cyan-500/20",
    scrollThumb: "#0ea5e9",
    scrollThumbHover: "#38bdf8"
  }
};

const AIChatModal = ({ theme = "courses" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const currentTheme = themeConfigs[theme] || themeConfigs.courses;
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
        className={`fixed bottom-6 right-6 w-20 h-20 rounded-full bg-gradient-to-br
         ${currentTheme.gradient} hover:${currentTheme.gradientHover} text-white shadow-2xl 
         ${currentTheme.shadow} hover:${currentTheme.shadowHover} transform hover:scale-105 transition-all duration-300 flex 
         flex-col items-center justify-center z-40 group`}
        aria-label="Open AI Assistant"
      >
        <div className="relative">
          <Bot size={32} className="animate-pulse" />
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
        </div>
        
        {/* Pulsing ring effect */}
        <div className={`absolute inset-0 rounded-full border-2 ${currentTheme.ring} animate-ping opacity-20`}></div>
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
            <div className={`flex items-center justify-between p-6 bg-gradient-to-r ${currentTheme.headerGradient} border-b border-gray-700`}>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${currentTheme.gradient} flex items-center justify-center`}>
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
            <div className="h-[calc(100%-200px)] overflow-y-auto p-4 space-y-4 custom-scrollbar" style={{ '--scroll-thumb': currentTheme.scrollThumb, '--scroll-thumb-hover': currentTheme.scrollThumbHover }}>
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"} animate-fadeInUp`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl p-4 ${
                      message.sender === "user"
                        ? `bg-gradient-to-r ${currentTheme.userBubble} text-white rounded-br-none`
                        : "bg-gray-800/70 text-gray-100 rounded-bl-none border border-gray-700"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`p-1 rounded-full ${message.sender === "user" ? currentTheme.userIcon : currentTheme.aiIcon}`}>
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
                      <Loader2 size={20} className={`animate-spin ${currentTheme.accent}`} />
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
                    className={`w-full bg-gray-800/70 text-white placeholder-gray-400 rounded-xl pl-4 pr-12 py-3 border border-gray-700 ${currentTheme.focusBorder} focus:ring-2 ${currentTheme.focusRing} focus:outline-none resize-none custom-scrollbar`}
                    rows="1"
                    disabled={isLoading}
                    style={{ minHeight: "50px", maxHeight: "120px" }}
                  />
                  <button
                    type="submit"
                    disabled={!inputText.trim() || isLoading}
                    className={`absolute right-3 p-2 rounded-full transition-all ${
                      inputText.trim() && !isLoading
                        ? `bg-gradient-to-r ${currentTheme.gradient} hover:${currentTheme.gradientHover} text-white transform hover:scale-105`
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
          scrollbar-color: var(--scroll-thumb, ${currentTheme.scrollThumb}) #1f2937;
        }
        
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #1f2937;
          border-radius: 3px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: var(--scroll-thumb, ${currentTheme.scrollThumb});
          border-radius: 3px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: var(--scroll-thumb-hover, ${currentTheme.scrollThumbHover});
        }
      `}</style>
    </>
  );
};

export default AIChatModal;