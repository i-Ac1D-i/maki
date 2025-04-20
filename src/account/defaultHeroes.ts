import * as crypto from "crypto";
import { addInventoryItem, InventoryItem } from "../controllers/inventoryController";

/**
 * generateInstanceId
 * Generates a random 16-character uppercase hexadecimal string.
 */
function generateInstanceId(): string {
  return crypto.randomBytes(8).toString("hex").toUpperCase();
}

/**
 * createDefaultHeroes
 * For a given playFabId, creates a set of default hero inventory entries.
 *
 * The default heroes include:
 * - Mohawk (hero_Mohawk)
 * - Police Girl (hero_Sarah)
 * - Ninjaboy (hero_Sasuke)
 * - Ryu (hero_Kenshi)
 * - Mai (hero_Maki)
 * - Army Guy (hero_Mortar)
 *
 * Each entry gets:
 * • A generated ItemInstanceId
 * • PurchaseDate set to now (current ISO string)
 * • UnitPrice set to 0 (free)
 */
export function createDefaultHeroes(playFabId: string): void {
  const now = new Date().toISOString();

  // Array of default hero definitions (without itemInstanceId and purchaseDate).
  // We follow the keys required by our InventoryItem interface:
  // playFabId, itemId, displayName, catalogVersion, itemInstanceId, purchaseDate, unitPrice, annotation
  const defaultHeroes: Omit<InventoryItem, "playFabId" | "itemInstanceId" | "purchaseDate">[] = [
    {
      annotation: "CommonSummon",
      catalogVersion: "Fight_001",
      displayName: "Mohawk",
      itemId: "hero_Mohawk",
      unitPrice: 0,
    },
    {
      annotation: "CommonSummon",
      catalogVersion: "Fight_001",
      displayName: "Police Girl",
      itemId: "hero_Sarah",
      unitPrice: 0,
    },
    {
      annotation: "CommonSummon",
      catalogVersion: "Fight_001",
      displayName: "Ninjaboy",
      itemId: "hero_Sasuke",
      unitPrice: 0,
    },
    {
      annotation: "CommonSummon",
      catalogVersion: "Fight_001",
      displayName: "Ryu",
      itemId: "hero_Kenshi",
      unitPrice: 0,
    },
    {
      annotation: "CommonSummon",
      catalogVersion: "Fight_001",
      displayName: "Mai",
      itemId: "hero_Maki",
      unitPrice: 0,
    },
    {
      annotation: "CommonSummon",
      catalogVersion: "Fight_001",
      displayName: "Army Guy",
      itemId: "hero_Mortar",
      unitPrice: 0,
    },
  ];

  // For each hero in the list, generate an instanceId and create an inventory record.
  defaultHeroes.forEach(hero => {
    const inventoryEntry: InventoryItem = {
      playFabId: playFabId,
      itemId: hero.itemId,
      displayName: hero.displayName,
      catalogVersion: hero.catalogVersion,
      // Generate a new unique instance id for each hero:
      itemInstanceId: generateInstanceId(),
      // Set purchase date as now
      purchaseDate: now,
      unitPrice: hero.unitPrice,
      annotation: hero.annotation,
    };
    addInventoryItem(inventoryEntry);
  });
}
