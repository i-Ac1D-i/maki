import { Request, Response } from "express";

export const ChatFetch = (req: Request, res: Response) => {
    const functionResult = {
        KITTYCLOCK: new Date().toISOString(),
        TITLE_DATA_VERSION: "297_013",
        GlobalChat: []
      }
    return functionResult;
};

