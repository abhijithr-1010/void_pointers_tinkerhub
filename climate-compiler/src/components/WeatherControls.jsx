import React from 'react';
import { CLIMATES, climateConfig } from '../systems/climateConfig.js';
import { pickRandomClimate } from '../systems/weatherEngine.js';

export default function WeatherControls({ currentClimate, onSwitch, muted, musicEnabled, onToggleMute, onToggleMusic }) {
  const handleSurprise = () => {
    let next;
    do { next = pickRandomClimate(); } while (next === currentClimate.id);
    onSwitch(next);
  };
  return (
    <div className="flex flex-wrap items-center gap-2">
      {CLIMATES.map((id) => {
        const cfg = climateConfig[id];
        const active = id === currentClimate.id;
        return (
          <button key={id} onClick={() => onSwitch(id)}
            className="px-3 py-1.5 rounded-md text-xs font-mono font-semibold border transition-all duration-200 backdrop-blur-md"
            style={{
              backgroundColor: active ? cfg.palette.accent : cfg.palette.buttonBg,
              color: active ? cfg.palette.bg : cfg.palette.text,
              borderColor: cfg.palette.border,
              boxShadow: active ? `0 0 12px ${cfg.palette.glowColor}` : 'none',
              transform: active ? 'scale(1.05)' : 'scale(1)',
            }}>
            {cfg.emoji} {cfg.label}
          </button>
        );
      })}
      <button onClick={handleSurprise}
        className="px-3 py-1.5 rounded-md text-xs font-mono font-semibold border transition-all duration-200 backdrop-blur-md opacity-80 hover:opacity-100"
        style={{ backgroundColor: currentClimate.palette.buttonBg, borderColor: currentClimate.palette.border, color: currentClimate.palette.text }}>
        🎲 Surprise Me
      </button>
      <div className="ml-auto flex gap-2">
        <button onClick={onToggleMute}
          className="px-3 py-1.5 rounded-md text-xs font-mono border transition-all backdrop-blur-md opacity-80 hover:opacity-100"
          style={{ backgroundColor: currentClimate.palette.buttonBg, borderColor: currentClimate.palette.border, color: currentClimate.palette.text }}>
          {muted ? '🔇' : '🔊'} {muted ? 'Unmute' : 'Mute'}
        </button>
        <button onClick={onToggleMusic}
          className="px-3 py-1.5 rounded-md text-xs font-mono border transition-all backdrop-blur-md opacity-80 hover:opacity-100"
          style={{ backgroundColor: currentClimate.palette.buttonBg, borderColor: currentClimate.palette.border, color: currentClimate.palette.text }}>
          {musicEnabled ? '🎵' : '🚫'} Music
        </button>
      </div>
    </div>
  );
}
