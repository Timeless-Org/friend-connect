import { Request, Response } from "express";
import { createMessageService } from "services/message";

export const createMessageController = async (req: Request, res: Response) => {
  const { address, text } = req.body;
  if (!address || !text) return res.status(400).json({ message: "Bad Request" });

  try {
    const result: boolean = await createMessageService(address, text);
    if (result) {
      res.status(200).json({ message: "success" });
      return;
    }
    res.status(500).json({ message: "Internal Server Error" });
  } catch (err) {
    console.log(`👾 createMessageController: ${err}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
