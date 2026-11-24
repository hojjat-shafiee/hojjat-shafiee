import React, { useState } from 'react';
import { soundEngine } from '../utils/audio';
import { Sword, Shield, Crosshair, Terminal, Code2, Server, Cpu, Layers } from 'lucide-react';

export default function ArmoryLoadout({ isSickoMode }) {
  const [activeCategory, setActiveCategory] = useState('offensive');

  const categories = [
    {
      id: 'offensive',
      label: 'Offensive Systems // Engine & Shaders',
      icon: Sword,
      color: 'text-cyan-400 border-cyan-400',
      items: [
        {
          name: 'Unity Engine (6 / LTS)',
          role: 'Primary Architecture',
          tags: ['C#', 'DOTS', 'Job System', 'Physics'],
          level: '99%',
          desc: '10+ years architecting scalable game loops, memory-efficient state machines, and cross-platform builds.'
        },
        {
          name: 'HLSL & ShaderLab',
          role: 'Render Pipeline',
          tags: ['Custom Shaders', 'Post-Processing', 'URP'],
          level: '92%',
          desc: 'Authoring custom vertex displacement, water shaders, CRT distortion, and scanline rendering.'
        },
        {
          name: 'Procedural Mesh Synthesis',
          role: 'World Generation',
          tags: ['Perlin Noise', 'Heightmaps', 'Dynamic UVs'],
          level: '96%',
          desc: 'Algorithmic terrain and 3D maze generators created at runtime with zero asset store dependencies.'
        },
        {
          name: 'Blender 3D Modeling',
          role: 'Asset Pipeline',
          tags: ['Low-Poly', 'UV Unwrapping', 'Modular Kits'],
          level: '85%',
          desc: 'Hard-surface modeling, modular kit design, and optimized asset import pipelines into Unity.'
        }
      ]
    },
    {
      id: 'defensive',
      label: 'Defensive Systems // Backend & VoIP',
      icon: Shield,
      color: 'text-purple-400 border-purple-400',
      items: [
        {
          name: 'Python 3.12 & FastAPI',
          role: 'Async Server Core',
          tags: ['AsyncIO', 'REST', 'Pydantic', 'Pytest'],
          level: '94%',
          desc: 'High-throughput asynchronous REST APIs (mumble-server-rest-api) built for real-time game server fleets.'
        },
        {
          name: 'ZeroC ICE RPC',
          role: 'Binary Protocol',
          tags: ['Mumble Murmur', 'RPC', 'Low Latency'],
          level: '91%',
          desc: 'Deep integration with Mumble VoIP daemon internals for programmatic user registration and audio channels.'
        },
        {
          name: 'Mumble Spatial Audio VoIP',
          role: 'Multiplayer Voice',
          tags: ['Unity3D', 'Spatial Audio', 'UDP'],
          level: '93%',
          desc: 'Low-latency positional audio communication system integrated directly into Unity game clients.'
        },
        {
          name: 'Docker & Linux Systems',
          role: 'Infrastructure',
          tags: ['Debian', 'Containers', 'DevOps'],
          level: '88%',
          desc: 'Microservices containerization, headless dedicated server deployment, and automated testing.'
        }
      ]
    },
    {
      id: 'tactical',
      label: 'Tactical Gear // AI & MCP Protocols',
      icon: Crosshair,
      color: 'text-emerald-400 border-emerald-400',
      items: [
        {
          name: 'Model Context Protocol (MCP)',
          role: 'AI Agent Integrations',
          tags: ['qoder-unity-mcp', 'figma-mcp-browser', 'JSON-RPC'],
          level: '95%',
          desc: 'Building MCP servers connecting modern AI agents (Claude, Gemini) to live game editors and design canvases.'
        },
        {
          name: 'Figma UI/UX Design',
          role: 'Interface Architecture',
          tags: ['Design Systems', 'HUD Mockups', 'Prototypes'],
          level: '90%',
          desc: 'Crafting responsive game menus, HUD layouts, and bridging designs to code via custom MCP tools.'
        },
        {
          name: 'PowerShell & Bash Automation',
          role: 'Tooling & CI/CD',
          tags: ['Automation Scripts', 'Build Pipelines'],
          level: '89%',
          desc: 'Custom developer scripts automating asset compression, build pipelines, and server provisioning.'
        },
        {
          name: 'UnityMainThreadDispatcher',
          role: 'Threading Utility',
          tags: ['Multithreading', 'Task Parallelism', 'C#'],
          level: '98%',
          desc: 'Ensuring thread-safe communications between background network/AI workers and Unity main loop.'
        }
      ]
    }
  ];

  return (
    <section id="armory" className="py-12 relative">
      <div className="flex flex-col md:flex-row items-start justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-bold tracking-widest uppercase">
            <Layers className="w-4 h-4 text-cyan-400" />
            WEAPON LOADOUT // TECHNICAL ARSENAL
          </div>
          <h2 className="text-2xl md:text-3xl font-orbitron font-bold text-slate-100 uppercase tracking-tight mt-1">
            The Armory & Tech Stack
          </h2>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-900/80 p-1.5 rounded border border-cyan-500/20 backdrop-blur-md">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  soundEngine.playClick();
                  setActiveCategory(cat.id);
                }}
                onMouseEnter={() => soundEngine.playHover()}
                className={`px-3 py-1.5 text-xs font-rajdhani font-bold rounded transition-all flex items-center gap-2 ${
                  isActive
                    ? 'bg-cyan-500 text-black shadow-md shadow-cyan-500/30'
                    : 'text-slate-400 hover:text-cyan-400 hover:bg-cyan-950/40'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.id.toUpperCase()}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Loadout Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {categories
          .find((c) => c.id === activeCategory)
          ?.items.map((item, idx) => (
            <div
              key={idx}
              onMouseEnter={() => soundEngine.playHover()}
              className="hud-panel rounded-lg p-5 flex flex-col justify-between group hover:border-cyan-400 transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider font-bold">
                    {item.role}
                  </span>
                  <span className="text-xs font-orbitron font-bold text-slate-200 bg-slate-900/80 px-2 py-0.5 rounded border border-slate-700">
                    {item.level}
                  </span>
                </div>

                <h3 className="text-sm font-orbitron font-bold text-slate-100 mb-2 group-hover:text-cyan-300 transition-colors">
                  {item.name}
                </h3>

                <p className="text-xs font-mono text-slate-400 leading-relaxed mb-4">
                  {item.desc}
                </p>
              </div>

              <div>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {item.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/40 text-cyan-300 border border-cyan-500/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Level Bar */}
                <div className="w-full h-1 bg-slate-900 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-cyan-400 rounded-full transition-all duration-500"
                    style={{ width: item.level }}
                  />
                </div>
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
