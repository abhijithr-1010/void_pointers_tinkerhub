// TransitionOverlay.jsx — full-screen crossfade/glitch animation between climates
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

  const isStorm = climate.id === 'storm';

  return (
    <div
      className="fixed inset-0 z-50 pointer-events-none"
      style={{
        backgroundColor: climate.palette.bg,
        animation: isStorm
          ? 'glitch 0.3s steps(2) 3, fadeIn 0.4s ease-out'
          : 'fadeIn 0.5s ease-out',
        opacity: 0.9,
      }}
    />
  );
}
