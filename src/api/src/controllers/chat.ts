import { Request, Response } from "express";
import { IAllChat, IChat, IChatWithMessage } from "lib/type";
import { getLastestChatService, getUserAllChatService, getUserChatService } from "services/chat";

export const getUserChatController = async (req: Request, res: Response) => {
  const { address } = req.params;
  if (!address) return res.status(400).json({ message: "Bad Request" });

  try {
    const chat: IChatWithMessage | null = await getUserChatService(address);
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
    const allChat: IAllChat[] = await getUserAllChatService(address);
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
    const latestChat: IChat[] = await getLastestChatService();
    if (latestChat) {
      res.status(200).json({ latestChat });
      return;
    } else res.status(404).json({ message: "Not Found" });
  } catch (err) {
    console.log(`👾 getLatestChatController: ${err}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
