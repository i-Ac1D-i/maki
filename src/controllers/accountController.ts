import * as crypto from "crypto";
import Database from "better-sqlite3";
import { createDefaultPlayerData } from "../account/createDefaultPlayerData";
import { createDefaultHeroes } from "../account/defaultHeroes";
// Initialize (or open) the database; "game.db" will be created if it doesn’t exist.
const db = new Database("game.db");

// Create the Accounts table if it doesn't already exist.
// Columns: playFabId (PK), customId, tokenCheck, tokenExpiration, created, lastLogin.
db.exec(`
  CREATE TABLE IF NOT EXISTS Accounts (
    playFabId TEXT PRIMARY KEY,
    customId TEXT,
    entityId TEXT,
    sessionTicket TEXT,
    tokenCheck TEXT,
    tokenExpiration TEXT,
    created DATETIME,
    lastLogin DATETIME,
    displayName TEXT
  );
`);

// ─────────────────────────────────────────────────────
// Interfaces and Helper Types
// ─────────────────────────────────────────────────────

export interface Entity {
  Id: string;
  Type: string;
  TypeString: string;
}

interface EntityTokenPayload {
  entity: Entity;
  exp: number; // expiration in UNIX seconds
}

// ─────────────────────────────────────────────────────
// Helper Functions for Token Generation
// ─────────────────────────────────────────────────────

/**
 * generatePlayFabId
 * Generates a new PlayFabId from 8 random bytes (16 hex characters, uppercase).
 */
export function generatePlayFabId(): string {
  const randomBytes = crypto.randomBytes(8);
  return randomBytes.toString("hex").toUpperCase();
}

/**
 * generateEntityId
 * Generates a new EntityId from 8 random bytes (16 hexadecimal characters, uppercase).
 */
export function generateEntityId(): string {
  // Generate 8 random bytes (16 hexadecimal characters)
  const randomBytes = crypto.randomBytes(8);
  return randomBytes.toString("hex").toUpperCase();
}

/**
 * generateEntityToken
 * Returns an object with an EntityToken and its TokenExpiration.
 * The token is built as Base64( JSON(payload) ) + "." + HMAC-SHA256 signature.
 *
 * @param entity The entity details.
 * @param secret The secret key to use in signing.
 */
export function generateEntityToken(entity: Entity, secret: string): { EntityToken: string; TokenExpiration: string } {
  const exp = Math.floor(Date.now() / 1000) + 24 * 60 * 60; // Expire in 24 hours
  const payload: EntityTokenPayload = { entity, exp };
  const payloadStr = JSON.stringify(payload);
  const signature = crypto.createHmac("sha256", secret)
                          .update(payloadStr)
                          .digest("base64");
  const token = Buffer.from(payloadStr).toString("base64") + "." + signature;
  return { EntityToken: token, TokenExpiration: new Date(exp * 1000).toISOString() };
}

/**
 * generateSessionTicket
 * Returns a SessionTicket of the format:
 *   playFabId - signature - entityId - titleId - randomSegment
 *
 * @param playFabId The player's PlayFabId.
 * @param entityId The entity's ID.
 * @param titleId The TitleId.
 * @param secret The secret key used to sign.
 */
export function generateSessionTicket(playFabId: string, entityId: string, titleId: string, secret: string): string {
  const randomSegment = crypto.randomBytes(16)
                              .toString("base64")
                              .replace(/\+/g, "-")
                              .replace(/\//g, "_")
                              .replace(/=+$/, "");
  const data = `${playFabId}-${entityId}-${titleId}-${randomSegment}`;
  const signature = crypto.createHmac("sha256", secret)
                          .update(data)
                          .digest("base64")
                          .replace(/\+/g, "-")
                          .replace(/\//g, "_")
                          .replace(/=+$/, "");
  return `${playFabId}-${signature}-${entityId}-${titleId}-${randomSegment}`;
}

/**
 * generateTokenCheck
 * Generates a short, Base64–encoded token used to verify account integrity.
 */
export function generateTokenCheck(): string {
  return crypto.randomBytes(8).toString("base64").replace(/=+$/, "");
}

// ─────────────────────────────────────────────────────
// Database Functions for Account Management
// ─────────────────────────────────────────────────────

/**
 * now
 * Returns the current timestamp as an ISO string.
 */
function now(): string {
  return new Date().toISOString();
}

/**
 * createAccount
 * Inserts a new account record into the Accounts table.
 *
 * @param playFabId The generated PlayFabId.
 * @param customId The client-sent CustomId.
 * @param entityId The generated EntityId.
 * @param tokenCheck The generated _TokenCheck value.
 * @param tokenExpiration The expiration date for tokenCheck.
 */
export function createAccount(
  playFabId: string,
  customId: string,
  entityId: string,
  tokenCheck: string,
  tokenExpiration: string,
  sessionTicket: string = ""
): string {
  const displayName = "GUEST_" + Math.floor(Math.random() * 1000000);
  const stmt = db.prepare(`
    INSERT INTO Accounts (playFabId, customId, entityId, tokenCheck, tokenExpiration, created, lastLogin, displayName, sessionTicket)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  const currentTime = now();
  stmt.run(playFabId, customId, entityId, tokenCheck, tokenExpiration, currentTime, currentTime, displayName, sessionTicket);
  createDefaultPlayerData(playFabId);
  //createDefaultHeroes(playFabId);
  return displayName;
}

/**
 * updateAccountToken
 * Updates the tokenCheck and tokenExpiration (and lastLogin) of an existing account.
 *
 * @param playFabId The account's PlayFabId.
 * @param tokenCheck The new _TokenCheck value.
 * @param tokenExpiration The new token expiration (ISO string).
 */
export function updateAccountToken(
  playFabId: string,
  tokenCheck: string,
  tokenExpiration: string
): void {
  const stmt = db.prepare(`
    UPDATE Accounts
    SET tokenCheck = ?, tokenExpiration = ?, lastLogin = ?
    WHERE playFabId = ?
  `);
  stmt.run(tokenCheck, tokenExpiration, now(), playFabId);
}

export function updateAccountSessionTicket(playFabId: string, sessionTicket: string): void {
  const stmt = db.prepare(`
    UPDATE Accounts
    SET sessionTicket = ?
    WHERE playFabId = ?
  `);
  stmt.run(sessionTicket, playFabId);
}

export function updateAccountEntityId(playFabId: string, entityId: string): void {
  const stmt = db.prepare(`
    UPDATE Accounts
    SET entityId = ? 
    WHERE playFabId = ?
  `);
  stmt.run(entityId, playFabId);
}

/**
 * updateLastLogin
 * Updates only the lastLogin timestamp for the given playFabId.
 */
export function updateLastLogin(playFabId: string): void {
  const stmt = db.prepare(`
    UPDATE Accounts
    SET lastLogin = ?
    WHERE playFabId = ?
  `);
  stmt.run(now(), playFabId);
}

/**
 * loadAccountData
 * Loads and returns the account record from the database.
 *
 * @param playFabId The account's PlayFabId.
 */
export function loadAccountData(playFabId: string): any {
  const stmt = db.prepare(`SELECT * FROM Accounts WHERE playFabId = ?`);
  return stmt.get(playFabId);
}

export function getAccountByCustomId(customId: string): any {
  const stmt = db.prepare(`SELECT * FROM Accounts WHERE customId = ?`);
  return stmt.get(customId);
}

export function getAccountBySessionTicket(sessionTicket: string): any {
  const stmt = db.prepare(`SELECT * FROM Accounts WHERE sessionTicket = ?`);
  return stmt.get(sessionTicket);
}
