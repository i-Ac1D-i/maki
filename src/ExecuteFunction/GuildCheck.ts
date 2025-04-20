import { Request, Response } from "express";

export const GuildCheck = (req: Request, res: Response) => {
    const functionResult = {
        KITTYCLOCK: new Date().toISOString(),
        TITLE_DATA_VERSION: "297_010",
      };
    return functionResult;
}
