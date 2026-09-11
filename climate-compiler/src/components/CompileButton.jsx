import React, { useState } from 'react';
import { getCompileSequence } from '../systems/compileAnimation.js';
import { getCompileMessage } from '../systems/roastEngine.js';

export default function CompileButton({ climate, onCompileComplete }) {
  const [compiling, setCompiling] = useState(false);
  const [progress, setProgress] = useState(0);
  const [label, setLabel] = useState('');

  const handleCompile = async () => {
    if (compiling) return;
    setCompiling(true); setProgress(0);
    for (const step of getCompileSequence(climate.compileStyle)) {
      await new Promise((r) => setTimeout(r, step.delay));
      setProgress(step.percent); setLabel(step.label);
    }
    const result = getCompileMessage(climate.id);
    setCompiling(false);
    onCompileComplete?.(result);
  };

  const barStyle = {
    drip:    { background: `linear-gradient(180deg, ${climate.palette.progressBar}cc, ${climate.palette.progressBar}44)`, animation: 'drip 1.2s ease-in infinite' },
    sunbeam: { background: `linear-gradient(90deg, ${climate.palette.progressBar}, #fff9, ${climate.palette.progressBar})` },
    freeze:  { background: `linear-gradient(90deg, ${climate.palette.progressBar}88, ${climate.palette.progressBar})`, transition: 'width 1.5s ease-out' },
    glitch:  { background: climate.palette.progressBar, animation: 'glitch 0.3s steps(2) infinite' },
  }[climate.compileStyle] || { background: climate.palette.progressBar };

  return (
    <div className="flex flex-col gap-2">
      <button onClick={handleCompile} disabled={compiling}
        className="px-5 py-2 rounded-md font-mono font-bold text-sm border transition-all duration-200 disabled:opacity-60"
        style={{ backgroundColor: compiling ? climate.palette.border : climate.palette.accent, color: climate.palette.bg, borderColor: climate.palette.accent, boxShadow: compiling ? 'none' : `0 0 16px ${climate.palette.glowColor}` }}>
        {compiling ? `⏳ ${climate.emoji} Compiling...` : `▶ Run (${climate.label} Mode)`}
      </button>
      {compiling && (
        <div className="w-full rounded-full overflow-hidden h-2 border" style={{ borderColor: climate.palette.border, backgroundColor: climate.palette.editorBg }}>
          <div className="h-full rounded-full transition-all duration-300" style={{ width: `${progress}%`, ...barStyle }} />
        </div>
      )}
      {compiling && label && <p className="text-xs font-mono opacity-70 italic" style={{ color: climate.palette.text }}>{label}</p>}
    </div>
  );
}
