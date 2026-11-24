import React, { useState } from 'react';
import HUDHeader from './components/HUDHeader';
import ProceduralViewport from './components/ProceduralViewport';
import MiniArcade from './components/MiniArcade';
import CharacterSheet from './components/CharacterSheet';
import ArmoryLoadout from './components/ArmoryLoadout';
import QuestArchive from './components/QuestArchive';
import SavePointCoop from './components/SavePointCoop';
import CyberTerminal from './components/CyberTerminal';
import { soundEngine } from './utils/audio';
import { 
  Terminal, 
  Sparkles, 
  Zap, 
  Gamepad2, 
  Sword, 
  Mail, 
  Cpu, 
  Layers, 
  Radio, 
  Code2, 
  ChevronDown,
  Flame,
  Crosshair
} from 'lucide-react';

export default function App() {
  const [isSickoMode, setIsSickoMode] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isCrtOn, setIsCrtOn] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  const handleToggleSickoMode = () => {
    setIsSickoMode(prev => !prev);
  };

  const handleToggleMute = () => {
    const next = !isMuted;
    setIsMuted(next);
    soundEngine.setMuted(next);
  };

  const handleToggleCrt = () => {
    setIsCrtOn(prev => !prev);
  };

  return (
    <div className={`min-h-screen bg-[#050811] text-slate-100 relative ${isSickoMode ? 'sicko-mode-active' : ''}`}>
      {/* CRT Scanline Filter Overlay */}
      {isCrtOn && <div className="fixed inset-0 crt-overlay crt-flicker pointer-events-none" />}

      {/* Cyber HUD Header */}
      <HUDHeader
        isSickoMode={isSickoMode}
        onToggleSickoMode={handleToggleSickoMode}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        isCrtOn={isCrtOn}
        onToggleCrt={handleToggleCrt}
        onOpenTerminal={() => setIsTerminalOpen(true)}
      />

      <main className="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-16">
        {/* ================= HERO SECTION ================= */}
        <section className="relative pt-6 pb-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Headline & Bio */}
            <div className="lg:col-span-6 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-cyan-950/50 border border-cyan-500/30 text-cyan-400 text-xs font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>LEVEL 99 // GAMEPLAY ARCHITECT // UNITY & C#</span>
              </div>

              <div className="space-y-1">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-orbitron font-extrabold tracking-tight text-white leading-tight">
                  HOJJAT <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 via-purple-400 to-rose-400">SHAFIEE</span>
                </h1>
                <p className="text-sm sm:text-base font-rajdhani font-semibold text-cyan-300 tracking-wider uppercase">
                  Procedural Worlds • Low-Latency VoIP Systems • AI & MCP Architect
                </p>
              </div>

              <p className="text-xs sm:text-sm font-mono text-slate-300 leading-relaxed border-l-2 border-cyan-500/40 pl-3">
                Transforming mathematical chaos into living game worlds. Over a decade building
                procedural 3D labyrinths, dynamic heightmap terrains, custom HLSL shaders, and
                mission-critical spatial audio pipelines for multiplayer titles.
              </p>

              {/* Quick Spec Tags */}
              <div className="flex flex-wrap gap-2 text-xs font-mono">
                <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-700 text-slate-300">
                  ⚡ 10+ Yrs Exp
                </span>
                <span className="px-2.5 py-1 rounded bg-slate-900 border border-cyan-500/30 text-cyan-300">
                  🕹️ Unity 6 / LTS
                </span>
                <span className="px-2.5 py-1 rounded bg-slate-900 border border-purple-500/30 text-purple-300">
                  🌐 Mumble Spatial Audio
                </span>
                <span className="px-2.5 py-1 rounded bg-slate-900 border border-emerald-500/30 text-emerald-300">
                  🤖 Model Context Protocol (MCP)
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href="#quests"
                  onClick={() => soundEngine.playClick()}
                  onMouseEnter={() => soundEngine.playHover()}
                  className="cyber-button text-xs"
                >
                  <Sword className="w-4 h-4" />
                  <span>VIEW QUEST LOG</span>
                </a>

                <a
                  href="#coop"
                  onClick={() => soundEngine.playClick()}
                  onMouseEnter={() => soundEngine.playHover()}
                  className="cyber-button-purple text-xs"
                >
                  <Mail className="w-4 h-4" />
                  <span>INITIATE CO-OP</span>
                </a>

                <button
                  onClick={() => {
                    soundEngine.playTerminalKey();
                    setIsTerminalOpen(true);
                  }}
                  onMouseEnter={() => soundEngine.playHover()}
                  className="px-3.5 py-2 rounded bg-slate-900/80 hover:bg-slate-800 border border-slate-700 hover:border-cyan-400 text-xs font-mono text-slate-300 hover:text-cyan-400 transition-all flex items-center gap-2"
                >
                  <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                  <span>CLI BASH</span>
                </button>
              </div>
            </div>

            {/* Right: Interactive 3D Procedural Viewport */}
            <div className="lg:col-span-6 relative">
              <div id="procedural-lab">
                <ProceduralViewport isSickoMode={isSickoMode} />
              </div>
            </div>
          </div>
        </section>

        {/* ================= CHARACTER SHEET ================= */}
        <CharacterSheet isSickoMode={isSickoMode} />

        {/* ================= INTERACTIVE MINI-ARCADE ================= */}
        <section id="arcade" className="py-6">
          <div className="flex items-center gap-2 text-purple-400 text-xs font-mono font-bold tracking-widest uppercase mb-4">
            <Gamepad2 className="w-4 h-4 text-purple-400 animate-bounce" />
            HOLODECK RUNTIME // PLAYABLE RETRO ARCADE
          </div>
          <MiniArcade isSickoMode={isSickoMode} />
        </section>

        {/* ================= THE ARMORY & WEAPON LOADOUT ================= */}
        <ArmoryLoadout isSickoMode={isSickoMode} />

        {/* ================= QUEST ARCHIVE (PROJECTS) ================= */}
        <QuestArchive isSickoMode={isSickoMode} />

        {/* ================= SAVE POINT & MULTIPLAYER CO-OP ================= */}
        <SavePointCoop isSickoMode={isSickoMode} />
      </main>

      {/* ================= RETRO FOOTER ================= */}
      <footer className="border-t border-cyan-500/20 bg-slate-950 py-8 px-4 text-center font-mono text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-slate-300">
            <span className="text-cyan-400 font-bold">HOJJAT SHAFIEE</span>
            <span>//</span>
            <span>GAMEPLAY ARCHITECT</span>
            <span className="text-slate-600">•</span>
            <span className="text-emerald-400">OPEN TO WORK</span>
          </div>

          <div className="flex items-center gap-4 text-slate-500">
            <span>ISFAHAN [32.65°N, 51.66°E]</span>
            <span>•</span>
            <a
              href="https://github.com/hojjat-shafiee"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:underline"
            >
              github.com/hojjat-shafiee
            </a>
          </div>
        </div>
      </footer>

      {/* Interactive CLI Terminal Drawer */}
      <CyberTerminal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
        onToggleSickoMode={handleToggleSickoMode}
        isSickoMode={isSickoMode}
      />
    </div>
  );
}
