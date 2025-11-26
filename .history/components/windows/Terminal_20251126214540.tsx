"use client";

import { useState, FormEvent, useEffect, useRef } from "react";
import { Send, Trash2, Sparkles } from "lucide-react";
import { profile } from "@/constants/profile";

interface HistoryItem {
  type: "input" | "output" | "error" | "ai";
  text: string;
}

export default function Terminal() {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [history, setHistory] = useState<HistoryItem[]>([
    { type: "output", text: "Last login: " + new Date().toLocaleString() },
    {
      type: "output",
      text: `💬 Chat with ${profile.name.split(" ")[0]}'s AI Digital Twin`,
    },
    { type: "output", text: "Ask me about skills, projects, or experience..." },
  ]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history, isLoading]);

  const handleChatQuery = async (query: string) => {
    setIsLoading(true);

    // Add a placeholder for the AI response that we'll update
    const aiMessageIndex = history.length + 1;
    setHistory((prev) => [...prev, { type: "ai", text: "" }]);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [{ role: "user", content: query }],
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const text = await response.text();

      // Stream the text word by word
      setIsLoading(false);
      const words = text.split(" ");
      let currentText = "";

      for (let i = 0; i < words.length; i++) {
        currentText += (i > 0 ? " " : "") + words[i];
        setHistory((prev) => {
          const newHistory = [...prev];
          newHistory[aiMessageIndex] = { type: "ai", text: currentText };
          return newHistory;
        });
        // Adjust delay for smoother streaming (30ms between words)
        await new Promise((resolve) => setTimeout(resolve, 30));
      }
    } catch {
      setIsLoading(false);
      setHistory((prev) => {
        const newHistory = [...prev];
        newHistory[aiMessageIndex] = {
          type: "error",
          text: "Error: Unable to reach AI. Try again later.",
        };
        return newHistory;
      });
    }
  };

  const handleCommand = async (cmd: string) => {
    const trimmedCmd = cmd.trim();
    const lowerCmd = trimmedCmd.toLowerCase();

    setHistory((prev) => [...prev, { type: "input", text: cmd }]);

    if (trimmedCmd === "") return;

    // Clear command
    if (lowerCmd === "clear") {
      setHistory([]);
      return;
    }

    // All other input is treated as chat queries
    await handleChatQuery(trimmedCmd);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleCommand(input);
    setInput("");
  };

  const handleClear = () => {
    setHistory([]);
  };

  // Quick suggestions for mobile
  const suggestions = [
    "What are your skills?",
    "Tell me about your projects",
    "Your experience?",
  ];

  return (
    <div className="h-full bg-linear-to-br from-gray-900 via-black to-gray-900 p-3 sm:p-6 font-mono text-xs sm:text-sm overflow-hidden flex flex-col relative">
      {/* Subtle grid background */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        ></div>
      </div>

      {/* Mobile Header */}
      <div className="flex items-center justify-between mb-3 sm:mb-4 relative z-10">
        <div className="flex items-center gap-2">
          <Sparkles size={18} className="text-cyan-400" />
          <span className="text-cyan-300 font-bold text-sm sm:text-base">
            {profile.name.split(" ")[0]} AI
          </span>
        </div>
        <button
          onClick={handleClear}
          className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-950/30 rounded-lg transition-colors"
          title="Clear chat"
        >
          <Trash2 size={16} />
        </button>
      </div>

      {/* Quick Suggestions - Mobile Only */}
      {history.length <= 3 && (
        <div className="flex flex-wrap gap-2 mb-3 relative z-10 sm:hidden">
          {suggestions.map((suggestion, idx) => (
            <button
              key={idx}
              onClick={() => {
                setInput(suggestion);
                inputRef.current?.focus();
              }}
              className="px-3 py-1.5 text-xs bg-cyan-950/40 text-cyan-300 rounded-full border border-cyan-800/50 hover:bg-cyan-900/50 active:scale-95 transition-all"
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}

      {/* Content area with scroll */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto space-y-2 sm:space-y-3 relative z-10 scrollbar-thin scrollbar-thumb-cyan-900 scrollbar-track-transparent"
      >
        {history.map((item, index) => (
          <div
            key={index}
            className="animate-fadeIn opacity-0"
            style={{
              animation: "fadeIn 0.3s ease-out forwards",
              animationDelay: `${index * 0.05}s`,
            }}
          >
            {item.type === "input" && (
              <div className="flex gap-2 items-start group">
                <span className="text-green-400 animate-pulse text-sm sm:text-base">💬</span>
                <span className="text-blue-400 font-bold hidden sm:inline">~</span>
                <span className="text-white flex-1 text-xs sm:text-sm break-words">{item.text}</span>
              </div>
            )}
            {item.type === "output" && (
              <div className="text-gray-400 pl-2 border-l-2 border-gray-800 text-xs sm:text-sm">
                {item.text}
              </div>
            )}
            {item.type === "ai" && (
              <div className="bg-linear-to-r from-cyan-950/20 to-transparent border-l-2 border-cyan-500 pl-2 sm:pl-4 py-2 rounded-r">
                <div className="text-cyan-400 whitespace-pre-wrap">
                  <span className="text-cyan-300 font-bold flex items-center gap-1 sm:gap-2 mb-1 text-xs sm:text-sm">
                    <span className="animate-bounce inline-block">🤖</span>
                    {profile.name.split(" ")[0]}
                  </span>
                  <div className="text-gray-200 leading-relaxed text-xs sm:text-sm break-words">
                    {item.text}
                  </div>
                </div>
              </div>
            )}
            {item.type === "error" && (
              <div className="text-red-400 bg-red-950/20 border-l-2 border-red-500 pl-2 sm:pl-4 py-2 rounded-r text-xs sm:text-sm">
                ⚠️ {item.text}
              </div>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-2 items-center text-cyan-400 animate-pulse text-xs sm:text-sm">
            <span className="inline-block animate-spin">⏳</span>
            <span>Thinking...</span>
            <span className="flex gap-1">
              <span className="animate-bounce" style={{ animationDelay: "0s" }}>
                .
              </span>
              <span
                className="animate-bounce"
                style={{ animationDelay: "0.2s" }}
              >
                .
              </span>
              <span
                className="animate-bounce"
                style={{ animationDelay: "0.4s" }}
              >
                .
              </span>
            </span>
          </div>
        )}
      </div>

      {/* Input form - Responsive */}
      <form
        onSubmit={handleSubmit}
        className="flex gap-2 mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-800 relative z-10 items-center"
      >
        <div className="flex-1 flex items-center gap-2 bg-gray-800/50 rounded-xl px-3 py-2 sm:py-2.5 border border-gray-700 focus-within:border-cyan-600 transition-colors">
          <span className="text-green-400 text-sm sm:text-lg">💬</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent text-white outline-none text-sm sm:text-base min-w-0"
            autoFocus
            disabled={isLoading}
            placeholder="Ask me anything..."
          />
        </div>
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="p-2.5 sm:p-3 bg-cyan-600 hover:bg-cyan-500 disabled:bg-gray-700 disabled:text-gray-500 text-white rounded-xl transition-colors active:scale-95 flex-shrink-0"
        >
          <Send size={18} className="sm:w-5 sm:h-5" />
        </button>
      </form>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .scrollbar-thin::-webkit-scrollbar {
          width: 4px;
        }

        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }

        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: #0e7490;
          border-radius: 3px;
        }

        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: #0891b2;
        }
      `}</style>
    </div>
  );
}
