<img width="1280" height="640" alt="MoodStorm Editor" src="https://github.com/user-attachments/assets/8920b256-2ba8-4988-b824-5351134eb4bd" />

# MoodStorm Editor ⚡🌧️☀️❄️⛈️

### Team Name: Void Pointers

### Team Members
- Team Lead: [Your Name] - [Your College]

### Project Description
A theatrical, single-page fake code editor where the **weather controls everything** — 
your editor's mood, colors, animations, and the insults it hurls at you. It never 
compiles real code. It never will. That's the point.

### The Problem (that doesn't exist)
Developers are too productive. They need an editor that actively works against them 
based on live atmospheric conditions.

### The Solution (that nobody asked for)
MoodStorm Editor fetches real live weather, maps it to one of four climate moods 
(Rain, Sunshine, Snow, Storm), and then uses that mood to style everything — the 
background, colors, text physics, ambient sound, and most importantly: the quality 
and aggression of the insults it fires at your code.

---

## Technical Details

### Technologies Used
- **React 18** + **Vite 5** — fast SPA, no SSR needed
- **Tailwind CSS 3** — utility-first styling
- **Open-Meteo API** — free, no-key-required live weather data
- **Canvas API** — snow particle system
- **Web Audio / `<audio>`** — ambient loops, music layer, effects
- **CSS Transforms + JS animation** — Storm letter physics

### Climate States
| Climate | Mood | Text Effect | Compile Style |
|---------|------|-------------|---------------|
| 🌧️ Rain | Melancholic | Slow drift + blur | Dripping progress bar |
| ☀️ Sunshine | Sarcastic | Sharp, high-contrast | Confident fill → betrayal at 99% |
| ❄️ Snow | Melancholic | Freeze + accumulation | Frozen mid-way bar |
| ⛈️ Storm | Aggressive | Characters fly off screen | Glitch flicker + crash |

---

## Installation

```bash
cd moodstorm-editor
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

---

## Adding Your Media Files

Drop your audio and video files into these exact paths:

### Audio
```
src/assets/audio/rain/ambient.mp3
src/assets/audio/rain/effect1.mp3
src/assets/audio/rain/music.mp3

src/assets/audio/sunshine/ambient.mp3
src/assets/audio/sunshine/effect1.mp3
src/assets/audio/sunshine/music.mp3

src/assets/audio/snow/ambient.mp3
src/assets/audio/snow/effect1.mp3
src/assets/audio/snow/music.mp3

src/assets/audio/storm/ambient.mp3
src/assets/audio/storm/effect1.mp3
src/assets/audio/storm/music.mp3
```

### Video
```
src/assets/video/rain/background.mp4
src/assets/video/sunshine/background.mp4
src/assets/video/snow/background.mp4
src/assets/video/storm/background.mp4
```

The app references these paths at runtime — no code changes needed after dropping files in.

---

## Features
- 🌍 **Live weather** from Open-Meteo (20 random cities, graceful offline fallback)
- 🎮 **Manual climate override** — Rain / Sunshine / Snow / Storm / Surprise Me
- ⏱ **Auto-shift** every 3–5 minutes with transition animation
- 🌨️ **Snow accumulation** — canvas particles that blur your code over time
- ⚡ **Storm letters** — characters fly off screen synced to thunder
- 🎭 **Fake compiler** — weather-themed progress bar, always insults you
- 💬 **Argue-back chat** — the editor always wins; punishments escalate
- 📋 **Insult history** — filterable by climate type
- 🔊 **Ambient audio layers** — ambient + music + effects, all toggleable
- 📍 **Weather HUD** — city, temp, description, next forecast

---

Made with ❤️ at TinkerHub Useless Projects

![Static Badge](https://img.shields.io/badge/TinkerHub-24?color=%23000000&link=https%3A%2F%2Fwww.tinkerhub.org%2F)
![Static Badge](https://img.shields.io/badge/UselessProjects--26-26?link=https%3A%2F%2Ftinkerhub.org%2Fevents%2F1M8ORET9A1%2Fuseless-projects-3.0)
