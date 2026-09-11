import { useState, useEffect, useRef } from 'react';

export function useTypingTracker(climateId) {
  const [charsPerSec, setCharsPerSec] = useState(0);
  const [idleMs, setIdleMs] = useState(0);
  const [intensity, setIntensity] = useState('calm');
  const lastKeystrokeRef = useRef(Date.now());
  const charCountRef = useRef(0);

  const recordKeystroke = () => {
    charCountRef.current += 1;
    lastKeystrokeRef.current = Date.now();
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const idle = now - lastKeystrokeRef.current;
      const cps = charCountRef.current;
      charCountRef.current = 0;
      setCharsPerSec(cps);
      setIdleMs(idle);
      setIntensity(computeIntensity(cps, idle, climateId));
    }, 1000);
    return () => clearInterval(interval);
  }, [climateId]);

  return { charsPerSec, idleMs, intensity, recordKeystroke };
}

function computeIntensity(cps, idleMs, climateId) {
  if (climateId === 'storm') return 'aggressive';
  const idleSec = idleMs / 1000;
  if (idleSec > 60) return 'melancholic';
  if (idleSec > 20) return 'sarcastic';
  if (cps > 8) return 'aggressive';
  if (cps > 3) return 'sarcastic';
  return 'calm';
}
