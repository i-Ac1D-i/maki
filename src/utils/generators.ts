import * as crypto from "crypto";
import { Entity, EntityTokenPayload } from "../database/interfaces";

export const generateInstanceId = (): string => {
    const length = 16; // Desired number of hex digits
    const hexChars = '0123456789ABCDEF';
  
    // Check if the crypto API is available
    if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
      // Generate an 8-byte (16 hex digits) random value
      const byteArray = new Uint8Array(8);
      crypto.getRandomValues(byteArray);
  
      return Array.from(byteArray)
        .map(byte => byte.toString(16).padStart(2, '0'))
        .join('')
        .toUpperCase();
    } else {
      // Fallback using Math.random (not cryptographically secure)
      let result = '';
      for (let i = 0; i < length; i++) {
        result += hexChars.charAt(Math.floor(Math.random() * hexChars.length));
      }
      return result;
    }
  }


export const generateToken = (): string => {
    return crypto.randomBytes(8).toString("base64").replace(/=+$/, "");
  }


export function generatePlayFabId(): string {
    // Generate 8 random bytes which equals 16 hex characters.
    const randomBytes = crypto.randomBytes(8);
    // Convert to hex string and uppercase it.
    return randomBytes.toString("hex").toUpperCase();
}

export function generateEntityToken(entity: Entity, secret: string): { EntityToken: string; TokenExpiration: string } {
  const exp = Math.floor(Date.now() / 1000) + 24 * 60 * 60; // 24 hours expiry
  const payload: EntityTokenPayload = { entity, exp };
  const payloadStr = JSON.stringify(payload);
  const signature = crypto.createHmac("sha256", secret)
                          .update(payloadStr)
                          .digest("base64");
  const token = Buffer.from(payloadStr).toString("base64") + "." + signature;
  return { EntityToken: token, TokenExpiration: new Date(exp * 1000).toISOString() };
}

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
  
  