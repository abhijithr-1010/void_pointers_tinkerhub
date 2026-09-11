import React, { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';

const AudioManager = forwardRef(function AudioManager({ climate, muted }, ref) {
  const ambientRef = useRef(null);
  
  const fadeAmbient = (targetVol) => {
    const ambient = ambientRef.current;
    if (!ambient) return;
    clearInterval(ambient.fadeInterval);
    const steps = 20;
    const step = (targetVol - ambient.volume) / steps;
    let currentStep = 0;
    ambient.fadeInterval = setInterval(() => {
      currentStep++;
      ambient.volume = Math.max(0, Math.min(1, ambient.volume + step));
      if (currentStep >= steps) clearInterval(ambient.fadeInterval);
    }, 40);
  };

  useImperativeHandle(ref, () => ({
    playEffect1() {
      const el = document.getElementById('audio-effect1');
      if (el) { 
        el.currentTime = 0; 
        el.volume = muted ? 0 : 0.7; 
        el.play().catch(() => {});
        
        if (!muted) {
          fadeAmbient(0.3); // Duck volume
          el.onended = () => fadeAmbient(1.0); // Restore volume
        }
      }
    },
  }));

  useEffect(() => {
    if (ambientRef.current) ambientRef.current.muted = muted;
    const fx = document.getElementById('audio-effect1');
    if (fx) fx.muted = muted;
  }, [muted]);

  useEffect(() => {
    if (ambientRef.current) {
      ambientRef.current.pause();
      ambientRef.current.currentTime = 0;
      ambientRef.current.volume = 1.0; // Reset volume in case it was ducked
      clearInterval(ambientRef.current.fadeInterval);
      ambientRef.current.load();
      ambientRef.current.muted = muted;
      ambientRef.current.play().catch(() => {});
    }
    const fx = document.getElementById('audio-effect1');
    if (fx) {
      fx.pause();
      fx.currentTime = 0;
      fx.load();
    }
  }, [climate.id]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <audio ref={ambientRef} loop muted={muted} style={{ display: 'none' }}>
        <source src={climate.audio.ambient} type="audio/mpeg" />
      </audio>
      <audio id="audio-effect1" style={{ display: 'none' }}>
        <source src={climate.audio.effect1} type="audio/mpeg" />
      </audio>
    </>
  );
});

export default AudioManager;
