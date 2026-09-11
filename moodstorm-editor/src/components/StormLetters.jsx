// StormLetters.jsx — DOM-based flying character animation for Storm climate
import React, { useEffect, useRef } from 'react';

/**
 * StormLetters spawns flying character projectiles during Storm climate.
 * Characters are ejected from random positions and fly off-screen.
 * @param {{ active: boolean, audioRef: React.RefObject, intensity: number }} props
 */
export default function StormLetters({ active, audioRef, intensity }) {
  const containerRef = useRef(null);
  const intervalRef = useRef(null);

  const CHARS = 'abcdefghijklmnopqrstuvwxyz0123456789{}()[];:.,=><+-/*#$@%!?|&^~\\`"\'_';

  function spawnLetter() {
    const container = containerRef.current;
    if (!container) return;

    const span = document.createElement('span');
    const char = CHARS[Math.floor(Math.random() * CHARS.length)];
    span.textContent = char;

    const startX = Math.random() * window.innerWidth;
    const startY = Math.random() * window.innerHeight;
    const flyX = (Math.random() - 0.5) * 600;
    const flyY = (Math.random() - 0.5) * 600 - 200;
    const rotate = (Math.random() - 0.5) * 720;

    Object.assign(span.style, {
      position: 'fixed',
      left: `${startX}px`,
      top: `${startY}px`,
      color: `hsl(${260 + Math.random() * 40}, 70%, ${60 + Math.random() * 30}%)`,
      fontFamily: '"JetBrains Mono", monospace',
      fontSize: `${10 + Math.random() * 18}px`,
      fontWeight: 'bold',
      pointerEvents: 'none',
      zIndex: '30',
      transition: `transform ${0.6 + Math.random() * 0.8}s ease-in, opacity ${0.5 + Math.random() * 0.5}s ease-in`,
      transform: 'translate(0,0) rotate(0deg)',
      opacity: '1',
      textShadow: '0 0 8px rgba(124,58,237,0.8)',
    });

    container.appendChild(span);

    // Trigger flight
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        span.style.transform = `translate(${flyX}px, ${flyY}px) rotate(${rotate}deg)`;
        span.style.opacity = '0';
      });
    });

    // Cleanup
    const duration = 1400;
    setTimeout(() => span.remove(), duration);

    // Play thunder on large bursts
    if (Math.random() < 0.08 && audioRef?.current) {
      audioRef.current.playEffect1();
    }
  }

  useEffect(() => {
    if (!active) {
      clearInterval(intervalRef.current);
      // Clear any remaining letters
      if (containerRef.current) containerRef.current.innerHTML = '';
      return;
    }

    const baseInterval = 300;
    const intensityMultiplier = Math.max(1, intensity);
    const spawnInterval = Math.max(60, baseInterval / intensityMultiplier);

    intervalRef.current = setInterval(() => {
      const burstCount = Math.ceil(intensityMultiplier * (1 + Math.random() * 2));
      for (let i = 0; i < burstCount; i++) {
        setTimeout(spawnLetter, i * 30);
      }
    }, spawnInterval);

    return () => clearInterval(intervalRef.current);
  }, [active, intensity]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-30 pointer-events-none overflow-hidden"
    />
  );
}
