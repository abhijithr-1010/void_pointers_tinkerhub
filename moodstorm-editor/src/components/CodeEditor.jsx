// CodeEditor.jsx — the fake Monaco-look textarea with weather-driven styling
import React, { useRef, useEffect, useState } from 'react';

const PLACEHOLDER_CODE = `// MoodStorm Editor v1.0
// WARNING: This code will not compile.
// It never could. It never will.

function pretendToWork() {
  const ambition = Infinity;
  const skill = undefined;
  
  try {
    return ambition / skill;
  } catch (e) {
    return "close enough";
  }
}

// TODO: fix everything
// TODO: understand what this does
// TODO: reconsider career choices

export default pretendToWork;`;

export default function CodeEditor({ climate, onKeystroke, slowInput, chaosLevel }) {
  const [code, setCode] = useState(PLACEHOLDER_CODE);
  const textareaRef = useRef(null);
  const inputBlockedRef = useRef(false);

  // Apply slow-input punishment: briefly block keystrokes
  useEffect(() => {
    if (slowInput) {
      inputBlockedRef.current = true;
      const t = setTimeout(() => { inputBlockedRef.current = false; }, 2500);
      return () => clearTimeout(t);
    }
  }, [slowInput]);

  const handleKeyDown = (e) => {
    if (inputBlockedRef.current) {
      e.preventDefault();
      return;
    }
    onKeystroke?.();
  };

  const handleChange = (e) => {
    if (!inputBlockedRef.current) setCode(e.target.value);
  };

  // Line numbers
  const lines = code.split('\n');
  const lineNumbers = lines.map((_, i) => i + 1);

  // Climate-driven text filter
  const textFilter = {
    rain: `blur(${climate.blur}) drop-shadow(0 0 2px ${climate.palette.accent}33)`,
    sunshine: `drop-shadow(0 0 4px ${climate.palette.accent}66) contrast(1.1)`,
    snow: `blur(${climate.blur}) brightness(0.9)`,
    storm: `drop-shadow(0 0 6px ${climate.palette.accent}99)`,
  }[climate.id] || 'none';

  // Storm chaos: add random letter tilt via CSS
  const textTransform = climate.id === 'storm' && chaosLevel > 2
    ? `skewX(${(Math.random() - 0.5) * 3}deg)`
    : 'none';

  return (
    <div
      className="flex rounded-lg overflow-hidden border text-xs font-mono flex-1"
      style={{
        backgroundColor: climate.palette.editorBg,
        borderColor: climate.palette.border,
        minHeight: '320px',
      }}
    >
      {/* Line numbers gutter */}
      <div
        className="flex flex-col items-end px-3 pt-4 select-none border-r"
        style={{
          backgroundColor: climate.palette.editorBg,
          borderColor: climate.palette.border,
          color: climate.palette.border,
          minWidth: '3rem',
        }}
      >
        {lineNumbers.map((n) => (
          <div key={n} className="leading-5">{n}</div>
        ))}
      </div>

      {/* Fake syntax highlighting layer (read-only visual) */}
      <div className="relative flex-1 overflow-hidden">
        <textarea
          ref={textareaRef}
          value={code}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          spellCheck={false}
          className="absolute inset-0 w-full h-full resize-none bg-transparent outline-none p-4 leading-5 caret-current z-10"
          style={{
            color: 'transparent',
            caretColor: climate.palette.accent,
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: '13px',
            lineHeight: '20px',
          }}
        />
        {/* Visual display layer */}
        <pre
          className="absolute inset-0 p-4 leading-5 overflow-hidden whitespace-pre pointer-events-none transition-all duration-500"
          style={{
            color: climate.palette.text,
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: '13px',
            lineHeight: '20px',
            filter: textFilter,
            transform: textTransform,
            animation: climate.textAnimation === 'drift' ? 'drift 8s ease-in-out infinite' : 'none',
          }}
        >
          {code}
        </pre>
      </div>
    </div>
  );
}
