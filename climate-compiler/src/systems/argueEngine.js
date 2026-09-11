import { climateConfig } from './climateConfig.js';

const argueIndices = {};

export function getComeback(climateId) {
  const config = climateConfig[climateId];
  if (!config) return "No.";
  const bank = config.argueResponses;
  if (!argueIndices[climateId]) argueIndices[climateId] = shuffleIndices(bank.length);
  const indices = argueIndices[climateId];
  if (indices.length === 0) {
    argueIndices[climateId] = shuffleIndices(bank.length);
    return bank[argueIndices[climateId].pop()];
  }
  return bank[indices.pop()];
}

export function computePunishment(punishmentType) {
  switch (punishmentType) {
    case 'intensifyRain': return { escalateWeather: null, chaosLevel: 1, slowInput: false, extraErrors: 1 };
    case 'glare':         return { escalateWeather: null, chaosLevel: 1, slowInput: true,  extraErrors: 2 };
    case 'moreSnow':      return { escalateWeather: null, chaosLevel: 2, slowInput: false, extraErrors: 1 };
    case 'maxChaos':      return { escalateWeather: 'storm', chaosLevel: 5, slowInput: true, extraErrors: 5 };
    default:              return { escalateWeather: null, chaosLevel: 1, slowInput: false, extraErrors: 1 };
  }
}

function shuffleIndices(length) {
  const arr = Array.from({ length }, (_, i) => i);
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
