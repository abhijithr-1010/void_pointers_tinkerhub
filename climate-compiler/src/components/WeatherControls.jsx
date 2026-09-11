import React from 'react';
import { CLIMATES, climateConfig } from '../systems/climateConfig.js';
import { pickRandomClimate } from '../systems/weatherEngine.js';

export default function WeatherControls({ currentClimate, onSwitch, muted, onToggleMute }) {
  const handleSurprise = () => {
    let next;
    do { next = pickRandomClimate(); } while (next === currentClimate.id);
    onSwitch(next);
  };

  return (
    <div className="flex flex-wrap items-center gap-2 z-40 relative p-2 rounded-xl border backdrop-blur-md"
         style={{ backgroundColor: 'rgba(0,0,0,0.4)', borderColor: currentClimate.palette.border }}>
      {CLIMATES.map((id) => {
        const cfg = climateConfig[id];
        const active = id === currentClimate.id;
        return (
          <button key={id} onClick={() => onSwitch(id)}
            className={`px-3 py-1.5 rounded-lg text-sm font-sans font-bold flex items-center gap-2 transition-all ${active ? 'scale-105' : 'hover:scale-105 opacity-60 hover:opacity-100'}`}
            style={{
              backgroundColor: active ? cfg.palette.buttonBg : 'transparent',
              color: active ? cfg.palette.text : '#999',
              boxShadow: active ? `0 0 12px ${cfg.palette.glowColor}` : 'none',
              border: `1px solid ${active ? cfg.palette.accent : 'transparent'}`,
            }}>
            <span>{cfg.emoji}</span> <span>{cfg.label}</span>
          </button>
        );
      })}
      
      <div className="w-px h-6 my-auto bg-gray-500/50 mx-2" />
      
      <button onClick={onToggleMute}
        className="px-3 py-1.5 rounded-lg text-sm font-sans font-bold transition-all hover:scale-105 opacity-80 border border-transparent"
        style={{ color: currentClimate.palette.text }}>
        {muted ? '🔇 മ്യൂട്ട് (Mute)' : '🔊 സൗണ്ട് വേണം (Unmute)'}
      </button>
      
      <button onClick={handleSurprise}
        className="px-3 py-1.5 rounded-lg text-sm font-sans font-bold transition-all hover:scale-105 border ml-auto"
        style={{ backgroundColor: currentClimate.palette.buttonBg, borderColor: currentClimate.palette.accent, color: currentClimate.palette.accent }}>
        🎲 ഒന്നെടുത്ത് തരുമോ (Surprise Me)
      </button>
    </div>
  );
}
