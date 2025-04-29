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

/*

export const LoginWithCustomID = (req: Request, res: Response) => {
  console.log("LoginWithCustomID", req.body);
  const account = getAccountByCustomId(req.body.customId);

  if (!account) {
    const entity: Entity = {
        Id: "A0BB4C9BD827C805",
        Type: "title_player_account",
        TypeString: "title_player_account"
    }
    const account = createAccount(req.body.customId);
    createAccountDB(account.data.playFabId, req.body.customId, generateToken(), new Date().toISOString());
    const entityToken = generateEntityToken(entity, config.secretKey);
    res.json({
        "code": 200,
        "data": {
            "EntityToken": {
                "EntityToken": entityToken.EntityToken,
                "TokenExpiration": entityToken.TokenExpiration,
                "Entity": entity
            },
            //"SessionTicket": generateSessionTicket(account.data.playFabId, entity.Id, process.env.TITLE_ID || "2xRsuqy8g8", process.env.SECRET_KEY || "Qkt4m3pU5A7sJ9zCqLpVw2YgR0eNX1hT")
            "InfoResultPayload": {
                "AccountInfo": {
                    "Created": new Date().toISOString(),
                    "CustomIdInfo": {
                        "CustomId": req.body.customId
                    },
                    "PlayFabId": account.data.playFabId,
                    "PrivateInfo": {},
                    "TitleInfo": {
                        "Created": new Date().toISOString(),
                        "FirstLogin": new Date().toISOString(),
                        "LastLogin": new Date().toISOString(),
                        "Origination": "CustomId",
                        "TitlePlayerAccount": {
                            "Id": entity.Id,
                            "Type": entity.Type,
                            "TypeString": entity.TypeString
                        },
                        "isBanned": false
                    }
                },
                "CharacterInventories": [],
                "UserDataVersion": 0,
                "UserInventory": [],
                "UserReadOnlyDataVersion": 0
            },
            "NewlyCreated": true,
            "PlayFabId": account.data.playFabId,
            "SessionTicket": generateSessionTicket(account.data.playFabId, entity.Id, config.titleId, config.secretKey),
            "SettingsForUser": {
                "GatherDeviceInfo": true,
                "GatherFocusInfo": false,
                "NeedsAttribution": false
            },
            "TreatmentAssignment": {
                "Variables": [],
                "Variants": []
            },
            "status": "OK"
        }

    });
    return;
  }

  const account = getAccountByCustomId(req.body.customId);

  if (!account) {
    res.json({
      "code": 404,
      "data": {
        "EntityToken": {
            "Entity": {
                "Id": "A0BB4C9BD827C805",
                "Type": "title_player_account",
                "TypeString": "title_player_account"
            },
            "EntityToken": "NHxhZVljL0ZZcFhtaXlUSmZTQjBGTmNadUNUWTlYSmNGZVJvMy9GVU1KMy9vPXx7ImkiOiIyMDI1LTA0LTA3VDE0OjMzOjIyWiIsImlkcCI6IkN1c3RvbSIsImUiOiIyMDI1LTA0LTA4VDE0OjMzOjIyWiIsImZpIjoiMjAyNS0wNC0wN1QxNDozMzoyMloiLCJ0aWQiOiIyeFJzdXNqeThnOCIsImlkaSI6ImViZjI1NTMzYzI2NDBlMjUiLCJoIjoiaW50ZXJuYWwiLCJlYyI6InRpdGxlX3BsYXllcl9hY2NvdW50ITNEN0VBNTFBRTI0QzRCQy8yMTQ0L0Y2RDEyMTA1Q0Q2OTI4Qi9BMEJCNEM5QkQ4MjdDODA1LyIsImVpIjoiQTBCQjRDOUJEODI3QzgwNSIsImV0IjoidGl0bGVfcGxheWVyX2FjY291bnQifQ==",
            "TokenExpiration": new Date(Date.now() + 86400000).toISOString()
        },
        "InfoResultPayload": {
            "AccountInfo": {
                "Created": "2025-04-07T14:33:22.666Z",
                "CustomIdInfo": {
                    "CustomId": "ebf25533c2640e25"
                },
                "PlayFabId": "F6D12105CD6928B",
                "PrivateInfo": {},
                "TitleInfo": {
                    "Created": "2025-04-07T14:33:22.666Z",
                    "FirstLogin": "2025-04-07T14:33:22.666Z",
                    "LastLogin": new Date().toISOString(),
                    "Origination": "CustomId",
                    "TitlePlayerAccount": {
                        "Id": "A0BB4C9BD827C805",
                        "Type": "title_player_account",
                        "TypeString": "title_player_account"
                    },
                    "isBanned": false
                }
            },
            "CharacterInventories": [],
            "UserDataVersion": 0,
            "UserInventory": [],
            "UserReadOnlyDataVersion": 0
        },
        "NewlyCreated": false,
        "PlayFabId": "F6D12105CD6928B",
        "SessionTicket": "F6D12105CD6928B-3D7EA51AE24C4BC-A0BB4C9BD827C805-2144-8DD75E126459AAC-yVyDBx8D9MO+Mgxovy6j74Ve0y5irvRWlvtfIET5H/U=",
        "SettingsForUser": {
            "GatherDeviceInfo": true,
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
};
*/
