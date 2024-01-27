import { Request, Response } from "express";
import { IUser } from "lib/type";
import {
  createUserService,
  getTopPriceUsersService,
  getUserModel,
  getWatchlistService,
  searchUserService,
  updateNotificationService,
  updateUserService,
  updateWatchlistService,
} from "services/user";

export const createUserController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { address, name, biography, icon, keyImage } = req.body;
    const result: boolean = await createUserService(address, name, biography, icon, keyImage);
    if (result) {
      res.status(200).json({ message: "User created" });
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
    const user: IUser | null = await getUserModel(address);
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
    const { biography, icon, keyImage } = req.body;
    const user: IUser | null = await updateUserService(address, biography, icon, keyImage);
    if (user) {
      res.status(200).json(user);
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
