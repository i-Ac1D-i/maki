import { getCurrencies } from "../controllers/dataController";
import { getHeroNames } from "../utils/getHeroNames";
import { createInventoryEntry, addInventoryItem } from "../controllers/inventoryController";
import { rollAction } from "../controllers/rollsController";
import { generateInstanceId } from "../utils/generators";
import { Request, Response } from "express";
import { getAccountBySessionTicket } from "../controllers/accountController";



export function summonCapsules(req: Request, res: Response) {
  const playFabId = getAccountBySessionTicket(req.body.FunctionParameter.LOGIN_TOKEN).playFabId;
  const attemptList = req.body.attemptList;
  const currencies = getCurrencies(playFabId);
  const heroNames = getHeroNames();
  const capsulesHeld = currencies.find(currency => currency.currencyCode === "SC");
  const capsuleCost = attemptList.reduce((acc: number, curr: number) => acc + curr, 0);
  
  if (!capsulesHeld) {
    throw new Error("Capsules is undefined for some reason lol");
  }
  
  if (capsulesHeld.amount < capsuleCost) {
    throw new Error("Not enough capsules to summon");
  }

  const heroIds = rollAction(playFabId, "RecruitScrolls", capsuleCost);
  const rolledHeroes = heroIds.map(id => heroNames[id]);
  let inventoryItems = [];
  let grantItemsToUser = [];
  for (const hero of rolledHeroes) {
    const heroId = heroNames.findIndex(name => name === hero);
    const heroInstanceId = generateInstanceId();
    const heroDisplayName = hero.split("_")[1];
    const heroCatalogVersion = "Fight_001";
    const heroPurchaseDate = new Date().toISOString();
    const heroUnitPrice = 0;
    const heroAnnotation = "CommonSummon";
    const invetoryEntry = createInventoryEntry(playFabId, hero, heroDisplayName, heroCatalogVersion, heroInstanceId, heroPurchaseDate, heroUnitPrice, heroAnnotation);
    inventoryItems.push(invetoryEntry);
    addInventoryItem(invetoryEntry);
    grantItemsToUser.push({
      customData: null,
      itemId: hero,
      itemInstanceId: heroInstanceId,
    });
  }
  const CACHE_PAYLOAD_RecruitScrolls = heroIds
  const CurrencyClaims = {
    "SC": capsulesHeld.amount - capsuleCost
  }
  const KITTYCLOCK = new Date().toISOString();
  const TITLE_DATA_VERSION = 297_013
  const UserDataClaims = {
    AvatarsData: heroIds
  }
  const grantItemsToUserResult = grantItemsToUser;

  return {
    CACHE_PAYLOAD_RecruitScrolls,
    CurrencyClaims,
    KITTYCLOCK,
    TITLE_DATA_VERSION,
    UserDataClaims,
  }
}
