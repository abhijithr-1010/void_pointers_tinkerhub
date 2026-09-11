// ============================================================
//  compileAnimation.js
//  Returns weather-themed fake compile progress sequences.
//  Each style is an array of { percent, delay, label } steps.
// ============================================================

/**
 * Returns the sequence of progress steps for a climate's compile style.
 * @param {'drip'|'sunbeam'|'freeze'|'glitch'} style
 * @returns {Array<{percent: number, delay: number, label: string}>}
 */
export function getCompileSequence(style) {
  switch (style) {
    case 'drip':
      return [
        { percent: 8,  delay: 400,  label: 'Parsing... (the rain weeps)' },
        { percent: 22, delay: 600,  label: 'Resolving imports... (still raining)' },
        { percent: 35, delay: 500,  label: 'Typechecking... (puddles forming)' },
        { percent: 48, delay: 800,  label: 'Linking... (the drain is clogged)' },
        { percent: 61, delay: 600,  label: 'Optimizing... (optimism dissolving)' },
        { percent: 74, delay: 700,  label: 'Bundling... (soaked through)' },
        { percent: 87, delay: 500,  label: 'Finalizing... (almost dry, then: more rain)' },
        { percent: 100, delay: 400, label: 'Done. (sort of.)' },
      ];

    case 'sunbeam':
      return [
        { percent: 15, delay: 300, label: 'Compiling with CONFIDENCE' },
        { percent: 35, delay: 250, label: 'Blazing through syntax errors' },
        { percent: 55, delay: 200, label: 'Linking at the speed of light' },
        { percent: 72, delay: 150, label: 'Optimizing brilliantly' },
        { percent: 89, delay: 200, label: 'Almost there! Almost! Almost!' },
        { percent: 99, delay: 1200, label: 'Just one more second...' },
        { percent: 100, delay: 300, label: 'Done. The betrayal was inevitable.' },
      ];

    case 'freeze':
      return [
        { percent: 12, delay: 800,  label: 'Starting... (sluggishly)' },
        { percent: 23, delay: 1200, label: 'Parsing... (slowly)' },
        { percent: 34, delay: 2000, label: 'Typechecking... (very slowly)' },
        { percent: 40, delay: 3000, label: 'Linking...' },
        { percent: 40, delay: 2500, label: '...' },
        { percent: 40, delay: 2000, label: '...' },
        { percent: 41, delay: 1500, label: 'Unsticking...' },
        { percent: 100, delay: 400, label: 'Done. (We think.)' },
      ];

    case 'glitch':
      return [
        { percent: 30, delay: 200,  label: 'COMPILING' },
        { percent: 67, delay: 150,  label: 'COMPILING!!' },
        { percent: 12, delay: 100,  label: '██░░GLITCH░░██' },
        { percent: 89, delay: 200,  label: 'ALMOST DONE—' },
        { percent: 3,  delay: 100,  label: 'ERROR ERROR ER—' },
        { percent: 78, delay: 150,  label: 'REBOOTING' },
        { percent: 100, delay: 300, label: 'DETONATED' },
      ];

    default:
      return [
        { percent: 50, delay: 500, label: 'Compiling...' },
        { percent: 100, delay: 500, label: 'Done.' },
      ];
  }
}
