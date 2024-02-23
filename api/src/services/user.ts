import { createChatModel } from "../models/chat";
import { getCodeFromAddressModel } from "../models/code";
import {
  createUserModel,
  getHoldModel,
  getHolderModel,
  getTop50KeyNFTPriceUserModel,
  getUserModel,
  getWatchListModel,
  searchUserModel,
  updateNotificationModel,
  updateUserBioModel,
  updateUserNotificationModel,
  updateUserRegisterModel,
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
  twitterId: string | null,
  notification: boolean | null,
  register: boolean | null,
): Promise<boolean> => {
  if (name && icon && twitterId) {
    const user = await getUserModel(address);
    if (user.name) return true;
    const result = await updateUserTwitterModel(address, name, icon, twitterId);
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

  if (register) {
    const result = await updateUserRegisterModel(address);
    await createChatModel(address);
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

// holder
export const getHolderService = async (address: string): Promise<IUser[]> => {
  const user = await getHolderModel(address);
  return user;
};

// hold
export const getHoldService = async (address: string): Promise<IUser[]> => {
  const user = await getHoldModel(address);
  return user;
};

// Code
export const getCodeService = async (address: string): Promise<string> => {
  const user = await getCodeFromAddressModel(address);
  return user.code;
};
