import { Request, Response } from "express";
export const GetTime = (req: Request, res: Response) => {
  console.log("GetTime", req.body);
  res.json({ code: 200, data: { Time: new Date().toISOString() }, status: "OK" });
};

