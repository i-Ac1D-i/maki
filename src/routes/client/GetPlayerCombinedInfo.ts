import { Request, Response } from "express";
import { getArtifactDB, getHeroDB, getHeroSkillDB, getLevelDB, getSewerDB, getStallDB, getTuningDB } from "../../utils/DBs";
import { loadAccountData } from "../../controllers/accountController";
import { loadCombinedInfo } from "../../controllers/dataController";
import { getInventoryItems } from "../../controllers/inventoryController";
export const GetPlayerCombinedInfo = (req: Request, res: Response) => {
    const account = loadAccountData(req.body.PlayFabId);
    if (!account) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    const combinedInfo = loadCombinedInfo(account.playFabId);
    const inventory = getInventoryItems(account.playFabId);
    res.json({
        code: 200,
        data: {
          InfoResultPayload: {
            CharacterInventories: [],
            AccountInfo: {
              Created: "2024-08-01T19:52:34.172Z",
              CustomIdInfo: { CustomId: account.customId },
              PlayFabId: account.playFabId,
              PrivateInfo: {
                Email: "test@testing.com"
              },
              TitleInfo: {
                DisplayName: account.displayName ?? "Guest",
                Created: "2024-08-01T19:52:34.172Z", //account.created,
                FirstLogin: "2024-08-01T19:52:34.172Z", //account.created,
                LastLogin: account.lastLogin, //account.lastLogin,
                Origination: "CustomId",
                TitlePlayerAccount: {
                  Id: account.entityId,
                  Type: "title_player_account",
                  TypeString: "title_player_account"
                },
                isBanned: false
              },
              Username: account.playFabId
            },
            PlayerProfile: {
              DisplayName: account.displayName ?? "Guest",
              PlayerId: account.playFabId,
              PublisherId: "3D7EA51AE24C4BC",
              TitleId: "2144",
            },
            PlayerStatistics: combinedInfo.statistics.map(stat => ({StatisticName: stat.statisticName, Value: stat.value})),
            TitleData: {
              "297_ArtifactDB": getArtifactDB(),
              "297_HeroDB": getHeroDB(),
              "297_HeroSkillDB": getHeroSkillDB(),
              "297_LevelDB": getLevelDB(),
              "297_SewerDB": getSewerDB(),
              "297_StallDB": getStallDB(),
              "297_TuningDB": getTuningDB(),
              BUILD_REQUIRED_VERSION: "297",
              BUILD_SUGGEST_ANDROID: "297",
              BUILD_SUGGEST_IOS: "297",
              BingoWeek: "268",
              Event_OneTimeOnlyCustomSale: "{\"ScrollsWeek\":{\"Rewards\":{\"Relics\":15,\"SummonScrolls\":30,\"Gems\":5000,\"EventRockets\":50},\"PriceTier\":3},\"PokerWeek\":{\"Rewards\":{\"Relics\":10,\"PokerChips\":100,\"Gems\":3000,\"EventHammers\":80},\"PriceTier\":2},\"MiscWeek\":{\"Rewards\":{\"ShardsArtifactUltra\":10,\"ShardsArtifactPurple\":50,\"ArtifactDust\":5000,\"SlotsTickets\":25},\"PriceTier\":3},\"OrbsWeek\":{\"Rewards\":{\"Relics\":25,\"Orbs\":15,\"Gems\":4000,\"EventDiceDust\":1500},\"PriceTier\":4},\"Week35\":{\"Rewards\":{\"Orbs\":20,\"Gems\":3000,\"HeroIndex\":44},\"PriceTier\":0}}",
              HolidayGifts: "1936",
              HolidayWeek: "277",
              Links: "{\"Reddit\":\"https://www.reddit.com/r/TapForce\",\"Twitter\":\"https://twitter.com/racecatgames\",\"Discord\":\"https://discord.gg/tap-force\",\"StorePageIOS\":\"https://apps.apple.com/ca/app/tap-force-rpg/id1459276435\",\"StorePageAndroid\":\"https://play.google.com/store/apps/details?id=com.racecat.fight\",\"TermsAndConditions\":\"https://www.tapforcegame.com/terms-conditions\",\"EmailFeedback\":\"racecatgames@gmail.com\"}",
              OneDaySale: "{\"rewards\":{\"HeroCard\":1,\"Relics\":40,\"SummonScrolls\":100},\"requirements\":{\"XpLevel\":20},\"priceTierDiscount\":1,\"priceTier\":2,\"dayIndex\":1910,\"value\":1600,\"vendor\":\"bingo_vendor2_valentines\",\"title\":\"spring_sale\",\"bg\":\"spring_splash_bg\"}",
              TechnoHeroes: "{\"271\":[75,84,83,81,80],\"275\":[91,90,89,76,71]}",
              _Version: "297_013"
            },
            UserData: Object.fromEntries(Object.entries(combinedInfo.userData).map(([key, value]) => [key, { value, Permission: "Private", lastUpdated: new Date().toISOString() }])),
            UserDataVersion: 4,
                UserInventory: inventory.map(item => ({
                  ItemInstanceId: item.ItemInstanceId,
                  ItemId: item.ItemId,
                  DisplayName: item.DisplayName,
                  CatalogVersion: item.CatalogVersion,
                  PurchaseDate: item.PurchaseDate,
                  UnitPrice: item.UnitPrice,
                  Annotation: item.Annotation,
                })),
                UserReadOnlyDataVersion: 0,
                UserVirtualCurrency: Object.fromEntries(combinedInfo.currencies.map(currency => [currency.currencyCode, currency.amount ])),
                UserVirtualCurrencyRechargeTimes: {}
          },
          PlayFabId: account.playFabId
        },
        status: "OK",
      });
};
