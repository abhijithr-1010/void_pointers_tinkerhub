import React, { useEffect, useState } from 'react';

export default function TransitionOverlay({ climate, transitionKey }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!transitionKey) return;
    setVisible(true);
    const t = setTimeout(() => setVisible(false), 1200);
    return () => clearTimeout(t);
  }, [transitionKey]);
  if (!visible) return null;

  let animStyle = 'fadeInOut 1.2s cubic-bezier(0.8, 0, 0.2, 1)';
  if (climate.id === 'storm') animStyle = 'glitchWipe 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)';
  if (climate.id === 'sunshine') animStyle = 'flare 1s ease-out';
  if (climate.id === 'snow') animStyle = 'freezeOver 1.2s ease-in-out';

  return (
    <div
      className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center"
      style={{
        backgroundColor: climate.palette.bg,
        animation: animStyle,
        opacity: 0,
      }}
    >
      <div className="text-6xl animate-pulse" style={{ color: climate.palette.accent }}>{climate.emoji}</div>
    </div>
  );
}
