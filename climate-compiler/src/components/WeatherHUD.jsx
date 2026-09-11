import React from 'react';
import { climateConfig } from '../systems/climateConfig.js';

export default function WeatherHUD({ climate, weatherData, nextClimate }) {
  const next = climateConfig[nextClimate];
  return (
    <div
      className="flex items-center gap-4 px-4 py-2 rounded-lg text-xs font-mono backdrop-blur-sm border"
      style={{ backgroundColor: climate.palette.hudBg, borderColor: climate.palette.border, color: climate.palette.text }}
    >
      <span className="text-lg">{climate.emoji}</span>
      <div className="flex flex-col">
        <span className="font-semibold" style={{ color: climate.palette.accent }}>{climate.label}</span>
        {weatherData?.city && <span className="opacity-70">{weatherData.city.name}, {weatherData.city.country}</span>}
      </div>
      {weatherData?.temp != null && (
        <div className="flex flex-col items-center px-3 border-l border-r" style={{ borderColor: climate.palette.border }}>
          <span className="text-base font-bold" style={{ color: climate.palette.accent }}>{weatherData.temp}°C</span>
          <span className="opacity-60">{weatherData.description}</span>
        </div>
      )}
      {weatherData?.source === 'fallback' && (
        <div className="flex flex-col px-3 border-l border-r opacity-60 font-sans" style={{ borderColor: climate.palette.border }}>
          <span>ഓഫ്‌ലൈൻ മോഡ് (Offline)</span>
        </div>
      )}
      {next && (
        <div className="flex items-center gap-1 opacity-70 font-sans">
          <span>→ വരുന്നു: {next.emoji} {next.label}</span>
        </div>
      )}
    </div>
  );
}
