import { IUser } from "../lib/type";
import { getTotalProfitModel } from "../models/trade";
import {
  getHoldKeyAmountModel,
  getHoldKeyModel,
  getKeyNFTHolderAmountModel,
  getKeyNFTHolderModel,
} from "../models/user";

export const createKeyNftService = async (address: string): Promise<boolean> => {
  // Mint Key Nft
  console.log(address);
  return true;
};

export const getHoldKeyService = async (address: string): Promise<IUser[]> => {
  const holders: IUser[] = await getHoldKeyModel(address);
  return holders;
};

export const getHoldKeyAmountService = async (address: string): Promise<number> => {
  const amount: number = await getHoldKeyAmountModel(address);
  return amount;
};

export const getKeyNFTHolderService = async (address: string): Promise<IUser[]> => {
  const holders: IUser[] = await getKeyNFTHolderModel(address);
  return holders;
};

export const getKeyNFTHolderAmountService = async (address: string): Promise<number> => {
  const amount: number = await getKeyNFTHolderAmountModel(address);
  return amount;
};

export const getTradeProfitService = async (address: string): Promise<number> => {
  const amount: number = await getTotalProfitModel(address);
  return amount;
};
