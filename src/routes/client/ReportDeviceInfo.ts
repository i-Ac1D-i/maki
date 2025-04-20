import { Request, Response } from 'express';

export const ReportDeviceInfo = (req: Request, res: Response) => {
  console.log("ReportDeviceInfo", req.body);
  res.json({
    code: 200,
    data: {},
    status: "OK"
  });
}
