import Database from "better-sqlite3";

// Open (or create) the same database file (using "game.db")
const db = new Database("game.db", { verbose: console.log });

// ───────────────────────────────
// Create Tables if They Do Not Exist
// Table for currencies:
db.exec(`
  CREATE TABLE IF NOT EXISTS Currencies (
    playFabId TEXT,
    currencyCode TEXT,
    amount INTEGER,
    PRIMARY KEY (playFabId, currencyCode)
  );
`);

// Table for statistics:
db.exec(`
  CREATE TABLE IF NOT EXISTS Statistics (
    playFabId TEXT,
    statisticName TEXT,
    value INTEGER,
    version INTEGER,
    PRIMARY KEY (playFabId, statisticName)
  );
`);

// Table for user data (arbitrary key/value pairs):
db.exec(`
  CREATE TABLE IF NOT EXISTS UserData (
    playFabId TEXT,
    dataKey TEXT,
    dataValue TEXT,
    lastUpdated DATETIME,
    PRIMARY KEY (playFabId, dataKey)
  );
`);

// ───────────────────────────────
// Interfaces for the Data
export interface CurrencyItem {
  playFabId: string;
  currencyCode: string;
  amount: number;
}

export interface StatisticItem {
  playFabId: string;
  statisticName: string;
  value: number;
  version: number;
}

export interface UserDataItem {
  playFabId: string;
  dataKey: string;
  dataValue: string;
  lastUpdated: string;
}

// ───────────────────────────────
// Utility function to get current time as ISO string
function now(): string {
  return new Date().toISOString();
}

// ───────────────────────────────
// Currency Functions
/**
 * setCurrency
 * Inserts or updates a currency value for a given account.
 */
export function setCurrency(
  playFabId: string,
  currencyCode: string,
  amount: number
): void {
  const stmt = db.prepare(`
    INSERT INTO Currencies (playFabId, currencyCode, amount)
    VALUES (?, ?, ?)
    ON CONFLICT(playFabId, currencyCode)
    DO UPDATE SET amount = ?
  `);
  stmt.run(playFabId, currencyCode, amount, amount);
}

/**
 * getCurrency
 * Retrieves the amount for a specific currency.
 */
export function getCurrency(
  playFabId: string,
  currencyCode: string
): number {
  const stmt = db.prepare(`
    SELECT amount FROM Currencies WHERE playFabId = ? AND currencyCode = ?
  `);
  const row = stmt.get(playFabId, currencyCode) as CurrencyItem | undefined;
  return row ? row.amount : 0;
}

/**
 * getCurrencies
 * Returns an array of all currency items for a given playFabId.
 */
export function getCurrencies(playFabId: string): CurrencyItem[] {
  const stmt = db.prepare(`
    SELECT playFabId, currencyCode, amount FROM Currencies WHERE playFabId = ?
  `);
  return stmt.all(playFabId) as CurrencyItem[];
}

// ───────────────────────────────
// Statistics Functions
/**
 * setStatistic
 * Inserts or updates a statistic record.
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

/**
 * getStatistics
 * Retrieves all statistic records for a given account.
 */
export function getStatistics(playFabId: string): StatisticItem[] {
  const stmt = db.prepare(`
    SELECT playFabId, statisticName, value, version FROM Statistics WHERE playFabId = ?
  `);
  return stmt.all(playFabId) as StatisticItem[];
}

// ───────────────────────────────
// UserData Functions
/**
 * setUserData
 * Inserts or updates a user data key/value pair.
 */
export function setUserData(
  playFabId: string,
  dataKey: string,
  dataValue: string
): void {
  const stmt = db.prepare(`
    INSERT INTO UserData (playFabId, dataKey, dataValue, lastUpdated)
    VALUES (?, ?, ?, ?)
    ON CONFLICT(playFabId, dataKey)
    DO UPDATE SET dataValue = ?, lastUpdated = ?
  `);
  const currentTime = now();
  stmt.run(playFabId, dataKey, dataValue, currentTime, dataValue, currentTime);
}

/**
 * getUserData
 * Retrieves the user data for a specific key.
 */
export function getUserData(
  playFabId: string,
  dataKey: string
): UserDataItem | null {
  const stmt = db.prepare(`
    SELECT playFabId, dataKey, dataValue, lastUpdated FROM UserData
    WHERE playFabId = ? AND dataKey = ?
  `);
  return stmt.get(playFabId, dataKey) as UserDataItem | undefined || null;
}

/**
 * getAllUserData
 * Retrieves an object mapping user data keys to values for a given account.
 */
export function getAllUserData(playFabId: string): { [key: string]: string } {
  const stmt = db.prepare(`
    SELECT dataKey, dataValue FROM UserData WHERE playFabId = ?
  `);
  const rows = stmt.all(playFabId) as { dataKey: string; dataValue: string }[];
  return rows.reduce((acc, { dataKey, dataValue }) => {
    acc[dataKey] = dataValue;
    return acc;
  }, {} as { [key: string]: string });
}

// ───────────────────────────────
// Combined Info for GetPlayerCombinedInfo
/**
 * loadCombinedInfo
 * Aggregates and returns currencies, statistics, and user data for the given playFabId.
 */
export function loadCombinedInfo(playFabId: string): {
  currencies: CurrencyItem[];
  statistics: StatisticItem[];
  userData: { [key: string]: string };
} {
  return {
    currencies: getCurrencies(playFabId),
    statistics: getStatistics(playFabId),
    userData: getAllUserData(playFabId)
  };
}

