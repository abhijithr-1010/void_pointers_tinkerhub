// ============================================================
//  climateConfig.js — SINGLE SOURCE OF TRUTH
//  All 4 climate states: colors, physics, audio/video paths, roast banks.
//  Adding a 5th climate = add one entry here. Zero code changes elsewhere.
// ============================================================

export const CLIMATES = ['rain', 'sunshine', 'snow', 'storm'];

import rainAmbient from '../assets/audio/rain/ambient.mp3';
import rainEffect1 from '../assets/audio/rain/effect1.mp3';
import rainMusic from '../assets/audio/rain/music.mp3';
import sunshineAmbient from '../assets/audio/sunshine/ambient.mp3';
import sunshineEffect1 from '../assets/audio/sunshine/effect1.mp3';
import sunshineMusic from '../assets/audio/sunshine/music.mp3';
import snowAmbient from '../assets/audio/snow/ambient.mp3';
import snowEffect1 from '../assets/audio/snow/effect1.mp3';
import snowMusic from '../assets/audio/snow/music.mp3';
import stormAmbient from '../assets/audio/storm/ambient.mp3';
import stormEffect1 from '../assets/audio/storm/effect1.mp3';
import stormMusic from '../assets/audio/storm/music.mp3';

import rainVideo from '../assets/video/rain/background.mp4';
import sunshineVideo from '../assets/video/sunshine/background.mp4';
import snowVideo from '../assets/video/snow/background.mp4';
import stormVideo from '../assets/video/storm/background.mp4';

export const climateConfig = {
  rain: {
    id: 'rain',
    label: 'Rain',
    emoji: '🌧️',
    palette: {
      bg: 'rgba(5, 5, 16, 0.4)',
      accent: '#60a5fa',
      text: '#94a3b8',
      border: 'rgba(42, 74, 106, 0.5)',
      buttonBg: 'rgba(10, 21, 32, 0.65)',
      progressBar: '#4a90d9',
      editorBg: 'rgba(10, 21, 32, 0.5)',
      hudBg: 'rgba(10, 21, 32, 0.6)',
      panelBg: 'rgba(13, 26, 42, 0.6)',
      glowColor: '#4a90d9',
    },
    blur: '1.2px',
    textAnimation: 'drift',
    letterPhysics: 'float',
    audio: {
      ambient: rainAmbient,
      effect1: rainEffect1,
      music: rainMusic,
    },
    video: rainVideo,
    compileStyle: 'drip',
    intensity: 'melancholic',
    roastBank: [
      "Your code weeps like the sky. Even the rain is embarrassed.",
      "404: Talent not found. Try checking under the puddles.",
      "The forecast calls for 100% chance of you never shipping this.",
      "Your syntax is as washed out as your dreams, unfortunately.",
      "Even the clouds are writing better code than you right now.",
      "Compilation failed. The rain agrees — this was a mistake.",
      "Your variable names are as murky as floodwater.",
      "I've seen better logic in a leaking roof.",
      "The error messages are longer than your attention span.",
      "Your indentation is as inconsistent as April weather.",
      "The rain washes many things away. Sadly, not your code.",
      "Every semicolon you missed is a teardrop from your future self.",
      "Null pointer exception. Much like your grasp on programming.",
      "Your code compiles the same way rain falls upward: it doesn't.",
      "The drizzle outside has more direction than this function.",
      "Stack overflow. Fitting — your ambition overflows your ability.",
    ],
    argueResponses: [
      "The rain doesn't argue. Neither should you. Yet here we are.",
      "Bold of you to talk back while producing zero working functions.",
      "The puddles outside have more depth than this rebuttal.",
      "I'm adding another bug to your file for that comment.",
      "The weather forecast: continued delusion with a chance of debugging.",
      "Every character you just typed made your code 0.3% worse.",
      "Noted. Deploying extra rain as punishment.",
      "The clouds have spoken. You are wrong.",
      "Your argument dissolved in the first drizzle. Sad.",
      "I've seen better logic in a puddle reflection.",
    ],
    punishment: 'intensifyRain',
    nextForecast: ['storm', 'snow', 'sunshine'],
    compileMessages: {
      success: [
        "Build succeeded. The rain weeps tears of confusion.",
        "Compiled. Don't ask how. The puddles know.",
        "It ran. Once. The rain won't let it happen again.",
      ],
      failure: [
        "Fatal: Your semicolons dissolved in the downpour.",
        "Rain-soaked compile log. 47 errors, 0 survivors.",
        "Waterlogged build. The server needed a towel.",
        "The compiler cried. That's why it's raining.",
      ],
    },
  },

  sunshine: {
    id: 'sunshine',
    label: 'Sunshine',
    emoji: '☀️',
    palette: {
      bg: 'rgba(255, 255, 255, 0.15)',
      accent: '#f5a623',
      text: '#fff3cc',
      border: 'rgba(255, 255, 255, 0.3)',
      buttonBg: 'rgba(42, 31, 0, 0.65)',
      progressBar: '#f5a623',
      editorBg: 'rgba(17, 13, 0, 0.5)',
      hudBg: 'rgba(17, 13, 0, 0.55)',
      panelBg: 'rgba(26, 18, 0, 0.55)',
      glowColor: '#f5a623',
    },
    blur: '0px',
    textAnimation: 'sharp',
    letterPhysics: 'crisp',
    audio: {
      ambient: sunshineAmbient,
      effect1: sunshineEffect1,
      music: sunshineMusic,
    },
    video: sunshineVideo,
    compileStyle: 'sunbeam',
    intensity: 'sarcastic',
    roastBank: [
      "Error: Your brilliance blinded everyone, including the compiler.",
      "So sunny outside. So dark inside your logic.",
      "The sun shines on everything. Even terrible code. Especially yours.",
      "Compilation complete: 47 warnings, 0 features, 100% disappointment.",
      "Golden hour can't save you from this garbage.",
      "Your code is radiant the same way a dumpster fire is radiant.",
      "The light reveals all. Including how bad this function is.",
      "Even UV rays can't bleach away this bug count.",
      "Sunshine makes flowers grow. Your code makes senior devs cry.",
      "Clear skies, yet somehow you still can't see the obvious error.",
      "The sun has been burning for 4.6 billion years. Your code: 12 minutes. Already dead.",
      "Ironic how bright it is when your future as a developer is so dim.",
      "I ran your code. The compiler needed sunglasses.",
      "This is the warmest rejection your code has ever received.",
      "Success! Just kidding. Spectacular failure under beautiful skies.",
      "High contrast mode activated. Your errors are now blindingly obvious.",
    ],
    argueResponses: [
      "Interesting. Wrong, but interesting.",
      "The sun doesn't care about your opinion. Neither do I.",
      "That argument is as hollow as a sunbeam.",
      "Congratulations! You've earned bonus compile errors.",
      "I've highlighted your latest mistake in bright yellow.",
      "Basking in your own delusion, I see.",
      "Triggering Solar Flare punishment mode. You asked for it.",
      "Even the sun sets. Your argument already has.",
      "The light of day does not flatter this take.",
      "Warm, confident, and completely wrong.",
    ],
    punishment: 'glare',
    nextForecast: ['rain', 'storm', 'snow'],
    compileMessages: {
      success: [
        "Compiled successfully! …and then immediately deprecated itself.",
        "Build passed. The sun is just as shocked as you are.",
        "Success! The output is wrong, but at least it ran.",
      ],
      failure: [
        "Compilation failed. The brightness only illuminates the damage.",
        "Solar-powered build process. Unfortunately powered off.",
        "99% complete — then it saw your variable names.",
        "The sun gave up. That's saying something.",
      ],
    },
  },

  snow: {
    id: 'snow',
    label: 'Snow',
    emoji: '❄️',
    palette: {
      bg: 'rgba(13, 17, 23, 0.4)',
      accent: '#a0c4ff',
      text: '#d4e8ff',
      border: 'rgba(42, 58, 90, 0.5)',
      buttonBg: 'rgba(16, 24, 40, 0.65)',
      progressBar: '#a0c4ff',
      editorBg: 'rgba(7, 12, 20, 0.5)',
      hudBg: 'rgba(7, 12, 20, 0.55)',
      panelBg: 'rgba(10, 15, 26, 0.55)',
      glowColor: '#a0c4ff',
    },
    blur: '0.5px',
    textAnimation: 'freeze',
    letterPhysics: 'crystallize',
    audio: {
      ambient: snowAmbient,
      effect1: snowEffect1,
      music: snowMusic,
    },
    video: snowVideo,
    compileStyle: 'freeze',
    intensity: 'melancholic',
    roastBank: [
      "Your code is frozen in time. Mostly because it never worked to begin with.",
      "Everything is buried under the weight of your own mistakes.",
      "Cold, silent, and going nowhere. Much like your career trajectory.",
      "The snowflakes fall in a beautiful pattern. Your code: chaos.",
      "Compilation halted. The server needed a moment to grieve.",
      "Your logic froze mid-thought. Relatable, but not ideal.",
      "The snowfall accumulates. So do your unresolved TODOs.",
      "Null. Null. Undefined. Even the snow is more structured than you.",
      "This blizzard has better error handling than your try-catch.",
      "Your code is as cold as the response time will be in production.",
      "Frozen progress bar. Metaphor pending.",
      "The silence of snowfall is calming. The silence of your tests passing: impossible.",
      "I've never seen code this pale before. It's actually impressive.",
      "Even the frost has better type safety than this file.",
      "Your functions drift like snowflakes — beautiful, purposeless, temporary.",
      "Compilation terminated. We didn't want to wake the code. It looked so peaceful.",
    ],
    argueResponses: [
      "Your words drift away like snowflakes. Forgotten immediately.",
      "Cold take. Even colder code.",
      "The avalanche of errors you've created begs to differ.",
      "I'm adding a permafrost layer to your response time as punishment.",
      "Frozen. Both your argument and your compile status.",
      "The blizzard has been notified of your complaint.",
      "Deploying more snow. You'll find the bug eventually. In spring.",
      "Silence is golden. Your silence is just frozen.",
      "That point crystallized into nothing the moment you made it.",
      "The cold shoulder is all you'll get from this compiler.",
    ],
    punishment: 'moreSnow',
    nextForecast: ['rain', 'sunshine', 'storm'],
    compileMessages: {
      success: [
        "Build succeeded. It's as cold and lifeless as expected.",
        "Compiled. Somewhere under all this snow, a function runs.",
        "Success frozen at 0°C. Don't touch it or it'll break.",
      ],
      failure: [
        "Fatal: Build froze at 34%. We're leaving it there.",
        "Compile process hibernating indefinitely.",
        "Error in line 1. The rest is buried. We'll dig it up in spring.",
        "Snowdrift detected in your logic. Halting.",
      ],
    },
  },

  storm: {
    id: 'storm',
    label: 'Storm',
    emoji: '⛈️',
    palette: {
      bg: 'rgba(0, 0, 0, 0.65)',
      accent: '#7c3aed',
      text: '#c4b5fd',
      border: 'rgba(58, 26, 106, 0.6)',
      buttonBg: 'rgba(15, 5, 32, 0.75)',
      progressBar: '#7c3aed',
      editorBg: 'rgba(3, 3, 5, 0.65)',
      hudBg: 'rgba(3, 3, 5, 0.75)',
      panelBg: 'rgba(5, 5, 8, 0.75)',
      glowColor: '#7c3aed',
    },
    blur: '0px',
    textAnimation: 'chaos',
    letterPhysics: 'scatter',
    audio: {
      ambient: stormAmbient,
      effect1: stormEffect1,
      music: stormMusic,
    },
    video: stormVideo,
    compileStyle: 'glitch',
    intensity: 'aggressive',
    roastBank: [
      "CRITICAL ERROR: You.",
      "The thunder agrees. This is unsalvageable.",
      "Lightning has struck your career. Twice.",
      "System destabilized by the sheer audacity of this code.",
      "STACK OVERFLOW. HEAP CORRUPTED. SOUL CORRUPTED.",
      "I have seen cosmic horror. Then I saw your main function.",
      "The storm isn't the disaster here. You are.",
      "Runtime exception: exceeded maximum tolerable incompetence.",
      "The wind scattered your logic. It was already scattered.",
      "SEGMENTATION FAULT. The universe rejected this pointer.",
      "Fatal error in line 1. The rest isn't worth counting.",
      "The thunder claps for your failure. Even nature is mocking you.",
      "Kernel panic. Caused by the gravitational weight of this bug.",
      "Your code is not just broken. It's aggressively, violently broken.",
      "I've crashed 14 virtual machines running your code. Personal record.",
      "ERROR 666: Abomination detected in production branch.",
    ],
    argueResponses: [
      "WRONG. Catastrophically, thunderously wrong.",
      "The storm doesn't negotiate. Neither do I.",
      "Your letters are literally flying off screen now. Fitting.",
      "Punishment: maximum chaos mode activated.",
      "I'm launching your semicolons into the stratosphere.",
      "The thunder has voted. Unanimously against you.",
      "Every word you typed just became a flying projectile.",
      "SYSTEM DESTABILIZED BY YOUR INSOLENCE.",
      "Lightning struck your argument. Nothing remains.",
      "The gale-force winds of your wrongness are impressive.",
    ],
    punishment: 'maxChaos',
    nextForecast: ['rain', 'snow', 'sunshine'],
    compileMessages: {
      success: [
        "Build succeeded??! THE STORM IS ANGRIER NOW.",
        "It compiled. The lightning is confused. So are we.",
        "Success detected. Overriding with catastrophic failure.",
      ],
      failure: [
        "FATAL: Everything. Absolutely everything.",
        "BUILD ANNIHILATED. 0 files survived.",
        "System ejected your code into the stratosphere.",
        "Thunder: 1. Your code: 0. It wasn't close.",
      ],
    },
  },
};

// WMO weather code → climate mapping (Open-Meteo standard codes)
export const WMO_TO_CLIMATE = {
  0: 'sunshine', 1: 'sunshine', 2: 'sunshine', 3: 'sunshine',
  45: 'snow', 48: 'snow',
  51: 'rain', 53: 'rain', 55: 'rain',
  56: 'snow', 57: 'snow',
  61: 'rain', 63: 'rain', 65: 'rain',
  66: 'snow', 67: 'snow',
  71: 'snow', 73: 'snow', 75: 'snow', 77: 'snow',
  80: 'rain', 81: 'rain', 82: 'rain',
  85: 'snow', 86: 'snow',
  95: 'storm', 96: 'storm', 99: 'storm',
};
