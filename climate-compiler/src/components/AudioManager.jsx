import React, { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';

const AudioManager = forwardRef(function AudioManager({ climate, muted, musicEnabled }, ref) {
  const ambientRef = useRef(null);
  const musicRef = useRef(null);

  useImperativeHandle(ref, () => ({
    playEffect1() {
      const el = document.getElementById('audio-effect1');
      if (el) { el.currentTime = 0; el.volume = muted ? 0 : 0.7; el.play().catch(() => {}); }
    },
  }));

  useEffect(() => {
    if (ambientRef.current) ambientRef.current.muted = muted;
    if (musicRef.current) musicRef.current.muted = muted || !musicEnabled;
    const fx = document.getElementById('audio-effect1');
    if (fx) fx.muted = muted;
  }, [muted, musicEnabled]);

  useEffect(() => {
    if (ambientRef.current) {
      ambientRef.current.pause();
      ambientRef.current.currentTime = 0;
      ambientRef.current.load();
      ambientRef.current.muted = muted;
      ambientRef.current.play().catch(() => {});
    }
    if (musicRef.current) {
      musicRef.current.pause();
      musicRef.current.currentTime = 0;
      musicRef.current.load();
      musicRef.current.muted = muted || !musicEnabled;
      if (musicEnabled && !muted) musicRef.current.play().catch(() => {});
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
      <audio ref={musicRef} loop muted={muted || !musicEnabled} style={{ display: 'none' }}>
        <source src={climate.audio.music} type="audio/mpeg" />
      </audio>
      <audio id="audio-effect1" style={{ display: 'none' }}>
        <source src={climate.audio.effect1} type="audio/mpeg" />
      </audio>
    </>
  );
});

export default AudioManager;
