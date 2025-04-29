// src/utils/rollUtils.ts

import fs from "fs";
import path from "path";

interface RollOption {
  /** The “roll result” ID you want to queue */
  id: number;
  /** Relative weight (higher = more likely) */
  weight: number;
}

/** 
 * The shape of your JSON config:
 * {
 *   "Tavern": [{ "id": 209, "weight": 5 }, { "id": 210, "weight": 2 }, …],
 *   "DojoSpin": [{ "id": 4, "weight": 1 }, { "id": 5, "weight": 1 }, …],
 *   …
 * }
 */
let rollConfig: Record<string, RollOption[]> = {};

try {
  const raw = fs.readFileSync(
    path.resolve(__dirname, "../config/rollConfig.json"),
    "utf-8"
  );
  rollConfig = JSON.parse(raw);
} catch (err) {
  console.warn(
    "[rollUtils] could not load rollConfig.json – defaulting to empty config",
    err
  );
  rollConfig = {};
}

/**
 * Picks a single roll‐result ID for the given category by weight.
 * If the category is missing or has no entries, returns 1.
 */
export function generateRollForCategory(category: string): number {
  const options = rollConfig[category];
  if (!options || options.length === 0) {
    return 1;
  }

  const totalWeight = options.reduce((sum, o) => sum + o.weight, 0);
  if (totalWeight <= 0) {
    // all weights zero?
    return options[0].id;
  }

  let rnd = Math.random() * totalWeight;
  for (const opt of options) {
    rnd -= opt.weight;
    if (rnd < 0) {
      return opt.id;
    }
  }

  // should never get here, but fallback to last ID
  return options[options.length - 1].id;
}
