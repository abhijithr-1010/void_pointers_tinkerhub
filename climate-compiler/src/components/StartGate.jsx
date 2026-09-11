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
        <h1 className="text-2xl font-bold tracking-widest text-center font-sans">CLIMATE COMPILER</h1>
        <p className="opacity-60 text-sm mt-4 text-center px-4 max-w-md font-sans">
          മുന്നറിയിപ്പ്: ഇത് ചുമ്മാ ഒരു എഡിറ്റർ അല്ല. പുറത്തെ കാലാവസ്ഥ ഇതിനെ ഭയങ്കരമായി ബാധിക്കും.
          <br /><br />
          തുടങ്ങാൻ എവിടെയെങ്കിലും ക്ലിക്ക് ചെയ്യുക (Click anywhere to initialize).
        </p>
      </div>
    </div>
  );
}
