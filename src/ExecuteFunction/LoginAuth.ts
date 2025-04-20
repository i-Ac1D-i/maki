import { Request, Response } from "express";
import { getAccountBySessionTicket, generateTokenCheck, updateAccountToken } from "../controllers/accountController";

export const LoginAuth = (req: Request, res: Response): any => {
  // Extract LOGIN_TOKEN from the function parameter.
  const loginToken = req.body?.FunctionParameter?.LOGIN_TOKEN;
  if (!loginToken) {
    return { error: "Missing LOGIN_TOKEN" }; // Return an error object.
  }

  const account = getAccountBySessionTicket(loginToken);
  if (!account) {
    return { error: "Unauthorized" };
  }

  // Generate new _TokenCheck, update the account.
  const tokenCheck = generateTokenCheck();
  updateAccountToken(account.playFabId, tokenCheck, account.tokenExpiration);

  // Return a plain object containing the new token information.
  return {
    KITTYCLOCK: new Date().toISOString(),
    UserDataClaims: {
      _TokenCheck: {
        LastUpdated: new Date().toISOString(),
        Permission: "Private",
        Value: tokenCheck
      }
    }
  };
};
