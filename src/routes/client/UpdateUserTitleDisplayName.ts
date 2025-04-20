import { Request, Response } from "express";

export const UpdateUserTitleDisplayName = (req: Request, res: Response) => {
    console.log("UpdateUserTitleDisplayName", req.body);
    res.json({
          code: 200,
          data: {
              "DisplayName": req.body.DisplayName
          },
          status: "OK"
    });
}