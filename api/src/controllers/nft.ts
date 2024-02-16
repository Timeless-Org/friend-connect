import { Request, Response } from "express";
import {
  createKeyNftService,
  getHoldKeyAmountService,
  getHoldKeyService,
  getKeyNFTHolderAmountService,
  getKeyNFTHolderService,
  getTradeProfitService,
} from "../services/nft";
import { IUser } from "../utils/interfaces";

export const createKeyNftController = async (req: Request, res: Response) => {
  const { address } = req.body;
  if (!address) return res.status(400).json({ message: "Bad Request" });

  try {
    const result: boolean = await createKeyNftService(address);
    if (result) {
      res.status(200).json({ message: "success" });
      return;
    }
    res.status(500).json({ message: "Internal Server Error" });
  } catch (err) {
    console.log(`👾 createKeyNftController: ${err}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getHoldKeyController = async (req: Request, res: Response) => {
  const { address } = req.params;
  if (!address) return res.status(400).json({ message: "Bad Request" });

  try {
    const holders: IUser[] = await getHoldKeyService(address);
    if (holders) {
      res.status(200).json(holders);
      return;
    }
    res.status(500).json({ message: "Internal Server Error" });
  } catch (err) {
    console.log(`👾 getHoldKeyController: ${err}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getHoldKeyAmountController = async (req: Request, res: Response) => {
  const { address } = req.params;
  if (!address) return res.status(400).json({ message: "Bad Request" });

  try {
    const amount: number = await getHoldKeyAmountService(address);
    if (amount) {
      res.status(200).json(amount);
      return;
    }
    res.status(500).json({ message: "Internal Server Error" });
  } catch (err) {
    console.log(`👾 getHoldKeyAmountController: ${err}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getKeyNFTHolderController = async (req: Request, res: Response) => {
  const { address } = req.params;
  if (!address) return res.status(400).json({ message: "Bad Request" });

  try {
    const holders: IUser[] = await getKeyNFTHolderService(address);
    if (holders) {
      res.status(200).json(holders);
      return;
    }
    res.status(500).json({ message: "Internal Server Error" });
  } catch (err) {
    console.log(`👾 getKeyNFTHolderController: ${err}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getHolderKeyAmountController = async (req: Request, res: Response) => {
  const { address } = req.params;
  if (!address) return res.status(400).json({ message: "Bad Request" });

  try {
    const amount: number = await getKeyNFTHolderAmountService(address);
    if (amount) {
      res.status(200).json(amount);
      return;
    }
    res.status(500).json({ message: "Internal Server Error" });
  } catch (err) {
    console.log(`👾 getHolderKeyAmountController: ${err}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getTradeProfitController = async (req: Request, res: Response) => {
  const { address } = req.params;
  if (!address) return res.status(400).json({ message: "Bad Request" });

  try {
    const amount: number = await getTradeProfitService(address);
    if (amount) {
      res.status(200).json(amount);
      return;
    }
    res.status(500).json({ message: "Internal Server Error" });
  } catch (err) {
    console.log(`👾 getTradeProfitController: ${err}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
