import { IUser } from "../lib/type";
import {
  createUserModel,
  getTop50KeyNFTPriceUserModel,
  getWatchListModel,
  searchUserModel,
  updateNotificationModel,
  updateUserModel,
  upsertWatchListModel,
} from "../models/user";

export const createUserService = async (
  address: string,
  name: string,
  biography: string,
  icon: string,
  keyImage: string,
): Promise<boolean> => {
  const user = await createUserModel({ address, name, biography, icon, keyImage });
  if (user) {
    return true;
  }
  return false;
};

export const getUserModel = async (address: string): Promise<IUser | null> => {
  const user = await getUserModel(address);
  return user;
};

export const updateUserService = async (
  address: string,
  biography: string,
  icon: string,
  keyImage: string,
): Promise<IUser | null> => {
  const updatedUser = await updateUserModel(address, biography, icon, keyImage);
  return updatedUser;
};

export const getWatchlistService = async (address: string): Promise<IUser[]> => {
  const users = await getWatchListModel(address);
  return users;
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
