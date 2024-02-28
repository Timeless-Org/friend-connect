import { Request, Response } from "express";
import { getLastestChatService, getUserAllChatService, getUserChatService } from "../services/chat";
import { IAllChat, IChat } from "../utils/interfaces";

export const getUserChatController = async (req: Request, res: Response) => {
  const { address } = req.params;
  if (!address) return res.status(400).json({ message: "Bad Request" });

  try {
    const lowerAddress = address.toLowerCase();
    const chat: IAllChat | null = await getUserChatService(lowerAddress);
    if (chat) {
      res.status(200).json({ chat });
      return;
    } else res.status(404).json({ message: "Not Found" });
  } catch (err) {
    console.log(`👾 getUserChatController: ${err}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getUserAllChatController = async (req: Request, res: Response) => {
  const { address } = req.params;
  if (!address) return res.status(400).json({ message: "Bad Request" });

  try {
    const lowerAddress = address.toLowerCase();
    const allChat: IAllChat[] = await getUserAllChatService(lowerAddress);
    if (allChat) {
      res.status(200).json({ allChat });
      return;
    } else res.status(404).json({ message: "Not Found" });
  } catch (err) {
    console.log(`👾 getUserAllChatController: ${err}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getLatestChatController = async (req: Request, res: Response) => {
  try {
    const user: IChat[] = await getLastestChatService();
    if (user) {
      res.status(200).json({ user });
      return;
    } else res.status(404).json({ message: "Not Found" });
  } catch (err) {
    console.log(`👾 getLatestChatController: ${err}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
