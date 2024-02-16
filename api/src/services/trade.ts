import {
  createTradeModel,
  getHolderTradesModel,
  getLatestTradesModel,
  getTradeModel,
  getWatchlistTradesModel,
} from "../models/trade";
import { ITrade } from "../utils/interfaces";

export const createTradeService = async (buyAddress: string, sellAddress: string, keyPrice: number, isBuy: boolean) => {
  const result: ITrade = await createTradeModel(buyAddress, sellAddress, keyPrice, isBuy);
  if (result) return true;
  return false;
};

export const getUserTradeService = async (address: string): Promise<ITrade[]> => {
  const trades: ITrade[] = await getTradeModel(address);
  return trades;
};

export const getHolderTradeService = async (address: string): Promise<ITrade[]> => {
  const trades: ITrade[] = await getHolderTradesModel(address);
  return trades;
};

export const getWatchlistTradeService = async (address: string): Promise<ITrade[]> => {
  const trades: ITrade[] = await getWatchlistTradesModel(address);
  return trades;
};

export const getAllTradeService = async (): Promise<ITrade[]> => {
  const trades: ITrade[] = await getLatestTradesModel(100);
  return trades;
};

export const getLatestTrade50Service = async (): Promise<ITrade[]> => {
  const trades: ITrade[] = await getLatestTradesModel(50);
  return trades;
};
