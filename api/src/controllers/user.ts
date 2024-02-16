import { Request, Response } from "express";
import { IUser } from "../lib/interfaces";
import {
  createUserService,
  getTopPriceUsersService,
  getUserService,
  getWatchlistService,
  searchUserService,
  updateNotificationService,
  updateUserService,
  updateWatchlistService,
} from "../services/user";

export const createUserController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { address } = req.body;
    const lowerAddress: string = address.toLowerCase();
    const user: IUser | null = await getUserService(lowerAddress);
    if (user) {
      res.status(500).json({ message: "User already exists" });
      return;
    }
    const result: boolean = await createUserService(lowerAddress);
    if (result) {
      res.status(200).json({ message: "success" });
      return;
    }
    res.status(500).json({ message: "Internal Server Error" });
  } catch (err) {
    console.error(`👾 createUserController: ${err}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getUserController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { address } = req.params;
    const user: IUser | null = await getUserService(address);
    if (user) {
      res.status(200).json(user);
      return;
    }
    res.status(404).json({ message: "User not found" });
  } catch (err) {
    console.error(`👾 getUserController: ${err}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateUserController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { address } = req.params;
    const { name, biography, keyImage } = req.body;
    const lowerAddress: string = address.toLowerCase();
    const user: IUser | null = await updateUserService(lowerAddress, name, biography, keyImage);
    if (user) {
      res.status(200).json({ message: "success" });
      return;
    }
    res.status(404).json({ message: "User not found" });
  } catch (err) {
    console.error(`👾 updateUserController: ${err}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getWatchlistController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { address } = req.params;
    const user: IUser[] = await getWatchlistService(address);
    if (user) {
      res.status(200).json(user);
      return;
    }
    res.status(404).json({ message: "User not found" });
  } catch (err) {
    console.error(`👾 getWatchlistController: ${err}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateWatchlistController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { address } = req.params;
    const { watchAddress, register } = req.body;
    const result: boolean = await updateWatchlistService(address, watchAddress, register);
    if (result) {
      res.status(200).json({ message: "Success" });
      return;
    }
    res.status(404).json({ message: "User not found" });
  } catch (err) {
    console.error(`👾 updateWatchlistController: ${err}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateNotificationController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { address } = req.params;
    const user: boolean = await updateNotificationService(address);
    if (user) {
      res.status(200).json({ message: "Success" });
      return;
    }
    res.status(404).json({ message: "User not found" });
  } catch (err) {
    console.error(`👾 updateNotificationController: ${err}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const searchUserController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { keyword } = req.params;
    const users: IUser[] = await searchUserService(keyword);
    res.status(200).json(users);
  } catch (err) {
    console.error(`👾 searchUserController: ${err}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getTopPriceUsersController = async (req: Request, res: Response): Promise<void> => {
  try {
    const users: IUser[] = await getTopPriceUsersService();
    res.status(200).json(users);
  } catch (err) {
    console.error(`👾 getTopPriceUsersController: ${err}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
