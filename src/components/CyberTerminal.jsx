import React, { useState, useRef, useEffect } from 'react';
import { soundEngine } from '../utils/audio';
import { Terminal as TerminalIcon, X, Maximize2, Minimize2, CornerDownLeft } from 'lucide-react';

export default function CyberTerminal({ isOpen, onClose, onToggleSickoMode, isSickoMode }) {
  const [history, setHistory] = useState([
    { text: 'HOJJAT_OS v4.19.0-GAMEPLAY-ARCH (x86_64-engine)', type: 'system' },
    { text: 'Type "help" to display operational directives or "sikomode" to unleash overdrive.', type: 'info' }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [cmdHistory, setCmdHistory] = useState([]);
  const [cmdIndex, setCmdIndex] = useState(-1);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const executeCommand = () => {
    const trimmed = inputVal.trim();
    if (!trimmed) return;

    soundEngine.playTerminalKey();
    const newHistory = [...history, { text: `user@hojjat-shafiee:~$ ${trimmed}`, type: 'user' }];
    const cmd = trimmed.toLowerCase();

    setCmdHistory(prev => [...prev, trimmed]);
    setCmdIndex(-1);
    setInputVal('');

    switch (cmd) {
      case 'help':
        newHistory.push({
          type: 'output',
          text: `AVAILABLE DIRECTIVES:
  about       - Character background, 10+ yrs game dev & systems background
  skills      - Armory weapon loadout (Unity, HLSL, Python, MCP, VoIP)
  projects    - Active repositories & quest portfolio
  stats       - Real-time character telemetry & attributes
  sikomode    - Toggle SICKO MODE overclock overdrive
  contact     - ProtonMail transmission channel & social links
  clear       - Purge terminal buffer
  exit        - Terminate terminal session`
        });
        break;

      case 'about':
        newHistory.push({
          type: 'output',
          text: `[HOJJAT SHAFIEE // GAMEPLAY ARCHITECT & PROCEDURAL DEV]
Level 99 Engineer based in Isfahan, Iran.
10+ years dedicated to crafting procedural worlds, custom HLSL shaders,
thread-safe game architectures, low-latency spatial VoIP (Mumble),
and modern Model Context Protocol (MCP) integrations for AI agents.`
        });
        break;

      case 'skills':
        newHistory.push({
          type: 'output',
          text: `[EQUIPPED WEAPON LOADOUT]
• Primary Weapon: Unity Engine 6 / LTS, C#, HLSL / ShaderLab
• Systems & Network: Python 3.12, FastAPI Async, ZeroC ICE, Mumble VoIP
• Procedural Engine: Noise Synthesis, Dynamic Heightmaps, 3D Maze Algorithms
• AI Protocols: Model Context Protocol (MCP), Live Unity Editor Agent Control`
        });
        break;

      case 'projects':
        newHistory.push({
          type: 'output',
          text: `[ACTIVE QUEST LOG]
1. 3d-Maze-Generator    - Procedural 3D labyrinth runner (Unity C#)
2. figma-mcp-browser    - Model Context Protocol server for Figma assets
3. mumble-server-rest-api - High-throughput async Mumble REST backend
4. Tidebreak            - GitHub Game Off 2025 fluid wave mechanics
5. TerrainGenerator     - Procedural heightmap landscape synthesizer
6. qoder-unity-mcp      - MCP server for AI agent control in Unity Editor`
        });
        break;

      case 'stats':
        newHistory.push({
          type: 'output',
          text: `[ATTRIBUTES & TELEMETRY]
HP:   100/100 (Deep debugging stamina & caffeine tolerance)
MANA: 92/100  (Procedural algorithms & dynamic mesh synthesis)
EXP:  98%     (1,400+ Lifetime contributions, Level 99)
STR:  99/99   [Unity Engine / C# Architecture]
INT:  95/99   [Procedural Algorithms & Heightmaps]
DEX:  94/99   [Multithreading & Low Latency VoIP]
CHA:  90/99   [Multiplayer Co-op & Open to Work]`
        });
        break;

      case 'sikomode':
        onToggleSickoMode();
        newHistory.push({
          type: 'success',
          text: isSickoMode 
            ? '>> OVERDRIVE DISENGAGED. RETURNING TO NOMINAL HUD STATUS.'
            : '>> SICKO MODE ACTIVATED! OVERCLOCKING FREQUENCY TO 5.4 GHZ!'
        });
        break;

      case 'contact':
        newHistory.push({
          type: 'output',
          text: `DIRECT TRANSMISSION CHANNELS:
• ProtonMail: better_call_hojat@proton.me
• itch.io:    https://hojjat-shafiee.itch.io
• LinkedIn:   https://www.linkedin.com/in/hojjat-shafiee/
• GitHub:     https://github.com/hojjat-shafiee`
        });
        break;

      case 'clear':
        setHistory([]);
        return;

      case 'exit':
        onClose();
        return;

      default:
        soundEngine.playGlitch();
        newHistory.push({
          type: 'error',
          text: `bash: ${trimmed}: command not recognized. Execute 'help' for directory manifest.`
        });
        break;
    }

    setHistory(newHistory);
  };

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      return;
    } else if (e.key === 'ArrowUp') {
      if (cmdHistory.length > 0) {
        const nextIdx = cmdIndex === -1 ? cmdHistory.length - 1 : Math.max(0, cmdIndex - 1);
        setCmdIndex(nextIdx);
        setInputVal(cmdHistory[nextIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      if (cmdHistory.length > 0 && cmdIndex !== -1) {
        const nextIdx = cmdIndex + 1;
        if (nextIdx >= cmdHistory.length) {
          setCmdIndex(-1);
          setInputVal('');
        } else {
          setCmdIndex(nextIdx);
          setInputVal(cmdHistory[nextIdx]);
        }
      }
    } else {
      soundEngine.playTerminalKey();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
      <div className="relative w-full max-w-3xl h-[520px] bg-slate-950 border border-cyan-500/50 rounded-lg shadow-2xl flex flex-col overflow-hidden font-mono text-sm box-glow-cyan">
        {/* Terminal Header Bar */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-cyan-500/30">
          <div className="flex items-center gap-2">
            <TerminalIcon className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-bold text-slate-200 tracking-wider">
              HOJJAT_TERMINAL // MCP_BASH_EMULATOR
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[10px] text-cyan-500 hidden sm:inline">
              STATUS: CONNECTED (ISFAHAN [32.65°N, 51.66°E])
            </span>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-rose-400 transition-colors p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Output Screen */}
        <div className="flex-1 p-4 overflow-y-auto space-y-2 bg-[#040711]">
          {history.map((line, idx) => (
            <div key={idx} className="leading-relaxed">
              {line.type === 'user' && (
                <span className="text-cyan-400 font-bold">{line.text}</span>
              )}
              {line.type === 'system' && (
                <span className="text-purple-400">{line.text}</span>
              )}
              {line.type === 'info' && (
                <span className="text-slate-400 text-xs">{line.text}</span>
              )}
              {line.type === 'output' && (
                <pre className="text-slate-300 whitespace-pre-wrap font-mono text-xs pl-2 border-l-2 border-cyan-500/40">
                  {line.text}
                </pre>
              )}
              {line.type === 'success' && (
                <span className="text-emerald-400 font-bold">{line.text}</span>
              )}
              {line.type === 'error' && (
                <span className="text-rose-400">{line.text}</span>
              )}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            executeCommand();
          }}
          className="flex items-center gap-2 px-4 py-2.5 bg-slate-900/90 border-t border-cyan-500/20"
        >
          <span className="text-cyan-400 font-bold select-none text-xs">
            user@hojjat:~$
          </span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleCommand}
            placeholder="Type 'help', 'skills', 'sikomode'..."
            className="flex-1 bg-transparent text-slate-100 placeholder-slate-600 focus:outline-none text-xs"
            autoFocus
          />
          <button
            type="submit"
            className="text-cyan-400 hover:text-cyan-300 p-1"
          >
            <CornerDownLeft className="w-3.5 h-3.5" />
          </button>
        </form>

        {/* Reticles */}
        <div className="corner-tl" />
        <div className="corner-tr" />
        <div className="corner-bl" />
        <div className="corner-br" />
      </div>
    </div>
  );
}
