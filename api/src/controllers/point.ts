import { Request, Response } from "express";
import { getLatestPointService } from "../services/point";

export const getLatestPointController = async (req: Request, res: Response) => {
  try {
    const address = req.params.address;
    const amount: number = await getLatestPointService(address);
    res.status(200).json({ amount });
  } catch (err) {
    console.error(`👾 getLatestPointController: ${err}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
