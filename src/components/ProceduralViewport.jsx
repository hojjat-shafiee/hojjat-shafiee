import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { soundEngine } from '../utils/audio';
import { Box, Cpu, Eye, Layers, RefreshCw, Sliders, Zap } from 'lucide-react';

export default function ProceduralViewport({ isSickoMode }) {
  const mountRef = useRef(null);
  const [mode, setMode] = useState('terrain'); // 'terrain' | 'maze' | 'reactor'
  const [wireframe, setWireframe] = useState(true);
  const [stats, setStats] = useState({ vertices: 2401, polys: 4608, fps: 60 });
  const [seed, setSeed] = useState(42);
  const sceneRef = useRef(null);
  const meshGroupRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.fog = new THREE.FogExp2(0x050811, 0.025);

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.set(0, 18, 28);
    camera.lookAt(0, 2, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x00f5ff, 2.2);
    dirLight1.position.set(20, 40, 20);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xa855f7, 2.2);
    dirLight2.position.set(-20, 20, -20);
    scene.add(dirLight2);

    const group = new THREE.Group();
    scene.add(group);
    meshGroupRef.current = group;

    // Build mesh for current mode
    generateMesh(group, mode, wireframe, seed, isSickoMode);

    // Mouse movement interaction
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / width - 0.5) * 2;
      mouseY = ((e.clientY - rect.top) / height - 0.5) * 2;
    };
    container.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    let animationFrameId;
    let clock = new THREE.Clock();
    let frameCounter = 0;
    let lastTime = performance.now();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // FPS calculation with safeguards against NaN
      frameCounter++;
      const now = performance.now();
      const elapsed = now - lastTime;
      if (elapsed >= 1000) {
        const calculatedFps = Math.round((frameCounter * 1000) / elapsed);
        setStats(prev => ({ 
          ...prev, 
          fps: Number.isFinite(calculatedFps) && calculatedFps > 0 ? Math.min(144, calculatedFps) : 60 
        }));
        frameCounter = 0;
        lastTime = now;
      }

      if (group) {
        group.rotation.y += (isSickoMode ? 0.009 : 0.0035);
        // Subtle tilt with mouse
        group.rotation.x = THREE.MathUtils.lerp(group.rotation.x, mouseY * 0.22 + 0.1, 0.05);
        group.rotation.z = THREE.MathUtils.lerp(group.rotation.z, -mouseX * 0.22, 0.05);

        // Dynamic wave pulse on terrain vertices if terrain mode
        if (mode === 'terrain' && group.children?.[0]?.geometry?.attributes?.position) {
          const geom = group.children[0].geometry;
          const pos = geom.attributes.position;
          const count = pos.count || 0;
          for (let i = 0; i < count; i++) {
            const x = pos.getX(i);
            const z = pos.getZ(i);
            const y = Math.sin(x * 0.2 + time * 1.5) * Math.cos(z * 0.2 + time * 1.5) * 1.2
                    + Math.sin(x * 0.4 - time * 0.8) * 0.8;
            pos.setY(i, y);
          }
          pos.needsUpdate = true;
          geom.computeVertexNormals();
        }

        // Counter-rotation if reactor mode
        if (mode === 'reactor' && group.children?.[1]) {
          group.children[1].rotation.x += 0.01;
          group.children[1].rotation.z -= 0.012;
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousemove', handleMouseMove);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [mode, wireframe, seed, isSickoMode]);

  function generateMesh(group, currentMode, isWireframe, curSeed, sicko) {
    // Clear old children safely
    while (group.children.length > 0) {
      const obj = group.children[0];
      disposeObject(obj);
      group.remove(obj);
    }

    const primaryColor = sicko ? 0xf43f5e : 0x00f5ff;
    const secondaryColor = sicko ? 0xa855f7 : 0x10b981;

    if (currentMode === 'terrain') {
      const size = 38;
      const segments = 48;
      const geom = new THREE.PlaneGeometry(size, size, segments, segments);
      geom.rotateX(-Math.PI / 2);

      const mat = new THREE.MeshStandardMaterial({
        color: isWireframe ? primaryColor : 0x0d1424,
        wireframe: isWireframe,
        roughness: 0.3,
        metalness: 0.85,
        emissive: isWireframe ? (sicko ? 0x991b1b : 0x034a55) : 0x050b18,
      });

      const mesh = new THREE.Mesh(geom, mat);
      group.add(mesh);

      // Add hovering data beacon particles
      const particleCount = 180;
      const pGeom = new THREE.BufferGeometry();
      const pCoords = new Float32Array(particleCount * 3);
      for (let i = 0; i < particleCount * 3; i += 3) {
        pCoords[i] = (Math.random() - 0.5) * 40;
        pCoords[i + 1] = Math.random() * 15 + 2;
        pCoords[i + 2] = (Math.random() - 0.5) * 40;
      }
      pGeom.setAttribute('position', new THREE.BufferAttribute(pCoords, 3));
      const pMat = new THREE.PointsMaterial({
        color: secondaryColor,
        size: 0.35,
        transparent: true,
        opacity: 0.8
      });
      const points = new THREE.Points(pGeom, pMat);
      group.add(points);

      const vertCount = geom.attributes.position?.count || 0;
      const polyCount = geom.index?.count ? Math.floor(geom.index.count / 3) : Math.floor(vertCount / 3);
      setStats(prev => ({ ...prev, vertices: vertCount, polys: polyCount }));
    } else if (currentMode === 'maze') {
      // Procedural 3D Maze Generator homage
      const mazeSize = 12;
      const cellSize = 2.4;
      const wallHeight = 2.2;
      const mazeGroup = new THREE.Group();

      const boxGeom = new THREE.BoxGeometry(cellSize, wallHeight, cellSize);
      const wallMat = new THREE.MeshStandardMaterial({
        color: isWireframe ? primaryColor : 0x0f172a,
        wireframe: isWireframe,
        emissive: isWireframe ? (sicko ? 0x831843 : 0x00474f) : 0x040812,
        roughness: 0.2,
        metalness: 0.9,
      });

      let wallCount = 0;
      for (let r = -mazeSize / 2; r < mazeSize / 2; r++) {
        for (let c = -mazeSize / 2; c < mazeSize / 2; c++) {
          const val = Math.sin(r * 2.3 + curSeed * 0.1) * Math.cos(c * 2.3 + curSeed * 0.1);
          if (val > 0.15) {
            const wall = new THREE.Mesh(boxGeom, wallMat);
            wall.position.set(r * cellSize, wallHeight / 2, c * cellSize);
            mazeGroup.add(wall);
            wallCount++;
          }
        }
      }

      // Base grid floor
      const floorGeom = new THREE.PlaneGeometry(mazeSize * cellSize, mazeSize * cellSize);
      floorGeom.rotateX(-Math.PI / 2);
      const floorMat = new THREE.MeshBasicMaterial({
        color: 0x050d1a,
        wireframe: true,
        transparent: true,
        opacity: 0.5
      });
      const floor = new THREE.Mesh(floorGeom, floorMat);
      floor.position.y = -0.05;
      mazeGroup.add(floor);

      group.add(mazeGroup);
      setStats(prev => ({ ...prev, vertices: wallCount * 24, polys: wallCount * 12 }));
    } else {
      // Cyber Icosahedron Core / Engine Reactor
      const geom = new THREE.IcosahedronGeometry(8, 2);
      const mat = new THREE.MeshStandardMaterial({
        color: primaryColor,
        wireframe: isWireframe,
        roughness: 0.1,
        metalness: 0.95,
        emissive: sicko ? 0x4c0519 : 0x022c33
      });
      const mesh = new THREE.Mesh(geom, mat);
      group.add(mesh);

      // Inner glowing core
      const innerGeom = new THREE.OctahedronGeometry(4, 0);
      const innerMat = new THREE.MeshBasicMaterial({
        color: secondaryColor,
        wireframe: true
      });
      const innerMesh = new THREE.Mesh(innerGeom, innerMat);
      group.add(innerMesh);

      const vertCount = geom.attributes.position?.count || 0;
      const polyCount = geom.index?.count ? Math.floor(geom.index.count / 3) : Math.floor(vertCount / 3);
      setStats(prev => ({ ...prev, vertices: vertCount, polys: polyCount }));
    }
  }

  function disposeObject(obj) {
    if (!obj) return;
    if (obj.geometry) obj.geometry.dispose();
    if (obj.material) {
      if (Array.isArray(obj.material)) {
        obj.material.forEach(m => m.dispose());
      } else {
        obj.material.dispose();
      }
    }
    if (obj.children && obj.children.length > 0) {
      obj.children.forEach(child => disposeObject(child));
    }
  }

  const handleModeChange = (newMode) => {
    soundEngine.playClick();
    setMode(newMode);
  };

  const handleWireframeToggle = () => {
    soundEngine.playClick();
    setWireframe(prev => !prev);
  };

  const handleRegenerate = () => {
    soundEngine.playGlitch();
    setSeed(Math.floor(Math.random() * 10000));
  };

  return (
    <div className="relative w-full h-[460px] md:h-[540px] rounded-lg overflow-hidden border border-cyan-500/30 bg-slate-950/70 shadow-2xl backdrop-blur-md">
      {/* 3D WebGL Canvas */}
      <div ref={mountRef} className="absolute inset-0 cursor-grab active:cursor-grabbing" />

      {/* Futuristic HUD Overlays */}
      {/* Top Left: Engine Spec & Telemetry */}
      <div className="absolute top-4 left-4 pointer-events-none flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-[11px] font-orbitron tracking-widest text-cyan-400 font-bold uppercase">
            PROCEDURAL_ENGINE // {mode.toUpperCase()}
          </span>
        </div>
        <div className="text-[10px] text-slate-400 font-mono flex gap-3">
          <span>VERTICES: <b className="text-cyan-300">{stats.vertices}</b></span>
          <span>POLYGONS: <b className="text-purple-400">{stats.polys}</b></span>
          <span>FPS: <b className="text-emerald-400">{stats.fps}</b></span>
        </div>
        <div className="text-[9px] text-slate-500 font-mono tracking-tight">
          HOMAGE: TerrainGenerator & 3D-Maze-Generator (Unity / HLSL)
        </div>
      </div>

      {/* Top Right: Reticle Corner Indicator */}
      <div className="absolute top-4 right-4 pointer-events-none hidden sm:flex items-center gap-2 text-[10px] font-mono text-cyan-500/70 bg-cyan-950/40 px-3 py-1 border border-cyan-500/20">
        <Zap className="w-3 h-3 text-cyan-400 animate-pulse" />
        <span>RAYCAST ACTIVE // SEED #{seed}</span>
      </div>

      {/* Bottom Controls Bar */}
      <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-3 bg-slate-900/80 p-2.5 rounded border border-cyan-500/20 backdrop-blur-md">
        {/* Mode Selector */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => handleModeChange('terrain')}
            onMouseEnter={() => soundEngine.playHover()}
            className={`px-3 py-1 text-xs font-rajdhani font-bold rounded transition-all flex items-center gap-1.5 ${
              mode === 'terrain'
                ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/30'
                : 'text-slate-300 hover:text-cyan-400 hover:bg-cyan-950/40'
            }`}
          >
            <Layers className="w-3 h-3" />
            TERRAIN
          </button>
          <button
            onClick={() => handleModeChange('maze')}
            onMouseEnter={() => soundEngine.playHover()}
            className={`px-3 py-1 text-xs font-rajdhani font-bold rounded transition-all flex items-center gap-1.5 ${
              mode === 'maze'
                ? 'bg-purple-500 text-black shadow-lg shadow-purple-500/30'
                : 'text-slate-300 hover:text-purple-400 hover:bg-purple-950/40'
            }`}
          >
            <Box className="w-3 h-3" />
            3D MAZE
          </button>
          <button
            onClick={() => handleModeChange('reactor')}
            onMouseEnter={() => soundEngine.playHover()}
            className={`px-3 py-1 text-xs font-rajdhani font-bold rounded transition-all flex items-center gap-1.5 ${
              mode === 'reactor'
                ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/30'
                : 'text-slate-300 hover:text-rose-400 hover:bg-rose-950/40'
            }`}
          >
            <Cpu className="w-3 h-3" />
            CORE
          </button>
        </div>

        {/* Toggles & Regenerate */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleWireframeToggle}
            onMouseEnter={() => soundEngine.playHover()}
            className={`px-2.5 py-1 text-xs font-mono rounded border transition-all flex items-center gap-1 ${
              wireframe 
                ? 'border-cyan-400 text-cyan-300 bg-cyan-950/30' 
                : 'border-slate-700 text-slate-400 hover:border-slate-500'
            }`}
          >
            <Eye className="w-3 h-3" />
            {wireframe ? 'WIREFRAME: ON' : 'SOLID: ON'}
          </button>

          <button
            onClick={handleRegenerate}
            onMouseEnter={() => soundEngine.playHover()}
            className="px-2.5 py-1 text-xs font-mono rounded border border-emerald-500/40 text-emerald-400 bg-emerald-950/20 hover:bg-emerald-900/40 hover:border-emerald-400 transition-all flex items-center gap-1 active:scale-95"
          >
            <RefreshCw className="w-3 h-3" />
            RE-SEED
          </button>
        </div>
      </div>

      {/* Cyber Reticle Corners */}
      <div className="corner-tl" />
      <div className="corner-tr" />
      <div className="corner-bl" />
      <div className="corner-br" />
    </div>
  );
}
