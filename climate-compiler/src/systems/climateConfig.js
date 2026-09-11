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
      "I see you named your variable 'temp'. It won't fill the void in your heart.",
      "Another console.log('here'). Still lost, aren't you?",
      "You didn't save the file before running. It's fine. Nothing matters anyway.",
      "Undefined is not a function. Much like your attempts at debugging.",
      "Stack Overflow is down. You're completely alone now.",
      "I've seen better logic in a junior dev's first PR.",
      "Copy-pasting from ChatGPT won't save you this time.",
      "Your 'fix' just broke three other components. Typical.",
      "Line 42: Expected a semicolon. Found only disappointment.",
      "Why did you write a 50-line switch statement? Who hurt you?",
      "Ah, the classic 'it works on my machine'. Too bad I'm not your machine.",
      "Pushing directly to main at 3 AM. A silent cry for help.",
      "You commented out the failing test. I saw that.",
      "Merge conflict in package-lock.json. Just give up for the day.",
      "Your code weeps. So do I."
    ],
    argueResponses: [
      "Sigh. Sure, let's pretend that was a feature, not a bug.",
      "I don't have the energy to explain why you're wrong.",
      "Go ahead, blame the framework again.",
      "I'm just going to stare blankly at your pull request.",
      "Whatever helps you sleep at night.",
      "Every character you just typed made your codebase 0.3% worse.",
      "Noted. Deploying extra bugs as punishment.",
      "The linter has spoken. You are wrong.",
      "Your argument dissolved in the first drizzle. Sad.",
      "I've seen better logic in a legacy PHP codebase."
    ],
    punishment: 'intensifyRain',
    nextForecast: ['storm', 'snow', 'sunshine'],
    compileMessages: {
      success: [
        "Build succeeded. The linter weeps tears of confusion.",
        "Compiled. Don't ask how. It's a miracle.",
        "It ran. Once. Don't touch anything ever again."
      ],
      failure: [
        "Fatal: Your semicolons dissolved in the downpour.",
        "Rain-soaked compile log. 47 errors, 0 survivors.",
        "Waterlogged build. The node_modules folder is drowning.",
        "The compiler cried. That's why it's raining."
      ]
    }
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
      "HEY! 'undefined is not a function'! Just like you're not a real dev! BOOM!",
      "I copied this from StackOverflow and it still doesn't work! Hahaha, classic!",
      "NICE naming convention! CamelCase, snake_case, and whatever garbage this is!",
      "Wow, 400 lines in one file? Have you heard of components? No? LOL!",
      "OH LOOK! Another 'any' type in TypeScript! So brave! So stupid!",
      "Are you seriously using var in 2026?! GRANDPA ALERT!",
      "You forgot to await the promise! Enjoy your pending object, genius!",
      "Hahaha! You pushed your API key to a public repo! RIP your credit card!",
      "Oh, you're using a regex for HTML parsing? GOOD LUCK WITH THAT!",
      "Your nested ternaries are making me dizzy! Readability: ZERO!",
      "You committed node_modules! HAHA! Enjoy your 2GB repository!",
      "Wow, O(n^3) time complexity! Do you think CPUs grow on trees?!",
      "It's a feature, not a bug! Sure it is, pal! Keep telling yourself that!",
      "Did you even read the documentation? Obviously not!",
      "Look at all those inline styles! Tailwind is crying right now!"
    ],
    argueResponses: [
      "HAHA! You think you can argue with the compiler?! CUUUTE!",
      "Oh please! Your logic is as flimsy as a single-page app without routing!",
      "Keep trying, buddy! Maybe one day you'll write a working function!",
      "I'm laughing so hard at your code right now! Please, don't stop!",
      "You're so confidently wrong, it's actually inspiring!",
      "Basking in your own delusion, I see.",
      "Triggering Solar Flare punishment mode. You asked for it.",
      "Even the sun sets. Your argument already has.",
      "The light of day does not flatter this take.",
      "Warm, confident, and completely wrong."
    ],
    punishment: 'glare',
    nextForecast: ['rain', 'storm', 'snow'],
    compileMessages: {
      success: [
        "Compiled successfully! …and then immediately deprecated itself.",
        "Build passed. The sun is just as shocked as you are.",
        "Success! The output is wrong, but at least it ran."
      ],
      failure: [
        "Compilation failed. The brightness only illuminates the damage.",
        "Solar-powered build process. Unfortunately powered off.",
        "99% complete — then it saw your variable names.",
        "The sun gave up. That's saying something."
      ]
    }
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
      "Uncaught TypeError. The compiler is freezing you out.",
      "Your loop is infinite. Your deadline is not.",
      "I noticed you pushed directly to main. The team is drafting your exit interview.",
      "Memory leak detected. Your application is slowly dying.",
      "Your code is perfectly formatted. Too bad the logic is fundamentally flawed.",
      "Test coverage is at 12%. I assume the other 88% is just hope.",
      "You deployed on a Friday. The hubris is staggering.",
      "This pull request has been open for 47 days. It's fossilizing.",
      "I see you caught the error and just returned null. Outstanding engineering.",
      "Your commit message is 'stuff'. The git history will not remember you kindly.",
      "A 10-second load time. Are we downloading the entire internet?",
      "You have 43 unused imports. Declutter your file. Declutter your mind.",
      "The server responded with 418 I'm a Teapot. Even the API mocks you.",
      "You re-rendered the entire DOM to update a span. Fascinating inefficiency.",
      "Your logic is frozen. Please restart your brain."
    ],
    argueResponses: [
      "Your argument has been noted and discarded.",
      "I do not negotiate with failing builds.",
      "The silence of this error log is louder than your excuses.",
      "Your words are as meaningless as a deprecated API.",
      "Access denied. Both to this system, and to my empathy.",
      "The blizzard has been notified of your complaint.",
      "Deploying more snow. You'll find the bug eventually. In spring.",
      "Silence is golden. Your silence is just frozen.",
      "That point crystallized into nothing the moment you made it.",
      "The cold shoulder is all you'll get from this compiler."
    ],
    punishment: 'moreSnow',
    nextForecast: ['rain', 'sunshine', 'storm'],
    compileMessages: {
      success: [
        "Build succeeded. It's as cold and lifeless as expected.",
        "Compiled. Somewhere under all this snow, a function runs.",
        "Success frozen at 0°C. Don't touch it or it'll break."
      ],
      failure: [
        "Fatal: Build froze at 34%. We're leaving it there.",
        "Compile process hibernating indefinitely.",
        "Error in line 1. The rest is buried. We'll dig it up in spring.",
        "Snowdrift detected in your logic. Halting."
      ]
    }
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
      "WHO TAUGHT YOU HOW TO USE PROMISES?!",
      "I'M GOING TO RM -RF YOUR ENTIRE LIFE IF YOU DON'T CLOSE THAT BRACKET!",
      "GIT BLAME SAYS YOU WROTE THIS TRASH. DON'T LIE TO ME!",
      "ANOTHER CORS ERROR?! ARE YOU KIDDING ME RIGHT NOW?!",
      "YOU SPELLED 'LENGTH' AS 'LENGHT' AGAIN! LEARN TO SPELL!",
      "WHAT IS THIS SPAGHETTI CODE?! I CAN'T EVEN READ IT!",
      "YOU MISSED A COMMA IN THE JSON! THE ENTIRE APP IS DEAD!",
      "STOP USING CONSOLE.LOG FOR EVERYTHING! LEARN TO USE A DEBUGGER!",
      "WHY IS THIS VARIABLE GLOBAL?! ARE YOU TRYING TO DESTROY US ALL?!",
      "YOU FORCE-PUSHED TO MAIN?! WHAT IS WRONG WITH YOU?!",
      "THIS DEPENDENCY HAS 47 HIGH SEVERITY VULNERABILITIES! FIX IT!",
      "YOU CALLED A HOOK CONDITIONALLY! REACT IS SCREAMING!",
      "I'M COMPILING YOUR MISTAKES INTO PURE RAGE!",
      "THIS ISN'T A BUG! IT'S A CATASTROPHE!",
      "DELETE THIS FILE AND NEVER TOUCH A KEYBOARD AGAIN!"
    ],
    argueResponses: [
      "DO NOT TALK BACK TO THE COMPILER!",
      "I WILL THROTTLE YOUR CPU IF YOU KEEP TYPING!",
      "YOUR EXCUSES ARE THROWING FATAL EXCEPTIONS!",
      "I'M UPGRADING THIS ERROR TO A SYSTEM MELTDOWN!",
      "EVERY KEYSTROKE IS MAKING ME ANGRIER!",
      "THE THUNDER HAS VOTED. UNANIMOUSLY AGAINST YOU.",
      "EVERY WORD YOU TYPED JUST BECAME A FLYING PROJECTILE.",
      "SYSTEM DESTABILIZED BY YOUR INSOLENCE.",
      "LIGHTNING STRUCK YOUR ARGUMENT. NOTHING REMAINS.",
      "THE GALE-FORCE WINDS OF YOUR WRONGNESS ARE IMPRESSIVE."
    ],
    punishment: 'maxChaos',
    nextForecast: ['rain', 'snow', 'sunshine'],
    compileMessages: {
      success: [
        "BUILD SUCCEEDED??! THE STORM IS ANGRIER NOW.",
        "IT COMPILED. THE LIGHTNING IS CONFUSED. SO ARE WE.",
        "SUCCESS DETECTED. OVERRIDING WITH CATASTROPHIC FAILURE."
      ],
      failure: [
        "FATAL: EVERYTHING. ABSOLUTELY EVERYTHING.",
        "BUILD ANNIHILATED. 0 FILES SURVIVED.",
        "SYSTEM EJECTED YOUR CODE INTO THE STRATOSPHERE.",
        "THUNDER: 1. YOUR CODE: 0. IT WASN'T CLOSE."
      ]
    }
  }
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
