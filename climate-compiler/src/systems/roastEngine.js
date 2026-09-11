import { climateConfig } from './climateConfig.js';

const roastIndices = {};

export function getRoast(climateId, intensity) {
  const config = climateConfig[climateId];
  if (!config) return "Error: climate not found. (Ironic.)";
  const bank = config.roastBank;
  if (!roastIndices[climateId]) roastIndices[climateId] = shuffleIndices(bank.length);
  const indices = roastIndices[climateId];
  if (indices.length === 0) {
    roastIndices[climateId] = shuffleIndices(bank.length);
    return bank[roastIndices[climateId].pop()];
  }
  return bank[indices.pop()];
}

export function getCompileMessage(climateId) {
  const config = climateConfig[climateId];
  if (!config) return { type: 'failure', message: "Compile: undefined behavior. (Expected.)" };
  const isSuccess = Math.random() < 0.15;
  const bank = isSuccess ? config.compileMessages.success : config.compileMessages.failure;
  const message = bank[Math.floor(Math.random() * bank.length)];
  return { type: isSuccess ? 'success' : 'failure', message };
}

function shuffleIndices(length) {
  const arr = Array.from({ length }, (_, i) => i);
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
