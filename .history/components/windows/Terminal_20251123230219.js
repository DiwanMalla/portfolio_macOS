"use client";

import { useState, useEffect } from "react";
import { profile, terminalCommands } from "@/constants/profile";

export default function Terminal() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([
    { type: "output", text: "Last login: " + new Date().toLocaleString() },
    {
      type: "output",
      text: `Welcome to ${profile.name.split(" ")[0]}'s portfolio terminal!`,
    },
    { type: "output", text: 'Type "help" for available commands.' },
  ]);

  const handleCommand = (cmd) => {
    const trimmedCmd = cmd.trim().toLowerCase();

    setHistory((prev) => [...prev, { type: "input", text: cmd }]);

    if (trimmedCmd === "") return;

    if (trimmedCmd === "clear") {
      setHistory([]);
      return;
    }

    if (terminalCommands[trimmedCmd]) {
      const output = terminalCommands[trimmedCmd];
      (Array.isArray(output) ? output : [output]).forEach((line) => {
        setHistory((prev) => [...prev, { type: "output", text: line }]);
      });
      return;
    } else {
      setHistory((prev) => [
        ...prev,
        { type: "error", text: `Command not found: ${trimmedCmd}` },
      ]);
    }
  };

  const handleSubmit = (e) => {
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
                <span className="text-green-400">➜</span>
                <span className="text-blue-400">~</span>
                <span className="text-white">{item.text}</span>
              </>
            )}
            {item.type === "output" && (
              <span className="text-gray-300">{item.text}</span>
            )}
            {item.type === "error" && (
              <span className="text-red-400">{item.text}</span>
            )}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2 mt-2">
        <span className="text-green-400">➜</span>
        <span className="text-blue-400">~</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-transparent text-white outline-none"
          autoFocus
        />
      </form>
    </div>
  );
}
