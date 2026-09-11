import React, { useEffect, useRef, useState } from 'react';

const PARTICLE_COUNT = 120;
function createParticle(width, type) {
  if (type === 'sunshine') {
    return {
      x: Math.random() * -200, y: Math.random() * window.innerHeight,
      radius: Math.random() * 2 + 0.5, speed: Math.random() * 0.5 + 0.1,
      drift: Math.random() * 4 + 2, opacity: Math.random() * 0.5 + 0.2
    };
  }
  return { 
    x: Math.random() * width, y: Math.random() * -100,
    radius: Math.random() * 3 + 1, speed: Math.random() * 1.5 + 0.5,
    drift: (Math.random() - 0.5) * 0.8, opacity: Math.random() * 0.6 + 0.3 
  };
}

export default function ParticleOverlay({ climateId }) {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animRef = useRef(null);
  const [accumulatedDepth, setAccumulatedDepth] = useState(0);

  const active = climateId === 'snow' || climateId === 'sunshine';

  useEffect(() => {
    if (!active) { cancelAnimationFrame(animRef.current); setAccumulatedDepth(0); return; }
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);
    
    particlesRef.current = Array.from({ length: PARTICLE_COUNT }, () => createParticle(canvas.width, climateId));
    let accumulated = 0;
    
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particlesRef.current) {
        ctx.beginPath(); ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        
        if (climateId === 'sunshine') {
          ctx.fillStyle = `rgba(212, 176, 106, ${p.opacity})`;
          p.y += p.speed; p.x += p.drift;
          if (p.x > canvas.width || p.y > canvas.height) {
             Object.assign(p, createParticle(canvas.width, climateId));
          }
        } else {
          ctx.fillStyle = `rgba(210,230,255,${p.opacity})`;
          p.y += p.speed; p.x += p.drift;
          if (p.y > canvas.height) {
             Object.assign(p, createParticle(canvas.width, climateId));
             accumulated = Math.min(accumulated + 0.05, 100);
          }
        }
        ctx.fill();
      }
      setAccumulatedDepth(Math.round(accumulated));
      animRef.current = requestAnimationFrame(draw);
    };
    animRef.current = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(animRef.current); window.removeEventListener('resize', resize); };
  }, [active, climateId]);

  return (
    <>
      <canvas ref={canvasRef} className="fixed inset-0 z-20 pointer-events-none" style={{ display: active ? 'block' : 'none' }} />
      {active && climateId === 'snow' && (
        <div className="fixed inset-0 z-20 pointer-events-none transition-all duration-1000"
          style={{ background: `radial-gradient(ellipse at center, transparent ${100 - accumulatedDepth * 0.4}%, rgba(160,196,255,${accumulatedDepth / 300}) 100%)` }} />
      )}
    </>
  );
}
