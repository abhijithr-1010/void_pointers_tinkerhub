/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        mono: ['"JetBrains Mono"', '"Fira Code"', 'Consolas', 'monospace'],
        display: ['"Space Grotesk"', 'sans-serif'],
        sans: ['"Space Grotesk"', 'sans-serif'],
      },
      animation: {
        'drift': 'drift 8s ease-in-out infinite',
        'glitch': 'glitch 0.3s steps(2) infinite',
        'freeze': 'freeze 4s ease-out forwards',
        'drip': 'drip 1.2s ease-in infinite',
        'fly-off': 'flyOff 1s ease-in forwards',
        'snow-fall': 'snowFall linear infinite',
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-in': 'slideIn 0.4s ease-out',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
      },
      keyframes: {
        drift: {
          '0%, 100%': { transform: 'translateY(0px) translateX(0px)' },
          '50%': { transform: 'translateY(4px) translateX(2px)' },
        },
        glitch: {
          '0%': { transform: 'translate(0)', filter: 'hue-rotate(0deg)' },
          '33%': { transform: 'translate(-3px, 2px)', filter: 'hue-rotate(90deg)' },
          '66%': { transform: 'translate(3px, -2px)', filter: 'hue-rotate(180deg)' },
          '100%': { transform: 'translate(0)', filter: 'hue-rotate(0deg)' },
        },
        freeze: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0.6', filter: 'blur(0.5px) brightness(0.8)' },
        },
        drip: {
          '0%': { transform: 'translateY(-4px)', opacity: '0' },
          '50%': { opacity: '1' },
          '100%': { transform: 'translateY(4px)', opacity: '0' },
        },
        flyOff: {
          '0%': { transform: 'translate(0,0) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'translate(var(--fly-x), var(--fly-y)) rotate(var(--fly-r))', opacity: '0' },
        },
        snowFall: {
          '0%': { transform: 'translateY(-10px) translateX(0px)', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '0.8' },
          '100%': { transform: 'translateY(100vh) translateX(var(--drift-x))', opacity: '0' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateY(8px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 8px var(--glow-color)' },
          '50%': { boxShadow: '0 0 24px var(--glow-color)' },
        },
      },
    },
  },
  plugins: [],
};
