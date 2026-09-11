import React, { useRef, useEffect, useState } from 'react';

const PLACEHOLDER_CODE = `// Climate Compiler v1.0
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
  const inputBlockedRef = useRef(false);
  const textAreaRef = useRef(null);

  useEffect(() => {
    if (slowInput) {
      inputBlockedRef.current = true;
      const t = setTimeout(() => { inputBlockedRef.current = false; }, 2500);
      return () => clearTimeout(t);
    }
  }, [slowInput]);

  const handleKeyDown = (e) => {
    if (inputBlockedRef.current) { e.preventDefault(); return; }
    
    // Interactive storm mode: typed letters occasionally fly away
    if (climate.id === 'storm' && e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
      const chance = Math.min(0.05 * chaosLevel, 0.4);
      if (Math.random() < chance) {
        e.preventDefault();
        onKeystroke?.();
        
        // Dispatch custom event to spawn letter
        const ta = textAreaRef.current;
        if (ta) {
          const textToCursor = ta.value.substring(0, ta.selectionStart);
          const lines = textToCursor.split('\n');
          const row = lines.length - 1;
          const col = lines[row].length;
          
          const charWidth = 7.8; // approximate for JetBrains Mono 13px
          const lineHeight = 20;
          
          const rect = ta.getBoundingClientRect();
          const x = rect.left + 4 + (col * charWidth); // 4px padding offset
          const y = rect.top + 4 + (row * lineHeight);
          
          window.dispatchEvent(new CustomEvent('storm-letter', { detail: { char: e.key, x, y } }));
        }
        return;
      }
    }
    
    onKeystroke?.();
  };
  const handleChange = (e) => { if (!inputBlockedRef.current) setCode(e.target.value); };

  const lines = code.split('\n');
  const textFilter = {
    rain: `blur(${climate.blur}) drop-shadow(0 0 2px ${climate.palette.accent}33)`,
    sunshine: `drop-shadow(0 0 4px ${climate.palette.accent}66) contrast(1.1)`,
    snow: `blur(${climate.blur}) brightness(0.9)`,
    storm: `drop-shadow(0 0 6px ${climate.palette.accent}99)`,
  }[climate.id] || 'none';

  return (
    <div className={`flex rounded-xl overflow-hidden border text-xs font-mono flex-1 shadow-lg transition-transform ${climate.id === 'storm' && chaosLevel > 3 ? 'animate-glitch' : ''}`}
      style={{ backgroundColor: climate.palette.editorBg, borderColor: climate.palette.border, minHeight: '320px', boxShadow: `inset 0 0 20px rgba(0,0,0,0.5), 0 8px 32px ${climate.palette.bg}` }}>
      <div className="flex flex-col items-end px-4 pt-4 select-none border-r z-20"
        style={{ backgroundColor: 'rgba(0,0,0,0.2)', borderColor: climate.palette.border, color: climate.palette.border, minWidth: '3.5rem' }}>
        {lines.map((_, i) => <div key={i} className="leading-5">{i + 1}</div>)}
      </div>
      <div className="relative flex-1 overflow-hidden bg-gradient-to-br" style={{ backgroundImage: `linear-gradient(to bottom right, transparent, rgba(0,0,0,0.3))` }}>
        <textarea ref={textAreaRef} value={code} onChange={handleChange} onKeyDown={handleKeyDown} spellCheck={false}
          className="absolute inset-0 w-full h-full resize-none bg-transparent outline-none p-4 leading-5 caret-current z-10"
          style={{ color: 'transparent', caretColor: climate.palette.accent, fontFamily: '"JetBrains Mono",monospace', fontSize: '13px', lineHeight: '20px' }} />
        <pre className="absolute inset-0 p-4 leading-5 overflow-hidden whitespace-pre pointer-events-none transition-all duration-500"
          style={{
            color: climate.palette.text, fontFamily: '"JetBrains Mono",monospace', fontSize: '13px', lineHeight: '20px',
            filter: textFilter, animation: climate.textAnimation === 'drift' ? 'drift 8s ease-in-out infinite' : 'none',
          }}>
          {code}
        </pre>
      </div>
    </div>
  );
}
