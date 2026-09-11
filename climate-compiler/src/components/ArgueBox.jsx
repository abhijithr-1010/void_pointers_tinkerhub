import React, { useState, useRef } from 'react';
import { getComeback, computePunishment } from '../systems/argueEngine.js';
import { climateConfig } from '../systems/climateConfig.js';

export default function ArgueBox({ climate, onPunishment, onLogInsult }) {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { from: 'editor', text: `${climate.emoji} Go ahead. Argue with me. I dare you.` }
  ]);
  const bottomRef = useRef(null);

  React.useEffect(() => {
    setMessages([{ from: 'editor', text: `${climate.emoji} Climate changed. Your arguments remain invalid.` }]);
  }, [climate.id]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;
    const comeback = getComeback(climate.id);
    const punishmentResult = computePunishment(climateConfig[climate.id].punishment);
    setMessages((prev) => [...prev, { from: 'user', text: trimmed }, { from: 'editor', text: `${climate.emoji} ${comeback}` }]);
    setInput('');
    onPunishment?.(punishmentResult);
    onLogInsult?.({ message: comeback, climateId: climate.id, source: 'argue' });
    setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 50);
  };

  return (
    <div className="rounded-lg border flex flex-col"
      style={{ backgroundColor: climate.palette.panelBg, borderColor: climate.palette.border, color: climate.palette.text, height: '200px' }}>
      <div className="px-3 py-1.5 border-b text-xs font-mono font-semibold opacity-60" style={{ borderColor: climate.palette.border }}>
        💬 Argue with the compiler (you will lose)
      </div>
      <div className="flex-1 overflow-y-auto px-3 py-2 flex flex-col gap-1.5">
        {messages.map((msg, i) => (
          <div key={i} className={`text-xs font-mono px-2 py-1 rounded max-w-[90%] ${msg.from === 'user' ? 'self-end' : 'self-start'}`}
            style={{ backgroundColor: msg.from === 'user' ? climate.palette.buttonBg : climate.palette.editorBg, color: msg.from === 'user' ? climate.palette.text : climate.palette.accent, borderLeft: msg.from === 'editor' ? `3px solid ${climate.palette.accent}` : 'none' }}>
            {msg.text}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <form onSubmit={handleSubmit} className="flex items-center border-t gap-2 px-3 py-2" style={{ borderColor: climate.palette.border }}>
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)}
          placeholder="Type your futile argument..."
          className="flex-1 bg-transparent outline-none text-xs font-mono" style={{ color: climate.palette.text }} />
        <button type="submit" className="text-xs font-mono px-2 py-1 rounded border transition-all"
          style={{ backgroundColor: climate.palette.accent, color: climate.palette.bg, borderColor: climate.palette.accent }}>
          Send
        </button>
      </form>
    </div>
  );
}
