import { CLIMATES, WMO_TO_CLIMATE } from './climateConfig.js';

export const CITIES = [
  { name: 'Tokyo', country: 'JP', lat: 35.6762, lon: 139.6503 },
  { name: 'London', country: 'GB', lat: 51.5074, lon: -0.1278 },
  { name: 'New York', country: 'US', lat: 40.7128, lon: -74.0060 },
  { name: 'Mumbai', country: 'IN', lat: 19.0760, lon: 72.8777 },
  { name: 'Sydney', country: 'AU', lat: -33.8688, lon: 151.2093 },
  { name: 'Paris', country: 'FR', lat: 48.8566, lon: 2.3522 },
  { name: 'São Paulo', country: 'BR', lat: -23.5505, lon: -46.6333 },
  { name: 'Cairo', country: 'EG', lat: 30.0444, lon: 31.2357 },
  { name: 'Moscow', country: 'RU', lat: 55.7558, lon: 37.6173 },
  { name: 'Seoul', country: 'KR', lat: 37.5665, lon: 126.9780 },
  { name: 'Chicago', country: 'US', lat: 41.8781, lon: -87.6298 },
  { name: 'Nairobi', country: 'KE', lat: -1.2921, lon: 36.8219 },
  { name: 'Toronto', country: 'CA', lat: 43.6532, lon: -79.3832 },
  { name: 'Berlin', country: 'DE', lat: 52.5200, lon: 13.4050 },
  { name: 'Bangkok', country: 'TH', lat: 13.7563, lon: 100.5018 },
  { name: 'Buenos Aires', country: 'AR', lat: -34.6037, lon: -58.3816 },
  { name: 'Istanbul', country: 'TR', lat: 41.0082, lon: 28.9784 },
  { name: 'Lagos', country: 'NG', lat: 6.5244, lon: 3.3792 },
  { name: 'Mexico City', country: 'MX', lat: 19.4326, lon: -99.1332 },
  { name: 'Shanghai', country: 'CN', lat: 31.2304, lon: 121.4737 },
];

export function pickRandomCity() {
  return CITIES[Math.floor(Math.random() * CITIES.length)];
}

export function pickRandomClimate() {
  return CLIMATES[Math.floor(Math.random() * CLIMATES.length)];
}

export async function fetchWeather(city) {
  const target = city || pickRandomCity();
  const url =
    `https://api.open-meteo.com/v1/forecast` +
    `?latitude=${target.lat}&longitude=${target.lon}` +
    `&current_weather=true&temperature_unit=celsius`;
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(6000) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const cw = data.current_weather;
    const climate = WMO_TO_CLIMATE[cw.weathercode] ?? pickRandomClimate();
    return {
      climate,
      city: target,
      temp: Math.round(cw.temperature),
      windspeed: Math.round(cw.windspeed),
      description: wmoCodeToDescription(cw.weathercode),
      source: 'live',
    };
  } catch {
    return {
      climate: pickRandomClimate(),
      city: target,
      temp: null,
      windspeed: null,
      description: 'Unknown (offline)',
      source: 'fallback',
    };
  }
}

function wmoCodeToDescription(code) {
  const map = {
    0: 'Clear sky', 1: 'Mainly clear', 2: 'Partly cloudy', 3: 'Overcast',
    45: 'Foggy', 48: 'Icy fog',
    51: 'Light drizzle', 53: 'Drizzle', 55: 'Heavy drizzle',
    61: 'Light rain', 63: 'Rain', 65: 'Heavy rain',
    71: 'Light snow', 73: 'Snow', 75: 'Heavy snow', 77: 'Snow grains',
    80: 'Light showers', 81: 'Showers', 82: 'Violent showers',
    85: 'Snow showers', 86: 'Heavy snow showers',
    95: 'Thunderstorm', 96: 'Thunderstorm w/ hail', 99: 'Severe thunderstorm',
  };
  return map[code] ?? 'Mysterious conditions';
}

export function randomShiftInterval() {
  return (180 + Math.floor(Math.random() * 120)) * 1000;
}
