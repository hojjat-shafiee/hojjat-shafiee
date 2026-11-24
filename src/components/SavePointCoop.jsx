import React, { useState } from 'react';
import { soundEngine } from '../utils/audio';
import { 
  Radio, 
  Mail, 
  Gamepad2, 
  Copy, 
  Check, 
  Send, 
  Sparkles,
  Terminal,
  ExternalLink
} from 'lucide-react';

// Custom Crisp Brand SVGs
function GithubIcon({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  );
}

function LinkedinIcon({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export default function SavePointCoop({ isSickoMode }) {
  const [copied, setCopied] = useState(false);
  const [role, setRole] = useState('Full-Time Gameplay Engineer');
  const [message, setMessage] = useState('');
  const [dispatched, setDispatched] = useState(false);

  const email = 'better_call_hojat@proton.me';

  const handleCopyEmail = () => {
    soundEngine.playConfirm();
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDispatch = (e) => {
    e.preventDefault();
    soundEngine.playConfirm();
    setDispatched(true);
    const subject = encodeURIComponent(`[Quest Inquiry] ${role}`);
    const body = encodeURIComponent(message || `Hi Hojjat,\n\nI reviewed your portfolio and would like to connect regarding an opportunity.`);
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="coop" className="py-12 relative">
      <div className="flex flex-col md:flex-row items-start justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-bold tracking-widest uppercase">
            <Radio className="w-4 h-4 text-cyan-400 animate-pulse" />
            MULTIPLAYER CO-OP // TRANSMISSION CONSOLE
          </div>
          <h2 className="text-2xl md:text-3xl font-orbitron font-bold text-slate-100 uppercase tracking-tight mt-1">
            Save Point & Co-op Inquiries
          </h2>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs bg-emerald-950/40 text-emerald-300 px-3 py-1.5 rounded border border-emerald-500/30">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>STATUS: 🟢 ACCEPTING CONTRACT & FULL-TIME QUESTS</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Direct Links & ProtonMail Terminal */}
        <div className="lg:col-span-5 hud-panel rounded-lg p-6 space-y-5">
          <div className="border-b border-cyan-500/20 pb-3">
            <h3 className="text-sm font-orbitron font-bold text-slate-100 uppercase tracking-wider">
              Secure Transmission Frequencies
            </h3>
            <p className="text-xs font-mono text-slate-400 mt-1">
              Encrypted direct contact channels for gameplay architecture, systems engineering, and multiplayer projects.
            </p>
          </div>

          {/* Copy Email Button Card */}
          <div className="p-4 rounded bg-slate-900/80 border border-cyan-500/30 flex items-center justify-between gap-3 group">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-9 h-9 rounded bg-cyan-950/60 border border-cyan-500/40 flex items-center justify-center shrink-0">
                <Mail className="w-4 h-4 text-cyan-400" />
              </div>
              <div className="overflow-hidden">
                <span className="text-[10px] font-mono text-slate-400 uppercase block">ProtonMail Direct</span>
                <span className="text-xs font-mono font-bold text-cyan-300 truncate block select-all">
                  {email}
                </span>
              </div>
            </div>

            <button
              onClick={handleCopyEmail}
              onMouseEnter={() => soundEngine.playHover()}
              title="Copy Email to Clipboard"
              className="px-3 py-2 rounded bg-cyan-500/10 hover:bg-cyan-500 text-cyan-400 hover:text-black border border-cyan-500/40 transition-all text-xs font-mono flex items-center gap-1.5 shrink-0"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-300 font-bold">COPIED</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>COPY</span>
                </>
              )}
            </button>
          </div>

          {/* Social Badges Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2">
            <a
              href="https://hojjat-shafiee.itch.io"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => soundEngine.playHover()}
              className="p-3 rounded bg-slate-900/60 border border-rose-500/30 hover:border-rose-400 hover:bg-rose-950/30 transition-all flex flex-col items-center justify-center gap-1 group text-center"
            >
              <Gamepad2 className="w-5 h-5 text-rose-400 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-rajdhani font-bold text-slate-200">itch.io</span>
              <span className="text-[9px] font-mono text-rose-300">Play Games</span>
            </a>

            <a
              href="https://www.linkedin.com/in/hojjat-shafiee/"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => soundEngine.playHover()}
              className="p-3 rounded bg-slate-900/60 border border-blue-500/30 hover:border-blue-400 hover:bg-blue-950/30 transition-all flex flex-col items-center justify-center gap-1 group text-center"
            >
              <LinkedinIcon className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-rajdhani font-bold text-slate-200">LinkedIn</span>
              <span className="text-[9px] font-mono text-blue-300">Connect</span>
            </a>

            <a
              href="https://github.com/hojjat-shafiee"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => soundEngine.playHover()}
              className="p-3 rounded bg-slate-900/60 border border-slate-700 hover:border-slate-400 hover:bg-slate-800/40 transition-all flex flex-col items-center justify-center gap-1 group text-center"
            >
              <GithubIcon className="w-5 h-5 text-slate-300 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-rajdhani font-bold text-slate-200">GitHub</span>
              <span className="text-[9px] font-mono text-slate-400">Follow</span>
            </a>
          </div>

          {/* Telemetry coordinate stamp */}
          <div className="pt-2 text-[10px] font-mono text-slate-500 flex items-center justify-between border-t border-slate-800">
            <span>OPERATING BASE: ISFAHAN [32.65°N, 51.66°E]</span>
            <span className="text-cyan-400">UTC+3:30 IRST</span>
          </div>

          <div className="corner-tl" />
          <div className="corner-tr" />
          <div className="corner-bl" />
          <div className="corner-br" />
        </div>

        {/* Right Column: Interactive Dispatch Terminal */}
        <div className="lg:col-span-7 hud-panel-purple rounded-lg p-6">
          <div className="flex items-center justify-between border-b border-purple-500/20 pb-3 mb-5">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-purple-400" />
              <h3 className="text-sm font-orbitron font-bold text-slate-100 uppercase tracking-wider">
                Direct Quest Dispatcher
              </h3>
            </div>
            <span className="text-[10px] font-mono text-purple-400 bg-purple-950/60 px-2 py-0.5 rounded border border-purple-500/30">
              FAST-PATH PROTOCOL
            </span>
          </div>

          <form onSubmit={handleDispatch} className="space-y-4">
            <div>
              <label className="text-xs font-mono text-slate-300 block mb-1.5">
                Target Role / Quest Scope:
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                onFocus={() => soundEngine.playHover()}
                className="w-full bg-slate-950 border border-purple-500/30 rounded px-3 py-2 text-xs font-mono text-slate-100 focus:outline-none focus:border-purple-400"
              >
                <option value="Full-Time Gameplay Engineer">Full-Time Gameplay / Systems Engineer</option>
                <option value="Procedural World Dev Contract">Procedural World Dev / Terrain Contract</option>
                <option value="Mumble Spatial VoIP Pipeline">Mumble Spatial Audio / Multiplayer Backend</option>
                <option value="Model Context Protocol (MCP) AI Integration">Model Context Protocol (MCP) AI Integration</option>
                <option value="Unity Custom Shaders & Optimization">Unity Custom Shaders & Performance Optimization</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-mono text-slate-300 block mb-1.5">
                Transmission Brief / Mission Details:
              </label>
              <textarea
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onFocus={() => soundEngine.playHover()}
                placeholder="Describe your game concept, tech stack, timeline, or engineering quest..."
                className="w-full bg-slate-950 border border-purple-500/30 rounded px-3 py-2 text-xs font-mono text-slate-100 placeholder-slate-600 focus:outline-none focus:border-purple-400"
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                Response SLA: Typically within 24 Hours
              </span>

              <button
                type="submit"
                onMouseEnter={() => soundEngine.playHover()}
                className="cyber-button-purple text-xs"
              >
                <Send className="w-3.5 h-3.5" />
                <span>DISPATCH TRANSMISSION</span>
              </button>
            </div>
          </form>

          <div className="corner-tl" />
          <div className="corner-tr" />
          <div className="corner-bl" />
          <div className="corner-br" />
        </div>
      </div>
    </section>
  );
}
