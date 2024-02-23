import { Request, Response } from "express";
import {
  getHolderService,
  createUserService,
  getTopPriceUsersService,
  getUserService,
  getWatchlistService,
  searchUserService,
  updateNotificationService,
  getCodeService,
  updateUserService,
  updateWatchlistService,
} from "../services/user";
import { IUser } from "../utils/interfaces";

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
    const { name, biography, icon, twitterId, notification, register } = req.body;
    const lowerAddress: string = address.toLowerCase();
    const result: boolean = await updateUserService(
      lowerAddress,
      name,
      biography,
      icon,
      twitterId,
      notification,
      register,
    );
    if (result) {
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

// holder
export const getHolderController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { address } = req.params;
    const lowerAddress: string = address.toLowerCase();
    const user: IUser[] = await getHolderService(lowerAddress);
    if (user) {
      res.status(200).json(user);
      return;
    }
    res.status(404).json({ message: "User not found" });
  } catch (err) {
    console.error(`👾 getHolderController: ${err}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// hold
export const getHoldController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { address } = req.params;
    const lowerAddress: string = address.toLowerCase();
    const user: IUser[] = await getHolderService(lowerAddress);
    if (user) {
      res.status(200).json(user);
      return;
    }
    res.status(404).json({ message: "User not found" });
  } catch (err) {
    console.error(`👾 getHoldController: ${err}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// code
export const getCodeController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { address } = req.params;
    const lowerAddress: string = address.toLowerCase();
    const code: string | null = await getCodeService(lowerAddress);
    if (code) {
      res.status(200).json(code);
      return;
    }
    res.status(404).json({ message: "code not found" });
  } catch (err) {
    console.error(`👾 getCodeController: ${err}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
