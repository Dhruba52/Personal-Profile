import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../context/ThemeContext';

export const CyberBackground: React.FC = () => {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // Check user preference for reduced motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    const handleChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle nodes for robotics lab grid
    const particleCount = Math.min(Math.floor((width * height) / 18000), 55);
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      pulse: number;
    }> = [];

    const colors = isLight
      ? [
          'rgba(2, 132, 199, 0.75)',  // Bright sky blue
          'rgba(8, 145, 178, 0.75)',  // Deep cyan
          'rgba(147, 51, 234, 0.65)', // Royal purple
          'rgba(16, 185, 129, 0.7)',  // Emerald
        ]
      : [
          'rgba(6, 182, 212, 0.7)',  // Cyan
          'rgba(59, 130, 246, 0.6)', // Blue
          'rgba(168, 85, 247, 0.6)', // Purple
          'rgba(0, 240, 255, 0.8)',  // Neon cyan
        ];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        size: Math.random() * 2 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        pulse: Math.random() * Math.PI,
      });
    }

    let lastTime = performance.now();

    const render = (now: number) => {
      const delta = (now - lastTime) / 1000;
      lastTime = now;

      ctx.clearRect(0, 0, width, height);

      // Draw subtle circuit lines connecting nearby particles
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];

        if (!reducedMotion) {
          p1.x += p1.vx * (delta * 60);
          p1.y += p1.vy * (delta * 60);

          if (p1.x < 0) p1.x = width;
          if (p1.x > width) p1.x = 0;
          if (p1.y < 0) p1.y = height;
          if (p1.y > height) p1.y = 0;

          p1.pulse += 0.02;
        }

        // Connect particles with faint circuit lines
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            const alpha = (1 - dist / 130) * (isLight ? 0.3 : 0.22);
            ctx.beginPath();
            ctx.strokeStyle = isLight
              ? `rgba(2, 132, 199, ${alpha})`
              : `rgba(6, 182, 212, ${alpha})`;
            ctx.lineWidth = 0.85;
            // Draw circuit-style angled lines sometimes
            if (dist < 65) {
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
            } else {
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p1.x, p2.y);
              ctx.lineTo(p2.x, p2.y);
            }
            ctx.stroke();
          }
        }

        // Draw particle node
        const currentSize = p1.size + Math.sin(p1.pulse) * 0.5;
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, Math.max(currentSize, 0.8), 0, Math.PI * 2);
        ctx.fillStyle = p1.color;
        ctx.fill();

        // Node glow
        if (p1.size > 2) {
          ctx.beginPath();
          ctx.arc(p1.x, p1.y, currentSize * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = isLight
            ? 'rgba(14, 165, 233, 0.12)'
            : 'rgba(6, 182, 212, 0.05)';
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [reducedMotion, isLight]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Base cyber grid pattern */}
      <div
        className={`absolute inset-0 cyber-grid transition-opacity duration-500 ${
          isLight ? 'opacity-30' : 'opacity-60'
        }`}
      />
      <div
        className={`absolute inset-0 circuit-grid transition-opacity duration-500 ${
          isLight ? 'opacity-25' : 'opacity-40'
        }`}
      />

      {/* Atmospheric radial glow gradients */}
      <div
        className={`absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full blur-[140px] transition-colors duration-500 ${
          isLight ? 'bg-sky-400/15' : 'bg-cyan-600/10'
        }`}
      />
      <div
        className={`absolute top-1/3 -right-40 w-[600px] h-[600px] rounded-full blur-[160px] transition-colors duration-500 ${
          isLight ? 'bg-purple-400/15' : 'bg-purple-600/10'
        }`}
      />
      <div
        className={`absolute -bottom-40 left-1/3 w-[700px] h-[700px] rounded-full blur-[150px] transition-colors duration-500 ${
          isLight ? 'bg-cyan-400/15' : 'bg-blue-600/10'
        }`}
      />

      {/* Canvas for dynamic particles and circuit nodes */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Interactive cursor follower glow */}
      {mousePos.x > -500 && (
        <div
          className={`absolute w-96 h-96 rounded-full blur-3xl pointer-events-none transition-transform duration-75 ease-out ${
            isLight ? 'opacity-25 bg-sky-300' : 'opacity-20 bg-cyan-400'
          }`}
          style={{
            transform: `translate(${mousePos.x - 192}px, ${mousePos.y - 192}px)`,
          }}
        />
      )}
    </div>
  );
};
