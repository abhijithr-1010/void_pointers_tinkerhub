import React, { useState } from 'react';
import { CLIMATES, climateConfig } from '../systems/climateConfig.js';

export default function RoastPanel({ climate, currentRoast, compileResult, insultHistory }) {
  const [filterClimate, setFilterClimate] = useState('all');
  const [showHistory, setShowHistory] = useState(false);
  const filtered = filterClimate === 'all' ? insultHistory : insultHistory.filter((h) => h.climateId === filterClimate);

  let animClass = 'animate-slide-in';
  if (climate.id === 'rain') animClass = 'animate-[slideIn_0.8s_cubic-bezier(0.4,0,0.2,1)]';
  if (climate.id === 'storm') animClass = 'animate-[glitch_0.3s_steps(2)_3]';
  if (climate.id === 'snow') animClass = 'animate-fade-in duration-1000';
  if (climate.id === 'sunshine') animClass = 'animate-[pulseGlow_1s_ease-out]';

  return (
    <div className="rounded-xl border p-5 flex flex-col gap-3 shadow-xl relative overflow-hidden"
      style={{ backgroundColor: climate.palette.panelBg, borderColor: climate.palette.border, color: climate.palette.text, backdropFilter: 'blur(12px)' }}>
      {currentRoast && (
        <div className={`p-4 rounded-lg border-l-4 text-sm font-mono italic shadow-inner ${animClass}`}
          style={{ borderColor: climate.palette.accent, backgroundColor: climate.palette.editorBg }}>
          <span style={{ color: climate.palette.accent }}>{climate.emoji} </span>{currentRoast}
        </div>
      )}
      {compileResult && (
        <div className="p-3 rounded-md text-sm font-mono animate-slide-in"
          style={{ backgroundColor: compileResult.type === 'success' ? `${climate.palette.accent}22` : '#3a000022', borderLeft: `4px solid ${compileResult.type === 'success' ? climate.palette.accent : '#ef4444'}`, color: compileResult.type === 'success' ? climate.palette.accent : '#ef4444' }}>
          <span className="font-bold">{compileResult.type === 'success' ? '✓ BUILD:' : '✗ ERROR:'} </span>{compileResult.message}
        </div>
      )}
      <button className="text-xs font-sans font-bold opacity-60 hover:opacity-100 text-left transition-opacity"
        onClick={() => setShowHistory((s) => !s)} style={{ color: climate.palette.accent }}>
        {showHistory ? '▾' : '▸'} തള്ളൽ ഹിസ്റ്ററി (History) ({insultHistory.length})
      </button>
      {showHistory && (
        <div className="flex flex-col gap-2 max-h-48 overflow-y-auto">
          <div className="flex flex-wrap gap-1">
            <button onClick={() => setFilterClimate('all')}
              className={`px-2 py-0.5 rounded text-xs font-sans font-bold border transition-all ${filterClimate === 'all' ? 'opacity-100' : 'opacity-40'}`}
              style={{ borderColor: climate.palette.border, color: climate.palette.text }}>എല്ലാം (All)</button>
            {CLIMATES.map((id) => (
              <button key={id} onClick={() => setFilterClimate(id)}
                className={`px-2 py-0.5 rounded text-xs font-mono border transition-all ${filterClimate === id ? 'opacity-100' : 'opacity-40'}`}
                style={{ borderColor: climateConfig[id].palette.border, color: climateConfig[id].palette.text }}>
                {climateConfig[id].emoji}
              </button>
            ))}
          </div>
          {filtered.length === 0
            ? <p className="text-xs opacity-40 italic font-sans">ഇതുവരെ ആരും തള്ളിയിട്ടില്ല. ഒന്ന് ശ്രമിച്ച് നോക്ക്.</p>
            : filtered.slice().reverse().map((entry, i) => (
              <div key={i} className="text-xs font-mono px-2 py-1 rounded border-l-2 opacity-80"
                style={{ borderColor: climateConfig[entry.climateId]?.palette.accent, color: climate.palette.text }}>
                <span className="opacity-50 mr-2">{climateConfig[entry.climateId]?.emoji}</span>{entry.message}
                {entry.source && <span className="opacity-30 ml-2">({entry.source})</span>}
              </div>
            ))
          }
        </div>
      )}
    </div>
  );
}
