// AudioManager.jsx — manages all audio layers per climate
import React, { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';

const AudioManager = forwardRef(function AudioManager({ climate, muted, musicEnabled }, ref) {
  const ambientRef = useRef(null);
  const musicRef = useRef(null);

  // Expose playEffect1 to parent via ref
  useImperativeHandle(ref, () => ({
    playEffect1() {
      const el = document.getElementById('audio-effect1');
      if (el) {
        el.currentTime = 0;
        el.volume = muted ? 0 : 0.7;
        el.play().catch(() => {});
      }
    },
  }));

  // Update mute state on all elements
  useEffect(() => {
    if (ambientRef.current) ambientRef.current.muted = muted;
    if (musicRef.current) musicRef.current.muted = muted || !musicEnabled;
    const fx = document.getElementById('audio-effect1');
    if (fx) fx.muted = muted;
  }, [muted, musicEnabled]);

  // Reload ambient + music on climate change
  useEffect(() => {
    if (ambientRef.current) {
      ambientRef.current.load();
      ambientRef.current.muted = muted;
      ambientRef.current.play().catch(() => {});
    }
    if (musicRef.current) {
      musicRef.current.load();
      musicRef.current.muted = muted || !musicEnabled;
      if (musicEnabled && !muted) musicRef.current.play().catch(() => {});
    }
  }, [climate.id]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <audio ref={ambientRef} loop muted={muted} style={{ display: 'none' }}>
        <source src={climate.audio.ambient} type="audio/mpeg" />
      </audio>
      <audio
        ref={musicRef}
        loop
        muted={muted || !musicEnabled}
        style={{ display: 'none' }}
      >
        <source src={climate.audio.music} type="audio/mpeg" />
      </audio>
      {/* Effect1 lives as a non-looping element — played imperatively */}
      <audio id="audio-effect1" style={{ display: 'none' }}>
        <source src={climate.audio.effect1} type="audio/mpeg" />
      </audio>
    </>
  );
});

export default AudioManager;
