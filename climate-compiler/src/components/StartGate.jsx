import React from 'react';

export default function StartGate({ onStart }) {
  return (
    <div
      onClick={onStart}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black cursor-pointer text-white"
      style={{ fontFamily: '"JetBrains Mono", monospace' }}
    >
      <div className="animate-pulse flex flex-col items-center gap-4">
        <span className="text-4xl">⚡</span>
        <h1 className="text-2xl font-bold tracking-widest text-center">CLIMATE COMPILER</h1>
        <p className="opacity-60 text-sm mt-4 text-center px-4 max-w-md">
          Warning: This editor is heavily influenced by real-world weather conditions.
          <br /><br />
          Click anywhere to initialize.
        </p>
      </div>
    </div>
  );
}
