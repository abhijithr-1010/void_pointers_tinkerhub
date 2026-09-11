import React, { useState, useEffect, useRef, useCallback } from 'react';

import { climateConfig } from './systems/climateConfig.js';
import { fetchWeather, pickRandomCity, randomShiftInterval, pickRandomClimate } from './systems/weatherEngine.js';
import { useTypingTracker } from './systems/typingTracker.js';
import { getRoast } from './systems/roastEngine.js';

import VideoBackground from './components/VideoBackground.jsx';
import AudioManager from './components/AudioManager.jsx';
import TransitionOverlay from './components/TransitionOverlay.jsx';
import WeatherHUD from './components/WeatherHUD.jsx';
import WeatherControls from './components/WeatherControls.jsx';
import CodeEditor from './components/CodeEditor.jsx';
import ParticleOverlay from './components/ParticleOverlay.jsx';
import StormLetters from './components/StormLetters.jsx';
import CompileButton from './components/CompileButton.jsx';
import RoastPanel from './components/RoastPanel.jsx';
import ArgueBox from './components/ArgueBox.jsx';
import StartGate from './components/StartGate.jsx';

export default function App() {
  const [started, setStarted] = useState(false);
  const [climateId, setClimateId] = useState('rain');
  const [weatherData, setWeatherData] = useState(null);
  const [transitionKey, setTransitionKey] = useState(0);
  const [nextClimateId, setNextClimateId] = useState('sunshine');
  const [muted, setMuted] = useState(false);
  const [musicEnabled, setMusicEnabled] = useState(true);
  const audioRef = useRef(null);
  const [slowInput, setSlowInput] = useState(false);
  const [chaosLevel, setChaosLevel] = useState(1);
  const [currentRoast, setCurrentRoast] = useState('');
  const [compileResult, setCompileResult] = useState(null);
  const [insultHistory, setInsultHistory] = useState([]);
  const [runPopup, setRunPopup] = useState(null);

  const climate = climateConfig[climateId];
  const { intensity, recordKeystroke } = useTypingTracker(climateId);

  useEffect(() => {
    const city = pickRandomCity();
    fetchWeather(city).then((result) => { setWeatherData(result); switchClimate(result.climate, false); });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const scheduleNextShift = () => {
      const timer = setTimeout(() => {
        const city = pickRandomCity();
        fetchWeather(city).then((result) => {
          setWeatherData(result);
          setNextClimateId(result.climate);
          switchClimate(result.climate, true);
          scheduleNextShift();
        });
      }, randomShiftInterval());
      return timer;
    };
    const timer = scheduleNextShift();
    return () => clearTimeout(timer);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const interval = setInterval(() => {
      const roast = getRoast(climateId, intensity);
      setCurrentRoast(roast);
      logInsult({ message: roast, climateId, source: 'passive' });
    }, 25000);
    return () => clearInterval(interval);
  }, [climateId, intensity]); // eslint-disable-line react-hooks/exhaustive-deps

  const switchClimate = useCallback((id, animate = true) => {
    if (animate) setTransitionKey((k) => k + 1);
    setClimateId(id);
    setChaosLevel(1);
    setSlowInput(false);
    const cfg = climateConfig[id];
    if (cfg?.nextForecast?.length) {
      setNextClimateId(cfg.nextForecast[Math.floor(Math.random() * cfg.nextForecast.length)]);
    }
  }, []);

  const handlePunishment = useCallback(({ escalateWeather, chaosLevel: cl, slowInput: si }) => {
    if (escalateWeather && escalateWeather !== climateId) switchClimate(escalateWeather, true);
    setChaosLevel((prev) => Math.min(prev + cl, 10));
    if (si) { setSlowInput(true); setTimeout(() => setSlowInput(false), 2500); }
  }, [climateId, switchClimate]);

  const logInsult = useCallback(({ message, climateId: cid, source }) => {
    setInsultHistory((prev) => [...prev.slice(-99), { message, climateId: cid, source }]);
  }, []);

  const handleCompileComplete = useCallback((result) => {
    setCompileResult(result);
    setCurrentRoast(result.message);
    logInsult({ message: result.message, climateId, source: 'compile' });
    
    // Trigger run popup with a fresh roast from the bank
    const popupRoast = getRoast(climateId, 1);
    setRunPopup(popupRoast);
    setTimeout(() => setRunPopup(null), 6000); // Auto-dismiss after 6s
    
    // Play effect sound for the popup
    audioRef.current?.playEffect1();
    
    setTimeout(() => setCompileResult(null), 10000);
  }, [climateId, logInsult]);

  if (!started) {
    return <StartGate onStart={() => setStarted(true)} />;
  }

  return (
    <div style={{
      '--accent': climate.palette.accent, '--text': climate.palette.text, '--bg': climate.palette.bg,
      '--glow': climate.palette.glowColor, transition: 'color 0.6s ease',
      backgroundColor: 'transparent', color: climate.palette.text,
      width: '100vw', height: '100vh', overflow: 'hidden', position: 'relative',
      fontFamily: '"JetBrains Mono", monospace',
    }}>
      <VideoBackground climate={climate} />
      <ParticleOverlay climateId={climateId} />
      <StormLetters active={climateId === 'storm'} audioRef={audioRef} />
      <TransitionOverlay climate={climate} transitionKey={transitionKey} />
      <AudioManager ref={audioRef} climate={climate} muted={muted} musicEnabled={musicEnabled} />

      <div className="relative z-10 flex flex-col h-screen p-5 gap-4 overflow-hidden">
        {/* Top bar */}
        <div className="flex items-center justify-between gap-4 flex-shrink-0 bg-black/20 p-4 rounded-xl shadow-md border border-white/5 backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <span className="text-xl font-bold tracking-widest font-sans"
              style={{ color: climate.palette.accent, textShadow: `0 0 12px ${climate.palette.glowColor}` }}>
              ⚡ CLIMATE COMPILER
            </span>
            <span className="text-xs px-3 py-1 rounded-md border font-sans font-semibold opacity-80"
              style={{ borderColor: climate.palette.border, backgroundColor: climate.palette.buttonBg }}>
              v1.0 · FAKE
            </span>
          </div>
          <WeatherHUD climate={climate} weatherData={weatherData} nextClimate={nextClimateId} />
        </div>

        {/* Controls */}
        <div className="flex-shrink-0">
          <WeatherControls currentClimate={climate} onSwitch={(id) => switchClimate(id, true)}
            muted={muted} musicEnabled={musicEnabled}
            onToggleMute={() => setMuted((m) => !m)} onToggleMusic={() => setMusicEnabled((e) => !e)} />
        </div>

        {/* Editor + sidebar */}
        <div className="flex gap-3 flex-1 min-h-0">
          <div className="flex flex-col gap-3 flex-1 min-w-0">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-t-lg border text-xs font-mono"
              style={{ backgroundColor: climate.palette.editorBg, borderColor: climate.palette.border, color: climate.palette.text }}>
              <span style={{ color: climate.palette.accent }}>●</span>
              <span>untitled_disaster.js</span>
              <span className="ml-auto opacity-40">{climate.emoji} {climate.label} Mode</span>
            </div>
            <CodeEditor climate={climate} onKeystroke={recordKeystroke} slowInput={slowInput} chaosLevel={chaosLevel} />
            <CompileButton climate={climate} onCompileComplete={handleCompileComplete} />
          </div>

          <div className="flex flex-col gap-3 w-72 flex-shrink-0 overflow-y-auto">
            <RoastPanel climate={climate} currentRoast={currentRoast} compileResult={compileResult} insultHistory={insultHistory} />
            <ArgueBox climate={climate} onPunishment={handlePunishment} onLogInsult={logInsult} />
            <div className="rounded-lg border p-3 text-xs font-mono opacity-80 flex flex-col gap-1 backdrop-blur-md shadow-lg"
              style={{ backgroundColor: climate.palette.panelBg, borderColor: climate.palette.border }}>
              <div>🌪 Chaos Level: {chaosLevel}/10</div>
              <div>💬 Insults delivered: {insultHistory.length}</div>
              <div>🎭 Current mood: {intensity}</div>
              <div>⌨ Input: {slowInput ? '🐌 Throttled' : '✓ Normal'}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Run Popup Overlay */}
      {runPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fade-in p-4">
          <div className="rounded-xl border p-6 flex flex-col gap-4 shadow-2xl max-w-md w-full animate-slide-in relative overflow-hidden"
               style={{ backgroundColor: climate.palette.panelBg, borderColor: climate.palette.border }}>
            <div className="flex justify-between items-center border-b pb-2" style={{ borderColor: climate.palette.border }}>
              <span className="font-bold text-lg font-sans tracking-wide" style={{ color: climate.palette.accent, textShadow: `0 0 8px ${climate.palette.glowColor}` }}>
                {climate.emoji} BUILD OUTPUT
              </span>
              <button onClick={() => setRunPopup(null)} className="opacity-60 hover:opacity-100 font-mono text-2xl leading-none" style={{ color: climate.palette.text }}>
                ×
              </button>
            </div>
            <div className="font-mono text-sm leading-relaxed italic border-l-4 pl-3" style={{ color: climate.palette.text, borderColor: climate.palette.accent }}>
              "{runPopup}"
            </div>
            <button onClick={() => setRunPopup(null)}
               className="mt-2 py-2 rounded-md font-sans font-bold uppercase text-sm border transition-all hover:scale-[1.02] active:scale-95"
               style={{ backgroundColor: climate.palette.buttonBg, borderColor: climate.palette.accent, color: climate.palette.accent, boxShadow: `0 0 12px ${climate.palette.glowColor}` }}>
              Acknowledge Failure
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
