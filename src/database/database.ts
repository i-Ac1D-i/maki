// database.ts
import Database from "better-sqlite3";

// Open (or create) the SQLite database file "game.db"
// The 'verbose' option is useful during development to log queries.
export const db = new Database("game.db");

// Create tables if they don't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS Accounts (
    playFabId TEXT PRIMARY KEY,
    customId TEXT,
    tokenCheck TEXT,
    tokenExpiration TEXT,
    created DATETIME,
    updated DATETIME
  );

  CREATE TABLE IF NOT EXISTS Inventory (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    playFabId TEXT,
    itemId TEXT,
    displayName TEXT,
    catalogVersion TEXT,
    itemInstanceId TEXT,
    purchaseDate DATETIME,
    unitPrice INTEGER,
    annotation TEXT,
    FOREIGN KEY (playFabId) REFERENCES Accounts(playFabId)
  );

  CREATE TABLE IF NOT EXISTS Currencies (
    playFabId TEXT,
    currencyCode TEXT,
    amount INTEGER,
    PRIMARY KEY (playFabId, currencyCode),
    FOREIGN KEY (playFabId) REFERENCES Accounts(playFabId)
  );

  CREATE TABLE IF NOT EXISTS Statistics (
    playFabId TEXT,
    statisticName TEXT,
    value INTEGER,
    version INTEGER,
    PRIMARY KEY (playFabId, statisticName),
    FOREIGN KEY (playFabId) REFERENCES Accounts(playFabId)
  );
`);

// Helper function to get the current timestamp in ISO format
function now(): string {
  return new Date().toISOString();
}

// =======================================================================
// ACCOUNT FUNCTIONS
// =======================================================================

export interface Account {
  playFabId: string;
  customId: string;
  tokenCheck: string;
  tokenExpiration: string;
  created: string;
  updated: string;
}

/**
 * Create an account record in the Accounts table.
 * @param playFabId The unique PlayFab ID.
 * @param customId The client's custom ID.
 * @param tokenCheck The security token (e.g. tokenCheck) as a string.
 * @param tokenExpiration The expiration of the token (ISO string).
 */
export function createAccount(
  playFabId: string,
  customId: string,
  tokenCheck: string,
  tokenExpiration: string
): void {
  const stmt = db.prepare(`
    INSERT INTO Accounts (playFabId, customId, tokenCheck, tokenExpiration, created, updated)
    VALUES (?, ?, ?, ?, ?, ?)
  `);
  stmt.run(playFabId, customId, tokenCheck, tokenExpiration, now(), now());
}

/**
 * Update the tokenCheck and tokenExpiration for an account.
 * @param playFabId The PlayFab ID of the account.
 * @param tokenCheck The new token check value.
 * @param tokenExpiration The new expiration date (ISO string).
 */
export function updateTokenCheck(
  playFabId: string,
  tokenCheck: string,
  tokenExpiration: string
): void {
  const stmt = db.prepare(`
    UPDATE Accounts
    SET tokenCheck = ?, tokenExpiration = ?, updated = ?
    WHERE playFabId = ?
  `);
  stmt.run(tokenCheck, tokenExpiration, now(), playFabId);
}

// =======================================================================
// INVENTORY FUNCTIONS
// =======================================================================

export interface InventoryItem {
  itemId: string;
  displayName: string;
  catalogVersion: string;
  itemInstanceId: string;
  purchaseDate: string;
  unitPrice: number;
  annotation: string;
}

/**
 * Add an item to the inventory for the given account.
 * @param playFabId The account's PlayFab ID.
 * @param item The inventory item to add.
 */
export function addInventoryItem(playFabId: string, item: InventoryItem): void {
  const stmt = db.prepare(`
    INSERT INTO Inventory (
      playFabId, itemId, displayName, catalogVersion, itemInstanceId, purchaseDate, unitPrice, annotation
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);
  stmt.run(
    playFabId,
    item.itemId,
    item.displayName,
    item.catalogVersion,
    item.itemInstanceId,
    item.purchaseDate,
    item.unitPrice,
    item.annotation
  );
}

// =======================================================================
// CURRENCY FUNCTIONS
// =======================================================================

/**
 * Set or update a currency value for a given account.
 * @param playFabId The account's PlayFab ID.
 * @param currencyCode A code representing the currency (e.g. "GE" for gems).
 * @param amount The amount to set.
 */
export function setCurrency(
  playFabId: string,
  currencyCode: string,
  amount: number
): void {
  // With "ON CONFLICT" we update when a record already exists.
  const stmt = db.prepare(`
    INSERT INTO Currencies (playFabId, currencyCode, amount)
    VALUES (?, ?, ?)
    ON CONFLICT(playFabId, currencyCode)
    DO UPDATE SET amount = ?
  `);
  stmt.run(playFabId, currencyCode, amount, amount);
}

// =======================================================================
// STATISTICS FUNCTIONS
// =======================================================================

/**
 * Set or update a statistic for the given account.
 * @param playFabId The account's PlayFab ID.
 * @param statisticName The name of the statistic.
 * @param value The statistic's value.
 * @param version The version number of the statistic.
 */
export function setStatistic(
  playFabId: string,
  statisticName: string,
  value: number,
  version: number
): void {
  const stmt = db.prepare(`
    INSERT INTO Statistics (playFabId, statisticName, value, version)
    VALUES (?, ?, ?, ?)
    ON CONFLICT(playFabId, statisticName)
    DO UPDATE SET value = ?, version = ?
  `);
  stmt.run(playFabId, statisticName, value, version, value, version);
}

// =======================================================================
// OPTIONAL: READ FUNCTIONS
// =======================================================================

export function getAccountByPlayFabId(playFabId: string): Account | undefined {
  const stmt = db.prepare(`SELECT * FROM Accounts WHERE playFabId = ?`);
  const result = stmt.get(playFabId) as Account | undefined;
  return result || undefined;
}

export function getAccountByCustomId(customId: string): Account | undefined {
  const stmt = db.prepare(`SELECT * FROM Accounts WHERE customId = ?`);
  const result = stmt.get(customId) as Account | undefined;
  return result || undefined;
}

export function getInventory(playFabId: string): InventoryItem[] {
  const stmt = db.prepare(`SELECT * FROM Inventory WHERE playFabId = ?`);
  return stmt.all(playFabId) as InventoryItem[];
}

export function getCurrency(playFabId: string, currencyCode: string): number {
  const stmt = db.prepare(
    `SELECT amount FROM Currencies WHERE playFabId = ? AND currencyCode = ?`
  );
  const row = stmt.get(playFabId, currencyCode) as { amount: number } | undefined;
  return row ? row.amount : 0;
}

export function getStatistics(playFabId: string): any[] {
  const stmt = db.prepare(`SELECT * FROM Statistics WHERE playFabId = ?`);
  return stmt.all(playFabId);
}

console.log("Database initialized and tables created (if not already present).");
