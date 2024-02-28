import { Request, Response } from "express";
import { createMessageService } from "../services/message";

export const createMessageController = async (req: Request, res: Response) => {
  const { address, objectAddress, text } = req.body;
  if (!address || !text) return res.status(400).json({ message: "Bad Request" });

  try {
    const lowerAddress = address.toLowerCase();
    const lowerObjectAddress = objectAddress.toLowerCase();
    const result: boolean = await createMessageService(lowerAddress, lowerObjectAddress, text);
    if (result) {
      res.status(200).json({ message: "Success" });
      return;
    }
    res.status(500).json({ message: "Internal Server Error" });
  } catch (err) {
    console.log(`👾 createMessageController: ${err}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
