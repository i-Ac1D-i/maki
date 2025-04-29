import { setStatistic, setUserData, setCurrency } from "../controllers/dataController";
import { createDefaultHeroes } from "./defaultHeroes";

// A function to create the default player data using your database setters.
export function createDefaultPlayerData(playFabId: string): void {
  // Default statistics array. For "LastLoginInMinutes", we calculate the value as the current time in minutes.
  const nowInMinutes = Math.floor(Date.now() / 60000);
  const defaultStatistics = [
    { statisticName: "XpLevel", value: 100, version: 0 },
    { statisticName: "ArenaPoints", value: 100, version: 3 },
    { statisticName: "ArenaPointsEven", value: 276000100, version: 0 },
    { statisticName: "BuildVersion", value: 297, version: 0 },
    { statisticName: "AvatarIndex", value: 17, version: 0 },
    { statisticName: "EventCarSmash", value: 276000000, version: 1 },
    //{ statisticName: "LastLoginInMinutes", value: nowInMinutes, version: 0 }
  ];
  
  defaultStatistics.forEach(stat => {
    // setStatistic(playFabId, statisticName, value, version) is assumed to insert/update a row in the Statistics table.
    setStatistic(playFabId, stat.statisticName, stat.value, stat.version);
  });

  const KittyStats = JSON.parse("{\"Count_Summon\":1158,\"Count_Orbs\":277,\"Count_Poker\":2650,\"Count_FriendCratesCollected\":5,\"Count_ShopCollections\":1238,\"Count_ShopOpenings\":1238,\"Count_Tavern3Stars\":186,\"Count_Tavern4Stars\":52,\"Count_Tavern5Stars\":10,\"Count_Fusions\":915,\"Count_FusionsElite\":227,\"Count_ArenaWins\":109,\"Count_ArenaTickets\":157,\"Count_GuildRolls\":304,\"Count_MarketPurchases\":339,\"Count_HeroSpawnPurple\":70,\"Count_ArtifactSpawnPurple\":2,\"Count_PurpleShards\":3500,\"Count_PizzaSpent\":17651,\"Count_Recruit\":1882,\"Count_GlobePurchases\":12,\"BonusSummons\":7,\"BonusOrbs\":2,\"BonusShards\":0,\"Guild_SoloDefeat\":165,\"Guild_SoloDamage_v2\":258,\"Guild_SoloSpawn\":45,\"Guild_SoloLucky\":0,\"Guild_Defeat\":63,\"Guild_Slayer\":21,\"Guild_MVP\":17,\"Guild_RotatingCollections\":6,\"Guild_LastCollectedWeek\":274,\"Guild_DailyKeysData\":1100,\"Guild_WeeklyKeysData\":278,\"GemsSpent\":368355,\"DailyPoints\":18960,\"DailyWelcomeBack\":1939,\"QuestsDailyCompletions\":656,\"QuestsDailyCollections\":5,\"QuestsWeeklyCompletions\":0,\"QuestsWeeklyCollections\":1,\"AchievementMilestonePoints\":148,\"AchievementMilestoneProgress\":17,\"GamePassLastDay\":0,\"GamePassGranted\":0,\"GamePassClaimed\":0,\"PurchaseTier\":0,\"OrbSelection\":59,\"FreeValuePackageWeek\":0,\"BeginnersQuests\":999,\"VipDailyRoll\":2,\"FriendCrateRoll\":2,\"WeekIndex\":278,\"FlashSaleTier\":0,\"FirstLoginDay\":1674,\"KittyBools\":0,\"Unlocks\":1535,\"GoldBillions\":0,\"HolidayCollection\":0,\"TechnoLastCollection\":0,\"TechnoRun\":250,\"TechnoEvent\":250,\"DesertCooldown\":0,\"ArenaRefreshies\":0,\"HardBoostSpins\":0,\"HardBoostTopCollections\":0,\"HardBoostTopCollectionsStart\":0,\"HardBoostTopCollectionsLastDay\":0,\"HardModeSpinsS\":0,\"HardModeSpinsA\":0,\"HardModeSpinsB\":0,\"HardModeSpinsC\":0,\"HardModeCardLastDay\":0,\"HardModeCardCollection\":0,\"HardModeCardLastDayPremium\":0,\"HardModeCardCollectionPremium\":0,\"HardModeUnlockDay\":0,\"AscensionUnlockDay\":0,\"ChatBadgeIndex\":0,\"Best_GuildBossDamageTotal\":1,\"Best_GuildSoloLevel\":49,\"Best_GuildSoloDamage\":258,\"Best_EventBattleship\":34,\"Best_EventMonopoly\":310,\"Best_EventCarSmash\":12,\"Best_ArenaPoints\":569,\"Best_TechnoPoints\":250,\"Best_SlotsPoints\":2476,\"Best_GuildBossDmgOneFight\":199,\"SummonBadLuckCounter\":17,\"OrbsBadLuckCounter\":10,\"Guild_LastCollectedWeekRank\":275,\"CampaignStuckDay\":1939,\"HardModeStuckDay\":0,\"OrbsRecordElite\":24,\"OrbsRecordUsed\":277,\"BattleshipHits\":429,\"BattleshipMisses\":512,\"KittyRollLastCheck\":1091,\"KittyRollLastCheckArti\":16,\"LastUpdate\":297,\"ArenaSize\":165946,\"CALL_ID\":561,\"DEV_WEEKOFFSET\":0,\"ERROR_CHECK_WEEK\":0,\"_bt64\":46562306,\"_bd64\":17920,\"_sd64\":0,\"_bs64\":0,\"_dm64\":44992,\"BestScoreDayIdCheck\":1730,\"Best_GuildSoloLevel_NEW\":33,\"_bb64\":64224604,\"BuggyFixWeek\":275}")
  const Stalls = JSON.parse("{\"0\":{\"Stars\":4,\"Level\":20,\"OpenCount\":190,\"OpenTime\":\"2025-04-22T16:31:24.531Z\"},\"1\":{\"Stars\":4,\"Level\":19,\"OpenCount\":188,\"OpenTime\":\"2025-04-22T16:31:24.532Z\"},\"2\":{\"Stars\":5,\"Level\":19,\"OpenCount\":188,\"OpenTime\":\"2025-04-22T16:31:24.532Z\"},\"3\":{\"Stars\":4,\"Level\":19,\"OpenCount\":185,\"OpenTime\":\"2025-04-22T16:31:24.533Z\"},\"4\":{\"Stars\":5,\"Level\":18,\"OpenCount\":170,\"OpenTime\":\"2025-04-22T16:31:27.353Z\"},\"5\":{\"Stars\":4,\"Level\":17,\"OpenCount\":161,\"OpenTime\":\"2025-04-22T16:31:16.705Z\"},\"6\":{\"Stars\":4,\"Level\":15,\"OpenCount\":145,\"OpenTime\":\"2025-04-22T16:31:16.705Z\"},\"7\":{\"Stars\":3,\"Level\":4,\"OpenCount\":35,\"OpenTime\":\"2025-04-23T01:20:55.575Z\"}}")
  const TechTreeData = JSON.parse("{\"Red\":15,\"Blue\":15,\"Tank\":16,\"Brawler\":15,\"Support\":15,\"Green\":15,\"Yellow\":15,\"Finisher\":20,\"Mage\":20}")
  const MarketData = JSON.parse("[{\"type\":\"Ooze\",\"amount\":1800,\"cost\":500,\"index\":-1,\"isPurchased\":false},{\"type\":\"PokerChips\",\"amount\":10,\"cost\":750,\"index\":-1,\"isPurchased\":true},{\"type\":\"ShardsHeroPurple\",\"amount\":5,\"cost\":800,\"index\":-1,\"isPurchased\":false},{\"type\":\"Orbs\",\"amount\":1,\"cost\":900,\"index\":-1,\"isPurchased\":false},{\"type\":\"PokerChips\",\"amount\":1,\"cost\":0,\"index\":-1,\"isPurchased\":true},{\"type\":\"ArtifactDust\",\"amount\":500,\"cost\":650,\"index\":-1,\"isPurchased\":false},{\"type\":\"ShardsHeroPurple\",\"amount\":10,\"cost\":1350,\"index\":-1,\"isPurchased\":false},{\"type\":\"ShardsHeroBlue\",\"amount\":200,\"cost\":1750,\"index\":-1,\"isPurchased\":false}]")
  const events = JSON.parse("{\"MonthlyMiscArena\":{\"StartedWith\":109,\"EndingWeekId\":278,\"Collections\":[]},\"MonthlyMiscFusion\":{\"StartedWith\":188,\"EndingWeekId\":278,\"Collections\":[0,1]},\"MonthlyMiscShops\":{\"StartedWith\":14379,\"EndingWeekId\":278,\"Collections\":[0,1,2,3]},\"MonthlyMiscTavern4Stars\":{\"StartedWith\":39,\"EndingWeekId\":278,\"Collections\":[0,1,2,3]},\"MonthlyMiscTavern5Stars\":{\"StartedWith\":9,\"EndingWeekId\":278,\"Collections\":[0]},\"MonthlyMiscAll\":{\"StartedWith\":93,\"EndingWeekId\":278,\"Collections\":[0,1]},\"MonthlyOrbs\":{\"StartedWith\":256,\"EndingWeekId\":279,\"Collections\":[1,0,2]},\"MonthlyPokerChips\":{\"StartedWith\":2052,\"EndingWeekId\":280,\"Collections\":[6,5,4,3,2,1,0,7]},\"MonthlySummons\":{\"StartedWith\":1152,\"EndingWeekId\":281,\"Collections\":[]},\"BiWeeklyCard\":{\"StartedWith\":113,\"EndingWeekId\":279,\"Collections\":[0]},\"OneTimeOnlyCustomSale\":{\"StartedWith\":113,\"EndingWeekId\":278,\"Collections\":[]},\"NewCurrencyDailies\":{\"StartedWith\":113,\"EndingWeekId\":278,\"Collections\":[2,1,0],\"ExtraData\":{\"Quests\":[{\"Type\":6,\"Requirement\":277,\"StartedWith\":276},{\"Type\":2,\"Requirement\":1155,\"StartedWith\":1152},{\"Type\":1,\"Requirement\":367955,\"StartedWith\":367455},{\"Type\":4,\"Requirement\":341,\"StartedWith\":338}],\"EventBounties\":3,\"EventBountiesMilestone\":1}},\"ValuePackageMisc\":{\"StartedWith\":113,\"EndingWeekId\":278,\"Collections\":[]}}")
  const achievements = JSON.parse("{\"CampaignLevel\":29,\"CampaignChapter\":7,\"ArenaWins\":5,\"UseSummon\":18,\"XpLevel10\":6,\"Sewer10\":12,\"HeroEvolution\":3,\"HeroSpawnPurple\":8,\"CollectShops\":11,\"ShopUpgrade\":25,\"AccountRegistration\":1,\"Sewer50\":2,\"ArenaRank\":5,\"CampaignZone\":1,\"VipBonus\":2,\"MasteryClassUnique\":1,\"MasteryFactionUnique\":1,\"FactionSewer10\":2,\"Tavern5Stars\":3,\"FriendCrateUpgrade\":2,\"XpLevel50\":1,\"TechnoRun\":1,\"ArtifactSpawnPurple\":1,\"MasteryClass\":1}")
  const collectionData = JSON.parse("{\"CampaignAchievement\":[0,1,2,3,4,5,6,7,8,9,10,11,12,13],\"ArenaMilestone\":[0,1,2,3,4,5,6,7,8,9,10,11,12],\"SewerAchievement\":[0,1,2,3,4,5,6,7,8,9,10,11],\"DailySale\":[0,1,2,3,4,5,6],\"HallOfFame\":[0],\"TechnoMilestone\":[0],\"GlobeShop1\":[6]}")
  // Default UserData. Here we form a default object for each key.
  const defaultUserData: { [key: string]: any } = {
    "ArenaMatches": [],
    "Achievements": achievements,
    "AvatarsData": [3,1,17,9,8,25,7,0,11,13,22,15,23,14,30,18,6,20,10,16,5,2,31,21,4,28,19,26,12,41,38,1023,79,27,80,24,29,33,1015,83,77,53,1025,1017,1041,1012,82,85,68,67,57,1020,87,49,74,1016,1080,1013,1027,48,86,1086,1019,42,1087,1085,1024,62,1067,44,1022,1042,76,54,1026,46,1077,1038,1021,34,1018,45,1079,1031,1029,1076,59,61,1045,1083,69,50,81,1049,63,1034,64,1063,1074,1061,1057,1059,1014,36,65,1069,1028,72,1081,1054,1036,88,1046,1030,89,1062,1050,71,51,1089,58,39,75,1071,1048,37,66,84,1039,60],
    "ClubSmashLocal": {
      "WeekId": Math.floor((Date.now() - new Date("2020-01-01").getTime()) / (1000 * 60 * 60 * 24 * 7)),
      "Defeats": 0,
      "Refreshies": 5,
      "BossTickets": 0,
      "SmashTickets": 0,
      "MilestoneBoss": 0,
      "MilestoneLocal": 0,
      "BossAttackBonus": 0,
      "PurchasedSmashTickets": 0,
      "CollectionDailyTickets": 0,
      "CollectionDailyTicketsBoss": 0,
      "DailyResultCollections": [],
      "_clubSmashPointsProxy": 0,
      "_smashTotalPointsProxy": 0,
      "Wins": [0, 0, 0, 0]
    },
    "CollectionData": collectionData,
    "DailyGiftData": {
      "DayStreak": 114,
      "EventWelcomeLastCollected": 278,
      "EventDailyGiftRollTomorrow": 2,
      "EventDailyGiftRoll": 1,
      "EventDailyGiftLastCollected": 1939,
      "DailyLast": 114,
      "DailyMilestone": 7,
      "XpMilestone": 2
    },
    "EventsData": events,
    "FriendsData": {
      "CurrentWeek": Math.floor((Date.now() - new Date("2020-01-01").getTime()) / (1000 * 60 * 60 * 24 * 7)),
      "Searchees": []
    },
    "GuildAchievements": {},
    "GuildSoloBoss": {
      "hp": 600000,
      "hpCap": 600000,
      "weekId": 276,
      "level": 0,
      "typeIndex": 2,
      "result": null,
      "minionIndex": 11,
      "soloMilestoneCollection": 0,
      "bossMilestoneCollection": 0,
      "purchaseIndex": 0,
      "collectedBosses": []
    },
    "HeroCardData": [69, 86, 72, 80],
    "HeroSlotsData": { "Slots": 100, "Purchases": 0 },
    // For KittyRolls, use arrays of fixed length.
    "KittyRolls": {
      "RecruitScrolls": [1, 3, 17, 9, 8, ...Array(195).fill(37)],
      "RecruitShardsBlue": Array(50).fill(19),
      "RecruitShardsPurple": Array(50).fill(37),
      "Tavern": Array(100).fill(209),
      "DojoSpin": Array(100).fill(4),
      "CasinoSpin": Array(100).fill(2),
      "EventMonopoly": Array(50).fill(50),
      "EventMonopolyCave": [2, 2, 7, 0, 7],
      "Materials": Array(50).fill(4),
      "ArtifactsPurple": [6, 7, 8, 7, 12, 14, 7, 14, 14, 14],
      "ArtifactsBlue": [3, 0, 3, 0, 1, 2, 2, 0, 1, 2, 3, 2, 1, 2, 1, 3, 4, 1, 2, 2, 3, 1, 2, 1, 0, 5, 3, 0, 2, 1, 5, 2, 2, 1, 1, 1, 4, 3, 2, 1, 0, 2, 3, 2, 1, 3, 0, 1, 1, 3],
      "MutagenRolls": [102301,210302,312002,102305,201302,312008,21302,210306,123001,123003,301213,310202,102310,31213,213003,302103,31203,312003,130208,302103,123003,130201,230105,201301,302109,103205,321008,13204,120302,12303,120302,103210,213004,320106,21302,201302,21302,302103,23102,231012,213001,132010,23102,301211,21309,32104,301204,312001,302101,310203,312003,301207,102307,321004,32104,13208,103202,31204,230102,103201,230102,130205,302109,210304,31211,103202,12302,312005,130212,120304,12308,301202,310207,102305,312001,312003,213005,31203,102301,310202,321005,210308,23103,302102,123003,302102,130205,203103,12302,13202,302108,31207,130201,21301,302101,312006,130203,130205,231008,102305],
      "SuperMutagenRolls": [231010,123015,213010,12312,23110,302111,231010,13210,302110,310210,13210,12312,321010,210313,203111,32110,12311,32112,102310,102311,130211,301213,13211,103213,13210,312012,320110,13213,231011,103210,231011,301210,21315,132012,23111,123011,132013,23110,213015,120312,203113,13211,21313,123010,32110,21314,201311,130210,210311,203112],
      "SlotsSpins": [23543453,341342540,501031051,235453153,215053402,513530305,354152302,504452154,542254254,502045421,413240240,154032251,305534213,120425023,120023503,251503230,501145341,145413540,420510024,201421304,203403502,521514431,142451314,105430125,421234140,350015034,350032354,421540245,341425045,21532415,314143453,340452301,512410301,23435532,304140012,235032345,341215102,140542245,45504340,342214450,354540315,354140145,124513501,204430024,304213354,45415315,415234205,421035042,523420124,520253253],
      "ArtifactsUltra": [10,13,13,16,16,13,16,16,10,11],
      "ClubSmashRolls": [297232,941033,315121,244042,206113,687342,701003,362133,208122,429043],
      "SmashBossRolls": [211,320,21,211,300,400,421,322,422,0],
      "CharmShardsRolls": [40,10,2,2,10,4,5,400,10,3,10,2,200,3,4,2,2,40,2,1,4,10,1,4,4,10,3,2,4,37000,2,1,100,4,500,20,20,3,30,3,1,300,3,10,2,3,40,3,3,3],
      "RecruitOrbs": [13,22,3,17,68,5,10,30,4,23,11,23,19,76,24,25,4,59,25,9,12,20,11,0,9,20,8,24,14,18,7,17,13,1,1,25,51,7,23,12,3,17,14,10,30,13,30,7,22,13,19,18,4,16,21,12,21,22,38,18,25,35,27,25,13,9,25,28,23,7,20,10,26,34,15,20,11,2,18,29,17,18,2,22,20,27,11,24,5,9,10,14,19,6,23,77,25,14,2,7],
      "CharmSpins": [0,4,2,0,0,10,1,2,1,2,2,1,11,3,0,7,1,1,2,2]
    },
    "MarketData" : MarketData,
    "TechTreeData" : TechTreeData,
    "TavernData_v2" : [100,8,7,7,108,6,300,8],
    "Stalls" : Stalls,
    "KittyStats": KittyStats,
    // Virtual Currency defaults
    "UserVirtualCurrency": {
      "A0": 0,
      "A1": 35,
      "A2": 10,
      "AC": 13650,
      "AD": 0,
      "AS": 0,
      "AT": 3,
      "BH": 0,
      "BS": 0,
      "BT": 0,
      "C0": 0,
      "C2": 0,
      "CB": 0,
      "CS": 0,
      "DI": 0,
      "EH": 0,
      "FB": 19,
      "GC": 205,
      "GE": 50000,
      "GK": 25,
      "GM": 158,
      "GO": 500000,
      "GS": 0,
      "GX": 0,
      "H0": 0,
      "H1": 0,
      "HC": 0,
      "IA": 0,
      "M0": 0,
      "OR": 0,
      "OZ": 100,
      "PC": 5,
      "RE": 0,
      "RO": 0,
      "SC": 5,
      "SI": 5000,
      "SM": 0,
      "ST": 0,
      "T1": 0,
      "T2": 0,
      "TC": 0,
      "TI": 40,
      "TR": 10,
      "TT": 0,
      "TY": 0,
      "VI": 0,
      "XP": 4431
    }
  };

  // Store default user data. Here we iterate over each key in the defaultUserData object.
  Object.keys(defaultUserData).forEach(key => {
    // If the value is already a string, store as is; otherwise JSON-stringify it.
    const dataValue = typeof defaultUserData[key] === "string"
      ? defaultUserData[key]
      : JSON.stringify(defaultUserData[key]);
    setUserData(playFabId, key, dataValue);
  });

  // Set default virtual currency values.
  const defaultVirtualCurrency = {
    "A0": 0,
    "A1": 0,
    "A2": 0,
    "AC": 0,
    "AD": 0,
    "AS": 0,
    "AT": 10,
    "BH": 0,
    "BS": 0,
    "BT": 0,
    "C0": 0,
    "C2": 0,
    "CB": 0,
    "CS": 0,
    "DI": 0,
    "EH": 0,
    "FB": 0,
    "GC": 0,
    "GE": 50000,
    "GK": 0,
    "GM": 0,
    "GO": 500000,
    "GS": 0,
    "GX": 0,
    "H0": 0,
    "H1": 0,
    "HC": 0,
    "IA": 0,
    "M0": 0,
    "OR": 0,
    "OZ": 100,
    "PC": 5,
    "RE": 0,
    "RO": 0,
    "SC": 5,
    "SI": 5000,
    "SM": 0,
    "ST": 0,
    "T1": 0,
    "T2": 0,
    "TC": 0,
    "TI": 40,
    "TR": 10,
    "TT": 0,
    "TY": 0,
    "VI": 0,
    "XP": 4431
  };
  
  Object.keys(defaultVirtualCurrency).forEach(currency => {
    setCurrency(playFabId, currency, defaultVirtualCurrency[currency as keyof typeof defaultVirtualCurrency]);
  });
  createDefaultHeroes(playFabId)
}
