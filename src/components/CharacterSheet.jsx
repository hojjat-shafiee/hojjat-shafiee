import React, { useState } from 'react';
import { soundEngine } from '../utils/audio';
import { Shield, Zap, Sparkles, Award, Cpu, Radio, Flame, Crosshair } from 'lucide-react';

export default function CharacterSheet({ isSickoMode }) {
  const [selectedPerk, setSelectedPerk] = useState(0);

  const stats = [
    { name: 'STR', label: 'Engine Architecture (Unity 6 / C#)', val: 99, color: 'text-cyan-400', bar: 'bg-cyan-400' },
    { name: 'INT', label: 'Procedural Generation & Math', val: 95, color: 'text-purple-400', bar: 'bg-purple-400' },
    { name: 'DEX', label: 'Multithreading & VoIP (ZeroC ICE)', val: 94, color: 'text-emerald-400', bar: 'bg-emerald-400' },
    { name: 'CON', label: 'Deep Debugging & 48D Streak', val: 99, color: 'text-amber-400', bar: 'bg-amber-400' },
    { name: 'PER', label: 'ShaderLab, HLSL & Dynamic Mesh', val: 88, color: 'text-rose-400', bar: 'bg-rose-400' },
    { name: 'CHA', label: 'Open to Work & Multiplayer Co-op', val: 90, color: 'text-blue-400', bar: 'bg-blue-400' },
  ];

  const perks = [
    {
      title: 'Zero-Allocation Garbage Collector',
      tier: 'LEGENDARY',
      desc: 'Optimizes runtime memory budgets in Unity C# to eliminate micro-stutters and GC pressure in performance-critical loops.',
      icon: Cpu,
      color: 'border-cyan-500/50 text-cyan-300'
    },
    {
      title: 'Procedural Mesh & Noise Architect',
      tier: 'MYTHIC',
      desc: 'Synthesizes procedural 3D labyrinths, dynamic heightmaps, and endless terrains using customized mathematical noise algorithms.',
      icon: Sparkles,
      color: 'border-purple-500/50 text-purple-300'
    },
    {
      title: 'Spatial Audio & Mumble VoIP Pipeline',
      tier: 'EPIC',
      desc: 'Builds low-latency, real-time spatial voice communication pipelines for multiplayer game environments with ZeroC ICE & FastAPI.',
      icon: Radio,
      color: 'border-emerald-500/50 text-emerald-300'
    },
    {
      title: 'Model Context Protocol (MCP) AI Bridge',
      tier: 'CYBER',
      desc: 'Connects AI LLM agents directly into live Unity Editors (qoder-unity-mcp) and Figma asset automation systems.',
      icon: Zap,
      color: 'border-amber-500/50 text-amber-300'
    }
  ];

  return (
    <section id="character-sheet" className="py-12 relative">
      <div className="flex flex-col md:flex-row items-start justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-bold tracking-widest uppercase">
            <Crosshair className="w-4 h-4 text-cyan-400 animate-spin" />
            TELEMETRY MATRIX // RPG ATTRIBUTES
          </div>
          <h2 className="text-2xl md:text-3xl font-orbitron font-bold text-slate-100 uppercase tracking-tight mt-1">
            Character Sheet & Vitals
          </h2>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs bg-slate-900/80 px-4 py-2 rounded border border-cyan-500/25 backdrop-blur-md">
          <span className="text-slate-400">CLASS:</span>
          <span className="text-cyan-300 font-bold">GAMEPLAY ARCHITECT</span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-400">LEVEL:</span>
          <span className="text-purple-400 font-bold">99 (10+ YRS)</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Vitals Gauges & Radar Bars */}
        <div className="lg:col-span-7 hud-panel rounded-lg p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-cyan-500/20 pb-3">
            <span className="text-xs font-orbitron font-bold text-slate-200 tracking-wider">
              VITALITY GAUGES
            </span>
            <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              STATUS: NOMINAL
            </span>
          </div>

          {/* HP / MANA / EXP Bars */}
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs font-mono mb-1">
                <span className="text-rose-400 font-bold flex items-center gap-1">
                  HP [DEBUG STAMINA]: 100 / 100
                </span>
                <span className="text-slate-400">High Caffeine Tolerance</span>
              </div>
              <div className="w-full h-3 bg-slate-900 rounded-xs overflow-hidden border border-rose-500/40 p-0.5">
                <div className="h-full bg-linear-to-r from-rose-600 to-rose-400 w-full rounded-xs shadow-sm shadow-rose-500/50" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono mb-1">
                <span className="text-cyan-400 font-bold flex items-center gap-1">
                  MANA [PROCEDURAL SYNTHESIS]: 92 / 100
                </span>
                <span className="text-slate-400">Dynamic Mesh & Algorithms</span>
              </div>
              <div className="w-full h-3 bg-slate-900 rounded-xs overflow-hidden border border-cyan-500/40 p-0.5">
                <div className="h-full bg-linear-to-r from-cyan-600 to-cyan-400 w-[92%] rounded-xs shadow-sm shadow-cyan-500/50" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono mb-1">
                <span className="text-purple-400 font-bold flex items-center gap-1">
                  EXP [CAREER PROGRESSION]: 98%
                </span>
                <span className="text-slate-400">1,400+ Lifetime Git Contributions</span>
              </div>
              <div className="w-full h-3 bg-slate-900 rounded-xs overflow-hidden border border-purple-500/40 p-0.5">
                <div className="h-full bg-linear-to-r from-purple-600 to-purple-400 w-[98%] rounded-xs shadow-sm shadow-purple-500/50" />
              </div>
            </div>
          </div>

          {/* RPG Stats Breakdown */}
          <div className="border-t border-cyan-500/20 pt-4">
            <span className="text-xs font-orbitron font-bold text-slate-300 block mb-3">
              BASE ATTRIBUTE TELEMETRY
            </span>
            <div className="space-y-3">
              {stats.map((s, idx) => (
                <div 
                  key={idx}
                  onMouseEnter={() => soundEngine.playHover()}
                  className="group p-2 rounded bg-slate-900/40 hover:bg-slate-900 border border-transparent hover:border-cyan-500/30 transition-all cursor-default"
                >
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="flex items-center gap-2">
                      <b className={`${s.color} font-orbitron`}>[{s.name}]</b>
                      <span className="text-slate-300">{s.label}</span>
                    </span>
                    <span className={`${s.color} font-bold`}>{s.val}/99</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${s.bar} rounded-full transition-all duration-500`}
                      style={{ width: `${s.val}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="corner-tl" />
          <div className="corner-tr" />
          <div className="corner-bl" />
          <div className="corner-br" />
        </div>

        {/* Right Column: Equipped Perks & Specializations */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="hud-panel rounded-lg p-5 flex-1">
            <div className="flex items-center justify-between border-b border-purple-500/20 pb-3 mb-4">
              <span className="text-xs font-orbitron font-bold text-purple-300 tracking-wider flex items-center gap-2">
                <Award className="w-4 h-4 text-purple-400" />
                ACTIVE PERKS & MASTERIES
              </span>
              <span className="text-[10px] font-mono text-slate-400">4 / 4 EQUIPPED</span>
            </div>

            <div className="space-y-3">
              {perks.map((perk, idx) => {
                const Icon = perk.icon;
                const isSelected = selectedPerk === idx;
                return (
                  <div
                    key={idx}
                    onClick={() => {
                      soundEngine.playClick();
                      setSelectedPerk(idx);
                    }}
                    onMouseEnter={() => soundEngine.playHover()}
                    className={`p-3.5 rounded border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-purple-950/40 border-purple-400 shadow-md shadow-purple-500/20'
                        : 'bg-slate-900/60 border-slate-800 hover:border-purple-500/40'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <div className="flex items-center gap-2">
                        <Icon className={`w-4 h-4 ${isSelected ? 'text-purple-400' : 'text-slate-400'}`} />
                        <h4 className="text-xs font-orbitron font-bold text-slate-100">
                          {perk.title}
                        </h4>
                      </div>
                      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-slate-950 border border-purple-500/30 text-purple-300 font-bold">
                        {perk.tier}
                      </span>
                    </div>
                    <p className="text-[11px] font-mono text-slate-400 leading-relaxed pl-6">
                      {perk.desc}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="corner-tl" />
            <div className="corner-tr" />
            <div className="corner-bl" />
            <div className="corner-br" />
          </div>

          {/* Quick Stats Callout Card */}
          <div className="hud-panel rounded-lg p-4 border border-cyan-500/20 flex items-center justify-around text-center">
            <div>
              <span className="text-[10px] font-mono text-slate-400 uppercase block">Engine Exp</span>
              <span className="text-lg font-orbitron font-bold text-cyan-400">10+ YRS</span>
            </div>
            <div className="w-px h-8 bg-cyan-500/20" />
            <div>
              <span className="text-[10px] font-mono text-slate-400 uppercase block">Active Streak</span>
              <span className="text-lg font-orbitron font-bold text-amber-400">48 DAYS</span>
            </div>
            <div className="w-px h-8 bg-cyan-500/20" />
            <div>
              <span className="text-[10px] font-mono text-slate-400 uppercase block">Live Titles</span>
              <span className="text-lg font-orbitron font-bold text-purple-400">12+ REPOS</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
