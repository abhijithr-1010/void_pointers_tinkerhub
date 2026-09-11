// ============================================================
//  roastEngine.js
//  Picks non-repeating roast lines from the climate bank
//  based on intensity level.
// ============================================================

import { climateConfig } from './climateConfig.js';

// Per-climate roast index state (module-level, resets on page reload)
const roastIndices = {};

/**
 * Get the next roast line for the given climate + intensity.
 * Cycles through the bank without repeating until all lines are exhausted.
 *
 * @param {string} climateId
 * @param {string} intensity - 'calm' | 'sarcastic' | 'aggressive' | 'melancholic'
 * @returns {string}
 */
export function getRoast(climateId, intensity) {
  const config = climateConfig[climateId];
  if (!config) return "Error: climate not found. (Ironic.)";

  const bank = config.roastBank;
  if (!roastIndices[climateId]) {
    roastIndices[climateId] = shuffleIndices(bank.length);
  }

  const indices = roastIndices[climateId];
  if (indices.length === 0) {
    roastIndices[climateId] = shuffleIndices(bank.length);
    return bank[roastIndices[climateId].pop()];
  }

  return bank[indices.pop()];
}

/**
 * Get a compile result message (success or failure).
 * Success is rare (15% chance) — and still insulting.
 */
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
