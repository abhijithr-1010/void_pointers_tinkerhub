import React, { useEffect, useRef, useState } from 'react';

const FLAKE_COUNT = 120;
function createFlake(width) {
  return { x: Math.random() * width, y: Math.random() * -100,
    radius: Math.random() * 3 + 1, speed: Math.random() * 1.5 + 0.5,
    drift: (Math.random() - 0.5) * 0.8, opacity: Math.random() * 0.6 + 0.3 };
}

export default function SnowOverlay({ active }) {
  const canvasRef = useRef(null);
  const flakesRef = useRef([]);
  const animRef = useRef(null);
  const [snowDepth, setSnowDepth] = useState(0);

  useEffect(() => {
    if (!active) { cancelAnimationFrame(animRef.current); setSnowDepth(0); return; }
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);
    flakesRef.current = Array.from({ length: FLAKE_COUNT }, () => createFlake(canvas.width));
    let accumulated = 0;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const f of flakesRef.current) {
        ctx.beginPath(); ctx.arc(f.x, f.y, f.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(210,230,255,${f.opacity})`; ctx.fill();
        f.y += f.speed; f.x += f.drift;
        if (f.y > canvas.height) { Object.assign(f, createFlake(canvas.width)); accumulated = Math.min(accumulated + 0.05, 100); }
      }
      setSnowDepth(Math.round(accumulated));
      animRef.current = requestAnimationFrame(draw);
    };
    animRef.current = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(animRef.current); window.removeEventListener('resize', resize); };
  }, [active]);

  return (
    <>
      <canvas ref={canvasRef} className="fixed inset-0 z-20 pointer-events-none" style={{ display: active ? 'block' : 'none' }} />
      {active && (
        <div className="fixed inset-0 z-20 pointer-events-none transition-all duration-1000"
          style={{ background: `radial-gradient(ellipse at center, transparent ${100 - snowDepth * 0.4}%, rgba(160,196,255,${snowDepth / 300}) 100%)` }} />
      )}
    </>
  );
}
