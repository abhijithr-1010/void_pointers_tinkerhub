<img width="1280" height="640" alt="Climate Compiler" src="https://github.com/user-attachments/assets/8920b256-2ba8-4988-b824-5351134eb4bd" />

# Climate Compiler ⚡🌧️☀️❄️⛈️

### Team Name: Void Pointers

### Team Members
- Team Lead: [Your Name] - [Your College]

### Project Description
A theatrical, single-page fake code editor where the **weather controls everything** —
your editor's mood, colors, animations, and the insults it hurls at you.
It never compiles real code. It never will. That's the point. 
**Now fully localized in authentic Kerala Meme-style Malayalam (Manglish)!**

### The Problem (that doesn't exist)
Developers are too productive. They need an editor that actively works against them
based on live atmospheric conditions.

### The Solution (that nobody asked for)
Climate Compiler fetches real live weather, maps it to one of four climate moods
(Rain, Sunshine, Snow, Storm), and then uses that mood to style everything — the
background, colors, text physics, ambient sound, and most importantly: the quality
and aggression of the Malayalam troll-insults it fires at your code.

---

## Technical Details

### Technologies Used
- **React 18** + **Vite 5** — fast SPA
- **Tailwind CSS 3** — utility-first styling
- **Open-Meteo API** — free, no-key-required live weather
- **Canvas API & CSS** — snow/sand particle systems and water splashes
- **CSS Transforms + JS** — Storm letter physics synced to thunder

### Climate States
| Climate | Mood | Text Effect | Compile Style |
|---------|------|-------------|---------------|
| 🌧️ Rain | Melancholic | Slow drift + blur | Dripping progress bar |
| ☀️ Sunshine | Sarcastic | Sharp, high-contrast + drifting sand | Confident fill → betrayal at 99% |
| ❄️ Snow | Melancholic | Freeze + snow accumulation | Frozen mid-way bar |
| ⛈️ Storm | Aggressive | Characters fly off screen + water splashes | Glitch flicker + crash |

---

## Installation

```bash
cd climate-compiler
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

---

## Media File Paths

Audio files in `/src/assets/audio/<climate>/`:
- `ambient.mp3` — looping background ambience (features dynamic audio ducking)
- `effect1.mp3` — thunder clap, wind gust, etc. (triggers ducking of ambient track)

Video files in `/src/assets/video/<climate>/`:
- `background.mp4` — looping background visual

Exact paths already wired in the app:
```
src/assets/audio/rain/ambient.mp3
src/assets/audio/rain/effect1.mp3
src/assets/audio/sunshine/ambient.mp3
src/assets/audio/sunshine/effect1.mp3
src/assets/audio/snow/ambient.mp3
src/assets/audio/snow/effect1.mp3
src/assets/audio/storm/ambient.mp3
src/assets/audio/storm/effect1.mp3
src/assets/video/rain/background.mp4
src/assets/video/sunshine/background.mp4
src/assets/video/snow/background.mp4
src/assets/video/storm/background.mp4
```

---

Made with ❤️ at TinkerHub Useless Projects

![Static Badge](https://img.shields.io/badge/TinkerHub-24?color=%23000000&link=https%3A%2F%2Fwww.tinkerhub.org%2F)
![Static Badge](https://img.shields.io/badge/UselessProjects--26-26?link=https%3A%2F%2Ftinkerhub.org%2Fevents%2F1M8ORET9A1%2Fuseless-projects-3.0)
