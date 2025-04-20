import { Request, Response } from "express";

export const GetTitleData = (req: Request, res: Response) => {
    res.json({
        code: 200,
        data: { Data: { BUILD_REQUIRED_VERSION: "297" } },
        status: "OK",
      });
};

