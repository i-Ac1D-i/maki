// src/controllers/rollsController.ts
import { db } from "../database/database";                // your sqlite connection
import { generateRollForCategory } from "../utils/rollUtils"; // stub in your actual RNG logic

export interface KittyRoll {
  id: number;
  playFabId: string;
  category: string;
  value: number;
  createdAt: string;
}

/**
 * Call once at startup to ensure the table exists.
 */
export function initRollsTable(): void {
  db.prepare(`
    CREATE TABLE IF NOT EXISTS KittyRolls (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      playFabId TEXT NOT NULL,
      category TEXT NOT NULL,
      value INTEGER NOT NULL,
      createdAt TEXT NOT NULL
    )
  `).run();
}

/**
 * Peek the first `limit` rolls for a given player+category.
 */
export function getRolls(
  playFabId: string,
  category: string,
  limit: number
): KittyRoll[] {
  return db
    .prepare(`
      SELECT * FROM KittyRolls
       WHERE playFabId = ? AND category = ?
       ORDER BY id ASC
       LIMIT ?
    `)
    .all(playFabId, category, limit) as KittyRoll[];
}

/**
 * Remove the first `count` rolls (by id ascending).
 */
export function removeRolls(
  playFabId: string,
  category: string,
  count: number
): void {
  const ids = db
    .prepare(`
      SELECT id FROM KittyRolls
       WHERE playFabId = ? AND category = ?
       ORDER BY id ASC
       LIMIT ?
    `)
    .all(playFabId, category, count)
    .map((r: any) => r.id);

  if (ids.length === 0) return;

  const placeholders = ids.map(() => "?").join(",");
  db.prepare(`DELETE FROM KittyRolls WHERE id IN (${placeholders})`).run(...ids);
}

/**
 * Append an array of new roll‐values to the end of the queue.
 */
export function addRolls(
  playFabId: string,
  category: string,
  values: number[]
): void {
  const stmt = db.prepare(`
    INSERT INTO KittyRolls (playFabId, category, value, createdAt)
     VALUES (?, ?, ?, ?)
  `);
  const now = new Date().toISOString();

  const insertMany = db.transaction((vs: number[]) => {
    for (const v of vs) {
      stmt.run(playFabId, category, v, now);
    }
  });

  insertMany(values);
}

/**
 * Consume `count` rolls: fetch them, delete them,
 * then generate & append `count` new fresh rolls.
 * Returns the consumed roll‐values.
 */
export function rollAction(
  playFabId: string,
  category: string,
  count: number
): number[] {
  // 1) Get the head of the queue
  let rolls = getRolls(playFabId, category, count).map(r => r.value);

  // 2) If not enough, top up so we still remove `count` below.
  if (rolls.length < count) {
    const missing = count - rolls.length;
    const filler = Array.from({ length: missing }, () =>
      generateRollForCategory(category)
    );
    addRolls(playFabId, category, filler);
    rolls = rolls.concat(filler);
  }

  // 3) Remove exactly `count` old rolls
  removeRolls(playFabId, category, count);

  // 4) Generate & append `count` brand‐new rolls
  const newRolls = Array.from({ length: count }, () =>
    generateRollForCategory(category)
  );
  addRolls(playFabId, category, newRolls);

  // 5) Return what the user actually “rolled”
  return rolls;
}
