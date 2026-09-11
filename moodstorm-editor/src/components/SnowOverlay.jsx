// SnowOverlay.jsx — canvas snow particle system with text accumulation effect
import React, { useEffect, useRef, useState } from 'react';

const FLAKE_COUNT = 120;

function createFlake(width) {
  return {
    x: Math.random() * width,
    y: Math.random() * -100,
    radius: Math.random() * 3 + 1,
    speed: Math.random() * 1.5 + 0.5,
    drift: (Math.random() - 0.5) * 0.8,
    opacity: Math.random() * 0.6 + 0.3,
  };
}

export default function SnowOverlay({ active }) {
  const canvasRef = useRef(null);
  const flakesRef = useRef([]);
  const animRef = useRef(null);
  const [snowDepth, setSnowDepth] = useState(0); // 0–100 %

  useEffect(() => {
    if (!active) {
      cancelAnimationFrame(animRef.current);
      setSnowDepth(0);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    flakesRef.current = Array.from({ length: FLAKE_COUNT }, () =>
      createFlake(canvas.width)
    );

    let accumulated = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const flake of flakesRef.current) {
        ctx.beginPath();
        ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(210, 230, 255, ${flake.opacity})`;
        ctx.fill();

        flake.y += flake.speed;
        flake.x += flake.drift;

        if (flake.y > canvas.height) {
          Object.assign(flake, createFlake(canvas.width));
          accumulated = Math.min(accumulated + 0.05, 100);
        }
      }

      setSnowDepth(Math.round(accumulated));
      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [active]);

  // Expose snowDepth as a CSS variable on the canvas for sibling components
  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-20 pointer-events-none"
        style={{ display: active ? 'block' : 'none' }}
      />
      {/* Frost vignette that grows with accumulation */}
      {active && (
        <div
          className="fixed inset-0 z-21 pointer-events-none transition-all duration-1000"
          style={{
            background: `radial-gradient(ellipse at center, transparent ${100 - snowDepth * 0.4}%, rgba(160,196,255,${snowDepth / 300}) 100%)`,
          }}
        />
      )}
    </>
  );
}
