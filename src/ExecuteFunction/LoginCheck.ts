import { Request, Response } from "express";
import { getAccountBySessionTicket, updateLastLogin } from "../controllers/accountController";

export const LoginCheck = (req: Request, res: Response) => {
    const account = getAccountBySessionTicket(req.body.FunctionParameter.LOGIN_TOKEN);
    if (!account) {
        return { error: "Unauthorized" };
    }
    updateLastLogin(account.playFabId)
    const functionResult = {
        CACHE_PAYLOAD_Tavern: [
          8,
          7,
          8,
          6,
          203,
          6,
          100,
          106
        ],
        CURRENT_DAY_INDEX: Math.floor((Date.now() - new Date("2020-01-01").getTime()) / (1000 * 60 * 60 * 24)),
        CloudData: {
          Achievements_VipCut: 20,
          ArenaDivisions: [
            101,
            200,
            300,
            400,
            500,
            600,
            700,
            800,
            900,
            1000,
            1200,
            1400,
            1600,
            1800,
            2000,
            2200,
            2400,
            2600,
            2800,
            3000,
            3200,
            3500,
            4000
          ],
          ArenaRefreshiesCap: 5,
          ArenaTicketRefillInHours: 12,
          ArtifactAscensionReq: 5,
          AutoEquipXpLock: 50,
          CandleFirstReward: 50,
          ClubSmashClubReleaseWeek: 999,
          DailyRewardsOrder: [
            "Daily_FreeGems",
            "Daily_FreeHeroShardsBlue",
            "Daily_FreeGems",
            "Daily_FreeChips",
            "Daily_FreeGems",
            "Daily_FreeHeroShardsBlue",
            "Daily_FreeGems",
            "Daily_FreeScrolls",
            "Daily_FreeGems",
            "Daily_FreeDragonShardsBlue",
            "Daily_FreeGems",
            "Daily_FreeOrbs",
            "Daily_FreeGems",
            "Daily_FreeDragonShardsBlue",
            "Daily_FreeGems",
            "Daily_FreeChips",
            "Daily_FreeGems",
            "Daily_FreeDragonShardsBlue",
            "Daily_FreeGems",
            "Daily_FreeScrolls",
            "Daily_FreeGems",
            "Daily_FreeDragonShardsBlue",
            "Daily_FreeGems",
            "Daily_FreeOrbs",
            "Daily_FreeGems",
            "Daily_FreeDragonShardsBlue",
            "Daily_FreeGems",
            "Daily_FreeShardsPurple"
          ],
          DesertCooldown: 1100,
          EventBundleMisc: 3,
          EventBundleOrbs: 4,
          EventBundlePoker: 2,
          EventBundleScrolls: 3,
          EventWeek_MaxLoops: 3,
          EventsHeroFusionAscIndexRequired: 3,
          FirstPurchaseHeroAny: 45,
          FirstPurchaseHeroPremium: 88,
          FriendsMax: 20,
          GuildMax: 30,
          GuildModsMax: 3,
          GuildQuitCooldownMins: 60,
          GuildRotatingBarCycle: 50,
          Hero_BaseStatPercentage_Attack: 5,
          Hero_BaseStatPercentage_Hp: 15,
          Hero_BaseStatPercentage_Speed: 30,
          HolidayGiftGems: 250,
          HourlyRewardsOrder: [
            "Hourly_GemsAmounts",
            "Hourly_GoldAmounts",
            "Hourly_OozeAmounts",
            "Hourly_PokerChipAmounts"
          ],
          LimitedSale_Limit: 3,
          MaxCurrencyBoxes: 5,
          MaxDragons: 80,
          MutagensCost: 500,
          PremiumGoldPackageMin: 250000,
          PriceTier_AscensionCard: 4,
          PriceTier_AscensionCardPremium: 6,
          PriceTier_BiWeeklyCard: 2,
          PriceTier_CapsuleWeek: 2,
          PriceTier_DiamondFund: 3,
          PriceTier_GamePass: 2,
          PriceTier_GuildBundle1: 0,
          PriceTier_GuildBundle2: 2,
          PriceTier_GuildBundle3: 4,
          PriceTier_HolidayBundle1: 2,
          PriceTier_HolidayBundle2: 5,
          PriceTier_HolidayWeek: 4,
          PriceTier_QuestSale: 2,
          PriceTier_TechnoBundle1: 2,
          PriceTier_TechnoBundle2: 4,
          PriceTier_TechnoBundle3: 5,
          Relic_PromoDiscount: 90,
          Relic_PurchaseLimit: 2,
          SeasonDays: [
            2188,
            1906,
            2000,
            2094
          ],
          ServerUTC: new Date().toISOString(),
          SummonVipUnlock: 4,
          TicketCollectionTime: 25,
          TicketPerRefill: 5,
          UnmergeDragonCost: 2000,
          UsernameGemCost: 300,
          WelcomeBack_DiminishedReturns: 50,
          WelcomeBack_MaxDays: 30
        },
        CurrencyClaims: {
          TI: 40,
          TT: 3
        },
        KITTYCLOCK: new Date().toISOString(),
        MyFriendsData: [],
        PizzaRefill: 20,
        StatisticsClaims: {
          ArenaPoints: 100,
          ArenaPointsOdd: 275000100,
          AvatarIndex: 9,
          BuildVersion: 297,
          EventMonopoly: 275000000,
          XpLevel: 1
        },
        TITLE_DATA_VERSION: "297_010",
        TitleEventsPayload: {
          ClubSmashHeroes: [],
          Event_OneTimeOnlyCustomSale: {
            EndingWeekId: 275,
            IsDefaultWeek: true,
            PriceTier: 4,
            Rewards: {
              EventDiceDust: 1500,
              Gems: 4000,
              Orbs: 15,
              Relics: 25
            }
          },
          TechnoHeroes: [
            91,
            90,
            89,
            76,
            71
          ]
        }
      };
    return functionResult;
};
