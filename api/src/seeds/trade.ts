import { prisma } from "../app";
import { readJson } from "./common";

export const post = async () => {
  const trades = await readJson("trade");

  const data = trades.map((trade: { trade_at: string | number | Date; created_at: string | number | Date }) => ({
    ...trade,
    trade_at: new Date(trade.trade_at).toISOString(),
    created_at: new Date(trade.created_at).toISOString(),
  }));
  await prisma.trade.createMany({
    data,
  });
};
