import { prisma } from "../app";
import { ITrade } from "../utils/interfaces";

// Trade

export const createTradeModel = async (
  buyAddress: string,
  sellAddress: string,
  keyPrice: number,
  amount: number,
  isBuy: boolean,
): Promise<ITrade> => {
  const buyUser = await prisma.user.findUnique({
    where: {
      address: buyAddress,
    },
  });
  const sellUser = await prisma.user.findUnique({
    where: {
      address: sellAddress,
    },
  });
  if (!buyUser || !sellUser) throw new Error("User not found");
  const result = await prisma.trade.create({
    data: {
      buy_user_id: buyUser?.id,
      sell_user_id: sellUser?.id,
      key_price: keyPrice,
      amount,
      is_buy: isBuy,
      trade_at: new Date(),
      created_at: new Date(),
    },
  });
  return result;
};

export const getTradeModel = async (address: string): Promise<ITrade[]> => {
  const user = await prisma.user.findUnique({
    where: {
      address: address,
    },
  });
  if (!user) throw new Error("User not found");
  const trades = await prisma.trade.findMany({
    where: {
      OR: [{ buy_user_id: user.id }, { sell_user_id: user.id }],
    },
    include: {
      Buyer: {
        select: {
          address: true,
          name: true,
          icon: true,
        },
      },
      Seller: {
        select: {
          address: true,
          name: true,
          icon: true,
        },
      },
    },
    orderBy: {
      created_at: "desc",
    },
  });
  return trades;
};

export const getWatchlistTradesModel = async (address: string): Promise<ITrade[]> => {
  const user = await prisma.user.findUnique({
    where: {
      address: address,
    },
  });
  if (!user) throw new Error("User not found");
  const watchlists = await prisma.watchlist.findMany({
    where: {
      user_id: user.id,
      register: true,
    },
  });
  const trades = await prisma.trade.findMany({
    where: {
      OR: [
        {
          buy_user_id: {
            in: watchlists.map((watchlist) => watchlist.watch_user_id),
          },
        },
        {
          sell_user_id: {
            in: watchlists.map((watchlist) => watchlist.watch_user_id),
          },
        },
      ],
    },
    include: {
      Buyer: {
        select: {
          address: true,
          name: true,
          icon: true,
        },
      },
      Seller: {
        select: {
          address: true,
          name: true,
          icon: true,
        },
      },
    },
    orderBy: {
      created_at: "desc",
    },
  });
  return trades;
};

export const getTradesModel = async (addressList: string[]): Promise<ITrade[]> => {
  const users = await prisma.user.findMany({
    where: {
      address: {
        in: addressList,
      },
    },
  });
  const userIds = users.map((user) => user.id);
  const trades = await prisma.trade.findMany({
    where: {
      OR: [{ buy_user_id: { in: userIds } }, { sell_user_id: { in: userIds } }],
    },
  });
  return trades;
};

export const getHolderTradesModel = async (address: string): Promise<ITrade[]> => {
  const users = await prisma.holder.findMany({
    where: {
      HoldObjects: {
        address,
      },
    },
  });
  const userIds = users.map((user) => user.id);
  const trades = await prisma.trade.findMany({
    where: {
      OR: [{ buy_user_id: { in: userIds } }, { sell_user_id: { in: userIds } }],
    },
  });
  return trades;
};

export const getLatestTradesModel = async (take: number): Promise<ITrade[]> => {
  const trades = await prisma.trade.findMany({
    take,
    orderBy: {
      created_at: "desc",
    },
    include: {
      Buyer: {
        select: {
          address: true,
          name: true,
          icon: true,
        },
      },
      Seller: {
        select: {
          address: true,
          name: true,
          icon: true,
        },
      },
    },
  });
  return trades;
};

// Trade Profit

export const getTotalProfitModel = async (address: string): Promise<number> => {
  const user = await prisma.user.findUnique({
    where: {
      address: address,
    },
  });
  if (!user) throw new Error("User not found");
  const totalProfit = await prisma.trade.aggregate({
    _sum: {
      profit: true,
    },
    where: {
      OR: [{ buy_user_id: user.id }, { sell_user_id: user.id }],
    },
  });
  return totalProfit._sum.profit || 0;
};
