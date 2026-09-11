import React, { useEffect, useRef } from 'react';

const CHARS = 'abcdefghijklmnopqrstuvwxyz0123456789{}()[];:.,=><+-/*#$@%!?|&^~\\`"\'_';

export default function StormLetters({ active, audioRef }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!active && containerRef.current) containerRef.current.innerHTML = '';
    
    const handleStormLetter = (e) => {
      if (!active || !containerRef.current) return;
      const { char, x, y } = e.detail;
      const span = document.createElement('span');
      span.textContent = char;
      const flyX = (Math.random() - 0.5) * 800;
      const flyY = (Math.random() - 0.5) * 800 - 300;
      const rotate = (Math.random() - 0.5) * 1080;
      
      Object.assign(span.style, {
        position: 'fixed', left: `${x}px`, top: `${y}px`,
        color: `hsl(${260 + Math.random() * 40},70%,${60 + Math.random() * 30}%)`,
        fontFamily: '"JetBrains Mono",monospace', fontSize: `13px`,
        fontWeight: 'bold', pointerEvents: 'none', zIndex: '30',
        transition: `transform ${0.5 + Math.random() * 0.7}s cubic-bezier(0.2, 0.8, 0.2, 1), opacity ${0.5 + Math.random() * 0.5}s ease-in`,
        transform: 'translate(0,0) rotate(0deg) scale(1)', opacity: '1',
        textShadow: '0 0 12px rgba(124,58,237,1)',
      });
      containerRef.current.appendChild(span);
      
      requestAnimationFrame(() => requestAnimationFrame(() => {
        span.style.transform = `translate(${flyX}px,${flyY}px) rotate(${rotate}deg) scale(${1.5 + Math.random() * 2})`;
        span.style.opacity = '0';
      }));
      
      if (Math.random() < 0.15 && audioRef?.current) audioRef.current.playEffect1();
      setTimeout(() => span.remove(), 1200);
    };

    window.addEventListener('storm-letter', handleStormLetter);
    return () => window.removeEventListener('storm-letter', handleStormLetter);
  }, [active]); // eslint-disable-line react-hooks/exhaustive-deps

  return <div ref={containerRef} className="fixed inset-0 z-30 pointer-events-none overflow-hidden" />;
}
