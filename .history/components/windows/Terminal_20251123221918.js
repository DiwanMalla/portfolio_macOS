'use client';

import { useState, useEffect } from 'react';
import { Terminal as TerminalIcon } from 'lucide-react';

export default function Terminal() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    { type: 'output', text: 'Last login: ' + new Date().toLocaleString() },
    { type: 'output', text: 'Welcome to my portfolio terminal!' },
    { type: 'output', text: 'Type "help" for available commands.' },
  ]);

  const commands = {
    help: () => [
      'Available commands:',
      '  about    - Learn about me',
      '  skills   - View my technical skills',
      '  projects - See my projects',
      '  contact  - Get my contact information',
      '  clear    - Clear terminal',
      '  help     - Show this help message',
    ],
    about: () => [
      'Hi! I\'m a Full Stack Developer passionate about creating',
      'beautiful and functional web applications.',
    ],
    skills: () => [
      'Frontend: React, Next.js, TypeScript, Tailwind CSS',
      'Backend: Node.js, Python, PostgreSQL, MongoDB',
      'Tools: Git, Docker, AWS, Vercel',
    ],
    projects: () => [
      '1. E-commerce Platform - Full stack Next.js application',
      '2. Task Manager - React app with real-time updates',
      '3. Portfolio Website - Mac OS inspired portfolio (this!)',
    ],
    contact: () => [
      'Email: your.email@example.com',
      'GitHub: github.com/yourusername',
      'LinkedIn: linkedin.com/in/yourusername',
    ],
    clear: () => 'CLEAR',
  };

  const handleCommand = (cmd) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    
    setHistory((prev) => [...prev, { type: 'input', text: cmd }]);

    if (trimmedCmd === '') return;

    if (trimmedCmd === 'clear') {
      setHistory([]);
      return;
    }

    if (commands[trimmedCmd]) {
      const output = commands[trimmedCmd]();
      if (Array.isArray(output)) {
        output.forEach((line) => {
          setHistory((prev) => [...prev, { type: 'output', text: line }]);
        });
      }
    } else {
      setHistory((prev) => [
        ...prev,
        { type: 'error', text: `Command not found: ${trimmedCmd}` },
      ]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleCommand(input);
    setInput('');
  };

  return (
    <div className="h-full bg-black p-4 font-mono text-sm overflow-auto">
      <div className="space-y-1">
        {history.map((item, index) => (
          <div key={index} className="flex gap-2">
            {item.type === 'input' && (
              <>
                <span className="text-green-400">➜</span>
                <span className="text-blue-400">~</span>
                <span className="text-white">{item.text}</span>
              </>
            )}
            {item.type === 'output' && (
              <span className="text-gray-300">{item.text}</span>
            )}
            {item.type === 'error' && (
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
