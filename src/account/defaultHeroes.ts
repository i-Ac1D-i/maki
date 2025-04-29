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
  // playFabId, ItemId, DisplayName, CatalogVersion, itemInstanceId, purchaseDate, UnitPrice, annotation
  const defaultHeroes: Omit<InventoryItem, "playFabId" | "ItemInstanceId" | "PurchaseDate">[] = [
    {
      Annotation: "CommonSummon",
      CatalogVersion: "Fight_001",
      DisplayName: "Mohawk",
      ItemId: "hero_Mohawk",
      UnitPrice: 0,
    },
    {
      Annotation: "CommonSummon",
      CatalogVersion: "Fight_001",
      DisplayName: "Police Girl",
      ItemId: "hero_Sarah",
      UnitPrice: 0,
    },
    {
      Annotation: "CommonSummon",
      CatalogVersion: "Fight_001",
      DisplayName: "Ninjaboy",
      ItemId: "hero_Sasuke",
      UnitPrice: 0,
    },
    {
      Annotation: "CommonSummon",
      CatalogVersion: "Fight_001",
      DisplayName: "Ryu",
      ItemId: "hero_Kenshi",
      UnitPrice: 0,
    },
    {
      Annotation: "CommonSummon",
      CatalogVersion: "Fight_001",
      DisplayName: "Mai",
      ItemId: "hero_Maki",
      UnitPrice: 0,
    },
    {
      Annotation: "CommonSummon",
      CatalogVersion: "Fight_001",
      DisplayName: "Army Guy",
      ItemId: "hero_Mortar",
      UnitPrice: 0,
    },
    {
      Annotation: "CommonSummon",
      CatalogVersion: "Fight_001",
      DisplayName: "Muay Thai",
      ItemId: "hero_Hado",
      UnitPrice: 0,
    },
    {
      Annotation: "CommonSummon",
      CatalogVersion: "Fight_001",
      DisplayName: "Army Guy",
      ItemId: "hero_Mortar",
      UnitPrice: 0,
    },
    {
      Annotation: "ShardsHeroBlue",
      CatalogVersion: "Fight_001",
      DisplayName: "Cyber Girl",
      ItemClass: "Hero",
      ItemId: "hero_Eve",
      UnitPrice: 0
  }
  ];

  // For each hero in the list, generate an instanceId and create an inventory record.
  defaultHeroes.forEach(hero => {
    const inventoryEntry: InventoryItem = {
      playFabId: playFabId,
      ItemId: hero.ItemId,
      DisplayName: hero.DisplayName,
      CatalogVersion: hero.CatalogVersion,
      ItemClass: hero.ItemClass ?? "",
      // Generate a new unique instance id for each hero:
      ItemInstanceId: generateInstanceId(),
      // Set purchase date as now
      PurchaseDate: now,
      UnitPrice: hero.UnitPrice,
      Annotation: hero.Annotation,
    };
    addInventoryItem(inventoryEntry);
  });
}
