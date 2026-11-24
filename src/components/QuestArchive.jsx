import React, { useState } from 'react';
import { soundEngine } from '../utils/audio';
import { 
  FolderGit2, 
  ExternalLink, 
  Star, 
  GitFork, 
  Terminal, 
  Cpu, 
  Gamepad2, 
  Sparkles, 
  Bot, 
  Radio 
} from 'lucide-react';

export default function QuestArchive({ isSickoMode }) {
  const [filter, setFilter] = useState('all');

  const repos = [
    {
      name: '3d-Maze-Generator',
      url: 'https://github.com/hojjat-shafiee/3d-Maze-Generator',
      category: 'gamedev',
      stars: 0,
      language: 'C#',
      badge: 'PROCEDURAL ENGINE',
      badgeColor: 'border-cyan-500/40 text-cyan-300 bg-cyan-950/40',
      description: 'Algorithm-driven procedural 3D labyrinth generator with first-person runtime explorer and collision mesh optimization.',
      highlights: ['Recursive Backtracker & DFS', 'Dynamic Mesh Colliders', 'FPS Character Controller', 'Optimized Draw Calls']
    },
    {
      name: 'figma-mcp-browser',
      url: 'https://github.com/hojjat-shafiee/figma-mcp-browser',
      category: 'aimcp',
      stars: 3,
      language: 'JavaScript',
      badge: 'AI PROTOCOL / MCP',
      badgeColor: 'border-purple-500/40 text-purple-300 bg-purple-950/40',
      description: 'Free Model Context Protocol (MCP) server for automating Figma design queries, live component inspection, and vector asset exports.',
      highlights: ['Model Context Protocol (MCP)', 'Figma REST API', 'Live Component Tree', 'AI Tool Calling']
    },
    {
      name: 'mumble-server-rest-api',
      url: 'https://github.com/hojjat-shafiee/mumble-server-rest-api',
      category: 'backend',
      stars: 1,
      language: 'Python',
      badge: 'HIGH-PERF BACKEND',
      badgeColor: 'border-emerald-500/40 text-emerald-300 bg-emerald-950/40',
      description: 'Asynchronous RESTful API for Mumble Murmur servers leveraging FastAPI and ZeroC ICE RPC for high-throughput voice server management.',
      highlights: ['FastAPI (AsyncIO)', 'ZeroC ICE Remote Procedure Calls', 'Pytest Suite & Docker', 'Server Fleet Orchestration']
    },
    {
      name: 'Tidebreak',
      url: 'https://github.com/hojjat-shafiee/Tidebreak',
      category: 'gamedev',
      stars: 0,
      language: 'JavaScript',
      badge: 'GITHUB GAME OFF',
      badgeColor: 'border-amber-500/40 text-amber-300 bg-amber-950/40',
      description: 'Official GitHub Game Off 2025 game jam entry featuring fluid wave collection mechanics, retro-arcade dynamics, and responsive controls.',
      highlights: ['GitHub Game Off 2025 Entry', 'Fluid Wave Mechanics', 'Custom Arcade Physics', 'Zero External Libs']
    },
    {
      name: 'TerrainGenerator',
      url: 'https://github.com/hojjat-shafiee/TerrainGenerator',
      category: 'gamedev',
      stars: 0,
      language: 'C#',
      badge: 'TERRAIN ALGORITHMS',
      badgeColor: 'border-cyan-500/40 text-cyan-300 bg-cyan-950/40',
      description: 'Procedural landscape generator for the Unity game engine using noise algorithms, multi-octave heightmaps, and customizable biomes.',
      highlights: ['Perlin & Simplex Noise', 'Chunk-based LOD', 'Dynamic Mesh Deform', 'Custom Gradient Texturing']
    },
    {
      name: 'qoder-unity-mcp',
      url: 'https://github.com/hojjat-shafiee/qoder-unity-mcp',
      category: 'aimcp',
      stars: 0,
      language: 'PowerShell',
      badge: 'AI UNITY AGENT',
      badgeColor: 'border-purple-500/40 text-purple-300 bg-purple-950/40',
      description: 'Model Context Protocol (MCP) bridge enabling AI agents to issue live commands, create GameObjects, and inspect hierarchy inside Unity Editor.',
      highlights: ['Unity Editor Automation', 'AI Agent Tool Dispatch', 'PowerShell Bridge', 'Live Scene Graph Inspector']
    },
    {
      name: 'Mumble-Unity',
      url: 'https://github.com/hojjat-shafiee/Mumble-Unity',
      category: 'gamedev',
      stars: 0,
      language: 'C#',
      badge: 'SPATIAL VOIP',
      badgeColor: 'border-emerald-500/40 text-emerald-300 bg-emerald-950/40',
      description: 'Performant spatial audio Mumble VoIP client implementation for Unity3D supporting 3D positional audio in multiplayer lobbies.',
      highlights: ['3D Positional Audio Attenuation', 'Low-Latency UDP Voice', 'Custom Audio Filter Hook', 'Multiplayer Ready']
    },
    {
      name: 'Dino',
      url: 'https://github.com/hojjat-shafiee/Dino',
      category: 'gamedev',
      stars: 0,
      language: 'ShaderLab',
      badge: 'UNITY 2D RUNNER',
      badgeColor: 'border-rose-500/40 text-rose-300 bg-rose-950/40',
      description: 'Polished clone of the classic offline Dino runner built in Unity, designed as an educational reference for endless runner architecture.',
      highlights: ['Parallax Scrolling', 'Object Pooling Architecture', 'Custom ShaderLab Effects', 'Crisp Jump Physics']
    },
    {
      name: 'WheelOfLuck',
      url: 'https://github.com/hojjat-shafiee/WheelOfLuck',
      category: 'gamedev',
      stars: 0,
      language: 'ShaderLab',
      badge: 'SHADERS & PHYSICS',
      badgeColor: 'border-cyan-500/40 text-cyan-300 bg-cyan-950/40',
      description: 'Wheel of fortune mechanics with weighted probability algorithms, particle systems, and custom Unity shaders for arcade titles.',
      highlights: ['Custom Shaders', 'Configurable Reward Weights', 'Dynamic Deceleration Curve', 'Haptic Sound Sync']
    },
    {
      name: 'UnityMainThreadDispatcher',
      url: 'https://github.com/hojjat-shafiee/hojjat-shafiee',
      category: 'backend',
      stars: 0,
      language: 'C#',
      badge: 'CONCURRENCY CORE',
      badgeColor: 'border-purple-500/40 text-purple-300 bg-purple-950/40',
      description: 'Thread-safe dispatcher utility to execute background threads and async network sockets back onto Unitys primary thread cleanly.',
      highlights: ['Lock-free Queueing', 'Coroutines from Background Threads', 'Zero Main-Thread Freezes', 'High Throughput']
    }
  ];

  const filteredRepos = repos.filter(
    (repo) => filter === 'all' || repo.category === filter
  );

  return (
    <section id="quests" className="py-12 relative">
      <div className="flex flex-col md:flex-row items-start justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-bold tracking-widest uppercase">
            <FolderGit2 className="w-4 h-4 text-cyan-400" />
            QUEST DIRECTORY // PUBLIC REPOSITORIES
          </div>
          <h2 className="text-2xl md:text-3xl font-orbitron font-bold text-slate-100 uppercase tracking-tight mt-1">
            Active Quests & Codebases
          </h2>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-900/80 p-1.5 rounded border border-cyan-500/20 backdrop-blur-md">
          <button
            onClick={() => {
              soundEngine.playClick();
              setFilter('all');
            }}
            onMouseEnter={() => soundEngine.playHover()}
            className={`px-3 py-1 text-xs font-rajdhani font-bold rounded transition-all ${
              filter === 'all'
                ? 'bg-cyan-500 text-black shadow-md shadow-cyan-500/30'
                : 'text-slate-400 hover:text-cyan-400'
            }`}
          >
            ALL [{repos.length}]
          </button>
          <button
            onClick={() => {
              soundEngine.playClick();
              setFilter('gamedev');
            }}
            onMouseEnter={() => soundEngine.playHover()}
            className={`px-3 py-1 text-xs font-rajdhani font-bold rounded transition-all flex items-center gap-1 ${
              filter === 'gamedev'
                ? 'bg-purple-500 text-black shadow-md shadow-purple-500/30'
                : 'text-slate-400 hover:text-purple-400'
            }`}
          >
            <Gamepad2 className="w-3 h-3" />
            GAME DEV
          </button>
          <button
            onClick={() => {
              soundEngine.playClick();
              setFilter('aimcp');
            }}
            onMouseEnter={() => soundEngine.playHover()}
            className={`px-3 py-1 text-xs font-rajdhani font-bold rounded transition-all flex items-center gap-1 ${
              filter === 'aimcp'
                ? 'bg-amber-500 text-black shadow-md shadow-amber-500/30'
                : 'text-slate-400 hover:text-amber-400'
            }`}
          >
            <Bot className="w-3 h-3" />
            AI & MCP
          </button>
          <button
            onClick={() => {
              soundEngine.playClick();
              setFilter('backend');
            }}
            onMouseEnter={() => soundEngine.playHover()}
            className={`px-3 py-1 text-xs font-rajdhani font-bold rounded transition-all flex items-center gap-1 ${
              filter === 'backend'
                ? 'bg-emerald-500 text-black shadow-md shadow-emerald-500/30'
                : 'text-slate-400 hover:text-emerald-400'
            }`}
          >
            <Radio className="w-3 h-3" />
            BACKEND & VOIP
          </button>
        </div>
      </div>

      {/* Grid of Projects */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredRepos.map((repo, idx) => (
          <div
            key={idx}
            onMouseEnter={() => soundEngine.playHover()}
            className="hud-panel rounded-lg p-5 flex flex-col justify-between group hover:border-cyan-400 transition-all duration-300 hover:scale-[1.01]"
          >
            <div>
              {/* Badge & Stars Header */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded border ${repo.badgeColor}`}>
                  {repo.badge}
                </span>

                <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                  {repo.stars > 0 && (
                    <span className="flex items-center gap-1 text-amber-400">
                      <Star className="w-3 h-3 fill-amber-400" />
                      {repo.stars}
                    </span>
                  )}
                  <span className="text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/20 text-[10px]">
                    {repo.language}
                  </span>
                </div>
              </div>

              {/* Title */}
              <a
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-base font-orbitron font-bold text-slate-100 group-hover:text-cyan-300 flex items-center justify-between gap-2 transition-colors mb-2"
              >
                <span>{repo.name}</span>
                <ExternalLink className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-cyan-400" />
              </a>

              {/* Description */}
              <p className="text-xs font-mono text-slate-300 leading-relaxed mb-4">
                {repo.description}
              </p>

              {/* Highlights List */}
              <div className="space-y-1 mb-4 border-l-2 border-slate-800 pl-2.5">
                {repo.highlights.map((h, hIdx) => (
                  <div key={hIdx} className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-cyan-400/60" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
              <span className="text-[10px] font-mono text-slate-500">
                STATUS: DEPLOYED / OPEN-SOURCE
              </span>
              <a
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundEngine.playClick()}
                className="text-xs font-rajdhani font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 group-hover:underline"
              >
                <span>INSPECT REPO</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="corner-tl" />
            <div className="corner-tr" />
            <div className="corner-bl" />
            <div className="corner-br" />
          </div>
        ))}
      </div>
    </section>
  );
}
