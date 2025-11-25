"use client";

import { useState, FormEvent, useEffect, useRef } from "react";
import { profile } from "@/constants/profile";

interface HistoryItem {
  type: "input" | "output" | "error" | "ai";
  text: string;
}

export default function Terminal() {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
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
      setHistory((prev) => [...prev, { type: "ai", text }]);
    } catch {
      setHistory((prev) => [
        ...prev,
        { type: "error", text: "Error: Unable to reach AI. Try again later." },
      ]);
    } finally {
      setIsLoading(false);
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

  return (
    <div className="h-full bg-linear-to-br from-gray-900 via-black to-gray-900 p-6 font-mono text-sm overflow-hidden flex flex-col">
      {/* Subtle grid background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }}></div>
      </div>

      {/* Content area with scroll */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto space-y-3 relative z-10 scrollbar-thin scrollbar-thumb-cyan-900 scrollbar-track-transparent"
      >
        {history.map((item, index) => (
          <div 
            key={index} 
            className="animate-fadeIn opacity-0"
            style={{
              animation: 'fadeIn 0.3s ease-out forwards',
              animationDelay: `${index * 0.05}s`
            }}
          >
            {item.type === "input" && (
              <div className="flex gap-2 items-start group">
                <span className="text-green-400 animate-pulse">💬</span>
                <span className="text-blue-400 font-bold">~</span>
                <span className="text-white flex-1">{item.text}</span>
              </div>
            )}
            {item.type === "output" && (
              <div className="text-gray-400 pl-2 border-l-2 border-gray-800">
                {item.text}
              </div>
            )}
            {item.type === "ai" && (
              <div className="bg-linear-to-r from-cyan-950/20 to-transparent border-l-2 border-cyan-500 pl-4 py-2 rounded-r">
                <div className="text-cyan-400 whitespace-pre-wrap">
                  <span className="text-cyan-300 font-bold flex items-center gap-2 mb-1">
                    <span className="animate-bounce inline-block">🤖</span>
                    {profile.name.split(" ")[0]}
                  </span>
                  <div className="text-gray-200 leading-relaxed">
                    {item.text}
                  </div>
                </div>
              </div>
            )}
            {item.type === "error" && (
              <div className="text-red-400 bg-red-950/20 border-l-2 border-red-500 pl-4 py-2 rounded-r">
                ⚠️ {item.text}
              </div>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-2 items-center text-cyan-400 animate-pulse">
            <span className="inline-block animate-spin">⏳</span>
            <span>Thinking...</span>
            <span className="flex gap-1">
              <span className="animate-bounce" style={{ animationDelay: '0s' }}>.</span>
              <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>.</span>
              <span className="animate-bounce" style={{ animationDelay: '0.4s' }}>.</span>
            </span>
          </div>
        )}
      </div>

      {/* Input form */}
      <form 
        onSubmit={handleSubmit} 
        className="flex gap-2 mt-4 pt-4 border-t border-gray-800 relative z-10 items-center"
      >
        <span className="text-green-400 text-lg animate-pulse">💬</span>
        <span className="text-blue-400 font-bold">~</span>
        <div className="flex-1 relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full bg-transparent text-white outline-none pr-4"
            autoFocus
            disabled={isLoading}
            placeholder="Ask me anything..."
          />
        </div>
        {input && (
          <button
            type="submit"
            className="text-cyan-400 hover:text-cyan-300 transition-colors"
            disabled={isLoading}
          >
            ↵
          </button>
        )}
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
          width: 6px;
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
