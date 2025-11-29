"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function GitHubStats() {
  const username = "DiwanMalla";
  const [stats, setStats] = useState({
    repos: 0,
    followers: 0,
    following: 0,
  });

  useEffect(() => {
    // Fetch GitHub stats
    fetch(`https://api.github.com/users/${username}`)
      .then((res) => res.json())
      .then((data) => {
        setStats({
          repos: data.public_repos || 0,
          followers: data.followers || 0,
          following: data.following || 0,
        });
      })
      .catch((err) => console.error("Failed to fetch GitHub stats:", err));
  }, []);

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-gray-900 to-gray-800 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6 text-white">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center overflow-hidden">
            <Image
              src={`https://github.com/${username}.png`}
              alt="GitHub Avatar"
              width={64}
              height={64}
              className="rounded-full"
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold">@{username}</h1>
            <p className="text-white/80">GitHub Profile</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="p-6 grid grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-white/30 transition-all">
          <div className="text-3xl font-bold text-white">{stats.repos}</div>
          <div className="text-sm text-white/70">Repositories</div>
        </div>
        <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-white/30 transition-all">
          <div className="text-3xl font-bold text-white">{stats.followers}</div>
          <div className="text-sm text-white/70">Followers</div>
        </div>
        <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-white/30 transition-all">
          <div className="text-3xl font-bold text-white">{stats.following}</div>
          <div className="text-sm text-white/70">Following</div>
        </div>
      </div>

      {/* Contribution Graph */}
      <div className="flex-1 p-6 overflow-auto">
        <h2 className="text-xl font-bold text-white mb-4">📊 Contribution Graph</h2>
        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
          <img
            src={`https://ghchart.rshah.org/${username}`}
            alt="GitHub Contribution Graph"
            className="w-full rounded-lg"
            style={{ imageRendering: 'crisp-edges' }}
          />
        </div>

        {/* GitHub Streak Stats */}
        <div className="mt-6">
          <h2 className="text-xl font-bold text-white mb-4">🔥 Streak Stats</h2>
          <div className="bg-white/5 rounded-xl p-4 border border-white/10">
            <img
              src={`https://github-readme-streak-stats.herokuapp.com/?user=${username}&theme=dark&hide_border=true&background=0D1117&ring=3B82F6&fire=F59E0B&currStreakLabel=FFFFFF`}
              alt="GitHub Streak"
              className="w-full rounded-lg"
            />
          </div>
        </div>

        {/* GitHub Stats Card */}
        <div className="mt-6">
          <h2 className="text-xl font-bold text-white mb-4">📈 GitHub Stats</h2>
          <div className="bg-white/5 rounded-xl p-4 border border-white/10">
            <img
              src={`https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&theme=dark&hide_border=true&bg_color=0D1117&title_color=3B82F6&icon_color=3B82F6&text_color=FFFFFF`}
              alt="GitHub Stats"
              className="w-full rounded-lg"
            />
          </div>
        </div>

        {/* View on GitHub Button */}
        <div className="mt-6 flex justify-center">
          <a
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold rounded-full transition-all duration-300 hover:scale-105 shadow-lg"
          >
            <span className="flex items-center gap-2">
              <span>View Full Profile on GitHub</span>
              <span>→</span>
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}
