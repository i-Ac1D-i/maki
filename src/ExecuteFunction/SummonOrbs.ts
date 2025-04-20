import { Request, Response } from "express";
import { getHeroNames } from "../utils/getHeroNames";
import { generateInstanceId } from "../utils/generators";

export const SummonOrbs = (req: Request, res: Response) => {

    const summonCount = req.body.FunctionParameter.attemptList[0];
    const heroes = []
    for (let i = 0; i < summonCount; i++) {
        const hero = getHeroNames()[Math.floor(Math.random() * getHeroNames().length)]
        heroes.push({
            customData: null,
            itemId: hero,
            itemInstanceId: generateInstanceId(),
            purchaseDate: new Date().toISOString(),
            unitPrice: 0
        })
    }
    const functionResult = {
        CurrencyClaims: {
            OR: 5
        },
        KITTYCLOCK: new Date().toISOString(),
        TITLE_DATA_VERSION: "297_010",
        UserDataClaims: {
            AvatarsData: [9,1,3,17,8,27,16,21,25,29,2,18,0,13]
        },
        grantItemsToUserResult: heroes
    }
    console.log("SummonOrbs")
    console.log(functionResult)
    return functionResult;
};



