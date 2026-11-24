import React, { useEffect, useRef, useState } from 'react';
import { soundEngine } from '../utils/audio';
import { Play, RotateCcw, Trophy, Gamepad2, ExternalLink } from 'lucide-react';

export default function MiniArcade({ isSickoMode }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [gameState, setGameState] = useState('idle'); // 'idle' | 'playing' | 'gameover'
  const gameStateRef = useRef('idle');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const highScoreRef = useRef(0);
  const resetFlagRef = useRef(false);

  useEffect(() => {
    gameStateRef.current = gameState;
  }, [gameState]);

  useEffect(() => {
    highScoreRef.current = highScore;
  }, [highScore]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;

    const width = canvas.width = 640;
    const height = canvas.height = 240;

    let currentScore = 0;
    let frames = 0;
    let gameSpeed = isSickoMode ? 6.0 : 4.5;

    const player = {
      x: 60,
      y: height - 54,
      w: 26,
      h: 34,
      vy: 0,
      gravity: 0.75,
      isGrounded: true,
    };

    let obstacles = [];
    let particles = [];

    function resetGame() {
      currentScore = 0;
      frames = 0;
      gameSpeed = isSickoMode ? 6.0 : 4.5;
      player.y = height - 54;
      player.vy = 0;
      player.isGrounded = true;
      obstacles = [];
      particles = [];
      setScore(0);
    }

    function jump() {
      if (player.isGrounded) {
        player.vy = -12.5;
        player.isGrounded = false;
        soundEngine.playClick();
      }
    }

    const handleKeyDown = (e) => {
      // Never intercept keys while typing in inputs, textareas, or terminal
      const activeTag = document.activeElement?.tagName;
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(activeTag)) return;

      if (e.code === 'Space' || e.code === 'ArrowUp' || e.code === 'KeyW') {
        const isPlaying = gameStateRef.current === 'playing';
        const isArcadeFocused = containerRef.current?.contains(document.activeElement);

        if (isPlaying) {
          e.preventDefault();
          jump();
        } else if (isArcadeFocused) {
          e.preventDefault();
          soundEngine.playConfirm();
          resetGame();
          gameStateRef.current = 'playing';
          setGameState('playing');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    function spawnObstacle() {
      const type = Math.random() > 0.4 ? 'spike' : 'drone';
      obstacles.push({
        x: width + 20,
        y: type === 'spike' ? height - 42 : height - 75,
        w: type === 'spike' ? 20 : 26,
        h: type === 'spike' ? 32 : 22,
        type,
        color: isSickoMode ? '#a855f7' : '#ec4899'
      });
    }

    function addParticles(x, y, color) {
      for (let i = 0; i < 12; i++) {
        particles.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 6,
          vy: (Math.random() - 0.5) * 6,
          life: 1.0,
          color
        });
      }
    }

    const loop = () => {
      if (resetFlagRef.current) {
        resetGame();
        resetFlagRef.current = false;
      }

      ctx.clearRect(0, 0, width, height);

      // Background Cyber Grid Horizon
      ctx.strokeStyle = 'rgba(0, 245, 255, 0.08)';
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // Ground Line
      ctx.strokeStyle = isSickoMode ? '#f43f5e' : '#00f5ff';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, height - 20);
      ctx.lineTo(width, height - 20);
      ctx.stroke();

      // Ground Neon dashes
      const groundOffset = (frames * gameSpeed) % 40;
      ctx.strokeStyle = 'rgba(168, 85, 247, 0.4)';
      ctx.lineWidth = 4;
      for (let gx = -groundOffset; gx < width; gx += 40) {
        ctx.beginPath();
        ctx.moveTo(gx, height - 12);
        ctx.lineTo(gx + 20, height - 12);
        ctx.stroke();
      }

      if (gameStateRef.current === 'playing') {
        frames++;
        if (frames % 10 === 0) {
          currentScore++;
          setScore(currentScore);
          if (currentScore > highScoreRef.current) {
            highScoreRef.current = currentScore;
            setHighScore(currentScore);
          }
        }

        if (frames % 400 === 0) {
          gameSpeed += 0.35;
        }

        // Physics
        player.vy += player.gravity;
        player.y += player.vy;
        if (player.y >= height - 54) {
          player.y = height - 54;
          player.vy = 0;
          player.isGrounded = true;
        }

        // Spawn obstacles
        if (frames % Math.max(50, Math.floor(110 - gameSpeed * 5)) === 0) {
          spawnObstacle();
        }

        // Draw & Update Obstacles
        for (let i = obstacles.length - 1; i >= 0; i--) {
          const obs = obstacles[i];
          obs.x -= gameSpeed;

          ctx.fillStyle = obs.color;
          ctx.shadowColor = obs.color;
          ctx.shadowBlur = 10;
          if (obs.type === 'spike') {
            ctx.beginPath();
            ctx.moveTo(obs.x, obs.y + obs.h);
            ctx.lineTo(obs.x + obs.w / 2, obs.y);
            ctx.lineTo(obs.x + obs.w, obs.y + obs.h);
            ctx.closePath();
            ctx.fill();
          } else {
            ctx.fillRect(obs.x, obs.y, obs.w, obs.h);
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(obs.x + 4, obs.y + 4, 4, 4);
          }
          ctx.shadowBlur = 0;

          if (
            player.x < obs.x + obs.w &&
            player.x + player.w > obs.x &&
            player.y < obs.y + obs.h &&
            player.y + player.h > obs.y
          ) {
            soundEngine.playGlitch();
            addParticles(player.x + player.w / 2, player.y + player.h / 2, '#f43f5e');
            gameStateRef.current = 'gameover';
            setGameState('gameover');
          }

          if (obs.x + obs.w < -10) {
            obstacles.splice(i, 1);
          }
        }

        for (let i = particles.length - 1; i >= 0; i--) {
          const p = particles[i];
          p.x += p.vx;
          p.y += p.vy;
          p.life -= 0.03;
          ctx.fillStyle = p.color;
          ctx.fillRect(p.x, p.y, 3, 3);
          if (p.life <= 0) particles.splice(i, 1);
        }
      }

      // Draw Player
      ctx.fillStyle = isSickoMode ? '#f43f5e' : '#00f5ff';
      ctx.shadowColor = ctx.fillStyle;
      ctx.shadowBlur = 12;
      ctx.fillRect(player.x, player.y, player.w, player.h);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(player.x + player.w - 8, player.y + 6, 6, 4);
      if (!player.isGrounded) {
        ctx.fillStyle = '#f59e0b';
        ctx.fillRect(player.x - 6, player.y + player.h - 10, 6, 8 + Math.random() * 6);
      }
      ctx.shadowBlur = 0;

      animationId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isSickoMode]);

  const handleStartGame = (e) => {
    e?.stopPropagation();
    soundEngine.playConfirm();
    resetFlagRef.current = true;
    gameStateRef.current = 'playing';
    setGameState('playing');
    containerRef.current?.focus();
  };

  const handleCanvasClick = () => {
    containerRef.current?.focus();
    if (gameStateRef.current === 'playing') {
      const event = new KeyboardEvent('keydown', { code: 'Space' });
      window.dispatchEvent(event);
    } else {
      handleStartGame();
    }
  };

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      className="relative hud-panel rounded-lg p-5 border border-purple-500/30 overflow-hidden focus:outline-none focus:border-cyan-400"
    >
      <div className="flex flex-wrap items-center justify-between gap-4 mb-3 border-b border-purple-500/20 pb-3">
        <div className="flex items-center gap-2.5">
          <Gamepad2 className="w-5 h-5 text-purple-400 animate-pulse" />
          <h3 className="text-base font-orbitron font-bold text-slate-100 uppercase tracking-wider">
            Cyber Runner // Dino Engine Homage
          </h3>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950/60 text-purple-300 border border-purple-500/30 hidden sm:inline-block">
            UNITY 2D PROTOTYPE
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="flex items-center gap-1.5 text-cyan-400">
            <span>SCORE:</span>
            <span className="font-bold text-sm bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30">
              {score}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-amber-400">
            <Trophy className="w-3.5 h-3.5" />
            <span>BEST:</span>
            <span className="font-bold text-sm bg-amber-950/60 px-2 py-0.5 rounded border border-amber-500/30">
              {highScore}
            </span>
          </div>
        </div>
      </div>

      {/* Canvas Area */}
      <div className="relative w-full rounded bg-slate-950 border border-slate-800 overflow-hidden">
        <canvas
          ref={canvasRef}
          onClick={handleCanvasClick}
          className="w-full h-[200px] md:h-[220px] block cursor-pointer"
        />

        {/* Overlay for Idle / Game Over */}
        {gameState !== 'playing' && (
          <div 
            onClick={handleStartGame}
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-xs flex flex-col items-center justify-center gap-2 cursor-pointer transition-all hover:bg-slate-950/70"
          >
            {gameState === 'gameover' ? (
              <>
                <span className="text-rose-500 font-orbitron text-xl font-bold tracking-widest animate-bounce text-center px-2">
                  SYSTEM FAILURE // CRASH DETECTED
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  FINAL DATA COLLECTED: <b className="text-cyan-400">{score} BYTES</b>
                </span>
                <button
                  onClick={handleStartGame}
                  className="mt-2 cyber-button-purple text-xs"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  REBOOT ENGINE [SPACE / CLICK]
                </button>
              </>
            ) : (
              <>
                <span className="text-cyan-400 font-orbitron text-lg font-bold tracking-widest">
                  CYBER DINO ARCADE
                </span>
                <p className="text-xs text-slate-400 font-mono max-w-sm text-center px-3">
                  Press <b>[SPACE]</b>, <b>[W]</b>, or <b>CLICK</b> to jump and dodge corrupted drones. Built in honor of Hojjat's Unity Dino clone.
                </p>
                <button
                  onClick={handleStartGame}
                  className="mt-2 cyber-button text-xs"
                >
                  <Play className="w-3.5 h-3.5" />
                  INITIATE RUN [CLICK]
                </button>
              </>
            )}
          </div>
        )}
      </div>

      {/* Footer controls & Itch link */}
      <div className="flex flex-wrap items-center justify-between gap-3 mt-3 text-[11px] font-mono text-slate-400">
        <div className="flex items-center gap-2">
          <span className="text-purple-400 font-bold">CONTROLS:</span>
          <span>[SPACE] Jump • [TAP] Jump on Mobile</span>
        </div>
        <a
          href="https://hojjat-shafiee.itch.io"
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => soundEngine.playHover()}
          className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 hover:underline"
        >
          <span>Play Full WebGL Titles on itch.io</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      <div className="corner-tl" />
      <div className="corner-tr" />
      <div className="corner-bl" />
      <div className="corner-br" />
    </div>
  );
}
