import * as crypto from "crypto";

export interface Entity {
    Id: string;
    Type: string;
    TypeString: string;
  }

export interface EntityTokenPayload {
    entity: Entity;
    exp: number;
  }

export function generateTokenCheck(): string {
    return crypto.randomBytes(8).toString("base64").replace(/=+$/, "");
  }