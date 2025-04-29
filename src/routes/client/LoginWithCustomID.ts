import { Request, Response } from "express";
import { getAccountByCustomId, generatePlayFabId, generateEntityToken, generateSessionTicket, generateTokenCheck, createAccount, Entity, generateEntityId, updateAccountSessionTicket } from "../../controllers/accountController";
import config from "../../config";
export const LoginWithCustomID = (req: Request, res: Response) => {
    console.log("LoginWithCustomID", req.body);
    const account = getAccountByCustomId(req.body.CustomId);
    let playFabId: string;
    let entity: Entity = {
        Id: "",
        Type: "title_player_account",
        TypeString: "title_player_account"
    }
    let entityToken: {
        EntityToken: string;
        TokenExpiration: string;
    }
    let sessionTicket: string;
    let tokenCheck: string;
    let created: string;
    let isNew: boolean;
    let displayName: string;
    if (!account) {
        playFabId = generatePlayFabId();
        entity.Id = generateEntityId();
        entityToken = generateEntityToken(entity, config.secretKey);
        
        tokenCheck = generateTokenCheck();
        created = new Date().toISOString();
        displayName = createAccount( playFabId, req.body.CustomId, entity.Id, tokenCheck, entityToken.TokenExpiration);
        //displayName = ""
        isNew = true;
    } else {
        playFabId = account.playFabId;
        entity.Id = account.entityId;
        entityToken = generateEntityToken(entity, config.secretKey);
        tokenCheck = generateTokenCheck();
        created = account.created;
        displayName = account.displayName;
        isNew = false;
    }
    sessionTicket = generateSessionTicket(playFabId, entity.Id, config.titleId, config.secretKey);
    updateAccountSessionTicket(playFabId, sessionTicket);
    res.json({
        "code": 200,
        "data": {
          "EntityToken": {
            Entity: entity,
              "EntityToken": entityToken.EntityToken,
              "TokenExpiration": entityToken.TokenExpiration
          },
          "InfoResultPayload": {
              "AccountInfo": {
                  "Created": "2024-08-01T19:52:34.172Z", //created ,
                  "CustomIdInfo": {
                      "CustomId": req.body.CustomId
                  },
                  "PlayFabId": playFabId,
                  "PrivateInfo": {
                    "Email": "test@testing.com"
                  },
                  "TitleInfo": {
                      "DisplayName": displayName,
                      "Created": "2024-08-01T19:52:34.172Z", //created ,
                      "FirstLogin": "2024-08-01T19:52:34.172Z", //created ,
                      "LastLogin": new Date().toISOString(),
                      "Origination": "CustomId",
                      "TitlePlayerAccount": {
                          "Id": entity.Id,
                          "Type": entity.Type,
                          "TypeString": entity.TypeString
                      },
                      "isBanned": false
                  },
                  "Username": playFabId
              },
              "CharacterInventories": [],
              "UserDataVersion": 0,
              "UserInventory": [],
              "UserReadOnlyDataVersion": 0,
          },
          "LastLoginTime": new Date().toISOString(),
          "NewlyCreated": false,
          "PlayFabId": playFabId,
          "SessionTicket": sessionTicket,
          "SettingsForUser": {
              "GatherDeviceInfo": false,
              "GatherFocusInfo": false,
              "NeedsAttribution": false
          },
          "TreatmentAssignment": {
              "Variables": [],
              "Variants": []
          }
      },
      "status": "OK"
  });
}


