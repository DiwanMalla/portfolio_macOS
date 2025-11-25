"use client";

import { useState, FormEvent } from "react";
import { profile, terminalCommands } from "@/constants/profile";

interface HistoryItem {
  type: "input" | "output" | "error" | "ai";
  text: string;
}

export default function Terminal() {
  const [input, setInput] = useState("");
  const [chatMode, setChatMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([
    { type: "output", text: "Last login: " + new Date().toLocaleString() },
    {
      type: "output",
      text: `Welcome to ${profile.name.split(" ")[0]}'s portfolio terminal!`,
    },
    { type: "output", text: 'Type "help" for available commands.' },
  ]);

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
    } catch (error) {
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

    // Exit chat mode
    if (chatMode && (lowerCmd === "exit" || lowerCmd === "quit")) {
      setChatMode(false);
      setHistory((prev) => [
        ...prev,
        { type: "output", text: "Exited chat mode. Type 'help' for commands." },
      ]);
      return;
    }

    // If in chat mode, treat all input as chat queries
    if (chatMode) {
      await handleChatQuery(trimmedCmd);
      return;
    }

    // Enter chat mode
    if (lowerCmd === "chat" || lowerCmd === "ai") {
      setChatMode(true);
      setHistory((prev) => [
        ...prev,
        {
          type: "output",
          text: `🤖 Entering chat mode with ${
            profile.name.split(" ")[0]
          }'s Digital Twin...`,
        },
        {
          type: "output",
          text: "Ask me anything! Type 'exit' to return to terminal.",
        },
      ]);
      return;
    }

    if (lowerCmd === "clear") {
      setHistory([]);
      return;
    }

    if (terminalCommands[lowerCmd]) {
      const output = terminalCommands[lowerCmd];
      // output is string[] based on profile.ts definition
      output.forEach((line) => {
        setHistory((prev) => [...prev, { type: "output", text: line }]);
      });
      return;
    } else {
      setHistory((prev) => [
        ...prev,
        { type: "error", text: `Command not found: ${lowerCmd}` },
      ]);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleCommand(input);
    setInput("");
  };

  return (
    <div className="h-full bg-black p-4 font-mono text-sm overflow-auto">
      <div className="space-y-1">
        {history.map((item, index) => (
          <div key={index} className="flex gap-2">
            {item.type === "input" && (
              <>
                <span className="text-green-400">{chatMode ? "💬" : "➜"}</span>
                <span className="text-blue-400">~</span>
                <span className="text-white">{item.text}</span>
              </>
            )}
            {item.type === "output" && (
              <span className="text-gray-300">{item.text}</span>
            )}
            {item.type === "ai" && (
              <div className="text-cyan-300 whitespace-pre-wrap pl-4">
                <span className="text-cyan-500">
                  🤖 {profile.name.split(" ")[0]}:{" "}
                </span>
                {item.text}
              </div>
            )}
            {item.type === "error" && (
              <span className="text-red-400">{item.text}</span>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-2">
            <span className="text-cyan-400">⏳ Thinking...</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2 mt-2">
        <span className="text-green-400">{chatMode ? "💬" : "➜"}</span>
        <span className="text-blue-400">~</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-transparent text-white outline-none"
          autoFocus
          disabled={isLoading}
          placeholder={chatMode ? "Ask me anything..." : ""}
        />
      </form>
    </div>
  );
}
