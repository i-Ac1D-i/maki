import { Request, Response } from "express";
import { LoginAuth } from "../../ExecuteFunction/LoginAuth";
import { LoginCheck } from "../../ExecuteFunction/LoginCheck";
import { GuildCheck } from "../../ExecuteFunction/GuildCheck";
import { ChatFetch } from "../../ExecuteFunction/ChatFetch";
import { SummonOrbs } from "../../ExecuteFunction/SummonOrbs";
import { summonCapsules } from "../../ExecuteFunction/SummonCapsules";
export const ExecuteFunction = (req: Request, res: Response) => {
    console.log("ExecuteFunction", req.body);
  const { FunctionName } = req.body;
  let functionResult = {};
  switch (FunctionName) {
    case "LOGIN_AUTH":
      functionResult = LoginAuth(req, res);
      break;
    case "LOGIN_CHECK":
      functionResult = LoginCheck(req, res);
      break;
    case "GUILD_CHECK":
      functionResult = GuildCheck(req, res);
      break;
    case "CHAT_FETCH":
      functionResult = ChatFetch(req, res);
      break;
    case "SUMMON_ORBS":
      console.log("SummonOrbs")
      functionResult = SummonOrbs(req, res);
    case "SUMMON_SCROLLS":
      functionResult = summonCapsules(req, res);
      console.log("SummonCapsules", functionResult);
      break;
    default:
      functionResult = { message: "Function not implemented yet" };
  }

  res.json({
    code: 200,
    data: {
      ExecutionTimeMilliseconds: 100,
      FunctionName,
      FunctionResult: functionResult,
    },
    status: "OK",
  });
};
