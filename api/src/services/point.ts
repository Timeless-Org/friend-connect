import { getLastWeekPointModel } from "../models/point";

export const getLatestPointService = async (address: string): Promise<number> => {
  const amount = await getLastWeekPointModel(address);
  return amount;
};
