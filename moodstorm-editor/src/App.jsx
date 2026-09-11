// App.jsx — root orchestrator: weather, climate, roasts, punishments
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
import SnowOverlay from './components/SnowOverlay.jsx';
import StormLetters from './components/StormLetters.jsx';
import CompileButton from './components/CompileButton.jsx';
import RoastPanel from './components/RoastPanel.jsx';
import ArgueBox from './components/ArgueBox.jsx';

export default function App() {
  // ── Climate state ──────────────────────────────────────────
  const [climateId, setClimateId] = useState('rain');
  const [weatherData, setWeatherData] = useState(null);
  const [transitionKey, setTransitionKey] = useState(0);
  const [nextClimateId, setNextClimateId] = useState('sunshine');

  // ── Audio controls ─────────────────────────────────────────
  const [muted, setMuted] = useState(false);
  const [musicEnabled, setMusicEnabled] = useState(true);
  const audioRef = useRef(null);

  // ── Punishment state ───────────────────────────────────────
  const [slowInput, setSlowInput] = useState(false);
  const [chaosLevel, setChaosLevel] = useState(1);

  // ── Roast / compile state ──────────────────────────────────
  const [currentRoast, setCurrentRoast] = useState('');
  const [compileResult, setCompileResult] = useState(null);
  const [insultHistory, setInsultHistory] = useState([]);

  const climate = climateConfig[climateId];

  // ── Typing tracker ─────────────────────────────────────────
  const { intensity, recordKeystroke } = useTypingTracker(climateId);

  // ── Initial weather fetch on mount ─────────────────────────
  useEffect(() => {
    const city = pickRandomCity();
    fetchWeather(city).then((result) => {
      setWeatherData(result);
      switchClimate(result.climate, false);
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Auto-shift timer ───────────────────────────────────────
  useEffect(() => {
    const scheduleNextShift = () => {
      const delay = randomShiftInterval();
      const timer = setTimeout(() => {
        const next = pickRandomClimate();
        setNextClimateId(next);
        // Fetch fresh weather for a new random city
        const city = pickRandomCity();
        fetchWeather(city).then((result) => {
          setWeatherData(result);
          switchClimate(result.climate, true);
          scheduleNextShift();
        });
      }, delay);
      return timer;
    };

    const timer = scheduleNextShift();
    return () => clearTimeout(timer);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Periodic passive roast when idle ───────────────────────
  useEffect(() => {
    const interval = setInterval(() => {
      const roast = getRoast(climateId, intensity);
      setCurrentRoast(roast);
      logInsult({ message: roast, climateId, source: 'passive' });
    }, 25000); // every 25 s
    return () => clearInterval(interval);
  }, [climateId, intensity]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Climate switch ─────────────────────────────────────────
  const switchClimate = useCallback((id, animate = true) => {
    if (animate) {
      setTransitionKey((k) => k + 1);
    }
    setClimateId(id);
    setChaosLevel(1);
    setSlowInput(false);

    // Pick next forecast from the new climate's list
    const cfg = climateConfig[id];
    if (cfg?.nextForecast?.length) {
      setNextClimateId(cfg.nextForecast[Math.floor(Math.random() * cfg.nextForecast.length)]);
    }
  }, []);

  // ── Punishment handler ─────────────────────────────────────
  const handlePunishment = useCallback(({ escalateWeather, chaosLevel: cl, slowInput: si }) => {
    if (escalateWeather && escalateWeather !== climateId) {
      switchClimate(escalateWeather, true);
    }
    setChaosLevel((prev) => Math.min(prev + cl, 10));
    if (si) {
      setSlowInput(true);
      setTimeout(() => setSlowInput(false), 2500);
    }
  }, [climateId, switchClimate]);

  // ── Insult logger ─────────────────────────────────────────
  const logInsult = useCallback(({ message, climateId: cid, source }) => {
    setInsultHistory((prev) => [...prev.slice(-99), { message, climateId: cid, source }]);
  }, []);

  // ── Compile complete handler ───────────────────────────────
  const handleCompileComplete = useCallback((result) => {
    setCompileResult(result);
    setCurrentRoast(result.message);
    logInsult({ message: result.message, climateId, source: 'compile' });
    setTimeout(() => setCompileResult(null), 10000);
  }, [climateId, logInsult]);

  // ── CSS vars injected at root ──────────────────────────────
  const rootStyle = {
    '--accent': climate.palette.accent,
    '--text': climate.palette.text,
    '--bg': climate.palette.bg,
    '--glow': climate.palette.glowColor,
    transition: 'background-color 0.8s ease, color 0.6s ease',
    backgroundColor: climate.palette.bg,
    color: climate.palette.text,
    width: '100vw',
    height: '100vh',
    overflow: 'hidden',
    position: 'relative',
    fontFamily: '"JetBrains Mono", monospace',
  };

  return (
    <div style={rootStyle}>
      {/* ── Background layers ── */}
      <VideoBackground climate={climate} />
      <SnowOverlay active={climateId === 'snow'} />
      <StormLetters active={climateId === 'storm'} audioRef={audioRef} intensity={chaosLevel} />
      <TransitionOverlay climate={climate} transitionKey={transitionKey} />

      {/* ── Audio (invisible) ── */}
      <AudioManager
        ref={audioRef}
        climate={climate}
        muted={muted}
        musicEnabled={musicEnabled}
      />

      {/* ── Main layout ── */}
      <div className="relative z-10 flex flex-col h-screen p-4 gap-3 overflow-hidden">

        {/* ── Top bar ── */}
        <div className="flex items-center justify-between gap-3 flex-shrink-0">
          {/* Title */}
          <div className="flex items-center gap-3">
            <span
              className="text-lg font-bold tracking-widest"
              style={{ color: climate.palette.accent, textShadow: `0 0 12px ${climate.palette.glowColor}` }}
            >
              ⚡ MOODSTORM EDITOR
            </span>
            <span
              className="text-xs px-2 py-0.5 rounded border font-mono opacity-60"
              style={{ borderColor: climate.palette.border }}
            >
              v1.0 · FAKE
            </span>
          </div>

          {/* Weather HUD */}
          <WeatherHUD
            climate={climate}
            weatherData={weatherData}
            nextClimate={nextClimateId}
          />
        </div>

        {/* ── Climate controls ── */}
        <div className="flex-shrink-0">
          <WeatherControls
            currentClimate={climate}
            onSwitch={(id) => switchClimate(id, true)}
            muted={muted}
            musicEnabled={musicEnabled}
            onToggleMute={() => setMuted((m) => !m)}
            onToggleMusic={() => setMusicEnabled((e) => !e)}
          />
        </div>

        {/* ── Editor + sidebar ── */}
        <div className="flex gap-3 flex-1 min-h-0">

          {/* Editor column */}
          <div className="flex flex-col gap-3 flex-1 min-w-0">
            {/* Editor tab bar */}
            <div
              className="flex items-center gap-2 px-3 py-1.5 rounded-t-lg border text-xs font-mono"
              style={{
                backgroundColor: climate.palette.editorBg,
                borderColor: climate.palette.border,
                color: climate.palette.text,
              }}
            >
              <span style={{ color: climate.palette.accent }}>●</span>
              <span>untitled_disaster.js</span>
              <span className="ml-auto opacity-40">{climate.emoji} {climate.label} Mode</span>
            </div>

            <CodeEditor
              climate={climate}
              onKeystroke={recordKeystroke}
              slowInput={slowInput}
              chaosLevel={chaosLevel}
            />

            <CompileButton
              climate={climate}
              onCompileComplete={handleCompileComplete}
            />
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-3 w-72 flex-shrink-0 overflow-y-auto">
            <RoastPanel
              climate={climate}
              currentRoast={currentRoast}
              compileResult={compileResult}
              insultHistory={insultHistory}
            />

            <ArgueBox
              climate={climate}
              onPunishment={handlePunishment}
              onLogInsult={logInsult}
            />

            {/* Stats footer */}
            <div
              className="rounded-lg border p-3 text-xs font-mono opacity-60 flex flex-col gap-1"
              style={{ backgroundColor: climate.palette.panelBg, borderColor: climate.palette.border }}
            >
              <div>🌪 Chaos Level: {chaosLevel}/10</div>
              <div>💬 Insults delivered: {insultHistory.length}</div>
              <div>🎭 Current mood: {intensity}</div>
              <div>⌨ Input: {slowInput ? '🐌 Throttled' : '✓ Normal'}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
