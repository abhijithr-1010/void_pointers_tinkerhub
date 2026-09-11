import React, { useEffect, useState } from 'react';

export default function TransitionOverlay({ climate, transitionKey }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!transitionKey) return;
    setVisible(true);
    const t = setTimeout(() => setVisible(false), 900);
    return () => clearTimeout(t);
  }, [transitionKey]);
  if (!visible) return null;
  return (
    <div
      className="fixed inset-0 z-50 pointer-events-none"
      style={{
        backgroundColor: climate.palette.bg,
        animation: climate.id === 'storm'
          ? 'glitch 0.3s steps(2) 3, fadeIn 0.4s ease-out'
          : 'fadeIn 0.5s ease-out',
        opacity: 0.9,
      }}
    />
  );
}
