import React from 'react';
import { soundEngine } from '../utils/audio';
import { 
  Terminal, 
  Volume2, 
  VolumeX, 
  Tv, 
  Zap, 
  Flame, 
  Radio,
  Gamepad2,
  Cpu
} from 'lucide-react';

export default function HUDHeader({
  isSickoMode,
  onToggleSickoMode,
  isMuted,
  onToggleMute,
  isCrtOn,
  onToggleCrt,
  onOpenTerminal
}) {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#050811]/90 backdrop-blur-md border-b border-cyan-500/25 px-4 lg:px-8 py-3">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Left: Callsign & Status */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className={`w-10 h-10 rounded border ${isSickoMode ? 'border-rose-500 bg-rose-950/40' : 'border-cyan-400 bg-cyan-950/40'} flex items-center justify-center overflow-hidden`}>
              <img 
                src="https://avatars.githubusercontent.com/u/13509695?v=4" 
                alt="Hojjat Shafiee" 
                className="w-full h-full object-cover filter contrast-125"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
              <span className="text-xs font-orbitron font-bold text-cyan-400">HS</span>
            </div>
            <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-black animate-pulse" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm font-orbitron font-bold tracking-wider text-slate-100 flex items-center gap-1.5">
                HOJJAT SHAFIEE
                <span className="text-[10px] text-cyan-400 font-mono font-normal hidden sm:inline">
                  // GAMEPLAY ARCHITECT
                </span>
              </h1>
            </div>
            <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400">
              <span className="text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                OPEN TO WORK
              </span>
              <span>•</span>
              <span className="text-cyan-400 hidden sm:inline">ISFAHAN [32.65°N, 51.66°E]</span>
              <span className="hidden sm:inline">•</span>
              <span className="text-amber-400 flex items-center gap-0.5">
                <Flame className="w-3 h-3" /> 48D STREAK
              </span>
            </div>
          </div>
        </div>

        {/* Center: Quick Anchor Navigation */}
        <nav className="hidden lg:flex items-center gap-1 font-rajdhani text-xs tracking-wider font-semibold text-slate-300">
          <a 
            href="#character-sheet" 
            onMouseEnter={() => soundEngine.playHover()}
            className="px-2.5 py-1 rounded hover:text-cyan-400 hover:bg-cyan-950/30 transition-colors"
          >
            CHARACTER
          </a>
          <a 
            href="#procedural-lab" 
            onMouseEnter={() => soundEngine.playHover()}
            className="px-2.5 py-1 rounded hover:text-cyan-400 hover:bg-cyan-950/30 transition-colors"
          >
            PROCEDURAL_LAB
          </a>
          <a 
            href="#arcade" 
            onMouseEnter={() => soundEngine.playHover()}
            className="px-2.5 py-1 rounded hover:text-cyan-400 hover:bg-cyan-950/30 transition-colors"
          >
            ARCADE
          </a>
          <a 
            href="#armory" 
            onMouseEnter={() => soundEngine.playHover()}
            className="px-2.5 py-1 rounded hover:text-cyan-400 hover:bg-cyan-950/30 transition-colors"
          >
            ARMORY
          </a>
          <a 
            href="#quests" 
            onMouseEnter={() => soundEngine.playHover()}
            className="px-2.5 py-1 rounded hover:text-cyan-400 hover:bg-cyan-950/30 transition-colors"
          >
            QUESTS
          </a>
          <a 
            href="#coop" 
            onMouseEnter={() => soundEngine.playHover()}
            className="px-2.5 py-1 rounded hover:text-cyan-400 hover:bg-cyan-950/30 transition-colors"
          >
            CO-OP
          </a>
        </nav>

        {/* Right: HUD Interactive Switches & SICKO MODE */}
        <div className="flex items-center gap-2">
          {/* Audio Synthesizer Toggle with Animated EQ */}
          <button
            onClick={() => {
              onToggleMute();
              soundEngine.playClick();
            }}
            onMouseEnter={() => soundEngine.playHover()}
            title="Toggle Sound Effects & Web Audio Synthesizer"
            className={`px-2.5 py-1.5 rounded border text-xs font-mono flex items-center gap-1.5 transition-all ${
              !isMuted 
                ? 'border-cyan-400 bg-cyan-950/50 text-cyan-300 shadow-sm shadow-cyan-500/20' 
                : 'border-slate-800 bg-slate-900/60 text-slate-500'
            }`}
          >
            {!isMuted ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                <span className="hidden sm:inline">SFX: ON</span>
                {/* Visualizer bars */}
                <div className="flex items-end gap-0.5 h-3 ml-0.5">
                  <span className="w-0.5 bg-cyan-400 animate-[bounce_0.6s_infinite_100ms] h-full" />
                  <span className="w-0.5 bg-cyan-400 animate-[bounce_0.6s_infinite_300ms] h-2" />
                  <span className="w-0.5 bg-cyan-400 animate-[bounce_0.6s_infinite_200ms] h-3" />
                </div>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">SFX: MUTED</span>
              </>
            )}
          </button>

          {/* CRT Scanline Toggle */}
          <button
            onClick={() => {
              onToggleCrt();
              soundEngine.playClick();
            }}
            onMouseEnter={() => soundEngine.playHover()}
            title="Toggle CRT Scanline Retro Filter"
            className={`px-2 py-1.5 rounded border text-xs font-mono flex items-center gap-1 transition-all ${
              isCrtOn 
                ? 'border-purple-400 bg-purple-950/40 text-purple-300' 
                : 'border-slate-800 bg-slate-900/60 text-slate-500'
            }`}
          >
            <Tv className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">CRT</span>
          </button>

          {/* CLI Terminal Trigger */}
          <button
            onClick={() => {
              soundEngine.playTerminalKey();
              onOpenTerminal();
            }}
            onMouseEnter={() => soundEngine.playHover()}
            title="Launch Interactive Terminal"
            className="px-2.5 py-1.5 rounded border border-emerald-500/40 bg-emerald-950/30 text-emerald-400 hover:bg-emerald-900/40 text-xs font-mono flex items-center gap-1.5 transition-all"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">CLI</span>
          </button>

          {/* SICKO MODE OVERDRIVE BUTTON */}
          <button
            onClick={() => {
              soundEngine.playSickoMode();
              onToggleSickoMode();
            }}
            onMouseEnter={() => soundEngine.playHover()}
            title="Engage Sicko Mode Overdrive"
            className={`px-3 py-1.5 rounded text-xs font-rajdhani font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all ${
              isSickoMode
                ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/50 animate-pulse border border-rose-400 scale-105'
                : 'border border-cyan-400 bg-cyan-950/40 text-cyan-300 hover:bg-cyan-400 hover:text-black hover:shadow-lg hover:shadow-cyan-400/40'
            }`}
          >
            <Zap className={`w-3.5 h-3.5 ${isSickoMode ? 'text-amber-300 animate-spin' : 'text-cyan-400'}`} />
            <span>{isSickoMode ? 'SIKO OVERDRIVE ⚡' : 'SIKO MODE'}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
