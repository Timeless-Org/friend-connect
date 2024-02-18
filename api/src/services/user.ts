import {
  createUserModel,
  getTop50KeyNFTPriceUserModel,
  getUserModel,
  getWatchListModel,
  searchUserModel,
  updateNotificationModel,
  updateUserBioModel,
  updateUserNotificationModel,
  updateUserTwitterModel,
  upsertWatchListModel,
} from "../models/user";
import { IUser } from "../utils/interfaces";

// Create

export const createUserService = async (address: string): Promise<boolean> => {
  const user = await createUserModel({ address });
  if (user) {
    return true;
  }
  return false;
};

// Get

export const getUserService = async (address: string): Promise<IUser | null> => {
  const user = await getUserModel(address);
  return user;
};

export const getWatchlistService = async (address: string): Promise<IUser[]> => {
  const users = await getWatchListModel(address);
  return users;
};

// Update

export const updateUserService = async (
  address: string,
  name: string | null,
  biography: string | null,
  icon: string | null,
  notification: boolean | null,
): Promise<boolean> => {
  if (name && icon) {
    const user = await getUserModel(address);
    if (user) return true;
    const result = await updateUserTwitterModel(address, name, icon);
    if (result) return true;
  }
  if (biography) {
    const result = await updateUserBioModel(address, biography);
    if (result) return true;
  }
  if (notification) {
    const result = await updateUserNotificationModel(address, notification);
    if (result) return true;
  }
};

export const updateWatchlistService = async (
  address: string,
  watch_user_id: number,
  register: boolean,
): Promise<boolean> => {
  const watchList = await upsertWatchListModel(address, watch_user_id, register);
  if (watchList) {
    return true;
  }
  return false;
};

export const updateNotificationService = async (address: string): Promise<boolean> => {
  const user = await updateNotificationModel(address);
  if (user) {
    return true;
  }
  return false;
};

export const searchUserService = async (keyword: string): Promise<IUser[]> => {
  const users: IUser[] = await searchUserModel(keyword);
  return users;
};

export const getTopPriceUsersService = async (): Promise<IUser[]> => {
  const users: IUser[] = await getTop50KeyNFTPriceUserModel();
  return users;
};
